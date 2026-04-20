import svgPaths from "./svg-1eodg0pea5";

function Paragraph() {
  return (
    <div className="h-[28.802px] relative shrink-0 w-[436.944px]" data-name="Paragraph">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Actor:Regular',sans-serif] leading-[28.8px] left-0 not-italic text-[#1b2736] text-[24px] top-[-1.11px] whitespace-nowrap">{`Create project `}</p>
      </div>
    </div>
  );
}

function CloseIcon() {
  return (
    <div className="h-[11.997px] overflow-clip relative shrink-0 w-full" data-name="CloseIcon">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 11.9965 11.9965">
        <path d={svgPaths.p2b98ac80} fill="var(--fill-0, #384857)" id="Vector" />
      </svg>
    </div>
  );
}

function Container3() {
  return (
    <div className="relative shrink-0 size-[27.969px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start pt-[7.986px] px-[7.986px] relative size-full">
        <CloseIcon />
      </div>
    </div>
  );
}

function Button() {
  return (
    <div className="relative rounded-[40px] shrink-0 size-[27.969px]" data-name="Button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center relative size-full">
        <Container3 />
      </div>
    </div>
  );
}

function Container2() {
  return (
    <div className="absolute content-stretch flex h-[71.997px] items-center justify-between left-0 top-0 w-[552.014px]" data-name="Container">
      <Paragraph />
      <Button />
    </div>
  );
}

function Container4() {
  return <div className="absolute bg-[#f0f0f0] h-[0.99px] left-0 top-[72px] w-[552.014px]" data-name="Container" />;
}

function Container1() {
  return (
    <div className="h-[72.986px] relative shrink-0 w-[552.014px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <Container2 />
        <Container4 />
      </div>
    </div>
  );
}

function Frame70() {
  return (
    <div className="content-stretch flex items-start relative shrink-0">
      <div className="flex flex-col font-['Actor:Regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#1b2736] text-[14px] whitespace-nowrap">
        <p className="leading-[1.2]">Project Name</p>
      </div>
    </div>
  );
}

function Frame13() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-[20px]">
      <div className="flex flex-col font-['Actor:Regular',sans-serif] justify-end leading-[0] not-italic relative shrink-0 text-[#db0000] text-[14px] whitespace-nowrap">
        <p className="leading-[1.2]">*</p>
      </div>
    </div>
  );
}

function Frame17() {
  return (
    <div className="content-stretch flex items-start justify-end relative shrink-0">
      <div className="content-stretch flex gap-[4px] items-start relative shrink-0" data-name="Label Value">
        <Frame70 />
        <Frame13 />
      </div>
    </div>
  );
}

function Frame24() {
  return (
    <div className="content-stretch flex flex-[1_0_0] items-center min-h-px min-w-px relative">
      <div className="content-stretch flex flex-[1_0_0] items-center min-h-px min-w-px relative" data-name="Entry">
        <p className="flex-[1_0_0] font-['Actor:Regular',sans-serif] leading-[1.2] min-h-px min-w-px not-italic overflow-hidden relative text-[#9ea3a9] text-[14px] text-ellipsis whitespace-nowrap">Type a project name</p>
      </div>
    </div>
  );
}

function Frame2() {
  return (
    <div className="bg-white flex-[1_0_0] min-h-[40px] min-w-px relative rounded-[4px]">
      <div aria-hidden="true" className="absolute border border-[#9ea2a8] border-solid inset-0 pointer-events-none rounded-[4px]" />
      <div className="flex flex-row items-center justify-end min-h-[inherit] size-full">
        <div className="content-stretch flex gap-[12px] items-center justify-end min-h-[inherit] pb-[11px] pt-[10px] px-[12px] relative w-full">
          <Frame24 />
        </div>
      </div>
    </div>
  );
}

function Frame8() {
  return (
    <div className="content-stretch flex flex-[1_0_0] gap-[4px] items-center min-h-px min-w-px relative">
      <Frame2 />
    </div>
  );
}

