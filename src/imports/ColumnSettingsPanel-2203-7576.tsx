import svgPaths from "./svg-8yfr0vll8e";
import { imgGroup } from "./svg-dzp4t";

function Icon() {
  return (
    <div className="h-[13.344px] overflow-clip relative shrink-0 w-full" data-name="Icon">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2.23438 13.3438">
        <path d={svgPaths.p2f67fc00} fill="var(--fill-0, #616D79)" id="Vector" />
      </svg>
    </div>
  );
}

function Container3() {
  return (
    <div className="absolute content-stretch flex flex-col h-[13.344px] items-start left-0 top-0 w-[2.234px]" data-name="Container">
      <Icon />
    </div>
  );
}

function Icon1() {
  return (
    <div className="h-[13.344px] overflow-clip relative shrink-0 w-full" data-name="Icon">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2.23438 13.3438">
        <path d={svgPaths.p3da6f40} fill="var(--fill-0, #616D79)" id="Vector" />
      </svg>
    </div>
  );
}

function Container4() {
  return (
    <div className="absolute content-stretch flex flex-col h-[13.344px] items-start left-[4.89px] top-0 w-[2.234px]" data-name="Container">
      <Icon1 />
    </div>
  );
}

function Container2() {
  return (
    <div className="absolute h-[13.344px] left-0 overflow-clip top-0 w-[7.125px]" data-name="Container">
      <Container3 />
      <Container4 />
    </div>
  );
}

function DragHandle() {
  return (
    <div className="absolute h-[13.344px] left-[16.66px] overflow-clip top-[16.83px] w-[7.125px]" data-name="DragHandle">
      <Container2 />
    </div>
  );
}

function Container1() {
  return (
    <div className="h-full relative shrink-0 w-[36px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <DragHandle />
      </div>
    </div>
  );
}

