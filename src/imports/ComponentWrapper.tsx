function Frame() {
  return (
    <div className="flex-[1_0_0] min-h-px min-w-px relative">
      <div aria-hidden="true" className="absolute border-[#f0f0f0] border-l-[0.5px] border-r-[0.5px] border-solid inset-0 pointer-events-none" />
      <div className="content-stretch flex items-start px-[16px] relative w-full">
        <div className="flex flex-[1_0_0] flex-col font-['SF_Pro_Text:Semibold',sans-serif] justify-center leading-[0] min-h-px min-w-px not-italic relative text-[#434343] text-[14px]">
          <p className="leading-[22px]">Style name</p>
        </div>
      </div>
    </div>
  );
}

function Frame1() {
  return (
    <div className="flex-[1_0_0] min-h-px min-w-px relative">
      <div aria-hidden="true" className="absolute border-[#f0f0f0] border-l-[0.5px] border-r-[0.5px] border-solid inset-0 pointer-events-none" />
      <div className="content-stretch flex items-start px-[16px] relative w-full">
        <div className="flex flex-[1_0_0] flex-col font-['SF_Pro_Text:Semibold',sans-serif] justify-center leading-[0] min-h-px min-w-px not-italic relative text-[#434343] text-[14px]">
          <p className="leading-[22px]">Sample</p>
        </div>
      </div>
    </div>
  );
}

function Frame2() {
  return (
    <div className="flex-[1_0_0] min-h-px min-w-px relative">
      <div aria-hidden="true" className="absolute border-[#f0f0f0] border-l-[0.5px] border-r-[0.5px] border-solid inset-0 pointer-events-none" />
      <div className="content-stretch flex items-start px-[16px] relative w-full">
        <div className="flex flex-[1_0_0] flex-col font-['SF_Pro_Text:Semibold',sans-serif] justify-center leading-[0] min-h-px min-w-px not-italic relative text-[#434343] text-[14px]">
          <p className="leading-[22px]">Usage</p>
        </div>
      </div>
    </div>
  );
}

function HeaderRow() {
  return (
    <div className="content-stretch flex items-start relative shrink-0 w-full" data-name="Header Row">
      <div className="bg-[#fafafa] content-stretch flex flex-[1_0_0] items-center min-h-px min-w-px py-[16px] relative" data-name="Table / Item / Header Item/Basic/False/Default/Default">
        <div aria-hidden="true" className="absolute border-[#f0f0f0] border-b border-solid inset-0 pointer-events-none" />
        <Frame />
      </div>
      <div className="bg-[#fafafa] content-stretch flex items-center py-[16px] relative shrink-0 w-[88px]" data-name="Table / Item / Header Item/Basic/False/Default/Default">
        <div aria-hidden="true" className="absolute border-[#f0f0f0] border-b border-solid inset-0 pointer-events-none" />
        <Frame1 />
      </div>
      <div className="bg-[#fafafa] content-stretch flex flex-[1_0_0] items-center min-h-px min-w-px py-[16px] relative" data-name="Table / Item / Header Item/Basic/False/Default/Default">
        <div aria-hidden="true" className="absolute border-[#f0f0f0] border-b border-solid inset-0 pointer-events-none" />
        <Frame2 />
      </div>
    </div>
  );
}

function TableRowItem() {
  return (
    <div className="h-[55px] relative shrink-0 w-[88px]" data-name="Table / Row Item">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 88 55">
        <g id="Table / Row Item">
          <mask fill="white" id="path-1-inside-1_2021_3222">
            <path d="M0 0H88V55H0V0Z" />
          </mask>
          <path d="M88 55V54H0V55V56H88V55Z" fill="var(--stroke-0, #F0F0F0)" mask="url(#path-1-inside-1_2021_3222)" />
          <g id="Color Sample">
            <circle cx="28" cy="28" fill="var(--fill-0, white)" r="12" />
            <circle cx="28" cy="28" r="11.5" stroke="var(--stroke-0, black)" strokeOpacity="0.05" />
          </g>
        </g>
      </svg>
    </div>
  );
}

