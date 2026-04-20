import svgPaths from "./svg-grylsakuwi";
import { imgGroup, imgGroup1 } from "./svg-asgem";

function Icon() {
  return (
    <div className="h-[13.344px] overflow-clip relative shrink-0 w-full" data-name="Icon">
      <div className="absolute inset-[0_68.75%_0_0]" data-name="Vector">
        <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2.22653 13.3438">
          <path d={svgPaths.p10bef880} fill="var(--fill-0, #616D79)" id="Vector" />
        </svg>
      </div>
      <div className="absolute inset-[0_0_0_68.75%]" data-name="Vector">
        <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2.22651 13.3438">
          <path d={svgPaths.p2cd4e580} fill="var(--fill-0, #616D79)" id="Vector" />
        </svg>
      </div>
    </div>
  );
}

function DragHandle() {
  return (
    <div className="absolute content-stretch flex flex-col h-[13.344px] items-start left-[10.66px] top-[16.83px] w-[7.125px]" data-name="DragHandle">
      <Icon />
    </div>
  );
}

function Container1() {
  return (
    <div className="h-full relative shrink-0 w-[26px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <DragHandle />
      </div>
    </div>
  );
}

function Icon1() {
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
        <Icon1 />
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

function Container2() {
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
      <Container2 />
    </div>
  );
}

function Icon2() {
  return (
    <div className="h-[13.344px] overflow-clip relative shrink-0 w-full" data-name="Icon">
      <div className="absolute inset-[0_68.75%_0_0]" data-name="Vector">
        <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2.22653 13.3438">
          <path d={svgPaths.p10bef880} fill="var(--fill-0, #616D79)" id="Vector" />
        </svg>
      </div>
      <div className="absolute inset-[0_0_0_68.75%]" data-name="Vector">
        <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2.22651 13.3438">
          <path d={svgPaths.p2cd4e580} fill="var(--fill-0, #616D79)" id="Vector" />
        </svg>
      </div>
    </div>
  );
}

function DragHandle1() {
  return (
    <div className="absolute content-stretch flex flex-col h-[13.344px] items-start left-[10.66px] top-[16.83px] w-[7.125px]" data-name="DragHandle">
      <Icon2 />
    </div>
  );
}

function Container3() {
  return (
    <div className="h-full relative shrink-0 w-[26px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <DragHandle1 />
      </div>
    </div>
  );
}

function Icon3() {
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
        <Icon3 />
      </div>
    </div>
  );
}

function Text1() {
  return (
    <div className="h-[20px] relative shrink-0 w-[57.469px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[20px] left-0 not-italic text-[#262626] text-[14px] top-0 whitespace-nowrap">Job Title</p>
      </div>
    </div>
  );
}

function Container4() {
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
      <Container3 />
      <Container4 />
    </div>
  );
}

function Icon4() {
  return (
    <div className="h-[13.344px] overflow-clip relative shrink-0 w-full" data-name="Icon">
      <div className="absolute inset-[0_68.75%_0_0]" data-name="Vector">
        <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2.22653 13.3438">
          <path d={svgPaths.p10bef880} fill="var(--fill-0, #616D79)" id="Vector" />
        </svg>
      </div>
      <div className="absolute inset-[0_0_0_68.75%]" data-name="Vector">
        <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2.22651 13.3438">
          <path d={svgPaths.p2cd4e580} fill="var(--fill-0, #616D79)" id="Vector" />
        </svg>
      </div>
    </div>
  );
}

function DragHandle2() {
  return (
    <div className="absolute content-stretch flex flex-col h-[13.344px] items-start left-[10.66px] top-[16.83px] w-[7.125px]" data-name="DragHandle">
      <Icon4 />
    </div>
  );
}

function Container5() {
  return (
    <div className="h-full relative shrink-0 w-[26px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <DragHandle2 />
      </div>
    </div>
  );
}

function Icon5() {
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
        <Icon5 />
      </div>
    </div>
  );
}

