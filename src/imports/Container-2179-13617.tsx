import svgPaths from "./svg-3bkzxkybn8";
import { imgGroup } from "./svg-izmav";

function Icon() {
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
        <Icon />
      </div>
    </div>
  );
}

function Container2() {
  return (
    <div className="content-stretch flex h-[47px] items-center justify-center relative shrink-0 w-[48px]" data-name="Container">
      <CheckboxIcon />
    </div>
  );
}

function Text() {
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
    <div className="bg-[#fafafa] content-stretch flex h-[47px] items-center overflow-clip pl-[8px] relative shrink-0 w-[282.5px]" data-name="HeaderCell">
      <Text />
    </div>
  );
}

function Text1() {
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
    <div className="bg-[#fafafa] content-stretch flex h-[47px] items-center overflow-clip pl-[8px] relative shrink-0 w-[200px]" data-name="HeaderCell">
      <Text1 />
    </div>
  );
}

function Text2() {
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
    <div className="bg-[#fafafa] flex-[1_0_0] h-[47px] min-h-px min-w-px relative" data-name="HeaderCell">
      <div className="flex flex-row items-center overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex items-center pl-[8px] relative size-full">
          <Text2 />
        </div>
      </div>
    </div>
  );
}

function Text3() {
  return <div className="shrink-0 size-0" data-name="Text" />;
}

function Frame() {
  return (
    <div className="content-stretch flex gap-[4px] items-center relative shrink-0">
      <div className="relative shrink-0 size-[11.997px]" data-name="Vector">
        <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 11.9965 11.9965">
          <path d={svgPaths.p33437200} fill="var(--fill-0, #616D79)" id="Vector" />
        </svg>
      </div>
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[21px] not-italic relative shrink-0 text-[#616d79] text-[14px] text-center whitespace-nowrap">Add Participant</p>
    </div>
  );
}

function Button() {
  return (
    <div className="bg-[#f2f3f4] h-[32px] relative rounded-[4px] shrink-0" data-name="Button">
      <div aria-hidden="true" className="absolute border border-[#c3c7cc] border-solid inset-0 pointer-events-none rounded-[4px]" />
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex h-full items-center px-[12px] py-[8px] relative">
        <Frame />
      </div>
    </div>
  );
}

function Container3() {
  return (
    <div className="bg-[#fafafa] content-stretch flex h-[47px] items-center justify-center px-[16px] relative shrink-0" data-name="Container">
      <Text3 />
      <Button />
    </div>
  );
}

function Container1() {
  return (
    <div className="bg-[#fafafa] content-stretch flex items-center relative shrink-0 w-full" data-name="Container">
      <div aria-hidden="true" className="absolute border-[#f0f0f0] border-b border-solid inset-0 pointer-events-none" />
      <Container2 />
      <HeaderCell />
      <HeaderCell1 />
      <HeaderCell2 />
      <Container3 />
    </div>
  );
}

function Icon1() {
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
        <Icon1 />
      </div>
    </div>
  );
}

function Container6() {
  return (
    <div className="absolute content-stretch flex h-[32px] items-center justify-center left-0 top-[7.5px] w-[48px]" data-name="Container">
      <CheckboxIcon1 />
    </div>
  );
}

function Text4() {
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
        <Text4 />
      </div>
    </div>
  );
}

function Text5() {
  return (
    <div className="h-[19.5px] relative shrink-0 w-[75.344px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start overflow-clip relative rounded-[inherit] size-full">
        <p className="font-['Open_Sans:Regular',sans-serif] font-normal leading-[19.5px] relative shrink-0 text-[#1d2c38] text-[13px] whitespace-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
          Captain Levi
        </p>
      </div>
    </div>
  );
}

function Container7() {
  return (
    <div className="absolute content-stretch flex gap-[10px] h-[32px] items-center left-[48px] top-[7.5px] w-[280.5px]" data-name="Container">
      <MemberAvatar />
      <Text5 />
    </div>
  );
}

