import svgPaths from "./svg-vu3qi7iapo";

function Group() {
  return (
    <div className="relative size-full">
      <div className="absolute inset-[-5%_-5%_-5%_0]">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 15.75 16.5">
          <g id="Group 8">
            <path d={svgPaths.p18c7ece0} id="Vector 64" stroke="var(--stroke-0, white)" strokeLinejoin="round" strokeWidth="1.5" />
            <g id="Group 27">
              <path d="M1.31134e-07 8.25L12 8.25" id="Vector 8" stroke="var(--stroke-0, white)" strokeWidth="1.5" />
              <path d="M9 11.25L12 8.25L9 5.25" id="Vector" stroke="var(--stroke-0, white)" strokeWidth="1.5" />
            </g>
          </g>
        </svg>
      </div>
    </div>
  );
}

function Content() {
  return (
    <div className="bg-[#ff4d00] content-stretch flex gap-[4px] h-[36px] items-center justify-center overflow-clip px-[16px] relative rounded-[4px] shrink-0" data-name="content">
      <div className="overflow-clip relative shrink-0 size-[18px]" data-name="24px/app/download">
        <div className="absolute flex inset-[8.33%] items-center justify-center">
          <div className="flex-none rotate-90 size-[20px]">
            <Group />
          </div>
        </div>
      </div>
      <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[16px] text-center text-white whitespace-nowrap">
        <p className="leading-[22px]">Button</p>
      </div>
      <div className="overflow-clip relative shrink-0 size-[18px]" data-name="24px/directional/chevron-down">
        <div className="absolute bottom-[37.5%] flex items-center justify-center left-1/4 right-1/4 top-[37.5%]">
          <div className="-rotate-90 flex-none h-[12px] w-[6px]">
            <div className="relative size-full" data-name="Vector">
              <div className="absolute inset-[-11.79%_-23.57%]">
                <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 6.62132 11.1213">
                  <path d={svgPaths.p291da40} id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="square" strokeWidth="1.5" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function PrimaryDefault() {
  return (
    <div className="content-stretch flex flex-col items-center justify-center relative size-full" data-name="Primary Default">
      <Content />
    </div>
  );
}