import svgPaths from "./svg-sdqwfubjkv";

function Text() {
  return (
    <div className="h-[19.5px] relative shrink-0 w-[41.109px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start relative size-full">
        <p className="font-['Open_Sans:SemiBold',sans-serif] font-semibold leading-[19.5px] relative shrink-0 text-[#384857] text-[16px] whitespace-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
          Teams
        </p>
      </div>
    </div>
  );
}

function Container1() {
  return (
    <div className="bg-[#fafafa] h-[48px] relative shrink-0 w-[358px]" data-name="Container">
      <div aria-hidden="true" className="absolute border-[#f0f0f0] border-b border-solid inset-0 pointer-events-none" />
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start justify-center pb-px pl-[12px] relative size-full">
        <Text />
      </div>
    </div>
  );
}

function MasterSwitchHandleDefault() {
  return (
    <div className="-translate-y-1/2 absolute overflow-clip right-[2px] shadow-[0px_2px_4px_0px_rgba(0,35,11,0.2)] size-[16px] top-1/2" data-name="master/switch/handle/default">
      <div className="absolute bg-white inset-0 rounded-[16px]" />
    </div>
  );
}

function Toggleswitch() {
  return (
    <div className="h-[20px] relative shrink-0 w-[40px]" data-name="Toggleswitch">
      <div className="absolute bg-[#ff4d00] inset-0 rounded-[16px]" data-name="Plate" />
      <MasterSwitchHandleDefault />
    </div>
  );
}

