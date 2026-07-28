import { cn } from "../../utils/helpers";

const variants = {
  primary:
    "bg-gradient-to-r from-primary to-accent text-primary-foreground hover:opacity-90 shadow-[var(--shadow-glow)]",
  secondary: "bg-secondary text-secondary-foreground hover:bg-muted",
  outline: "border border-border bg-transparent text-foreground hover:bg-secondary",
  ghost: "text-muted-foreground hover:text-foreground hover:bg-secondary",
  danger: "bg-destructive text-destructive-foreground hover:opacity-90",
};

const sizes = {
  sm: "h-9 px-3 text-sm",
  md: "h-11 px-5 text-sm",
  lg: "h-12 px-7 text-base",
};

export default function Button({
  as: Component = "button",
  variant = "primary",
  size = "md",
  className,
  children,
  ...props
}) {
  return (
    <Component
      className={cn(
        "inline-flex items-center justify-center gap-2 rounded-xl font-medium transition-all duration-200",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
        "disabled:pointer-events-none disabled:opacity-50",
        variants[variant],
        sizes[size],
        className,
      )}
      {...props}
    >
      {children}
    </Component>
  );
}
