import type { Supplier } from "../../data/suppliers";
import { Card } from "../ui/Card";
import { SupplierOrderRow } from "./SupplierOrderRow";
import "./SupplierOrdersPreview.css";

export interface SupplierOrdersPreviewProps {
  supplier: Supplier;
  /** Rows to show. Omit for the whole list — the full orders page does. */
  limit?: number;
  labelledBy?: string;
}

/**
 * The supplier's orders as a table.
 *
 * Same component either side of the CTA: the short page passes a `limit` and
 * gets the latest few rows, the full orders page passes none and gets all of
 * them. The totals row is the supplier's period total either way, so a
 * truncated preview still closes on the real number rather than on the sum of
 * the rows that happen to be visible.
 */
export function SupplierOrdersPreview({
  supplier,
  limit,
  labelledBy,
}: SupplierOrdersPreviewProps) {
  const rows =
    limit === undefined ? supplier.orders : supplier.orders.slice(0, limit);

  if (supplier.orders.length === 0) {
    return (
      <Card as="section" className="orders-preview" aria-labelledby={labelledBy}>
        <p className="orders-preview__empty">אין עדיין הזמנות</p>
      </Card>
    );
  }

  return (
    <Card as="section" className="orders-preview" aria-labelledby={labelledBy}>
      <div className="orders-preview__scroll">
        <table className="orders-table">
          <caption className="sr-only">{`הזמנות של ${supplier.name}`}</caption>
          <thead>
            <tr>
              <th scope="col" className="orders-table__head">
                פריטים
              </th>
              <th scope="col" className="orders-table__head">
                אחוזים
              </th>
              <th scope="col" className="orders-table__head">
                כמות ק״ג
              </th>
              <th scope="col" className="orders-table__head">
                עלות
              </th>
            </tr>
          </thead>

          <tbody>
            {rows.map((order) => (
              <SupplierOrderRow key={order.id} order={order} />
            ))}
          </tbody>

          <tfoot>
            <tr className="orders-table__row orders-table__row--total">
              <th scope="row" className="orders-table__cell">
                {supplier.totals.label}
              </th>
              <td className="orders-table__cell numeric">
                {supplier.totals.share}
              </td>
              <td className="orders-table__cell numeric">
                {supplier.totals.weight}
              </td>
              <td className="orders-table__cell orders-table__cell--cost numeric">
                {supplier.totals.cost}
              </td>
            </tr>
          </tfoot>
        </table>
      </div>
    </Card>
  );
}
