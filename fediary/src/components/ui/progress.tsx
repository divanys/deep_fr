import React from "react";
import { cn } from "../../lib/utils";

interface ProgressProps extends React.HTMLAttributes<HTMLDivElement> {
  value?: number;
  max?: number;
  indicatorClassName?: string;  // Добавляем новое свойство
}

const Progress = React.forwardRef<HTMLDivElement, ProgressProps>(
  ({ className, indicatorClassName, value, max = 100, ...props }, ref) => {
    const width = Math.min(100, Math.max(0, (value ?? 0) / max * 100));

    return (
      <div
        ref={ref}
        className={cn("relative h-4 w-full overflow-hidden rounded-full bg-secondary", className)}
        {...props}
      >
        <div
          className={cn("h-full bg-primary transition-all", indicatorClassName)}
          style={{ width: `${width}%` }}
        />
      </div>
    );
  }
);
Progress.displayName = "Progress";

export { Progress };