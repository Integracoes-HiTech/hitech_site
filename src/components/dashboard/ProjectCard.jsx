
import { Card, CardContent, CardHeader, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Link } from "react-router-dom";
import { CircleCheck, CirclePause, CircleDollarSign, CircleX } from "lucide-react";

const getStatusIcon = (status) => {
  switch(status) {
    case 'Em andamento':
      return <CirclePause className="h-4 w-4" />;
    case 'Aguardando aprovação':
      return <CircleCheck className="h-4 w-4" />;
    case 'Concluído':
      return <CircleCheck className="h-4 w-4" />;
    case 'Aguardando pagamento':
      return <CircleDollarSign className="h-4 w-4" />;
    default:
      return <CircleX className="h-4 w-4" />;
  }
};

const getStatusClass = (status) => {
  switch(status) {
    case 'Em andamento':
      return 'status-ongoing';
    case 'Aguardando aprovação':
      return 'status-approval';
    case 'Concluído':
      return 'status-completed';
    case 'Aguardando pagamento':
      return 'status-payment';
    default:
      return '';
  }
};

const ProjectCard = ({
  id,
  title,
  description,
  status,
  progress,
  updatedAt,
  deadline
}) => {
  return (
    <Card className="card-shadow animated-card overflow-hidden h-full flex flex-col">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <h3 className="font-semibold text-lg">{title}</h3>
          <Badge variant="outline" className={getStatusClass(status)}>
            <span className="flex items-center">
              {getStatusIcon(status)}
              <span className="ml-1">{status}</span>
            </span>
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="pb-4 flex-grow">
        <p className="text-sm text-muted-foreground line-clamp-2 mb-4">{description}</p>
        <div className="space-y-3">
          <div className="space-y-1">
            <div className="flex justify-between text-xs">
              <span>Progresso</span>
              <span>{progress}%</span>
            </div>
            <Progress value={progress} className="h-2" />
          </div>
          {deadline && (
            <div className="flex justify-between text-xs mt-2">
              <span className="text-muted-foreground">Prazo:</span>
              <span className="font-medium">{deadline}</span>
            </div>
          )}
          <div className="flex justify-between text-xs">
            <span className="text-muted-foreground">Última atualização:</span>
            <span className="font-medium">{updatedAt}</span>
          </div>
        </div>
      </CardContent>
      <CardFooter className="pt-2 pb-4">
        <Link to={`/projeto/${id}`} className="w-full">
          <Button variant="outline" className="w-full">Ver detalhes</Button>
        </Link>
      </CardFooter>
    </Card>
  );
};

export default ProjectCard;
