import React, { useState, useEffect } from "react";
import { createClient } from "@supabase/supabase-js";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowLeft, ArrowRight, Zap, X } from "lucide-react";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";
import contactInfo from "../components/utils/contact";

const supabase = createClient(
 "https://hfjosywhuxsjgdnlvuse.supabase.co",
 "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imhmam9zeXdodXhzamdkbmx2dXNlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDY1Mjk4NjcsImV4cCI6MjA2MjEwNTg2N30.6nW9aGeLkTNH3INhSekAPStNnSLpSPsWaou25ckPRrg"
);

const STORAGE_URL = "https://hfjosywhuxsjgdnlvuse.supabase.co/storage/v1/object/public";

  export default function ProjectDetails() {
    const [project, setProject] = useState(null);
    const [loading, setLoading] = useState(true);
    const [activeImage, setActiveImage] = useState(0);
    const [showImageModal, setShowImageModal] = useState(false);

  useEffect(() => {
    const slug = new URLSearchParams(window.location.search).get("project");

    if (!slug) {
      setLoading(false);
      return;
    }
  
      supabase
  .from("portfolio_projects")
  .select("title, category, tags, description, challenge, solution, results, gallery_images, thumbnail_path")  // ← adiciona aqui
  .eq("slug", slug)
  .single()
  .then(({ data, error }) => {
          if (error || !data) {
            console.error("Erro ao buscar projeto:", error);
            setLoading(false);
            return;
          }
 // transforma cada entrada de gallery_images em URL pública completa
 const images = (data.gallery_images || []).map((path) => {
  return `${STORAGE_URL}/portfolio-files/${path}`;
});

          setProject({title: data.title,category: data.category,tags: data.tags || [], description: data.description, challenge: data.challenge, solution: data.solution, results: data.results, thumbnail:   data.thumbnail_path,  images});
          setLoading(false);     
        });
    }, []);

  const handleWhatsAppClick = () => {
    const message = `Olá, gostaria de mais informações sobre projetos similares ao ${project?.title}`;
    window.open(contactInfo.buildWhatsAppUrl(message), "_blank");
  };

  useEffect(() => {
    document.body.style.overflow = showImageModal ? "hidden" : "auto";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [showImageModal]);

  const handleKeyDown = (e) => {
    if (showImageModal) {
      if (e.key === "Escape") {
        setShowImageModal(false);
      } else if (e.key === "ArrowRight") {
        setActiveImage((prev) => (prev + 1) % project.images.length);
      } else if (e.key === "ArrowLeft") {
        setActiveImage((prev) => (prev - 1 + project.images.length) % project.images.length);
      }
    }
  };

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
}, [showImageModal, project]);

 // Carregando…
 if (loading) {
  return (
    <div className="min-h-screen flex items-center justify-center text-gray-600">
     
    </div>
  );
}

  if (!project) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-4">
        <h1 className="text-2xl font-bold text-gray-800 mb-4">Projeto não encontrado</h1>
        <p className="text-gray-600 mb-6">O projeto que você está procurando não está disponível.</p>
        <Link to={createPageUrl("Home")}>
          <Button className="bg-blue-600 hover:bg-blue-700">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Voltar para a Home
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-6 md:py-8">
        <Link 
          to={createPageUrl("Home") + "#portfolio"} 
          replace
          className="inline-flex items-center text-blue-600 hover:text-blue-700 mb-6 md:mb-8"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Voltar para o Site
        </Link>

       
{/* Banner do Projeto */}
<div className="relative w-full aspect-[16/9] sm:aspect-[21/9] rounded-xl overflow-hidden mb-8 md:mb-12">
<img
  src={`${STORAGE_URL}/portfolio-files/img/${project.thumbnail}`}
  alt={project.title}
  className="w-full h-full object-contain bg-white"