function Frame23() {
  return (
    <div className="content-stretch flex items-center relative shrink-0 w-full">
      <Frame8 />
    </div>
  );
}

function Frame12() {
  return (
    <div className="content-stretch flex flex-col gap-[4px] items-start justify-center relative shrink-0 w-full">
      <Frame23 />
    </div>
  );
}

function Frame71() {
  return (
    <div className="content-stretch flex items-start relative shrink-0">
      <div className="flex flex-col font-['Actor:Regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#1b2736] text-[14px] whitespace-nowrap">
        <p className="leading-[1.2]">Project Number</p>
      </div>
    </div>
  );
}

function Frame14() {
  return <div className="content-stretch flex flex-col items-start shrink-0 w-[20px]" />;
}

function Frame18() {
  return (
    <div className="content-stretch flex items-start justify-end relative shrink-0">
      <div className="content-stretch flex gap-[4px] items-start relative shrink-0" data-name="Label Value">
        <Frame71 />
        <Frame14 />
      </div>
    </div>
  );
}

function Frame26() {
  return (
    <div className="content-stretch flex flex-[1_0_0] items-center min-h-px min-w-px relative">
      <div className="content-stretch flex flex-[1_0_0] items-center min-h-px min-w-px relative" data-name="Entry">
        <p className="flex-[1_0_0] font-['Actor:Regular',sans-serif] leading-[1.2] min-h-px min-w-px not-italic overflow-hidden relative text-[#9ea3a9] text-[14px] text-ellipsis whitespace-nowrap">Type a project number</p>
      </div>
    </div>
  );
}

function Frame3() {
  return (
    <div className="bg-white flex-[1_0_0] min-h-[40px] min-w-px relative rounded-[4px]">
      <div aria-hidden="true" className="absolute border border-[#9ea2a8] border-solid inset-0 pointer-events-none rounded-[4px]" />
      <div className="flex flex-row items-center justify-end min-h-[inherit] size-full">
        <div className="content-stretch flex gap-[12px] items-center justify-end min-h-[inherit] pb-[11px] pt-[10px] px-[12px] relative w-full">
          <Frame26 />
        </div>
      </div>
    </div>
  );
}

function Frame9() {
  return (
    <div className="content-stretch flex flex-[1_0_0] gap-[4px] items-center min-h-px min-w-px relative">
      <Frame3 />
    </div>
  );
}

function Frame25() {
  return (
    <div className="content-stretch flex items-center relative shrink-0 w-full">
      <Frame9 />
    </div>
  );
}

function Frame15() {
  return (
    <div className="content-stretch flex flex-col gap-[4px] items-start justify-center relative shrink-0 w-full">
      <Frame25 />
    </div>
  );
}

function Frame72() {
  return (
    <div className="content-stretch flex items-start relative shrink-0">
      <div className="flex flex-col font-['Actor:Regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#1b2736] text-[14px] whitespace-nowrap">
        <p className="leading-[1.2]">Project Type</p>
      </div>
    </div>
  );
}

function Frame19() {
  return (
    <div className="content-stretch flex items-start justify-end relative shrink-0">
      <div className="content-stretch flex gap-[4px] items-start relative shrink-0" data-name="Label Value">
        <Frame72 />
      </div>
    </div>
  );
}

function Frame28() {
  return (
    <div className="content-stretch flex flex-[1_0_0] items-center min-h-px min-w-px relative">
      <div className="content-stretch flex flex-[1_0_0] items-center min-h-px min-w-px relative" data-name="Entry">
        <p className="flex-[1_0_0] font-['Actor:Regular',sans-serif] leading-[1.2] min-h-px min-w-px not-italic overflow-hidden relative text-[#9ea3a9] text-[14px] text-ellipsis whitespace-pre">{`Select  a project Type`}</p>
      </div>
    </div>
  );
}

