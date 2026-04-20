import svgPaths from "./svg-n4fdemr8h2";
import { imgVector, imgGroup, imgGroup1 } from "./svg-ghpmv";

function TextInput() {
  return (
    <div className="absolute bg-white h-[36px] left-0 rounded-[4px] top-0 w-[320px]" data-name="Text Input">
      <div className="content-stretch flex items-center overflow-clip pl-[34px] pr-[10px] relative rounded-[inherit] size-full">
        <p className="font-['Open_Sans:Regular',sans-serif] font-normal leading-[normal] relative shrink-0 text-[14px] text-[rgba(52,64,84,0.5)] whitespace-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
          Search users…
        </p>
      </div>
      <div aria-hidden="true" className="absolute border border-[#d0d5dd] border-solid inset-0 pointer-events-none rounded-[4px]" />
    </div>
  );
}

function Icon() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="Icon">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g clipPath="url(#clip0_2185_29735)" id="Icon">
          <path d={svgPaths.p12a60800} id="Vector" stroke="var(--stroke-0, #9CA4AE)" strokeWidth="1.65517" />
        </g>
        <defs>
          <clipPath id="clip0_2185_29735">
            <rect fill="white" height="16" width="16" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Container3() {
  return (
    <div className="absolute content-stretch flex items-center justify-center left-[10px] size-[16px] top-[10px]" data-name="Container">
      <Icon />
    </div>
  );
}

function Container2() {
  return (
    <div className="absolute h-[36px] left-[12px] top-[6.5px] w-[320px]" data-name="Container">
      <TextInput />
      <Container3 />
    </div>
  );
}

