import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X, Instagram } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

export default function Header({ activeSection }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleClientArea = () => {
    navigate("/cliente-login");
    setMenuOpen(false);
  };

  const scrollToSection = (section) => {
    const el = document.getElementById(section);
    if (el) {
      const yOffset = -80;
      const y = el.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
    setMenuOpen(false);
  };

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled || menuOpen ? "bg-white shadow-md" : "bg-black/20 backdrop-blur-sm"
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16 md:h-20">
          
          {/* Logo */}
          <a href="#" className="text-2xl font-bold flex items-center space-x-1">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">
              Hi Tech
            </span>
            <span className={`${isScrolled || menuOpen ? "text-gray-800" : "text-white"}`}>
              Desenvolvimento
            </span>
          </a>

          {/* Menu Desktop */}
          <div className="hidden md:flex items-center space-x-6">
            <nav
              className="flex items-center space-x-8 mr-4"
              role="navigation"
              aria-label="Navegação principal"
            >
              {["home", "about", "portfolio", "contact"].map((item) => (
                <button
                  key={item}
                  onClick={() => scrollToSection(item)}
                  className={`text-sm font-medium transition-colors relative ${
                    activeSection === item
                      ? isScrolled
                        ? "text-blue-600"
                        : "text-white"
                      : isScrolled
                      ? "text-gray-700 hover:text-blue-600"
                      : "text-white/80 hover:text-white"
                  }`}
                  aria-current={activeSection === item ? "page" : undefined}
                  aria-label={`Ir para seção ${item}`}
                >
                  {item === "home"
                    ? "Início"
                    : item === "about"
                    ? "Sobre"
                    : item === "portfolio"
                    ? "Portfólio"
                    : "Contato"}
                  {activeSection === item && (
                    <span
                      className={`absolute -bottom-1 left-0 w-full h-0.5 rounded-full ${
                        isScrolled ? "bg-blue-600" : "bg-white"
                      }`}
                    />
                  )}
                </button>
              ))}
            </nav>

            {/* Instagram */}
            <a
              href="https://www.instagram.com/hi.tech.oficial/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram da Hi Tech"
              className={`transition-colors hover:scale-110 ${
                isScrolled ? "text-gray-700 hover:text-blue-600" : "text-white hover:text-white/90"
              }`}
            >
              <Instagram className="w-5 h-5" />
            </a>

            {/* Área do Cliente */}
            <Button
              onClick={handleClientArea}
              className="px-4 py-2 rounded-full bg-blue-600 text-white hover:bg-blue-700 transition-all"
              aria-label="Área do Cliente"
            >
              Área do Cliente
            </Button>
          </div>

          {/* Botão Menu Mobile */}
          <Button
            variant="outline"
            size="icon"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label={menuOpen ? "Fechar menu" : "Abrir menu"}
            className={`md:hidden border ${
              isScrolled || menuOpen
                ? "text-gray-800 border-gray-200 bg-white hover:bg-gray-100"
                : "text-white border-white/30 bg-white/10 backdrop-blur-sm hover:bg-white/20"
            }`}
          >
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </Button>
        </div>
      </div>

      {/* Menu Mobile Animado */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            key="mobileMenu"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="md:hidden bg-white border-t border-gray-100"
          >
            <nav
              className="container mx-auto px-6 py-6 flex flex-col space-y-4"
              role="navigation"
              aria-label="Menu mobile"
            >
              {["home", "about", "portfolio", "contact"].map((item) => (
                <button
                  key={item}
                  onClick={() => scrollToSection(item)}
                  className={`w-full text-left text-base font-medium px-4 py-3 rounded-lg transition-colors ${
                    activeSection === item
                      ? "bg-blue-50 text-blue-600"
                      : "text-gray-700 hover:bg-gray-100"
                  }`}
                  aria-current={activeSection === item ? "page" : undefined}
                  aria-label={`Ir para seção ${item}`}
                >
                  {item === "home"
                    ? "Início"
                    : item === "about"
                    ? "Sobre"
                    : item === "portfolio"
                    ? "Portfólio"
                    : "Contato"}
                </button>
              ))}

              {/* Separador */}
              <div className="border-t border-gray-200 my-4" />

              {/* Instagram + Área do Cliente */}
              <div className="flex items-center justify-between px-4">
                <a
                  href="https://www.instagram.com/hi.tech.oficial/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-500 hover:text-blue-600 transition-colors"
                  aria-label="Instagram da Hi Tech"
                >
                  <Instagram className="w-6 h-6" />
                </a>

                <Button
                  onClick={handleClientArea}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-full text-sm"
                  aria-label="Área do Cliente"
                >
                  Área do Cliente
                </Button>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