function Group() {
  return (
    <div className="absolute inset-[4.05%_12.16%] mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[-2.189px_-0.73px] mask-size-[18px_18px]" data-name="Group" style={{ maskImage: `url('${imgGroup}')` }}>
      <div className="absolute inset-[-5.88%_-7.14%]">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 15.567 18.486">
          <g id="Group">
            <path d={svgPaths.p6fd1680} id="Vector" stroke="var(--stroke-0, #384857)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.94538" />
            <path d={svgPaths.p32584590} id="Vector_2" stroke="var(--stroke-0, #384857)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.94538" />
          </g>
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

function Icon2() {
  return (
    <div className="relative shrink-0 size-[18px]" data-name="Icon">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid overflow-clip relative rounded-[inherit] size-full">
        <ClipPathGroup />
      </div>
    </div>
  );
}

function Container8() {
  return (
    <div className="bg-[#f0f2f5] relative rounded-[6px] shrink-0 size-[28px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center relative size-full">
        <Icon2 />
      </div>
    </div>
  );
}

function Text6() {
  return (
    <div className="h-[19.5px] relative shrink-0 w-[51.594px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start relative size-full">
        <p className="font-['Open_Sans:Regular',sans-serif] font-normal leading-[19.5px] relative shrink-0 text-[#1d2c38] text-[13px] whitespace-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
          Member
        </p>
      </div>
    </div>
  );
}

function MemberTypeDisplay() {
  return (
    <div className="absolute content-stretch flex gap-[8px] h-[28px] items-center left-[328.5px] top-[9.5px] w-[188px]" data-name="MemberTypeDisplay">
      <Container8 />
      <Text6 />
    </div>
  );
}

function Text7() {
  return (
    <div className="absolute content-stretch flex h-[19.5px] items-start left-[528.5px] overflow-clip top-[13.75px] w-[268.5px]" data-name="Text">
      <p className="flex-[1_0_0] font-['Open_Sans:Regular',sans-serif] font-normal leading-[19.5px] min-h-px min-w-px relative text-[#616d79] text-[13px]" style={{ fontVariationSettings: "'wdth' 100" }}>
        VDC Manager
      </p>
    </div>
  );
}

function Icon3() {
  return (
    <div className="relative shrink-0 size-[15px]" data-name="Icon">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 15 15">
        <g id="Icon">
          <path d={svgPaths.p343570} id="Vector" stroke="var(--stroke-0, #616D79)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.16667" />
        </g>
      </svg>
    </div>
  );
}

function RemoveIconBtn() {
  return (
    <div className="relative rounded-[4px] shrink-0 size-[32px]" data-name="RemoveIconBtn">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center relative size-full">
        <Icon3 />
      </div>
    </div>
  );
}

function Container9() {
  return (
    <div className="absolute content-stretch flex h-[32px] items-center justify-center left-[813px] pl-px top-[7.5px] w-[60px]" data-name="Container">
      <div aria-hidden="true" className="absolute border-[#f0f0f0] border-l border-solid inset-0 pointer-events-none" />
      <RemoveIconBtn />
    </div>
  );
}

function Container5() {
  return (
    <div className="bg-white h-[48px] relative shrink-0 w-full" data-name="Container">
      <div aria-hidden="true" className="absolute border-[#f0f0f0] border-b border-solid inset-0 pointer-events-none" />
      <Container6 />
      <Container7 />
      <MemberTypeDisplay />
      <Text7 />
      <Container9 />
    </div>
  );
}

function Icon4() {
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

function CheckboxIcon2() {
  return (
    <div className="relative rounded-[4px] shrink-0 size-[32px]" data-name="CheckboxIcon">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center relative size-full">
        <Icon4 />
      </div>
    </div>
  );
}

function Container11() {
  return (
    <div className="absolute content-stretch flex h-[32px] items-center justify-center left-0 top-[7.5px] w-[48px]" data-name="Container">
      <CheckboxIcon2 />
    </div>
  );
}

function Text8() {
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
        <Text8 />
      </div>
    </div>
  );
}

function Text9() {
  return (
    <div className="h-[19.5px] relative shrink-0 w-[90.5px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start overflow-clip relative rounded-[inherit] size-full">
        <p className="font-['Open_Sans:Regular',sans-serif] font-normal leading-[19.5px] relative shrink-0 text-[#1d2c38] text-[13px] whitespace-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
          Aaron Fletcher
        </p>
      </div>
    </div>
  );
}

function Container12() {
  return (
    <div className="absolute content-stretch flex gap-[10px] h-[32px] items-center left-[48px] top-[7.5px] w-[280.5px]" data-name="Container">
      <MemberAvatar1 />
      <Text9 />
    </div>
  );
}

function Group1() {
  return (
    <div className="absolute inset-[4.05%_12.16%] mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[-2.189px_-0.73px] mask-size-[18px_18px]" data-name="Group" style={{ maskImage: `url('${imgGroup}')` }}>
      <div className="absolute inset-[-5.88%_-7.14%]">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 15.567 18.486">
          <g id="Group">
            <path d={svgPaths.p6fd1680} id="Vector" stroke="var(--stroke-0, #384857)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.94538" />
            <path d={svgPaths.p32584590} id="Vector_2" stroke="var(--stroke-0, #384857)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.94538" />
          </g>
        </svg>
      </div>
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
    <div className="relative shrink-0 size-[18px]" data-name="Icon">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid overflow-clip relative rounded-[inherit] size-full">
        <ClipPathGroup1 />
      </div>
    </div>
  );
}

function Container13() {
  return (
    <div className="bg-[#f0f2f5] relative rounded-[6px] shrink-0 size-[28px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center relative size-full">
        <Icon5 />
      </div>
    </div>
  );
}

function Text10() {
  return (
    <div className="h-[19.5px] relative shrink-0 w-[51.594px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start relative size-full">
        <p className="font-['Open_Sans:Regular',sans-serif] font-normal leading-[19.5px] relative shrink-0 text-[#1d2c38] text-[13px] whitespace-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
          Member
        </p>
      </div>
    </div>
  );
}

function MemberTypeDisplay1() {
  return (
    <div className="absolute content-stretch flex gap-[8px] h-[28px] items-center left-[328.5px] top-[9.5px] w-[188px]" data-name="MemberTypeDisplay">
      <Container13 />
      <Text10 />
    </div>
  );
}

function Text11() {
  return (
    <div className="absolute content-stretch flex h-[19.5px] items-start left-[528.5px] overflow-clip top-[13.75px] w-[268.5px]" data-name="Text">
      <p className="flex-[1_0_0] font-['Open_Sans:Regular',sans-serif] font-normal leading-[19.5px] min-h-px min-w-px relative text-[#616d79] text-[13px]" style={{ fontVariationSettings: "'wdth' 100" }}>
        Construction Manager
      </p>
    </div>
  );
}

function Icon6() {
  return (
    <div className="relative shrink-0 size-[15px]" data-name="Icon">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 15 15">
        <g id="Icon">
          <path d={svgPaths.p343570} id="Vector" stroke="var(--stroke-0, #616D79)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.16667" />
        </g>
      </svg>
    </div>
  );
}

function RemoveIconBtn1() {
  return (
    <div className="relative rounded-[4px] shrink-0 size-[32px]" data-name="RemoveIconBtn">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center relative size-full">
        <Icon6 />
      </div>
    </div>
  );
}

function Container14() {
  return (
    <div className="absolute content-stretch flex h-[32px] items-center justify-center left-[813px] pl-px top-[7.5px] w-[60px]" data-name="Container">
      <div aria-hidden="true" className="absolute border-[#f0f0f0] border-l border-solid inset-0 pointer-events-none" />
      <RemoveIconBtn1 />
    </div>
  );
}

function Container10() {
  return (
    <div className="bg-white h-[48px] relative shrink-0 w-full" data-name="Container">
      <div aria-hidden="true" className="absolute border-[#f0f0f0] border-b border-solid inset-0 pointer-events-none" />
      <Container11 />
      <Container12 />
      <MemberTypeDisplay1 />
      <Text11 />
      <Container14 />
    </div>
  );
}

function Icon7() {
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
        <Icon7 />
      </div>
    </div>
  );
}

function Container16() {
  return (
    <div className="absolute content-stretch flex h-[32px] items-center justify-center left-0 top-[7.5px] w-[48px]" data-name="Container">
      <CheckboxIcon3 />
    </div>
  );
}

function Text12() {
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
        <Text12 />
      </div>
    </div>
  );
}

