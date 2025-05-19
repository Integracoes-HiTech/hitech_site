import React from "react";
import { Instagram, Mail, Phone, MapPin } from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-gray-300 text-sm">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          
          {/* Sobre a empresa */}
          <div>
            <h3 className="text-2xl font-bold text-white mb-4">
              Hi Tech <span className="text-blue-400">Desenvolvimento</span>
            </h3>
            <p>
              Transformamos ideias em sites profissionais e impulsionamos negócios no ambiente digital.
            </p>
          </div>

          {/* Redes Sociais */}
          <div>
            <h4 className="text-lg font-semibold text-white mb-4">Redes Sociais</h4>
            <div className="flex space-x-4">
              <a
                href="https://www.instagram.com/hi.tech.oficial/"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 bg-gray-800 rounded-full hover:bg-blue-600 transition-colors"
                aria-label="Instagram da Hi Tech"
              >
                <Instagram className="w-5 h-5 text-white" />
              </a>
            </div>
          </div>

          {/* Lista de Serviços */}
          <div>
            <h4 className="text-lg font-semibold text-white mb-4">Serviços</h4>
            <ul className="space-y-2">
              {[
                "Desenvolvimento Web",
                "Landing Pages",
                "Sites Institucionais",
                "UI/UX Design",
                "Automações e Integrações",
                "SEO e Performance",
              ].map((item, index) => (
                <li key={index} className="text-gray-400 hover:text-white transition-colors">
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* Contato */}
          <div>
            <h4 className="text-lg font-semibold text-white mb-4">Contato</h4>
            <ul className="space-y-4">
              {/* Email */}
              <li className="flex items-start space-x-2">
                <Mail className="w-5 h-5 text-blue-400 shrink-0" />
                <a
                  href="mailto:contato@hitechdesenvolvimento.com.br"
                  className="hover:text-white break-all"
                >
                  contato@hitechdesenvolvimento.com.br
                </a>
              </li>

              {/* Telefone */}
              <li className="flex items-start space-x-2">
                <Phone className="w-5 h-5 text-blue-400 shrink-0" />
                <a href="tel:+5562996207031" className="hover:text-white">
                  +55 62 99620-7031
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Rodapé final */}
        <div className="border-t border-gray-800 mt-12 pt-6 text-center text-gray-500 text-xs">
          <p>© {currentYear} Hi Tech Desenvolvimento. Todos os direitos reservados.</p>
        </div>
      </div>
    </footer>
  );
}
