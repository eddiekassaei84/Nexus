import svgPaths from "./svg-uayoveoicl";

function Icon() {
  return (
    <div className="bg-[rgba(255,255,255,0)] content-stretch flex gap-[8px] items-start p-[8px] relative rounded-[40px] shrink-0" data-name="Icon">
      <div className="overflow-clip relative shrink-0 size-[24px]" data-name="xmark">
        <div className="absolute inset-[23.53%_24.74%_25.91%_24.7%]" data-name="xmark">
          <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12.1336 12.1336">
            <path d={svgPaths.p41af6c0} fill="var(--fill-0, #384857)" id="xmark" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function Heading() {
  return (
    <div className="content-stretch flex h-[45.003px] items-center justify-between relative shrink-0 w-[551px]" data-name="Heading 2">
      <p className="font-['Actor:Regular',sans-serif] leading-[28.8px] not-italic relative shrink-0 text-[#1b2736] text-[24px] whitespace-nowrap">{`Import roles to 'Cleveland Hospital'`}</p>
      <div className="content-stretch cursor-pointer flex flex-col items-center justify-center p-[2px] relative shrink-0" data-name="Icon Button">
        <Icon />
      </div>
    </div>
  );
}

function Frame() {
  return (
    <div className="content-stretch flex flex-col gap-[12px] items-start relative shrink-0 w-full">
      <Heading />
      <div className="h-[1.023px] relative shrink-0 w-full" data-name="divider/horizontal">
        <div className="absolute bg-[#f0f0f0] inset-0" data-name="divider/horizontal" />
      </div>
    </div>
  );
}

function Paragraph() {
  return (
    <div className="col-1 h-[60px] ml-0 mt-0 relative row-1 w-[552.014px]" data-name="Paragraph">
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[0] left-0 not-italic text-[#595959] text-[0px] text-[14px] top-[0.11px] w-[547px]">
        <span className="leading-[20px]">{`Importing from CSV lets you add or update roles in bulk. Your CSV should include columns for `}</span>
        <span className="font-['Open_Sans:Bold',sans-serif] font-bold leading-[20px]" style={{ fontVariationSettings: "'wdth' 100" }}>
          Name
        </span>
        <span className="leading-[20px]">{`, `}</span>
        <span className="font-['Open_Sans:Bold',sans-serif] font-bold leading-[20px]" style={{ fontVariationSettings: "'wdth' 100" }}>
          Code
        </span>
        <span className="leading-[20px]">{`, `}</span>
        <span className="font-['Open_Sans:Bold',sans-serif] font-bold leading-[20px]" style={{ fontVariationSettings: "'wdth' 100" }}>
          Group
        </span>
        <span className="leading-[20px]">,</span>
        <span className="font-['Open_Sans:Bold',sans-serif] font-bold leading-[20px]" style={{ fontVariationSettings: "'wdth' 100" }}>{` Description`}</span>
        <span className="leading-[20px]">{`, and `}</span>
        <span className="font-['Open_Sans:Bold',sans-serif] font-bold leading-[20px]" style={{ fontVariationSettings: "'wdth' 100" }}>
          Active
        </span>
        <span className="leading-[20px]">. Download the template below to get started.</span>
      </p>
    </div>
  );
}

function Icon1() {
  return (
    <div className="relative shrink-0 size-[15px]" data-name="Icon">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 15 15">
        <g id="Icon">
          <path d={svgPaths.p2059ac00} id="Vector" stroke="var(--stroke-0, #1890FF)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.40625" />
          <path d="M1.875 11.25H13.125" id="Vector_2" stroke="var(--stroke-0, #1890FF)" strokeLinecap="round" strokeWidth="1.40625" />
        </g>
      </svg>
    </div>
  );
}

function Button() {
  return (
    <div className="h-[20px] relative shrink-0 w-[178.073px]" data-name="Button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="-translate-x-1/2 absolute decoration-solid font-['Inter:Regular',sans-serif] font-normal leading-[20px] left-[89.5px] not-italic text-[#1890ff] text-[14px] text-center top-[0.11px] underline whitespace-nowrap">Download Import Template</p>
      </div>
    </div>
  );
}

function Container1() {
  return (
    <div className="col-1 content-stretch flex gap-[5.99px] h-[20px] items-center ml-0 mt-[72px] relative row-1 w-[552.014px]" data-name="Container">
      <Icon1 />
      <Button />
    </div>
  );
}

function PlusOrangeIcon() {
  return (
    <div className="relative shrink-0 size-[33.993px]" data-name="PlusOrangeIcon">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 33.9931 33.9931">
        <g clipPath="url(#clip0_2068_1210)" id="PlusOrangeIcon">
          <path d="M0.999796 16.9965H32.9933" id="Vector" stroke="var(--stroke-0, #FF4D00)" strokeLinecap="square" strokeWidth="1.49969" />
          <path d="M16.9965 0.999796V32.9933" id="Vector_2" stroke="var(--stroke-0, #FF4D00)" strokeLinecap="square" strokeWidth="1.49969" />
        </g>
        <defs>
          <clipPath id="clip0_2068_1210">
            <rect fill="white" height="33.9931" width="33.9931" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Container4() {
  return (
    <div className="relative shrink-0 size-[47.986px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center relative size-full">
        <PlusOrangeIcon />
      </div>
    </div>
  );
}

function Paragraph1() {
  return (
    <div className="h-[40px] relative shrink-0 w-[272.396px]" data-name="Paragraph">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid font-['Inter:Regular',sans-serif] font-normal leading-[20px] not-italic relative size-full text-[#595959] text-[14px] text-center whitespace-nowrap">
        <p className="-translate-x-1/2 absolute left-[136.5px] top-[0.11px]">Click or drag a CSV to this area to upload</p>
        <p className="-translate-x-1/2 absolute left-[135.99px] top-[20.11px]">or browse CSV file manually</p>
      </div>
    </div>
  );
}

function Text() {
  return (
    <div className="h-[20px] relative shrink-0 w-[49.358px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="-translate-x-1/2 absolute font-['Inter:Regular',sans-serif] font-normal leading-[20px] left-[25px] not-italic text-[#616d79] text-[14px] text-center top-[0.11px] whitespace-nowrap">Browse</p>
      </div>
    </div>
  );
}

function Button1() {
  return (
    <div className="bg-[#f2f3f4] h-[31.997px] relative rounded-[4px] shrink-0 w-[83.559px]" data-name="Button">
      <div aria-hidden="true" className="absolute border-[#c3c7cc] border-[1.111px] border-solid inset-0 pointer-events-none rounded-[4px]" />
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center p-[1.111px] relative size-full">
        <Text />
      </div>
    </div>
  );
}

function Container3() {
  return (
    <div className="content-stretch flex flex-col gap-[15.99px] h-[183.941px] items-center justify-center relative shrink-0 w-full" data-name="Container">
      <Container4 />
      <Paragraph1 />
      <Button1 />
    </div>
  );
}

function Container2() {
  return (
    <div className="bg-[#fafafa] col-1 h-[186.163px] ml-0 mt-[103.99px] relative rounded-[4px] row-1 w-[552.014px]" data-name="Container">
      <div className="content-stretch flex flex-col items-start overflow-clip p-[1.111px] relative rounded-[inherit] size-full">
        <Container3 />
      </div>
      <div aria-hidden="true" className="absolute border-[#d9d9d9] border-[1.111px] border-dashed inset-0 pointer-events-none rounded-[4px]" />
    </div>
  );
}

function Group() {
  return (
    <div className="grid-cols-[max-content] grid-rows-[max-content] inline-grid leading-[0] place-items-start relative shrink-0">
      <Paragraph />
      <Container1 />
      <Container2 />
    </div>
  );
}

function Container() {
  return (
    <div className="bg-white flex-[1_0_0] min-h-px min-w-px relative rounded-[4px]" data-name="Container">
      <div className="overflow-clip rounded-[inherit] size-full">
        <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col gap-[36px] h-full items-start px-[24px] py-[9px] relative">
          <Frame />
          <Group />
        </div>
      </div>
    </div>
  );
}

function Text1() {
  return (
    <div className="h-[20px] relative shrink-0 w-[45.92px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="-translate-x-1/2 absolute font-['Inter:Regular',sans-serif] font-normal leading-[20px] left-[23px] not-italic text-[#616d79] text-[14px] text-center top-[0.11px] whitespace-nowrap">Cancel</p>
      </div>
    </div>
  );
}

function Button2() {
  return (
    <div className="bg-[#f2f3f4] h-[40px] relative rounded-[4px] shrink-0 w-[95.99px]" data-name="Button">
      <div aria-hidden="true" className="absolute border-[#616d79] border-[1.111px] border-solid inset-0 pointer-events-none rounded-[4px]" />
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center p-[1.111px] relative size-full">
        <Text1 />
      </div>
    </div>
  );
}

function Text2() {
  return (
    <div className="h-[20px] relative shrink-0 w-[43.073px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="-translate-x-1/2 absolute font-['Inter:Regular',sans-serif] font-normal leading-[20px] left-[22px] not-italic text-[14px] text-center text-white top-[0.11px] whitespace-nowrap">Import</p>
      </div>
    </div>
  );
}

function Button3() {
  return (
    <div className="bg-[#ffbd9c] h-[40px] relative rounded-[4px] shrink-0 w-[95.99px]" data-name="Button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center relative size-full">
        <Text2 />
      </div>
    </div>
  );
}

function Container5() {
  return (
    <div className="bg-[#f5f5f5] h-[71.997px] relative shrink-0 w-[600px]" data-name="Container">
      <div aria-hidden="true" className="absolute border-[#c3c7cc] border-solid border-t-[1.111px] inset-0 pointer-events-none" />
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[15.99px] items-center justify-end pr-[23.993px] pt-[1.111px] relative size-full">
        <Button2 />
        <Button3 />
      </div>
    </div>
  );
}

export default function ImportRolesModal() {
  return (
    <div className="bg-[#f5f5f5] content-stretch flex flex-col items-start overflow-clip relative rounded-[8px] shadow-[20px_20px_25px_-5px_rgba(0,0,0,0.1),8px_8px_10px_-6px_rgba(0,0,0,0.1)] size-full" data-name="ImportRolesModal">
      <Container />
      <Container5 />
    </div>
  );
}