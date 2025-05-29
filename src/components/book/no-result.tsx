import { Icon } from "@/components/ui/icon";
import { Caption } from "@/components/ui/typography";

interface NoResultProps {
  message: string;
}

export default function NoResult({ message }: NoResultProps) {
  return (
    <div className="flex flex-col items-center justify-center gap-5">
      <Icon icon="icon-book" size={80} />
      <Caption className="text-text-secondary">{message}</Caption>
    </div>
  );
}
