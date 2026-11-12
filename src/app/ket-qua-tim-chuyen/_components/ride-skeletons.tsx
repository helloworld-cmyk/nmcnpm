const SKELETON_COUNT = 6;

const SK = "rounded-lg bg-[var(--slate-200)]";

export function RideSkeletons() {
  return (
    <div className="grid grid-cols-2 gap-3.5 max-[640px]:grid-cols-1" aria-hidden="true">
      {Array.from({ length: SKELETON_COUNT }, (_, index) => (
        <div
          className="flex flex-col rounded-[var(--radius-md)] border border-line bg-white p-[16px_18px]"
          key={index}
        >
          <div className={`${SK} h-[18px] w-[46%]`} />
          <div className={`${SK} mt-2.5 h-[13px] w-[70%]`} />
          <div className="mt-3.5 flex items-center gap-2.5">
            <span className={`${SK} size-[38px] shrink-0 rounded-full`} />
            <div className="grid flex-1 gap-[7px]">
              <div className={`${SK} h-3 w-[52%]`} />
            </div>
            <span className={`${SK} ml-auto h-[11px] w-[38%]`} />
          </div>
          <div className="mt-auto flex items-center justify-between gap-3 pt-4">
            <span className={`${SK} h-5 w-[92px] shrink-0`} />
            <span className={`${SK} h-10 w-[118px] shrink-0 rounded-[10px]`} />
          </div>
        </div>
      ))}
    </div>
  );
}