function Text13() {
  return (
    <div className="h-[19.5px] relative shrink-0 w-[89.141px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start overflow-clip relative rounded-[inherit] size-full">
        <p className="font-['Open_Sans:Regular',sans-serif] font-normal leading-[19.5px] relative shrink-0 text-[#1d2c38] text-[13px] whitespace-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
          Brianna Walsh
        </p>
      </div>
    </div>
  );
}

function Container17() {
  return (
    <div className="absolute content-stretch flex gap-[10px] h-[32px] items-center left-[48px] top-[7.5px] w-[280.5px]" data-name="Container">
      <MemberAvatar2 />
      <Text13 />
    </div>
  );
}

function Group2() {
  return (
    <div className="absolute inset-[4.05%_12.16%] mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[-2.189px_-0.73px] mask-size-[18px_18px]" data-name="Group" style={{ maskImage: `url('${imgGroup}')` }}>
      <div className="absolute inset-[-5.88%_-7.14%]">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 15.567 18.486">
          <g id="Group">
            <path d={svgPaths.p6fd1680} id="Vector" stroke="var(--stroke-0, #384857)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.94538" />
            <path d={svgPaths.p32584590} id="Vector_2" stroke="var(--stroke-0, #384857)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.94538" />
          </g>
        </svg>
      </div>
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

function Icon8() {
  return (
    <div className="relative shrink-0 size-[18px]" data-name="Icon">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid overflow-clip relative rounded-[inherit] size-full">
        <ClipPathGroup2 />
      </div>
    </div>
  );
}

function Container18() {
  return (
    <div className="bg-[#f0f2f5] relative rounded-[6px] shrink-0 size-[28px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center relative size-full">
        <Icon8 />
      </div>
    </div>
  );
}

function Text14() {
  return (
    <div className="h-[19.5px] relative shrink-0 w-[51.594px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start relative size-full">
        <p className="font-['Open_Sans:Regular',sans-serif] font-normal leading-[19.5px] relative shrink-0 text-[#1d2c38] text-[13px] whitespace-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
          Member
        </p>
      </div>
    </div>
  );
}

function MemberTypeDisplay2() {
  return (
    <div className="absolute content-stretch flex gap-[8px] h-[28px] items-center left-[328.5px] top-[9.5px] w-[188px]" data-name="MemberTypeDisplay">
      <Container18 />
      <Text14 />
    </div>
  );
}

function Text15() {
  return (
    <div className="absolute content-stretch flex h-[19.5px] items-start left-[528.5px] overflow-clip top-[13.75px] w-[268.5px]" data-name="Text">
      <p className="flex-[1_0_0] font-['Open_Sans:Regular',sans-serif] font-normal leading-[19.5px] min-h-px min-w-px relative text-[#616d79] text-[13px]" style={{ fontVariationSettings: "'wdth' 100" }}>
        Construction Manager
      </p>
    </div>
  );
}

function Icon9() {
  return (
    <div className="relative shrink-0 size-[15px]" data-name="Icon">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 15 15">
        <g id="Icon">
          <path d={svgPaths.p343570} id="Vector" stroke="var(--stroke-0, #616D79)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.16667" />
        </g>
      </svg>
    </div>
  );
}

function RemoveIconBtn2() {
  return (
    <div className="relative rounded-[4px] shrink-0 size-[32px]" data-name="RemoveIconBtn">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center relative size-full">
        <Icon9 />
      </div>
    </div>
  );
}

function Container19() {
  return (
    <div className="absolute content-stretch flex h-[32px] items-center justify-center left-[813px] pl-px top-[7.5px] w-[60px]" data-name="Container">
      <div aria-hidden="true" className="absolute border-[#f0f0f0] border-l border-solid inset-0 pointer-events-none" />
      <RemoveIconBtn2 />
    </div>
  );
}

function Container15() {
  return (
    <div className="bg-white h-[48px] relative shrink-0 w-full" data-name="Container">
      <div aria-hidden="true" className="absolute border-[#f0f0f0] border-b border-solid inset-0 pointer-events-none" />
      <Container16 />
      <Container17 />
      <MemberTypeDisplay2 />
      <Text15 />
      <Container19 />
    </div>
  );
}

function Icon10() {
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
        <Icon10 />
      </div>
    </div>
  );
}

function Container21() {
  return (
    <div className="absolute content-stretch flex h-[32px] items-center justify-center left-0 top-[7.5px] w-[48px]" data-name="Container">
      <CheckboxIcon4 />
    </div>
  );
}

function Text16() {
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
        <Text16 />
      </div>
    </div>
  );
}

