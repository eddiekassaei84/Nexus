import svgPaths from "./svg-b6igsb70g7";

function Frame16() {
  return (
    <div className="content-stretch flex items-start relative shrink-0">
      <div className="flex flex-col font-['Actor:Regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#1b2736] text-[14px] whitespace-nowrap">
        <p className="leading-[1.2]">Status</p>
      </div>
    </div>
  );
}

function Frame8() {
  return (
    <div className="content-stretch flex items-start justify-end relative shrink-0">
      <div className="content-stretch flex gap-[4px] items-start relative shrink-0" data-name="Label Value">
        <Frame16 />
      </div>
    </div>
  );
}

function Frame17() {
  return (
    <div className="content-stretch flex items-start relative shrink-0">
      <div className="flex flex-col font-['Actor:Regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#1b2736] text-[16px] whitespace-nowrap">
        <p className="leading-[1.2]">{`Pending invitation `}</p>
      </div>
    </div>
  );
}

function Frame9() {
  return (
    <div className="content-stretch flex flex-[1_0_0] items-center min-h-px min-w-px relative">
      <div className="content-stretch flex gap-[4px] items-start relative shrink-0" data-name="Label Value">
        <Frame17 />
      </div>
    </div>
  );
}

function InputSelect1() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col h-[32px] items-start justify-center min-h-px min-w-px relative" data-name="Input-Select">
      <Frame9 />
    </div>
  );
}

function Group() {
  return (
    <div className="absolute inset-[20.83%_8.33%]">
      <div className="absolute inset-[-8.03%_-5.62%_-8.04%_-5.63%]">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14.8333 10.8333">
          <g id="Group 104">
            <rect height="9.33333" id="Rectangle 1001" rx="1" stroke="var(--stroke-0, white)" strokeWidth="1.5" width="13.3333" x="0.75" y="0.75" />
            <path d={svgPaths.p2cabd500} id="Vector 115" stroke="var(--stroke-0, white)" strokeWidth="1.5" />
          </g>
        </svg>
      </div>
    </div>
  );
}

function Content() {
  return (
    <div className="content-stretch flex gap-[4px] h-[32px] items-center justify-center overflow-clip relative shrink-0" data-name="content">
      <div className="overflow-clip relative shrink-0 size-[16px]" data-name="24px/app/mail">
        <Group />
      </div>
      <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[14px] text-center text-white whitespace-nowrap">
        <p className="leading-[20px]">Re-invite</p>
      </div>
    </div>
  );
}

function PanelImageContent() {
  return (
    <div className="content-stretch flex flex-[1_0_0] gap-[7px] items-start min-h-px min-w-px relative" data-name="Panel Image Content">
      <InputSelect1 />
      <div className="bg-[#ff4d00] content-stretch flex flex-col items-center justify-center px-[16px] relative rounded-[4px] shrink-0" data-name="Button">
        <Content />
      </div>
    </div>
  );
}

function Frame() {
  return (
    <div className="content-stretch flex flex-[1_0_0] items-end min-h-px min-w-px relative">
      <PanelImageContent />
    </div>
  );
}

function Frame2() {
  return (
    <div className="bg-white flex-[1_0_0] h-[45px] min-h-[45px] min-w-px relative rounded-[4px]">
      <div aria-hidden="true" className="absolute border border-[#9ea2a8] border-solid inset-0 pointer-events-none rounded-[4px]" />
      <div className="flex flex-row items-center justify-end min-h-[inherit] size-full">
        <div className="content-stretch flex gap-[12px] items-center justify-end min-h-[inherit] px-[12px] relative size-full">
          <Frame />
        </div>
      </div>
    </div>
  );
}

function Frame4() {
  return (
    <div className="content-stretch flex flex-[1_0_0] gap-[4px] h-[45px] items-center min-h-px min-w-px relative">
      <Frame2 />
    </div>
  );
}

function Frame14() {
  return (
    <div className="content-stretch flex h-[45px] items-center relative shrink-0 w-full">
      <Frame4 />
    </div>
  );
}

function Frame18() {
  return (
    <div className="content-stretch flex items-start relative shrink-0">
      <div className="flex flex-col font-['Open_Sans:Regular',sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#5b6570] text-[12px] whitespace-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
        <p className="leading-[13px]">11/12/2025 8:17 PM</p>
      </div>
    </div>
  );
}

function Frame10() {
  return (
    <div className="content-stretch flex items-start justify-end relative shrink-0">
      <div className="content-stretch flex items-start relative shrink-0" data-name="Helper Value">
        <Frame18 />
      </div>
    </div>
  );
}

function Frame6() {
  return (
    <div className="content-stretch flex flex-col gap-[4px] h-[62px] items-start justify-center relative shrink-0 w-full">
      <Frame14 />
      <Frame10 />
    </div>
  );
}

function InputSelect() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[4px] h-[89px] items-start left-0 top-0 w-[380px]" data-name="Input-Select">
      <Frame8 />
      <Frame6 />
    </div>
  );
}

