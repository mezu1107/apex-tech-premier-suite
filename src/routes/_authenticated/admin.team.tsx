import { createFileRoute } from "@tanstack/react-router";
import { CrudTable } from "@/components/admin/CrudTable";

export const Route = createFileRoute("/_authenticated/admin/team")({
  component: () => (
    <CrudTable
      table="team_members"
      title="Team members"
      orderBy={{ column: "sort_order", ascending: true }}
      fields={[
        { name: "name", label: "Name", type: "text", required: true },
        { name: "role_title", label: "Role", type: "text" },
        { name: "bio", label: "Bio", type: "textarea" },
        { name: "photo_url", label: "Photo", type: "image" },
        { name: "email", label: "Email", type: "text" },
        { name: "linkedin_url", label: "LinkedIn URL", type: "text" },
        { name: "twitter_url", label: "Twitter URL", type: "text" },
        { name: "sort_order", label: "Sort order", type: "number" },
        { name: "published", label: "Published", type: "boolean" },
      ]}
      listColumns={[
        { key: "name", label: "Name" },
        { key: "role_title", label: "Role" },
        { key: "sort_order", label: "Order" },
        { key: "published", label: "Live", render: (r) => (r.published ? "✓" : "—") },
      ]}
    />
  ),
});