function Text2() {
  return (
    <div className="h-[20px] opacity-70 relative shrink-0 w-[35.328px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[20px] left-0 not-italic text-[#262626] text-[14px] top-0 whitespace-nowrap">Email</p>
      </div>
    </div>
  );
}

function Container6() {
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
      <Container5 />
      <Container6 />
    </div>
  );
}

function Icon6() {
  return (
    <div className="h-[13.344px] overflow-clip relative shrink-0 w-full" data-name="Icon">
      <div className="absolute inset-[0_68.75%_0_0]" data-name="Vector">
        <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2.22653 13.3438">
          <path d={svgPaths.p10bef880} fill="var(--fill-0, #616D79)" id="Vector" />
        </svg>
      </div>
      <div className="absolute inset-[0_0_0_68.75%]" data-name="Vector">
        <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2.22651 13.3438">
          <path d={svgPaths.p2cd4e580} fill="var(--fill-0, #616D79)" id="Vector" />
        </svg>
      </div>
    </div>
  );
}

function DragHandle3() {
  return (
    <div className="absolute content-stretch flex flex-col h-[13.344px] items-start left-[10.66px] top-[16.83px] w-[7.125px]" data-name="DragHandle">
      <Icon6 />
    </div>
  );
}

function Container7() {
  return (
    <div className="h-full relative shrink-0 w-[26px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <DragHandle3 />
      </div>
    </div>
  );
}

function Icon7() {
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
        <Icon7 />
      </div>
    </div>
  );
}

function Text3() {
  return (
    <div className="h-[20px] relative shrink-0 w-[63.391px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[20px] left-0 not-italic text-[#262626] text-[14px] top-0 whitespace-nowrap">Company</p>
      </div>
    </div>
  );
}

function Container8() {
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
      <Container7 />
      <Container8 />
    </div>
  );
}

function Icon8() {
  return (
    <div className="h-[13.344px] overflow-clip relative shrink-0 w-full" data-name="Icon">
      <div className="absolute inset-[0_68.75%_0_0]" data-name="Vector">
        <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2.22653 13.3438">
          <path d={svgPaths.p10bef880} fill="var(--fill-0, #616D79)" id="Vector" />
        </svg>
      </div>
      <div className="absolute inset-[0_0_0_68.75%]" data-name="Vector">
        <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2.22651 13.3438">
          <path d={svgPaths.p2cd4e580} fill="var(--fill-0, #616D79)" id="Vector" />
        </svg>
      </div>
    </div>
  );
}

function DragHandle4() {
  return (
    <div className="absolute content-stretch flex flex-col h-[13.344px] items-start left-[10.66px] top-[16.83px] w-[7.125px]" data-name="DragHandle">
      <Icon8 />
    </div>
  );
}

function Container9() {
  return (
    <div className="h-full relative shrink-0 w-[26px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <DragHandle4 />
      </div>
    </div>
  );
}

function Icon9() {
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
        <Icon9 />
      </div>
    </div>
  );
}

function Text4() {
  return (
    <div className="h-[20px] relative shrink-0 w-[40.078px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[20px] left-0 not-italic text-[#262626] text-[14px] top-0 whitespace-nowrap">Office</p>
      </div>
    </div>
  );
}

function Container10() {
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
      <Container9 />
      <Container10 />
    </div>
  );
}

function Icon10() {
  return (
    <div className="h-[13.344px] overflow-clip relative shrink-0 w-full" data-name="Icon">
      <div className="absolute inset-[0_68.75%_0_0]" data-name="Vector">
        <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2.22653 13.3438">
          <path d={svgPaths.p10bef880} fill="var(--fill-0, #616D79)" id="Vector" />
        </svg>
      </div>
      <div className="absolute inset-[0_0_0_68.75%]" data-name="Vector">
        <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2.22651 13.3438">
          <path d={svgPaths.p2cd4e580} fill="var(--fill-0, #616D79)" id="Vector" />
        </svg>
      </div>
    </div>
  );
}

