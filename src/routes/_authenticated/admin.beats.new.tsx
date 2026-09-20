import { createFileRoute } from "@tanstack/react-router";
import { BeatForm } from "@/components/admin/beat-form";

export const Route = createFileRoute("/_authenticated/admin/beats/new")({
  component: () => (
    <div>
      <h1 className="mb-6 text-3xl">Add a beat</h1>
      <BeatForm />
    </div>
  ),
});