function Text17() {
  return (
    <div className="h-[19.5px] relative shrink-0 w-[99.594px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start overflow-clip relative rounded-[inherit] size-full">
        <p className="font-['Open_Sans:Regular',sans-serif] font-normal leading-[19.5px] relative shrink-0 text-[#1d2c38] text-[13px] whitespace-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
          Ulrich Baumann
        </p>
      </div>
    </div>
  );
}

function Container22() {
  return (
    <div className="absolute content-stretch flex gap-[10px] h-[32px] items-center left-[48px] top-[7.5px] w-[280.5px]" data-name="Container">
      <MemberAvatar3 />
      <Text17 />
    </div>
  );
}

function Group3() {
  return (
    <div className="absolute inset-[4.05%_12.16%] mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[-2.189px_-0.73px] mask-size-[18px_18px]" data-name="Group" style={{ maskImage: `url('${imgGroup}')` }}>
      <div className="absolute inset-[-5.88%_-7.14%]">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 15.567 18.486">
          <g id="Group">
            <path d={svgPaths.p6fd1680} id="Vector" stroke="var(--stroke-0, #384857)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.94538" />
            <path d={svgPaths.p32584590} id="Vector_2" stroke="var(--stroke-0, #384857)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.94538" />
          </g>
        </svg>
      </div>
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

function Icon11() {
  return (
    <div className="relative shrink-0 size-[18px]" data-name="Icon">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid overflow-clip relative rounded-[inherit] size-full">
        <ClipPathGroup3 />
      </div>
    </div>
  );
}

function Container23() {
  return (
    <div className="bg-[#f0f2f5] relative rounded-[6px] shrink-0 size-[28px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center relative size-full">
        <Icon11 />
      </div>
    </div>
  );
}

function Text18() {
  return (
    <div className="h-[19.5px] relative shrink-0 w-[51.594px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start relative size-full">
        <p className="font-['Open_Sans:Regular',sans-serif] font-normal leading-[19.5px] relative shrink-0 text-[#1d2c38] text-[13px] whitespace-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
          Member
        </p>
      </div>
    </div>
  );
}

function MemberTypeDisplay3() {
  return (
    <div className="absolute content-stretch flex gap-[8px] h-[28px] items-center left-[328.5px] top-[9.5px] w-[188px]" data-name="MemberTypeDisplay">
      <Container23 />
      <Text18 />
    </div>
  );
}

function Text19() {
  return (
    <div className="absolute content-stretch flex h-[19.5px] items-start left-[528.5px] overflow-clip top-[13.75px] w-[268.5px]" data-name="Text">
      <p className="flex-[1_0_0] font-['Open_Sans:Regular',sans-serif] font-normal leading-[19.5px] min-h-px min-w-px relative text-[#616d79] text-[13px]" style={{ fontVariationSettings: "'wdth' 100" }}>
        Site Manager
      </p>
    </div>
  );
}

function Icon12() {
  return (
    <div className="relative shrink-0 size-[15px]" data-name="Icon">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 15 15">
        <g id="Icon">
          <path d={svgPaths.p343570} id="Vector" stroke="var(--stroke-0, #616D79)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.16667" />
        </g>
      </svg>
    </div>
  );
}

function RemoveIconBtn3() {
  return (
    <div className="relative rounded-[4px] shrink-0 size-[32px]" data-name="RemoveIconBtn">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center relative size-full">
        <Icon12 />
      </div>
    </div>
  );
}

function Container24() {
  return (
    <div className="absolute content-stretch flex h-[32px] items-center justify-center left-[813px] pl-px top-[7.5px] w-[60px]" data-name="Container">
      <div aria-hidden="true" className="absolute border-[#f0f0f0] border-l border-solid inset-0 pointer-events-none" />
      <RemoveIconBtn3 />
    </div>
  );
}

function Container20() {
  return (
    <div className="bg-white h-[48px] relative shrink-0 w-full" data-name="Container">
      <div aria-hidden="true" className="absolute border-[#f0f0f0] border-b border-solid inset-0 pointer-events-none" />
      <Container21 />
      <Container22 />
      <MemberTypeDisplay3 />
      <Text19 />
      <Container24 />
    </div>
  );
}

function Icon13() {
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
        <Icon13 />
      </div>
    </div>
  );
}

function Container26() {
  return (
    <div className="absolute content-stretch flex h-[32px] items-center justify-center left-0 top-[7.5px] w-[48px]" data-name="Container">
      <CheckboxIcon5 />
    </div>
  );
}

function Text20() {
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
        <Text20 />
      </div>
    </div>
  );
}

