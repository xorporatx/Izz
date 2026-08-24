import { BackButton } from "../ui/BackButton";
import "./SupplierPageHeader.css";

export interface SupplierPageHeaderProps {
  /** Supplier name, or a placeholder while one is loading. */
  title: string;
  /** Small line under the name — "ספק", "כל ההזמנות". */
  subtitle: string;
  onBack: () => void;
  titleId?: string;
}

/**
 * Header for the supplier screens: the name at the reading edge (right, in
 * RTL) with its subtitle beneath, the back control opposite.
 */
export function SupplierPageHeader({
  title,
  subtitle,
  onBack,
  titleId,
}: SupplierPageHeaderProps) {
  return (
    <header className="supplier-page-header">
      <div className="supplier-page-header__titles">
        <h1 className="supplier-page-header__title" id={titleId}>
          {title}
        </h1>
        <p className="supplier-page-header__subtitle">{subtitle}</p>
      </div>

      <BackButton onClick={onBack} label={`חזרה מ${title}`} />
    </header>
  );
}
