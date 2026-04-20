import svgPaths from "./svg-8ikctlcqmh";

function Top() {
  return (
    <div className="content-stretch flex flex-col gap-[8px] items-center relative shrink-0 w-full" data-name="Top">
      <p className="font-['Roboto:Regular',sans-serif] font-normal leading-[1.1] relative shrink-0 text-[#f2f3f4] text-[32px] w-full whitespace-pre-wrap" style={{ fontVariationSettings: "'wdth' 100" }}>
        Filter
      </p>
    </div>
  );
}

function Group() {
  return (
    <div className="relative size-full">
      <div className="absolute inset-[-3.77%]">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20.1642 20.1642">
          <g id="Group 32">
            <path d={svgPaths.p11cd4400} id="Vector 19" stroke="var(--stroke-0, #C3C7CC)" strokeWidth="2" />
            <path d={svgPaths.p3e367040} id="Vector 20" stroke="var(--stroke-0, #C3C7CC)" strokeWidth="2" />
          </g>
        </svg>
      </div>
    </div>
  );
}

function Headline() {
  return (
    <div className="bg-[#384857] h-[56px] relative shadow-[0px_1px_0px_0px_rgba(0,0,0,0.25)] shrink-0 w-full" data-name="Headline">
      <div className="flex flex-row items-center size-full">
        <div className="content-center flex flex-wrap gap-[10px] items-center pl-[10px] pr-[15px] relative size-full">
          <div className="content-stretch flex flex-[1_0_0] flex-col gap-[48px] h-[40px] items-start min-h-px min-w-px relative" data-name="Section Text">
            <Top />
          </div>
          <div className="overflow-clip relative shrink-0 size-[30px]" data-name="32px/suggested/x">
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

function Group1() {
  return (
    <div className="absolute inset-[20.83%_8.33%]">
      <div className="absolute inset-[-5.36%_-4.19%]">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 21.6771 15.5">
          <g id="Group 117">
            <path d={svgPaths.p37c6c380} id="Vector 127" stroke="var(--stroke-0, white)" strokeWidth="1.5" />
            <circle cx="10.8385" cy="7.75" id="Ellipse 38" r="4" stroke="var(--stroke-0, white)" strokeWidth="1.5" />
          </g>
        </svg>
      </div>
    </div>
  );
}

function Content() {
  return (
    <div className="content-stretch flex gap-[4px] h-[24px] items-center overflow-clip relative shrink-0" data-name="content">
      <div className="overflow-clip relative shrink-0 size-[24px]" data-name="24px/app/eye">
        <Group1 />
      </div>
      <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[14px] text-white whitespace-nowrap">
        <p className="leading-[20px]">Show</p>
      </div>
    </div>
  );
}

function SegmentedButton() {
  return (
    <div className="bg-[#616d79] flex-[1_0_0] h-[24px] min-h-px min-w-px relative rounded-bl-[4px] rounded-tl-[4px]" data-name="Segmented Button">
      <div className="flex flex-col items-center justify-center size-full">
        <div className="content-stretch flex flex-col items-center justify-center px-[12px] relative size-full">
          <Content />
        </div>
      </div>
    </div>
  );
}

function Group2() {
  return (
    <div className="absolute inset-[16.67%_8.33%]">
      <div className="absolute inset-[-3.31%_-4.19%]">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 21.6771 17.0607">
          <g id="Group 117">
            <path d={svgPaths.p1b690600} id="Vector 127" stroke="var(--stroke-0, #C3C7CC)" strokeWidth="1.5" />
            <path d={svgPaths.p1fa727c0} id="Ellipse 38" stroke="var(--stroke-0, #C3C7CC)" strokeWidth="1.5" />
            <path d={svgPaths.p15a67080} id="Vector 128" stroke="var(--stroke-0, #C3C7CC)" strokeWidth="1.5" />
          </g>
        </svg>
      </div>
    </div>
  );
}

function Content1() {
  return (
    <div className="content-stretch flex gap-[4px] h-[24px] items-center overflow-clip relative shrink-0" data-name="content">
      <div className="overflow-clip relative shrink-0 size-[24px]" data-name="24px/app/eye-off">
        <Group2 />
      </div>
      <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[#c3c7cc] text-[14px] whitespace-nowrap">
        <p className="leading-[20px]">Hide</p>
      </div>
    </div>
  );
}

function SegmentedButton1() {
  return (
    <div className="bg-[#f2f3f4] flex-[1_0_0] h-[24px] min-h-px min-w-px relative rounded-br-[4px] rounded-tr-[4px]" data-name="Segmented Button">
      <div className="flex flex-col items-center justify-center size-full">
        <div className="content-stretch flex flex-col items-center justify-center px-[12px] relative size-full">
          <Content1 />
        </div>
      </div>
    </div>
  );
}

function SegmentedButtonsGroup() {
  return (
    <div className="content-stretch flex h-[24px] items-center relative rounded-[4px] shrink-0 w-[197.5px]" data-name="Segmented Buttons Group">
      <SegmentedButton />
      <SegmentedButton1 />
    </div>
  );
}

function SheetsName() {
  return (
    <div className="bg-[#e5e7e9] h-[36px] relative shrink-0 w-full" data-name="Sheets Name">
      <div className="flex flex-row items-center justify-end overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex items-center justify-end pl-[12px] pr-[10px] relative size-full">
          <div className="flex flex-[1_0_0] flex-col font-['Roboto:Regular',sans-serif] font-normal justify-center leading-[0] min-h-px min-w-px relative text-[#2d333a] text-[14px] tracking-[0.4px]" style={{ fontVariationSettings: "'wdth' 100" }}>
            <p className="leading-[16px] whitespace-pre-wrap">Company</p>
          </div>
          <SegmentedButtonsGroup />
        </div>
      </div>
    </div>
  );
}

function Input() {
  return (
    <div className="bg-white flex-[1_0_0] h-[32px] min-h-px min-w-px relative rounded-[4px]" data-name="Input">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex items-center justify-between px-[8px] relative size-full">
          <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[#384857] text-[14px] whitespace-nowrap">
            <p className="leading-[20px]">None</p>
          </div>
          <div className="overflow-clip relative shrink-0 size-[24px]" data-name="24px/directional/chevron-down">
            <div className="absolute bottom-[37.5%] flex items-center justify-center left-1/4 right-1/4 top-[37.5%]">
              <div className="-rotate-90 flex-none h-[12px] w-[6px]">
                <div className="relative size-full" data-name="Vector">
                  <div className="absolute inset-[-8.84%_-17.68%]">
                    <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 8.12132 14.1213">
                      <path d={svgPaths.p5cbda00} id="Vector" stroke="var(--stroke-0, black)" strokeLinecap="square" strokeWidth="1.5" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function DropdownSelectInput() {
  return (
    <div className="content-stretch flex flex-[1_0_0] items-start justify-between min-h-px min-w-px relative" data-name="Dropdown Select / Input">
      <Input />
    </div>
  );
}

function SheetsName1() {
  return (
    <div className="bg-[#e5e7e9] h-[44px] relative shrink-0 w-full" data-name="Sheets Name">
      <div className="flex flex-row items-center overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex items-center px-[10px] relative size-full">
          <DropdownSelectInput />
        </div>
      </div>
      <div aria-hidden="true" className="absolute border-[#d9d9d9] border-b border-solid inset-0 pointer-events-none" />
    </div>
  );
}

function Frame2() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full">
      <SheetsName />
      <SheetsName1 />
    </div>
  );
}

function Filter1() {
  return (
    <div className="bg-white content-stretch flex flex-col items-center overflow-clip relative rounded-[4px] shadow-[0px_1px_1px_0px_rgba(9,30,66,0.25),0px_0px_1px_0px_rgba(9,30,66,0.31)] shrink-0 w-full" data-name="Filter">
      <Frame2 />
    </div>
  );
}

function FilterItem() {
  return (
    <div className="bg-[#fafafa] relative shrink-0 w-full" data-name="Filter Item">
      <div className="flex flex-col items-center overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex flex-col items-center pb-[6px] pt-[12px] px-[12px] relative w-full">
          <Filter1 />
        </div>
      </div>
    </div>
  );
}

function Group3() {
  return (
    <div className="absolute inset-[20.83%_8.33%]">
      <div className="absolute inset-[-5.36%_-4.19%]">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 21.6771 15.5">
          <g id="Group 117">
            <path d={svgPaths.p37c6c380} id="Vector 127" stroke="var(--stroke-0, white)" strokeWidth="1.5" />
            <circle cx="10.8385" cy="7.75" id="Ellipse 38" r="4" stroke="var(--stroke-0, white)" strokeWidth="1.5" />
          </g>
        </svg>
      </div>
    </div>
  );
}

function Content2() {
  return (
    <div className="content-stretch flex gap-[4px] h-[24px] items-center overflow-clip relative shrink-0" data-name="content">
      <div className="overflow-clip relative shrink-0 size-[24px]" data-name="24px/app/eye">
        <Group3 />
      </div>
      <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[14px] text-white whitespace-nowrap">
        <p className="leading-[20px]">Show</p>
      </div>
    </div>
  );
}

function SegmentedButton2() {
  return (
    <div className="bg-[#616d79] flex-[1_0_0] h-[24px] min-h-px min-w-px relative rounded-bl-[4px] rounded-tl-[4px]" data-name="Segmented Button">
      <div className="flex flex-col items-center justify-center size-full">
        <div className="content-stretch flex flex-col items-center justify-center px-[12px] relative size-full">
          <Content2 />
        </div>
      </div>
    </div>
  );
}

function Group4() {
  return (
    <div className="absolute inset-[16.67%_8.33%]">
      <div className="absolute inset-[-3.31%_-4.19%]">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 21.6771 17.0607">
          <g id="Group 117">
            <path d={svgPaths.p1b690600} id="Vector 127" stroke="var(--stroke-0, #C3C7CC)" strokeWidth="1.5" />
            <path d={svgPaths.p1fa727c0} id="Ellipse 38" stroke="var(--stroke-0, #C3C7CC)" strokeWidth="1.5" />
            <path d={svgPaths.p15a67080} id="Vector 128" stroke="var(--stroke-0, #C3C7CC)" strokeWidth="1.5" />
          </g>
        </svg>
      </div>
    </div>
  );
}

function Content3() {
  return (
    <div className="content-stretch flex gap-[4px] h-[24px] items-center overflow-clip relative shrink-0" data-name="content">
      <div className="overflow-clip relative shrink-0 size-[24px]" data-name="24px/app/eye-off">
        <Group4 />
      </div>
      <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[#c3c7cc] text-[14px] whitespace-nowrap">
        <p className="leading-[20px]">Hide</p>
      </div>
    </div>
  );
}

function SegmentedButton3() {
  return (
    <div className="bg-[#f2f3f4] flex-[1_0_0] h-[24px] min-h-px min-w-px relative rounded-br-[4px] rounded-tr-[4px]" data-name="Segmented Button">
      <div className="flex flex-col items-center justify-center size-full">
        <div className="content-stretch flex flex-col items-center justify-center px-[12px] relative size-full">
          <Content3 />
        </div>
      </div>
    </div>
  );
}

function SegmentedButtonsGroup1() {
  return (
    <div className="content-stretch flex h-[24px] items-center relative rounded-[4px] shrink-0 w-[197.5px]" data-name="Segmented Buttons Group">
      <SegmentedButton2 />
      <SegmentedButton3 />
    </div>
  );
}

function SheetsName2() {
  return (
    <div className="bg-[#e5e7e9] h-[36px] relative shrink-0 w-full" data-name="Sheets Name">
      <div className="flex flex-row items-center justify-end overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex items-center justify-end pl-[12px] pr-[10px] relative size-full">
          <div className="flex flex-[1_0_0] flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] min-h-px min-w-px not-italic relative text-[#262626] text-[14px]">
            <p className="leading-[20px] whitespace-pre-wrap">Office</p>
          </div>
          <SegmentedButtonsGroup1 />
        </div>
      </div>
    </div>
  );
}

function Input1() {
  return (
    <div className="bg-white flex-[1_0_0] h-[32px] min-h-px min-w-px relative rounded-[4px]" data-name="Input">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex items-center justify-between px-[8px] relative size-full">
          <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[#384857] text-[14px] whitespace-nowrap">
            <p className="leading-[20px]">None</p>
          </div>
          <div className="overflow-clip relative shrink-0 size-[24px]" data-name="24px/directional/chevron-down">
            <div className="absolute bottom-[37.5%] flex items-center justify-center left-1/4 right-1/4 top-[37.5%]">
              <div className="-rotate-90 flex-none h-[12px] w-[6px]">
                <div className="relative size-full" data-name="Vector">
                  <div className="absolute inset-[-8.84%_-17.68%]">
                    <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 8.12132 14.1213">
                      <path d={svgPaths.p5cbda00} id="Vector" stroke="var(--stroke-0, black)" strokeLinecap="square" strokeWidth="1.5" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function DropdownSelectInput1() {
  return (
    <div className="content-stretch flex flex-[1_0_0] items-start justify-between min-h-px min-w-px relative" data-name="Dropdown Select / Input">
      <Input1 />
    </div>
  );
}

function SheetsName3() {
  return (
    <div className="bg-[#e5e7e9] h-[44px] relative shrink-0 w-full" data-name="Sheets Name">
      <div className="flex flex-row items-center overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex items-center px-[10px] relative size-full">
          <DropdownSelectInput1 />
        </div>
      </div>
      <div aria-hidden="true" className="absolute border-[#d9d9d9] border-b border-solid inset-0 pointer-events-none" />
    </div>
  );
}

function Frame3() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full">
      <SheetsName2 />
      <SheetsName3 />
    </div>
  );
}

function Filter2() {
  return (
    <div className="bg-white content-stretch flex flex-col items-center overflow-clip relative rounded-[4px] shadow-[0px_1px_1px_0px_rgba(9,30,66,0.25),0px_0px_1px_0px_rgba(9,30,66,0.31)] shrink-0 w-full" data-name="Filter">
      <Frame3 />
    </div>
  );
}

function FilterItem1() {
  return (
    <div className="bg-[#fafafa] relative shrink-0 w-full" data-name="Filter Item">
      <div className="flex flex-col items-center overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex flex-col items-center px-[12px] py-[6px] relative w-full">
          <Filter2 />
        </div>
      </div>
    </div>
  );
}

function Group5() {
  return (
    <div className="absolute inset-[20.83%_8.33%]">
      <div className="absolute inset-[-5.36%_-4.19%]">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 21.6771 15.5">
          <g id="Group 117">
            <path d={svgPaths.p37c6c380} id="Vector 127" stroke="var(--stroke-0, white)" strokeWidth="1.5" />
            <circle cx="10.8385" cy="7.75" id="Ellipse 38" r="4" stroke="var(--stroke-0, white)" strokeWidth="1.5" />
          </g>
        </svg>
      </div>
    </div>
  );
}

function Content4() {
  return (
    <div className="content-stretch flex gap-[4px] h-[24px] items-center overflow-clip relative shrink-0" data-name="content">
      <div className="overflow-clip relative shrink-0 size-[24px]" data-name="24px/app/eye">
        <Group5 />
      </div>
      <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[14px] text-white whitespace-nowrap">
        <p className="leading-[20px]">Show</p>
      </div>
    </div>
  );
}

function SegmentedButton4() {
  return (
    <div className="bg-[#616d79] flex-[1_0_0] h-[24px] min-h-px min-w-px relative rounded-bl-[4px] rounded-tl-[4px]" data-name="Segmented Button">
      <div className="flex flex-col items-center justify-center size-full">
        <div className="content-stretch flex flex-col items-center justify-center px-[12px] relative size-full">
          <Content4 />
        </div>
      </div>
    </div>
  );
}

function Group6() {
  return (
    <div className="absolute inset-[16.67%_8.33%]">
      <div className="absolute inset-[-3.31%_-4.19%]">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 21.6771 17.0607">
          <g id="Group 117">
            <path d={svgPaths.p1b690600} id="Vector 127" stroke="var(--stroke-0, #C3C7CC)" strokeWidth="1.5" />
            <path d={svgPaths.p1fa727c0} id="Ellipse 38" stroke="var(--stroke-0, #C3C7CC)" strokeWidth="1.5" />
            <path d={svgPaths.p15a67080} id="Vector 128" stroke="var(--stroke-0, #C3C7CC)" strokeWidth="1.5" />
          </g>
        </svg>
      </div>
    </div>
  );
}

function Content5() {
  return (
    <div className="content-stretch flex gap-[4px] h-[24px] items-center overflow-clip relative shrink-0" data-name="content">
      <div className="overflow-clip relative shrink-0 size-[24px]" data-name="24px/app/eye-off">
        <Group6 />
      </div>
      <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[#c3c7cc] text-[14px] whitespace-nowrap">
        <p className="leading-[20px]">Hide</p>
      </div>
    </div>
  );
}

function SegmentedButton5() {
  return (
    <div className="bg-[#f2f3f4] flex-[1_0_0] h-[24px] min-h-px min-w-px relative rounded-br-[4px] rounded-tr-[4px]" data-name="Segmented Button">
      <div className="flex flex-col items-center justify-center size-full">
        <div className="content-stretch flex flex-col items-center justify-center px-[12px] relative size-full">
          <Content5 />
        </div>
      </div>
    </div>
  );
}

function SegmentedButtonsGroup2() {
  return (
    <div className="content-stretch flex h-[24px] items-center relative rounded-[4px] shrink-0 w-[197.5px]" data-name="Segmented Buttons Group">
      <SegmentedButton4 />
      <SegmentedButton5 />
    </div>
  );
}

function SheetsName4() {
  return (
    <div className="bg-[#e5e7e9] h-[36px] relative shrink-0 w-full" data-name="Sheets Name">
      <div className="flex flex-row items-center justify-end overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex items-center justify-end pl-[12px] pr-[10px] relative size-full">
          <div className="flex flex-[1_0_0] flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] min-h-px min-w-px not-italic relative text-[#262626] text-[14px]">
            <p className="leading-[20px] whitespace-pre-wrap">Domain</p>
          </div>
          <SegmentedButtonsGroup2 />
        </div>
      </div>
    </div>
  );
}

function Input2() {
  return (
    <div className="bg-white flex-[1_0_0] h-[32px] min-h-px min-w-px relative rounded-[4px]" data-name="Input">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex items-center justify-between px-[8px] relative size-full">
          <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[#384857] text-[14px] whitespace-nowrap">
            <p className="leading-[20px]">None</p>
          </div>
          <div className="overflow-clip relative shrink-0 size-[24px]" data-name="24px/directional/chevron-down">
            <div className="absolute bottom-[37.5%] flex items-center justify-center left-1/4 right-1/4 top-[37.5%]">
              <div className="-rotate-90 flex-none h-[12px] w-[6px]">
                <div className="relative size-full" data-name="Vector">
                  <div className="absolute inset-[-8.84%_-17.68%]">
                    <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 8.12132 14.1213">
                      <path d={svgPaths.p5cbda00} id="Vector" stroke="var(--stroke-0, black)" strokeLinecap="square" strokeWidth="1.5" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function DropdownSelectInput2() {
  return (
    <div className="content-stretch flex flex-[1_0_0] items-start justify-between min-h-px min-w-px relative" data-name="Dropdown Select / Input">
      <Input2 />
    </div>
  );
}

function SheetsName5() {
  return (
    <div className="bg-[#e5e7e9] h-[44px] relative shrink-0 w-full" data-name="Sheets Name">
      <div className="flex flex-row items-center overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex items-center px-[10px] relative size-full">
          <DropdownSelectInput2 />
        </div>
      </div>
      <div aria-hidden="true" className="absolute border-[#d9d9d9] border-b border-solid inset-0 pointer-events-none" />
    </div>
  );
}

function Frame4() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full">
      <SheetsName4 />
      <SheetsName5 />
    </div>
  );
}

function Filter3() {
  return (
    <div className="bg-white content-stretch flex flex-col items-center overflow-clip relative rounded-[4px] shadow-[0px_1px_1px_0px_rgba(9,30,66,0.25),0px_0px_1px_0px_rgba(9,30,66,0.31)] shrink-0 w-full" data-name="Filter">
      <Frame4 />
    </div>
  );
}

function FilterItem2() {
  return (
    <div className="bg-[#fafafa] relative shrink-0 w-full" data-name="Filter Item">
      <div className="flex flex-col items-center overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex flex-col items-center px-[12px] py-[6px] relative w-full">
          <Filter3 />
        </div>
      </div>
    </div>
  );
}

function Group7() {
  return (
    <div className="absolute inset-[20.83%_8.33%]">
      <div className="absolute inset-[-5.36%_-4.19%]">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 21.6771 15.5">
          <g id="Group 117">
            <path d={svgPaths.p37c6c380} id="Vector 127" stroke="var(--stroke-0, white)" strokeWidth="1.5" />
            <circle cx="10.8385" cy="7.75" id="Ellipse 38" r="4" stroke="var(--stroke-0, white)" strokeWidth="1.5" />
          </g>
        </svg>
      </div>
    </div>
  );
}

function Content6() {
  return (
    <div className="content-stretch flex gap-[4px] h-[24px] items-center overflow-clip relative shrink-0" data-name="content">
      <div className="overflow-clip relative shrink-0 size-[24px]" data-name="24px/app/eye">
        <Group7 />
      </div>
      <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[14px] text-white whitespace-nowrap">
        <p className="leading-[20px]">Show</p>
      </div>
    </div>
  );
}

function SegmentedButton6() {
  return (
    <div className="bg-[#616d79] flex-[1_0_0] h-[24px] min-h-px min-w-px relative rounded-bl-[4px] rounded-tl-[4px]" data-name="Segmented Button">
      <div className="flex flex-col items-center justify-center size-full">
        <div className="content-stretch flex flex-col items-center justify-center px-[12px] relative size-full">
          <Content6 />
        </div>
      </div>
    </div>
  );
}

function Group8() {
  return (
    <div className="absolute inset-[16.67%_8.33%]">
      <div className="absolute inset-[-3.31%_-4.19%]">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 21.6771 17.0607">
          <g id="Group 117">
            <path d={svgPaths.p1b690600} id="Vector 127" stroke="var(--stroke-0, #C3C7CC)" strokeWidth="1.5" />
            <path d={svgPaths.p1fa727c0} id="Ellipse 38" stroke="var(--stroke-0, #C3C7CC)" strokeWidth="1.5" />
            <path d={svgPaths.p15a67080} id="Vector 128" stroke="var(--stroke-0, #C3C7CC)" strokeWidth="1.5" />
          </g>
        </svg>
      </div>
    </div>
  );
}

function Content7() {
  return (
    <div className="content-stretch flex gap-[4px] h-[24px] items-center overflow-clip relative shrink-0" data-name="content">
      <div className="overflow-clip relative shrink-0 size-[24px]" data-name="24px/app/eye-off">
        <Group8 />
      </div>
      <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[#c3c7cc] text-[14px] whitespace-nowrap">
        <p className="leading-[20px]">Hide</p>
      </div>
    </div>
  );
}

function SegmentedButton7() {
  return (
    <div className="bg-[#f2f3f4] flex-[1_0_0] h-[24px] min-h-px min-w-px relative rounded-br-[4px] rounded-tr-[4px]" data-name="Segmented Button">
      <div className="flex flex-col items-center justify-center size-full">
        <div className="content-stretch flex flex-col items-center justify-center px-[12px] relative size-full">
          <Content7 />
        </div>
      </div>
    </div>
  );
}

function SegmentedButtonsGroup3() {
  return (
    <div className="content-stretch flex h-[24px] items-center relative rounded-[4px] shrink-0 w-[197.5px]" data-name="Segmented Buttons Group">
      <SegmentedButton6 />
      <SegmentedButton7 />
    </div>
  );
}

function SheetsName6() {
  return (
    <div className="bg-[#e5e7e9] h-[36px] relative shrink-0 w-full" data-name="Sheets Name">
      <div className="flex flex-row items-center justify-end overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex items-center justify-end pl-[12px] pr-[10px] relative size-full">
          <div className="flex flex-[1_0_0] flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] min-h-px min-w-px not-italic relative text-[#262626] text-[14px]">
            <p className="leading-[20px] whitespace-pre-wrap">Job Title</p>
          </div>
          <SegmentedButtonsGroup3 />
        </div>
      </div>
    </div>
  );
}

function Input3() {
  return (
    <div className="bg-white flex-[1_0_0] h-[32px] min-h-px min-w-px relative rounded-[4px]" data-name="Input">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex items-center justify-between px-[8px] relative size-full">
          <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[#384857] text-[14px] whitespace-nowrap">
            <p className="leading-[20px]">None</p>
          </div>
          <div className="overflow-clip relative shrink-0 size-[24px]" data-name="24px/directional/chevron-down">
            <div className="absolute bottom-[37.5%] flex items-center justify-center left-1/4 right-1/4 top-[37.5%]">
              <div className="-rotate-90 flex-none h-[12px] w-[6px]">
                <div className="relative size-full" data-name="Vector">
                  <div className="absolute inset-[-8.84%_-17.68%]">
                    <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 8.12132 14.1213">
                      <path d={svgPaths.p5cbda00} id="Vector" stroke="var(--stroke-0, black)" strokeLinecap="square" strokeWidth="1.5" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function DropdownSelectInput3() {
  return (
    <div className="content-stretch flex flex-[1_0_0] items-start justify-between min-h-px min-w-px relative" data-name="Dropdown Select / Input">
      <Input3 />
    </div>
  );
}

function SheetsName7() {
  return (
    <div className="bg-[#e5e7e9] h-[44px] relative shrink-0 w-full" data-name="Sheets Name">
      <div className="flex flex-row items-center overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex items-center px-[10px] relative size-full">
          <DropdownSelectInput3 />
        </div>
      </div>
      <div aria-hidden="true" className="absolute border-[#d9d9d9] border-b border-solid inset-0 pointer-events-none" />
    </div>
  );
}

function Frame5() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full">
      <SheetsName6 />
      <SheetsName7 />
    </div>
  );
}

function Filter4() {
  return (
    <div className="bg-white content-stretch flex flex-col items-center overflow-clip relative rounded-[4px] shadow-[0px_1px_1px_0px_rgba(9,30,66,0.25),0px_0px_1px_0px_rgba(9,30,66,0.31)] shrink-0 w-full" data-name="Filter">
      <Frame5 />
    </div>
  );
}

function FilterItem3() {
  return (
    <div className="bg-[#fafafa] relative shrink-0 w-full" data-name="Filter Item">
      <div className="flex flex-col items-center overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex flex-col items-center px-[12px] py-[6px] relative w-full">
          <Filter4 />
        </div>
      </div>
    </div>
  );
}

function Group9() {
  return (
    <div className="absolute inset-[20.83%_8.33%]">
      <div className="absolute inset-[-5.36%_-4.19%]">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 21.6771 15.5">
          <g id="Group 117">
            <path d={svgPaths.p37c6c380} id="Vector 127" stroke="var(--stroke-0, white)" strokeWidth="1.5" />
            <circle cx="10.8385" cy="7.75" id="Ellipse 38" r="4" stroke="var(--stroke-0, white)" strokeWidth="1.5" />
          </g>
        </svg>
      </div>
    </div>
  );
}

function Content8() {
  return (
    <div className="content-stretch flex gap-[4px] h-[24px] items-center overflow-clip relative shrink-0" data-name="content">
      <div className="overflow-clip relative shrink-0 size-[24px]" data-name="24px/app/eye">
        <Group9 />
      </div>
      <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[14px] text-white whitespace-nowrap">
        <p className="leading-[20px]">Show</p>
      </div>
    </div>
  );
}

function SegmentedButton8() {
  return (
    <div className="bg-[#616d79] flex-[1_0_0] h-[24px] min-h-px min-w-px relative rounded-bl-[4px] rounded-tl-[4px]" data-name="Segmented Button">
      <div className="flex flex-col items-center justify-center size-full">
        <div className="content-stretch flex flex-col items-center justify-center px-[12px] relative size-full">
          <Content8 />
        </div>
      </div>
    </div>
  );
}

function Group10() {
  return (
    <div className="absolute inset-[16.67%_8.33%]">
      <div className="absolute inset-[-3.31%_-4.19%]">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 21.6771 17.0607">
          <g id="Group 117">
            <path d={svgPaths.p1b690600} id="Vector 127" stroke="var(--stroke-0, #C3C7CC)" strokeWidth="1.5" />
            <path d={svgPaths.p1fa727c0} id="Ellipse 38" stroke="var(--stroke-0, #C3C7CC)" strokeWidth="1.5" />
            <path d={svgPaths.p15a67080} id="Vector 128" stroke="var(--stroke-0, #C3C7CC)" strokeWidth="1.5" />
          </g>
        </svg>
      </div>
    </div>
  );
}

function Content9() {
  return (
    <div className="content-stretch flex gap-[4px] h-[24px] items-center overflow-clip relative shrink-0" data-name="content">
      <div className="overflow-clip relative shrink-0 size-[24px]" data-name="24px/app/eye-off">
        <Group10 />
      </div>
      <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[#c3c7cc] text-[14px] whitespace-nowrap">
        <p className="leading-[20px]">Hide</p>
      </div>
    </div>
  );
}

function SegmentedButton9() {
  return (
    <div className="bg-[#f2f3f4] flex-[1_0_0] h-[24px] min-h-px min-w-px relative rounded-br-[4px] rounded-tr-[4px]" data-name="Segmented Button">
      <div className="flex flex-col items-center justify-center size-full">
        <div className="content-stretch flex flex-col items-center justify-center px-[12px] relative size-full">
          <Content9 />
        </div>
      </div>
    </div>
  );
}

function SegmentedButtonsGroup4() {
  return (
    <div className="content-stretch flex h-[24px] items-center relative rounded-[4px] shrink-0 w-[197.5px]" data-name="Segmented Buttons Group">
      <SegmentedButton8 />
      <SegmentedButton9 />
    </div>
  );
}

function SheetsName8() {
  return (
    <div className="bg-[#e5e7e9] h-[36px] relative shrink-0 w-full" data-name="Sheets Name">
      <div className="flex flex-row items-center justify-end overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex items-center justify-end pl-[12px] pr-[10px] relative size-full">
          <div className="flex flex-[1_0_0] flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] min-h-px min-w-px not-italic relative text-[#262626] text-[14px]">
            <p className="leading-[20px] whitespace-pre-wrap">Status</p>
          </div>
          <SegmentedButtonsGroup4 />
        </div>
      </div>
    </div>
  );
}

function Input4() {
  return (
    <div className="bg-white flex-[1_0_0] h-[32px] min-h-px min-w-px relative rounded-[4px]" data-name="Input">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex items-center justify-between px-[8px] relative size-full">
          <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[#384857] text-[14px] whitespace-nowrap">
            <p className="leading-[20px]">None</p>
          </div>
          <div className="overflow-clip relative shrink-0 size-[24px]" data-name="24px/directional/chevron-down">
            <div className="absolute bottom-[37.5%] flex items-center justify-center left-1/4 right-1/4 top-[37.5%]">
              <div className="-rotate-90 flex-none h-[12px] w-[6px]">
                <div className="relative size-full" data-name="Vector">
                  <div className="absolute inset-[-8.84%_-17.68%]">
                    <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 8.12132 14.1213">
                      <path d={svgPaths.p5cbda00} id="Vector" stroke="var(--stroke-0, black)" strokeLinecap="square" strokeWidth="1.5" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function DropdownSelectInput4() {
  return (
    <div className="content-stretch flex flex-[1_0_0] items-start justify-between min-h-px min-w-px relative" data-name="Dropdown Select / Input">
      <Input4 />
    </div>
  );
}

function SheetsName9() {
  return (
    <div className="bg-[#e5e7e9] h-[44px] relative shrink-0 w-full" data-name="Sheets Name">
      <div className="flex flex-row items-center overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex items-center px-[10px] relative size-full">
          <DropdownSelectInput4 />
        </div>
      </div>
      <div aria-hidden="true" className="absolute border-[#d9d9d9] border-b border-solid inset-0 pointer-events-none" />
    </div>
  );
}

function Frame6() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full">
      <SheetsName8 />
      <SheetsName9 />
    </div>
  );
}

function Filter5() {
  return (
    <div className="bg-white content-stretch flex flex-col items-center overflow-clip relative rounded-[4px] shadow-[0px_1px_1px_0px_rgba(9,30,66,0.25),0px_0px_1px_0px_rgba(9,30,66,0.31)] shrink-0 w-full" data-name="Filter">
      <Frame6 />
    </div>
  );
}

function FilterItem4() {
  return (
    <div className="bg-[#fafafa] relative shrink-0 w-full" data-name="Filter Item">
      <div className="flex flex-col items-center overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex flex-col items-center px-[12px] py-[6px] relative w-full">
          <Filter5 />
        </div>
      </div>
    </div>
  );
}

function Group11() {
  return (
    <div className="absolute inset-[20.83%_8.33%]">
      <div className="absolute inset-[-5.36%_-4.19%]">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 21.6771 15.5">
          <g id="Group 117">
            <path d={svgPaths.p37c6c380} id="Vector 127" stroke="var(--stroke-0, white)" strokeWidth="1.5" />
            <circle cx="10.8385" cy="7.75" id="Ellipse 38" r="4" stroke="var(--stroke-0, white)" strokeWidth="1.5" />
          </g>
        </svg>
      </div>
    </div>
  );
}

function Content10() {
  return (
    <div className="content-stretch flex gap-[4px] h-[24px] items-center overflow-clip relative shrink-0" data-name="content">
      <div className="overflow-clip relative shrink-0 size-[24px]" data-name="24px/app/eye">
        <Group11 />
      </div>
      <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[14px] text-white whitespace-nowrap">
        <p className="leading-[20px]">Show</p>
      </div>
    </div>
  );
}

function SegmentedButton10() {
  return (
    <div className="bg-[#616d79] flex-[1_0_0] h-[24px] min-h-px min-w-px relative rounded-bl-[4px] rounded-tl-[4px]" data-name="Segmented Button">
      <div className="flex flex-col items-center justify-center size-full">
        <div className="content-stretch flex flex-col items-center justify-center px-[12px] relative size-full">
          <Content10 />
        </div>
      </div>
    </div>
  );
}

function Group12() {
  return (
    <div className="absolute inset-[16.67%_8.33%]">
      <div className="absolute inset-[-3.31%_-4.19%]">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 21.6771 17.0607">
          <g id="Group 117">
            <path d={svgPaths.p1b690600} id="Vector 127" stroke="var(--stroke-0, #C3C7CC)" strokeWidth="1.5" />
            <path d={svgPaths.p1fa727c0} id="Ellipse 38" stroke="var(--stroke-0, #C3C7CC)" strokeWidth="1.5" />
            <path d={svgPaths.p15a67080} id="Vector 128" stroke="var(--stroke-0, #C3C7CC)" strokeWidth="1.5" />
          </g>
        </svg>
      </div>
    </div>
  );
}

function Content11() {
  return (
    <div className="content-stretch flex gap-[4px] h-[24px] items-center overflow-clip relative shrink-0" data-name="content">
      <div className="overflow-clip relative shrink-0 size-[24px]" data-name="24px/app/eye-off">
        <Group12 />
      </div>
      <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[#c3c7cc] text-[14px] whitespace-nowrap">
        <p className="leading-[20px]">Hide</p>
      </div>
    </div>
  );
}

function SegmentedButton11() {
  return (
    <div className="bg-[#f2f3f4] flex-[1_0_0] h-[24px] min-h-px min-w-px relative rounded-br-[4px] rounded-tr-[4px]" data-name="Segmented Button">
      <div className="flex flex-col items-center justify-center size-full">
        <div className="content-stretch flex flex-col items-center justify-center px-[12px] relative size-full">
          <Content11 />
        </div>
      </div>
    </div>
  );
}

function SegmentedButtonsGroup5() {
  return (
    <div className="content-stretch flex h-[24px] items-center relative rounded-[4px] shrink-0 w-[197.5px]" data-name="Segmented Buttons Group">
      <SegmentedButton10 />
      <SegmentedButton11 />
    </div>
  );
}

function SheetsName10() {
  return (
    <div className="bg-[#e5e7e9] h-[36px] relative shrink-0 w-full" data-name="Sheets Name">
      <div className="flex flex-row items-center justify-end overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex items-center justify-end pl-[12px] pr-[10px] relative size-full">
          <div className="flex flex-[1_0_0] flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] min-h-px min-w-px not-italic relative text-[#262626] text-[14px]">
            <p className="leading-[20px] whitespace-pre-wrap">Permission Type</p>
          </div>
          <SegmentedButtonsGroup5 />
        </div>
      </div>
    </div>
  );
}

function Input5() {
  return (
    <div className="bg-white flex-[1_0_0] h-[32px] min-h-px min-w-px relative rounded-[4px]" data-name="Input">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex items-center justify-between px-[8px] relative size-full">
          <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[#384857] text-[14px] whitespace-nowrap">
            <p className="leading-[20px]">None</p>
          </div>
          <div className="overflow-clip relative shrink-0 size-[24px]" data-name="24px/directional/chevron-down">
            <div className="absolute bottom-[37.5%] flex items-center justify-center left-1/4 right-1/4 top-[37.5%]">
              <div className="-rotate-90 flex-none h-[12px] w-[6px]">
                <div className="relative size-full" data-name="Vector">
                  <div className="absolute inset-[-8.84%_-17.68%]">
                    <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 8.12132 14.1213">
                      <path d={svgPaths.p5cbda00} id="Vector" stroke="var(--stroke-0, black)" strokeLinecap="square" strokeWidth="1.5" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function DropdownSelectInput5() {
  return (
    <div className="content-stretch flex flex-[1_0_0] items-start justify-between min-h-px min-w-px relative" data-name="Dropdown Select / Input">
      <Input5 />
    </div>
  );
}

function SheetsName11() {
  return (
    <div className="bg-[#e5e7e9] h-[44px] relative shrink-0 w-full" data-name="Sheets Name">
      <div className="flex flex-row items-center overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex items-center px-[10px] relative size-full">
          <DropdownSelectInput5 />
        </div>
      </div>
      <div aria-hidden="true" className="absolute border-[#d9d9d9] border-b border-solid inset-0 pointer-events-none" />
    </div>
  );
}

function Frame7() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full">
      <SheetsName10 />
      <SheetsName11 />
    </div>
  );
}

function Filter6() {
  return (
    <div className="bg-white content-stretch flex flex-col items-center overflow-clip relative rounded-[4px] shadow-[0px_1px_1px_0px_rgba(9,30,66,0.25),0px_0px_1px_0px_rgba(9,30,66,0.31)] shrink-0 w-full" data-name="Filter">
      <Frame7 />
    </div>
  );
}

function FilterItem5() {
  return (
    <div className="bg-[#fafafa] relative shrink-0 w-full" data-name="Filter Item">
      <div className="flex flex-col items-center overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex flex-col items-center px-[12px] py-[6px] relative w-full">
          <Filter6 />
        </div>
      </div>
    </div>
  );
}

function Group13() {
  return (
    <div className="absolute inset-[20.83%_8.33%]">
      <div className="absolute inset-[-5.36%_-4.19%]">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 21.6771 15.5">
          <g id="Group 117">
            <path d={svgPaths.p37c6c380} id="Vector 127" stroke="var(--stroke-0, white)" strokeWidth="1.5" />
            <circle cx="10.8385" cy="7.75" id="Ellipse 38" r="4" stroke="var(--stroke-0, white)" strokeWidth="1.5" />
          </g>
        </svg>
      </div>
    </div>
  );
}

function Content12() {
  return (
    <div className="content-stretch flex gap-[4px] h-[24px] items-center overflow-clip relative shrink-0" data-name="content">
      <div className="overflow-clip relative shrink-0 size-[24px]" data-name="24px/app/eye">
        <Group13 />
      </div>
      <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[14px] text-white whitespace-nowrap">
        <p className="leading-[20px]">Show</p>
      </div>
    </div>
  );
}

function SegmentedButton12() {
  return (
    <div className="bg-[#616d79] flex-[1_0_0] h-[24px] min-h-px min-w-px relative rounded-bl-[4px] rounded-tl-[4px]" data-name="Segmented Button">
      <div className="flex flex-col items-center justify-center size-full">
        <div className="content-stretch flex flex-col items-center justify-center px-[12px] relative size-full">
          <Content12 />
        </div>
      </div>
    </div>
  );
}

function Group14() {
  return (
    <div className="absolute inset-[16.67%_8.33%]">
      <div className="absolute inset-[-3.31%_-4.19%]">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 21.6771 17.0607">
          <g id="Group 117">
            <path d={svgPaths.p1b690600} id="Vector 127" stroke="var(--stroke-0, #C3C7CC)" strokeWidth="1.5" />
            <path d={svgPaths.p1fa727c0} id="Ellipse 38" stroke="var(--stroke-0, #C3C7CC)" strokeWidth="1.5" />
            <path d={svgPaths.p15a67080} id="Vector 128" stroke="var(--stroke-0, #C3C7CC)" strokeWidth="1.5" />
          </g>
        </svg>
      </div>
    </div>
  );
}

function Content13() {
  return (
    <div className="content-stretch flex gap-[4px] h-[24px] items-center overflow-clip relative shrink-0" data-name="content">
      <div className="overflow-clip relative shrink-0 size-[24px]" data-name="24px/app/eye-off">
        <Group14 />
      </div>
      <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[#c3c7cc] text-[14px] whitespace-nowrap">
        <p className="leading-[20px]">Hide</p>
      </div>
    </div>
  );
}

function SegmentedButton13() {
  return (
    <div className="bg-[#f2f3f4] flex-[1_0_0] h-[24px] min-h-px min-w-px relative rounded-br-[4px] rounded-tr-[4px]" data-name="Segmented Button">
      <div className="flex flex-col items-center justify-center size-full">
        <div className="content-stretch flex flex-col items-center justify-center px-[12px] relative size-full">
          <Content13 />
        </div>
      </div>
    </div>
  );
}

function SegmentedButtonsGroup6() {
  return (
    <div className="content-stretch flex h-[24px] items-center relative rounded-[4px] shrink-0 w-[197.5px]" data-name="Segmented Buttons Group">
      <SegmentedButton12 />
      <SegmentedButton13 />
    </div>
  );
}

function SheetsName12() {
  return (
    <div className="bg-[#e5e7e9] h-[36px] relative shrink-0 w-full" data-name="Sheets Name">
      <div className="flex flex-row items-center justify-end overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex items-center justify-end pl-[12px] pr-[10px] relative size-full">
          <div className="flex flex-[1_0_0] flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] min-h-px min-w-px not-italic relative text-[#262626] text-[14px]">
            <p className="leading-[20px] whitespace-pre-wrap">Access Level – Role</p>
          </div>
          <SegmentedButtonsGroup6 />
        </div>
      </div>
    </div>
  );
}

function Input6() {
  return (
    <div className="bg-white flex-[1_0_0] h-[32px] min-h-px min-w-px relative rounded-[4px]" data-name="Input">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex items-center justify-between px-[8px] relative size-full">
          <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[#384857] text-[14px] whitespace-nowrap">
            <p className="leading-[20px]">None</p>
          </div>
          <div className="overflow-clip relative shrink-0 size-[24px]" data-name="24px/directional/chevron-down">
            <div className="absolute bottom-[37.5%] flex items-center justify-center left-1/4 right-1/4 top-[37.5%]">
              <div className="-rotate-90 flex-none h-[12px] w-[6px]">
                <div className="relative size-full" data-name="Vector">
                  <div className="absolute inset-[-8.84%_-17.68%]">
                    <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 8.12132 14.1213">
                      <path d={svgPaths.p5cbda00} id="Vector" stroke="var(--stroke-0, black)" strokeLinecap="square" strokeWidth="1.5" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function DropdownSelectInput6() {
  return (
    <div className="content-stretch flex flex-[1_0_0] items-start justify-between min-h-px min-w-px relative" data-name="Dropdown Select / Input">
      <Input6 />
    </div>
  );
}

function SheetsName13() {
  return (
    <div className="bg-[#e5e7e9] h-[44px] relative shrink-0 w-full" data-name="Sheets Name">
      <div className="flex flex-row items-center overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex items-center px-[10px] relative size-full">
          <DropdownSelectInput6 />
        </div>
      </div>
      <div aria-hidden="true" className="absolute border-[#d9d9d9] border-b border-solid inset-0 pointer-events-none" />
    </div>
  );
}

function Frame8() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full">
      <SheetsName12 />
      <SheetsName13 />
    </div>
  );
}

function Filter7() {
  return (
    <div className="bg-white content-stretch flex flex-col items-center overflow-clip relative rounded-[4px] shadow-[0px_1px_1px_0px_rgba(9,30,66,0.25),0px_0px_1px_0px_rgba(9,30,66,0.31)] shrink-0 w-full" data-name="Filter">
      <Frame8 />
    </div>
  );
}

function FilterItem6() {
  return (
    <div className="bg-[#fafafa] relative shrink-0 w-full" data-name="Filter Item">
      <div className="flex flex-col items-center overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex flex-col items-center px-[12px] py-[6px] relative w-full">
          <Filter7 />
        </div>
      </div>
    </div>
  );
}

function Frame() {
  return (
    <div className="bg-white content-stretch flex flex-col items-start relative shrink-0 w-full">
      <Headline />
      <FilterItem />
      <FilterItem1 />
      <FilterItem2 />
      <FilterItem3 />
      <FilterItem4 />
      <FilterItem5 />
      <FilterItem6 />
    </div>
  );
}

function Content14() {
  return (
    <div className="content-stretch flex gap-[4px] h-[40px] items-center justify-center overflow-clip px-[16px] relative rounded-[4px] shrink-0" data-name="content">
      <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[#384857] text-[16px] text-center whitespace-nowrap">
        <p className="leading-[22px]">Reset All</p>
      </div>
    </div>
  );
}

function Content15() {
  return (
    <div className="bg-[#ff4d00] content-stretch flex gap-[4px] h-[40px] items-center justify-center overflow-clip px-[16px] relative rounded-[4px] shrink-0" data-name="content">
      <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[16px] text-center text-white whitespace-nowrap">
        <p className="leading-[22px]">Apply</p>
      </div>
    </div>
  );
}

function Group15() {
  return (
    <div className="grid-cols-[max-content] grid-rows-[max-content] inline-grid leading-[0] place-items-start relative shrink-0">
      <div className="col-1 content-stretch flex flex-col items-center justify-center ml-0 mt-0 py-[2px] relative row-1" data-name="Button">
        <Content15 />
      </div>
    </div>
  );
}

function Frame9() {
  return (
    <div className="content-stretch flex flex-[1_0_0] items-center justify-between min-h-px min-w-px relative">
      <div className="content-stretch flex flex-col items-center justify-center py-[2px] relative shrink-0" data-name="Button">
        <Content14 />
      </div>
      <Group15 />
    </div>
  );
}

function Footer() {
  return (
    <div className="bg-[#f0f0f0] h-[56px] relative shrink-0 w-full" data-name="Footer">
      <div aria-hidden="true" className="absolute border-[#d9d9d9] border-b-[1.067px] border-solid inset-0 pointer-events-none" />
      <div className="flex flex-row items-center justify-center size-full">
        <div className="content-stretch flex items-center justify-center px-[24px] py-px relative size-full">
          <Frame9 />
        </div>
      </div>
    </div>
  );
}

function Frame1() {
  return (
    <div className="bg-white content-stretch flex flex-[1_0_0] flex-col items-start justify-between min-h-px min-w-px relative w-full">
      <Frame />
      <Footer />
    </div>
  );
}

export default function Filter() {
  return (
    <div className="bg-white content-stretch flex flex-col items-start relative shadow-[4px_4px_4px_0px_rgba(0,0,0,0.25)] size-full" data-name="Filter">
      <Frame1 />
    </div>
  );
}