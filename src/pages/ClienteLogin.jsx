import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, Link } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { supabase } from "@/supabaseClient";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { EyeIcon, EyeOffIcon } from "lucide-react";
import { toast } from "sonner";
import { motion } from "framer-motion";

export default function ClienteLogin() {
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const navigate = useNavigate();

  const { register, handleSubmit, reset, formState: { errors } } = useForm({
    defaultValues: { email: "", password: "" }
  });

  const onSubmit = async ({ email, password }) => {
    setLoading(true);
    setErrorMsg("");

    const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
      email,
      password
    });

    if (authError) {
      setErrorMsg("Usuário ou senha inválidos.");
      setLoading(false);
      return;
    }

    const { data: profile, error: profileError } = await supabase
      .from("profiles")
      .select("role")
      .eq("id", authData.user.id)
      .single();

    if (profileError || !profile?.role) {
      setErrorMsg("Usuário não autorizado. Contate o administrador.");
      setLoading(false);
      return;
    }

    reset();
    toast.success("Login bem-sucedido", {
      description: "Bem-vindo à área do cliente HiTech."
    });

    localStorage.setItem("login_success", "true");
    navigate("/dashboard");
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center px-4 bg-cover bg-center text-white"
      style={{
        backgroundImage:
          'url("https://images.unsplash.com/photo-1521791136064-7986c2920216?q=80&w=1469&auto=format&fit=crop")'
      }}
    >
      <motion.div
        className="max-w-md w-full"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex justify-center mb-8">
          <Link to={createPageUrl("Home")} className="text-3xl font-bold flex items-center gap-1">
            <span className="text-blue-500">Hi</span>
            <span className="text-indigo-500">Tech</span>
            <span className="text-white">Desenvolvimento</span>
          </Link>
        </div>

        <Card className="bg-white/90 backdrop-blur border border-gray-200 shadow-lg text-black">
          <CardHeader>
            <CardTitle className="text-2xl text-center">Área do Cliente</CardTitle>
            <CardDescription className="text-center text-zinc-600">
            Entre em contato com o administrador para acessar sua conta
            </CardDescription>
          </CardHeader>

          <CardContent>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" autoComplete="off">
              <div>
                <Label htmlFor="email">E-mail</Label>
                <Input
                  id="email"
                  type="email"
                  autoComplete="email"
                  placeholder="seu@email.com"
                  {...register("email", {
                    required: "E-mail é obrigatório",
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: "E-mail inválido"
                    }
                  })}
                />
                {errors.email && <p className="text-sm text-red-500 mt-1">{errors.email.message}</p>}
              </div>

              <div>
                <Label htmlFor="password">Senha</Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••"
                    autoComplete="new-password"
                    className="pr-10"
                    {...register("password", {
                      required: "Senha obrigatória",
                      minLength: { value: 6, message: "Mínimo 6 caracteres" }
                    })}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-black"
                  >
                    {showPassword ? <EyeOffIcon className="w-5 h-5" /> : <EyeIcon className="w-5 h-5" />}
                  </button>
                </div>
                {errors.password && <p className="text-sm text-red-500 mt-1">{errors.password.message}</p>}
              </div>

              {errorMsg && <p className="text-sm text-red-600">{errorMsg}</p>}

              <Button type="submit" disabled={loading} className="w-full bg-blue-600 hover:bg-blue-700 text-white">
                {loading ? "Entrando..." : "Entrar"}
              </Button>
            </form>
          </CardContent>

          <CardFooter className="text-center">
            <Button
              variant="link"
              type="button"
              onClick={() => toast.warning("Entre em contato com o administrador.")}
              className="text-blue-600 hover:text-blue-700"
            >
              Esqueceu a senha?
            </Button>
          </CardFooter>
        </Card>

        <div className="mt-6 text-center text-sm text-white drop-shadow">
          <Link to={createPageUrl("Home")} className="hover:underline">
            ← Voltar para o site principal
          </Link>
        </div>
      </motion.div>
    </div>
  );
}
