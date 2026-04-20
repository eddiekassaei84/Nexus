import svgPaths from "./svg-wu68rsv6pt";
import imgImg from "figma:asset/de5e422433a571d190e7c4d34a019906817d3b35.png";
import imgImg1 from "figma:asset/794abd9c4f9b76f694f72984f4426d292661a8d6.png";
import imgImg2 from "figma:asset/1347207f59fbc71bd42a8237de662b6bec7350bc.png";
import imgImg3 from "figma:asset/53682e1811779057bb44f23138e859ff4a897918.png";

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

function Span2() {
  return (
    <div className="h-[20px] relative shrink-0 w-[49.722px]" data-name="span">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start relative size-full">
        <p className="font-['Open_Sans:Regular',sans-serif] font-normal leading-[20px] relative shrink-0 text-[#616d79] text-[14px] text-center whitespace-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
          Sort by:
        </p>
      </div>
    </div>
  );
}

function Span3() {
  return (
    <div className="h-[20px] relative shrink-0 w-[46.458px]" data-name="span">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start relative size-full">
        <p className="font-['Open_Sans:SemiBold',sans-serif] font-semibold leading-[20px] relative shrink-0 text-[#384857] text-[14px] text-center whitespace-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
          Recent
        </p>
      </div>
    </div>
  );
}

