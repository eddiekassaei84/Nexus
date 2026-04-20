import svgPaths from "./svg-01ga0z05le";
import imgImage from "figma:asset/794abd9c4f9b76f694f72984f4426d292661a8d6.png";
import imgAutodeskLogo2021Svg from "figma:asset/de5e422433a571d190e7c4d34a019906817d3b35.png";
import imgImage16 from "figma:asset/53682e1811779057bb44f23138e859ff4a897918.png";
import imgImage15 from "figma:asset/1347207f59fbc71bd42a8237de662b6bec7350bc.png";

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

function Group2() {
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

function Group1() {
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

function Group3() {
  return (
    <div className="absolute contents inset-[17.11%_39.13%_44.74%_39.13%]">
      <Group2 />
      <Group1 />
    </div>
  );
}

function Group4() {
  return (
    <div className="absolute contents inset-[13.16%_13.26%_13.67%_13.04%]">
      <Group />
      <Group3 />
    </div>
  );
}

function Image1() {
  return (
    <div className="bg-white h-[200px] overflow-clip relative rounded-bl-[24px] rounded-tl-[24px] shrink-0 w-[230px]" data-name="Image">
      <div className="absolute h-[152px] left-[23px] overflow-clip top-[24px] w-[184px]" data-name="Empty Graphic">
        <Group4 />
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

export default function MainBody() {
  return (
    <div className="bg-[#f2f3f4] gap-x-[48px] gap-y-[48px] grid grid-cols-[repeat(3,minmax(0,1fr))] grid-rows-[repeat(3,minmax(0,1fr))] p-[48px] relative size-full" data-name="Main body">
      <ProjectCardVertical />
      <ProjectCardVertical1 />
      <ProjectCardVertical2 />
    </div>
  );
}