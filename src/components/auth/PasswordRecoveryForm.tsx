
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";
import { Mail, ArrowLeft } from "lucide-react";

const PasswordRecoveryForm = () => {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // In a real app, this would be an API call to send recovery email
    setTimeout(() => {
      toast({
        title: "Email enviado",
        description: "Verifique sua caixa de entrada para instruções de recuperação.",
      });
      setSubmitted(true);
      setIsLoading(false);
    }, 1000);
  };

  const handleBackToLogin = () => {
    navigate("/login");
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl font-bold">Recuperação de Senha</CardTitle>
        <CardDescription>
          {!submitted 
            ? "Informe seu email para receber instruções de recuperação." 
            : "Verifique seu email para redefinir sua senha."}
        </CardDescription>
      </CardHeader>
      <CardContent>
        {!submitted ? (
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
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? "Enviando..." : "Enviar Instruções"}
            </Button>
          </form>
        ) : (
          <div className="space-y-4 text-center p-4">
            <div className="bg-green-50 text-green-800 p-4 rounded-md">
              <p>Um email de recuperação foi enviado para:</p>
              <p className="font-semibold">{email}</p>
              <p className="text-sm mt-2">Verifique sua caixa de entrada e spam.</p>
            </div>
          </div>
        )}
      </CardContent>
      <CardFooter className="flex justify-center">
        <Button 
          variant="outline" 
          onClick={handleBackToLogin} 
          className="w-full"
        >
          <ArrowLeft size={16} className="mr-2" />
          Voltar ao Login
        </Button>
      </CardFooter>
    </Card>
  );
};

export default PasswordRecoveryForm;
