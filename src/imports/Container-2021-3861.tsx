function ComponentTitle() {
  return (
    <div className="content-stretch flex items-start relative shrink-0 w-full" data-name="Component Title">
      <p className="flex-[1_0_0] font-['SF_Pro_Text:Semibold',sans-serif] leading-[32px] min-h-px min-w-px not-italic relative text-[#434343] text-[24px]">Color Styles</p>
    </div>
  );
}

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
      <div className="bg-[#fafafa] content-stretch flex items-center py-[16px] relative shrink-0 w-[216px]" data-name="Table / Item / Header Item/Basic/False/Default/Default">
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
          <mask fill="white" id="path-1-inside-1_2021_7224">
            <path d="M0 0H88V55H0V0Z" />
          </mask>
          <path d="M88 55V54H0V55V56H88V55Z" fill="var(--stroke-0, #F0F0F0)" mask="url(#path-1-inside-1_2021_7224)" />
          <g id="Color Sample">
            <circle cx="28" cy="28" fill="var(--fill-0, white)" r="12" />
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
      <div className="content-stretch flex gap-[8px] items-start pb-[17px] pt-[16px] px-[16px] relative shrink-0 w-[216px]" data-name="Table / Item / Row Item">
        <div aria-hidden="true" className="absolute border-[#f0f0f0] border-b border-solid inset-0 pointer-events-none" />
        <div className="flex flex-[1_0_0] flex-col font-['SF_Pro_Text:Regular',sans-serif] justify-center leading-[0] min-h-px min-w-px not-italic relative text-[#434343] text-[14px]">
          <p className="leading-[22px]">Gray / gray-1</p>
        </div>
      </div>
      <TableRowItem />
      <div className="flex-[1_0_0] min-h-px min-w-px relative" data-name="Table / Item / Row Item">
        <div aria-hidden="true" className="absolute border-[#f0f0f0] border-b border-solid inset-0 pointer-events-none" />
        <div className="content-stretch flex gap-[8px] items-start pb-[17px] pt-[16px] px-[16px] relative w-full">
          <div className="flex flex-[1_0_0] flex-col font-['SF_Pro_Text:Regular',sans-serif] justify-center leading-[0] min-h-px min-w-px not-italic relative text-[#434343] text-[14px]">
            <p className="leading-[22px]">White text</p>
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
          <mask fill="white" id="path-1-inside-1_2021_7059">
            <path d="M0 0H88V55H0V0Z" />
          </mask>
          <path d="M88 55V54H0V55V56H88V55Z" fill="var(--stroke-0, #F0F0F0)" mask="url(#path-1-inside-1_2021_7059)" />
          <g id="Color Sample">
            <circle cx="28" cy="28" fill="var(--fill-0, #FAFAFA)" r="12" />
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
      <div className="content-stretch flex gap-[8px] items-start pb-[17px] pt-[16px] px-[16px] relative shrink-0 w-[216px]" data-name="Table / Item / Row Item">
        <div aria-hidden="true" className="absolute border-[#f0f0f0] border-b border-solid inset-0 pointer-events-none" />
        <div className="flex flex-[1_0_0] flex-col font-['SF_Pro_Text:Regular',sans-serif] justify-center leading-[0] min-h-px min-w-px not-italic relative text-[#434343] text-[14px]">
          <p className="leading-[22px]">Gray / gray-2</p>
        </div>
      </div>
      <TableRowItem1 />
      <div className="flex-[1_0_0] min-h-px min-w-px relative" data-name="Table / Item / Row Item">
        <div aria-hidden="true" className="absolute border-[#f0f0f0] border-b border-solid inset-0 pointer-events-none" />
        <div className="content-stretch flex gap-[8px] items-start pb-[17px] pt-[16px] px-[16px] relative w-full">
          <div className="flex flex-[1_0_0] flex-col font-['SF_Pro_Text:Regular',sans-serif] justify-center leading-[0] min-h-px min-w-px not-italic relative text-[#434343] text-[14px]">
            <p className="leading-[22px]">Table header</p>
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
          <mask fill="white" id="path-1-inside-1_2021_7183">
            <path d="M0 0H88V55H0V0Z" />
          </mask>
          <path d="M88 55V54H0V55V56H88V55Z" fill="var(--stroke-0, #F0F0F0)" mask="url(#path-1-inside-1_2021_7183)" />
          <g id="Color Sample">
            <circle cx="28" cy="28" fill="var(--fill-0, #F5F5F5)" r="12" />
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
      <div className="content-stretch flex gap-[8px] items-start pb-[17px] pt-[16px] px-[16px] relative shrink-0 w-[216px]" data-name="Table / Item / Row Item">
        <div aria-hidden="true" className="absolute border-[#f0f0f0] border-b border-solid inset-0 pointer-events-none" />
        <div className="flex flex-[1_0_0] flex-col font-['SF_Pro_Text:Regular',sans-serif] justify-center leading-[0] min-h-px min-w-px not-italic relative text-[#434343] text-[14px]">
          <p className="leading-[22px]">Gray / gray-3</p>
        </div>
      </div>
      <TableRowItem2 />
      <div className="flex-[1_0_0] min-h-px min-w-px relative" data-name="Table / Item / Row Item">
        <div aria-hidden="true" className="absolute border-[#f0f0f0] border-b border-solid inset-0 pointer-events-none" />
        <div className="content-stretch flex gap-[8px] items-start pb-[17px] pt-[16px] px-[16px] relative w-full">
          <div className="flex flex-[1_0_0] flex-col font-['SF_Pro_Text:Regular',sans-serif] justify-center leading-[0] min-h-px min-w-px not-italic relative text-[#434343] text-[14px]">
            <p className="leading-[22px]">Background</p>
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
          <mask fill="white" id="path-1-inside-1_2021_7180">
            <path d="M0 0H88V55H0V0Z" />
          </mask>
          <path d="M88 55V54H0V55V56H88V55Z" fill="var(--stroke-0, #F0F0F0)" mask="url(#path-1-inside-1_2021_7180)" />
          <circle cx="28" cy="28" fill="var(--fill-0, #F0F0F0)" id="Color Sample" r="12" />
        </g>
      </svg>
    </div>
  );
}

