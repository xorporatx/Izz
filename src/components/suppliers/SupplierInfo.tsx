import type { Supplier } from "../../data/suppliers";
import { Card } from "../ui/Card";
import "./SupplierInfo.css";

export interface SupplierInfoProps {
  supplier: Supplier;
  /** Id of the section heading that names this card. */
  labelledBy?: string;
}

/**
 * The supplier's key figures, four rows deep.
 *
 * This is the short page, so it stays a summary: name, order count, spend and
 * change — no contact block, no history, nothing that belongs on a full
 * supplier profile.
 */
export function SupplierInfo({ supplier, labelledBy }: SupplierInfoProps) {
  const rows: { term: string; value: string; numeric?: boolean }[] = [
    { term: "שם הספק", value: supplier.name },
    { term: "מספר הזמנות", value: String(supplier.orderCount), numeric: true },
    { term: "סה״כ הוצאות", value: supplier.spend, numeric: true },
    { term: "שינוי", value: supplier.share, numeric: true },
  ];

  return (
    <Card as="section" className="supplier-info" aria-labelledby={labelledBy}>
      <dl className="supplier-info__list">
        {rows.map((row) => (
          <div className="supplier-info__row" key={row.term}>
            <dt className="supplier-info__term">{row.term}</dt>
            <dd className={`supplier-info__value${row.numeric ? " numeric" : ""}`}>
              {row.value}
            </dd>
          </div>
        ))}
      </dl>
    </Card>
  );
}
