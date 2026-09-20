import { createFileRoute, notFound } from "@tanstack/react-router";
import { BeatForm } from "@/components/admin/beat-form";
import { getBeatRow } from "@/lib/admin";

export const Route = createFileRoute("/_authenticated/admin/beats/$slug")({
  loader: async ({ params }) => {
    const beat = await getBeatRow(params.slug);
    if (!beat) throw notFound();
    return beat;
  },
  component: EditBeat,
});

function EditBeat() {
  const beat = Route.useLoaderData();
  return (
    <div>
      <h1 className="mb-6 text-3xl">Edit {beat.title}</h1>
      <BeatForm initial={beat} />
    </div>
  );
}