function Svg2() {
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

function Button1() {
  return (
    <div className="bg-[#f2f3f4] content-stretch flex gap-[3.993px] h-[35.99px] items-center pl-[17.101px] pr-[1.111px] py-[1.111px] relative rounded-[4px] shrink-0 w-[152.361px]" data-name="button">
      <div aria-hidden="true" className="absolute border-[#c3c7cc] border-[1.111px] border-solid inset-0 pointer-events-none rounded-[4px]" />
      <Span2 />
      <Span3 />
      <Svg2 />
    </div>
  );
}

function Frame() {
  return (
    <div className="relative shrink-0">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[8px] items-center relative">
        <Container3 />
        <Button />
        <Button1 />
      </div>
    </div>
  );
}

function Svg3() {
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

function Button2() {
  return (
    <div className="bg-[#ff4d00] h-[35.99px] relative rounded-[4px] shrink-0 w-[164.427px]" data-name="button">
      <Svg3 />
      <p className="-translate-x-1/2 absolute font-['Inter:Regular',sans-serif] font-normal leading-[20px] left-[94.48px] not-italic text-[14px] text-center text-white top-[8.1px] whitespace-nowrap">Add new project</p>
    </div>
  );
}

function Container5() {
  return (
    <div className="relative shrink-0" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center relative">
        <Button2 />
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

function Span4() {
  return (
    <div className="h-[18.003px] relative shrink-0 w-[52.569px]" data-name="span">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[18px] left-0 not-italic text-[#f2f3f4] text-[13px] top-[0.11px] whitespace-nowrap">Updated</p>
      </div>
    </div>
  );
}

function Container11() {
  return (
    <div className="bg-[#52c41a] h-[27.986px] relative rounded-[9999px] shrink-0 w-[72.569px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center relative size-full">
        <Span4 />
      </div>
    </div>
  );
}

function Span5() {
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

function Container10() {
  return (
    <div className="absolute content-stretch flex h-[28px] items-center justify-between left-[12.02px] top-[12px] w-[321px]" data-name="Container">
      <Container11 />
      <Span5 />
    </div>
  );
}

function P() {
  return (
    <div className="h-[31.997px] relative shrink-0 w-[216.823px]" data-name="p">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid overflow-clip relative rounded-[inherit] size-full">
        <p className="absolute font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[32px] left-0 not-italic text-[#262626] text-[24px] top-[-0.89px] whitespace-nowrap">Cleveland Hospital</p>
      </div>
    </div>
  );
}

function Container12() {
  return (
    <div className="absolute content-stretch flex h-[80.052px] items-start left-[12px] overflow-clip top-[47.97px] w-[331.441px]" data-name="Container">
      <P />
    </div>
  );
}

function P1() {
  return (
    <div className="h-[20px] relative shrink-0 w-[331.441px]" data-name="p">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start overflow-clip relative rounded-[inherit] size-full">
        <p className="flex-[1_0_0] font-['Inter:Regular',sans-serif] font-normal leading-[20px] min-h-px min-w-px not-italic relative text-[#595959] text-[16px]">PRJ-2024-001</p>
      </div>
    </div>
  );
}

function Img() {
  return (
    <div className="h-[20px] relative shrink-0 w-full" data-name="img">
      <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgImg} />
    </div>
  );
}

function Container18() {
  return (
    <div className="content-stretch flex flex-col h-[20px] items-start overflow-clip pr-[-154.271px] relative shrink-0 w-full" data-name="Container">
      <Img />
    </div>
  );
}

function Container17() {
  return (
    <div className="bg-[#f0f0f3] h-[35.99px] relative rounded-[24px] shrink-0 w-full" data-name="Container">
      <div className="overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex flex-col items-start pl-[3.49px] pr-[4.514px] pt-[7.986px] relative size-full">
          <Container18 />
        </div>
      </div>
    </div>
  );
}

function Container16() {
  return (
    <div className="flex-[1_0_0] h-[35.99px] min-h-px min-w-px relative rounded-[18px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start overflow-clip relative rounded-[inherit] size-full">
        <Container17 />
      </div>
    </div>
  );
}

function Container15() {
  return (
    <div className="relative shrink-0 size-[35.99px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center relative size-full">
        <Container16 />
      </div>
    </div>
  );
}

function Container14() {
  return (
    <div className="h-[35.99px] relative shrink-0 w-[331.441px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center relative size-full">
        <Container15 />
      </div>
    </div>
  );
}

function Container13() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[7.986px] h-[63.976px] items-start left-[12px] top-[128.02px] w-[331.441px]" data-name="Container">
      <P1 />
      <Container14 />
    </div>
  );
}

function Container9() {
  return (
    <div className="absolute bg-white h-[203.993px] left-[199.98px] top-0 w-[355.434px]" data-name="Container">
      <Container10 />
      <Container12 />
      <Container13 />
    </div>
  );
}

function Img1() {
  return (
    <div className="h-[203.993px] relative shrink-0 w-full" data-name="img">
      <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgImg1} />
    </div>
  );
}

function Container19() {
  return (
    <div className="absolute bg-[#c4c4c4] content-stretch flex flex-col h-[203.993px] items-start left-0 overflow-clip top-0 w-[191.997px]" data-name="Container">
      <Img1 />
    </div>
  );
}

function Container8() {
  return (
    <div className="bg-white h-[204px] overflow-clip relative rounded-[12px] shadow-[0px_2px_8px_0px_rgba(0,0,0,0.1),0px_1px_3px_0px_rgba(0,0,0,0.06)] shrink-0 w-[548px]" data-name="Container">
      <Container9 />
      <Container19 />
    </div>
  );
}

function Span6() {
  return (
    <div className="h-[18.003px] relative shrink-0 w-[52.569px]" data-name="span">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[18px] left-0 not-italic text-[#f2f3f4] text-[13px] top-[0.11px] whitespace-nowrap">Updated</p>
      </div>
    </div>
  );
}

function Container23() {
  return (
    <div className="bg-[#52c41a] h-[27.986px] relative rounded-[9999px] shrink-0 w-[72.569px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center relative size-full">
        <Span6 />
      </div>
    </div>
  );
}

function Span7() {
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

function Container22() {
  return (
    <div className="absolute content-stretch flex h-[28px] items-center justify-between left-[12.02px] top-[12px] w-[319px]" data-name="Container">
      <Container23 />
      <Span7 />
    </div>
  );
}

function P2() {
  return (
    <div className="h-[31.997px] relative shrink-0 w-[147.743px]" data-name="p">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid overflow-clip relative rounded-[inherit] size-full">
        <p className="absolute font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[32px] left-0 not-italic text-[#262626] text-[24px] top-[-0.89px] whitespace-nowrap">Inertia Demo</p>
      </div>
    </div>
  );
}

function Container24() {
  return (
    <div className="absolute content-stretch flex h-[80.052px] items-start left-[12px] overflow-clip top-[47.97px] w-[331.441px]" data-name="Container">
      <P2 />
    </div>
  );
}

function P3() {
  return (
    <div className="h-[20px] relative shrink-0 w-[331.441px]" data-name="p">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start overflow-clip relative rounded-[inherit] size-full">
        <p className="flex-[1_0_0] font-['Inter:Regular',sans-serif] font-normal leading-[20px] min-h-px min-w-px not-italic relative text-[#595959] text-[16px]">PRJ-2024-002</p>
      </div>
    </div>
  );
}

function Img2() {
  return (
    <div className="h-[23.993px] relative shrink-0 w-full" data-name="img">
      <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgImg2} />
    </div>
  );
}

function Container29() {
  return (
    <div className="bg-[#f0f0f3] h-[35.99px] relative rounded-[24px] shrink-0 w-full" data-name="Container">
      <div className="overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex flex-col items-start pl-[6.493px] pr-[5.503px] pt-[5.99px] relative size-full">
          <Img2 />
        </div>
      </div>
    </div>
  );
}

function Container28() {
  return (
    <div className="flex-[1_0_0] h-[35.99px] min-h-px min-w-px relative rounded-[8px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start overflow-clip relative rounded-[inherit] size-full">
        <Container29 />
      </div>
    </div>
  );
}

function Container27() {
  return (
    <div className="relative shrink-0 size-[35.99px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center relative size-full">
        <Container28 />
      </div>
    </div>
  );
}

function Container26() {
  return (
    <div className="h-[35.99px] relative shrink-0 w-[331.441px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center relative size-full">
        <Container27 />
      </div>
    </div>
  );
}

function Container25() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[7.986px] h-[63.976px] items-start left-[12px] top-[128.02px] w-[331.441px]" data-name="Container">
      <P3 />
      <Container26 />
    </div>
  );
}

function Container21() {
  return (
    <div className="absolute bg-white h-[203.993px] left-[199.98px] top-0 w-[355.434px]" data-name="Container">
      <Container22 />
      <Container24 />
      <Container25 />
    </div>
  );
}

function Img3() {
  return (
    <div className="h-[203.993px] relative shrink-0 w-full" data-name="img">
      <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgImg3} />
    </div>
  );
}

