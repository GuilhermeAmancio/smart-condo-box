import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { usePackages } from "@/contexts/PackageContext";
import { carriers, blocks, apartments, volumeTypes } from "@/data/packages";
import { PackagePlus, Upload } from "lucide-react";

export default function Register() {
  const { addPackage } = usePackages();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    carrier: "",
    block: "",
    apartment: "",
    residentName: "",
    volumeType: "",
  });

  const canSubmit = form.carrier && form.block && form.apartment && form.residentName && form.volumeType;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!canSubmit) return;
    addPackage(form);
    navigate("/");
  };

  return (
    <div className="max-w-lg mx-auto pb-20 md:pb-0">
      <h1 className="text-2xl font-bold tracking-tight mb-6 flex items-center gap-2">
        <PackagePlus className="h-6 w-6" />
        Registrar Encomenda
      </h1>
      <Card>
        <CardContent className="pt-6">
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-2">
              <Label>Transportadora</Label>
              <Select value={form.carrier} onValueChange={(v) => setForm({ ...form, carrier: v })}>
                <SelectTrigger><SelectValue placeholder="Selecione" /></SelectTrigger>
                <SelectContent>
                  {carriers.map((c) => <SelectItem key={c} value={c}>{c}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Bloco</Label>
                <Select value={form.block} onValueChange={(v) => setForm({ ...form, block: v })}>
                  <SelectTrigger><SelectValue placeholder="Bloco" /></SelectTrigger>
                  <SelectContent>
                    {blocks.map((b) => <SelectItem key={b} value={b}>Bloco {b}</SelectItem>)}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Apartamento</Label>
                <Select value={form.apartment} onValueChange={(v) => setForm({ ...form, apartment: v })}>
                  <SelectTrigger><SelectValue placeholder="Apto" /></SelectTrigger>
                  <SelectContent>
                    {apartments.map((a) => <SelectItem key={a} value={a}>{a}</SelectItem>)}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label>Nome do Morador</Label>
              <Input
                placeholder="Nome completo"
                value={form.residentName}
                onChange={(e) => setForm({ ...form, residentName: e.target.value })}
              />
            </div>

            <div className="space-y-2">
              <Label>Tipo de Volume</Label>
              <Select value={form.volumeType} onValueChange={(v) => setForm({ ...form, volumeType: v })}>
                <SelectTrigger><SelectValue placeholder="Selecione" /></SelectTrigger>
                <SelectContent>
                  {volumeTypes.map((v) => <SelectItem key={v} value={v}>{v}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Foto do Pacote (opcional)</Label>
              <div className="border-2 border-dashed rounded-lg p-6 flex flex-col items-center gap-2 text-muted-foreground cursor-pointer hover:border-primary/50 transition-colors">
                <Upload className="h-8 w-8" />
                <p className="text-sm">Clique para enviar foto</p>
              </div>
            </div>

            <Button type="submit" className="w-full" size="lg" disabled={!canSubmit}>
              Registrar Encomenda
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
