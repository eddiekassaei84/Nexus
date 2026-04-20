import svgPaths from "./svg-5rqqi95j6n";

function Span() {
  return (
    <div className="h-[20px] opacity-70 relative shrink-0 w-[38.837px]" data-name="span">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[20px] left-0 not-italic text-[#262626] text-[14px] top-[0.11px] whitespace-nowrap">Table Density</p>
      </div>
    </div>
  );
}

function Container1() {
  return (
    <div className="content-stretch flex h-[48px] items-center relative shrink-0 w-[90px]" data-name="Container">
      <Span />
    </div>
  );
}

function OuiTableDensityCompact() {
  return (
    <div className="absolute inset-[5.56%]" data-name="oui:table-density-compact">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 17.7778 17.7778">
        <g clipPath="url(#clip0_2045_3065)" id="oui:table-density-compact">
          <path d={svgPaths.p17ad780} fill="var(--fill-0, #616D79)" id="Vector" />
        </g>
        <defs>
          <clipPath id="clip0_2045_3065">
            <rect fill="white" height="17.7778" width="17.7778" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Component24PxAppDownload() {
  return (
    <div className="overflow-clip relative shrink-0 size-[20px]" data-name="24px/app/download">
      <OuiTableDensityCompact />
    </div>
  );
}

function Compact() {
  return (
    <div className="content-stretch flex h-[36px] items-center justify-center overflow-clip px-[8px] relative rounded-[4px] shrink-0" data-name="Compact">
      <Component24PxAppDownload />
    </div>
  );
}

function TertiaryDefault() {
  return (
    <div className="col-1 content-stretch flex flex-col h-[36px] items-center justify-center ml-0 mt-0 relative rounded-[4px] row-1" data-name="Tertiary Default">
      <Compact />
    </div>
  );
}

function OuiTableDensityNormal() {
  return (
    <div className="absolute inset-[10%]" data-name="oui:table-density-normal">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g clipPath="url(#clip0_2045_3056)" id="oui:table-density-normal">
          <path d={svgPaths.p236d9300} fill="var(--fill-0, #616D79)" id="Vector" />
        </g>
        <defs>
          <clipPath id="clip0_2045_3056">
            <rect fill="white" height="16" width="16" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Component24PxAppDownload1() {
  return (
    <div className="overflow-clip relative shrink-0 size-[20px]" data-name="24px/app/download">
      <OuiTableDensityNormal />
    </div>
  );
}

function Normal() {
  return (
    <div className="content-stretch flex h-[36px] items-center justify-center overflow-clip px-[8px] relative rounded-[4px] shrink-0" data-name="Normal">
      <Component24PxAppDownload1 />
    </div>
  );
}

function TertiaryDefault1() {
  return (
    <div className="col-1 content-stretch flex flex-col h-[36px] items-center justify-center ml-[44px] mt-0 relative rounded-[4px] row-1" data-name="Tertiary Default">
      <Normal />
    </div>
  );
}

function OuiTableDensityExpanded() {
  return (
    <div className="absolute inset-[10%]" data-name="oui:table-density-expanded">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g clipPath="url(#clip0_2045_3075)" id="oui:table-density-expanded">
          <path d={svgPaths.pae62400} fill="var(--fill-0, #616D79)" id="Vector" />
        </g>
        <defs>
          <clipPath id="clip0_2045_3075">
            <rect fill="white" height="16" width="16" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Component24PxAppDownload2() {
  return (
    <div className="overflow-clip relative shrink-0 size-[20px]" data-name="24px/app/download">
      <OuiTableDensityExpanded />
    </div>
  );
}

function Expanded() {
  return (
    <div className="content-stretch flex h-[36px] items-center justify-center overflow-clip px-[8px] relative rounded-[4px] shrink-0" data-name="Expanded">
      <Component24PxAppDownload2 />
    </div>
  );
}

function TertiaryDefault2() {
  return (
    <div className="col-1 content-stretch flex flex-col h-[36px] items-center justify-center ml-[88px] mt-0 relative rounded-[4px] row-1" data-name="Tertiary Default">
      <Expanded />
    </div>
  );
}

function Group() {
  return (
    <div className="grid-cols-[max-content] grid-rows-[max-content] inline-grid leading-[0] place-items-start relative shrink-0">
      <TertiaryDefault />
      <TertiaryDefault1 />
      <TertiaryDefault2 />
    </div>
  );
}

function Container() {
  return (
    <div className="bg-white relative shrink-0 w-full" data-name="Container">
      <div aria-hidden="true" className="absolute border-[#f3f4f6] border-b-[1.111px] border-solid inset-0 pointer-events-none" />
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex items-center justify-between px-[17px] relative w-full">
          <Container1 />
          <Group />
        </div>
      </div>
    </div>
  );
}

function Svg() {
  return (
    <div className="h-[13.351px] overflow-clip relative shrink-0 w-full" data-name="svg">
      <div className="absolute inset-[0_68.75%_0_0]" data-name="Vector">
        <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2.22436 13.3507">
          <path d={svgPaths.p22bfc900} fill="var(--fill-0, #616D79)" id="Vector" />
        </svg>
      </div>
      <div className="absolute inset-[0_0_0_68.75%]" data-name="Vector">
        <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2.22434 13.3507">
          <path d={svgPaths.p1d356580} fill="var(--fill-0, #616D79)" id="Vector" />
        </svg>
      </div>
    </div>
  );
}

function Container5() {
  return (
    <div className="absolute content-stretch flex flex-col h-[13.351px] items-start left-[10.64px] top-[16.75px] w-[7.118px]" data-name="Container">
      <Svg />
    </div>
  );
}

function Container4() {
  return (
    <div className="absolute h-[46.875px] left-0 top-0 w-[25.972px]" data-name="Container">
      <Container5 />
    </div>
  );
}

function Svg1() {
  return (
    <div className="relative shrink-0 size-[17.986px]" data-name="svg">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 17.9861 17.9861">
        <g clipPath="url(#clip0_2045_3059)" id="svg">
          <path d={svgPaths.p154304c0} fill="var(--fill-0, #D1D5DB)" id="Vector" />
        </g>
        <defs>
          <clipPath id="clip0_2045_3059">
            <rect fill="white" height="17.9861" width="17.9861" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Button() {
  return (
    <div className="relative shrink-0 size-[23.993px]" data-name="button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center relative size-full">
        <Svg1 />
      </div>
    </div>
  );
}

function Span1() {
  return (
    <div className="h-[20px] opacity-70 relative shrink-0 w-[38.837px]" data-name="span">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[20px] left-0 not-italic text-[#262626] text-[14px] top-[0.11px] whitespace-nowrap">Name</p>
      </div>
    </div>
  );
}

function Container6() {
  return (
    <div className="absolute content-stretch flex gap-[7.986px] h-[47.986px] items-center left-[25.97px] top-[-0.56px] w-[255.139px]" data-name="Container">
      <Button />
      <Span1 />
    </div>
  );
}

function Container3() {
  return (
    <div className="bg-white h-[47.986px] relative shrink-0 w-full" data-name="Container">
      <div aria-hidden="true" className="absolute border-[#f3f4f6] border-b-[1.111px] border-solid inset-0 pointer-events-none" />
      <Container4 />
      <Container6 />
    </div>
  );
}

function Svg2() {
  return (
    <div className="h-[13.351px] overflow-clip relative shrink-0 w-full" data-name="svg">
      <div className="absolute inset-[0_68.75%_0_0]" data-name="Vector">
        <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2.22436 13.3507">
          <path d={svgPaths.p22bfc900} fill="var(--fill-0, #616D79)" id="Vector" />
        </svg>
      </div>
      <div className="absolute inset-[0_0_0_68.75%]" data-name="Vector">
        <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2.22434 13.3507">
          <path d={svgPaths.p1d356580} fill="var(--fill-0, #616D79)" id="Vector" />
        </svg>
      </div>
    </div>
  );
}

function Container9() {
  return (
    <div className="absolute content-stretch flex flex-col h-[13.351px] items-start left-[10.64px] top-[16.75px] w-[7.118px]" data-name="Container">
      <Svg2 />
    </div>
  );
}

function Container8() {
  return (
    <div className="absolute h-[46.875px] left-0 top-0 w-[25.972px]" data-name="Container">
      <Container9 />
    </div>
  );
}

function Svg3() {
  return (
    <div className="relative shrink-0 size-[17.986px]" data-name="svg">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 17.9861 17.9861">
        <g clipPath="url(#clip0_2045_3070)" id="svg">
          <path d={svgPaths.p154304c0} fill="var(--fill-0, #0E70CB)" id="Vector" />
        </g>
        <defs>
          <clipPath id="clip0_2045_3070">
            <rect fill="white" height="17.9861" width="17.9861" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Button1() {
  return (
    <div className="relative shrink-0 size-[23.993px]" data-name="button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center relative size-full">
        <Svg3 />
      </div>
    </div>
  );
}

function Span2() {
  return (
    <div className="h-[20px] relative shrink-0 w-[57.465px]" data-name="span">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[20px] left-0 not-italic text-[#262626] text-[14px] top-[0.11px] whitespace-nowrap">Job Title</p>
      </div>
    </div>
  );
}

function Container10() {
  return (
    <div className="absolute content-stretch flex gap-[7.986px] h-[47.986px] items-center left-[25.97px] top-[-0.56px] w-[255.139px]" data-name="Container">
      <Button1 />
      <Span2 />
    </div>
  );
}

function Container7() {
  return (
    <div className="bg-white h-[47.986px] relative shrink-0 w-full" data-name="Container">
      <div aria-hidden="true" className="absolute border-[#f3f4f6] border-b-[1.111px] border-solid inset-0 pointer-events-none" />
      <Container8 />
      <Container10 />
    </div>
  );
}

function Svg4() {
  return (
    <div className="h-[13.351px] overflow-clip relative shrink-0 w-full" data-name="svg">
      <div className="absolute inset-[0_68.75%_0_0]" data-name="Vector">
        <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2.22436 13.3507">
          <path d={svgPaths.p22bfc900} fill="var(--fill-0, #616D79)" id="Vector" />
        </svg>
      </div>
      <div className="absolute inset-[0_0_0_68.75%]" data-name="Vector">
        <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2.22434 13.3507">
          <path d={svgPaths.p1d356580} fill="var(--fill-0, #616D79)" id="Vector" />
        </svg>
      </div>
    </div>
  );
}

function Container13() {
  return (
    <div className="absolute content-stretch flex flex-col h-[13.351px] items-start left-[10.64px] top-[16.75px] w-[7.118px]" data-name="Container">
      <Svg4 />
    </div>
  );
}

function Container12() {
  return (
    <div className="absolute h-[46.875px] left-0 top-0 w-[25.972px]" data-name="Container">
      <Container13 />
    </div>
  );
}

function Svg5() {
  return (
    <div className="relative shrink-0 size-[17.986px]" data-name="svg">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 17.9861 17.9861">
        <g clipPath="url(#clip0_2045_3059)" id="svg">
          <path d={svgPaths.p154304c0} fill="var(--fill-0, #D1D5DB)" id="Vector" />
        </g>
        <defs>
          <clipPath id="clip0_2045_3059">
            <rect fill="white" height="17.9861" width="17.9861" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Button2() {
  return (
    <div className="relative shrink-0 size-[23.993px]" data-name="button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center relative size-full">
        <Svg5 />
      </div>
    </div>
  );
}

function Span3() {
  return (
    <div className="h-[20px] opacity-70 relative shrink-0 w-[35.33px]" data-name="span">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[20px] left-0 not-italic text-[#262626] text-[14px] top-[0.11px] whitespace-nowrap">Email</p>
      </div>
    </div>
  );
}

function Container14() {
  return (
    <div className="absolute content-stretch flex gap-[7.986px] h-[47.986px] items-center left-[25.97px] top-[-0.56px] w-[255.139px]" data-name="Container">
      <Button2 />
      <Span3 />
    </div>
  );
}

function Container11() {
  return (
    <div className="bg-white h-[47.986px] relative shrink-0 w-full" data-name="Container">
      <div aria-hidden="true" className="absolute border-[#f3f4f6] border-b-[1.111px] border-solid inset-0 pointer-events-none" />
      <Container12 />
      <Container14 />
    </div>
  );
}

function Svg6() {
  return (
    <div className="h-[13.351px] overflow-clip relative shrink-0 w-full" data-name="svg">
      <div className="absolute inset-[0_68.75%_0_0]" data-name="Vector">
        <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2.22436 13.3507">
          <path d={svgPaths.p22bfc900} fill="var(--fill-0, #616D79)" id="Vector" />
        </svg>
      </div>
      <div className="absolute inset-[0_0_0_68.75%]" data-name="Vector">
        <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2.22434 13.3507">
          <path d={svgPaths.p1d356580} fill="var(--fill-0, #616D79)" id="Vector" />
        </svg>
      </div>
    </div>
  );
}

function Container17() {
  return (
    <div className="absolute content-stretch flex flex-col h-[13.351px] items-start left-[10.64px] top-[16.75px] w-[7.118px]" data-name="Container">
      <Svg6 />
    </div>
  );
}

function Container16() {
  return (
    <div className="absolute h-[46.875px] left-0 top-0 w-[25.972px]" data-name="Container">
      <Container17 />
    </div>
  );
}

function Svg7() {
  return (
    <div className="relative shrink-0 size-[17.986px]" data-name="svg">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 17.9861 17.9861">
        <g clipPath="url(#clip0_2045_3070)" id="svg">
          <path d={svgPaths.p154304c0} fill="var(--fill-0, #0E70CB)" id="Vector" />
        </g>
        <defs>
          <clipPath id="clip0_2045_3070">
            <rect fill="white" height="17.9861" width="17.9861" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Button3() {
  return (
    <div className="relative shrink-0 size-[23.993px]" data-name="button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center relative size-full">
        <Svg7 />
      </div>
    </div>
  );
}

function Span4() {
  return (
    <div className="h-[20px] relative shrink-0 w-[63.403px]" data-name="span">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[20px] left-0 not-italic text-[#262626] text-[14px] top-[0.11px] whitespace-nowrap">Company</p>
      </div>
    </div>
  );
}

function Container18() {
  return (
    <div className="absolute content-stretch flex gap-[7.986px] h-[47.986px] items-center left-[25.97px] top-[-0.56px] w-[255.139px]" data-name="Container">
      <Button3 />
      <Span4 />
    </div>
  );
}

function Container15() {
  return (
    <div className="bg-white h-[47.986px] relative shrink-0 w-full" data-name="Container">
      <div aria-hidden="true" className="absolute border-[#f3f4f6] border-b-[1.111px] border-solid inset-0 pointer-events-none" />
      <Container16 />
      <Container18 />
    </div>
  );
}

function Svg8() {
  return (
    <div className="h-[13.351px] overflow-clip relative shrink-0 w-full" data-name="svg">
      <div className="absolute inset-[0_68.75%_0_0]" data-name="Vector">
        <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2.22436 13.3507">
          <path d={svgPaths.p22bfc900} fill="var(--fill-0, #616D79)" id="Vector" />
        </svg>
      </div>
      <div className="absolute inset-[0_0_0_68.75%]" data-name="Vector">
        <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2.22434 13.3507">
          <path d={svgPaths.p1d356580} fill="var(--fill-0, #616D79)" id="Vector" />
        </svg>
      </div>
    </div>
  );
}

function Container21() {
  return (
    <div className="absolute content-stretch flex flex-col h-[13.351px] items-start left-[10.64px] top-[16.75px] w-[7.118px]" data-name="Container">
      <Svg8 />
    </div>
  );
}

function Container20() {
  return (
    <div className="absolute h-[46.875px] left-0 top-0 w-[25.972px]" data-name="Container">
      <Container21 />
    </div>
  );
}

function Svg9() {
  return (
    <div className="relative shrink-0 size-[17.986px]" data-name="svg">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 17.9861 17.9861">
        <g clipPath="url(#clip0_2045_3070)" id="svg">
          <path d={svgPaths.p154304c0} fill="var(--fill-0, #0E70CB)" id="Vector" />
        </g>
        <defs>
          <clipPath id="clip0_2045_3070">
            <rect fill="white" height="17.9861" width="17.9861" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Button4() {
  return (
    <div className="relative shrink-0 size-[23.993px]" data-name="button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center relative size-full">
        <Svg9 />
      </div>
    </div>
  );
}

function Span5() {
  return (
    <div className="h-[20px] relative shrink-0 w-[40.087px]" data-name="span">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[20px] left-0 not-italic text-[#262626] text-[14px] top-[0.11px] whitespace-nowrap">Office</p>
      </div>
    </div>
  );
}

function Container22() {
  return (
    <div className="absolute content-stretch flex gap-[7.986px] h-[47.986px] items-center left-[25.97px] top-[-0.56px] w-[255.139px]" data-name="Container">
      <Button4 />
      <Span5 />
    </div>
  );
}

function Container19() {
  return (
    <div className="bg-white h-[47.986px] relative shrink-0 w-full" data-name="Container">
      <div aria-hidden="true" className="absolute border-[#f3f4f6] border-b-[1.111px] border-solid inset-0 pointer-events-none" />
      <Container20 />
      <Container22 />
    </div>
  );
}

function Svg10() {
  return (
    <div className="h-[13.351px] overflow-clip relative shrink-0 w-full" data-name="svg">
      <div className="absolute inset-[0_68.75%_0_0]" data-name="Vector">
        <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2.22436 13.3507">
          <path d={svgPaths.p22bfc900} fill="var(--fill-0, #616D79)" id="Vector" />
        </svg>
      </div>
      <div className="absolute inset-[0_0_0_68.75%]" data-name="Vector">
        <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2.22434 13.3507">
          <path d={svgPaths.p1d356580} fill="var(--fill-0, #616D79)" id="Vector" />
        </svg>
      </div>
    </div>
  );
}

function Container25() {
  return (
    <div className="absolute content-stretch flex flex-col h-[13.351px] items-start left-[10.64px] top-[16.75px] w-[7.118px]" data-name="Container">
      <Svg10 />
    </div>
  );
}

function Container24() {
  return (
    <div className="absolute h-[46.875px] left-0 top-0 w-[25.972px]" data-name="Container">
      <Container25 />
    </div>
  );
}

function Svg11() {
  return (
    <div className="relative shrink-0 size-[17.986px]" data-name="svg">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 17.9861 17.9861">
        <g clipPath="url(#clip0_2045_3070)" id="svg">
          <path d={svgPaths.p154304c0} fill="var(--fill-0, #0E70CB)" id="Vector" />
        </g>
        <defs>
          <clipPath id="clip0_2045_3070">
            <rect fill="white" height="17.9861" width="17.9861" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Button5() {
  return (
    <div className="relative shrink-0 size-[23.993px]" data-name="button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center relative size-full">
        <Svg11 />
      </div>
    </div>
  );
}

function Span6() {
  return (
    <div className="h-[20px] relative shrink-0 w-[120.191px]" data-name="span">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[20px] left-0 not-italic text-[#262626] text-[14px] top-[0.11px] whitespace-nowrap">Role Access Level</p>
      </div>
    </div>
  );
}

function Container26() {
  return (
    <div className="absolute content-stretch flex gap-[7.986px] h-[47.986px] items-center left-[25.97px] top-[-0.56px] w-[255.139px]" data-name="Container">
      <Button5 />
      <Span6 />
    </div>
  );
}

function Container23() {
  return (
    <div className="bg-white h-[47.986px] relative shrink-0 w-full" data-name="Container">
      <div aria-hidden="true" className="absolute border-[#f3f4f6] border-b-[1.111px] border-solid inset-0 pointer-events-none" />
      <Container24 />
      <Container26 />
    </div>
  );
}

function Svg12() {
  return (
    <div className="h-[13.351px] overflow-clip relative shrink-0 w-full" data-name="svg">
      <div className="absolute inset-[0_68.75%_0_0]" data-name="Vector">
        <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2.22436 13.3507">
          <path d={svgPaths.p22bfc900} fill="var(--fill-0, #616D79)" id="Vector" />
        </svg>
      </div>
      <div className="absolute inset-[0_0_0_68.75%]" data-name="Vector">
        <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2.22434 13.3507">
          <path d={svgPaths.p1d356580} fill="var(--fill-0, #616D79)" id="Vector" />
        </svg>
      </div>
    </div>
  );
}

function Container29() {
  return (
    <div className="absolute content-stretch flex flex-col h-[13.351px] items-start left-[10.64px] top-[16.75px] w-[7.118px]" data-name="Container">
      <Svg12 />
    </div>
  );
}

function Container28() {
  return (
    <div className="absolute h-[46.875px] left-0 top-0 w-[25.972px]" data-name="Container">
      <Container29 />
    </div>
  );
}

function Svg13() {
  return (
    <div className="relative shrink-0 size-[17.986px]" data-name="svg">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 17.9861 17.9861">
        <g clipPath="url(#clip0_2045_3070)" id="svg">
          <path d={svgPaths.p154304c0} fill="var(--fill-0, #0E70CB)" id="Vector" />
        </g>
        <defs>
          <clipPath id="clip0_2045_3070">
            <rect fill="white" height="17.9861" width="17.9861" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Button6() {
  return (
    <div className="relative shrink-0 size-[23.993px]" data-name="button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center relative size-full">
        <Svg13 />
      </div>
    </div>
  );
}

function Span7() {
  return (
    <div className="h-[20px] relative shrink-0 w-[67.951px]" data-name="span">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[20px] left-0 not-italic text-[#262626] text-[14px] top-[0.11px] whitespace-nowrap">User Type</p>
      </div>
    </div>
  );
}

function Container30() {
  return (
    <div className="absolute content-stretch flex gap-[7.986px] h-[47.986px] items-center left-[25.97px] top-[-0.56px] w-[255.139px]" data-name="Container">
      <Button6 />
      <Span7 />
    </div>
  );
}

function Container27() {
  return (
    <div className="bg-white h-[47.986px] relative shrink-0 w-full" data-name="Container">
      <div aria-hidden="true" className="absolute border-[#f3f4f6] border-b-[1.111px] border-solid inset-0 pointer-events-none" />
      <Container28 />
      <Container30 />
    </div>
  );
}

function Svg14() {
  return (
    <div className="h-[13.351px] overflow-clip relative shrink-0 w-full" data-name="svg">
      <div className="absolute inset-[0_68.75%_0_0]" data-name="Vector">
        <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2.22436 13.3507">
          <path d={svgPaths.p22bfc900} fill="var(--fill-0, #616D79)" id="Vector" />
        </svg>
      </div>
      <div className="absolute inset-[0_0_0_68.75%]" data-name="Vector">
        <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2.22434 13.3507">
          <path d={svgPaths.p1d356580} fill="var(--fill-0, #616D79)" id="Vector" />
        </svg>
      </div>
    </div>
  );
}

function Container33() {
  return (
    <div className="absolute content-stretch flex flex-col h-[13.351px] items-start left-[10.64px] top-[16.75px] w-[7.118px]" data-name="Container">
      <Svg14 />
    </div>
  );
}

function Container32() {
  return (
    <div className="absolute h-[46.875px] left-0 top-0 w-[25.972px]" data-name="Container">
      <Container33 />
    </div>
  );
}

function Svg15() {
  return (
    <div className="relative shrink-0 size-[17.986px]" data-name="svg">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 17.9861 17.9861">
        <g clipPath="url(#clip0_2045_3070)" id="svg">
          <path d={svgPaths.p154304c0} fill="var(--fill-0, #0E70CB)" id="Vector" />
        </g>
        <defs>
          <clipPath id="clip0_2045_3070">
            <rect fill="white" height="17.9861" width="17.9861" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Button7() {
  return (
    <div className="relative shrink-0 size-[23.993px]" data-name="button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center relative size-full">
        <Svg15 />
      </div>
    </div>
  );
}

function Span8() {
  return (
    <div className="h-[20px] relative shrink-0 w-[41.753px]" data-name="span">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[20px] left-0 not-italic text-[#262626] text-[14px] top-[0.11px] whitespace-nowrap">Status</p>
      </div>
    </div>
  );
}

function Container34() {
  return (
    <div className="absolute content-stretch flex gap-[7.986px] h-[47.986px] items-center left-[25.97px] top-[-0.56px] w-[255.139px]" data-name="Container">
      <Button7 />
      <Span8 />
    </div>
  );
}

function Container31() {
  return (
    <div className="bg-white h-[47.986px] relative shrink-0 w-full" data-name="Container">
      <div aria-hidden="true" className="absolute border-[#f3f4f6] border-b-[1.111px] border-solid inset-0 pointer-events-none" />
      <Container32 />
      <Container34 />
    </div>
  );
}

function Svg16() {
  return (
    <div className="h-[13.351px] overflow-clip relative shrink-0 w-full" data-name="svg">
      <div className="absolute inset-[0_68.75%_0_0]" data-name="Vector">
        <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2.22436 13.3507">
          <path d={svgPaths.p22bfc900} fill="var(--fill-0, #616D79)" id="Vector" />
        </svg>
      </div>
      <div className="absolute inset-[0_0_0_68.75%]" data-name="Vector">
        <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2.22434 13.3507">
          <path d={svgPaths.p1d356580} fill="var(--fill-0, #616D79)" id="Vector" />
        </svg>
      </div>
    </div>
  );
}

function Container37() {
  return (
    <div className="absolute content-stretch flex flex-col h-[13.351px] items-start left-[10.64px] top-[16.75px] w-[7.118px]" data-name="Container">
      <Svg16 />
    </div>
  );
}

function Container36() {
  return (
    <div className="absolute h-[46.875px] left-0 top-0 w-[25.972px]" data-name="Container">
      <Container37 />
    </div>
  );
}

function Svg17() {
  return (
    <div className="relative shrink-0 size-[17.986px]" data-name="svg">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 17.9861 17.9861">
        <g clipPath="url(#clip0_2045_3062)" id="svg">
          <path d={svgPaths.p1d411c00} fill="var(--fill-0, #D1D5DB)" id="Vector" />
        </g>
        <defs>
          <clipPath id="clip0_2045_3062">
            <rect fill="white" height="17.9861" width="17.9861" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Button8() {
  return (
    <div className="relative shrink-0 size-[23.993px]" data-name="button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center relative size-full">
        <Svg17 />
      </div>
    </div>
  );
}

function Span9() {
  return (
    <div className="h-[20px] relative shrink-0 w-[50.295px]" data-name="span">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[20px] left-0 not-italic text-[#262626] text-[14px] top-[0.11px] whitespace-nowrap">Domain</p>
      </div>
    </div>
  );
}

function Container38() {
  return (
    <div className="absolute content-stretch flex gap-[7.986px] h-[47.986px] items-center left-[25.97px] top-[-0.56px] w-[255.139px]" data-name="Container">
      <Button8 />
      <Span9 />
    </div>
  );
}

function Container35() {
  return (
    <div className="bg-white h-[47.986px] relative shrink-0 w-full" data-name="Container">
      <div aria-hidden="true" className="absolute border-[#f3f4f6] border-b-[1.111px] border-solid inset-0 pointer-events-none" />
      <Container36 />
      <Container38 />
    </div>
  );
}

function Svg18() {
  return (
    <div className="h-[13.351px] overflow-clip relative shrink-0 w-full" data-name="svg">
      <div className="absolute inset-[0_68.75%_0_0]" data-name="Vector">
        <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2.22436 13.3507">
          <path d={svgPaths.p22bfc900} fill="var(--fill-0, #616D79)" id="Vector" />
        </svg>
      </div>
      <div className="absolute inset-[0_0_0_68.75%]" data-name="Vector">
        <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2.22434 13.3507">
          <path d={svgPaths.p1d356580} fill="var(--fill-0, #616D79)" id="Vector" />
        </svg>
      </div>
    </div>
  );
}

function Container41() {
  return (
    <div className="absolute content-stretch flex flex-col h-[13.351px] items-start left-[10.64px] top-[17.31px] w-[7.118px]" data-name="Container">
      <Svg18 />
    </div>
  );
}

function Container40() {
  return (
    <div className="absolute h-[47.986px] left-0 top-0 w-[25.972px]" data-name="Container">
      <Container41 />
    </div>
  );
}

function Svg19() {
  return (
    <div className="relative shrink-0 size-[17.986px]" data-name="svg">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 17.9861 17.9861">
        <g clipPath="url(#clip0_2045_3062)" id="svg">
          <path d={svgPaths.p1d411c00} fill="var(--fill-0, #D1D5DB)" id="Vector" />
        </g>
        <defs>
          <clipPath id="clip0_2045_3062">
            <rect fill="white" height="17.9861" width="17.9861" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Button9() {
  return (
    <div className="relative shrink-0 size-[23.993px]" data-name="button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center relative size-full">
        <Svg19 />
      </div>
    </div>
  );
}

function Span10() {
  return (
    <div className="h-[20px] relative shrink-0 w-[54.792px]" data-name="span">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[20px] left-0 not-italic text-[#262626] text-[14px] top-[0.11px] whitespace-nowrap">Address</p>
      </div>
    </div>
  );
}

function Container42() {
  return (
    <div className="absolute content-stretch flex gap-[7.986px] h-[47.986px] items-center left-[25.97px] top-0 w-[255.139px]" data-name="Container">
      <Button9 />
      <Span10 />
    </div>
  );
}

function Container39() {
  return (
    <div className="bg-white h-[47.986px] relative shrink-0 w-full" data-name="Container">
      <Container40 />
      <Container42 />
    </div>
  );
}

function Container2() {
  return (
    <div className="h-[480px] relative shrink-0 w-full" data-name="Container">
      <div className="overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex flex-col items-start pr-[16.667px] relative size-full">
          <Container3 />
          <Container7 />
          <Container11 />
          <Container15 />
          <Container19 />
          <Container23 />
          <Container27 />
          <Container31 />
          <Container35 />
          <Container39 />
        </div>
      </div>
    </div>
  );
}

function Button10() {
  return (
    <div className="h-[19.497px] relative shrink-0 w-[98.854px]" data-name="button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="-translate-x-1/2 absolute decoration-solid font-['Inter:Medium',sans-serif] font-medium leading-[19.5px] left-[49px] not-italic text-[#616d79] text-[13px] text-center top-[0.11px] underline whitespace-nowrap">Reset to Default</p>
      </div>
    </div>
  );
}

function Container43() {
  return (
    <div className="bg-[#fafafa] h-[40px] relative shrink-0 w-full" data-name="Container">
      <div aria-hidden="true" className="absolute border-[#e5e7eb] border-solid border-t-[1.111px] inset-0 pointer-events-none" />
      <div className="flex flex-row items-center justify-end size-full">
        <div className="content-stretch flex items-center justify-end pr-[11.997px] pt-[1.111px] relative size-full">
          <Button10 />
        </div>
      </div>
    </div>
  );
}

export default function ColumnVisibilityMenu() {
  return (
    <div className="bg-white relative rounded-[8px] size-full" data-name="Column_visibility_menu">
      <div className="content-stretch flex flex-col items-start overflow-clip p-[1.111px] relative rounded-[inherit] size-full">
        <Container />
        <Container2 />
        <Container43 />
      </div>
      <div aria-hidden="true" className="absolute border-[#e5e7eb] border-[1.111px] border-solid inset-0 pointer-events-none rounded-[8px] shadow-[0px_2px_8px_0px_rgba(0,0,0,0.18)]" />
    </div>
  );
}