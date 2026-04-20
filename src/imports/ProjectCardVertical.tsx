import svgPaths from "./svg-loqgqlds0m";
import imgImage from "figma:asset/794abd9c4f9b76f694f72984f4426d292661a8d6.png";
import imgAutodeskLogo2021Svg from "figma:asset/de5e422433a571d190e7c4d34a019906817d3b35.png";

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

export default function ProjectCardVertical() {
  return (
    <div className="content-stretch flex items-start relative shadow-[0px_1px_1px_0px_rgba(9,30,66,0.25),0px_0px_1px_0px_rgba(9,30,66,0.31)] size-full" data-name="Project Card Vertical">
      <Image />
      <Frame3 />
    </div>
  );
}