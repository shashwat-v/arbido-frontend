import React, { useEffect, useMemo, useState } from "react";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import {
  Command,
  CommandInput,
  CommandGroup,
  CommandItem,
  CommandEmpty,
} from "@/components/ui/command";
import symbols from "@/data/cleaned_eq_symbols.json";

type Props = {
  label?: string;
  value: string;
  onSelect: (symbol: string) => void;
  placeholder?: string;
  maxResults?: number;
};

export default function TickerSelector({
  label,
  value,
  onSelect,
  placeholder = "Search symbol…",
  maxResults = 30,
}: Props) {
  const [localValue, setLocalValue] = useState(value || "");
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);

  useEffect(() => setLocalValue(value || ""), [value]);

  useEffect(() => {
    const t = setTimeout(() => setQuery(localValue), 120);
    return () => clearTimeout(t);
  }, [localValue]);

  const filtered = useMemo(() => {
    const q = (query || "").trim().toLowerCase();
    if (!q) return symbols.slice(0, maxResults);
    return symbols
      .filter((s) => s.toLowerCase().includes(q))
      .slice(0, maxResults);
  }, [query, maxResults]);

  const handleEnter = () => {
    onSelect(localValue.toUpperCase());
    setOpen(false);
  };

  return (
    <div className="flex flex-col gap-2 w-full">
      {label && (
        <label className="text-sm font-medium text-muted-foreground">
          {label}
        </label>
      )}

      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Input
            value={localValue}
            placeholder={placeholder}
            onChange={(e) => {
              setLocalValue(e.target.value.toUpperCase());
              setOpen(true);
            }}
            onFocus={() => setOpen(true)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                handleEnter();
              }
            }}
            className="bg-background/50 border-border/50"
          />
        </PopoverTrigger>

        {open && (
          <PopoverContent className="p-0 w-full max-h-60 overflow-y-auto">
            <Command>
              <CommandInput
                placeholder="Search symbol..."
                value={localValue}
                onValueChange={(v: string) => setLocalValue(v.toUpperCase())}
              />
              <CommandEmpty>No results found.</CommandEmpty>
              <CommandGroup>
                {filtered.map((sym) => (
                  <CommandItem
                    key={sym}
                    onSelect={() => {
                      onSelect(sym);
                      setLocalValue(sym);
                      setOpen(false);
                    }}
                  >
                    <div className="flex flex-col">
                      <span className="font-mono">{sym}</span>
                    </div>
                  </CommandItem>
                ))}
              </CommandGroup>
            </Command>
          </PopoverContent>
        )}
      </Popover>
    </div>
  );
}
