import type { ComponentProps } from "react";
import * as PopoverPrimitive from "@radix-ui/react-popover";
import "./Popover.css";

/**
 * shadcn/ui Popover, built on Radix.
 *
 * Same surface as the registry version, with the Tailwind utilities
 * translated to this project's tokens. Radix picks the RTL direction up from
 * the document, so `align="start"` anchors to the right-hand edge.
 */

function Popover(props: ComponentProps<typeof PopoverPrimitive.Root>) {
  return <PopoverPrimitive.Root data-slot="popover" {...props} />;
}

function PopoverTrigger(
  props: ComponentProps<typeof PopoverPrimitive.Trigger>,
) {
  return <PopoverPrimitive.Trigger data-slot="popover-trigger" {...props} />;
}

function PopoverAnchor(props: ComponentProps<typeof PopoverPrimitive.Anchor>) {
  return <PopoverPrimitive.Anchor data-slot="popover-anchor" {...props} />;
}

function PopoverContent({
  className = "",
  align = "center",
  sideOffset = 8,
  ...props
}: ComponentProps<typeof PopoverPrimitive.Content>) {
  return (
    <PopoverPrimitive.Portal>
      <PopoverPrimitive.Content
        data-slot="popover-content"
        align={align}
        sideOffset={sideOffset}
        className={`popover__content ${className}`.trim()}
        {...props}
      />
    </PopoverPrimitive.Portal>
  );
}

function PopoverHeader({ className = "", ...props }: ComponentProps<"div">) {
  return (
    <div
      data-slot="popover-header"
      className={`popover__header ${className}`.trim()}
      {...props}
    />
  );
}

function PopoverTitle({ className = "", ...props }: ComponentProps<"div">) {
  return (
    <div
      data-slot="popover-title"
      className={`popover__title ${className}`.trim()}
      {...props}
    />
  );
}

function PopoverDescription({ className = "", ...props }: ComponentProps<"p">) {
  return (
    <p
      data-slot="popover-description"
      className={`popover__description ${className}`.trim()}
      {...props}
    />
  );
}

export {
  Popover,
  PopoverTrigger,
  PopoverAnchor,
  PopoverContent,
  PopoverHeader,
  PopoverTitle,
  PopoverDescription,
};
