import { createFileRoute, Link, Outlet, redirect } from "@tanstack/react-router";
import { isAdmin } from "@/lib/admin";

export const Route = createFileRoute("/_authenticated/admin")({
  beforeLoad: async () => {
    if (!(await isAdmin())) throw redirect({ to: "/" });
  },
  head: () => ({
    meta: [{ title: "Admin — LifeOfLuv" }, { name: "robots", content: "noindex" }],
  }),
  component: AdminLayout,
});

function AdminLayout() {
  return (
    <section className="mx-auto max-w-6xl px-5 py-12">
      <p className="eyebrow">Admin</p>
      <nav className="mt-4 flex flex-wrap gap-6 text-sm">
        <Link to="/admin" activeOptions={{ exact: true }} className="hover:text-foreground text-muted-foreground" activeProps={{ className: "text-foreground" }}>
          Dashboard
        </Link>
        <Link to="/admin/beats" className="hover:text-foreground text-muted-foreground" activeProps={{ className: "text-foreground" }}>
          Beats
        </Link>
        <Link to="/admin/orders" className="hover:text-foreground text-muted-foreground" activeProps={{ className: "text-foreground" }}>
          Orders
        </Link>
      </nav>
      <div className="hairline my-8" />
      <Outlet />
    </section>
  );
}
