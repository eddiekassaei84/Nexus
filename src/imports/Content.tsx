import svgPaths from "./svg-yjrzoufxgw";

function Group() {
  return (
    <div className="relative size-full">
      <div className="absolute inset-[-5%_-5%_-5%_0]">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 15.75 16.5">
          <g id="Group 8">
            <path d={svgPaths.p18c7ece0} id="Vector 64" stroke="var(--stroke-0, #3B82F6)" strokeLinejoin="round" strokeWidth="1.5" />
            <g id="Group 27">
              <path d="M1.31134e-07 8.25L12 8.25" id="Vector 8" stroke="var(--stroke-0, #3B82F6)" strokeWidth="1.5" />
              <path d="M9 11.25L12 8.25L9 5.25" id="Vector" stroke="var(--stroke-0, #3B82F6)" strokeWidth="1.5" />
            </g>
          </g>
        </svg>
      </div>
    </div>
  );
}

export default function Content() {
  return (
    <div className="content-stretch flex gap-[4px] items-center justify-center overflow-clip px-[16px] relative rounded-[4px] size-full" data-name="content">
      <div className="overflow-clip relative shrink-0 size-[18px]" data-name="24px/app/download">
        <div className="absolute flex inset-[8.33%] items-center justify-center">
          <div className="flex-none rotate-90 size-[20px]">
            <Group />
          </div>
        </div>
      </div>
      <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[#3b82f6] text-[0px] text-center whitespace-nowrap">
        <p className="decoration-solid leading-[20px] text-[14px] underline">Download Import Template</p>
      </div>
    </div>
  );
}