function Text21() {
  return (
    <div className="h-[19.5px] relative shrink-0 w-[104.328px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start overflow-clip relative rounded-[inherit] size-full">
        <p className="font-['Open_Sans:Regular',sans-serif] font-normal leading-[19.5px] relative shrink-0 text-[#1d2c38] text-[13px] whitespace-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
          Eduardo Ferreira
        </p>
      </div>
    </div>
  );
}

function Container27() {
  return (
    <div className="absolute content-stretch flex gap-[10px] h-[32px] items-center left-[48px] top-[7.5px] w-[280.5px]" data-name="Container">
      <MemberAvatar4 />
      <Text21 />
    </div>
  );
}

function Group4() {
  return (
    <div className="absolute inset-[4.05%_12.16%] mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[-2.189px_-0.73px] mask-size-[18px_18px]" data-name="Group" style={{ maskImage: `url('${imgGroup}')` }}>
      <div className="absolute inset-[-5.88%_-7.14%]">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 15.567 18.486">
          <g id="Group">
            <path d={svgPaths.p6fd1680} id="Vector" stroke="var(--stroke-0, #384857)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.94538" />
            <path d={svgPaths.p32584590} id="Vector_2" stroke="var(--stroke-0, #384857)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.94538" />
          </g>
        </svg>
      </div>
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

function Icon14() {
  return (
    <div className="relative shrink-0 size-[18px]" data-name="Icon">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid overflow-clip relative rounded-[inherit] size-full">
        <ClipPathGroup4 />
      </div>
    </div>
  );
}

function Container28() {
  return (
    <div className="bg-[#f0f2f5] relative rounded-[6px] shrink-0 size-[28px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center relative size-full">
        <Icon14 />
      </div>
    </div>
  );
}

function Text22() {
  return (
    <div className="h-[19.5px] relative shrink-0 w-[51.594px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start relative size-full">
        <p className="font-['Open_Sans:Regular',sans-serif] font-normal leading-[19.5px] relative shrink-0 text-[#1d2c38] text-[13px] whitespace-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
          Member
        </p>
      </div>
    </div>
  );
}

function MemberTypeDisplay4() {
  return (
    <div className="absolute content-stretch flex gap-[8px] h-[28px] items-center left-[328.5px] top-[9.5px] w-[188px]" data-name="MemberTypeDisplay">
      <Container28 />
      <Text22 />
    </div>
  );
}

function Text23() {
  return (
    <div className="absolute content-stretch flex h-[19.5px] items-start left-[528.5px] overflow-clip top-[13.75px] w-[268.5px]" data-name="Text">
      <p className="flex-[1_0_0] font-['Open_Sans:Regular',sans-serif] font-normal leading-[19.5px] min-h-px min-w-px relative text-[#616d79] text-[13px]" style={{ fontVariationSettings: "'wdth' 100" }}>
        Superintendent
      </p>
    </div>
  );
}

function Icon15() {
  return (
    <div className="relative shrink-0 size-[15px]" data-name="Icon">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 15 15">
        <g id="Icon">
          <path d={svgPaths.p343570} id="Vector" stroke="var(--stroke-0, #616D79)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.16667" />
        </g>
      </svg>
    </div>
  );
}

function RemoveIconBtn4() {
  return (
    <div className="relative rounded-[4px] shrink-0 size-[32px]" data-name="RemoveIconBtn">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center relative size-full">
        <Icon15 />
      </div>
    </div>
  );
}

function Container29() {
  return (
    <div className="absolute content-stretch flex h-[32px] items-center justify-center left-[813px] pl-px top-[7.5px] w-[60px]" data-name="Container">
      <div aria-hidden="true" className="absolute border-[#f0f0f0] border-l border-solid inset-0 pointer-events-none" />
      <RemoveIconBtn4 />
    </div>
  );
}

function Container25() {
  return (
    <div className="bg-white h-[48px] relative shrink-0 w-full" data-name="Container">
      <div aria-hidden="true" className="absolute border-[#f0f0f0] border-b border-solid inset-0 pointer-events-none" />
      <Container26 />
      <Container27 />
      <MemberTypeDisplay4 />
      <Text23 />
      <Container29 />
    </div>
  );
}

function Icon16() {
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
        <Icon16 />
      </div>
    </div>
  );
}

function Container31() {
  return (
    <div className="absolute content-stretch flex h-[32px] items-center justify-center left-0 top-[7.5px] w-[48px]" data-name="Container">
      <CheckboxIcon6 />
    </div>
  );
}

function Text24() {
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
        <Text24 />
      </div>
    </div>
  );
}

