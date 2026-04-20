import svgPaths from "./svg-2txu3l5luk";

function Container3() {
  return (
    <div className="h-[20px] relative shrink-0 w-full" data-name="Container">
      <p className="absolute font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[20px] left-0 not-italic text-[#1d2c38] text-[14px] top-[0.33px] whitespace-nowrap">Team Composition</p>
    </div>
  );
}

function Container4() {
  return (
    <div className="content-stretch flex h-[16px] items-start relative shrink-0 w-full" data-name="Container">
      <p className="flex-[1_0_0] font-['Inter:Regular',sans-serif] font-normal leading-[16px] min-h-px min-w-px not-italic relative text-[#616d79] text-[12px]">MEP Working Group</p>
    </div>
  );
}

function Container2() {
  return (
    <div className="h-[37px] relative shrink-0 w-[320px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col gap-px items-start relative size-full">
        <Container3 />
        <Container4 />
      </div>
    </div>
  );
}

function Container5() {
  return <div className="bg-[#e0e4e8] h-[32px] shrink-0 w-px" data-name="Container" />;
}

function Icon() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="Icon">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g clipPath="url(#clip0_2177_6386)" id="Icon">
          <path d={svgPaths.p18fc8d80} id="Vector" stroke="var(--stroke-0, #9CA4AE)" strokeWidth="1.2" />
          <path d="M8 7V12M8 5V5.5" id="Vector_2" stroke="var(--stroke-0, #9CA4AE)" strokeLinecap="round" strokeWidth="1.3" />
        </g>
        <defs>
          <clipPath id="clip0_2177_6386">
            <rect fill="white" height="16" width="16" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Text() {
  return (
    <div className="flex-[1_0_0] h-[19.5px] min-h-px min-w-px relative" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start overflow-clip relative rounded-[inherit] size-full">
        <p className="font-['Open_Sans:Regular',sans-serif] font-normal leading-[19.5px] relative shrink-0 text-[#616d79] text-[13px] whitespace-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
          Mechanical, electrical and plumbing coordination across all building services packages.
        </p>
      </div>
    </div>
  );
}

function Container6() {
  return (
    <div className="h-[19.5px] relative shrink-0 w-[547.479px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[8px] items-center relative size-full">
        <Icon />
        <Text />
      </div>
    </div>
  );
}

function Container1() {
  return (
    <div className="flex-[1_0_0] h-[37px] min-h-px min-w-px relative" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[16px] items-center relative size-full">
        <Container2 />
        <Container5 />
        <Container6 />
      </div>
    </div>
  );
}

function EditIconSvg() {
  return (
    <div className="absolute left-[15.33px] size-[14px] top-[11px]" data-name="EditIconSvg">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14 14">
        <g id="EditIconSvg">
          <path d={svgPaths.p13c7f900} id="Vector" stroke="var(--stroke-0, #616D79)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.3" />
        </g>
      </svg>
    </div>
  );
}

function Button() {
  return (
    <div className="bg-[#f2f3f4] h-[36px] relative rounded-[4px] shrink-0 w-[75.625px]" data-name="Button">
      <div aria-hidden="true" className="absolute border-[#c3c7cc] border-[1.333px] border-solid inset-0 pointer-events-none rounded-[4px]" />
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <EditIconSvg />
        <p className="-translate-x-1/2 absolute font-['Inter:Regular',sans-serif] font-normal leading-[21px] left-[47.33px] not-italic text-[#616d79] text-[14px] text-center top-[6.83px] whitespace-nowrap">Edit</p>
      </div>
    </div>
  );
}

export default function Container() {
  return (
    <div className="bg-white content-stretch flex items-center justify-between pb-[1.333px] px-[20px] relative size-full" data-name="Container">
      <div aria-hidden="true" className="absolute border-[#d9d9d9] border-b-[1.333px] border-solid inset-0 pointer-events-none" />
      <Container1 />
      <Button />
    </div>
  );
}