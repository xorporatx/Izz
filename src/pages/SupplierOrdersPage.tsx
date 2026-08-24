import { useEffect, useRef } from "react";
import { SupplierOrdersPreview } from "../components/suppliers/SupplierOrdersPreview";
import { SupplierPageHeader } from "../components/suppliers/SupplierPageHeader";
import { SupplierPageSkeleton } from "../components/suppliers/SupplierPageSkeleton";
import { SectionHeader } from "../components/ui/SectionHeader";
import { useSupplier } from "../lib/useSupplier";
import "./SupplierPage.css";

export interface SupplierOrdersPageProps {
  supplierId: string;
  onBack: () => void;
}

const TITLE_ID = "supplier-orders-page-title";
const ORDERS_ID = "supplier-orders-page-list";

/**
 * Every order for one supplier — the destination of the short page's CTA, and
 * the last screen in the stack.
 */
export function SupplierOrdersPage({
  supplierId,
  onBack,
}: SupplierOrdersPageProps) {
  const { status, supplier } = useSupplier(supplierId);
  const root = useRef<HTMLDivElement>(null);

  useEffect(() => {
    root.current?.focus({ preventScroll: true });
  }, [supplierId]);

  return (
    <div className="supplier-page" tabIndex={-1} ref={root}>
      <SupplierPageHeader
        title={supplier?.name ?? (status === "missing" ? "ספק לא נמצא" : "ספק")}
        subtitle="כל ההזמנות"
        onBack={onBack}
        titleId={TITLE_ID}
      />

      <div className="supplier-page__body">
        {status === "loading" && <SupplierPageSkeleton rows={6} />}

        {status === "missing" && (
          <p className="supplier-page__missing">
            הספק המבוקש אינו קיים או הוסר מהרשימה.
          </p>
        )}

        {status === "ready" && supplier && (
          <>
            {/* Deliberately not a count: the table's own totals row carries
                the period figure, and two counts side by side would read as a
                contradiction wherever they disagree. */}
            <SectionHeader title="פירוט הזמנות" id={ORDERS_ID} />
            <SupplierOrdersPreview supplier={supplier} labelledBy={ORDERS_ID} />
          </>
        )}
      </div>
    </div>
  );
}
