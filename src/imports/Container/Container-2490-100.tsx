import svgPaths from "./svg-8wfr5s0vsl";

function TextInput() {
  return (
    <div className="absolute bg-white h-[36px] left-0 rounded-[4px] top-0 w-[276px]" data-name="Text Input">
      <div className="content-stretch flex items-center overflow-clip pl-[34px] pr-[10px] relative rounded-[inherit] size-full">
        <p className="font-['Open_Sans:Regular',sans-serif] font-normal leading-[normal] relative shrink-0 text-[14px] text-[rgba(52,64,84,0.5)] whitespace-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
          Search WBS
        </p>
      </div>
      <div aria-hidden="true" className="absolute border border-[#d0d5dd] border-solid inset-0 pointer-events-none rounded-[4px]" />
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

function Text() {
  return (
    <div className="absolute content-stretch flex items-center left-[10px] size-[16px] top-[10px]" data-name="Text">
      <Icon />
    </div>
  );
}

function Container6() {
  return (
    <div className="absolute h-[36px] left-0 top-0 w-[276px]" data-name="Container">
      <TextInput />
      <Text />
    </div>
  );
}

function Container5() {
  return (
    <div className="h-[36px] relative shrink-0 w-[496.109px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <Container6 />
      </div>
    </div>
  );
}

function Icon1() {
  return (
    <div className="absolute left-[15px] size-[16px] top-[10px]" data-name="Icon">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="Icon">
          <path d={svgPaths.p27e42d00} fill="var(--fill-0, #616D79)" id="Vector" />
          <path d={svgPaths.p75a9500} fill="var(--fill-0, #616D79)" id="Vector_2" />
          <path d={svgPaths.p34fe9000} fill="var(--fill-0, #616D79)" id="Vector_3" />
        </g>
      </svg>
    </div>
  );
}

function Button() {
  return (
    <div className="bg-[#f2f3f4] h-[36px] relative rounded-[4px] shrink-0 w-[110.219px]" data-name="Button">
      <div aria-hidden="true" className="absolute border border-[#c3c7cc] border-solid inset-0 pointer-events-none rounded-[4px]" />
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <Icon1 />
        <p className="-translate-x-1/2 absolute font-['Inter:Regular',sans-serif] font-normal leading-[21px] left-[66px] not-italic text-[#616d79] text-[14px] text-center top-[7.5px] whitespace-nowrap">Columns</p>
      </div>
    </div>
  );
}

function Icon2() {
  return (
    <div className="absolute left-[16px] size-[12px] top-[12px]" data-name="Icon">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12 12">
        <g clipPath="url(#clip0_2490_119)" id="Icon">
          <path d={svgPaths.p5d7ae40} fill="var(--fill-0, white)" id="Vector" />
        </g>
        <defs>
          <clipPath id="clip0_2490_119">
            <rect fill="white" height="12" width="12" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Button1() {
  return (
    <div className="bg-[#ff4d00] h-[36px] relative rounded-[4px] shrink-0 w-[129.891px]" data-name="Button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <Icon2 />
        <p className="-translate-x-1/2 absolute font-['Inter:Regular',sans-serif] font-normal leading-[20px] left-[73.5px] not-italic text-[14px] text-center text-white top-[8px] whitespace-nowrap">Edit Mapping</p>
      </div>
    </div>
  );
}

function Container7() {
  return (
    <div className="h-[36px] relative shrink-0 w-[361.719px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[8px] items-center justify-end relative size-full">
        <Button />
        <Button1 />
      </div>
    </div>
  );
}

function Container4() {
  return (
    <div className="h-[50px] relative shrink-0 w-full" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-between relative size-full">
        <Container5 />
        <Container7 />
      </div>
    </div>
  );
}

function Text1() {
  return (
    <div className="absolute h-[20px] left-[8px] overflow-clip top-[13.5px] w-[226px]" data-name="Text">
      <p className="absolute font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[20px] left-0 not-italic text-[#384857] text-[14px] top-0 whitespace-nowrap">{`Bid Package [WBS Tier 01] `}</p>
    </div>
  );
}

function ResizeHandle() {
  return <div className="absolute h-[47px] left-[253px] top-0 w-[7px]" data-name="ResizeHandle" />;
}

function HeaderCell() {
  return (
    <div className="bg-[#fafafa] h-[47px] overflow-clip relative shrink-0 w-[280px]" data-name="HeaderCell">
      <Text1 />
      <ResizeHandle />
    </div>
  );
}

function Text2() {
  return (
    <div className="absolute h-[20px] left-[8px] overflow-clip top-[13.5px] w-[280px]" data-name="Text">
      <p className="absolute font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[20px] left-0 not-italic text-[#384857] text-[14px] top-0 whitespace-nowrap">{`Work Package [WBS Tier 02] `}</p>
    </div>
  );
}

function ResizeHandle1() {
  return <div className="absolute h-[47px] left-[73px] top-0 w-[7px]" data-name="ResizeHandle" />;
}

function HeaderCell1() {
  return (
    <div className="bg-[#fafafa] h-[47px] overflow-clip relative shrink-0 w-[280px]" data-name="HeaderCell">
      <Text2 />
      <ResizeHandle1 />
    </div>
  );
}

function Text3() {
  return (
    <div className="absolute h-[20px] left-[8px] overflow-clip top-[13.5px] w-[280px]" data-name="Text">
      <p className="absolute font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[20px] left-0 not-italic text-[#384857] text-[14px] top-0 whitespace-pre">{`Scope  [WBS Tier 03] `}</p>
    </div>
  );
}

function ResizeHandle2() {
  return <div className="absolute h-[47px] left-[73px] top-0 w-[7px]" data-name="ResizeHandle" />;
}

function HeaderCell2() {
  return (
    <div className="bg-[#fafafa] h-[47px] overflow-clip relative shrink-0 w-[280px]" data-name="HeaderCell">
      <Text3 />
      <ResizeHandle2 />
    </div>
  );
}

function Text4() {
  return (
    <div className="absolute h-[20px] left-[8px] overflow-clip top-[13.5px] w-[280px]" data-name="Text">
      <p className="absolute font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[20px] left-0 not-italic text-[#384857] text-[14px] top-0 whitespace-nowrap">Uni Format Tier 01</p>
    </div>
  );
}

function ResizeHandle3() {
  return <div className="absolute h-[47px] left-[73px] top-0 w-[7px]" data-name="ResizeHandle" />;
}

function HeaderCell3() {
  return (
    <div className="bg-[#fafafa] h-[47px] overflow-clip relative shrink-0 w-[280px]" data-name="HeaderCell">
      <Text4 />
      <ResizeHandle3 />
    </div>
  );
}

function Text5() {
  return (
    <div className="absolute h-[20px] left-[8px] overflow-clip top-[13.5px] w-[280px]" data-name="Text">
      <p className="absolute font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[20px] left-0 not-italic text-[#384857] text-[14px] top-0 whitespace-nowrap">Uni Format Tier 02</p>
    </div>
  );
}

function ResizeHandle4() {
  return <div className="absolute h-[47px] left-[73px] top-0 w-[7px]" data-name="ResizeHandle" />;
}

function HeaderCell4() {
  return (
    <div className="bg-[#fafafa] h-[47px] overflow-clip relative shrink-0 w-[280px]" data-name="HeaderCell">
      <Text5 />
      <ResizeHandle4 />
    </div>
  );
}

function Container10() {
  return (
    <div className="bg-[#fafafa] content-stretch flex items-center relative shrink-0" data-name="Container">
      <div aria-hidden="true" className="absolute border-[#f0f0f0] border-b border-solid inset-0 pointer-events-none" />
      <HeaderCell />
      <HeaderCell1 />
      <HeaderCell2 />
      <HeaderCell3 />
      <HeaderCell4 />
    </div>
  );
}

function FormatPill() {
  return (
    <div className="h-[22px] relative rounded-[4px] shrink-0 w-[257px]" data-name="FormatPill">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center px-[8px] relative size-full">
        <p className="font-['Inter:Medium',sans-serif] font-medium leading-[18px] not-italic relative shrink-0 text-[#595959] text-[12px] w-[241px]">BP 01A Owner Allowances</p>
      </div>
    </div>
  );
}

function CellValue() {
  return (
    <div className="h-[22px] relative shrink-0" data-name="CellValue">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex h-full items-center relative">
        <FormatPill />
      </div>
    </div>
  );
}

function DataCell() {
  return (
    <div className="absolute content-stretch flex h-[31px] items-center left-0 overflow-clip top-0" data-name="DataCell">
      <CellValue />
    </div>
  );
}

function Container13() {
  return (
    <div className="bg-white h-[31px] overflow-clip relative shrink-0 w-[280px]" data-name="Container">
      <DataCell />
    </div>
  );
}

function FormatPill1() {
  return (
    <div className="h-[22px] relative rounded-[4px] shrink-0 w-[257px]" data-name="FormatPill">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center px-[8px] relative size-full">
        <p className="font-['Inter:Medium',sans-serif] font-medium leading-[18px] not-italic relative shrink-0 text-[#595959] text-[12px] w-[241px]">01A.01 Contingency Allowances</p>
      </div>
    </div>
  );
}

function CellValue1() {
  return (
    <div className="h-[22px] relative shrink-0" data-name="CellValue">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex h-full items-center relative">
        <FormatPill1 />
      </div>
    </div>
  );
}

function DataCell1() {
  return (
    <div className="absolute content-stretch flex h-[31px] items-center left-0 overflow-clip top-0" data-name="DataCell">
      <CellValue1 />
    </div>
  );
}

function Container14() {
  return (
    <div className="bg-white h-[31px] overflow-clip relative shrink-0 w-[280px]" data-name="Container">
      <DataCell1 />
    </div>
  );
}

function FormatPill2() {
  return (
    <div className="h-[22px] relative rounded-[4px] shrink-0 w-[257px]" data-name="FormatPill">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center px-[8px] relative size-full">
        <p className="font-['Inter:Medium',sans-serif] font-medium leading-[18px] not-italic relative shrink-0 text-[#595959] text-[12px] w-[241px]">01A.01.10 Owner Contingency Allowance</p>
      </div>
    </div>
  );
}

function CellValue2() {
  return (
    <div className="h-[22px] relative shrink-0" data-name="CellValue">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex h-full items-center relative">
        <FormatPill2 />
      </div>
    </div>
  );
}

function DataCell2() {
  return (
    <div className="absolute content-stretch flex h-[31px] items-center left-0 overflow-clip top-0" data-name="DataCell">
      <CellValue2 />
    </div>
  );
}

function Container15() {
  return (
    <div className="bg-white h-[31px] overflow-clip relative shrink-0 w-[280px]" data-name="Container">
      <DataCell2 />
    </div>
  );
}

function FormatPill3() {
  return (
    <div className="h-[22px] relative rounded-[4px] shrink-0 w-[257px]" data-name="FormatPill">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center px-[8px] relative size-full">
        <p className="font-['Inter:Medium',sans-serif] font-medium leading-[18px] not-italic relative shrink-0 text-[#595959] text-[12px] w-[241px]">Z GENERAL</p>
      </div>
    </div>
  );
}

function CellValue3() {
  return (
    <div className="h-[22px] relative shrink-0" data-name="CellValue">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex h-full items-center relative">
        <FormatPill3 />
      </div>
    </div>
  );
}

function DataCell3() {
  return (
    <div className="absolute content-stretch flex h-[31px] items-center left-0 overflow-clip top-0" data-name="DataCell">
      <CellValue3 />
    </div>
  );
}

function Container16() {
  return (
    <div className="bg-white h-[31px] overflow-clip relative shrink-0 w-[280px]" data-name="Container">
      <DataCell3 />
    </div>
  );
}

function FormatPill4() {
  return (
    <div className="h-[22px] relative rounded-[4px] shrink-0 w-[257px]" data-name="FormatPill">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center px-[8px] relative size-full">
        <p className="font-['Inter:Medium',sans-serif] font-medium leading-[18px] not-italic relative shrink-0 text-[#595959] text-[12px] w-[241px]">Z10 GENERAL REQUIREMENTS</p>
      </div>
    </div>
  );
}

function CellValue4() {
  return (
    <div className="h-[22px] relative shrink-0" data-name="CellValue">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex h-full items-center relative">
        <FormatPill4 />
      </div>
    </div>
  );
}

function DataCell4() {
  return (
    <div className="absolute content-stretch flex h-[31px] items-center left-0 overflow-clip top-0" data-name="DataCell">
      <CellValue4 />
    </div>
  );
}

function Container17() {
  return (
    <div className="bg-white h-[31px] overflow-clip relative shrink-0 w-[280px]" data-name="Container">
      <DataCell4 />
    </div>
  );
}

function Container12() {
  return (
    <div className="bg-white relative shrink-0" data-name="Container">
      <div aria-hidden="true" className="absolute border-[#f0f0f0] border-b border-solid inset-0 pointer-events-none" />
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center relative">
        <Container13 />
        <Container14 />
        <Container15 />
        <Container16 />
        <Container17 />
      </div>
    </div>
  );
}

function Container11() {
  return (
    <div className="content-stretch flex flex-col h-[552px] items-start pt-[48px] relative shrink-0 w-[1391px]" data-name="Container">
      <Container12 />
    </div>
  );
}

function Container9() {
  return (
    <div className="bg-white content-stretch flex flex-col items-start overflow-clip relative shrink-0 w-full" data-name="Container">
      <Container10 />
      <Container11 />
    </div>
  );
}

function Text6() {
  return (
    <div className="h-[20px] relative shrink-0 w-[160.969px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[20px] left-0 not-italic text-[#616d79] text-[14px] top-0 whitespace-nowrap">Showing 1–20 of 35 files</p>
      </div>
    </div>
  );
}

function Icon3() {
  return (
    <div className="relative shrink-0 size-[13px]" data-name="Icon">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 13 13">
        <g id="Icon">
          <path d={svgPaths.p23808200} id="Vector" stroke="var(--stroke-0, #384857)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="0.8125" />
        </g>
      </svg>
    </div>
  );
}

function Button2() {
  return (
    <div className="bg-white opacity-40 relative rounded-[4px] shrink-0 size-[32px]" data-name="Button">
      <div aria-hidden="true" className="absolute border border-[#d0d5dd] border-solid inset-0 pointer-events-none rounded-[4px]" />
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center px-[9.5px] py-px relative size-full">
        <Icon3 />
      </div>
    </div>
  );
}

function Button3() {
  return (
    <div className="bg-[#ff4d00] relative rounded-[4px] shrink-0 size-[32px]" data-name="Button">
      <div aria-hidden="true" className="absolute border border-[#d0d5dd] border-solid inset-0 pointer-events-none rounded-[4px]" />
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center p-px relative size-full">
        <p className="font-['Outfit:SemiBold',sans-serif] font-semibold leading-[21px] relative shrink-0 text-[14px] text-center text-white whitespace-nowrap">1</p>
      </div>
    </div>
  );
}

function Button4() {
  return (
    <div className="bg-white relative rounded-[4px] shrink-0 size-[32px]" data-name="Button">
      <div aria-hidden="true" className="absolute border border-[#d0d5dd] border-solid inset-0 pointer-events-none rounded-[4px]" />
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center p-px relative size-full">
        <p className="font-['Outfit:Regular',sans-serif] font-normal leading-[21px] relative shrink-0 text-[#384857] text-[14px] text-center whitespace-nowrap">2</p>
      </div>
    </div>
  );
}

function Icon4() {
  return (
    <div className="relative shrink-0 size-[13px]" data-name="Icon">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 13 13">
        <g id="Icon">
          <path d={svgPaths.pd77e380} id="Vector" stroke="var(--stroke-0, #384857)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="0.8125" />
        </g>
      </svg>
    </div>
  );
}

function Button5() {
  return (
    <div className="bg-white flex-[1_0_0] h-[32px] min-h-px min-w-px relative rounded-[4px]" data-name="Button">
      <div aria-hidden="true" className="absolute border border-[#d0d5dd] border-solid inset-0 pointer-events-none rounded-[4px]" />
      <div className="flex flex-row items-center justify-center size-full">
        <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center px-[9.5px] py-px relative size-full">
          <Icon4 />
        </div>
      </div>
    </div>
  );
}

function Container19() {
  return (
    <div className="h-[32px] relative shrink-0 w-[140px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[4px] items-center relative size-full">
        <Button2 />
        <Button3 />
        <Button4 />
        <Button5 />
      </div>
    </div>
  );
}

function Container18() {
  return (
    <div className="bg-white h-[48px] relative shrink-0 w-full" data-name="Container">
      <div aria-hidden="true" className="absolute border-[#f0f0f0] border-solid border-t inset-0 pointer-events-none" />
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex items-center justify-between pt-px px-[16px] relative size-full">
          <Text6 />
          <Container19 />
        </div>
      </div>
    </div>
  );
}

function Container8() {
  return (
    <div className="bg-[#fafafa] flex-[602_0_0] min-h-px min-w-px relative rounded-[8px] w-full" data-name="Container">
      <div className="overflow-clip rounded-[inherit] size-full">
        <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start py-px relative size-full">
          <Container9 />
          <Container18 />
        </div>
      </div>
      <div aria-hidden="true" className="absolute border border-[#d9d9d9] border-solid inset-0 pointer-events-none rounded-[8px]" />
    </div>
  );
}

function Container3() {
  return (
    <div className="content-stretch flex flex-col gap-[6px] h-[710px] items-start relative shrink-0 w-full" data-name="Container">
      <Container4 />
      <Container8 />
    </div>
  );
}

function Container2() {
  return (
    <div className="bg-white flex-[734_0_0] min-h-px min-w-px relative w-full" data-name="Container">
      <div className="overflow-clip rounded-[inherit] size-full">
        <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start px-[16px] py-[12px] relative size-full">
          <Container3 />
        </div>
      </div>
    </div>
  );
}

function Container1() {
  return (
    <div className="flex-[1_0_0] h-[734px] min-h-px min-w-px relative" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative size-full">
        <Container2 />
      </div>
    </div>
  );
}

export default function Container() {
  return (
    <div className="content-stretch flex items-start relative size-full" data-name="Container">
      <Container1 />
    </div>
  );
}