function DragHandle5() {
  return (
    <div className="absolute content-stretch flex flex-col h-[13.344px] items-start left-[10.66px] top-[16.83px] w-[7.125px]" data-name="DragHandle">
      <Icon10 />
    </div>
  );
}

function Container11() {
  return (
    <div className="h-full relative shrink-0 w-[26px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <DragHandle5 />
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

function SettingCheckbox5() {
  return (
    <div className="relative shrink-0 size-[24px]" data-name="SettingCheckbox">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center px-[3px] relative size-full">
        <Icon11 />
      </div>
    </div>
  );
}

function Text5() {
  return (
    <div className="h-[20px] relative shrink-0 w-[79.203px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[20px] left-0 not-italic text-[#262626] text-[14px] top-0 whitespace-nowrap">Project Role</p>
      </div>
    </div>
  );
}

function Container12() {
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
      <Container11 />
      <Container12 />
    </div>
  );
}

function Icon12() {
  return (
    <div className="h-[13.344px] overflow-clip relative shrink-0 w-full" data-name="Icon">
      <div className="absolute inset-[0_68.75%_0_0]" data-name="Vector">
        <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2.22653 13.3438">
          <path d={svgPaths.p10bef880} fill="var(--fill-0, #616D79)" id="Vector" />
        </svg>
      </div>
      <div className="absolute inset-[0_0_0_68.75%]" data-name="Vector">
        <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2.22651 13.3438">
          <path d={svgPaths.p2cd4e580} fill="var(--fill-0, #616D79)" id="Vector" />
        </svg>
      </div>
    </div>
  );
}

function DragHandle6() {
  return (
    <div className="absolute content-stretch flex flex-col h-[13.344px] items-start left-[10.66px] top-[16.83px] w-[7.125px]" data-name="DragHandle">
      <Icon12 />
    </div>
  );
}

function Container13() {
  return (
    <div className="h-full relative shrink-0 w-[26px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <DragHandle6 />
      </div>
    </div>
  );
}

function Icon13() {
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
        <Icon13 />
      </div>
    </div>
  );
}

function Text6() {
  return (
    <div className="h-[20px] relative shrink-0 w-[67.953px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[20px] left-0 not-italic text-[#262626] text-[14px] top-0 whitespace-nowrap">User Type</p>
      </div>
    </div>
  );
}

function Container14() {
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
      <Container13 />
      <Container14 />
    </div>
  );
}

function Icon14() {
  return (
    <div className="h-[13.344px] overflow-clip relative shrink-0 w-full" data-name="Icon">
      <div className="absolute inset-[0_68.75%_0_0]" data-name="Vector">
        <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2.22653 13.3438">
          <path d={svgPaths.p10bef880} fill="var(--fill-0, #616D79)" id="Vector" />
        </svg>
      </div>
      <div className="absolute inset-[0_0_0_68.75%]" data-name="Vector">
        <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2.22651 13.3438">
          <path d={svgPaths.p2cd4e580} fill="var(--fill-0, #616D79)" id="Vector" />
        </svg>
      </div>
    </div>
  );
}

function DragHandle7() {
  return (
    <div className="absolute content-stretch flex flex-col h-[13.344px] items-start left-[10.66px] top-[16.83px] w-[7.125px]" data-name="DragHandle">
      <Icon14 />
    </div>
  );
}

function Container15() {
  return (
    <div className="h-full relative shrink-0 w-[26px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <DragHandle7 />
      </div>
    </div>
  );
}

function Icon15() {
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
        <Icon15 />
      </div>
    </div>
  );
}

function Text7() {
  return (
    <div className="h-[20px] relative shrink-0 w-[41.75px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[20px] left-0 not-italic text-[#262626] text-[14px] top-0 whitespace-nowrap">Status</p>
      </div>
    </div>
  );
}

function Container16() {
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
      <Container15 />
      <Container16 />
    </div>
  );
}

