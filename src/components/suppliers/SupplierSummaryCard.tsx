import type { Supplier } from "../../data/suppliers";
import { Card } from "../ui/Card";
import { SupplierCardBody } from "./SupplierCardBody";
import "./SupplierCard.css";

export interface SupplierSummaryCardProps {
  supplier: Supplier;
}

/**
 * The supplier page's opening card.
 *
 * Same component body as the card on the list, minus the button: the user has
 * already arrived, so there is nothing left to activate.
 */
export function SupplierSummaryCard({ supplier }: SupplierSummaryCardProps) {
  return (
    <Card
      as="section"
      className="supplier-card supplier-card--static"
      aria-label={`${supplier.name} — סיכום`}
    >
      <SupplierCardBody supplier={supplier} />
    </Card>
  );
}
