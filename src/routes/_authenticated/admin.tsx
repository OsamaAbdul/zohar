import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { useEffect, useState } from "react";
import * as XLSX from "xlsx";
import { Download, LogOut, Users, AlertTriangle, ArrowLeft } from "lucide-react";
import { listRegistrations } from "@/lib/admin.functions";
import { supabase } from "@/integrations/supabase/client";

export const Route = createFileRoute("/_authenticated/admin")({
  head: () => ({ meta: [{ title: "Admin — INSPIRED 2026 Registrations" }] }),
  component: AdminPage,
});

type Row = {
  id: string;
  full_name: string;
  email: string;
  phone: string;
  gender: string | null;
  age_range: string | null;
  occupation: string | null;
  organization: string | null;
  state: string | null;
  motivation: string | null;
  heard_from: string | null;
  created_at: string;
};

const CAPACITY = 100;

function AdminPage() {
  const navigate = useNavigate();
  const fetchRows = useServerFn(listRegistrations);
  const [rows, setRows] = useState<Row[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchRows()
      .then((r) => setRows(r.rows as Row[]))
      .catch((e: unknown) => setError(e instanceof Error ? e.message : "Failed to load"))
      .finally(() => setLoading(false));
  }, [fetchRows]);

  const download = () => {
    if (!rows) return;
    const data = rows.map((r, i) => ({
      "#": i + 1,
      "Full Name": r.full_name,
      Email: r.email,
      Phone: r.phone,
      Gender: r.gender ?? "",
      "Age Range": r.age_range ?? "",
      Occupation: r.occupation ?? "",
      Organization: r.organization ?? "",
      State: r.state ?? "",
      "Why Attend": r.motivation ?? "",
      "Heard From": r.heard_from ?? "",
      "Registered At": new Date(r.created_at).toLocaleString(),
    }));
    const ws = XLSX.utils.json_to_sheet(data);
    ws["!cols"] = [
      { wch: 4 }, { wch: 24 }, { wch: 28 }, { wch: 18 }, { wch: 10 },
      { wch: 10 }, { wch: 20 }, { wch: 24 }, { wch: 16 }, { wch: 50 },
      { wch: 14 }, { wch: 20 },
    ];
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Registrations");
    const stamp = new Date().toISOString().split("T")[0];
    XLSX.writeFile(wb, `inspired-2026-registrations-${stamp}.xlsx`);
  };

  const signOut = async () => {
    await supabase.auth.signOut();
    navigate({ to: "/auth" });
  };

  const taken = rows?.length ?? 0;
  const remaining = Math.max(0, CAPACITY - taken);
  const isForbidden = error === "Forbidden";

  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="border-b border-border">
        <div className="mx-auto max-w-6xl px-5 h-16 flex items-center justify-between">
          <Link to="/" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground">
            <ArrowLeft className="h-4 w-4" /> Back to site
          </Link>
          <button onClick={signOut}
            className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground">
            <LogOut className="h-4 w-4" /> Sign out
          </button>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-5 py-12">
        <h1 className="font-display text-3xl sm:text-4xl font-bold">
          INSPIRED 2026 <span className="text-mint">Registrations</span>
        </h1>
        <p className="mt-2 text-muted-foreground">Download the complete attendee list as an Excel file.</p>

        {loading && <p className="mt-8 text-muted-foreground">Loading…</p>}

        {isForbidden && (
          <div className="mt-8 rounded-2xl border border-flame/40 bg-flame/10 p-6 flex gap-3">
            <AlertTriangle className="h-5 w-5 text-flame shrink-0 mt-0.5" />
            <div>
              <p className="font-semibold">Access denied</p>
              <p className="text-sm text-muted-foreground mt-1">
                Your account is signed in but is not an admin. Ask an organizer to grant
                the <code className="text-mint">admin</code> role to your user in the backend
                <code className="text-mint"> user_roles</code> table.
              </p>
            </div>
          </div>
        )}

        {error && !isForbidden && (
          <p className="mt-8 text-flame">Error: {error}</p>
        )}

        {rows && (
          <>
            <div className="mt-8 grid sm:grid-cols-3 gap-4">
              <Stat label="Registered" value={taken} />
              <Stat label="Remaining" value={remaining} />
              <Stat label="Capacity" value={CAPACITY} />
            </div>

            <div className="mt-8 flex flex-wrap gap-3">
              <button onClick={download} disabled={taken === 0}
                className="inline-flex items-center gap-2 rounded-full bg-mint px-6 py-3 font-semibold text-mint-foreground shadow-mint disabled:opacity-50">
                <Download className="h-4 w-4" /> Download Excel (.xlsx)
              </button>
            </div>

            <div className="mt-8 overflow-x-auto rounded-2xl border border-border">
              <table className="w-full text-sm">
                <thead className="bg-card/60 text-left text-xs uppercase tracking-wider text-muted-foreground">
                  <tr>
                    <th className="px-4 py-3">#</th>
                    <th className="px-4 py-3">Name</th>
                    <th className="px-4 py-3">Email</th>
                    <th className="px-4 py-3">Phone</th>
                    <th className="px-4 py-3">Registered</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {rows.map((r, i) => (
                    <tr key={r.id} className="hover:bg-card/40">
                      <td className="px-4 py-3 text-muted-foreground">{i + 1}</td>
                      <td className="px-4 py-3 font-medium">{r.full_name}</td>
                      <td className="px-4 py-3">{r.email}</td>
                      <td className="px-4 py-3">{r.phone}</td>
                      <td className="px-4 py-3 text-muted-foreground">
                        {new Date(r.created_at).toLocaleDateString()}
                      </td>
                    </tr>
                  ))}
                  {rows.length === 0 && (
                    <tr><td colSpan={5} className="px-4 py-10 text-center text-muted-foreground">
                      <Users className="h-5 w-5 inline mr-2" />No registrations yet.
                    </td></tr>
                  )}
                </tbody>
              </table>
            </div>
          </>
        )}
      </main>
    </div>
  );
}

function Stat({ label, value }: { label: string; value: number }) {
  return (
    <div className="rounded-2xl border border-border bg-card p-5">
      <div className="text-xs uppercase tracking-wider text-muted-foreground">{label}</div>
      <div className="mt-1 font-display text-3xl font-bold text-mint">{value}</div>
    </div>
  );
}
