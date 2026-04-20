import svgPaths from "./svg-gf151a2usf";

function Heading() {
  return (
    <div className="h-[32px] relative shrink-0 w-[208.219px]" data-name="Heading 1">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[32px] left-0 not-italic text-[#1d2c38] text-[24px] top-[-1px] whitespace-nowrap">Classification Crosswalk</p>
      </div>
    </div>
  );
}

function Container1() {
  return (
    <div className="bg-white h-[72px] relative shrink-0 w-[1361px]" data-name="Container">
      <div aria-hidden="true" className="absolute border-[#d9d9d9] border-b border-solid inset-0 pointer-events-none" />
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center pb-px pl-[24px] relative size-full">
        <Heading />
      </div>
    </div>
  );
}

function Plus() {
  return (
    <div className="relative shrink-0 size-[18.5px]" data-name="plus">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 18.5 18.5">
        <g id="plus">
          <path d="M9.25 4V14.5" id="Vector" stroke="var(--stroke-0, #616D79)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
          <path d="M4 9.25H14.5" id="Vector_2" stroke="var(--stroke-0, #616D79)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
        </g>
      </svg>
    </div>
  );
}

function ReferenceDataTable() {
  return (
    <div className="relative shrink-0" data-name="ReferenceDataTable">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center relative">
        <p className="font-['Open_Sans:Regular',sans-serif] font-normal leading-[21px] relative shrink-0 text-[#616d79] text-[14px] text-center whitespace-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
          Add Crosswalk
        </p>
      </div>
    </div>
  );
}

function SecondaryBtn() {
  return (
    <div className="bg-[#f2f3f4] content-stretch flex gap-[4px] h-[36px] items-center px-[13px] py-px relative rounded-[4px] shrink-0" data-name="SecondaryBtn">
      <div aria-hidden="true" className="absolute border border-[#c3c7cc] border-solid inset-0 pointer-events-none rounded-[4px]" />
      <Plus />
      <ReferenceDataTable />
    </div>
  );
}

function Container7() {
  return (
    <div className="relative shrink-0" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[10px] items-center relative">
        <SecondaryBtn />
      </div>
    </div>
  );
}

function Button() {
  return (
    <div className="h-[36px] relative rounded-[4px] shrink-0 w-[105.609px]" data-name="Button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="-translate-x-1/2 absolute font-['Inter:Regular',sans-serif] font-normal leading-[21px] left-[65px] not-italic text-[#616d79] text-[14px] text-center top-[7.5px] whitespace-nowrap">Cancel</p>
      </div>
    </div>
  );
}

function ImportIcon() {
  return (
    <div className="relative shrink-0 size-[18px]" data-name="ImportIcon">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 18 18">
        <g id="ImportIcon">
          <path d={svgPaths.p1b13ba98} id="Vector" stroke="var(--stroke-0, #616D79)" strokeLinecap="square" strokeLinejoin="round" strokeWidth="1.125" />
          <path d={svgPaths.p28f7fe80} id="Vector_2" stroke="var(--stroke-0, #616D79)" strokeWidth="1.125" />
          <path d={svgPaths.p70c2c00} id="Vector_3" stroke="var(--stroke-0, #616D79)" strokeWidth="1.125" />
        </g>
      </svg>
    </div>
  );
}

function ReferenceDataTable1() {
  return (
    <div className="flex-[1_0_0] h-[21px] min-h-px min-w-px relative" data-name="ReferenceDataTable">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="-translate-x-1/2 absolute font-['Open_Sans:Regular',sans-serif] font-normal leading-[21px] left-[22.5px] text-[#616d79] text-[14px] text-center top-0 whitespace-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
          Import
        </p>
      </div>
    </div>
  );
}

function SecondaryBtn1() {
  return (
    <div className="bg-[#f2f3f4] h-[36px] relative rounded-[4px] shrink-0 w-[92.578px]" data-name="SecondaryBtn">
      <div aria-hidden="true" className="absolute border border-[#c3c7cc] border-solid inset-0 pointer-events-none rounded-[4px]" />
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[4px] items-center px-[13px] py-px relative size-full">
        <ImportIcon />
        <ReferenceDataTable1 />
      </div>
    </div>
  );
}

function Button1() {
  return (
    <div className="bg-[#ff4d00] relative rounded-[4px] shrink-0" data-name="Button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center px-[10px] py-[8px] relative">
        <p className="font-['Inter:Regular',sans-serif] font-normal leading-[20px] not-italic relative shrink-0 text-[14px] text-center text-white whitespace-nowrap">{`Save Crosswalk `}</p>
      </div>
    </div>
  );
}

function Container8() {
  return (
    <div className="h-[36px] relative shrink-0" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[8px] h-full items-center justify-end relative">
        <Button />
        <SecondaryBtn1 />
        <Button1 />
      </div>
    </div>
  );
}

function Container6() {
  return (
    <div className="h-[50px] relative shrink-0 w-full" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-between relative size-full">
        <Container7 />
        <Container8 />
      </div>
    </div>
  );
}

function Text() {
  return (
    <div className="absolute h-[20px] left-[8px] overflow-clip top-[13.5px] w-[226px]" data-name="Text">
      <p className="absolute font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[20px] left-0 not-italic text-[#384857] text-[14px] top-0 whitespace-nowrap">Work Breakdown Structure</p>
    </div>
  );
}

function ResizeHandle() {
  return <div className="absolute h-[47px] left-[253px] top-0 w-[7px]" data-name="ResizeHandle" />;
}

function HeaderCell() {
  return (
    <div className="bg-[#fafafa] flex-[1_0_0] h-[47px] min-h-px min-w-px overflow-clip relative" data-name="HeaderCell">
      <Text />
      <ResizeHandle />
    </div>
  );
}

function Container10() {
  return (
    <div className="bg-[#fafafa] content-stretch flex items-center px-[8px] relative shrink-0 w-[432px]" data-name="Container">
      <div aria-hidden="true" className="absolute border-[#f0f0f0] border-b border-solid inset-0 pointer-events-none" />
      <HeaderCell />
    </div>
  );
}

function TextInput() {
  return (
    <div className="absolute content-stretch flex h-[36px] items-center left-0 overflow-clip pl-[34px] pr-[10px] rounded-[4px] top-0 w-[420px]" data-name="Text Input">
      <p className="font-['Open_Sans:Regular',sans-serif] font-normal leading-[normal] relative shrink-0 text-[14px] text-[rgba(52,64,84,0.5)] whitespace-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>{`Search `}</p>
    </div>
  );
}

function Icon() {
  return (
    <div className="flex-[1_0_0] h-[16px] min-h-px min-w-px relative" data-name="Icon">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid overflow-clip relative rounded-[inherit] size-full">
        <div className="absolute inset-[10.96%_17.81%_17.81%_10.96%]" data-name="Vector">
          <div className="absolute inset-[-5.77%]">
            <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12.7123 12.7123">
              <path d={svgPaths.pdbeb800} id="Vector" stroke="var(--stroke-0, #9CA4AE)" strokeWidth="1.31507" />
            </svg>
          </div>
        </div>
        <div className="absolute inset-[76.71%_4.11%_4.11%_76.71%]" data-name="Vector">
          <div className="absolute inset-[-21.43%]">
            <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 4.38356 4.38356">
              <path d={svgPaths.p3ed5dc40} id="Vector" stroke="var(--stroke-0, #9CA4AE)" strokeLinecap="round" strokeWidth="1.31507" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}

function Text1() {
  return (
    <div className="content-stretch flex items-center relative shrink-0 size-[16px]" data-name="Text">
      <Icon />
    </div>
  );
}

function Container13() {
  return (
    <div className="flex-[1_0_0] h-[32px] min-h-px min-w-px relative rounded-[4px]" data-name="Container">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex gap-[10px] items-center p-[10px] relative size-full">
          <TextInput />
          <Text1 />
        </div>
      </div>
    </div>
  );
}

function Container12() {
  return (
    <div className="h-[32px] relative shrink-0 w-full" data-name="Container">
      <div aria-hidden="true" className="absolute border-[#f0f0f0] border-b border-solid border-t inset-0 pointer-events-none" />
      <div className="flex flex-row items-center size-full">
        <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center px-[8px] relative size-full">
          <Container13 />
        </div>
      </div>
    </div>
  );
}

function ChevronIcon() {
  return (
    <div className="relative shrink-0 size-[18px]" data-name="ChevronIcon">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 18 18">
        <g id="ChevronIcon">
          <path d={svgPaths.p1f381080} fill="var(--fill-0, #384857)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function Button2() {
  return (
    <div className="relative shrink-0 size-[18px]" data-name="Button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center relative size-full">
        <ChevronIcon />
      </div>
    </div>
  );
}

function Text2() {
  return (
    <div className="h-[19.5px] relative shrink-0" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex h-full items-start overflow-clip relative rounded-[inherit]">
        <p className="font-['Inter:Medium',sans-serif] font-medium leading-[19.5px] not-italic relative shrink-0 text-[#595959] text-[12px] whitespace-nowrap">BP-1 General Requirements</p>
      </div>
    </div>
  );
}

function Container15() {
  return (
    <div className="content-stretch flex gap-[4px] h-[32px] items-center overflow-clip pl-[8px] relative shrink-0 w-[360px]" data-name="Container">
      <Button2 />
      <Text2 />
    </div>
  );
}

function Container14() {
  return (
    <div className="bg-white relative shrink-0 w-[432px]" data-name="Container">
      <div aria-hidden="true" className="absolute border-[#f0f0f0] border-b border-solid inset-0 pointer-events-none" />
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center relative w-full">
        <Container15 />
      </div>
    </div>
  );
}

function ChevronIcon1() {
  return (
    <div className="relative shrink-0 size-[18px]" data-name="ChevronIcon">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 18 18">
        <g id="ChevronIcon">
          <path d={svgPaths.p1f381080} fill="var(--fill-0, #384857)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function Button3() {
  return (
    <div className="relative shrink-0 size-[18px]" data-name="Button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center relative size-full">
        <ChevronIcon1 />
      </div>
    </div>
  );
}

function Text3() {
  return (
    <div className="h-[19.5px] relative shrink-0" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex h-full items-start overflow-clip relative rounded-[inherit]">
        <p className="font-['Inter:Medium','Noto_Sans:Medium',sans-serif] font-medium leading-[19.5px] not-italic relative shrink-0 text-[#595959] text-[12px] whitespace-nowrap">{`A SUBSTRUCTURE `}</p>
      </div>
    </div>
  );
}

function Container17() {
  return (
    <div className="content-stretch flex gap-[4px] h-[32px] items-center overflow-clip pl-[28px] relative shrink-0 w-[360px]" data-name="Container">
      <Button3 />
      <Text3 />
    </div>
  );
}

function Container16() {
  return (
    <div className="bg-white relative shrink-0 w-[432px]" data-name="Container">
      <div aria-hidden="true" className="absolute border-[#f0f0f0] border-b border-solid inset-0 pointer-events-none" />
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center relative w-full">
        <Container17 />
      </div>
    </div>
  );
}

function Container11() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col items-start min-h-px min-w-px relative w-full" data-name="Container">
      <Container12 />
      <Container14 />
      <Container16 />
    </div>
  );
}

function Container18() {
  return (
    <div className="bg-white h-[48px] relative shrink-0 w-full" data-name="Container">
      <div aria-hidden="true" className="absolute border-[#f0f0f0] border-solid border-t inset-0 pointer-events-none" />
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex items-center justify-between pt-px px-[16px] size-full" />
      </div>
    </div>
  );
}

function Container9() {
  return (
    <div className="bg-white content-stretch flex flex-col h-[652px] items-start overflow-clip relative shrink-0 w-full" data-name="Container">
      <Container10 />
      <Container11 />
      <Container18 />
    </div>
  );
}

function MasterFormat() {
  return (
    <div className="bg-[#fafafa] h-full relative rounded-[8px] shrink-0 w-[432px]" data-name="Master Format">
      <div className="overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex flex-col items-start py-px relative size-full">
          <Container9 />
        </div>
      </div>
      <div aria-hidden="true" className="absolute border border-[#d9d9d9] border-solid inset-0 pointer-events-none rounded-[8px]" />
    </div>
  );
}

function Text4() {
  return (
    <div className="absolute h-[20px] left-[8px] overflow-clip top-[13.5px] w-[226px]" data-name="Text">
      <p className="absolute font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[20px] left-0 not-italic text-[#384857] text-[14px] top-0 whitespace-nowrap">Uni Format</p>
    </div>
  );
}

function ResizeHandle1() {
  return <div className="absolute h-[47px] left-[253px] top-0 w-[7px]" data-name="ResizeHandle" />;
}

function HeaderCell1() {
  return (
    <div className="bg-[#fafafa] flex-[1_0_0] h-[47px] min-h-px min-w-px overflow-clip relative" data-name="HeaderCell">
      <Text4 />
      <ResizeHandle1 />
    </div>
  );
}

function Container20() {
  return (
    <div className="bg-[#fafafa] content-stretch flex items-center px-[8px] relative shrink-0 w-[432px]" data-name="Container">
      <div aria-hidden="true" className="absolute border-[#f0f0f0] border-b border-solid inset-0 pointer-events-none" />
      <HeaderCell1 />
    </div>
  );
}

function TextInput1() {
  return (
    <div className="absolute content-stretch flex h-[36px] items-center left-0 overflow-clip pl-[34px] pr-[10px] rounded-[4px] top-0 w-[420px]" data-name="Text Input">
      <p className="font-['Open_Sans:Regular',sans-serif] font-normal leading-[normal] relative shrink-0 text-[14px] text-[rgba(52,64,84,0.5)] whitespace-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>{`Search `}</p>
    </div>
  );
}

function Icon1() {
  return (
    <div className="flex-[1_0_0] h-[16px] min-h-px min-w-px relative" data-name="Icon">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid overflow-clip relative rounded-[inherit] size-full">
        <div className="absolute inset-[10.96%_17.81%_17.81%_10.96%]" data-name="Vector">
          <div className="absolute inset-[-5.77%]">
            <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12.7123 12.7123">
              <path d={svgPaths.pdbeb800} id="Vector" stroke="var(--stroke-0, #9CA4AE)" strokeWidth="1.31507" />
            </svg>
          </div>
        </div>
        <div className="absolute inset-[76.71%_4.11%_4.11%_76.71%]" data-name="Vector">
          <div className="absolute inset-[-21.43%]">
            <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 4.38356 4.38356">
              <path d={svgPaths.p3ed5dc40} id="Vector" stroke="var(--stroke-0, #9CA4AE)" strokeLinecap="round" strokeWidth="1.31507" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}

function Text5() {
  return (
    <div className="content-stretch flex items-center relative shrink-0 size-[16px]" data-name="Text">
      <Icon1 />
    </div>
  );
}

function Container23() {
  return (
    <div className="flex-[1_0_0] h-[32px] min-h-px min-w-px relative rounded-[4px]" data-name="Container">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex gap-[10px] items-center p-[10px] relative size-full">
          <TextInput1 />
          <Text5 />
        </div>
      </div>
    </div>
  );
}

function Container22() {
  return (
    <div className="h-[32px] relative shrink-0 w-full" data-name="Container">
      <div aria-hidden="true" className="absolute border-[#f0f0f0] border-b border-solid border-t inset-0 pointer-events-none" />
      <div className="flex flex-row items-center size-full">
        <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center px-[8px] relative size-full">
          <Container23 />
        </div>
      </div>
    </div>
  );
}

function ChevronIcon2() {
  return (
    <div className="relative shrink-0 size-[18px]" data-name="ChevronIcon">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 18 18">
        <g id="ChevronIcon">
          <path d={svgPaths.p1f381080} fill="var(--fill-0, #384857)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function Button4() {
  return (
    <div className="relative shrink-0 size-[18px]" data-name="Button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center relative size-full">
        <ChevronIcon2 />
      </div>
    </div>
  );
}

function Text6() {
  return (
    <div className="h-[19.5px] relative shrink-0" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex h-full items-start overflow-clip relative rounded-[inherit]">
        <p className="font-['Inter:Medium','Noto_Sans:Medium',sans-serif] font-medium leading-[19.5px] not-italic relative shrink-0 text-[#595959] text-[12px] whitespace-nowrap">{`A SUBSTRUCTURE `}</p>
      </div>
    </div>
  );
}

function Container25() {
  return (
    <div className="content-stretch flex gap-[4px] h-[32px] items-center overflow-clip pl-[8px] relative shrink-0 w-[360px]" data-name="Container">
      <Button4 />
      <Text6 />
    </div>
  );
}

function Container24() {
  return (
    <div className="bg-white relative shrink-0 w-[432px]" data-name="Container">
      <div aria-hidden="true" className="absolute border-[#f0f0f0] border-b border-solid inset-0 pointer-events-none" />
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center relative w-full">
        <Container25 />
      </div>
    </div>
  );
}

function ChevronIcon3() {
  return (
    <div className="relative shrink-0 size-[18px]" data-name="ChevronIcon">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 18 18">
        <g id="ChevronIcon">
          <path d={svgPaths.p1f381080} fill="var(--fill-0, #384857)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function Button5() {
  return (
    <div className="relative shrink-0 size-[18px]" data-name="Button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center relative size-full">
        <ChevronIcon3 />
      </div>
    </div>
  );
}

function Text7() {
  return (
    <div className="h-[19.5px] relative shrink-0" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex h-full items-start overflow-clip relative rounded-[inherit]">
        <p className="font-['Inter:Medium','Noto_Sans:Medium',sans-serif] font-medium leading-[19.5px] not-italic relative shrink-0 text-[#595959] text-[12px] whitespace-nowrap">{`A-10 FOUNDATIONS `}</p>
      </div>
    </div>
  );
}

function Container27() {
  return (
    <div className="content-stretch flex gap-[4px] h-[32px] items-center overflow-clip pl-[28px] relative shrink-0 w-[360px]" data-name="Container">
      <Button5 />
      <Text7 />
    </div>
  );
}

function Container26() {
  return (
    <div className="bg-white relative shrink-0 w-[432px]" data-name="Container">
      <div aria-hidden="true" className="absolute border-[#f0f0f0] border-b border-solid inset-0 pointer-events-none" />
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center relative w-full">
        <Container27 />
      </div>
    </div>
  );
}

function ChevronIcon4() {
  return (
    <div className="relative shrink-0 size-[18px]" data-name="ChevronIcon">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 18 18">
        <g id="ChevronIcon">
          <path d={svgPaths.p1f381080} fill="var(--fill-0, #384857)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function Button6() {
  return (
    <div className="relative shrink-0 size-[18px]" data-name="Button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center relative size-full">
        <ChevronIcon4 />
      </div>
    </div>
  );
}

function Text8() {
  return (
    <div className="h-[19.5px] relative shrink-0" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex h-full items-start overflow-clip relative rounded-[inherit]">
        <p className="font-['Inter:Medium','Noto_Sans:Medium',sans-serif] font-medium leading-[19.5px] not-italic relative shrink-0 text-[#595959] text-[12px] whitespace-nowrap">{`A-10-10 Standard Foundations `}</p>
      </div>
    </div>
  );
}

function Container28() {
  return (
    <div className="h-[32px] relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-row items-center overflow-clip rounded-[inherit] size-full">
        <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[4px] items-center pb-px pl-[48px] relative size-full">
          <Button6 />
          <Text8 />
        </div>
      </div>
      <div aria-hidden="true" className="absolute border-[#f0f0f0] border-b border-solid inset-0 pointer-events-none" />
    </div>
  );
}

function Container21() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col items-start min-h-px min-w-px relative w-full" data-name="Container">
      <Container22 />
      <Container24 />
      <Container26 />
      <Container28 />
    </div>
  );
}

function Container29() {
  return (
    <div className="bg-white h-[48px] relative shrink-0 w-full" data-name="Container">
      <div aria-hidden="true" className="absolute border-[#f0f0f0] border-solid border-t inset-0 pointer-events-none" />
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex items-center justify-between pt-px px-[16px] size-full" />
      </div>
    </div>
  );
}

function Container19() {
  return (
    <div className="bg-white content-stretch flex flex-col h-[652px] items-start overflow-clip relative shrink-0 w-full" data-name="Container">
      <Container20 />
      <Container21 />
      <Container29 />
    </div>
  );
}

function MasterFormat1() {
  return (
    <div className="bg-[#fafafa] h-full relative rounded-[8px] shrink-0 w-[432px]" data-name="Master Format">
      <div className="overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex flex-col items-start py-px relative size-full">
          <Container19 />
        </div>
      </div>
      <div aria-hidden="true" className="absolute border border-[#d9d9d9] border-solid inset-0 pointer-events-none rounded-[8px]" />
    </div>
  );
}

function Text9() {
  return (
    <div className="absolute h-[20px] left-[8px] overflow-clip top-[13.5px] w-[226px]" data-name="Text">
      <p className="absolute font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[20px] left-0 not-italic text-[#384857] text-[14px] top-0 whitespace-nowrap">Master Format</p>
    </div>
  );
}

function ResizeHandle2() {
  return <div className="absolute h-[47px] left-[253px] top-0 w-[7px]" data-name="ResizeHandle" />;
}

function HeaderCell2() {
  return (
    <div className="bg-[#fafafa] flex-[1_0_0] h-[47px] min-h-px min-w-px overflow-clip relative" data-name="HeaderCell">
      <Text9 />
      <ResizeHandle2 />
    </div>
  );
}

function Container31() {
  return (
    <div className="bg-[#fafafa] content-stretch flex items-center px-[8px] relative shrink-0 w-[432px]" data-name="Container">
      <div aria-hidden="true" className="absolute border-[#f0f0f0] border-b border-solid inset-0 pointer-events-none" />
      <HeaderCell2 />
    </div>
  );
}

function TextInput2() {
  return (
    <div className="absolute content-stretch flex h-[36px] items-center left-0 overflow-clip pl-[34px] pr-[10px] rounded-[4px] top-0 w-[420px]" data-name="Text Input">
      <p className="font-['Open_Sans:Regular',sans-serif] font-normal leading-[normal] relative shrink-0 text-[14px] text-[rgba(52,64,84,0.5)] whitespace-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>{`Search `}</p>
    </div>
  );
}

function Icon2() {
  return (
    <div className="flex-[1_0_0] h-[16px] min-h-px min-w-px relative" data-name="Icon">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid overflow-clip relative rounded-[inherit] size-full">
        <div className="absolute inset-[10.96%_17.81%_17.81%_10.96%]" data-name="Vector">
          <div className="absolute inset-[-5.77%]">
            <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12.7123 12.7123">
              <path d={svgPaths.pdbeb800} id="Vector" stroke="var(--stroke-0, #9CA4AE)" strokeWidth="1.31507" />
            </svg>
          </div>
        </div>
        <div className="absolute inset-[76.71%_4.11%_4.11%_76.71%]" data-name="Vector">
          <div className="absolute inset-[-21.43%]">
            <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 4.38356 4.38356">
              <path d={svgPaths.p3ed5dc40} id="Vector" stroke="var(--stroke-0, #9CA4AE)" strokeLinecap="round" strokeWidth="1.31507" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}

function Text10() {
  return (
    <div className="content-stretch flex items-center relative shrink-0 size-[16px]" data-name="Text">
      <Icon2 />
    </div>
  );
}

function Container34() {
  return (
    <div className="flex-[1_0_0] h-[32px] min-h-px min-w-px relative rounded-[4px]" data-name="Container">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex gap-[10px] items-center p-[10px] relative size-full">
          <TextInput2 />
          <Text10 />
        </div>
      </div>
    </div>
  );
}

function Container33() {
  return (
    <div className="h-[32px] relative shrink-0 w-full" data-name="Container">
      <div aria-hidden="true" className="absolute border-[#f0f0f0] border-b border-solid border-t inset-0 pointer-events-none" />
      <div className="flex flex-row items-center size-full">
        <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center px-[8px] relative size-full">
          <Container34 />
        </div>
      </div>
    </div>
  );
}

function ChevronIcon5() {
  return (
    <div className="relative shrink-0 size-[18px]" data-name="ChevronIcon">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 18 18">
        <g id="ChevronIcon">
          <path d={svgPaths.p1f381080} fill="var(--fill-0, #384857)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function Button7() {
  return (
    <div className="relative shrink-0 size-[18px]" data-name="Button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center relative size-full">
        <ChevronIcon5 />
      </div>
    </div>
  );
}

function Text11() {
  return (
    <div className="h-[19.5px] relative shrink-0" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex h-full items-start overflow-clip relative rounded-[inherit]">
        <p className="font-['Inter:Medium','Noto_Sans:Medium',sans-serif] font-medium leading-[19.5px] not-italic relative shrink-0 text-[#595959] text-[12px] whitespace-nowrap">{`00 Procurement & Contracting Requirements `}</p>
      </div>
    </div>
  );
}

function Container36() {
  return (
    <div className="content-stretch flex gap-[4px] h-[32px] items-center overflow-clip pl-[8px] relative shrink-0 w-[360px]" data-name="Container">
      <Button7 />
      <Text11 />
    </div>
  );
}

function Container35() {
  return (
    <div className="bg-white relative shrink-0 w-[432px]" data-name="Container">
      <div aria-hidden="true" className="absolute border-[#f0f0f0] border-b border-solid inset-0 pointer-events-none" />
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center relative w-full">
        <Container36 />
      </div>
    </div>
  );
}

function ChevronIcon6() {
  return (
    <div className="relative shrink-0 size-[18px]" data-name="ChevronIcon">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 18 18">
        <g id="ChevronIcon">
          <path d={svgPaths.p1f381080} fill="var(--fill-0, #384857)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function Button8() {
  return (
    <div className="relative shrink-0 size-[18px]" data-name="Button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center relative size-full">
        <ChevronIcon6 />
      </div>
    </div>
  );
}

function Text12() {
  return (
    <div className="h-[19.5px] relative shrink-0" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex h-full items-start overflow-clip relative rounded-[inherit]">
        <p className="font-['Inter:Medium','Noto_Sans:Medium',sans-serif] font-medium leading-[19.5px] not-italic relative shrink-0 text-[#595959] text-[12px] whitespace-nowrap">{`00-70 Conditions of the Contract `}</p>
      </div>
    </div>
  );
}

function Container38() {
  return (
    <div className="content-stretch flex gap-[4px] h-[32px] items-center overflow-clip pl-[28px] relative shrink-0 w-[360px]" data-name="Container">
      <Button8 />
      <Text12 />
    </div>
  );
}

function Container37() {
  return (
    <div className="bg-white relative shrink-0 w-[432px]" data-name="Container">
      <div aria-hidden="true" className="absolute border-[#f0f0f0] border-b border-solid inset-0 pointer-events-none" />
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center relative w-full">
        <Container38 />
      </div>
    </div>
  );
}

function Container32() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col items-start min-h-px min-w-px relative w-full" data-name="Container">
      <Container33 />
      <Container35 />
      <Container37 />
    </div>
  );
}

function Container39() {
  return (
    <div className="bg-white h-[48px] relative shrink-0 w-full" data-name="Container">
      <div aria-hidden="true" className="absolute border-[#f0f0f0] border-solid border-t inset-0 pointer-events-none" />
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex items-center justify-between pt-px px-[16px] size-full" />
      </div>
    </div>
  );
}

function Container30() {
  return (
    <div className="bg-white content-stretch flex flex-col h-[652px] items-start overflow-clip relative shrink-0 w-full" data-name="Container">
      <Container31 />
      <Container32 />
      <Container39 />
    </div>
  );
}

function MasterFormat2() {
  return (
    <div className="bg-[#fafafa] h-full relative rounded-[8px] shrink-0 w-[432px]" data-name="Master Format">
      <div className="overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex flex-col items-start py-px relative size-full">
          <Container30 />
        </div>
      </div>
      <div aria-hidden="true" className="absolute border border-[#d9d9d9] border-solid inset-0 pointer-events-none rounded-[8px]" />
    </div>
  );
}

function Frame() {
  return (
    <div className="flex-[1_0_0] min-h-px min-w-px relative w-full">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-between relative size-full">
        <MasterFormat />
        <MasterFormat1 />
        <MasterFormat2 />
      </div>
    </div>
  );
}

function Container5() {
  return (
    <div className="content-stretch flex flex-col gap-[6px] h-[710px] items-start relative shrink-0 w-full" data-name="Container">
      <Container6 />
      <Frame />
    </div>
  );
}

function Container4() {
  return (
    <div className="bg-white flex-[734_0_0] min-h-px min-w-px relative w-full" data-name="Container">
      <div className="overflow-clip rounded-[inherit] size-full">
        <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start px-[16px] py-[12px] relative size-full">
          <Container5 />
        </div>
      </div>
    </div>
  );
}

function Container3() {
  return (
    <div className="flex-[1_0_0] h-[734px] min-h-px min-w-px relative" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative size-full">
        <Container4 />
      </div>
    </div>
  );
}

function Container2() {
  return (
    <div className="h-[734px] relative shrink-0 w-full" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start overflow-clip relative rounded-[inherit] size-full">
        <Container3 />
      </div>
    </div>
  );
}

export default function Container() {
  return (
    <div className="bg-white content-stretch flex flex-col items-start relative size-full" data-name="Container">
      <Container1 />
      <Container2 />
    </div>
  );
}