function Button() {
  return (
    <div className="content-stretch flex gap-[4px] items-center px-[12px] py-[6px] relative rounded-[4px] shrink-0" data-name="Button">
      <Toggleswitch />
      <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[21px] not-italic relative shrink-0 text-[#616d79] text-[14px] text-center whitespace-nowrap">Group by Trade</p>
    </div>
  );
}

function PlusIconSvg() {
  return (
    <div className="absolute left-[8px] size-[12px] top-[10px]" data-name="PlusIconSvg">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12 12">
        <g clipPath="url(#clip0_2179_15276)" id="PlusIconSvg">
          <path d={svgPaths.p33437200} fill="var(--fill-0, white)" id="Vector" />
        </g>
        <defs>
          <clipPath id="clip0_2179_15276">
            <rect fill="white" height="12" width="12" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Button1() {
  return (
    <div className="bg-[#ff4d00] h-[32px] relative rounded-[4px] shrink-0 w-[94.328px]" data-name="Button">
      <PlusIconSvg />
      <p className="-translate-x-1/2 absolute font-['Inter:Regular',sans-serif] font-normal leading-[19.5px] left-[55.5px] not-italic text-[13px] text-center text-white top-[6.25px] whitespace-nowrap">Add Team</p>
    </div>
  );
}

function Container2() {
  return (
    <div className="bg-white relative shrink-0 w-full" data-name="Container">
      <div aria-hidden="true" className="absolute border-[#e5e7eb] border-b border-solid inset-0 pointer-events-none" />
      <div className="flex flex-row items-center size-full">
        <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-between px-[8px] py-[7px] relative w-full">
          <Button />
          <Button1 />
        </div>
      </div>
    </div>
  );
}

function SearchIconSvg() {
  return (
    <div className="h-[16px] overflow-clip relative shrink-0 w-full" data-name="SearchIconSvg">
      <div className="absolute inset-[9.38%_28.13%_28.13%_9.38%]" data-name="Vector">
        <div className="absolute inset-[-6%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 11.2 11.2">
            <path d={svgPaths.p1c5095b0} id="Vector" stroke="var(--stroke-0, #9CA4AE)" strokeWidth="1.2" />
          </svg>
        </div>
      </div>
      <div className="absolute inset-[65.63%_12.5%_12.5%_65.63%]" data-name="Vector">
        <div className="absolute inset-[-17.14%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 4.7 4.7">
            <path d="M0.6 0.6L4.1 4.1" id="Vector" stroke="var(--stroke-0, #9CA4AE)" strokeLinecap="round" strokeWidth="1.2" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function Container5() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 size-[16px]" data-name="Container">
      <SearchIconSvg />
    </div>
  );
}

function TextInput() {
  return (
    <div className="bg-white h-[32px] relative rounded-[4px] shrink-0 w-[342px]" data-name="Text Input">
      <div className="content-stretch flex gap-[8px] items-center overflow-clip px-[8px] relative rounded-[inherit] size-full">
        <Container5 />
        <p className="font-['Open_Sans:Regular',sans-serif] font-normal leading-[normal] relative shrink-0 text-[13px] text-[rgba(52,64,84,0.5)] whitespace-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
          Search teams…
        </p>
      </div>
      <div aria-hidden="true" className="absolute border border-[#d0d5dd] border-solid inset-0 pointer-events-none rounded-[4px]" />
    </div>
  );
}

function Container4() {
  return (
    <div className="flex-[1_0_0] min-h-px min-w-px relative" data-name="Container">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex items-center justify-between p-[8px] relative w-full">
          <TextInput />
        </div>
      </div>
    </div>
  );
}

function Container3() {
  return (
    <div className="bg-white relative shrink-0 w-[358px]" data-name="Container">
      <div aria-hidden="true" className="absolute border-[#e5e7eb] border-b border-solid inset-0 pointer-events-none" />
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center px-[8px] py-[7px] relative w-full">
        <Container4 />
      </div>
    </div>
  );
}

function Text1() {
  return (
    <div className="flex-[1_0_0] h-[19.5px] min-h-px min-w-px relative" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start overflow-clip relative rounded-[inherit] size-full">
        <p className="flex-[1_0_0] font-['Open_Sans:Regular',sans-serif] font-normal leading-[19.5px] min-h-px min-w-px relative text-[#1d2939] text-[13px]" style={{ fontVariationSettings: "'wdth' 100" }}>
          BIM Coordination
        </p>
      </div>
    </div>
  );
}

function Container7() {
  return (
    <div className="absolute bg-white content-stretch flex h-[40px] items-center left-0 pb-px pl-[19px] pr-[8px] top-[28px] w-[358px]" data-name="Container">
      <div aria-hidden="true" className="absolute border-[rgba(0,0,0,0)] border-b border-l-3 border-solid inset-0 pointer-events-none" />
      <Text1 />
    </div>
  );
}

function Text2() {
  return (
    <div className="flex-[1_0_0] h-[19.5px] min-h-px min-w-px relative" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start overflow-clip relative rounded-[inherit] size-full">
        <p className="flex-[1_0_0] font-['Open_Sans:Regular',sans-serif] font-normal leading-[19.5px] min-h-px min-w-px relative text-[#1d2939] text-[13px]" style={{ fontVariationSettings: "'wdth' 100" }}>
          Core Construction Team
        </p>
      </div>
    </div>
  );
}

function Icon() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="Icon">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="Icon">
          <path d={svgPaths.p19fa3b00} id="Vector" stroke="var(--stroke-0, #1890FF)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.2" />
        </g>
      </svg>
    </div>
  );
}

function Container9() {
  return (
    <div className="bg-[#e6f7ff] h-[40px] relative shrink-0 w-full" data-name="Container">
      <div aria-hidden="true" className="absolute border-[#1890ff] border-b border-l-3 border-solid inset-0 pointer-events-none" />
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex gap-[4px] items-center pb-px pl-[16px] pr-[8px] relative size-full">
          <Text2 />
          <Icon />
        </div>
      </div>
    </div>
  );
}

function Text3() {
  return (
    <div className="flex-[1_0_0] h-[19.5px] min-h-px min-w-px relative" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start overflow-clip relative rounded-[inherit] size-full">
        <p className="flex-[1_0_0] font-['Open_Sans:Regular',sans-serif] font-normal leading-[19.5px] min-h-px min-w-px relative text-[#1d2939] text-[13px]" style={{ fontVariationSettings: "'wdth' 100" }}>{`Owner's Representative Panel`}</p>
      </div>
    </div>
  );
}

function Container10() {
  return (
    <div className="bg-white h-[40px] relative shrink-0 w-full" data-name="Container">
      <div aria-hidden="true" className="absolute border-[rgba(0,0,0,0)] border-b border-l-3 border-solid inset-0 pointer-events-none" />
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex items-center pb-px pl-[19px] pr-[8px] relative size-full">
          <Text3 />
        </div>
      </div>
    </div>
  );
}

function Text4() {
  return (
    <div className="flex-[1_0_0] h-[19.5px] min-h-px min-w-px relative" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start overflow-clip relative rounded-[inherit] size-full">
        <p className="flex-[1_0_0] font-['Open_Sans:Regular',sans-serif] font-normal leading-[19.5px] min-h-px min-w-px relative text-[#1d2939] text-[13px]" style={{ fontVariationSettings: "'wdth' 100" }}>
          Project Management Office
        </p>
      </div>
    </div>
  );
}

function Container11() {
  return (
    <div className="bg-white h-[40px] relative shrink-0 w-full" data-name="Container">
      <div aria-hidden="true" className="absolute border-[rgba(0,0,0,0)] border-b border-l-3 border-solid inset-0 pointer-events-none" />
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex items-center pb-px pl-[19px] pr-[8px] relative size-full">
          <Text4 />
        </div>
      </div>
    </div>
  );
}

function Container8() {
  return (
    <div className="absolute content-stretch flex flex-col h-[148px] items-start left-0 pt-[28px] top-[68px] w-[358px]" data-name="Container">
      <Container9 />
      <Container10 />
      <Container11 />
    </div>
  );
}

function Text5() {
  return (
    <div className="flex-[1_0_0] h-[19.5px] min-h-px min-w-px relative" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start overflow-clip relative rounded-[inherit] size-full">
        <p className="flex-[1_0_0] font-['Open_Sans:Regular',sans-serif] font-normal leading-[19.5px] min-h-px min-w-px relative text-[#1d2939] text-[13px]" style={{ fontVariationSettings: "'wdth' 100" }}>
          Design Cluster
        </p>
      </div>
    </div>
  );
}

function Container12() {
  return (
    <div className="absolute bg-white content-stretch flex h-[40px] items-center left-0 pb-px pl-[19px] pr-[8px] top-[244px] w-[358px]" data-name="Container">
      <div aria-hidden="true" className="absolute border-[rgba(0,0,0,0)] border-b border-l-3 border-solid inset-0 pointer-events-none" />
      <Text5 />
    </div>
  );
}

function Text6() {
  return (
    <div className="flex-[1_0_0] h-[19.5px] min-h-px min-w-px relative" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start overflow-clip relative rounded-[inherit] size-full">
        <p className="flex-[1_0_0] font-['Open_Sans:Regular',sans-serif] font-normal leading-[19.5px] min-h-px min-w-px relative text-[#1d2939] text-[13px]" style={{ fontVariationSettings: "'wdth' 100" }}>
          Site Supervisors
        </p>
      </div>
    </div>
  );
}

function Container13() {
  return (
    <div className="absolute bg-white content-stretch flex h-[40px] items-center left-0 pb-px pl-[19px] pr-[8px] top-[312px] w-[358px]" data-name="Container">
      <div aria-hidden="true" className="absolute border-[rgba(0,0,0,0)] border-b border-l-3 border-solid inset-0 pointer-events-none" />
      <Text6 />
    </div>
  );
}

function Text7() {
  return (
    <div className="flex-[1_0_0] h-[19.5px] min-h-px min-w-px relative" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start overflow-clip relative rounded-[inherit] size-full">
        <p className="flex-[1_0_0] font-['Open_Sans:Regular',sans-serif] font-normal leading-[19.5px] min-h-px min-w-px relative text-[#1d2939] text-[13px]" style={{ fontVariationSettings: "'wdth' 100" }}>
          MEP Working Group
        </p>
      </div>
    </div>
  );
}

function Container14() {
  return (
    <div className="absolute bg-white content-stretch flex h-[40px] items-center left-0 pb-px pl-[19px] pr-[8px] top-[380px] w-[358px]" data-name="Container">
      <div aria-hidden="true" className="absolute border-[rgba(0,0,0,0)] border-b border-l-3 border-solid inset-0 pointer-events-none" />
      <Text7 />
    </div>
  );
}

function Text8() {
  return (
    <div className="flex-[1_0_0] h-[19.5px] min-h-px min-w-px relative" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start overflow-clip relative rounded-[inherit] size-full">
        <p className="flex-[1_0_0] font-['Open_Sans:Regular',sans-serif] font-normal leading-[19.5px] min-h-px min-w-px relative text-[#1d2939] text-[13px]" style={{ fontVariationSettings: "'wdth' 100" }}>
          Structural Engineering Group
        </p>
      </div>
    </div>
  );
}

function Container15() {
  return (
    <div className="absolute bg-white content-stretch flex h-[40px] items-center left-0 pb-px pl-[19px] pr-[8px] top-[448px] w-[358px]" data-name="Container">
      <div aria-hidden="true" className="absolute border-[rgba(0,0,0,0)] border-b border-l-3 border-solid inset-0 pointer-events-none" />
      <Text8 />
    </div>
  );
}

function Text9() {
  return (
    <div className="flex-[1_0_0] h-[19.5px] min-h-px min-w-px relative" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start overflow-clip relative rounded-[inherit] size-full">
        <p className="flex-[1_0_0] font-['Open_Sans:Regular',sans-serif] font-normal leading-[19.5px] min-h-px min-w-px relative text-[#1d2939] text-[13px]" style={{ fontVariationSettings: "'wdth' 100" }}>{`Safety & Compliance`}</p>
      </div>
    </div>
  );
}

function Container17() {
  return (
    <div className="bg-white h-[40px] relative shrink-0 w-full" data-name="Container">
      <div aria-hidden="true" className="absolute border-[rgba(0,0,0,0)] border-b border-l-3 border-solid inset-0 pointer-events-none" />
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex items-center pb-px pl-[19px] pr-[8px] relative size-full">
          <Text9 />
        </div>
      </div>
    </div>
  );
}

function Text10() {
  return (
    <div className="flex-[1_0_0] h-[19.5px] min-h-px min-w-px relative" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start overflow-clip relative rounded-[inherit] size-full">
        <p className="flex-[1_0_0] font-['Open_Sans:Regular',sans-serif] font-normal leading-[19.5px] min-h-px min-w-px relative text-[#1d2939] text-[13px]" style={{ fontVariationSettings: "'wdth' 100" }}>
          Digital Delivery Task Force
        </p>
      </div>
    </div>
  );
}

function Container18() {
  return (
    <div className="bg-white h-[40px] relative shrink-0 w-full" data-name="Container">
      <div aria-hidden="true" className="absolute border-[rgba(0,0,0,0)] border-b border-l-3 border-solid inset-0 pointer-events-none" />
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex items-center pb-px pl-[19px] pr-[8px] relative size-full">
          <Text10 />
        </div>
      </div>
    </div>
  );
}

function Container16() {
  return (
    <div className="absolute content-stretch flex flex-col h-[108px] items-start left-0 pt-[28px] top-[488px] w-[358px]" data-name="Container">
      <Container17 />
      <Container18 />
    </div>
  );
}

function Text11() {
  return (
    <div className="h-[16.5px] relative shrink-0 w-[56.609px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start relative size-full">
        <p className="font-['Open_Sans:SemiBold',sans-serif] font-semibold leading-[16.5px] relative shrink-0 text-[#8c8c8c] text-[11px] tracking-[0.44px] uppercase whitespace-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
          BIM / VDC
        </p>
      </div>
    </div>
  );
}

function Container19() {
  return (
    <div className="absolute bg-[#f5f6f7] content-stretch flex h-[28px] items-center left-0 pb-px pl-[16px] top-0 w-[358px]" data-name="Container">
      <div aria-hidden="true" className="absolute border-[#eeeff1] border-b border-solid inset-0 pointer-events-none" />
      <Text11 />
    </div>
  );
}

function Text12() {
  return (
    <div className="h-[16.5px] relative shrink-0 w-[177.031px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start relative size-full">
        <p className="font-['Open_Sans:SemiBold',sans-serif] font-semibold leading-[16.5px] relative shrink-0 text-[#8c8c8c] text-[11px] tracking-[0.44px] uppercase whitespace-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
          CONSTRUCTION MANAGEMENT
        </p>
      </div>
    </div>
  );
}

function Container20() {
  return (
    <div className="absolute bg-[#f5f6f7] content-stretch flex h-[28px] items-center left-0 pb-px pl-[16px] top-[68px] w-[358px]" data-name="Container">
      <div aria-hidden="true" className="absolute border-[#eeeff1] border-b border-solid inset-0 pointer-events-none" />
      <Text12 />
    </div>
  );
}

function Text13() {
  return (
    <div className="h-[16.5px] relative shrink-0 w-[139.219px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start relative size-full">
        <p className="font-['Open_Sans:SemiBold',sans-serif] font-semibold leading-[16.5px] relative shrink-0 text-[#8c8c8c] text-[11px] tracking-[0.44px] uppercase whitespace-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
          DESIGN / ARCHITECTURE
        </p>
      </div>
    </div>
  );
}

function Container21() {
  return (
    <div className="absolute bg-[#f5f6f7] content-stretch flex h-[28px] items-center left-0 pb-px pl-[16px] top-[216px] w-[358px]" data-name="Container">
      <div aria-hidden="true" className="absolute border-[#eeeff1] border-b border-solid inset-0 pointer-events-none" />
      <Text13 />
    </div>
  );
}

function Text14() {
  return (
    <div className="h-[16.5px] relative shrink-0 w-[133.563px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start relative size-full">
        <p className="font-['Open_Sans:SemiBold',sans-serif] font-semibold leading-[16.5px] relative shrink-0 text-[#8c8c8c] text-[11px] tracking-[0.44px] uppercase whitespace-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
          GENERAL CONTRACTOR
        </p>
      </div>
    </div>
  );
}

function Container22() {
  return (
    <div className="absolute bg-[#f5f6f7] content-stretch flex h-[28px] items-center left-0 pb-px pl-[16px] top-[284px] w-[358px]" data-name="Container">
      <div aria-hidden="true" className="absolute border-[#eeeff1] border-b border-solid inset-0 pointer-events-none" />
      <Text14 />
    </div>
  );
}

function Text15() {
  return (
    <div className="h-[16.5px] relative shrink-0 w-[106.469px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start relative size-full">
        <p className="font-['Open_Sans:SemiBold',sans-serif] font-semibold leading-[16.5px] relative shrink-0 text-[#8c8c8c] text-[11px] tracking-[0.44px] uppercase whitespace-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
          MEP ENGINEERING
        </p>
      </div>
    </div>
  );
}

function Container23() {
  return (
    <div className="absolute bg-[#f5f6f7] content-stretch flex h-[28px] items-center left-0 pb-px pl-[16px] top-[352px] w-[358px]" data-name="Container">
      <div aria-hidden="true" className="absolute border-[#eeeff1] border-b border-solid inset-0 pointer-events-none" />
      <Text15 />
    </div>
  );
}

function Text16() {
  return (
    <div className="h-[16.5px] relative shrink-0 w-[155.594px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start relative size-full">
        <p className="font-['Open_Sans:SemiBold',sans-serif] font-semibold leading-[16.5px] relative shrink-0 text-[#8c8c8c] text-[11px] tracking-[0.44px] uppercase whitespace-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
          STRUCTURAL ENGINEERING
        </p>
      </div>
    </div>
  );
}

function Container24() {
  return (
    <div className="absolute bg-[#f5f6f7] content-stretch flex h-[28px] items-center left-0 pb-px pl-[16px] top-[420px] w-[358px]" data-name="Container">
      <div aria-hidden="true" className="absolute border-[#eeeff1] border-b border-solid inset-0 pointer-events-none" />
      <Text16 />
    </div>
  );
}

function Text17() {
  return (
    <div className="h-[16.5px] relative shrink-0 w-[74.719px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start relative size-full">
        <p className="font-['Open_Sans:SemiBold',sans-serif] font-semibold leading-[16.5px] relative shrink-0 text-[#c4320a] text-[11px] tracking-[0.44px] uppercase whitespace-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
          UNASSIGNED
        </p>
      </div>
    </div>
  );
}

function Container25() {
  return (
    <div className="absolute bg-[#fff8f5] content-stretch flex h-[28px] items-center left-0 pb-px pl-[16px] top-[488px] w-[358px]" data-name="Container">
      <div aria-hidden="true" className="absolute border-[#eeeff1] border-b border-solid inset-0 pointer-events-none" />
      <Text17 />
    </div>
  );
}

function Container6() {
  return (
    <div className="flex-[1_0_0] min-h-px min-w-px relative w-[358px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid overflow-clip relative rounded-[inherit] size-full">
        <Container7 />
        <Container8 />
        <Container12 />
        <Container13 />
        <Container14 />
        <Container15 />
        <Container16 />
        <Container19 />
        <Container20 />
        <Container21 />
        <Container22 />
        <Container23 />
        <Container24 />
        <Container25 />
      </div>
    </div>
  );
}

export default function Container() {
  return (
    <div className="bg-white relative rounded-[8px] size-full" data-name="Container">
      <div className="content-stretch flex flex-col items-start overflow-clip p-px relative rounded-[inherit] size-full">
        <Container1 />
        <Container2 />
        <Container3 />
        <Container6 />
      </div>
      <div aria-hidden="true" className="absolute border border-[#d9d9d9] border-solid inset-0 pointer-events-none rounded-[8px]" />
    </div>
  );
}