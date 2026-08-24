import type { Supplier } from "../../data/suppliers";
import { Card } from "../ui/Card";
import { SupplierCardBody } from "./SupplierCardBody";
import "./SupplierCard.css";

export interface SupplierCardProps {
  supplier: Supplier;
  /** Called on activation — tap, click, Enter or Space, anywhere on the card. */
  onOpen: (supplierId: string) => void;
}

/**
 * A supplier in the פודקוסט breakdown.
 *
 * The whole card is one button: the chevron is an affordance, not a separate
 * target, and the card never expands in place — activating it hands the
 * supplier id up so the caller can navigate to that supplier's page.
 */
export function SupplierCard({ supplier, onOpen }: SupplierCardProps) {
  return (
    <Card
      as="button"
      type="button"
      interactive
      className="supplier-card"
      onClick={() => onOpen(supplier.id)}
      aria-label={`${supplier.name} — ${supplier.orderCount} הזמנות, ${supplier.spend}. הצג פירוט ספק`}
    >
      <SupplierCardBody supplier={supplier} />
    </Card>
  );
}
