import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { PackageProvider } from "@/contexts/PackageContext";
import AppLayout from "@/components/layout/AppLayout";
import Welcome from "@/pages/Welcome";
import Dashboard from "@/pages/Dashboard";
import Register from "@/pages/Register";
import Resident from "@/pages/Resident";
import Admin from "@/pages/Admin";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <PackageProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Welcome />} />
            <Route
              path="/*"
              element={
                <AppLayout>
                  <Routes>
                    <Route path="/gestao" element={<Dashboard />} />
                    <Route path="/registrar" element={<Register />} />
                    <Route path="/morador" element={<Resident />} />
                    <Route path="/admin" element={<Admin />} />
                    <Route path="*" element={<NotFound />} />
                  </Routes>
                </AppLayout>
              }
            />
          </Routes>
        </BrowserRouter>
      </PackageProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
