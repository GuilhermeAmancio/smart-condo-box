import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ScanLine, Camera } from "lucide-react";

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function ScannerDialog({ open, onOpenChange }: Props) {
  const [scanning, setScanning] = useState(false);
  const [result, setResult] = useState<string | null>(null);

  useEffect(() => {
    if (!open) {
      setScanning(false);
      setResult(null);
    }
  }, [open]);

  const startScan = () => {
    setScanning(true);
    setResult(null);
    setTimeout(() => {
      setScanning(false);
      setResult("PKG-2024-BR3847261");
    }, 2500);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Camera className="h-5 w-5" />
            Scanner de Etiqueta
          </DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          {/* Simulated camera viewfinder */}
          <div className="relative aspect-video bg-foreground/5 rounded-lg overflow-hidden flex items-center justify-center border-2 border-dashed border-muted-foreground/30">
            {scanning ? (
              <div className="flex flex-col items-center gap-3">
                <div className="relative">
                  <ScanLine className="h-16 w-16 text-primary animate-pulse" />
                  <div className="absolute inset-0 border-2 border-primary/50 rounded animate-ping" />
                </div>
                <p className="text-sm text-muted-foreground animate-pulse">Escaneando etiqueta...</p>
              </div>
            ) : result ? (
              <div className="text-center space-y-2">
                <p className="text-sm text-muted-foreground">Código detectado:</p>
                <p className="text-lg font-mono font-bold text-primary">{result}</p>
              </div>
            ) : (
              <div className="flex flex-col items-center gap-2 text-muted-foreground">
                <Camera className="h-12 w-12" />
                <p className="text-sm">Aponte para a etiqueta do pacote</p>
              </div>
            )}
          </div>
          <Button className="w-full" onClick={startScan} disabled={scanning}>
            {scanning ? "Escaneando..." : "Iniciar Scan"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
