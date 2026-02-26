import type { TreeNodeResponse } from "@/types/tree";
import { EmptyNode } from "./empty-node";

const STATUS_LABELS: Record<string, { label: string; color: string }> = {
  active: { label: "Activo", color: "bg-green-50 text-green-700" },
  pending: { label: "Pendiente", color: "bg-yellow-50 text-yellow-700" },
  inactive: { label: "Inactivo", color: "bg-red-50 text-red-700" },
  suspended: { label: "Suspendido", color: "bg-orange-50 text-orange-700" },
  cancelled: { label: "Cancelado", color: "bg-gray-100 text-gray-600" },
};

const RANK_LABELS: Record<string, string> = {
  affiliate: "Afiliado",
  bronze: "Bronce",
  silver: "Plata",
  gold: "Oro",
  platinum: "Platino",
  diamond: "Diamante",
  double_diamond: "Doble Diamante",
  crown: "Corona",
  royal_crown: "Corona Real",
  ambassador: "Embajador",
};

function formatBV(value: string) {
  return Number(value).toLocaleString("es-SV", { maximumFractionDigits: 0 });
}

interface TreeNodeProps {
  node: TreeNodeResponse;
  depth: number;
  onNodeClick: (node: TreeNodeResponse) => void;
}

function NodeCard({
  node,
  onNodeClick,
}: {
  node: TreeNodeResponse;
  onNodeClick: (node: TreeNodeResponse) => void;
}) {
  const st = STATUS_LABELS[node.status] ?? {
    label: node.status,
    color: "bg-gray-100 text-gray-600",
  };

  return (
    <button
      onClick={() => onNodeClick(node)}
      className="w-44 rounded-lg border border-border bg-card px-3 py-3 text-left shadow-sm transition-all hover:border-primary hover:shadow-md"
    >
      <p className="truncate font-mono text-xs text-primary">
        {node.affiliate_code}
      </p>
      <p className="mt-0.5 truncate text-sm font-medium text-foreground">
        {node.full_name}
      </p>
      <div className="mt-1.5 flex items-center gap-1.5">
        <span
          className={`inline-block rounded-full px-1.5 py-0.5 text-[10px] font-medium ${st.color}`}
        >
          {st.label}
        </span>
        <span className="text-[10px] text-muted-foreground">
          {RANK_LABELS[node.current_rank] ?? node.current_rank}
        </span>
      </div>
      <div className="mt-1.5 flex gap-1 text-[10px] text-muted-foreground">
        <span>Izq: {formatBV(node.bv_left_total)}</span>
        <span className="text-border">|</span>
        <span>Der: {formatBV(node.bv_right_total)}</span>
      </div>
    </button>
  );
}

export function TreeNode({ node, depth, onNodeClick }: TreeNodeProps) {
  const hasChildren = depth > 0;

  return (
    <div className="flex flex-col items-center">
      <NodeCard node={node} onNodeClick={onNodeClick} />

      {hasChildren && (
        <>
          {/* Vertical connector from parent */}
          <div className="h-5 w-px bg-border" />

          {/* Horizontal connector bar */}
          <div className="flex w-full items-start">
            <div className="w-1/2 border-r border-t border-border" style={{ height: 1 }} />
            <div className="w-1/2 border-l border-t border-border" style={{ height: 1 }} />
          </div>

          {/* Children */}
          <div className="flex w-full">
            {/* Left child */}
            <div className="flex flex-1 flex-col items-center">
              <div className="h-5 w-px bg-border" />
              {node.left_child ? (
                <TreeNode
                  node={node.left_child}
                  depth={depth - 1}
                  onNodeClick={onNodeClick}
                />
              ) : (
                <EmptyNode />
              )}
            </div>

            {/* Right child */}
            <div className="flex flex-1 flex-col items-center">
              <div className="h-5 w-px bg-border" />
              {node.right_child ? (
                <TreeNode
                  node={node.right_child}
                  depth={depth - 1}
                  onNodeClick={onNodeClick}
                />
              ) : (
                <EmptyNode />
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
