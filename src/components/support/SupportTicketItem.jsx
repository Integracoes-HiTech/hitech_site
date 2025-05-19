
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { MessageSquare, CalendarIcon } from "lucide-react";
import { formatDateBR } from "@/components/utils/date";
const SupportTicketItem = ({
  id,
  title,
  description,
  status,
  priority,
  createdAt,
  updatedAt,
  messageCount
}) => {
  const getStatusColor = () => {
    switch (status) {
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

  const getPriorityColor = () => {
    switch (priority) {
      case 'Alta':
        return 'text-red-500';
      case 'Média':
        return 'text-amber-500';
      case 'Baixa':
        return 'text-green-500';
      default:
        return '';
    }
  };

  return (
    <Card className="hover:shadow-md transition-shadow overflow-hidden">
      <CardContent className="p-0">
        <div className="border-l-4 border-blue-500 p-4">
          <div className="flex justify-between items-start mb-2">
            <h3 className="font-medium">{title}</h3>
            <Badge variant="outline" className={getStatusColor()}>
              {status}
            </Badge>
          </div>
          
          <p className="text-sm text-muted-foreground mb-3 line-clamp-2">{description}</p>
          
          <div className="flex items-center justify-between">
            <div className="flex gap-3 text-xs">
              <div className="flex items-center">
                <CalendarIcon className="mr-1 h-3 w-3 text-muted-foreground" />
                <span className="text-muted-foreground">{formatDateBR(createdAt)}</span>
              </div>
              
              <div className={`font-medium ${getPriorityColor()}`}>
                {priority}
              </div>
            </div>
            
            <Link to={`/ticket/${id}`}>
              <Button size="sm" variant="ghost">
                   Ver detalhes
              </Button>
           </Link>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default SupportTicketItem;
