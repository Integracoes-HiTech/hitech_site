export function formatDateBR(dateInput: string | Date) {
    const date = typeof dateInput === "string"
      ? new Date(dateInput + "T03:00:00") // Compensar UTC para fuso de Brasília
      : new Date(dateInput);
  
    return date.toLocaleDateString("pt-BR");
  }