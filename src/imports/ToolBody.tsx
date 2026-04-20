import svgPaths from "./svg-jpt1xofibq";
import imgAvatar from "figma:asset/5d8ef005878d70532e56964fc87a73ec8e9a828c.png";

function Frame() {
  return (
    <div className="content-stretch flex items-center relative shrink-0">
      <p className="font-['Inter:Bold',sans-serif] font-bold leading-[44px] not-italic relative shrink-0 text-[#1d2c38] text-[38px] whitespace-nowrap">Users</p>
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
    <div className="bg-white content-stretch flex h-[96px] items-center relative shrink-0 w-full z-[2]" data-name="Row">
      <div aria-hidden="true" className="absolute border-[#d9d9d9] border-b border-solid inset-0 pointer-events-none" />
      <TableItemRowItem />
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

function Content() {
  return (
    <div className="bg-[#f2f3f4] h-[40px] relative rounded-[4px] shrink-0" data-name="content">
      <div className="content-stretch flex gap-[4px] h-full items-center justify-center overflow-clip px-[16px] relative rounded-[inherit]">
        <div className="overflow-clip relative shrink-0 size-[24px]" data-name="24px/app/filter">
          <div className="absolute inset-[8.33%_12.5%]">
            <div className="absolute inset-[-3.75%_-4.17%]">
              <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 19.5 21.5">
                <path d={svgPaths.p55f5a00} id="Vector 166" stroke="var(--stroke-0, #616D79)" strokeLinejoin="round" strokeWidth="1.5" />
              </svg>
            </div>
          </div>
        </div>
        <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[#616d79] text-[16px] text-center whitespace-nowrap">
          <p className="leading-[22px] whitespace-pre">{`Filter  `}</p>
        </div>
      </div>
      <div aria-hidden="true" className="absolute border border-[#c3c7cc] border-solid inset-0 pointer-events-none rounded-[4px]" />
    </div>
  );
}

function Button() {
  return (
    <div className="content-stretch flex flex-col h-[44px] items-center justify-center py-[2px] relative shrink-0" data-name="Button">
      <Content />
    </div>
  );
}

function Content1() {
  return (
    <div className="content-stretch flex h-[40px] items-center justify-center overflow-clip px-[16px] relative rounded-[4px] shrink-0" data-name="content">
      <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[#616d79] text-[0px] text-center whitespace-nowrap">
        <p className="[text-decoration-skip-ink:none] decoration-solid leading-[22px] text-[16px] underline whitespace-pre">{`Reset Filter  `}</p>
      </div>
    </div>
  );
}

function Button1() {
  return (
    <div className="content-stretch flex flex-col h-[44px] items-center justify-center py-[2px] relative shrink-0" data-name="Button">
      <Content1 />
    </div>
  );
}

function Frame2() {
  return (
    <div className="content-stretch flex gap-[12px] items-center relative shrink-0">
      <div className="bg-white content-stretch flex gap-[8px] h-[40px] items-center px-[8px] relative rounded-[4px] shrink-0 w-[363px]" data-name="Input Field">
        <div aria-hidden="true" className="absolute border border-[#d9d9d9] border-solid inset-0 pointer-events-none rounded-[4px]" />
        <div className="overflow-clip relative shrink-0 size-[24px]" data-name="24px/app/search">
          <Group />
        </div>
        <div className="flex flex-[1_0_0] flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] min-h-px min-w-px not-italic relative text-[#8c8c8c] text-[14px]">
          <p className="leading-[20px]">Search files by name or number</p>
        </div>
      </div>
      <Button />
      <Button1 />
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

function Group3() {
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
          <Group3 />
        </div>
        <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[#616d79] text-[16px] text-center whitespace-nowrap">
          <p className="leading-[22px] whitespace-pre">{`Import  `}</p>
        </div>
        <div className="overflow-clip relative shrink-0 size-[24px]" data-name="24px/directional/chevron-down">
          <div className="absolute bottom-[37.5%] flex items-center justify-center left-1/4 right-1/4 top-[37.5%]">
            <div className="-rotate-90 flex-none h-[12px] w-[6px]">
              <div className="relative size-full" data-name="Vector">
                <div className="absolute inset-[-8.84%_-17.68%]">
                  <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 8.12132 14.1213">
                    <path d={svgPaths.p5cbda00} id="Vector" stroke="var(--stroke-0, #616D79)" strokeLinecap="square" strokeWidth="1.5" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div aria-hidden="true" className="absolute border border-[#c3c7cc] border-solid inset-0 pointer-events-none rounded-[4px]" />
    </div>
  );
}

function Group4() {
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
          <Group4 />
        </div>
        <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[#616d79] text-[16px] text-center whitespace-nowrap">
          <p className="leading-[22px]">{`Export `}</p>
        </div>
        <div className="overflow-clip relative shrink-0 size-[24px]" data-name="24px/directional/chevron-down">
          <div className="absolute bottom-[37.5%] flex items-center justify-center left-1/4 right-1/4 top-[37.5%]">
            <div className="-rotate-90 flex-none h-[12px] w-[6px]">
              <div className="relative size-full" data-name="Vector">
                <div className="absolute inset-[-8.84%_-17.68%]">
                  <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 8.12132 14.1213">
                    <path d={svgPaths.p5cbda00} id="Vector" stroke="var(--stroke-0, #616D79)" strokeLinecap="square" strokeWidth="1.5" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div aria-hidden="true" className="absolute border border-[#c3c7cc] border-solid inset-0 pointer-events-none rounded-[4px]" />
    </div>
  );
}

function Content5() {
  return (
    <div className="bg-[#ff4d00] content-stretch flex gap-[4px] h-[40px] items-center justify-center overflow-clip px-[16px] relative rounded-[4px] shrink-0" data-name="content">
      <div className="overflow-clip relative shrink-0 size-[24px]" data-name="plus">
        <div className="absolute inset-[22.49%_23.73%_24.96%_23.73%]" data-name="plus">
          <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12.611 12.611">
            <path d={svgPaths.p28c07a00} fill="var(--fill-0, white)" id="plus" />
          </svg>
        </div>
      </div>
      <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[16px] text-center text-white whitespace-nowrap">
        <p className="leading-[22px]">{`Add User `}</p>
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

function TableItemRowItem1() {
  return (
    <div className="content-stretch flex flex-[1_0_0] h-[44px] items-center justify-between min-h-px min-w-px py-[4px] relative" data-name="Table Item / Row Item">
      <Frame2 />
      <Frame1 />
    </div>
  );
}

function Row1() {
  return (
    <div className="bg-[#f0f0f0] h-[56px] relative shrink-0 w-full" data-name="Row">
      <div aria-hidden="true" className="absolute border-[#d9d9d9] border-b border-solid inset-0 pointer-events-none" />
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex items-center justify-between px-[48px] relative size-full">
          <TableItemRowItem1 />
        </div>
      </div>
    </div>
  );
}

function Content6() {
  return (
    <div className="content-stretch flex gap-[8px] items-center overflow-clip px-[12px] relative shrink-0" data-name="Content">
      <div className="flex flex-col font-['Inter:Semi_Bold',sans-serif] font-semibold justify-center leading-[0] not-italic relative shrink-0 text-[#262626] text-[14px] whitespace-nowrap">
        <p className="leading-[20px]">Group by</p>
      </div>
    </div>
  );
}

function Group13() {
  return (
    <div className="absolute inset-[12.5%_12.5%_12.5%_57.5%]">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 4.79999 12">
        <g id="Group 212">
          <path d={svgPaths.p8385ff0} fill="var(--fill-0, #384857)" id="Vector" />
          <path d={svgPaths.p250e5280} fill="var(--fill-0, #384857)" id="Vector_2" />
        </g>
      </svg>
    </div>
  );
}

function Group8() {
  return (
    <div className="absolute inset-[12.5%_57.5%_12.5%_12.5%]">
      <div className="absolute inset-[0_-7.37%_-5.89%_-7.36%]">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 5.5071 12.7071">
          <g id="Group 160">
            <path d={svgPaths.p2c66cb00} id="Vector 8" stroke="var(--stroke-0, #384857)" />
            <path d={svgPaths.p2bca9480} id="Vector" stroke="var(--stroke-0, #384857)" />
          </g>
        </svg>
      </div>
    </div>
  );
}

function Group5() {
  return (
    <div className="absolute contents inset-[12.5%]">
      <Group13 />
      <Group8 />
    </div>
  );
}

function Group1() {
  return (
    <div className="relative size-full">
      <div className="absolute inset-[-6.25%]">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 13.5 13.5">
          <g id="Group 32">
            <path d="M0.75 6.75H12.75" id="Vector 19" stroke="var(--stroke-0, #384857)" strokeLinecap="square" strokeWidth="1.5" />
            <path d="M6.75 0.75L6.75 12.75" id="Vector 20" stroke="var(--stroke-0, #384857)" strokeLinecap="square" strokeWidth="1.5" />
          </g>
        </svg>
      </div>
    </div>
  );
}

function Content7() {
  return (
    <div className="bg-[#e6f7ff] content-stretch flex gap-[8px] h-[32px] items-center justify-center px-[12px] relative rounded-[4px] shrink-0" data-name="content">
      <div aria-hidden="true" className="absolute border border-[#91d5ff] border-solid inset-0 pointer-events-none rounded-[4px]" />
      <div className="overflow-clip relative shrink-0 size-[16px]" data-name="32px/app/sort-descending">
        <Group5 />
      </div>
      <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[#262626] text-[16px] text-center whitespace-nowrap">
        <p className="leading-[24px]">Company</p>
      </div>
      <div className="overflow-clip relative shrink-0 size-[16px]" data-name="24px/suggested/x">
        <div className="absolute flex inset-[-3.03%] items-center justify-center">
          <div className="flex-none rotate-45 size-[18px]">
            <Group1 />
          </div>
        </div>
      </div>
    </div>
  );
}

function Pill() {
  return (
    <div className="content-stretch flex flex-col h-[44px] items-center justify-center relative shrink-0" data-name="Pill">
      <Content7 />
    </div>
  );
}

function Group14() {
  return (
    <div className="absolute inset-[8.33%_8.33%_8.33%_58.33%]">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 5.33333 13.3333">
        <g id="Group 212">
          <path d={svgPaths.p37564780} fill="var(--fill-0, #384857)" id="Vector" />
          <path d={svgPaths.pc5e3900} fill="var(--fill-0, #384857)" id="Vector_2" />
        </g>
      </svg>
    </div>
  );
}

function Group9() {
  return (
    <div className="relative size-full">
      <div className="absolute inset-[0_-6.62%_-5.3%_-6.64%]">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 6.04044 14.0404">
          <g id="Group 160">
            <path d={svgPaths.p1f22d700} id="Vector 8" stroke="var(--stroke-0, #384857)" />
            <path d={svgPaths.p1585c000} id="Vector" stroke="var(--stroke-0, #384857)" />
          </g>
        </svg>
      </div>
    </div>
  );
}

function Group6() {
  return (
    <div className="absolute contents inset-[8.33%]">
      <Group14 />
      <div className="absolute flex inset-[8.33%_58.33%_8.33%_8.33%] items-center justify-center">
        <div className="flex-none h-[20px] rotate-180 w-[8px]">
          <Group9 />
        </div>
      </div>
    </div>
  );
}

function Group2() {
  return (
    <div className="relative size-full">
      <div className="absolute inset-[-6.25%]">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 13.5 13.5">
          <g id="Group 32">
            <path d="M0.75 6.75H12.75" id="Vector 19" stroke="var(--stroke-0, #384857)" strokeLinecap="square" strokeWidth="1.5" />
            <path d="M6.75 0.75L6.75 12.75" id="Vector 20" stroke="var(--stroke-0, #384857)" strokeLinecap="square" strokeWidth="1.5" />
          </g>
        </svg>
      </div>
    </div>
  );
}

function Content8() {
  return (
    <div className="bg-[#e6f7ff] content-stretch flex gap-[8px] h-[32px] items-center justify-center px-[12px] relative rounded-[4px] shrink-0" data-name="content">
      <div aria-hidden="true" className="absolute border border-[#91d5ff] border-solid inset-0 pointer-events-none rounded-[4px]" />
      <div className="overflow-clip relative shrink-0 size-[16px]" data-name="24px/app/sort-ascending">
        <Group6 />
      </div>
      <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[#262626] text-[16px] text-center whitespace-nowrap">
        <p className="leading-[24px]">Office</p>
      </div>
      <div className="overflow-clip relative shrink-0 size-[16px]" data-name="24px/suggested/x">
        <div className="absolute flex inset-[-3.03%] items-center justify-center">
          <div className="flex-none rotate-45 size-[18px]">
            <Group2 />
          </div>
        </div>
      </div>
    </div>
  );
}

function Pill1() {
  return (
    <div className="content-stretch flex flex-col h-[44px] items-center justify-center relative shrink-0" data-name="Pill">
      <Content8 />
    </div>
  );
}

function Frame3() {
  return (
    <div className="content-stretch flex gap-[8px] items-center relative shrink-0">
      <Content6 />
      <Pill />
      <Pill1 />
    </div>
  );
}

function Frame5() {
  return <div className="content-stretch flex gap-[4px] items-center shrink-0" />;
}

function TableItemRowItem2() {
  return (
    <div className="h-[44px] relative shrink-0 w-full" data-name="Table Item / Row Item">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex items-center justify-between pl-[24px] pr-[48px] py-[4px] relative size-full">
          <Frame3 />
          <Frame5 />
        </div>
      </div>
    </div>
  );
}

function TableItemHeaderItem() {
  return (
    <div className="h-full relative shrink-0 w-[48px]" data-name="Table Item / Header Item">
      <div className="flex flex-col justify-center size-full">
        <div className="size-full" />
      </div>
    </div>
  );
}

function DividerLine() {
  return <div className="bg-[#d9d9d9] flex-[1_0_0] min-h-px min-w-px rounded-[1px] w-[2px]" data-name="Divider Line" />;
}

function Divider() {
  return (
    <div className="h-full relative shrink-0 w-[2px]" data-name="Divider">
      <div className="flex flex-col items-center justify-center overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex flex-col items-center justify-center py-[4px] relative size-full">
          <DividerLine />
        </div>
      </div>
    </div>
  );
}

function Content9() {
  return (
    <div className="content-stretch flex items-center overflow-clip px-[12px] relative shrink-0" data-name="Content">
      <div className="flex flex-col font-['Inter:Semi_Bold',sans-serif] font-semibold justify-center leading-[0] not-italic relative shrink-0 text-[#262626] text-[16px] whitespace-nowrap">
        <p className="leading-[24px]">User</p>
      </div>
    </div>
  );
}

function Group15() {
  return (
    <div className="absolute inset-[12.5%_12.5%_12.5%_57.5%]">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 4.79999 12">
        <g id="Group 212">
          <path d={svgPaths.p8385ff0} fill="var(--fill-0, #384857)" id="Vector" />
          <path d={svgPaths.p250e5280} fill="var(--fill-0, #384857)" id="Vector_2" />
        </g>
      </svg>
    </div>
  );
}

function Group10() {
  return (
    <div className="absolute inset-[12.5%_57.5%_12.5%_12.5%]">
      <div className="absolute inset-[0_-7.37%_-5.89%_-7.36%]">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 5.5071 12.7071">
          <g id="Group 160">
            <path d={svgPaths.p2c66cb00} id="Vector 8" stroke="var(--stroke-0, #384857)" />
            <path d={svgPaths.p2bca9480} id="Vector" stroke="var(--stroke-0, #384857)" />
          </g>
        </svg>
      </div>
    </div>
  );
}

function Group7() {
  return (
    <div className="absolute contents inset-[12.5%]">
      <Group15 />
      <Group10 />
    </div>
  );
}

function TableItemHeaderItem1() {
  return (
    <div className="bg-[rgba(203,203,203,0.41)] h-full relative shrink-0 w-[380px]" data-name="Table Item / Header Item">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex items-center justify-between pr-[24px] py-[12px] relative size-full">
          <Content9 />
          <div className="overflow-clip relative shrink-0 size-[16px]" data-name="32px/app/sort-descending">
            <Group7 />
          </div>
        </div>
      </div>
    </div>
  );
}

function DividerLine1() {
  return <div className="bg-[#d9d9d9] flex-[1_0_0] min-h-px min-w-px rounded-[1px] w-[2px]" data-name="Divider Line" />;
}

function Divider1() {
  return (
    <div className="h-full relative shrink-0 w-[2px]" data-name="Divider">
      <div className="flex flex-col items-center justify-center overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex flex-col items-center justify-center py-[4px] relative size-full">
          <DividerLine1 />
        </div>
      </div>
    </div>
  );
}

function Content10() {
  return (
    <div className="content-stretch flex items-center justify-center overflow-clip px-[12px] relative shrink-0" data-name="Content">
      <div className="flex flex-col font-['Inter:Semi_Bold',sans-serif] font-semibold justify-center leading-[0] not-italic relative shrink-0 text-[#262626] text-[16px] whitespace-nowrap">
        <p className="leading-[24px]">Job Title</p>
      </div>
    </div>
  );
}

function TableItemHeaderItem2() {
  return (
    <div className="h-full relative shrink-0 w-[160px]" data-name="Table Item / Header Item">
      <div className="flex flex-col justify-center size-full">
        <div className="content-stretch flex flex-col items-start justify-center py-[12px] relative size-full">
          <Content10 />
        </div>
      </div>
    </div>
  );
}

function DividerLine2() {
  return <div className="bg-[#d9d9d9] flex-[1_0_0] min-h-px min-w-px rounded-[1px] w-[2px]" data-name="Divider Line" />;
}

function Divider2() {
  return (
    <div className="h-full relative shrink-0 w-[2px]" data-name="Divider">
      <div className="flex flex-col items-center justify-center overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex flex-col items-center justify-center py-[4px] relative size-full">
          <DividerLine2 />
        </div>
      </div>
    </div>
  );
}

function Content11() {
  return (
    <div className="content-stretch flex items-center justify-center overflow-clip px-[12px] relative shrink-0" data-name="Content">
      <div className="flex flex-col font-['Inter:Semi_Bold',sans-serif] font-semibold justify-center leading-[0] not-italic relative shrink-0 text-[#262626] text-[16px] whitespace-nowrap">
        <p className="leading-[24px]">Company</p>
      </div>
    </div>
  );
}

function TableItemHeaderItem3() {
  return (
    <div className="h-full relative shrink-0 w-[160px]" data-name="Table Item / Header Item">
      <div className="flex flex-col justify-center size-full">
        <div className="content-stretch flex flex-col items-start justify-center py-[12px] relative size-full">
          <Content11 />
        </div>
      </div>
    </div>
  );
}

function DividerLine3() {
  return <div className="bg-[#d9d9d9] flex-[1_0_0] min-h-px min-w-px rounded-[1px] w-[2px]" data-name="Divider Line" />;
}

function Divider3() {
  return (
    <div className="h-full relative shrink-0" data-name="Divider">
      <div className="flex flex-col items-center justify-center overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex flex-col h-full items-center justify-center py-[4px] relative">
          <DividerLine3 />
        </div>
      </div>
    </div>
  );
}

function Content12() {
  return (
    <div className="content-stretch flex items-center justify-center overflow-clip px-[12px] relative shrink-0" data-name="Content">
      <div className="flex flex-col font-['Inter:Semi_Bold',sans-serif] font-semibold justify-center leading-[0] not-italic relative shrink-0 text-[#262626] text-[16px] whitespace-nowrap">
        <p className="leading-[24px]">Office</p>
      </div>
    </div>
  );
}

function TableItemHeaderItem4() {
  return (
    <div className="h-full relative shrink-0 w-[180px]" data-name="Table Item / Header Item">
      <div className="flex flex-col justify-center size-full">
        <div className="content-stretch flex flex-col items-start justify-center py-[12px] relative size-full">
          <Content12 />
        </div>
      </div>
    </div>
  );
}

function DividerLine4() {
  return <div className="bg-[#d9d9d9] flex-[1_0_0] min-h-px min-w-px rounded-[1px] w-[2px]" data-name="Divider Line" />;
}

function Divider4() {
  return (
    <div className="h-full relative shrink-0" data-name="Divider">
      <div className="flex flex-col items-center justify-center overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex flex-col h-full items-center justify-center py-[4px] relative">
          <DividerLine4 />
        </div>
      </div>
    </div>
  );
}

function Content13() {
  return (
    <div className="content-stretch flex items-center justify-center overflow-clip px-[12px] relative shrink-0" data-name="Content">
      <div className="flex flex-col font-['Inter:Semi_Bold',sans-serif] font-semibold justify-center leading-[0] not-italic relative shrink-0 text-[#262626] text-[16px] whitespace-nowrap">
        <p className="leading-[24px]">Access Level - Role</p>
      </div>
    </div>
  );
}

function TableItemHeaderItem5() {
  return (
    <div className="h-full relative shrink-0 w-[228px]" data-name="Table Item / Header Item">
      <div className="flex flex-col justify-center size-full">
        <div className="content-stretch flex flex-col items-start justify-center py-[12px] relative size-full">
          <Content13 />
        </div>
      </div>
    </div>
  );
}

function DividerLine5() {
  return <div className="bg-[#d9d9d9] flex-[1_0_0] min-h-px min-w-px rounded-[1px] w-[2px]" data-name="Divider Line" />;
}

function Divider5() {
  return (
    <div className="h-full relative shrink-0" data-name="Divider">
      <div className="flex flex-col items-center justify-center overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex flex-col h-full items-center justify-center py-[4px] relative">
          <DividerLine5 />
        </div>
      </div>
    </div>
  );
}

function Content14() {
  return (
    <div className="content-stretch flex items-center justify-center overflow-clip px-[12px] relative shrink-0" data-name="Content">
      <div className="flex flex-col font-['Inter:Semi_Bold',sans-serif] font-semibold justify-center leading-[0] not-italic relative shrink-0 text-[#262626] text-[16px] whitespace-nowrap">
        <p className="leading-[24px]">Team</p>
      </div>
    </div>
  );
}

function TableItemHeaderItem6() {
  return (
    <div className="h-full relative shrink-0 w-[228px]" data-name="Table Item / Header Item">
      <div className="flex flex-col justify-center size-full">
        <div className="content-stretch flex flex-col items-start justify-center py-[12px] relative size-full">
          <Content14 />
        </div>
      </div>
    </div>
  );
}

function DividerLine6() {
  return <div className="bg-[#d9d9d9] flex-[1_0_0] min-h-px min-w-px rounded-[1px] w-[2px]" data-name="Divider Line" />;
}

function Divider6() {
  return (
    <div className="h-full relative shrink-0" data-name="Divider">
      <div className="flex flex-col items-center justify-center overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex flex-col h-full items-center justify-center py-[4px] relative">
          <DividerLine6 />
        </div>
      </div>
    </div>
  );
}

function Content15() {
  return (
    <div className="content-stretch flex items-center justify-center overflow-clip px-[12px] relative shrink-0" data-name="Content">
      <div className="flex flex-col font-['Inter:Semi_Bold',sans-serif] font-semibold justify-center leading-[0] not-italic relative shrink-0 text-[#262626] text-[16px] whitespace-nowrap">
        <p className="leading-[24px]">Status</p>
      </div>
    </div>
  );
}

function TableItemHeaderItem7() {
  return (
    <div className="flex-[1_0_0] h-full min-h-px min-w-px relative" data-name="Table Item / Header Item">
      <div className="content-stretch flex flex-col items-start justify-between py-[12px] relative size-full">
        <Content15 />
      </div>
    </div>
  );
}

function DividerLine7() {
  return <div className="bg-[#d9d9d9] flex-[1_0_0] min-h-px min-w-px rounded-[1px] w-[2px]" data-name="Divider Line" />;
}

function Divider7() {
  return (
    <div className="h-full relative shrink-0" data-name="Divider">
      <div className="flex flex-col items-center justify-center overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex flex-col h-full items-center justify-center py-[4px] relative">
          <DividerLine7 />
        </div>
      </div>
    </div>
  );
}

function Group16() {
  return (
    <div className="grid-cols-[max-content] grid-rows-[max-content] inline-grid leading-[0] place-items-start relative shrink-0">
      <div className="bg-[#616d79] col-1 h-[3px] ml-0 mt-0 row-1 w-[13px]" />
      <div className="bg-[#616d79] col-1 h-[3px] ml-0 mt-[6px] row-1 w-[13px]" />
      <div className="bg-[#616d79] col-1 h-[3px] ml-0 mt-[12px] row-1 w-[13px]" />
      <div className="bg-[#616d79] col-1 h-[3px] ml-0 mt-[18px] row-1 w-[13px]" />
      <div className="bg-[#616d79] col-1 h-[3px] ml-0 mt-[24px] row-1 w-[13px]" />
      <div className="bg-[#616d79] col-1 h-[3px] ml-[17px] mt-0 row-1 w-[13px]" />
      <div className="bg-[#616d79] col-1 h-[3px] ml-[17px] mt-[6px] row-1 w-[13px]" />
      <div className="bg-[#616d79] col-1 h-[3px] ml-[17px] mt-[12px] row-1 w-[13px]" />
      <div className="bg-[#616d79] col-1 h-[3px] ml-[17px] mt-[18px] row-1 w-[13px]" />
      <div className="bg-[#616d79] col-1 h-[3px] ml-[17px] mt-[24px] row-1 w-[13px]" />
    </div>
  );
}

function IconRegularTableList() {
  return (
    <div className="content-stretch flex flex-col items-center justify-center overflow-clip px-[3px] py-[4px] relative shrink-0" data-name="Icon/Regular/table-list">
      <Group16 />
    </div>
  );
}

function TableItemHeaderItem8() {
  return (
    <div className="h-full relative shrink-0 w-[60px]" data-name="Table Item / Header Item">
      <div className="flex flex-col justify-center size-full">
        <div className="content-stretch flex flex-col items-start justify-center p-[12px] relative size-full">
          <IconRegularTableList />
        </div>
      </div>
    </div>
  );
}

function HeaderRow() {
  return (
    <div className="bg-[#f0f0f0] content-stretch flex h-[56px] items-start relative shrink-0 w-full" data-name="Header Row">
      <div aria-hidden="true" className="absolute border-[#d9d9d9] border-b border-solid inset-0 pointer-events-none" />
      <TableItemHeaderItem />
      <Divider />
      <TableItemHeaderItem1 />
      <Divider1 />
      <TableItemHeaderItem2 />
      <Divider2 />
      <TableItemHeaderItem3 />
      <Divider3 />
      <TableItemHeaderItem4 />
      <Divider4 />
      <TableItemHeaderItem5 />
      <Divider5 />
      <TableItemHeaderItem6 />
      <Divider6 />
      <TableItemHeaderItem7 />
      <Divider7 />
      <TableItemHeaderItem8 />
    </div>
  );
}

function Padding() {
  return (
    <div className="content-stretch flex items-start p-[4px] relative rounded-[100px] shrink-0" data-name="Padding">
      <div className="overflow-clip relative shrink-0 size-[24px]" data-name="_hidden">
        <div className="absolute inset-[12.5%]" data-name="Vector">
          <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 18 18">
            <path d={svgPaths.pae529f2} fill="var(--fill-0, #0E70CB)" id="Vector" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function Content16() {
  return (
    <div className="content-stretch flex gap-[8px] items-center overflow-clip px-[12px] relative shrink-0" data-name="Content">
      <div className="flex flex-col font-['Inter:Semi_Bold',sans-serif] font-semibold justify-center leading-[0] not-italic relative shrink-0 text-[#262626] text-[14px] whitespace-nowrap">
        <p className="leading-[20px]">Henrich Advisory</p>
      </div>
    </div>
  );
}

function TableItemHeaderItem10() {
  return (
    <div className="flex-[1_0_0] h-full min-h-px min-w-px relative" data-name="Table Item / Header Item">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex items-center px-[12px] py-[10px] relative size-full">
          <div className="content-stretch flex items-center justify-center relative shrink-0 size-[24px]" data-name="Checkbox/Checkbox-Label">
            <div className="content-stretch flex items-center overflow-clip relative shrink-0" data-name="Checkbox/">
              <Padding />
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
          <Content16 />
        </div>
      </div>
    </div>
  );
}

function TableItemHeaderItem9() {
  return (
    <div className="h-full relative shrink-0 w-[380px]" data-name="Table Item / Header Item">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex items-center justify-between pr-[24px] py-[12px] relative size-full">
          <TableItemHeaderItem10 />
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

function HeaderRow1() {
  return (
    <div className="bg-[#e6f7ff] content-stretch flex h-[42px] items-start relative shrink-0 w-full" data-name="Header Row">
      <div aria-hidden="true" className="absolute border-[#d9d9d9] border-b border-solid inset-0 pointer-events-none" />
      <TableItemHeaderItem9 />
      <Divider8 />
    </div>
  );
}

function Padding1() {
  return (
    <div className="content-stretch flex items-start p-[4px] relative rounded-[100px] shrink-0" data-name="Padding">
      <div className="overflow-clip relative shrink-0 size-[24px]" data-name="_hidden">
        <div className="absolute inset-[12.5%]" data-name="Vector">
          <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 18 18">
            <path d={svgPaths.pae529f2} fill="var(--fill-0, #0E70CB)" id="Vector" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function Content17() {
  return (
    <div className="content-stretch flex gap-[8px] items-center overflow-clip px-[12px] relative shrink-0" data-name="Content">
      <div className="flex flex-col font-['Inter:Semi_Bold',sans-serif] font-semibold justify-center leading-[0] not-italic relative shrink-0 text-[#262626] text-[14px] whitespace-nowrap">
        <p className="leading-[20px]">Boston</p>
      </div>
    </div>
  );
}

function TableItemHeaderItem12() {
  return (
    <div className="flex-[1_0_0] h-full min-h-px min-w-px relative" data-name="Table Item / Header Item">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex items-center px-[12px] py-[10px] relative size-full">
          <div className="content-stretch flex items-center justify-center relative shrink-0 size-[24px]" data-name="Checkbox/Checkbox-Label">
            <div className="content-stretch flex items-center overflow-clip relative shrink-0" data-name="Checkbox/">
              <Padding1 />
            </div>
          </div>
          <div className="flex items-center justify-center relative shrink-0">
            <div className="flex-none rotate-180">
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
          <Content17 />
        </div>
      </div>
    </div>
  );
}

function TableItemHeaderItem11() {
  return (
    <div className="h-full relative shrink-0 w-[380px]" data-name="Table Item / Header Item">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex items-center justify-between pr-[24px] py-[12px] relative size-full">
          <TableItemHeaderItem12 />
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

function HeaderRow2() {
  return (
    <div className="bg-[#e6f7ff] content-stretch flex h-[42px] items-start relative shrink-0 w-full" data-name="Header Row">
      <div aria-hidden="true" className="absolute border-[#d9d9d9] border-b border-solid inset-0 pointer-events-none" />
      <TableItemHeaderItem11 />
      <Divider9 />
    </div>
  );
}

function Padding2() {
  return (
    <div className="content-stretch flex items-start p-[4px] relative rounded-[100px] shrink-0" data-name="Padding">
      <div className="overflow-clip relative shrink-0 size-[24px]" data-name="_hidden">
        <div className="absolute inset-[12.5%]" data-name="Vector">
          <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 18 18">
            <path d={svgPaths.pae529f2} fill="var(--fill-0, #0E70CB)" id="Vector" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function TableItemHeaderItem13() {
  return (
    <div className="h-full relative shrink-0 w-[48px]" data-name="Table Item / Header Item">
      <div className="flex flex-col items-center justify-center size-full">
        <div className="content-stretch flex flex-col items-center justify-center px-[12px] py-[10px] relative size-full">
          <div className="content-stretch flex items-center overflow-clip relative shrink-0" data-name="Checkbox/">
            <Padding2 />
          </div>
        </div>
      </div>
    </div>
  );
}

function Avatar() {
  return (
    <div className="relative rounded-[200px] shrink-0 size-[40px]" data-name="Avatar">
      <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none rounded-[200px] size-full" src={imgAvatar} />
    </div>
  );
}

function Content18() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col items-start min-h-px min-w-px relative" data-name="Content">
      <p className="font-['Outfit:Medium',sans-serif] font-medium leading-[20px] relative shrink-0 text-[#1d2939] text-[14px] w-full">Captain Levi</p>
      <p className="font-['Outfit:Regular',sans-serif] font-normal leading-[18px] relative shrink-0 text-[#667085] text-[12px] w-full">levi@henrichadvisory.com</p>
    </div>
  );
}

function TableCell() {
  return (
    <div className="flex-[1_0_0] h-[66px] min-h-px min-w-px relative" data-name="Table cell">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex gap-[12px] items-center px-[24px] py-[8px] relative size-full">
          <Avatar />
          <Content18 />
        </div>
      </div>
    </div>
  );
}

function TableItemHeaderItem14() {
  return (
    <div className="h-full relative shrink-0 w-[380px]" data-name="Table Item / Header Item">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex items-center justify-between pr-[24px] py-[12px] relative size-full">
          <TableCell />
          <div className="overflow-clip shrink-0 size-[16px]" data-name="32px/app/sort-descending" />
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

function Content19() {
  return (
    <div className="content-stretch flex items-center justify-center overflow-clip px-[12px] relative shrink-0" data-name="Content">
      <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[#262626] text-[16px] whitespace-nowrap">
        <p className="leading-[24px]">VDC Manager</p>
      </div>
    </div>
  );
}

function TableItemHeaderItem15() {
  return (
    <div className="h-full relative shrink-0 w-[160px]" data-name="Table Item / Header Item">
      <div className="flex flex-col justify-center size-full">
        <div className="content-stretch flex flex-col items-start justify-center py-[12px] relative size-full">
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

function Divider12() {
  return (
    <div className="h-full relative shrink-0" data-name="Divider">
      <div className="flex flex-col items-center justify-center overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex flex-col h-full items-center justify-center py-[4px]" />
      </div>
    </div>
  );
}

function Content20() {
  return (
    <div className="content-stretch flex items-center justify-center overflow-clip px-[12px] relative shrink-0" data-name="Content">
      <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[#262626] text-[16px] whitespace-nowrap">
        <p className="leading-[24px]">Henrich Advisory</p>
      </div>
    </div>
  );
}

function TableItemHeaderItem16() {
  return (
    <div className="h-full relative shrink-0 w-[160px]" data-name="Table Item / Header Item">
      <div className="flex flex-col justify-center size-full">
        <div className="content-stretch flex flex-col items-start justify-center py-[12px] relative size-full">
          <Content20 />
        </div>
      </div>
    </div>
  );
}

function Divider13() {
  return (
    <div className="h-full relative shrink-0" data-name="Divider">
      <div className="flex flex-col items-center justify-center overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex flex-col h-full items-center justify-center py-[4px]" />
      </div>
    </div>
  );
}

function Content21() {
  return (
    <div className="content-stretch flex items-center justify-center overflow-clip px-[12px] relative shrink-0" data-name="Content">
      <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[#262626] text-[16px] whitespace-nowrap">
        <p className="leading-[24px]">Boston</p>
      </div>
    </div>
  );
}

function TableItemHeaderItem17() {
  return (
    <div className="h-full relative shrink-0 w-[180px]" data-name="Table Item / Header Item">
      <div className="flex flex-col justify-center size-full">
        <div className="content-stretch flex flex-col items-start justify-center py-[12px] relative size-full">
          <Content21 />
        </div>
      </div>
    </div>
  );
}

function Divider14() {
  return (
    <div className="h-full relative shrink-0" data-name="Divider">
      <div className="flex flex-col items-center justify-center overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex flex-col h-full items-center justify-center py-[4px]" />
      </div>
    </div>
  );
}

function Content22() {
  return (
    <div className="content-stretch flex items-center justify-center overflow-clip px-[12px] relative shrink-0" data-name="Content">
      <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[#262626] text-[16px] whitespace-nowrap">
        <p className="leading-[24px]">Project Manager</p>
      </div>
    </div>
  );
}

function TableItemHeaderItem18() {
  return (
    <div className="h-full relative shrink-0 w-[228px]" data-name="Table Item / Header Item">
      <div className="flex flex-col justify-center size-full">
        <div className="content-stretch flex flex-col items-start justify-center py-[12px] relative size-full">
          <Content22 />
        </div>
      </div>
    </div>
  );
}

function Favicon() {
  return (
    <div className="bg-[#dde9ff] mr-[-8px] overflow-clip relative rounded-[28px] shrink-0 size-[40px]" data-name="Favicon">
      <p className="-translate-x-1/2 absolute font-['Outfit:SemiBold',sans-serif] font-semibold leading-[18px] left-[calc(50%+0.5px)] text-[#465fff] text-[12px] text-center top-[calc(50%-9px)] whitespace-nowrap">AR</p>
    </div>
  );
}

function Favicon1() {
  return (
    <div className="bg-[#fdf2fa] mr-[-8px] overflow-clip relative rounded-[28px] shrink-0 size-[40px]" data-name="Favicon">
      <p className="-translate-x-1/2 absolute font-['Outfit:SemiBold',sans-serif] font-semibold leading-[18px] left-1/2 text-[#dd2590] text-[12px] text-center top-[calc(50%-9px)] whitespace-nowrap">SC</p>
    </div>
  );
}

function Content23() {
  return (
    <div className="content-stretch flex items-center justify-center overflow-clip pl-[12px] pr-[20px] relative shrink-0" data-name="Content">
      <Favicon />
      <Favicon1 />
    </div>
  );
}

function TableItemHeaderItem19() {
  return (
    <div className="h-full relative shrink-0 w-[228px]" data-name="Table Item / Header Item">
      <div className="flex flex-col justify-center size-full">
        <div className="content-stretch flex flex-col items-start justify-center py-[12px] relative size-full">
          <Content23 />
        </div>
      </div>
    </div>
  );
}

function Divider15() {
  return (
    <div className="h-full relative shrink-0" data-name="Divider">
      <div className="flex flex-col items-center justify-center overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex flex-col h-full items-center justify-center py-[4px]" />
      </div>
    </div>
  );
}

function Content24() {
  return (
    <div className="content-stretch flex items-center justify-center overflow-clip px-[12px] relative shrink-0" data-name="Content">
      <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[#262626] text-[16px] whitespace-nowrap">
        <p className="leading-[24px]">Active</p>
      </div>
    </div>
  );
}

function TableItemHeaderItem20() {
  return (
    <div className="flex-[1_0_0] h-full min-h-px min-w-px relative" data-name="Table Item / Header Item">
      <div className="content-stretch flex flex-col items-start justify-between py-[12px] relative size-full">
        <Content24 />
      </div>
    </div>
  );
}

function Divider16() {
  return (
    <div className="h-full relative shrink-0" data-name="Divider">
      <div className="flex flex-col items-center justify-center overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex flex-col h-full items-center justify-center py-[4px]" />
      </div>
    </div>
  );
}

function Group11() {
  return (
    <div className="absolute inset-[8.33%]">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g id="Group 209">
          <circle cx="10" cy="10" id="Ellipse 12" r="9.5" stroke="var(--stroke-0, #616D79)" />
          <circle cx="9.5" cy="5.5" fill="var(--fill-0, #616D79)" id="Ellipse 23" r="1" stroke="var(--stroke-0, #616D79)" />
          <path d="M8 9H10V15M10 15H8M10 15H12" id="Vector 59" stroke="var(--stroke-0, #616D79)" strokeLinejoin="round" />
        </g>
      </svg>
    </div>
  );
}

function TableItemHeaderItem21() {
  return (
    <div className="h-full relative shrink-0 w-[60px]" data-name="Table Item / Header Item">
      <div className="flex flex-col items-center justify-center size-full">
        <div className="content-stretch flex flex-col items-center justify-center p-[12px] relative size-full">
          <div className="overflow-clip relative shrink-0 size-[24px]" data-name="24px/suggested/info-circle">
            <Group11 />
          </div>
        </div>
      </div>
    </div>
  );
}

function HeaderRow3() {
  return (
    <div className="content-stretch flex h-[66px] items-start relative shrink-0 w-full" data-name="Header Row">
      <div aria-hidden="true" className="absolute border-[#d9d9d9] border-b border-solid inset-0 pointer-events-none" />
      <TableItemHeaderItem13 />
      <TableItemHeaderItem14 />
      <Divider10 />
      <TableItemHeaderItem15 />
      <Divider11 />
      <Divider12 />
      <TableItemHeaderItem16 />
      <Divider13 />
      <TableItemHeaderItem17 />
      <Divider14 />
      <TableItemHeaderItem18 />
      <TableItemHeaderItem19 />
      <Divider15 />
      <TableItemHeaderItem20 />
      <Divider16 />
      <TableItemHeaderItem21 />
    </div>
  );
}

function Padding3() {
  return (
    <div className="content-stretch flex items-start p-[4px] relative rounded-[100px] shrink-0" data-name="Padding">
      <div className="overflow-clip relative shrink-0 size-[24px]" data-name="_hidden">
        <div className="absolute inset-[12.5%]" data-name="Vector">
          <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 18 18">
            <path d={svgPaths.pae529f2} fill="var(--fill-0, #0E70CB)" id="Vector" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function TableItemHeaderItem22() {
  return (
    <div className="h-full relative shrink-0 w-[48px]" data-name="Table Item / Header Item">
      <div className="flex flex-col items-center justify-center size-full">
        <div className="content-stretch flex flex-col items-center justify-center px-[12px] py-[10px] relative size-full">
          <div className="content-stretch flex items-center overflow-clip relative shrink-0" data-name="Checkbox/">
            <Padding3 />
          </div>
        </div>
      </div>
    </div>
  );
}

function Favicon2() {
  return (
    <div className="bg-[#dde9ff] overflow-clip relative rounded-[28px] shrink-0 size-[40px]" data-name="Favicon">
      <p className="-translate-x-1/2 absolute font-['Outfit:SemiBold',sans-serif] font-semibold leading-[18px] left-1/2 text-[#465fff] text-[12px] text-center top-[calc(50%-9px)] whitespace-nowrap">EK</p>
    </div>
  );
}

function Content25() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col items-start min-h-px min-w-px relative" data-name="Content">
      <p className="font-['Outfit:Medium',sans-serif] font-medium leading-[20px] relative shrink-0 text-[#1d2939] text-[14px] w-full">Eddie Kassaei</p>
      <p className="font-['Outfit:Regular',sans-serif] font-normal leading-[18px] relative shrink-0 text-[#667085] text-[12px] w-full">eddie@henrichadvisory.com</p>
    </div>
  );
}

function TableCell1() {
  return (
    <div className="flex-[1_0_0] h-[66px] min-h-px min-w-px relative" data-name="Table cell">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex gap-[12px] items-center px-[24px] py-[8px] relative size-full">
          <Favicon2 />
          <Content25 />
        </div>
      </div>
    </div>
  );
}

function TableItemHeaderItem23() {
  return (
    <div className="h-full relative shrink-0 w-[380px]" data-name="Table Item / Header Item">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex items-center justify-between pr-[24px] py-[12px] relative size-full">
          <TableCell1 />
          <div className="overflow-clip shrink-0 size-[16px]" data-name="32px/app/sort-descending" />
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

function Content26() {
  return (
    <div className="content-stretch flex items-center justify-center overflow-clip px-[12px] relative shrink-0" data-name="Content">
      <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[#262626] text-[16px] whitespace-nowrap">
        <p className="leading-[24px]">Project Engineer</p>
      </div>
    </div>
  );
}

function TableItemHeaderItem24() {
  return (
    <div className="h-full relative shrink-0 w-[160px]" data-name="Table Item / Header Item">
      <div className="flex flex-col justify-center size-full">
        <div className="content-stretch flex flex-col items-start justify-center py-[12px] relative size-full">
          <Content26 />
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

function Divider19() {
  return (
    <div className="h-full relative shrink-0" data-name="Divider">
      <div className="flex flex-col items-center justify-center overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex flex-col h-full items-center justify-center py-[4px]" />
      </div>
    </div>
  );
}

function Content27() {
  return (
    <div className="content-stretch flex items-center justify-center overflow-clip px-[12px] relative shrink-0" data-name="Content">
      <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[#262626] text-[16px] whitespace-nowrap">
        <p className="leading-[24px]">Henrich Advisory</p>
      </div>
    </div>
  );
}

function TableItemHeaderItem25() {
  return (
    <div className="h-full relative shrink-0 w-[160px]" data-name="Table Item / Header Item">
      <div className="flex flex-col justify-center size-full">
        <div className="content-stretch flex flex-col items-start justify-center py-[12px] relative size-full">
          <Content27 />
        </div>
      </div>
    </div>
  );
}

function Divider20() {
  return (
    <div className="h-full relative shrink-0" data-name="Divider">
      <div className="flex flex-col items-center justify-center overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex flex-col h-full items-center justify-center py-[4px]" />
      </div>
    </div>
  );
}

function Content28() {
  return (
    <div className="content-stretch flex items-center justify-center overflow-clip px-[12px] relative shrink-0" data-name="Content">
      <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[#262626] text-[16px] whitespace-nowrap">
        <p className="leading-[24px]">Boston</p>
      </div>
    </div>
  );
}

function TableItemHeaderItem26() {
  return (
    <div className="h-full relative shrink-0 w-[180px]" data-name="Table Item / Header Item">
      <div className="flex flex-col justify-center size-full">
        <div className="content-stretch flex flex-col items-start justify-center py-[12px] relative size-full">
          <Content28 />
        </div>
      </div>
    </div>
  );
}

function Divider21() {
  return (
    <div className="h-full relative shrink-0" data-name="Divider">
      <div className="flex flex-col items-center justify-center overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex flex-col h-full items-center justify-center py-[4px]" />
      </div>
    </div>
  );
}

function Content29() {
  return (
    <div className="content-stretch flex items-center justify-center overflow-clip px-[12px] relative shrink-0" data-name="Content">
      <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[#262626] text-[16px] whitespace-nowrap">
        <p className="leading-[24px]">Project Manager</p>
      </div>
    </div>
  );
}

function TableItemHeaderItem27() {
  return (
    <div className="h-full relative shrink-0 w-[228px]" data-name="Table Item / Header Item">
      <div className="flex flex-col justify-center size-full">
        <div className="content-stretch flex flex-col items-start justify-center py-[12px] relative size-full">
          <Content29 />
        </div>
      </div>
    </div>
  );
}

function Favicon3() {
  return (
    <div className="bg-[#dde9ff] mr-[-8px] overflow-clip relative rounded-[28px] shrink-0 size-[40px]" data-name="Favicon">
      <p className="-translate-x-1/2 absolute font-['Outfit:SemiBold',sans-serif] font-semibold leading-[18px] left-[calc(50%+0.5px)] text-[#465fff] text-[12px] text-center top-[calc(50%-9px)] whitespace-nowrap">AR</p>
    </div>
  );
}

function Favicon4() {
  return (
    <div className="bg-[#fdf2fa] mr-[-8px] overflow-clip relative rounded-[28px] shrink-0 size-[40px]" data-name="Favicon">
      <p className="-translate-x-1/2 absolute font-['Outfit:SemiBold',sans-serif] font-semibold leading-[18px] left-1/2 text-[#dd2590] text-[12px] text-center top-[calc(50%-9px)] whitespace-nowrap">SC</p>
    </div>
  );
}

function Content30() {
  return (
    <div className="content-stretch flex items-center justify-center overflow-clip pl-[12px] pr-[20px] relative shrink-0" data-name="Content">
      <Favicon3 />
      <Favicon4 />
    </div>
  );
}

function TableItemHeaderItem28() {
  return (
    <div className="h-full relative shrink-0 w-[228px]" data-name="Table Item / Header Item">
      <div className="flex flex-col justify-center size-full">
        <div className="content-stretch flex flex-col items-start justify-center py-[12px] relative size-full">
          <Content30 />
        </div>
      </div>
    </div>
  );
}

function Divider22() {
  return (
    <div className="h-full relative shrink-0" data-name="Divider">
      <div className="flex flex-col items-center justify-center overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex flex-col h-full items-center justify-center py-[4px]" />
      </div>
    </div>
  );
}

function Content31() {
  return (
    <div className="content-stretch flex items-center justify-center overflow-clip px-[12px] relative shrink-0" data-name="Content">
      <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[#262626] text-[16px] whitespace-nowrap">
        <p className="leading-[24px]">Active</p>
      </div>
    </div>
  );
}

function TableItemHeaderItem29() {
  return (
    <div className="flex-[1_0_0] h-full min-h-px min-w-px relative" data-name="Table Item / Header Item">
      <div className="content-stretch flex flex-col items-start justify-between py-[12px] relative size-full">
        <Content31 />
      </div>
    </div>
  );
}

function Divider23() {
  return (
    <div className="h-full relative shrink-0" data-name="Divider">
      <div className="flex flex-col items-center justify-center overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex flex-col h-full items-center justify-center py-[4px]" />
      </div>
    </div>
  );
}

function Group12() {
  return (
    <div className="absolute inset-[8.33%]">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g id="Group 209">
          <circle cx="10" cy="10" id="Ellipse 12" r="9.5" stroke="var(--stroke-0, #616D79)" />
          <circle cx="9.5" cy="5.5" fill="var(--fill-0, #616D79)" id="Ellipse 23" r="1" stroke="var(--stroke-0, #616D79)" />
          <path d="M8 9H10V15M10 15H8M10 15H12" id="Vector 59" stroke="var(--stroke-0, #616D79)" strokeLinejoin="round" />
        </g>
      </svg>
    </div>
  );
}

function TableItemHeaderItem30() {
  return (
    <div className="h-full relative shrink-0 w-[60px]" data-name="Table Item / Header Item">
      <div className="flex flex-col items-center justify-center size-full">
        <div className="content-stretch flex flex-col items-center justify-center p-[12px] relative size-full">
          <div className="overflow-clip relative shrink-0 size-[24px]" data-name="24px/suggested/info-circle">
            <Group12 />
          </div>
        </div>
      </div>
    </div>
  );
}

function HeaderRow4() {
  return (
    <div className="content-stretch flex h-[66px] items-start relative shrink-0 w-full" data-name="Header Row">
      <div aria-hidden="true" className="absolute border-[#d9d9d9] border-b border-solid inset-0 pointer-events-none" />
      <TableItemHeaderItem22 />
      <TableItemHeaderItem23 />
      <Divider17 />
      <TableItemHeaderItem24 />
      <Divider18 />
      <Divider19 />
      <TableItemHeaderItem25 />
      <Divider20 />
      <TableItemHeaderItem26 />
      <Divider21 />
      <TableItemHeaderItem27 />
      <TableItemHeaderItem28 />
      <Divider22 />
      <TableItemHeaderItem29 />
      <Divider23 />
      <TableItemHeaderItem30 />
    </div>
  );
}

function PaginationWithTotalNumber() {
  return (
    <div className="flex-[1_0_0] min-h-px min-w-px relative w-full" data-name="Pagination with total number">
      <div className="flex flex-row items-center size-full">
        <div className="size-full" />
      </div>
    </div>
  );
}

function Content32() {
  return (
    <div className="absolute content-stretch flex items-center justify-center left-0 p-[12px] rounded-[8px] size-[40px] top-0" data-name="Content">
      <p className="font-['Outfit:Medium',sans-serif] font-medium leading-[20px] relative shrink-0 text-[14px] text-center text-white whitespace-nowrap">1</p>
    </div>
  );
}

function PaginationNumberBase() {
  return (
    <div className="bg-[#ff4d00] overflow-clip relative rounded-[8px] shrink-0 size-[40px]" data-name="_Pagination number base">
      <Content32 />
    </div>
  );
}

function Content33() {
  return (
    <div className="absolute content-stretch flex items-center justify-center left-0 p-[12px] rounded-[8px] size-[40px] top-0" data-name="Content">
      <p className="font-['Outfit:Medium',sans-serif] font-medium leading-[20px] relative shrink-0 text-[#243746] text-[14px] text-center whitespace-nowrap">2</p>
    </div>
  );
}

function PaginationNumberBase1() {
  return (
    <div className="overflow-clip relative rounded-[8px] shrink-0 size-[40px]" data-name="_Pagination number base">
      <Content33 />
    </div>
  );
}

function Content34() {
  return (
    <div className="absolute content-stretch flex items-center justify-center left-0 p-[12px] rounded-[8px] size-[40px] top-0" data-name="Content">
      <p className="font-['Outfit:Medium',sans-serif] font-medium leading-[20px] relative shrink-0 text-[#243746] text-[14px] text-center whitespace-nowrap">3</p>
    </div>
  );
}

function PaginationNumberBase2() {
  return (
    <div className="overflow-clip relative rounded-[8px] shrink-0 size-[40px]" data-name="_Pagination number base">
      <Content34 />
    </div>
  );
}

function Content35() {
  return (
    <div className="absolute content-stretch flex items-center justify-center left-0 p-[12px] rounded-[8px] size-[40px] top-0" data-name="Content">
      <p className="font-['Outfit:Medium',sans-serif] font-medium leading-[20px] relative shrink-0 text-[#243746] text-[14px] text-center whitespace-nowrap">...</p>
    </div>
  );
}

function PaginationNumberBase3() {
  return (
    <div className="overflow-clip relative rounded-[8px] shrink-0 size-[40px]" data-name="_Pagination number base">
      <Content35 />
    </div>
  );
}

function Content36() {
  return (
    <div className="absolute content-stretch flex items-center justify-center left-0 p-[12px] rounded-[8px] size-[40px] top-0" data-name="Content">
      <p className="font-['Outfit:Medium',sans-serif] font-medium leading-[20px] relative shrink-0 text-[#243746] text-[14px] text-center whitespace-nowrap">8</p>
    </div>
  );
}

function PaginationNumberBase4() {
  return (
    <div className="overflow-clip relative rounded-[8px] shrink-0 size-[40px]" data-name="_Pagination number base">
      <Content36 />
    </div>
  );
}

function Content37() {
  return (
    <div className="absolute content-stretch flex items-center justify-center left-0 p-[12px] rounded-[8px] size-[40px] top-0" data-name="Content">
      <p className="font-['Outfit:Medium',sans-serif] font-medium leading-[20px] relative shrink-0 text-[#243746] text-[14px] text-center whitespace-nowrap">9</p>
    </div>
  );
}

function PaginationNumberBase5() {
  return (
    <div className="overflow-clip relative rounded-[8px] shrink-0 size-[40px]" data-name="_Pagination number base">
      <Content37 />
    </div>
  );
}

function Content38() {
  return (
    <div className="absolute content-stretch flex items-center justify-center left-0 p-[12px] rounded-[8px] size-[40px] top-0" data-name="Content">
      <p className="font-['Outfit:Medium',sans-serif] font-medium leading-[20px] relative shrink-0 text-[#243746] text-[14px] text-center whitespace-nowrap">10</p>
    </div>
  );
}

function PaginationNumberBase6() {
  return (
    <div className="overflow-clip relative rounded-[8px] shrink-0 size-[40px]" data-name="_Pagination number base">
      <Content38 />
    </div>
  );
}

function PaginationNumbers() {
  return (
    <div className="content-stretch flex gap-[2px] items-start relative shrink-0" data-name="Pagination numbers">
      <PaginationNumberBase />
      <PaginationNumberBase1 />
      <PaginationNumberBase2 />
      <PaginationNumberBase3 />
      <PaginationNumberBase4 />
      <PaginationNumberBase5 />
      <PaginationNumberBase6 />
    </div>
  );
}

function PaginationWithTotalNumber1() {
  return (
    <div className="relative shrink-0 w-full" data-name="Pagination with total number">
      <div aria-hidden="true" className="absolute border-[#dedede] border-solid border-t inset-0 pointer-events-none" />
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex items-center justify-between pl-[18px] relative w-full">
          <p className="font-['Outfit:Medium',sans-serif] font-medium leading-[20px] relative shrink-0 text-[#667085] text-[14px] whitespace-nowrap">Showing 1 to 100 of 2 entries</p>
          <div className="content-stretch flex gap-[12px] items-center p-[16px] relative shrink-0" data-name="Pagination">
            <div className="bg-white opacity-50 relative rounded-[8px] shrink-0 size-[40px]" data-name="Button">
              <div className="content-stretch flex gap-[8px] items-center justify-center overflow-clip px-[14px] py-[8px] relative rounded-[inherit] size-full">
                <div className="relative shrink-0 size-[20px]" data-name="long-arrow-left">
                  <div className="absolute bottom-1/4 left-[16.67%] right-[16.66%] top-1/4" data-name="Icon">
                    <div className="absolute inset-[-7.5%_-5.62%]">
                      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14.8345 11.5">
                        <path d={svgPaths.p2d0593c0} id="Icon" stroke="var(--stroke-0, #344054)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
              <div aria-hidden="true" className="absolute border border-[#d0d5dd] border-solid inset-0 pointer-events-none rounded-[8px] shadow-[0px_1px_2px_0px_rgba(16,24,40,0.05)]" />
            </div>
            <PaginationNumbers />
            <div className="bg-white relative rounded-[8px] shrink-0 size-[40px]" data-name="Button">
              <div className="content-stretch flex gap-[8px] items-center justify-center overflow-clip px-[14px] py-[8px] relative rounded-[inherit] size-full">
                <div className="relative shrink-0 size-[20px]" data-name="long-arrow-right">
                  <div className="absolute bottom-1/4 left-[16.67%] right-[16.66%] top-1/4" data-name="Icon">
                    <div className="absolute inset-[-7.5%_-5.62%]">
                      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14.8345 11.5">
                        <path d={svgPaths.p36164580} id="Icon" stroke="var(--stroke-0, #344054)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
              <div aria-hidden="true" className="absolute border border-[#d0d5dd] border-solid inset-0 pointer-events-none rounded-[8px] shadow-[0px_1px_2px_0px_rgba(16,24,40,0.05)]" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function ContainerBackgroundColor() {
  return (
    <div className="bg-[#fafafa] flex-[1_0_0] min-h-px min-w-px relative rounded-[8px] w-full" data-name="Container+BackgroundColor">
      <div className="content-stretch flex flex-col items-start overflow-clip relative rounded-[inherit] size-full">
        <Row1 />
        <TableItemRowItem2 />
        <HeaderRow />
        <HeaderRow1 />
        <HeaderRow2 />
        <HeaderRow3 />
        <HeaderRow4 />
        <PaginationWithTotalNumber />
        <PaginationWithTotalNumber1 />
      </div>
      <div aria-hidden="true" className="absolute border border-[#dedede] border-solid inset-0 pointer-events-none rounded-[8px]" />
    </div>
  );
}

function Frame4() {
  return (
    <div className="flex-[1_0_0] min-h-px min-w-px relative w-full z-[1]">
      <div className="content-stretch flex flex-col items-start p-[12px] relative size-full">
        <ContainerBackgroundColor />
      </div>
    </div>
  );
}

export default function ToolBody() {
  return (
    <div className="bg-white content-stretch flex flex-col isolate items-center relative size-full" data-name="Tool Body">
      <Row />
      <Frame4 />
    </div>
  );
}