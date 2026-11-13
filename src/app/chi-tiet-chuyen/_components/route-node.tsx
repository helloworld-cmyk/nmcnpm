/* Chấm điểm đầu/cuối hành trình kèm vòng ping nhấp nháy */
const PING_RING =
  "absolute -inset-[3px] rounded-full border-[1.5px] animate-[ticketDotPing_2.8s_ease-out_infinite]";

export function RouteNode({ end = false }: { end?: boolean }) {
  return (
    <span
      aria-hidden="true"
      className={`relative z-[1] mt-0 size-[11px] shrink-0 rounded-full max-[640px]:self-center ${
        end
          ? "border-[2.5px] border-[var(--orange-500)] bg-white shadow-[0_0_0_4px_rgba(249,115,22,0.12)]"
          : "bg-[var(--sky-600)] shadow-[0_0_0_4px_rgba(2,132,199,0.13)]"
      }`}
    >
      <span
        aria-hidden="true"
        className={`${PING_RING} ${
          end
            ? "border-[rgba(249,115,22,0.4)] [animation-delay:1.4s]"
            : "border-[rgba(2,132,199,0.35)]"
        }`}
      />
    </span>
  );
}
