import svgPaths from "./svg-pm2yaulvbc";
import imgImage from "figma:asset/0707e6b2022462187b7b2dab43ed95bab6b24a66.png";

function Top() {
  return (
    <div className="content-stretch flex flex-col gap-[8px] items-center relative shrink-0 w-full" data-name="Top">
      <p className="font-['Roboto:Regular',sans-serif] font-normal leading-[1.1] relative shrink-0 text-[#f2f3f4] text-[28px] w-full whitespace-pre-wrap" style={{ fontVariationSettings: "'wdth' 100" }}>
        Personal Info.
      </p>
    </div>
  );
}

function Dock() {
  return (
    <div className="relative shrink-0 size-[28px]" data-name="Dock">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 28 28">
        <g id="Dock">
          <path clipRule="evenodd" d={svgPaths.pd443b00} fill="var(--fill-0, white)" fillRule="evenodd" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function Group() {
  return (
    <div className="relative size-full">
      <div className="absolute inset-[-4.04%]">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 18.9142 18.9142">
          <g id="Group 32">
            <path d={svgPaths.p5ba8960} id="Vector 19" stroke="var(--stroke-0, #F2F3F4)" strokeWidth="2" />
            <path d={svgPaths.p14a4c500} id="Vector 20" stroke="var(--stroke-0, #F2F3F4)" strokeWidth="2" />
          </g>
        </svg>
      </div>
    </div>
  );
}

function Headline() {
  return (
    <div className="bg-[#4c5a67] h-[56px] relative shadow-[0px_1px_0px_0px_rgba(0,0,0,0.25)] shrink-0 w-full" data-name="Headline">
      <div className="flex flex-row items-center size-full">
        <div className="content-center flex flex-wrap gap-[10px] items-center pl-[10px] pr-[15px] relative size-full">
          <div className="content-stretch flex flex-[1_0_0] flex-col gap-[48px] h-[30px] items-start min-h-px min-w-px relative" data-name="Section Text">
            <Top />
          </div>
          <Dock />
          <div className="overflow-clip relative shrink-0 size-[28px]" data-name="32px/suggested/x">
            <div className="absolute flex inset-[18.75%] items-center justify-center">
              <div className="flex-none rotate-90 size-[20px]">
                <Group />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Image() {
  return (
    <div className="h-[167px] opacity-80 pointer-events-none relative rounded-[8px] shrink-0 w-full" data-name="Image">
      <div aria-hidden="true" className="absolute inset-0 rounded-[8px]">
        <div className="absolute bg-[#e3e3e3] inset-0 rounded-[8px]" />
        <img alt="" className="absolute max-w-none object-contain opacity-20 rounded-[8px] size-full" src={imgImage} />
      </div>
      <div aria-hidden="true" className="absolute border border-[#bfbfbf] border-solid inset-0 rounded-[8px]" />
    </div>
  );
}

function Search() {
  return (
    <div className="bg-[rgba(0,0,0,0)] relative shrink-0 w-full" data-name="Search">
      <div aria-hidden="true" className="absolute border-[#d9d9d9] border-b-[1.067px] border-solid inset-0 pointer-events-none" />
      <div className="flex flex-col justify-center size-full">
        <div className="content-stretch flex flex-col items-start justify-center p-[12px] relative w-full">
          <Image />
        </div>
      </div>
    </div>
  );
}

function TextWrapper() {
  return (
    <div className="flex-[1_0_0] min-h-px min-w-px relative" data-name="Text Wrapper">
      <div className="flex flex-row items-center overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex items-center px-[16px] relative w-full">
          <div className="flex flex-[1_0_0] flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] min-h-px min-w-px not-italic overflow-hidden relative text-[14px] text-[rgba(0,0,0,0.88)] text-ellipsis whitespace-nowrap">
            <p className="leading-[normal] overflow-hidden">Name</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function BodyCell() {
  return (
    <div className="bg-white h-[40px] relative shrink-0 w-[205px]" data-name="Body-Cell">
      <div className="content-stretch flex items-center overflow-clip py-[16px] relative rounded-[inherit] size-full">
        <TextWrapper />
      </div>
      <div aria-hidden="true" className="absolute border-[#dbdbdb] border-b border-solid inset-0 pointer-events-none" />
    </div>
  );
}

function TextWrapper1() {
  return (
    <div className="flex-[1_0_0] min-h-px min-w-px relative" data-name="Text Wrapper">
      <div className="flex flex-row items-center overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex items-center px-[16px] relative w-full">
          <div className="flex flex-[1_0_0] flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] min-h-px min-w-px not-italic overflow-hidden relative text-[14px] text-[rgba(0,0,0,0.88)] text-ellipsis whitespace-nowrap">
            <p className="leading-[normal] overflow-hidden">Email</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function BodyCell1() {
  return (
    <div className="bg-white h-[40px] relative shrink-0 w-[205px]" data-name="Body-Cell">
      <div className="content-stretch flex items-center overflow-clip py-[16px] relative rounded-[inherit] size-full">
        <TextWrapper1 />
      </div>
      <div aria-hidden="true" className="absolute border-[#dbdbdb] border-b border-solid inset-0 pointer-events-none" />
    </div>
  );
}

function TextWrapper2() {
  return (
    <div className="flex-[1_0_0] min-h-px min-w-px relative" data-name="Text Wrapper">
      <div className="flex flex-row items-center overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex items-center px-[16px] relative w-full">
          <div className="flex flex-[1_0_0] flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] min-h-px min-w-px not-italic overflow-hidden relative text-[14px] text-[rgba(0,0,0,0.88)] text-ellipsis whitespace-nowrap">
            <p className="leading-[normal] overflow-hidden">Job Title</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function BodyCell2() {
  return (
    <div className="bg-white h-[40px] relative shrink-0 w-[205px]" data-name="Body-Cell">
      <div className="content-stretch flex items-center overflow-clip py-[16px] relative rounded-[inherit] size-full">
        <TextWrapper2 />
      </div>
      <div aria-hidden="true" className="absolute border-[#dbdbdb] border-b border-solid inset-0 pointer-events-none" />
    </div>
  );
}

function TextWrapper3() {
  return (
    <div className="flex-[1_0_0] min-h-px min-w-px relative" data-name="Text Wrapper">
      <div className="flex flex-row items-center overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex items-center px-[16px] relative w-full">
          <div className="flex flex-[1_0_0] flex-col font-['Actor:Regular',sans-serif] justify-center leading-[0] min-h-px min-w-px not-italic overflow-hidden relative text-[#1b2736] text-[14px] text-ellipsis whitespace-nowrap">
            <p className="leading-[1.2] overflow-hidden">Business Phone</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function BodyCell3() {
  return (
    <div className="bg-white h-[40px] relative shrink-0 w-[205px]" data-name="Body-Cell">
      <div className="content-stretch flex items-center overflow-clip py-[16px] relative rounded-[inherit] size-full">
        <TextWrapper3 />
      </div>
      <div aria-hidden="true" className="absolute border-[#dbdbdb] border-b border-solid inset-0 pointer-events-none" />
    </div>
  );
}

function TextWrapper4() {
  return (
    <div className="flex-[1_0_0] min-h-px min-w-px relative" data-name="Text Wrapper">
      <div className="flex flex-row items-center overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex items-center px-[16px] relative w-full">
          <div className="flex flex-[1_0_0] flex-col font-['Actor:Regular',sans-serif] justify-center leading-[0] min-h-px min-w-px not-italic overflow-hidden relative text-[#1b2736] text-[14px] text-ellipsis whitespace-nowrap">
            <p className="leading-[1.2] overflow-hidden">Business Fax:</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function BodyCell4() {
  return (
    <div className="bg-white h-[40px] relative shrink-0 w-[205px]" data-name="Body-Cell">
      <div className="content-stretch flex items-center overflow-clip py-[16px] relative rounded-[inherit] size-full">
        <TextWrapper4 />
      </div>
      <div aria-hidden="true" className="absolute border-[#dbdbdb] border-b border-solid inset-0 pointer-events-none" />
    </div>
  );
}

function TextWrapper5() {
  return (
    <div className="flex-[1_0_0] min-h-px min-w-px relative" data-name="Text Wrapper">
      <div className="flex flex-row items-center overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex items-center px-[16px] relative w-full">
          <div className="flex flex-[1_0_0] flex-col font-['Actor:Regular',sans-serif] justify-center leading-[0] min-h-px min-w-px not-italic overflow-hidden relative text-[#1b2736] text-[14px] text-ellipsis whitespace-nowrap">
            <p className="leading-[1.2] overflow-hidden">Cell Phone</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function BodyCell5() {
  return (
    <div className="bg-white h-[40px] relative shrink-0 w-[205px]" data-name="Body-Cell">
      <div className="content-stretch flex items-center overflow-clip py-[16px] relative rounded-[inherit] size-full">
        <TextWrapper5 />
      </div>
      <div aria-hidden="true" className="absolute border-[#dbdbdb] border-b border-solid inset-0 pointer-events-none" />
    </div>
  );
}

function TextWrapper6() {
  return (
    <div className="flex-[1_0_0] min-h-px min-w-px relative" data-name="Text Wrapper">
      <div className="flex flex-row items-center overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex items-center px-[16px] relative w-full">
          <div className="flex flex-[1_0_0] flex-col font-['Actor:Regular',sans-serif] justify-center leading-[0] min-h-px min-w-px not-italic overflow-hidden relative text-[#1b2736] text-[14px] text-ellipsis whitespace-nowrap">
            <p className="leading-[1.2] overflow-hidden">Permission Type</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function BodyCell6() {
  return (
    <div className="bg-white h-[40px] relative shrink-0 w-[205px]" data-name="Body-Cell">
      <div className="content-stretch flex items-center overflow-clip py-[16px] relative rounded-[inherit] size-full">
        <TextWrapper6 />
      </div>
      <div aria-hidden="true" className="absolute border-[#dbdbdb] border-b border-solid inset-0 pointer-events-none" />
    </div>
  );
}

function TextWrapper7() {
  return (
    <div className="flex-[1_0_0] min-h-px min-w-px relative" data-name="Text Wrapper">
      <div className="flex flex-row items-center overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex items-center px-[16px] relative w-full">
          <div className="flex flex-[1_0_0] flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] min-h-px min-w-px not-italic overflow-hidden relative text-[14px] text-[rgba(0,0,0,0.88)] text-ellipsis whitespace-nowrap">
            <p className="leading-[normal] overflow-hidden">Address</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function BodyCell7() {
  return (
    <div className="bg-white col-1 h-[28px] ml-0 mt-0 relative row-1 w-[205px]" data-name="Body-Cell">
      <div className="flex flex-row items-center overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex items-center py-[16px] relative size-full">
          <TextWrapper7 />
        </div>
      </div>
    </div>
  );
}

function TextWrapper8() {
  return (
    <div className="flex-[1_0_0] h-[17px] min-h-px min-w-px relative" data-name="Text Wrapper">
      <div className="flex flex-row items-center size-full">
        <div className="size-full" />
      </div>
    </div>
  );
}

function BodyCell8() {
  return (
    <div className="bg-white col-1 h-[28px] ml-0 mt-[28px] relative row-1 w-[205px]" data-name="Body-Cell">
      <div className="flex flex-row items-center overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex items-center py-[16px] relative size-full">
          <TextWrapper8 />
        </div>
      </div>
    </div>
  );
}

function TextWrapper9() {
  return (
    <div className="flex-[1_0_0] h-[17px] min-h-px min-w-px relative" data-name="Text Wrapper">
      <div className="flex flex-row items-center size-full">
        <div className="size-full" />
      </div>
    </div>
  );
}

function BodyCell9() {
  return (
    <div className="bg-white col-1 h-[28px] ml-0 mt-[56px] relative row-1 w-[205px]" data-name="Body-Cell">
      <div className="flex flex-row items-center overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex items-center py-[16px] relative size-full">
          <TextWrapper9 />
        </div>
      </div>
    </div>
  );
}

function TextWrapper10() {
  return (
    <div className="flex-[1_0_0] h-[17px] min-h-px min-w-px relative" data-name="Text Wrapper">
      <div className="flex flex-row items-center size-full">
        <div className="size-full" />
      </div>
    </div>
  );
}

function BodyCell10() {
  return (
    <div className="bg-white col-1 h-[28px] ml-0 mt-[84px] relative row-1 w-[205px]" data-name="Body-Cell">
      <div className="flex flex-row items-center overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex items-center py-[16px] relative size-full">
          <TextWrapper10 />
        </div>
      </div>
      <div aria-hidden="true" className="absolute border-[#dbdbdb] border-b border-solid inset-0 pointer-events-none" />
    </div>
  );
}

function Group2() {
  return (
    <div className="grid-cols-[max-content] grid-rows-[max-content] inline-grid leading-[0] place-items-start relative shrink-0">
      <BodyCell7 />
      <BodyCell8 />
      <BodyCell9 />
      <BodyCell10 />
    </div>
  );
}

function ColumnText() {
  return (
    <div className="bg-white content-stretch flex flex-col items-start overflow-clip relative shrink-0" data-name="Column / Text">
      <BodyCell />
      <BodyCell1 />
      <BodyCell2 />
      <BodyCell3 />
      <BodyCell4 />
      <BodyCell5 />
      <BodyCell6 />
      <Group2 />
    </div>
  );
}

function TextWrapper11() {
  return (
    <div className="flex-[1_0_0] min-h-px min-w-px relative" data-name="Text Wrapper">
      <div className="flex flex-row items-center overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex items-center px-[16px] relative w-full">
          <div className="flex flex-[1_0_0] flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] min-h-px min-w-px not-italic overflow-hidden relative text-[14px] text-[rgba(0,0,0,0.88)] text-ellipsis whitespace-nowrap">
            <p className="leading-[normal] overflow-hidden">Eddie Kassaei</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function BodyCell11() {
  return (
    <div className="bg-white h-[40px] relative shrink-0 w-[205px]" data-name="Body-Cell">
      <div className="content-stretch flex items-center overflow-clip py-[16px] relative rounded-[inherit] size-full">
        <TextWrapper11 />
      </div>
      <div aria-hidden="true" className="absolute border-[#dbdbdb] border-b border-solid inset-0 pointer-events-none" />
    </div>
  );
}

function TextWrapper12() {
  return (
    <div className="flex-[1_0_0] min-h-px min-w-px relative" data-name="Text Wrapper">
      <div className="flex flex-row items-center overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex items-center px-[16px] relative w-full">
          <div className="flex flex-[1_0_0] flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] min-h-px min-w-px not-italic overflow-hidden relative text-[14px] text-[rgba(0,0,0,0.88)] text-ellipsis whitespace-nowrap">
            <p className="leading-[normal] overflow-hidden">eddie@example.com</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function BodyCell12() {
  return (
    <div className="bg-white h-[40px] relative shrink-0 w-[205px]" data-name="Body-Cell">
      <div className="content-stretch flex items-center overflow-clip py-[16px] relative rounded-[inherit] size-full">
        <TextWrapper12 />
      </div>
      <div aria-hidden="true" className="absolute border-[#dbdbdb] border-b border-solid inset-0 pointer-events-none" />
    </div>
  );
}

function TextWrapper13() {
  return (
    <div className="flex-[1_0_0] min-h-px min-w-px relative" data-name="Text Wrapper">
      <div className="flex flex-row items-center overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex items-center px-[16px] relative w-full">
          <div className="flex flex-[1_0_0] flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] min-h-px min-w-px not-italic overflow-hidden relative text-[14px] text-[rgba(0,0,0,0.88)] text-ellipsis whitespace-nowrap">
            <p className="leading-[normal] overflow-hidden">VDC Manager</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function BodyCell13() {
  return (
    <div className="bg-white h-[40px] relative shrink-0 w-[205px]" data-name="Body-Cell">
      <div className="content-stretch flex items-center overflow-clip py-[16px] relative rounded-[inherit] size-full">
        <TextWrapper13 />
      </div>
      <div aria-hidden="true" className="absolute border-[#dbdbdb] border-b border-solid inset-0 pointer-events-none" />
    </div>
  );
}

function TextWrapper14() {
  return (
    <div className="flex-[1_0_0] min-h-px min-w-px relative" data-name="Text Wrapper">
      <div className="flex flex-row items-center overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex items-center px-[16px] relative w-full">
          <div className="flex flex-[1_0_0] flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] min-h-px min-w-px not-italic overflow-hidden relative text-[14px] text-[rgba(0,0,0,0.88)] text-ellipsis whitespace-nowrap">
            <p className="leading-[normal] overflow-hidden">832-470 9007</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function BodyCell14() {
  return (
    <div className="bg-white h-[40px] relative shrink-0 w-[205px]" data-name="Body-Cell">
      <div className="content-stretch flex items-center overflow-clip py-[16px] relative rounded-[inherit] size-full">
        <TextWrapper14 />
      </div>
      <div aria-hidden="true" className="absolute border-[#dbdbdb] border-b border-solid inset-0 pointer-events-none" />
    </div>
  );
}

function TextWrapper15() {
  return (
    <div className="flex-[1_0_0] h-[17px] min-h-px min-w-px relative" data-name="Text Wrapper">
      <div className="flex flex-row items-center size-full">
        <div className="size-full" />
      </div>
    </div>
  );
}

function BodyCell15() {
  return (
    <div className="bg-white h-[40px] relative shrink-0 w-[205px]" data-name="Body-Cell">
      <div className="content-stretch flex items-center overflow-clip py-[16px] relative rounded-[inherit] size-full">
        <TextWrapper15 />
      </div>
      <div aria-hidden="true" className="absolute border-[#dbdbdb] border-b border-solid inset-0 pointer-events-none" />
    </div>
  );
}

function TextWrapper16() {
  return (
    <div className="flex-[1_0_0] min-h-px min-w-px relative" data-name="Text Wrapper">
      <div className="flex flex-row items-center overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex items-center px-[16px] relative w-full">
          <div className="flex flex-[1_0_0] flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] min-h-px min-w-px not-italic overflow-hidden relative text-[14px] text-[rgba(0,0,0,0.88)] text-ellipsis whitespace-nowrap">
            <p className="leading-[normal] overflow-hidden">832-470 9007</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function BodyCell16() {
  return (
    <div className="bg-white h-[40px] relative shrink-0 w-[205px]" data-name="Body-Cell">
      <div className="content-stretch flex items-center overflow-clip py-[16px] relative rounded-[inherit] size-full">
        <TextWrapper16 />
      </div>
      <div aria-hidden="true" className="absolute border-[#dbdbdb] border-b border-solid inset-0 pointer-events-none" />
    </div>
  );
}

function TextWrapper17() {
  return (
    <div className="flex-[1_0_0] min-h-px min-w-px relative" data-name="Text Wrapper">
      <div className="flex flex-row items-center overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex items-center px-[16px] relative w-full">
          <div className="flex flex-[1_0_0] flex-col font-['Actor:Regular',sans-serif] justify-center leading-[0] min-h-px min-w-px not-italic overflow-hidden relative text-[#243746] text-[14px] text-ellipsis whitespace-nowrap">
            <p className="leading-[1.2] overflow-hidden">Project Admin</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function BodyCell17() {
  return (
    <div className="bg-white h-[40px] relative shrink-0 w-[205px]" data-name="Body-Cell">
      <div className="content-stretch flex items-center overflow-clip py-[16px] relative rounded-[inherit] size-full">
        <TextWrapper17 />
      </div>
      <div aria-hidden="true" className="absolute border-[#dbdbdb] border-b border-solid inset-0 pointer-events-none" />
    </div>
  );
}

function TextWrapper18() {
  return (
    <div className="flex-[1_0_0] min-h-px min-w-px relative" data-name="Text Wrapper">
      <div className="flex flex-row items-center overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex items-center px-[16px] relative w-full">
          <div className="flex flex-[1_0_0] flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] min-h-px min-w-px not-italic overflow-hidden relative text-[14px] text-[rgba(0,0,0,0.88)] text-ellipsis whitespace-nowrap">
            <p className="leading-[normal] overflow-hidden">1705 Cedar Bend Dr</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function BodyCell18() {
  return (
    <div className="bg-white col-1 h-[28px] ml-0 mt-0 relative row-1 w-[205px]" data-name="Body-Cell">
      <div className="flex flex-row items-center overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex items-center py-[16px] relative size-full">
          <TextWrapper18 />
        </div>
      </div>
    </div>
  );
}

function TextWrapper19() {
  return (
    <div className="flex-[1_0_0] min-h-px min-w-px relative" data-name="Text Wrapper">
      <div className="flex flex-row items-center overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex items-center px-[16px] relative w-full">
          <div className="flex flex-[1_0_0] flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] min-h-px min-w-px not-italic overflow-hidden relative text-[14px] text-[rgba(0,0,0,0.88)] text-ellipsis whitespace-nowrap">
            <p className="leading-[normal] overflow-hidden">Austin</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function BodyCell19() {
  return (
    <div className="bg-white col-1 h-[28px] ml-0 mt-[28px] relative row-1 w-[205px]" data-name="Body-Cell">
      <div className="flex flex-row items-center overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex items-center py-[16px] relative size-full">
          <TextWrapper19 />
        </div>
      </div>
    </div>
  );
}

function TextWrapper20() {
  return (
    <div className="flex-[1_0_0] min-h-px min-w-px relative" data-name="Text Wrapper">
      <div className="flex flex-row items-center overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex items-center px-[16px] relative w-full">
          <div className="flex flex-[1_0_0] flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] min-h-px min-w-px not-italic overflow-hidden relative text-[14px] text-[rgba(0,0,0,0.88)] text-ellipsis whitespace-nowrap">
            <p className="leading-[normal] overflow-hidden">Texas</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function BodyCell20() {
  return (
    <div className="bg-white col-1 h-[28px] ml-0 mt-[56px] relative row-1 w-[205px]" data-name="Body-Cell">
      <div className="flex flex-row items-center overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex items-center py-[16px] relative size-full">
          <TextWrapper20 />
        </div>
      </div>
    </div>
  );
}

function TextWrapper21() {
  return (
    <div className="flex-[1_0_0] min-h-px min-w-px relative" data-name="Text Wrapper">
      <div className="flex flex-row items-center overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex items-center px-[16px] relative w-full">
          <div className="flex flex-[1_0_0] flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] min-h-px min-w-px not-italic overflow-hidden relative text-[14px] text-[rgba(0,0,0,0.88)] text-ellipsis whitespace-nowrap">
            <p className="leading-[normal] overflow-hidden">78758</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function BodyCell21() {
  return (
    <div className="bg-white col-1 h-[28px] ml-0 mt-[84px] relative row-1 w-[205px]" data-name="Body-Cell">
      <div className="flex flex-row items-center overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex items-center py-[16px] relative size-full">
          <TextWrapper21 />
        </div>
      </div>
      <div aria-hidden="true" className="absolute border-[#dbdbdb] border-b border-solid inset-0 pointer-events-none" />
    </div>
  );
}

function Group1() {
  return (
    <div className="grid-cols-[max-content] grid-rows-[max-content] inline-grid leading-[0] place-items-start relative shrink-0">
      <BodyCell18 />
      <BodyCell19 />
      <BodyCell20 />
      <BodyCell21 />
    </div>
  );
}

function ColumnText1() {
  return (
    <div className="bg-white content-stretch flex flex-col items-start overflow-clip relative shrink-0" data-name="Column / Text">
      <BodyCell11 />
      <BodyCell12 />
      <BodyCell13 />
      <BodyCell14 />
      <BodyCell15 />
      <BodyCell16 />
      <BodyCell17 />
      <Group1 />
    </div>
  );
}

function Frame() {
  return (
    <div className="content-stretch flex items-start justify-center relative shrink-0">
      <ColumnText />
      <ColumnText1 />
    </div>
  );
}

function TextWrapper22() {
  return (
    <div className="flex-[1_0_0] min-h-px min-w-px relative" data-name="Text Wrapper">
      <div className="flex flex-row items-center overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex items-center px-[16px] relative w-full">
          <div className="flex flex-[1_0_0] flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] min-h-px min-w-px not-italic overflow-hidden relative text-[14px] text-[rgba(0,0,0,0.88)] text-ellipsis whitespace-nowrap">
            <p className="leading-[normal] overflow-hidden">{`Company  `}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function BodyCell22() {
  return (
    <div className="bg-white h-[40px] relative shrink-0 w-[205px]" data-name="Body-Cell">
      <div className="content-stretch flex items-center overflow-clip py-[16px] relative rounded-[inherit] size-full">
        <TextWrapper22 />
      </div>
      <div aria-hidden="true" className="absolute border-[#dbdbdb] border-b border-solid inset-0 pointer-events-none" />
    </div>
  );
}

function TextWrapper23() {
  return (
    <div className="flex-[1_0_0] min-h-px min-w-px relative" data-name="Text Wrapper">
      <div className="flex flex-row items-center overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex items-center px-[16px] relative w-full">
          <div className="flex flex-[1_0_0] flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] min-h-px min-w-px not-italic overflow-hidden relative text-[14px] text-[rgba(0,0,0,0.88)] text-ellipsis whitespace-nowrap">
            <p className="leading-[normal] overflow-hidden">Office</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function BodyCell23() {
  return (
    <div className="bg-white h-[40px] relative shrink-0 w-[205px]" data-name="Body-Cell">
      <div className="content-stretch flex items-center overflow-clip py-[16px] relative rounded-[inherit] size-full">
        <TextWrapper23 />
      </div>
      <div aria-hidden="true" className="absolute border-[#dbdbdb] border-b border-solid inset-0 pointer-events-none" />
    </div>
  );
}

function ColumnText2() {
  return (
    <div className="bg-white content-stretch flex flex-col items-start overflow-clip relative shrink-0" data-name="Column / Text">
      <BodyCell22 />
      <BodyCell23 />
    </div>
  );
}

function TextWrapper24() {
  return (
    <div className="flex-[1_0_0] min-h-px min-w-px relative" data-name="Text Wrapper">
      <div className="flex flex-row items-center overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex items-center px-[16px] relative w-full">
          <div className="flex flex-[1_0_0] flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] min-h-px min-w-px not-italic overflow-hidden relative text-[14px] text-[rgba(0,0,0,0.88)] text-ellipsis whitespace-nowrap">
            <p className="leading-[normal] overflow-hidden">Henrich Advisory</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function BodyCell24() {
  return (
    <div className="bg-white h-[40px] relative shrink-0 w-[205px]" data-name="Body-Cell">
      <div className="content-stretch flex items-center overflow-clip py-[16px] relative rounded-[inherit] size-full">
        <TextWrapper24 />
      </div>
      <div aria-hidden="true" className="absolute border-[#dbdbdb] border-b border-solid inset-0 pointer-events-none" />
    </div>
  );
}

function TextWrapper25() {
  return (
    <div className="flex-[1_0_0] min-h-px min-w-px relative" data-name="Text Wrapper">
      <div className="flex flex-row items-center overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex items-center px-[16px] relative w-full">
          <div className="flex flex-[1_0_0] flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] min-h-px min-w-px not-italic overflow-hidden relative text-[14px] text-[rgba(0,0,0,0.88)] text-ellipsis whitespace-nowrap">
            <p className="leading-[normal] overflow-hidden">Austin</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function BodyCell25() {
  return (
    <div className="bg-white h-[40px] relative shrink-0 w-[205px]" data-name="Body-Cell">
      <div className="content-stretch flex items-center overflow-clip py-[16px] relative rounded-[inherit] size-full">
        <TextWrapper25 />
      </div>
      <div aria-hidden="true" className="absolute border-[#dbdbdb] border-b border-solid inset-0 pointer-events-none" />
    </div>
  );
}

function ColumnText3() {
  return (
    <div className="bg-white content-stretch flex flex-col items-start overflow-clip relative shrink-0" data-name="Column / Text">
      <BodyCell24 />
      <BodyCell25 />
    </div>
  );
}

function Frame1() {
  return (
    <div className="content-stretch flex items-start justify-center relative shrink-0">
      <ColumnText2 />
      <ColumnText3 />
    </div>
  );
}

function Table() {
  return (
    <div className="bg-white content-stretch flex flex-col h-[880px] items-start overflow-clip relative shrink-0" data-name="Table">
      <Frame />
      <Frame1 />
    </div>
  );
}

function DataTable() {
  return (
    <div className="content-stretch flex h-[1064px] items-start relative shrink-0 w-full" data-name="Data Table">
      <Table />
    </div>
  );
}

function SidePanel() {
  return (
    <div className="bg-white content-stretch flex flex-col h-[791px] items-start overflow-clip relative shrink-0 w-[410px]" data-name="Side Panel">
      <Headline />
      <Search />
      <DataTable />
    </div>
  );
}

export default function Container() {
  return (
    <div className="bg-[rgba(0,0,0,0)] relative rounded-[8px] size-full" data-name="Container">
      <div className="content-stretch flex flex-col items-center overflow-clip relative rounded-[inherit] size-full">
        <SidePanel />
      </div>
      <div aria-hidden="true" className="absolute border border-[#d9d9d9] border-solid inset-0 pointer-events-none rounded-[8px] shadow-[0px_10px_18px_0px_rgba(9,30,66,0.15),0px_0px_1px_0px_rgba(9,30,66,0.31)]" />
    </div>
  );
}