function Group() {
  return (
    <div className="absolute contents inset-0" data-name="Group">
      <div className="absolute inset-0 mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[0px_0px] mask-size-[14px_14px]" data-name="Vector" style={{ maskImage: `url('${imgVector}')` }}>
        <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14 14">
          <path d={svgPaths.pdd75d00} fill="var(--fill-0, white)" id="Vector" />
        </svg>
      </div>
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

function Icon1() {
  return (
    <div className="h-[14px] overflow-clip relative shrink-0 w-full" data-name="Icon">
      <ClipPathGroup />
    </div>
  );
}

function Container4() {
  return (
    <div className="absolute content-stretch flex flex-col items-start left-[16px] size-[14px] top-[11px]" data-name="Container">
      <Icon1 />
    </div>
  );
}

function Button() {
  return (
    <div className="absolute bg-[#ff4d00] h-[36px] left-[929.91px] rounded-[4px] top-[6.5px] w-[155.094px]" data-name="Button">
      <p className="-translate-x-1/2 absolute font-['Inter:Regular',sans-serif] font-normal leading-[21px] left-[91px] not-italic text-[14px] text-center text-white top-[7.5px] whitespace-nowrap">+ Add to Team</p>
      <Container4 />
    </div>
  );
}

function Container1() {
  return (
    <div className="absolute bg-[#fafafa] border-[#f0f0f0] border-b border-solid h-[50px] left-0 top-0 w-[1097px]" data-name="Container">
      <Container2 />
      <Button />
    </div>
  );
}

function Icon2() {
  return (
    <div className="relative shrink-0 size-[18px]" data-name="Icon">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 18 18">
        <g clipPath="url(#clip0_2176_5227)" id="Icon">
          <path d={svgPaths.p3ea42000} fill="var(--fill-0, white)" id="Vector" />
          <path d={svgPaths.p3ea42000} id="Vector_2" stroke="var(--stroke-0, #D0D5DD)" strokeWidth="1.5" />
        </g>
        <defs>
          <clipPath id="clip0_2176_5227">
            <rect fill="white" height="18" width="18" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function CheckboxIcon() {
  return (
    <div className="relative rounded-[4px] shrink-0 size-[32px]" data-name="CheckboxIcon">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center relative size-full">
        <Icon2 />
      </div>
    </div>
  );
}

function Container7() {
  return (
    <div className="absolute content-stretch flex h-[32px] items-center justify-center left-0 top-[7.5px] w-[48px]" data-name="Container">
      <CheckboxIcon />
    </div>
  );
}

function Text() {
  return (
    <div className="h-[18px] relative shrink-0 w-[14.141px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start relative size-full">
        <p className="font-['Open_Sans:SemiBold',sans-serif] font-semibold leading-[18px] relative shrink-0 text-[12px] text-white whitespace-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
          CL
        </p>
      </div>
    </div>
  );
}

function MemberAvatar() {
  return (
    <div className="bg-[#e4405f] relative rounded-[16px] shrink-0 size-[32px]" data-name="MemberAvatar">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center pr-[0.016px] relative size-full">
        <Text />
      </div>
    </div>
  );
}

function Text1() {
  return (
    <div className="h-[19.5px] relative shrink-0 w-[76.953px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start overflow-clip relative rounded-[inherit] size-full">
        <p className="font-['Open_Sans:SemiBold',sans-serif] font-semibold leading-[19.5px] relative shrink-0 text-[#1d2c38] text-[13px] whitespace-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
          Captain Levi
        </p>
      </div>
    </div>
  );
}

function Container8() {
  return (
    <div className="absolute content-stretch flex gap-[10px] h-[32px] items-center left-[48px] top-[7.5px] w-[360px]" data-name="Container">
      <MemberAvatar />
      <Text1 />
    </div>
  );
}

function Text2() {
  return (
    <div className="absolute content-stretch flex h-[19.5px] items-start left-[36px] top-[4.25px] w-[51.594px]" data-name="Text">
      <p className="font-['Open_Sans:Regular',sans-serif] font-normal leading-[19.5px] relative shrink-0 text-[#175cd3] text-[13px] whitespace-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
        Member
      </p>
    </div>
  );
}

function Icon3() {
  return (
    <div className="h-[10.453px] overflow-clip relative shrink-0 w-full" data-name="Icon">
      <div className="absolute inset-[8.33%]" data-name="Vector">
        <div className="absolute inset-[-9.88%_-10.11%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 10.2374 10.4343">
            <path d={svgPaths.p142e5d80} id="Vector" stroke="var(--stroke-0, #384857)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.72214" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function Container12() {
  return (
    <div className="absolute content-stretch flex flex-col h-[10.453px] items-start left-[1.7px] top-0 w-[10.219px]" data-name="Container">
      <Icon3 />
    </div>
  );
}

function Icon4() {
  return (
    <div className="h-[7.844px] overflow-clip relative shrink-0 w-full" data-name="Icon">
      <div className="absolute inset-[11.1%_6.25%]" data-name="Vector">
        <div className="absolute inset-[-14.12%_-7.22%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 13.6441 7.82442">
            <path d={svgPaths.p1a889100} id="Vector" stroke="var(--stroke-0, #384857)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.7226" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function Container13() {
  return (
    <div className="absolute content-stretch flex flex-col h-[7.844px] items-start left-0 top-[8.72px] w-[13.625px]" data-name="Container">
      <Icon4 />
    </div>
  );
}

function Container11() {
  return (
    <div className="h-[16.563px] relative shrink-0 w-full" data-name="Container">
      <Container12 />
      <Container13 />
    </div>
  );
}

function Container10() {
  return (
    <div className="h-[18.5px] relative shrink-0 w-full" data-name="Container">
      <div className="overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex flex-col items-start pt-[0.969px] px-[0.969px] relative size-full">
          <Container11 />
        </div>
      </div>
    </div>
  );
}

function FigmaMemberIcon() {
  return (
    <div className="absolute bg-[#f0f2f5] content-stretch flex flex-col items-start left-0 overflow-clip pt-[5px] px-[6.219px] rounded-[6px] size-[28px] top-0" data-name="FigmaMemberIcon">
      <Container10 />
    </div>
  );
}

function MemberTypeDisplay() {
  return (
    <div className="h-[28px] relative shrink-0 w-[87.594px]" data-name="MemberTypeDisplay">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <Text2 />
        <FigmaMemberIcon />
      </div>
    </div>
  );
}

function Container9() {
  return (
    <div className="absolute content-stretch flex h-[28px] items-center left-[408px] top-[9.5px] w-[120px]" data-name="Container">
      <MemberTypeDisplay />
    </div>
  );
}

function Text3() {
  return (
    <div className="absolute content-stretch flex h-[19.5px] items-start left-[528px] overflow-clip top-[13.75px] w-[493px]" data-name="Text">
      <p className="flex-[1_0_0] font-['Open_Sans:Regular',sans-serif] font-normal leading-[19.5px] min-h-px min-w-px relative text-[#175cd3] text-[13px]" style={{ fontVariationSettings: "'wdth' 100" }}>
        VDC Manager
      </p>
    </div>
  );
}

function Group1() {
  return (
    <div className="absolute inset-[0_6.67%] mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[-1.067px_0px] mask-size-[16px_16px]" data-name="Group" style={{ maskImage: `url('${imgGroup}')` }}>
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 13.8656 16">
        <g id="Group">
          <path d={svgPaths.p1c71b600} fill="var(--fill-0, #616D79)" id="Vector" />
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

function Icon5() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="Icon">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid overflow-clip relative rounded-[inherit] size-full">
        <ClipPathGroup1 />
      </div>
    </div>
  );
}

function RemoveIconBtn() {
  return (
    <div className="relative rounded-[4px] shrink-0 size-[32px]" data-name="RemoveIconBtn">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center relative size-full">
        <Icon5 />
      </div>
    </div>
  );
}

function Container14() {
  return (
    <div className="absolute content-stretch flex h-[32px] items-center justify-center left-[1037px] top-[7.5px] w-[60px]" data-name="Container">
      <RemoveIconBtn />
    </div>
  );
}

function Container6() {
  return (
    <div className="bg-white h-[48px] relative shrink-0 w-full" data-name="Container">
      <div aria-hidden="true" className="absolute border-[#f0f0f0] border-b border-solid inset-0 pointer-events-none" />
      <Container7 />
      <Container8 />
      <Container9 />
      <Text3 />
      <Container14 />
    </div>
  );
}

function Icon6() {
  return (
    <div className="relative shrink-0 size-[18px]" data-name="Icon">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 18 18">
        <g clipPath="url(#clip0_2176_5227)" id="Icon">
          <path d={svgPaths.p3ea42000} fill="var(--fill-0, white)" id="Vector" />
          <path d={svgPaths.p3ea42000} id="Vector_2" stroke="var(--stroke-0, #D0D5DD)" strokeWidth="1.5" />
        </g>
        <defs>
          <clipPath id="clip0_2176_5227">
            <rect fill="white" height="18" width="18" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function CheckboxIcon1() {
  return (
    <div className="relative rounded-[4px] shrink-0 size-[32px]" data-name="CheckboxIcon">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center relative size-full">
        <Icon6 />
      </div>
    </div>
  );
}

function Container16() {
  return (
    <div className="absolute content-stretch flex h-[32px] items-center justify-center left-0 top-[7.5px] w-[48px]" data-name="Container">
      <CheckboxIcon1 />
    </div>
  );
}

function Text4() {
  return (
    <div className="h-[18px] relative shrink-0 w-[14.328px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start relative size-full">
        <p className="font-['Open_Sans:SemiBold',sans-serif] font-semibold leading-[18px] relative shrink-0 text-[12px] text-white whitespace-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
          AF
        </p>
      </div>
    </div>
  );
}

function MemberAvatar1() {
  return (
    <div className="bg-[#1abc9c] relative rounded-[16px] shrink-0 size-[32px]" data-name="MemberAvatar">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center pr-[0.016px] relative size-full">
        <Text4 />
      </div>
    </div>
  );
}

function Text5() {
  return (
    <div className="h-[19.5px] relative shrink-0 w-[92.328px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start overflow-clip relative rounded-[inherit] size-full">
        <p className="font-['Open_Sans:SemiBold',sans-serif] font-semibold leading-[19.5px] relative shrink-0 text-[#1d2c38] text-[13px] whitespace-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
          Aaron Fletcher
        </p>
      </div>
    </div>
  );
}

function Container17() {
  return (
    <div className="absolute content-stretch flex gap-[10px] h-[32px] items-center left-[48px] top-[7.5px] w-[360px]" data-name="Container">
      <MemberAvatar1 />
      <Text5 />
    </div>
  );
}

function Text6() {
  return (
    <div className="absolute content-stretch flex h-[19.5px] items-start left-[36px] top-[4.25px] w-[51.594px]" data-name="Text">
      <p className="font-['Open_Sans:Regular',sans-serif] font-normal leading-[19.5px] relative shrink-0 text-[#175cd3] text-[13px] whitespace-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
        Member
      </p>
    </div>
  );
}

function Icon7() {
  return (
    <div className="h-[10.453px] overflow-clip relative shrink-0 w-full" data-name="Icon">
      <div className="absolute inset-[8.33%]" data-name="Vector">
        <div className="absolute inset-[-9.88%_-10.11%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 10.2374 10.4343">
            <path d={svgPaths.p142e5d80} id="Vector" stroke="var(--stroke-0, #384857)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.72214" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function Container21() {
  return (
    <div className="absolute content-stretch flex flex-col h-[10.453px] items-start left-[1.7px] top-0 w-[10.219px]" data-name="Container">
      <Icon7 />
    </div>
  );
}

function Icon8() {
  return (
    <div className="h-[7.844px] overflow-clip relative shrink-0 w-full" data-name="Icon">
      <div className="absolute inset-[11.1%_6.25%]" data-name="Vector">
        <div className="absolute inset-[-14.12%_-7.22%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 13.6441 7.82442">
            <path d={svgPaths.p1a889100} id="Vector" stroke="var(--stroke-0, #384857)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.7226" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function Container22() {
  return (
    <div className="absolute content-stretch flex flex-col h-[7.844px] items-start left-0 top-[8.72px] w-[13.625px]" data-name="Container">
      <Icon8 />
    </div>
  );
}

function Container20() {
  return (
    <div className="h-[16.563px] relative shrink-0 w-full" data-name="Container">
      <Container21 />
      <Container22 />
    </div>
  );
}

function Container19() {
  return (
    <div className="h-[18.5px] relative shrink-0 w-full" data-name="Container">
      <div className="overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex flex-col items-start pt-[0.969px] px-[0.969px] relative size-full">
          <Container20 />
        </div>
      </div>
    </div>
  );
}

function FigmaMemberIcon1() {
  return (
    <div className="absolute bg-[#f0f2f5] content-stretch flex flex-col items-start left-0 overflow-clip pt-[5px] px-[6.219px] rounded-[6px] size-[28px] top-0" data-name="FigmaMemberIcon">
      <Container19 />
    </div>
  );
}

function MemberTypeDisplay1() {
  return (
    <div className="h-[28px] relative shrink-0 w-[87.594px]" data-name="MemberTypeDisplay">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <Text6 />
        <FigmaMemberIcon1 />
      </div>
    </div>
  );
}

function Container18() {
  return (
    <div className="absolute content-stretch flex h-[28px] items-center left-[408px] top-[9.5px] w-[120px]" data-name="Container">
      <MemberTypeDisplay1 />
    </div>
  );
}

function Text7() {
  return (
    <div className="absolute content-stretch flex h-[19.5px] items-start left-[528px] overflow-clip top-[13.75px] w-[493px]" data-name="Text">
      <p className="flex-[1_0_0] font-['Open_Sans:Regular',sans-serif] font-normal leading-[19.5px] min-h-px min-w-px relative text-[#175cd3] text-[13px]" style={{ fontVariationSettings: "'wdth' 100" }}>
        Construction Manager
      </p>
    </div>
  );
}

function Group2() {
  return (
    <div className="absolute inset-[0_6.67%] mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[-1.067px_0px] mask-size-[16px_16px]" data-name="Group" style={{ maskImage: `url('${imgGroup}')` }}>
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 13.8656 16">
        <g id="Group">
          <path d={svgPaths.p1c71b600} fill="var(--fill-0, #616D79)" id="Vector" />
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

function Icon9() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="Icon">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid overflow-clip relative rounded-[inherit] size-full">
        <ClipPathGroup2 />
      </div>
    </div>
  );
}

function RemoveIconBtn1() {
  return (
    <div className="relative rounded-[4px] shrink-0 size-[32px]" data-name="RemoveIconBtn">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center relative size-full">
        <Icon9 />
      </div>
    </div>
  );
}

function Container23() {
  return (
    <div className="absolute content-stretch flex h-[32px] items-center justify-center left-[1037px] top-[7.5px] w-[60px]" data-name="Container">
      <RemoveIconBtn1 />
    </div>
  );
}

function Container15() {
  return (
    <div className="bg-white h-[48px] relative shrink-0 w-full" data-name="Container">
      <div aria-hidden="true" className="absolute border-[#f0f0f0] border-b border-solid inset-0 pointer-events-none" />
      <Container16 />
      <Container17 />
      <Container18 />
      <Text7 />
      <Container23 />
    </div>
  );
}

function Icon10() {
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

function CheckboxIcon2() {
  return (
    <div className="relative rounded-[4px] shrink-0 size-[32px]" data-name="CheckboxIcon">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center relative size-full">
        <Icon10 />
      </div>
    </div>
  );
}

function Container25() {
  return (
    <div className="absolute content-stretch flex h-[32px] items-center justify-center left-0 top-[7.5px] w-[48px]" data-name="Container">
      <CheckboxIcon2 />
    </div>
  );
}

function Text8() {
  return (
    <div className="h-[18px] relative shrink-0 w-[19.266px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start relative size-full">
        <p className="font-['Open_Sans:SemiBold',sans-serif] font-semibold leading-[18px] relative shrink-0 text-[12px] text-white whitespace-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
          BW
        </p>
      </div>
    </div>
  );
}

function MemberAvatar2() {
  return (
    <div className="bg-[#e74c3c] relative rounded-[16px] shrink-0 size-[32px]" data-name="MemberAvatar">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center pr-[0.016px] relative size-full">
        <Text8 />
      </div>
    </div>
  );
}

function Text9() {
  return (
    <div className="h-[19.5px] relative shrink-0 w-[90.828px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start overflow-clip relative rounded-[inherit] size-full">
        <p className="font-['Open_Sans:SemiBold',sans-serif] font-semibold leading-[19.5px] relative shrink-0 text-[#1d2c38] text-[13px] whitespace-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
          Brianna Walsh
        </p>
      </div>
    </div>
  );
}

function Container26() {
  return (
    <div className="absolute content-stretch flex gap-[10px] h-[32px] items-center left-[48px] top-[7.5px] w-[360px]" data-name="Container">
      <MemberAvatar2 />
      <Text9 />
    </div>
  );
}

function Text10() {
  return (
    <div className="absolute content-stretch flex h-[19.5px] items-start left-[36px] top-[4.25px] w-[51.594px]" data-name="Text">
      <p className="font-['Open_Sans:Regular',sans-serif] font-normal leading-[19.5px] relative shrink-0 text-[#175cd3] text-[13px] whitespace-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
        Member
      </p>
    </div>
  );
}

function Icon11() {
  return (
    <div className="h-[10.453px] overflow-clip relative shrink-0 w-full" data-name="Icon">
      <div className="absolute inset-[8.33%]" data-name="Vector">
        <div className="absolute inset-[-9.88%_-10.11%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 10.2374 10.4343">
            <path d={svgPaths.p142e5d80} id="Vector" stroke="var(--stroke-0, #384857)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.72214" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function Container30() {
  return (
    <div className="absolute content-stretch flex flex-col h-[10.453px] items-start left-[1.7px] top-0 w-[10.219px]" data-name="Container">
      <Icon11 />
    </div>
  );
}

function Icon12() {
  return (
    <div className="h-[7.844px] overflow-clip relative shrink-0 w-full" data-name="Icon">
      <div className="absolute inset-[11.1%_6.25%]" data-name="Vector">
        <div className="absolute inset-[-14.12%_-7.22%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 13.6441 7.82442">
            <path d={svgPaths.p1a889100} id="Vector" stroke="var(--stroke-0, #384857)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.7226" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function Container31() {
  return (
    <div className="absolute content-stretch flex flex-col h-[7.844px] items-start left-0 top-[8.72px] w-[13.625px]" data-name="Container">
      <Icon12 />
    </div>
  );
}

function Container29() {
  return (
    <div className="h-[16.563px] relative shrink-0 w-full" data-name="Container">
      <Container30 />
      <Container31 />
    </div>
  );
}

function Container28() {
  return (
    <div className="h-[18.5px] relative shrink-0 w-full" data-name="Container">
      <div className="overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex flex-col items-start pt-[0.969px] px-[0.969px] relative size-full">
          <Container29 />
        </div>
      </div>
    </div>
  );
}

function FigmaMemberIcon2() {
  return (
    <div className="absolute bg-[#f0f2f5] content-stretch flex flex-col items-start left-0 overflow-clip pt-[5px] px-[6.219px] rounded-[6px] size-[28px] top-0" data-name="FigmaMemberIcon">
      <Container28 />
    </div>
  );
}

function MemberTypeDisplay2() {
  return (
    <div className="h-[28px] relative shrink-0 w-[87.594px]" data-name="MemberTypeDisplay">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <Text10 />
        <FigmaMemberIcon2 />
      </div>
    </div>
  );
}

function Container27() {
  return (
    <div className="absolute content-stretch flex h-[28px] items-center left-[408px] top-[9.5px] w-[120px]" data-name="Container">
      <MemberTypeDisplay2 />
    </div>
  );
}

function Text11() {
  return (
    <div className="absolute content-stretch flex h-[19.5px] items-start left-[528px] overflow-clip top-[13.75px] w-[493px]" data-name="Text">
      <p className="flex-[1_0_0] font-['Open_Sans:Regular',sans-serif] font-normal leading-[19.5px] min-h-px min-w-px relative text-[#175cd3] text-[13px]" style={{ fontVariationSettings: "'wdth' 100" }}>
        Construction Manager
      </p>
    </div>
  );
}

function Group3() {
  return (
    <div className="absolute inset-[0_6.67%] mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[-1.067px_0px] mask-size-[16px_16px]" data-name="Group" style={{ maskImage: `url('${imgGroup}')` }}>
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 13.8656 16">
        <g id="Group">
          <path d={svgPaths.p1c71b600} fill="var(--fill-0, #616D79)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function ClipPathGroup3() {
  return (
    <div className="absolute contents inset-0" data-name="Clip path group">
      <Group3 />
    </div>
  );
}

function Icon13() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="Icon">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid overflow-clip relative rounded-[inherit] size-full">
        <ClipPathGroup3 />
      </div>
    </div>
  );
}

function RemoveIconBtn2() {
  return (
    <div className="relative rounded-[4px] shrink-0 size-[32px]" data-name="RemoveIconBtn">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center relative size-full">
        <Icon13 />
      </div>
    </div>
  );
}

function Container32() {
  return (
    <div className="absolute content-stretch flex h-[32px] items-center justify-center left-[1037px] top-[7.5px] w-[60px]" data-name="Container">
      <RemoveIconBtn2 />
    </div>
  );
}

function Container24() {
  return (
    <div className="bg-[#e6f7ff] h-[48px] relative shrink-0 w-full" data-name="Container">
      <div aria-hidden="true" className="absolute border-[#f0f0f0] border-b border-solid inset-0 pointer-events-none" />
      <Container25 />
      <Container26 />
      <Container27 />
      <Text11 />
      <Container32 />
    </div>
  );
}

function Icon14() {
  return (
    <div className="relative shrink-0 size-[18px]" data-name="Icon">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 18 18">
        <g clipPath="url(#clip0_2176_5227)" id="Icon">
          <path d={svgPaths.p3ea42000} fill="var(--fill-0, white)" id="Vector" />
          <path d={svgPaths.p3ea42000} id="Vector_2" stroke="var(--stroke-0, #D0D5DD)" strokeWidth="1.5" />
        </g>
        <defs>
          <clipPath id="clip0_2176_5227">
            <rect fill="white" height="18" width="18" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function CheckboxIcon3() {
  return (
    <div className="relative rounded-[4px] shrink-0 size-[32px]" data-name="CheckboxIcon">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center relative size-full">
        <Icon14 />
      </div>
    </div>
  );
}

function Container34() {
  return (
    <div className="absolute content-stretch flex h-[32px] items-center justify-center left-0 top-[7.5px] w-[48px]" data-name="Container">
      <CheckboxIcon3 />
    </div>
  );
}

function Text12() {
  return (
    <div className="h-[18px] relative shrink-0 w-[16.828px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start relative size-full">
        <p className="font-['Open_Sans:SemiBold',sans-serif] font-semibold leading-[18px] relative shrink-0 text-[12px] text-white whitespace-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
          UB
        </p>
      </div>
    </div>
  );
}

function MemberAvatar3() {
  return (
    <div className="bg-[#1abc9c] relative rounded-[16px] shrink-0 size-[32px]" data-name="MemberAvatar">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center pr-[0.016px] relative size-full">
        <Text12 />
      </div>
    </div>
  );
}

function Text13() {
  return (
    <div className="h-[19.5px] relative shrink-0 w-[101.438px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start overflow-clip relative rounded-[inherit] size-full">
        <p className="font-['Open_Sans:SemiBold',sans-serif] font-semibold leading-[19.5px] relative shrink-0 text-[#1d2c38] text-[13px] whitespace-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
          Ulrich Baumann
        </p>
      </div>
    </div>
  );
}

function Container35() {
  return (
    <div className="absolute content-stretch flex gap-[10px] h-[32px] items-center left-[48px] top-[7.5px] w-[360px]" data-name="Container">
      <MemberAvatar3 />
      <Text13 />
    </div>
  );
}

function Text14() {
  return (
    <div className="absolute content-stretch flex h-[19.5px] items-start left-[36px] top-[4.25px] w-[51.594px]" data-name="Text">
      <p className="font-['Open_Sans:Regular',sans-serif] font-normal leading-[19.5px] relative shrink-0 text-[#175cd3] text-[13px] whitespace-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
        Member
      </p>
    </div>
  );
}

function Icon15() {
  return (
    <div className="h-[10.453px] overflow-clip relative shrink-0 w-full" data-name="Icon">
      <div className="absolute inset-[8.33%]" data-name="Vector">
        <div className="absolute inset-[-9.88%_-10.11%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 10.2374 10.4343">
            <path d={svgPaths.p142e5d80} id="Vector" stroke="var(--stroke-0, #384857)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.72214" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function Container39() {
  return (
    <div className="absolute content-stretch flex flex-col h-[10.453px] items-start left-[1.7px] top-0 w-[10.219px]" data-name="Container">
      <Icon15 />
    </div>
  );
}

function Icon16() {
  return (
    <div className="h-[7.844px] overflow-clip relative shrink-0 w-full" data-name="Icon">
      <div className="absolute inset-[11.1%_6.25%]" data-name="Vector">
        <div className="absolute inset-[-14.12%_-7.22%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 13.6441 7.82442">
            <path d={svgPaths.p1a889100} id="Vector" stroke="var(--stroke-0, #384857)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.7226" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function Container40() {
  return (
    <div className="absolute content-stretch flex flex-col h-[7.844px] items-start left-0 top-[8.72px] w-[13.625px]" data-name="Container">
      <Icon16 />
    </div>
  );
}

function Container38() {
  return (
    <div className="h-[16.563px] relative shrink-0 w-full" data-name="Container">
      <Container39 />
      <Container40 />
    </div>
  );
}

function Container37() {
  return (
    <div className="h-[18.5px] relative shrink-0 w-full" data-name="Container">
      <div className="overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex flex-col items-start pt-[0.969px] px-[0.969px] relative size-full">
          <Container38 />
        </div>
      </div>
    </div>
  );
}

function FigmaMemberIcon3() {
  return (
    <div className="absolute bg-[#f0f2f5] content-stretch flex flex-col items-start left-0 overflow-clip pt-[5px] px-[6.219px] rounded-[6px] size-[28px] top-0" data-name="FigmaMemberIcon">
      <Container37 />
    </div>
  );
}

function MemberTypeDisplay3() {
  return (
    <div className="h-[28px] relative shrink-0 w-[87.594px]" data-name="MemberTypeDisplay">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <Text14 />
        <FigmaMemberIcon3 />
      </div>
    </div>
  );
}

function Container36() {
  return (
    <div className="absolute content-stretch flex h-[28px] items-center left-[408px] top-[9.5px] w-[120px]" data-name="Container">
      <MemberTypeDisplay3 />
    </div>
  );
}

function Text15() {
  return (
    <div className="absolute content-stretch flex h-[19.5px] items-start left-[528px] overflow-clip top-[13.75px] w-[493px]" data-name="Text">
      <p className="flex-[1_0_0] font-['Open_Sans:Regular',sans-serif] font-normal leading-[19.5px] min-h-px min-w-px relative text-[#175cd3] text-[13px]" style={{ fontVariationSettings: "'wdth' 100" }}>
        Site Manager
      </p>
    </div>
  );
}

function Group4() {
  return (
    <div className="absolute inset-[0_6.67%] mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[-1.067px_0px] mask-size-[16px_16px]" data-name="Group" style={{ maskImage: `url('${imgGroup}')` }}>
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 13.8656 16">
        <g id="Group">
          <path d={svgPaths.p1c71b600} fill="var(--fill-0, #616D79)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function ClipPathGroup4() {
  return (
    <div className="absolute contents inset-0" data-name="Clip path group">
      <Group4 />
    </div>
  );
}

function Icon17() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="Icon">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid overflow-clip relative rounded-[inherit] size-full">
        <ClipPathGroup4 />
      </div>
    </div>
  );
}

function RemoveIconBtn3() {
  return (
    <div className="relative rounded-[4px] shrink-0 size-[32px]" data-name="RemoveIconBtn">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center relative size-full">
        <Icon17 />
      </div>
    </div>
  );
}

function Container41() {
  return (
    <div className="absolute content-stretch flex h-[32px] items-center justify-center left-[1037px] top-[7.5px] w-[60px]" data-name="Container">
      <RemoveIconBtn3 />
    </div>
  );
}

function Container33() {
  return (
    <div className="bg-white h-[48px] relative shrink-0 w-full" data-name="Container">
      <div aria-hidden="true" className="absolute border-[#f0f0f0] border-b border-solid inset-0 pointer-events-none" />
      <Container34 />
      <Container35 />
      <Container36 />
      <Text15 />
      <Container41 />
    </div>
  );
}

function Icon18() {
  return (
    <div className="relative shrink-0 size-[18px]" data-name="Icon">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 18 18">
        <g clipPath="url(#clip0_2176_5227)" id="Icon">
          <path d={svgPaths.p3ea42000} fill="var(--fill-0, white)" id="Vector" />
          <path d={svgPaths.p3ea42000} id="Vector_2" stroke="var(--stroke-0, #D0D5DD)" strokeWidth="1.5" />
        </g>
        <defs>
          <clipPath id="clip0_2176_5227">
            <rect fill="white" height="18" width="18" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function CheckboxIcon4() {
  return (
    <div className="relative rounded-[4px] shrink-0 size-[32px]" data-name="CheckboxIcon">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center relative size-full">
        <Icon18 />
      </div>
    </div>
  );
}

function Container43() {
  return (
    <div className="absolute content-stretch flex h-[32px] items-center justify-center left-0 top-[7.5px] w-[48px]" data-name="Container">
      <CheckboxIcon4 />
    </div>
  );
}

function Text16() {
  return (
    <div className="h-[18px] relative shrink-0 w-[13.094px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start relative size-full">
        <p className="font-['Open_Sans:SemiBold',sans-serif] font-semibold leading-[18px] relative shrink-0 text-[12px] text-white whitespace-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
          EF
        </p>
      </div>
    </div>
  );
}

function MemberAvatar4() {
  return (
    <div className="bg-[#1abc9c] relative rounded-[16px] shrink-0 size-[32px]" data-name="MemberAvatar">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center relative size-full">
        <Text16 />
      </div>
    </div>
  );
}

function Text17() {
  return (
    <div className="h-[19.5px] relative shrink-0 w-[106.078px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start overflow-clip relative rounded-[inherit] size-full">
        <p className="font-['Open_Sans:SemiBold',sans-serif] font-semibold leading-[19.5px] relative shrink-0 text-[#1d2c38] text-[13px] whitespace-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
          Eduardo Ferreira
        </p>
      </div>
    </div>
  );
}

function Container44() {
  return (
    <div className="absolute content-stretch flex gap-[10px] h-[32px] items-center left-[48px] top-[7.5px] w-[360px]" data-name="Container">
      <MemberAvatar4 />
      <Text17 />
    </div>
  );
}

function Text18() {
  return (
    <div className="absolute content-stretch flex h-[19.5px] items-start left-[36px] top-[4.25px] w-[51.594px]" data-name="Text">
      <p className="font-['Open_Sans:Regular',sans-serif] font-normal leading-[19.5px] relative shrink-0 text-[#175cd3] text-[13px] whitespace-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
        Member
      </p>
    </div>
  );
}

function Icon19() {
  return (
    <div className="h-[10.453px] overflow-clip relative shrink-0 w-full" data-name="Icon">
      <div className="absolute inset-[8.33%]" data-name="Vector">
        <div className="absolute inset-[-9.88%_-10.11%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 10.2374 10.4343">
            <path d={svgPaths.p142e5d80} id="Vector" stroke="var(--stroke-0, #384857)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.72214" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function Container48() {
  return (
    <div className="absolute content-stretch flex flex-col h-[10.453px] items-start left-[1.7px] top-0 w-[10.219px]" data-name="Container">
      <Icon19 />
    </div>
  );
}

function Icon20() {
  return (
    <div className="h-[7.844px] overflow-clip relative shrink-0 w-full" data-name="Icon">
      <div className="absolute inset-[11.1%_6.25%]" data-name="Vector">
        <div className="absolute inset-[-14.12%_-7.22%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 13.6441 7.82442">
            <path d={svgPaths.p1a889100} id="Vector" stroke="var(--stroke-0, #384857)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.7226" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function Container49() {
  return (
    <div className="absolute content-stretch flex flex-col h-[7.844px] items-start left-0 top-[8.72px] w-[13.625px]" data-name="Container">
      <Icon20 />
    </div>
  );
}

function Container47() {
  return (
    <div className="h-[16.563px] relative shrink-0 w-full" data-name="Container">
      <Container48 />
      <Container49 />
    </div>
  );
}

function Container46() {
  return (
    <div className="h-[18.5px] relative shrink-0 w-full" data-name="Container">
      <div className="overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex flex-col items-start pt-[0.969px] px-[0.969px] relative size-full">
          <Container47 />
        </div>
      </div>
    </div>
  );
}

function FigmaMemberIcon4() {
  return (
    <div className="absolute bg-[#f0f2f5] content-stretch flex flex-col items-start left-0 overflow-clip pt-[5px] px-[6.219px] rounded-[6px] size-[28px] top-0" data-name="FigmaMemberIcon">
      <Container46 />
    </div>
  );
}

function MemberTypeDisplay4() {
  return (
    <div className="h-[28px] relative shrink-0 w-[87.594px]" data-name="MemberTypeDisplay">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <Text18 />
        <FigmaMemberIcon4 />
      </div>
    </div>
  );
}

function Container45() {
  return (
    <div className="absolute content-stretch flex h-[28px] items-center left-[408px] top-[9.5px] w-[120px]" data-name="Container">
      <MemberTypeDisplay4 />
    </div>
  );
}

function Text19() {
  return (
    <div className="absolute content-stretch flex h-[19.5px] items-start left-[528px] overflow-clip top-[13.75px] w-[493px]" data-name="Text">
      <p className="flex-[1_0_0] font-['Open_Sans:Regular',sans-serif] font-normal leading-[19.5px] min-h-px min-w-px relative text-[#175cd3] text-[13px]" style={{ fontVariationSettings: "'wdth' 100" }}>
        Superintendent
      </p>
    </div>
  );
}

function Group5() {
  return (
    <div className="absolute inset-[0_6.67%] mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[-1.067px_0px] mask-size-[16px_16px]" data-name="Group" style={{ maskImage: `url('${imgGroup}')` }}>
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 13.8656 16">
        <g id="Group">
          <path d={svgPaths.p1c71b600} fill="var(--fill-0, #616D79)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function ClipPathGroup5() {
  return (
    <div className="absolute contents inset-0" data-name="Clip path group">
      <Group5 />
    </div>
  );
}

function Icon21() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="Icon">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid overflow-clip relative rounded-[inherit] size-full">
        <ClipPathGroup5 />
      </div>
    </div>
  );
}

function RemoveIconBtn4() {
  return (
    <div className="relative rounded-[4px] shrink-0 size-[32px]" data-name="RemoveIconBtn">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center relative size-full">
        <Icon21 />
      </div>
    </div>
  );
}

function Container50() {
  return (
    <div className="absolute content-stretch flex h-[32px] items-center justify-center left-[1037px] top-[7.5px] w-[60px]" data-name="Container">
      <RemoveIconBtn4 />
    </div>
  );
}

function Container42() {
  return (
    <div className="bg-white h-[48px] relative shrink-0 w-full" data-name="Container">
      <div aria-hidden="true" className="absolute border-[#f0f0f0] border-b border-solid inset-0 pointer-events-none" />
      <Container43 />
      <Container44 />
      <Container45 />
      <Text19 />
      <Container50 />
    </div>
  );
}

function Icon22() {
  return (
    <div className="relative shrink-0 size-[18px]" data-name="Icon">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 18 18">
        <g clipPath="url(#clip0_2176_5227)" id="Icon">
          <path d={svgPaths.p3ea42000} fill="var(--fill-0, white)" id="Vector" />
          <path d={svgPaths.p3ea42000} id="Vector_2" stroke="var(--stroke-0, #D0D5DD)" strokeWidth="1.5" />
        </g>
        <defs>
          <clipPath id="clip0_2176_5227">
            <rect fill="white" height="18" width="18" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function CheckboxIcon5() {
  return (
    <div className="relative rounded-[4px] shrink-0 size-[32px]" data-name="CheckboxIcon">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center relative size-full">
        <Icon22 />
      </div>
    </div>
  );
}

function Container52() {
  return (
    <div className="absolute content-stretch flex h-[32px] items-center justify-center left-0 top-[7.5px] w-[48px]" data-name="Container">
      <CheckboxIcon5 />
    </div>
  );
}

function Text20() {
  return (
    <div className="h-[13.5px] relative shrink-0 w-[13.234px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start relative size-full">
        <p className="font-['Open_Sans:Bold',sans-serif] font-bold leading-[13.5px] relative shrink-0 text-[#384857] text-[9px] tracking-[-0.5px] whitespace-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
          CM
        </p>
      </div>
    </div>
  );
}

function MemberAvatar5() {
  return (
    <div className="bg-[#f2f3f4] relative rounded-[16px] shrink-0 size-[32px]" data-name="MemberAvatar">
      <div aria-hidden="true" className="absolute border border-[#c3c7cc] border-solid inset-0 pointer-events-none rounded-[16px]" />
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center pl-px pr-[1.016px] py-px relative size-full">
        <Text20 />
      </div>
    </div>
  );
}

function Text21() {
  return (
    <div className="h-[19.5px] relative shrink-0 w-[140.203px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start overflow-clip relative rounded-[inherit] size-full">
        <p className="font-['Open_Sans:SemiBold',sans-serif] font-semibold leading-[19.5px] relative shrink-0 text-[#1d2c38] text-[13px] whitespace-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
          Construction Manager
        </p>
      </div>
    </div>
  );
}

function Container53() {
  return (
    <div className="absolute content-stretch flex gap-[10px] h-[32px] items-center left-[48px] top-[7.5px] w-[360px]" data-name="Container">
      <MemberAvatar5 />
      <Text21 />
    </div>
  );
}

function Group6() {
  return (
    <div className="absolute inset-[7.86%_3.72%] mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[-0.669px_-1.414px] mask-size-[18px_18px]" data-name="Group" style={{ maskImage: `url('${imgGroup1}')` }}>
      <div className="absolute inset-[-5.88%_-5.36%_-5.88%_-5.35%]">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 18.4458 16.9558">
          <g id="Group">
            <path d={svgPaths.p164b0200} id="Vector" stroke="var(--stroke-0, #384857)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.78436" />
            <path d={svgPaths.pb1b5dc0} id="Vector_2" stroke="var(--stroke-0, #384857)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.78436" />
            <path d={svgPaths.p10973100} id="Vector_3" stroke="var(--stroke-0, #384857)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.78436" />
          </g>
        </svg>
      </div>
    </div>
  );
}

function ClipPathGroup6() {
  return (
    <div className="absolute contents inset-0" data-name="Clip path group">
      <Group6 />
    </div>
  );
}

function Icon23() {
  return (
    <div className="relative shrink-0 size-[18px]" data-name="Icon">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid overflow-clip relative rounded-[inherit] size-full">
        <ClipPathGroup6 />
      </div>
    </div>
  );
}

function FigmaRoleIcon() {
  return (
    <div className="bg-[#f0f2f5] flex-[1_0_0] h-[28px] min-h-px min-w-px relative rounded-[6px]" data-name="FigmaRoleIcon">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center relative size-full">
        <Icon23 />
      </div>
    </div>
  );
}

function Text22() {
  return (
    <div className="h-[19.5px] relative shrink-0 w-[26.438px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start relative size-full">
        <p className="font-['Open_Sans:Regular',sans-serif] font-normal leading-[19.5px] relative shrink-0 text-[#175cd3] text-[13px] whitespace-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
          Role
        </p>
      </div>
    </div>
  );
}

function MemberTypeDisplay5() {
  return (
    <div className="h-[28px] relative shrink-0 w-[62.438px]" data-name="MemberTypeDisplay">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[8px] items-center relative size-full">
        <FigmaRoleIcon />
        <Text22 />
      </div>
    </div>
  );
}

function Container54() {
  return (
    <div className="absolute content-stretch flex h-[28px] items-center left-[408px] top-[9.5px] w-[120px]" data-name="Container">
      <MemberTypeDisplay5 />
    </div>
  );
}

function Text23() {
  return (
    <div className="absolute content-stretch flex h-[19.5px] items-start left-[528px] overflow-clip top-[13.75px] w-[493px]" data-name="Text">
      <p className="flex-[1_0_0] font-['Open_Sans:Regular',sans-serif] font-normal leading-[19.5px] min-h-px min-w-px relative text-[#175cd3] text-[13px]" style={{ fontVariationSettings: "'wdth' 100" }}>
        Construction
      </p>
    </div>
  );
}

function Group7() {
  return (
    <div className="absolute inset-[0_6.67%] mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[-1.067px_0px] mask-size-[16px_16px]" data-name="Group" style={{ maskImage: `url('${imgGroup}')` }}>
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 13.8656 16">
        <g id="Group">
          <path d={svgPaths.p1c71b600} fill="var(--fill-0, #616D79)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function ClipPathGroup7() {
  return (
    <div className="absolute contents inset-0" data-name="Clip path group">
      <Group7 />
    </div>
  );
}

function Icon24() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="Icon">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid overflow-clip relative rounded-[inherit] size-full">
        <ClipPathGroup7 />
      </div>
    </div>
  );
}

function RemoveIconBtn5() {
  return (
    <div className="relative rounded-[4px] shrink-0 size-[32px]" data-name="RemoveIconBtn">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center relative size-full">
        <Icon24 />
      </div>
    </div>
  );
}

function Container55() {
  return (
    <div className="absolute content-stretch flex h-[32px] items-center justify-center left-[1037px] top-[7.5px] w-[60px]" data-name="Container">
      <RemoveIconBtn5 />
    </div>
  );
}

function Container51() {
  return (
    <div className="bg-white h-[48px] relative shrink-0 w-full" data-name="Container">
      <div aria-hidden="true" className="absolute border-[#f0f0f0] border-b border-solid inset-0 pointer-events-none" />
      <Container52 />
      <Container53 />
      <Container54 />
      <Text23 />
      <Container55 />
    </div>
  );
}

function Icon25() {
  return (
    <div className="relative shrink-0 size-[18px]" data-name="Icon">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 18 18">
        <g clipPath="url(#clip0_2176_5227)" id="Icon">
          <path d={svgPaths.p3ea42000} fill="var(--fill-0, white)" id="Vector" />
          <path d={svgPaths.p3ea42000} id="Vector_2" stroke="var(--stroke-0, #D0D5DD)" strokeWidth="1.5" />
        </g>
        <defs>
          <clipPath id="clip0_2176_5227">
            <rect fill="white" height="18" width="18" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function CheckboxIcon6() {
  return (
    <div className="relative rounded-[4px] shrink-0 size-[32px]" data-name="CheckboxIcon">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center relative size-full">
        <Icon25 />
      </div>
    </div>
  );
}

function Container57() {
  return (
    <div className="absolute content-stretch flex h-[32px] items-center justify-center left-0 top-[7.5px] w-[48px]" data-name="Container">
      <CheckboxIcon6 />
    </div>
  );
}

function Text24() {
  return (
    <div className="h-[13.5px] relative shrink-0 w-[12.453px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start relative size-full">
        <p className="font-['Open_Sans:Bold',sans-serif] font-bold leading-[13.5px] relative shrink-0 text-[#384857] text-[9px] tracking-[-0.5px] whitespace-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
          SM
        </p>
      </div>
    </div>
  );
}

function MemberAvatar6() {
  return (
    <div className="bg-[#f2f3f4] relative rounded-[16px] shrink-0 size-[32px]" data-name="MemberAvatar">
      <div aria-hidden="true" className="absolute border border-[#c3c7cc] border-solid inset-0 pointer-events-none rounded-[16px]" />
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center pl-px pr-[1.016px] py-px relative size-full">
        <Text24 />
      </div>
    </div>
  );
}

function Text25() {
  return (
    <div className="h-[19.5px] relative shrink-0 w-[82.406px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start overflow-clip relative rounded-[inherit] size-full">
        <p className="font-['Open_Sans:SemiBold',sans-serif] font-semibold leading-[19.5px] relative shrink-0 text-[#1d2c38] text-[13px] whitespace-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
          Site Manager
        </p>
      </div>
    </div>
  );
}

function Container58() {
  return (
    <div className="absolute content-stretch flex gap-[10px] h-[32px] items-center left-[48px] top-[7.5px] w-[360px]" data-name="Container">
      <MemberAvatar6 />
      <Text25 />
    </div>
  );
}

function Group8() {
  return (
    <div className="absolute inset-[7.86%_3.72%] mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[-0.669px_-1.414px] mask-size-[18px_18px]" data-name="Group" style={{ maskImage: `url('${imgGroup1}')` }}>
      <div className="absolute inset-[-5.88%_-5.36%_-5.88%_-5.35%]">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 18.4458 16.9558">
          <g id="Group">
            <path d={svgPaths.p164b0200} id="Vector" stroke="var(--stroke-0, #384857)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.78436" />
            <path d={svgPaths.pb1b5dc0} id="Vector_2" stroke="var(--stroke-0, #384857)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.78436" />
            <path d={svgPaths.p10973100} id="Vector_3" stroke="var(--stroke-0, #384857)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.78436" />
          </g>
        </svg>
      </div>
    </div>
  );
}

function ClipPathGroup8() {
  return (
    <div className="absolute contents inset-0" data-name="Clip path group">
      <Group8 />
    </div>
  );
}

function Icon26() {
  return (
    <div className="relative shrink-0 size-[18px]" data-name="Icon">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid overflow-clip relative rounded-[inherit] size-full">
        <ClipPathGroup8 />
      </div>
    </div>
  );
}

function FigmaRoleIcon1() {
  return (
    <div className="bg-[#f0f2f5] flex-[1_0_0] h-[28px] min-h-px min-w-px relative rounded-[6px]" data-name="FigmaRoleIcon">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center relative size-full">
        <Icon26 />
      </div>
    </div>
  );
}

function Text26() {
  return (
    <div className="h-[19.5px] relative shrink-0 w-[26.438px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start relative size-full">
        <p className="font-['Open_Sans:Regular',sans-serif] font-normal leading-[19.5px] relative shrink-0 text-[#175cd3] text-[13px] whitespace-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
          Role
        </p>
      </div>
    </div>
  );
}

function MemberTypeDisplay6() {
  return (
    <div className="h-[28px] relative shrink-0 w-[62.438px]" data-name="MemberTypeDisplay">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[8px] items-center relative size-full">
        <FigmaRoleIcon1 />
        <Text26 />
      </div>
    </div>
  );
}

function Container59() {
  return (
    <div className="absolute content-stretch flex h-[28px] items-center left-[408px] top-[9.5px] w-[120px]" data-name="Container">
      <MemberTypeDisplay6 />
    </div>
  );
}

function Text27() {
  return (
    <div className="absolute content-stretch flex h-[19.5px] items-start left-[528px] overflow-clip top-[13.75px] w-[493px]" data-name="Text">
      <p className="flex-[1_0_0] font-['Open_Sans:Regular',sans-serif] font-normal leading-[19.5px] min-h-px min-w-px relative text-[#175cd3] text-[13px]" style={{ fontVariationSettings: "'wdth' 100" }}>
        Construction
      </p>
    </div>
  );
}

function Group9() {
  return (
    <div className="absolute inset-[0_6.67%] mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[-1.067px_0px] mask-size-[16px_16px]" data-name="Group" style={{ maskImage: `url('${imgGroup}')` }}>
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 13.8656 16">
        <g id="Group">
          <path d={svgPaths.p1c71b600} fill="var(--fill-0, #616D79)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function ClipPathGroup9() {
  return (
    <div className="absolute contents inset-0" data-name="Clip path group">
      <Group9 />
    </div>
  );
}

function Icon27() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="Icon">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid overflow-clip relative rounded-[inherit] size-full">
        <ClipPathGroup9 />
      </div>
    </div>
  );
}

function RemoveIconBtn6() {
  return (
    <div className="relative rounded-[4px] shrink-0 size-[32px]" data-name="RemoveIconBtn">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center relative size-full">
        <Icon27 />
      </div>
    </div>
  );
}

function Container60() {
  return (
    <div className="absolute content-stretch flex h-[32px] items-center justify-center left-[1037px] top-[7.5px] w-[60px]" data-name="Container">
      <RemoveIconBtn6 />
    </div>
  );
}

function Container56() {
  return (
    <div className="bg-white h-[48px] relative shrink-0 w-full" data-name="Container">
      <div aria-hidden="true" className="absolute border-[#f0f0f0] border-b border-solid inset-0 pointer-events-none" />
      <Container57 />
      <Container58 />
      <Container59 />
      <Text27 />
      <Container60 />
    </div>
  );
}

function Icon28() {
  return (
    <div className="relative shrink-0 size-[18px]" data-name="Icon">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 18 18">
        <g clipPath="url(#clip0_2176_5227)" id="Icon">
          <path d={svgPaths.p3ea42000} fill="var(--fill-0, white)" id="Vector" />
          <path d={svgPaths.p3ea42000} id="Vector_2" stroke="var(--stroke-0, #D0D5DD)" strokeWidth="1.5" />
        </g>
        <defs>
          <clipPath id="clip0_2176_5227">
            <rect fill="white" height="18" width="18" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function CheckboxIcon7() {
  return (
    <div className="relative rounded-[4px] shrink-0 size-[32px]" data-name="CheckboxIcon">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center relative size-full">
        <Icon28 />
      </div>
    </div>
  );
}

function Container62() {
  return (
    <div className="absolute content-stretch flex h-[32px] items-center justify-center left-0 top-[7.5px] w-[48px]" data-name="Container">
      <CheckboxIcon7 />
    </div>
  );
}

function Text28() {
  return (
    <div className="h-[16.5px] relative shrink-0 w-[14.031px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start relative size-full">
        <p className="font-['Open_Sans:Bold',sans-serif] font-bold leading-[16.5px] relative shrink-0 text-[#0a0a0a] text-[11px] tracking-[-0.3px] whitespace-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>{`T&`}</p>
      </div>
    </div>
  );
}

function MemberAvatar7() {
  return (
    <div className="bg-[#e3f2fd] relative rounded-[6px] shrink-0 size-[32px]" data-name="MemberAvatar">
      <div aria-hidden="true" className="absolute border border-[rgba(0,0,0,0.06)] border-solid inset-0 pointer-events-none rounded-[6px]" />
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center p-px relative size-full">
        <Text28 />
      </div>
    </div>
  );
}

function Text29() {
  return (
    <div className="h-[19.5px] relative shrink-0 w-[75.125px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start overflow-clip relative rounded-[inherit] size-full">
        <p className="font-['Open_Sans:SemiBold',sans-serif] font-semibold leading-[19.5px] relative shrink-0 text-[#1d2c38] text-[13px] whitespace-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>{`Turner & Co`}</p>
      </div>
    </div>
  );
}

function Container63() {
  return (
    <div className="absolute content-stretch flex gap-[10px] h-[32px] items-center left-[48px] top-[7.5px] w-[360px]" data-name="Container">
      <MemberAvatar7 />
      <Text29 />
    </div>
  );
}

function Icon29() {
  return (
    <div className="h-[16.5px] relative shrink-0 w-[15px]" data-name="Icon">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 15 16.5">
        <g clipPath="url(#clip0_2179_13624)" id="Icon">
          <path d={svgPaths.p1c17b000} id="Vector" stroke="var(--stroke-0, #384857)" strokeLinejoin="round" strokeWidth="1.5" />
          <path d="M0.75 15.75H14.25" id="Vector_2" stroke="var(--stroke-0, #384857)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
          <path d={svgPaths.p3ac94a00} id="Vector_3" stroke="var(--stroke-0, #384857)" strokeLinejoin="round" strokeWidth="1.5" />
          <path d={svgPaths.p108bc880} id="Vector_4" stroke="var(--stroke-0, #384857)" strokeLinecap="round" strokeWidth="1.5" />
        </g>
        <defs>
          <clipPath id="clip0_2179_13624">
            <rect fill="white" height="16.5" width="15" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function FigmaCompanyIcon() {
  return (
    <div className="bg-[#f0f2f5] relative rounded-[6px] shrink-0 size-[28px]" data-name="FigmaCompanyIcon">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center relative size-full">
        <Icon29 />
      </div>
    </div>
  );
}

function Text30() {
  return (
    <div className="flex-[1_0_0] h-[19.5px] min-h-px min-w-px relative" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start relative size-full">
        <p className="font-['Open_Sans:Regular',sans-serif] font-normal leading-[19.5px] relative shrink-0 text-[#175cd3] text-[13px] whitespace-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
          Company
        </p>
      </div>
    </div>
  );
}

function MemberTypeDisplay7() {
  return (
    <div className="h-[28px] relative shrink-0 w-[93.719px]" data-name="MemberTypeDisplay">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[8px] items-center relative size-full">
        <FigmaCompanyIcon />
        <Text30 />
      </div>
    </div>
  );
}

function Container64() {
  return (
    <div className="absolute content-stretch flex h-[28px] items-center left-[408px] top-[9.5px] w-[120px]" data-name="Container">
      <MemberTypeDisplay7 />
    </div>
  );
}

function Text31() {
  return (
    <div className="absolute content-stretch flex h-[19.5px] items-start left-[528px] overflow-clip top-[13.75px] w-[493px]" data-name="Text">
      <p className="flex-[1_0_0] font-['Open_Sans:Regular',sans-serif] font-normal leading-[19.5px] min-h-px min-w-px relative text-[#175cd3] text-[13px]" style={{ fontVariationSettings: "'wdth' 100" }}>
        General Contractor
      </p>
    </div>
  );
}

function Group10() {
  return (
    <div className="absolute inset-[0_6.67%] mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[-1.067px_0px] mask-size-[16px_16px]" data-name="Group" style={{ maskImage: `url('${imgGroup}')` }}>
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 13.8656 16">
        <g id="Group">
          <path d={svgPaths.p1c71b600} fill="var(--fill-0, #616D79)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function ClipPathGroup10() {
  return (
    <div className="absolute contents inset-0" data-name="Clip path group">
      <Group10 />
    </div>
  );
}

function Icon30() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="Icon">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid overflow-clip relative rounded-[inherit] size-full">
        <ClipPathGroup10 />
      </div>
    </div>
  );
}

function RemoveIconBtn7() {
  return (
    <div className="relative rounded-[4px] shrink-0 size-[32px]" data-name="RemoveIconBtn">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center relative size-full">
        <Icon30 />
      </div>
    </div>
  );
}

function Container65() {
  return (
    <div className="absolute content-stretch flex h-[32px] items-center justify-center left-[1037px] top-[7.5px] w-[60px]" data-name="Container">
      <RemoveIconBtn7 />
    </div>
  );
}

function Container61() {
  return (
    <div className="bg-white h-[48px] relative shrink-0 w-full" data-name="Container">
      <div aria-hidden="true" className="absolute border-[#f0f0f0] border-b border-solid inset-0 pointer-events-none" />
      <Container62 />
      <Container63 />
      <Container64 />
      <Text31 />
      <Container65 />
    </div>
  );
}

function Container5() {
  return (
    <div className="absolute bg-white content-stretch flex flex-col h-[491px] items-start left-0 overflow-clip top-[98px] w-[1097px]" data-name="Container">
      <Container6 />
      <Container15 />
      <Container24 />
      <Container33 />
      <Container42 />
      <Container51 />
      <Container56 />
      <Container61 />
    </div>
  );
}

function Text32() {
  return (
    <div className="h-[19.5px] relative shrink-0 w-[163.953px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start relative size-full">
        <p className="font-['Open_Sans:Regular',sans-serif] font-normal leading-[19.5px] relative shrink-0 text-[#616d79] text-[13px] whitespace-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
          Showing 1–8 of 8 members
        </p>
      </div>
    </div>
  );
}

function Icon31() {
  return (
    <div className="relative shrink-0 size-[14px]" data-name="Icon">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14 14">
        <g id="Icon">
          <path d={svgPaths.p6ba3d00} id="Vector" stroke="var(--stroke-0, #384857)" strokeLinecap="round" strokeWidth="1.3125" />
        </g>
      </svg>
    </div>
  );
}

function Text33() {
  return (
    <div className="flex-[1_0_0] h-[19.5px] min-h-px min-w-px relative" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[19.5px] left-0 not-italic text-[#1d2c38] text-[13px] top-0 whitespace-nowrap">1 Selected</p>
      </div>
    </div>
  );
}

function Container68() {
  return (
    <div className="flex-[1_0_0] h-[34px] min-h-px min-w-px relative" data-name="Container">
      <div aria-hidden="true" className="absolute border-[#e0e4e8] border-r border-solid inset-0 pointer-events-none" />
      <div className="flex flex-row items-center size-full">
        <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[8px] items-center pl-[16px] pr-[17px] relative size-full">
          <Icon31 />
          <Text33 />
        </div>
      </div>
    </div>
  );
}

function Icon32() {
  return (
    <div className="relative shrink-0 size-[15px]" data-name="Icon">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 15 15">
        <g clipPath="url(#clip0_2185_29719)" id="Icon">
          <path d={svgPaths.p3d276200} fill="var(--fill-0, #616D79)" id="Vector" />
        </g>
        <defs>
          <clipPath id="clip0_2185_29719">
            <rect fill="white" height="15" width="15" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Text34() {
  return (
    <div className="flex-[1_0_0] h-[19.5px] min-h-px min-w-px relative" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="-translate-x-1/2 absolute font-['Inter:Regular',sans-serif] font-normal leading-[19.5px] left-[25px] not-italic text-[#384857] text-[13px] text-center top-0 whitespace-nowrap">Remove</p>
      </div>
    </div>
  );
}

function Button1() {
  return (
    <div className="h-[34px] relative shrink-0 w-[104.328px]" data-name="Button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[8px] items-center px-[16px] relative size-full">
        <Icon32 />
        <Text34 />
      </div>
    </div>
  );
}

function Container67() {
  return (
    <div className="absolute bg-white h-[36px] left-[435.91px] rounded-[8px] top-[6.5px] w-[225.172px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start overflow-clip p-px relative rounded-[inherit] size-full">
        <Container68 />
        <Button1 />
      </div>
      <div aria-hidden="true" className="absolute border border-[#d0d5dd] border-solid inset-0 pointer-events-none rounded-[8px] shadow-[0px_2px_12px_0px_rgba(0,0,0,0.1)]" />
    </div>
  );
}

function Container66() {
  return (
    <div className="absolute bg-white content-stretch flex h-[48px] items-center justify-between left-0 pl-[16px] pr-[917.047px] pt-px top-[642px] w-[1097px]" data-name="Container">
      <div aria-hidden="true" className="absolute border-[#f0f0f0] border-solid border-t inset-0 pointer-events-none" />
      <Text32 />
      <Container67 />
    </div>
  );
}

function Icon33() {
  return (
    <div className="relative shrink-0 size-[18px]" data-name="Icon">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 18 18">
        <g clipPath="url(#clip0_2185_29707)" id="Icon">
          <path d={svgPaths.p3ea42000} fill="var(--fill-0, #0E70CB)" id="Vector" />
          <path d="M4.5 9H13.5" id="Vector_2" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeWidth="2" />
        </g>
        <defs>
          <clipPath id="clip0_2185_29707">
            <rect fill="white" height="18" width="18" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function CheckboxIcon8() {
  return (
    <div className="relative rounded-[4px] shrink-0 size-[32px]" data-name="CheckboxIcon">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center relative size-full">
        <Icon33 />
      </div>
    </div>
  );
}

function Container70() {
  return (
    <div className="absolute content-stretch flex h-[47px] items-center justify-center left-0 top-0 w-[48px]" data-name="Container">
      <CheckboxIcon8 />
    </div>
  );
}

function Container71() {
  return <div className="absolute h-[47px] left-[1037px] top-0 w-[60px]" data-name="Container" />;
}

function Text35() {
  return (
    <div className="h-[19.5px] relative shrink-0 w-[37.625px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start overflow-clip relative rounded-[inherit] size-full">
        <p className="font-['Open_Sans:SemiBold',sans-serif] font-semibold leading-[19.5px] relative shrink-0 text-[#384857] text-[13px] whitespace-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
          Name
        </p>
      </div>
    </div>
  );
}

function HeaderCell() {
  return (
    <div className="absolute bg-[#fafafa] content-stretch flex h-[47px] items-center left-[48px] overflow-clip pl-[8px] top-0 w-[360px]" data-name="HeaderCell">
      <Text35 />
    </div>
  );
}

function Text36() {
  return (
    <div className="h-[19.5px] relative shrink-0 w-[29.891px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start overflow-clip relative rounded-[inherit] size-full">
        <p className="font-['Open_Sans:SemiBold',sans-serif] font-semibold leading-[19.5px] relative shrink-0 text-[#384857] text-[13px] whitespace-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
          Type
        </p>
      </div>
    </div>
  );
}

function HeaderCell1() {
  return (
    <div className="absolute bg-[#fafafa] content-stretch flex h-[47px] items-center left-[408px] overflow-clip pl-[8px] top-0 w-[120px]" data-name="HeaderCell">
      <Text36 />
    </div>
  );
}

function Text37() {
  return (
    <div className="h-[19.5px] relative shrink-0 w-[72.094px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start overflow-clip relative rounded-[inherit] size-full">
        <p className="font-['Open_Sans:SemiBold',sans-serif] font-semibold leading-[19.5px] relative shrink-0 text-[#384857] text-[13px] whitespace-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
          Description
        </p>
      </div>
    </div>
  );
}

function HeaderCell2() {
  return (
    <div className="absolute bg-[#fafafa] content-stretch flex h-[47px] items-center left-[528px] overflow-clip pl-[8px] top-0 w-[509px]" data-name="HeaderCell">
      <Text37 />
    </div>
  );
}

function Container69() {
  return (
    <div className="absolute bg-[#fafafa] border-[#f0f0f0] border-b border-solid h-[48px] left-0 top-[50px] w-[1097px]" data-name="Container">
      <Container70 />
      <Container71 />
      <HeaderCell />
      <HeaderCell1 />
      <HeaderCell2 />
    </div>
  );
}

export default function Container() {
  return (
    <div className="bg-white border border-[#d9d9d9] border-solid overflow-clip relative rounded-[8px] size-full" data-name="Container">
      <Container1 />
      <Container5 />
      <Container66 />
      <Container69 />
    </div>
  );
}