function Icon2() {
  return (
    <div className="relative shrink-0 size-[18px]" data-name="Icon">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 18 18">
        <g clipPath="url(#clip0_2197_6218)" id="Icon">
          <path d={svgPaths.pae529f2} fill="var(--fill-0, #D1D5DB)" id="Vector" />
        </g>
        <defs>
          <clipPath id="clip0_2197_6218">
            <rect fill="white" height="18" width="18" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function SettingCheckbox() {
  return (
    <div className="relative shrink-0 size-[24px]" data-name="SettingCheckbox">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center px-[3px] relative size-full">
        <Icon2 />
      </div>
    </div>
  );
}

function Text() {
  return (
    <div className="h-[20px] opacity-70 relative shrink-0 w-[38.844px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[20px] left-0 not-italic text-[#262626] text-[14px] top-0 whitespace-nowrap">Name</p>
      </div>
    </div>
  );
}

function Container5() {
  return (
    <div className="flex-[1_0_0] h-[48px] min-h-px min-w-px relative" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[8px] items-center relative size-full">
        <SettingCheckbox />
        <Text />
      </div>
    </div>
  );
}

function SettingRow() {
  return (
    <div className="bg-white content-stretch flex h-[48px] items-center pb-[0.5px] pt-[-0.5px] relative shrink-0 w-full" data-name="SettingRow">
      <div aria-hidden="true" className="absolute border-[#f3f4f6] border-b border-solid inset-0 pointer-events-none" />
      <Container1 />
      <Container5 />
    </div>
  );
}

function Icon3() {
  return (
    <div className="h-[13.344px] overflow-clip relative shrink-0 w-full" data-name="Icon">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2.23438 13.3438">
        <path d={svgPaths.p2f67fc00} fill="var(--fill-0, #616D79)" id="Vector" />
      </svg>
    </div>
  );
}

function Container8() {
  return (
    <div className="absolute content-stretch flex flex-col h-[13.344px] items-start left-0 top-0 w-[2.234px]" data-name="Container">
      <Icon3 />
    </div>
  );
}

function Icon4() {
  return (
    <div className="h-[13.344px] overflow-clip relative shrink-0 w-full" data-name="Icon">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2.23438 13.3438">
        <path d={svgPaths.p3da6f40} fill="var(--fill-0, #616D79)" id="Vector" />
      </svg>
    </div>
  );
}

function Container9() {
  return (
    <div className="absolute content-stretch flex flex-col h-[13.344px] items-start left-[4.89px] top-0 w-[2.234px]" data-name="Container">
      <Icon4 />
    </div>
  );
}

function Container7() {
  return (
    <div className="absolute h-[13.344px] left-0 overflow-clip top-0 w-[7.125px]" data-name="Container">
      <Container8 />
      <Container9 />
    </div>
  );
}

function DragHandle1() {
  return (
    <div className="absolute h-[13.344px] left-[16.66px] overflow-clip top-[16.83px] w-[7.125px]" data-name="DragHandle">
      <Container7 />
    </div>
  );
}

function Container6() {
  return (
    <div className="h-full relative shrink-0 w-[36px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <DragHandle1 />
      </div>
    </div>
  );
}

function Icon5() {
  return (
    <div className="relative shrink-0 size-[18px]" data-name="Icon">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 18 18">
        <g clipPath="url(#clip0_2185_29716)" id="Icon">
          <path d={svgPaths.pae529f2} fill="var(--fill-0, #0E70CB)" id="Vector" />
        </g>
        <defs>
          <clipPath id="clip0_2185_29716">
            <rect fill="white" height="18" width="18" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function SettingCheckbox1() {
  return (
    <div className="relative shrink-0 size-[24px]" data-name="SettingCheckbox">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center px-[3px] relative size-full">
        <Icon5 />
      </div>
    </div>
  );
}

function Text1() {
  return (
    <div className="h-[20px] relative shrink-0 w-[57.469px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[20px] left-0 not-italic text-[#262626] text-[14px] top-0 whitespace-nowrap">Format</p>
      </div>
    </div>
  );
}

function Container10() {
  return (
    <div className="flex-[1_0_0] h-[48px] min-h-px min-w-px relative" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[8px] items-center relative size-full">
        <SettingCheckbox1 />
        <Text1 />
      </div>
    </div>
  );
}

function SettingRow1() {
  return (
    <div className="bg-white content-stretch flex h-[48px] items-center pb-[0.5px] pt-[-0.5px] relative shrink-0 w-full" data-name="SettingRow">
      <div aria-hidden="true" className="absolute border-[#f3f4f6] border-b border-solid inset-0 pointer-events-none" />
      <Container6 />
      <Container10 />
    </div>
  );
}

function Icon6() {
  return (
    <div className="h-[13.344px] overflow-clip relative shrink-0 w-full" data-name="Icon">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2.23438 13.3438">
        <path d={svgPaths.p2f67fc00} fill="var(--fill-0, #616D79)" id="Vector" />
      </svg>
    </div>
  );
}

function Container13() {
  return (
    <div className="absolute content-stretch flex flex-col h-[13.344px] items-start left-0 top-0 w-[2.234px]" data-name="Container">
      <Icon6 />
    </div>
  );
}

function Icon7() {
  return (
    <div className="h-[13.344px] overflow-clip relative shrink-0 w-full" data-name="Icon">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2.23438 13.3438">
        <path d={svgPaths.p3da6f40} fill="var(--fill-0, #616D79)" id="Vector" />
      </svg>
    </div>
  );
}

function Container14() {
  return (
    <div className="absolute content-stretch flex flex-col h-[13.344px] items-start left-[4.89px] top-0 w-[2.234px]" data-name="Container">
      <Icon7 />
    </div>
  );
}

function Container12() {
  return (
    <div className="absolute h-[13.344px] left-0 overflow-clip top-0 w-[7.125px]" data-name="Container">
      <Container13 />
      <Container14 />
    </div>
  );
}

function DragHandle2() {
  return (
    <div className="absolute h-[13.344px] left-[16.66px] overflow-clip top-[16.83px] w-[7.125px]" data-name="DragHandle">
      <Container12 />
    </div>
  );
}

function Container11() {
  return (
    <div className="h-full relative shrink-0 w-[36px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <DragHandle2 />
      </div>
    </div>
  );
}

function Icon8() {
  return (
    <div className="relative shrink-0 size-[18px]" data-name="Icon">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 18 18">
        <g clipPath="url(#clip0_2197_6218)" id="Icon">
          <path d={svgPaths.pae529f2} fill="var(--fill-0, #D1D5DB)" id="Vector" />
        </g>
        <defs>
          <clipPath id="clip0_2197_6218">
            <rect fill="white" height="18" width="18" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function SettingCheckbox2() {
  return (
    <div className="relative shrink-0 size-[24px]" data-name="SettingCheckbox">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center px-[3px] relative size-full">
        <Icon8 />
      </div>
    </div>
  );
}

function Text2() {
  return (
    <div className="h-[20px] opacity-70 relative shrink-0 w-[35.328px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[20px] left-0 not-italic text-[#262626] text-[14px] top-0 whitespace-nowrap">Version</p>
      </div>
    </div>
  );
}

function Container15() {
  return (
    <div className="flex-[1_0_0] h-[48px] min-h-px min-w-px relative" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[8px] items-center relative size-full">
        <SettingCheckbox2 />
        <Text2 />
      </div>
    </div>
  );
}

function SettingRow2() {
  return (
    <div className="bg-white content-stretch flex h-[48px] items-center pb-[0.5px] pt-[-0.5px] relative shrink-0 w-full" data-name="SettingRow">
      <div aria-hidden="true" className="absolute border-[#f3f4f6] border-b border-solid inset-0 pointer-events-none" />
      <Container11 />
      <Container15 />
    </div>
  );
}

function Icon9() {
  return (
    <div className="h-[13.344px] overflow-clip relative shrink-0 w-full" data-name="Icon">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2.23438 13.3438">
        <path d={svgPaths.p2f67fc00} fill="var(--fill-0, #616D79)" id="Vector" />
      </svg>
    </div>
  );
}

function Container18() {
  return (
    <div className="absolute content-stretch flex flex-col h-[13.344px] items-start left-0 top-0 w-[2.234px]" data-name="Container">
      <Icon9 />
    </div>
  );
}

function Icon10() {
  return (
    <div className="h-[13.344px] overflow-clip relative shrink-0 w-full" data-name="Icon">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2.23438 13.3438">
        <path d={svgPaths.p3da6f40} fill="var(--fill-0, #616D79)" id="Vector" />
      </svg>
    </div>
  );
}

function Container19() {
  return (
    <div className="absolute content-stretch flex flex-col h-[13.344px] items-start left-[4.89px] top-0 w-[2.234px]" data-name="Container">
      <Icon10 />
    </div>
  );
}

function Container17() {
  return (
    <div className="absolute h-[13.344px] left-0 overflow-clip top-0 w-[7.125px]" data-name="Container">
      <Container18 />
      <Container19 />
    </div>
  );
}

function DragHandle3() {
  return (
    <div className="absolute h-[13.344px] left-[16.66px] overflow-clip top-[16.83px] w-[7.125px]" data-name="DragHandle">
      <Container17 />
    </div>
  );
}

function Container16() {
  return (
    <div className="h-full relative shrink-0 w-[36px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <DragHandle3 />
      </div>
    </div>
  );
}

function Icon11() {
  return (
    <div className="relative shrink-0 size-[18px]" data-name="Icon">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 18 18">
        <g clipPath="url(#clip0_2185_29716)" id="Icon">
          <path d={svgPaths.pae529f2} fill="var(--fill-0, #0E70CB)" id="Vector" />
        </g>
        <defs>
          <clipPath id="clip0_2185_29716">
            <rect fill="white" height="18" width="18" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function SettingCheckbox3() {
  return (
    <div className="relative shrink-0 size-[24px]" data-name="SettingCheckbox">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center px-[3px] relative size-full">
        <Icon11 />
      </div>
    </div>
  );
}

function Text3() {
  return (
    <div className="h-[20px] relative shrink-0 w-[63.391px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[20px] left-0 not-italic text-[#262626] text-[14px] top-0 whitespace-nowrap">Status</p>
      </div>
    </div>
  );
}

function Container20() {
  return (
    <div className="flex-[1_0_0] h-[48px] min-h-px min-w-px relative" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[8px] items-center relative size-full">
        <SettingCheckbox3 />
        <Text3 />
      </div>
    </div>
  );
}

function SettingRow3() {
  return (
    <div className="bg-white content-stretch flex h-[48px] items-center pb-[0.5px] pt-[-0.5px] relative shrink-0 w-full" data-name="SettingRow">
      <div aria-hidden="true" className="absolute border-[#f3f4f6] border-b border-solid inset-0 pointer-events-none" />
      <Container16 />
      <Container20 />
    </div>
  );
}

function Icon12() {
  return (
    <div className="h-[13.344px] overflow-clip relative shrink-0 w-full" data-name="Icon">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2.23438 13.3438">
        <path d={svgPaths.p2f67fc00} fill="var(--fill-0, #616D79)" id="Vector" />
      </svg>
    </div>
  );
}

function Container23() {
  return (
    <div className="absolute content-stretch flex flex-col h-[13.344px] items-start left-0 top-0 w-[2.234px]" data-name="Container">
      <Icon12 />
    </div>
  );
}

function Icon13() {
  return (
    <div className="h-[13.344px] overflow-clip relative shrink-0 w-full" data-name="Icon">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2.23438 13.3438">
        <path d={svgPaths.p3da6f40} fill="var(--fill-0, #616D79)" id="Vector" />
      </svg>
    </div>
  );
}

function Container24() {
  return (
    <div className="absolute content-stretch flex flex-col h-[13.344px] items-start left-[4.89px] top-0 w-[2.234px]" data-name="Container">
      <Icon13 />
    </div>
  );
}

function Container22() {
  return (
    <div className="absolute h-[13.344px] left-0 overflow-clip top-0 w-[7.125px]" data-name="Container">
      <Container23 />
      <Container24 />
    </div>
  );
}

function DragHandle4() {
  return (
    <div className="absolute h-[13.344px] left-[16.66px] overflow-clip top-[16.83px] w-[7.125px]" data-name="DragHandle">
      <Container22 />
    </div>
  );
}

function Container21() {
  return (
    <div className="h-full relative shrink-0 w-[36px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <DragHandle4 />
      </div>
    </div>
  );
}

function Icon14() {
  return (
    <div className="relative shrink-0 size-[18px]" data-name="Icon">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 18 18">
        <g clipPath="url(#clip0_2185_29716)" id="Icon">
          <path d={svgPaths.pae529f2} fill="var(--fill-0, #0E70CB)" id="Vector" />
        </g>
        <defs>
          <clipPath id="clip0_2185_29716">
            <rect fill="white" height="18" width="18" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function SettingCheckbox4() {
  return (
    <div className="relative shrink-0 size-[24px]" data-name="SettingCheckbox">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center px-[3px] relative size-full">
        <Icon14 />
      </div>
    </div>
  );
}

function Text4() {
  return (
    <div className="h-[20px] relative shrink-0 w-[40.078px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[20px] left-0 not-italic text-[#262626] text-[14px] top-0 whitespace-nowrap">Type</p>
      </div>
    </div>
  );
}

function Container25() {
  return (
    <div className="flex-[1_0_0] h-[48px] min-h-px min-w-px relative" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[8px] items-center relative size-full">
        <SettingCheckbox4 />
        <Text4 />
      </div>
    </div>
  );
}

function SettingRow4() {
  return (
    <div className="bg-white content-stretch flex h-[48px] items-center pb-[0.5px] pt-[-0.5px] relative shrink-0 w-full" data-name="SettingRow">
      <div aria-hidden="true" className="absolute border-[#f3f4f6] border-b border-solid inset-0 pointer-events-none" />
      <Container21 />
      <Container25 />
    </div>
  );
}

function Icon15() {
  return (
    <div className="h-[13.344px] overflow-clip relative shrink-0 w-full" data-name="Icon">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2.23438 13.3438">
        <path d={svgPaths.p2f67fc00} fill="var(--fill-0, #616D79)" id="Vector" />
      </svg>
    </div>
  );
}

function Container28() {
  return (
    <div className="absolute content-stretch flex flex-col h-[13.344px] items-start left-0 top-0 w-[2.234px]" data-name="Container">
      <Icon15 />
    </div>
  );
}

function Icon16() {
  return (
    <div className="h-[13.344px] overflow-clip relative shrink-0 w-full" data-name="Icon">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2.23438 13.3438">
        <path d={svgPaths.p3da6f40} fill="var(--fill-0, #616D79)" id="Vector" />
      </svg>
    </div>
  );
}

function Container29() {
  return (
    <div className="absolute content-stretch flex flex-col h-[13.344px] items-start left-[4.89px] top-0 w-[2.234px]" data-name="Container">
      <Icon16 />
    </div>
  );
}

function Container27() {
  return (
    <div className="absolute h-[13.344px] left-0 overflow-clip top-0 w-[7.125px]" data-name="Container">
      <Container28 />
      <Container29 />
    </div>
  );
}

function DragHandle5() {
  return (
    <div className="absolute h-[13.344px] left-[16.66px] overflow-clip top-[16.83px] w-[7.125px]" data-name="DragHandle">
      <Container27 />
    </div>
  );
}

function Container26() {
  return (
    <div className="h-full relative shrink-0 w-[36px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <DragHandle5 />
      </div>
    </div>
  );
}

function Icon17() {
  return (
    <div className="relative shrink-0 size-[18px]" data-name="Icon">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 18 18">
        <g clipPath="url(#clip0_2185_29716)" id="Icon">
          <path d={svgPaths.pae529f2} fill="var(--fill-0, #0E70CB)" id="Vector" />
        </g>
        <defs>
          <clipPath id="clip0_2185_29716">
            <rect fill="white" height="18" width="18" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function SettingCheckbox5() {
  return (
    <div className="relative shrink-0 size-[24px]" data-name="SettingCheckbox">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center px-[3px] relative size-full">
        <Icon17 />
      </div>
    </div>
  );
}

function Text5() {
  return (
    <div className="h-[20px] relative shrink-0 w-[79.203px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[20px] left-0 not-italic text-[#262626] text-[14px] top-0 whitespace-nowrap">Discipline</p>
      </div>
    </div>
  );
}

function Container30() {
  return (
    <div className="flex-[1_0_0] h-[48px] min-h-px min-w-px relative" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[8px] items-center relative size-full">
        <SettingCheckbox5 />
        <Text5 />
      </div>
    </div>
  );
}

function SettingRow5() {
  return (
    <div className="bg-white content-stretch flex h-[48px] items-center pb-[0.5px] pt-[-0.5px] relative shrink-0 w-full" data-name="SettingRow">
      <div aria-hidden="true" className="absolute border-[#f3f4f6] border-b border-solid inset-0 pointer-events-none" />
      <Container26 />
      <Container30 />
    </div>
  );
}

function Icon18() {
  return (
    <div className="h-[13.344px] overflow-clip relative shrink-0 w-full" data-name="Icon">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2.23438 13.3438">
        <path d={svgPaths.p2f67fc00} fill="var(--fill-0, #616D79)" id="Vector" />
      </svg>
    </div>
  );
}

function Container33() {
  return (
    <div className="absolute content-stretch flex flex-col h-[13.344px] items-start left-0 top-0 w-[2.234px]" data-name="Container">
      <Icon18 />
    </div>
  );
}

function Icon19() {
  return (
    <div className="h-[13.344px] overflow-clip relative shrink-0 w-full" data-name="Icon">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2.23438 13.3438">
        <path d={svgPaths.p3da6f40} fill="var(--fill-0, #616D79)" id="Vector" />
      </svg>
    </div>
  );
}

function Container34() {
  return (
    <div className="absolute content-stretch flex flex-col h-[13.344px] items-start left-[4.89px] top-0 w-[2.234px]" data-name="Container">
      <Icon19 />
    </div>
  );
}

function Container32() {
  return (
    <div className="absolute h-[13.344px] left-0 overflow-clip top-0 w-[7.125px]" data-name="Container">
      <Container33 />
      <Container34 />
    </div>
  );
}

function DragHandle6() {
  return (
    <div className="absolute h-[13.344px] left-[16.66px] overflow-clip top-[16.83px] w-[7.125px]" data-name="DragHandle">
      <Container32 />
    </div>
  );
}

function Container31() {
  return (
    <div className="h-full relative shrink-0 w-[36px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <DragHandle6 />
      </div>
    </div>
  );
}

function Icon20() {
  return (
    <div className="relative shrink-0 size-[18px]" data-name="Icon">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 18 18">
        <g clipPath="url(#clip0_2185_29716)" id="Icon">
          <path d={svgPaths.pae529f2} fill="var(--fill-0, #0E70CB)" id="Vector" />
        </g>
        <defs>
          <clipPath id="clip0_2185_29716">
            <rect fill="white" height="18" width="18" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function SettingCheckbox6() {
  return (
    <div className="relative shrink-0 size-[24px]" data-name="SettingCheckbox">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center px-[3px] relative size-full">
        <Icon20 />
      </div>
    </div>
  );
}

function Text6() {
  return (
    <div className="h-[20px] relative shrink-0 w-[67.953px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[20px] left-0 not-italic text-[#262626] text-[14px] top-0 whitespace-nowrap">Author</p>
      </div>
    </div>
  );
}

function Container35() {
  return (
    <div className="flex-[1_0_0] h-[48px] min-h-px min-w-px relative" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[8px] items-center relative size-full">
        <SettingCheckbox6 />
        <Text6 />
      </div>
    </div>
  );
}

function SettingRow6() {
  return (
    <div className="bg-white content-stretch flex h-[48px] items-center pb-[0.5px] pt-[-0.5px] relative shrink-0 w-full" data-name="SettingRow">
      <div aria-hidden="true" className="absolute border-[#f3f4f6] border-b border-solid inset-0 pointer-events-none" />
      <Container31 />
      <Container35 />
    </div>
  );
}

function Icon21() {
  return (
    <div className="h-[13.344px] overflow-clip relative shrink-0 w-full" data-name="Icon">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2.23438 13.3438">
        <path d={svgPaths.p2f67fc00} fill="var(--fill-0, #616D79)" id="Vector" />
      </svg>
    </div>
  );
}

function Container38() {
  return (
    <div className="absolute content-stretch flex flex-col h-[13.344px] items-start left-0 top-0 w-[2.234px]" data-name="Container">
      <Icon21 />
    </div>
  );
}

function Icon22() {
  return (
    <div className="h-[13.344px] overflow-clip relative shrink-0 w-full" data-name="Icon">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2.23438 13.3438">
        <path d={svgPaths.p3da6f40} fill="var(--fill-0, #616D79)" id="Vector" />
      </svg>
    </div>
  );
}

function Container39() {
  return (
    <div className="absolute content-stretch flex flex-col h-[13.344px] items-start left-[4.89px] top-0 w-[2.234px]" data-name="Container">
      <Icon22 />
    </div>
  );
}

function Container37() {
  return (
    <div className="absolute h-[13.344px] left-0 overflow-clip top-0 w-[7.125px]" data-name="Container">
      <Container38 />
      <Container39 />
    </div>
  );
}

function DragHandle7() {
  return (
    <div className="absolute h-[13.344px] left-[16.66px] overflow-clip top-[16.83px] w-[7.125px]" data-name="DragHandle">
      <Container37 />
    </div>
  );
}

function Container36() {
  return (
    <div className="h-full relative shrink-0 w-[36px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <DragHandle7 />
      </div>
    </div>
  );
}

function Icon23() {
  return (
    <div className="relative shrink-0 size-[18px]" data-name="Icon">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 18 18">
        <g clipPath="url(#clip0_2185_29716)" id="Icon">
          <path d={svgPaths.pae529f2} fill="var(--fill-0, #0E70CB)" id="Vector" />
        </g>
        <defs>
          <clipPath id="clip0_2185_29716">
            <rect fill="white" height="18" width="18" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function SettingCheckbox7() {
  return (
    <div className="relative shrink-0 size-[24px]" data-name="SettingCheckbox">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center px-[3px] relative size-full">
        <Icon23 />
      </div>
    </div>
  );
}

function Text7() {
  return (
    <div className="h-[20px] relative shrink-0 w-[41.75px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[20px] left-0 not-italic text-[#262626] text-[14px] top-0 whitespace-nowrap">Modified</p>
      </div>
    </div>
  );
}

function Container40() {
  return (
    <div className="flex-[1_0_0] h-[48px] min-h-px min-w-px relative" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[8px] items-center relative size-full">
        <SettingCheckbox7 />
        <Text7 />
      </div>
    </div>
  );
}

function SettingRow7() {
  return (
    <div className="bg-white content-stretch flex h-[48px] items-center pb-[0.5px] pt-[-0.5px] relative shrink-0 w-full" data-name="SettingRow">
      <div aria-hidden="true" className="absolute border-[#f3f4f6] border-b border-solid inset-0 pointer-events-none" />
      <Container36 />
      <Container40 />
    </div>
  );
}

function Icon24() {
  return (
    <div className="h-[13.344px] overflow-clip relative shrink-0 w-full" data-name="Icon">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2.23438 13.3438">
        <path d={svgPaths.p2f67fc00} fill="var(--fill-0, #616D79)" id="Vector" />
      </svg>
    </div>
  );
}

function Container43() {
  return (
    <div className="absolute content-stretch flex flex-col h-[13.344px] items-start left-0 top-0 w-[2.234px]" data-name="Container">
      <Icon24 />
    </div>
  );
}

function Icon25() {
  return (
    <div className="h-[13.344px] overflow-clip relative shrink-0 w-full" data-name="Icon">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2.23438 13.3438">
        <path d={svgPaths.p3da6f40} fill="var(--fill-0, #616D79)" id="Vector" />
      </svg>
    </div>
  );
}

function Container44() {
  return (
    <div className="absolute content-stretch flex flex-col h-[13.344px] items-start left-[4.89px] top-0 w-[2.234px]" data-name="Container">
      <Icon25 />
    </div>
  );
}

function Container42() {
  return (
    <div className="absolute h-[13.344px] left-0 overflow-clip top-0 w-[7.125px]" data-name="Container">
      <Container43 />
      <Container44 />
    </div>
  );
}

function DragHandle8() {
  return (
    <div className="absolute h-[13.344px] left-[16.66px] overflow-clip top-[16.83px] w-[7.125px]" data-name="DragHandle">
      <Container42 />
    </div>
  );
}

function Container41() {
  return (
    <div className="h-full relative shrink-0 w-[36px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <DragHandle8 />
      </div>
    </div>
  );
}

function Icon26() {
  return (
    <div className="relative shrink-0 size-[18px]" data-name="Icon">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 18 18">
        <g clipPath="url(#clip0_2197_6203)" id="Icon">
          <path d={svgPaths.p3370a680} fill="var(--fill-0, #D1D5DB)" id="Vector" />
        </g>
        <defs>
          <clipPath id="clip0_2197_6203">
            <rect fill="white" height="18" width="18" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function SettingCheckbox8() {
  return (
    <div className="relative shrink-0 size-[24px]" data-name="SettingCheckbox">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center px-[3px] relative size-full">
        <Icon26 />
      </div>
    </div>
  );
}

function Text8() {
  return (
    <div className="h-[20px] relative shrink-0 w-[50.297px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[20px] left-0 not-italic text-[#262626] text-[14px] top-0 whitespace-nowrap">Created</p>
      </div>
    </div>
  );
}

function Container45() {
  return (
    <div className="flex-[1_0_0] h-[48px] min-h-px min-w-px relative" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[8px] items-center relative size-full">
        <SettingCheckbox8 />
        <Text8 />
      </div>
    </div>
  );
}

function SettingRow8() {
  return (
    <div className="bg-white content-stretch flex h-[48px] items-center pb-[0.5px] pt-[-0.5px] relative shrink-0 w-full" data-name="SettingRow">
      <div aria-hidden="true" className="absolute border-[#f3f4f6] border-b border-solid inset-0 pointer-events-none" />
      <Container41 />
      <Container45 />
    </div>
  );
}

function Icon27() {
  return (
    <div className="h-[13.344px] overflow-clip relative shrink-0 w-full" data-name="Icon">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2.23438 13.3438">
        <path d={svgPaths.p2f67fc00} fill="var(--fill-0, #616D79)" id="Vector" />
      </svg>
    </div>
  );
}

function Container48() {
  return (
    <div className="absolute content-stretch flex flex-col h-[13.344px] items-start left-0 top-0 w-[2.234px]" data-name="Container">
      <Icon27 />
    </div>
  );
}

function Icon28() {
  return (
    <div className="h-[13.344px] overflow-clip relative shrink-0 w-full" data-name="Icon">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2.23438 13.3438">
        <path d={svgPaths.p3da6f40} fill="var(--fill-0, #616D79)" id="Vector" />
      </svg>
    </div>
  );
}

function Container49() {
  return (
    <div className="absolute content-stretch flex flex-col h-[13.344px] items-start left-[4.89px] top-0 w-[2.234px]" data-name="Container">
      <Icon28 />
    </div>
  );
}

function Container47() {
  return (
    <div className="absolute h-[13.344px] left-0 overflow-clip top-0 w-[7.125px]" data-name="Container">
      <Container48 />
      <Container49 />
    </div>
  );
}

function DragHandle9() {
  return (
    <div className="absolute h-[13.344px] left-[16.66px] overflow-clip top-[16.83px] w-[7.125px]" data-name="DragHandle">
      <Container47 />
    </div>
  );
}

function Container46() {
  return (
    <div className="h-full relative shrink-0 w-[36px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <DragHandle9 />
      </div>
    </div>
  );
}

function Icon29() {
  return (
    <div className="relative shrink-0 size-[18px]" data-name="Icon">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 18 18">
        <g clipPath="url(#clip0_2197_6203)" id="Icon">
          <path d={svgPaths.p3370a680} fill="var(--fill-0, #D1D5DB)" id="Vector" />
        </g>
        <defs>
          <clipPath id="clip0_2197_6203">
            <rect fill="white" height="18" width="18" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function SettingCheckbox9() {
  return (
    <div className="relative shrink-0 size-[24px]" data-name="SettingCheckbox">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center px-[3px] relative size-full">
        <Icon29 />
      </div>
    </div>
  );
}

function Text9() {
  return (
    <div className="h-[20px] relative shrink-0 w-[54.797px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[20px] left-0 not-italic text-[#262626] text-[14px] top-0 whitespace-nowrap">Address</p>
      </div>
    </div>
  );
}

function Container50() {
  return (
    <div className="flex-[1_0_0] h-[48px] min-h-px min-w-px relative" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[8px] items-center relative size-full">
        <SettingCheckbox9 />
        <Text9 />
      </div>
    </div>
  );
}

function SettingRow9() {
  return (
    <div className="bg-white content-stretch flex h-[48px] items-center relative shrink-0 w-full" data-name="SettingRow">
      <Container46 />
      <Container50 />
    </div>
  );
}

function Container() {
  return (
    <div className="h-[420px] relative shrink-0 w-full" data-name="Container">
      <div className="overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex flex-col items-start pr-[15px] relative size-full">
          <SettingRow />
          <SettingRow1 />
          <SettingRow2 />
          <SettingRow3 />
          <SettingRow4 />
          <SettingRow5 />
          <SettingRow6 />
          <SettingRow7 />
          <SettingRow8 />
          <SettingRow9 />
        </div>
      </div>
    </div>
  );
}

function Text10() {
  return (
    <div className="h-[20px] opacity-70 relative shrink-0 w-[89.984px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[20px] left-0 not-italic text-[#262626] text-[14px] top-0 whitespace-nowrap">Table Density</p>
      </div>
    </div>
  );
}

function Icon30() {
  return (
    <div className="h-[22px] overflow-clip relative shrink-0 w-full" data-name="Icon">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 22 22">
        <path d={svgPaths.p20882ef0} fill="var(--fill-0, #616D79)" id="Vector" />
      </svg>
    </div>
  );
}

function DensityIcon() {
  return (
    <div className="absolute content-stretch flex flex-col items-start left-[7px] overflow-clip size-[22px] top-[7px]" data-name="DensityIcon">
      <Icon30 />
    </div>
  );
}

function Button() {
  return (
    <div className="relative rounded-[4px] shrink-0 size-[36px]" data-name="Button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <DensityIcon />
      </div>
    </div>
  );
}

function Icon31() {
  return (
    <div className="h-[22px] overflow-clip relative shrink-0 w-full" data-name="Icon">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 22 22">
        <path d={svgPaths.p32f8f9f0} fill="var(--fill-0, white)" id="Vector" />
      </svg>
    </div>
  );
}

function DensityIcon1() {
  return (
    <div className="absolute content-stretch flex flex-col items-start left-[7px] overflow-clip size-[22px] top-[7px]" data-name="DensityIcon">
      <Icon31 />
    </div>
  );
}

function Button1() {
  return (
    <div className="bg-[#616d79] relative rounded-[4px] shrink-0 size-[36px]" data-name="Button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <DensityIcon1 />
      </div>
    </div>
  );
}

function Icon32() {
  return (
    <div className="h-[22px] overflow-clip relative shrink-0 w-full" data-name="Icon">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 22 22">
        <path d={svgPaths.p19b84f80} fill="var(--fill-0, #616D79)" id="Vector" />
      </svg>
    </div>
  );
}

function DensityIcon2() {
  return (
    <div className="absolute content-stretch flex flex-col items-start left-[7px] overflow-clip size-[22px] top-[7px]" data-name="DensityIcon">
      <Icon32 />
    </div>
  );
}

function Button2() {
  return (
    <div className="flex-[1_0_0] h-[36px] min-h-px min-w-px relative rounded-[4px]" data-name="Button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <DensityIcon2 />
      </div>
    </div>
  );
}

function Container52() {
  return (
    <div className="h-[36px] relative shrink-0 w-[108px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center relative size-full">
        <Button />
        <Button1 />
        <Button2 />
      </div>
    </div>
  );
}

function Container51() {
  return (
    <div className="bg-white h-[48px] relative shrink-0 w-full" data-name="Container">
      <div aria-hidden="true" className="absolute border-[#f3f4f6] border-solid border-t inset-0 pointer-events-none" />
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex items-center justify-between pl-[17px] pr-[8px] pt-px relative size-full">
          <Text10 />
          <Container52 />
        </div>
      </div>
    </div>
  );
}

function Text11() {
  return (
    <div className="flex-[1_0_0] h-[20px] min-h-px min-w-px opacity-70 relative" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[20px] left-0 not-italic text-[#262626] text-[14px] top-0 whitespace-nowrap">Freeze up to column:</p>
      </div>
    </div>
  );
}

function Text12() {
  return (
    <div className="h-[20px] relative shrink-0 w-[16px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="-translate-x-1/2 absolute font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[20px] left-[8.53px] not-italic text-[#262626] text-[14px] text-center top-0 whitespace-nowrap">1</p>
      </div>
    </div>
  );
}

function Container54() {
  return (
    <div className="h-[20px] relative shrink-0 w-[160.844px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[6px] items-center relative size-full">
        <Text11 />
        <Text12 />
      </div>
    </div>
  );
}

function Icon33() {
  return (
    <div className="relative shrink-0 size-[14px]" data-name="Icon">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14 14">
        <g id="Icon">
          <path d={svgPaths.p17c7d700} fill="var(--fill-0, #616D79)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function Button3() {
  return (
    <div className="bg-white relative rounded-[4px] shrink-0 size-[28px]" data-name="Button">
      <div aria-hidden="true" className="absolute border border-[#d0d5dd] border-solid inset-0 pointer-events-none rounded-[4px]" />
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center px-[7px] py-px relative size-full">
        <Icon33 />
      </div>
    </div>
  );
}

function Group() {
  return (
    <div className="absolute inset-0 mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[0px_0px] mask-size-[10px_10px]" data-name="Group" style={{ maskImage: `url('${imgGroup}')` }}>
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 10 10">
        <g id="Group">
          <path d={svgPaths.p14468300} fill="var(--fill-0, #616D79)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function ClipPathGroup() {
  return (
    <div className="absolute contents inset-0" data-name="Clip path group">
      <Group />
    </div>
  );
}

function Icon34() {
  return (
    <div className="relative shrink-0 size-[10px]" data-name="Icon">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid overflow-clip relative rounded-[inherit] size-full">
        <ClipPathGroup />
      </div>
    </div>
  );
}

function Button4() {
  return (
    <div className="bg-white flex-[1_0_0] h-[28px] min-h-px min-w-px relative rounded-[4px]" data-name="Button">
      <div aria-hidden="true" className="absolute border border-[#d0d5dd] border-solid inset-0 pointer-events-none rounded-[4px]" />
      <div className="flex flex-row items-center justify-center size-full">
        <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center px-[8px] py-px relative size-full">
          <Icon34 />
        </div>
      </div>
    </div>
  );
}

function Container55() {
  return (
    <div className="h-[28px] relative shrink-0 w-[60px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[6px] items-center relative size-full">
        <Button3 />
        <Button4 />
      </div>
    </div>
  );
}

function Container53() {
  return (
    <div className="bg-white h-[48px] relative shrink-0 w-full" data-name="Container">
      <div aria-hidden="true" className="absolute border-[#f3f4f6] border-solid border-t inset-0 pointer-events-none" />
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex items-center justify-between pl-[17px] pr-[12px] pt-px relative size-full">
          <Container54 />
          <Container55 />
        </div>
      </div>
    </div>
  );
}

function Button5() {
  return (
    <div className="h-[19.5px] relative shrink-0 w-[98.859px]" data-name="Button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="-translate-x-1/2 absolute decoration-solid font-['Inter:Medium',sans-serif] font-medium leading-[19.5px] left-[49px] not-italic text-[#616d79] text-[13px] text-center top-0 underline whitespace-nowrap">Reset to Default</p>
      </div>
    </div>
  );
}

function Container56() {
  return (
    <div className="bg-[#fafafa] h-[40px] relative shrink-0 w-full" data-name="Container">
      <div aria-hidden="true" className="absolute border-[#e5e7eb] border-solid border-t inset-0 pointer-events-none" />
      <div className="flex flex-row items-center justify-end size-full">
        <div className="content-stretch flex items-center justify-end pr-[12px] pt-px relative size-full">
          <Button5 />
        </div>
      </div>
    </div>
  );
}

export default function ColumnSettingsPanel() {
  return (
    <div className="bg-white relative rounded-[8px] size-full" data-name="ColumnSettingsPanel">
      <div className="content-stretch flex flex-col items-start overflow-clip p-px relative rounded-[inherit] size-full">
        <Container />
        <Container51 />
        <Container53 />
        <Container56 />
      </div>
      <div aria-hidden="true" className="absolute border border-[#e5e7eb] border-solid inset-0 pointer-events-none rounded-[8px] shadow-[0px_2px_8px_0px_rgba(0,0,0,0.18)]" />
    </div>
  );
}