import type { SupplierOrder } from "../../data/suppliers";

export interface SupplierOrderRowProps {
  order: SupplierOrder;
}

/** One line of the orders table: reference, share, weight, cost. */
export function SupplierOrderRow({ order }: SupplierOrderRowProps) {
  return (
    <tr className="orders-table__row">
      <th scope="row" className="orders-table__cell orders-table__cell--reference numeric">
        {order.reference}
      </th>
      <td className="orders-table__cell numeric">{order.share}</td>
      <td className="orders-table__cell numeric">{order.weight}</td>
      <td className="orders-table__cell orders-table__cell--cost numeric">
        {order.cost}
      </td>
    </tr>
  );
}
