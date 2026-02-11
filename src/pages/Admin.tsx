import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { usePackages } from "@/contexts/PackageContext";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from "recharts";
import { Package, Clock, TrendingUp } from "lucide-react";

export default function Admin() {
  const { packages } = usePackages();

  // Deliveries per day (last 7 days)
  const dayMap = new Map<string, number>();
  const now = new Date();
  for (let i = 6; i >= 0; i--) {
    const d = new Date(now);
    d.setDate(d.getDate() - i);
    const key = d.toLocaleDateString("pt-BR", { weekday: "short", day: "2-digit" });
    dayMap.set(key, 0);
  }
  packages.forEach((p) => {
    const d = new Date(p.receivedAt);
    const key = d.toLocaleDateString("pt-BR", { weekday: "short", day: "2-digit" });
    if (dayMap.has(key)) dayMap.set(key, (dayMap.get(key) || 0) + 1);
  });
  const dailyData = Array.from(dayMap.entries()).map(([name, entregas]) => ({ name, entregas }));

  // Average pickup time
  const picked = packages.filter((p) => p.pickedUpAt && p.receivedAt);
  const avgHours = picked.length
    ? Math.round(picked.reduce((sum, p) => sum + (new Date(p.pickedUpAt!).getTime() - new Date(p.receivedAt).getTime()) / 3600000, 0) / picked.length)
    : 0;

  const pickupData = [
    { name: "Seg", horas: 3 },
    { name: "Ter", horas: 5 },
    { name: "Qua", horas: 2 },
    { name: "Qui", horas: 4 },
    { name: "Sex", horas: 6 },
    { name: "Sáb", horas: 1 },
    { name: "Dom", horas: 2 },
  ];

  return (
    <div className="space-y-6 pb-20 md:pb-0">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Painel Administrativo</h1>
        <p className="text-muted-foreground text-sm">Estatísticas do condomínio</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-3">
        <Card>
          <CardContent className="p-4 flex items-center gap-3">
            <div className="rounded-full p-2 bg-primary/10">
              <Package className="h-5 w-5 text-primary" />
            </div>
            <div>
              <p className="text-2xl font-bold">{packages.length}</p>
              <p className="text-xs text-muted-foreground">Total</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 flex items-center gap-3">
            <div className="rounded-full p-2 bg-warning/10">
              <Clock className="h-5 w-5 text-warning" />
            </div>
            <div>
              <p className="text-2xl font-bold">{avgHours}h</p>
              <p className="text-xs text-muted-foreground">Média retirada</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 flex items-center gap-3">
            <div className="rounded-full p-2 bg-success/10">
              <TrendingUp className="h-5 w-5 text-success" />
            </div>
            <div>
              <p className="text-2xl font-bold">{picked.length}</p>
              <p className="text-xs text-muted-foreground">Retirados</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Entregas por Dia</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={dailyData}>
              <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
              <XAxis dataKey="name" className="text-xs" />
              <YAxis allowDecimals={false} className="text-xs" />
              <Tooltip />
              <Bar dataKey="entregas" fill="hsl(213, 55%, 24%)" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">Tempo Médio de Retirada (horas)</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={pickupData}>
              <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
              <XAxis dataKey="name" className="text-xs" />
              <YAxis className="text-xs" />
              <Tooltip />
              <Line type="monotone" dataKey="horas" stroke="hsl(142, 71%, 45%)" strokeWidth={2} dot={{ r: 4 }} />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
}
