
import { useState } from "react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileTextIcon, DownloadIcon, ExternalLinkIcon } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export interface FileCardProps {
  id: string;
  name: string;
  type: string;
  size: string;
  createdAt: string;
  url: string;
  category: string;
}

const getFileIcon = (type: string) => {
  // Simplified logic - in a real app, you might have more file types
  return <FileTextIcon className="h-10 w-10 text-blue-500" />;
};

const FileCard = ({
  id,
  name,
  type,
  size,
  createdAt,
  url,
  category
}: FileCardProps) => {
  const [isDownloading, setIsDownloading] = useState(false);
  const { toast } = useToast();

  const handleDownload = () => {
    setIsDownloading(true);
    
    // In a real app, this would be a proper download function
    setTimeout(() => {
      toast({
        title: "Download iniciado",
        description: `${name} está sendo baixado.`,
      });
      
      // Create a fake download anchor
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", name);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      setIsDownloading(false);
    }, 1000);
  };

  const handlePreview = () => {
    window.open(url, "_blank");
  };

  return (
    <Card className="h-full flex flex-col card-shadow">
      <CardContent className="pt-6 pb-2 flex-grow">
        <div className="flex flex-col items-center mb-4">
          {getFileIcon(type)}
          <h3 className="font-medium text-sm mt-2 text-center line-clamp-1">{name}</h3>
        </div>
        <div className="space-y-1 text-xs text-muted-foreground">
          <div className="flex justify-between">
            <span>Tipo:</span>
            <span className="font-medium text-foreground">{type.toUpperCase()}</span>
          </div>
          <div className="flex justify-between">
            <span>Tamanho:</span>
            <span className="font-medium text-foreground">{size}</span>
          </div>
          <div className="flex justify-between">
            <span>Categoria:</span>
            <span className="font-medium text-foreground">{category}</span>
          </div>
          <div className="flex justify-between">
            <span>Data:</span>
            <span className="font-medium text-foreground">{createdAt}</span>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex flex-col gap-2 pt-2 pb-4">
        <Button 
          variant="outline" 
          size="sm" 
          className="w-full" 
          onClick={handleDownload}
          disabled={isDownloading}
        >
          <DownloadIcon className="h-4 w-4 mr-2" />
          {isDownloading ? "Baixando..." : "Download"}
        </Button>
        <Button 
          variant="ghost" 
          size="sm" 
          className="w-full" 
          onClick={handlePreview}
        >
          <ExternalLinkIcon className="h-4 w-4 mr-2" />
          Visualizar
        </Button>
      </CardFooter>
    </Card>
  );
};

export default FileCard;
