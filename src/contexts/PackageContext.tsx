import React, { createContext, useContext, useState, useCallback } from "react";
import { Package, PackageStatus, initialPackages } from "@/data/packages";
import { toast } from "@/hooks/use-toast";

interface PackageContextType {
  packages: Package[];
  addPackage: (pkg: Omit<Package, "id" | "status" | "receivedAt">) => void;
  updateStatus: (id: string, status: PackageStatus) => void;
  getByResident: (block: string, apartment: string) => Package[];
}

const PackageContext = createContext<PackageContextType | null>(null);

export const usePackages = () => {
  const ctx = useContext(PackageContext);
  if (!ctx) throw new Error("usePackages must be used within PackageProvider");
  return ctx;
};

let counter = initialPackages.length + 1;

export const PackageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [packages, setPackages] = useState<Package[]>(initialPackages);

  const addPackage = useCallback((pkg: Omit<Package, "id" | "status" | "receivedAt">) => {
    const newPkg: Package = {
      ...pkg,
      id: `PKG-${String(counter++).padStart(3, "0")}`,
      status: "recebido",
      receivedAt: new Date().toISOString(),
    };
    setPackages((prev) => [newPkg, ...prev]);
    toast({ title: "📦 Encomenda Registrada", description: `${newPkg.id} para ${pkg.residentName} (${pkg.block}/${pkg.apartment})` });
  }, []);

  const updateStatus = useCallback((id: string, status: PackageStatus) => {
    setPackages((prev) =>
      prev.map((p) => {
        if (p.id !== id) return p;
        const updated = { ...p, status };
        if (status === "notificado") updated.notifiedAt = new Date().toISOString();
        if (status === "retirado") updated.pickedUpAt = new Date().toISOString();
        return updated;
      })
    );
    const label = status === "notificado" ? "🔔 Morador Notificado" : "✅ Encomenda Retirada";
    toast({ title: label, description: `Pacote ${id} atualizado.` });
  }, []);

  const getByResident = useCallback(
    (block: string, apartment: string) => packages.filter((p) => p.block === block && p.apartment === apartment),
    [packages]
  );

  return (
    <PackageContext.Provider value={{ packages, addPackage, updateStatus, getByResident }}>
      {children}
    </PackageContext.Provider>
  );
};
