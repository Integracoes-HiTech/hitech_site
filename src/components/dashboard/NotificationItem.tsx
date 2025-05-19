import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Bell } from "lucide-react";
import { supabase } from "@/supabaseClient";
import { formatDateTimeBR } from "@/utils/date";

export interface NotificationItemProps {
  id: string;
  title: string;
  message: string;
  date: string;
  read: boolean;
  onMarkAsRead: (id: string) => void;
}

const NotificationItem = ({
  id,
  title,
  message,
  date,
  read,
  onMarkAsRead,
}: NotificationItemProps) => {
  const [isRead, setIsRead] = useState(read);

  const markAsRead = async () => {
    if (isRead) return;

    const { error } = await supabase
      .from("notificacoes")
      .update({ lida: true })
      .eq("id", id);

    if (!error) {
      setIsRead(true);
      onMarkAsRead(id); // atualiza na lista da página
    } else {
      console.error("Erro ao marcar como lida:", error);
    }
  };

  return (
    <div
      className={`border-b p-4 hover:bg-muted/30 transition-colors ${!isRead ? "bg-blue-50/40" : ""}`}
      onClick={markAsRead}
    >
      <div className="flex items-start gap-3">
        <div
          className={`mt-1 p-2 rounded-full ${
            !isRead ? "bg-blue-100 text-blue-600" : "bg-gray-100 text-gray-500"
          }`}
        >
          <Bell size={16} />
        </div>
        <div className="flex-grow">
          <div className="flex justify-between items-start">
            <h4 className="font-medium text-sm">{title}</h4>
            {!isRead && (
              <Badge variant="secondary" className="text-xs px-2 py-0">
                Nova
              </Badge>
            )}
          </div>
          <p className="text-sm text-muted-foreground my-1">{message}</p>
          <div className="flex justify-between items-center mt-2">
            <span className="text-xs text-muted-foreground">
              {formatDateTimeBR(date)}
            </span>
            {!isRead && (
              <Button
                variant="ghost"
                size="sm"
                className="h-7 text-xs"
                onClick={(e) => {
                  e.stopPropagation();
                  markAsRead();
                }}
              >
                Marcar como lida
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotificationItem;
