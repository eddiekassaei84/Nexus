import svgPaths from "./svg-hyd2jiusgj";
import imgImg from "figma:asset/794abd9c4f9b76f694f72984f4426d292661a8d6.png";
import imgImg1 from "figma:asset/de5e422433a571d190e7c4d34a019906817d3b35.png";
import imgImg2 from "figma:asset/53682e1811779057bb44f23138e859ff4a897918.png";
import imgImage18 from "figma:asset/a873c1c375caa7b95b4c8eab9deb8cd0385b7857.png";

function Input() {
  return (
    <div className="absolute bg-white h-[35.99px] left-0 rounded-[4px] top-0 w-[380px]" data-name="input">
      <div className="content-stretch flex items-center overflow-clip pl-[34px] pr-[10px] relative rounded-[inherit] size-full">
        <p className="font-['Open_Sans:Regular',sans-serif] font-normal leading-[normal] relative shrink-0 text-[14px] text-[rgba(52,64,84,0.5)] whitespace-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
          Search projects by name or number
        </p>
      </div>
      <div aria-hidden="true" className="absolute border-[#d0d5dd] border-[1.111px] border-solid inset-0 pointer-events-none rounded-[4px]" />
    </div>
  );
}

function Svg() {
  return (
    <div className="h-[15.99px] overflow-clip relative shrink-0 w-full" data-name="svg">
      <div className="absolute bottom-1/4 left-[10%] right-1/4 top-[10%]" data-name="Vector">
        <div className="absolute inset-[-5.77%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 11.5924 11.5924">
            <path d={svgPaths.p12a6f200} id="Vector" stroke="var(--stroke-0, #9CA4AE)" strokeWidth="1.19922" />
          </svg>
        </div>
      </div>
      <div className="absolute inset-[67.5%_10%_10%_67.5%]" data-name="Vector">
        <div className="absolute inset-[-16.67%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 4.79688 4.79688">
            <path d={svgPaths.p24594400} id="Vector" stroke="var(--stroke-0, #9CA4AE)" strokeLinecap="round" strokeWidth="1.19922" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function Container4() {
  return (
    <div className="absolute content-stretch flex flex-col items-start left-[10px] size-[15.99px] top-[9.98px]" data-name="Container">
      <Svg />
    </div>
  );
}

function Container3() {
  return (
    <div className="h-[35.99px] relative shrink-0 w-[380px]" data-name="Container">
      <Input />
      <Container4 />
    </div>
  );
}

function Span() {
  return (
    <div className="h-[20px] relative shrink-0 w-[80.799px]" data-name="span">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start relative size-full">
        <p className="font-['Open_Sans:Regular',sans-serif] font-normal leading-[20px] relative shrink-0 text-[#616d79] text-[14px] text-center whitespace-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
          Grouped by:
        </p>
      </div>
    </div>
  );
}

function Span1() {
  return (
    <div className="h-[20px] relative shrink-0 w-[36.476px]" data-name="span">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start relative size-full">
        <p className="font-['Open_Sans:SemiBold',sans-serif] font-semibold leading-[20px] relative shrink-0 text-[#384857] text-[14px] text-center whitespace-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
          None
        </p>
      </div>
    </div>
  );
}

function Svg1() {
  return (
    <div className="relative shrink-0 size-[13.993px]" data-name="svg">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 13.9931 13.9931">
        <g id="svg">
          <path d={svgPaths.p93a74c0} id="Vector" stroke="var(--stroke-0, #616D79)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.49926" />
        </g>
      </svg>
    </div>
  );
}

function Button() {
  return (
    <div className="bg-[#f2f3f4] content-stretch flex gap-[3.993px] h-[35.99px] items-center pl-[17.101px] pr-[1.111px] py-[1.111px] relative rounded-[4px] shrink-0 w-[173.455px]" data-name="button">
      <div aria-hidden="true" className="absolute border-[#c3c7cc] border-[1.111px] border-solid inset-0 pointer-events-none rounded-[4px]" />
      <Span />
      <Span1 />
      <Svg1 />
    </div>
  );
}

function Frame() {
  return (
    <div className="relative shrink-0">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[8px] items-center relative">
        <Container3 />
        <Button />
      </div>
    </div>
  );
}

function Svg2() {
  return (
    <div className="absolute left-[15.99px] size-[20px] top-[7.99px]" data-name="svg">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g id="svg">
          <path d={svgPaths.p344e6f00} id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeWidth="1.5" />
        </g>
      </svg>
    </div>
  );
}

function Button1() {
  return (
    <div className="bg-[#ff4d00] h-[35.99px] relative rounded-[4px] shrink-0 w-[164.427px]" data-name="button">
      <Svg2 />
      <p className="-translate-x-1/2 absolute font-['Inter:Regular',sans-serif] font-normal leading-[20px] left-[94.48px] not-italic text-[14px] text-center text-white top-[8.1px] whitespace-nowrap">Add new project</p>
    </div>
  );
}

function Container5() {
  return (
    <div className="relative shrink-0" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center relative">
        <Button1 />
      </div>
    </div>
  );
}

function Container2() {
  return (
    <div className="absolute bg-[#fafafa] content-stretch flex h-[48px] items-center justify-between left-px pb-[1.111px] px-[11.997px] top-[0.92px] w-[1736px]" data-name="Container">
      <div aria-hidden="true" className="absolute border-[#f0f0f0] border-b-[1.111px] border-solid inset-0 pointer-events-none" />
      <Frame />
      <Container5 />
    </div>
  );
}

function Svg3() {
  return (
    <div className="relative shrink-0 size-[17.986px]" data-name="svg">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 17.9861 17.9861">
        <g clipPath="url(#clip0_2029_567)" id="svg">
          <path d={svgPaths.p35af8f80} fill="var(--fill-0, white)" id="Vector" />
          <path d={svgPaths.p35af8f80} id="Vector_2" stroke="var(--stroke-0, #D0D5DD)" strokeWidth="1.49884" />
        </g>
        <defs>
          <clipPath id="clip0_2029_567">
            <rect fill="white" height="17.9861" width="17.9861" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Button2() {
  return (
    <div className="relative rounded-[4px] shrink-0 size-[31.997px]" data-name="button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center pr-[0.017px] relative size-full">
        <Svg3 />
      </div>
    </div>
  );
}

function Container8() {
  return (
    <div className="absolute content-stretch flex h-[54.878px] items-center justify-center left-0 pr-[0.017px] top-0 w-[47.986px]" data-name="Container">
      <Button2 />
    </div>
  );
}

function Span2() {
  return (
    <div className="h-[16.51px] relative shrink-0 w-[12.726px]" data-name="span">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start relative size-full">
        <p className="font-['Open_Sans:SemiBold',sans-serif] font-semibold leading-[16.5px] relative shrink-0 text-[11px] text-white whitespace-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
          YT
        </p>
      </div>
    </div>
  );
}

function Container10() {
  return (
    <div className="bg-[#e67e22] relative rounded-[37282700px] shrink-0 size-[30px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center overflow-clip pr-[0.017px] relative rounded-[inherit] size-full">
        <Span2 />
      </div>
    </div>
  );
}

function Span3() {
  return (
    <div className="h-[19.497px] relative shrink-0 w-[118.681px]" data-name="span">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start overflow-clip relative rounded-[inherit] size-full">
        <p className="flex-[1_0_0] font-['Open_Sans:Regular',sans-serif] font-normal leading-[19.5px] min-h-px min-w-px relative text-[#1d2939] text-[13px]" style={{ fontVariationSettings: "'wdth' 100" }}>
          Yuki Tanaka
        </p>
      </div>
    </div>
  );
}

function Span4() {
  return (
    <div className="h-[16.51px] relative shrink-0 w-[118.681px]" data-name="span">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start overflow-clip relative rounded-[inherit] size-full">
        <p className="font-['Open_Sans:Regular',sans-serif] font-normal leading-[16.5px] relative shrink-0 text-[#667085] text-[11px] whitespace-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
          ytanaka@apexeng.com
        </p>
      </div>
    </div>
  );
}

function Container11() {
  return (
    <div className="h-[36.007px] relative shrink-0 w-[118.681px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative size-full">
        <Span3 />
        <Span4 />
      </div>
    </div>
  );
}

function Container9() {
  return (
    <div className="absolute content-stretch flex gap-[7.986px] h-[54.878px] items-center left-[47.99px] overflow-clip pl-[5.99px] top-0 w-[240px]" data-name="Container">
      <Container10 />
      <Container11 />
    </div>
  );
}

function Span5() {
  return (
    <div className="h-[19.497px] relative shrink-0 w-[110.59px]" data-name="span">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start overflow-clip relative rounded-[inherit] size-full">
        <p className="font-['Open_Sans:Regular',sans-serif] font-normal leading-[19.5px] relative shrink-0 text-[#262626] text-[13px] whitespace-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
          Geotech Specialist
        </p>
      </div>
    </div>
  );
}

function Container12() {
  return (
    <div className="absolute content-stretch flex h-[54.878px] items-center left-[287.99px] overflow-clip pl-[16.997px] top-0 w-[188.698px]" data-name="Container">
      <Span5 />
    </div>
  );
}

function Span6() {
  return (
    <div className="h-[19.497px] relative shrink-0 w-[140.399px]" data-name="span">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start overflow-clip relative rounded-[inherit] size-full">
        <p className="font-['Open_Sans:Regular',sans-serif] font-normal leading-[19.5px] relative shrink-0 text-[#262626] text-[13px] whitespace-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
          ytanaka@apexeng.com
        </p>
      </div>
    </div>
  );
}

function Container13() {
  return (
    <div className="absolute content-stretch flex h-[54.878px] items-center left-[476.68px] overflow-clip pl-[16.997px] top-0 w-[188.715px]" data-name="Container">
      <Span6 />
    </div>
  );
}

function Span7() {
  return (
    <div className="h-[19.497px] relative shrink-0 w-[105.399px]" data-name="span">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start overflow-clip relative rounded-[inherit] size-full">
        <p className="font-['Open_Sans:Regular',sans-serif] font-normal leading-[19.5px] relative shrink-0 text-[#262626] text-[13px] whitespace-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
          Apex Engineering
        </p>
      </div>
    </div>
  );
}

function Container14() {
  return (
    <div className="absolute content-stretch flex h-[54.878px] items-center left-[665.4px] overflow-clip pl-[16.997px] top-0 w-[188.698px]" data-name="Container">
      <Span7 />
    </div>
  );
}

function Span8() {
  return (
    <div className="h-[19.497px] relative shrink-0 w-[47.778px]" data-name="span">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start overflow-clip relative rounded-[inherit] size-full">
        <p className="font-['Open_Sans:Regular',sans-serif] font-normal leading-[19.5px] relative shrink-0 text-[#262626] text-[13px] whitespace-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
          Chicago
        </p>
      </div>
    </div>
  );
}

function Container15() {
  return (
    <div className="absolute content-stretch flex h-[54.878px] items-center left-[854.1px] overflow-clip pl-[16.997px] top-0 w-[188.715px]" data-name="Container">
      <Span8 />
    </div>
  );
}

function Span9() {
  return (
    <div className="h-[19.497px] relative shrink-0 w-[41.024px]" data-name="span">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start overflow-clip relative rounded-[inherit] size-full">
        <p className="font-['Open_Sans:Regular',sans-serif] font-normal leading-[19.5px] relative shrink-0 text-[#262626] text-[13px] whitespace-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
          Viewer
        </p>
      </div>
    </div>
  );
}

function Container16() {
  return (
    <div className="absolute content-stretch flex h-[54.878px] items-center left-[1042.81px] overflow-clip pl-[16.996px] top-0 w-[188.698px]" data-name="Container">
      <Span9 />
    </div>
  );
}

function Span10() {
  return (
    <div className="h-[19.497px] relative shrink-0 w-[97.378px]" data-name="span">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start overflow-clip relative rounded-[inherit] size-full">
        <p className="font-['Open_Sans:Regular',sans-serif] font-normal leading-[19.5px] relative shrink-0 text-[#262626] text-[13px] whitespace-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
          Project Member
        </p>
      </div>
    </div>
  );
}

function Container17() {
  return (
    <div className="absolute content-stretch flex h-[54.878px] items-center left-[1231.51px] overflow-clip pl-[16.997px] top-0 w-[188.698px]" data-name="Container">
      <Span10 />
    </div>
  );
}

function Span11() {
  return <div className="absolute bg-[#12b76a] left-[7px] rounded-[37282700px] size-[5px] top-[7.74px]" data-name="span" />;
}

function Button3() {
  return (
    <div className="bg-[#ecfdf3] h-[20.503px] relative rounded-[37282700px] shrink-0 w-[55.451px]" data-name="button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <Span11 />
        <p className="-translate-x-1/2 absolute font-['Open_Sans:Regular',sans-serif] font-normal leading-[16.5px] left-[33.5px] text-[#027a48] text-[11px] text-center top-px whitespace-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
          Active
        </p>
      </div>
    </div>
  );
}

function Container18() {
  return (
    <div className="absolute content-stretch flex h-[54.878px] items-center left-[1420.21px] overflow-clip pl-[16.996px] top-0 w-[188.698px]" data-name="Container">
      <Button3 />
    </div>
  );
}

function Container7() {
  return (
    <div className="absolute bg-white border-[#e5e7eb] border-b-[1.111px] border-solid h-[55.99px] left-0 top-[775.85px] w-[1668.906px]" data-name="Container">
      <Container8 />
      <Container9 />
      <Container12 />
      <Container13 />
      <Container14 />
      <Container15 />
      <Container16 />
      <Container17 />
      <Container18 />
    </div>
  );
}

function Svg4() {
  return (
    <div className="relative shrink-0 size-[17.986px]" data-name="svg">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 17.9861 17.9861">
        <g clipPath="url(#clip0_2029_567)" id="svg">
          <path d={svgPaths.p35af8f80} fill="var(--fill-0, white)" id="Vector" />
          <path d={svgPaths.p35af8f80} id="Vector_2" stroke="var(--stroke-0, #D0D5DD)" strokeWidth="1.49884" />
        </g>
        <defs>
          <clipPath id="clip0_2029_567">
            <rect fill="white" height="17.9861" width="17.9861" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Button4() {
  return (
    <div className="relative rounded-[4px] shrink-0 size-[31.997px]" data-name="button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center pr-[0.017px] relative size-full">
        <Svg4 />
      </div>
    </div>
  );
}

function Container20() {
  return (
    <div className="absolute content-stretch flex h-[54.878px] items-center justify-center left-0 pr-[0.017px] top-0 w-[47.986px]" data-name="Container">
      <Button4 />
    </div>
  );
}

function Span12() {
  return (
    <div className="h-[16.51px] relative shrink-0 w-[13.021px]" data-name="span">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start relative size-full">
        <p className="font-['Open_Sans:SemiBold',sans-serif] font-semibold leading-[16.5px] relative shrink-0 text-[11px] text-white whitespace-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
          CS
        </p>
      </div>
    </div>
  );
}

function Container22() {
  return (
    <div className="bg-[#1abc9c] relative rounded-[37282700px] shrink-0 size-[30px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center overflow-clip relative rounded-[inherit] size-full">
        <Span12 />
      </div>
    </div>
  );
}

function Span13() {
  return (
    <div className="h-[19.497px] relative shrink-0 w-[108.906px]" data-name="span">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start overflow-clip relative rounded-[inherit] size-full">
        <p className="flex-[1_0_0] font-['Open_Sans:Regular',sans-serif] font-normal leading-[19.5px] min-h-px min-w-px relative text-[#1d2939] text-[13px]" style={{ fontVariationSettings: "'wdth' 100" }}>
          Carlos Silva
        </p>
      </div>
    </div>
  );
}

function Span14() {
  return (
    <div className="h-[16.51px] relative shrink-0 w-[108.906px]" data-name="span">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start overflow-clip relative rounded-[inherit] size-full">
        <p className="font-['Open_Sans:Regular',sans-serif] font-normal leading-[16.5px] relative shrink-0 text-[#667085] text-[11px] whitespace-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
          carlos@apexeng.com
        </p>
      </div>
    </div>
  );
}

function Container23() {
  return (
    <div className="h-[36.007px] relative shrink-0 w-[108.906px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative size-full">
        <Span13 />
        <Span14 />
      </div>
    </div>
  );
}

function Container21() {
  return (
    <div className="absolute content-stretch flex gap-[7.986px] h-[54.878px] items-center left-[47.99px] overflow-clip pl-[5.99px] top-0 w-[240px]" data-name="Container">
      <Container22 />
      <Container23 />
    </div>
  );
}

function Span15() {
  return (
    <div className="h-[19.497px] relative shrink-0 w-[82.778px]" data-name="span">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start overflow-clip relative rounded-[inherit] size-full">
        <p className="font-['Open_Sans:Regular',sans-serif] font-normal leading-[19.5px] relative shrink-0 text-[#262626] text-[13px] whitespace-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
          Site Inspector
        </p>
      </div>
    </div>
  );
}

function Container24() {
  return (
    <div className="absolute content-stretch flex h-[54.878px] items-center left-[287.99px] overflow-clip pl-[16.997px] top-0 w-[188.698px]" data-name="Container">
      <Span15 />
    </div>
  );
}

function Span16() {
  return (
    <div className="h-[19.497px] relative shrink-0 w-[128.837px]" data-name="span">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start overflow-clip relative rounded-[inherit] size-full">
        <p className="font-['Open_Sans:Regular',sans-serif] font-normal leading-[19.5px] relative shrink-0 text-[#262626] text-[13px] whitespace-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
          carlos@apexeng.com
        </p>
      </div>
    </div>
  );
}

function Container25() {
  return (
    <div className="absolute content-stretch flex h-[54.878px] items-center left-[476.68px] overflow-clip pl-[16.997px] top-0 w-[188.715px]" data-name="Container">
      <Span16 />
    </div>
  );
}

function Span17() {
  return (
    <div className="h-[19.497px] relative shrink-0 w-[105.399px]" data-name="span">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start overflow-clip relative rounded-[inherit] size-full">
        <p className="font-['Open_Sans:Regular',sans-serif] font-normal leading-[19.5px] relative shrink-0 text-[#262626] text-[13px] whitespace-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
          Apex Engineering
        </p>
      </div>
    </div>
  );
}

function Container26() {
  return (
    <div className="absolute content-stretch flex h-[54.878px] items-center left-[665.4px] overflow-clip pl-[16.997px] top-0 w-[188.698px]" data-name="Container">
      <Span17 />
    </div>
  );
}

function Span18() {
  return (
    <div className="h-[19.497px] relative shrink-0 w-[57.778px]" data-name="span">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start overflow-clip relative rounded-[inherit] size-full">
        <p className="font-['Open_Sans:Regular',sans-serif] font-normal leading-[19.5px] relative shrink-0 text-[#262626] text-[13px] whitespace-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
          New York
        </p>
      </div>
    </div>
  );
}

function Container27() {
  return (
    <div className="absolute content-stretch flex h-[54.878px] items-center left-[854.1px] overflow-clip pl-[16.997px] top-0 w-[188.715px]" data-name="Container">
      <Span18 />
    </div>
  );
}

function Span19() {
  return (
    <div className="h-[19.497px] relative shrink-0 w-[39.479px]" data-name="span">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start overflow-clip relative rounded-[inherit] size-full">
        <p className="font-['Open_Sans:Regular',sans-serif] font-normal leading-[19.5px] relative shrink-0 text-[#262626] text-[13px] whitespace-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
          Admin
        </p>
      </div>
    </div>
  );
}

function Container28() {
  return (
    <div className="absolute content-stretch flex h-[54.878px] items-center left-[1042.81px] overflow-clip pl-[16.996px] top-0 w-[188.698px]" data-name="Container">
      <Span19 />
    </div>
  );
}

function Span20() {
  return (
    <div className="h-[19.497px] relative shrink-0 w-[85.243px]" data-name="span">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start overflow-clip relative rounded-[inherit] size-full">
        <p className="font-['Open_Sans:Regular',sans-serif] font-normal leading-[19.5px] relative shrink-0 text-[#262626] text-[13px] whitespace-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
          Project Admin
        </p>
      </div>
    </div>
  );
}

function Container29() {
  return (
    <div className="absolute content-stretch flex h-[54.878px] items-center left-[1231.51px] overflow-clip pl-[16.997px] top-0 w-[188.698px]" data-name="Container">
      <Span20 />
    </div>
  );
}

function Span21() {
  return <div className="absolute bg-[#ef4444] left-[7px] rounded-[37282700px] size-[5px] top-[7.74px]" data-name="span" />;
}

function Button5() {
  return (
    <div className="bg-[#fef2f2] h-[20.503px] relative rounded-[37282700px] shrink-0 w-[81.91px]" data-name="button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <Span21 />
        <p className="-translate-x-1/2 absolute font-['Open_Sans:Regular',sans-serif] font-normal leading-[16.5px] left-[46px] text-[#b91c1c] text-[11px] text-center top-px whitespace-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
          Suspended
        </p>
      </div>
    </div>
  );
}

function Container30() {
  return (
    <div className="absolute content-stretch flex h-[54.878px] items-center left-[1420.21px] overflow-clip pl-[16.996px] top-0 w-[188.698px]" data-name="Container">
      <Button5 />
    </div>
  );
}

function Container19() {
  return (
    <div className="absolute bg-white border-[#e5e7eb] border-b-[1.111px] border-solid h-[55.99px] left-0 top-[831.84px] w-[1668.906px]" data-name="Container">
      <Container20 />
      <Container21 />
      <Container24 />
      <Container25 />
      <Container26 />
      <Container27 />
      <Container28 />
      <Container29 />
      <Container30 />
    </div>
  );
}

function Svg5() {
  return (
    <div className="relative shrink-0 size-[17.986px]" data-name="svg">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 17.9861 17.9861">
        <g clipPath="url(#clip0_2029_567)" id="svg">
          <path d={svgPaths.p35af8f80} fill="var(--fill-0, white)" id="Vector" />
          <path d={svgPaths.p35af8f80} id="Vector_2" stroke="var(--stroke-0, #D0D5DD)" strokeWidth="1.49884" />
        </g>
        <defs>
          <clipPath id="clip0_2029_567">
            <rect fill="white" height="17.9861" width="17.9861" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Button6() {
  return (
    <div className="relative rounded-[4px] shrink-0 size-[31.997px]" data-name="button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center pr-[0.017px] relative size-full">
        <Svg5 />
      </div>
    </div>
  );
}

function Container32() {
  return (
    <div className="absolute content-stretch flex h-[54.878px] items-center justify-center left-0 pr-[0.017px] top-0 w-[47.986px]" data-name="Container">
      <Button6 />
    </div>
  );
}

function Span22() {
  return (
    <div className="h-[16.51px] relative shrink-0 w-[16.892px]" data-name="span">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start relative size-full">
        <p className="font-['Open_Sans:SemiBold',sans-serif] font-semibold leading-[16.5px] relative shrink-0 text-[11px] text-white whitespace-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
          MP
        </p>
      </div>
    </div>
  );
}

function Container34() {
  return (
    <div className="bg-[#e74c3c] relative rounded-[37282700px] shrink-0 size-[30px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center overflow-clip pr-[0.017px] relative rounded-[inherit] size-full">
        <Span22 />
      </div>
    </div>
  );
}

function Span23() {
  return (
    <div className="absolute content-stretch flex h-[19.497px] items-start left-0 overflow-clip top-0 w-[113.524px]" data-name="span">
      <p className="flex-[1_0_0] font-['Open_Sans:Regular',sans-serif] font-normal leading-[19.5px] min-h-px min-w-px relative text-[#1d2939] text-[13px]" style={{ fontVariationSettings: "'wdth' 100" }}>
        Maya Patel
      </p>
    </div>
  );
}

function Span24() {
  return (
    <div className="absolute content-stretch flex h-[16.51px] items-start left-0 overflow-clip top-[19.5px] w-[113.524px]" data-name="span">
      <p className="font-['Open_Sans:Regular',sans-serif] font-normal leading-[16.5px] relative shrink-0 text-[#667085] text-[11px] whitespace-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
        mpatel@cityworks.net
      </p>
    </div>
  );
}

function Container35() {
  return (
    <div className="h-[36.007px] relative shrink-0 w-[113.524px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <Span23 />
        <Span24 />
      </div>
    </div>
  );
}

function Container33() {
  return (
    <div className="absolute content-stretch flex gap-[7.986px] h-[54.878px] items-center left-[47.99px] overflow-clip pl-[5.99px] top-0 w-[240px]" data-name="Container">
      <Container34 />
      <Container35 />
    </div>
  );
}

function Span25() {
  return (
    <div className="h-[19.497px] relative shrink-0 w-[88.212px]" data-name="span">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start overflow-clip relative rounded-[inherit] size-full">
        <p className="font-['Open_Sans:Regular',sans-serif] font-normal leading-[19.5px] relative shrink-0 text-[#262626] text-[13px] whitespace-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
          Urban Planner
        </p>
      </div>
    </div>
  );
}

function Container36() {
  return (
    <div className="absolute content-stretch flex h-[54.878px] items-center left-[287.99px] overflow-clip pl-[16.997px] top-0 w-[188.698px]" data-name="Container">
      <Span25 />
    </div>
  );
}

function Span26() {
  return (
    <div className="h-[19.497px] relative shrink-0 w-[134.306px]" data-name="span">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start overflow-clip relative rounded-[inherit] size-full">
        <p className="font-['Open_Sans:Regular',sans-serif] font-normal leading-[19.5px] relative shrink-0 text-[#262626] text-[13px] whitespace-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
          mpatel@cityworks.net
        </p>
      </div>
    </div>
  );
}

function Container37() {
  return (
    <div className="absolute content-stretch flex h-[54.878px] items-center left-[476.68px] overflow-clip pl-[16.997px] top-0 w-[188.715px]" data-name="Container">
      <Span26 />
    </div>
  );
}

function Span27() {
  return (
    <div className="h-[19.497px] relative shrink-0 w-[60.781px]" data-name="span">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start overflow-clip relative rounded-[inherit] size-full">
        <p className="font-['Open_Sans:Regular',sans-serif] font-normal leading-[19.5px] relative shrink-0 text-[#262626] text-[13px] whitespace-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
          CityWorks
        </p>
      </div>
    </div>
  );
}

function Container38() {
  return (
    <div className="absolute content-stretch flex h-[54.878px] items-center left-[665.4px] overflow-clip pl-[16.997px] top-0 w-[188.698px]" data-name="Container">
      <Span27 />
    </div>
  );
}

function Span28() {
  return (
    <div className="h-[19.497px] relative shrink-0 w-[42.847px]" data-name="span">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start overflow-clip relative rounded-[inherit] size-full">
        <p className="font-['Open_Sans:Regular',sans-serif] font-normal leading-[19.5px] relative shrink-0 text-[#262626] text-[13px] whitespace-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
          Boston
        </p>
      </div>
    </div>
  );
}

function Container39() {
  return (
    <div className="absolute content-stretch flex h-[54.878px] items-center left-[854.1px] overflow-clip pl-[16.997px] top-0 w-[188.715px]" data-name="Container">
      <Span28 />
    </div>
  );
}

function Span29() {
  return (
    <div className="h-[19.497px] relative shrink-0 w-[36.233px]" data-name="span">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start overflow-clip relative rounded-[inherit] size-full">
        <p className="font-['Open_Sans:Regular',sans-serif] font-normal leading-[19.5px] relative shrink-0 text-[#262626] text-[13px] whitespace-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
          Editor
        </p>
      </div>
    </div>
  );
}

function Container40() {
  return (
    <div className="absolute content-stretch flex h-[54.878px] items-center left-[1042.81px] overflow-clip pl-[16.996px] top-0 w-[188.698px]" data-name="Container">
      <Span29 />
    </div>
  );
}

function Span30() {
  return (
    <div className="h-[19.497px] relative shrink-0 w-[97.378px]" data-name="span">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start overflow-clip relative rounded-[inherit] size-full">
        <p className="font-['Open_Sans:Regular',sans-serif] font-normal leading-[19.5px] relative shrink-0 text-[#262626] text-[13px] whitespace-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
          Project Member
        </p>
      </div>
    </div>
  );
}

function Container41() {
  return (
    <div className="absolute content-stretch flex h-[54.878px] items-center left-[1231.51px] overflow-clip pl-[16.997px] top-0 w-[188.698px]" data-name="Container">
      <Span30 />
    </div>
  );
}

function Span31() {
  return <div className="absolute bg-[#12b76a] left-[7px] rounded-[37282700px] size-[5px] top-[7.74px]" data-name="span" />;
}

function Button7() {
  return (
    <div className="bg-[#ecfdf3] h-[20.503px] relative rounded-[37282700px] shrink-0 w-[55.451px]" data-name="button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <Span31 />
        <p className="-translate-x-1/2 absolute font-['Open_Sans:Regular',sans-serif] font-normal leading-[16.5px] left-[33.5px] text-[#027a48] text-[11px] text-center top-px whitespace-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
          Active
        </p>
      </div>
    </div>
  );
}

function Container42() {
  return (
    <div className="absolute content-stretch flex h-[54.878px] items-center left-[1420.21px] overflow-clip pl-[16.996px] top-0 w-[188.698px]" data-name="Container">
      <Button7 />
    </div>
  );
}

function Container31() {
  return (
    <div className="absolute bg-white border-[#e5e7eb] border-b-[1.111px] border-solid h-[55.99px] left-0 top-[887.83px] w-[1668.906px]" data-name="Container">
      <Container32 />
      <Container33 />
      <Container36 />
      <Container37 />
      <Container38 />
      <Container39 />
      <Container40 />
      <Container41 />
      <Container42 />
    </div>
  );
}

function Svg6() {
  return (
    <div className="relative shrink-0 size-[17.986px]" data-name="svg">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 17.9861 17.9861">
        <g clipPath="url(#clip0_2029_567)" id="svg">
          <path d={svgPaths.p35af8f80} fill="var(--fill-0, white)" id="Vector" />
          <path d={svgPaths.p35af8f80} id="Vector_2" stroke="var(--stroke-0, #D0D5DD)" strokeWidth="1.49884" />
        </g>
        <defs>
          <clipPath id="clip0_2029_567">
            <rect fill="white" height="17.9861" width="17.9861" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Button8() {
  return (
    <div className="relative rounded-[4px] shrink-0 size-[31.997px]" data-name="button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center pr-[0.017px] relative size-full">
        <Svg6 />
      </div>
    </div>
  );
}

function Container44() {
  return (
    <div className="absolute content-stretch flex h-[54.878px] items-center justify-center left-0 pr-[0.017px] top-0 w-[47.986px]" data-name="Container">
      <Button8 />
    </div>
  );
}

function Span32() {
  return (
    <div className="h-[16.51px] relative shrink-0 w-[15.503px]" data-name="span">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start relative size-full">
        <p className="font-['Open_Sans:SemiBold',sans-serif] font-semibold leading-[16.5px] relative shrink-0 text-[11px] text-white whitespace-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
          BH
        </p>
      </div>
    </div>
  );
}

function Container46() {
  return (
    <div className="bg-[#34495e] relative rounded-[37282700px] shrink-0 size-[30px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center overflow-clip pr-[0.017px] relative rounded-[inherit] size-full">
        <Span32 />
      </div>
    </div>
  );
}

function Span33() {
  return (
    <div className="h-[19.497px] relative shrink-0 w-[106.927px]" data-name="span">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start overflow-clip relative rounded-[inherit] size-full">
        <p className="flex-[1_0_0] font-['Open_Sans:Regular',sans-serif] font-normal leading-[19.5px] min-h-px min-w-px relative text-[#1d2939] text-[13px]" style={{ fontVariationSettings: "'wdth' 100" }}>
          Ben Harlow
        </p>
      </div>
    </div>
  );
}

function Span34() {
  return (
    <div className="h-[16.51px] relative shrink-0 w-[106.927px]" data-name="span">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start overflow-clip relative rounded-[inherit] size-full">
        <p className="font-['Open_Sans:Regular',sans-serif] font-normal leading-[16.5px] relative shrink-0 text-[#667085] text-[11px] whitespace-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
          ben.h@cityworks.net
        </p>
      </div>
    </div>
  );
}

function Container47() {
  return (
    <div className="h-[36.007px] relative shrink-0 w-[106.927px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative size-full">
        <Span33 />
        <Span34 />
      </div>
    </div>
  );
}

function Container45() {
  return (
    <div className="absolute content-stretch flex gap-[7.986px] h-[54.878px] items-center left-[47.99px] overflow-clip pl-[5.99px] top-0 w-[240px]" data-name="Container">
      <Container46 />
      <Container47 />
    </div>
  );
}

function Span35() {
  return (
    <div className="h-[19.497px] relative shrink-0 w-[106.979px]" data-name="span">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start overflow-clip relative rounded-[inherit] size-full">
        <p className="font-['Open_Sans:Regular',sans-serif] font-normal leading-[19.5px] relative shrink-0 text-[#262626] text-[13px] whitespace-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
          Infrastructure PM
        </p>
      </div>
    </div>
  );
}

function Container48() {
  return (
    <div className="absolute content-stretch flex h-[54.878px] items-center left-[287.99px] overflow-clip pl-[16.997px] top-0 w-[188.698px]" data-name="Container">
      <Span35 />
    </div>
  );
}

function Span36() {
  return (
    <div className="h-[19.497px] relative shrink-0 w-[126.493px]" data-name="span">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start overflow-clip relative rounded-[inherit] size-full">
        <p className="font-['Open_Sans:Regular',sans-serif] font-normal leading-[19.5px] relative shrink-0 text-[#262626] text-[13px] whitespace-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
          ben.h@cityworks.net
        </p>
      </div>
    </div>
  );
}

function Container49() {
  return (
    <div className="absolute content-stretch flex h-[54.878px] items-center left-[476.68px] overflow-clip pl-[16.997px] top-0 w-[188.715px]" data-name="Container">
      <Span36 />
    </div>
  );
}

function Span37() {
  return (
    <div className="h-[19.497px] relative shrink-0 w-[60.781px]" data-name="span">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start overflow-clip relative rounded-[inherit] size-full">
        <p className="font-['Open_Sans:Regular',sans-serif] font-normal leading-[19.5px] relative shrink-0 text-[#262626] text-[13px] whitespace-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
          CityWorks
        </p>
      </div>
    </div>
  );
}

function Container50() {
  return (
    <div className="absolute content-stretch flex h-[54.878px] items-center left-[665.4px] overflow-clip pl-[16.997px] top-0 w-[188.698px]" data-name="Container">
      <Span37 />
    </div>
  );
}

function Span38() {
  return (
    <div className="h-[19.497px] relative shrink-0 w-[52.014px]" data-name="span">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start overflow-clip relative rounded-[inherit] size-full">
        <p className="font-['Open_Sans:Regular',sans-serif] font-normal leading-[19.5px] relative shrink-0 text-[#262626] text-[13px] whitespace-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
          Houston
        </p>
      </div>
    </div>
  );
}

function Container51() {
  return (
    <div className="absolute content-stretch flex h-[54.878px] items-center left-[854.1px] overflow-clip pl-[16.997px] top-0 w-[188.715px]" data-name="Container">
      <Span38 />
    </div>
  );
}

function Span39() {
  return (
    <div className="h-[19.497px] relative shrink-0 w-[40.781px]" data-name="span">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start overflow-clip relative rounded-[inherit] size-full">
        <p className="font-['Open_Sans:Regular',sans-serif] font-normal leading-[19.5px] relative shrink-0 text-[#262626] text-[13px] whitespace-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
          Owner
        </p>
      </div>
    </div>
  );
}

function Container52() {
  return (
    <div className="absolute content-stretch flex h-[54.878px] items-center left-[1042.81px] overflow-clip pl-[16.996px] top-0 w-[188.698px]" data-name="Container">
      <Span39 />
    </div>
  );
}

function Span40() {
  return (
    <div className="h-[19.497px] relative shrink-0 w-[85.243px]" data-name="span">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start overflow-clip relative rounded-[inherit] size-full">
        <p className="font-['Open_Sans:Regular',sans-serif] font-normal leading-[19.5px] relative shrink-0 text-[#262626] text-[13px] whitespace-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
          Project Admin
        </p>
      </div>
    </div>
  );
}

function Container53() {
  return (
    <div className="absolute content-stretch flex h-[54.878px] items-center left-[1231.51px] overflow-clip pl-[16.997px] top-0 w-[188.698px]" data-name="Container">
      <Span40 />
    </div>
  );
}

function Span41() {
  return <div className="absolute bg-[#6172f3] left-[7px] rounded-[37282700px] size-[5px] top-[7.74px]" data-name="span" />;
}

function Button9() {
  return (
    <div className="bg-[#eff8ff] h-[20.503px] relative rounded-[37282700px] shrink-0 w-[118.872px]" data-name="button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <Span41 />
        <p className="-translate-x-1/2 absolute font-['Open_Sans:Regular',sans-serif] font-normal leading-[16.5px] left-[64.5px] text-[#175cd3] text-[11px] text-center top-px whitespace-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
          Pending Invitation
        </p>
      </div>
    </div>
  );
}

function Container54() {
  return (
    <div className="absolute content-stretch flex h-[54.878px] items-center left-[1420.21px] overflow-clip pl-[16.996px] top-0 w-[188.698px]" data-name="Container">
      <Button9 />
    </div>
  );
}

function Container43() {
  return (
    <div className="absolute bg-white border-[#e5e7eb] border-b-[1.111px] border-solid h-[55.99px] left-0 top-[943.82px] w-[1668.906px]" data-name="Container">
      <Container44 />
      <Container45 />
      <Container48 />
      <Container49 />
      <Container50 />
      <Container51 />
      <Container52 />
      <Container53 />
      <Container54 />
    </div>
  );
}

function Svg7() {
  return (
    <div className="relative shrink-0 size-[17.986px]" data-name="svg">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 17.9861 17.9861">
        <g clipPath="url(#clip0_2029_567)" id="svg">
          <path d={svgPaths.p35af8f80} fill="var(--fill-0, white)" id="Vector" />
          <path d={svgPaths.p35af8f80} id="Vector_2" stroke="var(--stroke-0, #D0D5DD)" strokeWidth="1.49884" />
        </g>
        <defs>
          <clipPath id="clip0_2029_567">
            <rect fill="white" height="17.9861" width="17.9861" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Button10() {
  return (
    <div className="relative rounded-[4px] shrink-0 size-[31.997px]" data-name="button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center pr-[0.017px] relative size-full">
        <Svg7 />
      </div>
    </div>
  );
}

function Container56() {
  return (
    <div className="absolute content-stretch flex h-[54.878px] items-center justify-center left-0 pr-[0.017px] top-0 w-[47.986px]" data-name="Container">
      <Button10 />
    </div>
  );
}

function Span42() {
  return (
    <div className="h-[16.51px] relative shrink-0 w-[10.208px]" data-name="span">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start relative size-full">
        <p className="font-['Open_Sans:SemiBold',sans-serif] font-semibold leading-[16.5px] relative shrink-0 text-[11px] text-white whitespace-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
          IV
        </p>
      </div>
    </div>
  );
}

function Container58() {
  return (
    <div className="bg-[#16a085] relative rounded-[37282700px] shrink-0 size-[30px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center overflow-clip relative rounded-[inherit] size-full">
        <Span42 />
      </div>
    </div>
  );
}

function Span43() {
  return (
    <div className="h-[19.497px] relative shrink-0 w-[110.208px]" data-name="span">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start overflow-clip relative rounded-[inherit] size-full">
        <p className="flex-[1_0_0] font-['Open_Sans:Regular',sans-serif] font-normal leading-[19.5px] min-h-px min-w-px relative text-[#1d2939] text-[13px]" style={{ fontVariationSettings: "'wdth' 100" }}>
          Iris Vance
        </p>
      </div>
    </div>
  );
}

function Span44() {
  return (
    <div className="h-[16.51px] relative shrink-0 w-[110.208px]" data-name="span">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start overflow-clip relative rounded-[inherit] size-full">
        <p className="font-['Open_Sans:Regular',sans-serif] font-normal leading-[16.5px] relative shrink-0 text-[#667085] text-[11px] whitespace-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
          ivance@cityworks.net
        </p>
      </div>
    </div>
  );
}

function Container59() {
  return (
    <div className="h-[36.007px] relative shrink-0 w-[110.208px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative size-full">
        <Span43 />
        <Span44 />
      </div>
    </div>
  );
}

function Container57() {
  return (
    <div className="absolute content-stretch flex gap-[7.986px] h-[54.878px] items-center left-[47.99px] overflow-clip pl-[5.99px] top-0 w-[240px]" data-name="Container">
      <Container58 />
      <Container59 />
    </div>
  );
}

function Span45() {
  return (
    <div className="h-[19.497px] relative shrink-0 w-[111.615px]" data-name="span">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start overflow-clip relative rounded-[inherit] size-full">
        <p className="font-['Open_Sans:Regular',sans-serif] font-normal leading-[19.5px] relative shrink-0 text-[#262626] text-[13px] whitespace-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
          Drainage Engineer
        </p>
      </div>
    </div>
  );
}

function Container60() {
  return (
    <div className="absolute content-stretch flex h-[54.878px] items-center left-[287.99px] overflow-clip pl-[16.997px] top-0 w-[188.698px]" data-name="Container">
      <Span45 />
    </div>
  );
}

function Span46() {
  return (
    <div className="h-[19.497px] relative shrink-0 w-[130.365px]" data-name="span">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start overflow-clip relative rounded-[inherit] size-full">
        <p className="font-['Open_Sans:Regular',sans-serif] font-normal leading-[19.5px] relative shrink-0 text-[#262626] text-[13px] whitespace-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
          ivance@cityworks.net
        </p>
      </div>
    </div>
  );
}

function Container61() {
  return (
    <div className="absolute content-stretch flex h-[54.878px] items-center left-[476.68px] overflow-clip pl-[16.997px] top-0 w-[188.715px]" data-name="Container">
      <Span46 />
    </div>
  );
}

function Span47() {
  return (
    <div className="h-[19.497px] relative shrink-0 w-[60.781px]" data-name="span">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start overflow-clip relative rounded-[inherit] size-full">
        <p className="font-['Open_Sans:Regular',sans-serif] font-normal leading-[19.5px] relative shrink-0 text-[#262626] text-[13px] whitespace-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
          CityWorks
        </p>
      </div>
    </div>
  );
}

function Container62() {
  return (
    <div className="absolute content-stretch flex h-[54.878px] items-center left-[665.4px] overflow-clip pl-[16.997px] top-0 w-[188.698px]" data-name="Container">
      <Span47 />
    </div>
  );
}

function Span48() {
  return (
    <div className="h-[19.497px] relative shrink-0 w-[41.51px]" data-name="span">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start overflow-clip relative rounded-[inherit] size-full">
        <p className="font-['Open_Sans:Regular',sans-serif] font-normal leading-[19.5px] relative shrink-0 text-[#262626] text-[13px] whitespace-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
          Seattle
        </p>
      </div>
    </div>
  );
}

function Container63() {
  return (
    <div className="absolute content-stretch flex h-[54.878px] items-center left-[854.1px] overflow-clip pl-[16.997px] top-0 w-[188.715px]" data-name="Container">
      <Span48 />
    </div>
  );
}

function Span49() {
  return (
    <div className="h-[19.497px] relative shrink-0 w-[41.024px]" data-name="span">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start overflow-clip relative rounded-[inherit] size-full">
        <p className="font-['Open_Sans:Regular',sans-serif] font-normal leading-[19.5px] relative shrink-0 text-[#262626] text-[13px] whitespace-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
          Viewer
        </p>
      </div>
    </div>
  );
}

function Container64() {
  return (
    <div className="absolute content-stretch flex h-[54.878px] items-center left-[1042.81px] overflow-clip pl-[16.996px] top-0 w-[188.698px]" data-name="Container">
      <Span49 />
    </div>
  );
}

function Span50() {
  return (
    <div className="h-[19.497px] relative shrink-0 w-[97.378px]" data-name="span">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start overflow-clip relative rounded-[inherit] size-full">
        <p className="font-['Open_Sans:Regular',sans-serif] font-normal leading-[19.5px] relative shrink-0 text-[#262626] text-[13px] whitespace-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
          Project Member
        </p>
      </div>
    </div>
  );
}

function Container65() {
  return (
    <div className="absolute content-stretch flex h-[54.878px] items-center left-[1231.51px] overflow-clip pl-[16.997px] top-0 w-[188.698px]" data-name="Container">
      <Span50 />
    </div>
  );
}

function Span51() {
  return <div className="absolute bg-[#ef4444] left-[7px] rounded-[37282700px] size-[5px] top-[7.74px]" data-name="span" />;
}

function Button11() {
  return (
    <div className="bg-[#fef2f2] h-[20.503px] relative rounded-[37282700px] shrink-0 w-[81.91px]" data-name="button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <Span51 />
        <p className="-translate-x-1/2 absolute font-['Open_Sans:Regular',sans-serif] font-normal leading-[16.5px] left-[46px] text-[#b91c1c] text-[11px] text-center top-px whitespace-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
          Suspended
        </p>
      </div>
    </div>
  );
}

function Container66() {
  return (
    <div className="absolute content-stretch flex h-[54.878px] items-center left-[1420.21px] overflow-clip pl-[16.996px] top-0 w-[188.698px]" data-name="Container">
      <Button11 />
    </div>
  );
}

function Container55() {
  return (
    <div className="absolute bg-white border-[#e5e7eb] border-b-[1.111px] border-solid h-[55.99px] left-0 top-[999.81px] w-[1668.906px]" data-name="Container">
      <Container56 />
      <Container57 />
      <Container60 />
      <Container61 />
      <Container62 />
      <Container63 />
      <Container64 />
      <Container65 />
      <Container66 />
    </div>
  );
}

function Svg8() {
  return (
    <div className="relative shrink-0 size-[17.986px]" data-name="svg">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 17.9861 17.9861">
        <g clipPath="url(#clip0_2029_567)" id="svg">
          <path d={svgPaths.p35af8f80} fill="var(--fill-0, white)" id="Vector" />
          <path d={svgPaths.p35af8f80} id="Vector_2" stroke="var(--stroke-0, #D0D5DD)" strokeWidth="1.49884" />
        </g>
        <defs>
          <clipPath id="clip0_2029_567">
            <rect fill="white" height="17.9861" width="17.9861" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Button12() {
  return (
    <div className="relative rounded-[4px] shrink-0 size-[31.997px]" data-name="button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center pr-[0.017px] relative size-full">
        <Svg8 />
      </div>
    </div>
  );
}

function Container68() {
  return (
    <div className="absolute content-stretch flex h-[54.878px] items-center justify-center left-0 pr-[0.017px] top-0 w-[47.986px]" data-name="Container">
      <Button12 />
    </div>
  );
}

function Span52() {
  return (
    <div className="h-[16.51px] relative shrink-0 w-[15.903px]" data-name="span">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start relative size-full">
        <p className="font-['Open_Sans:SemiBold',sans-serif] font-semibold leading-[16.5px] relative shrink-0 text-[11px] text-white whitespace-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
          OB
        </p>
      </div>
    </div>
  );
}

function Container70() {
  return (
    <div className="bg-[#8e44ad] relative rounded-[37282700px] shrink-0 size-[30px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center overflow-clip relative rounded-[inherit] size-full">
        <Span52 />
      </div>
    </div>
  );
}

function Span53() {
  return (
    <div className="absolute content-stretch flex h-[19.497px] items-start left-0 overflow-clip top-0 w-[134.427px]" data-name="span">
      <p className="flex-[1_0_0] font-['Open_Sans:Regular',sans-serif] font-normal leading-[19.5px] min-h-px min-w-px relative text-[#1d2939] text-[13px]" style={{ fontVariationSettings: "'wdth' 100" }}>
        Owen Burke
      </p>
    </div>
  );
}

function Span54() {
  return (
    <div className="absolute content-stretch flex h-[16.51px] items-start left-0 overflow-clip top-[19.5px] w-[134.427px]" data-name="span">
      <p className="font-['Open_Sans:Regular',sans-serif] font-normal leading-[16.5px] relative shrink-0 text-[#667085] text-[11px] whitespace-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
        oburke@meridiangrp.com
      </p>
    </div>
  );
}

function Container71() {
  return (
    <div className="h-[36.007px] relative shrink-0 w-[134.427px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <Span53 />
        <Span54 />
      </div>
    </div>
  );
}

function Container69() {
  return (
    <div className="absolute content-stretch flex gap-[7.986px] h-[54.878px] items-center left-[47.99px] overflow-clip pl-[5.99px] top-0 w-[240px]" data-name="Container">
      <Container70 />
      <Container71 />
    </div>
  );
}

function Span55() {
  return (
    <div className="h-[19.497px] relative shrink-0 w-[115.382px]" data-name="span">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start overflow-clip relative rounded-[inherit] size-full">
        <p className="font-['Open_Sans:Regular',sans-serif] font-normal leading-[19.5px] relative shrink-0 text-[#262626] text-[13px] whitespace-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
          Contracts Manager
        </p>
      </div>
    </div>
  );
}

function Container72() {
  return (
    <div className="absolute content-stretch flex h-[54.878px] items-center left-[287.99px] overflow-clip pl-[16.997px] top-0 w-[188.698px]" data-name="Container">
      <Span55 />
    </div>
  );
}

function Span56() {
  return (
    <div className="h-[19.497px] relative shrink-0 w-[159.028px]" data-name="span">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start overflow-clip relative rounded-[inherit] size-full">
        <p className="font-['Open_Sans:Regular',sans-serif] font-normal leading-[19.5px] relative shrink-0 text-[#262626] text-[13px] whitespace-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
          oburke@meridiangrp.com
        </p>
      </div>
    </div>
  );
}

function Container73() {
  return (
    <div className="absolute content-stretch flex h-[54.878px] items-center left-[476.68px] overflow-clip pl-[16.997px] top-0 w-[188.715px]" data-name="Container">
      <Span56 />
    </div>
  );
}

function Span57() {
  return (
    <div className="h-[19.497px] relative shrink-0 w-[95.92px]" data-name="span">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start overflow-clip relative rounded-[inherit] size-full">
        <p className="font-['Open_Sans:Regular',sans-serif] font-normal leading-[19.5px] relative shrink-0 text-[#262626] text-[13px] whitespace-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
          Meridian Group
        </p>
      </div>
    </div>
  );
}

function Container74() {
  return (
    <div className="absolute content-stretch flex h-[54.878px] items-center left-[665.4px] overflow-clip pl-[16.997px] top-0 w-[188.698px]" data-name="Container">
      <Span57 />
    </div>
  );
}

function Span58() {
  return (
    <div className="h-[19.497px] relative shrink-0 w-[57.778px]" data-name="span">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start overflow-clip relative rounded-[inherit] size-full">
        <p className="font-['Open_Sans:Regular',sans-serif] font-normal leading-[19.5px] relative shrink-0 text-[#262626] text-[13px] whitespace-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
          New York
        </p>
      </div>
    </div>
  );
}

function Container75() {
  return (
    <div className="absolute content-stretch flex h-[54.878px] items-center left-[854.1px] overflow-clip pl-[16.997px] top-0 w-[188.715px]" data-name="Container">
      <Span58 />
    </div>
  );
}

function Span59() {
  return (
    <div className="h-[19.497px] relative shrink-0 w-[99.566px]" data-name="span">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start overflow-clip relative rounded-[inherit] size-full">
        <p className="font-['Open_Sans:Regular',sans-serif] font-normal leading-[19.5px] relative shrink-0 text-[#262626] text-[13px] whitespace-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
          Project Manager
        </p>
      </div>
    </div>
  );
}

function Container76() {
  return (
    <div className="absolute content-stretch flex h-[54.878px] items-center left-[1042.81px] overflow-clip pl-[16.996px] top-0 w-[188.698px]" data-name="Container">
      <Span59 />
    </div>
  );
}

function Span60() {
  return (
    <div className="h-[19.497px] relative shrink-0 w-[85.243px]" data-name="span">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start overflow-clip relative rounded-[inherit] size-full">
        <p className="font-['Open_Sans:Regular',sans-serif] font-normal leading-[19.5px] relative shrink-0 text-[#262626] text-[13px] whitespace-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
          Project Admin
        </p>
      </div>
    </div>
  );
}

function Container77() {
  return (
    <div className="absolute content-stretch flex h-[54.878px] items-center left-[1231.51px] overflow-clip pl-[16.997px] top-0 w-[188.698px]" data-name="Container">
      <Span60 />
    </div>
  );
}

function Span61() {
  return <div className="absolute bg-[#12b76a] left-[7px] rounded-[37282700px] size-[5px] top-[7.74px]" data-name="span" />;
}

function Button13() {
  return (
    <div className="bg-[#ecfdf3] h-[20.503px] relative rounded-[37282700px] shrink-0 w-[55.451px]" data-name="button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <Span61 />
        <p className="-translate-x-1/2 absolute font-['Open_Sans:Regular',sans-serif] font-normal leading-[16.5px] left-[33.5px] text-[#027a48] text-[11px] text-center top-px whitespace-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
          Active
        </p>
      </div>
    </div>
  );
}

function Container78() {
  return (
    <div className="absolute content-stretch flex h-[54.878px] items-center left-[1420.21px] overflow-clip pl-[16.996px] top-0 w-[188.698px]" data-name="Container">
      <Button13 />
    </div>
  );
}

function Container67() {
  return (
    <div className="absolute bg-white border-[#e5e7eb] border-b-[1.111px] border-solid h-[55.99px] left-0 top-[1055.8px] w-[1668.906px]" data-name="Container">
      <Container68 />
      <Container69 />
      <Container72 />
      <Container73 />
      <Container74 />
      <Container75 />
      <Container76 />
      <Container77 />
      <Container78 />
    </div>
  );
}

function Svg9() {
  return (
    <div className="relative shrink-0 size-[17.986px]" data-name="svg">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 17.9861 17.9861">
        <g clipPath="url(#clip0_2029_567)" id="svg">
          <path d={svgPaths.p35af8f80} fill="var(--fill-0, white)" id="Vector" />
          <path d={svgPaths.p35af8f80} id="Vector_2" stroke="var(--stroke-0, #D0D5DD)" strokeWidth="1.49884" />
        </g>
        <defs>
          <clipPath id="clip0_2029_567">
            <rect fill="white" height="17.9861" width="17.9861" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Button14() {
  return (
    <div className="relative rounded-[4px] shrink-0 size-[31.997px]" data-name="button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center pr-[0.017px] relative size-full">
        <Svg9 />
      </div>
    </div>
  );
}

function Container80() {
  return (
    <div className="absolute content-stretch flex h-[54.878px] items-center justify-center left-0 pr-[0.017px] top-0 w-[47.986px]" data-name="Container">
      <Button14 />
    </div>
  );
}

function Span62() {
  return (
    <div className="h-[16.51px] relative shrink-0 w-[13.125px]" data-name="span">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start relative size-full">
        <p className="font-['Open_Sans:SemiBold',sans-serif] font-semibold leading-[16.5px] relative shrink-0 text-[11px] text-white whitespace-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
          FA
        </p>
      </div>
    </div>
  );
}

function Container82() {
  return (
    <div className="bg-[#3b5998] relative rounded-[37282700px] shrink-0 size-[30px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center overflow-clip relative rounded-[inherit] size-full">
        <Span62 />
      </div>
    </div>
  );
}

function Span63() {
  return (
    <div className="h-[19.497px] relative shrink-0 w-[130.694px]" data-name="span">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start overflow-clip relative rounded-[inherit] size-full">
        <p className="flex-[1_0_0] font-['Open_Sans:Regular',sans-serif] font-normal leading-[19.5px] min-h-px min-w-px relative text-[#1d2939] text-[13px]" style={{ fontVariationSettings: "'wdth' 100" }}>
          Fatima Al-Rashid
        </p>
      </div>
    </div>
  );
}

function Span64() {
  return (
    <div className="h-[16.51px] relative shrink-0 w-[130.694px]" data-name="span">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start overflow-clip relative rounded-[inherit] size-full">
        <p className="font-['Open_Sans:Regular',sans-serif] font-normal leading-[16.5px] relative shrink-0 text-[#667085] text-[11px] whitespace-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
          fatima@meridiangrp.com
        </p>
      </div>
    </div>
  );
}

function Container83() {
  return (
    <div className="h-[36.007px] relative shrink-0 w-[130.694px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative size-full">
        <Span63 />
        <Span64 />
      </div>
    </div>
  );
}

function Container81() {
  return (
    <div className="absolute content-stretch flex gap-[7.986px] h-[54.878px] items-center left-[47.99px] overflow-clip pl-[5.99px] top-0 w-[240px]" data-name="Container">
      <Container82 />
      <Container83 />
    </div>
  );
}

function Span65() {
  return (
    <div className="h-[19.497px] relative shrink-0 w-[71.753px]" data-name="span">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start overflow-clip relative rounded-[inherit] size-full">
        <p className="font-['Open_Sans:Regular',sans-serif] font-normal leading-[19.5px] relative shrink-0 text-[#262626] text-[13px] whitespace-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
          Risk Analyst
        </p>
      </div>
    </div>
  );
}

function Container84() {
  return (
    <div className="absolute content-stretch flex h-[54.878px] items-center left-[287.99px] overflow-clip pl-[16.997px] top-0 w-[188.698px]" data-name="Container">
      <Span65 />
    </div>
  );
}

function Span66() {
  return (
    <div className="h-[19.497px] relative shrink-0 w-[154.618px]" data-name="span">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start overflow-clip relative rounded-[inherit] size-full">
        <p className="font-['Open_Sans:Regular',sans-serif] font-normal leading-[19.5px] relative shrink-0 text-[#262626] text-[13px] whitespace-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
          fatima@meridiangrp.com
        </p>
      </div>
    </div>
  );
}

function Container85() {
  return (
    <div className="absolute content-stretch flex h-[54.878px] items-center left-[476.68px] overflow-clip pl-[16.997px] top-0 w-[188.715px]" data-name="Container">
      <Span66 />
    </div>
  );
}

function Span67() {
  return (
    <div className="h-[19.497px] relative shrink-0 w-[95.92px]" data-name="span">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start overflow-clip relative rounded-[inherit] size-full">
        <p className="font-['Open_Sans:Regular',sans-serif] font-normal leading-[19.5px] relative shrink-0 text-[#262626] text-[13px] whitespace-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
          Meridian Group
        </p>
      </div>
    </div>
  );
}

function Container86() {
  return (
    <div className="absolute content-stretch flex h-[54.878px] items-center left-[665.4px] overflow-clip pl-[16.997px] top-0 w-[188.698px]" data-name="Container">
      <Span67 />
    </div>
  );
}

function Span68() {
  return (
    <div className="h-[19.497px] relative shrink-0 w-[47.778px]" data-name="span">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start overflow-clip relative rounded-[inherit] size-full">
        <p className="font-['Open_Sans:Regular',sans-serif] font-normal leading-[19.5px] relative shrink-0 text-[#262626] text-[13px] whitespace-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
          Chicago
        </p>
      </div>
    </div>
  );
}

function Container87() {
  return (
    <div className="absolute content-stretch flex h-[54.878px] items-center left-[854.1px] overflow-clip pl-[16.997px] top-0 w-[188.715px]" data-name="Container">
      <Span68 />
    </div>
  );
}

function Span69() {
  return (
    <div className="h-[19.497px] relative shrink-0 w-[36.233px]" data-name="span">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start overflow-clip relative rounded-[inherit] size-full">
        <p className="font-['Open_Sans:Regular',sans-serif] font-normal leading-[19.5px] relative shrink-0 text-[#262626] text-[13px] whitespace-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
          Editor
        </p>
      </div>
    </div>
  );
}

function Container88() {
  return (
    <div className="absolute content-stretch flex h-[54.878px] items-center left-[1042.81px] overflow-clip pl-[16.996px] top-0 w-[188.698px]" data-name="Container">
      <Span69 />
    </div>
  );
}

function Span70() {
  return (
    <div className="h-[19.497px] relative shrink-0 w-[97.378px]" data-name="span">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start overflow-clip relative rounded-[inherit] size-full">
        <p className="font-['Open_Sans:Regular',sans-serif] font-normal leading-[19.5px] relative shrink-0 text-[#262626] text-[13px] whitespace-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
          Project Member
        </p>
      </div>
    </div>
  );
}

function Container89() {
  return (
    <div className="absolute content-stretch flex h-[54.878px] items-center left-[1231.51px] overflow-clip pl-[16.997px] top-0 w-[188.698px]" data-name="Container">
      <Span70 />
    </div>
  );
}

function Span71() {
  return <div className="absolute bg-[#12b76a] left-[7px] rounded-[37282700px] size-[5px] top-[7.74px]" data-name="span" />;
}

function Button15() {
  return (
    <div className="bg-[#ecfdf3] h-[20.503px] relative rounded-[37282700px] shrink-0 w-[55.451px]" data-name="button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <Span71 />
        <p className="-translate-x-1/2 absolute font-['Open_Sans:Regular',sans-serif] font-normal leading-[16.5px] left-[33.5px] text-[#027a48] text-[11px] text-center top-px whitespace-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
          Active
        </p>
      </div>
    </div>
  );
}

function Container90() {
  return (
    <div className="absolute content-stretch flex h-[54.878px] items-center left-[1420.21px] overflow-clip pl-[16.996px] top-0 w-[188.698px]" data-name="Container">
      <Button15 />
    </div>
  );
}

function Container79() {
  return (
    <div className="absolute bg-white border-[#e5e7eb] border-b-[1.111px] border-solid h-[55.99px] left-0 top-[1111.79px] w-[1668.906px]" data-name="Container">
      <Container80 />
      <Container81 />
      <Container84 />
      <Container85 />
      <Container86 />
      <Container87 />
      <Container88 />
      <Container89 />
      <Container90 />
    </div>
  );
}

function Img() {
  return (
    <div className="h-[40px] relative rounded-[4px] shrink-0 w-full" data-name="img">
      <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none rounded-[4px] size-full" src={imgImg} />
    </div>
  );
}

function Container93() {
  return (
    <div className="bg-[#c4c4c4] relative rounded-[4px] shrink-0 size-[40px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start overflow-clip relative rounded-[inherit] size-full">
        <Img />
      </div>
    </div>
  );
}

function Container92() {
  return (
    <div className="content-stretch flex h-[54.878px] items-center justify-center pr-[0.017px] relative shrink-0 w-[47.986px]" data-name="Container">
      <Container93 />
    </div>
  );
}

function Span72() {
  return (
    <div className="h-[19px] relative shrink-0 w-[410px]" data-name="span">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start overflow-clip relative rounded-[inherit] size-full">
        <p className="font-['Open_Sans:Regular',sans-serif] font-normal leading-[19.5px] relative shrink-0 text-[#262626] text-[13px] w-[430px]" style={{ fontVariationSettings: "'wdth' 100" }}>
          Cleveland Hospital
        </p>
      </div>
    </div>
  );
}

function Container94() {
  return (
    <div className="content-stretch flex h-[55px] items-center overflow-clip pl-[8px] relative shrink-0 w-[420px]" data-name="Container">
      <Span72 />
    </div>
  );
}

function Span73() {
  return (
    <div className="h-[19.497px] relative shrink-0 w-[82.535px]" data-name="span">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start overflow-clip relative rounded-[inherit] size-full">
        <p className="font-['Open_Sans:Regular',sans-serif] font-normal leading-[19.5px] relative shrink-0 text-[#262626] text-[13px] whitespace-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
          PRJ-2024-001
        </p>
      </div>
    </div>
  );
}

function Container95() {
  return (
    <div className="content-stretch flex h-[55px] items-center overflow-clip pl-[16.997px] relative shrink-0 w-[240px]" data-name="Container">
      <Span73 />
    </div>
  );
}

function Span74() {
  return (
    <div className="h-[19.497px] relative shrink-0 w-[158.351px]" data-name="span">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start overflow-clip relative rounded-[inherit] size-full">
        <p className="font-['Open_Sans:Regular',sans-serif] font-normal leading-[19.5px] relative shrink-0 text-[#262626] text-[13px] whitespace-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
          Henrich Advisory
        </p>
      </div>
    </div>
  );
}

function Container96() {
  return (
    <div className="content-stretch flex h-[55px] items-center overflow-clip pl-[16.997px] relative shrink-0 w-[240px]" data-name="Container">
      <Span74 />
    </div>
  );
}

function Span75() {
  return (
    <div className="h-[18.003px] relative shrink-0 w-[52.569px]" data-name="span">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[18px] left-0 not-italic text-[#f2f3f4] text-[13px] top-[0.11px] whitespace-nowrap">Updated</p>
      </div>
    </div>
  );
}

function Container99() {
  return (
    <div className="bg-[#52c41a] h-[27.986px] relative rounded-[9999px] shrink-0 w-[72.569px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center relative size-full">
        <Span75 />
      </div>
    </div>
  );
}

function Span76() {
  return (
    <div className="h-[15.59px] relative shrink-0 w-[109.479px]" data-name="span">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Open_Sans:Regular',sans-serif] font-normal leading-[15.6px] left-0 text-[#595959] text-[13px] top-[-0.11px] whitespace-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
          8/4/2024, 6:15 PM
        </p>
      </div>
    </div>
  );
}

function Container98() {
  return (
    <div className="h-[27px] relative shrink-0 w-[240px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-between relative size-full">
        <Container99 />
        <Span76 />
      </div>
    </div>
  );
}

function Container97() {
  return (
    <div className="content-stretch flex h-[55px] items-center overflow-clip pl-[16.997px] relative shrink-0 w-[300px]" data-name="Container">
      <Container98 />
    </div>
  );
}

function Img1() {
  return (
    <div className="h-[20px] relative shrink-0 w-full" data-name="img">
      <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgImg1} />
    </div>
  );
}

function Container104() {
  return (
    <div className="content-stretch flex flex-col h-[20px] items-start overflow-clip pr-[-154.271px] relative shrink-0 w-full" data-name="Container">
      <Img1 />
    </div>
  );
}

function Container103() {
  return (
    <div className="bg-[#f0f0f3] h-[35.99px] relative rounded-[24px] shrink-0 w-full" data-name="Container">
      <div className="overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex flex-col items-start pl-[3.49px] pr-[4.514px] pt-[7.986px] relative size-full">
          <Container104 />
        </div>
      </div>
    </div>
  );
}

function Container102() {
  return (
    <div className="flex-[1_0_0] h-[35.99px] min-h-px min-w-px relative rounded-[18px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start overflow-clip relative rounded-[inherit] size-full">
        <Container103 />
      </div>
    </div>
  );
}

function Container101() {
  return (
    <div className="relative shrink-0 size-[35.99px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center relative size-full">
        <Container102 />
      </div>
    </div>
  );
}

function Container100() {
  return (
    <div className="content-stretch flex h-[55px] items-center overflow-clip pl-[16.997px] relative shrink-0 w-[240px]" data-name="Container">
      <Container101 />
    </div>
  );
}

function Span77() {
  return (
    <div className="h-[19.497px] relative shrink-0 w-[99.566px]" data-name="span">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start overflow-clip relative rounded-[inherit] size-full">
        <p className="font-['Open_Sans:Regular',sans-serif] font-normal leading-[19.5px] relative shrink-0 text-[#262626] text-[13px] whitespace-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
          10/12/2024
        </p>
      </div>
    </div>
  );
}

function Container105() {
  return (
    <div className="content-stretch flex h-[55px] items-center overflow-clip pl-[16.996px] relative shrink-0 w-[241px]" data-name="Container">
      <Span77 />
    </div>
  );
}

function Container91() {
  return (
    <div className="absolute bg-white content-stretch flex h-[55px] items-center left-0 top-[47.99px] w-[1673.685px]" data-name="Container">
      <div aria-hidden="true" className="absolute border-[#f0f0f0] border-b-[1.111px] border-solid inset-0 pointer-events-none" />
      <Container92 />
      <Container94 />
      <Container95 />
      <Container96 />
      <Container97 />
      <Container100 />
      <Container105 />
    </div>
  );
}

function Container106() {
  return (
    <div className="absolute bg-white h-[54.878px] left-[1673.59px] top-[47.99px] w-[62.412px]" data-name="Container">
      <div aria-hidden="true" className="absolute border-[#f0f0f0] border-b-[1.11px] border-solid inset-0 pointer-events-none" />
    </div>
  );
}

function Group() {
  return (
    <div className="absolute contents left-0 top-[47.99px]">
      <Container91 />
      <Container106 />
    </div>
  );
}

function Img2() {
  return (
    <div className="relative rounded-[4px] shrink-0 size-[40px]" data-name="img">
      <img alt="" className="absolute bg-clip-padding border-0 border-[transparent] border-solid inset-0 max-w-none object-cover pointer-events-none rounded-[4px] size-full" src={imgImg2} />
    </div>
  );
}

function Container108() {
  return (
    <div className="content-stretch flex h-[54.878px] items-center justify-center pr-[0.017px] relative shrink-0 w-[47.986px]" data-name="Container">
      <Img2 />
    </div>
  );
}

function Span78() {
  return (
    <div className="h-[19px] relative shrink-0 w-[410px]" data-name="span">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start overflow-clip relative rounded-[inherit] size-full">
        <p className="font-['Open_Sans:Regular',sans-serif] font-normal leading-[19.5px] relative shrink-0 text-[#262626] text-[13px] w-[430px]" style={{ fontVariationSettings: "'wdth' 100" }}>
          Inertia Demo
        </p>
      </div>
    </div>
  );
}

function Container109() {
  return (
    <div className="content-stretch flex h-[55px] items-center overflow-clip pl-[8px] relative shrink-0 w-[420px]" data-name="Container">
      <Span78 />
    </div>
  );
}

function Span79() {
  return (
    <div className="h-[19.497px] relative shrink-0 w-[82.535px]" data-name="span">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start overflow-clip relative rounded-[inherit] size-full">
        <p className="font-['Open_Sans:Regular',sans-serif] font-normal leading-[19.5px] relative shrink-0 text-[#262626] text-[13px] whitespace-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
          PRJ-2024-001
        </p>
      </div>
    </div>
  );
}

function Container110() {
  return (
    <div className="content-stretch flex h-[55px] items-center overflow-clip pl-[16.997px] relative shrink-0 w-[240px]" data-name="Container">
      <Span79 />
    </div>
  );
}

function Span80() {
  return (
    <div className="h-[19.497px] relative shrink-0 w-[158.351px]" data-name="span">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start overflow-clip relative rounded-[inherit] size-full">
        <p className="font-['Open_Sans:Regular',sans-serif] font-normal leading-[19.5px] relative shrink-0 text-[#262626] text-[13px] whitespace-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
          Henrich Advisory
        </p>
      </div>
    </div>
  );
}

function Container111() {
  return (
    <div className="content-stretch flex h-[55px] items-center overflow-clip pl-[16.997px] relative shrink-0 w-[240px]" data-name="Container">
      <Span80 />
    </div>
  );
}

function Span81() {
  return (
    <div className="h-[18.003px] relative shrink-0 w-[52.569px]" data-name="span">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[18px] left-0 not-italic text-[#f2f3f4] text-[13px] top-[0.11px] whitespace-nowrap">Updated</p>
      </div>
    </div>
  );
}

function Container114() {
  return (
    <div className="bg-[#52c41a] h-[27.986px] relative rounded-[9999px] shrink-0 w-[72.569px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center relative size-full">
        <Span81 />
      </div>
    </div>
  );
}

function Span82() {
  return (
    <div className="h-[15.59px] relative shrink-0 w-[109.479px]" data-name="span">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Open_Sans:Regular',sans-serif] font-normal leading-[15.6px] left-0 text-[#595959] text-[13px] top-[-0.11px] whitespace-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
          8/4/2024, 6:15 PM
        </p>
      </div>
    </div>
  );
}

function Container113() {
  return (
    <div className="h-[28px] relative shrink-0 w-[240px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-between relative size-full">
        <Container114 />
        <Span82 />
      </div>
    </div>
  );
}

function Container112() {
  return (
    <div className="content-stretch flex h-[55px] items-center overflow-clip pl-[16.997px] relative shrink-0 w-[300px]" data-name="Container">
      <Container113 />
    </div>
  );
}

function Img3() {
  return (
    <div className="h-[20px] relative shrink-0 w-full" data-name="img">
      <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgImg1} />
    </div>
  );
}

function Container119() {
  return (
    <div className="content-stretch flex flex-col h-[20px] items-start overflow-clip pr-[-154.271px] relative shrink-0 w-full" data-name="Container">
      <Img3 />
    </div>
  );
}

function Container118() {
  return (
    <div className="bg-[#f0f0f3] h-[35.99px] relative rounded-[24px] shrink-0 w-full" data-name="Container">
      <div className="overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex flex-col items-start pl-[3.49px] pr-[4.514px] pt-[7.986px] relative size-full">
          <Container119 />
        </div>
      </div>
    </div>
  );
}

function Container117() {
  return (
    <div className="flex-[1_0_0] h-[35.99px] min-h-px min-w-px relative rounded-[18px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start overflow-clip relative rounded-[inherit] size-full">
        <Container118 />
      </div>
    </div>
  );
}

function Container116() {
  return (
    <div className="relative shrink-0 size-[35.99px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center relative size-full">
        <Container117 />
      </div>
    </div>
  );
}

function Container115() {
  return (
    <div className="content-stretch flex h-[55px] items-center overflow-clip pl-[16.997px] relative shrink-0 w-[240px]" data-name="Container">
      <Container116 />
    </div>
  );
}

function Span83() {
  return (
    <div className="h-[19.497px] relative shrink-0 w-[99.566px]" data-name="span">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start overflow-clip relative rounded-[inherit] size-full">
        <p className="font-['Open_Sans:Regular',sans-serif] font-normal leading-[19.5px] relative shrink-0 text-[#262626] text-[13px] whitespace-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
          10/12/2024
        </p>
      </div>
    </div>
  );
}

function Container120() {
  return (
    <div className="content-stretch flex h-[55px] items-center overflow-clip pl-[16.996px] relative shrink-0 w-[126px]" data-name="Container">
      <Span83 />
    </div>
  );
}

function Container107() {
  return (
    <div className="absolute bg-white content-stretch flex h-[55px] items-center left-0 top-[103.01px] w-[1673.685px]" data-name="Container">
      <div aria-hidden="true" className="absolute border-[#f0f0f0] border-b-[1.111px] border-solid inset-0 pointer-events-none" />
      <Container108 />
      <Container109 />
      <Container110 />
      <Container111 />
      <Container112 />
      <Container115 />
      <Container120 />
    </div>
  );
}

function Container121() {
  return (
    <div className="absolute bg-white h-[54.878px] left-[1673.59px] top-[103px] w-[62.412px]" data-name="Container">
      <div aria-hidden="true" className="absolute border-[#f0f0f0] border-b-[1.11px] border-solid inset-0 pointer-events-none" />
    </div>
  );
}

function Group2() {
  return (
    <div className="absolute contents left-0 top-[103px]">
      <Container107 />
      <Container121 />
    </div>
  );
}

function AddNewProjectIcon() {
  return (
    <div className="relative rounded-[4px] shrink-0 size-[40px]" data-name="Add New Project  Icon">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-center justify-center relative size-full">
        <div className="aspect-[260/214] relative shrink-0 w-full" data-name="image 18">
          <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgImage18} />
        </div>
      </div>
    </div>
  );
}

function Container123() {
  return (
    <div className="content-stretch flex h-[54.878px] items-center justify-center pr-[0.017px] relative shrink-0 w-[47.986px]" data-name="Container">
      <AddNewProjectIcon />
    </div>
  );
}

function Span84() {
  return (
    <div className="h-[19px] relative shrink-0 w-[410px]" data-name="span">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start overflow-clip relative rounded-[inherit] size-full">
        <p className="font-['Open_Sans:Regular',sans-serif] font-normal leading-[19.5px] relative shrink-0 text-[#595959] text-[13px] w-[430px]" style={{ fontVariationSettings: "'wdth' 100" }}>
          Add a new project
        </p>
      </div>
    </div>
  );
}

function Container124() {
  return (
    <div className="content-stretch flex h-[55px] items-center overflow-clip pl-[8px] relative shrink-0 w-[420px]" data-name="Container">
      <Span84 />
    </div>
  );
}

function Container122() {
  return (
    <div className="absolute bg-white content-stretch flex h-[55px] items-center left-0 top-[158.01px] w-[1673.685px]" data-name="Container">
      <div aria-hidden="true" className="absolute border-[#f0f0f0] border-b-[1.111px] border-solid inset-0 pointer-events-none" />
      <Container123 />
      <Container124 />
    </div>
  );
}

function Container125() {
  return (
    <div className="absolute bg-white h-[54.878px] left-[1673.59px] top-[158px] w-[62.412px]" data-name="Container">
      <div aria-hidden="true" className="absolute border-[#f0f0f0] border-b-[1.11px] border-solid inset-0 pointer-events-none" />
    </div>
  );
}

function Group3() {
  return (
    <div className="absolute contents left-0 top-[158px]">
      <Container122 />
      <Container125 />
    </div>
  );
}

function Svg10() {
  return (
    <div className="relative shrink-0 size-[15px]" data-name="svg">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 15 15">
        <g id="svg">
          <path d={svgPaths.p3d2bd500} id="Vector" stroke="var(--stroke-0, #616D79)" strokeWidth="0.75" />
          <path d={svgPaths.p106b6900} fill="var(--fill-0, #616D79)" id="Vector_2" stroke="var(--stroke-0, #616D79)" strokeWidth="0.75" />
          <path d={svgPaths.p3237fd00} id="Vector_3" stroke="var(--stroke-0, #616D79)" strokeLinejoin="round" strokeWidth="0.75" />
        </g>
      </svg>
    </div>
  );
}

function Button16() {
  return (
    <div className="relative rounded-[4px] shrink-0 size-[25.99px]" data-name="button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center pr-[0.017px] relative size-full">
        <Svg10 />
      </div>
    </div>
  );
}

function Container126() {
  return (
    <div className="absolute bg-white content-stretch flex h-[54.878px] items-center justify-center left-[1608.91px] pr-[0.017px] shadow-[-1px_0px_0px_0px_#e5e7eb,-4px_0px_10px_0px_rgba(0,0,0,0.06)] top-[775.85px] w-[60px]" data-name="Container">
      <Button16 />
    </div>
  );
}

function Svg11() {
  return (
    <div className="relative shrink-0 size-[15px]" data-name="svg">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 15 15">
        <g id="svg">
          <path d={svgPaths.p3d2bd500} id="Vector" stroke="var(--stroke-0, #616D79)" strokeWidth="0.75" />
          <path d={svgPaths.p106b6900} fill="var(--fill-0, #616D79)" id="Vector_2" stroke="var(--stroke-0, #616D79)" strokeWidth="0.75" />
          <path d={svgPaths.p3237fd00} id="Vector_3" stroke="var(--stroke-0, #616D79)" strokeLinejoin="round" strokeWidth="0.75" />
        </g>
      </svg>
    </div>
  );
}

function Button17() {
  return (
    <div className="relative rounded-[4px] shrink-0 size-[25.99px]" data-name="button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center pr-[0.017px] relative size-full">
        <Svg11 />
      </div>
    </div>
  );
}

function Container127() {
  return (
    <div className="absolute bg-white content-stretch flex h-[54.878px] items-center justify-center left-[1608.91px] pr-[0.017px] shadow-[-1px_0px_0px_0px_#e5e7eb,-4px_0px_10px_0px_rgba(0,0,0,0.06)] top-[831.84px] w-[60px]" data-name="Container">
      <Button17 />
    </div>
  );
}

function Svg12() {
  return (
    <div className="relative shrink-0 size-[15px]" data-name="svg">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 15 15">
        <g id="svg">
          <path d={svgPaths.p3d2bd500} id="Vector" stroke="var(--stroke-0, #616D79)" strokeWidth="0.75" />
          <path d={svgPaths.p106b6900} fill="var(--fill-0, #616D79)" id="Vector_2" stroke="var(--stroke-0, #616D79)" strokeWidth="0.75" />
          <path d={svgPaths.p3237fd00} id="Vector_3" stroke="var(--stroke-0, #616D79)" strokeLinejoin="round" strokeWidth="0.75" />
        </g>
      </svg>
    </div>
  );
}

function Button18() {
  return (
    <div className="relative rounded-[4px] shrink-0 size-[25.99px]" data-name="button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center pr-[0.017px] relative size-full">
        <Svg12 />
      </div>
    </div>
  );
}

function Container128() {
  return (
    <div className="absolute bg-white content-stretch flex h-[54.878px] items-center justify-center left-[1608.91px] pr-[0.017px] shadow-[-1px_0px_0px_0px_#e5e7eb,-4px_0px_10px_0px_rgba(0,0,0,0.06)] top-[887.83px] w-[60px]" data-name="Container">
      <Button18 />
    </div>
  );
}

function Svg13() {
  return (
    <div className="relative shrink-0 size-[15px]" data-name="svg">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 15 15">
        <g id="svg">
          <path d={svgPaths.p3d2bd500} id="Vector" stroke="var(--stroke-0, #616D79)" strokeWidth="0.75" />
          <path d={svgPaths.p106b6900} fill="var(--fill-0, #616D79)" id="Vector_2" stroke="var(--stroke-0, #616D79)" strokeWidth="0.75" />
          <path d={svgPaths.p3237fd00} id="Vector_3" stroke="var(--stroke-0, #616D79)" strokeLinejoin="round" strokeWidth="0.75" />
        </g>
      </svg>
    </div>
  );
}

function Button19() {
  return (
    <div className="relative rounded-[4px] shrink-0 size-[25.99px]" data-name="button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center pr-[0.017px] relative size-full">
        <Svg13 />
      </div>
    </div>
  );
}

function Container129() {
  return (
    <div className="absolute bg-white content-stretch flex h-[54.878px] items-center justify-center left-[1608.91px] pr-[0.017px] shadow-[-1px_0px_0px_0px_#e5e7eb,-4px_0px_10px_0px_rgba(0,0,0,0.06)] top-[943.82px] w-[60px]" data-name="Container">
      <Button19 />
    </div>
  );
}

function Svg14() {
  return (
    <div className="relative shrink-0 size-[15px]" data-name="svg">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 15 15">
        <g id="svg">
          <path d={svgPaths.p3d2bd500} id="Vector" stroke="var(--stroke-0, #616D79)" strokeWidth="0.75" />
          <path d={svgPaths.p106b6900} fill="var(--fill-0, #616D79)" id="Vector_2" stroke="var(--stroke-0, #616D79)" strokeWidth="0.75" />
          <path d={svgPaths.p3237fd00} id="Vector_3" stroke="var(--stroke-0, #616D79)" strokeLinejoin="round" strokeWidth="0.75" />
        </g>
      </svg>
    </div>
  );
}

function Button20() {
  return (
    <div className="relative rounded-[4px] shrink-0 size-[25.99px]" data-name="button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center pr-[0.017px] relative size-full">
        <Svg14 />
      </div>
    </div>
  );
}

function Container130() {
  return (
    <div className="absolute bg-white content-stretch flex h-[54.878px] items-center justify-center left-[1608.91px] pr-[0.017px] shadow-[-1px_0px_0px_0px_#e5e7eb,-4px_0px_10px_0px_rgba(0,0,0,0.06)] top-[999.81px] w-[60px]" data-name="Container">
      <Button20 />
    </div>
  );
}

function Svg15() {
  return (
    <div className="relative shrink-0 size-[15px]" data-name="svg">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 15 15">
        <g id="svg">
          <path d={svgPaths.p3d2bd500} id="Vector" stroke="var(--stroke-0, #616D79)" strokeWidth="0.75" />
          <path d={svgPaths.p106b6900} fill="var(--fill-0, #616D79)" id="Vector_2" stroke="var(--stroke-0, #616D79)" strokeWidth="0.75" />
          <path d={svgPaths.p3237fd00} id="Vector_3" stroke="var(--stroke-0, #616D79)" strokeLinejoin="round" strokeWidth="0.75" />
        </g>
      </svg>
    </div>
  );
}

function Button21() {
  return (
    <div className="relative rounded-[4px] shrink-0 size-[25.99px]" data-name="button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center pr-[0.017px] relative size-full">
        <Svg15 />
      </div>
    </div>
  );
}

function Container131() {
  return (
    <div className="absolute bg-white content-stretch flex h-[54.878px] items-center justify-center left-[1608.91px] pr-[0.017px] shadow-[-1px_0px_0px_0px_#e5e7eb,-4px_0px_10px_0px_rgba(0,0,0,0.06)] top-[1055.8px] w-[60px]" data-name="Container">
      <Button21 />
    </div>
  );
}

function Svg16() {
  return (
    <div className="relative shrink-0 size-[15px]" data-name="svg">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 15 15">
        <g id="svg">
          <path d={svgPaths.p3d2bd500} id="Vector" stroke="var(--stroke-0, #616D79)" strokeWidth="0.75" />
          <path d={svgPaths.p106b6900} fill="var(--fill-0, #616D79)" id="Vector_2" stroke="var(--stroke-0, #616D79)" strokeWidth="0.75" />
          <path d={svgPaths.p3237fd00} id="Vector_3" stroke="var(--stroke-0, #616D79)" strokeLinejoin="round" strokeWidth="0.75" />
        </g>
      </svg>
    </div>
  );
}

function Button22() {
  return (
    <div className="relative rounded-[4px] shrink-0 size-[25.99px]" data-name="button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center pr-[0.017px] relative size-full">
        <Svg16 />
      </div>
    </div>
  );
}

function Container132() {
  return (
    <div className="absolute bg-white content-stretch flex h-[54.878px] items-center justify-center left-[1608.91px] pr-[0.017px] shadow-[-1px_0px_0px_0px_#e5e7eb,-4px_0px_10px_0px_rgba(0,0,0,0.06)] top-[1111.79px] w-[60px]" data-name="Container">
      <Button22 />
    </div>
  );
}

function Container134() {
  return (
    <div className="content-stretch flex h-[46.875px] items-center justify-center pb-px pr-[0.017px] relative shrink-0 w-[47.986px]" data-name="Container">
      <div aria-hidden="true" className="absolute border-[#f0f0f0] border-b border-solid inset-0 pointer-events-none" />
    </div>
  );
}

function Span85() {
  return (
    <div className="content-stretch flex h-[19.497px] items-start relative shrink-0 w-[228.021px]" data-name="span">
      <p className="flex-[1_0_0] font-['Open_Sans:SemiBold',sans-serif] font-semibold leading-[19.5px] min-h-px min-w-px relative text-[#384857] text-[13px]" style={{ fontVariationSettings: "'wdth' 100" }}>
        Project Name
      </p>
    </div>
  );
}

function Container137() {
  return <div className="h-[22.5px] rounded-[37282700px] shrink-0 w-[1.997px]" data-name="Container" />;
}

function Container136() {
  return (
    <div className="content-stretch flex h-[46.875px] items-center justify-end pr-[0.99px] relative shrink-0 w-[6.997px]" data-name="Container">
      <Container137 />
    </div>
  );
}

function Container135() {
  return (
    <div className="relative shrink-0 w-[420px]" data-name="Container">
      <div className="content-stretch flex items-center overflow-clip px-[8px] relative rounded-[inherit] w-full">
        <Span85 />
        <Container136 />
      </div>
      <div aria-hidden="true" className="absolute border-[#f0f0f0] border-b border-solid inset-0 pointer-events-none" />
    </div>
  );
}

function Span86() {
  return (
    <div className="absolute content-stretch flex h-[19.497px] items-start left-[16.98px] overflow-clip top-[13.68px] w-[165.729px]" data-name="span">
      <p className="flex-[1_0_0] font-['Open_Sans:SemiBold',sans-serif] font-semibold leading-[19.5px] min-h-px min-w-px relative text-[#384857] text-[13px]" style={{ fontVariationSettings: "'wdth' 100" }}>
        Project Number
      </p>
    </div>
  );
}

function Container140() {
  return <div className="h-[22.5px] rounded-[37282700px] shrink-0 w-[1.997px]" data-name="Container" />;
}

function Container139() {
  return (
    <div className="absolute content-stretch flex h-[46.875px] items-center justify-end left-[181.7px] pr-[0.99px] top-0 w-[6.997px]" data-name="Container">
      <Container140 />
    </div>
  );
}

function Container138() {
  return (
    <div className="h-[47px] relative shrink-0 w-[240px]" data-name="Container">
      <div className="overflow-clip relative rounded-[inherit] size-full">
        <Span86 />
        <Container139 />
      </div>
      <div aria-hidden="true" className="absolute border-[#f0f0f0] border-b border-solid inset-0 pointer-events-none" />
    </div>
  );
}

function Span87() {
  return (
    <div className="absolute content-stretch flex h-[19.497px] items-start left-[16.98px] overflow-clip top-[13.68px] w-[165.747px]" data-name="span">
      <p className="flex-[1_0_0] font-['Open_Sans:SemiBold',sans-serif] font-semibold leading-[19.5px] min-h-px min-w-px relative text-[#384857] text-[13px]" style={{ fontVariationSettings: "'wdth' 100" }}>
        Account Name
      </p>
    </div>
  );
}

function Container143() {
  return <div className="h-[22.5px] rounded-[37282700px] shrink-0 w-[1.997px]" data-name="Container" />;
}

function Container142() {
  return (
    <div className="absolute content-stretch flex h-[46.875px] items-center justify-end left-[181.72px] pr-[0.99px] top-0 w-[6.997px]" data-name="Container">
      <Container143 />
    </div>
  );
}

function Container141() {
  return (
    <div className="h-[47px] relative shrink-0 w-[240px]" data-name="Container">
      <div className="overflow-clip relative rounded-[inherit] size-full">
        <Span87 />
        <Container142 />
      </div>
      <div aria-hidden="true" className="absolute border-[#f0f0f0] border-b border-solid inset-0 pointer-events-none" />
    </div>
  );
}

function Span88() {
  return (
    <div className="absolute content-stretch flex h-[19.497px] items-start left-[16.98px] overflow-clip top-[13.68px] w-[165.729px]" data-name="span">
      <p className="flex-[1_0_0] font-['Open_Sans:SemiBold',sans-serif] font-semibold leading-[19.5px] min-h-px min-w-px relative text-[#384857] text-[13px]" style={{ fontVariationSettings: "'wdth' 100" }}>
        Status
      </p>
    </div>
  );
}

function Container146() {
  return <div className="h-[22.5px] rounded-[37282700px] shrink-0 w-[1.997px]" data-name="Container" />;
}

function Container145() {
  return (
    <div className="absolute content-stretch flex h-[46.875px] items-center justify-end left-[181.7px] pr-[0.99px] top-0 w-[6.997px]" data-name="Container">
      <Container146 />
    </div>
  );
}

function Container144() {
  return (
    <div className="h-[47px] relative shrink-0 w-[300px]" data-name="Container">
      <div className="overflow-clip relative rounded-[inherit] size-full">
        <Span88 />
        <Container145 />
      </div>
      <div aria-hidden="true" className="absolute border-[#f0f0f0] border-b border-solid inset-0 pointer-events-none" />
    </div>
  );
}

function Span89() {
  return (
    <div className="absolute content-stretch flex h-[19.497px] items-start left-[16.98px] overflow-clip top-[13.68px] w-[165.729px]" data-name="span">
      <p className="flex-[1_0_0] font-['Open_Sans:SemiBold',sans-serif] font-semibold leading-[19.5px] min-h-px min-w-px relative text-[#384857] text-[13px]" style={{ fontVariationSettings: "'wdth' 100" }}>
        Connected to
      </p>
    </div>
  );
}

function Container149() {
  return <div className="h-[22.5px] rounded-[37282700px] shrink-0 w-[1.997px]" data-name="Container" />;
}

function Container148() {
  return (
    <div className="absolute content-stretch flex h-[46.875px] items-center justify-end left-[181.7px] pr-[0.99px] top-0 w-[6.997px]" data-name="Container">
      <Container149 />
    </div>
  );
}

function Container147() {
  return (
    <div className="h-[47px] relative shrink-0 w-[240px]" data-name="Container">
      <div className="overflow-clip relative rounded-[inherit] size-full">
        <Span89 />
        <Container148 />
      </div>
      <div aria-hidden="true" className="absolute border-[#f0f0f0] border-b border-solid inset-0 pointer-events-none" />
    </div>
  );
}

function Span90() {
  return (
    <div className="absolute content-stretch flex h-[19.497px] items-start left-[16.98px] overflow-clip top-[13.68px] w-[165.729px]" data-name="span">
      <p className="flex-[1_0_0] font-['Open_Sans:SemiBold',sans-serif] font-semibold leading-[19.5px] min-h-px min-w-px relative text-[#384857] text-[13px]" style={{ fontVariationSettings: "'wdth' 100" }}>
        Created Date
      </p>
    </div>
  );
}

function Container152() {
  return <div className="h-[22.5px] rounded-[37282700px] shrink-0 w-[1.997px]" data-name="Container" />;
}

function Container151() {
  return (
    <div className="absolute content-stretch flex h-[46.875px] items-center justify-end left-[181.7px] pr-[0.99px] top-0 w-[6.997px]" data-name="Container">
      <Container152 />
    </div>
  );
}

function Container150() {
  return (
    <div className="h-[47px] relative shrink-0 w-[241px]" data-name="Container">
      <div className="overflow-clip relative rounded-[inherit] size-full">
        <Span90 />
        <Container151 />
      </div>
      <div aria-hidden="true" className="absolute border-[#f0f0f0] border-b border-solid inset-0 pointer-events-none" />
    </div>
  );
}

function Container133() {
  return (
    <div className="absolute bg-[#fafafa] content-stretch flex items-center left-0 top-px w-[1673.591px]" data-name="Container">
      <div aria-hidden="true" className="absolute border-[#fafafa] border-b-[1.111px] border-solid inset-0 pointer-events-none" />
      <Container134 />
      <Container135 />
      <Container138 />
      <Container141 />
      <Container144 />
      <Container147 />
      <Container150 />
    </div>
  );
}

function Svg17() {
  return (
    <div className="relative shrink-0 size-[22px]" data-name="svg">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 22 22">
        <g id="svg">
          <path d={svgPaths.p1b88edf0} fill="var(--fill-0, #616D79)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function Button23() {
  return (
    <div className="relative rounded-[4px] shrink-0 size-[24px]" data-name="button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-center justify-center relative size-full">
        <Svg17 />
      </div>
    </div>
  );
}

function Container153() {
  return (
    <div className="absolute bg-[#fafafa] content-stretch flex h-[48px] items-center justify-center left-[1673.59px] pb-[1.11px] top-0 w-[62.409px]" data-name="Container">
      <div aria-hidden="true" className="absolute border-[#fafafa] border-b-[1.11px] border-solid inset-0 pointer-events-none" />
      <Button23 />
    </div>
  );
}

function Group1() {
  return (
    <div className="absolute contents left-0 top-0">
      <Container133 />
      <Container153 />
    </div>
  );
}

function Container6() {
  return (
    <div className="absolute bg-white h-[732px] left-px overflow-clip top-[48.92px] w-[1736px]" data-name="Container">
      <Container7 />
      <Container19 />
      <Container31 />
      <Container43 />
      <Container55 />
      <Container67 />
      <Container79 />
      <Group />
      <Group2 />
      <Group3 />
      <Container126 />
      <Container127 />
      <Container128 />
      <Container129 />
      <Container130 />
      <Container131 />
      <Container132 />
      <Group1 />
    </div>
  );
}

function Span91() {
  return (
    <div className="h-[17.986px] relative shrink-0 w-[141.753px]" data-name="span">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start relative size-full">
        <p className="font-['Open_Sans:Regular',sans-serif] font-normal leading-[18px] relative shrink-0 text-[#667085] text-[12px] whitespace-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
          Showing 1–50 of 2 projects
        </p>
      </div>
    </div>
  );
}

function Svg18() {
  return (
    <div className="h-[10.99px] relative shrink-0 w-[12.986px]" data-name="svg">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12.9861 10.9896">
        <g clipPath="url(#clip0_2030_2907)" id="svg">
          <path d={svgPaths.p2ed84cc0} id="Vector" stroke="var(--stroke-0, #344054)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.3131" />
        </g>
        <defs>
          <clipPath id="clip0_2030_2907">
            <rect fill="white" height="10.9896" width="12.9861" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Button24() {
  return (
    <div className="bg-white opacity-35 relative rounded-[6px] shrink-0 size-[31.997px]" data-name="button">
      <div aria-hidden="true" className="absolute border-[#e5e7eb] border-[1.111px] border-solid inset-0 pointer-events-none rounded-[6px]" />
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center pl-[1.111px] pr-[1.128px] py-[1.111px] relative size-full">
        <Svg18 />
      </div>
    </div>
  );
}

function Button25() {
  return (
    <div className="bg-[#ff4d00] relative rounded-[6px] shrink-0 size-[31.997px]" data-name="button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center relative size-full">
        <p className="font-['Open_Sans:Regular',sans-serif] font-normal leading-[18px] relative shrink-0 text-[12px] text-center text-white whitespace-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
          1
        </p>
      </div>
    </div>
  );
}

function Svg19() {
  return (
    <div className="h-[10.99px] relative shrink-0 w-[12.986px]" data-name="svg">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12.9861 10.9896">
        <g clipPath="url(#clip0_2030_2907)" id="svg">
          <path d={svgPaths.p2ed84cc0} id="Vector" stroke="var(--stroke-0, #344054)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.3131" />
        </g>
        <defs>
          <clipPath id="clip0_2030_2907">
            <rect fill="white" height="10.9896" width="12.9861" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Button26() {
  return (
    <div className="bg-white opacity-35 relative rounded-[6px] size-[31.997px]" data-name="button">
      <div aria-hidden="true" className="absolute border-[#e5e7eb] border-[1.111px] border-solid inset-0 pointer-events-none rounded-[6px]" />
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center pl-[1.111px] pr-[1.128px] py-[1.111px] relative size-full">
        <Svg19 />
      </div>
    </div>
  );
}

function Container155() {
  return (
    <div className="h-[31.997px] relative shrink-0 w-[133.976px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[1.997px] items-center justify-end relative size-full">
        <Button24 />
        <Button25 />
        <div className="flex items-center justify-center relative shrink-0">
          <div className="flex-none rotate-180">
            <Button26 />
          </div>
        </div>
      </div>
    </div>
  );
}

function Container154() {
  return (
    <div className="absolute bg-[#fafafa] content-stretch flex h-[51px] items-center justify-between left-px pt-[1.111px] px-[15.99px] top-[781.92px] w-[1736px]" data-name="Container">
      <div aria-hidden="true" className="absolute border-[#f0f0f0] border-solid border-t-[1.111px] inset-0 pointer-events-none" />
      <Span91 />
      <Container155 />
    </div>
  );
}

function Container1() {
  return (
    <div className="bg-[#fafafa] flex-[1_0_0] h-[834.028px] min-h-px min-w-px relative rounded-[8px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid overflow-clip relative rounded-[inherit] size-full">
        <Container2 />
        <Container6 />
        <Container154 />
      </div>
      <div aria-hidden="true" className="absolute border-[#e5e7eb] border-[1.111px] border-solid inset-0 pointer-events-none rounded-[8px]" />
    </div>
  );
}

export default function Container() {
  return (
    <div className="content-stretch flex items-start pt-[11.997px] px-[11.997px] relative size-full" data-name="Container">
      <Container1 />
    </div>
  );
}