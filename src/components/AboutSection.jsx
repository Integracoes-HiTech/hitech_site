import React from "react";
import {
  CheckCircle,
  Code,
  Palette,
  Target
} from "lucide-react";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import contactInfo from "./utils/contact";

export default function AboutSection() {
  const features = [
    {
      icon: <Code className="h-12 w-12 text-blue-600" />,
      title: "Tecnologia Premium",
      description:
        "Desenvolvemos soluções robustas e escaláveis utilizando as tecnologias mais avançadas do mercado."
    },
    {
      icon: <Palette className="h-12 w-12 text-blue-600" />,
      title: "Design Exclusivo",
      description:
        "Criamos interfaces únicas e memoráveis que refletem a identidade e valores da sua marca."
    },
    {
      icon: <Target className="h-12 w-12 text-blue-600" />,
      title: "Automação e Integração",
      description:
        "Implementamos automações e integrações com sistemas de terceiros para otimizar seus processos de negócio."
    }
  ];

  const benefits = [
    "Metodologia ágil com entregas frequentes",
    "Equipe senior e especializada",
    "Projetos 100% personalizados",
    "Acompanhamento mensal transparente",
    "Segurança e performance garantidas",
    "Automações e integrações avançadas"
  ];

  const handleWhatsAppClick = () => {
    window.open(contactInfo.buildWhatsAppUrl(), "_blank");
  };

  return (
    <section id="about" className="py-32 bg-white">
      <div className="container mx-auto px-4">
        <motion.div
          className="text-center mb-24"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="inline-block px-4 py-1.5 bg-blue-50 text-blue-600 font-medium rounded-full text-sm mb-6">
            Por que nos escolher
          </div>
          <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6">
            Excelência em Desenvolvimento Digital
          </h2>
          <div className="w-24 h-1 bg-blue-600 mx-auto mb-10 rounded-full"></div>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Combinamos expertise técnica com design inovador para criar soluções digitais que impulsionam o sucesso do seu negócio
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-32">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 * index }}
            >
              <Card className="border-0 shadow-xl hover:shadow-2xl transition-all duration-300 rounded-xl overflow-hidden group">
                <CardContent className="p-10">
                  <div className="p-5 bg-blue-50 rounded-2xl inline-block mb-8 group-hover:bg-blue-100 transition-colors">
                    {feature.icon}
                  </div>
                  <h3 className="text-2xl font-bold mb-4 text-gray-900">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 text-lg leading-relaxed">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center mb-32">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h3 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8">
              Transformamos complexidade em{" "}
              <span className="text-blue-600">soluções elegantes</span>
            </h3>
            <p className="text-xl text-gray-700 mb-12 leading-relaxed">
              A Hi Tech Desenvolvimento é referência em soluções digitais de alto padrão, contando com profissionais que possuem mais de 8 anos de experiência, atendendo empresas que buscam excelência e inovação em seus projetos digitais.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
              {benefits.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.1 * index }}
                  className="flex items-start bg-gray-50 p-6 rounded-xl"
                >
                  <CheckCircle className="h-6 w-6 text-green-500 mr-4 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700 text-lg">{item}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div
            className="relative"
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="absolute -top-12 -left-12 w-96 h-96 bg-blue-50 rounded-full filter blur-3xl opacity-30"></div>
            <div className="absolute -bottom-12 -right-12 w-96 h-96 bg-indigo-50 rounded-full filter blur-3xl opacity-30"></div>
            <img
              src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
              alt="Equipe Hi Tech"
              className="relative rounded-2xl shadow-2xl w-full"
            />
          </motion.div>
        </div>

        <motion.div
          className="mt-20 bg-gradient-to-r from-gray-900 to-gray-800 rounded-2xl p-8 md:p-12 text-center relative overflow-hidden"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <div className="absolute inset-0 bg-grid-white/[0.05] bg-[size:16px]"></div>
          <div className="relative z-10">
            <div className="inline-block px-4 py-1.5 bg-white/10 text-white font-medium rounded-full text-sm mb-4">
              Pronto para Começar?
            </div>
            <h3 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Transforme sua Presença Digital
            </h3>
            <p className="text-lg text-gray-300 mb-8 max-w-2xl mx-auto">
              Agende uma consultoria gratuita e descubra como podemos elevar seu negócio ao próximo nível.
            </p>
            
          </div>
        </motion.div>
      </div>
    </section>
  );
}