function Icon16() {
  return (
    <div className="h-[13.344px] overflow-clip relative shrink-0 w-full" data-name="Icon">
      <div className="absolute inset-[0_68.75%_0_0]" data-name="Vector">
        <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2.22653 13.3438">
          <path d={svgPaths.p10bef880} fill="var(--fill-0, #616D79)" id="Vector" />
        </svg>
      </div>
      <div className="absolute inset-[0_0_0_68.75%]" data-name="Vector">
        <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2.22651 13.3438">
          <path d={svgPaths.p2cd4e580} fill="var(--fill-0, #616D79)" id="Vector" />
        </svg>
      </div>
    </div>
  );
}

function DragHandle8() {
  return (
    <div className="absolute content-stretch flex flex-col h-[13.344px] items-start left-[10.66px] top-[16.83px] w-[7.125px]" data-name="DragHandle">
      <Icon16 />
    </div>
  );
}

function Container17() {
  return (
    <div className="h-full relative shrink-0 w-[26px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <DragHandle8 />
      </div>
    </div>
  );
}

function Icon17() {
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
        <Icon17 />
      </div>
    </div>
  );
}

function Text8() {
  return (
    <div className="h-[20px] relative shrink-0 w-[50.297px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[20px] left-0 not-italic text-[#262626] text-[14px] top-0 whitespace-nowrap">Domain</p>
      </div>
    </div>
  );
}

function Container18() {
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
      <Container17 />
      <Container18 />
    </div>
  );
}

function Icon18() {
  return (
    <div className="h-[13.344px] overflow-clip relative shrink-0 w-full" data-name="Icon">
      <div className="absolute inset-[0_68.75%_0_0]" data-name="Vector">
        <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2.22653 13.3438">
          <path d={svgPaths.p10bef880} fill="var(--fill-0, #616D79)" id="Vector" />
        </svg>
      </div>
      <div className="absolute inset-[0_0_0_68.75%]" data-name="Vector">
        <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2.22651 13.3438">
          <path d={svgPaths.p2cd4e580} fill="var(--fill-0, #616D79)" id="Vector" />
        </svg>
      </div>
    </div>
  );
}

function DragHandle9() {
  return (
    <div className="absolute content-stretch flex flex-col h-[13.344px] items-start left-[10.66px] top-[17.33px] w-[7.125px]" data-name="DragHandle">
      <Icon18 />
    </div>
  );
}

function Container19() {
  return (
    <div className="h-full relative shrink-0 w-[26px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <DragHandle9 />
      </div>
    </div>
  );
}

