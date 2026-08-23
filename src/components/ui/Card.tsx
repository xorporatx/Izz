import type { ElementType, HTMLAttributes, ReactNode } from "react";
import "./Card.css";

export interface CardProps extends HTMLAttributes<HTMLElement> {
  /** Render as another element/component — e.g. `as="li"` inside a list. */
  as?: ElementType;
  /** Adds the hover elevation + border shift. Use for clickable cards. */
  interactive?: boolean;
  /** Only meaningful with `as="button"`; keeps it out of form submission. */
  type?: "button" | "submit" | "reset";
  children?: ReactNode;
}

/**
 * The dashboard's single surface primitive: white fill, 1px border,
 * 26px radius, `shadow/sm`. Every card in the product is this component.
 */
export function Card({
  as: Tag = "div",
  interactive = false,
  className = "",
  children,
  ...rest
}: CardProps) {
  return (
    <Tag
      className={`card${interactive ? " card--interactive" : ""}${
        className ? ` ${className}` : ""
      }`}
      {...rest}
    >
      {children}
    </Tag>
  );
}
