import svgPaths from "./svg-1q1eitm85y";

function Text() {
  return (
    <div className="flex-[1_0_0] h-[19.5px] min-h-px min-w-px relative" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start overflow-clip relative rounded-[inherit] size-full">
        <p className="font-['Open_Sans:Regular',sans-serif] font-normal leading-[19.5px] relative shrink-0 text-[#1d2939] text-[13px] w-[312.333px]" style={{ fontVariationSettings: "'wdth' 100" }}>
          Core Construction Team
        </p>
      </div>
    </div>
  );
}

function Icon() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="Icon">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g id="Icon">
          <path d={svgPaths.p3c788b00} id="Vector" stroke="var(--stroke-0, #1890FF)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
        </g>
      </svg>
    </div>
  );
}

export default function Container() {
  return (
    <div className="bg-[#e6f7ff] content-stretch flex items-center pl-[19px] pr-[16px] relative size-full" data-name="Container">
      <div aria-hidden="true" className="absolute border-[#1890ff] border-l-3 border-solid inset-0 pointer-events-none" />
      <Text />
      <Icon />
    </div>
  );
}