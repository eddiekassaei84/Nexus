import svgPaths from "./svg-2w2xbkh10k";

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

function Frame() {
  return (
    <div className="content-stretch flex items-start relative shrink-0">
      <div className="flex flex-col font-['Actor:Regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#1b2736] text-[24px] whitespace-nowrap">
        <p className="leading-[1.2]">{`Import users to '[Project_Name]' project`}</p>
      </div>
    </div>
  );
}

function LabelValue() {
  return (
    <div className="content-stretch flex flex-[1_0_0] items-center min-h-px min-w-px relative" data-name="Label Value">
      <Frame />
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

function Group9() {
  return (
    <div className="absolute inset-[16.67%]">
      <div className="absolute inset-[-2.34%]">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 33.5 33.5">
          <g id="Group 33">
            <path d="M0.75 16.75H32.75" id="Vector 19" stroke="var(--stroke-0, #FF4D00)" strokeLinecap="square" strokeWidth="1.5" />
            <path d="M16.75 0.75L16.75 32.75" id="Vector 20" stroke="var(--stroke-0, #FF4D00)" strokeLinecap="square" strokeWidth="1.5" />
          </g>
        </svg>
      </div>
    </div>
  );
}

function Content() {
  return (
    <div className="content-stretch flex h-[32px] items-center justify-center overflow-clip relative shrink-0" data-name="content">
      <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[#616d79] text-[14px] text-center whitespace-nowrap">
        <p className="leading-[20px]">Browse</p>
      </div>
    </div>
  );
}

function AutoAddedFrame() {
  return (
    <div className="content-stretch flex flex-col items-center overflow-clip relative shrink-0" data-name="Auto-added frame">
      <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[#595959] text-[14px] whitespace-nowrap">
        <p className="leading-[20px]">Filename.csv (300kb)</p>
      </div>
    </div>
  );
}

function Group10() {
  return (
    <div className="absolute inset-[12.5%_16.67%]">
      <div className="absolute inset-[-6.25%_0]">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 10.6667 13.5">
          <g id="Group 103">
            <path d={svgPaths.p309a4900} id="Rectangle 998" stroke="var(--stroke-0, #616D79)" strokeWidth="1.5" />
            <path d="M1.01328e-05 2.08333H10.6667" id="Vector 112" stroke="var(--stroke-0, #616D79)" strokeWidth="1.5" />
            <path d={svgPaths.p1dfea380} id="Rectangle 999" stroke="var(--stroke-0, #616D79)" strokeWidth="1.5" />
            <path d={svgPaths.p3d3c1560} id="Vector 114" stroke="var(--stroke-0, #616D79)" strokeWidth="1.5" />
          </g>
        </svg>
      </div>
    </div>
  );
}

function Dropzone() {
  return (
    <div className="bg-[#fafafa] relative rounded-[4px] shrink-0 w-full" data-name="Dropzone">
      <div aria-hidden="true" className="absolute border border-[#d9d9d9] border-dashed inset-0 pointer-events-none rounded-[4px]" />
      <div className="flex flex-col items-center justify-center size-full">
        <div className="content-stretch flex flex-col gap-[16px] items-center justify-center p-[16px] relative w-full">
          <div className="overflow-clip relative shrink-0 size-[48px]" data-name="24px/suggested/plus">
            <Group9 />
          </div>
          <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[#595959] text-[14px] text-center w-[387px]">
            <p className="leading-[20px] whitespace-pre-wrap">
              {`Click or drag a CSV to this area to upload `}
              <br aria-hidden="true" />
              or browse CSV file manually
            </p>
          </div>
          <div className="bg-[#f2f3f4] content-stretch flex flex-col items-center justify-center px-[16px] relative rounded-[4px] shrink-0" data-name="Button/Label/Secondary/small-32px/label-only/Default">
            <div aria-hidden="true" className="absolute border border-[#c3c7cc] border-solid inset-0 pointer-events-none rounded-[4px]" />
            <Content />
          </div>
          <div className="bg-[#f2f3f4] content-stretch flex gap-[10px] items-center px-[8px] relative rounded-[4px] shrink-0" data-name="Upload File">
            <AutoAddedFrame />
            <div className="overflow-clip relative shrink-0 size-[16px]" data-name="24px/app/trash">
              <Group10 />
            </div>
          </div>
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
        <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[#595959] text-[14px] w-[552px]">
          <p className="leading-[20px] whitespace-pre-wrap">Importing from CSV lets you add or update users in bulk, so you can onboard entire project teams quickly or delegate setup to someone else without needing to do it one-by-one.</p>
        </div>
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

function Content1() {
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

function Content2() {
  return (
    <div className="bg-[#ff4d00] content-stretch flex gap-[4px] h-[40px] items-center justify-center overflow-clip px-[16px] relative rounded-[4px] shrink-0" data-name="content">
      <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[16px] text-center text-white whitespace-nowrap">
        <p className="leading-[22px]">Import</p>
      </div>
    </div>
  );
}

function MainButtuns() {
  return (
    <div className="content-stretch flex gap-[16px] items-center relative shrink-0" data-name="Main Buttuns">
      <div className="content-stretch flex flex-col items-center justify-center py-[2px] relative shrink-0" data-name="Back">
        <Content1 />
      </div>
      <div className="content-stretch flex flex-col items-center justify-center py-[2px] relative shrink-0" data-name="Next">
        <Content2 />
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