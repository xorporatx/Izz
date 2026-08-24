import { useEffect, useRef } from "react";
import { SupplierInfo } from "../components/suppliers/SupplierInfo";
import { SupplierOrdersPreview } from "../components/suppliers/SupplierOrdersPreview";
import { SupplierPageHeader } from "../components/suppliers/SupplierPageHeader";
import { SupplierPageSkeleton } from "../components/suppliers/SupplierPageSkeleton";
import { SupplierSummaryCard } from "../components/suppliers/SupplierSummaryCard";
import { ArrowLeft } from "../components/icons";
import { Button } from "../components/ui/Button";
import { SectionHeader } from "../components/ui/SectionHeader";
import { useSupplier } from "../lib/useSupplier";
import "./SupplierPage.css";

export interface SupplierShortPageProps {
  /** From the URL — `/suppliers/:supplierId`. */
  supplierId: string;
  onBack: () => void;
  onOpenAllOrders: (supplierId: string) => void;
}

/** The design shows the latest few orders, not the whole list. */
const PREVIEW_LIMIT = 3;

const TITLE_ID = "supplier-page-title";
const INFO_ID = "supplier-page-info";
const ORDERS_ID = "supplier-page-orders";

/**
 * A supplier at a glance: the card the user tapped, its key figures, the last
 * few orders, and one way on to the full list.
 *
 * The supplier is looked up from the id in the URL, so the page is
 * addressable and every supplier renders through this one component.
 */
export function SupplierShortPage({
  supplierId,
  onBack,
  onOpenAllOrders,
}: SupplierShortPageProps) {
  const { status, supplier } = useSupplier(supplierId);
  const root = useRef<HTMLDivElement>(null);

  // Arriving on a new page should put the reader (and assistive tech) at its
  // top rather than wherever focus was left on the list behind.
  useEffect(() => {
    root.current?.focus({ preventScroll: true });
  }, [supplierId]);

  return (
    <div className="supplier-page" tabIndex={-1} ref={root}>
      <SupplierPageHeader
        title={supplier?.name ?? (status === "missing" ? "ספק לא נמצא" : "ספק")}
        subtitle="ספק"
        onBack={onBack}
        titleId={TITLE_ID}
      />

      <div className="supplier-page__body">
        {status === "loading" && <SupplierPageSkeleton rows={PREVIEW_LIMIT} />}

        {status === "missing" && (
          <p className="supplier-page__missing">
            הספק המבוקש אינו קיים או הוסר מהרשימה.
          </p>
        )}

        {status === "ready" && supplier && (
          <>
            <SupplierSummaryCard supplier={supplier} />

            <SectionHeader title="פרטי ספק" id={INFO_ID} />
            <SupplierInfo supplier={supplier} labelledBy={INFO_ID} />

            <SectionHeader title="הזמנות אחרונות" id={ORDERS_ID} />
            <SupplierOrdersPreview
              supplier={supplier}
              limit={PREVIEW_LIMIT}
              labelledBy={ORDERS_ID}
            />

            {supplier.orders.length > 0 && (
              <Button
                variant="primary"
                block
                className="supplier-page__cta"
                onClick={() => onOpenAllOrders(supplier.id)}
              >
                הצג את כל ההזמנות <ArrowLeft size={16} />
              </Button>
            )}
          </>
        )}
      </div>
    </div>
  );
}