function Container30() {
  return (
    <div className="absolute bg-[#c4c4c4] content-stretch flex flex-col h-[203.993px] items-start left-0 overflow-clip top-0 w-[191.997px]" data-name="Container">
      <Img3 />
    </div>
  );
}

function Container20() {
  return (
    <div className="bg-white h-[204px] overflow-clip relative rounded-[12px] shadow-[0px_2px_8px_0px_rgba(0,0,0,0.1),0px_1px_3px_0px_rgba(0,0,0,0.06)] shrink-0 w-[548px]" data-name="Container">
      <Container21 />
      <Container30 />
    </div>
  );
}

function Group() {
  return (
    <div className="absolute contents inset-0" data-name="Group">
      <div className="absolute inset-[77.22%_0_0_0]" data-name="Vector">
        <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 95.8333 17.8353">
          <path d={svgPaths.p1b01b200} fill="var(--fill-0, #F5F5F5)" id="Vector" />
        </svg>
      </div>
      <div className="absolute inset-[26.68%_10%_31.02%_10%]" data-name="Vector_2">
        <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 76.6668 33.1228">
          <path clipRule="evenodd" d={svgPaths.p39883900} fill="var(--fill-0, #A1A8B0)" fillRule="evenodd" id="Vector_2" />
        </svg>
      </div>
      <div className="absolute inset-[0_21.83%_16.39%_22.12%]" data-name="Vector_4">
        <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 53.7143 65.4671">
          <path clipRule="evenodd" d={svgPaths.p1051eb00} fill="var(--fill-0, #F5F5F5)" fillRule="evenodd" id="Vector_4" />
        </svg>
      </div>
      <div className="absolute inset-[55.15%_10%_8.24%_10%]" data-name="Vector_5">
        <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 76.6668 28.6633">
          <path clipRule="evenodd" d={svgPaths.p72e49b0} fill="var(--fill-0, #E5E7E9)" fillRule="evenodd" id="Vector_5" />
        </svg>
      </div>
    </div>
  );
}

