
import { Card, CardContent } from "@/components/ui/card";
import { LucideIcon } from "lucide-react";

interface StatCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  description?: string;
  change?: {
    value: number;
    type: "increase" | "decrease";
  };
  color?: "primary" | "secondary" | "success" | "warning" | "info";
}

const getColorClass = (color: StatCardProps["color"] = "primary") => {
  switch (color) {
    case "primary":
      return "text-primary";
    case "secondary":
      return "text-secondary";
    case "success":
      return "text-green-600";
    case "warning":
      return "text-amber-600";
    case "info":
      return "text-blue-600";
    default:
      return "text-primary";
  }
};

const StatCard = ({ title, value, icon: Icon, description, change, color = "primary" }: StatCardProps) => {
  const colorClass = getColorClass(color);
  
  return (
    <Card className="h-full">
      <CardContent className="p-6">
        <div className="flex justify-between items-start">
          <div>
            <p className="text-sm font-medium text-muted-foreground">{title}</p>
            <h3 className="text-2xl font-bold mt-1">{value}</h3>
          </div>
          <div className={`p-2 rounded-full bg-opacity-10 ${color === "primary" ? "bg-primary/10" : color === "secondary" ? "bg-secondary/10" : "bg-gray-100"}`}>
            <Icon className={`h-5 w-5 ${colorClass}`} />
          </div>
        </div>
        {(description || change) && (
          <div className="mt-3 text-xs">
            {description && <p className="text-muted-foreground">{description}</p>}
            {change && (
              <p className={change.type === "increase" ? "text-green-600" : "text-red-600"}>
                {change.type === "increase" ? "+" : "-"}{change.value}%{" "}
                <span className="text-muted-foreground ml-1">
                  que o último período
                </span>
              </p>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default StatCard;
