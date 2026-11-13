import { IconStar } from "@/components/icons";

export function Stars({ className = "" }: { className?: string }) {
  return (
    <div
      className={`flex gap-0.5 text-amber-500 ${className}`}
      role="img"
      aria-label="5 trên 5 sao"
    >
      {Array.from({ length: 5 }, (_, index) => (
        <IconStar className="icon size-[15px]" key={index} />
      ))}
    </div>
  );
}
