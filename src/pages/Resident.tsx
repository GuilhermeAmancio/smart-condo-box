import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Label } from "@/components/ui/label";
import { usePackages } from "@/contexts/PackageContext";
import { blocks, apartments } from "@/data/packages";
import StatusBadge from "@/components/StatusBadge";
import { QRCodeSVG } from "qrcode.react";
import { Package, History, QrCode } from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import { ptBR } from "date-fns/locale";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

export default function Resident() {
  const { packages } = usePackages();
  const [block, setBlock] = useState("A");
  const [apartment, setApartment] = useState("101");

  const myPackages = packages.filter((p) => p.block === block && p.apartment === apartment);
  const pending = myPackages.filter((p) => p.status !== "retirado");
  const history = myPackages.filter((p) => p.status === "retirado");

  return (
    <div className="space-y-6 pb-20 md:pb-0">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Minhas Encomendas</h1>
        <p className="text-muted-foreground text-sm">Visualize e retire suas encomendas</p>
      </div>

      {/* Resident selector */}
      <div className="flex gap-3 items-end">
        <div className="space-y-1">
          <Label className="text-xs">Bloco</Label>
          <Select value={block} onValueChange={setBlock}>
            <SelectTrigger className="w-24"><SelectValue /></SelectTrigger>
            <SelectContent>
              {blocks.map((b) => <SelectItem key={b} value={b}>Bloco {b}</SelectItem>)}
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-1">
          <Label className="text-xs">Apto</Label>
          <Select value={apartment} onValueChange={setApartment}>
            <SelectTrigger className="w-24"><SelectValue /></SelectTrigger>
            <SelectContent>
              {apartments.map((a) => <SelectItem key={a} value={a}>{a}</SelectItem>)}
            </SelectContent>
          </Select>
        </div>
      </div>

      <Tabs defaultValue="pending">
        <TabsList className="w-full">
          <TabsTrigger value="pending" className="flex-1 gap-1">
            <Package className="h-4 w-4" /> Pendentes ({pending.length})
          </TabsTrigger>
          <TabsTrigger value="history" className="flex-1 gap-1">
            <History className="h-4 w-4" /> Histórico ({history.length})
          </TabsTrigger>
        </TabsList>

        <TabsContent value="pending" className="space-y-3 mt-4">
          {pending.length === 0 ? (
            <Card><CardContent className="p-8 text-center text-muted-foreground">Nenhuma encomenda pendente.</CardContent></Card>
          ) : pending.map((pkg) => (
            <Card key={pkg.id}>
              <CardContent className="p-4 flex items-center justify-between gap-3">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-semibold text-sm">{pkg.id}</span>
                    <StatusBadge status={pkg.status} />
                  </div>
                  <p className="text-sm">{pkg.carrier} · {pkg.volumeType}</p>
                  <p className="text-xs text-muted-foreground">{formatDistanceToNow(new Date(pkg.receivedAt), { addSuffix: true, locale: ptBR })}</p>
                </div>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button size="sm" variant="outline">
                      <QrCode className="h-4 w-4 mr-1" />
                      QR Code
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-xs">
                    <DialogHeader>
                      <DialogTitle>QR Code de Retirada</DialogTitle>
                    </DialogHeader>
                    <div className="flex flex-col items-center gap-4 py-4">
                      <QRCodeSVG
                        value={JSON.stringify({ id: pkg.id, block: pkg.block, apt: pkg.apartment })}
                        size={200}
                        level="H"
                      />
                      <p className="text-sm text-muted-foreground text-center">
                        Apresente este QR Code na portaria para retirar o pacote <span className="font-semibold">{pkg.id}</span>
                      </p>
                    </div>
                  </DialogContent>
                </Dialog>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="history" className="space-y-3 mt-4">
          {history.length === 0 ? (
            <Card><CardContent className="p-8 text-center text-muted-foreground">Nenhum histórico encontrado.</CardContent></Card>
          ) : history.map((pkg) => (
            <Card key={pkg.id} className="opacity-75">
              <CardContent className="p-4">
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-semibold text-sm">{pkg.id}</span>
                  <StatusBadge status={pkg.status} />
                </div>
                <p className="text-sm">{pkg.carrier} · {pkg.volumeType}</p>
                <p className="text-xs text-muted-foreground">
                  Retirado {pkg.pickedUpAt && formatDistanceToNow(new Date(pkg.pickedUpAt), { addSuffix: true, locale: ptBR })}
                </p>
              </CardContent>
            </Card>
          ))}
        </TabsContent>
      </Tabs>
    </div>
  );
}
