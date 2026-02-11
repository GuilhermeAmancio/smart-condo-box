

# Nexbox - Gestão Inteligente de Encomendas em Condomínios

## Visão Geral
App mobile-first para gerenciar o fluxo de encomendas em condomínios, conectando porteiros e moradores com rastreamento em tempo real e interface profissional.

## Design System
- **Paleta**: Azul marinho profundo (#1e3a5f), branco, verde sucesso (#22c55e)
- **Estilo**: Shadcn/UI + Tailwind, minimalista, ícones Lucide React
- **Mobile-first**: Otimizado para tablet/smartphone do porteiro

---

## Páginas e Funcionalidades

### 1. Dashboard do Porteiro/Zelador
- Botão de destaque "Registrar Nova Encomenda"
- Feed de entregas pendentes com cards de status (Recebido → Notificado → Retirado)
- Filtros por bloco e apartamento
- Contadores rápidos: pendentes, notificadas, retiradas hoje
- Botão "Scan de Etiqueta" que abre interface simulada de câmera

### 2. Registro de Encomenda
- Formulário: Transportadora, Bloco/Apartamento, Tipo de Volume, Foto do pacote (upload)
- Interface simulada de scanner de etiqueta com visual de câmera
- Ao registrar, simula disparo de notificação SMS/Push com feedback visual (toast + animação)

### 3. Interface do Morador
- Lista de encomendas aguardando retirada com status visual
- Histórico de encomendas retiradas
- QR Code dinâmico gerado para cada encomenda (para retirada rápida na portaria)

### 4. Painel Administrativo
- Gráfico de volume de entregas por dia (Recharts)
- Gráfico de tempo médio de retirada
- Estatísticas gerais do condomínio

### 5. Navegação
- Sidebar/bottom nav com troca entre visões: Porteiro, Morador, Admin
- Header com logo Nexbox e indicador de perfil

---

## Dados e Lógica
- Dados mockados em memória (sem backend neste MVP)
- Sistema de status: **Recebido** → **Notificado** → **Retirado**
- Geração de QR Code dinâmico por encomenda
- Simulação de notificações com toasts visuais