function Svg4() {
  return (
    <div className="h-[78.299px] overflow-clip relative shrink-0 w-full" data-name="svg">
      <Group />
    </div>
  );
}

function Container33() {
  return (
    <div className="absolute content-stretch flex flex-col h-[78.299px] items-start left-[16.94px] top-[14.08px] w-[95.833px]" data-name="Container">
      <Svg4 />
    </div>
  );
}

function Group1() {
  return (
    <div className="absolute contents inset-[19.05%_20%_23.81%_20%]">
      <div className="absolute bottom-[23.81%] left-1/2 right-1/2 top-[19.05%]">
        <div className="absolute inset-[0_-1.41px]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2.82192 16.9048">
            <path d="M1.41096 16.9048V0" id="Vector 102" stroke="var(--stroke-0, #FF6425)" strokeWidth="2.82192" />
          </svg>
        </div>
      </div>
      <div className="absolute inset-[47.62%_20%_52.38%_20%]">
        <div className="absolute inset-[-1.41px_0]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16.9583 2.82192">
            <path d="M16.9583 1.41096H0" id="Vector 103" stroke="var(--stroke-0, #FF6425)" strokeWidth="2.82192" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function Group3() {
  return (
    <div className="absolute contents inset-[1.19%_0_0_0]">
      <div className="absolute inset-[4.76%_0_0_0]">
        <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 28.2639 28.1746">
          <path d={svgPaths.p289403c0} fill="var(--fill-0, #E5E7E9)" id="Ellipse 23" />
        </svg>
      </div>
      <div className="absolute inset-[1.19%_1.25%_5.95%_1.25%]">
        <div className="absolute inset-[-1.28%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 28.2628 28.1757">
            <path d={svgPaths.p7376180} fill="var(--fill-0, white)" id="Ellipse 24" stroke="var(--stroke-0, #F2F3F4)" strokeWidth="0.70548" />
          </svg>
        </div>
      </div>
      <Group1 />
    </div>
  );
}

function Svg5() {
  return (
    <div className="h-[29.583px] overflow-clip relative shrink-0 w-full" data-name="svg">
      <Group3 />
    </div>
  );
}

function Container34() {
  return (
    <div className="absolute content-stretch flex flex-col h-[29.583px] items-start left-[50.87px] top-[29.55px] w-[28.264px]" data-name="Container">
      <Svg5 />
    </div>
  );
}

function Group2() {
  return (
    <div className="absolute contents inset-[0_1.78%_5.16%_1.78%]">
      <div className="absolute inset-[0_49.51%_41.64%_50.49%]">
        <div className="absolute inset-[0_-0.71px]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 1.41077 5.63374">
            <path d="M0.705387 5.63374V0" id="Vector 99" stroke="var(--stroke-0, #A1A8B0)" strokeWidth="1.41077" />
          </svg>
        </div>
      </div>
      <div className="absolute inset-[58.73%_85.75%_5.16%_1.78%]">
        <div className="absolute inset-[-14.33%_-14.24%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 4.4932 4.48492">
            <path d={svgPaths.p34f71b00} id="Vector 100" stroke="var(--stroke-0, #A1A8B0)" strokeWidth="1.41077" />
          </svg>
        </div>
      </div>
      <div className="absolute inset-[58.73%_1.78%_5.16%_85.75%]">
        <div className="absolute inset-[-14.33%_-14.24%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 4.49323 4.48493">
            <path d={svgPaths.p9c0a000} id="Vector 101" stroke="var(--stroke-0, #A1A8B0)" strokeWidth="1.41077" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function Svg6() {
  return (
    <div className="h-[9.653px] overflow-clip relative shrink-0 w-full" data-name="svg">
      <Group2 />
    </div>
  );
}

function Container35() {
  return (
    <div className="absolute content-stretch flex flex-col h-[9.653px] items-start left-[50.87px] top-[18.3px] w-[28.056px]" data-name="Container">
      <Svg6 />
    </div>
  );
}

function Container32() {
  return (
    <div className="h-[106.997px] relative shrink-0 w-[130px]" data-name="Container">
      <Container33 />
      <Container34 />
      <Container35 />
    </div>
  );
}

function P4() {
  return (
    <div className="h-[31.997px] relative shrink-0 w-[209.063px]" data-name="p">
      <p className="absolute font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[32px] left-0 not-italic text-[#595959] text-[24px] top-[-0.89px] whitespace-nowrap">Add a new project</p>
    </div>
  );
}

function Container31() {
  return (
    <div className="bg-white content-stretch flex gap-[36px] items-center overflow-clip px-[75px] py-[48px] relative rounded-[12px] shadow-[0px_2px_8px_0px_rgba(0,0,0,0.1),0px_1px_3px_0px_rgba(0,0,0,0.06)] shrink-0 w-[544px]" data-name="Container">
      <Container32 />
      <P4 />
    </div>
  );
}

function Container7() {
  return (
    <div className="col-1 justify-self-stretch relative row-1 self-start shrink-0" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[24px] items-center relative w-full">
        <Container8 />
        <Container20 />
        <Container31 />
      </div>
    </div>
  );
}

function Container6() {
  return (
    <div className="absolute bg-[#fafafa] grid grid-cols-[repeat(1,minmax(0,1fr))] grid-rows-[repeat(1,minmax(0,1fr))] h-[733px] left-px overflow-clip pt-[24px] px-[24px] top-[48.92px] w-[1736px]" data-name="Container">
      <Container7 />
    </div>
  );
}

function Span8() {
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

function Svg7() {
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

function Button3() {
  return (
    <div className="bg-white opacity-35 relative rounded-[6px] shrink-0 size-[31.997px]" data-name="button">
      <div aria-hidden="true" className="absolute border-[#e5e7eb] border-[1.111px] border-solid inset-0 pointer-events-none rounded-[6px]" />
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center pl-[1.111px] pr-[1.128px] py-[1.111px] relative size-full">
        <Svg7 />
      </div>
    </div>
  );
}

function Button4() {
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

function Svg8() {
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

function Button5() {
  return (
    <div className="bg-white opacity-35 relative rounded-[6px] size-[31.997px]" data-name="button">
      <div aria-hidden="true" className="absolute border-[#e5e7eb] border-[1.111px] border-solid inset-0 pointer-events-none rounded-[6px]" />
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center pl-[1.111px] pr-[1.128px] py-[1.111px] relative size-full">
        <Svg8 />
      </div>
    </div>
  );
}

function Container37() {
  return (
    <div className="h-[31.997px] relative shrink-0 w-[133.976px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[1.997px] items-center justify-end relative size-full">
        <Button3 />
        <Button4 />
        <div className="flex items-center justify-center relative shrink-0">
          <div className="flex-none rotate-180">
            <Button5 />
          </div>
        </div>
      </div>
    </div>
  );
}

function Container36() {
  return (
    <div className="absolute bg-[#fafafa] content-stretch flex h-[51px] items-center justify-between left-px pt-[1.111px] px-[15.99px] top-[781.92px] w-[1736px]" data-name="Container">
      <div aria-hidden="true" className="absolute border-[#f0f0f0] border-solid border-t-[1.111px] inset-0 pointer-events-none" />
      <Span8 />
      <Container37 />
    </div>
  );
}

function Container1() {
  return (
    <div className="bg-[#fafafa] flex-[1_0_0] h-[834.028px] min-h-px min-w-px relative rounded-[8px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid overflow-clip relative rounded-[inherit] size-full">
        <Container2 />
        <Container6 />
        <Container36 />
      </div>
      <div aria-hidden="true" className="absolute border-[#f0f0f0] border-[1.111px] border-solid inset-0 pointer-events-none rounded-[8px]" />
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