function Icon19() {
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
        <Icon19 />
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

function Container20() {
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
      <Container19 />
      <Container20 />
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

function Group() {
  return (
    <div className="absolute inset-0 mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[0px_0px] mask-size-[22px_22px]" data-name="Group" style={{ maskImage: `url('${imgGroup}')` }}>
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 22 22">
        <g id="Group">
          <path d={svgPaths.p20882ef0} fill="var(--fill-0, #616D79)" id="Vector" />
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

function DensityIcon() {
  return (
    <div className="relative shrink-0 size-[22px]" data-name="DensityIcon">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid overflow-clip relative rounded-[inherit] size-full">
        <ClipPathGroup />
      </div>
    </div>
  );
}

function Button() {
  return (
    <div className="relative rounded-[4px] shrink-0 size-[36px]" data-name="Button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center px-[9px] relative size-full">
        <DensityIcon />
      </div>
    </div>
  );
}

function Group1() {
  return (
    <div className="absolute inset-0 mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[0px_0px] mask-size-[22px_22px]" data-name="Group" style={{ maskImage: `url('${imgGroup1}')` }}>
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 22 22">
        <g id="Group">
          <path d={svgPaths.p32f8f9f0} fill="var(--fill-0, white)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function ClipPathGroup1() {
  return (
    <div className="absolute contents inset-0" data-name="Clip path group">
      <Group1 />
    </div>
  );
}

function DensityIcon1() {
  return (
    <div className="relative shrink-0 size-[22px]" data-name="DensityIcon">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid overflow-clip relative rounded-[inherit] size-full">
        <ClipPathGroup1 />
      </div>
    </div>
  );
}

function Button1() {
  return (
    <div className="bg-[#616d79] relative rounded-[4px] shrink-0 size-[36px]" data-name="Button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center px-[9px] relative size-full">
        <DensityIcon1 />
      </div>
    </div>
  );
}

function Group2() {
  return (
    <div className="absolute inset-0 mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[0px_0px] mask-size-[22px_22px]" data-name="Group" style={{ maskImage: `url('${imgGroup1}')` }}>
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 22 22">
        <g id="Group">
          <path d={svgPaths.p19b84f80} fill="var(--fill-0, #616D79)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function ClipPathGroup2() {
  return (
    <div className="absolute contents inset-0" data-name="Clip path group">
      <Group2 />
    </div>
  );
}

function DensityIcon2() {
  return (
    <div className="relative shrink-0 size-[22px]" data-name="DensityIcon">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid overflow-clip relative rounded-[inherit] size-full">
        <ClipPathGroup2 />
      </div>
    </div>
  );
}

function Button2() {
  return (
    <div className="flex-[1_0_0] h-[36px] min-h-px min-w-px relative rounded-[4px]" data-name="Button">
      <div className="flex flex-row items-center justify-center size-full">
        <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center px-[9px] relative size-full">
          <DensityIcon2 />
        </div>
      </div>
    </div>
  );
}

function Container22() {
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

function Container21() {
  return (
    <div className="bg-white h-[48px] relative shrink-0 w-full" data-name="Container">
      <div aria-hidden="true" className="absolute border-[#f3f4f6] border-solid border-t inset-0 pointer-events-none" />
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex items-center justify-between pl-[17px] pr-[8px] pt-px relative size-full">
          <Text10 />
          <Container22 />
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

function Container24() {
  return (
    <div className="h-[20px] relative shrink-0 w-[160.844px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[6px] items-center relative size-full">
        <Text11 />
        <Text12 />
      </div>
    </div>
  );
}

function Icon20() {
  return (
    <div className="relative shrink-0 size-[14px]" data-name="Icon">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14 14">
        <g id="Icon">
          <path d={svgPaths.p3e756600} fill="var(--fill-0, #616D79)" id="Vector" />
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
        <Icon20 />
      </div>
    </div>
  );
}

function Icon21() {
  return (
    <div className="relative shrink-0 size-[14px]" data-name="Icon">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14 14">
        <g id="Icon">
          <path d={svgPaths.p262e670} fill="var(--fill-0, #616D79)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function Button4() {
  return (
    <div className="bg-white flex-[1_0_0] h-[28px] min-h-px min-w-px relative rounded-[4px]" data-name="Button">
      <div aria-hidden="true" className="absolute border border-[#d0d5dd] border-solid inset-0 pointer-events-none rounded-[4px]" />
      <div className="flex flex-row items-center justify-center size-full">
        <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center px-[7px] py-px relative size-full">
          <Icon21 />
        </div>
      </div>
    </div>
  );
}

function Container25() {
  return (
    <div className="h-[28px] relative shrink-0 w-[62px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[6px] items-center relative size-full">
        <Button3 />
        <Button4 />
      </div>
    </div>
  );
}

function Container23() {
  return (
    <div className="bg-white h-[48px] relative shrink-0 w-full" data-name="Container">
      <div aria-hidden="true" className="absolute border-[#f3f4f6] border-solid border-t inset-0 pointer-events-none" />
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex items-center justify-between pl-[17px] pr-[12px] pt-px relative size-full">
          <Container24 />
          <Container25 />
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

function Container26() {
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
        <Container21 />
        <Container23 />
        <Container26 />
      </div>
      <div aria-hidden="true" className="absolute border border-[#e5e7eb] border-solid inset-0 pointer-events-none rounded-[8px] shadow-[0px_2px_8px_0px_rgba(0,0,0,0.18)]" />
    </div>
  );
}