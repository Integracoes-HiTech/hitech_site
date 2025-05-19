import React, { useState, useEffect, useRef } from "react";
import { CheckCircle } from "lucide-react";
import { motion } from "framer-motion";
import contactInfo from "./utils/contact";

// URL do vídeo de fundo
const VIDEO_URL =
  "https://ik.imagekit.io/ktkbit0g9/videoherohome.mp4?updatedAt=1747663078448";

export default function HeroSection() {
  const videoRef = useRef(null);
  const [countersStarted, setCountersStarted] = useState(false);
  const [counters, setCounters] = useState([0, 0, 0, 0]);
  const sectionRef = useRef(null);

  const stats = [
    { number: 150, suffix: "+", label: "Projetos Entregues" },
    { number: 98, suffix: "%", label: "Clientes Satisfeitos" },
    { number: 8, suffix: "+", label: "Anos de Experiência" },
    { number: 100, suffix: "%", label: "Transparência" }
  ];

  useEffect(() => {
    const vid = videoRef.current;
    if (vid) {
      const playPromise = vid.play();
      if (playPromise !== undefined) {
        playPromise.catch(() => {});
      }
    }
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setCountersStarted(true);
          observer.disconnect();
        }
      },
      { threshold: 0.5 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!countersStarted) return;
    const intervals = stats.map((item, idx) =>
      setInterval(() => {
        setCounters(prev => {
          const next = [...prev];
          next[idx] = Math.min(next[idx] + Math.ceil(item.number / 25), item.number);
          return next;
        });
      }, 80)
    );
    return () => intervals.forEach(clearInterval);
  }, [countersStarted]);

  return (
    <section id="home" className="relative min-h-screen flex items-center overflow-hidden">
      {/* Vídeo de fundo */}
      <video
        ref={videoRef}
        className="absolute inset-0 w-full h-full object-cover"
        src={VIDEO_URL}
        muted
        loop
        playsInline
      />

      {/* Overlay escura para contraste */}
      <div className="absolute inset-0 bg-gradient-to-r from-gray-900/95 to-gray-900/80" />

      {/* Conteúdo */}
      <div className="relative z-10 container mx-auto px-4 pt-24 text-center">
        {/* Texto superior animado */}
        <motion.span
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="inline-block mb-8 px-6 py-2 rounded-full border border-blue-500/30 bg-gradient-to-r from-blue-500/20 to-indigo-500/20 backdrop-blur-sm text-white/90 font-medium"
        >
          Desenvolvimento Web de Alto Padrão
        </motion.span>

        {/* Título animado */}
        <motion.h1
          initial={{ opacity: 0, y: -40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-10 leading-tight"
        >
          Transformamos Ideias em{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-400">
            Experiências Digitais
          </span>
        </motion.h1>

        {/* Subtítulo animado */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="text-xl md:text-2xl text-white/80 mb-16 max-w-3xl mx-auto"
        >
          Soluções digitais premium para empresas que buscam excelência e resultados extraordinários
        </motion.p>

        {/* Benefícios com animação */}
        <div className="grid md:grid-cols-3 gap-8 mb-20 max-w-3xl mx-auto">
          {[
            "Design exclusivo e personalizado",
            "Automações e integrações avançadas",
            "Resultados mensuráveis"
          ].map((texto, index) => (
            <motion.div
              key={texto}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 + index * 0.2 }}
              whileHover={{ scale: 1.03 }}
              className="flex items-center p-6 bg-white/5 backdrop-blur-sm rounded-xl hover:bg-white/10 transition-colors"
            >
              <CheckCircle className="h-6 w-6 text-blue-400 mr-4 shrink-0" />
              <span className="text-white/90 text-lg">{texto}</span>
            </motion.div>
          ))}
        </div>

        {/* Contadores animados */}
        <div
          ref={sectionRef}
          className="pt-16 border-t border-white/10 bg-gradient-to-r from-gray-900/80 to-gray-800/80 rounded-2xl p-12 shadow-xl"
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-12">
            {stats.map((item, idx) => (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 1 + idx * 0.2 }}
                className="text-center"
              >
                <div className="flex justify-center items-baseline text-3xl md:text-5xl font-bold text-white mb-3">
                  <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-indigo-400">
                    {counters[idx]}
                  </span>
                  <span className="text-blue-400">{item.suffix}</span>
                </div>
                <p className="text-white/80 text-lg font-medium">{item.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Gradiente inferior */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white to-transparent" />
    </section>
  );
}
