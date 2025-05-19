
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useAuth } from "@/contexts/AuthContext";
import { Link } from "react-router-dom";
import { Mail, Lock } from "lucide-react";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { signIn } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    await signIn(email, password);
    setIsLoading(false);
  };

  const handleForgotPassword = () => {
    // Navegar para a página de recuperação de senha
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl font-bold">Área do Cliente</CardTitle>
        <CardDescription>
          Entre com suas credenciais para acessar a área do cliente HiTech.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <div className="relative">
              <div className="absolute top-0 left-0 w-10 h-full flex items-center justify-center text-muted-foreground">
                <Mail size={18} />
              </div>
              <Input
                id="email"
                type="email"
                placeholder="seu@email.com"
                className="pl-10"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
          </div>
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="password">Senha</Label>
              <Button 
                variant="link" 
                className="px-0 text-xs text-primary" 
                onClick={handleForgotPassword}
                type="button"
              >
                Esqueceu a senha?
              </Button>
            </div>
            <div className="relative">
              <div className="absolute top-0 left-0 w-10 h-full flex items-center justify-center text-muted-foreground">
                <Lock size={18} />
              </div>
              <Input
                id="password"
                type="password"
                className="pl-10"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
          </div>
          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? "Entrando..." : "Entrar"}
          </Button>
        </form>
      </CardContent>
      <CardFooter className="flex flex-col items-center justify-center gap-2">
        <div className="text-sm text-muted-foreground">
          Não tem uma conta?{" "}
          <Link to="/cadastro" className="text-primary hover:underline">
            Criar conta
          </Link>
        </div>
        <div className="text-sm text-muted-foreground">
          Precisa de ajuda?{" "}
          <Link to="/suporte" className="text-primary hover:underline">
            Contate o suporte
          </Link>
        </div>
      </CardFooter>
    </Card>
  );
};

export default LoginForm;