function Frame65() {
  return (
    <div className="content-stretch flex items-center relative shrink-0">
      <div className="overflow-clip relative shrink-0 size-[16px]" data-name="chevron.down">
        <div className="absolute inset-[34.04%_22.22%_34.03%_22.19%]" data-name="chevron.down">
          <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 8.89453 5.1077">
            <path d={svgPaths.p239bdd00} fill="var(--fill-0, #9EA3A9)" id="chevron.down" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function Frame4() {
  return (
    <div className="bg-white flex-[1_0_0] min-h-[40px] min-w-px relative rounded-[4px]">
      <div aria-hidden="true" className="absolute border border-[#9ea2a8] border-solid inset-0 pointer-events-none rounded-[4px]" />
      <div className="flex flex-row items-center justify-end min-h-[inherit] size-full">
        <div className="content-stretch flex gap-[12px] items-center justify-end min-h-[inherit] pb-[11px] pt-[10px] px-[12px] relative w-full">
          <Frame28 />
          <Frame65 />
        </div>
      </div>
    </div>
  );
}

function Frame10() {
  return (
    <div className="content-stretch flex flex-[1_0_0] gap-[4px] items-center min-h-px min-w-px relative">
      <Frame4 />
    </div>
  );
}

function Frame27() {
  return (
    <div className="content-stretch flex items-center relative shrink-0 w-full">
      <Frame10 />
    </div>
  );
}

function Frame16() {
  return (
    <div className="content-stretch flex flex-col gap-[4px] items-start justify-center relative shrink-0 w-full">
      <Frame27 />
    </div>
  );
}

function InputSelect() {
  return (
    <div className="content-stretch flex flex-col gap-[4px] items-start relative shrink-0 w-full" data-name="Input-Select">
      <Frame19 />
      <Frame16 />
    </div>
  );
}

function Frame73() {
  return (
    <div className="content-stretch flex items-start relative shrink-0">
      <div className="flex flex-col font-['Actor:Regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#1b2736] text-[14px] whitespace-nowrap">
        <p className="leading-[1.2]">Project Scope</p>
      </div>
    </div>
  );
}

function Frame20() {
  return (
    <div className="content-stretch flex items-start justify-end relative shrink-0">
      <div className="content-stretch flex gap-[4px] items-start relative shrink-0" data-name="Label Value">
        <Frame73 />
      </div>
    </div>
  );
}

function Frame30() {
  return (
    <div className="content-stretch flex flex-[1_0_0] items-center min-h-px min-w-px relative">
      <div className="content-stretch flex flex-[1_0_0] items-center min-h-px min-w-px relative" data-name="Entry">
        <p className="flex-[1_0_0] font-['Actor:Regular',sans-serif] leading-[1.2] min-h-px min-w-px not-italic overflow-hidden relative text-[#9ea3a9] text-[14px] text-ellipsis whitespace-pre">{`Select  a project scope`}</p>
      </div>
    </div>
  );
}

function Frame66() {
  return (
    <div className="content-stretch flex items-center relative shrink-0">
      <div className="overflow-clip relative shrink-0 size-[16px]" data-name="chevron.down">
        <div className="absolute inset-[34.04%_22.22%_34.03%_22.19%]" data-name="chevron.down">
          <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 8.89453 5.1077">
            <path d={svgPaths.p239bdd00} fill="var(--fill-0, #9EA3A9)" id="chevron.down" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function Frame5() {
  return (
    <div className="bg-white flex-[1_0_0] min-h-[40px] min-w-px relative rounded-[4px]">
      <div aria-hidden="true" className="absolute border border-[#9ea2a8] border-solid inset-0 pointer-events-none rounded-[4px]" />
      <div className="flex flex-row items-center justify-end min-h-[inherit] size-full">
        <div className="content-stretch flex gap-[12px] items-center justify-end min-h-[inherit] pb-[11px] pt-[10px] px-[12px] relative w-full">
          <Frame30 />
          <Frame66 />
        </div>
      </div>
    </div>
  );
}

function Frame11() {
  return (
    <div className="content-stretch flex flex-[1_0_0] gap-[4px] items-center min-h-px min-w-px relative">
      <Frame5 />
    </div>
  );
}

function Frame29() {
  return (
    <div className="content-stretch flex items-center relative shrink-0 w-full">
      <Frame11 />
    </div>
  );
}

function Frame21() {
  return (
    <div className="content-stretch flex flex-col gap-[4px] items-start justify-center relative shrink-0 w-full">
      <Frame29 />
    </div>
  );
}

function InputSelect1() {
  return (
    <div className="content-stretch flex flex-col gap-[4px] items-start relative shrink-0 w-full" data-name="Input-Select">
      <Frame20 />
      <Frame21 />
    </div>
  );
}

function Frame74() {
  return (
    <div className="content-stretch flex items-start relative shrink-0">
      <div className="flex flex-col font-['Actor:Regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#1b2736] text-[14px] whitespace-nowrap">
        <p className="leading-[1.2]">Delivery Methos</p>
      </div>
    </div>
  );
}

function Frame22() {
  return (
    <div className="content-stretch flex items-start justify-end relative shrink-0">
      <div className="content-stretch flex gap-[4px] items-start relative shrink-0" data-name="Label Value">
        <Frame74 />
      </div>
    </div>
  );
}

function Frame34() {
  return (
    <div className="content-stretch flex flex-[1_0_0] items-center min-h-px min-w-px relative">
      <div className="content-stretch flex flex-[1_0_0] items-center min-h-px min-w-px relative" data-name="Entry">
        <p className="flex-[1_0_0] font-['Actor:Regular',sans-serif] leading-[1.2] min-h-px min-w-px not-italic overflow-hidden relative text-[#9ea3a9] text-[14px] text-ellipsis whitespace-pre">{`Select  a delivery method`}</p>
      </div>
    </div>
  );
}

function Frame67() {
  return (
    <div className="content-stretch flex items-center relative shrink-0">
      <div className="overflow-clip relative shrink-0 size-[16px]" data-name="chevron.down">
        <div className="absolute inset-[34.04%_22.22%_34.03%_22.19%]" data-name="chevron.down">
          <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 8.89453 5.1077">
            <path d={svgPaths.p239bdd00} fill="var(--fill-0, #9EA3A9)" id="chevron.down" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function Frame6() {
  return (
    <div className="bg-white flex-[1_0_0] min-h-[40px] min-w-px relative rounded-[4px]">
      <div aria-hidden="true" className="absolute border border-[#9ea2a8] border-solid inset-0 pointer-events-none rounded-[4px]" />
      <div className="flex flex-row items-center justify-end min-h-[inherit] size-full">
        <div className="content-stretch flex gap-[12px] items-center justify-end min-h-[inherit] pb-[11px] pt-[10px] px-[12px] relative w-full">
          <Frame34 />
          <Frame67 />
        </div>
      </div>
    </div>
  );
}

function Frame33() {
  return (
    <div className="content-stretch flex flex-[1_0_0] gap-[4px] items-center min-h-px min-w-px relative">
      <Frame6 />
    </div>
  );
}

function Frame32() {
  return (
    <div className="content-stretch flex items-center relative shrink-0 w-full">
      <Frame33 />
    </div>
  );
}

function Frame31() {
  return (
    <div className="content-stretch flex flex-col gap-[4px] items-start justify-center relative shrink-0 w-full">
      <Frame32 />
    </div>
  );
}

function InputSelect2() {
  return (
    <div className="content-stretch flex flex-col gap-[4px] items-start relative shrink-0 w-full" data-name="Input-Select">
      <Frame22 />
      <Frame31 />
    </div>
  );
}

function Frame75() {
  return (
    <div className="content-stretch flex items-start relative shrink-0">
      <div className="flex flex-col font-['Actor:Regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#1b2736] text-[14px] whitespace-nowrap">
        <p className="leading-[1.2]">Project Address</p>
      </div>
    </div>
  );
}

function Frame35() {
  return (
    <div className="content-stretch flex items-start justify-end relative shrink-0">
      <div className="content-stretch flex gap-[4px] items-start relative shrink-0" data-name="Label Value">
        <Frame75 />
      </div>
    </div>
  );
}

function Frame39() {
  return (
    <div className="content-stretch flex flex-[1_0_0] items-center min-h-px min-w-px relative">
      <div className="content-stretch flex flex-[1_0_0] items-center min-h-px min-w-px relative" data-name="Entry">
        <p className="flex-[1_0_0] font-['Actor:Regular',sans-serif] leading-[1.2] min-h-px min-w-px not-italic overflow-hidden relative text-[#9ea3a9] text-[14px] text-ellipsis whitespace-nowrap">Country</p>
      </div>
    </div>
  );
}

function Frame68() {
  return (
    <div className="content-stretch flex items-center relative shrink-0">
      <div className="overflow-clip relative shrink-0 size-[16px]" data-name="chevron.down">
        <div className="absolute inset-[34.04%_22.22%_34.03%_22.19%]" data-name="chevron.down">
          <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 8.89453 5.1077">
            <path d={svgPaths.p239bdd00} fill="var(--fill-0, #9EA3A9)" id="chevron.down" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function Frame7() {
  return (
    <div className="bg-white flex-[1_0_0] min-h-[40px] min-w-px relative rounded-[4px]">
      <div aria-hidden="true" className="absolute border border-[#9ea2a8] border-solid inset-0 pointer-events-none rounded-[4px]" />
      <div className="flex flex-row items-center justify-end min-h-[inherit] size-full">
        <div className="content-stretch flex gap-[12px] items-center justify-end min-h-[inherit] pb-[11px] pt-[10px] px-[12px] relative w-full">
          <Frame39 />
          <Frame68 />
        </div>
      </div>
    </div>
  );
}

function Frame38() {
  return (
    <div className="content-stretch flex flex-[1_0_0] gap-[4px] items-center min-h-px min-w-px relative">
      <Frame7 />
    </div>
  );
}

function Frame37() {
  return (
    <div className="content-stretch flex items-center relative shrink-0 w-full">
      <Frame38 />
    </div>
  );
}

function Frame36() {
  return (
    <div className="content-stretch flex flex-col gap-[4px] items-start justify-center relative shrink-0 w-full">
      <Frame37 />
    </div>
  );
}

function InputSelect3() {
  return (
    <div className="content-stretch flex flex-col gap-[4px] items-start relative shrink-0 w-full" data-name="Input-Select">
      <Frame35 />
      <Frame36 />
    </div>
  );
}

function Frame44() {
  return (
    <div className="content-stretch flex flex-[1_0_0] items-center min-h-px min-w-px relative">
      <div className="content-stretch flex flex-[1_0_0] items-center min-h-px min-w-px relative" data-name="Entry">
        <p className="flex-[1_0_0] font-['Actor:Regular',sans-serif] leading-[1.2] min-h-px min-w-px not-italic overflow-hidden relative text-[#9ea3a9] text-[14px] text-ellipsis whitespace-nowrap">Address Line 1</p>
      </div>
    </div>
  );
}

function Frame43() {
  return (
    <div className="bg-white flex-[1_0_0] min-h-[40px] min-w-px relative rounded-[4px]">
      <div aria-hidden="true" className="absolute border border-[#9ea2a8] border-solid inset-0 pointer-events-none rounded-[4px]" />
      <div className="flex flex-row items-center justify-end min-h-[inherit] size-full">
        <div className="content-stretch flex gap-[12px] items-center justify-end min-h-[inherit] pb-[11px] pt-[10px] px-[12px] relative w-full">
          <Frame44 />
        </div>
      </div>
    </div>
  );
}

function Frame42() {
  return (
    <div className="content-stretch flex flex-[1_0_0] gap-[4px] items-center min-h-px min-w-px relative">
      <Frame43 />
    </div>
  );
}

function Frame41() {
  return (
    <div className="content-stretch flex items-center relative shrink-0 w-full">
      <Frame42 />
    </div>
  );
}

function Frame40() {
  return (
    <div className="content-stretch flex flex-col gap-[4px] items-start justify-center relative shrink-0 w-full">
      <Frame41 />
    </div>
  );
}

function Frame49() {
  return (
    <div className="content-stretch flex flex-[1_0_0] items-center min-h-px min-w-px relative">
      <div className="content-stretch flex flex-[1_0_0] items-center min-h-px min-w-px relative" data-name="Entry">
        <p className="flex-[1_0_0] font-['Actor:Regular',sans-serif] leading-[1.2] min-h-px min-w-px not-italic overflow-hidden relative text-[#9ea3a9] text-[14px] text-ellipsis whitespace-nowrap">Address Line 2</p>
      </div>
    </div>
  );
}

function Frame48() {
  return (
    <div className="bg-white flex-[1_0_0] min-h-[40px] min-w-px relative rounded-[4px]">
      <div aria-hidden="true" className="absolute border border-[#9ea2a8] border-solid inset-0 pointer-events-none rounded-[4px]" />
      <div className="flex flex-row items-center justify-end min-h-[inherit] size-full">
        <div className="content-stretch flex gap-[12px] items-center justify-end min-h-[inherit] pb-[11px] pt-[10px] px-[12px] relative w-full">
          <Frame49 />
        </div>
      </div>
    </div>
  );
}

function Frame47() {
  return (
    <div className="content-stretch flex flex-[1_0_0] gap-[4px] items-center min-h-px min-w-px relative">
      <Frame48 />
    </div>
  );
}

function Frame46() {
  return (
    <div className="content-stretch flex items-center relative shrink-0 w-full">
      <Frame47 />
    </div>
  );
}

function Frame45() {
  return (
    <div className="content-stretch flex flex-col gap-[4px] items-start justify-center relative shrink-0 w-full">
      <Frame46 />
    </div>
  );
}

function Frame54() {
  return (
    <div className="content-stretch flex flex-[1_0_0] items-center min-h-px min-w-px relative">
      <div className="content-stretch flex flex-[1_0_0] items-center min-h-px min-w-px relative" data-name="Entry">
        <p className="flex-[1_0_0] font-['Actor:Regular',sans-serif] leading-[1.2] min-h-px min-w-px not-italic overflow-hidden relative text-[#9ea3a9] text-[14px] text-ellipsis whitespace-nowrap">City</p>
      </div>
    </div>
  );
}

function Frame53() {
  return (
    <div className="bg-white flex-[1_0_0] min-h-[40px] min-w-px relative rounded-[4px]">
      <div aria-hidden="true" className="absolute border border-[#9ea2a8] border-solid inset-0 pointer-events-none rounded-[4px]" />
      <div className="flex flex-row items-center justify-end min-h-[inherit] size-full">
        <div className="content-stretch flex gap-[12px] items-center justify-end min-h-[inherit] pb-[11px] pt-[10px] px-[12px] relative w-full">
          <Frame54 />
        </div>
      </div>
    </div>
  );
}

function Frame52() {
  return (
    <div className="content-stretch flex flex-[1_0_0] gap-[4px] items-center min-h-px min-w-px relative">
      <Frame53 />
    </div>
  );
}

function Frame51() {
  return (
    <div className="content-stretch flex items-center relative shrink-0 w-full">
      <Frame52 />
    </div>
  );
}

function Frame50() {
  return (
    <div className="content-stretch flex flex-col gap-[4px] items-start justify-center relative shrink-0 w-full">
      <Frame51 />
    </div>
  );
}

function Frame59() {
  return (
    <div className="content-stretch flex flex-[1_0_0] items-center min-h-px min-w-px relative">
      <div className="content-stretch flex flex-[1_0_0] items-center min-h-px min-w-px relative" data-name="Entry">
        <p className="flex-[1_0_0] font-['Actor:Regular',sans-serif] leading-[1.2] min-h-px min-w-px not-italic overflow-hidden relative text-[#9ea3a9] text-[14px] text-ellipsis whitespace-nowrap">State/Region</p>
      </div>
    </div>
  );
}

function Frame69() {
  return (
    <div className="content-stretch flex items-center relative shrink-0">
      <div className="overflow-clip relative shrink-0 size-[28px]" data-name="chevron.down">
        <div className="absolute inset-[34.04%_22.22%_34.03%_22.19%]" data-name="chevron.down">
          <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 8.89453 5.1077">
            <path d={svgPaths.p239bdd00} fill="var(--fill-0, #8C8C8C)" id="chevron.down" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function Frame58() {
  return (
    <div className="bg-white flex-[1_0_0] min-h-[40px] min-w-px relative rounded-[4px]">
      <div aria-hidden="true" className="absolute border border-[#9ea2a8] border-solid inset-0 pointer-events-none rounded-[4px]" />
      <div className="flex flex-row items-center justify-end min-h-[inherit] size-full">
        <div className="content-stretch flex gap-[12px] items-center justify-end min-h-[inherit] pb-[11px] pt-[10px] px-[12px] relative w-full">
          <Frame59 />
          <Frame69 />
        </div>
      </div>
    </div>
  );
}

function Frame57() {
  return (
    <div className="content-stretch flex flex-[1_0_0] gap-[4px] items-center min-h-px min-w-px relative">
      <Frame58 />
    </div>
  );
}

function Frame56() {
  return (
    <div className="content-stretch flex items-center relative shrink-0 w-full">
      <Frame57 />
    </div>
  );
}

function Frame55() {
  return (
    <div className="content-stretch flex flex-col gap-[4px] items-start justify-center relative shrink-0 w-full">
      <Frame56 />
    </div>
  );
}

function Frame64() {
  return (
    <div className="content-stretch flex flex-[1_0_0] items-center min-h-px min-w-px relative">
      <div className="content-stretch flex flex-[1_0_0] items-center min-h-px min-w-px relative" data-name="Entry">
        <p className="flex-[1_0_0] font-['Actor:Regular',sans-serif] leading-[1.2] min-h-px min-w-px not-italic overflow-hidden relative text-[#9ea3a9] text-[14px] text-ellipsis whitespace-nowrap">Zip/Postal Code</p>
      </div>
    </div>
  );
}

function Frame63() {
  return (
    <div className="bg-white flex-[1_0_0] min-h-[40px] min-w-px relative rounded-[4px]">
      <div aria-hidden="true" className="absolute border border-[#9ea2a8] border-solid inset-0 pointer-events-none rounded-[4px]" />
      <div className="flex flex-row items-center justify-end min-h-[inherit] size-full">
        <div className="content-stretch flex gap-[12px] items-center justify-end min-h-[inherit] pb-[11px] pt-[10px] px-[12px] relative w-full">
          <Frame64 />
        </div>
      </div>
    </div>
  );
}

function Frame62() {
  return (
    <div className="content-stretch flex flex-[1_0_0] gap-[4px] items-center min-h-px min-w-px relative">
      <Frame63 />
    </div>
  );
}

function Frame61() {
  return (
    <div className="content-stretch flex items-center relative shrink-0 w-full">
      <Frame62 />
    </div>
  );
}

function Frame60() {
  return (
    <div className="content-stretch flex flex-col gap-[4px] items-start justify-center relative shrink-0 w-full">
      <Frame61 />
    </div>
  );
}

function Frame1() {
  return (
    <div className="content-stretch flex gap-[12px] items-center relative shrink-0 w-full">
      <div className="content-stretch flex flex-[1_0_0] flex-col gap-[4px] items-start min-h-px min-w-px relative" data-name="Input-Select">
        <Frame55 />
      </div>
      <div className="content-stretch flex flex-[1_0_0] flex-col gap-[4px] items-start min-h-px min-w-px relative" data-name="Input-Select">
        <Frame60 />
      </div>
    </div>
  );
}

function Frame() {
  return (
    <div className="content-stretch flex flex-col gap-[12px] items-center relative shrink-0 w-full">
      <InputSelect3 />
      <div className="content-stretch flex flex-col gap-[4px] items-start relative shrink-0 w-full" data-name="Input-Select">
        <Frame40 />
      </div>
      <div className="content-stretch flex flex-col gap-[4px] items-start relative shrink-0 w-full" data-name="Input-Select">
        <Frame45 />
      </div>
      <div className="content-stretch flex flex-col gap-[4px] items-start relative shrink-0 w-full" data-name="Input-Select">
        <Frame50 />
      </div>
      <Frame1 />
    </div>
  );
}

function Container5() {
  return (
    <div className="relative shrink-0 w-full" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col gap-[16px] items-start relative w-full">
        <div className="content-stretch flex flex-col gap-[4px] items-start relative shrink-0 w-full" data-name="Input-Select">
          <Frame17 />
          <Frame12 />
        </div>
        <div className="content-stretch flex flex-col gap-[4px] items-start relative shrink-0 w-full" data-name="Input-Select">
          <Frame18 />
          <Frame15 />
        </div>
        <InputSelect />
        <InputSelect1 />
        <InputSelect2 />
        <Frame />
      </div>
    </div>
  );
}

function Container() {
  return (
    <div className="bg-white relative rounded-[4px] shrink-0 w-[600px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col gap-[24px] items-start overflow-clip pb-[24px] pt-[8.993px] px-[24px] relative rounded-[inherit] w-full">
        <Container1 />
        <Container5 />
      </div>
    </div>
  );
}

function Text() {
  return (
    <div className="h-[20px] relative shrink-0 w-[45.92px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="-translate-x-1/2 absolute font-['Inter:Regular',sans-serif] font-normal leading-[20px] left-[23px] not-italic text-[#616d79] text-[14px] text-center top-[0.11px] whitespace-nowrap">Cancel</p>
      </div>
    </div>
  );
}

function Button1() {
  return (
    <div className="bg-[#f2f3f4] h-[35.99px] relative rounded-[4px] shrink-0 w-[80.122px]" data-name="Button">
      <div aria-hidden="true" className="absolute border-[#c3c7cc] border-[1.111px] border-solid inset-0 pointer-events-none rounded-[4px]" />
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center px-[17.101px] py-[1.111px] relative size-full">
        <Text />
      </div>
    </div>
  );
}

function Text1() {
  return (
    <div className="h-[20px] relative shrink-0 w-[43.073px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="-translate-x-1/2 absolute font-['Inter:Regular',sans-serif] font-normal leading-[20px] left-[22px] not-italic text-[14px] text-center text-white top-[0.11px] whitespace-nowrap">Import</p>
      </div>
    </div>
  );
}

function Button2() {
  return (
    <div className="bg-[#ffbd9c] h-[35.99px] relative rounded-[4px] shrink-0 w-[75.052px]" data-name="Button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center px-[15.99px] relative size-full">
        <Text1 />
      </div>
    </div>
  );
}

function Container6() {
  return (
    <div className="bg-white h-[71.997px] relative shrink-0 w-[600px]" data-name="Container">
      <div aria-hidden="true" className="absolute border-[#c3c7cc] border-solid border-t-[1.111px] inset-0 pointer-events-none" />
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[15.99px] items-center justify-end pr-[23.993px] pt-[1.111px] relative size-full">
        <Button1 />
        <Button2 />
      </div>
    </div>
  );
}

export default function ImportCsvModal() {
  return (
    <div className="bg-[#f5f5f5] content-stretch flex flex-col items-start overflow-clip relative rounded-[8px] shadow-[20px_20px_25px_-5px_rgba(0,0,0,0.1),8px_8px_10px_-6px_rgba(0,0,0,0.1)] size-full" data-name="ImportCSVModal">
      <Container />
      <Container6 />
    </div>
  );
}