import type { Supplier } from "../../data/suppliers";
import { ChevronDown } from "../icons";
import { Progress } from "../ui/Progress";
import { ToneDot } from "../ui/ToneDot";

export interface SupplierCardBodyProps {
  supplier: Supplier;
}

/**
 * The inside of a supplier card — name, figures, meter, "פירוט הזמנות" row.
 *
 * Shared verbatim by the tappable card in the list and the summary card at the
 * top of the supplier page, so the detail page opens on exactly the card the
 * user just tapped. Everything is phrasing content: the list card renders this
 * inside a `<button>`, which may not contain flow content.
 */
export function SupplierCardBody({ supplier }: SupplierCardBodyProps) {
  return (
    <>
      <span className="supplier-card__main">
        <span className="supplier-card__heading">
          <ToneDot tone={supplier.tone} />
          <span className="supplier-card__name">{supplier.name}</span>
        </span>

        <span className="supplier-card__figures">
          <span className="supplier-card__count">{`${supplier.orderCount} הזמנות`}</span>
          <span className="supplier-card__amount">
            <span className="supplier-card__value numeric">{supplier.spend}</span>
            <span className="supplier-card__separator" aria-hidden="true">
              /
            </span>
            <span className="supplier-card__share numeric">({supplier.share})</span>
          </span>
        </span>

        <span className="supplier-card__meter">
          <Progress
            value={supplier.progress}
            tone={supplier.tone}
            label={`${supplier.name} — חלק מסך ההוצאה`}
          />
        </span>
      </span>

      <span className="supplier-card__footer">
        <span className="supplier-card__footer-label">פירוט הזמנות</span>
        <ChevronDown size={16} className="supplier-card__chevron" />
      </span>
    </>
  );
}
