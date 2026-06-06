import { useState, useRef, useEffect, ReactNode, memo } from "react";
import { ChevronDown, Check } from "lucide-react";

interface DropdownOption {
  value: string;
  label: string;
  icon?: ReactNode;
}

interface CustomDropdownProps {
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder: string;
  options: DropdownOption[];
  variant?: "beige" | "tan" | "brown" | "salmon" | "peach" | "ghost" | "ai-capsule";
  icon?: ReactNode;
  themeName?: string;
}

const variantClasses: Record<string, { trigger: string; active: string; ring: string }> = {
  beige: {
    trigger: "bg-dropdown-beige/20 border-dropdown-beige/30 hover:border-dropdown-beige/50",
    active: "bg-dropdown-beige/15",
    ring: "ring-dropdown-beige/40",
  },
  tan: {
    trigger: "bg-dropdown-tan/20 border-dropdown-tan/30 hover:border-dropdown-tan/50",
    active: "bg-dropdown-tan/15",
    ring: "ring-dropdown-tan/40",
  },
  brown: {
    trigger: "bg-dropdown-brown/20 border-dropdown-brown/30 hover:border-dropdown-brown/50",
    active: "bg-dropdown-brown/15",
    ring: "ring-dropdown-brown/40",
  },
  salmon: {
    trigger: "bg-dropdown-salmon/20 border-dropdown-salmon/30 hover:border-dropdown-salmon/50",
    active: "bg-dropdown-salmon/15",
    ring: "ring-dropdown-salmon/40",
  },
  peach: {
    trigger: "bg-dropdown-peach/20 border-dropdown-peach/30 hover:border-dropdown-peach/50",
    active: "bg-dropdown-peach/15",
    ring: "ring-dropdown-peach/40",
  },
  ghost: {
    trigger: "bg-transparent border-transparent hover:bg-secondary/50",
    active: "bg-secondary/50",
    ring: "ring-border",
  },
  "ai-capsule": {
    trigger: "bg-[#1e1f20] border-white hover:bg-white/10 rounded-full text-neutral-200",
    active: "bg-white/10",
    ring: "ring-white/20",
  }
};

const CustomDropdown = memo(({
  label,
  value,
  onChange,
  placeholder,
  options,
  variant = "beige",
  icon,
  themeName,
}: CustomDropdownProps) => {
  const [open, setOpen] = useState(false);
  const [position, setPosition] = useState({ top: 0, left: 0 });
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const updatePosition = () => {
      if (ref.current) {
        const rect = ref.current.getBoundingClientRect();
        const isMobile = window.innerWidth < 768;
        setPosition({
          top: rect.bottom,
          left: isMobile ? rect.left : rect.left + (rect.width - 192) / 2,
        });
      }
    };

    if (open) {
      updatePosition();
      window.addEventListener("scroll", updatePosition, true);
      window.addEventListener("resize", updatePosition);
    }

    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    
    return () => {
      document.removeEventListener("mousedown", handler);
      window.removeEventListener("scroll", updatePosition, true);
      window.removeEventListener("resize", updatePosition);
    };
  }, [open]);

  const selected = options.find((o) => o.value === value);
  
  const borderClass = (variant === "ai-capsule" && themeName === 'Dark Salmon') ? 'border-white/20' : 'border-white';
  
  const triggerClass = variant === "ai-capsule" 
    ? `relative flex items-center justify-center h-10 px-6 rounded-full border ${borderClass} text-sm transition-all bg-[var(--bg)]/75 backdrop-blur-md hover:border-white/50 text-[var(--text)] gap-2 shadow-sm`
    : `relative flex items-center justify-center h-10 px-6 rounded-full border text-sm transition-all bg-[var(--bg)]/75 backdrop-blur-md border-[var(--text)]/10 hover:border-[var(--primary)]/50 ${open ? "ring-2 ring-[var(--primary)]/40 border-transparent" : ""} text-[var(--text)] gap-2 shadow-sm`;

  return (
    <div className="relative" ref={ref}>
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className={triggerClass}
      >
        {icon && <span className="text-[var(--text)]/60 [&>svg]:w-5 [&>svg]:h-5">{icon}</span>}
        {selected ? (
          <span className="truncate max-w-[100px] font-medium">
            {selected.label}
          </span>
        ) : (
          <span className="truncate max-w-[100px] font-medium text-[var(--text)]/60">
            {placeholder}
          </span>
        )}
        <ChevronDown
          className={`w-4 h-4 text-[var(--text)]/60 transition-transform ${open ? "rotate-180" : ""}`}
        />
      </button>

      {open && (
        <div 
          className="fixed z-[9999] mt-2 w-48 rounded-2xl border border-[var(--text)]/10 bg-[var(--bg)]/60 backdrop-blur-xl shadow-2xl overflow-hidden animate-fade-up transition-colors duration-500"
          style={{
            top: position.top,
            left: position.left,
          }}
        >
          <div className="max-h-60 overflow-y-auto py-2 text-sm">
            {/* Reset option */}
            <button
              type="button"
              onClick={() => { onChange(""); setOpen(false); }}
              className={`w-full text-left px-4 py-2 transition-colors hover:bg-[var(--text)]/5 ${!value ? "text-[var(--primary)] font-medium" : "text-[var(--text)]/60"}`}
            >
              {placeholder}
            </button>
            {options.map((o) => (
              <button
                key={o.value}
                type="button"
                onClick={() => { onChange(o.value); setOpen(false); }}
                className={`w-full text-left px-4 py-2 flex items-center justify-between transition-colors hover:bg-[var(--text)]/5 ${value === o.value ? "font-medium bg-[var(--primary)]/20 text-[var(--text)]" : "text-[var(--text)]/80"}`}
              >
                <div className="flex items-center gap-2">
                  {o.icon && <span className="text-[var(--text)]/50 w-4 h-4 flex items-center justify-center">{o.icon}</span>}
                  {o.label}
                </div>
                {value === o.value && <Check className="w-4 h-4 text-[var(--primary)]" />}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
});

CustomDropdown.displayName = "CustomDropdown";

export default CustomDropdown;
