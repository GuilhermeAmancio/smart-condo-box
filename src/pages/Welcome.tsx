import { useNavigate } from "react-router-dom";
import { ClipboardList, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import nexboxIcon from "@/assets/nexbox-icon.png";

export default function Welcome() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-primary/5 to-background px-4">
      <div className="flex flex-col items-center gap-6 max-w-sm w-full">
        <img
          src={nexboxIcon}
          alt="Nexbox"
          className="h-28 w-28 drop-shadow-lg"
        />
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold tracking-tight text-foreground">
            Nexbox
          </h1>
          <p className="text-muted-foreground text-sm">
            Gestão inteligente de encomendas para o seu condomínio
          </p>
        </div>

        <div className="w-full space-y-3 pt-4">
          <Button
            className="w-full h-14 text-base gap-3"
            onClick={() => navigate("/gestao")}>
            <ClipboardList className="h-5 w-5" />
            Entrar como Gestão
          </Button>
          <Button
            variant="outline"
            className="w-full h-14 text-base gap-3"
            onClick={() => navigate("/morador")}
          >
            <User className="h-5 w-5" />
            Entrar como Morador
          </Button>
        </div>

        <p className="text-xs text-muted-foreground/60 pt-6">
          © {new Date().getFullYear()} Nexbox — Todos os direitos reservados
        </p>
      </div>
    </div>
  );
}
