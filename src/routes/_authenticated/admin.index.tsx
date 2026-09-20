import { createFileRoute, Link } from "@tanstack/react-router";
import { listAllBeats, listOrders } from "@/lib/admin";

export const Route = createFileRoute("/_authenticated/admin/")({
  loader: async () => {
    const [beats, orders] = await Promise.all([listAllBeats(), listOrders()]);
    return { beats, orders };
  },
  component: Dashboard,
});

function Dashboard() {
  const { beats, orders } = Route.useLoaderData();
  const paid = orders.filter((o) => o.status === "paid");
  const revenue = paid.reduce((sum, o) => sum + o.price_cad, 0);

  return (
    <div>
      <div className="grid gap-4 sm:grid-cols-3">
        <div className="velvet-panel rounded-lg p-5">
          <p className="eyebrow">Beats</p>
          <p className="mt-2 text-3xl">{beats.length}</p>
        </div>
        <div className="velvet-panel rounded-lg p-5">
          <p className="eyebrow">Paid orders</p>
          <p className="mt-2 text-3xl">{paid.length}</p>
        </div>
        <div className="velvet-panel rounded-lg p-5">
          <p className="eyebrow">Revenue (CAD)</p>
          <p className="mt-2 text-3xl">${revenue}</p>
        </div>
      </div>
      <div className="mt-8 flex gap-3">
        <Link to="/admin/beats/new" className="btn-base btn-platinum">
          Add a beat
        </Link>
        <Link to="/admin/orders" className="btn-base btn-ghost">
          View orders
        </Link>
      </div>
    </div>
  );
}
