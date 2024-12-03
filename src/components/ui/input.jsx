import * as React from "react";
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";

function useDebounce(value, delay) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => setDebouncedValue(value), delay);
    return () => clearTimeout(handler);
  }, [value, delay]);

  return debouncedValue;
}

const InputWithDebounce = React.forwardRef(
  (
    {
      className,
      type = "text",
      onDebounce,
      placeholder = "Search...",
      ...props
    },
    ref
  ) => {
    const [searchTerm, setSearchTerm] = useState("");
    const debouncedSearchTerm = useDebounce(searchTerm, 500);


    const isMac = navigator.platform.toUpperCase().indexOf("MAC") >= 0;
    const shortcut = isMac ? "⌘ K" : "Ctrl K";

    useEffect(() => {
      if (onDebounce) {
        onDebounce(debouncedSearchTerm);
      }
    }, [debouncedSearchTerm, onDebounce]);

    return (
      <div className="relative w-full flex justify-end">
        <input
          type={type}
          className={cn(
            "flex h-10 w-full rounded-md border border-input bg-background px-3 pl-3 pr-3 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50 md:w-[300px]",
            isMac ? "md:pr-14" : "md:pr-20",
            className
          )}
          ref={ref}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder={placeholder}
          {...props}
        />
        <div className="absolute right-3 top-[10.5px] text-xs text-muted-foreground hidden md:block">
          <kbd className="pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground opacity-100">
            <span className="text-[0.65rem]">{shortcut}</span>
          </kbd>
        </div>
      </div>
    );
  }
);

InputWithDebounce.displayName = "InputWithDebounce";

export { InputWithDebounce };
