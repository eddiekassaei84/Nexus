import svgPaths from "./svg-goafpqilkt";

function Frame() {
  return (
    <div className="content-stretch flex items-center relative shrink-0">
      <p className="font-['Inter:Bold',sans-serif] font-bold leading-[44px] not-italic relative shrink-0 text-[#1d2c38] text-[38px] whitespace-nowrap">{`Reference Data `}</p>
    </div>
  );
}

function TableItemRowItem() {
  return (
    <div className="flex-[1_0_0] h-[44px] min-h-px min-w-px relative" data-name="Table Item / Row Item">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex items-center pl-[48px] pr-[24px] py-[4px] relative size-full">
          <Frame />
        </div>
      </div>
    </div>
  );
}

function Row() {
  return (
    <div className="bg-white content-stretch flex h-[96px] items-center relative shrink-0 w-full z-[4]" data-name="Row">
      <div aria-hidden="true" className="absolute border-[#d9d9d9] border-b border-solid inset-0 pointer-events-none" />
      <TableItemRowItem />
    </div>
  );
}

function TabName() {
  return (
    <div className="content-stretch flex flex-[1_0_0] items-center min-h-px min-w-px px-[16px] relative" data-name="Tab Name">
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[24px] not-italic relative shrink-0 text-[#384857] text-[16px] whitespace-nowrap">Trade</p>
    </div>
  );
}

function TabItem() {
  return (
    <div className="bg-[#f0f0f0] content-stretch flex flex-col h-full items-center min-w-[120px] relative rounded-tl-[4px] rounded-tr-[4px] shrink-0" data-name="Tab Item">
      <TabName />
    </div>
  );
}

function TabName1() {
  return (
    <div className="content-stretch flex h-[44px] items-center px-[16px] relative shrink-0" data-name="Tab Name">
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[22px] not-italic relative shrink-0 text-[#384857] text-[16px] whitespace-nowrap">Work Packages</p>
    </div>
  );
}

function TabItem1() {
  return (
    <div className="bg-[#f0f0f0] content-stretch flex flex-col h-full items-center min-w-[120px] relative rounded-tl-[4px] rounded-tr-[4px] shrink-0" data-name="Tab Item">
      <TabName1 />
    </div>
  );
}

function TabName2() {
  return (
    <div className="content-stretch flex h-[44px] items-center px-[16px] relative shrink-0" data-name="Tab Name">
      <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[24px] not-italic relative shrink-0 text-[#384857] text-[16px] whitespace-nowrap">Assembly</p>
    </div>
  );
}

function TabItem2() {
  return (
    <div className="bg-[#f0f0f0] content-stretch flex flex-col h-full items-center min-w-[120px] relative rounded-tl-[4px] rounded-tr-[4px] shrink-0" data-name="Tab Item">
      <div aria-hidden="true" className="absolute border-[#ff4d00] border-b-3 border-solid inset-0 pointer-events-none rounded-tl-[4px] rounded-tr-[4px]" />
      <TabName2 />
    </div>
  );
}

function TabName3() {
  return (
    <div className="content-stretch flex h-[44px] items-center px-[16px] relative shrink-0" data-name="Tab Name">
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[22px] not-italic relative shrink-0 text-[#384857] text-[16px] whitespace-nowrap">Systems</p>
    </div>
  );
}

function TabItem3() {
  return (
    <div className="bg-[#f0f0f0] content-stretch flex flex-col h-full items-center min-w-[120px] relative rounded-tl-[4px] rounded-tr-[4px] shrink-0" data-name="Tab Item">
      <TabName3 />
    </div>
  );
}

function Group1() {
  return (
    <div className="absolute inset-[15.62%_15.63%_15.63%_15.62%]">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 22 22">
        <g id="Group 33">
          <path d="M0 11H22" id="Vector 19" stroke="var(--stroke-0, #FF4D00)" strokeWidth="2" />
          <path d={svgPaths.p52bfb00} id="Vector 20" stroke="var(--stroke-0, #FF4D00)" strokeWidth="2" />
        </g>
      </svg>
    </div>
  );
}

function TabName4() {
  return (
    <div className="content-stretch flex h-[44px] items-center px-[16px] relative shrink-0" data-name="Tab Name">
      <div className="overflow-clip relative shrink-0 size-[32px]" data-name="32px/suggested/plus">
        <Group1 />
      </div>
    </div>
  );
}

function TabItem4() {
  return (
    <div className="bg-[#f0f0f0] content-stretch flex flex-col h-full items-center min-w-[56px] relative rounded-tl-[4px] rounded-tr-[4px] shrink-0 w-[56px]" data-name="Tab Item">
      <TabName4 />
    </div>
  );
}

function TabsGroup() {
  return (
    <div className="content-stretch flex gap-[6px] h-full items-center relative shrink-0" data-name="Tabs Group">
      <TabItem />
      <TabItem1 />
      <TabItem2 />
      <TabItem3 />
      <TabItem4 />
    </div>
  );
}

function Row2() {
  return (
    <div className="content-stretch flex flex-[1_0_0] h-[44px] items-end min-h-px min-w-px relative" data-name="Row">
      <TabsGroup />
    </div>
  );
}

function TableItemRowItem1() {
  return (
    <div className="flex-[1_0_0] h-full min-h-px min-w-px relative" data-name="Table Item / Row Item">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex items-center justify-between pt-[10px] relative size-full">
          <Row2 />
        </div>
      </div>
    </div>
  );
}

function Row1() {
  return (
    <div className="h-[56px] relative shrink-0 w-full z-[3]" data-name="Row">
      <div aria-hidden="true" className="absolute border-[#d9d9d9] border-b border-solid inset-0 pointer-events-none" />
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex items-center justify-between pl-[24px] pr-[48px] relative size-full">
          <TableItemRowItem1 />
        </div>
      </div>
    </div>
  );
}

function Group() {
  return (
    <div className="absolute inset-[8.33%]">
      <div className="absolute inset-[0_-2.65%_-2.65%_0]">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20.5302 20.5303">
          <g id="Group 16">
            <circle cx="8.31522" cy="8.31522" id="Ellipse 2" r="7.56522" stroke="var(--stroke-0, #616D79)" strokeLinecap="round" strokeWidth="1.5" />
            <path d="M14.1303 14.1304L19.9999 20" id="Vector 12" stroke="var(--stroke-0, #616D79)" strokeWidth="1.5" />
          </g>
        </svg>
      </div>
    </div>
  );
}

function Frame2() {
  return (
    <div className="content-stretch flex items-center relative shrink-0">
      <div className="bg-white content-stretch flex gap-[8px] h-[40px] items-center px-[8px] relative rounded-[4px] shrink-0 w-[363px]" data-name="Input Field">
        <div aria-hidden="true" className="absolute border border-[#d9d9d9] border-solid inset-0 pointer-events-none rounded-[4px]" />
        <div className="overflow-clip relative shrink-0 size-[24px]" data-name="24px/app/search">
          <Group />
        </div>
        <div className="flex flex-[1_0_0] flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] min-h-px min-w-px not-italic relative text-[#8c8c8c] text-[14px]">
          <p className="leading-[20px]">Search</p>
        </div>
      </div>
    </div>
  );
}

function Content() {
  return (
    <div className="content-stretch flex gap-[4px] h-[40px] items-center justify-center overflow-clip px-[16px] relative rounded-[4px] shrink-0" data-name="content">
      <div className="overflow-clip relative shrink-0 size-[24px]" data-name="chevron.down">
        <div className="absolute inset-[34.04%_22.22%_34.03%_22.19%]" data-name="chevron.down">
          <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 13.3418 7.66155">
            <path d={svgPaths.p3c147800} fill="var(--fill-0, #384857)" id="chevron.down" />
          </svg>
        </div>
      </div>
      <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[#384857] text-[16px] text-center whitespace-nowrap">
        <p className="leading-[22px]">Expand All</p>
      </div>
    </div>
  );
}

function Content1() {
  return (
    <div className="content-stretch flex gap-[4px] h-[40px] items-center justify-center overflow-clip px-[16px] relative rounded-[4px] shrink-0" data-name="content">
      <div className="overflow-clip relative shrink-0 size-[24px]" data-name="chevron.up">
        <div className="absolute inset-[31.69%_22.22%_36.39%_22.19%]" data-name="chevron.up">
          <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 13.3418 7.66155">
            <path d={svgPaths.pb96b700} fill="var(--fill-0, #616D79)" id="chevron.up" />
          </svg>
        </div>
      </div>
      <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[#384857] text-[16px] text-center whitespace-nowrap">
        <p className="leading-[22px]">Collapse All</p>
      </div>
    </div>
  );
}

function Row4() {
  return (
    <div className="content-stretch flex flex-[1_0_0] h-[44px] items-end min-h-px min-w-px relative" data-name="Row">
      <Frame2 />
      <div className="content-stretch flex flex-col h-[44px] items-center justify-center py-[2px] relative shrink-0" data-name="Button">
        <Content />
      </div>
      <div className="content-stretch flex flex-col h-[44px] items-center justify-center py-[2px] relative shrink-0" data-name="Button">
        <Content1 />
      </div>
    </div>
  );
}

function Content2() {
  return (
    <div className="content-stretch flex gap-[4px] h-[40px] items-center justify-center overflow-clip px-[16px] relative rounded-[4px] shrink-0" data-name="content">
      <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[#3b82f6] text-[0px] text-center whitespace-nowrap">
        <p className="[text-decoration-skip-ink:none] decoration-solid leading-[22px] text-[16px] underline">Download Import Template</p>
      </div>
    </div>
  );
}

function Group2() {
  return (
    <div className="absolute left-[2px] size-[20px] top-[2px]">
      <div className="absolute inset-[-3.75%_0_-3.75%_-3.75%]">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20.75 21.5">
          <g id="Group 106">
            <path d={svgPaths.p39b25880} id="Rectangle 1000" stroke="var(--stroke-0, #616D79)" strokeLinecap="square" strokeLinejoin="round" strokeWidth="1.5" />
            <g id="Group 92">
              <path d={svgPaths.p3c64cd90} id="Vector 8" stroke="var(--stroke-0, #616D79)" strokeWidth="1.5" />
              <path d={svgPaths.p32883150} id="Vector" stroke="var(--stroke-0, #616D79)" strokeWidth="1.5" />
            </g>
          </g>
        </svg>
      </div>
    </div>
  );
}

function Content3() {
  return (
    <div className="bg-[#f2f3f4] h-[40px] relative rounded-[4px] shrink-0" data-name="content">
      <div className="content-stretch flex gap-[4px] h-full items-center justify-center overflow-clip px-[16px] relative rounded-[inherit]">
        <div className="overflow-clip relative shrink-0 size-[24px]" data-name="24px/app/import">
          <Group2 />
        </div>
        <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[#616d79] text-[16px] text-center whitespace-nowrap">
          <p className="leading-[22px]">Import</p>
        </div>
      </div>
      <div aria-hidden="true" className="absolute border border-[#c3c7cc] border-solid inset-0 pointer-events-none rounded-[4px]" />
    </div>
  );
}

function Group3() {
  return (
    <div className="absolute inset-[8.33%]">
      <div className="absolute inset-[-2.65%_-5.3%_-3.75%_-3.75%]">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 21.8107 21.2803">
          <g id="Group 106">
            <path d={svgPaths.p34ec8300} id="Rectangle 1000" stroke="var(--stroke-0, #616D79)" strokeLinecap="square" strokeLinejoin="round" strokeWidth="1.5" />
            <g id="Group 92">
              <path d={svgPaths.p9c65f00} id="Vector 8" stroke="var(--stroke-0, #616D79)" strokeWidth="1.5" />
              <path d={svgPaths.p2702c480} id="Vector" stroke="var(--stroke-0, #616D79)" strokeWidth="1.5" />
            </g>
          </g>
        </svg>
      </div>
    </div>
  );
}

function Content4() {
  return (
    <div className="bg-[#f2f3f4] h-[40px] relative rounded-[4px] shrink-0" data-name="content">
      <div className="content-stretch flex gap-[4px] h-full items-center justify-center overflow-clip px-[16px] relative rounded-[inherit]">
        <div className="overflow-clip relative shrink-0 size-[24px]" data-name="24px/app/share">
          <Group3 />
        </div>
        <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[#616d79] text-[16px] text-center whitespace-nowrap">
          <p className="leading-[22px]">Export</p>
        </div>
      </div>
      <div aria-hidden="true" className="absolute border border-[#c3c7cc] border-solid inset-0 pointer-events-none rounded-[4px]" />
    </div>
  );
}

function Content5() {
  return (
    <div className="bg-[#ff4d00] content-stretch flex gap-[4px] h-[40px] items-center justify-center overflow-clip px-[16px] relative rounded-[4px] shrink-0" data-name="content">
      <div className="overflow-clip relative shrink-0 size-[24px]" data-name="24px/app/edit">
        <div className="absolute flex inset-[12.5%_14.44%_13.84%_11.91%] items-center justify-center">
          <div className="flex-none h-[20px] rotate-45 w-[5px]">
            <div className="relative size-full">
              <div className="absolute inset-[-3.75%_-15%_-6.25%_-15%]">
                <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 6.5 22">
                  <path d={svgPaths.p3fe980c0} id="Vector 42" stroke="var(--stroke-0, white)" strokeWidth="1.5" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[16px] text-center text-white whitespace-nowrap">
        <p className="leading-[22px]">Edit</p>
      </div>
    </div>
  );
}

function Frame1() {
  return (
    <div className="content-stretch flex gap-[12px] items-center relative shrink-0">
      <div className="content-stretch flex flex-col h-[44px] items-center justify-center py-[2px] relative shrink-0" data-name="Button">
        <Content2 />
      </div>
      <div className="content-stretch flex flex-col h-[44px] items-center justify-center py-[2px] relative shrink-0" data-name="Button">
        <Content3 />
      </div>
      <div className="content-stretch flex flex-col h-[44px] items-center justify-center py-[2px] relative shrink-0" data-name="Button">
        <Content4 />
      </div>
      <div className="content-stretch flex flex-col h-[44px] items-center justify-center py-[2px] relative shrink-0" data-name="Button">
        <Content5 />
      </div>
    </div>
  );
}

function TableItemRowItem2() {
  return (
    <div className="content-stretch flex flex-[1_0_0] h-full items-center justify-between min-h-px min-w-px relative" data-name="Table Item / Row Item">
      <Row4 />
      <Frame1 />
    </div>
  );
}

function Row3() {
  return (
    <div className="bg-[#f5f5f5] h-[64px] relative shrink-0 w-full" data-name="Row">
      <div aria-hidden="true" className="absolute border-[#d9d9d9] border-b border-solid inset-0 pointer-events-none" />
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex items-center justify-between pl-[12px] pr-[48px] relative size-full">
          <TableItemRowItem2 />
        </div>
      </div>
    </div>
  );
}

function Content6() {
  return (
    <div className="content-stretch flex items-center overflow-clip px-[12px] relative shrink-0" data-name="Content">
      <div className="flex flex-col font-['Inter:Semi_Bold',sans-serif] font-semibold justify-center leading-[0] not-italic relative shrink-0 text-[#262626] text-[16px] whitespace-nowrap">
        <p className="leading-[24px]">Assembly Code</p>
      </div>
    </div>
  );
}

function TableItemHeaderItem() {
  return (
    <div className="h-full relative shrink-0 w-[320px]" data-name="Table Item / Header Item">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex items-center pl-[12px] pr-[24px] py-[12px] relative size-full">
          <div className="flex items-center justify-center relative shrink-0">
            <div className="flex-none rotate-180">
              <div className="overflow-clip size-[24px]" data-name="24px/directional/caret-up" />
            </div>
          </div>
          <Content6 />
        </div>
      </div>
    </div>
  );
}

function Content7() {
  return (
    <div className="content-stretch flex items-center justify-center overflow-clip px-[12px] relative shrink-0" data-name="Content">
      <div className="flex flex-col font-['Inter:Semi_Bold',sans-serif] font-semibold justify-center leading-[0] not-italic relative shrink-0 text-[#262626] text-[16px] whitespace-nowrap">
        <p className="leading-[24px]">Assembly Name</p>
      </div>
    </div>
  );
}

function TableItemHeaderItem1() {
  return (
    <div className="h-full relative shrink-0 w-[480px]" data-name="Table Item / Header Item">
      <div className="flex flex-col justify-center size-full">
        <div className="content-stretch flex flex-col items-start justify-center p-[12px] relative size-full">
          <Content7 />
        </div>
      </div>
    </div>
  );
}

function Content8() {
  return (
    <div className="content-stretch flex items-center justify-center overflow-clip px-[12px] relative shrink-0" data-name="Content">
      <div className="flex flex-col font-['Inter:Semi_Bold',sans-serif] font-semibold justify-center leading-[0] not-italic relative shrink-0 text-[#262626] text-[16px] whitespace-nowrap">
        <p className="leading-[24px]">{`Assembly description `}</p>
      </div>
    </div>
  );
}

function TableItemHeaderItem2() {
  return (
    <div className="h-full relative shrink-0 w-[680px]" data-name="Table Item / Header Item">
      <div className="flex flex-col justify-center size-full">
        <div className="content-stretch flex flex-col items-start justify-center pr-[12px] py-[12px] relative size-full">
          <Content8 />
        </div>
      </div>
    </div>
  );
}

function HeaderRow() {
  return (
    <div className="bg-[#f5f5f5] content-stretch flex h-[44px] items-start relative shrink-0 w-full" data-name="Header Row">
      <div aria-hidden="true" className="absolute border-[#d9d9d9] border-b border-solid inset-0 pointer-events-none" />
      <TableItemHeaderItem />
      <TableItemHeaderItem1 />
      <TableItemHeaderItem2 />
    </div>
  );
}

function Content9() {
  return (
    <div className="content-stretch flex gap-[8px] items-center overflow-clip relative shrink-0" data-name="Content">
      <div className="flex flex-col font-['Inter:Semi_Bold',sans-serif] font-semibold justify-center leading-[0] not-italic relative shrink-0 text-[#262626] text-[14px] whitespace-nowrap">
        <p className="leading-[20px]">A</p>
      </div>
    </div>
  );
}

function TableItemHeaderItem3() {
  return (
    <div className="h-full relative shrink-0 w-[320px]" data-name="Table Item / Header Item">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex gap-[8px] items-center px-[12px] py-[10px] relative size-full">
          <div className="flex items-center justify-center relative shrink-0">
            <div className="flex-none rotate-180">
              <div className="overflow-clip relative size-[24px]" data-name="24px/directional/caret-up">
                <div className="absolute bottom-[33.33%] left-1/4 right-1/4 top-[33.33%]" data-name="Vector">
                  <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12 8">
                    <path d={svgPaths.p2fbf4df0} fill="var(--fill-0, black)" id="Vector" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
          <Content9 />
        </div>
      </div>
    </div>
  );
}

function Content10() {
  return (
    <div className="content-stretch flex gap-[8px] items-center overflow-clip px-[12px] relative shrink-0" data-name="Content">
      <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[#262626] text-[14px] whitespace-nowrap">
        <p className="leading-[20px]">Substructure</p>
      </div>
    </div>
  );
}

function TableItemHeaderItem4() {
  return (
    <div className="h-full relative shrink-0 w-[480px]" data-name="Table Item / Header Item">
      <div className="flex flex-col justify-center size-full">
        <div className="content-stretch flex flex-col items-start justify-center p-[12px] relative size-full">
          <Content10 />
        </div>
      </div>
    </div>
  );
}

function Divider() {
  return (
    <div className="h-full relative shrink-0 w-[2px]" data-name="Divider">
      <div className="flex flex-col items-center justify-center overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex flex-col items-center justify-center py-[4px] size-full" />
      </div>
    </div>
  );
}

function Content11() {
  return <div className="content-stretch flex gap-[8px] items-center overflow-clip px-[12px] shrink-0" data-name="Content" />;
}

function TableItemHeaderItem5() {
  return (
    <div className="h-full relative shrink-0 w-[440px]" data-name="Table Item / Header Item">
      <div className="flex flex-col justify-center size-full">
        <div className="content-stretch flex flex-col items-start justify-center py-[12px] relative size-full">
          <Content11 />
        </div>
      </div>
    </div>
  );
}

function Divider1() {
  return (
    <div className="h-full relative shrink-0 w-[2px]" data-name="Divider">
      <div className="flex flex-col items-center justify-center overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex flex-col items-center justify-center py-[4px] size-full" />
      </div>
    </div>
  );
}

function Divider2() {
  return (
    <div className="h-full relative shrink-0" data-name="Divider">
      <div className="flex flex-col items-center justify-center overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex flex-col h-full items-center justify-center py-[4px]" />
      </div>
    </div>
  );
}

function Divider3() {
  return (
    <div className="h-full relative shrink-0" data-name="Divider">
      <div className="flex flex-col items-center justify-center overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex flex-col h-full items-center justify-center py-[4px]" />
      </div>
    </div>
  );
}

function Divider4() {
  return (
    <div className="h-full relative shrink-0" data-name="Divider">
      <div className="flex flex-col items-center justify-center overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex flex-col h-full items-center justify-center py-[4px]" />
      </div>
    </div>
  );
}

function Divider5() {
  return (
    <div className="h-full relative shrink-0" data-name="Divider">
      <div className="flex flex-col items-center justify-center overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex flex-col h-full items-center justify-center py-[4px]" />
      </div>
    </div>
  );
}

function Divider6() {
  return (
    <div className="h-full relative shrink-0" data-name="Divider">
      <div className="flex flex-col items-center justify-center overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex flex-col h-full items-center justify-center py-[4px]" />
      </div>
    </div>
  );
}

function TableItemHeaderItem6() {
  return (
    <div className="h-full relative shrink-0 w-[60px]" data-name="Table Item / Header Item">
      <div className="flex flex-col justify-center size-full">
        <div className="content-stretch flex flex-col items-start justify-center p-[12px] size-full" />
      </div>
    </div>
  );
}

function HeaderRow1() {
  return (
    <div className="content-stretch flex h-[44px] items-start relative shrink-0 w-full" data-name="Header Row">
      <div aria-hidden="true" className="absolute border-[#d9d9d9] border-b border-solid inset-0 pointer-events-none" />
      <TableItemHeaderItem3 />
      <TableItemHeaderItem4 />
      <Divider />
      <TableItemHeaderItem5 />
      <Divider1 />
      <Divider2 />
      <Divider3 />
      <Divider4 />
      <Divider5 />
      <Divider6 />
      <TableItemHeaderItem6 />
    </div>
  );
}

function Content12() {
  return (
    <div className="content-stretch flex gap-[8px] items-center overflow-clip relative shrink-0" data-name="Content">
      <div className="flex flex-col font-['Inter:Semi_Bold',sans-serif] font-semibold justify-center leading-[0] not-italic relative shrink-0 text-[#262626] text-[14px] whitespace-nowrap">
        <p className="leading-[20px]">A10</p>
      </div>
    </div>
  );
}

function TableItemHeaderItem7() {
  return (
    <div className="h-full relative shrink-0 w-[320px]" data-name="Table Item / Header Item">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex gap-[8px] items-center px-[12px] py-[10px] relative size-full">
          <div className="flex items-center justify-center relative shrink-0 size-[24px]" style={{ "--transform-inner-width": "1183", "--transform-inner-height": "0" } as React.CSSProperties}>
            <div className="flex-none rotate-90">
              <div className="overflow-clip size-[24px]" data-name="24px/directional/caret-up" />
            </div>
          </div>
          <div className="flex items-center justify-center relative shrink-0 size-[24px]" style={{ "--transform-inner-width": "1183", "--transform-inner-height": "22" } as React.CSSProperties}>
            <div className="flex-none rotate-90">
              <div className="overflow-clip relative size-[24px]" data-name="24px/directional/caret-up">
                <div className="absolute bottom-[33.33%] left-1/4 right-1/4 top-[33.33%]" data-name="Vector">
                  <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12 8">
                    <path d={svgPaths.p2fbf4df0} fill="var(--fill-0, black)" id="Vector" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
          <Content12 />
        </div>
      </div>
    </div>
  );
}

function Content13() {
  return (
    <div className="content-stretch flex gap-[8px] items-center overflow-clip px-[12px] relative shrink-0" data-name="Content">
      <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[#262626] text-[14px] whitespace-nowrap">
        <p className="leading-[20px]">Foundations</p>
      </div>
    </div>
  );
}

function TableItemHeaderItem8() {
  return (
    <div className="h-full relative shrink-0 w-[480px]" data-name="Table Item / Header Item">
      <div className="flex flex-col justify-center size-full">
        <div className="content-stretch flex flex-col items-start justify-center p-[12px] relative size-full">
          <Content13 />
        </div>
      </div>
    </div>
  );
}

function Divider7() {
  return (
    <div className="h-full relative shrink-0 w-[2px]" data-name="Divider">
      <div className="flex flex-col items-center justify-center overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex flex-col items-center justify-center py-[4px] size-full" />
      </div>
    </div>
  );
}

function Content14() {
  return <div className="content-stretch flex gap-[8px] items-center overflow-clip px-[12px] shrink-0" data-name="Content" />;
}

function TableItemHeaderItem9() {
  return (
    <div className="h-full relative shrink-0 w-[440px]" data-name="Table Item / Header Item">
      <div className="flex flex-col justify-center size-full">
        <div className="content-stretch flex flex-col items-start justify-center py-[12px] relative size-full">
          <Content14 />
        </div>
      </div>
    </div>
  );
}

function Divider8() {
  return (
    <div className="h-full relative shrink-0 w-[2px]" data-name="Divider">
      <div className="flex flex-col items-center justify-center overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex flex-col items-center justify-center py-[4px] size-full" />
      </div>
    </div>
  );
}

function HeaderRow2() {
  return (
    <div className="content-stretch flex h-[44px] items-start relative shrink-0 w-full" data-name="Header Row">
      <div aria-hidden="true" className="absolute border-[#d9d9d9] border-b border-solid inset-0 pointer-events-none" />
      <TableItemHeaderItem7 />
      <TableItemHeaderItem8 />
      <Divider7 />
      <TableItemHeaderItem9 />
      <Divider8 />
    </div>
  );
}

function Content15() {
  return (
    <div className="content-stretch flex gap-[8px] items-center overflow-clip relative shrink-0" data-name="Content">
      <div className="flex flex-col font-['Inter:Semi_Bold',sans-serif] font-semibold justify-center leading-[0] not-italic relative shrink-0 text-[#262626] text-[14px] whitespace-nowrap">
        <p className="leading-[20px]">A20</p>
      </div>
    </div>
  );
}

function TableItemHeaderItem10() {
  return (
    <div className="h-full relative shrink-0 w-[320px]" data-name="Table Item / Header Item">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex gap-[8px] items-center px-[12px] py-[10px] relative size-full">
          <div className="flex items-center justify-center relative shrink-0 size-[24px]" style={{ "--transform-inner-width": "1183", "--transform-inner-height": "0" } as React.CSSProperties}>
            <div className="flex-none rotate-90">
              <div className="overflow-clip size-[24px]" data-name="24px/directional/caret-up" />
            </div>
          </div>
          <div className="flex items-center justify-center relative shrink-0">
            <div className="flex-none rotate-180">
              <div className="overflow-clip relative size-[24px]" data-name="24px/directional/caret-up">
                <div className="absolute bottom-[33.33%] left-1/4 right-1/4 top-[33.33%]" data-name="Vector">
                  <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12 8">
                    <path d={svgPaths.p2fbf4df0} fill="var(--fill-0, black)" id="Vector" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
          <Content15 />
        </div>
      </div>
    </div>
  );
}

function Content16() {
  return (
    <div className="content-stretch flex gap-[8px] items-center overflow-clip px-[12px] relative shrink-0" data-name="Content">
      <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[#262626] text-[14px] whitespace-nowrap">
        <p className="leading-[20px]">Basement Construction</p>
      </div>
    </div>
  );
}

function TableItemHeaderItem11() {
  return (
    <div className="h-full relative shrink-0 w-[480px]" data-name="Table Item / Header Item">
      <div className="flex flex-col justify-center size-full">
        <div className="content-stretch flex flex-col items-start justify-center p-[12px] relative size-full">
          <Content16 />
        </div>
      </div>
    </div>
  );
}

function Divider9() {
  return (
    <div className="h-full relative shrink-0 w-[2px]" data-name="Divider">
      <div className="flex flex-col items-center justify-center overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex flex-col items-center justify-center py-[4px] size-full" />
      </div>
    </div>
  );
}

function Content17() {
  return <div className="content-stretch flex gap-[8px] items-center overflow-clip px-[12px] shrink-0" data-name="Content" />;
}

function TableItemHeaderItem12() {
  return (
    <div className="h-full relative shrink-0 w-[440px]" data-name="Table Item / Header Item">
      <div className="flex flex-col justify-center size-full">
        <div className="content-stretch flex flex-col items-start justify-center py-[12px] relative size-full">
          <Content17 />
        </div>
      </div>
    </div>
  );
}

function Divider10() {
  return (
    <div className="h-full relative shrink-0 w-[2px]" data-name="Divider">
      <div className="flex flex-col items-center justify-center overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex flex-col items-center justify-center py-[4px] size-full" />
      </div>
    </div>
  );
}

function HeaderRow3() {
  return (
    <div className="content-stretch flex h-[44px] items-start relative shrink-0 w-full" data-name="Header Row">
      <div aria-hidden="true" className="absolute border-[#d9d9d9] border-b border-solid inset-0 pointer-events-none" />
      <TableItemHeaderItem10 />
      <TableItemHeaderItem11 />
      <Divider9 />
      <TableItemHeaderItem12 />
      <Divider10 />
    </div>
  );
}

function Content18() {
  return (
    <div className="content-stretch flex gap-[8px] items-center overflow-clip relative shrink-0" data-name="Content">
      <div className="flex flex-col font-['Inter:Semi_Bold',sans-serif] font-semibold justify-center leading-[0] not-italic relative shrink-0 text-[#262626] text-[14px] whitespace-nowrap">
        <p className="leading-[20px]">A2010</p>
      </div>
    </div>
  );
}

function TableItemHeaderItem13() {
  return (
    <div className="h-full relative shrink-0 w-[320px]" data-name="Table Item / Header Item">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex gap-[8px] items-center px-[12px] py-[10px] relative size-full">
          <div className="flex items-center justify-center relative shrink-0 size-[24px]" style={{ "--transform-inner-width": "1183", "--transform-inner-height": "0" } as React.CSSProperties}>
            <div className="flex-none rotate-90">
              <div className="overflow-clip size-[24px]" data-name="24px/directional/caret-up" />
            </div>
          </div>
          <div className="flex items-center justify-center relative shrink-0 size-[24px]" style={{ "--transform-inner-width": "1183", "--transform-inner-height": "0" } as React.CSSProperties}>
            <div className="flex-none rotate-90">
              <div className="overflow-clip size-[24px]" data-name="24px/directional/caret-up" />
            </div>
          </div>
          <div className="flex items-center justify-center relative shrink-0">
            <div className="flex-none rotate-180">
              <div className="overflow-clip relative size-[24px]" data-name="24px/directional/caret-up">
                <div className="absolute bottom-[33.33%] left-1/4 right-1/4 top-[33.33%]" data-name="Vector">
                  <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12 8">
                    <path d={svgPaths.p2fbf4df0} fill="var(--fill-0, black)" id="Vector" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
          <Content18 />
        </div>
      </div>
    </div>
  );
}

function Content19() {
  return (
    <div className="content-stretch flex gap-[8px] items-center overflow-clip px-[12px] relative shrink-0" data-name="Content">
      <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[#262626] text-[14px] whitespace-nowrap">
        <p className="leading-[20px]">Basement Excavation</p>
      </div>
    </div>
  );
}

function TableItemHeaderItem14() {
  return (
    <div className="h-full relative shrink-0 w-[480px]" data-name="Table Item / Header Item">
      <div className="flex flex-col justify-center size-full">
        <div className="content-stretch flex flex-col items-start justify-center p-[12px] relative size-full">
          <Content19 />
        </div>
      </div>
    </div>
  );
}

function Divider11() {
  return (
    <div className="h-full relative shrink-0 w-[2px]" data-name="Divider">
      <div className="flex flex-col items-center justify-center overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex flex-col items-center justify-center py-[4px] size-full" />
      </div>
    </div>
  );
}

function Content20() {
  return <div className="content-stretch flex gap-[8px] items-center overflow-clip px-[12px] shrink-0" data-name="Content" />;
}

function TableItemHeaderItem15() {
  return (
    <div className="h-full relative shrink-0 w-[440px]" data-name="Table Item / Header Item">
      <div className="flex flex-col justify-center size-full">
        <div className="content-stretch flex flex-col items-start justify-center py-[12px] relative size-full">
          <Content20 />
        </div>
      </div>
    </div>
  );
}

function Divider12() {
  return (
    <div className="h-full relative shrink-0 w-[2px]" data-name="Divider">
      <div className="flex flex-col items-center justify-center overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex flex-col items-center justify-center py-[4px] size-full" />
      </div>
    </div>
  );
}

function HeaderRow4() {
  return (
    <div className="content-stretch flex h-[44px] items-start relative shrink-0 w-full" data-name="Header Row">
      <div aria-hidden="true" className="absolute border-[#d9d9d9] border-b border-solid inset-0 pointer-events-none" />
      <TableItemHeaderItem13 />
      <TableItemHeaderItem14 />
      <Divider11 />
      <TableItemHeaderItem15 />
      <Divider12 />
    </div>
  );
}

function Content21() {
  return (
    <div className="content-stretch flex gap-[8px] items-center overflow-clip relative shrink-0" data-name="Content">
      <div className="flex flex-col font-['Inter:Semi_Bold',sans-serif] font-semibold justify-center leading-[0] not-italic relative shrink-0 text-[#262626] text-[14px] whitespace-nowrap">
        <p className="leading-[20px]">{`A2010100 `}</p>
      </div>
    </div>
  );
}

function TableItemHeaderItem16() {
  return (
    <div className="h-full relative shrink-0 w-[320px]" data-name="Table Item / Header Item">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex gap-[8px] items-center px-[12px] py-[10px] relative size-full">
          <div className="flex items-center justify-center relative shrink-0 size-[24px]" style={{ "--transform-inner-width": "1183", "--transform-inner-height": "0" } as React.CSSProperties}>
            <div className="flex-none rotate-90">
              <div className="overflow-clip size-[24px]" data-name="24px/directional/caret-up" />
            </div>
          </div>
          <div className="flex items-center justify-center relative shrink-0 size-[24px]" style={{ "--transform-inner-width": "1183", "--transform-inner-height": "0" } as React.CSSProperties}>
            <div className="flex-none rotate-90">
              <div className="overflow-clip size-[24px]" data-name="24px/directional/caret-up" />
            </div>
          </div>
          <div className="flex items-center justify-center relative shrink-0 size-[24px]" style={{ "--transform-inner-width": "1183", "--transform-inner-height": "0" } as React.CSSProperties}>
            <div className="flex-none rotate-90">
              <div className="overflow-clip size-[24px]" data-name="24px/directional/caret-up" />
            </div>
          </div>
          <div className="flex items-center justify-center relative shrink-0">
            <div className="flex-none rotate-180">
              <div className="overflow-clip relative size-[24px]" data-name="24px/directional/caret-up">
                <div className="absolute bottom-[33.33%] left-1/4 right-1/4 top-[33.33%]" data-name="Vector">
                  <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12 8">
                    <path d={svgPaths.p2fbf4df0} fill="var(--fill-0, black)" id="Vector" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
          <Content21 />
        </div>
      </div>
    </div>
  );
}

function Content22() {
  return (
    <div className="content-stretch flex gap-[8px] items-center overflow-clip px-[12px] relative shrink-0" data-name="Content">
      <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[#262626] text-[14px] whitespace-nowrap">
        <p className="leading-[20px]">Excavation for Basements</p>
      </div>
    </div>
  );
}

function TableItemHeaderItem17() {
  return (
    <div className="h-full relative shrink-0 w-[480px]" data-name="Table Item / Header Item">
      <div className="flex flex-col justify-center size-full">
        <div className="content-stretch flex flex-col items-start justify-center p-[12px] relative size-full">
          <Content22 />
        </div>
      </div>
    </div>
  );
}

function Divider13() {
  return (
    <div className="h-full relative shrink-0 w-[2px]" data-name="Divider">
      <div className="flex flex-col items-center justify-center overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex flex-col items-center justify-center py-[4px] size-full" />
      </div>
    </div>
  );
}

function Content23() {
  return <div className="content-stretch flex gap-[8px] items-center overflow-clip px-[12px] shrink-0" data-name="Content" />;
}

function TableItemHeaderItem18() {
  return (
    <div className="h-full relative shrink-0 w-[440px]" data-name="Table Item / Header Item">
      <div className="flex flex-col justify-center size-full">
        <div className="content-stretch flex flex-col items-start justify-center py-[12px] relative size-full">
          <Content23 />
        </div>
      </div>
    </div>
  );
}

function HeaderRow5() {
  return (
    <div className="content-stretch flex h-[44px] items-start relative shrink-0 w-full" data-name="Header Row">
      <div aria-hidden="true" className="absolute border-[#d9d9d9] border-b border-solid inset-0 pointer-events-none" />
      <TableItemHeaderItem16 />
      <TableItemHeaderItem17 />
      <Divider13 />
      <TableItemHeaderItem18 />
    </div>
  );
}

function Content24() {
  return (
    <div className="content-stretch flex gap-[8px] items-center overflow-clip relative shrink-0" data-name="Content">
      <div className="flex flex-col font-['Inter:Semi_Bold',sans-serif] font-semibold justify-center leading-[0] not-italic relative shrink-0 text-[#262626] text-[14px] whitespace-nowrap">
        <p className="leading-[20px]">{`A2010100 `}</p>
      </div>
    </div>
  );
}

function TableItemHeaderItem19() {
  return (
    <div className="h-full relative shrink-0 w-[320px]" data-name="Table Item / Header Item">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex gap-[8px] items-center px-[12px] py-[10px] relative size-full">
          <div className="flex items-center justify-center relative shrink-0 size-[24px]" style={{ "--transform-inner-width": "1183", "--transform-inner-height": "0" } as React.CSSProperties}>
            <div className="flex-none rotate-90">
              <div className="overflow-clip size-[24px]" data-name="24px/directional/caret-up" />
            </div>
          </div>
          <div className="flex items-center justify-center relative shrink-0 size-[24px]" style={{ "--transform-inner-width": "1183", "--transform-inner-height": "0" } as React.CSSProperties}>
            <div className="flex-none rotate-90">
              <div className="overflow-clip size-[24px]" data-name="24px/directional/caret-up" />
            </div>
          </div>
          <div className="flex items-center justify-center relative shrink-0 size-[24px]" style={{ "--transform-inner-width": "1183", "--transform-inner-height": "0" } as React.CSSProperties}>
            <div className="flex-none rotate-90">
              <div className="overflow-clip size-[24px]" data-name="24px/directional/caret-up" />
            </div>
          </div>
          <div className="flex items-center justify-center relative shrink-0 size-[24px]" style={{ "--transform-inner-width": "1183", "--transform-inner-height": "0" } as React.CSSProperties}>
            <div className="flex-none rotate-90">
              <div className="overflow-clip size-[24px]" data-name="24px/directional/caret-up" />
            </div>
          </div>
          <div className="flex items-center justify-center relative shrink-0 size-[24px]" style={{ "--transform-inner-width": "1183", "--transform-inner-height": "0" } as React.CSSProperties}>
            <div className="flex-none rotate-90">
              <div className="overflow-clip size-[24px]" data-name="24px/directional/caret-up" />
            </div>
          </div>
          <Content24 />
        </div>
      </div>
    </div>
  );
}

function Content25() {
  return (
    <div className="content-stretch flex gap-[8px] items-center overflow-clip px-[12px] relative shrink-0" data-name="Content">
      <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[#262626] text-[14px] whitespace-nowrap">
        <p className="leading-[20px]">{`Basement Excavation & Backfill`}</p>
      </div>
    </div>
  );
}

function TableItemHeaderItem20() {
  return (
    <div className="h-full relative shrink-0 w-[480px]" data-name="Table Item / Header Item">
      <div className="flex flex-col justify-center size-full">
        <div className="content-stretch flex flex-col items-start justify-center p-[12px] relative size-full">
          <Content25 />
        </div>
      </div>
    </div>
  );
}

function Divider14() {
  return (
    <div className="h-full relative shrink-0 w-[2px]" data-name="Divider">
      <div className="flex flex-col items-center justify-center overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex flex-col items-center justify-center py-[4px] size-full" />
      </div>
    </div>
  );
}

function Content26() {
  return <div className="content-stretch flex gap-[8px] items-center overflow-clip px-[12px] shrink-0" data-name="Content" />;
}

function TableItemHeaderItem21() {
  return (
    <div className="h-full relative shrink-0 w-[440px]" data-name="Table Item / Header Item">
      <div className="flex flex-col justify-center size-full">
        <div className="content-stretch flex flex-col items-start justify-center py-[12px] relative size-full">
          <Content26 />
        </div>
      </div>
    </div>
  );
}

function HeaderRow6() {
  return (
    <div className="content-stretch flex h-[44px] items-start relative shrink-0 w-full" data-name="Header Row">
      <div aria-hidden="true" className="absolute border-[#d9d9d9] border-b border-solid inset-0 pointer-events-none" />
      <TableItemHeaderItem19 />
      <TableItemHeaderItem20 />
      <Divider14 />
      <TableItemHeaderItem21 />
    </div>
  );
}

function Content27() {
  return (
    <div className="content-stretch flex gap-[8px] items-center overflow-clip relative shrink-0" data-name="Content">
      <div className="flex flex-col font-['Inter:Semi_Bold',sans-serif] font-semibold justify-center leading-[0] not-italic relative shrink-0 text-[#262626] text-[14px] whitespace-nowrap">
        <p className="leading-[20px]">{`A2010200 `}</p>
      </div>
    </div>
  );
}

function TableItemHeaderItem22() {
  return (
    <div className="h-full relative shrink-0 w-[320px]" data-name="Table Item / Header Item">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex gap-[8px] items-center px-[12px] py-[10px] relative size-full">
          <div className="flex items-center justify-center relative shrink-0 size-[24px]" style={{ "--transform-inner-width": "1183", "--transform-inner-height": "0" } as React.CSSProperties}>
            <div className="flex-none rotate-90">
              <div className="overflow-clip size-[24px]" data-name="24px/directional/caret-up" />
            </div>
          </div>
          <div className="flex items-center justify-center relative shrink-0 size-[24px]" style={{ "--transform-inner-width": "1183", "--transform-inner-height": "0" } as React.CSSProperties}>
            <div className="flex-none rotate-90">
              <div className="overflow-clip size-[24px]" data-name="24px/directional/caret-up" />
            </div>
          </div>
          <div className="flex items-center justify-center relative shrink-0 size-[24px]" style={{ "--transform-inner-width": "1183", "--transform-inner-height": "0" } as React.CSSProperties}>
            <div className="flex-none rotate-90">
              <div className="overflow-clip size-[24px]" data-name="24px/directional/caret-up" />
            </div>
          </div>
          <div className="flex items-center justify-center relative shrink-0 size-[24px]" style={{ "--transform-inner-width": "1183", "--transform-inner-height": "0" } as React.CSSProperties}>
            <div className="flex-none rotate-90">
              <div className="overflow-clip size-[24px]" data-name="24px/directional/caret-up" />
            </div>
          </div>
          <Content27 />
        </div>
      </div>
    </div>
  );
}

function Content28() {
  return (
    <div className="content-stretch flex gap-[8px] items-center overflow-clip px-[12px] relative shrink-0" data-name="Content">
      <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[#262626] text-[14px] whitespace-nowrap">
        <p className="leading-[20px]">{`Structural Backfill & Compact`}</p>
      </div>
    </div>
  );
}

function TableItemHeaderItem23() {
  return (
    <div className="h-full relative shrink-0 w-[480px]" data-name="Table Item / Header Item">
      <div className="flex flex-col justify-center size-full">
        <div className="content-stretch flex flex-col items-start justify-center p-[12px] relative size-full">
          <Content28 />
        </div>
      </div>
    </div>
  );
}

function Divider15() {
  return (
    <div className="h-full relative shrink-0 w-[2px]" data-name="Divider">
      <div className="flex flex-col items-center justify-center overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex flex-col items-center justify-center py-[4px] size-full" />
      </div>
    </div>
  );
}

function Content29() {
  return <div className="content-stretch flex gap-[8px] items-center overflow-clip px-[12px] shrink-0" data-name="Content" />;
}

function TableItemHeaderItem24() {
  return (
    <div className="h-full relative shrink-0 w-[440px]" data-name="Table Item / Header Item">
      <div className="flex flex-col justify-center size-full">
        <div className="content-stretch flex flex-col items-start justify-center py-[12px] relative size-full">
          <Content29 />
        </div>
      </div>
    </div>
  );
}

function HeaderRow7() {
  return (
    <div className="content-stretch flex h-[44px] items-start relative shrink-0 w-full" data-name="Header Row">
      <div aria-hidden="true" className="absolute border-[#d9d9d9] border-b border-solid inset-0 pointer-events-none" />
      <TableItemHeaderItem22 />
      <TableItemHeaderItem23 />
      <Divider15 />
      <TableItemHeaderItem24 />
    </div>
  );
}

function Content30() {
  return (
    <div className="content-stretch flex gap-[8px] items-center overflow-clip relative shrink-0" data-name="Content">
      <div className="flex flex-col font-['Inter:Semi_Bold',sans-serif] font-semibold justify-center leading-[0] not-italic relative shrink-0 text-[#262626] text-[14px] whitespace-nowrap">
        <p className="leading-[20px]">{`A2010300 `}</p>
      </div>
    </div>
  );
}

function TableItemHeaderItem25() {
  return (
    <div className="h-full relative shrink-0 w-[320px]" data-name="Table Item / Header Item">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex gap-[8px] items-center px-[12px] py-[10px] relative size-full">
          <div className="flex items-center justify-center relative shrink-0 size-[24px]" style={{ "--transform-inner-width": "1183", "--transform-inner-height": "0" } as React.CSSProperties}>
            <div className="flex-none rotate-90">
              <div className="overflow-clip size-[24px]" data-name="24px/directional/caret-up" />
            </div>
          </div>
          <div className="flex items-center justify-center relative shrink-0 size-[24px]" style={{ "--transform-inner-width": "1183", "--transform-inner-height": "0" } as React.CSSProperties}>
            <div className="flex-none rotate-90">
              <div className="overflow-clip size-[24px]" data-name="24px/directional/caret-up" />
            </div>
          </div>
          <div className="flex items-center justify-center relative shrink-0 size-[24px]" style={{ "--transform-inner-width": "1183", "--transform-inner-height": "0" } as React.CSSProperties}>
            <div className="flex-none rotate-90">
              <div className="overflow-clip size-[24px]" data-name="24px/directional/caret-up" />
            </div>
          </div>
          <div className="flex items-center justify-center relative shrink-0 size-[24px]" style={{ "--transform-inner-width": "1183", "--transform-inner-height": "22" } as React.CSSProperties}>
            <div className="flex-none rotate-90">
              <div className="overflow-clip relative size-[24px]" data-name="24px/directional/caret-up">
                <div className="absolute bottom-[33.33%] left-1/4 right-1/4 top-[33.33%]" data-name="Vector">
                  <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12 8">
                    <path d={svgPaths.p2fbf4df0} fill="var(--fill-0, black)" id="Vector" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
          <Content30 />
        </div>
      </div>
    </div>
  );
}

function Content31() {
  return (
    <div className="content-stretch flex gap-[8px] items-center overflow-clip px-[12px] relative shrink-0" data-name="Content">
      <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[#262626] text-[14px] whitespace-nowrap">
        <p className="leading-[20px]">Shoring</p>
      </div>
    </div>
  );
}

function TableItemHeaderItem26() {
  return (
    <div className="h-full relative shrink-0 w-[480px]" data-name="Table Item / Header Item">
      <div className="flex flex-col justify-center size-full">
        <div className="content-stretch flex flex-col items-start justify-center p-[12px] relative size-full">
          <Content31 />
        </div>
      </div>
    </div>
  );
}

function Divider16() {
  return (
    <div className="h-full relative shrink-0 w-[2px]" data-name="Divider">
      <div className="flex flex-col items-center justify-center overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex flex-col items-center justify-center py-[4px] size-full" />
      </div>
    </div>
  );
}

function Content32() {
  return <div className="content-stretch flex gap-[8px] items-center overflow-clip px-[12px] shrink-0" data-name="Content" />;
}

function TableItemHeaderItem27() {
  return (
    <div className="h-full relative shrink-0 w-[440px]" data-name="Table Item / Header Item">
      <div className="flex flex-col justify-center size-full">
        <div className="content-stretch flex flex-col items-start justify-center py-[12px] relative size-full">
          <Content32 />
        </div>
      </div>
    </div>
  );
}

function HeaderRow8() {
  return (
    <div className="content-stretch flex h-[44px] items-start relative shrink-0 w-full" data-name="Header Row">
      <div aria-hidden="true" className="absolute border-[#d9d9d9] border-b border-solid inset-0 pointer-events-none" />
      <TableItemHeaderItem25 />
      <TableItemHeaderItem26 />
      <Divider16 />
      <TableItemHeaderItem27 />
    </div>
  );
}

function Content33() {
  return (
    <div className="content-stretch flex gap-[8px] items-center overflow-clip relative shrink-0" data-name="Content">
      <div className="flex flex-col font-['Inter:Semi_Bold',sans-serif] font-semibold justify-center leading-[0] not-italic relative shrink-0 text-[#262626] text-[14px] whitespace-nowrap">
        <p className="leading-[20px]">{`A2020 `}</p>
      </div>
    </div>
  );
}

function TableItemHeaderItem28() {
  return (
    <div className="h-full relative shrink-0 w-[320px]" data-name="Table Item / Header Item">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex gap-[8px] items-center px-[12px] py-[10px] relative size-full">
          <div className="flex items-center justify-center relative shrink-0 size-[24px]" style={{ "--transform-inner-width": "1183", "--transform-inner-height": "0" } as React.CSSProperties}>
            <div className="flex-none rotate-90">
              <div className="overflow-clip size-[24px]" data-name="24px/directional/caret-up" />
            </div>
          </div>
          <div className="flex items-center justify-center relative shrink-0 size-[24px]" style={{ "--transform-inner-width": "1183", "--transform-inner-height": "0" } as React.CSSProperties}>
            <div className="flex-none rotate-90">
              <div className="overflow-clip size-[24px]" data-name="24px/directional/caret-up" />
            </div>
          </div>
          <div className="flex items-center justify-center relative shrink-0 size-[24px]" style={{ "--transform-inner-width": "1183", "--transform-inner-height": "22" } as React.CSSProperties}>
            <div className="flex-none rotate-90">
              <div className="overflow-clip relative size-[24px]" data-name="24px/directional/caret-up">
                <div className="absolute bottom-[33.33%] left-1/4 right-1/4 top-[33.33%]" data-name="Vector">
                  <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12 8">
                    <path d={svgPaths.p2fbf4df0} fill="var(--fill-0, black)" id="Vector" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
          <Content33 />
        </div>
      </div>
    </div>
  );
}

function Content34() {
  return (
    <div className="content-stretch flex gap-[8px] items-center overflow-clip px-[12px] relative shrink-0" data-name="Content">
      <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[#262626] text-[14px] whitespace-nowrap">
        <p className="leading-[20px]">Basement Walls</p>
      </div>
    </div>
  );
}

function TableItemHeaderItem29() {
  return (
    <div className="h-full relative shrink-0 w-[480px]" data-name="Table Item / Header Item">
      <div className="flex flex-col justify-center size-full">
        <div className="content-stretch flex flex-col items-start justify-center p-[12px] relative size-full">
          <Content34 />
        </div>
      </div>
    </div>
  );
}

function Divider17() {
  return (
    <div className="h-full relative shrink-0 w-[2px]" data-name="Divider">
      <div className="flex flex-col items-center justify-center overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex flex-col items-center justify-center py-[4px] size-full" />
      </div>
    </div>
  );
}

function Content35() {
  return <div className="content-stretch flex gap-[8px] items-center overflow-clip px-[12px] shrink-0" data-name="Content" />;
}

function TableItemHeaderItem30() {
  return (
    <div className="h-full relative shrink-0 w-[440px]" data-name="Table Item / Header Item">
      <div className="flex flex-col justify-center size-full">
        <div className="content-stretch flex flex-col items-start justify-center py-[12px] relative size-full">
          <Content35 />
        </div>
      </div>
    </div>
  );
}

function HeaderRow9() {
  return (
    <div className="content-stretch flex h-[44px] items-start relative shrink-0 w-full" data-name="Header Row">
      <div aria-hidden="true" className="absolute border-[#d9d9d9] border-b border-solid inset-0 pointer-events-none" />
      <TableItemHeaderItem28 />
      <TableItemHeaderItem29 />
      <Divider17 />
      <TableItemHeaderItem30 />
    </div>
  );
}

function Content36() {
  return (
    <div className="content-stretch flex gap-[8px] items-center overflow-clip relative shrink-0" data-name="Content">
      <div className="flex flex-col font-['Inter:Semi_Bold',sans-serif] font-semibold justify-center leading-[0] not-italic relative shrink-0 text-[#262626] text-[14px] whitespace-nowrap">
        <p className="leading-[20px]">B</p>
      </div>
    </div>
  );
}

function TableItemHeaderItem31() {
  return (
    <div className="h-full relative shrink-0 w-[320px]" data-name="Table Item / Header Item">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex gap-[8px] items-center px-[12px] py-[10px] relative size-full">
          <div className="flex items-center justify-center relative shrink-0 size-[24px]" style={{ "--transform-inner-width": "1183", "--transform-inner-height": "22" } as React.CSSProperties}>
            <div className="flex-none rotate-90">
              <div className="overflow-clip relative size-[24px]" data-name="24px/directional/caret-up">
                <div className="absolute bottom-[33.33%] left-1/4 right-1/4 top-[33.33%]" data-name="Vector">
                  <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12 8">
                    <path d={svgPaths.p2fbf4df0} fill="var(--fill-0, black)" id="Vector" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
          <Content36 />
        </div>
      </div>
    </div>
  );
}

function Content37() {
  return (
    <div className="content-stretch flex gap-[8px] items-center overflow-clip px-[12px] relative shrink-0" data-name="Content">
      <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[#262626] text-[14px] whitespace-nowrap">
        <p className="leading-[20px]">Shell</p>
      </div>
    </div>
  );
}

function TableItemHeaderItem32() {
  return (
    <div className="h-full relative shrink-0 w-[480px]" data-name="Table Item / Header Item">
      <div className="flex flex-col justify-center size-full">
        <div className="content-stretch flex flex-col items-start justify-center p-[12px] relative size-full">
          <Content37 />
        </div>
      </div>
    </div>
  );
}

function Divider18() {
  return (
    <div className="h-full relative shrink-0 w-[2px]" data-name="Divider">
      <div className="flex flex-col items-center justify-center overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex flex-col items-center justify-center py-[4px] size-full" />
      </div>
    </div>
  );
}

function Content38() {
  return <div className="content-stretch flex gap-[8px] items-center overflow-clip px-[12px] shrink-0" data-name="Content" />;
}

function TableItemHeaderItem33() {
  return (
    <div className="h-full relative shrink-0 w-[440px]" data-name="Table Item / Header Item">
      <div className="flex flex-col justify-center size-full">
        <div className="content-stretch flex flex-col items-start justify-center py-[12px] relative size-full">
          <Content38 />
        </div>
      </div>
    </div>
  );
}

function HeaderRow10() {
  return (
    <div className="content-stretch flex h-[44px] items-start relative shrink-0 w-full" data-name="Header Row">
      <div aria-hidden="true" className="absolute border-[#d9d9d9] border-b border-solid inset-0 pointer-events-none" />
      <TableItemHeaderItem31 />
      <TableItemHeaderItem32 />
      <Divider18 />
      <TableItemHeaderItem33 />
    </div>
  );
}

function Content39() {
  return (
    <div className="content-stretch flex gap-[8px] items-center overflow-clip relative shrink-0" data-name="Content">
      <div className="flex flex-col font-['Inter:Semi_Bold',sans-serif] font-semibold justify-center leading-[0] not-italic relative shrink-0 text-[#262626] text-[14px] whitespace-nowrap">
        <p className="leading-[20px]">C</p>
      </div>
    </div>
  );
}

function TableItemHeaderItem34() {
  return (
    <div className="h-full relative shrink-0 w-[320px]" data-name="Table Item / Header Item">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex gap-[8px] items-center px-[12px] py-[10px] relative size-full">
          <div className="flex items-center justify-center relative shrink-0 size-[24px]" style={{ "--transform-inner-width": "1183", "--transform-inner-height": "22" } as React.CSSProperties}>
            <div className="flex-none rotate-90">
              <div className="overflow-clip relative size-[24px]" data-name="24px/directional/caret-up">
                <div className="absolute bottom-[33.33%] left-1/4 right-1/4 top-[33.33%]" data-name="Vector">
                  <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12 8">
                    <path d={svgPaths.p2fbf4df0} fill="var(--fill-0, black)" id="Vector" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
          <Content39 />
        </div>
      </div>
    </div>
  );
}

function Content40() {
  return (
    <div className="content-stretch flex gap-[8px] items-center overflow-clip px-[12px] relative shrink-0" data-name="Content">
      <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[#262626] text-[14px] whitespace-nowrap">
        <p className="leading-[20px]">Interiors</p>
      </div>
    </div>
  );
}

function TableItemHeaderItem35() {
  return (
    <div className="h-full relative shrink-0 w-[480px]" data-name="Table Item / Header Item">
      <div className="flex flex-col justify-center size-full">
        <div className="content-stretch flex flex-col items-start justify-center p-[12px] relative size-full">
          <Content40 />
        </div>
      </div>
    </div>
  );
}

function Divider19() {
  return (
    <div className="h-full relative shrink-0 w-[2px]" data-name="Divider">
      <div className="flex flex-col items-center justify-center overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex flex-col items-center justify-center py-[4px] size-full" />
      </div>
    </div>
  );
}

function Content41() {
  return <div className="content-stretch flex gap-[8px] items-center overflow-clip px-[12px] shrink-0" data-name="Content" />;
}

function TableItemHeaderItem36() {
  return (
    <div className="h-full relative shrink-0 w-[440px]" data-name="Table Item / Header Item">
      <div className="flex flex-col justify-center size-full">
        <div className="content-stretch flex flex-col items-start justify-center py-[12px] relative size-full">
          <Content41 />
        </div>
      </div>
    </div>
  );
}

function HeaderRow11() {
  return (
    <div className="content-stretch flex h-[44px] items-start relative shrink-0 w-full" data-name="Header Row">
      <div aria-hidden="true" className="absolute border-[#d9d9d9] border-b border-solid inset-0 pointer-events-none" />
      <TableItemHeaderItem34 />
      <TableItemHeaderItem35 />
      <Divider19 />
      <TableItemHeaderItem36 />
    </div>
  );
}

function Content42() {
  return (
    <div className="content-stretch flex gap-[8px] items-center overflow-clip relative shrink-0" data-name="Content">
      <div className="flex flex-col font-['Inter:Semi_Bold',sans-serif] font-semibold justify-center leading-[0] not-italic relative shrink-0 text-[#262626] text-[14px] whitespace-nowrap">
        <p className="leading-[20px]">D</p>
      </div>
    </div>
  );
}

function TableItemHeaderItem37() {
  return (
    <div className="h-full relative shrink-0 w-[320px]" data-name="Table Item / Header Item">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex gap-[8px] items-center px-[12px] py-[10px] relative size-full">
          <div className="flex items-center justify-center relative shrink-0 size-[24px]" style={{ "--transform-inner-width": "1183", "--transform-inner-height": "22" } as React.CSSProperties}>
            <div className="flex-none rotate-90">
              <div className="overflow-clip relative size-[24px]" data-name="24px/directional/caret-up">
                <div className="absolute bottom-[33.33%] left-1/4 right-1/4 top-[33.33%]" data-name="Vector">
                  <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12 8">
                    <path d={svgPaths.p2fbf4df0} fill="var(--fill-0, black)" id="Vector" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
          <Content42 />
        </div>
      </div>
    </div>
  );
}

function Content43() {
  return (
    <div className="content-stretch flex gap-[8px] items-center overflow-clip px-[12px] relative shrink-0" data-name="Content">
      <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[#262626] text-[14px] whitespace-nowrap">
        <p className="leading-[20px]">Services</p>
      </div>
    </div>
  );
}

function TableItemHeaderItem38() {
  return (
    <div className="h-full relative shrink-0 w-[480px]" data-name="Table Item / Header Item">
      <div className="flex flex-col justify-center size-full">
        <div className="content-stretch flex flex-col items-start justify-center p-[12px] relative size-full">
          <Content43 />
        </div>
      </div>
    </div>
  );
}

function Divider20() {
  return (
    <div className="h-full relative shrink-0 w-[2px]" data-name="Divider">
      <div className="flex flex-col items-center justify-center overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex flex-col items-center justify-center py-[4px] size-full" />
      </div>
    </div>
  );
}

function Content44() {
  return <div className="content-stretch flex gap-[8px] items-center overflow-clip px-[12px] shrink-0" data-name="Content" />;
}

function TableItemHeaderItem39() {
  return (
    <div className="h-full relative shrink-0 w-[440px]" data-name="Table Item / Header Item">
      <div className="flex flex-col justify-center size-full">
        <div className="content-stretch flex flex-col items-start justify-center py-[12px] relative size-full">
          <Content44 />
        </div>
      </div>
    </div>
  );
}

function HeaderRow12() {
  return (
    <div className="content-stretch flex h-[44px] items-start relative shrink-0 w-full" data-name="Header Row">
      <div aria-hidden="true" className="absolute border-[#d9d9d9] border-b border-solid inset-0 pointer-events-none" />
      <TableItemHeaderItem37 />
      <TableItemHeaderItem38 />
      <Divider20 />
      <TableItemHeaderItem39 />
    </div>
  );
}

function Content45() {
  return (
    <div className="content-stretch flex gap-[8px] items-center overflow-clip relative shrink-0" data-name="Content">
      <div className="flex flex-col font-['Inter:Semi_Bold',sans-serif] font-semibold justify-center leading-[0] not-italic relative shrink-0 text-[#262626] text-[14px] whitespace-nowrap">
        <p className="leading-[20px]">E</p>
      </div>
    </div>
  );
}

function TableItemHeaderItem40() {
  return (
    <div className="h-full relative shrink-0 w-[320px]" data-name="Table Item / Header Item">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex gap-[8px] items-center px-[12px] py-[10px] relative size-full">
          <div className="flex items-center justify-center relative shrink-0 size-[24px]" style={{ "--transform-inner-width": "1183", "--transform-inner-height": "22" } as React.CSSProperties}>
            <div className="flex-none rotate-90">
              <div className="overflow-clip relative size-[24px]" data-name="24px/directional/caret-up">
                <div className="absolute bottom-[33.33%] left-1/4 right-1/4 top-[33.33%]" data-name="Vector">
                  <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12 8">
                    <path d={svgPaths.p2fbf4df0} fill="var(--fill-0, black)" id="Vector" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
          <Content45 />
        </div>
      </div>
    </div>
  );
}

function Content46() {
  return (
    <div className="content-stretch flex gap-[8px] items-center overflow-clip px-[12px] relative shrink-0" data-name="Content">
      <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[#262626] text-[14px] whitespace-nowrap">
        <p className="leading-[20px]">{`Equipment & Furnishings`}</p>
      </div>
    </div>
  );
}

function TableItemHeaderItem41() {
  return (
    <div className="h-full relative shrink-0 w-[480px]" data-name="Table Item / Header Item">
      <div className="flex flex-col justify-center size-full">
        <div className="content-stretch flex flex-col items-start justify-center p-[12px] relative size-full">
          <Content46 />
        </div>
      </div>
    </div>
  );
}

function Divider21() {
  return (
    <div className="h-full relative shrink-0 w-[2px]" data-name="Divider">
      <div className="flex flex-col items-center justify-center overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex flex-col items-center justify-center py-[4px] size-full" />
      </div>
    </div>
  );
}

function Content47() {
  return <div className="content-stretch flex gap-[8px] items-center overflow-clip px-[12px] shrink-0" data-name="Content" />;
}

function TableItemHeaderItem42() {
  return (
    <div className="h-full relative shrink-0 w-[440px]" data-name="Table Item / Header Item">
      <div className="flex flex-col justify-center size-full">
        <div className="content-stretch flex flex-col items-start justify-center py-[12px] relative size-full">
          <Content47 />
        </div>
      </div>
    </div>
  );
}

function HeaderRow13() {
  return (
    <div className="content-stretch flex h-[44px] items-start relative shrink-0 w-full" data-name="Header Row">
      <div aria-hidden="true" className="absolute border-[#d9d9d9] border-b border-solid inset-0 pointer-events-none" />
      <TableItemHeaderItem40 />
      <TableItemHeaderItem41 />
      <Divider21 />
      <TableItemHeaderItem42 />
    </div>
  );
}

function Content48() {
  return (
    <div className="content-stretch flex gap-[8px] items-center overflow-clip relative shrink-0" data-name="Content">
      <div className="flex flex-col font-['Inter:Semi_Bold',sans-serif] font-semibold justify-center leading-[0] not-italic relative shrink-0 text-[#262626] text-[14px] whitespace-nowrap">
        <p className="leading-[20px]">F</p>
      </div>
    </div>
  );
}

function TableItemHeaderItem43() {
  return (
    <div className="h-full relative shrink-0 w-[320px]" data-name="Table Item / Header Item">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex gap-[8px] items-center px-[12px] py-[10px] relative size-full">
          <div className="flex items-center justify-center relative shrink-0 size-[24px]" style={{ "--transform-inner-width": "1183", "--transform-inner-height": "22" } as React.CSSProperties}>
            <div className="flex-none rotate-90">
              <div className="overflow-clip relative size-[24px]" data-name="24px/directional/caret-up">
                <div className="absolute bottom-[33.33%] left-1/4 right-1/4 top-[33.33%]" data-name="Vector">
                  <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12 8">
                    <path d={svgPaths.p2fbf4df0} fill="var(--fill-0, black)" id="Vector" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
          <Content48 />
        </div>
      </div>
    </div>
  );
}

function Content49() {
  return (
    <div className="content-stretch flex gap-[8px] items-center overflow-clip px-[12px] relative shrink-0" data-name="Content">
      <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[#262626] text-[14px] whitespace-nowrap">
        <p className="leading-[20px]">{`Special Construction & Demolition`}</p>
      </div>
    </div>
  );
}

function TableItemHeaderItem44() {
  return (
    <div className="h-full relative shrink-0 w-[480px]" data-name="Table Item / Header Item">
      <div className="flex flex-col justify-center size-full">
        <div className="content-stretch flex flex-col items-start justify-center p-[12px] relative size-full">
          <Content49 />
        </div>
      </div>
    </div>
  );
}

function Divider22() {
  return (
    <div className="h-full relative shrink-0 w-[2px]" data-name="Divider">
      <div className="flex flex-col items-center justify-center overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex flex-col items-center justify-center py-[4px] size-full" />
      </div>
    </div>
  );
}

function Content50() {
  return <div className="content-stretch flex gap-[8px] items-center overflow-clip px-[12px] shrink-0" data-name="Content" />;
}

function TableItemHeaderItem45() {
  return (
    <div className="h-full relative shrink-0 w-[440px]" data-name="Table Item / Header Item">
      <div className="flex flex-col justify-center size-full">
        <div className="content-stretch flex flex-col items-start justify-center py-[12px] relative size-full">
          <Content50 />
        </div>
      </div>
    </div>
  );
}

function HeaderRow14() {
  return (
    <div className="content-stretch flex h-[44px] items-start relative shrink-0 w-full" data-name="Header Row">
      <div aria-hidden="true" className="absolute border-[#d9d9d9] border-b border-solid inset-0 pointer-events-none" />
      <TableItemHeaderItem43 />
      <TableItemHeaderItem44 />
      <Divider22 />
      <TableItemHeaderItem45 />
    </div>
  );
}

function Content51() {
  return (
    <div className="content-stretch flex gap-[8px] items-center overflow-clip relative shrink-0" data-name="Content">
      <div className="flex flex-col font-['Inter:Semi_Bold',sans-serif] font-semibold justify-center leading-[0] not-italic relative shrink-0 text-[#262626] text-[14px] whitespace-nowrap">
        <p className="leading-[20px]">G</p>
      </div>
    </div>
  );
}

function TableItemHeaderItem46() {
  return (
    <div className="h-full relative shrink-0 w-[320px]" data-name="Table Item / Header Item">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex gap-[8px] items-center px-[12px] py-[10px] relative size-full">
          <div className="flex items-center justify-center relative shrink-0 size-[24px]" style={{ "--transform-inner-width": "1183", "--transform-inner-height": "22" } as React.CSSProperties}>
            <div className="flex-none rotate-90">
              <div className="overflow-clip relative size-[24px]" data-name="24px/directional/caret-up">
                <div className="absolute bottom-[33.33%] left-1/4 right-1/4 top-[33.33%]" data-name="Vector">
                  <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12 8">
                    <path d={svgPaths.p2fbf4df0} fill="var(--fill-0, black)" id="Vector" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
          <Content51 />
        </div>
      </div>
    </div>
  );
}

function Content52() {
  return (
    <div className="content-stretch flex gap-[8px] items-center overflow-clip px-[12px] relative shrink-0" data-name="Content">
      <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[#262626] text-[14px] whitespace-nowrap">
        <p className="leading-[20px]">Building Sitework</p>
      </div>
    </div>
  );
}

function TableItemHeaderItem47() {
  return (
    <div className="h-full relative shrink-0 w-[480px]" data-name="Table Item / Header Item">
      <div className="flex flex-col justify-center size-full">
        <div className="content-stretch flex flex-col items-start justify-center p-[12px] relative size-full">
          <Content52 />
        </div>
      </div>
    </div>
  );
}

function Divider23() {
  return (
    <div className="h-full relative shrink-0 w-[2px]" data-name="Divider">
      <div className="flex flex-col items-center justify-center overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex flex-col items-center justify-center py-[4px] size-full" />
      </div>
    </div>
  );
}

function Content53() {
  return <div className="content-stretch flex gap-[8px] items-center overflow-clip px-[12px] shrink-0" data-name="Content" />;
}

function TableItemHeaderItem48() {
  return (
    <div className="h-full relative shrink-0 w-[440px]" data-name="Table Item / Header Item">
      <div className="flex flex-col justify-center size-full">
        <div className="content-stretch flex flex-col items-start justify-center py-[12px] relative size-full">
          <Content53 />
        </div>
      </div>
    </div>
  );
}

function HeaderRow15() {
  return (
    <div className="content-stretch flex h-[44px] items-start relative shrink-0 w-full" data-name="Header Row">
      <div aria-hidden="true" className="absolute border-[#d9d9d9] border-b border-solid inset-0 pointer-events-none" />
      <TableItemHeaderItem46 />
      <TableItemHeaderItem47 />
      <Divider23 />
      <TableItemHeaderItem48 />
    </div>
  );
}

function ContainerBackgroundColor() {
  return (
    <div className="bg-[#fafafa] flex-[1_0_0] min-h-px min-w-px relative rounded-[8px] w-full" data-name="Container+BackgroundColor">
      <div className="content-stretch flex flex-col items-start overflow-clip relative rounded-[inherit] size-full">
        <Row3 />
        <HeaderRow />
        <HeaderRow1 />
        <HeaderRow2 />
        <HeaderRow3 />
        <HeaderRow4 />
        <HeaderRow5 />
        <HeaderRow6 />
        <HeaderRow7 />
        <HeaderRow8 />
        <HeaderRow9 />
        <HeaderRow10 />
        <HeaderRow11 />
        <HeaderRow12 />
        <HeaderRow13 />
        <HeaderRow14 />
        <HeaderRow15 />
      </div>
      <div aria-hidden="true" className="absolute border border-[#dedede] border-solid inset-0 pointer-events-none rounded-[8px]" />
    </div>
  );
}

function Frame3() {
  return (
    <div className="flex-[1_0_0] min-h-px min-w-px relative w-full z-[2]">
      <div className="content-stretch flex flex-col items-start p-[12px] relative size-full">
        <ContainerBackgroundColor />
      </div>
    </div>
  );
}

function Chevron() {
  return (
    <div className="h-[12px] relative shrink-0 w-[9px]" data-name="Chevron">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 9 12">
        <g id="Chevron">
          <rect fill="var(--fill-0, #BFBFBF)" height="12" rx="2" width="9" />
          <path d={svgPaths.p575a000} fill="var(--fill-0, #F2F3F4)" id="Icon" />
        </g>
      </svg>
    </div>
  );
}

function MasterSliderFill() {
  return (
    <div className="bg-white h-[12px] relative rounded-[6px] shrink-0 w-[1200px]" data-name="master/slider/fill">
      <div className="absolute bg-[#ff9b6d] inset-0 rounded-[6px]" data-name="Rectangle 3.1" />
    </div>
  );
}

function Chevron1() {
  return (
    <div className="h-[12px] relative w-[9px]" data-name="Chevron">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 9 12">
        <g id="Chevron">
          <rect fill="var(--fill-0, #BFBFBF)" height="12" rx="2" width="9" />
          <path d={svgPaths.p575a000} fill="var(--fill-0, #F2F3F4)" id="Icon" />
        </g>
      </svg>
    </div>
  );
}

function Row5() {
  return (
    <div className="bg-[#f0f0f0] col-1 content-stretch flex h-[12px] items-center justify-between ml-0 mt-0 relative row-1 w-[1640px]" data-name="Row">
      <div aria-hidden="true" className="absolute border-[#d9d9d9] border-b border-solid inset-0 pointer-events-none" />
      <Chevron />
      <MasterSliderFill />
      <div className="flex items-center justify-center relative shrink-0">
        <div className="flex-none rotate-180">
          <Chevron1 />
        </div>
      </div>
    </div>
  );
}

function Group4() {
  return (
    <div className="grid-cols-[max-content] grid-rows-[max-content] inline-grid leading-[0] place-items-start relative shrink-0 w-full z-[1]">
      <Row5 />
    </div>
  );
}

export default function ToolBody() {
  return (
    <div className="bg-white content-stretch flex flex-col isolate items-center relative size-full" data-name="Tool Body">
      <Row />
      <Row1 />
      <Frame3 />
      <Group4 />
    </div>
  );
}