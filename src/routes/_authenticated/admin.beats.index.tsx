import { createFileRoute, Link, useRouter } from "@tanstack/react-router";
import { useState } from "react";
import { deleteBeat, listAllBeats, type BeatRow } from "@/lib/admin";

export const Route = createFileRoute("/_authenticated/admin/beats/")({
  loader: () => listAllBeats(),
  component: BeatsAdmin,
});

function BeatsAdmin() {
  const beats = Route.useLoaderData();
  const router = useRouter();
  const [error, setError] = useState("");

  async function remove(beat: BeatRow) {
    if (!window.confirm(`Delete "${beat.title}" and its files? This can't be undone.`)) return;
    try {
      await deleteBeat(beat);
      await router.invalidate();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not delete.");
    }
  }

  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="text-3xl">Beats</h1>
        <Link to="/admin/beats/new" className="btn-base btn-platinum">
          Add a beat
        </Link>
      </div>
      {error ? <p className="mt-4 text-sm text-destructive">{error}</p> : null}
      <div className="mt-6 overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead className="eyebrow">
            <tr>
              <th className="py-2 pr-4">Title</th>
              <th className="py-2 pr-4">BPM / Key</th>
              <th className="py-2 pr-4">Status</th>
              <th className="py-2" />
            </tr>
          </thead>
          <tbody>
            {beats.map((beat) => (
              <tr key={beat.slug} className="border-t border-border">
                <td className="py-3 pr-4">{beat.title}</td>
                <td className="py-3 pr-4 text-muted-foreground">
                  {beat.bpm} · {beat.key}
                </td>
                <td className="py-3 pr-4 text-muted-foreground">
                  {beat.exclusive_sold ? "Exclusive sold" : "Available"}
                </td>
                <td className="space-x-4 py-3 text-right">
                  <Link to="/admin/beats/$slug" params={{ slug: beat.slug }} className="underline">
                    Edit
                  </Link>
                  <button type="button" className="text-destructive underline" onClick={() => remove(beat)}>
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
