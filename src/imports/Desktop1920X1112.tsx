import svgPaths from "./svg-emm8g9x9bp";
import imgImg from "figma:asset/d14f9ba8efd893f2270331bb82f967c250647133.png";
import imgImg1 from "figma:asset/31f8f844c85bcb0a258ba9cd606404673764a826.png";
import imgImg2 from "figma:asset/5d8ef005878d70532e56964fc87a73ec8e9a828c.png";
import imgImage from "figma:asset/794abd9c4f9b76f694f72984f4426d292661a8d6.png";
import imgAutodeskLogo2021Svg from "figma:asset/de5e422433a571d190e7c4d34a019906817d3b35.png";
import imgImage16 from "figma:asset/53682e1811779057bb44f23138e859ff4a897918.png";
import imgImage15 from "figma:asset/1347207f59fbc71bd42a8237de662b6bec7350bc.png";

function Img() {
  return (
    <div className="h-[55.99px] relative shrink-0 w-full" data-name="img">
      <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgImg} />
    </div>
  );
}

function Container3() {
  return (
    <div className="relative shrink-0 size-[55.99px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start overflow-clip relative rounded-[inherit] size-full">
        <Img />
      </div>
    </div>
  );
}

function Span() {
  return (
    <div className="h-[13.003px] relative shrink-0 w-[80.122px]" data-name="span">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="-translate-x-1/2 absolute font-['Open_Sans:SemiBold',sans-serif] font-semibold leading-[13px] left-[40px] text-[#ff4d00] text-[10px] text-center top-[-0.11px] tracking-[0.6px] uppercase whitespace-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
          Inertia Blade
        </p>
      </div>
    </div>
  );
}

function Button() {
  return (
    <div className="h-[13.003px] relative shrink-0 w-[156.267px]" data-name="button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center relative size-full">
        <Span />
      </div>
    </div>
  );
}

function Span1() {
  return (
    <div className="h-[20px] relative shrink-0 w-[138.281px]" data-name="span">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="-translate-x-1/2 absolute font-['Open_Sans:Regular',sans-serif] font-normal leading-[20px] left-[69.5px] text-[#f2f3f4] text-[16px] text-center top-[-0.11px] whitespace-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
          Cleveland Hospital
        </p>
      </div>
    </div>
  );
}

function Svg() {
  return (
    <div className="relative shrink-0 size-[11.997px]" data-name="svg">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 11.9965 11.9965">
        <g id="svg">
          <path d={svgPaths.p3cbea00} id="Vector" stroke="var(--stroke-0, #F2F3F4)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.49957" />
        </g>
      </svg>
    </div>
  );
}

function Button1() {
  return (
    <div className="h-[20px] relative shrink-0 w-[156.267px]" data-name="button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[5.99px] items-center relative size-full">
        <Span1 />
        <Svg />
      </div>
    </div>
  );
}

function Container4() {
  return (
    <div className="h-[55.99px] relative shrink-0 w-[188.247px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col gap-[1.997px] items-start justify-center pl-[15.99px] relative size-full">
        <Button />
        <Button1 />
      </div>
    </div>
  );
}

function Container2() {
  return (
    <div className="flex-[1_0_0] h-[55.99px] min-h-px min-w-px relative" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center relative size-full">
        <Container3 />
        <Container4 />
      </div>
    </div>
  );
}

function Container1() {
  return (
    <div className="h-[55.99px] relative shrink-0 w-[244.236px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center relative size-full">
        <Container2 />
      </div>
    </div>
  );
}

