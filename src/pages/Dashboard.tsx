import { useState } from "react";
import { Link } from "react-router-dom";
import { Plus, ScanLine, Package, Bell, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { usePackages } from "@/contexts/PackageContext";
import { blocks } from "@/data/packages";
import StatusBadge from "@/components/StatusBadge";
import { formatDistanceToNow } from "date-fns";
import { ptBR } from "date-fns/locale";
import ScannerDialog from "@/components/ScannerDialog";

export default function Dashboard() {
  const { packages, updateStatus } = usePackages();
  const [filterBlock, setFilterBlock] = useState<string>("all");
  const [scanOpen, setScanOpen] = useState(false);

  const pending = packages.filter((p) => p.status !== "retirado");
  const filtered = filterBlock === "all" ? pending : pending.filter((p) => p.block === filterBlock);

  const counts = {
    recebido: packages.filter((p) => p.status === "recebido").length,
    notificado: packages.filter((p) => p.status === "notificado").length,
    retirado: packages.filter((p) => p.status === "retirado").length,
  };

  return (
    <div className="space-y-6 pb-20 md:pb-0">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Portaria</h1>
          <p className="text-muted-foreground text-sm">Gestão de encomendas do condomínio</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={() => setScanOpen(true)}>
            <ScanLine className="h-4 w-4 mr-2" />
            Scan Etiqueta
          </Button>
          <Button asChild>
            <Link to="/registrar">
              <Plus className="h-4 w-4 mr-2" />
              Nova Encomenda
            </Link>
          </Button>
        </div>
      </div>

      {/* Counters */}
      <div className="grid grid-cols-3 gap-3">
        <Card>
          <CardContent className="flex items-center gap-3 p-4">
            <div className="rounded-full p-2 bg-info/10">
              <Package className="h-5 w-5 text-info" />
            </div>
            <div>
              <p className="text-2xl font-bold">{counts.recebido}</p>
              <p className="text-xs text-muted-foreground">Recebidos</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="flex items-center gap-3 p-4">
            <div className="rounded-full p-2 bg-warning/10">
              <Bell className="h-5 w-5 text-warning" />
            </div>
            <div>
              <p className="text-2xl font-bold">{counts.notificado}</p>
              <p className="text-xs text-muted-foreground">Notificados</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="flex items-center gap-3 p-4">
            <div className="rounded-full p-2 bg-success/10">
              <CheckCircle2 className="h-5 w-5 text-success" />
            </div>
            <div>
              <p className="text-2xl font-bold">{counts.retirado}</p>
              <p className="text-xs text-muted-foreground">Retirados</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filter */}
      <div className="flex items-center gap-2">
        <span className="text-sm font-medium">Filtrar bloco:</span>
        <Select value={filterBlock} onValueChange={setFilterBlock}>
          <SelectTrigger className="w-28">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todos</SelectItem>
            {blocks.map((b) => (
              <SelectItem key={b} value={b}>Bloco {b}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Feed */}
      <div className="space-y-3">
        {filtered.length === 0 && (
          <Card>
            <CardContent className="p-8 text-center text-muted-foreground">
              Nenhuma encomenda pendente.
            </CardContent>
          </Card>
        )}
        {filtered.map((pkg) => (
          <Card key={pkg.id} className="overflow-hidden">
            <CardContent className="p-4 flex items-center justify-between gap-4">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-semibold text-sm">{pkg.id}</span>
                  <StatusBadge status={pkg.status} />
                </div>
                <p className="text-sm truncate">{pkg.residentName} — Bloco {pkg.block}, Apto {pkg.apartment}</p>
                <p className="text-xs text-muted-foreground">{pkg.carrier} · {pkg.volumeType} · {formatDistanceToNow(new Date(pkg.receivedAt), { addSuffix: true, locale: ptBR })}</p>
              </div>
              <div className="flex gap-2 shrink-0">
                {pkg.status === "recebido" && (
                  <Button size="sm" variant="outline" onClick={() => updateStatus(pkg.id, "notificado")}>
                    <Bell className="h-3 w-3 mr-1" />
                    Notificar
                  </Button>
                )}
                {pkg.status === "notificado" && (
                  <Button size="sm" className="bg-success hover:bg-success/90 text-success-foreground" onClick={() => updateStatus(pkg.id, "retirado")}>
                    <CheckCircle2 className="h-3 w-3 mr-1" />
                    Retirado
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <ScannerDialog open={scanOpen} onOpenChange={setScanOpen} />
    </div>
  );
}