function Row4() {
  return (
    <div className="bg-white content-stretch flex items-start relative shrink-0 w-full" data-name="Row">
      <div className="content-stretch flex gap-[8px] items-start pb-[17px] pt-[16px] px-[16px] relative shrink-0 w-[216px]" data-name="Table / Item / Row Item">
        <div aria-hidden="true" className="absolute border-[#f0f0f0] border-b border-solid inset-0 pointer-events-none" />
        <div className="flex flex-[1_0_0] flex-col font-['SF_Pro_Text:Regular',sans-serif] justify-center leading-[0] min-h-px min-w-px not-italic relative text-[#434343] text-[14px]">
          <p className="leading-[22px]">Gray / gray-4</p>
        </div>
      </div>
      <TableRowItem3 />
      <div className="flex-[1_0_0] min-h-px min-w-px relative" data-name="Table / Item / Row Item">
        <div aria-hidden="true" className="absolute border-[#f0f0f0] border-b border-solid inset-0 pointer-events-none" />
        <div className="content-stretch flex gap-[8px] items-start pb-[17px] pt-[16px] px-[16px] relative w-full">
          <div className="flex flex-[1_0_0] flex-col font-['SF_Pro_Text:Regular',sans-serif] justify-center leading-[0] min-h-px min-w-px not-italic relative text-[#434343] text-[14px]">
            <p className="leading-[22px]">Divider</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function TableRowItem4() {
  return (
    <div className="h-[55px] relative shrink-0 w-[88px]" data-name="Table / Row Item">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 88 55">
        <g id="Table / Row Item">
          <mask fill="white" id="path-1-inside-1_2021_7218">
            <path d="M0 0H88V55H0V0Z" />
          </mask>
          <path d="M88 55V54H0V55V56H88V55Z" fill="var(--stroke-0, #F0F0F0)" mask="url(#path-1-inside-1_2021_7218)" />
          <circle cx="28" cy="28" fill="var(--fill-0, #D9D9D9)" id="Color Sample" r="12" />
        </g>
      </svg>
    </div>
  );
}

function Row5() {
  return (
    <div className="bg-white content-stretch flex items-start relative shrink-0 w-full" data-name="Row">
      <div className="content-stretch flex gap-[8px] items-start pb-[17px] pt-[16px] px-[16px] relative shrink-0 w-[216px]" data-name="Table / Item / Row Item">
        <div aria-hidden="true" className="absolute border-[#f0f0f0] border-b border-solid inset-0 pointer-events-none" />
        <div className="flex flex-[1_0_0] flex-col font-['SF_Pro_Text:Regular',sans-serif] justify-center leading-[0] min-h-px min-w-px not-italic relative text-[#434343] text-[14px]">
          <p className="leading-[22px]">Gray / gray-5</p>
        </div>
      </div>
      <TableRowItem4 />
      <div className="flex-[1_0_0] min-h-px min-w-px relative" data-name="Table / Item / Row Item">
        <div aria-hidden="true" className="absolute border-[#f0f0f0] border-b border-solid inset-0 pointer-events-none" />
        <div className="content-stretch flex gap-[8px] items-start pb-[17px] pt-[16px] px-[16px] relative w-full">
          <div className="flex flex-[1_0_0] flex-col font-['SF_Pro_Text:Regular',sans-serif] justify-center leading-[0] min-h-px min-w-px not-italic relative text-[#434343] text-[14px]">
            <p className="leading-[22px]">Border</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function TableRowItem5() {
  return (
    <div className="h-[55px] relative shrink-0 w-[88px]" data-name="Table / Row Item">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 88 55">
        <g id="Table / Row Item">
          <mask fill="white" id="path-1-inside-1_2021_7107">
            <path d="M0 0H88V55H0V0Z" />
          </mask>
          <path d="M88 55V54H0V55V56H88V55Z" fill="var(--stroke-0, #F0F0F0)" mask="url(#path-1-inside-1_2021_7107)" />
          <circle cx="28" cy="28" fill="var(--fill-0, #BFBFBF)" id="Color Sample" r="12" />
        </g>
      </svg>
    </div>
  );
}

function Row6() {
  return (
    <div className="bg-white content-stretch flex items-start relative shrink-0 w-full" data-name="Row">
      <div className="content-stretch flex gap-[8px] items-start pb-[17px] pt-[16px] px-[16px] relative shrink-0 w-[216px]" data-name="Table / Item / Row Item">
        <div aria-hidden="true" className="absolute border-[#f0f0f0] border-b border-solid inset-0 pointer-events-none" />
        <div className="flex flex-[1_0_0] flex-col font-['SF_Pro_Text:Regular',sans-serif] justify-center leading-[0] min-h-px min-w-px not-italic relative text-[#434343] text-[14px]">
          <p className="leading-[22px]">Gray / gray-6</p>
        </div>
      </div>
      <TableRowItem5 />
      <div className="flex-[1_0_0] min-h-px min-w-px relative" data-name="Table / Item / Row Item">
        <div aria-hidden="true" className="absolute border-[#f0f0f0] border-b border-solid inset-0 pointer-events-none" />
        <div className="content-stretch flex gap-[8px] items-start pb-[17px] pt-[16px] px-[16px] relative w-full">
          <div className="flex flex-[1_0_0] flex-col font-['SF_Pro_Text:Regular',sans-serif] justify-center leading-[0] min-h-px min-w-px not-italic relative text-[#434343] text-[14px]">
            <p className="leading-[22px]">Disable</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function TableRowItem6() {
  return (
    <div className="relative self-stretch shrink-0 w-[88px]" data-name="Table / Row Item">
      <div aria-hidden="true" className="absolute border-[#f0f0f0] border-b border-solid inset-0 pointer-events-none" />
      <div className="content-stretch flex items-start pb-[15px] pt-[16px] px-[16px] relative size-full">
        <div className="relative shrink-0 size-[24px]" data-name="Color Sample">
          <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
            <circle cx="12" cy="12" fill="var(--fill-0, #8C8C8C)" id="Color Sample" r="12" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function Row7() {
  return (
    <div className="bg-white content-stretch flex items-start relative shrink-0 w-full" data-name="Row">
      <div className="relative self-stretch shrink-0 w-[216px]" data-name="Table / Item / Row Item">
        <div aria-hidden="true" className="absolute border-[#f0f0f0] border-b border-solid inset-0 pointer-events-none" />
        <div className="content-stretch flex gap-[8px] items-start pb-[17px] pt-[16px] px-[16px] relative size-full">
          <div className="flex flex-[1_0_0] flex-col font-['SF_Pro_Text:Regular',sans-serif] justify-center leading-[0] min-h-px min-w-px not-italic relative text-[#434343] text-[14px]">
            <p className="leading-[22px]">Gray / gray-7</p>
          </div>
        </div>
      </div>
      <TableRowItem6 />
      <div className="flex-[1_0_0] min-h-px min-w-px relative" data-name="Table / Item / Row Item">
        <div aria-hidden="true" className="absolute border-[#f0f0f0] border-b border-solid inset-0 pointer-events-none" />
        <div className="content-stretch flex gap-[8px] items-start pb-[17px] pt-[16px] px-[16px] relative w-full">
          <div className="flex flex-[1_0_0] flex-col font-['SF_Pro_Text:Regular',sans-serif] justify-center leading-[0] min-h-px min-w-px not-italic relative text-[#434343] text-[14px]">
            <p className="leading-[22px]">Secondary text / placeholder text / caption</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function TableRowItem7() {
  return (
    <div className="h-[55px] relative shrink-0 w-[88px]" data-name="Table / Row Item">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 88 55">
        <g id="Table / Row Item">
          <mask fill="white" id="path-1-inside-1_2021_7189">
            <path d="M0 0H88V55H0V0Z" />
          </mask>
          <path d="M88 55V54H0V55V56H88V55Z" fill="var(--stroke-0, #F0F0F0)" mask="url(#path-1-inside-1_2021_7189)" />
          <circle cx="28" cy="28" fill="var(--fill-0, #595959)" id="Color Sample" r="12" />
        </g>
      </svg>
    </div>
  );
}

function Row8() {
  return (
    <div className="bg-white content-stretch flex items-start relative shrink-0 w-full" data-name="Row">
      <div className="content-stretch flex gap-[8px] items-start pb-[17px] pt-[16px] px-[16px] relative shrink-0 w-[216px]" data-name="Table / Item / Row Item">
        <div aria-hidden="true" className="absolute border-[#f0f0f0] border-b border-solid inset-0 pointer-events-none" />
        <div className="flex flex-[1_0_0] flex-col font-['SF_Pro_Text:Regular',sans-serif] justify-center leading-[0] min-h-px min-w-px not-italic relative text-[#434343] text-[14px]">
          <p className="leading-[22px]">Gray / gray-8</p>
        </div>
      </div>
      <TableRowItem7 />
      <div className="flex-[1_0_0] min-h-px min-w-px relative" data-name="Table / Item / Row Item">
        <div aria-hidden="true" className="absolute border-[#f0f0f0] border-b border-solid inset-0 pointer-events-none" />
        <div className="content-stretch flex gap-[8px] items-start pb-[17px] pt-[16px] px-[16px] relative w-full">
          <div className="flex flex-[1_0_0] flex-col font-['SF_Pro_Text:Regular',sans-serif] justify-center leading-[0] min-h-px min-w-px not-italic relative text-[#434343] text-[14px]">
            <p className="leading-[22px]">-</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function TableRowItem8() {
  return (
    <div className="h-[55px] relative shrink-0 w-[88px]" data-name="Table / Row Item">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 88 55">
        <g id="Table / Row Item">
          <mask fill="white" id="path-1-inside-1_2021_7121">
            <path d="M0 0H88V55H0V0Z" />
          </mask>
          <path d="M88 55V54H0V55V56H88V55Z" fill="var(--stroke-0, #F0F0F0)" mask="url(#path-1-inside-1_2021_7121)" />
          <circle cx="28" cy="28" fill="var(--fill-0, #434343)" id="Color Sample" r="12" />
        </g>
      </svg>
    </div>
  );
}

function Row9() {
  return (
    <div className="bg-white content-stretch flex items-start relative shrink-0 w-full" data-name="Row">
      <div className="content-stretch flex gap-[8px] items-start pb-[17px] pt-[16px] px-[16px] relative shrink-0 w-[216px]" data-name="Table / Item / Row Item">
        <div aria-hidden="true" className="absolute border-[#f0f0f0] border-b border-solid inset-0 pointer-events-none" />
        <div className="flex flex-[1_0_0] flex-col font-['SF_Pro_Text:Regular',sans-serif] justify-center leading-[0] min-h-px min-w-px not-italic relative text-[#434343] text-[14px]">
          <p className="leading-[22px]">Gray / gray-9</p>
        </div>
      </div>
      <TableRowItem8 />
      <div className="flex-[1_0_0] min-h-px min-w-px relative" data-name="Table / Item / Row Item">
        <div aria-hidden="true" className="absolute border-[#f0f0f0] border-b border-solid inset-0 pointer-events-none" />
        <div className="content-stretch flex gap-[8px] items-start pb-[17px] pt-[16px] px-[16px] relative w-full">
          <div className="flex flex-[1_0_0] flex-col font-['SF_Pro_Text:Regular',sans-serif] justify-center leading-[0] min-h-px min-w-px not-italic relative text-[#434343] text-[14px]">
            <p className="leading-[22px]">-</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function TableRowItem9() {
  return (
    <div className="h-[55px] relative shrink-0 w-[88px]" data-name="Table / Row Item">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 88 55">
        <g id="Table / Row Item">
          <mask fill="white" id="path-1-inside-1_2021_7192">
            <path d="M0 0H88V55H0V0Z" />
          </mask>
          <path d="M88 55V54H0V55V56H88V55Z" fill="var(--stroke-0, #F0F0F0)" mask="url(#path-1-inside-1_2021_7192)" />
          <circle cx="28" cy="28" fill="var(--fill-0, #262626)" id="Color Sample" r="12" />
        </g>
      </svg>
    </div>
  );
}

function Row10() {
  return (
    <div className="bg-white content-stretch flex items-start relative shrink-0 w-full" data-name="Row">
      <div className="content-stretch flex gap-[8px] items-start pb-[17px] pt-[16px] px-[16px] relative shrink-0 w-[216px]" data-name="Table / Item / Row Item">
        <div aria-hidden="true" className="absolute border-[#f0f0f0] border-b border-solid inset-0 pointer-events-none" />
        <div className="flex flex-[1_0_0] flex-col font-['SF_Pro_Text:Regular',sans-serif] justify-center leading-[0] min-h-px min-w-px not-italic relative text-[#434343] text-[14px]">
          <p className="leading-[22px]">Gray / gray-10</p>
        </div>
      </div>
      <TableRowItem9 />
      <div className="flex-[1_0_0] min-h-px min-w-px relative" data-name="Table / Item / Row Item">
        <div aria-hidden="true" className="absolute border-[#f0f0f0] border-b border-solid inset-0 pointer-events-none" />
        <div className="content-stretch flex gap-[8px] items-start pb-[17px] pt-[16px] px-[16px] relative w-full">
          <div className="flex flex-[1_0_0] flex-col font-['SF_Pro_Text:Regular',sans-serif] justify-center leading-[0] min-h-px min-w-px not-italic relative text-[#434343] text-[14px]">
            <p className="leading-[22px]">Title / Primary Text</p>
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
      <Row1 />
      <Row2 />
      <Row3 />
      <Row4 />
      <Row5 />
      <Row6 />
      <Row7 />
      <Row8 />
      <Row9 />
      <Row10 />
    </div>
  );
}

function ComponentWrapper() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col gap-[10px] items-start justify-center min-h-px min-w-px overflow-clip py-[16px] relative" data-name="Component Wrapper">
      <p className="font-['SF_Pro_Text:Semibold',sans-serif] leading-[24px] not-italic relative shrink-0 text-[#434343] text-[16px] w-full">Gray (Neutral)</p>
      <Table />
    </div>
  );
}

function Frame3() {
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

function Frame4() {
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

function Frame5() {
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

function HeaderRow1() {
  return (
    <div className="content-stretch flex items-start relative shrink-0 w-full" data-name="Header Row">
      <div className="bg-[#fafafa] content-stretch flex flex-[1_0_0] items-center min-h-px min-w-px py-[16px] relative" data-name="Table / Item / Header Item/Basic/False/Default/Default">
        <div aria-hidden="true" className="absolute border-[#f0f0f0] border-b border-solid inset-0 pointer-events-none" />
        <Frame3 />
      </div>
      <div className="bg-[#fafafa] content-stretch flex items-center py-[16px] relative shrink-0 w-[88px]" data-name="Table / Item / Header Item/Basic/False/Default/Default">
        <div aria-hidden="true" className="absolute border-[#f0f0f0] border-b border-solid inset-0 pointer-events-none" />
        <Frame4 />
      </div>
      <div className="bg-[#fafafa] content-stretch flex flex-[1_0_0] items-center min-h-px min-w-px py-[16px] relative" data-name="Table / Item / Header Item/Basic/False/Default/Default">
        <div aria-hidden="true" className="absolute border-[#f0f0f0] border-b border-solid inset-0 pointer-events-none" />
        <Frame5 />
      </div>
    </div>
  );
}

function TableRowItem10() {
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

function Row11() {
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
      <TableRowItem10 />
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

function TableRowItem11() {
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

function Row12() {
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
      <TableRowItem11 />
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

function TableRowItem12() {
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

function Row13() {
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
      <TableRowItem12 />
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

function TableRowItem13() {
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

function Row14() {
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
      <TableRowItem13 />
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

function Table1() {
  return (
    <div className="bg-[#f0f0f0] content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Table">
      <HeaderRow1 />
      <Row11 />
      <Row12 />
      <Row13 />
      <Row14 />
    </div>
  );
}

function ComponentWrapper1() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col gap-[10px] items-start justify-center min-h-px min-w-px overflow-clip py-[16px] relative" data-name="Component Wrapper">
      <p className="font-['SF_Pro_Text:Semibold',sans-serif] leading-[24px] not-italic relative shrink-0 text-[#434343] text-[16px] w-full">Backgrounds</p>
      <Table1 />
    </div>
  );
}

function Row() {
  return (
    <div className="content-stretch flex gap-[24px] items-start relative shrink-0 w-full" data-name="Row">
      <ComponentWrapper />
      <ComponentWrapper1 />
    </div>
  );
}

function Grid() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Grid">
      <Row />
    </div>
  );
}

function Frame6() {
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

function Frame7() {
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

function Frame8() {
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

function HeaderRow2() {
  return (
    <div className="content-stretch flex items-start relative shrink-0 w-full" data-name="Header Row">
      <div className="bg-[#fafafa] content-stretch flex items-center py-[16px] relative shrink-0 w-[216px]" data-name="Table / Item / Header Item/Basic/False/Default/Default">
        <div aria-hidden="true" className="absolute border-[#f0f0f0] border-b border-solid inset-0 pointer-events-none" />
        <Frame6 />
      </div>
      <div className="bg-[#fafafa] content-stretch flex items-center py-[16px] relative shrink-0 w-[88px]" data-name="Table / Item / Header Item/Basic/False/Default/Default">
        <div aria-hidden="true" className="absolute border-[#f0f0f0] border-b border-solid inset-0 pointer-events-none" />
        <Frame7 />
      </div>
      <div className="bg-[#fafafa] content-stretch flex flex-[1_0_0] items-center min-h-px min-w-px py-[16px] relative" data-name="Table / Item / Header Item/Basic/False/Default/Default">
        <div aria-hidden="true" className="absolute border-[#f0f0f0] border-b border-solid inset-0 pointer-events-none" />
        <Frame8 />
      </div>
    </div>
  );
}

function TableRowItem14() {
  return (
    <div className="h-[55px] relative shrink-0 w-[88px]" data-name="Table / Row Item">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 88 55">
        <g id="Table / Row Item">
          <mask fill="white" id="path-1-inside-1_2021_7207">
            <path d="M0 0H88V55H0V0Z" />
          </mask>
          <path d="M88 55V54H0V55V56H88V55Z" fill="var(--stroke-0, #F0F0F0)" mask="url(#path-1-inside-1_2021_7207)" />
          <g id="Color Sample">
            <circle cx="28" cy="28" fill="var(--fill-0, #FFEDE4)" r="12" />
            <circle cx="28" cy="28" r="11.5" stroke="var(--stroke-0, black)" strokeOpacity="0.05" />
          </g>
        </g>
      </svg>
    </div>
  );
}

function Row16() {
  return (
    <div className="bg-white content-stretch flex items-start relative shrink-0 w-full" data-name="Row">
      <div className="content-stretch flex gap-[8px] items-start pb-[17px] pt-[16px] px-[16px] relative shrink-0 w-[216px]" data-name="Table / Item / Row Item">
        <div aria-hidden="true" className="absolute border-[#f0f0f0] border-b border-solid inset-0 pointer-events-none" />
        <div className="flex flex-[1_0_0] flex-col font-['SF_Pro_Text:Regular',sans-serif] justify-center leading-[0] min-h-px min-w-px not-italic relative text-[#434343] text-[14px]">
          <p className="leading-[22px]">Orange / orange-1</p>
        </div>
      </div>
      <TableRowItem14 />
      <div className="flex-[1_0_0] min-h-px min-w-px relative" data-name="Table / Item / Row Item">
        <div aria-hidden="true" className="absolute border-[#f0f0f0] border-b border-solid inset-0 pointer-events-none" />
        <div className="content-stretch flex gap-[8px] items-start pb-[17px] pt-[16px] px-[16px] relative w-full">
          <div className="flex flex-[1_0_0] flex-col font-['SF_Pro_Text:Regular',sans-serif] justify-center leading-[0] min-h-px min-w-px not-italic relative text-[#434343] text-[14px]">
            <p className="leading-[22px]">-</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function TableRowItem15() {
  return (
    <div className="h-[55px] relative shrink-0 w-[88px]" data-name="Table / Row Item">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 88 55">
        <g id="Table / Row Item">
          <mask fill="white" id="path-1-inside-1_2021_7077">
            <path d="M0 0H88V55H0V0Z" />
          </mask>
          <path d="M88 55V54H0V55V56H88V55Z" fill="var(--stroke-0, #F0F0F0)" mask="url(#path-1-inside-1_2021_7077)" />
          <g id="Color Sample">
            <circle cx="28" cy="28" fill="var(--fill-0, #FFDECC)" r="12" />
            <circle cx="28" cy="28" r="11.5" stroke="var(--stroke-0, black)" strokeOpacity="0.05" />
          </g>
        </g>
      </svg>
    </div>
  );
}

function Row17() {
  return (
    <div className="bg-white content-stretch flex items-start relative shrink-0 w-full" data-name="Row">
      <div className="content-stretch flex gap-[8px] items-start pb-[17px] pt-[16px] px-[16px] relative shrink-0 w-[216px]" data-name="Table / Item / Row Item">
        <div aria-hidden="true" className="absolute border-[#f0f0f0] border-b border-solid inset-0 pointer-events-none" />
        <div className="flex flex-[1_0_0] flex-col font-['SF_Pro_Text:Regular',sans-serif] justify-center leading-[0] min-h-px min-w-px not-italic relative text-[#434343] text-[14px]">
          <p className="leading-[22px]">Orange / orange-2</p>
        </div>
      </div>
      <TableRowItem15 />
      <div className="flex-[1_0_0] min-h-px min-w-px relative" data-name="Table / Item / Row Item">
        <div aria-hidden="true" className="absolute border-[#f0f0f0] border-b border-solid inset-0 pointer-events-none" />
        <div className="content-stretch flex gap-[8px] items-start pb-[17px] pt-[16px] px-[16px] relative w-full">
          <div className="flex flex-[1_0_0] flex-col font-['SF_Pro_Text:Regular',sans-serif] justify-center leading-[0] min-h-px min-w-px not-italic relative text-[#434343] text-[14px]">
            <p className="leading-[22px]">-</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function TableRowItem16() {
  return (
    <div className="h-[55px] relative shrink-0 w-[88px]" data-name="Table / Row Item">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 88 55">
        <g id="Table / Row Item">
          <mask fill="white" id="path-1-inside-1_2021_7154">
            <path d="M0 0H88V55H0V0Z" />
          </mask>
          <path d="M88 55V54H0V55V56H88V55Z" fill="var(--stroke-0, #F0F0F0)" mask="url(#path-1-inside-1_2021_7154)" />
          <g id="Color Sample">
            <circle cx="28" cy="28" fill="var(--fill-0, #FFBD9C)" r="12" />
            <circle cx="28" cy="28" r="11.5" stroke="var(--stroke-0, black)" strokeOpacity="0.05" />
          </g>
        </g>
      </svg>
    </div>
  );
}

function Row18() {
  return (
    <div className="bg-white content-stretch flex items-start relative shrink-0 w-full" data-name="Row">
      <div className="content-stretch flex gap-[8px] items-start pb-[17px] pt-[16px] px-[16px] relative shrink-0 w-[216px]" data-name="Table / Item / Row Item">
        <div aria-hidden="true" className="absolute border-[#f0f0f0] border-b border-solid inset-0 pointer-events-none" />
        <div className="flex flex-[1_0_0] flex-col font-['SF_Pro_Text:Regular',sans-serif] justify-center leading-[0] min-h-px min-w-px not-italic relative text-[#434343] text-[14px]">
          <p className="leading-[22px]">Orange / orange-3</p>
        </div>
      </div>
      <TableRowItem16 />
      <div className="flex-[1_0_0] min-h-px min-w-px relative" data-name="Table / Item / Row Item">
        <div aria-hidden="true" className="absolute border-[#f0f0f0] border-b border-solid inset-0 pointer-events-none" />
        <div className="content-stretch flex gap-[8px] items-start pb-[17px] pt-[16px] px-[16px] relative w-full">
          <div className="flex flex-[1_0_0] flex-col font-['SF_Pro_Text:Regular',sans-serif] justify-center leading-[0] min-h-px min-w-px not-italic relative text-[#434343] text-[14px]">
            <p className="leading-[22px]">- Primary button disabled background</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function TableRowItem17() {
  return (
    <div className="h-[55px] relative shrink-0 w-[88px]" data-name="Table / Row Item">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 88 55">
        <g id="Table / Row Item">
          <mask fill="white" id="path-1-inside-1_2021_7171">
            <path d="M0 0H88V55H0V0Z" />
          </mask>
          <path d="M88 55V54H0V55V56H88V55Z" fill="var(--stroke-0, #F0F0F0)" mask="url(#path-1-inside-1_2021_7171)" />
          <circle cx="28" cy="28" fill="var(--fill-0, #FF9B6D)" id="Color Sample" r="12" />
        </g>
      </svg>
    </div>
  );
}

function Row19() {
  return (
    <div className="bg-white content-stretch flex items-start relative shrink-0 w-full" data-name="Row">
      <div className="content-stretch flex gap-[8px] items-start pb-[17px] pt-[16px] px-[16px] relative shrink-0 w-[216px]" data-name="Table / Item / Row Item">
        <div aria-hidden="true" className="absolute border-[#f0f0f0] border-b border-solid inset-0 pointer-events-none" />
        <div className="flex flex-[1_0_0] flex-col font-['SF_Pro_Text:Regular',sans-serif] justify-center leading-[0] min-h-px min-w-px not-italic relative text-[#434343] text-[14px]">
          <p className="leading-[22px]">Orange / orange-4</p>
        </div>
      </div>
      <TableRowItem17 />
      <div className="flex-[1_0_0] min-h-px min-w-px relative" data-name="Table / Item / Row Item">
        <div aria-hidden="true" className="absolute border-[#f0f0f0] border-b border-solid inset-0 pointer-events-none" />
        <div className="content-stretch flex gap-[8px] items-start pb-[17px] pt-[16px] px-[16px] relative w-full">
          <div className="flex flex-[1_0_0] flex-col font-['SF_Pro_Text:Regular',sans-serif] justify-center leading-[0] min-h-px min-w-px not-italic relative text-[#434343] text-[14px]">
            <p className="leading-[22px]">-</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function TableRowItem18() {
  return (
    <div className="h-[55px] relative shrink-0 w-[88px]" data-name="Table / Row Item">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 88 55">
        <g id="Table / Row Item">
          <mask fill="white" id="path-1-inside-1_2021_7168">
            <path d="M0 0H88V55H0V0Z" />
          </mask>
          <path d="M88 55V54H0V55V56H88V55Z" fill="var(--stroke-0, #F0F0F0)" mask="url(#path-1-inside-1_2021_7168)" />
          <circle cx="28" cy="28" fill="var(--fill-0, #FF773E)" id="Color Sample" r="12" />
        </g>
      </svg>
    </div>
  );
}

function Row20() {
  return (
    <div className="bg-white content-stretch flex items-start relative shrink-0 w-full" data-name="Row">
      <div className="content-stretch flex gap-[8px] items-start pb-[17px] pt-[16px] px-[16px] relative shrink-0 w-[216px]" data-name="Table / Item / Row Item">
        <div aria-hidden="true" className="absolute border-[#f0f0f0] border-b border-solid inset-0 pointer-events-none" />
        <div className="flex flex-[1_0_0] flex-col font-['SF_Pro_Text:Regular',sans-serif] justify-center leading-[0] min-h-px min-w-px not-italic relative text-[#434343] text-[14px]">
          <p className="leading-[22px]">Orange / orange-5</p>
        </div>
      </div>
      <TableRowItem18 />
      <div className="flex-[1_0_0] min-h-px min-w-px relative" data-name="Table / Item / Row Item">
        <div aria-hidden="true" className="absolute border-[#f0f0f0] border-b border-solid inset-0 pointer-events-none" />
        <div className="content-stretch flex gap-[8px] items-start pb-[17px] pt-[16px] px-[16px] relative w-full">
          <div className="flex flex-[1_0_0] flex-col font-['SF_Pro_Text:Regular',sans-serif] justify-center leading-[0] min-h-px min-w-px not-italic relative text-[#434343] text-[14px]">
            <p className="leading-[22px]">- Primary button hovered background</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function TableRowItem19() {
  return (
    <div className="relative self-stretch shrink-0 w-[88px]" data-name="Table / Row Item">
      <div aria-hidden="true" className="absolute border-[#f0f0f0] border-b border-solid inset-0 pointer-events-none" />
      <div className="content-stretch flex items-start pb-[15px] pt-[16px] px-[16px] relative size-full">
        <div className="relative shrink-0 size-[24px]" data-name="Color Sample">
          <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
            <circle cx="12" cy="12" fill="var(--fill-0, #FF4D00)" id="Color Sample" r="12" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function Row21() {
  return (
    <div className="bg-white content-stretch flex items-start relative shrink-0 w-full" data-name="Row">
      <div className="relative self-stretch shrink-0 w-[216px]" data-name="Table / Item / Row Item">
        <div aria-hidden="true" className="absolute border-[#f0f0f0] border-b border-solid inset-0 pointer-events-none" />
        <div className="content-stretch flex gap-[8px] items-start pb-[17px] pt-[16px] px-[16px] relative size-full">
          <div className="flex flex-[1_0_0] flex-col font-['SF_Pro_Text:Regular',sans-serif] justify-center leading-[0] min-h-px min-w-px not-italic relative text-[#434343] text-[14px]">
            <p className="leading-[22px]">Orange / orange-6</p>
          </div>
        </div>
      </div>
      <TableRowItem19 />
      <div className="flex-[1_0_0] min-h-px min-w-px relative" data-name="Table / Item / Row Item">
        <div aria-hidden="true" className="absolute border-[#f0f0f0] border-b border-solid inset-0 pointer-events-none" />
        <div className="content-stretch flex gap-[8px] items-start pb-[17px] pt-[16px] px-[16px] relative w-full">
          <div className="flex flex-[1_0_0] flex-col font-['SF_Pro_Text:Regular',sans-serif] justify-center leading-[0] min-h-px min-w-px not-italic relative text-[#434343] text-[14px]">
            <p className="leading-[22px]">
              - Primary brand color
              <br aria-hidden="true" />- Primary button default background
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

function TableRowItem20() {
  return (
    <div className="h-[55px] relative shrink-0 w-[88px]" data-name="Table / Row Item">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 88 55">
        <g id="Table / Row Item">
          <mask fill="white" id="path-1-inside-1_2021_7148">
            <path d="M0 0H88V55H0V0Z" />
          </mask>
          <path d="M88 55V54H0V55V56H88V55Z" fill="var(--stroke-0, #F0F0F0)" mask="url(#path-1-inside-1_2021_7148)" />
          <circle cx="28" cy="28" fill="var(--fill-0, #D4380D)" id="Color Sample" r="12" />
        </g>
      </svg>
    </div>
  );
}

function Row22() {
  return (
    <div className="bg-white content-stretch flex items-start relative shrink-0 w-full" data-name="Row">
      <div className="content-stretch flex gap-[8px] items-start pb-[17px] pt-[16px] px-[16px] relative shrink-0 w-[216px]" data-name="Table / Item / Row Item">
        <div aria-hidden="true" className="absolute border-[#f0f0f0] border-b border-solid inset-0 pointer-events-none" />
        <div className="flex flex-[1_0_0] flex-col font-['SF_Pro_Text:Regular',sans-serif] justify-center leading-[0] min-h-px min-w-px not-italic relative text-[#434343] text-[14px]">
          <p className="leading-[22px]">Orange / orange-7</p>
        </div>
      </div>
      <TableRowItem20 />
      <div className="flex-[1_0_0] min-h-px min-w-px relative" data-name="Table / Item / Row Item">
        <div aria-hidden="true" className="absolute border-[#f0f0f0] border-b border-solid inset-0 pointer-events-none" />
        <div className="content-stretch flex gap-[8px] items-start pb-[17px] pt-[16px] px-[16px] relative w-full">
          <div className="flex flex-[1_0_0] flex-col font-['SF_Pro_Text:Regular',sans-serif] justify-center leading-[0] min-h-px min-w-px not-italic relative text-[#434343] text-[14px]">
            <p className="leading-[22px]">- Primary button pressed background</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function TableRowItem21() {
  return (
    <div className="h-[55px] relative shrink-0 w-[88px]" data-name="Table / Row Item">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 88 55">
        <g id="Table / Row Item">
          <mask fill="white" id="path-1-inside-1_2021_7227">
            <path d="M0 0H88V55H0V0Z" />
          </mask>
          <path d="M88 55V54H0V55V56H88V55Z" fill="var(--stroke-0, #F0F0F0)" mask="url(#path-1-inside-1_2021_7227)" />
          <circle cx="28" cy="28" fill="var(--fill-0, #AD2102)" id="Color Sample" r="12" />
        </g>
      </svg>
    </div>
  );
}

function Row23() {
  return (
    <div className="bg-white content-stretch flex items-start relative shrink-0 w-full" data-name="Row">
      <div className="content-stretch flex gap-[8px] items-start pb-[17px] pt-[16px] px-[16px] relative shrink-0 w-[216px]" data-name="Table / Item / Row Item">
        <div aria-hidden="true" className="absolute border-[#f0f0f0] border-b border-solid inset-0 pointer-events-none" />
        <div className="flex flex-[1_0_0] flex-col font-['SF_Pro_Text:Regular',sans-serif] justify-center leading-[0] min-h-px min-w-px not-italic relative text-[#434343] text-[14px]">
          <p className="leading-[22px]">Orange / orange-8</p>
        </div>
      </div>
      <TableRowItem21 />
      <div className="flex-[1_0_0] min-h-px min-w-px relative" data-name="Table / Item / Row Item">
        <div aria-hidden="true" className="absolute border-[#f0f0f0] border-b border-solid inset-0 pointer-events-none" />
        <div className="content-stretch flex gap-[8px] items-start pb-[17px] pt-[16px] px-[16px] relative w-full">
          <div className="flex flex-[1_0_0] flex-col font-['SF_Pro_Text:Regular',sans-serif] justify-center leading-[0] min-h-px min-w-px not-italic relative text-[#434343] text-[14px]">
            <p className="leading-[22px]">-</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function TableRowItem22() {
  return (
    <div className="h-[55px] relative shrink-0 w-[88px]" data-name="Table / Row Item">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 88 55">
        <g id="Table / Row Item">
          <mask fill="white" id="path-1-inside-1_2021_7204">
            <path d="M0 0H88V55H0V0Z" />
          </mask>
          <path d="M88 55V54H0V55V56H88V55Z" fill="var(--stroke-0, #F0F0F0)" mask="url(#path-1-inside-1_2021_7204)" />
          <circle cx="28" cy="28" fill="var(--fill-0, #871400)" id="Color Sample" r="12" />
        </g>
      </svg>
    </div>
  );
}

function Row24() {
  return (
    <div className="bg-white content-stretch flex items-start relative shrink-0 w-full" data-name="Row">
      <div className="content-stretch flex gap-[8px] items-start pb-[17px] pt-[16px] px-[16px] relative shrink-0 w-[216px]" data-name="Table / Item / Row Item">
        <div aria-hidden="true" className="absolute border-[#f0f0f0] border-b border-solid inset-0 pointer-events-none" />
        <div className="flex flex-[1_0_0] flex-col font-['SF_Pro_Text:Regular',sans-serif] justify-center leading-[0] min-h-px min-w-px not-italic relative text-[#434343] text-[14px]">
          <p className="leading-[22px]">Orange / orange-9</p>
        </div>
      </div>
      <TableRowItem22 />
      <div className="flex-[1_0_0] min-h-px min-w-px relative" data-name="Table / Item / Row Item">
        <div aria-hidden="true" className="absolute border-[#f0f0f0] border-b border-solid inset-0 pointer-events-none" />
        <div className="content-stretch flex gap-[8px] items-start pb-[17px] pt-[16px] px-[16px] relative w-full">
          <div className="flex flex-[1_0_0] flex-col font-['SF_Pro_Text:Regular',sans-serif] justify-center leading-[0] min-h-px min-w-px not-italic relative text-[#434343] text-[14px]">
            <p className="leading-[22px]">-</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function TableRowItem23() {
  return (
    <div className="h-[55px] relative shrink-0 w-[88px]" data-name="Table / Row Item">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 88 55">
        <g id="Table / Row Item">
          <mask fill="white" id="path-1-inside-1_2021_7113">
            <path d="M0 0H88V55H0V0Z" />
          </mask>
          <path d="M88 55V54H0V55V56H88V55Z" fill="var(--stroke-0, #F0F0F0)" mask="url(#path-1-inside-1_2021_7113)" />
          <circle cx="28" cy="28" fill="var(--fill-0, #610B00)" id="Color Sample" r="12" />
        </g>
      </svg>
    </div>
  );
}

function Row25() {
  return (
    <div className="bg-white content-stretch flex items-start relative shrink-0 w-full" data-name="Row">
      <div className="content-stretch flex gap-[8px] items-start pb-[17px] pt-[16px] px-[16px] relative shrink-0 w-[216px]" data-name="Table / Item / Row Item">
        <div aria-hidden="true" className="absolute border-[#f0f0f0] border-b border-solid inset-0 pointer-events-none" />
        <div className="flex flex-[1_0_0] flex-col font-['SF_Pro_Text:Regular',sans-serif] justify-center leading-[0] min-h-px min-w-px not-italic relative text-[#434343] text-[14px]">
          <p className="leading-[22px]">Orange / orange-10</p>
        </div>
      </div>
      <TableRowItem23 />
      <div className="flex-[1_0_0] min-h-px min-w-px relative" data-name="Table / Item / Row Item">
        <div aria-hidden="true" className="absolute border-[#f0f0f0] border-b border-solid inset-0 pointer-events-none" />
        <div className="content-stretch flex gap-[8px] items-start pb-[17px] pt-[16px] px-[16px] relative w-full">
          <div className="flex flex-[1_0_0] flex-col font-['SF_Pro_Text:Regular',sans-serif] justify-center leading-[0] min-h-px min-w-px not-italic relative text-[#434343] text-[14px]">
            <p className="leading-[22px]">-</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function Table2() {
  return (
    <div className="bg-[#f0f0f0] content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Table">
      <HeaderRow2 />
      <Row16 />
      <Row17 />
      <Row18 />
      <Row19 />
      <Row20 />
      <Row21 />
      <Row22 />
      <Row23 />
      <Row24 />
      <Row25 />
    </div>
  );
}

function ComponentWrapper2() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col gap-[10px] items-start justify-center min-h-px min-w-px overflow-clip py-[16px] relative" data-name="Component Wrapper">
      <p className="font-['SF_Pro_Text:Semibold',sans-serif] leading-[24px] not-italic relative shrink-0 text-[#434343] text-[16px] w-full">Orange (Primary)</p>
      <Table2 />
    </div>
  );
}

function Frame9() {
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

function Frame10() {
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

function Frame11() {
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

function HeaderRow3() {
  return (
    <div className="content-stretch flex items-start relative shrink-0 w-full" data-name="Header Row">
      <div className="bg-[#fafafa] content-stretch flex items-center py-[16px] relative shrink-0 w-[216px]" data-name="Table / Item / Header Item/Basic/False/Default/Default">
        <div aria-hidden="true" className="absolute border-[#f0f0f0] border-b border-solid inset-0 pointer-events-none" />
        <Frame9 />
      </div>
      <div className="bg-[#fafafa] content-stretch flex items-center py-[16px] relative shrink-0 w-[88px]" data-name="Table / Item / Header Item/Basic/False/Default/Default">
        <div aria-hidden="true" className="absolute border-[#f0f0f0] border-b border-solid inset-0 pointer-events-none" />
        <Frame10 />
      </div>
      <div className="bg-[#fafafa] content-stretch flex flex-[1_0_0] items-center min-h-px min-w-px py-[16px] relative" data-name="Table / Item / Header Item/Basic/False/Default/Default">
        <div aria-hidden="true" className="absolute border-[#f0f0f0] border-b border-solid inset-0 pointer-events-none" />
        <Frame11 />
      </div>
    </div>
  );
}

function TableRowItem24() {
  return (
    <div className="h-[55px] relative shrink-0 w-[88px]" data-name="Table / Row Item">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 88 55">
        <g id="Table / Row Item">
          <mask fill="white" id="path-1-inside-1_2021_7151">
            <path d="M0 0H88V55H0V0Z" />
          </mask>
          <path d="M88 55V54H0V55V56H88V55Z" fill="var(--stroke-0, #F0F0F0)" mask="url(#path-1-inside-1_2021_7151)" />
          <g id="Color Sample">
            <circle cx="28" cy="28" fill="var(--fill-0, #F2F3F4)" r="12" />
            <circle cx="28" cy="28" r="11.5" stroke="var(--stroke-0, black)" strokeOpacity="0.05" />
          </g>
        </g>
      </svg>
    </div>
  );
}

function Row26() {
  return (
    <div className="bg-white content-stretch flex items-start relative shrink-0 w-full" data-name="Row">
      <div className="content-stretch flex gap-[8px] items-start pb-[17px] pt-[16px] px-[16px] relative shrink-0 w-[216px]" data-name="Table / Item / Row Item">
        <div aria-hidden="true" className="absolute border-[#f0f0f0] border-b border-solid inset-0 pointer-events-none" />
        <div className="flex flex-[1_0_0] flex-col font-['SF_Pro_Text:Regular',sans-serif] justify-center leading-[0] min-h-px min-w-px not-italic relative text-[#434343] text-[14px]">
          <p className="leading-[22px]">Navy / navy-1</p>
        </div>
      </div>
      <TableRowItem24 />
      <div className="flex-[1_0_0] min-h-px min-w-px relative" data-name="Table / Item / Row Item">
        <div aria-hidden="true" className="absolute border-[#f0f0f0] border-b border-solid inset-0 pointer-events-none" />
        <div className="content-stretch flex gap-[8px] items-start pb-[17px] pt-[16px] px-[16px] relative w-full">
          <div className="flex flex-[1_0_0] flex-col font-['SF_Pro_Text:Regular',sans-serif] justify-center leading-[0] min-h-px min-w-px not-italic relative text-[#434343] text-[14px]">
            <p className="leading-[22px]">Secondary button default background</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function TableRowItem25() {
  return (
    <div className="relative self-stretch shrink-0 w-[88px]" data-name="Table / Row Item">
      <div aria-hidden="true" className="absolute border-[#f0f0f0] border-b border-solid inset-0 pointer-events-none" />
      <div className="content-stretch flex items-start pb-[15px] pt-[16px] px-[16px] relative size-full">
        <div className="relative shrink-0 size-[24px]" data-name="Color Sample">
          <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
            <g id="Color Sample">
              <circle cx="12" cy="12" fill="var(--fill-0, #E5E7E9)" r="12" />
              <circle cx="12" cy="12" r="11.5" stroke="var(--stroke-0, black)" strokeOpacity="0.05" />
            </g>
          </svg>
        </div>
      </div>
    </div>
  );
}

function Row27() {
  return (
    <div className="bg-white content-stretch flex items-start relative shrink-0 w-full" data-name="Row">
      <div className="relative self-stretch shrink-0 w-[216px]" data-name="Table / Item / Row Item">
        <div aria-hidden="true" className="absolute border-[#f0f0f0] border-b border-solid inset-0 pointer-events-none" />
        <div className="content-stretch flex gap-[8px] items-start pb-[17px] pt-[16px] px-[16px] relative size-full">
          <div className="flex flex-[1_0_0] flex-col font-['SF_Pro_Text:Regular',sans-serif] justify-center leading-[0] min-h-px min-w-px not-italic relative text-[#434343] text-[14px]">
            <p className="leading-[22px]">Navy / navy-2</p>
          </div>
        </div>
      </div>
      <TableRowItem25 />
      <div className="flex-[1_0_0] min-h-px min-w-px relative" data-name="Table / Item / Row Item">
        <div aria-hidden="true" className="absolute border-[#f0f0f0] border-b border-solid inset-0 pointer-events-none" />
        <div className="content-stretch flex gap-[8px] items-start pb-[17px] pt-[16px] px-[16px] relative w-full">
          <div className="flex flex-[1_0_0] flex-col font-['SF_Pro_Text:Regular',sans-serif] justify-center leading-[0] min-h-px min-w-px not-italic relative text-[#434343] text-[14px]">
            <p className="leading-[22px]">Secondary / tertiary button hovered background</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function TableRowItem26() {
  return (
    <div className="relative self-stretch shrink-0 w-[88px]" data-name="Table / Row Item">
      <div aria-hidden="true" className="absolute border-[#f0f0f0] border-b border-solid inset-0 pointer-events-none" />
      <div className="content-stretch flex items-start pb-[15px] pt-[16px] px-[16px] relative size-full">
        <div className="relative shrink-0 size-[24px]" data-name="Color Sample">
          <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
            <g id="Color Sample">
              <circle cx="12" cy="12" fill="var(--fill-0, #C3C7CC)" r="12" />
              <circle cx="12" cy="12" r="11.5" stroke="var(--stroke-0, black)" strokeOpacity="0.05" />
            </g>
          </svg>
        </div>
      </div>
    </div>
  );
}

function Row28() {
  return (
    <div className="bg-white content-stretch flex items-start relative shrink-0 w-full" data-name="Row">
      <div className="relative self-stretch shrink-0 w-[216px]" data-name="Table / Item / Row Item">
        <div aria-hidden="true" className="absolute border-[#f0f0f0] border-b border-solid inset-0 pointer-events-none" />
        <div className="content-stretch flex gap-[8px] items-start pb-[17px] pt-[16px] px-[16px] relative size-full">
          <div className="flex flex-[1_0_0] flex-col font-['SF_Pro_Text:Regular',sans-serif] justify-center leading-[0] min-h-px min-w-px not-italic relative text-[#434343] text-[14px]">
            <p className="leading-[22px]">Navy / navy-3</p>
          </div>
        </div>
      </div>
      <TableRowItem26 />
      <div className="flex-[1_0_0] min-h-px min-w-px relative" data-name="Table / Item / Row Item">
        <div aria-hidden="true" className="absolute border-[#f0f0f0] border-b border-solid inset-0 pointer-events-none" />
        <div className="content-stretch flex gap-[8px] items-start pb-[17px] pt-[16px] px-[16px] relative w-full">
          <div className="flex flex-[1_0_0] flex-col font-['SF_Pro_Text:Regular',sans-serif] justify-center leading-[0] min-h-px min-w-px not-italic relative text-[#434343] text-[14px]">
            <p className="leading-[22px]">Secondary / tertiary button pressed background</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function TableRowItem27() {
  return (
    <div className="h-[55px] relative shrink-0 w-[88px]" data-name="Table / Row Item">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 88 55">
        <g id="Table / Row Item">
          <mask fill="white" id="path-1-inside-1_2021_7134">
            <path d="M0 0H88V55H0V0Z" />
          </mask>
          <path d="M88 55V54H0V55V56H88V55Z" fill="var(--stroke-0, #F0F0F0)" mask="url(#path-1-inside-1_2021_7134)" />
          <circle cx="28" cy="28" fill="var(--fill-0, #8A939D)" id="Color Sample" r="12" />
        </g>
      </svg>
    </div>
  );
}

function Row29() {
  return (
    <div className="bg-white content-stretch flex items-start relative shrink-0 w-full" data-name="Row">
      <div className="content-stretch flex gap-[8px] items-start pb-[17px] pt-[16px] px-[16px] relative shrink-0 w-[216px]" data-name="Table / Item / Row Item">
        <div aria-hidden="true" className="absolute border-[#f0f0f0] border-b border-solid inset-0 pointer-events-none" />
        <div className="flex flex-[1_0_0] flex-col font-['SF_Pro_Text:Regular',sans-serif] justify-center leading-[0] min-h-px min-w-px not-italic relative text-[#434343] text-[14px]">
          <p className="leading-[22px]">Navy / navy-4</p>
        </div>
      </div>
      <TableRowItem27 />
      <div className="flex-[1_0_0] min-h-px min-w-px relative" data-name="Table / Item / Row Item">
        <div aria-hidden="true" className="absolute border-[#f0f0f0] border-b border-solid inset-0 pointer-events-none" />
        <div className="content-stretch flex gap-[8px] items-start pb-[17px] pt-[16px] px-[16px] relative w-full">
          <div className="flex flex-[1_0_0] flex-col font-['SF_Pro_Text:Regular',sans-serif] justify-center leading-[0] min-h-px min-w-px not-italic relative text-[#434343] text-[14px]">
            <p className="leading-[22px]">-</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function TableRowItem28() {
  return (
    <div className="h-[55px] relative shrink-0 w-[88px]" data-name="Table / Row Item">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 88 55">
        <g id="Table / Row Item">
          <mask fill="white" id="path-1-inside-1_2021_7116">
            <path d="M0 0H88V55H0V0Z" />
          </mask>
          <path d="M88 55V54H0V55V56H88V55Z" fill="var(--stroke-0, #F0F0F0)" mask="url(#path-1-inside-1_2021_7116)" />
          <circle cx="28" cy="28" fill="var(--fill-0, #75808B)" id="Color Sample" r="12" />
        </g>
      </svg>
    </div>
  );
}

function Row30() {
  return (
    <div className="bg-white content-stretch flex items-start relative shrink-0 w-full" data-name="Row">
      <div className="content-stretch flex gap-[8px] items-start pb-[17px] pt-[16px] px-[16px] relative shrink-0 w-[216px]" data-name="Table / Item / Row Item">
        <div aria-hidden="true" className="absolute border-[#f0f0f0] border-b border-solid inset-0 pointer-events-none" />
        <div className="flex flex-[1_0_0] flex-col font-['SF_Pro_Text:Regular',sans-serif] justify-center leading-[0] min-h-px min-w-px not-italic relative text-[#434343] text-[14px]">
          <p className="leading-[22px]">Navy / navy-5</p>
        </div>
      </div>
      <TableRowItem28 />
      <div className="flex-[1_0_0] min-h-px min-w-px relative" data-name="Table / Item / Row Item">
        <div aria-hidden="true" className="absolute border-[#f0f0f0] border-b border-solid inset-0 pointer-events-none" />
        <div className="content-stretch flex gap-[8px] items-start pb-[17px] pt-[16px] px-[16px] relative w-full">
          <div className="flex flex-[1_0_0] flex-col font-['SF_Pro_Text:Regular',sans-serif] justify-center leading-[0] min-h-px min-w-px not-italic relative text-[#434343] text-[14px]">
            <p className="leading-[22px]">-</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function TableRowItem29() {
  return (
    <div className="relative self-stretch shrink-0 w-[88px]" data-name="Table / Row Item">
      <div aria-hidden="true" className="absolute border-[#f0f0f0] border-b border-solid inset-0 pointer-events-none" />
      <div className="content-stretch flex items-start pb-[15px] pt-[16px] px-[16px] relative size-full">
        <div className="relative shrink-0 size-[24px]" data-name="Color Sample">
          <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
            <circle cx="12" cy="12" fill="var(--fill-0, #616D79)" id="Color Sample" r="12" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function Row31() {
  return (
    <div className="bg-white content-stretch flex items-start relative shrink-0 w-full" data-name="Row">
      <div className="relative self-stretch shrink-0 w-[216px]" data-name="Table / Item / Row Item">
        <div aria-hidden="true" className="absolute border-[#f0f0f0] border-b border-solid inset-0 pointer-events-none" />
        <div className="content-stretch flex gap-[8px] items-start pb-[17px] pt-[16px] px-[16px] relative size-full">
          <div className="flex flex-[1_0_0] flex-col font-['SF_Pro_Text:Regular',sans-serif] justify-center leading-[0] min-h-px min-w-px not-italic relative text-[#434343] text-[14px]">
            <p className="leading-[22px]">Navy / navy-6</p>
          </div>
        </div>
      </div>
      <TableRowItem29 />
      <div className="flex-[1_0_0] min-h-px min-w-px relative" data-name="Table / Item / Row Item">
        <div aria-hidden="true" className="absolute border-[#f0f0f0] border-b border-solid inset-0 pointer-events-none" />
        <div className="content-stretch flex gap-[8px] items-start pb-[17px] pt-[16px] px-[16px] relative w-full">
          <div className="flex flex-[1_0_0] flex-col font-['SF_Pro_Text:Regular',sans-serif] justify-center leading-[22px] min-h-px min-w-px not-italic relative text-[#434343] text-[14px]">
            <p className="mb-0">- Icon / button text color</p>
            <p>- Secondary / Tertiary button stroke color</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function TableRowItem30() {
  return (
    <div className="h-[55px] relative shrink-0 w-[88px]" data-name="Table / Row Item">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 88 55">
        <g id="Table / Row Item">
          <mask fill="white" id="path-1-inside-1_2021_7137">
            <path d="M0 0H88V55H0V0Z" />
          </mask>
          <path d="M88 55V54H0V55V56H88V55Z" fill="var(--stroke-0, #F0F0F0)" mask="url(#path-1-inside-1_2021_7137)" />
          <circle cx="28" cy="28" fill="var(--fill-0, #4C5A67)" id="Color Sample" r="12" />
        </g>
      </svg>
    </div>
  );
}

function Row32() {
  return (
    <div className="bg-white content-stretch flex items-start relative shrink-0 w-full" data-name="Row">
      <div className="content-stretch flex gap-[8px] items-start pb-[17px] pt-[16px] px-[16px] relative shrink-0 w-[216px]" data-name="Table / Item / Row Item">
        <div aria-hidden="true" className="absolute border-[#f0f0f0] border-b border-solid inset-0 pointer-events-none" />
        <div className="flex flex-[1_0_0] flex-col font-['SF_Pro_Text:Regular',sans-serif] justify-center leading-[0] min-h-px min-w-px not-italic relative text-[#434343] text-[14px]">
          <p className="leading-[22px]">Navy / navy-7</p>
        </div>
      </div>
      <TableRowItem30 />
      <div className="flex-[1_0_0] min-h-px min-w-px relative" data-name="Table / Item / Row Item">
        <div aria-hidden="true" className="absolute border-[#f0f0f0] border-b border-solid inset-0 pointer-events-none" />
        <div className="content-stretch flex gap-[8px] items-start pb-[17px] pt-[16px] px-[16px] relative w-full">
          <div className="flex flex-[1_0_0] flex-col font-['SF_Pro_Text:Regular',sans-serif] justify-center leading-[0] min-h-px min-w-px not-italic relative text-[#434343] text-[14px]">
            <p className="leading-[22px]">-</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function TableRowItem31() {
  return (
    <div className="relative self-stretch shrink-0 w-[88px]" data-name="Table / Row Item">
      <div aria-hidden="true" className="absolute border-[#f0f0f0] border-b border-solid inset-0 pointer-events-none" />
      <div className="content-stretch flex items-start pb-[15px] pt-[16px] px-[16px] relative size-full">
        <div className="relative shrink-0 size-[24px]" data-name="Color Sample">
          <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
            <circle cx="12" cy="12" fill="var(--fill-0, #384857)" id="Color Sample" r="12" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function Row33() {
  return (
    <div className="bg-white content-stretch flex items-start relative shrink-0 w-full" data-name="Row">
      <div className="relative self-stretch shrink-0 w-[216px]" data-name="Table / Item / Row Item">
        <div aria-hidden="true" className="absolute border-[#f0f0f0] border-b border-solid inset-0 pointer-events-none" />
        <div className="content-stretch flex gap-[8px] items-start pb-[17px] pt-[16px] px-[16px] relative size-full">
          <div className="flex flex-[1_0_0] flex-col font-['SF_Pro_Text:Regular',sans-serif] justify-center leading-[0] min-h-px min-w-px not-italic relative text-[#434343] text-[14px]">
            <p className="leading-[22px]">Navy / navy-8</p>
          </div>
        </div>
      </div>
      <TableRowItem31 />
      <div className="flex-[1_0_0] min-h-px min-w-px relative" data-name="Table / Item / Row Item">
        <div aria-hidden="true" className="absolute border-[#f0f0f0] border-b border-solid inset-0 pointer-events-none" />
        <div className="content-stretch flex gap-[8px] items-start pb-[17px] pt-[16px] px-[16px] relative w-full">
          <div className="flex flex-[1_0_0] flex-col font-['SF_Pro_Text:Regular',sans-serif] justify-center leading-[22px] min-h-px min-w-px not-italic relative text-[#434343] text-[14px]">
            <p className="mb-0">- Widget top frame background color in webapp</p>
            <p>- Toolbar background color</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function TableRowItem32() {
  return (
    <div className="relative self-stretch shrink-0 w-[88px]" data-name="Table / Row Item">
      <div aria-hidden="true" className="absolute border-[#f0f0f0] border-b border-solid inset-0 pointer-events-none" />
      <div className="content-stretch flex items-start pb-[15px] pt-[16px] px-[16px] relative size-full">
        <div className="relative shrink-0 size-[24px]" data-name="Color Sample">
          <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
            <circle cx="12" cy="12" fill="var(--fill-0, #243746)" id="Color Sample" r="12" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function Row34() {
  return (
    <div className="bg-white content-stretch flex items-start relative shrink-0 w-full" data-name="Row">
      <div className="relative self-stretch shrink-0 w-[216px]" data-name="Table / Item / Row Item">
        <div aria-hidden="true" className="absolute border-[#f0f0f0] border-b border-solid inset-0 pointer-events-none" />
        <div className="content-stretch flex gap-[8px] items-start pb-[17px] pt-[16px] px-[16px] relative size-full">
          <div className="flex flex-[1_0_0] flex-col font-['SF_Pro_Text:Regular',sans-serif] justify-center leading-[0] min-h-px min-w-px not-italic relative text-[#434343] text-[14px]">
            <p className="leading-[22px]">Navy / navy-9</p>
          </div>
        </div>
      </div>
      <TableRowItem32 />
      <div className="flex-[1_0_0] min-h-px min-w-px relative" data-name="Table / Item / Row Item">
        <div aria-hidden="true" className="absolute border-[#f0f0f0] border-b border-solid inset-0 pointer-events-none" />
        <div className="content-stretch flex gap-[8px] items-start pb-[17px] pt-[16px] px-[16px] relative w-full">
          <div className="flex flex-[1_0_0] flex-col font-['SF_Pro_Text:Regular',sans-serif] justify-center leading-[22px] min-h-px min-w-px not-italic relative text-[#434343] text-[14px]">
            <p className="mb-0">- Secondary brand color</p>
            <p className="mb-0">- Drawer navigation background color for webapp</p>
            <p className="mb-0">- Bottom tab navigation bar background color for mobile app</p>
            <p className="mb-0">- Toolbar button pressed / click background color</p>
            <p>- Modal top frame background color in webapp</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function TableRowItem33() {
  return (
    <div className="h-[55px] relative shrink-0 w-[88px]" data-name="Table / Row Item">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 88 55">
        <g id="Table / Row Item">
          <mask fill="white" id="path-1-inside-1_2021_7195">
            <path d="M0 0H88V55H0V0Z" />
          </mask>
          <path d="M88 55V54H0V55V56H88V55Z" fill="var(--stroke-0, #F0F0F0)" mask="url(#path-1-inside-1_2021_7195)" />
          <circle cx="28" cy="28" fill="var(--fill-0, #1D2C38)" id="Color Sample" r="12" />
        </g>
      </svg>
    </div>
  );
}

function Row35() {
  return (
    <div className="bg-white content-stretch flex items-start relative shrink-0 w-full" data-name="Row">
      <div className="content-stretch flex gap-[8px] items-start pb-[17px] pt-[16px] px-[16px] relative shrink-0 w-[216px]" data-name="Table / Item / Row Item">
        <div aria-hidden="true" className="absolute border-[#f0f0f0] border-b border-solid inset-0 pointer-events-none" />
        <div className="flex flex-[1_0_0] flex-col font-['SF_Pro_Text:Regular',sans-serif] justify-center leading-[0] min-h-px min-w-px not-italic relative text-[#434343] text-[14px]">
          <p className="leading-[22px]">Navy / navy-10</p>
        </div>
      </div>
      <TableRowItem33 />
      <div className="flex-[1_0_0] min-h-px min-w-px relative" data-name="Table / Item / Row Item">
        <div aria-hidden="true" className="absolute border-[#f0f0f0] border-b border-solid inset-0 pointer-events-none" />
        <div className="content-stretch flex gap-[8px] items-start pb-[17px] pt-[16px] px-[16px] relative w-full">
          <div className="flex flex-[1_0_0] flex-col font-['SF_Pro_Text:Regular',sans-serif] justify-center leading-[0] min-h-px min-w-px not-italic relative text-[#434343] text-[14px]">
            <p className="leading-[22px]">-</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function Table3() {
  return (
    <div className="bg-[#f0f0f0] content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Table">
      <HeaderRow3 />
      <Row26 />
      <Row27 />
      <Row28 />
      <Row29 />
      <Row30 />
      <Row31 />
      <Row32 />
      <Row33 />
      <Row34 />
      <Row35 />
    </div>
  );
}

function ComponentWrapper3() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col gap-[10px] items-start justify-center min-h-px min-w-px overflow-clip py-[16px] relative" data-name="Component Wrapper">
      <p className="font-['SF_Pro_Text:Semibold',sans-serif] leading-[24px] not-italic relative shrink-0 text-[#434343] text-[16px] w-full">Navy (Secondary)</p>
      <Table3 />
    </div>
  );
}

function Row15() {
  return (
    <div className="content-stretch flex gap-[24px] items-start relative shrink-0 w-full" data-name="Row">
      <ComponentWrapper2 />
      <ComponentWrapper3 />
    </div>
  );
}

function Grid1() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Grid">
      <Row15 />
    </div>
  );
}

function Frame12() {
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

function Frame13() {
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

function Frame14() {
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

function HeaderRow4() {
  return (
    <div className="content-stretch flex items-start relative shrink-0 w-full" data-name="Header Row">
      <div className="bg-[#fafafa] content-stretch flex items-center py-[16px] relative shrink-0 w-[216px]" data-name="Table / Item / Header Item/Basic/False/Default/Default">
        <div aria-hidden="true" className="absolute border-[#f0f0f0] border-b border-solid inset-0 pointer-events-none" />
        <Frame12 />
      </div>
      <div className="bg-[#fafafa] content-stretch flex items-center py-[16px] relative shrink-0 w-[88px]" data-name="Table / Item / Header Item/Basic/False/Default/Default">
        <div aria-hidden="true" className="absolute border-[#f0f0f0] border-b border-solid inset-0 pointer-events-none" />
        <Frame13 />
      </div>
      <div className="bg-[#fafafa] content-stretch flex flex-[1_0_0] items-center min-h-px min-w-px py-[16px] relative" data-name="Table / Item / Header Item/Basic/False/Default/Default">
        <div aria-hidden="true" className="absolute border-[#f0f0f0] border-b border-solid inset-0 pointer-events-none" />
        <Frame14 />
      </div>
    </div>
  );
}

function TableRowItem34() {
  return (
    <div className="h-[55px] relative shrink-0 w-[88px]" data-name="Table / Row Item">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 88 55">
        <g id="Table / Row Item">
          <mask fill="white" id="path-1-inside-1_2021_7213">
            <path d="M0 0H88V55H0V0Z" />
          </mask>
          <path d="M88 55V54H0V55V56H88V55Z" fill="var(--stroke-0, #F0F0F0)" mask="url(#path-1-inside-1_2021_7213)" />
          <g id="Color Sample">
            <circle cx="28" cy="28" fill="var(--fill-0, #E6F7FF)" r="12" />
            <circle cx="28" cy="28" r="11.5" stroke="var(--stroke-0, black)" strokeOpacity="0.05" />
          </g>
        </g>
      </svg>
    </div>
  );
}

function Row37() {
  return (
    <div className="bg-white content-stretch flex items-start relative shrink-0 w-full" data-name="Row">
      <div className="content-stretch flex gap-[8px] items-start pb-[17px] pt-[16px] px-[16px] relative shrink-0 w-[216px]" data-name="Table / Item / Row Item">
        <div aria-hidden="true" className="absolute border-[#f0f0f0] border-b border-solid inset-0 pointer-events-none" />
        <div className="flex flex-[1_0_0] flex-col font-['SF_Pro_Text:Regular',sans-serif] justify-center leading-[0] min-h-px min-w-px not-italic relative text-[#434343] text-[14px]">
          <p className="leading-[22px]">Blue / blue-1</p>
        </div>
      </div>
      <TableRowItem34 />
      <div className="flex-[1_0_0] min-h-px min-w-px relative" data-name="Table / Item / Row Item">
        <div aria-hidden="true" className="absolute border-[#f0f0f0] border-b border-solid inset-0 pointer-events-none" />
        <div className="content-stretch flex gap-[8px] items-start pb-[17px] pt-[16px] px-[16px] relative w-full">
          <div className="flex flex-[1_0_0] flex-col font-['SF_Pro_Text:Regular',sans-serif] justify-center leading-[0] min-h-px min-w-px not-italic relative text-[#434343] text-[14px]">
            <p className="leading-[22px]">Selected background color</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function TableRowItem35() {
  return (
    <div className="h-[55px] relative shrink-0 w-[88px]" data-name="Table / Row Item">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 88 55">
        <g id="Table / Row Item">
          <mask fill="white" id="path-1-inside-1_2021_7162">
            <path d="M0 0H88V55H0V0Z" />
          </mask>
          <path d="M88 55V54H0V55V56H88V55Z" fill="var(--stroke-0, #F0F0F0)" mask="url(#path-1-inside-1_2021_7162)" />
          <g id="Color Sample">
            <circle cx="28" cy="28" fill="var(--fill-0, #BAE7FF)" r="12" />
            <circle cx="28" cy="28" r="11.5" stroke="var(--stroke-0, black)" strokeOpacity="0.05" />
          </g>
        </g>
      </svg>
    </div>
  );
}

function Row38() {
  return (
    <div className="bg-white content-stretch flex items-start relative shrink-0 w-full" data-name="Row">
      <div className="content-stretch flex gap-[8px] items-start pb-[17px] pt-[16px] px-[16px] relative shrink-0 w-[216px]" data-name="Table / Item / Row Item">
        <div aria-hidden="true" className="absolute border-[#f0f0f0] border-b border-solid inset-0 pointer-events-none" />
        <div className="flex flex-[1_0_0] flex-col font-['SF_Pro_Text:Regular',sans-serif] justify-center leading-[0] min-h-px min-w-px not-italic relative text-[#434343] text-[14px]">
          <p className="leading-[22px]">Blue / blue-2</p>
        </div>
      </div>
      <TableRowItem35 />
      <div className="flex-[1_0_0] min-h-px min-w-px relative" data-name="Table / Item / Row Item">
        <div aria-hidden="true" className="absolute border-[#f0f0f0] border-b border-solid inset-0 pointer-events-none" />
        <div className="content-stretch flex gap-[8px] items-start pb-[17px] pt-[16px] px-[16px] relative w-full">
          <div className="flex flex-[1_0_0] flex-col font-['SF_Pro_Text:Regular',sans-serif] justify-center leading-[0] min-h-px min-w-px not-italic relative text-[#434343] text-[14px]">
            <p className="leading-[22px]">-</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function TableRowItem36() {
  return (
    <div className="h-[55px] relative shrink-0 w-[88px]" data-name="Table / Row Item">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 88 55">
        <g id="Table / Row Item">
          <mask fill="white" id="path-1-inside-1_2021_7110">
            <path d="M0 0H88V55H0V0Z" />
          </mask>
          <path d="M88 55V54H0V55V56H88V55Z" fill="var(--stroke-0, #F0F0F0)" mask="url(#path-1-inside-1_2021_7110)" />
          <g id="Color Sample">
            <circle cx="28" cy="28" fill="var(--fill-0, #91D5FF)" r="12" />
            <circle cx="28" cy="28" r="11.5" stroke="var(--stroke-0, black)" strokeOpacity="0.05" />
          </g>
        </g>
      </svg>
    </div>
  );
}

function Row39() {
  return (
    <div className="bg-white content-stretch flex items-start relative shrink-0 w-full" data-name="Row">
      <div className="content-stretch flex gap-[8px] items-start pb-[17px] pt-[16px] px-[16px] relative shrink-0 w-[216px]" data-name="Table / Item / Row Item">
        <div aria-hidden="true" className="absolute border-[#f0f0f0] border-b border-solid inset-0 pointer-events-none" />
        <div className="flex flex-[1_0_0] flex-col font-['SF_Pro_Text:Regular',sans-serif] justify-center leading-[0] min-h-px min-w-px not-italic relative text-[#434343] text-[14px]">
          <p className="leading-[22px]">Blue / blue-3</p>
        </div>
      </div>
      <TableRowItem36 />
      <div className="flex-[1_0_0] min-h-px min-w-px relative" data-name="Table / Item / Row Item">
        <div aria-hidden="true" className="absolute border-[#f0f0f0] border-b border-solid inset-0 pointer-events-none" />
        <div className="content-stretch flex gap-[8px] items-start pb-[17px] pt-[16px] px-[16px] relative w-full">
          <div className="flex flex-[1_0_0] flex-col font-['SF_Pro_Text:Regular',sans-serif] justify-center leading-[0] min-h-px min-w-px not-italic relative text-[#434343] text-[14px]">
            <p className="leading-[22px]">Border</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function TableRowItem37() {
  return (
    <div className="h-[55px] relative shrink-0 w-[88px]" data-name="Table / Row Item">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 88 55">
        <g id="Table / Row Item">
          <mask fill="white" id="path-1-inside-1_2021_7221">
            <path d="M0 0H88V55H0V0Z" />
          </mask>
          <path d="M88 55V54H0V55V56H88V55Z" fill="var(--stroke-0, #F0F0F0)" mask="url(#path-1-inside-1_2021_7221)" />
          <circle cx="28" cy="28" fill="var(--fill-0, #69C0FF)" id="Color Sample" r="12" />
        </g>
      </svg>
    </div>
  );
}

function Row40() {
  return (
    <div className="bg-white content-stretch flex items-start relative shrink-0 w-full" data-name="Row">
      <div className="content-stretch flex gap-[8px] items-start pb-[17px] pt-[16px] px-[16px] relative shrink-0 w-[216px]" data-name="Table / Item / Row Item">
        <div aria-hidden="true" className="absolute border-[#f0f0f0] border-b border-solid inset-0 pointer-events-none" />
        <div className="flex flex-[1_0_0] flex-col font-['SF_Pro_Text:Regular',sans-serif] justify-center leading-[0] min-h-px min-w-px not-italic relative text-[#434343] text-[14px]">
          <p className="leading-[22px]">Blue / blue-4</p>
        </div>
      </div>
      <TableRowItem37 />
      <div className="flex-[1_0_0] min-h-px min-w-px relative" data-name="Table / Item / Row Item">
        <div aria-hidden="true" className="absolute border-[#f0f0f0] border-b border-solid inset-0 pointer-events-none" />
        <div className="content-stretch flex gap-[8px] items-start pb-[17px] pt-[16px] px-[16px] relative w-full">
          <div className="flex flex-[1_0_0] flex-col font-['SF_Pro_Text:Regular',sans-serif] justify-center leading-[0] min-h-px min-w-px not-italic relative text-[#434343] text-[14px]">
            <p className="leading-[22px]">-</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function TableRowItem38() {
  return (
    <div className="h-[55px] relative shrink-0 w-[88px]" data-name="Table / Row Item">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 88 55">
        <g id="Table / Row Item">
          <mask fill="white" id="path-1-inside-1_2021_7101">
            <path d="M0 0H88V55H0V0Z" />
          </mask>
          <path d="M88 55V54H0V55V56H88V55Z" fill="var(--stroke-0, #F0F0F0)" mask="url(#path-1-inside-1_2021_7101)" />
          <circle cx="28" cy="28" fill="var(--fill-0, #40A9FF)" id="Color Sample" r="12" />
        </g>
      </svg>
    </div>
  );
}

function Row41() {
  return (
    <div className="bg-white content-stretch flex items-start relative shrink-0 w-full" data-name="Row">
      <div className="content-stretch flex gap-[8px] items-start pb-[17px] pt-[16px] px-[16px] relative shrink-0 w-[216px]" data-name="Table / Item / Row Item">
        <div aria-hidden="true" className="absolute border-[#f0f0f0] border-b border-solid inset-0 pointer-events-none" />
        <div className="flex flex-[1_0_0] flex-col font-['SF_Pro_Text:Regular',sans-serif] justify-center leading-[0] min-h-px min-w-px not-italic relative text-[#434343] text-[14px]">
          <p className="leading-[22px]">Blue / blue-5</p>
        </div>
      </div>
      <TableRowItem38 />
      <div className="flex-[1_0_0] min-h-px min-w-px relative" data-name="Table / Item / Row Item">
        <div aria-hidden="true" className="absolute border-[#f0f0f0] border-b border-solid inset-0 pointer-events-none" />
        <div className="content-stretch flex gap-[8px] items-start pb-[17px] pt-[16px] px-[16px] relative w-full">
          <div className="flex flex-[1_0_0] flex-col font-['SF_Pro_Text:Regular',sans-serif] justify-center leading-[0] min-h-px min-w-px not-italic relative text-[#434343] text-[14px]">
            <p className="leading-[22px]">Hover</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function TableRowItem39() {
  return (
    <div className="h-[55px] relative shrink-0 w-[88px]" data-name="Table / Row Item">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 88 55">
        <g id="Table / Row Item">
          <mask fill="white" id="path-1-inside-1_2021_7233">
            <path d="M0 0H88V55H0V0Z" />
          </mask>
          <path d="M88 55V54H0V55V56H88V55Z" fill="var(--stroke-0, #F0F0F0)" mask="url(#path-1-inside-1_2021_7233)" />
          <circle cx="28" cy="28" fill="var(--fill-0, #1890FF)" id="Color Sample" r="12" />
        </g>
      </svg>
    </div>
  );
}

function Row42() {
  return (
    <div className="bg-white content-stretch flex items-start relative shrink-0 w-full" data-name="Row">
      <div className="content-stretch flex gap-[8px] items-start pb-[17px] pt-[16px] px-[16px] relative shrink-0 w-[216px]" data-name="Table / Item / Row Item">
        <div aria-hidden="true" className="absolute border-[#f0f0f0] border-b border-solid inset-0 pointer-events-none" />
        <div className="flex flex-[1_0_0] flex-col font-['SF_Pro_Text:Regular',sans-serif] justify-center leading-[0] min-h-px min-w-px not-italic relative text-[#434343] text-[14px]">
          <p className="leading-[22px]">Blue / blue-6</p>
        </div>
      </div>
      <TableRowItem39 />
      <div className="flex-[1_0_0] min-h-px min-w-px relative" data-name="Table / Item / Row Item">
        <div aria-hidden="true" className="absolute border-[#f0f0f0] border-b border-solid inset-0 pointer-events-none" />
        <div className="content-stretch flex gap-[8px] items-start pb-[17px] pt-[16px] px-[16px] relative w-full">
          <div className="flex flex-[1_0_0] flex-col font-['SF_Pro_Text:Regular',sans-serif] justify-center leading-[0] min-h-px min-w-px not-italic relative text-[#434343] text-[14px]">
            <p className="leading-[22px]">Normal</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function TableRowItem40() {
  return (
    <div className="h-[55px] relative shrink-0 w-[88px]" data-name="Table / Row Item">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 88 55">
        <g id="Table / Row Item">
          <mask fill="white" id="path-1-inside-1_2021_7092">
            <path d="M0 0H88V55H0V0Z" />
          </mask>
          <path d="M88 55V54H0V55V56H88V55Z" fill="var(--stroke-0, #F0F0F0)" mask="url(#path-1-inside-1_2021_7092)" />
          <circle cx="28" cy="28" fill="var(--fill-0, #096DD9)" id="Color Sample" r="12" />
        </g>
      </svg>
    </div>
  );
}

function Row43() {
  return (
    <div className="bg-white content-stretch flex items-start relative shrink-0 w-full" data-name="Row">
      <div className="content-stretch flex gap-[8px] items-start pb-[17px] pt-[16px] px-[16px] relative shrink-0 w-[216px]" data-name="Table / Item / Row Item">
        <div aria-hidden="true" className="absolute border-[#f0f0f0] border-b border-solid inset-0 pointer-events-none" />
        <div className="flex flex-[1_0_0] flex-col font-['SF_Pro_Text:Regular',sans-serif] justify-center leading-[0] min-h-px min-w-px not-italic relative text-[#434343] text-[14px]">
          <p className="leading-[22px]">Blue / blue-7</p>
        </div>
      </div>
      <TableRowItem40 />
      <div className="flex-[1_0_0] min-h-px min-w-px relative" data-name="Table / Item / Row Item">
        <div aria-hidden="true" className="absolute border-[#f0f0f0] border-b border-solid inset-0 pointer-events-none" />
        <div className="content-stretch flex gap-[8px] items-start pb-[17px] pt-[16px] px-[16px] relative w-full">
          <div className="flex flex-[1_0_0] flex-col font-['SF_Pro_Text:Regular',sans-serif] justify-center leading-[0] min-h-px min-w-px not-italic relative text-[#434343] text-[14px]">
            <p className="leading-[22px]">Click</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function TableRowItem41() {
  return (
    <div className="h-[55px] relative shrink-0 w-[88px]" data-name="Table / Row Item">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 88 55">
        <g id="Table / Row Item">
          <mask fill="white" id="path-1-inside-1_2021_7186">
            <path d="M0 0H88V55H0V0Z" />
          </mask>
          <path d="M88 55V54H0V55V56H88V55Z" fill="var(--stroke-0, #F0F0F0)" mask="url(#path-1-inside-1_2021_7186)" />
          <circle cx="28" cy="28" fill="var(--fill-0, #0050B3)" id="Color Sample" r="12" />
        </g>
      </svg>
    </div>
  );
}

function Row44() {
  return (
    <div className="bg-white content-stretch flex items-start relative shrink-0 w-full" data-name="Row">
      <div className="content-stretch flex gap-[8px] items-start pb-[17px] pt-[16px] px-[16px] relative shrink-0 w-[216px]" data-name="Table / Item / Row Item">
        <div aria-hidden="true" className="absolute border-[#f0f0f0] border-b border-solid inset-0 pointer-events-none" />
        <div className="flex flex-[1_0_0] flex-col font-['SF_Pro_Text:Regular',sans-serif] justify-center leading-[0] min-h-px min-w-px not-italic relative text-[#434343] text-[14px]">
          <p className="leading-[22px]">Blue / blue-8</p>
        </div>
      </div>
      <TableRowItem41 />
      <div className="flex-[1_0_0] min-h-px min-w-px relative" data-name="Table / Item / Row Item">
        <div aria-hidden="true" className="absolute border-[#f0f0f0] border-b border-solid inset-0 pointer-events-none" />
        <div className="content-stretch flex gap-[8px] items-start pb-[17px] pt-[16px] px-[16px] relative w-full">
          <div className="flex flex-[1_0_0] flex-col font-['SF_Pro_Text:Regular',sans-serif] justify-center leading-[0] min-h-px min-w-px not-italic relative text-[#434343] text-[14px]">
            <p className="leading-[22px]">-</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function TableRowItem42() {
  return (
    <div className="h-[55px] relative shrink-0 w-[88px]" data-name="Table / Row Item">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 88 55">
        <g id="Table / Row Item">
          <mask fill="white" id="path-1-inside-1_2021_7086">
            <path d="M0 0H88V55H0V0Z" />
          </mask>
          <path d="M88 55V54H0V55V56H88V55Z" fill="var(--stroke-0, #F0F0F0)" mask="url(#path-1-inside-1_2021_7086)" />
          <circle cx="28" cy="28" fill="var(--fill-0, #003A8C)" id="Color Sample" r="12" />
        </g>
      </svg>
    </div>
  );
}

function Row45() {
  return (
    <div className="bg-white content-stretch flex items-start relative shrink-0 w-full" data-name="Row">
      <div className="content-stretch flex gap-[8px] items-start pb-[17px] pt-[16px] px-[16px] relative shrink-0 w-[216px]" data-name="Table / Item / Row Item">
        <div aria-hidden="true" className="absolute border-[#f0f0f0] border-b border-solid inset-0 pointer-events-none" />
        <div className="flex flex-[1_0_0] flex-col font-['SF_Pro_Text:Regular',sans-serif] justify-center leading-[0] min-h-px min-w-px not-italic relative text-[#434343] text-[14px]">
          <p className="leading-[22px]">Blue / blue-9</p>
        </div>
      </div>
      <TableRowItem42 />
      <div className="flex-[1_0_0] min-h-px min-w-px relative" data-name="Table / Item / Row Item">
        <div aria-hidden="true" className="absolute border-[#f0f0f0] border-b border-solid inset-0 pointer-events-none" />
        <div className="content-stretch flex gap-[8px] items-start pb-[17px] pt-[16px] px-[16px] relative w-full">
          <div className="flex flex-[1_0_0] flex-col font-['SF_Pro_Text:Regular',sans-serif] justify-center leading-[0] min-h-px min-w-px not-italic relative text-[#434343] text-[14px]">
            <p className="leading-[22px]">-</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function TableRowItem43() {
  return (
    <div className="h-[55px] relative shrink-0 w-[88px]" data-name="Table / Row Item">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 88 55">
        <g id="Table / Row Item">
          <mask fill="white" id="path-1-inside-1_2021_7210">
            <path d="M0 0H88V55H0V0Z" />
          </mask>
          <path d="M88 55V54H0V55V56H88V55Z" fill="var(--stroke-0, #F0F0F0)" mask="url(#path-1-inside-1_2021_7210)" />
          <circle cx="28" cy="28" fill="var(--fill-0, #002766)" id="Color Sample" r="12" />
        </g>
      </svg>
    </div>
  );
}

function Row46() {
  return (
    <div className="bg-white content-stretch flex items-start relative shrink-0 w-full" data-name="Row">
      <div className="content-stretch flex gap-[8px] items-start pb-[17px] pt-[16px] px-[16px] relative shrink-0 w-[216px]" data-name="Table / Item / Row Item">
        <div aria-hidden="true" className="absolute border-[#f0f0f0] border-b border-solid inset-0 pointer-events-none" />
        <div className="flex flex-[1_0_0] flex-col font-['SF_Pro_Text:Regular',sans-serif] justify-center leading-[0] min-h-px min-w-px not-italic relative text-[#434343] text-[14px]">
          <p className="leading-[22px]">Blue / blue-10</p>
        </div>
      </div>
      <TableRowItem43 />
      <div className="flex-[1_0_0] min-h-px min-w-px relative" data-name="Table / Item / Row Item">
        <div aria-hidden="true" className="absolute border-[#f0f0f0] border-b border-solid inset-0 pointer-events-none" />
        <div className="content-stretch flex gap-[8px] items-start pb-[17px] pt-[16px] px-[16px] relative w-full">
          <div className="flex flex-[1_0_0] flex-col font-['SF_Pro_Text:Regular',sans-serif] justify-center leading-[0] min-h-px min-w-px not-italic relative text-[#434343] text-[14px]">
            <p className="leading-[22px]">-</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function Table4() {
  return (
    <div className="bg-[#f0f0f0] content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Table">
      <HeaderRow4 />
      <Row37 />
      <Row38 />
      <Row39 />
      <Row40 />
      <Row41 />
      <Row42 />
      <Row43 />
      <Row44 />
      <Row45 />
      <Row46 />
    </div>
  );
}

function ComponentWrapper4() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col gap-[10px] items-start justify-center min-h-px min-w-px overflow-clip py-[16px] relative" data-name="Component Wrapper">
      <p className="font-['SF_Pro_Text:Semibold',sans-serif] leading-[24px] not-italic relative shrink-0 text-[#434343] text-[16px] w-full">Blue (Interactive)</p>
      <Table4 />
    </div>
  );
}

function Frame15() {
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

function Frame16() {
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

function Frame17() {
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

function HeaderRow5() {
  return (
    <div className="content-stretch flex items-start relative shrink-0 w-full" data-name="Header Row">
      <div className="bg-[#fafafa] content-stretch flex items-center py-[16px] relative shrink-0 w-[216px]" data-name="Table / Item / Header Item/Basic/False/Default/Default">
        <div aria-hidden="true" className="absolute border-[#f0f0f0] border-b border-solid inset-0 pointer-events-none" />
        <Frame15 />
      </div>
      <div className="bg-[#fafafa] content-stretch flex items-center py-[16px] relative shrink-0 w-[88px]" data-name="Table / Item / Header Item/Basic/False/Default/Default">
        <div aria-hidden="true" className="absolute border-[#f0f0f0] border-b border-solid inset-0 pointer-events-none" />
        <Frame16 />
      </div>
      <div className="bg-[#fafafa] content-stretch flex flex-[1_0_0] items-center min-h-px min-w-px py-[16px] relative" data-name="Table / Item / Header Item/Basic/False/Default/Default">
        <div aria-hidden="true" className="absolute border-[#f0f0f0] border-b border-solid inset-0 pointer-events-none" />
        <Frame17 />
      </div>
    </div>
  );
}

function TableRowItem44() {
  return (
    <div className="h-[55px] relative shrink-0 w-[88px]" data-name="Table / Row Item">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 88 55">
        <g id="Table / Row Item">
          <mask fill="white" id="path-1-inside-1_2021_7129">
            <path d="M0 0H88V55H0V0Z" />
          </mask>
          <path d="M88 55V54H0V55V56H88V55Z" fill="var(--stroke-0, #F0F0F0)" mask="url(#path-1-inside-1_2021_7129)" />
          <g id="Color Sample">
            <circle cx="28" cy="28" fill="var(--fill-0, #E6FFFB)" r="12" />
            <circle cx="28" cy="28" r="11.5" stroke="var(--stroke-0, black)" strokeOpacity="0.05" />
          </g>
        </g>
      </svg>
    </div>
  );
}

function Row47() {
  return (
    <div className="bg-white content-stretch flex items-start relative shrink-0 w-full" data-name="Row">
      <div className="content-stretch flex gap-[8px] items-start pb-[17px] pt-[16px] px-[16px] relative shrink-0 w-[216px]" data-name="Table / Item / Row Item">
        <div aria-hidden="true" className="absolute border-[#f0f0f0] border-b border-solid inset-0 pointer-events-none" />
        <div className="flex flex-[1_0_0] flex-col font-['SF_Pro_Text:Regular',sans-serif] justify-center leading-[0] min-h-px min-w-px not-italic relative text-[#434343] text-[14px]">
          <p className="leading-[22px]">Cyan / cyan-1</p>
        </div>
      </div>
      <TableRowItem44 />
      <div className="flex-[1_0_0] min-h-px min-w-px relative" data-name="Table / Item / Row Item">
        <div aria-hidden="true" className="absolute border-[#f0f0f0] border-b border-solid inset-0 pointer-events-none" />
        <div className="content-stretch flex gap-[8px] items-start pb-[17px] pt-[16px] px-[16px] relative w-full">
          <div className="flex flex-[1_0_0] flex-col font-['SF_Pro_Text:Regular',sans-serif] justify-center leading-[0] min-h-px min-w-px not-italic relative text-[#434343] text-[14px]">
            <p className="leading-[22px]">-</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function TableRowItem45() {
  return (
    <div className="h-[55px] relative shrink-0 w-[88px]" data-name="Table / Row Item">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 88 55">
        <g id="Table / Row Item">
          <mask fill="white" id="path-1-inside-1_2021_7080">
            <path d="M0 0H88V55H0V0Z" />
          </mask>
          <path d="M88 55V54H0V55V56H88V55Z" fill="var(--stroke-0, #F0F0F0)" mask="url(#path-1-inside-1_2021_7080)" />
          <g id="Color Sample">
            <circle cx="28" cy="28" fill="var(--fill-0, #B5F5EC)" r="12" />
            <circle cx="28" cy="28" r="11.5" stroke="var(--stroke-0, black)" strokeOpacity="0.05" />
          </g>
        </g>
      </svg>
    </div>
  );
}

function Row48() {
  return (
    <div className="bg-white content-stretch flex items-start relative shrink-0 w-full" data-name="Row">
      <div className="content-stretch flex gap-[8px] items-start pb-[17px] pt-[16px] px-[16px] relative shrink-0 w-[216px]" data-name="Table / Item / Row Item">
        <div aria-hidden="true" className="absolute border-[#f0f0f0] border-b border-solid inset-0 pointer-events-none" />
        <div className="flex flex-[1_0_0] flex-col font-['SF_Pro_Text:Regular',sans-serif] justify-center leading-[0] min-h-px min-w-px not-italic relative text-[#434343] text-[14px]">
          <p className="leading-[22px]">Cyan / cyan-2</p>
        </div>
      </div>
      <TableRowItem45 />
      <div className="flex-[1_0_0] min-h-px min-w-px relative" data-name="Table / Item / Row Item">
        <div aria-hidden="true" className="absolute border-[#f0f0f0] border-b border-solid inset-0 pointer-events-none" />
        <div className="content-stretch flex gap-[8px] items-start pb-[17px] pt-[16px] px-[16px] relative w-full">
          <div className="flex flex-[1_0_0] flex-col font-['SF_Pro_Text:Regular',sans-serif] justify-center leading-[0] min-h-px min-w-px not-italic relative text-[#434343] text-[14px]">
            <p className="leading-[22px]">-</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function TableRowItem46() {
  return (
    <div className="h-[55px] relative shrink-0 w-[88px]" data-name="Table / Row Item">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 88 55">
        <g id="Table / Row Item">
          <mask fill="white" id="path-1-inside-1_2021_7071">
            <path d="M0 0H88V55H0V0Z" />
          </mask>
          <path d="M88 55V54H0V55V56H88V55Z" fill="var(--stroke-0, #F0F0F0)" mask="url(#path-1-inside-1_2021_7071)" />
          <g id="Color Sample">
            <circle cx="28" cy="28" fill="var(--fill-0, #87E8DE)" r="12" />
            <circle cx="28" cy="28" r="11.5" stroke="var(--stroke-0, black)" strokeOpacity="0.05" />
          </g>
        </g>
      </svg>
    </div>
  );
}

function Row49() {
  return (
    <div className="bg-white content-stretch flex items-start relative shrink-0 w-full" data-name="Row">
      <div className="content-stretch flex gap-[8px] items-start pb-[17px] pt-[16px] px-[16px] relative shrink-0 w-[216px]" data-name="Table / Item / Row Item">
        <div aria-hidden="true" className="absolute border-[#f0f0f0] border-b border-solid inset-0 pointer-events-none" />
        <div className="flex flex-[1_0_0] flex-col font-['SF_Pro_Text:Regular',sans-serif] justify-center leading-[0] min-h-px min-w-px not-italic relative text-[#434343] text-[14px]">
          <p className="leading-[22px]">Cyan / cyan-3</p>
        </div>
      </div>
      <TableRowItem46 />
      <div className="flex-[1_0_0] min-h-px min-w-px relative" data-name="Table / Item / Row Item">
        <div aria-hidden="true" className="absolute border-[#f0f0f0] border-b border-solid inset-0 pointer-events-none" />
        <div className="content-stretch flex gap-[8px] items-start pb-[17px] pt-[16px] px-[16px] relative w-full">
          <div className="flex flex-[1_0_0] flex-col font-['SF_Pro_Text:Regular',sans-serif] justify-center leading-[0] min-h-px min-w-px not-italic relative text-[#434343] text-[14px]">
            <p className="leading-[22px]">-</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function TableRowItem47() {
  return (
    <div className="h-[55px] relative shrink-0 w-[88px]" data-name="Table / Row Item">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 88 55">
        <g id="Table / Row Item">
          <mask fill="white" id="path-1-inside-1_2021_7062">
            <path d="M0 0H88V55H0V0Z" />
          </mask>
          <path d="M88 55V54H0V55V56H88V55Z" fill="var(--stroke-0, #F0F0F0)" mask="url(#path-1-inside-1_2021_7062)" />
          <circle cx="28" cy="28" fill="var(--fill-0, #5CDBD3)" id="Color Sample" r="12" />
        </g>
      </svg>
    </div>
  );
}

function Row50() {
  return (
    <div className="bg-white content-stretch flex items-start relative shrink-0 w-full" data-name="Row">
      <div className="content-stretch flex gap-[8px] items-start pb-[17px] pt-[16px] px-[16px] relative shrink-0 w-[216px]" data-name="Table / Item / Row Item">
        <div aria-hidden="true" className="absolute border-[#f0f0f0] border-b border-solid inset-0 pointer-events-none" />
        <div className="flex flex-[1_0_0] flex-col font-['SF_Pro_Text:Regular',sans-serif] justify-center leading-[0] min-h-px min-w-px not-italic relative text-[#434343] text-[14px]">
          <p className="leading-[22px]">Cyan / cyan-4</p>
        </div>
      </div>
      <TableRowItem47 />
      <div className="flex-[1_0_0] min-h-px min-w-px relative" data-name="Table / Item / Row Item">
        <div aria-hidden="true" className="absolute border-[#f0f0f0] border-b border-solid inset-0 pointer-events-none" />
        <div className="content-stretch flex gap-[8px] items-start pb-[17px] pt-[16px] px-[16px] relative w-full">
          <div className="flex flex-[1_0_0] flex-col font-['SF_Pro_Text:Regular',sans-serif] justify-center leading-[0] min-h-px min-w-px not-italic relative text-[#434343] text-[14px]">
            <p className="leading-[22px]">-</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function TableRowItem48() {
  return (
    <div className="h-[55px] relative shrink-0 w-[88px]" data-name="Table / Row Item">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 88 55">
        <g id="Table / Row Item">
          <mask fill="white" id="path-1-inside-1_2021_7053">
            <path d="M0 0H88V55H0V0Z" />
          </mask>
          <path d="M88 55V54H0V55V56H88V55Z" fill="var(--stroke-0, #F0F0F0)" mask="url(#path-1-inside-1_2021_7053)" />
          <circle cx="28" cy="28" fill="var(--fill-0, #36CFC9)" id="Color Sample" r="12" />
        </g>
      </svg>
    </div>
  );
}

function Row51() {
  return (
    <div className="bg-white content-stretch flex items-start relative shrink-0 w-full" data-name="Row">
      <div className="content-stretch flex gap-[8px] items-start pb-[17px] pt-[16px] px-[16px] relative shrink-0 w-[216px]" data-name="Table / Item / Row Item">
        <div aria-hidden="true" className="absolute border-[#f0f0f0] border-b border-solid inset-0 pointer-events-none" />
        <div className="flex flex-[1_0_0] flex-col font-['SF_Pro_Text:Regular',sans-serif] justify-center leading-[0] min-h-px min-w-px not-italic relative text-[#434343] text-[14px]">
          <p className="leading-[22px]">Cyan / cyan-5</p>
        </div>
      </div>
      <TableRowItem48 />
      <div className="flex-[1_0_0] min-h-px min-w-px relative" data-name="Table / Item / Row Item">
        <div aria-hidden="true" className="absolute border-[#f0f0f0] border-b border-solid inset-0 pointer-events-none" />
        <div className="content-stretch flex gap-[8px] items-start pb-[17px] pt-[16px] px-[16px] relative w-full">
          <div className="flex flex-[1_0_0] flex-col font-['SF_Pro_Text:Regular',sans-serif] justify-center leading-[0] min-h-px min-w-px not-italic relative text-[#434343] text-[14px]">
            <p className="leading-[22px]">-</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function TableRowItem49() {
  return (
    <div className="h-[55px] relative shrink-0 w-[88px]" data-name="Table / Row Item">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 88 55">
        <g id="Table / Row Item">
          <mask fill="white" id="path-1-inside-1_2021_7165">
            <path d="M0 0H88V55H0V0Z" />
          </mask>
          <path d="M88 55V54H0V55V56H88V55Z" fill="var(--stroke-0, #F0F0F0)" mask="url(#path-1-inside-1_2021_7165)" />
          <circle cx="28" cy="28" fill="var(--fill-0, #13C2C2)" id="Color Sample" r="12" />
        </g>
      </svg>
    </div>
  );
}

function Row52() {
  return (
    <div className="bg-white content-stretch flex items-start relative shrink-0 w-full" data-name="Row">
      <div className="content-stretch flex gap-[8px] items-start pb-[17px] pt-[16px] px-[16px] relative shrink-0 w-[216px]" data-name="Table / Item / Row Item">
        <div aria-hidden="true" className="absolute border-[#f0f0f0] border-b border-solid inset-0 pointer-events-none" />
        <div className="flex flex-[1_0_0] flex-col font-['SF_Pro_Text:Regular',sans-serif] justify-center leading-[0] min-h-px min-w-px not-italic relative text-[#434343] text-[14px]">
          <p className="leading-[22px]">Cyan / cyan-6</p>
        </div>
      </div>
      <TableRowItem49 />
      <div className="flex-[1_0_0] min-h-px min-w-px relative" data-name="Table / Item / Row Item">
        <div aria-hidden="true" className="absolute border-[#f0f0f0] border-b border-solid inset-0 pointer-events-none" />
        <div className="content-stretch flex gap-[8px] items-start pb-[17px] pt-[16px] px-[16px] relative w-full">
          <div className="flex flex-[1_0_0] flex-col font-['SF_Pro_Text:Regular',sans-serif] justify-center leading-[0] min-h-px min-w-px not-italic relative text-[#434343] text-[14px]">
            <p className="leading-[22px]">Highlight color</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function TableRowItem50() {
  return (
    <div className="h-[55px] relative shrink-0 w-[88px]" data-name="Table / Row Item">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 88 55">
        <g id="Table / Row Item">
          <mask fill="white" id="path-1-inside-1_2021_7201">
            <path d="M0 0H88V55H0V0Z" />
          </mask>
          <path d="M88 55V54H0V55V56H88V55Z" fill="var(--stroke-0, #F0F0F0)" mask="url(#path-1-inside-1_2021_7201)" />
          <circle cx="28" cy="28" fill="var(--fill-0, #08979C)" id="Color Sample" r="12" />
        </g>
      </svg>
    </div>
  );
}

function Row53() {
  return (
    <div className="bg-white content-stretch flex items-start relative shrink-0 w-full" data-name="Row">
      <div className="content-stretch flex gap-[8px] items-start pb-[17px] pt-[16px] px-[16px] relative shrink-0 w-[216px]" data-name="Table / Item / Row Item">
        <div aria-hidden="true" className="absolute border-[#f0f0f0] border-b border-solid inset-0 pointer-events-none" />
        <div className="flex flex-[1_0_0] flex-col font-['SF_Pro_Text:Regular',sans-serif] justify-center leading-[0] min-h-px min-w-px not-italic relative text-[#434343] text-[14px]">
          <p className="leading-[22px]">Cyan / cyan-7</p>
        </div>
      </div>
      <TableRowItem50 />
      <div className="flex-[1_0_0] min-h-px min-w-px relative" data-name="Table / Item / Row Item">
        <div aria-hidden="true" className="absolute border-[#f0f0f0] border-b border-solid inset-0 pointer-events-none" />
        <div className="content-stretch flex gap-[8px] items-start pb-[17px] pt-[16px] px-[16px] relative w-full">
          <div className="flex flex-[1_0_0] flex-col font-['SF_Pro_Text:Regular',sans-serif] justify-center leading-[0] min-h-px min-w-px not-italic relative text-[#434343] text-[14px]">
            <p className="leading-[22px]">-</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function TableRowItem51() {
  return (
    <div className="h-[55px] relative shrink-0 w-[88px]" data-name="Table / Row Item">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 88 55">
        <g id="Table / Row Item">
          <mask fill="white" id="path-1-inside-1_2021_7050">
            <path d="M0 0H88V55H0V0Z" />
          </mask>
          <path d="M88 55V54H0V55V56H88V55Z" fill="var(--stroke-0, #F0F0F0)" mask="url(#path-1-inside-1_2021_7050)" />
          <circle cx="28" cy="28" fill="var(--fill-0, #006D75)" id="Color Sample" r="12" />
        </g>
      </svg>
    </div>
  );
}

function Row54() {
  return (
    <div className="bg-white content-stretch flex items-start relative shrink-0 w-full" data-name="Row">
      <div className="content-stretch flex gap-[8px] items-start pb-[17px] pt-[16px] px-[16px] relative shrink-0 w-[216px]" data-name="Table / Item / Row Item">
        <div aria-hidden="true" className="absolute border-[#f0f0f0] border-b border-solid inset-0 pointer-events-none" />
        <div className="flex flex-[1_0_0] flex-col font-['SF_Pro_Text:Regular',sans-serif] justify-center leading-[0] min-h-px min-w-px not-italic relative text-[#434343] text-[14px]">
          <p className="leading-[22px]">Cyan / cyan-8</p>
        </div>
      </div>
      <TableRowItem51 />
      <div className="flex-[1_0_0] min-h-px min-w-px relative" data-name="Table / Item / Row Item">
        <div aria-hidden="true" className="absolute border-[#f0f0f0] border-b border-solid inset-0 pointer-events-none" />
        <div className="content-stretch flex gap-[8px] items-start pb-[17px] pt-[16px] px-[16px] relative w-full">
          <div className="flex flex-[1_0_0] flex-col font-['SF_Pro_Text:Regular',sans-serif] justify-center leading-[0] min-h-px min-w-px not-italic relative text-[#434343] text-[14px]">
            <p className="leading-[22px]">-</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function TableRowItem52() {
  return (
    <div className="h-[55px] relative shrink-0 w-[88px]" data-name="Table / Row Item">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 88 55">
        <g id="Table / Row Item">
          <mask fill="white" id="path-1-inside-1_2021_7065">
            <path d="M0 0H88V55H0V0Z" />
          </mask>
          <path d="M88 55V54H0V55V56H88V55Z" fill="var(--stroke-0, #F0F0F0)" mask="url(#path-1-inside-1_2021_7065)" />
          <circle cx="28" cy="28" fill="var(--fill-0, #00474F)" id="Color Sample" r="12" />
        </g>
      </svg>
    </div>
  );
}

function Row55() {
  return (
    <div className="bg-white content-stretch flex items-start relative shrink-0 w-full" data-name="Row">
      <div className="content-stretch flex gap-[8px] items-start pb-[17px] pt-[16px] px-[16px] relative shrink-0 w-[216px]" data-name="Table / Item / Row Item">
        <div aria-hidden="true" className="absolute border-[#f0f0f0] border-b border-solid inset-0 pointer-events-none" />
        <div className="flex flex-[1_0_0] flex-col font-['SF_Pro_Text:Regular',sans-serif] justify-center leading-[0] min-h-px min-w-px not-italic relative text-[#434343] text-[14px]">
          <p className="leading-[22px]">Cyan / cyan-9</p>
        </div>
      </div>
      <TableRowItem52 />
      <div className="flex-[1_0_0] min-h-px min-w-px relative" data-name="Table / Item / Row Item">
        <div aria-hidden="true" className="absolute border-[#f0f0f0] border-b border-solid inset-0 pointer-events-none" />
        <div className="content-stretch flex gap-[8px] items-start pb-[17px] pt-[16px] px-[16px] relative w-full">
          <div className="flex flex-[1_0_0] flex-col font-['SF_Pro_Text:Regular',sans-serif] justify-center leading-[0] min-h-px min-w-px not-italic relative text-[#434343] text-[14px]">
            <p className="leading-[22px]">-</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function TableRowItem53() {
  return (
    <div className="h-[55px] relative shrink-0 w-[88px]" data-name="Table / Row Item">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 88 55">
        <g id="Table / Row Item">
          <mask fill="white" id="path-1-inside-1_2021_7047">
            <path d="M0 0H88V55H0V0Z" />
          </mask>
          <path d="M88 55V54H0V55V56H88V55Z" fill="var(--stroke-0, #F0F0F0)" mask="url(#path-1-inside-1_2021_7047)" />
          <circle cx="28" cy="28" fill="var(--fill-0, #002329)" id="Color Sample" r="12" />
        </g>
      </svg>
    </div>
  );
}

function Row56() {
  return (
    <div className="bg-white content-stretch flex items-start relative shrink-0 w-full" data-name="Row">
      <div className="content-stretch flex gap-[8px] items-start pb-[17px] pt-[16px] px-[16px] relative shrink-0 w-[216px]" data-name="Table / Item / Row Item">
        <div aria-hidden="true" className="absolute border-[#f0f0f0] border-b border-solid inset-0 pointer-events-none" />
        <div className="flex flex-[1_0_0] flex-col font-['SF_Pro_Text:Regular',sans-serif] justify-center leading-[0] min-h-px min-w-px not-italic relative text-[#434343] text-[14px]">
          <p className="leading-[22px]">Cyan / cyan-10</p>
        </div>
      </div>
      <TableRowItem53 />
      <div className="flex-[1_0_0] min-h-px min-w-px relative" data-name="Table / Item / Row Item">
        <div aria-hidden="true" className="absolute border-[#f0f0f0] border-b border-solid inset-0 pointer-events-none" />
        <div className="content-stretch flex gap-[8px] items-start pb-[17px] pt-[16px] px-[16px] relative w-full">
          <div className="flex flex-[1_0_0] flex-col font-['SF_Pro_Text:Regular',sans-serif] justify-center leading-[0] min-h-px min-w-px not-italic relative text-[#434343] text-[14px]">
            <p className="leading-[22px]">-</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function Table5() {
  return (
    <div className="bg-[#f0f0f0] content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Table">
      <HeaderRow5 />
      <Row47 />
      <Row48 />
      <Row49 />
      <Row50 />
      <Row51 />
      <Row52 />
      <Row53 />
      <Row54 />
      <Row55 />
      <Row56 />
    </div>
  );
}

function ComponentWrapper5() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col gap-[10px] items-start justify-center min-h-px min-w-px overflow-clip py-[16px] relative" data-name="Component Wrapper">
      <p className="font-['SF_Pro_Text:Semibold',sans-serif] leading-[24px] not-italic relative shrink-0 text-[#434343] text-[16px] w-full">Cyan (Highlight)</p>
      <Table5 />
    </div>
  );
}

function Row36() {
  return (
    <div className="content-stretch flex gap-[24px] items-start relative shrink-0 w-full" data-name="Row">
      <ComponentWrapper4 />
      <ComponentWrapper5 />
    </div>
  );
}

function Grid2() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Grid">
      <Row36 />
    </div>
  );
}

function Frame18() {
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

function Frame19() {
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

function Frame20() {
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

function HeaderRow6() {
  return (
    <div className="content-stretch flex items-start relative shrink-0 w-full" data-name="Header Row">
      <div className="bg-[#fafafa] content-stretch flex items-center py-[16px] relative shrink-0 w-[216px]" data-name="Table / Item / Header Item/Basic/False/Default/Default">
        <div aria-hidden="true" className="absolute border-[#f0f0f0] border-b border-solid inset-0 pointer-events-none" />
        <Frame18 />
      </div>
      <div className="bg-[#fafafa] content-stretch flex items-center py-[16px] relative shrink-0 w-[88px]" data-name="Table / Item / Header Item/Basic/False/Default/Default">
        <div aria-hidden="true" className="absolute border-[#f0f0f0] border-b border-solid inset-0 pointer-events-none" />
        <Frame19 />
      </div>
      <div className="bg-[#fafafa] content-stretch flex flex-[1_0_0] items-center min-h-px min-w-px py-[16px] relative" data-name="Table / Item / Header Item/Basic/False/Default/Default">
        <div aria-hidden="true" className="absolute border-[#f0f0f0] border-b border-solid inset-0 pointer-events-none" />
        <Frame20 />
      </div>
    </div>
  );
}

function TableRowItem54() {
  return (
    <div className="h-[55px] relative shrink-0 w-[88px]" data-name="Table / Row Item">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 88 55">
        <g id="Table / Row Item">
          <mask fill="white" id="path-1-inside-1_2021_7009">
            <path d="M0 0H88V55H0V0Z" />
          </mask>
          <path d="M88 55V54H0V55V56H88V55Z" fill="var(--stroke-0, #F0F0F0)" mask="url(#path-1-inside-1_2021_7009)" />
          <g id="Color Sample">
            <circle cx="28" cy="28" fill="var(--fill-0, #FFF1F0)" r="12" />
            <circle cx="28" cy="28" r="11.5" stroke="var(--stroke-0, black)" strokeOpacity="0.05" />
          </g>
        </g>
      </svg>
    </div>
  );
}

function Row58() {
  return (
    <div className="bg-white content-stretch flex items-start relative shrink-0 w-full" data-name="Row">
      <div className="content-stretch flex gap-[8px] items-start pb-[17px] pt-[16px] px-[16px] relative shrink-0 w-[216px]" data-name="Table / Item / Row Item">
        <div aria-hidden="true" className="absolute border-[#f0f0f0] border-b border-solid inset-0 pointer-events-none" />
        <div className="flex flex-[1_0_0] flex-col font-['SF_Pro_Text:Regular',sans-serif] justify-center leading-[0] min-h-px min-w-px not-italic relative text-[#434343] text-[14px]">
          <p className="leading-[22px]">Red / red-1</p>
        </div>
      </div>
      <TableRowItem54 />
      <div className="flex-[1_0_0] min-h-px min-w-px relative" data-name="Table / Item / Row Item">
        <div aria-hidden="true" className="absolute border-[#f0f0f0] border-b border-solid inset-0 pointer-events-none" />
        <div className="content-stretch flex gap-[8px] items-start pb-[17px] pt-[16px] px-[16px] relative w-full">
          <div className="flex flex-[1_0_0] flex-col font-['SF_Pro_Text:Regular',sans-serif] justify-center leading-[0] min-h-px min-w-px not-italic relative text-[#434343] text-[14px]">
            <p className="leading-[22px]">Error background</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function TableRowItem55() {
  return (
    <div className="h-[55px] relative shrink-0 w-[88px]" data-name="Table / Row Item">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 88 55">
        <g id="Table / Row Item">
          <mask fill="white" id="path-1-inside-1_2021_7044">
            <path d="M0 0H88V55H0V0Z" />
          </mask>
          <path d="M88 55V54H0V55V56H88V55Z" fill="var(--stroke-0, #F0F0F0)" mask="url(#path-1-inside-1_2021_7044)" />
          <g id="Color Sample">
            <circle cx="28" cy="28" fill="var(--fill-0, #FFCCC7)" r="12" />
            <circle cx="28" cy="28" r="11.5" stroke="var(--stroke-0, black)" strokeOpacity="0.05" />
          </g>
        </g>
      </svg>
    </div>
  );
}

function Row59() {
  return (
    <div className="bg-white content-stretch flex items-start relative shrink-0 w-full" data-name="Row">
      <div className="content-stretch flex gap-[8px] items-start pb-[17px] pt-[16px] px-[16px] relative shrink-0 w-[216px]" data-name="Table / Item / Row Item">
        <div aria-hidden="true" className="absolute border-[#f0f0f0] border-b border-solid inset-0 pointer-events-none" />
        <div className="flex flex-[1_0_0] flex-col font-['SF_Pro_Text:Regular',sans-serif] justify-center leading-[0] min-h-px min-w-px not-italic relative text-[#434343] text-[14px]">
          <p className="leading-[22px]">Red / red-2</p>
        </div>
      </div>
      <TableRowItem55 />
      <div className="flex-[1_0_0] min-h-px min-w-px relative" data-name="Table / Item / Row Item">
        <div aria-hidden="true" className="absolute border-[#f0f0f0] border-b border-solid inset-0 pointer-events-none" />
        <div className="content-stretch flex gap-[8px] items-start pb-[17px] pt-[16px] px-[16px] relative w-full">
          <div className="flex flex-[1_0_0] flex-col font-['SF_Pro_Text:Regular',sans-serif] justify-center leading-[0] min-h-px min-w-px not-italic relative text-[#434343] text-[14px]">
            <p className="leading-[22px]">-</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function TableRowItem56() {
  return (
    <div className="h-[55px] relative shrink-0 w-[88px]" data-name="Table / Row Item">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 88 55">
        <g id="Table / Row Item">
          <mask fill="white" id="path-1-inside-1_2021_7230">
            <path d="M0 0H88V55H0V0Z" />
          </mask>
          <path d="M88 55V54H0V55V56H88V55Z" fill="var(--stroke-0, #F0F0F0)" mask="url(#path-1-inside-1_2021_7230)" />
          <g id="Color Sample">
            <circle cx="28" cy="28" fill="var(--fill-0, #FFA39E)" r="12" />
            <circle cx="28" cy="28" r="11.5" stroke="var(--stroke-0, black)" strokeOpacity="0.05" />
          </g>
        </g>
      </svg>
    </div>
  );
}

function Row60() {
  return (
    <div className="bg-white content-stretch flex items-start relative shrink-0 w-full" data-name="Row">
      <div className="content-stretch flex gap-[8px] items-start pb-[17px] pt-[16px] px-[16px] relative shrink-0 w-[216px]" data-name="Table / Item / Row Item">
        <div aria-hidden="true" className="absolute border-[#f0f0f0] border-b border-solid inset-0 pointer-events-none" />
        <div className="flex flex-[1_0_0] flex-col font-['SF_Pro_Text:Regular',sans-serif] justify-center leading-[0] min-h-px min-w-px not-italic relative text-[#434343] text-[14px]">
          <p className="leading-[22px]">Red / red-3</p>
        </div>
      </div>
      <TableRowItem56 />
      <div className="flex-[1_0_0] min-h-px min-w-px relative" data-name="Table / Item / Row Item">
        <div aria-hidden="true" className="absolute border-[#f0f0f0] border-b border-solid inset-0 pointer-events-none" />
        <div className="content-stretch flex gap-[8px] items-start pb-[17px] pt-[16px] px-[16px] relative w-full">
          <div className="flex flex-[1_0_0] flex-col font-['SF_Pro_Text:Regular',sans-serif] justify-center leading-[0] min-h-px min-w-px not-italic relative text-[#434343] text-[14px]">
            <p className="leading-[22px]">Error border</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function TableRowItem57() {
  return (
    <div className="h-[55px] relative shrink-0 w-[88px]" data-name="Table / Row Item">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 88 55">
        <g id="Table / Row Item">
          <mask fill="white" id="path-1-inside-1_2021_7056">
            <path d="M0 0H88V55H0V0Z" />
          </mask>
          <path d="M88 55V54H0V55V56H88V55Z" fill="var(--stroke-0, #F0F0F0)" mask="url(#path-1-inside-1_2021_7056)" />
          <circle cx="28" cy="28" fill="var(--fill-0, #FF7875)" id="Color Sample" r="12" />
        </g>
      </svg>
    </div>
  );
}

function Row61() {
  return (
    <div className="bg-white content-stretch flex items-start relative shrink-0 w-full" data-name="Row">
      <div className="content-stretch flex gap-[8px] items-start pb-[17px] pt-[16px] px-[16px] relative shrink-0 w-[216px]" data-name="Table / Item / Row Item">
        <div aria-hidden="true" className="absolute border-[#f0f0f0] border-b border-solid inset-0 pointer-events-none" />
        <div className="flex flex-[1_0_0] flex-col font-['SF_Pro_Text:Regular',sans-serif] justify-center leading-[0] min-h-px min-w-px not-italic relative text-[#434343] text-[14px]">
          <p className="leading-[22px]">Red / red-4</p>
        </div>
      </div>
      <TableRowItem57 />
      <div className="flex-[1_0_0] min-h-px min-w-px relative" data-name="Table / Item / Row Item">
        <div aria-hidden="true" className="absolute border-[#f0f0f0] border-b border-solid inset-0 pointer-events-none" />
        <div className="content-stretch flex gap-[8px] items-start pb-[17px] pt-[16px] px-[16px] relative w-full">
          <div className="flex flex-[1_0_0] flex-col font-['SF_Pro_Text:Regular',sans-serif] justify-center leading-[0] min-h-px min-w-px not-italic relative text-[#434343] text-[14px]">
            <p className="leading-[22px]">Error hover</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function TableRowItem58() {
  return (
    <div className="h-[55px] relative shrink-0 w-[88px]" data-name="Table / Row Item">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 88 55">
        <g id="Table / Row Item">
          <mask fill="white" id="path-1-inside-1_2021_7143">
            <path d="M0 0H88V55H0V0Z" />
          </mask>
          <path d="M88 55V54H0V55V56H88V55Z" fill="var(--stroke-0, #F0F0F0)" mask="url(#path-1-inside-1_2021_7143)" />
          <circle cx="28" cy="28" fill="var(--fill-0, #FF4D4F)" id="Color Sample" r="12" />
        </g>
      </svg>
    </div>
  );
}

function Row62() {
  return (
    <div className="bg-white content-stretch flex items-start relative shrink-0 w-full" data-name="Row">
      <div className="content-stretch flex gap-[8px] items-start pb-[17px] pt-[16px] px-[16px] relative shrink-0 w-[216px]" data-name="Table / Item / Row Item">
        <div aria-hidden="true" className="absolute border-[#f0f0f0] border-b border-solid inset-0 pointer-events-none" />
        <div className="flex flex-[1_0_0] flex-col font-['SF_Pro_Text:Regular',sans-serif] justify-center leading-[0] min-h-px min-w-px not-italic relative text-[#434343] text-[14px]">
          <p className="leading-[22px]">Red / red-5</p>
        </div>
      </div>
      <TableRowItem58 />
      <div className="flex-[1_0_0] min-h-px min-w-px relative" data-name="Table / Item / Row Item">
        <div aria-hidden="true" className="absolute border-[#f0f0f0] border-b border-solid inset-0 pointer-events-none" />
        <div className="content-stretch flex gap-[8px] items-start pb-[17px] pt-[16px] px-[16px] relative w-full">
          <div className="flex flex-[1_0_0] flex-col font-['SF_Pro_Text:Regular',sans-serif] justify-center leading-[0] min-h-px min-w-px not-italic relative text-[#434343] text-[14px]">
            <p className="leading-[22px]">-</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function TableRowItem59() {
  return (
    <div className="h-[55px] relative shrink-0 w-[88px]" data-name="Table / Row Item">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 88 55">
        <g id="Table / Row Item">
          <mask fill="white" id="path-1-inside-1_2021_7098">
            <path d="M0 0H88V55H0V0Z" />
          </mask>
          <path d="M88 55V54H0V55V56H88V55Z" fill="var(--stroke-0, #F0F0F0)" mask="url(#path-1-inside-1_2021_7098)" />
          <circle cx="28" cy="28" fill="var(--fill-0, #F5222D)" id="Color Sample" r="12" />
        </g>
      </svg>
    </div>
  );
}

function Row63() {
  return (
    <div className="bg-white content-stretch flex items-start relative shrink-0 w-full" data-name="Row">
      <div className="content-stretch flex gap-[8px] items-start pb-[17px] pt-[16px] px-[16px] relative shrink-0 w-[216px]" data-name="Table / Item / Row Item">
        <div aria-hidden="true" className="absolute border-[#f0f0f0] border-b border-solid inset-0 pointer-events-none" />
        <div className="flex flex-[1_0_0] flex-col font-['SF_Pro_Text:Regular',sans-serif] justify-center leading-[0] min-h-px min-w-px not-italic relative text-[#434343] text-[14px]">
          <p className="leading-[22px]">Red / red-6</p>
        </div>
      </div>
      <TableRowItem59 />
      <div className="flex-[1_0_0] min-h-px min-w-px relative" data-name="Table / Item / Row Item">
        <div aria-hidden="true" className="absolute border-[#f0f0f0] border-b border-solid inset-0 pointer-events-none" />
        <div className="content-stretch flex gap-[8px] items-start pb-[17px] pt-[16px] px-[16px] relative w-full">
          <div className="flex flex-[1_0_0] flex-col font-['SF_Pro_Text:Regular',sans-serif] justify-center leading-[0] min-h-px min-w-px not-italic relative text-[#434343] text-[14px]">
            <p className="leading-[22px]">Error normal</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function TableRowItem60() {
  return (
    <div className="h-[55px] relative shrink-0 w-[88px]" data-name="Table / Row Item">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 88 55">
        <g id="Table / Row Item">
          <mask fill="white" id="path-1-inside-1_2021_7038">
            <path d="M0 0H88V55H0V0Z" />
          </mask>
          <path d="M88 55V54H0V55V56H88V55Z" fill="var(--stroke-0, #F0F0F0)" mask="url(#path-1-inside-1_2021_7038)" />
          <circle cx="28" cy="28" fill="var(--fill-0, #CF1322)" id="Color Sample" r="12" />
        </g>
      </svg>
    </div>
  );
}

function Row64() {
  return (
    <div className="bg-white content-stretch flex items-start relative shrink-0 w-full" data-name="Row">
      <div className="content-stretch flex gap-[8px] items-start pb-[17px] pt-[16px] px-[16px] relative shrink-0 w-[216px]" data-name="Table / Item / Row Item">
        <div aria-hidden="true" className="absolute border-[#f0f0f0] border-b border-solid inset-0 pointer-events-none" />
        <div className="flex flex-[1_0_0] flex-col font-['SF_Pro_Text:Regular',sans-serif] justify-center leading-[0] min-h-px min-w-px not-italic relative text-[#434343] text-[14px]">
          <p className="leading-[22px]">Red / red-7</p>
        </div>
      </div>
      <TableRowItem60 />
      <div className="flex-[1_0_0] min-h-px min-w-px relative" data-name="Table / Item / Row Item">
        <div aria-hidden="true" className="absolute border-[#f0f0f0] border-b border-solid inset-0 pointer-events-none" />
        <div className="content-stretch flex gap-[8px] items-start pb-[17px] pt-[16px] px-[16px] relative w-full">
          <div className="flex flex-[1_0_0] flex-col font-['SF_Pro_Text:Regular',sans-serif] justify-center leading-[0] min-h-px min-w-px not-italic relative text-[#434343] text-[14px]">
            <p className="leading-[22px]">Error click</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function TableRowItem61() {
  return (
    <div className="h-[55px] relative shrink-0 w-[88px]" data-name="Table / Row Item">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 88 55">
        <g id="Table / Row Item">
          <mask fill="white" id="path-1-inside-1_2021_7068">
            <path d="M0 0H88V55H0V0Z" />
          </mask>
          <path d="M88 55V54H0V55V56H88V55Z" fill="var(--stroke-0, #F0F0F0)" mask="url(#path-1-inside-1_2021_7068)" />
          <circle cx="28" cy="28" fill="var(--fill-0, #A8071A)" id="Color Sample" r="12" />
        </g>
      </svg>
    </div>
  );
}

function Row65() {
  return (
    <div className="bg-white content-stretch flex items-start relative shrink-0 w-full" data-name="Row">
      <div className="content-stretch flex gap-[8px] items-start pb-[17px] pt-[16px] px-[16px] relative shrink-0 w-[216px]" data-name="Table / Item / Row Item">
        <div aria-hidden="true" className="absolute border-[#f0f0f0] border-b border-solid inset-0 pointer-events-none" />
        <div className="flex flex-[1_0_0] flex-col font-['SF_Pro_Text:Regular',sans-serif] justify-center leading-[0] min-h-px min-w-px not-italic relative text-[#434343] text-[14px]">
          <p className="leading-[22px]">Red / red-8</p>
        </div>
      </div>
      <TableRowItem61 />
      <div className="flex-[1_0_0] min-h-px min-w-px relative" data-name="Table / Item / Row Item">
        <div aria-hidden="true" className="absolute border-[#f0f0f0] border-b border-solid inset-0 pointer-events-none" />
        <div className="content-stretch flex gap-[8px] items-start pb-[17px] pt-[16px] px-[16px] relative w-full">
          <div className="flex flex-[1_0_0] flex-col font-['SF_Pro_Text:Regular',sans-serif] justify-center leading-[0] min-h-px min-w-px not-italic relative text-[#434343] text-[14px]">
            <p className="leading-[22px]">-</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function TableRowItem62() {
  return (
    <div className="h-[55px] relative shrink-0 w-[88px]" data-name="Table / Row Item">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 88 55">
        <g id="Table / Row Item">
          <mask fill="white" id="path-1-inside-1_2021_7035">
            <path d="M0 0H88V55H0V0Z" />
          </mask>
          <path d="M88 55V54H0V55V56H88V55Z" fill="var(--stroke-0, #F0F0F0)" mask="url(#path-1-inside-1_2021_7035)" />
          <circle cx="28" cy="28" fill="var(--fill-0, #820014)" id="Color Sample" r="12" />
        </g>
      </svg>
    </div>
  );
}

function Row66() {
  return (
    <div className="bg-white content-stretch flex items-start relative shrink-0 w-full" data-name="Row">
      <div className="content-stretch flex gap-[8px] items-start pb-[17px] pt-[16px] px-[16px] relative shrink-0 w-[216px]" data-name="Table / Item / Row Item">
        <div aria-hidden="true" className="absolute border-[#f0f0f0] border-b border-solid inset-0 pointer-events-none" />
        <div className="flex flex-[1_0_0] flex-col font-['SF_Pro_Text:Regular',sans-serif] justify-center leading-[0] min-h-px min-w-px not-italic relative text-[#434343] text-[14px]">
          <p className="leading-[22px]">Red / red-9</p>
        </div>
      </div>
      <TableRowItem62 />
      <div className="flex-[1_0_0] min-h-px min-w-px relative" data-name="Table / Item / Row Item">
        <div aria-hidden="true" className="absolute border-[#f0f0f0] border-b border-solid inset-0 pointer-events-none" />
        <div className="content-stretch flex gap-[8px] items-start pb-[17px] pt-[16px] px-[16px] relative w-full">
          <div className="flex flex-[1_0_0] flex-col font-['SF_Pro_Text:Regular',sans-serif] justify-center leading-[0] min-h-px min-w-px not-italic relative text-[#434343] text-[14px]">
            <p className="leading-[22px]">-</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function TableRowItem63() {
  return (
    <div className="h-[55px] relative shrink-0 w-[88px]" data-name="Table / Row Item">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 88 55">
        <g id="Table / Row Item">
          <mask fill="white" id="path-1-inside-1_2021_7032">
            <path d="M0 0H88V55H0V0Z" />
          </mask>
          <path d="M88 55V54H0V55V56H88V55Z" fill="var(--stroke-0, #F0F0F0)" mask="url(#path-1-inside-1_2021_7032)" />
          <circle cx="28" cy="28" fill="var(--fill-0, #5C0011)" id="Color Sample" r="12" />
        </g>
      </svg>
    </div>
  );
}

function Row67() {
  return (
    <div className="bg-white content-stretch flex items-start relative shrink-0 w-full" data-name="Row">
      <div className="content-stretch flex gap-[8px] items-start pb-[17px] pt-[16px] px-[16px] relative shrink-0 w-[216px]" data-name="Table / Item / Row Item">
        <div aria-hidden="true" className="absolute border-[#f0f0f0] border-b border-solid inset-0 pointer-events-none" />
        <div className="flex flex-[1_0_0] flex-col font-['SF_Pro_Text:Regular',sans-serif] justify-center leading-[0] min-h-px min-w-px not-italic relative text-[#434343] text-[14px]">
          <p className="leading-[22px]">Red / red-10</p>
        </div>
      </div>
      <TableRowItem63 />
      <div className="flex-[1_0_0] min-h-px min-w-px relative" data-name="Table / Item / Row Item">
        <div aria-hidden="true" className="absolute border-[#f0f0f0] border-b border-solid inset-0 pointer-events-none" />
        <div className="content-stretch flex gap-[8px] items-start pb-[17px] pt-[16px] px-[16px] relative w-full">
          <div className="flex flex-[1_0_0] flex-col font-['SF_Pro_Text:Regular',sans-serif] justify-center leading-[0] min-h-px min-w-px not-italic relative text-[#434343] text-[14px]">
            <p className="leading-[22px]">-</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function Table6() {
  return (
    <div className="bg-[#f0f0f0] content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Table">
      <HeaderRow6 />
      <Row58 />
      <Row59 />
      <Row60 />
      <Row61 />
      <Row62 />
      <Row63 />
      <Row64 />
      <Row65 />
      <Row66 />
      <Row67 />
    </div>
  );
}

function ComponentWrapper6() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col gap-[10px] items-start justify-center min-h-px min-w-px overflow-clip py-[16px] relative" data-name="Component Wrapper">
      <p className="font-['SF_Pro_Text:Semibold',sans-serif] leading-[24px] not-italic relative shrink-0 text-[#434343] text-[16px] w-full">Red (Critical)</p>
      <Table6 />
    </div>
  );
}

function Frame21() {
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

function Frame22() {
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

function Frame23() {
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

function HeaderRow7() {
  return (
    <div className="content-stretch flex items-start relative shrink-0 w-full" data-name="Header Row">
      <div className="bg-[#fafafa] content-stretch flex items-center py-[16px] relative shrink-0 w-[216px]" data-name="Table / Item / Header Item/Basic/False/Default/Default">
        <div aria-hidden="true" className="absolute border-[#f0f0f0] border-b border-solid inset-0 pointer-events-none" />
        <Frame21 />
      </div>
      <div className="bg-[#fafafa] content-stretch flex items-center py-[16px] relative shrink-0 w-[88px]" data-name="Table / Item / Header Item/Basic/False/Default/Default">
        <div aria-hidden="true" className="absolute border-[#f0f0f0] border-b border-solid inset-0 pointer-events-none" />
        <Frame22 />
      </div>
      <div className="bg-[#fafafa] content-stretch flex flex-[1_0_0] items-center min-h-px min-w-px py-[16px] relative" data-name="Table / Item / Header Item/Basic/False/Default/Default">
        <div aria-hidden="true" className="absolute border-[#f0f0f0] border-b border-solid inset-0 pointer-events-none" />
        <Frame23 />
      </div>
    </div>
  );
}

function TableRowItem64() {
  return (
    <div className="h-[55px] relative shrink-0 w-[88px]" data-name="Table / Row Item">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 88 55">
        <g id="Table / Row Item">
          <mask fill="white" id="path-1-inside-1_2021_7029">
            <path d="M0 0H88V55H0V0Z" />
          </mask>
          <path d="M88 55V54H0V55V56H88V55Z" fill="var(--stroke-0, #F0F0F0)" mask="url(#path-1-inside-1_2021_7029)" />
          <g id="Color Sample">
            <circle cx="28" cy="28" fill="var(--fill-0, #FFFBE6)" r="12" />
            <circle cx="28" cy="28" r="11.5" stroke="var(--stroke-0, black)" strokeOpacity="0.05" />
          </g>
        </g>
      </svg>
    </div>
  );
}

function Row68() {
  return (
    <div className="bg-white content-stretch flex items-start relative shrink-0 w-full" data-name="Row">
      <div className="content-stretch flex gap-[8px] items-start pb-[17px] pt-[16px] px-[16px] relative shrink-0 w-[216px]" data-name="Table / Item / Row Item">
        <div aria-hidden="true" className="absolute border-[#f0f0f0] border-b border-solid inset-0 pointer-events-none" />
        <div className="flex flex-[1_0_0] flex-col font-['SF_Pro_Text:Regular',sans-serif] justify-center leading-[0] min-h-px min-w-px not-italic relative text-[#434343] text-[14px]">
          <p className="leading-[22px]">Gold / gold-1</p>
        </div>
      </div>
      <TableRowItem64 />
      <div className="flex-[1_0_0] min-h-px min-w-px relative" data-name="Table / Item / Row Item">
        <div aria-hidden="true" className="absolute border-[#f0f0f0] border-b border-solid inset-0 pointer-events-none" />
        <div className="content-stretch flex gap-[8px] items-start pb-[17px] pt-[16px] px-[16px] relative w-full">
          <div className="flex flex-[1_0_0] flex-col font-['SF_Pro_Text:Regular',sans-serif] justify-center leading-[0] min-h-px min-w-px not-italic relative text-[#434343] text-[14px]">
            <p className="leading-[22px]">Warning background</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function TableRowItem65() {
  return (
    <div className="h-[55px] relative shrink-0 w-[88px]" data-name="Table / Row Item">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 88 55">
        <g id="Table / Row Item">
          <mask fill="white" id="path-1-inside-1_2021_7177">
            <path d="M0 0H88V55H0V0Z" />
          </mask>
          <path d="M88 55V54H0V55V56H88V55Z" fill="var(--stroke-0, #F0F0F0)" mask="url(#path-1-inside-1_2021_7177)" />
          <g id="Color Sample">
            <circle cx="28" cy="28" fill="var(--fill-0, #FFF1B8)" r="12" />
            <circle cx="28" cy="28" r="11.5" stroke="var(--stroke-0, black)" strokeOpacity="0.05" />
          </g>
        </g>
      </svg>
    </div>
  );
}

function Row69() {
  return (
    <div className="bg-white content-stretch flex items-start relative shrink-0 w-full" data-name="Row">
      <div className="content-stretch flex gap-[8px] items-start pb-[17px] pt-[16px] px-[16px] relative shrink-0 w-[216px]" data-name="Table / Item / Row Item">
        <div aria-hidden="true" className="absolute border-[#f0f0f0] border-b border-solid inset-0 pointer-events-none" />
        <div className="flex flex-[1_0_0] flex-col font-['SF_Pro_Text:Regular',sans-serif] justify-center leading-[0] min-h-px min-w-px not-italic relative text-[#434343] text-[14px]">
          <p className="leading-[22px]">Gold / gold-2</p>
        </div>
      </div>
      <TableRowItem65 />
      <div className="flex-[1_0_0] min-h-px min-w-px relative" data-name="Table / Item / Row Item">
        <div aria-hidden="true" className="absolute border-[#f0f0f0] border-b border-solid inset-0 pointer-events-none" />
        <div className="content-stretch flex gap-[8px] items-start pb-[17px] pt-[16px] px-[16px] relative w-full">
          <div className="flex flex-[1_0_0] flex-col font-['SF_Pro_Text:Regular',sans-serif] justify-center leading-[0] min-h-px min-w-px not-italic relative text-[#434343] text-[14px]">
            <p className="leading-[22px]">-</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function TableRowItem66() {
  return (
    <div className="h-[55px] relative shrink-0 w-[88px]" data-name="Table / Row Item">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 88 55">
        <g id="Table / Row Item">
          <mask fill="white" id="path-1-inside-1_2021_7198">
            <path d="M0 0H88V55H0V0Z" />
          </mask>
          <path d="M88 55V54H0V55V56H88V55Z" fill="var(--stroke-0, #F0F0F0)" mask="url(#path-1-inside-1_2021_7198)" />
          <g id="Color Sample">
            <circle cx="28" cy="28" fill="var(--fill-0, #FFE58F)" r="12" />
            <circle cx="28" cy="28" r="11.5" stroke="var(--stroke-0, black)" strokeOpacity="0.05" />
          </g>
        </g>
      </svg>
    </div>
  );
}

function Row70() {
  return (
    <div className="bg-white content-stretch flex items-start relative shrink-0 w-full" data-name="Row">
      <div className="content-stretch flex gap-[8px] items-start pb-[17px] pt-[16px] px-[16px] relative shrink-0 w-[216px]" data-name="Table / Item / Row Item">
        <div aria-hidden="true" className="absolute border-[#f0f0f0] border-b border-solid inset-0 pointer-events-none" />
        <div className="flex flex-[1_0_0] flex-col font-['SF_Pro_Text:Regular',sans-serif] justify-center leading-[0] min-h-px min-w-px not-italic relative text-[#434343] text-[14px]">
          <p className="leading-[22px]">Gold / gold-3</p>
        </div>
      </div>
      <TableRowItem66 />
      <div className="flex-[1_0_0] min-h-px min-w-px relative" data-name="Table / Item / Row Item">
        <div aria-hidden="true" className="absolute border-[#f0f0f0] border-b border-solid inset-0 pointer-events-none" />
        <div className="content-stretch flex gap-[8px] items-start pb-[17px] pt-[16px] px-[16px] relative w-full">
          <div className="flex flex-[1_0_0] flex-col font-['SF_Pro_Text:Regular',sans-serif] justify-center leading-[0] min-h-px min-w-px not-italic relative text-[#434343] text-[14px]">
            <p className="leading-[22px]">Warning border</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function TableRowItem67() {
  return (
    <div className="h-[55px] relative shrink-0 w-[88px]" data-name="Table / Row Item">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 88 55">
        <g id="Table / Row Item">
          <mask fill="white" id="path-1-inside-1_2021_7026">
            <path d="M0 0H88V55H0V0Z" />
          </mask>
          <path d="M88 55V54H0V55V56H88V55Z" fill="var(--stroke-0, #F0F0F0)" mask="url(#path-1-inside-1_2021_7026)" />
          <circle cx="28" cy="28" fill="var(--fill-0, #FFD666)" id="Color Sample" r="12" />
        </g>
      </svg>
    </div>
  );
}

function Row71() {
  return (
    <div className="bg-white content-stretch flex items-start relative shrink-0 w-full" data-name="Row">
      <div className="content-stretch flex gap-[8px] items-start pb-[17px] pt-[16px] px-[16px] relative shrink-0 w-[216px]" data-name="Table / Item / Row Item">
        <div aria-hidden="true" className="absolute border-[#f0f0f0] border-b border-solid inset-0 pointer-events-none" />
        <div className="flex flex-[1_0_0] flex-col font-['SF_Pro_Text:Regular',sans-serif] justify-center leading-[0] min-h-px min-w-px not-italic relative text-[#434343] text-[14px]">
          <p className="leading-[22px]">Gold / gold-4</p>
        </div>
      </div>
      <TableRowItem67 />
      <div className="flex-[1_0_0] min-h-px min-w-px relative" data-name="Table / Item / Row Item">
        <div aria-hidden="true" className="absolute border-[#f0f0f0] border-b border-solid inset-0 pointer-events-none" />
        <div className="content-stretch flex gap-[8px] items-start pb-[17px] pt-[16px] px-[16px] relative w-full">
          <div className="flex flex-[1_0_0] flex-col font-['SF_Pro_Text:Regular',sans-serif] justify-center leading-[0] min-h-px min-w-px not-italic relative text-[#434343] text-[14px]">
            <p className="leading-[22px]">-</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function TableRowItem68() {
  return (
    <div className="h-[55px] relative shrink-0 w-[88px]" data-name="Table / Row Item">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 88 55">
        <g id="Table / Row Item">
          <mask fill="white" id="path-1-inside-1_2021_7020">
            <path d="M0 0H88V55H0V0Z" />
          </mask>
          <path d="M88 55V54H0V55V56H88V55Z" fill="var(--stroke-0, #F0F0F0)" mask="url(#path-1-inside-1_2021_7020)" />
          <circle cx="28" cy="28" fill="var(--fill-0, #FFC53D)" id="Color Sample" r="12" />
        </g>
      </svg>
    </div>
  );
}

function Row72() {
  return (
    <div className="bg-white content-stretch flex items-start relative shrink-0 w-full" data-name="Row">
      <div className="content-stretch flex gap-[8px] items-start pb-[17px] pt-[16px] px-[16px] relative shrink-0 w-[216px]" data-name="Table / Item / Row Item">
        <div aria-hidden="true" className="absolute border-[#f0f0f0] border-b border-solid inset-0 pointer-events-none" />
        <div className="flex flex-[1_0_0] flex-col font-['SF_Pro_Text:Regular',sans-serif] justify-center leading-[0] min-h-px min-w-px not-italic relative text-[#434343] text-[14px]">
          <p className="leading-[22px]">Gold / gold-5</p>
        </div>
      </div>
      <TableRowItem68 />
      <div className="flex-[1_0_0] min-h-px min-w-px relative" data-name="Table / Item / Row Item">
        <div aria-hidden="true" className="absolute border-[#f0f0f0] border-b border-solid inset-0 pointer-events-none" />
        <div className="content-stretch flex gap-[8px] items-start pb-[17px] pt-[16px] px-[16px] relative w-full">
          <div className="flex flex-[1_0_0] flex-col font-['SF_Pro_Text:Regular',sans-serif] justify-center leading-[0] min-h-px min-w-px not-italic relative text-[#434343] text-[14px]">
            <p className="leading-[22px]">Warning hover</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function TableRowItem69() {
  return (
    <div className="h-[55px] relative shrink-0 w-[88px]" data-name="Table / Row Item">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 88 55">
        <g id="Table / Row Item">
          <mask fill="white" id="path-1-inside-1_2021_7174">
            <path d="M0 0H88V55H0V0Z" />
          </mask>
          <path d="M88 55V54H0V55V56H88V55Z" fill="var(--stroke-0, #F0F0F0)" mask="url(#path-1-inside-1_2021_7174)" />
          <circle cx="28" cy="28" fill="var(--fill-0, #FAAD14)" id="Color Sample" r="12" />
        </g>
      </svg>
    </div>
  );
}

function Row73() {
  return (
    <div className="bg-white content-stretch flex items-start relative shrink-0 w-full" data-name="Row">
      <div className="content-stretch flex gap-[8px] items-start pb-[17px] pt-[16px] px-[16px] relative shrink-0 w-[216px]" data-name="Table / Item / Row Item">
        <div aria-hidden="true" className="absolute border-[#f0f0f0] border-b border-solid inset-0 pointer-events-none" />
        <div className="flex flex-[1_0_0] flex-col font-['SF_Pro_Text:Regular',sans-serif] justify-center leading-[0] min-h-px min-w-px not-italic relative text-[#434343] text-[14px]">
          <p className="leading-[22px]">Gold / gold-6</p>
        </div>
      </div>
      <TableRowItem69 />
      <div className="flex-[1_0_0] min-h-px min-w-px relative" data-name="Table / Item / Row Item">
        <div aria-hidden="true" className="absolute border-[#f0f0f0] border-b border-solid inset-0 pointer-events-none" />
        <div className="content-stretch flex gap-[8px] items-start pb-[17px] pt-[16px] px-[16px] relative w-full">
          <div className="flex flex-[1_0_0] flex-col font-['SF_Pro_Text:Regular',sans-serif] justify-center leading-[0] min-h-px min-w-px not-italic relative text-[#434343] text-[14px]">
            <p className="leading-[22px]">Warning normal</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function TableRowItem70() {
  return (
    <div className="h-[55px] relative shrink-0 w-[88px]" data-name="Table / Row Item">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 88 55">
        <g id="Table / Row Item">
          <mask fill="white" id="path-1-inside-1_2021_7159">
            <path d="M0 0H88V55H0V0Z" />
          </mask>
          <path d="M88 55V54H0V55V56H88V55Z" fill="var(--stroke-0, #F0F0F0)" mask="url(#path-1-inside-1_2021_7159)" />
          <circle cx="28" cy="28" fill="var(--fill-0, #D48806)" id="Color Sample" r="12" />
        </g>
      </svg>
    </div>
  );
}

function Row74() {
  return (
    <div className="bg-white content-stretch flex items-start relative shrink-0 w-full" data-name="Row">
      <div className="content-stretch flex gap-[8px] items-start pb-[17px] pt-[16px] px-[16px] relative shrink-0 w-[216px]" data-name="Table / Item / Row Item">
        <div aria-hidden="true" className="absolute border-[#f0f0f0] border-b border-solid inset-0 pointer-events-none" />
        <div className="flex flex-[1_0_0] flex-col font-['SF_Pro_Text:Regular',sans-serif] justify-center leading-[0] min-h-px min-w-px not-italic relative text-[#434343] text-[14px]">
          <p className="leading-[22px]">Gold / gold-7</p>
        </div>
      </div>
      <TableRowItem70 />
      <div className="flex-[1_0_0] min-h-px min-w-px relative" data-name="Table / Item / Row Item">
        <div aria-hidden="true" className="absolute border-[#f0f0f0] border-b border-solid inset-0 pointer-events-none" />
        <div className="content-stretch flex gap-[8px] items-start pb-[17px] pt-[16px] px-[16px] relative w-full">
          <div className="flex flex-[1_0_0] flex-col font-['SF_Pro_Text:Regular',sans-serif] justify-center leading-[0] min-h-px min-w-px not-italic relative text-[#434343] text-[14px]">
            <p className="leading-[22px]">Warning click</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function TableRowItem71() {
  return (
    <div className="h-[55px] relative shrink-0 w-[88px]" data-name="Table / Row Item">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 88 55">
        <g id="Table / Row Item">
          <mask fill="white" id="path-1-inside-1_2021_7083">
            <path d="M0 0H88V55H0V0Z" />
          </mask>
          <path d="M88 55V54H0V55V56H88V55Z" fill="var(--stroke-0, #F0F0F0)" mask="url(#path-1-inside-1_2021_7083)" />
          <circle cx="28" cy="28" fill="var(--fill-0, #AD6800)" id="Color Sample" r="12" />
        </g>
      </svg>
    </div>
  );
}

function Row75() {
  return (
    <div className="bg-white content-stretch flex items-start relative shrink-0 w-full" data-name="Row">
      <div className="content-stretch flex gap-[8px] items-start pb-[17px] pt-[16px] px-[16px] relative shrink-0 w-[216px]" data-name="Table / Item / Row Item">
        <div aria-hidden="true" className="absolute border-[#f0f0f0] border-b border-solid inset-0 pointer-events-none" />
        <div className="flex flex-[1_0_0] flex-col font-['SF_Pro_Text:Regular',sans-serif] justify-center leading-[0] min-h-px min-w-px not-italic relative text-[#434343] text-[14px]">
          <p className="leading-[22px]">Gold / gold-8</p>
        </div>
      </div>
      <TableRowItem71 />
      <div className="flex-[1_0_0] min-h-px min-w-px relative" data-name="Table / Item / Row Item">
        <div aria-hidden="true" className="absolute border-[#f0f0f0] border-b border-solid inset-0 pointer-events-none" />
        <div className="content-stretch flex gap-[8px] items-start pb-[17px] pt-[16px] px-[16px] relative w-full">
          <div className="flex flex-[1_0_0] flex-col font-['SF_Pro_Text:Regular',sans-serif] justify-center leading-[0] min-h-px min-w-px not-italic relative text-[#434343] text-[14px]">
            <p className="leading-[22px]">-</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function TableRowItem72() {
  return (
    <div className="h-[55px] relative shrink-0 w-[88px]" data-name="Table / Row Item">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 88 55">
        <g id="Table / Row Item">
          <mask fill="white" id="path-1-inside-1_2021_7017">
            <path d="M0 0H88V55H0V0Z" />
          </mask>
          <path d="M88 55V54H0V55V56H88V55Z" fill="var(--stroke-0, #F0F0F0)" mask="url(#path-1-inside-1_2021_7017)" />
          <circle cx="28" cy="28" fill="var(--fill-0, #874D00)" id="Color Sample" r="12" />
        </g>
      </svg>
    </div>
  );
}

function Row76() {
  return (
    <div className="bg-white content-stretch flex items-start relative shrink-0 w-full" data-name="Row">
      <div className="content-stretch flex gap-[8px] items-start pb-[17px] pt-[16px] px-[16px] relative shrink-0 w-[216px]" data-name="Table / Item / Row Item">
        <div aria-hidden="true" className="absolute border-[#f0f0f0] border-b border-solid inset-0 pointer-events-none" />
        <div className="flex flex-[1_0_0] flex-col font-['SF_Pro_Text:Regular',sans-serif] justify-center leading-[0] min-h-px min-w-px not-italic relative text-[#434343] text-[14px]">
          <p className="leading-[22px]">Gold / gold-9</p>
        </div>
      </div>
      <TableRowItem72 />
      <div className="flex-[1_0_0] min-h-px min-w-px relative" data-name="Table / Item / Row Item">
        <div aria-hidden="true" className="absolute border-[#f0f0f0] border-b border-solid inset-0 pointer-events-none" />
        <div className="content-stretch flex gap-[8px] items-start pb-[17px] pt-[16px] px-[16px] relative w-full">
          <div className="flex flex-[1_0_0] flex-col font-['SF_Pro_Text:Regular',sans-serif] justify-center leading-[0] min-h-px min-w-px not-italic relative text-[#434343] text-[14px]">
            <p className="leading-[22px]">-</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function TableRowItem73() {
  return (
    <div className="h-[55px] relative shrink-0 w-[88px]" data-name="Table / Row Item">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 88 55">
        <g id="Table / Row Item">
          <mask fill="white" id="path-1-inside-1_2021_7012">
            <path d="M0 0H88V55H0V0Z" />
          </mask>
          <path d="M88 55V54H0V55V56H88V55Z" fill="var(--stroke-0, #F0F0F0)" mask="url(#path-1-inside-1_2021_7012)" />
          <circle cx="28" cy="28" fill="var(--fill-0, #613400)" id="Color Sample" r="12" />
        </g>
      </svg>
    </div>
  );
}

function Row77() {
  return (
    <div className="bg-white content-stretch flex items-start relative shrink-0 w-full" data-name="Row">
      <div className="content-stretch flex gap-[8px] items-start pb-[17px] pt-[16px] px-[16px] relative shrink-0 w-[216px]" data-name="Table / Item / Row Item">
        <div aria-hidden="true" className="absolute border-[#f0f0f0] border-b border-solid inset-0 pointer-events-none" />
        <div className="flex flex-[1_0_0] flex-col font-['SF_Pro_Text:Regular',sans-serif] justify-center leading-[0] min-h-px min-w-px not-italic relative text-[#434343] text-[14px]">
          <p className="leading-[22px]">Gold / gold-10</p>
        </div>
      </div>
      <TableRowItem73 />
      <div className="flex-[1_0_0] min-h-px min-w-px relative" data-name="Table / Item / Row Item">
        <div aria-hidden="true" className="absolute border-[#f0f0f0] border-b border-solid inset-0 pointer-events-none" />
        <div className="content-stretch flex gap-[8px] items-start pb-[17px] pt-[16px] px-[16px] relative w-full">
          <div className="flex flex-[1_0_0] flex-col font-['SF_Pro_Text:Regular',sans-serif] justify-center leading-[0] min-h-px min-w-px not-italic relative text-[#434343] text-[14px]">
            <p className="leading-[22px]">-</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function Table7() {
  return (
    <div className="bg-[#f0f0f0] content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Table">
      <HeaderRow7 />
      <Row68 />
      <Row69 />
      <Row70 />
      <Row71 />
      <Row72 />
      <Row73 />
      <Row74 />
      <Row75 />
      <Row76 />
      <Row77 />
    </div>
  );
}

function ComponentWrapper7() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col gap-[10px] items-start justify-center min-h-px min-w-px overflow-clip py-[16px] relative" data-name="Component Wrapper">
      <p className="font-['SF_Pro_Text:Semibold',sans-serif] leading-[24px] not-italic relative shrink-0 text-[#434343] text-[16px] w-full">Gold (Warning)</p>
      <Table7 />
    </div>
  );
}

function Row57() {
  return (
    <div className="content-stretch flex gap-[24px] items-start relative shrink-0 w-full" data-name="Row">
      <ComponentWrapper6 />
      <ComponentWrapper7 />
    </div>
  );
}

function Grid3() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Grid">
      <Row57 />
    </div>
  );
}

function Frame24() {
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

function Frame25() {
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

function Frame26() {
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

function HeaderRow8() {
  return (
    <div className="content-stretch flex items-start relative shrink-0 w-full" data-name="Header Row">
      <div className="bg-[#fafafa] content-stretch flex items-center py-[16px] relative shrink-0 w-[216px]" data-name="Table / Item / Header Item/Basic/False/Default/Default">
        <div aria-hidden="true" className="absolute border-[#f0f0f0] border-b border-solid inset-0 pointer-events-none" />
        <Frame24 />
      </div>
      <div className="bg-[#fafafa] content-stretch flex items-center py-[16px] relative shrink-0 w-[88px]" data-name="Table / Item / Header Item/Basic/False/Default/Default">
        <div aria-hidden="true" className="absolute border-[#f0f0f0] border-b border-solid inset-0 pointer-events-none" />
        <Frame25 />
      </div>
      <div className="bg-[#fafafa] content-stretch flex flex-[1_0_0] items-center min-h-px min-w-px py-[16px] relative" data-name="Table / Item / Header Item/Basic/False/Default/Default">
        <div aria-hidden="true" className="absolute border-[#f0f0f0] border-b border-solid inset-0 pointer-events-none" />
        <Frame26 />
      </div>
    </div>
  );
}

function TableRowItem74() {
  return (
    <div className="h-[55px] relative shrink-0 w-[88px]" data-name="Table / Row Item">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 88 55">
        <g id="Table / Row Item">
          <mask fill="white" id="path-1-inside-1_2021_7006">
            <path d="M0 0H88V55H0V0Z" />
          </mask>
          <path d="M88 55V54H0V55V56H88V55Z" fill="var(--stroke-0, #F0F0F0)" mask="url(#path-1-inside-1_2021_7006)" />
          <g id="Color Sample">
            <circle cx="28" cy="28" fill="var(--fill-0, #F6FFED)" r="12" />
            <circle cx="28" cy="28" r="11.5" stroke="var(--stroke-0, black)" strokeOpacity="0.05" />
          </g>
        </g>
      </svg>
    </div>
  );
}

function Row79() {
  return (
    <div className="bg-white content-stretch flex items-start relative shrink-0 w-full" data-name="Row">
      <div className="content-stretch flex gap-[8px] items-start pb-[17px] pt-[16px] px-[16px] relative shrink-0 w-[216px]" data-name="Table / Item / Row Item">
        <div aria-hidden="true" className="absolute border-[#f0f0f0] border-b border-solid inset-0 pointer-events-none" />
        <div className="flex flex-[1_0_0] flex-col font-['SF_Pro_Text:Regular',sans-serif] justify-center leading-[0] min-h-px min-w-px not-italic relative text-[#434343] text-[14px]">
          <p className="leading-[22px]">Green / green-1</p>
        </div>
      </div>
      <TableRowItem74 />
      <div className="flex-[1_0_0] min-h-px min-w-px relative" data-name="Table / Item / Row Item">
        <div aria-hidden="true" className="absolute border-[#f0f0f0] border-b border-solid inset-0 pointer-events-none" />
        <div className="content-stretch flex gap-[8px] items-start pb-[17px] pt-[16px] px-[16px] relative w-full">
          <div className="flex flex-[1_0_0] flex-col font-['SF_Pro_Text:Regular',sans-serif] justify-center leading-[0] min-h-px min-w-px not-italic relative text-[#434343] text-[14px]">
            <p className="leading-[22px]">Success background</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function TableRowItem75() {
  return (
    <div className="h-[55px] relative shrink-0 w-[88px]" data-name="Table / Row Item">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 88 55">
        <g id="Table / Row Item">
          <mask fill="white" id="path-1-inside-1_2021_7003">
            <path d="M0 0H88V55H0V0Z" />
          </mask>
          <path d="M88 55V54H0V55V56H88V55Z" fill="var(--stroke-0, #F0F0F0)" mask="url(#path-1-inside-1_2021_7003)" />
          <g id="Color Sample">
            <circle cx="28" cy="28" fill="var(--fill-0, #D9F7BE)" r="12" />
            <circle cx="28" cy="28" r="11.5" stroke="var(--stroke-0, black)" strokeOpacity="0.05" />
          </g>
        </g>
      </svg>
    </div>
  );
}

function Row80() {
  return (
    <div className="bg-white content-stretch flex items-start relative shrink-0 w-full" data-name="Row">
      <div className="content-stretch flex gap-[8px] items-start pb-[17px] pt-[16px] px-[16px] relative shrink-0 w-[216px]" data-name="Table / Item / Row Item">
        <div aria-hidden="true" className="absolute border-[#f0f0f0] border-b border-solid inset-0 pointer-events-none" />
        <div className="flex flex-[1_0_0] flex-col font-['SF_Pro_Text:Regular',sans-serif] justify-center leading-[0] min-h-px min-w-px not-italic relative text-[#434343] text-[14px]">
          <p className="leading-[22px]">Green / green-2</p>
        </div>
      </div>
      <TableRowItem75 />
      <div className="flex-[1_0_0] min-h-px min-w-px relative" data-name="Table / Item / Row Item">
        <div aria-hidden="true" className="absolute border-[#f0f0f0] border-b border-solid inset-0 pointer-events-none" />
        <div className="content-stretch flex gap-[8px] items-start pb-[17px] pt-[16px] px-[16px] relative w-full">
          <div className="flex flex-[1_0_0] flex-col font-['SF_Pro_Text:Regular',sans-serif] justify-center leading-[0] min-h-px min-w-px not-italic relative text-[#434343] text-[14px]">
            <p className="leading-[22px]">-</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function TableRowItem76() {
  return (
    <div className="h-[55px] relative shrink-0 w-[88px]" data-name="Table / Row Item">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 88 55">
        <g id="Table / Row Item">
          <mask fill="white" id="path-1-inside-1_2021_7000">
            <path d="M0 0H88V55H0V0Z" />
          </mask>
          <path d="M88 55V54H0V55V56H88V55Z" fill="var(--stroke-0, #F0F0F0)" mask="url(#path-1-inside-1_2021_7000)" />
          <g id="Color Sample">
            <circle cx="28" cy="28" fill="var(--fill-0, #B7EB8F)" r="12" />
            <circle cx="28" cy="28" r="11.5" stroke="var(--stroke-0, black)" strokeOpacity="0.05" />
          </g>
        </g>
      </svg>
    </div>
  );
}

function Row81() {
  return (
    <div className="bg-white content-stretch flex items-start relative shrink-0 w-full" data-name="Row">
      <div className="content-stretch flex gap-[8px] items-start pb-[17px] pt-[16px] px-[16px] relative shrink-0 w-[216px]" data-name="Table / Item / Row Item">
        <div aria-hidden="true" className="absolute border-[#f0f0f0] border-b border-solid inset-0 pointer-events-none" />
        <div className="flex flex-[1_0_0] flex-col font-['SF_Pro_Text:Regular',sans-serif] justify-center leading-[0] min-h-px min-w-px not-italic relative text-[#434343] text-[14px]">
          <p className="leading-[22px]">Green / green-3</p>
        </div>
      </div>
      <TableRowItem76 />
      <div className="flex-[1_0_0] min-h-px min-w-px relative" data-name="Table / Item / Row Item">
        <div aria-hidden="true" className="absolute border-[#f0f0f0] border-b border-solid inset-0 pointer-events-none" />
        <div className="content-stretch flex gap-[8px] items-start pb-[17px] pt-[16px] px-[16px] relative w-full">
          <div className="flex flex-[1_0_0] flex-col font-['SF_Pro_Text:Regular',sans-serif] justify-center leading-[0] min-h-px min-w-px not-italic relative text-[#434343] text-[14px]">
            <p className="leading-[22px]">Success border</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function TableRowItem77() {
  return (
    <div className="h-[55px] relative shrink-0 w-[88px]" data-name="Table / Row Item">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 88 55">
        <g id="Table / Row Item">
          <mask fill="white" id="path-1-inside-1_2021_7095">
            <path d="M0 0H88V55H0V0Z" />
          </mask>
          <path d="M88 55V54H0V55V56H88V55Z" fill="var(--stroke-0, #F0F0F0)" mask="url(#path-1-inside-1_2021_7095)" />
          <circle cx="28" cy="28" fill="var(--fill-0, #95DE64)" id="Color Sample" r="12" />
        </g>
      </svg>
    </div>
  );
}

function Row82() {
  return (
    <div className="bg-white content-stretch flex items-start relative shrink-0 w-full" data-name="Row">
      <div className="content-stretch flex gap-[8px] items-start pb-[17px] pt-[16px] px-[16px] relative shrink-0 w-[216px]" data-name="Table / Item / Row Item">
        <div aria-hidden="true" className="absolute border-[#f0f0f0] border-b border-solid inset-0 pointer-events-none" />
        <div className="flex flex-[1_0_0] flex-col font-['SF_Pro_Text:Regular',sans-serif] justify-center leading-[0] min-h-px min-w-px not-italic relative text-[#434343] text-[14px]">
          <p className="leading-[22px]">Green / green-4</p>
        </div>
      </div>
      <TableRowItem77 />
      <div className="flex-[1_0_0] min-h-px min-w-px relative" data-name="Table / Item / Row Item">
        <div aria-hidden="true" className="absolute border-[#f0f0f0] border-b border-solid inset-0 pointer-events-none" />
        <div className="content-stretch flex gap-[8px] items-start pb-[17px] pt-[16px] px-[16px] relative w-full">
          <div className="flex flex-[1_0_0] flex-col font-['SF_Pro_Text:Regular',sans-serif] justify-center leading-[0] min-h-px min-w-px not-italic relative text-[#434343] text-[14px]">
            <p className="leading-[22px]">-</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function TableRowItem78() {
  return (
    <div className="h-[55px] relative shrink-0 w-[88px]" data-name="Table / Row Item">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 88 55">
        <g id="Table / Row Item">
          <mask fill="white" id="path-1-inside-1_2021_7124">
            <path d="M0 0H88V55H0V0Z" />
          </mask>
          <path d="M88 55V54H0V55V56H88V55Z" fill="var(--stroke-0, #F0F0F0)" mask="url(#path-1-inside-1_2021_7124)" />
          <circle cx="28" cy="28" fill="var(--fill-0, #73D13D)" id="Color Sample" r="12" />
        </g>
      </svg>
    </div>
  );
}

function Row83() {
  return (
    <div className="bg-white content-stretch flex items-start relative shrink-0 w-full" data-name="Row">
      <div className="content-stretch flex gap-[8px] items-start pb-[17px] pt-[16px] px-[16px] relative shrink-0 w-[216px]" data-name="Table / Item / Row Item">
        <div aria-hidden="true" className="absolute border-[#f0f0f0] border-b border-solid inset-0 pointer-events-none" />
        <div className="flex flex-[1_0_0] flex-col font-['SF_Pro_Text:Regular',sans-serif] justify-center leading-[0] min-h-px min-w-px not-italic relative text-[#434343] text-[14px]">
          <p className="leading-[22px]">Green / green-5</p>
        </div>
      </div>
      <TableRowItem78 />
      <div className="flex-[1_0_0] min-h-px min-w-px relative" data-name="Table / Item / Row Item">
        <div aria-hidden="true" className="absolute border-[#f0f0f0] border-b border-solid inset-0 pointer-events-none" />
        <div className="content-stretch flex gap-[8px] items-start pb-[17px] pt-[16px] px-[16px] relative w-full">
          <div className="flex flex-[1_0_0] flex-col font-['SF_Pro_Text:Regular',sans-serif] justify-center leading-[0] min-h-px min-w-px not-italic relative text-[#434343] text-[14px]">
            <p className="leading-[22px]">Success hover</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function TableRowItem79() {
  return (
    <div className="h-[55px] relative shrink-0 w-[88px]" data-name="Table / Row Item">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 88 55">
        <g id="Table / Row Item">
          <mask fill="white" id="path-1-inside-1_2021_7074">
            <path d="M0 0H88V55H0V0Z" />
          </mask>
          <path d="M88 55V54H0V55V56H88V55Z" fill="var(--stroke-0, #F0F0F0)" mask="url(#path-1-inside-1_2021_7074)" />
          <circle cx="28" cy="28" fill="var(--fill-0, #52C41A)" id="Color Sample" r="12" />
        </g>
      </svg>
    </div>
  );
}

function Row84() {
  return (
    <div className="bg-white content-stretch flex items-start relative shrink-0 w-full" data-name="Row">
      <div className="content-stretch flex gap-[8px] items-start pb-[17px] pt-[16px] px-[16px] relative shrink-0 w-[216px]" data-name="Table / Item / Row Item">
        <div aria-hidden="true" className="absolute border-[#f0f0f0] border-b border-solid inset-0 pointer-events-none" />
        <div className="flex flex-[1_0_0] flex-col font-['SF_Pro_Text:Regular',sans-serif] justify-center leading-[0] min-h-px min-w-px not-italic relative text-[#434343] text-[14px]">
          <p className="leading-[22px]">Green / green-6</p>
        </div>
      </div>
      <TableRowItem79 />
      <div className="flex-[1_0_0] min-h-px min-w-px relative" data-name="Table / Item / Row Item">
        <div aria-hidden="true" className="absolute border-[#f0f0f0] border-b border-solid inset-0 pointer-events-none" />
        <div className="content-stretch flex gap-[8px] items-start pb-[17px] pt-[16px] px-[16px] relative w-full">
          <div className="flex flex-[1_0_0] flex-col font-['SF_Pro_Text:Regular',sans-serif] justify-center leading-[0] min-h-px min-w-px not-italic relative text-[#434343] text-[14px]">
            <p className="leading-[22px]">Success normal</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function TableRowItem80() {
  return (
    <div className="h-[55px] relative shrink-0 w-[88px]" data-name="Table / Row Item">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 88 55">
        <g id="Table / Row Item">
          <mask fill="white" id="path-1-inside-1_2021_6997">
            <path d="M0 0H88V55H0V0Z" />
          </mask>
          <path d="M88 55V54H0V55V56H88V55Z" fill="var(--stroke-0, #F0F0F0)" mask="url(#path-1-inside-1_2021_6997)" />
          <circle cx="28" cy="28" fill="var(--fill-0, #389E0D)" id="Color Sample" r="12" />
        </g>
      </svg>
    </div>
  );
}

function Row85() {
  return (
    <div className="bg-white content-stretch flex items-start relative shrink-0 w-full" data-name="Row">
      <div className="content-stretch flex gap-[8px] items-start pb-[17px] pt-[16px] px-[16px] relative shrink-0 w-[216px]" data-name="Table / Item / Row Item">
        <div aria-hidden="true" className="absolute border-[#f0f0f0] border-b border-solid inset-0 pointer-events-none" />
        <div className="flex flex-[1_0_0] flex-col font-['SF_Pro_Text:Regular',sans-serif] justify-center leading-[0] min-h-px min-w-px not-italic relative text-[#434343] text-[14px]">
          <p className="leading-[22px]">Green / green-7</p>
        </div>
      </div>
      <TableRowItem80 />
      <div className="flex-[1_0_0] min-h-px min-w-px relative" data-name="Table / Item / Row Item">
        <div aria-hidden="true" className="absolute border-[#f0f0f0] border-b border-solid inset-0 pointer-events-none" />
        <div className="content-stretch flex gap-[8px] items-start pb-[17px] pt-[16px] px-[16px] relative w-full">
          <div className="flex flex-[1_0_0] flex-col font-['SF_Pro_Text:Regular',sans-serif] justify-center leading-[0] min-h-px min-w-px not-italic relative text-[#434343] text-[14px]">
            <p className="leading-[22px]">Success click</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function TableRowItem81() {
  return (
    <div className="h-[55px] relative shrink-0 w-[88px]" data-name="Table / Row Item">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 88 55">
        <g id="Table / Row Item">
          <mask fill="white" id="path-1-inside-1_2021_7023">
            <path d="M0 0H88V55H0V0Z" />
          </mask>
          <path d="M88 55V54H0V55V56H88V55Z" fill="var(--stroke-0, #F0F0F0)" mask="url(#path-1-inside-1_2021_7023)" />
          <circle cx="28" cy="28" fill="var(--fill-0, #237804)" id="Color Sample" r="12" />
        </g>
      </svg>
    </div>
  );
}

function Row86() {
  return (
    <div className="bg-white content-stretch flex items-start relative shrink-0 w-full" data-name="Row">
      <div className="content-stretch flex gap-[8px] items-start pb-[17px] pt-[16px] px-[16px] relative shrink-0 w-[216px]" data-name="Table / Item / Row Item">
        <div aria-hidden="true" className="absolute border-[#f0f0f0] border-b border-solid inset-0 pointer-events-none" />
        <div className="flex flex-[1_0_0] flex-col font-['SF_Pro_Text:Regular',sans-serif] justify-center leading-[0] min-h-px min-w-px not-italic relative text-[#434343] text-[14px]">
          <p className="leading-[22px]">Green / green-8</p>
        </div>
      </div>
      <TableRowItem81 />
      <div className="flex-[1_0_0] min-h-px min-w-px relative" data-name="Table / Item / Row Item">
        <div aria-hidden="true" className="absolute border-[#f0f0f0] border-b border-solid inset-0 pointer-events-none" />
        <div className="content-stretch flex gap-[8px] items-start pb-[17px] pt-[16px] px-[16px] relative w-full">
          <div className="flex flex-[1_0_0] flex-col font-['SF_Pro_Text:Regular',sans-serif] justify-center leading-[0] min-h-px min-w-px not-italic relative text-[#434343] text-[14px]">
            <p className="leading-[22px]">-</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function TableRowItem82() {
  return (
    <div className="h-[55px] relative shrink-0 w-[88px]" data-name="Table / Row Item">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 88 55">
        <g id="Table / Row Item">
          <mask fill="white" id="path-1-inside-1_2021_7089">
            <path d="M0 0H88V55H0V0Z" />
          </mask>
          <path d="M88 55V54H0V55V56H88V55Z" fill="var(--stroke-0, #F0F0F0)" mask="url(#path-1-inside-1_2021_7089)" />
          <circle cx="28" cy="28" fill="var(--fill-0, #135200)" id="Color Sample" r="12" />
        </g>
      </svg>
    </div>
  );
}

function Row87() {
  return (
    <div className="bg-white content-stretch flex items-start relative shrink-0 w-full" data-name="Row">
      <div className="content-stretch flex gap-[8px] items-start pb-[17px] pt-[16px] px-[16px] relative shrink-0 w-[216px]" data-name="Table / Item / Row Item">
        <div aria-hidden="true" className="absolute border-[#f0f0f0] border-b border-solid inset-0 pointer-events-none" />
        <div className="flex flex-[1_0_0] flex-col font-['SF_Pro_Text:Regular',sans-serif] justify-center leading-[0] min-h-px min-w-px not-italic relative text-[#434343] text-[14px]">
          <p className="leading-[22px]">Green / green-9</p>
        </div>
      </div>
      <TableRowItem82 />
      <div className="flex-[1_0_0] min-h-px min-w-px relative" data-name="Table / Item / Row Item">
        <div aria-hidden="true" className="absolute border-[#f0f0f0] border-b border-solid inset-0 pointer-events-none" />
        <div className="content-stretch flex gap-[8px] items-start pb-[17px] pt-[16px] px-[16px] relative w-full">
          <div className="flex flex-[1_0_0] flex-col font-['SF_Pro_Text:Regular',sans-serif] justify-center leading-[0] min-h-px min-w-px not-italic relative text-[#434343] text-[14px]">
            <p className="leading-[22px]">-</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function TableRowItem83() {
  return (
    <div className="h-[55px] relative shrink-0 w-[88px]" data-name="Table / Row Item">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 88 55">
        <g id="Table / Row Item">
          <mask fill="white" id="path-1-inside-1_2021_7041">
            <path d="M0 0H88V55H0V0Z" />
          </mask>
          <path d="M88 55V54H0V55V56H88V55Z" fill="var(--stroke-0, #F0F0F0)" mask="url(#path-1-inside-1_2021_7041)" />
          <circle cx="28" cy="28" fill="var(--fill-0, #092B00)" id="Color Sample" r="12" />
        </g>
      </svg>
    </div>
  );
}

function Row88() {
  return (
    <div className="bg-white content-stretch flex items-start relative shrink-0 w-full" data-name="Row">
      <div className="content-stretch flex gap-[8px] items-start pb-[17px] pt-[16px] px-[16px] relative shrink-0 w-[216px]" data-name="Table / Item / Row Item">
        <div aria-hidden="true" className="absolute border-[#f0f0f0] border-b border-solid inset-0 pointer-events-none" />
        <div className="flex flex-[1_0_0] flex-col font-['SF_Pro_Text:Regular',sans-serif] justify-center leading-[0] min-h-px min-w-px not-italic relative text-[#434343] text-[14px]">
          <p className="leading-[22px]">Green / green-10</p>
        </div>
      </div>
      <TableRowItem83 />
      <div className="flex-[1_0_0] min-h-px min-w-px relative" data-name="Table / Item / Row Item">
        <div aria-hidden="true" className="absolute border-[#f0f0f0] border-b border-solid inset-0 pointer-events-none" />
        <div className="content-stretch flex gap-[8px] items-start pb-[17px] pt-[16px] px-[16px] relative w-full">
          <div className="flex flex-[1_0_0] flex-col font-['SF_Pro_Text:Regular',sans-serif] justify-center leading-[0] min-h-px min-w-px not-italic relative text-[#434343] text-[14px]">
            <p className="leading-[22px]">-</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function Table8() {
  return (
    <div className="bg-[#f0f0f0] content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Table">
      <HeaderRow8 />
      <Row79 />
      <Row80 />
      <Row81 />
      <Row82 />
      <Row83 />
      <Row84 />
      <Row85 />
      <Row86 />
      <Row87 />
      <Row88 />
    </div>
  );
}

function ComponentWrapper8() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col gap-[10px] items-start justify-center min-h-px min-w-px overflow-clip py-[16px] relative" data-name="Component Wrapper">
      <p className="font-['SF_Pro_Text:Semibold',sans-serif] leading-[24px] not-italic relative shrink-0 text-[#434343] text-[16px] w-full">Green (Success)</p>
      <Table8 />
    </div>
  );
}

function Frame27() {
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

function Frame28() {
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

function Frame29() {
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

function HeaderRow9() {
  return (
    <div className="content-stretch flex items-start relative shrink-0 w-full" data-name="Header Row">
      <div className="bg-[#fafafa] content-stretch flex items-center py-[16px] relative shrink-0 w-[216px]" data-name="Table / Item / Header Item/Basic/False/Default/Default">
        <div aria-hidden="true" className="absolute border-[#f0f0f0] border-b border-solid inset-0 pointer-events-none" />
        <Frame27 />
      </div>
      <div className="bg-[#fafafa] content-stretch flex items-center py-[16px] relative shrink-0 w-[88px]" data-name="Table / Item / Header Item/Basic/False/Default/Default">
        <div aria-hidden="true" className="absolute border-[#f0f0f0] border-b border-solid inset-0 pointer-events-none" />
        <Frame28 />
      </div>
      <div className="bg-[#fafafa] content-stretch flex flex-[1_0_0] items-center min-h-px min-w-px py-[16px] relative" data-name="Table / Item / Header Item/Basic/False/Default/Default">
        <div aria-hidden="true" className="absolute border-[#f0f0f0] border-b border-solid inset-0 pointer-events-none" />
        <Frame29 />
      </div>
    </div>
  );
}

function TableRowItem84() {
  return (
    <div className="h-[55px] relative shrink-0 w-[88px]" data-name="Table / Row Item">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 88 55">
        <g id="Table / Row Item">
          <mask fill="white" id="path-1-inside-1_2021_6994">
            <path d="M0 0H88V55H0V0Z" />
          </mask>
          <path d="M88 55V54H0V55V56H88V55Z" fill="var(--stroke-0, #F0F0F0)" mask="url(#path-1-inside-1_2021_6994)" />
          <g id="Color Sample">
            <circle cx="28" cy="28" fill="var(--fill-0, #7E57C5)" r="12" />
            <circle cx="28" cy="28" r="11.5" stroke="var(--stroke-0, black)" strokeOpacity="0.05" />
          </g>
        </g>
      </svg>
    </div>
  );
}

function Row89() {
  return (
    <div className="bg-white content-stretch flex items-start relative shrink-0 w-full" data-name="Row">
      <div className="content-stretch flex gap-[8px] items-start pb-[17px] pt-[16px] px-[16px] relative shrink-0 w-[216px]" data-name="Table / Item / Row Item">
        <div aria-hidden="true" className="absolute border-[#f0f0f0] border-b border-solid inset-0 pointer-events-none" />
        <div className="flex flex-[1_0_0] flex-col font-['SF_Pro_Text:Regular',sans-serif] justify-center leading-[0] min-h-px min-w-px not-italic relative text-[#434343] text-[14px]">
          <p className="leading-[22px]">Extra / Purple</p>
        </div>
      </div>
      <TableRowItem84 />
      <div className="flex-[1_0_0] min-h-px min-w-px relative" data-name="Table / Item / Row Item">
        <div aria-hidden="true" className="absolute border-[#f0f0f0] border-b border-solid inset-0 pointer-events-none" />
        <div className="content-stretch flex gap-[8px] items-start pb-[17px] pt-[16px] px-[16px] relative w-full">
          <div className="flex flex-[1_0_0] flex-col font-['SF_Pro_Text:Regular',sans-serif] justify-center leading-[0] min-h-px min-w-px not-italic relative text-[#434343] text-[14px]">
            <p className="leading-[22px]">Colorful tag background</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function TableRowItem85() {
  return (
    <div className="h-[55px] relative shrink-0 w-[88px]" data-name="Table / Row Item">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 88 55">
        <g id="Table / Row Item">
          <mask fill="white" id="path-1-inside-1_2021_6991">
            <path d="M0 0H88V55H0V0Z" />
          </mask>
          <path d="M88 55V54H0V55V56H88V55Z" fill="var(--stroke-0, #F0F0F0)" mask="url(#path-1-inside-1_2021_6991)" />
          <g id="Color Sample">
            <circle cx="28" cy="28" fill="var(--fill-0, #ED40A9)" r="12" />
            <circle cx="28" cy="28" r="11.5" stroke="var(--stroke-0, black)" strokeOpacity="0.05" />
          </g>
        </g>
      </svg>
    </div>
  );
}

function Row90() {
  return (
    <div className="bg-white content-stretch flex items-start relative shrink-0 w-full" data-name="Row">
      <div className="content-stretch flex gap-[8px] items-start pb-[17px] pt-[16px] px-[16px] relative shrink-0 w-[216px]" data-name="Table / Item / Row Item">
        <div aria-hidden="true" className="absolute border-[#f0f0f0] border-b border-solid inset-0 pointer-events-none" />
        <div className="flex flex-[1_0_0] flex-col font-['SF_Pro_Text:Regular',sans-serif] justify-center leading-[0] min-h-px min-w-px not-italic relative text-[#434343] text-[14px]">
          <p className="leading-[22px]">Extra / Magenta</p>
        </div>
      </div>
      <TableRowItem85 />
      <div className="flex-[1_0_0] min-h-px min-w-px relative" data-name="Table / Item / Row Item">
        <div aria-hidden="true" className="absolute border-[#f0f0f0] border-b border-solid inset-0 pointer-events-none" />
        <div className="content-stretch flex gap-[8px] items-start pb-[17px] pt-[16px] px-[16px] relative w-full">
          <div className="flex flex-[1_0_0] flex-col font-['SF_Pro_Text:Regular',sans-serif] justify-center leading-[0] min-h-px min-w-px not-italic relative text-[#434343] text-[14px]">
            <p className="leading-[22px]">-</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function TableRowItem86() {
  return (
    <div className="h-[55px] relative shrink-0 w-[88px]" data-name="Table / Row Item">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 88 55">
        <g id="Table / Row Item">
          <mask fill="white" id="path-1-inside-1_2021_7140">
            <path d="M0 0H88V55H0V0Z" />
          </mask>
          <path d="M88 55V54H0V55V56H88V55Z" fill="var(--stroke-0, #F0F0F0)" mask="url(#path-1-inside-1_2021_7140)" />
          <g id="Color Sample">
            <circle cx="28" cy="28" fill="var(--fill-0, #74E0C1)" r="12" />
            <circle cx="28" cy="28" r="11.5" stroke="var(--stroke-0, black)" strokeOpacity="0.05" />
          </g>
        </g>
      </svg>
    </div>
  );
}

function Row91() {
  return (
    <div className="bg-white content-stretch flex items-start relative shrink-0 w-full" data-name="Row">
      <div className="content-stretch flex gap-[8px] items-start pb-[17px] pt-[16px] px-[16px] relative shrink-0 w-[216px]" data-name="Table / Item / Row Item">
        <div aria-hidden="true" className="absolute border-[#f0f0f0] border-b border-solid inset-0 pointer-events-none" />
        <div className="flex flex-[1_0_0] flex-col font-['SF_Pro_Text:Regular',sans-serif] justify-center leading-[0] min-h-px min-w-px not-italic relative text-[#434343] text-[14px]">
          <p className="leading-[22px]">Extra / Mint</p>
        </div>
      </div>
      <TableRowItem86 />
      <div className="flex-[1_0_0] min-h-px min-w-px relative" data-name="Table / Item / Row Item">
        <div aria-hidden="true" className="absolute border-[#f0f0f0] border-b border-solid inset-0 pointer-events-none" />
        <div className="content-stretch flex gap-[8px] items-start pb-[17px] pt-[16px] px-[16px] relative w-full">
          <div className="flex flex-[1_0_0] flex-col font-['SF_Pro_Text:Regular',sans-serif] justify-center leading-[0] min-h-px min-w-px not-italic relative text-[#434343] text-[14px]">
            <p className="leading-[22px]">Colorful tag border</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function TableRowItem87() {
  return (
    <div className="h-[55px] relative shrink-0 w-[88px]" data-name="Table / Row Item">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 88 55">
        <g id="Table / Row Item">
          <mask fill="white" id="path-1-inside-1_2021_6988">
            <path d="M0 0H88V55H0V0Z" />
          </mask>
          <path d="M88 55V54H0V55V56H88V55Z" fill="var(--stroke-0, #F0F0F0)" mask="url(#path-1-inside-1_2021_6988)" />
          <circle cx="28" cy="28" fill="var(--fill-0, #008996)" id="Color Sample" r="12" />
        </g>
      </svg>
    </div>
  );
}

function Row92() {
  return (
    <div className="bg-white content-stretch flex items-start relative shrink-0 w-full" data-name="Row">
      <div className="content-stretch flex gap-[8px] items-start pb-[17px] pt-[16px] px-[16px] relative shrink-0 w-[216px]" data-name="Table / Item / Row Item">
        <div aria-hidden="true" className="absolute border-[#f0f0f0] border-b border-solid inset-0 pointer-events-none" />
        <div className="flex flex-[1_0_0] flex-col font-['SF_Pro_Text:Regular',sans-serif] justify-center leading-[0] min-h-px min-w-px not-italic relative text-[#434343] text-[14px]">
          <p className="leading-[22px]">Extra / Teal</p>
        </div>
      </div>
      <TableRowItem87 />
      <div className="flex-[1_0_0] min-h-px min-w-px relative" data-name="Table / Item / Row Item">
        <div aria-hidden="true" className="absolute border-[#f0f0f0] border-b border-solid inset-0 pointer-events-none" />
        <div className="content-stretch flex gap-[8px] items-start pb-[17px] pt-[16px] px-[16px] relative w-full">
          <div className="flex flex-[1_0_0] flex-col font-['SF_Pro_Text:Regular',sans-serif] justify-center leading-[0] min-h-px min-w-px not-italic relative text-[#434343] text-[14px]">
            <p className="leading-[22px]">-</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function TableRowItem88() {
  return (
    <div className="h-[55px] relative shrink-0 w-[88px]" data-name="Table / Row Item">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 88 55">
        <g id="Table / Row Item">
          <mask fill="white" id="path-1-inside-1_2021_7104">
            <path d="M0 0H88V55H0V0Z" />
          </mask>
          <path d="M88 55V54H0V55V56H88V55Z" fill="var(--stroke-0, #F0F0F0)" mask="url(#path-1-inside-1_2021_7104)" />
          <circle cx="28" cy="28" fill="var(--fill-0, #FFDD00)" id="Color Sample" r="12" />
        </g>
      </svg>
    </div>
  );
}

function Row93() {
  return (
    <div className="bg-white content-stretch flex items-start relative shrink-0 w-full" data-name="Row">
      <div className="content-stretch flex gap-[8px] items-start pb-[17px] pt-[16px] px-[16px] relative shrink-0 w-[216px]" data-name="Table / Item / Row Item">
        <div aria-hidden="true" className="absolute border-[#f0f0f0] border-b border-solid inset-0 pointer-events-none" />
        <div className="flex flex-[1_0_0] flex-col font-['SF_Pro_Text:Regular',sans-serif] justify-center leading-[0] min-h-px min-w-px not-italic relative text-[#434343] text-[14px]">
          <p className="leading-[22px]">Extra / Yellow</p>
        </div>
      </div>
      <TableRowItem88 />
      <div className="flex-[1_0_0] min-h-px min-w-px relative" data-name="Table / Item / Row Item">
        <div aria-hidden="true" className="absolute border-[#f0f0f0] border-b border-solid inset-0 pointer-events-none" />
        <div className="content-stretch flex gap-[8px] items-start pb-[17px] pt-[16px] px-[16px] relative w-full">
          <div className="flex flex-[1_0_0] flex-col font-['SF_Pro_Text:Regular',sans-serif] justify-center leading-[0] min-h-px min-w-px not-italic relative text-[#434343] text-[14px]">
            <p className="leading-[22px]">-</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function TableRowItem89() {
  return (
    <div className="h-[55px] relative shrink-0 w-[88px]" data-name="Table / Row Item">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 88 55">
        <g id="Table / Row Item">
          <mask fill="white" id="path-1-inside-1_2021_6985">
            <path d="M0 0H88V55H0V0Z" />
          </mask>
          <path d="M88 55V54H0V55V56H88V55Z" fill="var(--stroke-0, #F0F0F0)" mask="url(#path-1-inside-1_2021_6985)" />
          <circle cx="28" cy="28" fill="var(--fill-0, #A7A8A9)" id="Color Sample" r="12" />
        </g>
      </svg>
    </div>
  );
}

function Row94() {
  return (
    <div className="bg-white content-stretch flex items-start relative shrink-0 w-full" data-name="Row">
      <div className="content-stretch flex gap-[8px] items-start pb-[17px] pt-[16px] px-[16px] relative shrink-0 w-[216px]" data-name="Table / Item / Row Item">
        <div aria-hidden="true" className="absolute border-[#f0f0f0] border-b border-solid inset-0 pointer-events-none" />
        <div className="flex flex-[1_0_0] flex-col font-['SF_Pro_Text:Regular',sans-serif] justify-center leading-[0] min-h-px min-w-px not-italic relative text-[#434343] text-[14px]">
          <p className="leading-[22px]">Extra / Yellow</p>
        </div>
      </div>
      <TableRowItem89 />
      <div className="flex-[1_0_0] min-h-px min-w-px relative" data-name="Table / Item / Row Item">
        <div aria-hidden="true" className="absolute border-[#f0f0f0] border-b border-solid inset-0 pointer-events-none" />
        <div className="content-stretch flex gap-[8px] items-start pb-[17px] pt-[16px] px-[16px] relative w-full">
          <div className="flex flex-[1_0_0] flex-col font-['SF_Pro_Text:Regular',sans-serif] justify-center leading-[0] min-h-px min-w-px not-italic relative text-[#434343] text-[14px]">
            <p className="leading-[22px]">-</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function Table9() {
  return (
    <div className="bg-[#f0f0f0] content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Table">
      <HeaderRow9 />
      <Row89 />
      <Row90 />
      <Row91 />
      <Row92 />
      <Row93 />
      <Row94 />
    </div>
  );
}

function ComponentWrapper9() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col gap-[10px] items-start justify-center min-h-px min-w-px overflow-clip py-[16px] relative" data-name="Component Wrapper">
      <p className="font-['SF_Pro_Text:Semibold',sans-serif] leading-[24px] not-italic relative shrink-0 text-[#434343] text-[16px] w-full">Extra</p>
      <Table9 />
    </div>
  );
}

function Row78() {
  return (
    <div className="content-stretch flex gap-[24px] items-start relative shrink-0 w-full" data-name="Row">
      <ComponentWrapper8 />
      <ComponentWrapper9 />
    </div>
  );
}

function Grid4() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Grid">
      <Row78 />
    </div>
  );
}

export default function Container() {
  return (
    <div className="content-stretch flex flex-col gap-[10px] items-start pb-[16px] pt-[32px] px-[120px] relative size-full" data-name="Container">
      <ComponentTitle />
      <Grid />
      <Grid1 />
      <Grid2 />
      <Grid3 />
      <Grid4 />
    </div>
  );
}