function Svg1() {
  return (
    <div className="relative shrink-0 size-[23.993px]" data-name="svg">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 23.9931 23.9931">
        <g clipPath="url(#clip0_2016_2672)" id="svg">
          <path d={svgPaths.p33fec600} fill="var(--fill-0, white)" id="Vector" />
        </g>
        <defs>
          <clipPath id="clip0_2016_2672">
            <rect fill="white" height="23.9931" width="23.9931" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Button2() {
  return (
    <div className="absolute content-stretch flex items-center justify-center left-0 pr-[0.018px] size-[35.99px] top-[10px]" data-name="button">
      <Svg1 />
    </div>
  );
}

function Svg2() {
  return (
    <div className="relative shrink-0 size-[21.997px]" data-name="svg">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 21.9965 21.9965">
        <g id="svg">
          <path d={svgPaths.p2243f9f0} fill="var(--fill-0, white)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function Button3() {
  return (
    <div className="absolute content-stretch flex items-center justify-center left-[39.98px] rounded-[4px] size-[35.99px] top-[10px]" data-name="button">
      <Svg2 />
    </div>
  );
}

function Img1() {
  return (
    <div className="h-[25.99px] relative shrink-0 w-[135.816px]" data-name="img">
      <img alt="" className="absolute bg-clip-padding border-0 border-[transparent] border-solid inset-0 max-w-none object-cover pointer-events-none size-full" src={imgImg1} />
    </div>
  );
}

function Container7() {
  return (
    <div className="flex-[1_0_0] h-[43.993px] min-h-px min-w-px opacity-44 relative" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center overflow-clip relative rounded-[inherit] size-full">
        <Img1 />
      </div>
    </div>
  );
}

function Img2() {
  return (
    <div className="h-[37.986px] relative shrink-0 w-full" data-name="img">
      <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgImg2} />
    </div>
  );
}

function Container8() {
  return (
    <div className="relative rounded-[37282700px] shrink-0 size-[37.986px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start overflow-clip relative rounded-[inherit] size-full">
        <Img2 />
      </div>
    </div>
  );
}

function Container6() {
  return (
    <div className="absolute bg-black content-stretch flex gap-[11.997px] h-[43.993px] items-center left-[87.95px] px-[7.101px] py-[1.111px] rounded-[4px] top-[5.99px] w-[200px]" data-name="Container">
      <div aria-hidden="true" className="absolute border-[#75808b] border-[1.111px] border-solid inset-0 pointer-events-none rounded-[4px]" />
      <Container7 />
      <Container8 />
    </div>
  );
}

function Container5() {
  return (
    <div className="h-[55.99px] relative shrink-0 w-[287.951px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <Button2 />
        <Button3 />
        <Container6 />
      </div>
    </div>
  );
}

function Container() {
  return (
    <div className="bg-[#243746] h-[56px] relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex items-center justify-between pr-[11.996px] relative size-full">
          <Container1 />
          <Container5 />
        </div>
      </div>
    </div>
  );
}

function Tabs1() {
  return (
    <div className="bg-white content-stretch flex h-[70px] items-start px-[23px] py-[24px] relative shrink-0" data-name="Tabs 4">
      <p className="font-['Inter:Bold',sans-serif] font-bold leading-[26px] not-italic relative shrink-0 text-[#243746] text-[18px] whitespace-nowrap">Projects</p>
      <div className="absolute inset-0 pointer-events-none rounded-[inherit] shadow-[inset_0px_-4px_0px_0px_#243746]" />
    </div>
  );
}

function Tabs2() {
  return (
    <div className="bg-white content-stretch flex h-[70px] items-start px-[23px] py-[24px] relative shrink-0" data-name="Tabs 6">
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[22px] not-italic relative shrink-0 text-[#243746] text-[16px] whitespace-nowrap">Archived</p>
    </div>
  );
}

function Tabs() {
  return (
    <div className="content-stretch flex h-[70px] items-start pb-[22px] pt-[24px] px-[23px] relative shrink-0" data-name="Tabs 2">
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[22px] not-italic relative shrink-0 text-[#8a939d] text-[16px] whitespace-nowrap">Dashboard</p>
    </div>
  );
}

function Menu() {
  return (
    <div className="content-stretch flex h-[96px] items-end justify-center relative shrink-0" data-name="Menu">
      <Tabs1 />
      <Tabs2 />
      <Tabs />
    </div>
  );
}

function LeftSide() {
  return (
    <div className="content-stretch flex flex-[1_0_0] h-[96px] items-end min-h-px min-w-px relative" data-name="Left Side">
      <Menu />
    </div>
  );
}

function Header() {
  return (
    <div className="bg-white h-[96px] relative shadow-[0px_2px_0px_0px_#f0f0f3] shrink-0 w-full" data-name="Header">
      <div className="flex flex-row items-end justify-center size-full">
        <div className="content-stretch flex items-end justify-center px-[72px] relative size-full">
          <LeftSide />
        </div>
      </div>
    </div>
  );
}

function Group1() {
  return (
    <div className="absolute inset-[8.33%]">
      <div className="absolute inset-[0_-2.65%_-2.65%_0]">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20.5302 20.5303">
          <g id="Group 16">
            <circle cx="8.31522" cy="8.31522" id="Ellipse 2" r="7.56522" stroke="var(--stroke-0, #616D79)" strokeLinecap="round" strokeWidth="1.5" />
            <path d="M14.1303 14.1304L19.9999 20" id="Vector 12" stroke="var(--stroke-0, #616D79)" strokeWidth="1.5" />
          </g>
        </svg>
      </div>
    </div>
  );
}

function ButtonGroup() {
  return <div className="col-1 h-[44px] ml-0 mt-0 row-1 w-[1059px]" data-name="Button Group" />;
}

function Group8() {
  return (
    <div className="flex-[1_0_0] grid-cols-[max-content] grid-rows-[max-content] inline-grid leading-[0] min-h-px min-w-px place-items-start relative">
      <ButtonGroup />
    </div>
  );
}

function Content() {
  return (
    <div className="bg-[#ff4d00] content-stretch flex gap-[4px] h-[40px] items-center justify-center overflow-clip px-[16px] relative rounded-[4px] shrink-0" data-name="content">
      <div className="overflow-clip relative shrink-0 size-[24px]" data-name="plus">
        <div className="absolute inset-[22.49%_23.73%_24.96%_23.73%]" data-name="plus">
          <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12.611 12.611">
            <path d={svgPaths.p28c07a00} fill="var(--fill-0, white)" id="plus" />
          </svg>
        </div>
      </div>
      <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[16px] text-center text-white whitespace-nowrap">
        <p className="leading-[22px]">Add new project</p>
      </div>
    </div>
  );
}

function Header1() {
  return (
    <div className="bg-[#f5f5f5] h-[56px] relative shrink-0 w-full" data-name="Header">
      <div aria-hidden="true" className="absolute border-[#243746] border-b border-solid inset-0 pointer-events-none" />
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex gap-[12px] items-center pl-[24px] pr-[48px] relative size-full">
          <div className="bg-white content-stretch flex gap-[8px] h-[40px] items-center px-[8px] relative rounded-[4px] shrink-0 w-[580px]" data-name="Input Field">
            <div aria-hidden="true" className="absolute border border-[#d9d9d9] border-solid inset-0 pointer-events-none rounded-[4px]" />
            <div className="overflow-clip relative shrink-0 size-[24px]" data-name="24px/app/search">
              <Group1 />
            </div>
            <div className="flex flex-[1_0_0] flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] min-h-px min-w-px not-italic relative text-[#8c8c8c] text-[14px]">
              <p className="leading-[20px]">Search files by name or number</p>
            </div>
          </div>
          <Group8 />
          <div className="content-stretch flex flex-col h-[44px] items-center justify-center py-[2px] relative shrink-0" data-name="Button">
            <Content />
          </div>
        </div>
      </div>
    </div>
  );
}

function Content1() {
  return (
    <div className="bg-[#f2f3f4] h-[40px] relative rounded-[4px] shrink-0" data-name="content">
      <div className="content-stretch flex gap-[4px] h-full items-center justify-center overflow-clip px-[16px] relative rounded-[inherit]">
        <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[#616d79] text-[16px] text-center whitespace-nowrap">
          <p className="leading-[22px]">Grouped by: None</p>
        </div>
        <div className="overflow-clip relative shrink-0 size-[24px]" data-name="24px/directional/chevron-down">
          <div className="absolute bottom-[37.5%] flex items-center justify-center left-1/4 right-1/4 top-[37.5%]">
            <div className="-rotate-90 flex-none h-[12px] w-[6px]">
              <div className="relative size-full" data-name="Vector">
                <div className="absolute inset-[-8.84%_-17.68%]">
                  <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 8.12132 14.1213">
                    <path d={svgPaths.p5cbda00} id="Vector" stroke="var(--stroke-0, #616D79)" strokeLinecap="square" strokeWidth="1.5" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div aria-hidden="true" className="absolute border border-[#c3c7cc] border-solid inset-0 pointer-events-none rounded-[4px]" />
    </div>
  );
}

function Content2() {
  return (
    <div className="bg-[#616d79] h-[40px] relative rounded-[4px] shrink-0" data-name="content">
      <div className="content-stretch flex gap-[4px] h-full items-center justify-center overflow-clip px-[16px] relative rounded-[inherit]">
        <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[16px] text-center text-white whitespace-nowrap">
          <p className="leading-[22px]">Sort by: Recent</p>
        </div>
        <div className="overflow-clip relative shrink-0 size-[24px]" data-name="24px/directional/chevron-down">
          <div className="absolute bottom-[37.5%] flex items-center justify-center left-1/4 right-1/4 top-[37.5%]">
            <div className="-rotate-90 flex-none h-[12px] w-[6px]">
              <div className="relative size-full" data-name="Vector">
                <div className="absolute inset-[-8.84%_-17.68%]">
                  <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 8.12132 14.1213">
                    <path d={svgPaths.p5cbda00} id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="square" strokeWidth="1.5" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div aria-hidden="true" className="absolute border border-[#616d79] border-solid inset-0 pointer-events-none rounded-[4px]" />
    </div>
  );
}

function Frame10() {
  return (
    <div className="content-stretch flex gap-[12px] items-center relative shrink-0 w-[387px]">
      <div className="content-stretch flex flex-col h-[44px] items-center justify-center py-[2px] relative shrink-0" data-name="Button">
        <Content1 />
      </div>
      <div className="content-stretch flex flex-col h-[44px] items-center justify-center py-[2px] relative shrink-0" data-name="Button">
        <Content2 />
      </div>
    </div>
  );
}

function Group3() {
  return (
    <div className="h-[24px] relative shrink-0 w-[25.25px]">
      <div className="absolute inset-[0_-2.97%_0_0]">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 26 24">
          <g id="Group 37">
            <path d="M8.09906 2H25.25" id="Vector 15" stroke="var(--stroke-0, #616D79)" strokeLinecap="square" strokeWidth="1.5" />
            <path d="M8.09906 22H25.25" id="Vector 16" stroke="var(--stroke-0, #616D79)" strokeLinecap="square" strokeWidth="1.5" />
            <path d={svgPaths.p3e800430} fill="var(--fill-0, #616D79)" id="Ellipse 20" stroke="var(--stroke-0, #616D79)" strokeWidth="1.5" />
            <path d="M8.09906 12H25.25" id="Vector 17" stroke="var(--stroke-0, #616D79)" strokeLinecap="square" strokeWidth="1.5" />
            <path d={svgPaths.p89b1e90} fill="var(--fill-0, #616D79)" id="Ellipse 22" stroke="var(--stroke-0, #616D79)" strokeWidth="1.5" />
            <path d={svgPaths.p27264900} fill="var(--fill-0, #616D79)" id="Ellipse 21" stroke="var(--stroke-0, #616D79)" strokeWidth="1.5" />
          </g>
        </svg>
      </div>
    </div>
  );
}

function TapAreaSearch() {
  return (
    <div className="content-stretch flex items-center justify-center overflow-clip p-[8px] relative shrink-0 size-[40px]" data-name="Tap area - Search">
      <Group3 />
    </div>
  );
}

function Group2() {
  return (
    <div className="grid-cols-[max-content] grid-rows-[max-content] inline-grid leading-[0] place-items-start relative shrink-0">
      <div className="col-1 ml-0 mt-0 relative row-1 size-[9.882px]">
        <div aria-hidden="true" className="absolute border-2 border-[#f2f3f4] border-solid inset-[-1px] pointer-events-none" />
      </div>
      <div className="col-1 ml-[14.12px] mt-0 relative row-1 size-[9.882px]">
        <div aria-hidden="true" className="absolute border-2 border-[#f2f3f4] border-solid inset-[-1px] pointer-events-none" />
      </div>
      <div className="col-1 ml-0 mt-[14.12px] relative row-1 size-[9.882px]">
        <div aria-hidden="true" className="absolute border-2 border-[#f2f3f4] border-solid inset-[-1px] pointer-events-none" />
      </div>
      <div className="col-1 ml-[14.12px] mt-[14.12px] relative row-1 size-[9.882px]">
        <div aria-hidden="true" className="absolute border-2 border-[#f2f3f4] border-solid inset-[-1px] pointer-events-none" />
      </div>
    </div>
  );
}

function TapAreaFilter() {
  return (
    <div className="bg-[#616d79] content-stretch flex items-center justify-center overflow-clip px-[4px] py-[8px] relative shrink-0 size-[40px]" data-name="Tap area - Filter">
      <Group2 />
    </div>
  );
}

function TapAreaFilter1() {
  return (
    <div className="content-stretch flex items-center justify-center overflow-clip px-[4px] py-[8px] relative shrink-0 size-[40px]" data-name="Tap area - Filter">
      <div className="overflow-clip relative shrink-0 size-[24px]" data-name="map">
        <div className="absolute inset-[8.33%_4.17%]" data-name="Vector">
          <div className="absolute inset-[-5%_-4.55%]">
            <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 22">
              <path d={svgPaths.pd040b80} id="Vector" stroke="var(--stroke-0, #616D79)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
            </svg>
          </div>
        </div>
        <div className="absolute bottom-1/4 left-[33.33%] right-[66.67%] top-[8.33%]" data-name="Vector">
          <div className="absolute inset-[-6.25%_-1px]">
            <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 18">
              <path d="M1 1V17" id="Vector" stroke="var(--stroke-0, #616D79)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
            </svg>
          </div>
        </div>
        <div className="absolute bottom-[8.33%] left-[66.67%] right-[33.33%] top-1/4" data-name="Vector">
          <div className="absolute inset-[-6.25%_-1px]">
            <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 18">
              <path d="M1 1V17" id="Vector" stroke="var(--stroke-0, #616D79)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}

function ScanSearchFilter() {
  return (
    <div className="bg-[#f2f3f4] relative rounded-[4px] shrink-0" data-name="Scan - Search - Filter">
      <div className="content-stretch flex items-center overflow-clip relative rounded-[inherit]">
        <TapAreaSearch />
        <div className="h-[40px] relative shrink-0 w-px" data-name="divider/vertical">
          <div className="absolute flex inset-0 items-center justify-center">
            <div className="flex-none h-px rotate-90 w-[24px]">
              <div className="bg-[#bfbfbf] size-full" data-name="divider/vertical" />
            </div>
          </div>
        </div>
        <TapAreaFilter />
        <div className="h-[40px] relative shrink-0 w-px" data-name="divider/vertical">
          <div className="absolute flex inset-0 items-center justify-center">
            <div className="flex-none h-px rotate-90 w-[24px]">
              <div className="bg-[#bfbfbf] size-full" data-name="divider/vertical" />
            </div>
          </div>
        </div>
        <TapAreaFilter1 />
      </div>
      <div aria-hidden="true" className="absolute border border-[#bfbfbf] border-solid inset-0 pointer-events-none rounded-[4px]" />
    </div>
  );
}

function Header2() {
  return (
    <div className="bg-[#f5f5f5] h-[56px] relative shrink-0 w-full" data-name="Header">
      <div aria-hidden="true" className="absolute border-[#243746] border-b border-solid inset-0 pointer-events-none" />
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex items-center justify-between pl-[24px] pr-[48px] relative size-full">
          <Frame10 />
          <ScanSearchFilter />
        </div>
      </div>
    </div>
  );
}

function Image() {
  return (
    <div className="bg-white h-[200px] overflow-clip relative rounded-bl-[24px] rounded-tl-[24px] shrink-0 w-[230px]" data-name="Image">
      <div className="absolute h-[200px] left-0 rounded-bl-[24px] rounded-tl-[24px] top-0 w-[230px]" data-name="image">
        <div aria-hidden="true" className="absolute inset-0 pointer-events-none rounded-bl-[24px] rounded-tl-[24px]">
          <div className="absolute bg-[#c4c4c4] inset-0 rounded-bl-[24px] rounded-tl-[24px]" />
          <img alt="" className="absolute max-w-none object-cover rounded-bl-[24px] rounded-tl-[24px] size-full" src={imgImage} />
        </div>
      </div>
    </div>
  );
}

function Frame2() {
  return (
    <div className="content-stretch flex items-center justify-between relative shrink-0 w-full">
      <div className="bg-[#52c41a] content-stretch flex gap-[6px] h-[32px] items-center justify-center overflow-clip px-[12px] relative rounded-[32px] shrink-0" data-name="Pill">
        <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[#f2f3f4] text-[14px] whitespace-nowrap">
          <p className="leading-[20px]">Updated</p>
        </div>
      </div>
      <p className="font-['Roboto:Regular',sans-serif] font-normal leading-[1.2] relative shrink-0 text-[#434343] text-[14px] whitespace-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>{`8/4/2024, 6:15 PM `}</p>
    </div>
  );
}

function Frame() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full">
      <div className="font-['DM_Sans:Bold',sans-serif] font-bold leading-[normal] relative shrink-0 text-[#081f32] text-[24px] w-full" style={{ fontVariationSettings: "'opsz' 14" }}>
        <p className="mb-0">Cleveland Hospital</p>
        <p>&nbsp;</p>
      </div>
    </div>
  );
}

function Autodesk() {
  return (
    <div className="bg-[#f0f0f3] col-1 ml-0 mt-0 overflow-clip relative rounded-[24px] row-1 size-[48px]" data-name="Autodesk">
      <div className="absolute h-[22.031px] left-[7px] top-[13px] w-[34px]" data-name="Autodesk_Logo_2021.svg">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <img alt="" className="absolute h-full left-0 max-w-none top-0 w-[588.24%]" src={imgAutodeskLogo2021Svg} />
        </div>
      </div>
    </div>
  );
}

function Integrations() {
  return (
    <div className="grid-cols-[max-content] grid-rows-[max-content] inline-grid leading-[0] place-items-start relative shrink-0" data-name="Integrations">
      <Autodesk />
    </div>
  );
}

function Frame1() {
  return (
    <div className="content-stretch flex items-center justify-between relative shrink-0 w-full">
      <Integrations />
      <div className="relative shrink-0 size-[24px]" data-name="24px/app/ellipsis-horizontal">
        <div className="absolute inset-[41.67%_8.33%_44.44%_8.33%]" data-name="Vector">
          <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 3.33333">
            <path d={svgPaths.p2fca5e70} fill="var(--fill-0, #616D79)" id="Vector" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function Frame3() {
  return (
    <div className="bg-white content-stretch flex flex-col gap-[12px] h-[200px] items-start justify-center p-[24px] relative rounded-br-[24px] rounded-tr-[24px] shrink-0 w-[346px]">
      <Frame2 />
      <Frame />
      <Frame1 />
    </div>
  );
}

function ProjectCardVertical() {
  return (
    <div className="col-1 content-stretch flex items-start justify-self-stretch relative row-1 self-start shadow-[0px_1px_1px_0px_rgba(9,30,66,0.25),0px_0px_1px_0px_rgba(9,30,66,0.31)] shrink-0" data-name="Project Card Vertical">
      <Image />
      <Frame3 />
    </div>
  );
}

function Group() {
  return (
    <div className="absolute inset-[13.16%_13.26%_13.67%_13.04%]" data-name="Group">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 135.594 111.228">
        <g id="Group">
          <path d={svgPaths.pf083600} fill="var(--fill-0, #F5F5F5)" id="Vector" />
          <path clipRule="evenodd" d={svgPaths.p13fb8b80} fill="var(--fill-0, #A1A8B0)" fillRule="evenodd" id="Vector_2" />
          <g id="Vector_3" />
          <path clipRule="evenodd" d={svgPaths.p3cae6f00} fill="var(--fill-0, #F5F5F5)" fillRule="evenodd" id="Vector_4" />
          <path clipRule="evenodd" d={svgPaths.p13a75f00} fill="var(--fill-0, #E5E7E9)" fillRule="evenodd" id="Vector_5" />
        </g>
      </svg>
    </div>
  );
}

function Group5() {
  return (
    <div className="absolute inset-[27.63%_39.13%_44.74%_39.13%]">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 40 42">
        <g id="Group 195">
          <circle cx="20" cy="22" fill="var(--fill-0, #E5E7E9)" id="Ellipse 23" r="20" />
          <circle cx="20" cy="20" fill="var(--fill-0, white)" id="Ellipse 24" r="19.5" stroke="var(--stroke-0, #F2F3F4)" />
          <g id="Group 193">
            <path d="M20 32L20 8" id="Vector 102" stroke="var(--stroke-0, #FF6425)" strokeWidth="4" />
            <path d="M32 20L8 20" id="Vector 103" stroke="var(--stroke-0, #FF6425)" strokeWidth="4" />
          </g>
        </g>
      </svg>
    </div>
  );
}

function Group4() {
  return (
    <div className="absolute inset-[17.11%_39.67%_74.34%_39.51%]">
      <div className="absolute inset-[0_-1.85%_-5.44%_-1.85%]">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 39.7073 13.7071">
          <g id="Group 194">
            <path d={svgPaths.p1a0ca400} id="Vector 99" stroke="var(--stroke-0, #A1A8B0)" strokeWidth="2" />
            <path d="M5.65685 13L0.707107 8.05025" id="Vector 100" stroke="var(--stroke-0, #A1A8B0)" strokeWidth="2" />
            <path d="M34.0504 13L39.0002 8.05025" id="Vector 101" stroke="var(--stroke-0, #A1A8B0)" strokeWidth="2" />
          </g>
        </svg>
      </div>
    </div>
  );
}

function Group6() {
  return (
    <div className="absolute contents inset-[17.11%_39.13%_44.74%_39.13%]">
      <Group5 />
      <Group4 />
    </div>
  );
}

function Group7() {
  return (
    <div className="absolute contents inset-[13.16%_13.26%_13.67%_13.04%]">
      <Group />
      <Group6 />
    </div>
  );
}

function Image1() {
  return (
    <div className="bg-white h-[200px] overflow-clip relative rounded-bl-[24px] rounded-tl-[24px] shrink-0 w-[230px]" data-name="Image">
      <div className="absolute h-[152px] left-[23px] overflow-clip top-[24px] w-[184px]" data-name="Empty Graphic">
        <Group7 />
      </div>
    </div>
  );
}

function Frame5() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full">
      <p className="font-['DM_Sans:Bold',sans-serif] font-bold leading-[normal] relative shrink-0 text-[#384857] text-[24px] w-full" style={{ fontVariationSettings: "'opsz' 14" }}>
        Add a new Project
      </p>
    </div>
  );
}

function Frame4() {
  return (
    <div className="bg-white content-stretch flex flex-col h-[200px] items-start justify-center p-[24px] relative rounded-br-[24px] rounded-tr-[24px] shrink-0 w-[346px]">
      <Frame5 />
    </div>
  );
}

function ProjectCardVertical1() {
  return (
    <div className="col-3 content-stretch flex items-start opacity-80 relative row-1 self-start shadow-[0px_1px_1px_0px_rgba(9,30,66,0.25),0px_0px_1px_0px_rgba(9,30,66,0.31)] shrink-0 w-[576px]" data-name="Project Card Vertical">
      <Image1 />
      <Frame4 />
    </div>
  );
}

function Image2() {
  return (
    <div className="bg-white h-[200px] overflow-clip relative rounded-bl-[24px] rounded-tl-[24px] shrink-0 w-[230px]" data-name="Image">
      <div className="absolute h-[200px] left-[-10.73px] top-0 w-[299.213px]" data-name="image 16">
        <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgImage16} />
      </div>
    </div>
  );
}

function Frame7() {
  return (
    <div className="content-stretch flex items-center justify-between relative shrink-0 w-full">
      <div className="bg-[#52c41a] content-stretch flex gap-[6px] h-[32px] items-center justify-center overflow-clip px-[12px] relative rounded-[32px] shrink-0" data-name="Pill">
        <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[#f2f3f4] text-[14px] whitespace-nowrap">
          <p className="leading-[20px]">Updated</p>
        </div>
      </div>
      <p className="font-['Roboto:Regular',sans-serif] font-normal leading-[1.2] relative shrink-0 text-[#434343] text-[14px] whitespace-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>{`8/4/2024, 6:15 PM `}</p>
    </div>
  );
}

function Frame8() {
  return (
    <div className="content-stretch flex flex-col h-[62px] items-start relative shrink-0 w-full">
      <p className="font-['DM_Sans:Bold',sans-serif] font-bold leading-[normal] relative shrink-0 text-[#081f32] text-[24px] w-full" style={{ fontVariationSettings: "'opsz' 14" }}>
        Inertia Demo
      </p>
    </div>
  );
}

function Autodesk1() {
  return (
    <div className="bg-[#f0f0f3] col-1 ml-0 mt-0 overflow-clip relative rounded-[24px] row-1 size-[48px]" data-name="Autodesk">
      <div className="absolute left-[12px] size-[24px] top-[12.85px]" data-name="image 15">
        <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgImage15} />
      </div>
    </div>
  );
}

function Integrations1() {
  return (
    <div className="grid-cols-[max-content] grid-rows-[max-content] inline-grid leading-[0] place-items-start relative shrink-0" data-name="Integrations">
      <Autodesk1 />
    </div>
  );
}

function Frame9() {
  return (
    <div className="content-stretch flex items-center justify-between relative shrink-0 w-full">
      <Integrations1 />
      <div className="relative shrink-0 size-[24px]" data-name="24px/app/ellipsis-horizontal">
        <div className="absolute inset-[41.67%_8.33%_44.44%_8.33%]" data-name="Vector">
          <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 3.33333">
            <path d={svgPaths.p2fca5e70} fill="var(--fill-0, #616D79)" id="Vector" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function Frame6() {
  return (
    <div className="bg-white flex-[1_0_0] h-[200px] min-h-px min-w-px relative rounded-br-[24px] rounded-tr-[24px]">
      <div className="flex flex-col justify-center size-full">
        <div className="content-stretch flex flex-col gap-[12px] items-start justify-center p-[24px] relative size-full">
          <Frame7 />
          <Frame8 />
          <Frame9 />
        </div>
      </div>
    </div>
  );
}

function ProjectCardVertical2() {
  return (
    <div className="col-2 content-stretch flex items-start justify-self-stretch relative row-1 self-start shadow-[0px_1px_1px_0px_rgba(9,30,66,0.25),0px_0px_1px_0px_rgba(9,30,66,0.31)] shrink-0" data-name="Project Card Vertical">
      <Image2 />
      <Frame6 />
    </div>
  );
}

function MainBody() {
  return (
    <div className="bg-[#f2f3f4] flex-[1_0_0] min-h-px min-w-px relative w-full" data-name="Main body">
      <div className="overflow-clip rounded-[inherit] size-full">
        <div className="gap-x-[48px] gap-y-[48px] grid grid-cols-[repeat(3,minmax(0,1fr))] grid-rows-[repeat(3,minmax(0,1fr))] p-[48px] relative size-full">
          <ProjectCardVertical />
          <ProjectCardVertical1 />
          <ProjectCardVertical2 />
        </div>
      </div>
    </div>
  );
}

function Footer() {
  return (
    <div className="bg-[#f5f5f5] h-[20px] relative shadow-[0px_2px_0px_0px_#f0f0f3] shrink-0 w-full" data-name="Footer">
      <div className="flex flex-row items-center justify-center size-full">
        <div className="content-stretch flex items-center justify-center px-[72px] relative size-full">
          <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[#8a939d] text-[14px] whitespace-nowrap">
            <p className="leading-[20px]">© 2025 Inertia, Inc. All rights reserved</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Desktop1920X() {
  return (
    <div className="bg-[#f5f5f5] content-stretch flex flex-col gap-[2px] items-start relative size-full" data-name="Desktop - 1920 x 1112">
      <Container />
      <Header />
      <Header1 />
      <Header2 />
      <MainBody />
      <Footer />
    </div>
  );
}