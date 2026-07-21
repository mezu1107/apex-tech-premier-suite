import { createFileRoute } from "@tanstack/react-router";
import { CrudTable } from "@/components/admin/CrudTable";

export const Route = createFileRoute("/_authenticated/admin/services")({
  component: () => (
    <CrudTable
      table="services"
      title="Services"
      orderBy={{ column: "sort_order", ascending: true }}
      fields={[
        { name: "title", label: "Title", type: "text", required: true },
        { name: "description", label: "Description", type: "textarea", required: true },
        { name: "icon", label: "Icon (lucide name)", type: "text", placeholder: "e.g. Code2, Sparkles, Bot" },
        { name: "tags", label: "Tags", type: "tags", placeholder: "Comma separated" },
        { name: "gradient", label: "Gradient", type: "select", options: ["light", "teal", "dark", "lime", "mesh"] },
        { name: "sort_order", label: "Sort order", type: "number" },
        { name: "featured", label: "Featured", type: "boolean" },
        { name: "published", label: "Published", type: "boolean" },
      ]}
      listColumns={[
        { key: "title", label: "Title" },
        { key: "gradient", label: "Style" },
        { key: "sort_order", label: "Order" },
        { key: "featured", label: "Featured", render: (r) => (r.featured ? "★" : "") },
        { key: "published", label: "Live", render: (r) => (r.published ? "✓" : "—") },
      ]}
    />
  ),
});