function Text25() {
  return (
    <div className="h-[19.5px] relative shrink-0 w-[137.703px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start overflow-clip relative rounded-[inherit] size-full">
        <p className="font-['Open_Sans:Regular',sans-serif] font-normal leading-[19.5px] relative shrink-0 text-[#1d2c38] text-[13px] whitespace-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
          Construction Manager
        </p>
      </div>
    </div>
  );
}

function Container32() {
  return (
    <div className="absolute content-stretch flex gap-[10px] h-[32px] items-center left-[48px] top-[7.5px] w-[280.5px]" data-name="Container">
      <MemberAvatar5 />
      <Text25 />
    </div>
  );
}

function Group5() {
  return (
    <div className="absolute inset-[7.86%_3.72%] mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[-0.669px_-1.414px] mask-size-[18px_18px]" data-name="Group" style={{ maskImage: `url('${imgGroup}')` }}>
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

function ClipPathGroup5() {
  return (
    <div className="absolute contents inset-0" data-name="Clip path group">
      <Group5 />
    </div>
  );
}

function Icon17() {
  return (
    <div className="relative shrink-0 size-[18px]" data-name="Icon">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid overflow-clip relative rounded-[inherit] size-full">
        <ClipPathGroup5 />
      </div>
    </div>
  );
}

function Container33() {
  return (
    <div className="bg-[#f0f2f5] relative rounded-[6px] shrink-0 size-[28px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center relative size-full">
        <Icon17 />
      </div>
    </div>
  );
}

function Text26() {
  return (
    <div className="h-[19.5px] relative shrink-0 w-[26.438px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start relative size-full">
        <p className="font-['Open_Sans:Regular',sans-serif] font-normal leading-[19.5px] relative shrink-0 text-[#1d2c38] text-[13px] whitespace-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
          Role
        </p>
      </div>
    </div>
  );
}

function MemberTypeDisplay5() {
  return (
    <div className="absolute content-stretch flex gap-[8px] h-[28px] items-center left-[328.5px] top-[9.5px] w-[188px]" data-name="MemberTypeDisplay">
      <Container33 />
      <Text26 />
    </div>
  );
}

function Text27() {
  return (
    <div className="absolute content-stretch flex h-[19.5px] items-start left-[528.5px] overflow-clip top-[13.75px] w-[268.5px]" data-name="Text">
      <p className="flex-[1_0_0] font-['Open_Sans:Regular',sans-serif] font-normal leading-[19.5px] min-h-px min-w-px relative text-[#616d79] text-[13px]" style={{ fontVariationSettings: "'wdth' 100" }}>
        Construction
      </p>
    </div>
  );
}

function Icon18() {
  return (
    <div className="relative shrink-0 size-[15px]" data-name="Icon">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 15 15">
        <g id="Icon">
          <path d={svgPaths.p343570} id="Vector" stroke="var(--stroke-0, #616D79)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.16667" />
        </g>
      </svg>
    </div>
  );
}

function RemoveIconBtn5() {
  return (
    <div className="relative rounded-[4px] shrink-0 size-[32px]" data-name="RemoveIconBtn">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center relative size-full">
        <Icon18 />
      </div>
    </div>
  );
}

function Container34() {
  return (
    <div className="absolute content-stretch flex h-[32px] items-center justify-center left-[813px] pl-px top-[7.5px] w-[60px]" data-name="Container">
      <div aria-hidden="true" className="absolute border-[#f0f0f0] border-l border-solid inset-0 pointer-events-none" />
      <RemoveIconBtn5 />
    </div>
  );
}

function Container30() {
  return (
    <div className="bg-white h-[48px] relative shrink-0 w-full" data-name="Container">
      <div aria-hidden="true" className="absolute border-[#f0f0f0] border-b border-solid inset-0 pointer-events-none" />
      <Container31 />
      <Container32 />
      <MemberTypeDisplay5 />
      <Text27 />
      <Container34 />
    </div>
  );
}

function Icon19() {
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
        <Icon19 />
      </div>
    </div>
  );
}

function Container36() {
  return (
    <div className="absolute content-stretch flex h-[32px] items-center justify-center left-0 top-[7.5px] w-[48px]" data-name="Container">
      <CheckboxIcon7 />
    </div>
  );
}

function Text28() {
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
        <Text28 />
      </div>
    </div>
  );
}

