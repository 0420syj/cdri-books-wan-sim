import { Icon } from "@/components/ui/icon";
import { Caption } from "@/components/ui/typography";

export default function NoResult() {
  return (
    <div className="flex flex-col items-center justify-center gap-5">
      <Icon icon="icon-book" size={80} />
      <Caption className="text-text-secondary">검색된 결과가 없습니다.</Caption>
    </div>
  );
}
