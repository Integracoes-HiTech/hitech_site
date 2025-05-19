import { useRef, useState } from "react";
import emailjs from "@emailjs/browser";
import { createClient } from "@supabase/supabase-js";
import { Mail, MapPin } from "lucide-react";

const supabase = createClient(
  "https://hfjosywhuxsjgdnlvuse.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imhmam9zeXdodXhzamdkbmx2dXNlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDY1Mjk4NjcsImV4cCI6MjA2MjEwNTg2N30.6nW9aGeLkTNH3INhSekAPStNnSLpSPsWaou25ckPRrg"
);

export default function ContactForm() {
  const formRef = useRef();
  const [status, setStatus] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("loading");

    const formData = new FormData(formRef.current);
    const nome = formData.get("user_name");
    const email = formData.get("user_email");
    const whatsapp = formData.get("user_whatsapp");
    const mensagem = formData.get("message_html");

    try {
      // 👇 1. Salva no Supabase
      const { error } = await supabase.from("contatos_form").insert([
        {
          nome,
          email,
          whatsapp,
          mensagem,
        },
      ]);

      if (error) throw error;

      // 👇 2. Envia o e-mail
      await emailjs.sendForm(
        "service_4wxt8a2",
        "template_rvnkuqn",
        formRef.current,
        "YRVk-zhbMbi7_Ng0Q"
      );

      setStatus("success");
      formRef.current.reset();
    } catch (err) {
      console.error("Erro:", err);
      setStatus("error");
    }
  };
  // ---------- Dados de contato ----------
  const contactInfo = [
    {
      icon: <Mail className="h-5 w-5 text-blue-600" />,
      title: "E-mail",
      content: "contato@hitechdesenvolvimento.com.br",
      link: "mailto:contato@hitechdesenvolvimento.com.br",
    },
    {
      icon: <MapPin className="h-5 w-5 text-blue-600" />,
      title: "Endereço",
      content: "Goiânia, GO",
      link: "https://maps.google.com/?q=Goiânia",
    },
  ];

  return (
    <section id="contact" className="py-24 bg-white">
      <div className="container mx-auto px-4">
        {/* Cabeçalho */}
        <div className="text-center mb-16">
          <div className="inline-block px-4 py-1.5 bg-blue-50 text-blue-600 font-medium rounded-full text-sm mb-4">
            Contato
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Entre em Contato
          </h2>
          <div className="w-24 h-1 bg-blue-600 mx-auto mb-6 rounded-full" />
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Estamos prontos para transformar suas ideias em realidade.  
          </p>
        </div>

        {/* Formulário EmailJS */}
        <div className="max-w-2xl mx-auto mb-20">
          <form onSubmit={handleSubmit} ref={formRef} className="grid grid-cols-1 gap-6 bg-gray-50 p-8 rounded-xl shadow-sm border border-gray-100"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Nome */}
              <input
                type="text"
                name="user_name"
                placeholder="Seu nome"
                required
                minLength={2}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />

              {/*  WhatsApp */}

              <input
                 type="tel"
                 name="user_whatsapp"
                 placeholder="WhatsApp com DDD"
                 required
                 pattern="^\d{10,11}$"
                 title="Digite 10 ou 11 dígitos (somente números)"
                 className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            />
            
            </div>

             {/* email */}
             <input
                type="email"
                name="user_email"
                placeholder="Seu e-mail"
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            {/* Mensagem */}
            <textarea
              name="message_html"
              rows="5"
              placeholder="Sua mensagem"
              required
              minLength={10}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            {/* Botão */}
            <button
              type="submit"
              disabled={status === "loading"}
              className="inline-flex items-center justify-center px-6 py-3 font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
            >
              {status === "loading" ? "Enviando..." : "Enviar Mensagem"}
            </button>

            {/* Feedback */}
            {status === "success" && (
              <p className="text-green-600 font-medium text-center">
                Mensagem enviada com sucesso!
              </p>
            )}
            {status === "error" && (
              <p className="text-red-600 font-medium text-center">
                Ocorreu um erro. Tente novamente.
              </p>
            )}
          </form>
        </div>

        {/* Cartões de contato */}
        <div className="max-w-4xl mx-auto">
          <div className="mb-12 grid grid-cols-1 md:grid-cols-2 gap-6">
            {contactInfo.map((item, index) => (
              <a
                key={index}
                href={item.link}
                className="flex flex-col items-center p-6 rounded-xl hover:bg-gray-50 hover:shadow-md transition-all text-center border border-gray-100"
              >
                <div className="bg-blue-50 p-4 rounded-full mb-4">
                  {item.icon}
                </div>
                <h3 className="font-bold text-lg text-gray-900 mb-2">
                  {item.title}
                </h3>
                <p className="text-gray-600">{item.content}</p>
              </a>
            ))}
          </div>

          {/* Mapa */}
          <div className="h-96 rounded-xl overflow-hidden shadow-lg border border-gray-200">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15288.331805074462!2d-49.27427567812497!3d-16.704893895657752!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x935ef1346b4c8647%3A0x88e150f456c4ca9a!2s%20%2C%20Goi%C3%A2nia%20-%20GO!5e0!3m2!1spt-BR!2sbr!4v1699893547774!5m2!1spt-BR!2sbr"
              className="w-full h-full"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              title="Localização Hi Tech Desenvolvimento"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
