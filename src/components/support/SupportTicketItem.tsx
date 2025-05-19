
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MessageSquare, CircleCheck, CirclePause, CircleX } from "lucide-react";
import { Link } from "react-router-dom";

export type TicketStatus = 'Aberto' | 'Em atendimento' | 'Resolvido' | 'Fechado';
export type TicketPriority = 'Baixa' | 'Média' | 'Alta' | 'Urgente';

export interface SupportTicketItemProps {
  id: string;
  title: string;
  description: string;
  status: TicketStatus;
  priority: TicketPriority;
  createdAt: string;
  updatedAt: string;
  messageCount: number;
}

const getStatusIcon = (status: TicketStatus) => {
  switch(status) {
    case 'Aberto':
      return <MessageSquare className="h-4 w-4" />;
    case 'Em atendimento':
      return <CirclePause className="h-4 w-4" />;
    case 'Resolvido':
      return <CircleCheck className="h-4 w-4" />;
    case 'Fechado':
      return <CircleX className="h-4 w-4" />;
    default:
      return <MessageSquare className="h-4 w-4" />;
  }
};

const getStatusClass = (status: TicketStatus) => {
  switch(status) {
    case 'Aberto':
      return 'bg-blue-100 text-blue-800 border-blue-200';
    case 'Em atendimento':
      return 'bg-amber-100 text-amber-800 border-amber-200';
    case 'Resolvido':
      return 'bg-green-100 text-green-800 border-green-200';
    case 'Fechado':
      return 'bg-gray-100 text-gray-800 border-gray-200';
    default:
      return '';
  }
};

const getPriorityClass = (priority: TicketPriority) => {
  switch(priority) {
    case 'Baixa':
      return 'bg-green-100 text-green-800';
    case 'Média':
      return 'bg-blue-100 text-blue-800';
    case 'Alta':
      return 'bg-amber-100 text-amber-800';
    case 'Urgente':
      return 'bg-red-100 text-red-800';
    default:
      return '';
  }
};

const SupportTicketItem = ({
  id,
  title,
  description,
  status,
  priority,
  createdAt,
  updatedAt,
  messageCount
}: SupportTicketItemProps) => {
  return (
    <Card className="overflow-hidden card-shadow">
      <CardContent className="p-4">
        <div className="flex flex-wrap justify-between gap-2 mb-2">
          <h3 className="font-medium">{title}</h3>
          <div className="flex flex-wrap gap-2">
            <Badge variant="outline" className={getStatusClass(status)}>
              <span className="flex items-center gap-1">
                {getStatusIcon(status)}
                {status}
              </span>
            </Badge>
            <Badge className={getPriorityClass(priority)}>
              {priority}
            </Badge>
          </div>
        </div>
        
        <p className="text-sm text-muted-foreground mb-4 line-clamp-2">{description}</p>
        
        <div className="flex justify-between text-xs text-muted-foreground">
          <div className="space-x-4">
            <span>Criado: {createdAt}</span>
            <span>Atualizado: {updatedAt}</span>
          </div>
          <div className="flex items-center">
            <MessageSquare className="h-3 w-3 mr-1" />
            <span>{messageCount}</span>
          </div>
        </div>
      </CardContent>
      <CardFooter className="bg-muted/30 p-3">
        <div className="w-full">
          <Link to={`/suporte/${id}`} className="w-full">
            <Button variant="outline" size="sm" className="w-full">
              Ver ticket
            </Button>
          </Link>
        </div>
      </CardFooter>
    </Card>
  );
};

export default SupportTicketItem;