function Frame19() {
  return (
    <div className="content-stretch flex items-start relative shrink-0">
      <div className="flex flex-col font-['Actor:Regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#1b2736] text-[14px] whitespace-nowrap">
        <p className="leading-[1.2]">Status</p>
      </div>
    </div>
  );
}

function Frame11() {
  return (
    <div className="content-stretch flex items-start justify-end relative shrink-0">
      <div className="content-stretch flex gap-[4px] items-start relative shrink-0" data-name="Label Value">
        <Frame19 />
      </div>
    </div>
  );
}

function Frame20() {
  return (
    <div className="content-stretch flex items-start relative shrink-0">
      <div className="flex flex-col font-['Actor:Regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#1b2736] text-[16px] whitespace-nowrap">
        <p className="leading-[1.2]">{`Expired invitation `}</p>
      </div>
    </div>
  );
}

function Frame12() {
  return (
    <div className="content-stretch flex flex-[1_0_0] items-center min-h-px min-w-px relative">
      <div className="content-stretch flex gap-[4px] items-start relative shrink-0" data-name="Label Value">
        <Frame20 />
      </div>
    </div>
  );
}

function InputSelect3() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col h-[32px] items-start justify-center min-h-px min-w-px relative" data-name="Input-Select">
      <Frame12 />
    </div>
  );
}

function Group1() {
  return (
    <div className="absolute inset-[20.83%_8.33%]">
      <div className="absolute inset-[-8.03%_-5.62%_-8.04%_-5.63%]">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14.8333 10.8333">
          <g id="Group 104">
            <rect height="9.33333" id="Rectangle 1001" rx="1" stroke="var(--stroke-0, white)" strokeWidth="1.5" width="13.3333" x="0.75" y="0.75" />
            <path d={svgPaths.p2cabd500} id="Vector 115" stroke="var(--stroke-0, white)" strokeWidth="1.5" />
          </g>
        </svg>
      </div>
    </div>
  );
}

function Content1() {
  return (
    <div className="content-stretch flex gap-[4px] h-[32px] items-center justify-center overflow-clip relative shrink-0" data-name="content">
      <div className="overflow-clip relative shrink-0 size-[16px]" data-name="24px/app/mail">
        <Group1 />
      </div>
      <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[14px] text-center text-white whitespace-nowrap">
        <p className="leading-[20px]">Re-invite</p>
      </div>
    </div>
  );
}

function PanelImageContent1() {
  return (
    <div className="content-stretch flex flex-[1_0_0] gap-[7px] items-start min-h-px min-w-px relative" data-name="Panel Image Content">
      <InputSelect3 />
      <div className="bg-[#ff4d00] content-stretch flex flex-col items-center justify-center px-[16px] relative rounded-[4px] shrink-0" data-name="Button">
        <Content1 />
      </div>
    </div>
  );
}

function Frame1() {
  return (
    <div className="content-stretch flex flex-[1_0_0] items-end min-h-px min-w-px relative">
      <PanelImageContent1 />
    </div>
  );
}

function Frame3() {
  return (
    <div className="bg-white flex-[1_0_0] h-[45px] min-h-[45px] min-w-px relative rounded-[4px]">
      <div aria-hidden="true" className="absolute border border-[#9ea2a8] border-solid inset-0 pointer-events-none rounded-[4px]" />
      <div className="flex flex-row items-center justify-end min-h-[inherit] size-full">
        <div className="content-stretch flex gap-[12px] items-center justify-end min-h-[inherit] px-[12px] relative size-full">
          <Frame1 />
        </div>
      </div>
    </div>
  );
}

function Frame5() {
  return (
    <div className="content-stretch flex flex-[1_0_0] gap-[4px] h-[45px] items-center min-h-px min-w-px relative">
      <Frame3 />
    </div>
  );
}

function Frame15() {
  return (
    <div className="content-stretch flex h-[45px] items-center relative shrink-0 w-full">
      <Frame5 />
    </div>
  );
}

function Frame21() {
  return (
    <div className="content-stretch flex items-start relative shrink-0">
      <div className="flex flex-col font-['Open_Sans:Regular',sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#5b6570] text-[12px] whitespace-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
        <p className="leading-[13px]">11/12/2025 8:17 PM</p>
      </div>
    </div>
  );
}

function Frame13() {
  return (
    <div className="content-stretch flex items-start justify-end relative shrink-0">
      <div className="content-stretch flex items-start relative shrink-0" data-name="Helper Value">
        <Frame21 />
      </div>
    </div>
  );
}

function Frame7() {
  return (
    <div className="content-stretch flex flex-col gap-[4px] h-[62px] items-start justify-center relative shrink-0 w-full">
      <Frame15 />
      <Frame13 />
    </div>
  );
}

function InputSelect2() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[4px] h-[89px] items-start left-0 top-[113px] w-[380px]" data-name="Input-Select">
      <Frame11 />
      <Frame7 />
    </div>
  );
}

function Group2() {
  return (
    <div className="absolute contents left-0 top-0">
      <InputSelect />
      <InputSelect2 />
    </div>
  );
}

export default function Frame22() {
  return (
    <div className="relative size-full">
      <Group2 />
    </div>
  );
}