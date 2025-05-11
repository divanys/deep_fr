// components/ui/accordion.tsx
import React from "react";
import * as AccordionPrimitive from "@radix-ui/react-accordion";
import { cn } from "../../lib/utils"; // Путь к утилите для стилей

// Accordion компонент
const Accordion = ({
  className,
  ...props
}: React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Root>) => {
  return (
    <AccordionPrimitive.Root className={cn("space-y-4", className)} {...props} />
  );
};

const AccordionItem = React.memo(
  React.forwardRef<React.ElementRef<typeof AccordionPrimitive.Item>, React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Item>>(
    ({ className, ...props }, ref) => (
      <AccordionPrimitive.Item
        ref={ref}
        className={cn("border border-border rounded-md", className)}
        {...props}
      />
    )
  )
);
AccordionItem.displayName = "AccordionItem";

const AccordionTrigger = React.memo(
  React.forwardRef<
    React.ElementRef<typeof AccordionPrimitive.Trigger>,
    React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Trigger>
  >(({ className, children, ...props }, ref) => (
    <AccordionPrimitive.Header className="flex">
      <AccordionPrimitive.Trigger
        ref={ref}
        className={cn(
          "flex flex-1 items-center justify-between py-4 font-medium transition-all hover:underline [&[data-state=open]>svg]:rotate-180",
          className
        )}
        {...props}
      >
        {children}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-4 w-4 shrink-0 transition-transform duration-200"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </AccordionPrimitive.Trigger>
    </AccordionPrimitive.Header>
  ))
);
AccordionTrigger.displayName = "AccordionTrigger";

const AccordionContent = React.memo(
  React.forwardRef<
    React.ElementRef<typeof AccordionPrimitive.Content>,
    React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Content>
  >(({ className, ...props }, ref) => (
    <AccordionPrimitive.Content
      ref={ref}
      className={cn("overflow-hidden text-sm transition-all data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down", className)}
      {...props}
    />
  ))
);
AccordionContent.displayName = "AccordionContent";

// Экспортируем компоненты
export { Accordion, AccordionItem, AccordionTrigger, AccordionContent };