function Row() {
  return (
    <div className="bg-white content-stretch flex items-start relative shrink-0 w-full" data-name="Row">
      <div className="flex-[1_0_0] min-h-px min-w-px relative" data-name="Table / Item / Row Item">
        <div aria-hidden="true" className="absolute border-[#f0f0f0] border-b border-solid inset-0 pointer-events-none" />
        <div className="content-stretch flex gap-[8px] items-start pb-[17px] pt-[16px] px-[16px] relative w-full">
          <div className="flex flex-[1_0_0] flex-col font-['SF_Pro_Text:Regular',sans-serif] justify-center leading-[0] min-h-px min-w-px not-italic relative text-[#434343] text-[14px]">
            <p className="leading-[22px]">Backgrounds / white</p>
          </div>
        </div>
      </div>
      <TableRowItem />
      <div className="flex-[1_0_0] min-h-px min-w-px relative" data-name="Table / Item / Row Item">
        <div aria-hidden="true" className="absolute border-[#f0f0f0] border-b border-solid inset-0 pointer-events-none" />
        <div className="content-stretch flex gap-[8px] items-start pb-[17px] pt-[16px] px-[16px] relative w-full">
          <div className="flex flex-[1_0_0] flex-col font-['SF_Pro_Text:Regular',sans-serif] justify-center leading-[0] min-h-px min-w-px not-italic relative text-[#434343] text-[14px]">
            <p className="leading-[22px]">Component background</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function TableRowItem1() {
  return (
    <div className="h-[55px] relative shrink-0 w-[88px]" data-name="Table / Row Item">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 88 55">
        <g id="Table / Row Item">
          <mask fill="white" id="path-1-inside-1_2021_3219">
            <path d="M0 0H88V55H0V0Z" />
          </mask>
          <path d="M88 55V54H0V55V56H88V55Z" fill="var(--stroke-0, #F0F0F0)" mask="url(#path-1-inside-1_2021_3219)" />
          <g id="Color Sample">
            <circle cx="28" cy="28" fill="var(--fill-0, #F0F2F5)" r="12" />
            <circle cx="28" cy="28" r="11.5" stroke="var(--stroke-0, black)" strokeOpacity="0.05" />
          </g>
        </g>
      </svg>
    </div>
  );
}

function Row1() {
  return (
    <div className="bg-white content-stretch flex items-start relative shrink-0 w-full" data-name="Row">
      <div className="flex-[1_0_0] min-h-px min-w-px relative" data-name="Table / Item / Row Item">
        <div aria-hidden="true" className="absolute border-[#f0f0f0] border-b border-solid inset-0 pointer-events-none" />
        <div className="content-stretch flex gap-[8px] items-start pb-[17px] pt-[16px] px-[16px] relative w-full">
          <div className="flex flex-[1_0_0] flex-col font-['SF_Pro_Text:Regular',sans-serif] justify-center leading-[0] min-h-px min-w-px not-italic relative text-[#434343] text-[14px]">
            <p className="leading-[22px]">Backgrounds / background-1</p>
          </div>
        </div>
      </div>
      <TableRowItem1 />
      <div className="flex-[1_0_0] min-h-px min-w-px relative" data-name="Table / Item / Row Item">
        <div aria-hidden="true" className="absolute border-[#f0f0f0] border-b border-solid inset-0 pointer-events-none" />
        <div className="content-stretch flex gap-[8px] items-start pb-[17px] pt-[16px] px-[16px] relative w-full">
          <div className="flex flex-[1_0_0] flex-col font-['SF_Pro_Text:Regular',sans-serif] justify-center leading-[0] min-h-px min-w-px not-italic relative text-[#434343] text-[14px]">
            <p className="leading-[22px]">Layout / Page background</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function TableRowItem2() {
  return (
    <div className="h-[55px] relative shrink-0 w-[88px]" data-name="Table / Row Item">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 88 55">
        <g id="Table / Row Item">
          <mask fill="white" id="path-1-inside-1_2021_3216">
            <path d="M0 0H88V55H0V0Z" />
          </mask>
          <path d="M88 55V54H0V55V56H88V55Z" fill="var(--stroke-0, #F0F0F0)" mask="url(#path-1-inside-1_2021_3216)" />
          <g id="Color Sample">
            <circle cx="28" cy="28" fill="var(--fill-0, #F9FAFB)" r="12" />
            <circle cx="28" cy="28" r="11.5" stroke="var(--stroke-0, black)" strokeOpacity="0.05" />
          </g>
        </g>
      </svg>
    </div>
  );
}

function Row2() {
  return (
    <div className="bg-white content-stretch flex items-start relative shrink-0 w-full" data-name="Row">
      <div className="flex-[1_0_0] min-h-px min-w-px relative" data-name="Table / Item / Row Item">
        <div aria-hidden="true" className="absolute border-[#f0f0f0] border-b border-solid inset-0 pointer-events-none" />
        <div className="content-stretch flex gap-[8px] items-start pb-[17px] pt-[16px] px-[16px] relative w-full">
          <div className="flex flex-[1_0_0] flex-col font-['SF_Pro_Text:Regular',sans-serif] justify-center leading-[0] min-h-px min-w-px not-italic relative text-[#434343] text-[14px]">
            <p className="leading-[22px]">Backgrounds / background-2</p>
          </div>
        </div>
      </div>
      <TableRowItem2 />
      <div className="flex-[1_0_0] min-h-px min-w-px relative" data-name="Table / Item / Row Item">
        <div aria-hidden="true" className="absolute border-[#f0f0f0] border-b border-solid inset-0 pointer-events-none" />
        <div className="content-stretch flex gap-[8px] items-start pb-[17px] pt-[16px] px-[16px] relative w-full">
          <div className="flex flex-[1_0_0] flex-col font-['SF_Pro_Text:Regular',sans-serif] justify-center leading-[0] min-h-px min-w-px not-italic relative text-[#434343] text-[14px]">
            <p className="leading-[22px]">Under sheet background</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function TableRowItem3() {
  return (
    <div className="h-[55px] relative shrink-0 w-[88px]" data-name="Table / Row Item">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 88 55">
        <g id="Table / Row Item">
          <mask fill="white" id="path-1-inside-1_2021_3225">
            <path d="M0 0H88V55H0V0Z" />
          </mask>
          <path d="M88 55V54H0V55V56H88V55Z" fill="var(--stroke-0, #F0F0F0)" mask="url(#path-1-inside-1_2021_3225)" />
          <g id="Color Sample">
            <circle cx="28" cy="28" fill="var(--fill-0, #243746)" fillOpacity="0.9" r="12" />
            <circle cx="28" cy="28" r="11.5" stroke="var(--stroke-0, black)" strokeOpacity="0.05" />
          </g>
        </g>
      </svg>
    </div>
  );
}

function Row3() {
  return (
    <div className="bg-white content-stretch flex items-start relative shrink-0 w-full" data-name="Row">
      <div className="flex-[1_0_0] min-h-px min-w-px relative" data-name="Table / Item / Row Item">
        <div aria-hidden="true" className="absolute border-[#f0f0f0] border-b border-solid inset-0 pointer-events-none" />
        <div className="content-stretch flex gap-[8px] items-start pb-[17px] pt-[16px] px-[16px] relative w-full">
          <div className="flex flex-[1_0_0] flex-col font-['SF_Pro_Text:Regular',sans-serif] justify-center leading-[0] min-h-px min-w-px not-italic relative text-[#434343] text-[14px]">
            <p className="leading-[22px]">Backgrounds / tooltip-bg</p>
          </div>
        </div>
      </div>
      <TableRowItem3 />
      <div className="flex-[1_0_0] min-h-px min-w-px relative" data-name="Table / Item / Row Item">
        <div aria-hidden="true" className="absolute border-[#f0f0f0] border-b border-solid inset-0 pointer-events-none" />
        <div className="content-stretch flex gap-[8px] items-start pb-[17px] pt-[16px] px-[16px] relative w-full">
          <div className="flex flex-[1_0_0] flex-col font-['SF_Pro_Text:Regular',sans-serif] justify-center leading-[0] min-h-px min-w-px not-italic relative text-[#434343] text-[14px]">
            <p className="leading-[22px]">Tooltip background</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function Table() {
  return (
    <div className="bg-[#f0f0f0] content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Table">
      <HeaderRow />
      <Row />
      <Row1 />
      <Row2 />
      <Row3 />
    </div>
  );
}

export default function ComponentWrapper() {
  return (
    <div className="content-stretch flex flex-col gap-[10px] items-start justify-center py-[16px] relative size-full" data-name="Component Wrapper">
      <p className="font-['SF_Pro_Text:Semibold',sans-serif] leading-[24px] not-italic relative shrink-0 text-[#434343] text-[16px] w-full">Backgrounds</p>
      <Table />
    </div>
  );
}