function Text29() {
  return (
    <div className="h-[19.5px] relative shrink-0 w-[80.953px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start overflow-clip relative rounded-[inherit] size-full">
        <p className="font-['Open_Sans:Regular',sans-serif] font-normal leading-[19.5px] relative shrink-0 text-[#1d2c38] text-[13px] whitespace-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
          Site Manager
        </p>
      </div>
    </div>
  );
}

function Container37() {
  return (
    <div className="absolute content-stretch flex gap-[10px] h-[32px] items-center left-[48px] top-[7.5px] w-[280.5px]" data-name="Container">
      <MemberAvatar6 />
      <Text29 />
    </div>
  );
}

function Group6() {
  return (
    <div className="absolute inset-[7.86%_3.72%] mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[-0.669px_-1.414px] mask-size-[18px_18px]" data-name="Group" style={{ maskImage: `url('${imgGroup}')` }}>
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

function Icon20() {
  return (
    <div className="relative shrink-0 size-[18px]" data-name="Icon">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid overflow-clip relative rounded-[inherit] size-full">
        <ClipPathGroup6 />
      </div>
    </div>
  );
}

function Container38() {
  return (
    <div className="bg-[#f0f2f5] relative rounded-[6px] shrink-0 size-[28px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center relative size-full">
        <Icon20 />
      </div>
    </div>
  );
}

function Text30() {
  return (
    <div className="h-[19.5px] relative shrink-0 w-[26.438px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start relative size-full">
        <p className="font-['Open_Sans:Regular',sans-serif] font-normal leading-[19.5px] relative shrink-0 text-[#1d2c38] text-[13px] whitespace-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
          Role
        </p>
      </div>
    </div>
  );
}

function MemberTypeDisplay6() {
  return (
    <div className="absolute content-stretch flex gap-[8px] h-[28px] items-center left-[328.5px] top-[9.5px] w-[188px]" data-name="MemberTypeDisplay">
      <Container38 />
      <Text30 />
    </div>
  );
}

function Text31() {
  return (
    <div className="absolute content-stretch flex h-[19.5px] items-start left-[528.5px] overflow-clip top-[13.75px] w-[268.5px]" data-name="Text">
      <p className="flex-[1_0_0] font-['Open_Sans:Regular',sans-serif] font-normal leading-[19.5px] min-h-px min-w-px relative text-[#616d79] text-[13px]" style={{ fontVariationSettings: "'wdth' 100" }}>
        Construction
      </p>
    </div>
  );
}

function Icon21() {
  return (
    <div className="relative shrink-0 size-[15px]" data-name="Icon">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 15 15">
        <g id="Icon">
          <path d={svgPaths.p343570} id="Vector" stroke="var(--stroke-0, #616D79)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.16667" />
        </g>
      </svg>
    </div>
  );
}

function RemoveIconBtn6() {
  return (
    <div className="relative rounded-[4px] shrink-0 size-[32px]" data-name="RemoveIconBtn">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center relative size-full">
        <Icon21 />
      </div>
    </div>
  );
}

function Container39() {
  return (
    <div className="absolute content-stretch flex h-[32px] items-center justify-center left-[813px] pl-px top-[7.5px] w-[60px]" data-name="Container">
      <div aria-hidden="true" className="absolute border-[#f0f0f0] border-l border-solid inset-0 pointer-events-none" />
      <RemoveIconBtn6 />
    </div>
  );
}

function Container35() {
  return (
    <div className="bg-white h-[48px] relative shrink-0 w-full" data-name="Container">
      <div aria-hidden="true" className="absolute border-[#f0f0f0] border-b border-solid inset-0 pointer-events-none" />
      <Container36 />
      <Container37 />
      <MemberTypeDisplay6 />
      <Text31 />
      <Container39 />
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

function CheckboxIcon8() {
  return (
    <div className="relative rounded-[4px] shrink-0 size-[32px]" data-name="CheckboxIcon">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center relative size-full">
        <Icon22 />
      </div>
    </div>
  );
}

function Container41() {
  return (
    <div className="absolute content-stretch flex h-[32px] items-center justify-center left-0 top-[7.5px] w-[48px]" data-name="Container">
      <CheckboxIcon8 />
    </div>
  );
}

function Text32() {
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
        <Text32 />
      </div>
    </div>
  );
}

function Text33() {
  return (
    <div className="h-[19.5px] relative shrink-0 w-[74.203px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start overflow-clip relative rounded-[inherit] size-full">
        <p className="font-['Open_Sans:Regular',sans-serif] font-normal leading-[19.5px] relative shrink-0 text-[#1d2c38] text-[13px] whitespace-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>{`Turner & Co`}</p>
      </div>
    </div>
  );
}

function Container42() {
  return (
    <div className="absolute content-stretch flex gap-[10px] h-[32px] items-center left-[48px] top-[7.5px] w-[280.5px]" data-name="Container">
      <MemberAvatar7 />
      <Text33 />
    </div>
  );
}

function Icon23() {
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

function Container43() {
  return (
    <div className="bg-[#f0f2f5] relative rounded-[6px] shrink-0 size-[28px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center relative size-full">
        <Icon23 />
      </div>
    </div>
  );
}

function Text34() {
  return (
    <div className="h-[19.5px] relative shrink-0 w-[57.719px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start relative size-full">
        <p className="font-['Open_Sans:Regular',sans-serif] font-normal leading-[19.5px] relative shrink-0 text-[#1d2c38] text-[13px] whitespace-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
          Company
        </p>
      </div>
    </div>
  );
}

function MemberTypeDisplay7() {
  return (
    <div className="absolute content-stretch flex gap-[8px] h-[28px] items-center left-[328.5px] top-[9.5px] w-[188px]" data-name="MemberTypeDisplay">
      <Container43 />
      <Text34 />
    </div>
  );
}

function Text35() {
  return (
    <div className="absolute content-stretch flex h-[19.5px] items-start left-[528.5px] overflow-clip top-[13.75px] w-[268.5px]" data-name="Text">
      <p className="flex-[1_0_0] font-['Open_Sans:Regular',sans-serif] font-normal leading-[19.5px] min-h-px min-w-px relative text-[#616d79] text-[13px]" style={{ fontVariationSettings: "'wdth' 100" }}>
        General Contractor
      </p>
    </div>
  );
}

function Icon24() {
  return (
    <div className="relative shrink-0 size-[15px]" data-name="Icon">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 15 15">
        <g id="Icon">
          <path d={svgPaths.p343570} id="Vector" stroke="var(--stroke-0, #616D79)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.16667" />
        </g>
      </svg>
    </div>
  );
}

function RemoveIconBtn7() {
  return (
    <div className="relative rounded-[4px] shrink-0 size-[32px]" data-name="RemoveIconBtn">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center relative size-full">
        <Icon24 />
      </div>
    </div>
  );
}

function Container44() {
  return (
    <div className="absolute content-stretch flex h-[32px] items-center justify-center left-[813px] pl-px top-[7.5px] w-[60px]" data-name="Container">
      <div aria-hidden="true" className="absolute border-[#f0f0f0] border-l border-solid inset-0 pointer-events-none" />
      <RemoveIconBtn7 />
    </div>
  );
}

function Container40() {
  return (
    <div className="bg-white h-[48px] relative shrink-0 w-full" data-name="Container">
      <div aria-hidden="true" className="absolute border-[#f0f0f0] border-b border-solid inset-0 pointer-events-none" />
      <Container41 />
      <Container42 />
      <MemberTypeDisplay7 />
      <Text35 />
      <Container44 />
    </div>
  );
}

function Container4() {
  return (
    <div className="bg-white content-stretch flex flex-col h-[586px] items-start overflow-clip relative shrink-0 w-[873px]" data-name="Container">
      <Container5 />
      <Container10 />
      <Container15 />
      <Container20 />
      <Container25 />
      <Container30 />
      <Container35 />
      <Container40 />
    </div>
  );
}

function Text36() {
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

function Container45() {
  return (
    <div className="bg-white content-stretch flex h-[48px] items-center justify-between pl-[16px] pr-[693.047px] pt-px relative shrink-0 w-[873px]" data-name="Container">
      <div aria-hidden="true" className="absolute border-[#f0f0f0] border-solid border-t inset-0 pointer-events-none" />
      <Text36 />
    </div>
  );
}

export default function Container() {
  return (
    <div className="bg-white relative rounded-[8px] size-full" data-name="Container">
      <div className="content-stretch flex flex-col gap-px items-start overflow-clip p-px relative rounded-[inherit] size-full">
        <Container1 />
        <Container4 />
        <Container45 />
      </div>
      <div aria-hidden="true" className="absolute border border-[#d9d9d9] border-solid inset-0 pointer-events-none rounded-[8px]" />
    </div>
  );
}