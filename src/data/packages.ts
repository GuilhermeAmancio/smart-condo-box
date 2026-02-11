export type PackageStatus = "recebido" | "notificado" | "retirado";

export interface Package {
  id: string;
  carrier: string;
  block: string;
  apartment: string;
  residentName: string;
  volumeType: string;
  status: PackageStatus;
  receivedAt: string;
  notifiedAt?: string;
  pickedUpAt?: string;
  photoUrl?: string;
}

export const carriers = [
  "Correios",
  "Sedex",
  "Jadlog",
  "DHL",
  "FedEx",
  "Loggi",
  "Mercado Livre",
  "Amazon",
  "Shopee",
  "Outro",
];

export const blocks = ["A", "B", "C", "D"];
export const apartments = ["101", "102", "201", "202", "301", "302", "401", "402"];
export const volumeTypes = ["Caixa Pequena", "Caixa Média", "Caixa Grande", "Envelope", "Sacola", "Outro"];

const now = new Date();
const h = (hoursAgo: number) => new Date(now.getTime() - hoursAgo * 3600000).toISOString();

export const initialPackages: Package[] = [
  { id: "PKG-001", carrier: "Correios", block: "A", apartment: "101", residentName: "Maria Silva", volumeType: "Caixa Pequena", status: "recebido", receivedAt: h(1) },
  { id: "PKG-002", carrier: "Mercado Livre", block: "A", apartment: "202", residentName: "João Santos", volumeType: "Caixa Média", status: "notificado", receivedAt: h(5), notifiedAt: h(4) },
  { id: "PKG-003", carrier: "Amazon", block: "B", apartment: "301", residentName: "Ana Oliveira", volumeType: "Envelope", status: "retirado", receivedAt: h(24), notifiedAt: h(23), pickedUpAt: h(20) },
  { id: "PKG-004", carrier: "Sedex", block: "C", apartment: "102", residentName: "Carlos Pereira", volumeType: "Caixa Grande", status: "notificado", receivedAt: h(3), notifiedAt: h(2) },
  { id: "PKG-005", carrier: "Shopee", block: "B", apartment: "201", residentName: "Fernanda Lima", volumeType: "Sacola", status: "recebido", receivedAt: h(0.5) },
  { id: "PKG-006", carrier: "Loggi", block: "D", apartment: "402", residentName: "Roberto Alves", volumeType: "Caixa Pequena", status: "retirado", receivedAt: h(48), notifiedAt: h(47), pickedUpAt: h(44) },
  { id: "PKG-007", carrier: "Jadlog", block: "A", apartment: "301", residentName: "Lucia Mendes", volumeType: "Caixa Média", status: "notificado", receivedAt: h(8), notifiedAt: h(7) },
  { id: "PKG-008", carrier: "Correios", block: "C", apartment: "201", residentName: "Pedro Costa", volumeType: "Envelope", status: "recebido", receivedAt: h(2) },
];
