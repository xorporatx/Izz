import { foodCost } from "../data/suppliers";
import { SupplierCard } from "../components/suppliers/SupplierCard";
import { useSuppliers } from "../lib/useSuppliers";
import { Card } from "../components/ui/Card";
import { SectionHeader } from "../components/ui/SectionHeader";
import "./FoodCostPage.css";

export interface FoodCostPageProps {
  /** Opens a supplier's page. Fired by a tap anywhere on its card. */
  onOpenSupplier: (supplierId: string) => void;
}

const SUPPLIERS_ID = "food-cost-suppliers";

/**
 * The פודקוסט screen: the period's totals, then the supplier breakdown.
 *
 * Each supplier is a card that opens its own page — the list itself never
 * expands.
 */
export function FoodCostPage({ onOpenSupplier }: FoodCostPageProps) {
  const suppliers = useSuppliers();
  const stats = [foodCost.spend, foodCost.ratio];

  return (
    <div className="food-cost">
      <section className="food-cost__summary" aria-label={foodCost.title}>
        <h2 className="food-cost__title">{foodCost.title}</h2>

        <div className="food-cost__stats">
          {stats.map((stat) => (
            <Card className="food-cost__stat" key={stat.label}>
              <p className="food-cost__stat-label">{stat.label}</p>
              <p
                className={`food-cost__stat-value numeric${
                  "tone" in stat && stat.tone === "good"
                    ? " food-cost__stat-value--good"
                    : ""
                }`}
              >
                {stat.value}
              </p>
              <p
                className={`food-cost__stat-caption${
                  "tone" in stat && stat.tone === "good"
                    ? " food-cost__stat-caption--good"
                    : ""
                }`}
              >
                {stat.caption}
              </p>
            </Card>
          ))}
        </div>
      </section>

      <SectionHeader title="פירוט ספקים" id={SUPPLIERS_ID} />

      <ul className="food-cost__suppliers" aria-labelledby={SUPPLIERS_ID}>
        {suppliers.map((supplier) => (
          <li key={supplier.id}>
            <SupplierCard supplier={supplier} onOpen={onOpenSupplier} />
          </li>
        ))}
      </ul>
    </div>
  );
}
