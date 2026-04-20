import svgPaths from "./svg-jr0447fduc";

function Paragraph() {
  return (
    <div className="h-[28.797px] relative shrink-0 w-[177.656px]" data-name="Paragraph">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Actor:Regular',sans-serif] leading-[28.8px] left-0 not-italic text-[#1b2736] text-[24px] top-[-1px] whitespace-nowrap">Remove Location</p>
      </div>
    </div>
  );
}

function Icon() {
  return (
    <div className="h-[12px] overflow-clip relative shrink-0 w-full" data-name="Icon">
      <div className="absolute inset-[12.5%]" data-name="Vector">
        <div className="absolute inset-[-6.25%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 10.125 10.125">
            <path d={svgPaths.p1039f5d8} id="Vector" stroke="var(--stroke-0, #384857)" strokeLinecap="round" strokeWidth="1.125" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function Container3() {
  return (
    <div className="relative shrink-0 size-[28px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start pt-[8px] px-[8px] relative size-full">
        <Icon />
      </div>
    </div>
  );
}

function Button() {
  return (
    <div className="relative rounded-[40px] shrink-0 size-[28px]" data-name="Button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center relative size-full">
        <Container3 />
      </div>
    </div>
  );
}

function Container2() {
  return (
    <div className="h-[72px] relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex items-center justify-between px-[24px] relative size-full">
          <Paragraph />
          <Button />
        </div>
      </div>
    </div>
  );
}

function Container4() {
  return <div className="bg-[#f0f0f0] h-px shrink-0 w-full" data-name="Container" />;
}

function Container1() {
  return (
    <div className="h-[73px] relative shrink-0 w-[520px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative size-full">
        <Container2 />
        <Container4 />
      </div>
    </div>
  );
}

function Icon1() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="Icon">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g id="Icon">
          <path d={svgPaths.p36d827c0} id="Vector" stroke="var(--stroke-0, #C4320A)" strokeWidth="1.5" />
          <path d="M10 6.5V10.5" id="Vector_2" stroke="var(--stroke-0, #C4320A)" strokeLinecap="round" strokeWidth="1.5" />
          <path d={svgPaths.p24057700} fill="var(--fill-0, #C4320A)" id="Vector_3" />
        </g>
      </svg>
    </div>
  );
}

function Container7() {
  return (
    <div className="absolute bg-[#fff7ed] content-stretch flex items-center justify-center left-0 px-[10px] rounded-[20px] size-[40px] top-[2px]" data-name="Container">
      <Icon1 />
    </div>
  );
}

function Paragraph1() {
  return (
    <div className="h-[40px] relative shrink-0 w-[408px]" data-name="Paragraph">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[0] left-0 not-italic text-[#1d2c38] text-[0px] top-[-1px] w-[398px]">
          <span className="leading-[20px] text-[14px]">{`Removing `}</span>
          <span className="font-['Open_Sans:SemiBold_Italic',sans-serif] italic leading-[20px] text-[#384857] text-[14px]" style={{ fontVariationSettings: "'wdth' 100" }}>{`"Cleveland Hospital Building"`}</span>
          <span className="leading-[20px] text-[14px]">{` from `}</span>
          <span className="font-['Open_Sans:SemiBold',sans-serif] leading-[20px] text-[#384857] text-[14px]" style={{ fontVariationSettings: "'wdth' 100" }}>
            Primary LBS
          </span>
          <span className="leading-[20px] text-[14px]">{` will also remove all its child locations.`}</span>
        </p>
      </div>
    </div>
  );
}

function Paragraph2() {
  return (
    <div className="flex-[1_0_0] min-h-px min-w-px relative w-[408px]" data-name="Paragraph">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[20px] left-0 not-italic text-[#616d79] text-[13px] top-0 w-[398px]">Any project elements — inspections, issues, drawings, or RFIs — currently tagged to this location or any of its children will lose their location assignment. This action cannot be undone.</p>
      </div>
    </div>
  );
}

function Container8() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[6px] h-[106px] items-start left-[56px] top-0 w-[408px]" data-name="Container">
      <Paragraph1 />
      <Paragraph2 />
    </div>
  );
}

function Container6() {
  return (
    <div className="h-[106px] relative shrink-0 w-[464px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <Container7 />
        <Container8 />
      </div>
    </div>
  );
}

function Container10() {
  return (
    <div className="bg-white relative rounded-[3px] shrink-0 size-[16px]" data-name="Container">
      <div aria-hidden="true" className="absolute border border-[#d0d5dd] border-solid inset-0 pointer-events-none rounded-[3px]" />
    </div>
  );
}

function Text() {
  return (
    <div className="h-[20px] relative shrink-0 w-[191.281px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[20px] left-0 not-italic text-[#384857] text-[13px] top-0 whitespace-nowrap">{`Don't show this message again`}</p>
      </div>
    </div>
  );
}

function Container9() {
  return (
    <div className="h-[24px] relative shrink-0 w-[464px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[10px] items-center relative size-full">
        <Container10 />
        <Text />
      </div>
    </div>
  );
}

function Container5() {
  return (
    <div className="flex-[1_0_0] min-h-px min-w-px relative w-[520px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col gap-[16px] items-start pl-[28px] pt-[24px] relative size-full">
        <Container6 />
        <Container9 />
      </div>
    </div>
  );
}

function Button1() {
  return (
    <div className="bg-[#f2f3f4] h-[36px] relative rounded-[4px] shrink-0 w-[79.922px]" data-name="Button">
      <div aria-hidden="true" className="absolute border border-[#c3c7cc] border-solid inset-0 pointer-events-none rounded-[4px]" />
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="-translate-x-1/2 absolute font-['Inter:Regular',sans-serif] font-normal leading-[21px] left-[40px] not-italic text-[#616d79] text-[14px] text-center top-[7.5px] whitespace-nowrap">Cancel</p>
      </div>
    </div>
  );
}

function Button2() {
  return (
    <div className="bg-[#d92d20] h-[36px] relative rounded-[4px] shrink-0 w-[154px]" data-name="Button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="-translate-x-1/2 absolute font-['Inter:Regular',sans-serif] font-normal leading-[21px] left-[77px] not-italic text-[14px] text-center text-white top-[7.5px] whitespace-nowrap">Remove Location</p>
      </div>
    </div>
  );
}

function Container11() {
  return (
    <div className="bg-white h-[72px] relative shrink-0 w-[520px]" data-name="Container">
      <div aria-hidden="true" className="absolute border-[#c3c7cc] border-solid border-t inset-0 pointer-events-none" />
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-between pt-px px-[28px] relative size-full">
        <Button1 />
        <Button2 />
      </div>
    </div>
  );
}

export default function Container() {
  return (
    <div className="bg-white content-stretch flex flex-col items-start overflow-clip relative rounded-[8px] shadow-[0px_8px_40px_0px_rgba(0,0,0,0.24)] size-full" data-name="Container">
      <Container1 />
      <Container5 />
      <Container11 />
    </div>
  );
}