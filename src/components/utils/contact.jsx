const contactInfo = {
  whatsapp: () => "5562996207031",
  whatsappFormatted: () => "(62) 99620-7031",
  email: () => "mailto:contato@hitechdesenvolvimento.com.br",
  address: () => "GoiâniaGO, https://maps.google.com/?q=Goiânia ",
  buildWhatsAppUrl: (message = "Olá, gostaria de mais informações sobre seus serviços") => {
    return `https://wa.me/${contactInfo.whatsapp()}?text=${encodeURIComponent(message)}`;
  }
};

export default contactInfo;