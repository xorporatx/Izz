import type { ComponentProps } from "react";
import { Drawer as DrawerPrimitive } from "vaul";
import "./Drawer.css";

/**
 * shadcn/ui Drawer, built on vaul.
 *
 * Same component surface as the registry version (Root / Trigger / Portal /
 * Overlay / Content / Header / Footer / Title / Description / Close) with the
 * Tailwind utility classes translated to this project's tokens. vaul stamps
 * `data-vaul-drawer-direction` on the content, which the stylesheet keys off
 * exactly as the registry version does.
 */

function Drawer(props: ComponentProps<typeof DrawerPrimitive.Root>) {
  return <DrawerPrimitive.Root data-slot="drawer" {...props} />;
}

function DrawerTrigger(props: ComponentProps<typeof DrawerPrimitive.Trigger>) {
  return <DrawerPrimitive.Trigger data-slot="drawer-trigger" {...props} />;
}

function DrawerPortal(props: ComponentProps<typeof DrawerPrimitive.Portal>) {
  return <DrawerPrimitive.Portal data-slot="drawer-portal" {...props} />;
}

function DrawerClose(props: ComponentProps<typeof DrawerPrimitive.Close>) {
  return <DrawerPrimitive.Close data-slot="drawer-close" {...props} />;
}

function DrawerOverlay({
  className = "",
  ...props
}: ComponentProps<typeof DrawerPrimitive.Overlay>) {
  return (
    <DrawerPrimitive.Overlay
      data-slot="drawer-overlay"
      className={`drawer__overlay ${className}`.trim()}
      {...props}
    />
  );
}

function DrawerContent({
  className = "",
  children,
  ...props
}: ComponentProps<typeof DrawerPrimitive.Content>) {
  return (
    <DrawerPortal data-slot="drawer-portal">
      <DrawerOverlay />
      <DrawerPrimitive.Content
        data-slot="drawer-content"
        className={`drawer__content ${className}`.trim()}
        {...props}
      >
        <div className="drawer__handle" aria-hidden="true" />
        {children}
      </DrawerPrimitive.Content>
    </DrawerPortal>
  );
}

function DrawerHeader({ className = "", ...props }: ComponentProps<"div">) {
  return (
    <div
      data-slot="drawer-header"
      className={`drawer__header ${className}`.trim()}
      {...props}
    />
  );
}

function DrawerFooter({ className = "", ...props }: ComponentProps<"div">) {
  return (
    <div
      data-slot="drawer-footer"
      className={`drawer__footer ${className}`.trim()}
      {...props}
    />
  );
}

function DrawerTitle({
  className = "",
  ...props
}: ComponentProps<typeof DrawerPrimitive.Title>) {
  return (
    <DrawerPrimitive.Title
      data-slot="drawer-title"
      className={`drawer__title ${className}`.trim()}
      {...props}
    />
  );
}

function DrawerDescription({
  className = "",
  ...props
}: ComponentProps<typeof DrawerPrimitive.Description>) {
  return (
    <DrawerPrimitive.Description
      data-slot="drawer-description"
      className={`drawer__description ${className}`.trim()}
      {...props}
    />
  );
}

export {
  Drawer,
  DrawerPortal,
  DrawerOverlay,
  DrawerTrigger,
  DrawerClose,
  DrawerContent,
  DrawerHeader,
  DrawerFooter,
  DrawerTitle,
  DrawerDescription,
};
