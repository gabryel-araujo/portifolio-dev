import { Badge } from "@/components/ui/badge";

interface TagProps {
  label: string;
}

export function Tag({ label }: TagProps) {
  return (
    <Badge variant="secondary" className="font-normal">
      {label}
    </Badge>
  );
}
