import { useEffect, useState, useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Loader2, ChevronRight } from "lucide-react";
import { getAffiliates, getAffiliateTree } from "@/api/affiliates";
import type { AffiliateListItem } from "@/types/affiliate";
import type { TreeNodeResponse } from "@/types/tree";
import { TreeNode } from "./tree-node";

interface BreadcrumbItem {
  id: string;
  label: string;
}

export function TreePage() {
  const { affiliateId } = useParams<{ affiliateId: string }>();
  const navigate = useNavigate();

  const [affiliates, setAffiliates] = useState<AffiliateListItem[]>([]);
  const [tree, setTree] = useState<TreeNodeResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [loadingList, setLoadingList] = useState(false);
  const [error, setError] = useState("");
  const [depth, setDepth] = useState(3);
  const [breadcrumb, setBreadcrumb] = useState<BreadcrumbItem[]>([]);

  // Load affiliates list for selector
  useEffect(() => {
    if (!affiliateId) {
      setLoadingList(true);
      getAffiliates()
        .then(setAffiliates)
        .catch(() => setError("Error al cargar distribuidores"))
        .finally(() => setLoadingList(false));
    }
  }, [affiliateId]);

  const fetchTree = useCallback(
    async (id: string, d: number) => {
      setLoading(true);
      setError("");
      try {
        const data = await getAffiliateTree(id, d);
        setTree(data);
      } catch {
        setError("Error al cargar el árbol");
        setTree(null);
      } finally {
        setLoading(false);
      }
    },
    []
  );

  // Fetch tree when affiliateId or depth changes
  useEffect(() => {
    if (affiliateId) {
      fetchTree(affiliateId, depth);
    }
  }, [affiliateId, depth, fetchTree]);

  // Initialize breadcrumb when tree loads and breadcrumb is empty
  useEffect(() => {
    if (tree && breadcrumb.length === 0) {
      setBreadcrumb([{ id: tree.id, label: tree.affiliate_code }]);
    }
  }, [tree, breadcrumb.length]);

  function handleSelectAffiliate(id: string) {
    setBreadcrumb([]);
    navigate(`/network/tree/${id}`);
  }

  function handleNodeClick(node: TreeNodeResponse) {
    if (node.id === affiliateId) return;
    setBreadcrumb((prev) => [
      ...prev,
      { id: node.id, label: node.affiliate_code },
    ]);
    navigate(`/network/tree/${node.id}`);
  }

  function handleBreadcrumbClick(index: number) {
    const item = breadcrumb[index];
    setBreadcrumb((prev) => prev.slice(0, index + 1));
    navigate(`/network/tree/${item.id}`);
  }

  // Selector screen
  if (!affiliateId) {
    return (
      <div>
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-foreground">Árbol de Red</h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Selecciona un distribuidor para ver su árbol binario
          </p>
        </div>

        {loadingList ? (
          <div className="flex items-center justify-center py-20">
            <Loader2 className="h-6 w-6 animate-spin text-primary" />
          </div>
        ) : (
          <div className="rounded-xl border border-border bg-card p-4 shadow-sm">
            <select
              className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm text-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
              defaultValue=""
              onChange={(e) => handleSelectAffiliate(e.target.value)}
            >
              <option value="" disabled>
                — Seleccionar distribuidor —
              </option>
              {affiliates.map((a) => (
                <option key={a.id} value={a.id}>
                  {a.affiliate_code} — {a.full_name}
                </option>
              ))}
            </select>
          </div>
        )}

        {error && <p className="mt-4 text-sm text-destructive">{error}</p>}
      </div>
    );
  }

  // Tree view
  return (
    <div>
      <div className="mb-4">
        <h2 className="text-2xl font-bold text-foreground">Árbol de Red</h2>
      </div>

      {/* Breadcrumb */}
      {breadcrumb.length > 0 && (
        <nav className="mb-4 flex flex-wrap items-center gap-1 text-sm">
          <button
            onClick={() => {
              setBreadcrumb([]);
              navigate("/network/tree");
            }}
            className="text-primary hover:underline"
          >
            Seleccionar
          </button>
          {breadcrumb.map((item, i) => (
            <span key={item.id} className="flex items-center gap-1">
              <ChevronRight className="h-3.5 w-3.5 text-muted-foreground" />
              {i === breadcrumb.length - 1 ? (
                <span className="font-medium text-foreground">
                  {item.label}
                </span>
              ) : (
                <button
                  onClick={() => handleBreadcrumbClick(i)}
                  className="text-primary hover:underline"
                >
                  {item.label}
                </button>
              )}
            </span>
          ))}
        </nav>
      )}

      {/* Depth controls */}
      <div className="mb-4 flex items-center gap-2">
        <span className="text-sm text-muted-foreground">Profundidad:</span>
        {[1, 2, 3, 4, 5].map((d) => (
          <button
            key={d}
            onClick={() => setDepth(d)}
            className={`h-8 w-8 rounded-md text-sm font-medium transition-colors ${
              d === depth
                ? "bg-primary text-primary-foreground"
                : "border border-border bg-background text-foreground hover:bg-secondary"
            }`}
          >
            {d}
          </button>
        ))}
      </div>

      {error && <p className="mb-4 text-sm text-destructive">{error}</p>}

      {loading ? (
        <div className="flex items-center justify-center py-20">
          <Loader2 className="h-6 w-6 animate-spin text-primary" />
        </div>
      ) : tree ? (
        <div className="overflow-x-auto rounded-xl border border-border bg-card p-6 shadow-sm">
          <div className="inline-flex min-w-full justify-center">
            <TreeNode node={tree} depth={depth - 1} onNodeClick={handleNodeClick} />
          </div>
        </div>
      ) : null}
    </div>
  );
}