/>
  
  <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 to-transparent flex items-end">
    <div className="p-4 sm:p-6 md:p-8 text-white">
      <h1 className="text-2xl sm:text-3xl md:text-5xl font-bold mb-2 sm:mb-4">
        {project.title}
      </h1>
      <div className="flex flex-wrap gap-2 mb-2">
        {project.tags.map((tag, index) => (
          <span 
            key={index}
            className="bg-white/20 backdrop-blur-sm text-white text-xs px-3 py-1 rounded-full"
          >
            {tag}
          </span>
        ))}
      </div>
    </div>
  </div>
</div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8">
          {/* Coluna Principal */}
          <div className="lg:col-span-2 space-y-6 md:space-y-8">
            <div className="bg-white rounded-xl shadow-md p-4 md:p-8">
              <h2 className="text-xl md:text-2xl font-bold mb-4 md:mb-6 text-gray-800">Sobre o Projeto</h2>
              <p className="text-gray-700 mb-6 leading-relaxed">
                {project.description}
              </p>

              <div className="space-y-6 md:space-y-8">
                <div>
                  <h3 className="text-lg md:text-xl font-bold mb-3 text-gray-800">O Desafio</h3>
                  <p className="text-gray-700 leading-relaxed">{project.challenge}</p>
                </div>
                
                <div>
                  <h3 className="text-lg md:text-xl font-bold mb-3 text-gray-800">Nossa Solução</h3>
                  <p className="text-gray-700 leading-relaxed">{project.solution}</p>
                </div>
                
                <div>
                  <h3 className="text-lg md:text-xl font-bold mb-3 text-gray-800">Resultados</h3>
                  <p className="text-gray-700 leading-relaxed">{project.results}</p>
                </div>
              </div>
            </div>

            {/* Galeria de Imagens */}
            <div className="bg-white rounded-xl shadow-md p-4 md:p-8">
              <h2 className="text-xl md:text-2xl font-bold mb-4 md:mb-6 text-gray-800">
                Galeria do Projeto
              </h2>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 md:gap-3">
              {project.images
                .filter(Boolean)
                .map((image, index) => (
             <div
                 key={index}
                 className="cursor-pointer rounded-lg overflow-hidden border-2 relative group"
                 onClick={() => {
        setActiveImage(index);
        setShowImageModal(true);
      }}
    >
      <img
        src={image}
        alt={`${project.title} - Imagem ${index + 1}`}
        className="w-full object-contain bg-black transition-transform duration-300 group-hover:scale-105"
      />
      <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
        <span className="text-white text-sm font-medium">Ampliar</span>
      </div>
    </div>
))}
              </div>
            </div>
          </div>

          {/* Coluna Lateral */}
          <div className="space-y-6 md:space-y-8">
            <Card className="overflow-hidden shadow-md">
              <CardContent className="p-0">
                <div className="bg-blue-600 text-white p-6">
                  <h3 className="text-xl font-bold mb-2">Informações do Projeto</h3>
                  <p className="text-blue-100">Detalhes técnicos</p>
                </div>
                <div className="p-6">
                  <div className="space-y-4">
                    <div className="flex items-center">
                      <div className="h-5 w-5 text-gray-500 mr-3 flex items-center justify-center">
                        <span className="text-sm">#</span>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Categoria</p>
                        <p className="font-medium">{project.category}</p>
                      </div>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600 mb-2">Tecnologias utilizadas</p>
                      <div className="flex flex-wrap gap-2">
                        {project.tags.map((tag, index) => (
                          <span 
                            key={index}
                            className="bg-gray-100 text-gray-700 text-xs px-3 py-1 rounded-full"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="bg-white rounded-xl shadow-md p-6">
              <h3 className="text-xl font-bold mb-4 text-gray-800">Tem um projeto similar?</h3>
              <p className="text-gray-600 mb-6">
                Estamos prontos para transformar suas ideias em realidade. Entre em contato para discutirmos seu projeto.
              </p>
              <Button 
                className="w-full bg-blue-600 hover:bg-blue-700"
                onClick={handleWhatsAppClick}
              >
                <Zap className="mr-2 h-4 w-4" />
                Fale conosco
              </Button>
            </div>

            <Card className="overflow-hidden shadow-md bg-gradient-to-br from-blue-50 to-indigo-50">
              <CardContent className="p-6">
                <h3 className="text-lg font-bold mb-2 text-gray-800">Outras soluções que oferecemos</h3>
                <ul className="space-y-2 text-gray-700">
                  <li className="flex items-center">
                    <div className="w-2 h-2 bg-blue-600 rounded-full mr-2"></div>
                    Desenvolvimento Web Full Stack
                  </li>
                  <li className="flex items-center">
                    <div className="w-2 h-2 bg-blue-600 rounded-full mr-2"></div>
                    E-commerce com integrações
                  </li>
                  <li className="flex items-center">
                    <div className="w-2 h-2 bg-blue-600 rounded-full mr-2"></div>
                    Landing Pages
                  </li>
                  <li className="flex items-center">
                    <div className="w-2 h-2 bg-blue-600 rounded-full mr-2"></div>
                    Design UX/UI
                  </li>
                  <li className="flex items-center">
                    <div className="w-2 h-2 bg-blue-600 rounded-full mr-2"></div>
                    SEO & Marketing Digital
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* CTA Final */}
        <div className="mt-12 md:mt-16 bg-gradient-to-r from-blue-600 to-indigo-700 rounded-xl md:rounded-2xl shadow-xl p-6 md:p-8 text-center text-white">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">Pronto para transformar sua ideia em realidade?</h2>
          <p className="text-lg text-blue-100 mb-8 max-w-3xl mx-auto">
            Entre em contato agora mesmo para discutir seu projeto e descobrir como podemos ajudar sua empresa a alcançar seus objetivos digitais.
          </p>
       
        </div>
      </div>

{/* Modal de imagem ampliada - Ajustada para mobile */}
{showImageModal && (
  <div 
    className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-2 md:p-4"
    onClick={() => setShowImageModal(false)}
  >
    <div 
      className="relative w-full max-w-6xl flex flex-col"
      onClick={(e) => e.stopPropagation()}
    >
      {/* Botão de fechar */}
      <button 
        className="absolute top-2 right-2 bg-black/50 text-white p-2 rounded-full hover:bg-black/70 z-10"
        onClick={() => setShowImageModal(false)}
      >
        <X className="h-5 w-5 md:h-6 md:w-6" />
      </button>
      
      {/* Imagem ampliada sem corte */}
      <div className="relative w-full flex items-center justify-center bg-black rounded-xl overflow-hidden max-h-[90vh]">
        <img 
          src={project.images[activeImage]} 
          alt={`${project.title} - Imagem ampliada`}
          className="w-full h-auto max-h-[90vh] object-contain"
        />

        {/* Navegação da imagem */}
        <button 
          className="absolute left-1 md:left-2 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-1.5 md:p-2 rounded-full"
          onClick={(e) => {
            e.stopPropagation();
            setActiveImage((prev) => (prev - 1 + project.images.length) % project.images.length);
          }}
        >
          <ArrowLeft className="h-4 w-4 md:h-6 md:w-6" />
        </button>

        <button 
          className="absolute right-1 md:right-2 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-1.5 md:p-2 rounded-full"
          onClick={(e) => {
            e.stopPropagation();
            setActiveImage((prev) => (prev + 1) % project.images.length);
          }}
        >
          <ArrowRight className="h-4 w-4 md:h-6 md:w-6" />
        </button>
      </div>

      {/* Miniaturas ajustadas sem corte */}
      <div className="hidden sm:flex justify-center mt-4 space-x-2">
        {project.images.map((image, index) => (
          <button
            key={index}
            className={`w-12 md:w-16 h-8 md:h-12 rounded overflow-hidden bg-white transition-all ${
              activeImage === index ? 'ring-2 ring-blue-500 scale-110' : 'opacity-60 hover:opacity-100'
            }`}
            onClick={() => setActiveImage(index)}
          >
            <img 
              src={image}
              alt={`Miniatura ${index + 1}`}
              className="w-full h-full object-contain"
            />
          </button>
        ))}
      </div>

            {/* Contador de imagens */}
            <div className="text-white text-center mt-2 text-sm md:text-base">
              {activeImage + 1} de {project.images.length}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}