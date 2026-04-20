import svgPaths from "./svg-hjxz06n11w";

function Group1() {
  return (
    <div className="col-1 h-[22.801px] ml-0 mt-0 relative row-1 w-[20.947px]" data-name="Group">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20.9469 22.801">
        <g id="Group">
          <path d={svgPaths.p9b14180} fill="var(--fill-0, #FF4D00)" id="Vector" />
          <path d={svgPaths.p22ded300} fill="var(--fill-0, #FF4D00)" id="Vector_2" />
        </g>
      </svg>
    </div>
  );
}

function Group3() {
  return (
    <div className="col-1 h-[5.486px] ml-[69.36%] mt-0 relative row-1 w-[3.105px]" data-name="Group">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 3.10518 5.48574">
        <g id="Group">
          <path d={svgPaths.p10bdef00} fill="var(--fill-0, #A7A8A9)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function Group4() {
  return (
    <div className="col-1 h-[5.487px] ml-[55.99%] mt-[7.85%] relative row-1 w-[3.105px]" data-name="Group">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 3.10518 5.48652">
        <g id="Group">
          <path d={svgPaths.p25320d00} fill="var(--fill-0, #A7A8A9)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function Group5() {
  return (
    <div className="col-1 h-[7.548px] ml-0 mt-[27.13%] relative row-1 w-[4.277px]" data-name="Group">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 4.27674 7.54806">
        <g id="Group">
          <path d={svgPaths.p26a82b00} fill="var(--fill-0, #A7A8A9)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function Group6() {
  return (
    <div className="col-1 h-[7.549px] ml-[15.53%] mt-[18.01%] relative row-1 w-[4.277px]" data-name="Group">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 4.27674 7.54884">
        <g id="Group">
          <path d={svgPaths.p13bad680} fill="var(--fill-0, #A7A8A9)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function Group7() {
  return (
    <div className="col-1 h-[7.548px] ml-[31.06%] mt-[8.88%] relative row-1 w-[4.277px]" data-name="Group">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 4.27674 7.54806">
        <g id="Group">
          <path d={svgPaths.p26a82b00} fill="var(--fill-0, #A7A8A9)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function Group2() {
  return (
    <div className="col-1 grid-cols-[max-content] grid-rows-[max-content] inline-grid ml-0 mt-[5.57%] place-items-start relative row-1" data-name="Group">
      <Group3 />
      <Group4 />
      <Group5 />
      <Group6 />
      <Group7 />
    </div>
  );
}

function Group() {
  return (
    <div className="grid-cols-[max-content] grid-rows-[max-content] inline-grid leading-[0] place-items-start relative shrink-0" data-name="Group">
      <Group1 />
      <Group2 />
    </div>
  );
}

function ImgInertiaLogoMargin() {
  return (
    <div className="content-stretch flex flex-col items-start max-w-[357.25px] pr-[8px] relative shrink-0 w-[32px]" data-name="Img - Inertia Logo:margin">
      <Group />
    </div>
  );
}

function HeaderTitleContainer() {
  return (
    <div className="content-stretch flex items-center relative shrink-0" data-name="Header Title Container">
      <ImgInertiaLogoMargin />
      <div className="flex flex-col font-['DM_Sans:Bold',sans-serif] font-bold justify-center leading-[0] relative shrink-0 text-[16px] text-white w-[358px]" style={{ fontVariationSettings: "'opsz' 14" }}>
        <p className="leading-[24px] whitespace-pre-wrap">Import</p>
      </div>
    </div>
  );
}

function ButtonMargin() {
  return <div className="h-[20px] shrink-0 w-[36px]" data-name="Button:margin" />;
}

function Group8() {
  return (
    <div className="relative size-full">
      <div className="absolute inset-[-5%]">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16.5 16.5">
          <g id="Group 32">
            <path d="M0.75 8.25H15.75" id="Vector 19" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeWidth="1.5" />
            <path d="M8.25 0.75L8.25 15.75" id="Vector 20" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeWidth="1.5" />
          </g>
        </svg>
      </div>
    </div>
  );
}

function ButtonMargin1() {
  return (
    <div className="content-stretch flex flex-col items-start pl-[16px] relative shrink-0" data-name="Button:margin">
      <div className="overflow-clip relative shrink-0 size-[20px]" data-name="24px/suggested/x">
        <div className="absolute flex inset-[-3.03%] items-center justify-center">
          <div className="flex-none rotate-45 size-[18px]">
            <Group8 />
          </div>
        </div>
      </div>
    </div>
  );
}

function Container() {
  return (
    <div className="content-stretch flex items-center relative shrink-0" data-name="Container">
      <ButtonMargin />
      <ButtonMargin1 />
    </div>
  );
}

function Header() {
  return (
    <div className="bg-[#243746] h-[48px] relative shrink-0 w-full" data-name="Header">
      <div aria-hidden="true" className="absolute border-[#c3c7cc] border-b-[0.889px] border-solid inset-0 pointer-events-none" />
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex items-center justify-between pb-[12.889px] pt-[12px] px-[16px] relative size-full">
          <HeaderTitleContainer />
          <Container />
        </div>
      </div>
    </div>
  );
}

function Header1() {
  return (
    <div className="bg-[#f5f5f5] h-[24px] relative shrink-0 w-full" data-name="Header">
      <div className="flex flex-row items-center size-full">
        <div className="size-full" />
      </div>
    </div>
  );
}

function Frame6() {
  return (
    <div className="content-stretch flex items-start relative shrink-0">
      <div className="flex flex-col font-['Actor:Regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#1b2736] text-[24px] whitespace-nowrap">
        <p className="leading-[1.2]">Import Summary for [Project_Name]</p>
      </div>
    </div>
  );
}

function LabelValue() {
  return (
    <div className="content-stretch flex flex-[1_0_0] items-center min-h-px min-w-px relative" data-name="Label Value">
      <Frame6 />
    </div>
  );
}

function Title() {
  return (
    <div className="content-stretch flex items-start relative shrink-0 w-full" data-name="Title">
      <LabelValue />
    </div>
  );
}

function Frame1() {
  return (
    <div className="content-stretch flex gap-[12px] items-end relative shrink-0 w-full">
      <div className="relative shrink-0 size-[24px]" data-name="24px/suggested/check-circle-filled">
        <div className="absolute inset-[8.33%]" data-name="Subtract">
          <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
            <path d={svgPaths.p2170b040} fill="var(--fill-0, #00AC2B)" id="Subtract" />
          </svg>
        </div>
      </div>
      <div className="font-['Inter:Regular','Noto_Sans:Regular',sans-serif] font-normal h-[24px] leading-[20px] not-italic relative shrink-0 text-[#595959] text-[14px] w-[552px] whitespace-pre-wrap">
        <p className="mb-0">{`24 users added successfully   `}</p>
        <p>&nbsp;</p>
      </div>
    </div>
  );
}

function ArrowTriangle2CirclepathCircleFill() {
  return (
    <div className="relative shrink-0 size-[24px]" data-name="arrow.triangle.2.circlepath.circle.fill">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="arrow.triangle.2.circlepath.circle.fill">
          <path d={svgPaths.p172d3d80} fill="var(--fill-0, #1890FF)" id="arrow.triangle.2.circlepath.circle.fill_2" />
        </g>
      </svg>
    </div>
  );
}

function Frame2() {
  return (
    <div className="content-stretch flex gap-[12px] items-end relative shrink-0 w-full">
      <ArrowTriangle2CirclepathCircleFill />
      <p className="font-['Inter:Regular',sans-serif] font-normal h-[24px] leading-[20px] not-italic relative shrink-0 text-[#595959] text-[14px] w-[552px] whitespace-pre-wrap">{`7 users updated  `}</p>
    </div>
  );
}

function Frame3() {
  return (
    <div className="content-stretch flex gap-[12px] items-end relative shrink-0 w-full">
      <div className="relative shrink-0 size-[24px]" data-name="24px/suggested/exclamation-triangle-filled">
        <div className="absolute inset-[12.5%_9.74%_16.67%_9.74%]" data-name="Subtract">
          <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 19.3235 17">
            <path clipRule="evenodd" d={svgPaths.p18d02c80} fill="var(--fill-0, #FAAD14)" fillRule="evenodd" id="Subtract" />
          </svg>
        </div>
      </div>
      <p className="font-['Inter:Regular',sans-serif] font-normal h-[24px] leading-[20px] not-italic relative shrink-0 text-[#595959] text-[14px] w-[552px] whitespace-pre-wrap">{`3 duplicate entries skipped  `}</p>
    </div>
  );
}

function Frame4() {
  return (
    <div className="content-stretch flex gap-[12px] items-end relative shrink-0 w-full">
      <div className="relative shrink-0 size-[24px]" data-name="24px/suggested/x-circle-filled">
        <div className="absolute flex inset-[-8.34%_-8.93%_-9.52%_-8.93%] items-center justify-center">
          <div className="flex-none rotate-45 size-[20px]">
            <div className="relative size-full" data-name="Subtract">
              <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20.0004 20.0004">
                <path d={svgPaths.p3c5cc980} fill="var(--fill-0, #F5222D)" id="Subtract" />
              </svg>
            </div>
          </div>
        </div>
      </div>
      <p className="font-['Inter:Regular',sans-serif] font-normal h-[24px] leading-[20px] not-italic relative shrink-0 text-[#595959] text-[14px] w-[552px] whitespace-pre-wrap">{` 2 failed to import (see details in report)`}</p>
    </div>
  );
}

function Component24PxSuggestedCheckCircleFilled() {
  return (
    <div className="relative shrink-0 size-[24px]" data-name="24px/suggested/check-circle-filled">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="24px/suggested/check-circle-filled">
          <path d={svgPaths.p2aea7800} fill="var(--fill-0, #74E0C1)" id="Subtract" />
        </g>
      </svg>
    </div>
  );
}

function Frame5() {
  return (
    <div className="content-stretch flex gap-[12px] items-end relative shrink-0 w-full">
      <Component24PxSuggestedCheckCircleFilled />
      <div className="font-['Inter:Regular','Noto_Sans:Regular',sans-serif] font-normal h-[24px] leading-[20px] not-italic relative shrink-0 text-[#595959] text-[14px] w-[552px] whitespace-pre-wrap">
        <p className="mb-0">{`12 Invitation Sent   `}</p>
        <p>&nbsp;</p>
      </div>
    </div>
  );
}

function Content() {
  return (
    <div className="content-stretch flex gap-[8px] items-center overflow-clip px-[12px] relative shrink-0" data-name="Content">
      <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[#595959] text-[14px] whitespace-nowrap">
        <p className="leading-[20px]">Filename_report.csv</p>
      </div>
    </div>
  );
}

function TableItemRowItem() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col h-[44px] items-start justify-center min-h-px min-w-px py-[4px] relative" data-name="Table Item / Row Item">
      <Content />
    </div>
  );
}

function Content1() {
  return (
    <div className="content-stretch flex gap-[4px] h-[40px] items-center justify-center overflow-clip px-[16px] relative rounded-[4px] shrink-0" data-name="content">
      <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[#3b82f6] text-[0px] text-center whitespace-nowrap">
        <p className="[text-decoration-skip-ink:none] decoration-solid leading-[22px] text-[16px] underline">Download Report</p>
      </div>
    </div>
  );
}

function Frame() {
  return (
    <div className="content-stretch flex flex-[1_0_0] items-center min-h-px min-w-px relative w-full">
      <TableItemRowItem />
      <div className="content-stretch flex flex-col h-[44px] items-center justify-center py-[2px] relative shrink-0" data-name="Button">
        <Content1 />
      </div>
    </div>
  );
}

function Row() {
  return (
    <div className="content-stretch flex flex-col h-[68px] items-start justify-center relative shrink-0 w-full" data-name="Row">
      <div aria-hidden="true" className="absolute border-[#d9d9d9] border-b border-solid inset-0 pointer-events-none" />
      <Frame />
    </div>
  );
}

function Dropzone() {
  return (
    <div className="bg-[#fafafa] relative rounded-[4px] shrink-0 w-full" data-name="Dropzone">
      <div aria-hidden="true" className="absolute border border-[#d9d9d9] border-dashed inset-0 pointer-events-none rounded-[4px]" />
      <div className="flex flex-col items-center justify-center size-full">
        <div className="content-stretch flex flex-col items-center justify-center p-[16px] relative w-full">
          <Row />
        </div>
      </div>
    </div>
  );
}

function Container1() {
  return (
    <div className="bg-white relative rounded-[4px] shrink-0 w-full" data-name="Container">
      <div className="content-stretch flex flex-col gap-[12px] items-start p-[24px] relative w-full">
        <Title />
        <Frame1 />
        <Frame2 />
        <Frame3 />
        <Frame4 />
        <Frame5 />
        <Dropzone />
      </div>
    </div>
  );
}

function BackgroundShadow() {
  return (
    <div className="bg-[#f5f5f5] content-stretch flex flex-col items-start overflow-clip relative rounded-[12px] shrink-0 w-[600px]" data-name="Background+Shadow">
      <Container1 />
    </div>
  );
}

function Header2() {
  return (
    <div className="bg-[#f5f5f5] h-[24px] relative shrink-0 w-full" data-name="Header">
      <div className="flex flex-row items-center size-full">
        <div className="size-full" />
      </div>
    </div>
  );
}

function Next() {
  return <div className="content-stretch flex flex-col items-center justify-center pl-[42px] py-[2px] shrink-0" data-name="Next" />;
}

function Content2() {
  return (
    <div className="bg-[#f2f3f4] h-[40px] relative rounded-[4px] shrink-0" data-name="content">
      <div className="content-stretch flex gap-[4px] h-full items-center justify-center overflow-clip px-[16px] relative rounded-[inherit]">
        <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[#616d79] text-[16px] text-center whitespace-nowrap">
          <p className="leading-[22px]">Cancel</p>
        </div>
      </div>
      <div aria-hidden="true" className="absolute border border-[#616d79] border-solid inset-0 pointer-events-none rounded-[4px]" />
    </div>
  );
}

function Content3() {
  return (
    <div className="bg-[#ff4d00] content-stretch flex gap-[4px] h-[40px] items-center justify-center overflow-clip px-[16px] relative rounded-[4px] shrink-0" data-name="content">
      <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[16px] text-center text-white whitespace-nowrap">
        <p className="leading-[22px]">Done</p>
      </div>
    </div>
  );
}

function MainButtuns() {
  return (
    <div className="content-stretch flex gap-[16px] items-center relative shrink-0" data-name="Main Buttuns">
      <div className="content-stretch flex flex-col items-center justify-center py-[2px] relative shrink-0" data-name="Back">
        <Content2 />
      </div>
      <div className="content-stretch flex flex-col items-center justify-center py-[2px] relative shrink-0" data-name="Next">
        <Content3 />
      </div>
    </div>
  );
}

function Footer() {
  return (
    <div className="bg-[#f5f5f5] h-[72px] relative shrink-0 w-full" data-name="Footer">
      <div aria-hidden="true" className="absolute border-[#c3c7cc] border-solid border-t-[0.889px] inset-0 pointer-events-none" />
      <div className="content-stretch flex items-start justify-between pb-[16px] pl-[16px] pr-[24px] pt-[16.889px] relative size-full">
        <Next />
        <MainButtuns />
      </div>
    </div>
  );
}

export default function WebModal() {
  return (
    <div className="bg-[#f5f5f5] content-stretch flex flex-col items-center overflow-clip relative rounded-[8px] shadow-[20px_20px_25px_-5px_rgba(0,0,0,0.1),8px_8px_10px_-6px_rgba(0,0,0,0.1)] size-full" data-name="Web Modal">
      <Header />
      <Header1 />
      <BackgroundShadow />
      <Header2 />
      <Footer />
    </div>
  );
}