import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Link } from "wouter";
import { type Function } from "@shared/schema";

interface FunctionCardProps {
  function: Function;
}

export default function FunctionCard({ function: func }: FunctionCardProps) {
  return (
    <Card className="h-full hover:shadow-md transition-shadow duration-200 border-ms-gray-border">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between gap-2">
          <CardTitle className="text-lg font-semibold text-ms-blue hover:text-ms-blue-hover">
            <Link href={`/functions/${func.category}/${func.name}`}>
              {func.name}
            </Link>
          </CardTitle>
          <div className="flex flex-col gap-1">
            <Badge variant="outline" className="text-xs">
              {func.category.replace('-', ' and ')}
            </Badge>
            {func.deprecated && (
              <Badge variant="destructive" className="text-xs">
                Deprecated
              </Badge>
            )}
            {func.volatile && (
              <Badge variant="secondary" className="text-xs">
                Volatile
              </Badge>
            )}
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-ms-gray-secondary leading-relaxed mb-3">
          {func.description}
        </p>
        <div className="text-xs text-ms-gray-secondary">
          <span className="font-mono bg-ms-gray-light px-2 py-1 rounded">
            {func.returnType}
          </span>
        </div>
      </CardContent>
    </Card>
  );
}
