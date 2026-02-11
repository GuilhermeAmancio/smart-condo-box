import { PackageStatus } from "@/data/packages";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

const config: Record<PackageStatus, { label: string; className: string }> = {
  recebido: { label: "Recebido", className: "bg-info text-info-foreground" },
  notificado: { label: "Notificado", className: "bg-warning text-warning-foreground" },
  retirado: { label: "Retirado", className: "bg-success text-success-foreground" },
};

export default function StatusBadge({ status }: { status: PackageStatus }) {
  const { label, className } = config[status];
  return <Badge className={cn("text-xs font-semibold", className)}>{label}</Badge>;
}
