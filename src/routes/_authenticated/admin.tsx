import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { useEffect, useState } from "react";
import * as XLSX from "xlsx";
import { Download, LogOut, Users, AlertTriangle, ArrowLeft, Search, Lock, Unlock, Trash2, ChevronLeft, ChevronRight } from "lucide-react";
import { listRegistrations, getPortalStatus, togglePortalStatus, deleteRegistration } from "@/lib/admin.functions";
import { supabase } from "@/integrations/supabase/client";

export const Route = createFileRoute("/_authenticated/admin")({
  head: () => ({ meta: [{ title: "Admin — INSPIRE 1.0 Registrations" }] }),
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

const CAPACITY = 300;

function AdminPage() {
  const navigate = useNavigate();
  const fetchRows = useServerFn(listRegistrations);
  const getStatus = useServerFn(getPortalStatus);
  const toggleStatus = useServerFn(togglePortalStatus);
  const delRegistration = useServerFn(deleteRegistration);
  const [rows, setRows] = useState<Row[] | null>(null);
  const [isOpen, setIsOpen] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [toggling, setToggling] = useState(false);

  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 50;

  // Reset page when search changes
  useEffect(() => {
    setCurrentPage(1);
  }, [search]);

  useEffect(() => {
    Promise.all([fetchRows(), getStatus()])
      .then(([r, s]) => {
        setRows(r.rows as Row[]);
        setIsOpen(s.isOpen);
      })
      .catch((e: unknown) => setError(e instanceof Error ? e.message : "Failed to load"))
      .finally(() => setLoading(false));
  }, [fetchRows, getStatus]);

  const handleTogglePortal = async () => {
    if (toggling) return;
    setToggling(true);
    try {
      const res = await toggleStatus();
      setIsOpen(res.isOpen);
    } catch (e: unknown) {
      alert(e instanceof Error ? e.message : "Failed to toggle portal status");
    } finally {
      setToggling(false);
    }
  };

  const filteredRows = rows?.filter((r) => {
    const term = search.toLowerCase();
    return (
      r.full_name?.toLowerCase().includes(term) ||
      r.email?.toLowerCase().includes(term) ||
      r.phone?.toLowerCase().includes(term)
    );
  }) || [];

  const totalPages = Math.max(1, Math.ceil(filteredRows.length / rowsPerPage));
  const paginatedRows = filteredRows.slice((currentPage - 1) * rowsPerPage, currentPage * rowsPerPage);

  const handleDelete = async (id: string, name: string) => {
    if (!confirm(`Are you sure you want to delete the registration for ${name}?`)) return;
    try {
      await delRegistration({ data: { id } });
      setRows((prev) => prev?.filter(r => r.id !== id) || null);
    } catch (e: unknown) {
      alert(e instanceof Error ? e.message : "Failed to delete");
    }
  };

  const download = () => {
    const dataToExport = filteredRows;
    if (dataToExport.length === 0) return;
    const data = dataToExport.map((r, i) => ({
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
          INSPIRE 1.0 <span className="text-mint">Registrations</span>
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

            <div className="mt-8 flex flex-wrap items-center justify-between gap-4">
              <div className="relative max-w-sm w-full flex-1">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Search by name, email, or phone..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full rounded-full border border-border bg-card/50 py-2.5 pl-9 pr-4 text-sm outline-none transition-colors focus:border-mint focus:bg-card"
                />
              </div>
              <div className="flex flex-wrap items-center gap-3">
                <button onClick={handleTogglePortal} disabled={toggling}
                  className={`inline-flex items-center gap-2 rounded-full px-6 py-3 font-semibold shadow-sm disabled:opacity-50 whitespace-nowrap transition-colors ${isOpen ? "bg-card border border-border hover:border-flame hover:text-flame" : "bg-mint text-mint-foreground hover:opacity-90"}`}>
                  {isOpen ? <Lock className="h-4 w-4" /> : <Unlock className="h-4 w-4" />}
                  {isOpen ? "Close Portal" : "Open Portal"}
                </button>
                <button onClick={download} disabled={taken === 0}
                  className="inline-flex items-center gap-2 rounded-full bg-mint px-6 py-3 font-semibold text-mint-foreground shadow-mint disabled:opacity-50 whitespace-nowrap hover:opacity-90 transition-opacity">
                  <Download className="h-4 w-4" /> Download Excel (.xlsx)
                </button>
              </div>
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
                    <th className="px-4 py-3 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {paginatedRows.map((r, i) => (
                    <tr key={r.id} className="hover:bg-card/40">
                      <td className="px-4 py-3 text-muted-foreground">{(currentPage - 1) * rowsPerPage + i + 1}</td>
                      <td className="px-4 py-3 font-medium">{r.full_name}</td>
                      <td className="px-4 py-3">{r.email}</td>
                      <td className="px-4 py-3">{r.phone}</td>
                      <td className="px-4 py-3 text-muted-foreground">
                        {new Date(r.created_at).toLocaleDateString()}
                      </td>
                      <td className="px-4 py-3 text-right">
                        <button onClick={() => handleDelete(r.id, r.full_name)}
                          className="p-1.5 text-muted-foreground hover:text-flame hover:bg-flame/10 rounded-md transition-colors"
                          title="Delete registration">
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
                  {filteredRows.length === 0 && search && (
                    <tr><td colSpan={6} className="px-4 py-10 text-center text-muted-foreground">
                      <Search className="h-5 w-5 inline mr-2" />No registrations match your search.
                    </td></tr>
                  )}
                  {rows.length === 0 && !search && (
                    <tr><td colSpan={6} className="px-4 py-10 text-center text-muted-foreground">
                      <Users className="h-5 w-5 inline mr-2" />No registrations yet.
                    </td></tr>
                  )}
                </tbody>
              </table>
            </div>

            {totalPages > 1 && (
              <div className="mt-4 flex items-center justify-between text-sm">
                <p className="text-muted-foreground">
                  Showing <span className="font-medium text-foreground">{(currentPage - 1) * rowsPerPage + 1}</span> to <span className="font-medium text-foreground">{Math.min(currentPage * rowsPerPage, filteredRows.length)}</span> of <span className="font-medium text-foreground">{filteredRows.length}</span> results
                </p>
                <div className="flex items-center gap-2">
                  <button onClick={() => setCurrentPage(p => Math.max(1, p - 1))} disabled={currentPage === 1}
                    className="p-2 rounded-md border border-border bg-card hover:bg-card/80 disabled:opacity-50 transition-colors">
                    <ChevronLeft className="h-4 w-4" />
                  </button>
                  <span className="font-medium">Page {currentPage} of {totalPages}</span>
                  <button onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))} disabled={currentPage === totalPages}
                    className="p-2 rounded-md border border-border bg-card hover:bg-card/80 disabled:opacity-50 transition-colors">
                    <ChevronRight className="h-4 w-4" />
                  </button>
                </div>
              </div>
            )}
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
