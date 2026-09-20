import { createFileRoute } from "@tanstack/react-router";
import { listOrders } from "@/lib/admin";

export const Route = createFileRoute("/_authenticated/admin/orders")({
  loader: () => listOrders(),
  component: OrdersAdmin,
});

function OrdersAdmin() {
  const orders = Route.useLoaderData();
  return (
    <div>
      <h1 className="text-3xl">Orders</h1>
      <div className="mt-6 overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead className="eyebrow">
            <tr>
              <th className="py-2 pr-4">Ref</th>
              <th className="py-2 pr-4">Beat</th>
              <th className="py-2 pr-4">Licence</th>
              <th className="py-2 pr-4">Buyer</th>
              <th className="py-2 pr-4">Status</th>
              <th className="py-2">Date</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order.id} className="border-t border-border">
                <td className="py-3 pr-4">{order.order_ref}</td>
                <td className="py-3 pr-4">{order.beat_title}</td>
                <td className="py-3 pr-4 text-muted-foreground">
                  {order.licence_type} · ${order.price_cad}
                </td>
                <td className="py-3 pr-4 text-muted-foreground">{order.licensee_email}</td>
                <td className="py-3 pr-4 text-muted-foreground">{order.status}</td>
                <td className="py-3 text-muted-foreground">
                  {order.created_at ? new Date(order.created_at).toLocaleDateString("en-CA") : ""}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {orders.length === 0 ? <p className="mt-4 text-sm text-muted-foreground">No orders yet.</p> : null}
      </div>
    </div>
  );
}
