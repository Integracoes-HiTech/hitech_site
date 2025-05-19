
import { Card, CardContent, CardHeader, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Link } from "react-router-dom";
import { CircleCheck, CirclePause, CircleDollarSign, CircleX } from "lucide-react";


export type ProjectStatus = 'Em andamento' | 'Aguardando aprovação' | 'Concluído' | 'Aguardando pagamento';

export interface ProjectCardProps {
  id: string;
  title: string;
  description: string;
  status: ProjectStatus;
  progress: number;
  updatedAt: string;
  deadline?: string;
}

const getStatusIcon = (status: ProjectStatus) => {
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

const getStatusClass = (status: ProjectStatus) => {
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
}: ProjectCardProps) => {
  return (
    <Card className="card-shadow animated-card overflow-hidden h-full flex flex-col">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <h3 className="font-semibold text-lg">{title}</h3>
          <Badge variant="outline" className={`text-xs px-2 py-1 ${getStatusClass(status)}`}>
  <span className="flex items-center gap-1">
    {getStatusIcon(status)}
    {status}
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
      <Link to={`/projeto/${id}`}>
  <Button size="sm"></Button>
</Link>
      </CardFooter>
    </Card>
  );
};

export default ProjectCard;
