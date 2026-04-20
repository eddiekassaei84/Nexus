import svgPaths from "./svg-7n4j2tu57c";

function TextWrapper() {
  return (
    <div className="content-stretch flex flex-col gap-[4px] items-start not-italic pr-[8px] relative shrink-0 text-[#262626] w-[1257px]" data-name="Text Wrapper">
      <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[24px] min-w-full relative shrink-0 text-[16px] w-[min-content]">Archive Project</p>
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[20px] min-w-full relative shrink-0 text-[14px] w-[min-content]">Move this project to the archive workspace. Archived projects and their data will no longer be accessible in the active workspace until the project is unarchived.</p>
    </div>
  );
}

function Content() {
  return (
    <div className="content-stretch flex gap-[8px] items-start relative shrink-0 w-[380px]" data-name="Content">
      <div className="relative shrink-0 size-[24px]" data-name="24px/suggested/info-circle-filled">
        <div className="absolute inset-[8.33%]" data-name="Subtract">
          <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
            <path d={svgPaths.p93c9e00} fill="var(--fill-0, #FAAD14)" id="Subtract" />
          </svg>
        </div>
      </div>
      <TextWrapper />
    </div>
  );
}

function Frame2() {
  return (
    <div className="relative shrink-0 w-full">
      <div className="content-stretch flex items-start justify-between px-[24px] relative w-full">
        <Content />
      </div>
    </div>
  );
}

function Content1() {
  return (
    <div className="content-stretch flex gap-[4px] h-[32px] items-center justify-center overflow-clip relative shrink-0" data-name="content">
      <div className="overflow-clip relative shrink-0 size-[24px]" data-name="archivebox">
        <div className="absolute inset-[19.51%_18.17%_21.89%_18.17%]" data-name="archivebox">
          <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 15.2779 14.065">
            <path d={svgPaths.p314fc980} fill="var(--fill-0, white)" id="archivebox" />
          </svg>
        </div>
      </div>
      <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[14px] text-center text-white whitespace-nowrap">
        <p className="leading-[20px]">{`Archive `}</p>
      </div>
    </div>
  );
}

function Button() {
  return (
    <div className="bg-[#faad14] content-stretch flex flex-col items-center justify-center px-[16px] relative rounded-[4px] shrink-0" data-name="Button">
      <div aria-hidden="true" className="absolute border border-[#ffe58f] border-solid inset-0 pointer-events-none rounded-[4px]" />
      <Content1 />
    </div>
  );
}

function Frame1() {
  return (
    <div className="content-stretch flex items-center justify-end relative shrink-0 w-full">
      <Button />
    </div>
  );
}

function PanelImageContent() {
  return (
    <div className="relative shrink-0 w-full" data-name="Panel Image Content">
      <div className="content-stretch flex flex-col items-start px-[24px] relative w-full">
        <Frame1 />
      </div>
    </div>
  );
}

function Banner() {
  return (
    <div className="bg-[#fffbe6] relative rounded-[4px] shrink-0 w-full" data-name="Banner">
      <div aria-hidden="true" className="absolute border border-[#faad14] border-solid inset-0 pointer-events-none rounded-[4px]" />
      <div className="content-stretch flex flex-col gap-[8px] items-start pl-[16px] pr-[4px] py-[12px] relative w-full">
        <Frame2 />
        <PanelImageContent />
      </div>
    </div>
  );
}

export default function Frame() {
  return (
    <div className="content-stretch flex flex-col items-center relative size-full">
      <Banner />
    </div>
  );
}