import React, { useState, useEffect } from "react";
import { ArrowRight } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { createClient } from "@supabase/supabase-js";
import { createPageUrl } from "@/utils";

// Supabase client
const supabase = createClient(
  "https://hfjosywhuxsjgdnlvuse.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imhmam9zeXdodXhzamdkbmx2dXNlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDY1Mjk4NjcsImV4cCI6MjA2MjEwNTg2N30.6nW9aGeLkTNH3INhSekAPStNnSLpSPsWaou25ckPRrg"
);

// Base pública do Supabase Storage
const STORAGE_URL = "https://hfjosywhuxsjgdnlvuse.supabase.co/storage/v1/object/public";

export default function PortfolioSection() {
  const [portfolioItems, setPortfolioItems] = useState([]);
  const [hoveredItemId, setHoveredItemId] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const { data, error } = await supabase
        .from("portfolio_projects")
        .select("*")
        .order("id", { ascending: true });

      if (!error && data) {
        setPortfolioItems(data);
      }
    };

    fetchData();
  }, []);

  const handleProjectClick = (slug) => {
    window.location.href = createPageUrl(`ProjectDetails?project=${slug}`);
  };

  return (
    <section id="portfolio" className="py-12 md:py-24 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12 md:mb-16">
          <div className="inline-block px-4 py-1.5 bg-blue-50 text-blue-600 font-medium rounded-full text-sm mb-4">
            Nossos trabalhos
          </div>
          <h2 className="text-2xl md:text-4xl font-bold text-gray-900 mb-4">
            Portfólio de Projetos
          </h2>
          <div className="w-24 h-1 bg-blue-600 mx-auto mb-6 rounded-full" />
          <p className="text-base md:text-lg text-gray-600 max-w-3xl mx-auto px-4">
            Conheça alguns dos nossos projetos desenvolvidos para clientes em diversos segmentos.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8">
          {portfolioItems.map((item) => {
      const thumbnailUrl = item.thumbnail_path
      ? `${STORAGE_URL}/portfolio-files/img/${item.thumbnail_path}`
      : "";
    
    const videoUrl = item.video_path
      ? `${STORAGE_URL}/portfolio-files/videos/${item.video_path}`
      : "";
            return (
              <Card
                key={item.id}
                className="overflow-hidden group border-0 shadow-lg rounded-xl hover:shadow-xl transition-all duration-300 cursor-pointer"
                onClick={() => handleProjectClick(item.slug)}
                onMouseEnter={() => setHoveredItemId(item.id)}
                onMouseLeave={() => setHoveredItemId(null)}
              >
                <div className="relative w-full aspect-video overflow-hidden bg-white">
                  <img
                    src={thumbnailUrl}
                    alt={item.title}
                    className="w-full h-full object-scale-down absolute top-0 left-0 transition-opacity duration-500 pointer-events-none"
                    style={{ opacity: hoveredItemId === item.id ? 0 : 1 }}
                  />

                  {hoveredItemId === item.id && videoUrl && (
                    <video
                      muted
                      loop
                      playsInline
                      autoPlay
                      className="w-full h-full absolute top-0 left-0 object-cover transition-opacity duration-300"
                      style={{ opacity: 1 }}
                    >
                      <source src={videoUrl} type="video/mp4" />
                      Seu navegador não suporta vídeos em HTML5.
                    </video>
                  )}
                </div>

                <CardContent className="p-4 md:p-6">
                  <h3 className="text-lg md:text-xl font-bold mb-2 text-gray-800 line-clamp-2">
                    {item.title}
                  </h3>
                  <div className="flex justify-between items-center flex-wrap gap-2">
                    <span className="text-sm font-medium px-3 py-1 bg-blue-100 text-blue-600 rounded-full">
                      Web Development
                    </span>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-blue-600 hover:text-blue-700 p-0 hover:bg-transparent"
                    >
                      Ver Detalhes
                      <ArrowRight className="ml-1 h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}
