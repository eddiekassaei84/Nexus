import svgPaths from "./svg-c8h3p7askd";
import imgAvatar from "figma:asset/5d8ef005878d70532e56964fc87a73ec8e9a828c.png";
import { imgGroup } from "./svg-sgdsg";

function Heading() {
  return (
    <div className="h-[31.997px] relative shrink-0 w-[109.774px]" data-name="Heading 1">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[32px] left-0 not-italic text-[#1d2c38] text-[24px] top-[-0.89px] whitespace-nowrap">Members</p>
      </div>
    </div>
  );
}

function Container() {
  return (
    <div className="bg-white content-stretch flex flex-col h-[72px] items-start justify-center pb-[1.111px] pl-[23.993px] relative shrink-0 w-[1114px]" data-name="Container">
      <div aria-hidden="true" className="absolute border-[#d9d9d9] border-b-[1.111px] border-solid inset-0 pointer-events-none" />
      <Heading />
    </div>
  );
}

function TextInput() {
  return (
    <div className="absolute bg-white h-[35.99px] left-0 rounded-[4px] top-0 w-[275.99px]" data-name="Text Input">
      <div className="content-stretch flex items-center overflow-clip pl-[34px] pr-[10px] relative rounded-[inherit] size-full">
        <p className="font-['Open_Sans:Regular',sans-serif] font-normal leading-[normal] relative shrink-0 text-[14px] text-[rgba(52,64,84,0.5)] whitespace-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
          Search users…
        </p>
      </div>
      <div aria-hidden="true" className="absolute border-[#d0d5dd] border-[1.111px] border-solid inset-0 pointer-events-none rounded-[4px]" />
    </div>
  );
}

function SearchIcon() {
  return (
    <div className="flex-[1_0_0] h-[15.99px] min-h-px min-w-px relative" data-name="SearchIcon">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid overflow-clip relative rounded-[inherit] size-full">
        <div className="absolute bottom-1/4 left-[10%] right-1/4 top-[10%]" data-name="Vector">
          <div className="absolute inset-[-5.77%]">
            <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 11.5992 11.5924">
              <path d={svgPaths.pda9fb80} id="Vector" stroke="var(--stroke-0, #9CA4AE)" strokeWidth="1.19922" />
            </svg>
          </div>
        </div>
        <div className="absolute inset-[67.5%_10%_10%_67.5%]" data-name="Vector">
          <div className="absolute inset-[-16.67%_-16.66%]">
            <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 4.79922 4.79688">
              <path d={svgPaths.p26ac7040} id="Vector" stroke="var(--stroke-0, #9CA4AE)" strokeLinecap="round" strokeWidth="1.19922" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}

function Text() {
  return (
    <div className="absolute content-stretch flex items-center left-[10px] size-[16px] top-[9.99px]" data-name="Text">
      <SearchIcon />
    </div>
  );
}

function Container4() {
  return (
    <div className="absolute h-[35.99px] left-0 top-0 w-[275.99px]" data-name="Container">
      <TextInput />
      <Text />
    </div>
  );
}

function Icon() {
  return (
    <div className="relative shrink-0 size-[17.986px]" data-name="Icon">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 17.9861 17.9861">
        <g clipPath="url(#clip0_2151_5547)" id="Icon">
          <path d={svgPaths.pb6c9c00} id="Vector" stroke="var(--stroke-0, #616D79)" strokeLinejoin="round" strokeWidth="1.25485" />
        </g>
        <defs>
          <clipPath id="clip0_2151_5547">
            <rect fill="white" height="17.9861" width="17.9861" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Text1() {
  return (
    <div className="h-[20.99px] relative shrink-0 w-[32.882px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start relative size-full">
        <p className="font-['Open_Sans:Regular',sans-serif] font-normal leading-[21px] relative shrink-0 text-[#616d79] text-[14px] text-center whitespace-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
          Filter
        </p>
      </div>
    </div>
  );
}

function Button() {
  return (
    <div className="absolute bg-[#f2f3f4] content-stretch flex gap-[3.993px] h-[35.99px] items-center left-[283.98px] pl-[17.101px] pr-[1.111px] py-[1.111px] rounded-[4px] top-0 w-[89.063px]" data-name="Button">
      <div aria-hidden="true" className="absolute border-[#c3c7cc] border-[1.111px] border-solid inset-0 pointer-events-none rounded-[4px]" />
      <Icon />
      <Text1 />
    </div>
  );
}

function Container3() {
  return (
    <div className="h-[35.99px] relative shrink-0 w-[373.038px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <Container4 />
        <Button />
      </div>
    </div>
  );
}

function Text2() {
  return (
    <div className="absolute content-stretch flex h-[20px] items-start left-[33.98px] top-[7.99px] w-[179.427px]" data-name="Text">
      <p className="decoration-solid font-['Open_Sans:Regular',sans-serif] font-normal leading-[20px] relative shrink-0 text-[#1890ff] text-[14px] text-center underline whitespace-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
        Download Import Template
      </p>
    </div>
  );
}

function Icon1() {
  return (
    <div className="h-[20px] overflow-clip relative shrink-0 w-full" data-name="Icon">
      <div className="absolute inset-[4.55%_4.76%_4.55%_57.14%]" data-name="Vector">
        <div className="absolute inset-[-5.12%_-12.21%_-5.12%_0]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 8.54954 20.0428">
            <path d={svgPaths.p39a44930} id="Vector" stroke="var(--stroke-0, #1890FF)" strokeLinejoin="round" strokeWidth="1.86097" />
          </svg>
        </div>
      </div>
      <div className="absolute bottom-1/2 left-0 right-[23.81%] top-1/2" data-name="Vector">
        <div className="absolute inset-[-0.93px_0]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 15.2381 1.86097">
            <path d="M0 0.930484H15.2381" id="Vector" stroke="var(--stroke-0, #1890FF)" strokeWidth="1.86097" />
          </svg>
        </div>
      </div>
      <div className="absolute inset-[31.82%_23.81%_31.82%_57.14%]" data-name="Vector">
        <div className="absolute inset-[-9.25%_-35.37%_-9.25%_-16.87%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 5.7996 8.61887">
            <path d={svgPaths.p258113c0} id="Vector" stroke="var(--stroke-0, #1890FF)" strokeWidth="1.86097" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function Container8() {
  return (
    <div className="relative size-[20px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative size-full">
        <Icon1 />
      </div>
    </div>
  );
}

function Container7() {
  return (
    <div className="content-stretch flex h-[15px] items-center justify-center px-[-2.5px] relative shrink-0 w-full" data-name="Container">
      <div className="flex items-center justify-center relative shrink-0 size-[20px]" style={{ "--transform-inner-width": "1183", "--transform-inner-height": "67" } as React.CSSProperties}>
        <div className="flex-none rotate-90">
          <Container8 />
        </div>
      </div>
    </div>
  );
}

function Container6() {
  return (
    <div className="absolute content-stretch flex flex-col items-start left-[12px] overflow-clip pt-[1.493px] px-[1.493px] size-[17.986px] top-[8.99px]" data-name="Container">
      <Container7 />
    </div>
  );
}

function DownloadTemplateButton() {
  return (
    <div className="absolute h-[35.99px] left-0 rounded-[4px] top-0 w-[225.399px]" data-name="DownloadTemplateButton">
      <Text2 />
      <Container6 />
    </div>
  );
}

function PlusIcon() {
  return (
    <div className="relative shrink-0 size-[11.997px]" data-name="PlusIcon">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 11.9965 11.9965">
        <g clipPath="url(#clip0_2151_5501)" id="PlusIcon">
          <path d={svgPaths.p33437200} fill="var(--fill-0, white)" id="Vector" />
        </g>
        <defs>
          <clipPath id="clip0_2151_5501">
            <rect fill="white" height="11.9965" width="11.9965" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Text3() {
  return (
    <div className="flex-[1_0_0] h-[20px] min-h-px min-w-px relative" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start relative size-full">
        <p className="font-['Open_Sans:Regular',sans-serif] font-normal leading-[20px] relative shrink-0 text-[14px] text-center text-white whitespace-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
          Add User
        </p>
      </div>
    </div>
  );
}

function Button1() {
  return (
    <div className="absolute bg-[#ff4d00] content-stretch flex gap-[3.993px] h-[35.99px] items-center left-[502.9px] px-[15.99px] rounded-[4px] top-0 w-[108.056px]" data-name="Button">
      <PlusIcon />
      <Text3 />
    </div>
  );
}

function ImportIcon() {
  return (
    <div className="relative shrink-0 size-[17.986px]" data-name="ImportIcon">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 17.9861 17.9861">
        <g clipPath="url(#clip0_2151_5518)" id="ImportIcon">
          <path d={svgPaths.p34b7ff00} id="Vector" stroke="var(--stroke-0, #616D79)" strokeLinecap="square" strokeLinejoin="round" strokeWidth="1.25485" />
          <path d={svgPaths.p63f1700} id="Vector_2" stroke="var(--stroke-0, #616D79)" strokeWidth="1.25485" />
          <path d={svgPaths.p1aa62f00} id="Vector_3" stroke="var(--stroke-0, #616D79)" strokeWidth="1.25485" />
        </g>
        <defs>
          <clipPath id="clip0_2151_5518">
            <rect fill="white" height="17.9861" width="17.9861" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Text4() {
  return (
    <div className="h-[20px] relative shrink-0 w-[44.583px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start relative size-full">
        <p className="font-['Open_Sans:Regular',sans-serif] font-normal leading-[20px] relative shrink-0 text-[#616d79] text-[14px] text-center whitespace-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
          Import
        </p>
      </div>
    </div>
  );
}

function Button2() {
  return (
    <div className="absolute bg-[#f2f3f4] content-stretch flex gap-[3.993px] h-[35.99px] items-center left-0 pl-[13.108px] py-[1.111px] rounded-bl-[4px] rounded-tl-[4px] top-0 w-[91.667px]" data-name="Button">
      <div aria-hidden="true" className="absolute border-[#c3c7cc] border-b-[1.111px] border-l-[1.111px] border-solid border-t-[1.111px] inset-0 pointer-events-none rounded-bl-[4px] rounded-tl-[4px]" />
      <ImportIcon />
      <Text4 />
    </div>
  );
}

function ChevronDown() {
  return (
    <div className="relative shrink-0 size-[8.993px]" data-name="ChevronDown">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 8.99306 8.99306">
        <g clipPath="url(#clip0_2151_5477)" id="ChevronDown">
          <path d={svgPaths.p252b1e68} id="Vector" stroke="var(--stroke-0, #616D79)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.49884" />
        </g>
        <defs>
          <clipPath id="clip0_2151_5477">
            <rect fill="white" height="8.99306" width="8.99306" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Button3() {
  return (
    <div className="absolute bg-[#f2f3f4] content-stretch flex items-center justify-center left-[91.67px] pl-[13.49px] pr-[13.507px] py-[1.111px] rounded-br-[4px] rounded-tr-[4px] size-[35.99px] top-0" data-name="Button">
      <div aria-hidden="true" className="absolute border-[#c3c7cc] border-[1.111px] border-solid inset-0 pointer-events-none rounded-br-[4px] rounded-tr-[4px]" />
      <ChevronDown />
    </div>
  );
}

function ImportSplitButton() {
  return (
    <div className="absolute h-[35.99px] left-[233.39px] top-0 w-[127.656px]" data-name="ImportSplitButton">
      <Button2 />
      <Button3 />
    </div>
  );
}

function ExportIcon() {
  return (
    <div className="relative shrink-0 size-[17.986px]" data-name="ExportIcon">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 17.9861 17.9861">
        <g clipPath="url(#clip0_2151_5469)" id="ExportIcon">
          <path d={svgPaths.p2b416c00} id="Vector" stroke="var(--stroke-0, #616D79)" strokeLinecap="square" strokeLinejoin="round" strokeWidth="1.23697" />
          <path d={svgPaths.p1e788800} id="Vector_2" stroke="var(--stroke-0, #616D79)" strokeWidth="1.23697" />
          <path d={svgPaths.p184f7a00} id="Vector_3" stroke="var(--stroke-0, #616D79)" strokeWidth="1.23697" />
        </g>
        <defs>
          <clipPath id="clip0_2151_5469">
            <rect fill="white" height="17.9861" width="17.9861" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Text5() {
  return (
    <div className="h-[20px] relative shrink-0 w-[42.813px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start relative size-full">
        <p className="font-['Open_Sans:Regular',sans-serif] font-normal leading-[20px] relative shrink-0 text-[#616d79] text-[14px] text-center whitespace-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
          Export
        </p>
      </div>
    </div>
  );
}

function Button4() {
  return (
    <div className="bg-[#f2f3f4] h-[35.99px] relative rounded-bl-[4px] rounded-tl-[4px] shrink-0 w-[89.896px]" data-name="Button">
      <div aria-hidden="true" className="absolute border-[#c3c7cc] border-b-[1.111px] border-l-[1.111px] border-solid border-t-[1.111px] inset-0 pointer-events-none rounded-bl-[4px] rounded-tl-[4px]" />
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[3.993px] items-center pl-[13.108px] py-[1.111px] relative size-full">
        <ExportIcon />
        <Text5 />
      </div>
    </div>
  );
}

function ChevronDown1() {
  return (
    <div className="relative shrink-0 size-[8.993px]" data-name="ChevronDown">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 8.99306 8.99306">
        <g clipPath="url(#clip0_2151_5477)" id="ChevronDown">
          <path d={svgPaths.p252b1e68} id="Vector" stroke="var(--stroke-0, #616D79)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.49884" />
        </g>
        <defs>
          <clipPath id="clip0_2151_5477">
            <rect fill="white" height="8.99306" width="8.99306" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Button5() {
  return (
    <div className="bg-[#f2f3f4] relative rounded-br-[4px] rounded-tr-[4px] shrink-0 size-[35.99px]" data-name="Button">
      <div aria-hidden="true" className="absolute border-[#c3c7cc] border-[1.111px] border-solid inset-0 pointer-events-none rounded-br-[4px] rounded-tr-[4px]" />
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center pl-[13.49px] pr-[13.507px] py-[1.111px] relative size-full">
        <ChevronDown1 />
      </div>
    </div>
  );
}

function ExportSplitButton() {
  return (
    <div className="absolute content-stretch flex h-[35.99px] items-start left-[369.03px] top-0 w-[125.885px]" data-name="ExportSplitButton">
      <Button4 />
      <Button5 />
    </div>
  );
}

function Container5() {
  return (
    <div className="h-[35.99px] relative shrink-0 w-[610.955px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <DownloadTemplateButton />
        <Button1 />
        <ImportSplitButton />
        <ExportSplitButton />
      </div>
    </div>
  );
}

function Toolbar() {
  return (
    <div className="absolute bg-[#fafafa] content-stretch flex h-[50px] items-center justify-between left-[1.11px] pb-[1.111px] px-[11.997px] top-[1.11px] w-[1088.229px]" data-name="Toolbar">
      <div aria-hidden="true" className="absolute border-[#f0f0f0] border-b-[1.111px] border-solid inset-0 pointer-events-none" />
      <Container3 />
      <Container5 />
    </div>
  );
}

function ChevronTiny() {
  return (
    <div className="relative size-[10px]" data-name="ChevronTiny">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 10 10">
        <g id="ChevronTiny">
          <path d="M3 2L7 5L3 8" id="Vector" stroke="var(--stroke-0, #4D7CFE)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
        </g>
      </svg>
    </div>
  );
}

function Text6() {
  return (
    <div className="absolute content-stretch flex h-[17.986px] items-start left-[27px] top-0 w-[58.108px]" data-name="Text">
      <p className="font-['Open_Sans:SemiBold',sans-serif] font-semibold leading-[18px] relative shrink-0 text-[#1e3a8a] text-[12px] whitespace-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
        Company:
      </p>
    </div>
  );
}

function Text7() {
  return (
    <div className="absolute content-stretch flex h-[17.986px] items-start left-[90.1px] overflow-clip top-0 w-[97.205px]" data-name="Text">
      <p className="font-['Open_Sans:Regular',sans-serif] font-normal leading-[18px] relative shrink-0 text-[#1e3a8a] text-[12px] whitespace-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
        Apex Engineering
      </p>
    </div>
  );
}

function Text8() {
  return (
    <div className="absolute content-stretch flex h-[16.51px] items-start left-[195.3px] top-[0.73px] w-[12.778px]" data-name="Text">
      <p className="font-['Open_Sans:Regular',sans-serif] font-normal leading-[16.5px] relative shrink-0 text-[#6b7280] text-[11px] whitespace-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
        (4)
      </p>
    </div>
  );
}

function Container10() {
  return (
    <div className="flex-[1_0_0] h-[17.986px] min-h-px min-w-px relative" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid overflow-clip relative rounded-[inherit] size-full">
        <div className="absolute flex items-center justify-center left-[12px] size-[10px] top-[3.99px]" style={{ "--transform-inner-width": "1183", "--transform-inner-height": "22" } as React.CSSProperties}>
          <div className="flex-none rotate-90">
            <ChevronTiny />
          </div>
        </div>
        <Text6 />
        <Text7 />
        <Text8 />
      </div>
    </div>
  );
}

function GroupHeaderRow() {
  return (
    <div className="absolute bg-[#ebf0ff] content-stretch flex h-[31.997px] items-center left-0 pb-[1.111px] pl-[3.333px] pr-[60px] top-[47.99px] w-[1077.118px]" data-name="GroupHeaderRow">
      <div aria-hidden="true" className="absolute border-[#4d7cfe] border-b-[1.111px] border-l-[3.333px] border-solid inset-0 pointer-events-none" />
      <Container10 />
    </div>
  );
}

function Icon2() {
  return (
    <div className="relative shrink-0 size-[17.986px]" data-name="Icon">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 17.9861 17.9861">
        <g clipPath="url(#clip0_2151_5513)" id="Icon">
          <path d={svgPaths.p154304c0} fill="var(--fill-0, #0E70CB)" id="Vector" />
        </g>
        <defs>
          <clipPath id="clip0_2151_5513">
            <rect fill="white" height="17.9861" width="17.9861" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function TableCheckbox() {
  return (
    <div className="relative rounded-[4px] shrink-0 size-[31.997px]" data-name="TableCheckbox">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center pl-[6.997px] pr-[7.014px] relative size-full">
        <Icon2 />
      </div>
    </div>
  );
}

function Container11() {
  return (
    <div className="h-[46.875px] relative shrink-0 w-[47.986px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center pl-[7.986px] pr-[8.004px] relative size-full">
        <TableCheckbox />
      </div>
    </div>
  );
}

function Text9() {
  return (
    <div className="h-[16.51px] relative shrink-0 w-[18.194px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start relative size-full">
        <p className="font-['Open_Sans:SemiBold',sans-serif] font-semibold leading-[16.5px] relative shrink-0 text-[11px] text-white whitespace-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
          DM
        </p>
      </div>
    </div>
  );
}

function Avatar() {
  return (
    <div className="bg-[#9b59b6] relative rounded-[37282700px] shrink-0 size-[30px]" data-name="Avatar">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center overflow-clip px-[5.903px] relative rounded-[inherit] size-full">
        <Text9 />
      </div>
    </div>
  );
}

function Text10() {
  return (
    <div className="h-[19.497px] relative shrink-0 w-[82.031px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start overflow-clip relative rounded-[inherit] size-full">
        <p className="font-['Open_Sans:Regular',sans-serif] font-normal leading-[19.5px] relative shrink-0 text-[#1d2939] text-[13px] whitespace-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
          Devon Marsh
        </p>
      </div>
    </div>
  );
}

function Container12() {
  return (
    <div className="flex-[1_0_0] h-[46.875px] min-h-px min-w-px relative" data-name="Container">
      <div className="flex flex-row items-center overflow-clip rounded-[inherit] size-full">
        <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[7.986px] items-center pl-[5.99px] relative size-full">
          <Avatar />
          <Text10 />
        </div>
      </div>
    </div>
  );
}

function Text11() {
  return (
    <div className="h-[19.497px] relative shrink-0 w-[80.694px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start overflow-clip relative rounded-[inherit] size-full">
        <p className="font-['Open_Sans:Regular',sans-serif] font-normal leading-[19.5px] relative shrink-0 text-[#262626] text-[13px] whitespace-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
          Civil Engineer
        </p>
      </div>
    </div>
  );
}

function Container13() {
  return (
    <div className="flex-[1_0_0] h-[46.875px] min-h-px min-w-px relative" data-name="Container">
      <div className="flex flex-row items-center overflow-clip rounded-[inherit] size-full">
        <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center pl-[16.997px] relative size-full">
          <Text11 />
        </div>
      </div>
    </div>
  );
}

function Text12() {
  return (
    <div className="h-[19.497px] relative shrink-0 w-[80.712px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start overflow-clip relative rounded-[inherit] size-full">
        <p className="font-['Open_Sans:Regular',sans-serif] font-normal leading-[19.5px] relative shrink-0 text-[#262626] text-[13px] whitespace-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
          dmarsh@apexeng.com
        </p>
      </div>
    </div>
  );
}

function Container14() {
  return (
    <div className="flex-[1_0_0] h-[46.875px] min-h-px min-w-px relative" data-name="Container">
      <div className="flex flex-row items-center overflow-clip rounded-[inherit] size-full">
        <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center pl-[16.997px] relative size-full">
          <Text12 />
        </div>
      </div>
    </div>
  );
}

function Text13() {
  return (
    <div className="h-[19.497px] relative shrink-0 w-[80.694px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start overflow-clip relative rounded-[inherit] size-full">
        <p className="font-['Open_Sans:Regular',sans-serif] font-normal leading-[19.5px] relative shrink-0 text-[#262626] text-[13px] whitespace-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
          Apex Engineering
        </p>
      </div>
    </div>
  );
}

function Container15() {
  return (
    <div className="flex-[1_0_0] h-[46.875px] min-h-px min-w-px relative" data-name="Container">
      <div className="flex flex-row items-center overflow-clip rounded-[inherit] size-full">
        <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center pl-[16.997px] relative size-full">
          <Text13 />
        </div>
      </div>
    </div>
  );
}

function Text14() {
  return (
    <div className="h-[19.497px] relative shrink-0 w-[38.281px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start overflow-clip relative rounded-[inherit] size-full">
        <p className="font-['Open_Sans:Regular',sans-serif] font-normal leading-[19.5px] relative shrink-0 text-[#262626] text-[13px] whitespace-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
          Austin
        </p>
      </div>
    </div>
  );
}

function Container16() {
  return (
    <div className="flex-[1_0_0] h-[46.875px] min-h-px min-w-px relative" data-name="Container">
      <div className="flex flex-row items-center overflow-clip rounded-[inherit] size-full">
        <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center pl-[16.997px] relative size-full">
          <Text14 />
        </div>
      </div>
    </div>
  );
}

function Text15() {
  return (
    <div className="h-[19.497px] relative shrink-0 w-[81.337px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start overflow-clip relative rounded-[inherit] size-full">
        <p className="font-['Open_Sans:Regular',sans-serif] font-normal leading-[19.5px] relative shrink-0 text-[#262626] text-[13px] whitespace-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
          Civil Engineer
        </p>
      </div>
    </div>
  );
}

function Container17() {
  return (
    <div className="flex-[1_0_0] h-[46.875px] min-h-px min-w-px relative" data-name="Container">
      <div className="flex flex-row items-center overflow-clip rounded-[inherit] size-full">
        <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center pl-[16.997px] relative size-full">
          <Text15 />
        </div>
      </div>
    </div>
  );
}

function Text16() {
  return (
    <div className="h-[19.497px] relative shrink-0 w-[80.694px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start overflow-clip relative rounded-[inherit] size-full">
        <p className="font-['Open_Sans:Regular',sans-serif] font-normal leading-[19.5px] relative shrink-0 text-[#262626] text-[13px] whitespace-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
          Project Admin
        </p>
      </div>
    </div>
  );
}

function Container18() {
  return (
    <div className="flex-[1_0_0] h-[46.875px] min-h-px min-w-px relative" data-name="Container">
      <div className="flex flex-row items-center overflow-clip rounded-[inherit] size-full">
        <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center pl-[16.996px] relative size-full">
          <Text16 />
        </div>
      </div>
    </div>
  );
}

function Text17() {
  return <div className="absolute bg-[#12b76a] left-[7px] rounded-[37282700px] size-[5px] top-[7.74px]" data-name="Text" />;
}

function StatusBadge() {
  return (
    <div className="bg-[#ecfdf3] h-[20.503px] relative rounded-[37282700px] shrink-0 w-[55.451px]" data-name="StatusBadge">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <Text17 />
        <p className="-translate-x-1/2 absolute font-['Open_Sans:Regular',sans-serif] font-normal leading-[16.5px] left-[33.5px] text-[#027a48] text-[11px] text-center top-px whitespace-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
          Active
        </p>
      </div>
    </div>
  );
}

function Container19() {
  return (
    <div className="flex-[1_0_0] h-[46.875px] min-h-px min-w-px relative" data-name="Container">
      <div className="flex flex-row items-center overflow-clip rounded-[inherit] size-full">
        <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center pl-[16.997px] relative size-full">
          <StatusBadge />
        </div>
      </div>
    </div>
  );
}

function UserRow() {
  return (
    <div className="absolute bg-white content-stretch flex h-[47.986px] items-start left-0 pb-[1.111px] pr-[60px] top-[79.98px] w-[1077.118px]" data-name="UserRow2">
      <div aria-hidden="true" className="absolute border-[#f0f0f0] border-b-[1.111px] border-solid inset-0 pointer-events-none" />
      <Container11 />
      <Container12 />
      <Container13 />
      <Container14 />
      <Container15 />
      <Container16 />
      <Container17 />
      <Container18 />
      <Container19 />
    </div>
  );
}

function Icon3() {
  return (
    <div className="relative shrink-0 size-[17.986px]" data-name="Icon">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 17.9861 17.9861">
        <g clipPath="url(#clip0_2151_5513)" id="Icon">
          <path d={svgPaths.p154304c0} fill="var(--fill-0, #0E70CB)" id="Vector" />
        </g>
        <defs>
          <clipPath id="clip0_2151_5513">
            <rect fill="white" height="17.9861" width="17.9861" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function TableCheckbox1() {
  return (
    <div className="relative rounded-[4px] shrink-0 size-[31.997px]" data-name="TableCheckbox">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center pl-[6.997px] pr-[7.014px] relative size-full">
        <Icon3 />
      </div>
    </div>
  );
}

function Container20() {
  return (
    <div className="h-[46.875px] relative shrink-0 w-[47.986px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center pl-[7.986px] pr-[8.004px] relative size-full">
        <TableCheckbox1 />
      </div>
    </div>
  );
}

function Text18() {
  return (
    <div className="h-[16.51px] relative shrink-0 w-[12.726px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start relative size-full">
        <p className="font-['Open_Sans:SemiBold',sans-serif] font-semibold leading-[16.5px] relative shrink-0 text-[11px] text-white whitespace-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
          YT
        </p>
      </div>
    </div>
  );
}

function Avatar1() {
  return (
    <div className="bg-[#e67e22] relative rounded-[37282700px] shrink-0 size-[30px]" data-name="Avatar">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center overflow-clip pl-[8.628px] pr-[8.646px] relative rounded-[inherit] size-full">
        <Text18 />
      </div>
    </div>
  );
}

function Text19() {
  return (
    <div className="h-[19.497px] relative shrink-0 w-[74.236px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start overflow-clip relative rounded-[inherit] size-full">
        <p className="font-['Open_Sans:Regular',sans-serif] font-normal leading-[19.5px] relative shrink-0 text-[#1d2939] text-[13px] whitespace-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
          Yuki Tanaka
        </p>
      </div>
    </div>
  );
}

function Container21() {
  return (
    <div className="flex-[1_0_0] h-[46.875px] min-h-px min-w-px relative" data-name="Container">
      <div className="flex flex-row items-center overflow-clip rounded-[inherit] size-full">
        <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[7.986px] items-center pl-[5.99px] relative size-full">
          <Avatar1 />
          <Text19 />
        </div>
      </div>
    </div>
  );
}

function Text20() {
  return (
    <div className="h-[19.497px] relative shrink-0 w-[80.694px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start overflow-clip relative rounded-[inherit] size-full">
        <p className="font-['Open_Sans:Regular',sans-serif] font-normal leading-[19.5px] relative shrink-0 text-[#262626] text-[13px] whitespace-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
          Geotech Specialist
        </p>
      </div>
    </div>
  );
}

function Container22() {
  return (
    <div className="flex-[1_0_0] h-[46.875px] min-h-px min-w-px relative" data-name="Container">
      <div className="flex flex-row items-center overflow-clip rounded-[inherit] size-full">
        <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center pl-[16.997px] relative size-full">
          <Text20 />
        </div>
      </div>
    </div>
  );
}

function Text21() {
  return (
    <div className="h-[19.497px] relative shrink-0 w-[80.712px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start overflow-clip relative rounded-[inherit] size-full">
        <p className="font-['Open_Sans:Regular',sans-serif] font-normal leading-[19.5px] relative shrink-0 text-[#262626] text-[13px] whitespace-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
          ytanaka@apexeng.com
        </p>
      </div>
    </div>
  );
}

function Container23() {
  return (
    <div className="flex-[1_0_0] h-[46.875px] min-h-px min-w-px relative" data-name="Container">
      <div className="flex flex-row items-center overflow-clip rounded-[inherit] size-full">
        <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center pl-[16.997px] relative size-full">
          <Text21 />
        </div>
      </div>
    </div>
  );
}

function Text22() {
  return (
    <div className="h-[19.497px] relative shrink-0 w-[80.694px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start overflow-clip relative rounded-[inherit] size-full">
        <p className="font-['Open_Sans:Regular',sans-serif] font-normal leading-[19.5px] relative shrink-0 text-[#262626] text-[13px] whitespace-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
          Apex Engineering
        </p>
      </div>
    </div>
  );
}

function Container24() {
  return (
    <div className="flex-[1_0_0] h-[46.875px] min-h-px min-w-px relative" data-name="Container">
      <div className="flex flex-row items-center overflow-clip rounded-[inherit] size-full">
        <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center pl-[16.997px] relative size-full">
          <Text22 />
        </div>
      </div>
    </div>
  );
}

function Text23() {
  return (
    <div className="h-[19.497px] relative shrink-0 w-[47.778px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start overflow-clip relative rounded-[inherit] size-full">
        <p className="font-['Open_Sans:Regular',sans-serif] font-normal leading-[19.5px] relative shrink-0 text-[#262626] text-[13px] whitespace-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
          Chicago
        </p>
      </div>
    </div>
  );
}

function Container25() {
  return (
    <div className="flex-[1_0_0] h-[46.875px] min-h-px min-w-px relative" data-name="Container">
      <div className="flex flex-row items-center overflow-clip rounded-[inherit] size-full">
        <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center pl-[16.997px] relative size-full">
          <Text23 />
        </div>
      </div>
    </div>
  );
}

function Text24() {
  return (
    <div className="h-[19.497px] relative shrink-0 w-[84.01px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start overflow-clip relative rounded-[inherit] size-full">
        <p className="font-['Open_Sans:Regular',sans-serif] font-normal leading-[19.5px] relative shrink-0 text-[#262626] text-[13px] whitespace-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
          Field Engineer
        </p>
      </div>
    </div>
  );
}

function Container26() {
  return (
    <div className="flex-[1_0_0] h-[46.875px] min-h-px min-w-px relative" data-name="Container">
      <div className="flex flex-row items-center overflow-clip rounded-[inherit] size-full">
        <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center pl-[16.997px] relative size-full">
          <Text24 />
        </div>
      </div>
    </div>
  );
}

function Text25() {
  return (
    <div className="h-[19.497px] relative shrink-0 w-[80.694px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start overflow-clip relative rounded-[inherit] size-full">
        <p className="font-['Open_Sans:Regular',sans-serif] font-normal leading-[19.5px] relative shrink-0 text-[#262626] text-[13px] whitespace-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
          Project Member
        </p>
      </div>
    </div>
  );
}

function Container27() {
  return (
    <div className="flex-[1_0_0] h-[46.875px] min-h-px min-w-px relative" data-name="Container">
      <div className="flex flex-row items-center overflow-clip rounded-[inherit] size-full">
        <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center pl-[16.996px] relative size-full">
          <Text25 />
        </div>
      </div>
    </div>
  );
}

function Text26() {
  return <div className="absolute bg-[#12b76a] left-[7px] rounded-[37282700px] size-[5px] top-[7.74px]" data-name="Text" />;
}

function StatusBadge1() {
  return (
    <div className="bg-[#ecfdf3] h-[20.503px] relative rounded-[37282700px] shrink-0 w-[55.451px]" data-name="StatusBadge">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <Text26 />
        <p className="-translate-x-1/2 absolute font-['Open_Sans:Regular',sans-serif] font-normal leading-[16.5px] left-[33.5px] text-[#027a48] text-[11px] text-center top-px whitespace-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
          Active
        </p>
      </div>
    </div>
  );
}

function Container28() {
  return (
    <div className="flex-[1_0_0] h-[46.875px] min-h-px min-w-px relative" data-name="Container">
      <div className="flex flex-row items-center overflow-clip rounded-[inherit] size-full">
        <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center pl-[16.997px] relative size-full">
          <StatusBadge1 />
        </div>
      </div>
    </div>
  );
}

function UserRow1() {
  return (
    <div className="absolute bg-white content-stretch flex h-[47.986px] items-start left-0 pb-[1.111px] pr-[60px] top-[127.97px] w-[1077.118px]" data-name="UserRow2">
      <div aria-hidden="true" className="absolute border-[#f0f0f0] border-b-[1.111px] border-solid inset-0 pointer-events-none" />
      <Container20 />
      <Container21 />
      <Container22 />
      <Container23 />
      <Container24 />
      <Container25 />
      <Container26 />
      <Container27 />
      <Container28 />
    </div>
  );
}

function Icon4() {
  return (
    <div className="relative shrink-0 size-[17.986px]" data-name="Icon">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 17.9861 17.9861">
        <g clipPath="url(#clip0_2151_5507)" id="Icon">
          <path d={svgPaths.p35af8f80} fill="var(--fill-0, white)" id="Vector" />
          <path d={svgPaths.p35af8f80} id="Vector_2" stroke="var(--stroke-0, #D0D5DD)" strokeWidth="1.49884" />
        </g>
        <defs>
          <clipPath id="clip0_2151_5507">
            <rect fill="white" height="17.9861" width="17.9861" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function TableCheckbox2() {
  return (
    <div className="relative rounded-[4px] shrink-0 size-[31.997px]" data-name="TableCheckbox">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center pl-[6.997px] pr-[7.014px] relative size-full">
        <Icon4 />
      </div>
    </div>
  );
}

function Container29() {
  return (
    <div className="h-[46.875px] relative shrink-0 w-[47.986px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center pl-[7.986px] pr-[8.004px] relative size-full">
        <TableCheckbox2 />
      </div>
    </div>
  );
}

function Text27() {
  return (
    <div className="h-[16.51px] relative shrink-0 w-[13.021px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start relative size-full">
        <p className="font-['Open_Sans:SemiBold',sans-serif] font-semibold leading-[16.5px] relative shrink-0 text-[11px] text-white whitespace-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
          CS
        </p>
      </div>
    </div>
  );
}

function Avatar2() {
  return (
    <div className="bg-[#1abc9c] relative rounded-[37282700px] shrink-0 size-[30px]" data-name="Avatar">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center overflow-clip px-[8.49px] relative rounded-[inherit] size-full">
        <Text27 />
      </div>
    </div>
  );
}

function Text28() {
  return (
    <div className="h-[19.497px] relative shrink-0 w-[70.174px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start overflow-clip relative rounded-[inherit] size-full">
        <p className="font-['Open_Sans:Regular',sans-serif] font-normal leading-[19.5px] relative shrink-0 text-[#1d2939] text-[13px] whitespace-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
          Carlos Silva
        </p>
      </div>
    </div>
  );
}

function Container30() {
  return (
    <div className="flex-[1_0_0] h-[46.875px] min-h-px min-w-px relative" data-name="Container">
      <div className="flex flex-row items-center overflow-clip rounded-[inherit] size-full">
        <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[7.986px] items-center pl-[5.99px] relative size-full">
          <Avatar2 />
          <Text28 />
        </div>
      </div>
    </div>
  );
}

function Text29() {
  return (
    <div className="h-[19.497px] relative shrink-0 w-[80.694px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start overflow-clip relative rounded-[inherit] size-full">
        <p className="font-['Open_Sans:Regular',sans-serif] font-normal leading-[19.5px] relative shrink-0 text-[#262626] text-[13px] whitespace-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
          Site Inspector
        </p>
      </div>
    </div>
  );
}

function Container31() {
  return (
    <div className="flex-[1_0_0] h-[46.875px] min-h-px min-w-px relative" data-name="Container">
      <div className="flex flex-row items-center overflow-clip rounded-[inherit] size-full">
        <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center pl-[16.997px] relative size-full">
          <Text29 />
        </div>
      </div>
    </div>
  );
}

function Text30() {
  return (
    <div className="h-[19.497px] relative shrink-0 w-[80.712px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start overflow-clip relative rounded-[inherit] size-full">
        <p className="font-['Open_Sans:Regular',sans-serif] font-normal leading-[19.5px] relative shrink-0 text-[#262626] text-[13px] whitespace-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
          carlos@apexeng.com
        </p>
      </div>
    </div>
  );
}

function Container32() {
  return (
    <div className="flex-[1_0_0] h-[46.875px] min-h-px min-w-px relative" data-name="Container">
      <div className="flex flex-row items-center overflow-clip rounded-[inherit] size-full">
        <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center pl-[16.997px] relative size-full">
          <Text30 />
        </div>
      </div>
    </div>
  );
}

function Text31() {
  return (
    <div className="h-[19.497px] relative shrink-0 w-[80.694px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start overflow-clip relative rounded-[inherit] size-full">
        <p className="font-['Open_Sans:Regular',sans-serif] font-normal leading-[19.5px] relative shrink-0 text-[#262626] text-[13px] whitespace-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
          Apex Engineering
        </p>
      </div>
    </div>
  );
}

function Container33() {
  return (
    <div className="flex-[1_0_0] h-[46.875px] min-h-px min-w-px relative" data-name="Container">
      <div className="flex flex-row items-center overflow-clip rounded-[inherit] size-full">
        <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center pl-[16.997px] relative size-full">
          <Text31 />
        </div>
      </div>
    </div>
  );
}

function Text32() {
  return (
    <div className="h-[19.497px] relative shrink-0 w-[57.778px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start overflow-clip relative rounded-[inherit] size-full">
        <p className="font-['Open_Sans:Regular',sans-serif] font-normal leading-[19.5px] relative shrink-0 text-[#262626] text-[13px] whitespace-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
          New York
        </p>
      </div>
    </div>
  );
}

function Container34() {
  return (
    <div className="flex-[1_0_0] h-[46.875px] min-h-px min-w-px relative" data-name="Container">
      <div className="flex flex-row items-center overflow-clip rounded-[inherit] size-full">
        <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center pl-[16.997px] relative size-full">
          <Text32 />
        </div>
      </div>
    </div>
  );
}

function Text33() {
  return (
    <div className="h-[19.497px] relative shrink-0 w-[84.01px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start overflow-clip relative rounded-[inherit] size-full">
        <p className="font-['Open_Sans:Regular',sans-serif] font-normal leading-[19.5px] relative shrink-0 text-[#262626] text-[13px] whitespace-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
          Discipline Superintendent
        </p>
      </div>
    </div>
  );
}

function Container35() {
  return (
    <div className="flex-[1_0_0] h-[46.875px] min-h-px min-w-px relative" data-name="Container">
      <div className="flex flex-row items-center overflow-clip rounded-[inherit] size-full">
        <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center pl-[16.997px] relative size-full">
          <Text33 />
        </div>
      </div>
    </div>
  );
}

function Text34() {
  return (
    <div className="h-[19.497px] relative shrink-0 w-[80.694px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start overflow-clip relative rounded-[inherit] size-full">
        <p className="font-['Open_Sans:Regular',sans-serif] font-normal leading-[19.5px] relative shrink-0 text-[#262626] text-[13px] whitespace-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
          Project Admin
        </p>
      </div>
    </div>
  );
}

function Container36() {
  return (
    <div className="flex-[1_0_0] h-[46.875px] min-h-px min-w-px relative" data-name="Container">
      <div className="flex flex-row items-center overflow-clip rounded-[inherit] size-full">
        <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center pl-[16.996px] relative size-full">
          <Text34 />
        </div>
      </div>
    </div>
  );
}

function Text35() {
  return <div className="absolute bg-[#ef4444] left-[7px] rounded-[37282700px] size-[5px] top-[7.74px]" data-name="Text" />;
}

function StatusBadge2() {
  return (
    <div className="bg-[#fef2f2] h-[20.503px] relative rounded-[37282700px] shrink-0 w-[81.91px]" data-name="StatusBadge">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <Text35 />
        <p className="-translate-x-1/2 absolute font-['Open_Sans:Regular',sans-serif] font-normal leading-[16.5px] left-[46px] text-[#b91c1c] text-[11px] text-center top-px whitespace-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
          Suspended
        </p>
      </div>
    </div>
  );
}

function Container37() {
  return (
    <div className="flex-[1_0_0] h-[46.875px] min-h-px min-w-px relative" data-name="Container">
      <div className="flex flex-row items-center overflow-clip rounded-[inherit] size-full">
        <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center pl-[16.997px] relative size-full">
          <StatusBadge2 />
        </div>
      </div>
    </div>
  );
}

function UserRow2() {
  return (
    <div className="absolute bg-white content-stretch flex h-[47.986px] items-start left-0 pb-[1.111px] pr-[60px] top-[175.95px] w-[1077.118px]" data-name="UserRow2">
      <div aria-hidden="true" className="absolute border-[#f0f0f0] border-b-[1.111px] border-solid inset-0 pointer-events-none" />
      <Container29 />
      <Container30 />
      <Container31 />
      <Container32 />
      <Container33 />
      <Container34 />
      <Container35 />
      <Container36 />
      <Container37 />
    </div>
  );
}

function Icon5() {
  return (
    <div className="relative shrink-0 size-[17.986px]" data-name="Icon">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 17.9861 17.9861">
        <g clipPath="url(#clip0_2151_5507)" id="Icon">
          <path d={svgPaths.p35af8f80} fill="var(--fill-0, white)" id="Vector" />
          <path d={svgPaths.p35af8f80} id="Vector_2" stroke="var(--stroke-0, #D0D5DD)" strokeWidth="1.49884" />
        </g>
        <defs>
          <clipPath id="clip0_2151_5507">
            <rect fill="white" height="17.9861" width="17.9861" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function TableCheckbox3() {
  return (
    <div className="relative rounded-[4px] shrink-0 size-[31.997px]" data-name="TableCheckbox">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center pl-[6.997px] pr-[7.014px] relative size-full">
        <Icon5 />
      </div>
    </div>
  );
}

function Container38() {
  return (
    <div className="h-[46.875px] relative shrink-0 w-[47.986px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center pl-[7.986px] pr-[8.004px] relative size-full">
        <TableCheckbox3 />
      </div>
    </div>
  );
}

function Text36() {
  return (
    <div className="h-[16.51px] relative shrink-0 w-[15.417px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start relative size-full">
        <p className="font-['Open_Sans:SemiBold',sans-serif] font-semibold leading-[16.5px] relative shrink-0 text-[11px] text-white whitespace-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
          PO
        </p>
      </div>
    </div>
  );
}

function Avatar3() {
  return (
    <div className="bg-[#9b59b6] relative rounded-[37282700px] shrink-0 size-[30px]" data-name="Avatar">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center overflow-clip px-[7.292px] relative rounded-[inherit] size-full">
        <Text36 />
      </div>
    </div>
  );
}

function Text37() {
  return (
    <div className="h-[19.497px] relative shrink-0 w-[84.479px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start overflow-clip relative rounded-[inherit] size-full">
        <p className="font-['Open_Sans:Regular',sans-serif] font-normal leading-[19.5px] relative shrink-0 text-[#1d2939] text-[13px] whitespace-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
          Patrick Okoro
        </p>
      </div>
    </div>
  );
}

function Container39() {
  return (
    <div className="flex-[1_0_0] h-[46.875px] min-h-px min-w-px relative" data-name="Container">
      <div className="flex flex-row items-center overflow-clip rounded-[inherit] size-full">
        <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[7.986px] items-center pl-[5.99px] relative size-full">
          <Avatar3 />
          <Text37 />
        </div>
      </div>
    </div>
  );
}

function Text38() {
  return (
    <div className="h-[19.497px] relative shrink-0 w-[80.694px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start overflow-clip relative rounded-[inherit] size-full">
        <p className="font-['Open_Sans:Regular',sans-serif] font-normal leading-[19.5px] relative shrink-0 text-[#262626] text-[13px] whitespace-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
          Hydraulic Engineer
        </p>
      </div>
    </div>
  );
}

function Container40() {
  return (
    <div className="flex-[1_0_0] h-[46.875px] min-h-px min-w-px relative" data-name="Container">
      <div className="flex flex-row items-center overflow-clip rounded-[inherit] size-full">
        <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center pl-[16.997px] relative size-full">
          <Text38 />
        </div>
      </div>
    </div>
  );
}

function Text39() {
  return (
    <div className="h-[19.497px] relative shrink-0 w-[80.712px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start overflow-clip relative rounded-[inherit] size-full">
        <p className="font-['Open_Sans:Regular',sans-serif] font-normal leading-[19.5px] relative shrink-0 text-[#262626] text-[13px] whitespace-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
          pokoro@apexeng.com
        </p>
      </div>
    </div>
  );
}

function Container41() {
  return (
    <div className="flex-[1_0_0] h-[46.875px] min-h-px min-w-px relative" data-name="Container">
      <div className="flex flex-row items-center overflow-clip rounded-[inherit] size-full">
        <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center pl-[16.997px] relative size-full">
          <Text39 />
        </div>
      </div>
    </div>
  );
}

function Text40() {
  return (
    <div className="h-[19.497px] relative shrink-0 w-[80.694px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start overflow-clip relative rounded-[inherit] size-full">
        <p className="font-['Open_Sans:Regular',sans-serif] font-normal leading-[19.5px] relative shrink-0 text-[#262626] text-[13px] whitespace-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
          Apex Engineering
        </p>
      </div>
    </div>
  );
}

function Container42() {
  return (
    <div className="flex-[1_0_0] h-[46.875px] min-h-px min-w-px relative" data-name="Container">
      <div className="flex flex-row items-center overflow-clip rounded-[inherit] size-full">
        <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center pl-[16.997px] relative size-full">
          <Text40 />
        </div>
      </div>
    </div>
  );
}

function Text41() {
  return (
    <div className="h-[19.497px] relative shrink-0 w-[52.014px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start overflow-clip relative rounded-[inherit] size-full">
        <p className="font-['Open_Sans:Regular',sans-serif] font-normal leading-[19.5px] relative shrink-0 text-[#262626] text-[13px] whitespace-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
          Houston
        </p>
      </div>
    </div>
  );
}

function Container43() {
  return (
    <div className="flex-[1_0_0] h-[46.875px] min-h-px min-w-px relative" data-name="Container">
      <div className="flex flex-row items-center overflow-clip rounded-[inherit] size-full">
        <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center pl-[16.997px] relative size-full">
          <Text41 />
        </div>
      </div>
    </div>
  );
}

function Text42() {
  return (
    <div className="h-[19.497px] relative shrink-0 w-[81.337px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start overflow-clip relative rounded-[inherit] size-full">
        <p className="font-['Open_Sans:Regular',sans-serif] font-normal leading-[19.5px] relative shrink-0 text-[#262626] text-[13px] whitespace-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
          Civil Engineer
        </p>
      </div>
    </div>
  );
}

function Container44() {
  return (
    <div className="flex-[1_0_0] h-[46.875px] min-h-px min-w-px relative" data-name="Container">
      <div className="flex flex-row items-center overflow-clip rounded-[inherit] size-full">
        <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center pl-[16.997px] relative size-full">
          <Text42 />
        </div>
      </div>
    </div>
  );
}

function Text43() {
  return (
    <div className="h-[19.497px] relative shrink-0 w-[80.694px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start overflow-clip relative rounded-[inherit] size-full">
        <p className="font-['Open_Sans:Regular',sans-serif] font-normal leading-[19.5px] relative shrink-0 text-[#262626] text-[13px] whitespace-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
          Project Member
        </p>
      </div>
    </div>
  );
}

function Container45() {
  return (
    <div className="flex-[1_0_0] h-[46.875px] min-h-px min-w-px relative" data-name="Container">
      <div className="flex flex-row items-center overflow-clip rounded-[inherit] size-full">
        <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center pl-[16.996px] relative size-full">
          <Text43 />
        </div>
      </div>
    </div>
  );
}

function Text44() {
  return <div className="absolute bg-[#12b76a] left-[7px] rounded-[37282700px] size-[5px] top-[7.74px]" data-name="Text" />;
}

function StatusBadge3() {
  return (
    <div className="bg-[#ecfdf3] h-[20.503px] relative rounded-[37282700px] shrink-0 w-[55.451px]" data-name="StatusBadge">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <Text44 />
        <p className="-translate-x-1/2 absolute font-['Open_Sans:Regular',sans-serif] font-normal leading-[16.5px] left-[33.5px] text-[#027a48] text-[11px] text-center top-px whitespace-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
          Active
        </p>
      </div>
    </div>
  );
}

function Container46() {
  return (
    <div className="flex-[1_0_0] h-[46.875px] min-h-px min-w-px relative" data-name="Container">
      <div className="flex flex-row items-center overflow-clip rounded-[inherit] size-full">
        <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center pl-[16.997px] relative size-full">
          <StatusBadge3 />
        </div>
      </div>
    </div>
  );
}

function UserRow3() {
  return (
    <div className="absolute bg-white content-stretch flex h-[47.986px] items-start left-0 pb-[1.111px] pr-[60px] top-[223.94px] w-[1077.118px]" data-name="UserRow2">
      <div aria-hidden="true" className="absolute border-[#f0f0f0] border-b-[1.111px] border-solid inset-0 pointer-events-none" />
      <Container38 />
      <Container39 />
      <Container40 />
      <Container41 />
      <Container42 />
      <Container43 />
      <Container44 />
      <Container45 />
      <Container46 />
    </div>
  );
}

function ChevronTiny1() {
  return (
    <div className="relative size-[10px]" data-name="ChevronTiny">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 10 10">
        <g id="ChevronTiny">
          <path d="M3 2L7 5L3 8" id="Vector" stroke="var(--stroke-0, #4D7CFE)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
        </g>
      </svg>
    </div>
  );
}

function Text45() {
  return (
    <div className="absolute content-stretch flex h-[17.986px] items-start left-[27px] top-0 w-[58.108px]" data-name="Text">
      <p className="font-['Open_Sans:SemiBold',sans-serif] font-semibold leading-[18px] relative shrink-0 text-[#1e3a8a] text-[12px] whitespace-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
        Company:
      </p>
    </div>
  );
}

function Text46() {
  return (
    <div className="absolute content-stretch flex h-[17.986px] items-start left-[90.1px] overflow-clip top-0 w-[61.997px]" data-name="Text">
      <p className="font-['Open_Sans:Regular',sans-serif] font-normal leading-[18px] relative shrink-0 text-[#1e3a8a] text-[12px] whitespace-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
        BuildSmart
      </p>
    </div>
  );
}

function Text47() {
  return (
    <div className="absolute content-stretch flex h-[16.51px] items-start left-[160.09px] top-[0.73px] w-[12.778px]" data-name="Text">
      <p className="font-['Open_Sans:Regular',sans-serif] font-normal leading-[16.5px] relative shrink-0 text-[#6b7280] text-[11px] whitespace-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
        (4)
      </p>
    </div>
  );
}

function Container47() {
  return (
    <div className="flex-[1_0_0] h-[17.986px] min-h-px min-w-px relative" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid overflow-clip relative rounded-[inherit] size-full">
        <div className="absolute flex items-center justify-center left-[12px] size-[10px] top-[3.99px]" style={{ "--transform-inner-width": "1183", "--transform-inner-height": "22" } as React.CSSProperties}>
          <div className="flex-none rotate-90">
            <ChevronTiny1 />
          </div>
        </div>
        <Text45 />
        <Text46 />
        <Text47 />
      </div>
    </div>
  );
}

function GroupHeaderRow1() {
  return (
    <div className="absolute bg-[#ebf0ff] content-stretch flex h-[31.997px] items-center left-0 pb-[1.111px] pl-[3.333px] pr-[60px] top-[271.93px] w-[1077.118px]" data-name="GroupHeaderRow">
      <div aria-hidden="true" className="absolute border-[#4d7cfe] border-b-[1.111px] border-l-[3.333px] border-solid inset-0 pointer-events-none" />
      <Container47 />
    </div>
  );
}

function Icon6() {
  return (
    <div className="relative shrink-0 size-[17.986px]" data-name="Icon">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 17.9861 17.9861">
        <g clipPath="url(#clip0_2151_5507)" id="Icon">
          <path d={svgPaths.p35af8f80} fill="var(--fill-0, white)" id="Vector" />
          <path d={svgPaths.p35af8f80} id="Vector_2" stroke="var(--stroke-0, #D0D5DD)" strokeWidth="1.49884" />
        </g>
        <defs>
          <clipPath id="clip0_2151_5507">
            <rect fill="white" height="17.9861" width="17.9861" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function TableCheckbox4() {
  return (
    <div className="relative rounded-[4px] shrink-0 size-[31.997px]" data-name="TableCheckbox">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center pl-[6.997px] pr-[7.014px] relative size-full">
        <Icon6 />
      </div>
    </div>
  );
}

function Container48() {
  return (
    <div className="h-[46.875px] relative shrink-0 w-[47.986px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center pl-[7.986px] pr-[8.004px] relative size-full">
        <TableCheckbox4 />
      </div>
    </div>
  );
}

function Text48() {
  return (
    <div className="h-[16.51px] relative shrink-0 w-[13.993px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start relative size-full">
        <p className="font-['Open_Sans:SemiBold',sans-serif] font-semibold leading-[16.5px] relative shrink-0 text-[11px] text-white whitespace-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
          RC
        </p>
      </div>
    </div>
  );
}

function Avatar4() {
  return (
    <div className="bg-[#8e44ad] relative rounded-[37282700px] shrink-0 size-[30px]" data-name="Avatar">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center overflow-clip px-[8.003px] relative rounded-[inherit] size-full">
        <Text48 />
      </div>
    </div>
  );
}

function Text49() {
  return (
    <div className="h-[19.497px] relative shrink-0 w-[69.653px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start overflow-clip relative rounded-[inherit] size-full">
        <p className="font-['Open_Sans:Regular',sans-serif] font-normal leading-[19.5px] relative shrink-0 text-[#1d2939] text-[13px] whitespace-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
          Rafael Cruz
        </p>
      </div>
    </div>
  );
}

function Container49() {
  return (
    <div className="flex-[1_0_0] h-[46.875px] min-h-px min-w-px relative" data-name="Container">
      <div className="flex flex-row items-center overflow-clip rounded-[inherit] size-full">
        <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[7.986px] items-center pl-[5.99px] relative size-full">
          <Avatar4 />
          <Text49 />
        </div>
      </div>
    </div>
  );
}

function Text50() {
  return (
    <div className="h-[19.497px] relative shrink-0 w-[80.694px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start overflow-clip relative rounded-[inherit] size-full">
        <p className="font-['Open_Sans:Regular',sans-serif] font-normal leading-[19.5px] relative shrink-0 text-[#262626] text-[13px] whitespace-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
          Project Manager
        </p>
      </div>
    </div>
  );
}

function Container50() {
  return (
    <div className="flex-[1_0_0] h-[46.875px] min-h-px min-w-px relative" data-name="Container">
      <div className="flex flex-row items-center overflow-clip rounded-[inherit] size-full">
        <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center pl-[16.997px] relative size-full">
          <Text50 />
        </div>
      </div>
    </div>
  );
}

function Text51() {
  return (
    <div className="h-[19.497px] relative shrink-0 w-[80.712px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start overflow-clip relative rounded-[inherit] size-full">
        <p className="font-['Open_Sans:Regular',sans-serif] font-normal leading-[19.5px] relative shrink-0 text-[#262626] text-[13px] whitespace-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
          rcruz@buildsmart.io
        </p>
      </div>
    </div>
  );
}

function Container51() {
  return (
    <div className="flex-[1_0_0] h-[46.875px] min-h-px min-w-px relative" data-name="Container">
      <div className="flex flex-row items-center overflow-clip rounded-[inherit] size-full">
        <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center pl-[16.997px] relative size-full">
          <Text51 />
        </div>
      </div>
    </div>
  );
}

function Text52() {
  return (
    <div className="h-[19.497px] relative shrink-0 w-[67.222px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start overflow-clip relative rounded-[inherit] size-full">
        <p className="font-['Open_Sans:Regular',sans-serif] font-normal leading-[19.5px] relative shrink-0 text-[#262626] text-[13px] whitespace-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
          BuildSmart
        </p>
      </div>
    </div>
  );
}

function Container52() {
  return (
    <div className="flex-[1_0_0] h-[46.875px] min-h-px min-w-px relative" data-name="Container">
      <div className="flex flex-row items-center overflow-clip rounded-[inherit] size-full">
        <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center pl-[16.997px] relative size-full">
          <Text52 />
        </div>
      </div>
    </div>
  );
}

function Text53() {
  return (
    <div className="h-[19.497px] relative shrink-0 w-[42.847px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start overflow-clip relative rounded-[inherit] size-full">
        <p className="font-['Open_Sans:Regular',sans-serif] font-normal leading-[19.5px] relative shrink-0 text-[#262626] text-[13px] whitespace-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
          Boston
        </p>
      </div>
    </div>
  );
}

function Container53() {
  return (
    <div className="flex-[1_0_0] h-[46.875px] min-h-px min-w-px relative" data-name="Container">
      <div className="flex flex-row items-center overflow-clip rounded-[inherit] size-full">
        <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center pl-[16.997px] relative size-full">
          <Text53 />
        </div>
      </div>
    </div>
  );
}

function Text54() {
  return (
    <div className="h-[19.497px] relative shrink-0 w-[84.01px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start overflow-clip relative rounded-[inherit] size-full">
        <p className="font-['Open_Sans:Regular',sans-serif] font-normal leading-[19.5px] relative shrink-0 text-[#262626] text-[13px] whitespace-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
          Project Manager
        </p>
      </div>
    </div>
  );
}

function Container54() {
  return (
    <div className="flex-[1_0_0] h-[46.875px] min-h-px min-w-px relative" data-name="Container">
      <div className="flex flex-row items-center overflow-clip rounded-[inherit] size-full">
        <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center pl-[16.997px] relative size-full">
          <Text54 />
        </div>
      </div>
    </div>
  );
}

function Text55() {
  return (
    <div className="h-[19.497px] relative shrink-0 w-[80.694px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start overflow-clip relative rounded-[inherit] size-full">
        <p className="font-['Open_Sans:Regular',sans-serif] font-normal leading-[19.5px] relative shrink-0 text-[#262626] text-[13px] whitespace-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
          Project Admin
        </p>
      </div>
    </div>
  );
}

function Container55() {
  return (
    <div className="flex-[1_0_0] h-[46.875px] min-h-px min-w-px relative" data-name="Container">
      <div className="flex flex-row items-center overflow-clip rounded-[inherit] size-full">
        <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center pl-[16.996px] relative size-full">
          <Text55 />
        </div>
      </div>
    </div>
  );
}

function Text56() {
  return <div className="absolute bg-[#12b76a] left-[7px] rounded-[37282700px] size-[5px] top-[7.74px]" data-name="Text" />;
}

function StatusBadge4() {
  return (
    <div className="bg-[#ecfdf3] h-[20.503px] relative rounded-[37282700px] shrink-0 w-[55.451px]" data-name="StatusBadge">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <Text56 />
        <p className="-translate-x-1/2 absolute font-['Open_Sans:Regular',sans-serif] font-normal leading-[16.5px] left-[33.5px] text-[#027a48] text-[11px] text-center top-px whitespace-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
          Active
        </p>
      </div>
    </div>
  );
}

function Container56() {
  return (
    <div className="flex-[1_0_0] h-[46.875px] min-h-px min-w-px relative" data-name="Container">
      <div className="flex flex-row items-center overflow-clip rounded-[inherit] size-full">
        <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center pl-[16.997px] relative size-full">
          <StatusBadge4 />
        </div>
      </div>
    </div>
  );
}

function UserRow4() {
  return (
    <div className="absolute bg-white content-stretch flex h-[47.986px] items-start left-0 pb-[1.111px] pr-[60px] top-[303.92px] w-[1077.118px]" data-name="UserRow2">
      <div aria-hidden="true" className="absolute border-[#f0f0f0] border-b-[1.111px] border-solid inset-0 pointer-events-none" />
      <Container48 />
      <Container49 />
      <Container50 />
      <Container51 />
      <Container52 />
      <Container53 />
      <Container54 />
      <Container55 />
      <Container56 />
    </div>
  );
}

function Icon7() {
  return (
    <div className="relative shrink-0 size-[17.986px]" data-name="Icon">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 17.9861 17.9861">
        <g clipPath="url(#clip0_2151_5507)" id="Icon">
          <path d={svgPaths.p35af8f80} fill="var(--fill-0, white)" id="Vector" />
          <path d={svgPaths.p35af8f80} id="Vector_2" stroke="var(--stroke-0, #D0D5DD)" strokeWidth="1.49884" />
        </g>
        <defs>
          <clipPath id="clip0_2151_5507">
            <rect fill="white" height="17.9861" width="17.9861" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function TableCheckbox5() {
  return (
    <div className="relative rounded-[4px] shrink-0 size-[31.997px]" data-name="TableCheckbox">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center pl-[6.997px] pr-[7.014px] relative size-full">
        <Icon7 />
      </div>
    </div>
  );
}

function Container57() {
  return (
    <div className="h-[46.875px] relative shrink-0 w-[47.986px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center pl-[7.986px] pr-[8.004px] relative size-full">
        <TableCheckbox5 />
      </div>
    </div>
  );
}

function Text57() {
  return (
    <div className="h-[16.51px] relative shrink-0 w-[17.257px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start relative size-full">
        <p className="font-['Open_Sans:SemiBold',sans-serif] font-semibold leading-[16.5px] relative shrink-0 text-[11px] text-white whitespace-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
          NO
        </p>
      </div>
    </div>
  );
}

function Avatar5() {
  return (
    <div className="bg-[#3b5998] relative rounded-[37282700px] shrink-0 size-[30px]" data-name="Avatar">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center overflow-clip px-[6.372px] relative rounded-[inherit] size-full">
        <Text57 />
      </div>
    </div>
  );
}

function Text58() {
  return (
    <div className="h-[19.497px] relative shrink-0 w-[74.896px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start overflow-clip relative rounded-[inherit] size-full">
        <p className="font-['Open_Sans:Regular',sans-serif] font-normal leading-[19.5px] relative shrink-0 text-[#1d2939] text-[13px] whitespace-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
          Nina Okafor
        </p>
      </div>
    </div>
  );
}

function Container58() {
  return (
    <div className="flex-[1_0_0] h-[46.875px] min-h-px min-w-px relative" data-name="Container">
      <div className="flex flex-row items-center overflow-clip rounded-[inherit] size-full">
        <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[7.986px] items-center pl-[5.99px] relative size-full">
          <Avatar5 />
          <Text58 />
        </div>
      </div>
    </div>
  );
}

function Text59() {
  return (
    <div className="h-[19.497px] relative shrink-0 w-[80.694px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start overflow-clip relative rounded-[inherit] size-full">
        <p className="font-['Open_Sans:Regular',sans-serif] font-normal leading-[19.5px] relative shrink-0 text-[#262626] text-[13px] whitespace-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
          Document Controller
        </p>
      </div>
    </div>
  );
}

function Container59() {
  return (
    <div className="flex-[1_0_0] h-[46.875px] min-h-px min-w-px relative" data-name="Container">
      <div className="flex flex-row items-center overflow-clip rounded-[inherit] size-full">
        <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center pl-[16.997px] relative size-full">
          <Text59 />
        </div>
      </div>
    </div>
  );
}

function Text60() {
  return (
    <div className="h-[19.497px] relative shrink-0 w-[80.712px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start overflow-clip relative rounded-[inherit] size-full">
        <p className="font-['Open_Sans:Regular',sans-serif] font-normal leading-[19.5px] relative shrink-0 text-[#262626] text-[13px] whitespace-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
          nina.o@buildsmart.io
        </p>
      </div>
    </div>
  );
}

function Container60() {
  return (
    <div className="flex-[1_0_0] h-[46.875px] min-h-px min-w-px relative" data-name="Container">
      <div className="flex flex-row items-center overflow-clip rounded-[inherit] size-full">
        <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center pl-[16.997px] relative size-full">
          <Text60 />
        </div>
      </div>
    </div>
  );
}

function Text61() {
  return (
    <div className="h-[19.497px] relative shrink-0 w-[67.222px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start overflow-clip relative rounded-[inherit] size-full">
        <p className="font-['Open_Sans:Regular',sans-serif] font-normal leading-[19.5px] relative shrink-0 text-[#262626] text-[13px] whitespace-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
          BuildSmart
        </p>
      </div>
    </div>
  );
}

function Container61() {
  return (
    <div className="flex-[1_0_0] h-[46.875px] min-h-px min-w-px relative" data-name="Container">
      <div className="flex flex-row items-center overflow-clip rounded-[inherit] size-full">
        <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center pl-[16.997px] relative size-full">
          <Text61 />
        </div>
      </div>
    </div>
  );
}

function Text62() {
  return (
    <div className="h-[19.497px] relative shrink-0 w-[41.51px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start overflow-clip relative rounded-[inherit] size-full">
        <p className="font-['Open_Sans:Regular',sans-serif] font-normal leading-[19.5px] relative shrink-0 text-[#262626] text-[13px] whitespace-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
          Seattle
        </p>
      </div>
    </div>
  );
}

function Container62() {
  return (
    <div className="flex-[1_0_0] h-[46.875px] min-h-px min-w-px relative" data-name="Container">
      <div className="flex flex-row items-center overflow-clip rounded-[inherit] size-full">
        <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center pl-[16.997px] relative size-full">
          <Text62 />
        </div>
      </div>
    </div>
  );
}

function Text63() {
  return (
    <div className="h-[19.497px] relative shrink-0 w-[84.01px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start overflow-clip relative rounded-[inherit] size-full">
        <p className="font-['Open_Sans:Regular',sans-serif] font-normal leading-[19.5px] relative shrink-0 text-[#262626] text-[13px] whitespace-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
          Default [Home - Read only]
        </p>
      </div>
    </div>
  );
}

function Container63() {
  return (
    <div className="flex-[1_0_0] h-[46.875px] min-h-px min-w-px relative" data-name="Container">
      <div className="flex flex-row items-center overflow-clip rounded-[inherit] size-full">
        <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center pl-[16.997px] relative size-full">
          <Text63 />
        </div>
      </div>
    </div>
  );
}

function Text64() {
  return (
    <div className="h-[19.497px] relative shrink-0 w-[80.694px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start overflow-clip relative rounded-[inherit] size-full">
        <p className="font-['Open_Sans:Regular',sans-serif] font-normal leading-[19.5px] relative shrink-0 text-[#262626] text-[13px] whitespace-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
          Project Admin
        </p>
      </div>
    </div>
  );
}

function Container64() {
  return (
    <div className="flex-[1_0_0] h-[46.875px] min-h-px min-w-px relative" data-name="Container">
      <div className="flex flex-row items-center overflow-clip rounded-[inherit] size-full">
        <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center pl-[16.996px] relative size-full">
          <Text64 />
        </div>
      </div>
    </div>
  );
}

function Text65() {
  return <div className="absolute bg-[#12b76a] left-[7px] rounded-[37282700px] size-[5px] top-[7.74px]" data-name="Text" />;
}

function StatusBadge5() {
  return (
    <div className="bg-[#ecfdf3] h-[20.503px] relative rounded-[37282700px] shrink-0 w-[55.451px]" data-name="StatusBadge">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <Text65 />
        <p className="-translate-x-1/2 absolute font-['Open_Sans:Regular',sans-serif] font-normal leading-[16.5px] left-[33.5px] text-[#027a48] text-[11px] text-center top-px whitespace-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
          Active
        </p>
      </div>
    </div>
  );
}

function Container65() {
  return (
    <div className="flex-[1_0_0] h-[46.875px] min-h-px min-w-px relative" data-name="Container">
      <div className="flex flex-row items-center overflow-clip rounded-[inherit] size-full">
        <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center pl-[16.997px] relative size-full">
          <StatusBadge5 />
        </div>
      </div>
    </div>
  );
}

function UserRow5() {
  return (
    <div className="absolute bg-white content-stretch flex h-[47.986px] items-start left-0 pb-[1.111px] pr-[60px] top-[351.91px] w-[1077.118px]" data-name="UserRow2">
      <div aria-hidden="true" className="absolute border-[#f0f0f0] border-b-[1.111px] border-solid inset-0 pointer-events-none" />
      <Container57 />
      <Container58 />
      <Container59 />
      <Container60 />
      <Container61 />
      <Container62 />
      <Container63 />
      <Container64 />
      <Container65 />
    </div>
  );
}

function Icon8() {
  return (
    <div className="relative shrink-0 size-[17.986px]" data-name="Icon">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 17.9861 17.9861">
        <g clipPath="url(#clip0_2151_5507)" id="Icon">
          <path d={svgPaths.p35af8f80} fill="var(--fill-0, white)" id="Vector" />
          <path d={svgPaths.p35af8f80} id="Vector_2" stroke="var(--stroke-0, #D0D5DD)" strokeWidth="1.49884" />
        </g>
        <defs>
          <clipPath id="clip0_2151_5507">
            <rect fill="white" height="17.9861" width="17.9861" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function TableCheckbox6() {
  return (
    <div className="relative rounded-[4px] shrink-0 size-[31.997px]" data-name="TableCheckbox">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center pl-[6.997px] pr-[7.014px] relative size-full">
        <Icon8 />
      </div>
    </div>
  );
}

function Container66() {
  return (
    <div className="h-[46.875px] relative shrink-0 w-[47.986px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center pl-[7.986px] pr-[8.004px] relative size-full">
        <TableCheckbox6 />
      </div>
    </div>
  );
}

function Text66() {
  return (
    <div className="h-[16.51px] relative shrink-0 w-[13.455px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start relative size-full">
        <p className="font-['Open_Sans:SemiBold',sans-serif] font-semibold leading-[16.5px] relative shrink-0 text-[11px] text-white whitespace-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
          TB
        </p>
      </div>
    </div>
  );
}

function Avatar6() {
  return (
    <div className="bg-[#e4405f] relative rounded-[37282700px] shrink-0 size-[30px]" data-name="Avatar">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center overflow-clip pl-[8.264px] pr-[8.281px] relative rounded-[inherit] size-full">
        <Text66 />
      </div>
    </div>
  );
}

function Text67() {
  return (
    <div className="h-[19.497px] relative shrink-0 w-[78.403px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start overflow-clip relative rounded-[inherit] size-full">
        <p className="font-['Open_Sans:Regular',sans-serif] font-normal leading-[19.5px] relative shrink-0 text-[#1d2939] text-[13px] whitespace-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
          Tom Brecker
        </p>
      </div>
    </div>
  );
}

function Container67() {
  return (
    <div className="flex-[1_0_0] h-[46.875px] min-h-px min-w-px relative" data-name="Container">
      <div className="flex flex-row items-center overflow-clip rounded-[inherit] size-full">
        <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[7.986px] items-center pl-[5.99px] relative size-full">
          <Avatar6 />
          <Text67 />
        </div>
      </div>
    </div>
  );
}

function Text68() {
  return (
    <div className="h-[19.497px] relative shrink-0 w-[75.139px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start overflow-clip relative rounded-[inherit] size-full">
        <p className="font-['Open_Sans:Regular',sans-serif] font-normal leading-[19.5px] relative shrink-0 text-[#262626] text-[13px] whitespace-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
          QA Engineer
        </p>
      </div>
    </div>
  );
}

function Container68() {
  return (
    <div className="flex-[1_0_0] h-[46.875px] min-h-px min-w-px relative" data-name="Container">
      <div className="flex flex-row items-center overflow-clip rounded-[inherit] size-full">
        <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center pl-[16.997px] relative size-full">
          <Text68 />
        </div>
      </div>
    </div>
  );
}

function Text69() {
  return (
    <div className="h-[19.497px] relative shrink-0 w-[80.712px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start overflow-clip relative rounded-[inherit] size-full">
        <p className="font-['Open_Sans:Regular',sans-serif] font-normal leading-[19.5px] relative shrink-0 text-[#262626] text-[13px] whitespace-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
          tom.b@buildsmart.io
        </p>
      </div>
    </div>
  );
}

function Container69() {
  return (
    <div className="flex-[1_0_0] h-[46.875px] min-h-px min-w-px relative" data-name="Container">
      <div className="flex flex-row items-center overflow-clip rounded-[inherit] size-full">
        <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center pl-[16.997px] relative size-full">
          <Text69 />
        </div>
      </div>
    </div>
  );
}

function Text70() {
  return (
    <div className="h-[19.497px] relative shrink-0 w-[67.222px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start overflow-clip relative rounded-[inherit] size-full">
        <p className="font-['Open_Sans:Regular',sans-serif] font-normal leading-[19.5px] relative shrink-0 text-[#262626] text-[13px] whitespace-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
          BuildSmart
        </p>
      </div>
    </div>
  );
}

function Container70() {
  return (
    <div className="flex-[1_0_0] h-[46.875px] min-h-px min-w-px relative" data-name="Container">
      <div className="flex flex-row items-center overflow-clip rounded-[inherit] size-full">
        <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center pl-[16.997px] relative size-full">
          <Text70 />
        </div>
      </div>
    </div>
  );
}

function Text71() {
  return (
    <div className="h-[19.497px] relative shrink-0 w-[41.51px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start overflow-clip relative rounded-[inherit] size-full">
        <p className="font-['Open_Sans:Regular',sans-serif] font-normal leading-[19.5px] relative shrink-0 text-[#262626] text-[13px] whitespace-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
          Seattle
        </p>
      </div>
    </div>
  );
}

function Container71() {
  return (
    <div className="flex-[1_0_0] h-[46.875px] min-h-px min-w-px relative" data-name="Container">
      <div className="flex flex-row items-center overflow-clip rounded-[inherit] size-full">
        <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center pl-[16.997px] relative size-full">
          <Text71 />
        </div>
      </div>
    </div>
  );
}

function Text72() {
  return (
    <div className="h-[19.497px] relative shrink-0 w-[84.01px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start overflow-clip relative rounded-[inherit] size-full">
        <p className="font-['Open_Sans:Regular',sans-serif] font-normal leading-[19.5px] relative shrink-0 text-[#262626] text-[13px] whitespace-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
          Default [Home - Read only]
        </p>
      </div>
    </div>
  );
}

function Container72() {
  return (
    <div className="flex-[1_0_0] h-[46.875px] min-h-px min-w-px relative" data-name="Container">
      <div className="flex flex-row items-center overflow-clip rounded-[inherit] size-full">
        <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center pl-[16.997px] relative size-full">
          <Text72 />
        </div>
      </div>
    </div>
  );
}

function Text73() {
  return (
    <div className="h-[19.497px] relative shrink-0 w-[80.694px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start overflow-clip relative rounded-[inherit] size-full">
        <p className="font-['Open_Sans:Regular',sans-serif] font-normal leading-[19.5px] relative shrink-0 text-[#262626] text-[13px] whitespace-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
          Project Member
        </p>
      </div>
    </div>
  );
}

function Container73() {
  return (
    <div className="flex-[1_0_0] h-[46.875px] min-h-px min-w-px relative" data-name="Container">
      <div className="flex flex-row items-center overflow-clip rounded-[inherit] size-full">
        <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center pl-[16.996px] relative size-full">
          <Text73 />
        </div>
      </div>
    </div>
  );
}

function Text74() {
  return <div className="absolute bg-[#ef4444] left-[7px] rounded-[37282700px] size-[5px] top-[7.74px]" data-name="Text" />;
}

function StatusBadge6() {
  return (
    <div className="bg-[#fef2f2] h-[20.503px] relative rounded-[37282700px] shrink-0 w-[81.91px]" data-name="StatusBadge">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <Text74 />
        <p className="-translate-x-1/2 absolute font-['Open_Sans:Regular',sans-serif] font-normal leading-[16.5px] left-[46px] text-[#b91c1c] text-[11px] text-center top-px whitespace-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
          Suspended
        </p>
      </div>
    </div>
  );
}

function Container74() {
  return (
    <div className="flex-[1_0_0] h-[46.875px] min-h-px min-w-px relative" data-name="Container">
      <div className="flex flex-row items-center overflow-clip rounded-[inherit] size-full">
        <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center pl-[16.997px] relative size-full">
          <StatusBadge6 />
        </div>
      </div>
    </div>
  );
}

function UserRow6() {
  return (
    <div className="absolute bg-white content-stretch flex h-[47.986px] items-start left-0 pb-[1.111px] pr-[60px] top-[399.9px] w-[1077.118px]" data-name="UserRow2">
      <div aria-hidden="true" className="absolute border-[#f0f0f0] border-b-[1.111px] border-solid inset-0 pointer-events-none" />
      <Container66 />
      <Container67 />
      <Container68 />
      <Container69 />
      <Container70 />
      <Container71 />
      <Container72 />
      <Container73 />
      <Container74 />
    </div>
  );
}

function Icon9() {
  return (
    <div className="relative shrink-0 size-[17.986px]" data-name="Icon">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 17.9861 17.9861">
        <g clipPath="url(#clip0_2151_5507)" id="Icon">
          <path d={svgPaths.p35af8f80} fill="var(--fill-0, white)" id="Vector" />
          <path d={svgPaths.p35af8f80} id="Vector_2" stroke="var(--stroke-0, #D0D5DD)" strokeWidth="1.49884" />
        </g>
        <defs>
          <clipPath id="clip0_2151_5507">
            <rect fill="white" height="17.9861" width="17.9861" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function TableCheckbox7() {
  return (
    <div className="relative rounded-[4px] shrink-0 size-[31.997px]" data-name="TableCheckbox">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center pl-[6.997px] pr-[7.014px] relative size-full">
        <Icon9 />
      </div>
    </div>
  );
}

function Container75() {
  return (
    <div className="h-[46.875px] relative shrink-0 w-[47.986px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center pl-[7.986px] pr-[8.004px] relative size-full">
        <TableCheckbox7 />
      </div>
    </div>
  );
}

function Text75() {
  return (
    <div className="h-[16.51px] relative shrink-0 w-[14.219px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start relative size-full">
        <p className="font-['Open_Sans:SemiBold',sans-serif] font-semibold leading-[16.5px] relative shrink-0 text-[11px] text-white whitespace-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
          CB
        </p>
      </div>
    </div>
  );
}

function Avatar7() {
  return (
    <div className="bg-[#2d8653] relative rounded-[37282700px] shrink-0 size-[30px]" data-name="Avatar">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center overflow-clip pl-[7.882px] pr-[7.899px] relative rounded-[inherit] size-full">
        <Text75 />
      </div>
    </div>
  );
}

function Text76() {
  return (
    <div className="h-[19.497px] relative shrink-0 w-[88.75px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start overflow-clip relative rounded-[inherit] size-full">
        <p className="font-['Open_Sans:Regular',sans-serif] font-normal leading-[19.5px] relative shrink-0 text-[#1d2939] text-[13px] whitespace-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
          Chiara Bianchi
        </p>
      </div>
    </div>
  );
}

function Container76() {
  return (
    <div className="flex-[1_0_0] h-[46.875px] min-h-px min-w-px relative" data-name="Container">
      <div className="flex flex-row items-center overflow-clip rounded-[inherit] size-full">
        <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[7.986px] items-center pl-[5.99px] relative size-full">
          <Avatar7 />
          <Text76 />
        </div>
      </div>
    </div>
  );
}

function Text77() {
  return (
    <div className="h-[19.497px] relative shrink-0 w-[73.889px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start overflow-clip relative rounded-[inherit] size-full">
        <p className="font-['Open_Sans:Regular',sans-serif] font-normal leading-[19.5px] relative shrink-0 text-[#262626] text-[13px] whitespace-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
          Design Lead
        </p>
      </div>
    </div>
  );
}

function Container77() {
  return (
    <div className="flex-[1_0_0] h-[46.875px] min-h-px min-w-px relative" data-name="Container">
      <div className="flex flex-row items-center overflow-clip rounded-[inherit] size-full">
        <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center pl-[16.997px] relative size-full">
          <Text77 />
        </div>
      </div>
    </div>
  );
}

function Text78() {
  return (
    <div className="h-[19.497px] relative shrink-0 w-[80.712px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start overflow-clip relative rounded-[inherit] size-full">
        <p className="font-['Open_Sans:Regular',sans-serif] font-normal leading-[19.5px] relative shrink-0 text-[#262626] text-[13px] whitespace-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
          cbianchi@buildsmart.io
        </p>
      </div>
    </div>
  );
}

function Container78() {
  return (
    <div className="flex-[1_0_0] h-[46.875px] min-h-px min-w-px relative" data-name="Container">
      <div className="flex flex-row items-center overflow-clip rounded-[inherit] size-full">
        <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center pl-[16.997px] relative size-full">
          <Text78 />
        </div>
      </div>
    </div>
  );
}

function Text79() {
  return (
    <div className="h-[19.497px] relative shrink-0 w-[67.222px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start overflow-clip relative rounded-[inherit] size-full">
        <p className="font-['Open_Sans:Regular',sans-serif] font-normal leading-[19.5px] relative shrink-0 text-[#262626] text-[13px] whitespace-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
          BuildSmart
        </p>
      </div>
    </div>
  );
}

function Container79() {
  return (
    <div className="flex-[1_0_0] h-[46.875px] min-h-px min-w-px relative" data-name="Container">
      <div className="flex flex-row items-center overflow-clip rounded-[inherit] size-full">
        <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center pl-[16.997px] relative size-full">
          <Text79 />
        </div>
      </div>
    </div>
  );
}

function Text80() {
  return (
    <div className="h-[19.497px] relative shrink-0 w-[38.281px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start overflow-clip relative rounded-[inherit] size-full">
        <p className="font-['Open_Sans:Regular',sans-serif] font-normal leading-[19.5px] relative shrink-0 text-[#262626] text-[13px] whitespace-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
          Austin
        </p>
      </div>
    </div>
  );
}

function Container80() {
  return (
    <div className="flex-[1_0_0] h-[46.875px] min-h-px min-w-px relative" data-name="Container">
      <div className="flex flex-row items-center overflow-clip rounded-[inherit] size-full">
        <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center pl-[16.997px] relative size-full">
          <Text80 />
        </div>
      </div>
    </div>
  );
}

function Text81() {
  return (
    <div className="h-[19.497px] relative shrink-0 w-[84.01px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start overflow-clip relative rounded-[inherit] size-full">
        <p className="font-['Open_Sans:Regular',sans-serif] font-normal leading-[19.5px] relative shrink-0 text-[#262626] text-[13px] whitespace-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
          Design Manager
        </p>
      </div>
    </div>
  );
}

function Container81() {
  return (
    <div className="flex-[1_0_0] h-[46.875px] min-h-px min-w-px relative" data-name="Container">
      <div className="flex flex-row items-center overflow-clip rounded-[inherit] size-full">
        <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center pl-[16.997px] relative size-full">
          <Text81 />
        </div>
      </div>
    </div>
  );
}

function Text82() {
  return (
    <div className="h-[19.497px] relative shrink-0 w-[80.694px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start overflow-clip relative rounded-[inherit] size-full">
        <p className="font-['Open_Sans:Regular',sans-serif] font-normal leading-[19.5px] relative shrink-0 text-[#262626] text-[13px] whitespace-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
          Project Member
        </p>
      </div>
    </div>
  );
}

function Container82() {
  return (
    <div className="flex-[1_0_0] h-[46.875px] min-h-px min-w-px relative" data-name="Container">
      <div className="flex flex-row items-center overflow-clip rounded-[inherit] size-full">
        <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center pl-[16.996px] relative size-full">
          <Text82 />
        </div>
      </div>
    </div>
  );
}

function Text83() {
  return <div className="absolute bg-[#ef6820] left-[7px] rounded-[37282700px] size-[5px] top-[7.74px]" data-name="Text" />;
}

function StatusBadge7() {
  return (
    <div className="bg-[#fff7ed] h-[20.503px] relative rounded-[37282700px] shrink-0 w-[115.851px]" data-name="StatusBadge">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <Text83 />
        <p className="-translate-x-1/2 absolute font-['Open_Sans:Regular',sans-serif] font-normal leading-[16.5px] left-[63px] text-[#c4320a] text-[11px] text-center top-px whitespace-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
          Expired Invitation
        </p>
      </div>
    </div>
  );
}

function Container83() {
  return (
    <div className="flex-[1_0_0] h-[46.875px] min-h-px min-w-px relative" data-name="Container">
      <div className="flex flex-row items-center overflow-clip rounded-[inherit] size-full">
        <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center pl-[16.997px] relative size-full">
          <StatusBadge7 />
        </div>
      </div>
    </div>
  );
}

function UserRow7() {
  return (
    <div className="absolute bg-white content-stretch flex h-[47.986px] items-start left-0 pb-[1.111px] pr-[60px] top-[447.88px] w-[1077.118px]" data-name="UserRow2">
      <div aria-hidden="true" className="absolute border-[#f0f0f0] border-b-[1.111px] border-solid inset-0 pointer-events-none" />
      <Container75 />
      <Container76 />
      <Container77 />
      <Container78 />
      <Container79 />
      <Container80 />
      <Container81 />
      <Container82 />
      <Container83 />
    </div>
  );
}

function ChevronTiny2() {
  return (
    <div className="relative size-[10px]" data-name="ChevronTiny">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 10 10">
        <g id="ChevronTiny">
          <path d="M3 2L7 5L3 8" id="Vector" stroke="var(--stroke-0, #4D7CFE)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
        </g>
      </svg>
    </div>
  );
}

function Text84() {
  return (
    <div className="absolute content-stretch flex h-[17.986px] items-start left-[27px] top-0 w-[58.108px]" data-name="Text">
      <p className="font-['Open_Sans:SemiBold',sans-serif] font-semibold leading-[18px] relative shrink-0 text-[#1e3a8a] text-[12px] whitespace-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
        Company:
      </p>
    </div>
  );
}

function Text85() {
  return (
    <div className="absolute content-stretch flex h-[17.986px] items-start left-[90.1px] overflow-clip top-0 w-[56.059px]" data-name="Text">
      <p className="font-['Open_Sans:Regular',sans-serif] font-normal leading-[18px] relative shrink-0 text-[#1e3a8a] text-[12px] whitespace-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
        CityWorks
      </p>
    </div>
  );
}

function Text86() {
  return (
    <div className="absolute content-stretch flex h-[16.51px] items-start left-[154.15px] top-[0.73px] w-[12.778px]" data-name="Text">
      <p className="font-['Open_Sans:Regular',sans-serif] font-normal leading-[16.5px] relative shrink-0 text-[#6b7280] text-[11px] whitespace-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
        (4)
      </p>
    </div>
  );
}

function Container84() {
  return (
    <div className="flex-[1_0_0] h-[17.986px] min-h-px min-w-px relative" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid overflow-clip relative rounded-[inherit] size-full">
        <div className="absolute flex items-center justify-center left-[12px] size-[10px] top-[3.99px]" style={{ "--transform-inner-width": "1183", "--transform-inner-height": "22" } as React.CSSProperties}>
          <div className="flex-none rotate-90">
            <ChevronTiny2 />
          </div>
        </div>
        <Text84 />
        <Text85 />
        <Text86 />
      </div>
    </div>
  );
}

function GroupHeaderRow2() {
  return (
    <div className="absolute bg-[#ebf0ff] content-stretch flex h-[31.997px] items-center left-0 pb-[1.111px] pl-[3.333px] pr-[60px] top-[495.87px] w-[1077.118px]" data-name="GroupHeaderRow">
      <div aria-hidden="true" className="absolute border-[#4d7cfe] border-b-[1.111px] border-l-[3.333px] border-solid inset-0 pointer-events-none" />
      <Container84 />
    </div>
  );
}

function Icon10() {
  return (
    <div className="relative shrink-0 size-[17.986px]" data-name="Icon">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 17.9861 17.9861">
        <g clipPath="url(#clip0_2151_5507)" id="Icon">
          <path d={svgPaths.p35af8f80} fill="var(--fill-0, white)" id="Vector" />
          <path d={svgPaths.p35af8f80} id="Vector_2" stroke="var(--stroke-0, #D0D5DD)" strokeWidth="1.49884" />
        </g>
        <defs>
          <clipPath id="clip0_2151_5507">
            <rect fill="white" height="17.9861" width="17.9861" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function TableCheckbox8() {
  return (
    <div className="relative rounded-[4px] shrink-0 size-[31.997px]" data-name="TableCheckbox">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center pl-[6.997px] pr-[7.014px] relative size-full">
        <Icon10 />
      </div>
    </div>
  );
}

function Container85() {
  return (
    <div className="h-[46.875px] relative shrink-0 w-[47.986px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center pl-[7.986px] pr-[8.004px] relative size-full">
        <TableCheckbox8 />
      </div>
    </div>
  );
}

function Text87() {
  return (
    <div className="h-[16.51px] relative shrink-0 w-[16.892px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start relative size-full">
        <p className="font-['Open_Sans:SemiBold',sans-serif] font-semibold leading-[16.5px] relative shrink-0 text-[11px] text-white whitespace-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
          MP
        </p>
      </div>
    </div>
  );
}

function Avatar8() {
  return (
    <div className="bg-[#e74c3c] relative rounded-[37282700px] shrink-0 size-[30px]" data-name="Avatar">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center overflow-clip pl-[6.545px] pr-[6.563px] relative rounded-[inherit] size-full">
        <Text87 />
      </div>
    </div>
  );
}

function Text88() {
  return (
    <div className="h-[19.497px] relative shrink-0 w-[67.743px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start overflow-clip relative rounded-[inherit] size-full">
        <p className="font-['Open_Sans:Regular',sans-serif] font-normal leading-[19.5px] relative shrink-0 text-[#1d2939] text-[13px] whitespace-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
          Maya Patel
        </p>
      </div>
    </div>
  );
}

function Container86() {
  return (
    <div className="flex-[1_0_0] h-[46.875px] min-h-px min-w-px relative" data-name="Container">
      <div className="flex flex-row items-center overflow-clip rounded-[inherit] size-full">
        <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[7.986px] items-center pl-[5.99px] relative size-full">
          <Avatar8 />
          <Text88 />
        </div>
      </div>
    </div>
  );
}

function Text89() {
  return (
    <div className="h-[19.497px] relative shrink-0 w-[80.694px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start overflow-clip relative rounded-[inherit] size-full">
        <p className="font-['Open_Sans:Regular',sans-serif] font-normal leading-[19.5px] relative shrink-0 text-[#262626] text-[13px] whitespace-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
          Urban Planner
        </p>
      </div>
    </div>
  );
}

function Container87() {
  return (
    <div className="flex-[1_0_0] h-[46.875px] min-h-px min-w-px relative" data-name="Container">
      <div className="flex flex-row items-center overflow-clip rounded-[inherit] size-full">
        <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center pl-[16.997px] relative size-full">
          <Text89 />
        </div>
      </div>
    </div>
  );
}

function Text90() {
  return (
    <div className="h-[19.497px] relative shrink-0 w-[80.712px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start overflow-clip relative rounded-[inherit] size-full">
        <p className="font-['Open_Sans:Regular',sans-serif] font-normal leading-[19.5px] relative shrink-0 text-[#262626] text-[13px] whitespace-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
          mpatel@cityworks.net
        </p>
      </div>
    </div>
  );
}

function Container88() {
  return (
    <div className="flex-[1_0_0] h-[46.875px] min-h-px min-w-px relative" data-name="Container">
      <div className="flex flex-row items-center overflow-clip rounded-[inherit] size-full">
        <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center pl-[16.997px] relative size-full">
          <Text90 />
        </div>
      </div>
    </div>
  );
}

function Text91() {
  return (
    <div className="h-[19.497px] relative shrink-0 w-[60.781px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start overflow-clip relative rounded-[inherit] size-full">
        <p className="font-['Open_Sans:Regular',sans-serif] font-normal leading-[19.5px] relative shrink-0 text-[#262626] text-[13px] whitespace-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
          CityWorks
        </p>
      </div>
    </div>
  );
}

function Container89() {
  return (
    <div className="flex-[1_0_0] h-[46.875px] min-h-px min-w-px relative" data-name="Container">
      <div className="flex flex-row items-center overflow-clip rounded-[inherit] size-full">
        <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center pl-[16.997px] relative size-full">
          <Text91 />
        </div>
      </div>
    </div>
  );
}

function Text92() {
  return (
    <div className="h-[19.497px] relative shrink-0 w-[42.847px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start overflow-clip relative rounded-[inherit] size-full">
        <p className="font-['Open_Sans:Regular',sans-serif] font-normal leading-[19.5px] relative shrink-0 text-[#262626] text-[13px] whitespace-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
          Boston
        </p>
      </div>
    </div>
  );
}

function Container90() {
  return (
    <div className="flex-[1_0_0] h-[46.875px] min-h-px min-w-px relative" data-name="Container">
      <div className="flex flex-row items-center overflow-clip rounded-[inherit] size-full">
        <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center pl-[16.997px] relative size-full">
          <Text92 />
        </div>
      </div>
    </div>
  );
}

function Text93() {
  return (
    <div className="h-[19.497px] relative shrink-0 w-[84.01px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start overflow-clip relative rounded-[inherit] size-full">
        <p className="font-['Open_Sans:Regular',sans-serif] font-normal leading-[19.5px] relative shrink-0 text-[#262626] text-[13px] whitespace-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
          Planning Engineer
        </p>
      </div>
    </div>
  );
}

function Container91() {
  return (
    <div className="flex-[1_0_0] h-[46.875px] min-h-px min-w-px relative" data-name="Container">
      <div className="flex flex-row items-center overflow-clip rounded-[inherit] size-full">
        <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center pl-[16.997px] relative size-full">
          <Text93 />
        </div>
      </div>
    </div>
  );
}

function Text94() {
  return (
    <div className="h-[19.497px] relative shrink-0 w-[80.694px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start overflow-clip relative rounded-[inherit] size-full">
        <p className="font-['Open_Sans:Regular',sans-serif] font-normal leading-[19.5px] relative shrink-0 text-[#262626] text-[13px] whitespace-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
          Project Member
        </p>
      </div>
    </div>
  );
}

function Container92() {
  return (
    <div className="flex-[1_0_0] h-[46.875px] min-h-px min-w-px relative" data-name="Container">
      <div className="flex flex-row items-center overflow-clip rounded-[inherit] size-full">
        <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center pl-[16.996px] relative size-full">
          <Text94 />
        </div>
      </div>
    </div>
  );
}

function Text95() {
  return <div className="absolute bg-[#12b76a] left-[7px] rounded-[37282700px] size-[5px] top-[7.74px]" data-name="Text" />;
}

function StatusBadge8() {
  return (
    <div className="bg-[#ecfdf3] h-[20.503px] relative rounded-[37282700px] shrink-0 w-[55.451px]" data-name="StatusBadge">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <Text95 />
        <p className="-translate-x-1/2 absolute font-['Open_Sans:Regular',sans-serif] font-normal leading-[16.5px] left-[33.5px] text-[#027a48] text-[11px] text-center top-px whitespace-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
          Active
        </p>
      </div>
    </div>
  );
}

function Container93() {
  return (
    <div className="flex-[1_0_0] h-[46.875px] min-h-px min-w-px relative" data-name="Container">
      <div className="flex flex-row items-center overflow-clip rounded-[inherit] size-full">
        <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center pl-[16.997px] relative size-full">
          <StatusBadge8 />
        </div>
      </div>
    </div>
  );
}

function UserRow8() {
  return (
    <div className="absolute bg-white content-stretch flex h-[47.986px] items-start left-0 pb-[1.111px] pr-[60px] top-[527.86px] w-[1077.118px]" data-name="UserRow2">
      <div aria-hidden="true" className="absolute border-[#f0f0f0] border-b-[1.111px] border-solid inset-0 pointer-events-none" />
      <Container85 />
      <Container86 />
      <Container87 />
      <Container88 />
      <Container89 />
      <Container90 />
      <Container91 />
      <Container92 />
      <Container93 />
    </div>
  );
}

function Icon11() {
  return (
    <div className="relative shrink-0 size-[17.986px]" data-name="Icon">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 17.9861 17.9861">
        <g clipPath="url(#clip0_2151_5507)" id="Icon">
          <path d={svgPaths.p35af8f80} fill="var(--fill-0, white)" id="Vector" />
          <path d={svgPaths.p35af8f80} id="Vector_2" stroke="var(--stroke-0, #D0D5DD)" strokeWidth="1.49884" />
        </g>
        <defs>
          <clipPath id="clip0_2151_5507">
            <rect fill="white" height="17.9861" width="17.9861" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function TableCheckbox9() {
  return (
    <div className="relative rounded-[4px] shrink-0 size-[31.997px]" data-name="TableCheckbox">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center pl-[6.997px] pr-[7.014px] relative size-full">
        <Icon11 />
      </div>
    </div>
  );
}

function Container94() {
  return (
    <div className="h-[46.875px] relative shrink-0 w-[47.986px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center pl-[7.986px] pr-[8.004px] relative size-full">
        <TableCheckbox9 />
      </div>
    </div>
  );
}

function Text96() {
  return (
    <div className="h-[16.51px] relative shrink-0 w-[15.503px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start relative size-full">
        <p className="font-['Open_Sans:SemiBold',sans-serif] font-semibold leading-[16.5px] relative shrink-0 text-[11px] text-white whitespace-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
          BH
        </p>
      </div>
    </div>
  );
}

function Avatar9() {
  return (
    <div className="bg-[#34495e] relative rounded-[37282700px] shrink-0 size-[30px]" data-name="Avatar">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center overflow-clip pl-[7.24px] pr-[7.257px] relative rounded-[inherit] size-full">
        <Text96 />
      </div>
    </div>
  );
}

function Text97() {
  return (
    <div className="h-[19.497px] relative shrink-0 w-[71.563px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start overflow-clip relative rounded-[inherit] size-full">
        <p className="font-['Open_Sans:Regular',sans-serif] font-normal leading-[19.5px] relative shrink-0 text-[#1d2939] text-[13px] whitespace-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
          Ben Harlow
        </p>
      </div>
    </div>
  );
}

function Container95() {
  return (
    <div className="flex-[1_0_0] h-[46.875px] min-h-px min-w-px relative" data-name="Container">
      <div className="flex flex-row items-center overflow-clip rounded-[inherit] size-full">
        <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[7.986px] items-center pl-[5.99px] relative size-full">
          <Avatar9 />
          <Text97 />
        </div>
      </div>
    </div>
  );
}

function Text98() {
  return (
    <div className="h-[19.497px] relative shrink-0 w-[80.694px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start overflow-clip relative rounded-[inherit] size-full">
        <p className="font-['Open_Sans:Regular',sans-serif] font-normal leading-[19.5px] relative shrink-0 text-[#262626] text-[13px] whitespace-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
          Infrastructure PM
        </p>
      </div>
    </div>
  );
}

function Container96() {
  return (
    <div className="flex-[1_0_0] h-[46.875px] min-h-px min-w-px relative" data-name="Container">
      <div className="flex flex-row items-center overflow-clip rounded-[inherit] size-full">
        <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center pl-[16.997px] relative size-full">
          <Text98 />
        </div>
      </div>
    </div>
  );
}

function Text99() {
  return (
    <div className="h-[19.497px] relative shrink-0 w-[80.712px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start overflow-clip relative rounded-[inherit] size-full">
        <p className="font-['Open_Sans:Regular',sans-serif] font-normal leading-[19.5px] relative shrink-0 text-[#262626] text-[13px] whitespace-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
          ben.h@cityworks.net
        </p>
      </div>
    </div>
  );
}

function Container97() {
  return (
    <div className="flex-[1_0_0] h-[46.875px] min-h-px min-w-px relative" data-name="Container">
      <div className="flex flex-row items-center overflow-clip rounded-[inherit] size-full">
        <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center pl-[16.997px] relative size-full">
          <Text99 />
        </div>
      </div>
    </div>
  );
}

function Text100() {
  return (
    <div className="h-[19.497px] relative shrink-0 w-[60.781px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start overflow-clip relative rounded-[inherit] size-full">
        <p className="font-['Open_Sans:Regular',sans-serif] font-normal leading-[19.5px] relative shrink-0 text-[#262626] text-[13px] whitespace-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
          CityWorks
        </p>
      </div>
    </div>
  );
}

function Container98() {
  return (
    <div className="flex-[1_0_0] h-[46.875px] min-h-px min-w-px relative" data-name="Container">
      <div className="flex flex-row items-center overflow-clip rounded-[inherit] size-full">
        <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center pl-[16.997px] relative size-full">
          <Text100 />
        </div>
      </div>
    </div>
  );
}

function Text101() {
  return (
    <div className="h-[19.497px] relative shrink-0 w-[52.014px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start overflow-clip relative rounded-[inherit] size-full">
        <p className="font-['Open_Sans:Regular',sans-serif] font-normal leading-[19.5px] relative shrink-0 text-[#262626] text-[13px] whitespace-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
          Houston
        </p>
      </div>
    </div>
  );
}

function Container99() {
  return (
    <div className="flex-[1_0_0] h-[46.875px] min-h-px min-w-px relative" data-name="Container">
      <div className="flex flex-row items-center overflow-clip rounded-[inherit] size-full">
        <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center pl-[16.997px] relative size-full">
          <Text101 />
        </div>
      </div>
    </div>
  );
}

function Text102() {
  return (
    <div className="h-[19.497px] relative shrink-0 w-[84.01px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start overflow-clip relative rounded-[inherit] size-full">
        <p className="font-['Open_Sans:Regular',sans-serif] font-normal leading-[19.5px] relative shrink-0 text-[#262626] text-[13px] whitespace-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
          Deputy Project Manager
        </p>
      </div>
    </div>
  );
}

function Container100() {
  return (
    <div className="flex-[1_0_0] h-[46.875px] min-h-px min-w-px relative" data-name="Container">
      <div className="flex flex-row items-center overflow-clip rounded-[inherit] size-full">
        <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center pl-[16.997px] relative size-full">
          <Text102 />
        </div>
      </div>
    </div>
  );
}

function Text103() {
  return (
    <div className="h-[19.497px] relative shrink-0 w-[80.694px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start overflow-clip relative rounded-[inherit] size-full">
        <p className="font-['Open_Sans:Regular',sans-serif] font-normal leading-[19.5px] relative shrink-0 text-[#262626] text-[13px] whitespace-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
          Project Admin
        </p>
      </div>
    </div>
  );
}

function Container101() {
  return (
    <div className="flex-[1_0_0] h-[46.875px] min-h-px min-w-px relative" data-name="Container">
      <div className="flex flex-row items-center overflow-clip rounded-[inherit] size-full">
        <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center pl-[16.996px] relative size-full">
          <Text103 />
        </div>
      </div>
    </div>
  );
}

function Text104() {
  return <div className="absolute bg-[#6172f3] left-[7px] rounded-[37282700px] size-[5px] top-[7.74px]" data-name="Text" />;
}

function StatusBadge9() {
  return (
    <div className="bg-[#eff8ff] h-[20.503px] relative rounded-[37282700px] shrink-0 w-[118.872px]" data-name="StatusBadge">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <Text104 />
        <p className="-translate-x-1/2 absolute font-['Open_Sans:Regular',sans-serif] font-normal leading-[16.5px] left-[64.5px] text-[#175cd3] text-[11px] text-center top-px whitespace-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
          Pending Invitation
        </p>
      </div>
    </div>
  );
}

function Container102() {
  return (
    <div className="flex-[1_0_0] h-[46.875px] min-h-px min-w-px relative" data-name="Container">
      <div className="flex flex-row items-center overflow-clip rounded-[inherit] size-full">
        <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center pl-[16.997px] relative size-full">
          <StatusBadge9 />
        </div>
      </div>
    </div>
  );
}

function UserRow9() {
  return (
    <div className="absolute bg-white content-stretch flex h-[47.986px] items-start left-0 pb-[1.111px] pr-[60px] top-[575.85px] w-[1077.118px]" data-name="UserRow2">
      <div aria-hidden="true" className="absolute border-[#f0f0f0] border-b-[1.111px] border-solid inset-0 pointer-events-none" />
      <Container94 />
      <Container95 />
      <Container96 />
      <Container97 />
      <Container98 />
      <Container99 />
      <Container100 />
      <Container101 />
      <Container102 />
    </div>
  );
}

function Icon12() {
  return (
    <div className="relative shrink-0 size-[17.986px]" data-name="Icon">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 17.9861 17.9861">
        <g clipPath="url(#clip0_2151_5507)" id="Icon">
          <path d={svgPaths.p35af8f80} fill="var(--fill-0, white)" id="Vector" />
          <path d={svgPaths.p35af8f80} id="Vector_2" stroke="var(--stroke-0, #D0D5DD)" strokeWidth="1.49884" />
        </g>
        <defs>
          <clipPath id="clip0_2151_5507">
            <rect fill="white" height="17.9861" width="17.9861" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function TableCheckbox10() {
  return (
    <div className="relative rounded-[4px] shrink-0 size-[31.997px]" data-name="TableCheckbox">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center pl-[6.997px] pr-[7.014px] relative size-full">
        <Icon12 />
      </div>
    </div>
  );
}

function Container103() {
  return (
    <div className="h-[46.875px] relative shrink-0 w-[47.986px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center pl-[7.986px] pr-[8.004px] relative size-full">
        <TableCheckbox10 />
      </div>
    </div>
  );
}

function Text105() {
  return (
    <div className="h-[16.51px] relative shrink-0 w-[10.208px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start relative size-full">
        <p className="font-['Open_Sans:SemiBold',sans-serif] font-semibold leading-[16.5px] relative shrink-0 text-[11px] text-white whitespace-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
          IV
        </p>
      </div>
    </div>
  );
}

function Avatar10() {
  return (
    <div className="bg-[#16a085] relative rounded-[37282700px] shrink-0 size-[30px]" data-name="Avatar">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center overflow-clip px-[9.896px] relative rounded-[inherit] size-full">
        <Text105 />
      </div>
    </div>
  );
}

function Text106() {
  return (
    <div className="h-[19.497px] relative shrink-0 w-[59.531px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start overflow-clip relative rounded-[inherit] size-full">
        <p className="font-['Open_Sans:Regular',sans-serif] font-normal leading-[19.5px] relative shrink-0 text-[#1d2939] text-[13px] whitespace-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
          Iris Vance
        </p>
      </div>
    </div>
  );
}

function Container104() {
  return (
    <div className="flex-[1_0_0] h-[46.875px] min-h-px min-w-px relative" data-name="Container">
      <div className="flex flex-row items-center overflow-clip rounded-[inherit] size-full">
        <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[7.986px] items-center pl-[5.99px] relative size-full">
          <Avatar10 />
          <Text106 />
        </div>
      </div>
    </div>
  );
}

function Text107() {
  return (
    <div className="h-[19.497px] relative shrink-0 w-[80.694px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start overflow-clip relative rounded-[inherit] size-full">
        <p className="font-['Open_Sans:Regular',sans-serif] font-normal leading-[19.5px] relative shrink-0 text-[#262626] text-[13px] whitespace-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
          Drainage Engineer
        </p>
      </div>
    </div>
  );
}

function Container105() {
  return (
    <div className="flex-[1_0_0] h-[46.875px] min-h-px min-w-px relative" data-name="Container">
      <div className="flex flex-row items-center overflow-clip rounded-[inherit] size-full">
        <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center pl-[16.997px] relative size-full">
          <Text107 />
        </div>
      </div>
    </div>
  );
}

function Text108() {
  return (
    <div className="h-[19.497px] relative shrink-0 w-[80.712px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start overflow-clip relative rounded-[inherit] size-full">
        <p className="font-['Open_Sans:Regular',sans-serif] font-normal leading-[19.5px] relative shrink-0 text-[#262626] text-[13px] whitespace-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
          ivance@cityworks.net
        </p>
      </div>
    </div>
  );
}

function Container106() {
  return (
    <div className="flex-[1_0_0] h-[46.875px] min-h-px min-w-px relative" data-name="Container">
      <div className="flex flex-row items-center overflow-clip rounded-[inherit] size-full">
        <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center pl-[16.997px] relative size-full">
          <Text108 />
        </div>
      </div>
    </div>
  );
}

function Text109() {
  return (
    <div className="h-[19.497px] relative shrink-0 w-[60.781px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start overflow-clip relative rounded-[inherit] size-full">
        <p className="font-['Open_Sans:Regular',sans-serif] font-normal leading-[19.5px] relative shrink-0 text-[#262626] text-[13px] whitespace-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
          CityWorks
        </p>
      </div>
    </div>
  );
}

function Container107() {
  return (
    <div className="flex-[1_0_0] h-[46.875px] min-h-px min-w-px relative" data-name="Container">
      <div className="flex flex-row items-center overflow-clip rounded-[inherit] size-full">
        <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center pl-[16.997px] relative size-full">
          <Text109 />
        </div>
      </div>
    </div>
  );
}

function Text110() {
  return (
    <div className="h-[19.497px] relative shrink-0 w-[41.51px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start overflow-clip relative rounded-[inherit] size-full">
        <p className="font-['Open_Sans:Regular',sans-serif] font-normal leading-[19.5px] relative shrink-0 text-[#262626] text-[13px] whitespace-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
          Seattle
        </p>
      </div>
    </div>
  );
}

function Container108() {
  return (
    <div className="flex-[1_0_0] h-[46.875px] min-h-px min-w-px relative" data-name="Container">
      <div className="flex flex-row items-center overflow-clip rounded-[inherit] size-full">
        <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center pl-[16.997px] relative size-full">
          <Text110 />
        </div>
      </div>
    </div>
  );
}

function Text111() {
  return (
    <div className="h-[19.497px] relative shrink-0 w-[81.337px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start overflow-clip relative rounded-[inherit] size-full">
        <p className="font-['Open_Sans:Regular',sans-serif] font-normal leading-[19.5px] relative shrink-0 text-[#262626] text-[13px] whitespace-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
          Civil Engineer
        </p>
      </div>
    </div>
  );
}

function Container109() {
  return (
    <div className="flex-[1_0_0] h-[46.875px] min-h-px min-w-px relative" data-name="Container">
      <div className="flex flex-row items-center overflow-clip rounded-[inherit] size-full">
        <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center pl-[16.997px] relative size-full">
          <Text111 />
        </div>
      </div>
    </div>
  );
}

function Text112() {
  return (
    <div className="h-[19.497px] relative shrink-0 w-[80.694px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start overflow-clip relative rounded-[inherit] size-full">
        <p className="font-['Open_Sans:Regular',sans-serif] font-normal leading-[19.5px] relative shrink-0 text-[#262626] text-[13px] whitespace-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
          Project Member
        </p>
      </div>
    </div>
  );
}

function Container110() {
  return (
    <div className="flex-[1_0_0] h-[46.875px] min-h-px min-w-px relative" data-name="Container">
      <div className="flex flex-row items-center overflow-clip rounded-[inherit] size-full">
        <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center pl-[16.996px] relative size-full">
          <Text112 />
        </div>
      </div>
    </div>
  );
}

function Text113() {
  return <div className="absolute bg-[#ef4444] left-[7px] rounded-[37282700px] size-[5px] top-[7.74px]" data-name="Text" />;
}

function StatusBadge10() {
  return (
    <div className="bg-[#fef2f2] h-[20.503px] relative rounded-[37282700px] shrink-0 w-[81.91px]" data-name="StatusBadge">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <Text113 />
        <p className="-translate-x-1/2 absolute font-['Open_Sans:Regular',sans-serif] font-normal leading-[16.5px] left-[46px] text-[#b91c1c] text-[11px] text-center top-px whitespace-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
          Suspended
        </p>
      </div>
    </div>
  );
}

function Container111() {
  return (
    <div className="flex-[1_0_0] h-[46.875px] min-h-px min-w-px relative" data-name="Container">
      <div className="flex flex-row items-center overflow-clip rounded-[inherit] size-full">
        <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center pl-[16.997px] relative size-full">
          <StatusBadge10 />
        </div>
      </div>
    </div>
  );
}

function UserRow10() {
  return (
    <div className="absolute bg-white content-stretch flex h-[47.986px] items-start left-0 pb-[1.111px] pr-[60px] top-[623.84px] w-[1077.118px]" data-name="UserRow2">
      <div aria-hidden="true" className="absolute border-[#f0f0f0] border-b-[1.111px] border-solid inset-0 pointer-events-none" />
      <Container103 />
      <Container104 />
      <Container105 />
      <Container106 />
      <Container107 />
      <Container108 />
      <Container109 />
      <Container110 />
      <Container111 />
    </div>
  );
}

function Icon13() {
  return (
    <div className="relative shrink-0 size-[17.986px]" data-name="Icon">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 17.9861 17.9861">
        <g clipPath="url(#clip0_2151_5507)" id="Icon">
          <path d={svgPaths.p35af8f80} fill="var(--fill-0, white)" id="Vector" />
          <path d={svgPaths.p35af8f80} id="Vector_2" stroke="var(--stroke-0, #D0D5DD)" strokeWidth="1.49884" />
        </g>
        <defs>
          <clipPath id="clip0_2151_5507">
            <rect fill="white" height="17.9861" width="17.9861" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function TableCheckbox11() {
  return (
    <div className="relative rounded-[4px] shrink-0 size-[31.997px]" data-name="TableCheckbox">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center pl-[6.997px] pr-[7.014px] relative size-full">
        <Icon13 />
      </div>
    </div>
  );
}

function Container112() {
  return (
    <div className="h-[46.875px] relative shrink-0 w-[47.986px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center pl-[7.986px] pr-[8.004px] relative size-full">
        <TableCheckbox11 />
      </div>
    </div>
  );
}

function Text114() {
  return (
    <div className="h-[16.51px] relative shrink-0 w-[16.181px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start relative size-full">
        <p className="font-['Open_Sans:SemiBold',sans-serif] font-semibold leading-[16.5px] relative shrink-0 text-[11px] text-white whitespace-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
          SM
        </p>
      </div>
    </div>
  );
}

function Avatar11() {
  return (
    <div className="bg-[#e67e22] relative rounded-[37282700px] shrink-0 size-[30px]" data-name="Avatar">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center overflow-clip px-[6.91px] relative rounded-[inherit] size-full">
        <Text114 />
      </div>
    </div>
  );
}

function Text115() {
  return (
    <div className="h-[19.497px] relative shrink-0 w-[86.597px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start overflow-clip relative rounded-[inherit] size-full">
        <p className="font-['Open_Sans:Regular',sans-serif] font-normal leading-[19.5px] relative shrink-0 text-[#1d2939] text-[13px] whitespace-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
          Sandra Müller
        </p>
      </div>
    </div>
  );
}

function Container113() {
  return (
    <div className="flex-[1_0_0] h-[46.875px] min-h-px min-w-px relative" data-name="Container">
      <div className="flex flex-row items-center overflow-clip rounded-[inherit] size-full">
        <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[7.986px] items-center pl-[5.99px] relative size-full">
          <Avatar11 />
          <Text115 />
        </div>
      </div>
    </div>
  );
}

function Text116() {
  return (
    <div className="h-[19.497px] relative shrink-0 w-[80.694px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start overflow-clip relative rounded-[inherit] size-full">
        <p className="font-['Open_Sans:Regular',sans-serif] font-normal leading-[19.5px] relative shrink-0 text-[#262626] text-[13px] whitespace-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
          Transport Planner
        </p>
      </div>
    </div>
  );
}

function Container114() {
  return (
    <div className="flex-[1_0_0] h-[46.875px] min-h-px min-w-px relative" data-name="Container">
      <div className="flex flex-row items-center overflow-clip rounded-[inherit] size-full">
        <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center pl-[16.997px] relative size-full">
          <Text116 />
        </div>
      </div>
    </div>
  );
}

function Text117() {
  return (
    <div className="h-[19.497px] relative shrink-0 w-[80.712px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start overflow-clip relative rounded-[inherit] size-full">
        <p className="font-['Open_Sans:Regular',sans-serif] font-normal leading-[19.5px] relative shrink-0 text-[#262626] text-[13px] whitespace-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
          smuller@cityworks.net
        </p>
      </div>
    </div>
  );
}

function Container115() {
  return (
    <div className="flex-[1_0_0] h-[46.875px] min-h-px min-w-px relative" data-name="Container">
      <div className="flex flex-row items-center overflow-clip rounded-[inherit] size-full">
        <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center pl-[16.997px] relative size-full">
          <Text117 />
        </div>
      </div>
    </div>
  );
}

function Text118() {
  return (
    <div className="h-[19.497px] relative shrink-0 w-[60.781px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start overflow-clip relative rounded-[inherit] size-full">
        <p className="font-['Open_Sans:Regular',sans-serif] font-normal leading-[19.5px] relative shrink-0 text-[#262626] text-[13px] whitespace-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
          CityWorks
        </p>
      </div>
    </div>
  );
}

function Container116() {
  return (
    <div className="flex-[1_0_0] h-[46.875px] min-h-px min-w-px relative" data-name="Container">
      <div className="flex flex-row items-center overflow-clip rounded-[inherit] size-full">
        <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center pl-[16.997px] relative size-full">
          <Text118 />
        </div>
      </div>
    </div>
  );
}

function Text119() {
  return (
    <div className="h-[19.497px] relative shrink-0 w-[57.778px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start overflow-clip relative rounded-[inherit] size-full">
        <p className="font-['Open_Sans:Regular',sans-serif] font-normal leading-[19.5px] relative shrink-0 text-[#262626] text-[13px] whitespace-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
          New York
        </p>
      </div>
    </div>
  );
}

function Container117() {
  return (
    <div className="flex-[1_0_0] h-[46.875px] min-h-px min-w-px relative" data-name="Container">
      <div className="flex flex-row items-center overflow-clip rounded-[inherit] size-full">
        <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center pl-[16.997px] relative size-full">
          <Text119 />
        </div>
      </div>
    </div>
  );
}

function Text120() {
  return (
    <div className="h-[19.497px] relative shrink-0 w-[84.01px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start overflow-clip relative rounded-[inherit] size-full">
        <p className="font-['Open_Sans:Regular',sans-serif] font-normal leading-[19.5px] relative shrink-0 text-[#262626] text-[13px] whitespace-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
          Planning Engineer
        </p>
      </div>
    </div>
  );
}

function Container118() {
  return (
    <div className="flex-[1_0_0] h-[46.875px] min-h-px min-w-px relative" data-name="Container">
      <div className="flex flex-row items-center overflow-clip rounded-[inherit] size-full">
        <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center pl-[16.997px] relative size-full">
          <Text120 />
        </div>
      </div>
    </div>
  );
}

function Text121() {
  return (
    <div className="h-[19.497px] relative shrink-0 w-[80.694px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start overflow-clip relative rounded-[inherit] size-full">
        <p className="font-['Open_Sans:Regular',sans-serif] font-normal leading-[19.5px] relative shrink-0 text-[#262626] text-[13px] whitespace-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
          Project Member
        </p>
      </div>
    </div>
  );
}

function Container119() {
  return (
    <div className="flex-[1_0_0] h-[46.875px] min-h-px min-w-px relative" data-name="Container">
      <div className="flex flex-row items-center overflow-clip rounded-[inherit] size-full">
        <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center pl-[16.996px] relative size-full">
          <Text121 />
        </div>
      </div>
    </div>
  );
}

function Text122() {
  return <div className="absolute bg-[#ef4444] left-[7px] rounded-[37282700px] size-[5px] top-[7.74px]" data-name="Text" />;
}

function StatusBadge11() {
  return (
    <div className="bg-[#fef2f2] h-[20.503px] relative rounded-[37282700px] shrink-0 w-[81.91px]" data-name="StatusBadge">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <Text122 />
        <p className="-translate-x-1/2 absolute font-['Open_Sans:Regular',sans-serif] font-normal leading-[16.5px] left-[46px] text-[#b91c1c] text-[11px] text-center top-px whitespace-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
          Suspended
        </p>
      </div>
    </div>
  );
}

function Container120() {
  return (
    <div className="flex-[1_0_0] h-[46.875px] min-h-px min-w-px relative" data-name="Container">
      <div className="flex flex-row items-center overflow-clip rounded-[inherit] size-full">
        <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center pl-[16.997px] relative size-full">
          <StatusBadge11 />
        </div>
      </div>
    </div>
  );
}

function UserRow11() {
  return (
    <div className="absolute bg-white content-stretch flex h-[47.986px] items-start left-0 pb-[1.111px] pr-[60px] top-[671.82px] w-[1077.118px]" data-name="UserRow2">
      <div aria-hidden="true" className="absolute border-[#f0f0f0] border-b-[1.111px] border-solid inset-0 pointer-events-none" />
      <Container112 />
      <Container113 />
      <Container114 />
      <Container115 />
      <Container116 />
      <Container117 />
      <Container118 />
      <Container119 />
      <Container120 />
    </div>
  );
}

function ChevronTiny3() {
  return (
    <div className="relative size-[10px]" data-name="ChevronTiny">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 10 10">
        <g id="ChevronTiny">
          <path d="M3 2L7 5L3 8" id="Vector" stroke="var(--stroke-0, #4D7CFE)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
        </g>
      </svg>
    </div>
  );
}

function Text123() {
  return (
    <div className="absolute content-stretch flex h-[17.986px] items-start left-[27px] top-0 w-[58.108px]" data-name="Text">
      <p className="font-['Open_Sans:SemiBold',sans-serif] font-semibold leading-[18px] relative shrink-0 text-[#1e3a8a] text-[12px] whitespace-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
        Company:
      </p>
    </div>
  );
}

function Text124() {
  return (
    <div className="absolute content-stretch flex h-[17.986px] items-start left-[90.1px] overflow-clip top-0 w-[94.826px]" data-name="Text">
      <p className="font-['Open_Sans:Regular',sans-serif] font-normal leading-[18px] relative shrink-0 text-[#1e3a8a] text-[12px] whitespace-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
        Henrich Advisory
      </p>
    </div>
  );
}

function Text125() {
  return (
    <div className="absolute content-stretch flex h-[16.51px] items-start left-[192.92px] top-[0.73px] w-[12.778px]" data-name="Text">
      <p className="font-['Open_Sans:Regular',sans-serif] font-normal leading-[16.5px] relative shrink-0 text-[#6b7280] text-[11px] whitespace-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
        (4)
      </p>
    </div>
  );
}

function Container121() {
  return (
    <div className="flex-[1_0_0] h-[17.986px] min-h-px min-w-px relative" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid overflow-clip relative rounded-[inherit] size-full">
        <div className="absolute flex items-center justify-center left-[12px] size-[10px] top-[3.99px]" style={{ "--transform-inner-width": "1183", "--transform-inner-height": "22" } as React.CSSProperties}>
          <div className="flex-none rotate-90">
            <ChevronTiny3 />
          </div>
        </div>
        <Text123 />
        <Text124 />
        <Text125 />
      </div>
    </div>
  );
}

function GroupHeaderRow3() {
  return (
    <div className="absolute bg-[#ebf0ff] content-stretch flex h-[31.997px] items-center left-0 pb-[1.111px] pl-[3.333px] pr-[60px] top-[719.81px] w-[1077.118px]" data-name="GroupHeaderRow">
      <div aria-hidden="true" className="absolute border-[#4d7cfe] border-b-[1.111px] border-l-[3.333px] border-solid inset-0 pointer-events-none" />
      <Container121 />
    </div>
  );
}

function Icon14() {
  return (
    <div className="relative shrink-0 size-[17.986px]" data-name="Icon">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 17.9861 17.9861">
        <g clipPath="url(#clip0_2151_5507)" id="Icon">
          <path d={svgPaths.p35af8f80} fill="var(--fill-0, white)" id="Vector" />
          <path d={svgPaths.p35af8f80} id="Vector_2" stroke="var(--stroke-0, #D0D5DD)" strokeWidth="1.49884" />
        </g>
        <defs>
          <clipPath id="clip0_2151_5507">
            <rect fill="white" height="17.9861" width="17.9861" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function TableCheckbox12() {
  return (
    <div className="relative rounded-[4px] shrink-0 size-[31.997px]" data-name="TableCheckbox">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center pl-[6.997px] pr-[7.014px] relative size-full">
        <Icon14 />
      </div>
    </div>
  );
}

function Container122() {
  return (
    <div className="h-[46.875px] relative shrink-0 w-[47.986px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center pl-[7.986px] pr-[8.004px] relative size-full">
        <TableCheckbox12 />
      </div>
    </div>
  );
}

function Avatar12() {
  return (
    <div className="h-[30px] relative shrink-0 w-full" data-name="Avatar">
      <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgAvatar} />
    </div>
  );
}

function Container124() {
  return (
    <div className="relative rounded-[37282700px] shrink-0 size-[30px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start overflow-clip relative rounded-[inherit] size-full">
        <Avatar12 />
      </div>
    </div>
  );
}

function Text126() {
  return (
    <div className="h-[19.497px] relative shrink-0 w-[75.347px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start overflow-clip relative rounded-[inherit] size-full">
        <p className="font-['Open_Sans:Regular',sans-serif] font-normal leading-[19.5px] relative shrink-0 text-[#1d2939] text-[13px] whitespace-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
          Captain Levi
        </p>
      </div>
    </div>
  );
}

function Container123() {
  return (
    <div className="flex-[1_0_0] h-[46.875px] min-h-px min-w-px relative" data-name="Container">
      <div className="flex flex-row items-center overflow-clip rounded-[inherit] size-full">
        <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[7.986px] items-center pl-[5.99px] relative size-full">
          <Container124 />
          <Text126 />
        </div>
      </div>
    </div>
  );
}

function Text127() {
  return (
    <div className="h-[19.497px] relative shrink-0 w-[80.694px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start overflow-clip relative rounded-[inherit] size-full">
        <p className="font-['Open_Sans:Regular',sans-serif] font-normal leading-[19.5px] relative shrink-0 text-[#262626] text-[13px] whitespace-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
          VDC Manager
        </p>
      </div>
    </div>
  );
}

function Container125() {
  return (
    <div className="flex-[1_0_0] h-[46.875px] min-h-px min-w-px relative" data-name="Container">
      <div className="flex flex-row items-center overflow-clip rounded-[inherit] size-full">
        <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center pl-[16.997px] relative size-full">
          <Text127 />
        </div>
      </div>
    </div>
  );
}

function Text128() {
  return (
    <div className="h-[19.497px] relative shrink-0 w-[80.712px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start overflow-clip relative rounded-[inherit] size-full">
        <p className="font-['Open_Sans:Regular',sans-serif] font-normal leading-[19.5px] relative shrink-0 text-[#262626] text-[13px] whitespace-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
          levi@henrichadvisory.com
        </p>
      </div>
    </div>
  );
}

function Container126() {
  return (
    <div className="flex-[1_0_0] h-[46.875px] min-h-px min-w-px relative" data-name="Container">
      <div className="flex flex-row items-center overflow-clip rounded-[inherit] size-full">
        <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center pl-[16.997px] relative size-full">
          <Text128 />
        </div>
      </div>
    </div>
  );
}

function Text129() {
  return (
    <div className="h-[19.497px] relative shrink-0 w-[80.694px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start overflow-clip relative rounded-[inherit] size-full">
        <p className="font-['Open_Sans:Regular',sans-serif] font-normal leading-[19.5px] relative shrink-0 text-[#262626] text-[13px] whitespace-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
          Henrich Advisory
        </p>
      </div>
    </div>
  );
}

function Container127() {
  return (
    <div className="flex-[1_0_0] h-[46.875px] min-h-px min-w-px relative" data-name="Container">
      <div className="flex flex-row items-center overflow-clip rounded-[inherit] size-full">
        <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center pl-[16.997px] relative size-full">
          <Text129 />
        </div>
      </div>
    </div>
  );
}

function Text130() {
  return (
    <div className="h-[19.497px] relative shrink-0 w-[42.847px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start overflow-clip relative rounded-[inherit] size-full">
        <p className="font-['Open_Sans:Regular',sans-serif] font-normal leading-[19.5px] relative shrink-0 text-[#262626] text-[13px] whitespace-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
          Boston
        </p>
      </div>
    </div>
  );
}

function Container128() {
  return (
    <div className="flex-[1_0_0] h-[46.875px] min-h-px min-w-px relative" data-name="Container">
      <div className="flex flex-row items-center overflow-clip rounded-[inherit] size-full">
        <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center pl-[16.997px] relative size-full">
          <Text130 />
        </div>
      </div>
    </div>
  );
}

function Text131() {
  return (
    <div className="h-[19.497px] relative shrink-0 w-[82.535px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start overflow-clip relative rounded-[inherit] size-full">
        <p className="font-['Open_Sans:Regular',sans-serif] font-normal leading-[19.5px] relative shrink-0 text-[#262626] text-[13px] whitespace-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
          VDC Manager
        </p>
      </div>
    </div>
  );
}

function Container129() {
  return (
    <div className="flex-[1_0_0] h-[46.875px] min-h-px min-w-px relative" data-name="Container">
      <div className="flex flex-row items-center overflow-clip rounded-[inherit] size-full">
        <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center pl-[16.997px] relative size-full">
          <Text131 />
        </div>
      </div>
    </div>
  );
}

function Text132() {
  return (
    <div className="h-[19.497px] relative shrink-0 w-[80.694px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start overflow-clip relative rounded-[inherit] size-full">
        <p className="font-['Open_Sans:Regular',sans-serif] font-normal leading-[19.5px] relative shrink-0 text-[#262626] text-[13px] whitespace-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
          Project Admin
        </p>
      </div>
    </div>
  );
}

function Container130() {
  return (
    <div className="flex-[1_0_0] h-[46.875px] min-h-px min-w-px relative" data-name="Container">
      <div className="flex flex-row items-center overflow-clip rounded-[inherit] size-full">
        <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center pl-[16.996px] relative size-full">
          <Text132 />
        </div>
      </div>
    </div>
  );
}

function Text133() {
  return <div className="absolute bg-[#12b76a] left-[7px] rounded-[37282700px] size-[5px] top-[7.74px]" data-name="Text" />;
}

function StatusBadge12() {
  return (
    <div className="bg-[#ecfdf3] h-[20.503px] relative rounded-[37282700px] shrink-0 w-[55.451px]" data-name="StatusBadge">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <Text133 />
        <p className="-translate-x-1/2 absolute font-['Open_Sans:Regular',sans-serif] font-normal leading-[16.5px] left-[33.5px] text-[#027a48] text-[11px] text-center top-px whitespace-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
          Active
        </p>
      </div>
    </div>
  );
}

function Container131() {
  return (
    <div className="flex-[1_0_0] h-[46.875px] min-h-px min-w-px relative" data-name="Container">
      <div className="flex flex-row items-center overflow-clip rounded-[inherit] size-full">
        <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center pl-[16.997px] relative size-full">
          <StatusBadge12 />
        </div>
      </div>
    </div>
  );
}

function UserRow12() {
  return (
    <div className="absolute bg-white content-stretch flex h-[47.986px] items-start left-0 pb-[1.111px] pr-[60px] top-[751.81px] w-[1077.118px]" data-name="UserRow2">
      <div aria-hidden="true" className="absolute border-[#f0f0f0] border-b-[1.111px] border-solid inset-0 pointer-events-none" />
      <Container122 />
      <Container123 />
      <Container125 />
      <Container126 />
      <Container127 />
      <Container128 />
      <Container129 />
      <Container130 />
      <Container131 />
    </div>
  );
}

function Icon15() {
  return (
    <div className="relative shrink-0 size-[17.986px]" data-name="Icon">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 17.9861 17.9861">
        <g clipPath="url(#clip0_2151_5507)" id="Icon">
          <path d={svgPaths.p35af8f80} fill="var(--fill-0, white)" id="Vector" />
          <path d={svgPaths.p35af8f80} id="Vector_2" stroke="var(--stroke-0, #D0D5DD)" strokeWidth="1.49884" />
        </g>
        <defs>
          <clipPath id="clip0_2151_5507">
            <rect fill="white" height="17.9861" width="17.9861" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function TableCheckbox13() {
  return (
    <div className="relative rounded-[4px] shrink-0 size-[31.997px]" data-name="TableCheckbox">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center pl-[6.997px] pr-[7.014px] relative size-full">
        <Icon15 />
      </div>
    </div>
  );
}

function Container132() {
  return (
    <div className="h-[46.875px] relative shrink-0 w-[47.986px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center pl-[7.986px] pr-[8.004px] relative size-full">
        <TableCheckbox13 />
      </div>
    </div>
  );
}

function Text134() {
  return (
    <div className="h-[16.51px] relative shrink-0 w-[14.288px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start relative size-full">
        <p className="font-['Open_Sans:SemiBold',sans-serif] font-semibold leading-[16.5px] relative shrink-0 text-[11px] text-white whitespace-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
          AK
        </p>
      </div>
    </div>
  );
}

function Avatar13() {
  return (
    <div className="bg-[#2d8653] relative rounded-[37282700px] shrink-0 size-[30px]" data-name="Avatar">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center overflow-clip pl-[7.847px] pr-[7.865px] relative rounded-[inherit] size-full">
        <Text134 />
      </div>
    </div>
  );
}

function Text135() {
  return (
    <div className="h-[19.497px] relative shrink-0 w-[78.142px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start overflow-clip relative rounded-[inherit] size-full">
        <p className="font-['Open_Sans:Regular',sans-serif] font-normal leading-[19.5px] relative shrink-0 text-[#1d2939] text-[13px] whitespace-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
          Anna Kovacs
        </p>
      </div>
    </div>
  );
}

function Container133() {
  return (
    <div className="flex-[1_0_0] h-[46.875px] min-h-px min-w-px relative" data-name="Container">
      <div className="flex flex-row items-center overflow-clip rounded-[inherit] size-full">
        <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[7.986px] items-center pl-[5.99px] relative size-full">
          <Avatar13 />
          <Text135 />
        </div>
      </div>
    </div>
  );
}

function Text136() {
  return (
    <div className="h-[19.497px] relative shrink-0 w-[80.694px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start overflow-clip relative rounded-[inherit] size-full">
        <p className="font-['Open_Sans:Regular',sans-serif] font-normal leading-[19.5px] relative shrink-0 text-[#262626] text-[13px] whitespace-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
          BIM Coordinator
        </p>
      </div>
    </div>
  );
}

function Container134() {
  return (
    <div className="flex-[1_0_0] h-[46.875px] min-h-px min-w-px relative" data-name="Container">
      <div className="flex flex-row items-center overflow-clip rounded-[inherit] size-full">
        <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center pl-[16.997px] relative size-full">
          <Text136 />
        </div>
      </div>
    </div>
  );
}

function Text137() {
  return (
    <div className="h-[19.497px] relative shrink-0 w-[80.712px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start overflow-clip relative rounded-[inherit] size-full">
        <p className="font-['Open_Sans:Regular',sans-serif] font-normal leading-[19.5px] relative shrink-0 text-[#262626] text-[13px] whitespace-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
          anna.k@henrichadvisory.com
        </p>
      </div>
    </div>
  );
}

function Container135() {
  return (
    <div className="flex-[1_0_0] h-[46.875px] min-h-px min-w-px relative" data-name="Container">
      <div className="flex flex-row items-center overflow-clip rounded-[inherit] size-full">
        <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center pl-[16.997px] relative size-full">
          <Text137 />
        </div>
      </div>
    </div>
  );
}

function Text138() {
  return (
    <div className="h-[19.497px] relative shrink-0 w-[80.694px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start overflow-clip relative rounded-[inherit] size-full">
        <p className="font-['Open_Sans:Regular',sans-serif] font-normal leading-[19.5px] relative shrink-0 text-[#262626] text-[13px] whitespace-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
          Henrich Advisory
        </p>
      </div>
    </div>
  );
}

function Container136() {
  return (
    <div className="flex-[1_0_0] h-[46.875px] min-h-px min-w-px relative" data-name="Container">
      <div className="flex flex-row items-center overflow-clip rounded-[inherit] size-full">
        <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center pl-[16.997px] relative size-full">
          <Text138 />
        </div>
      </div>
    </div>
  );
}

function Text139() {
  return (
    <div className="h-[19.497px] relative shrink-0 w-[42.847px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start overflow-clip relative rounded-[inherit] size-full">
        <p className="font-['Open_Sans:Regular',sans-serif] font-normal leading-[19.5px] relative shrink-0 text-[#262626] text-[13px] whitespace-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
          Boston
        </p>
      </div>
    </div>
  );
}

function Container137() {
  return (
    <div className="flex-[1_0_0] h-[46.875px] min-h-px min-w-px relative" data-name="Container">
      <div className="flex flex-row items-center overflow-clip rounded-[inherit] size-full">
        <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center pl-[16.997px] relative size-full">
          <Text139 />
        </div>
      </div>
    </div>
  );
}

function Text140() {
  return (
    <div className="h-[19.497px] relative shrink-0 w-[84.01px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start overflow-clip relative rounded-[inherit] size-full">
        <p className="font-['Open_Sans:Regular',sans-serif] font-normal leading-[19.5px] relative shrink-0 text-[#262626] text-[13px] whitespace-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
          BIM Coordinator
        </p>
      </div>
    </div>
  );
}

function Container138() {
  return (
    <div className="flex-[1_0_0] h-[46.875px] min-h-px min-w-px relative" data-name="Container">
      <div className="flex flex-row items-center overflow-clip rounded-[inherit] size-full">
        <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center pl-[16.997px] relative size-full">
          <Text140 />
        </div>
      </div>
    </div>
  );
}

function Text141() {
  return (
    <div className="h-[19.497px] relative shrink-0 w-[80.694px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start overflow-clip relative rounded-[inherit] size-full">
        <p className="font-['Open_Sans:Regular',sans-serif] font-normal leading-[19.5px] relative shrink-0 text-[#262626] text-[13px] whitespace-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
          Project Member
        </p>
      </div>
    </div>
  );
}

function Container139() {
  return (
    <div className="flex-[1_0_0] h-[46.875px] min-h-px min-w-px relative" data-name="Container">
      <div className="flex flex-row items-center overflow-clip rounded-[inherit] size-full">
        <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center pl-[16.996px] relative size-full">
          <Text141 />
        </div>
      </div>
    </div>
  );
}

function Text142() {
  return <div className="absolute bg-[#12b76a] left-[7px] rounded-[37282700px] size-[5px] top-[7.74px]" data-name="Text" />;
}

function StatusBadge13() {
  return (
    <div className="bg-[#ecfdf3] h-[20.503px] relative rounded-[37282700px] shrink-0 w-[55.451px]" data-name="StatusBadge">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <Text142 />
        <p className="-translate-x-1/2 absolute font-['Open_Sans:Regular',sans-serif] font-normal leading-[16.5px] left-[33.5px] text-[#027a48] text-[11px] text-center top-px whitespace-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
          Active
        </p>
      </div>
    </div>
  );
}

function Container140() {
  return (
    <div className="flex-[1_0_0] h-[46.875px] min-h-px min-w-px relative" data-name="Container">
      <div className="flex flex-row items-center overflow-clip rounded-[inherit] size-full">
        <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center pl-[16.997px] relative size-full">
          <StatusBadge13 />
        </div>
      </div>
    </div>
  );
}

function UserRow13() {
  return (
    <div className="absolute bg-white content-stretch flex h-[47.986px] items-start left-0 pb-[1.111px] pr-[60px] top-[799.79px] w-[1077.118px]" data-name="UserRow2">
      <div aria-hidden="true" className="absolute border-[#f0f0f0] border-b-[1.111px] border-solid inset-0 pointer-events-none" />
      <Container132 />
      <Container133 />
      <Container134 />
      <Container135 />
      <Container136 />
      <Container137 />
      <Container138 />
      <Container139 />
      <Container140 />
    </div>
  );
}

function Icon16() {
  return (
    <div className="relative shrink-0 size-[17.986px]" data-name="Icon">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 17.9861 17.9861">
        <g clipPath="url(#clip0_2151_5507)" id="Icon">
          <path d={svgPaths.p35af8f80} fill="var(--fill-0, white)" id="Vector" />
          <path d={svgPaths.p35af8f80} id="Vector_2" stroke="var(--stroke-0, #D0D5DD)" strokeWidth="1.49884" />
        </g>
        <defs>
          <clipPath id="clip0_2151_5507">
            <rect fill="white" height="17.9861" width="17.9861" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function TableCheckbox14() {
  return (
    <div className="relative rounded-[4px] shrink-0 size-[31.997px]" data-name="TableCheckbox">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center pl-[6.997px] pr-[7.014px] relative size-full">
        <Icon16 />
      </div>
    </div>
  );
}

function Container141() {
  return (
    <div className="h-[46.875px] relative shrink-0 w-[47.986px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center pl-[7.986px] pr-[8.004px] relative size-full">
        <TableCheckbox14 />
      </div>
    </div>
  );
}

function Text143() {
  return (
    <div className="h-[16.51px] relative shrink-0 w-[17.153px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start relative size-full">
        <p className="font-['Open_Sans:SemiBold',sans-serif] font-semibold leading-[16.5px] relative shrink-0 text-[11px] text-white whitespace-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
          MR
        </p>
      </div>
    </div>
  );
}

function Avatar14() {
  return (
    <div className="bg-[#9b59b6] relative rounded-[37282700px] shrink-0 size-[30px]" data-name="Avatar">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center overflow-clip px-[6.424px] relative rounded-[inherit] size-full">
        <Text143 />
      </div>
    </div>
  );
}

function Text144() {
  return (
    <div className="h-[19.497px] relative shrink-0 w-[79.757px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start overflow-clip relative rounded-[inherit] size-full">
        <p className="font-['Open_Sans:Regular',sans-serif] font-normal leading-[19.5px] relative shrink-0 text-[#1d2939] text-[13px] whitespace-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
          Marcus Reed
        </p>
      </div>
    </div>
  );
}

function Container142() {
  return (
    <div className="flex-[1_0_0] h-[46.875px] min-h-px min-w-px relative" data-name="Container">
      <div className="flex flex-row items-center overflow-clip rounded-[inherit] size-full">
        <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[7.986px] items-center pl-[5.99px] relative size-full">
          <Avatar14 />
          <Text144 />
        </div>
      </div>
    </div>
  );
}

function Text145() {
  return (
    <div className="h-[19.497px] relative shrink-0 w-[80.694px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start overflow-clip relative rounded-[inherit] size-full">
        <p className="font-['Open_Sans:Regular',sans-serif] font-normal leading-[19.5px] relative shrink-0 text-[#262626] text-[13px] whitespace-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
          Site Supervisor
        </p>
      </div>
    </div>
  );
}

function Container143() {
  return (
    <div className="flex-[1_0_0] h-[46.875px] min-h-px min-w-px relative" data-name="Container">
      <div className="flex flex-row items-center overflow-clip rounded-[inherit] size-full">
        <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center pl-[16.997px] relative size-full">
          <Text145 />
        </div>
      </div>
    </div>
  );
}

function Text146() {
  return (
    <div className="h-[19.497px] relative shrink-0 w-[80.712px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start overflow-clip relative rounded-[inherit] size-full">
        <p className="font-['Open_Sans:Regular',sans-serif] font-normal leading-[19.5px] relative shrink-0 text-[#262626] text-[13px] whitespace-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
          mreed@henrichadvisory.com
        </p>
      </div>
    </div>
  );
}

function Container144() {
  return (
    <div className="flex-[1_0_0] h-[46.875px] min-h-px min-w-px relative" data-name="Container">
      <div className="flex flex-row items-center overflow-clip rounded-[inherit] size-full">
        <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center pl-[16.997px] relative size-full">
          <Text146 />
        </div>
      </div>
    </div>
  );
}

function Text147() {
  return (
    <div className="h-[19.497px] relative shrink-0 w-[80.694px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start overflow-clip relative rounded-[inherit] size-full">
        <p className="font-['Open_Sans:Regular',sans-serif] font-normal leading-[19.5px] relative shrink-0 text-[#262626] text-[13px] whitespace-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
          Henrich Advisory
        </p>
      </div>
    </div>
  );
}

function Container145() {
  return (
    <div className="flex-[1_0_0] h-[46.875px] min-h-px min-w-px relative" data-name="Container">
      <div className="flex flex-row items-center overflow-clip rounded-[inherit] size-full">
        <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center pl-[16.997px] relative size-full">
          <Text147 />
        </div>
      </div>
    </div>
  );
}

function Text148() {
  return (
    <div className="h-[19.497px] relative shrink-0 w-[57.778px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start overflow-clip relative rounded-[inherit] size-full">
        <p className="font-['Open_Sans:Regular',sans-serif] font-normal leading-[19.5px] relative shrink-0 text-[#262626] text-[13px] whitespace-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
          New York
        </p>
      </div>
    </div>
  );
}

function Container146() {
  return (
    <div className="flex-[1_0_0] h-[46.875px] min-h-px min-w-px relative" data-name="Container">
      <div className="flex flex-row items-center overflow-clip rounded-[inherit] size-full">
        <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center pl-[16.997px] relative size-full">
          <Text148 />
        </div>
      </div>
    </div>
  );
}

function Text149() {
  return (
    <div className="h-[19.497px] relative shrink-0 w-[84.01px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start overflow-clip relative rounded-[inherit] size-full">
        <p className="font-['Open_Sans:Regular',sans-serif] font-normal leading-[19.5px] relative shrink-0 text-[#262626] text-[13px] whitespace-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
          Superintendent
        </p>
      </div>
    </div>
  );
}

function Container147() {
  return (
    <div className="flex-[1_0_0] h-[46.875px] min-h-px min-w-px relative" data-name="Container">
      <div className="flex flex-row items-center overflow-clip rounded-[inherit] size-full">
        <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center pl-[16.997px] relative size-full">
          <Text149 />
        </div>
      </div>
    </div>
  );
}

function Text150() {
  return (
    <div className="h-[19.497px] relative shrink-0 w-[80.694px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start overflow-clip relative rounded-[inherit] size-full">
        <p className="font-['Open_Sans:Regular',sans-serif] font-normal leading-[19.5px] relative shrink-0 text-[#262626] text-[13px] whitespace-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
          Project Member
        </p>
      </div>
    </div>
  );
}

function Container148() {
  return (
    <div className="flex-[1_0_0] h-[46.875px] min-h-px min-w-px relative" data-name="Container">
      <div className="flex flex-row items-center overflow-clip rounded-[inherit] size-full">
        <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center pl-[16.996px] relative size-full">
          <Text150 />
        </div>
      </div>
    </div>
  );
}

function Text151() {
  return <div className="absolute bg-[#ef4444] left-[7px] rounded-[37282700px] size-[5px] top-[7.74px]" data-name="Text" />;
}

function StatusBadge14() {
  return (
    <div className="bg-[#fef2f2] h-[20.503px] relative rounded-[37282700px] shrink-0 w-[81.91px]" data-name="StatusBadge">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <Text151 />
        <p className="-translate-x-1/2 absolute font-['Open_Sans:Regular',sans-serif] font-normal leading-[16.5px] left-[46px] text-[#b91c1c] text-[11px] text-center top-px whitespace-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
          Suspended
        </p>
      </div>
    </div>
  );
}

function Container149() {
  return (
    <div className="flex-[1_0_0] h-[46.875px] min-h-px min-w-px relative" data-name="Container">
      <div className="flex flex-row items-center overflow-clip rounded-[inherit] size-full">
        <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center pl-[16.997px] relative size-full">
          <StatusBadge14 />
        </div>
      </div>
    </div>
  );
}

function UserRow14() {
  return (
    <div className="absolute bg-white content-stretch flex h-[47.986px] items-start left-0 pb-[1.111px] pr-[60px] top-[847.78px] w-[1077.118px]" data-name="UserRow2">
      <div aria-hidden="true" className="absolute border-[#f0f0f0] border-b-[1.111px] border-solid inset-0 pointer-events-none" />
      <Container141 />
      <Container142 />
      <Container143 />
      <Container144 />
      <Container145 />
      <Container146 />
      <Container147 />
      <Container148 />
      <Container149 />
    </div>
  );
}

function Icon17() {
  return (
    <div className="relative shrink-0 size-[17.986px]" data-name="Icon">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 17.9861 17.9861">
        <g clipPath="url(#clip0_2151_5507)" id="Icon">
          <path d={svgPaths.p35af8f80} fill="var(--fill-0, white)" id="Vector" />
          <path d={svgPaths.p35af8f80} id="Vector_2" stroke="var(--stroke-0, #D0D5DD)" strokeWidth="1.49884" />
        </g>
        <defs>
          <clipPath id="clip0_2151_5507">
            <rect fill="white" height="17.9861" width="17.9861" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function TableCheckbox15() {
  return (
    <div className="relative rounded-[4px] shrink-0 size-[31.997px]" data-name="TableCheckbox">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center pl-[6.997px] pr-[7.014px] relative size-full">
        <Icon17 />
      </div>
    </div>
  );
}

function Container150() {
  return (
    <div className="h-[46.875px] relative shrink-0 w-[47.986px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center pl-[7.986px] pr-[8.004px] relative size-full">
        <TableCheckbox15 />
      </div>
    </div>
  );
}

function Text152() {
  return (
    <div className="h-[16.51px] relative shrink-0 w-[18.455px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start relative size-full">
        <p className="font-['Open_Sans:SemiBold',sans-serif] font-semibold leading-[16.5px] relative shrink-0 text-[11px] text-white whitespace-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
          DW
        </p>
      </div>
    </div>
  );
}

function Avatar15() {
  return (
    <div className="bg-[#e67e22] relative rounded-[37282700px] shrink-0 size-[30px]" data-name="Avatar">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center overflow-clip pl-[5.764px] pr-[5.781px] relative rounded-[inherit] size-full">
        <Text152 />
      </div>
    </div>
  );
}

function Text153() {
  return (
    <div className="h-[19.497px] relative shrink-0 w-[91.215px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start overflow-clip relative rounded-[inherit] size-full">
        <p className="font-['Open_Sans:Regular',sans-serif] font-normal leading-[19.5px] relative shrink-0 text-[#1d2939] text-[13px] whitespace-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
          Dana Whitfield
        </p>
      </div>
    </div>
  );
}

function Container151() {
  return (
    <div className="flex-[1_0_0] h-[46.875px] min-h-px min-w-px relative" data-name="Container">
      <div className="flex flex-row items-center overflow-clip rounded-[inherit] size-full">
        <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[7.986px] items-center pl-[5.99px] relative size-full">
          <Avatar15 />
          <Text153 />
        </div>
      </div>
    </div>
  );
}

function Text154() {
  return (
    <div className="h-[19.497px] relative shrink-0 w-[80.694px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start overflow-clip relative rounded-[inherit] size-full">
        <p className="font-['Open_Sans:Regular',sans-serif] font-normal leading-[19.5px] relative shrink-0 text-[#262626] text-[13px] whitespace-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
          Project Architect
        </p>
      </div>
    </div>
  );
}

function Container152() {
  return (
    <div className="flex-[1_0_0] h-[46.875px] min-h-px min-w-px relative" data-name="Container">
      <div className="flex flex-row items-center overflow-clip rounded-[inherit] size-full">
        <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center pl-[16.997px] relative size-full">
          <Text154 />
        </div>
      </div>
    </div>
  );
}

function Text155() {
  return (
    <div className="h-[19.497px] relative shrink-0 w-[80.712px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start overflow-clip relative rounded-[inherit] size-full">
        <p className="font-['Open_Sans:Regular',sans-serif] font-normal leading-[19.5px] relative shrink-0 text-[#262626] text-[13px] whitespace-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
          dana@henrichadvisory.com
        </p>
      </div>
    </div>
  );
}

function Container153() {
  return (
    <div className="flex-[1_0_0] h-[46.875px] min-h-px min-w-px relative" data-name="Container">
      <div className="flex flex-row items-center overflow-clip rounded-[inherit] size-full">
        <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center pl-[16.997px] relative size-full">
          <Text155 />
        </div>
      </div>
    </div>
  );
}

function Text156() {
  return (
    <div className="h-[19.497px] relative shrink-0 w-[80.694px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start overflow-clip relative rounded-[inherit] size-full">
        <p className="font-['Open_Sans:Regular',sans-serif] font-normal leading-[19.5px] relative shrink-0 text-[#262626] text-[13px] whitespace-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
          Henrich Advisory
        </p>
      </div>
    </div>
  );
}

function Container154() {
  return (
    <div className="flex-[1_0_0] h-[46.875px] min-h-px min-w-px relative" data-name="Container">
      <div className="flex flex-row items-center overflow-clip rounded-[inherit] size-full">
        <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center pl-[16.997px] relative size-full">
          <Text156 />
        </div>
      </div>
    </div>
  );
}

function Text157() {
  return (
    <div className="h-[19.497px] relative shrink-0 w-[57.778px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start overflow-clip relative rounded-[inherit] size-full">
        <p className="font-['Open_Sans:Regular',sans-serif] font-normal leading-[19.5px] relative shrink-0 text-[#262626] text-[13px] whitespace-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
          New York
        </p>
      </div>
    </div>
  );
}

function Container155() {
  return (
    <div className="flex-[1_0_0] h-[46.875px] min-h-px min-w-px relative" data-name="Container">
      <div className="flex flex-row items-center overflow-clip rounded-[inherit] size-full">
        <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center pl-[16.997px] relative size-full">
          <Text157 />
        </div>
      </div>
    </div>
  );
}

function Text158() {
  return (
    <div className="h-[19.497px] relative shrink-0 w-[53.819px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start overflow-clip relative rounded-[inherit] size-full">
        <p className="font-['Open_Sans:Regular',sans-serif] font-normal leading-[19.5px] relative shrink-0 text-[#262626] text-[13px] whitespace-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
          Architect
        </p>
      </div>
    </div>
  );
}

function Container156() {
  return (
    <div className="flex-[1_0_0] h-[46.875px] min-h-px min-w-px relative" data-name="Container">
      <div className="flex flex-row items-center overflow-clip rounded-[inherit] size-full">
        <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center pl-[16.997px] relative size-full">
          <Text158 />
        </div>
      </div>
    </div>
  );
}

function Text159() {
  return (
    <div className="h-[19.497px] relative shrink-0 w-[80.694px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start overflow-clip relative rounded-[inherit] size-full">
        <p className="font-['Open_Sans:Regular',sans-serif] font-normal leading-[19.5px] relative shrink-0 text-[#262626] text-[13px] whitespace-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
          Project Admin
        </p>
      </div>
    </div>
  );
}

function Container157() {
  return (
    <div className="flex-[1_0_0] h-[46.875px] min-h-px min-w-px relative" data-name="Container">
      <div className="flex flex-row items-center overflow-clip rounded-[inherit] size-full">
        <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center pl-[16.996px] relative size-full">
          <Text159 />
        </div>
      </div>
    </div>
  );
}

function Text160() {
  return <div className="absolute bg-[#12b76a] left-[7px] rounded-[37282700px] size-[5px] top-[7.74px]" data-name="Text" />;
}

function StatusBadge15() {
  return (
    <div className="bg-[#ecfdf3] h-[20.503px] relative rounded-[37282700px] shrink-0 w-[55.451px]" data-name="StatusBadge">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <Text160 />
        <p className="-translate-x-1/2 absolute font-['Open_Sans:Regular',sans-serif] font-normal leading-[16.5px] left-[33.5px] text-[#027a48] text-[11px] text-center top-px whitespace-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
          Active
        </p>
      </div>
    </div>
  );
}

function Container158() {
  return (
    <div className="flex-[1_0_0] h-[46.875px] min-h-px min-w-px relative" data-name="Container">
      <div className="flex flex-row items-center overflow-clip rounded-[inherit] size-full">
        <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center pl-[16.997px] relative size-full">
          <StatusBadge15 />
        </div>
      </div>
    </div>
  );
}

function UserRow15() {
  return (
    <div className="absolute bg-white content-stretch flex h-[47.986px] items-start left-0 pb-[1.111px] pr-[60px] top-[895.76px] w-[1077.118px]" data-name="UserRow2">
      <div aria-hidden="true" className="absolute border-[#f0f0f0] border-b-[1.111px] border-solid inset-0 pointer-events-none" />
      <Container150 />
      <Container151 />
      <Container152 />
      <Container153 />
      <Container154 />
      <Container155 />
      <Container156 />
      <Container157 />
      <Container158 />
    </div>
  );
}

function ChevronTiny4() {
  return (
    <div className="relative size-[10px]" data-name="ChevronTiny">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 10 10">
        <g id="ChevronTiny">
          <path d="M3 2L7 5L3 8" id="Vector" stroke="var(--stroke-0, #4D7CFE)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
        </g>
      </svg>
    </div>
  );
}

function Text161() {
  return (
    <div className="absolute content-stretch flex h-[17.986px] items-start left-[27px] top-0 w-[58.108px]" data-name="Text">
      <p className="font-['Open_Sans:SemiBold',sans-serif] font-semibold leading-[18px] relative shrink-0 text-[#1e3a8a] text-[12px] whitespace-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
        Company:
      </p>
    </div>
  );
}

function Text162() {
  return (
    <div className="absolute content-stretch flex h-[17.986px] items-start left-[90.1px] overflow-clip top-0 w-[88.455px]" data-name="Text">
      <p className="font-['Open_Sans:Regular',sans-serif] font-normal leading-[18px] relative shrink-0 text-[#1e3a8a] text-[12px] whitespace-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
        Meridian Group
      </p>
    </div>
  );
}

function Text163() {
  return (
    <div className="absolute content-stretch flex h-[16.51px] items-start left-[186.55px] top-[0.73px] w-[12.778px]" data-name="Text">
      <p className="font-['Open_Sans:Regular',sans-serif] font-normal leading-[16.5px] relative shrink-0 text-[#6b7280] text-[11px] whitespace-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
        (3)
      </p>
    </div>
  );
}

function Container159() {
  return (
    <div className="flex-[1_0_0] h-[17.986px] min-h-px min-w-px relative" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid overflow-clip relative rounded-[inherit] size-full">
        <div className="absolute flex items-center justify-center left-[12px] size-[10px] top-[3.99px]" style={{ "--transform-inner-width": "1183", "--transform-inner-height": "22" } as React.CSSProperties}>
          <div className="flex-none rotate-90">
            <ChevronTiny4 />
          </div>
        </div>
        <Text161 />
        <Text162 />
        <Text163 />
      </div>
    </div>
  );
}

function GroupHeaderRow4() {
  return (
    <div className="absolute bg-[#ebf0ff] content-stretch flex h-[31.997px] items-center left-0 pb-[1.111px] pl-[3.333px] pr-[60px] top-[943.75px] w-[1077.118px]" data-name="GroupHeaderRow">
      <div aria-hidden="true" className="absolute border-[#4d7cfe] border-b-[1.111px] border-l-[3.333px] border-solid inset-0 pointer-events-none" />
      <Container159 />
    </div>
  );
}

function Icon18() {
  return (
    <div className="relative shrink-0 size-[17.986px]" data-name="Icon">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 17.9861 17.9861">
        <g clipPath="url(#clip0_2151_5507)" id="Icon">
          <path d={svgPaths.p35af8f80} fill="var(--fill-0, white)" id="Vector" />
          <path d={svgPaths.p35af8f80} id="Vector_2" stroke="var(--stroke-0, #D0D5DD)" strokeWidth="1.49884" />
        </g>
        <defs>
          <clipPath id="clip0_2151_5507">
            <rect fill="white" height="17.9861" width="17.9861" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function TableCheckbox16() {
  return (
    <div className="relative rounded-[4px] shrink-0 size-[31.997px]" data-name="TableCheckbox">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center pl-[6.997px] pr-[7.014px] relative size-full">
        <Icon18 />
      </div>
    </div>
  );
}

function Container160() {
  return (
    <div className="h-[46.875px] relative shrink-0 w-[47.986px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center pl-[7.986px] pr-[8.004px] relative size-full">
        <TableCheckbox16 />
      </div>
    </div>
  );
}

function Text164() {
  return (
    <div className="h-[16.51px] relative shrink-0 w-[15.903px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start relative size-full">
        <p className="font-['Open_Sans:SemiBold',sans-serif] font-semibold leading-[16.5px] relative shrink-0 text-[11px] text-white whitespace-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
          OB
        </p>
      </div>
    </div>
  );
}

function Avatar16() {
  return (
    <div className="bg-[#8e44ad] relative rounded-[37282700px] shrink-0 size-[30px]" data-name="Avatar">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center overflow-clip px-[7.049px] relative rounded-[inherit] size-full">
        <Text164 />
      </div>
    </div>
  );
}

function Text165() {
  return (
    <div className="h-[19.497px] relative shrink-0 w-[76.007px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start overflow-clip relative rounded-[inherit] size-full">
        <p className="font-['Open_Sans:Regular',sans-serif] font-normal leading-[19.5px] relative shrink-0 text-[#1d2939] text-[13px] whitespace-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
          Owen Burke
        </p>
      </div>
    </div>
  );
}

function Container161() {
  return (
    <div className="flex-[1_0_0] h-[46.875px] min-h-px min-w-px relative" data-name="Container">
      <div className="flex flex-row items-center overflow-clip rounded-[inherit] size-full">
        <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[7.986px] items-center pl-[5.99px] relative size-full">
          <Avatar16 />
          <Text165 />
        </div>
      </div>
    </div>
  );
}

function Text166() {
  return (
    <div className="h-[19.497px] relative shrink-0 w-[80.694px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start overflow-clip relative rounded-[inherit] size-full">
        <p className="font-['Open_Sans:Regular',sans-serif] font-normal leading-[19.5px] relative shrink-0 text-[#262626] text-[13px] whitespace-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
          Contracts Manager
        </p>
      </div>
    </div>
  );
}

function Container162() {
  return (
    <div className="flex-[1_0_0] h-[46.875px] min-h-px min-w-px relative" data-name="Container">
      <div className="flex flex-row items-center overflow-clip rounded-[inherit] size-full">
        <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center pl-[16.997px] relative size-full">
          <Text166 />
        </div>
      </div>
    </div>
  );
}

function Text167() {
  return (
    <div className="h-[19.497px] relative shrink-0 w-[80.712px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start overflow-clip relative rounded-[inherit] size-full">
        <p className="font-['Open_Sans:Regular',sans-serif] font-normal leading-[19.5px] relative shrink-0 text-[#262626] text-[13px] whitespace-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
          oburke@meridiangrp.com
        </p>
      </div>
    </div>
  );
}

function Container163() {
  return (
    <div className="flex-[1_0_0] h-[46.875px] min-h-px min-w-px relative" data-name="Container">
      <div className="flex flex-row items-center overflow-clip rounded-[inherit] size-full">
        <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center pl-[16.997px] relative size-full">
          <Text167 />
        </div>
      </div>
    </div>
  );
}

function Text168() {
  return (
    <div className="h-[19.497px] relative shrink-0 w-[80.694px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start overflow-clip relative rounded-[inherit] size-full">
        <p className="font-['Open_Sans:Regular',sans-serif] font-normal leading-[19.5px] relative shrink-0 text-[#262626] text-[13px] whitespace-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
          Meridian Group
        </p>
      </div>
    </div>
  );
}

function Container164() {
  return (
    <div className="flex-[1_0_0] h-[46.875px] min-h-px min-w-px relative" data-name="Container">
      <div className="flex flex-row items-center overflow-clip rounded-[inherit] size-full">
        <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center pl-[16.997px] relative size-full">
          <Text168 />
        </div>
      </div>
    </div>
  );
}

function Text169() {
  return (
    <div className="h-[19.497px] relative shrink-0 w-[57.778px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start overflow-clip relative rounded-[inherit] size-full">
        <p className="font-['Open_Sans:Regular',sans-serif] font-normal leading-[19.5px] relative shrink-0 text-[#262626] text-[13px] whitespace-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
          New York
        </p>
      </div>
    </div>
  );
}

function Container165() {
  return (
    <div className="flex-[1_0_0] h-[46.875px] min-h-px min-w-px relative" data-name="Container">
      <div className="flex flex-row items-center overflow-clip rounded-[inherit] size-full">
        <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center pl-[16.997px] relative size-full">
          <Text169 />
        </div>
      </div>
    </div>
  );
}

function Text170() {
  return (
    <div className="h-[19.497px] relative shrink-0 w-[84.01px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start overflow-clip relative rounded-[inherit] size-full">
        <p className="font-['Open_Sans:Regular',sans-serif] font-normal leading-[19.5px] relative shrink-0 text-[#262626] text-[13px] whitespace-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
          Contracts Manager
        </p>
      </div>
    </div>
  );
}

function Container166() {
  return (
    <div className="flex-[1_0_0] h-[46.875px] min-h-px min-w-px relative" data-name="Container">
      <div className="flex flex-row items-center overflow-clip rounded-[inherit] size-full">
        <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center pl-[16.997px] relative size-full">
          <Text170 />
        </div>
      </div>
    </div>
  );
}

function Text171() {
  return (
    <div className="h-[19.497px] relative shrink-0 w-[80.694px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start overflow-clip relative rounded-[inherit] size-full">
        <p className="font-['Open_Sans:Regular',sans-serif] font-normal leading-[19.5px] relative shrink-0 text-[#262626] text-[13px] whitespace-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
          Project Admin
        </p>
      </div>
    </div>
  );
}

function Container167() {
  return (
    <div className="flex-[1_0_0] h-[46.875px] min-h-px min-w-px relative" data-name="Container">
      <div className="flex flex-row items-center overflow-clip rounded-[inherit] size-full">
        <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center pl-[16.996px] relative size-full">
          <Text171 />
        </div>
      </div>
    </div>
  );
}

function Text172() {
  return <div className="absolute bg-[#12b76a] left-[7px] rounded-[37282700px] size-[5px] top-[7.74px]" data-name="Text" />;
}

function StatusBadge16() {
  return (
    <div className="bg-[#ecfdf3] h-[20.503px] relative rounded-[37282700px] shrink-0 w-[55.451px]" data-name="StatusBadge">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <Text172 />
        <p className="-translate-x-1/2 absolute font-['Open_Sans:Regular',sans-serif] font-normal leading-[16.5px] left-[33.5px] text-[#027a48] text-[11px] text-center top-px whitespace-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
          Active
        </p>
      </div>
    </div>
  );
}

function Container168() {
  return (
    <div className="flex-[1_0_0] h-[46.875px] min-h-px min-w-px relative" data-name="Container">
      <div className="flex flex-row items-center overflow-clip rounded-[inherit] size-full">
        <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center pl-[16.997px] relative size-full">
          <StatusBadge16 />
        </div>
      </div>
    </div>
  );
}

function UserRow16() {
  return (
    <div className="absolute bg-white content-stretch flex h-[47.986px] items-start left-0 pb-[1.111px] pr-[60px] top-[975.75px] w-[1077.118px]" data-name="UserRow2">
      <div aria-hidden="true" className="absolute border-[#f0f0f0] border-b-[1.111px] border-solid inset-0 pointer-events-none" />
      <Container160 />
      <Container161 />
      <Container162 />
      <Container163 />
      <Container164 />
      <Container165 />
      <Container166 />
      <Container167 />
      <Container168 />
    </div>
  );
}

function Icon19() {
  return (
    <div className="relative shrink-0 size-[17.986px]" data-name="Icon">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 17.9861 17.9861">
        <g clipPath="url(#clip0_2151_5507)" id="Icon">
          <path d={svgPaths.p35af8f80} fill="var(--fill-0, white)" id="Vector" />
          <path d={svgPaths.p35af8f80} id="Vector_2" stroke="var(--stroke-0, #D0D5DD)" strokeWidth="1.49884" />
        </g>
        <defs>
          <clipPath id="clip0_2151_5507">
            <rect fill="white" height="17.9861" width="17.9861" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function TableCheckbox17() {
  return (
    <div className="relative rounded-[4px] shrink-0 size-[31.997px]" data-name="TableCheckbox">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center pl-[6.997px] pr-[7.014px] relative size-full">
        <Icon19 />
      </div>
    </div>
  );
}

function Container169() {
  return (
    <div className="h-[46.875px] relative shrink-0 w-[47.986px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center pl-[7.986px] pr-[8.004px] relative size-full">
        <TableCheckbox17 />
      </div>
    </div>
  );
}

function Text173() {
  return (
    <div className="h-[16.51px] relative shrink-0 w-[13.125px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start relative size-full">
        <p className="font-['Open_Sans:SemiBold',sans-serif] font-semibold leading-[16.5px] relative shrink-0 text-[11px] text-white whitespace-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
          FA
        </p>
      </div>
    </div>
  );
}

function Avatar17() {
  return (
    <div className="bg-[#3b5998] relative rounded-[37282700px] shrink-0 size-[30px]" data-name="Avatar">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center overflow-clip px-[8.438px] relative rounded-[inherit] size-full">
        <Text173 />
      </div>
    </div>
  );
}

function Text174() {
  return (
    <div className="h-[19.497px] relative shrink-0 w-[102.986px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start overflow-clip relative rounded-[inherit] size-full">
        <p className="font-['Open_Sans:Regular',sans-serif] font-normal leading-[19.5px] relative shrink-0 text-[#1d2939] text-[13px] whitespace-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
          Fatima Al-Rashid
        </p>
      </div>
    </div>
  );
}

function Container170() {
  return (
    <div className="flex-[1_0_0] h-[46.875px] min-h-px min-w-px relative" data-name="Container">
      <div className="flex flex-row items-center overflow-clip rounded-[inherit] size-full">
        <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[7.986px] items-center pl-[5.99px] relative size-full">
          <Avatar17 />
          <Text174 />
        </div>
      </div>
    </div>
  );
}

function Text175() {
  return (
    <div className="h-[19.497px] relative shrink-0 w-[71.753px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start overflow-clip relative rounded-[inherit] size-full">
        <p className="font-['Open_Sans:Regular',sans-serif] font-normal leading-[19.5px] relative shrink-0 text-[#262626] text-[13px] whitespace-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
          Risk Analyst
        </p>
      </div>
    </div>
  );
}

function Container171() {
  return (
    <div className="flex-[1_0_0] h-[46.875px] min-h-px min-w-px relative" data-name="Container">
      <div className="flex flex-row items-center overflow-clip rounded-[inherit] size-full">
        <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center pl-[16.997px] relative size-full">
          <Text175 />
        </div>
      </div>
    </div>
  );
}

function Text176() {
  return (
    <div className="h-[19.497px] relative shrink-0 w-[80.712px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start overflow-clip relative rounded-[inherit] size-full">
        <p className="font-['Open_Sans:Regular',sans-serif] font-normal leading-[19.5px] relative shrink-0 text-[#262626] text-[13px] whitespace-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
          fatima@meridiangrp.com
        </p>
      </div>
    </div>
  );
}

function Container172() {
  return (
    <div className="flex-[1_0_0] h-[46.875px] min-h-px min-w-px relative" data-name="Container">
      <div className="flex flex-row items-center overflow-clip rounded-[inherit] size-full">
        <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center pl-[16.997px] relative size-full">
          <Text176 />
        </div>
      </div>
    </div>
  );
}

function Text177() {
  return (
    <div className="h-[19.497px] relative shrink-0 w-[80.694px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start overflow-clip relative rounded-[inherit] size-full">
        <p className="font-['Open_Sans:Regular',sans-serif] font-normal leading-[19.5px] relative shrink-0 text-[#262626] text-[13px] whitespace-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
          Meridian Group
        </p>
      </div>
    </div>
  );
}

function Container173() {
  return (
    <div className="flex-[1_0_0] h-[46.875px] min-h-px min-w-px relative" data-name="Container">
      <div className="flex flex-row items-center overflow-clip rounded-[inherit] size-full">
        <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center pl-[16.997px] relative size-full">
          <Text177 />
        </div>
      </div>
    </div>
  );
}

function Text178() {
  return (
    <div className="h-[19.497px] relative shrink-0 w-[47.778px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start overflow-clip relative rounded-[inherit] size-full">
        <p className="font-['Open_Sans:Regular',sans-serif] font-normal leading-[19.5px] relative shrink-0 text-[#262626] text-[13px] whitespace-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
          Chicago
        </p>
      </div>
    </div>
  );
}

function Container174() {
  return (
    <div className="flex-[1_0_0] h-[46.875px] min-h-px min-w-px relative" data-name="Container">
      <div className="flex flex-row items-center overflow-clip rounded-[inherit] size-full">
        <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center pl-[16.997px] relative size-full">
          <Text178 />
        </div>
      </div>
    </div>
  );
}

function Text179() {
  return (
    <div className="h-[19.497px] relative shrink-0 w-[83.646px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start overflow-clip relative rounded-[inherit] size-full">
        <p className="font-['Open_Sans:Regular',sans-serif] font-normal leading-[19.5px] relative shrink-0 text-[#262626] text-[13px] whitespace-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
          Cost Engineer
        </p>
      </div>
    </div>
  );
}

function Container175() {
  return (
    <div className="flex-[1_0_0] h-[46.875px] min-h-px min-w-px relative" data-name="Container">
      <div className="flex flex-row items-center overflow-clip rounded-[inherit] size-full">
        <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center pl-[16.997px] relative size-full">
          <Text179 />
        </div>
      </div>
    </div>
  );
}

function Text180() {
  return (
    <div className="h-[19.497px] relative shrink-0 w-[80.694px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start overflow-clip relative rounded-[inherit] size-full">
        <p className="font-['Open_Sans:Regular',sans-serif] font-normal leading-[19.5px] relative shrink-0 text-[#262626] text-[13px] whitespace-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
          Project Member
        </p>
      </div>
    </div>
  );
}

function Container176() {
  return (
    <div className="flex-[1_0_0] h-[46.875px] min-h-px min-w-px relative" data-name="Container">
      <div className="flex flex-row items-center overflow-clip rounded-[inherit] size-full">
        <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center pl-[16.996px] relative size-full">
          <Text180 />
        </div>
      </div>
    </div>
  );
}

function Text181() {
  return <div className="absolute bg-[#12b76a] left-[7px] rounded-[37282700px] size-[5px] top-[7.74px]" data-name="Text" />;
}

function StatusBadge17() {
  return (
    <div className="bg-[#ecfdf3] h-[20.503px] relative rounded-[37282700px] shrink-0 w-[55.451px]" data-name="StatusBadge">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <Text181 />
        <p className="-translate-x-1/2 absolute font-['Open_Sans:Regular',sans-serif] font-normal leading-[16.5px] left-[33.5px] text-[#027a48] text-[11px] text-center top-px whitespace-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
          Active
        </p>
      </div>
    </div>
  );
}

function Container177() {
  return (
    <div className="flex-[1_0_0] h-[46.875px] min-h-px min-w-px relative" data-name="Container">
      <div className="flex flex-row items-center overflow-clip rounded-[inherit] size-full">
        <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center pl-[16.997px] relative size-full">
          <StatusBadge17 />
        </div>
      </div>
    </div>
  );
}

function UserRow17() {
  return (
    <div className="absolute bg-white content-stretch flex h-[47.986px] items-start left-0 pb-[1.111px] pr-[60px] top-[1023.73px] w-[1077.118px]" data-name="UserRow2">
      <div aria-hidden="true" className="absolute border-[#f0f0f0] border-b-[1.111px] border-solid inset-0 pointer-events-none" />
      <Container169 />
      <Container170 />
      <Container171 />
      <Container172 />
      <Container173 />
      <Container174 />
      <Container175 />
      <Container176 />
      <Container177 />
    </div>
  );
}

function Icon20() {
  return (
    <div className="relative shrink-0 size-[17.986px]" data-name="Icon">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 17.9861 17.9861">
        <g clipPath="url(#clip0_2151_5507)" id="Icon">
          <path d={svgPaths.p35af8f80} fill="var(--fill-0, white)" id="Vector" />
          <path d={svgPaths.p35af8f80} id="Vector_2" stroke="var(--stroke-0, #D0D5DD)" strokeWidth="1.49884" />
        </g>
        <defs>
          <clipPath id="clip0_2151_5507">
            <rect fill="white" height="17.9861" width="17.9861" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function TableCheckbox18() {
  return (
    <div className="relative rounded-[4px] shrink-0 size-[31.997px]" data-name="TableCheckbox">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center pl-[6.997px] pr-[7.014px] relative size-full">
        <Icon20 />
      </div>
    </div>
  );
}

function Container178() {
  return (
    <div className="h-[46.875px] relative shrink-0 w-[47.986px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center pl-[7.986px] pr-[8.004px] relative size-full">
        <TableCheckbox18 />
      </div>
    </div>
  );
}

function Text182() {
  return (
    <div className="h-[16.51px] relative shrink-0 w-[14.653px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start relative size-full">
        <p className="font-['Open_Sans:SemiBold',sans-serif] font-semibold leading-[16.5px] relative shrink-0 text-[11px] text-white whitespace-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
          NS
        </p>
      </div>
    </div>
  );
}

function Avatar18() {
  return (
    <div className="bg-[#e4405f] relative rounded-[37282700px] shrink-0 size-[30px]" data-name="Avatar">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center overflow-clip px-[7.674px] relative rounded-[inherit] size-full">
        <Text182 />
      </div>
    </div>
  );
}

function Text183() {
  return (
    <div className="h-[19.497px] relative shrink-0 w-[74.41px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start overflow-clip relative rounded-[inherit] size-full">
        <p className="font-['Open_Sans:Regular',sans-serif] font-normal leading-[19.5px] relative shrink-0 text-[#1d2939] text-[13px] whitespace-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
          Noah Steele
        </p>
      </div>
    </div>
  );
}

function Container179() {
  return (
    <div className="flex-[1_0_0] h-[46.875px] min-h-px min-w-px relative" data-name="Container">
      <div className="flex flex-row items-center overflow-clip rounded-[inherit] size-full">
        <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[7.986px] items-center pl-[5.99px] relative size-full">
          <Avatar18 />
          <Text183 />
        </div>
      </div>
    </div>
  );
}

function Text184() {
  return (
    <div className="h-[19.497px] relative shrink-0 w-[80.694px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start overflow-clip relative rounded-[inherit] size-full">
        <p className="font-['Open_Sans:Regular',sans-serif] font-normal leading-[19.5px] relative shrink-0 text-[#262626] text-[13px] whitespace-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
          Procurement Lead
        </p>
      </div>
    </div>
  );
}

function Container180() {
  return (
    <div className="flex-[1_0_0] h-[46.875px] min-h-px min-w-px relative" data-name="Container">
      <div className="flex flex-row items-center overflow-clip rounded-[inherit] size-full">
        <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center pl-[16.997px] relative size-full">
          <Text184 />
        </div>
      </div>
    </div>
  );
}

function Text185() {
  return (
    <div className="h-[19.497px] relative shrink-0 w-[80.712px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start overflow-clip relative rounded-[inherit] size-full">
        <p className="font-['Open_Sans:Regular',sans-serif] font-normal leading-[19.5px] relative shrink-0 text-[#262626] text-[13px] whitespace-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
          nsteele@meridiangrp.com
        </p>
      </div>
    </div>
  );
}

function Container181() {
  return (
    <div className="flex-[1_0_0] h-[46.875px] min-h-px min-w-px relative" data-name="Container">
      <div className="flex flex-row items-center overflow-clip rounded-[inherit] size-full">
        <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center pl-[16.997px] relative size-full">
          <Text185 />
        </div>
      </div>
    </div>
  );
}

function Text186() {
  return (
    <div className="h-[19.497px] relative shrink-0 w-[80.694px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start overflow-clip relative rounded-[inherit] size-full">
        <p className="font-['Open_Sans:Regular',sans-serif] font-normal leading-[19.5px] relative shrink-0 text-[#262626] text-[13px] whitespace-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
          Meridian Group
        </p>
      </div>
    </div>
  );
}

function Container182() {
  return (
    <div className="flex-[1_0_0] h-[46.875px] min-h-px min-w-px relative" data-name="Container">
      <div className="flex flex-row items-center overflow-clip rounded-[inherit] size-full">
        <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center pl-[16.997px] relative size-full">
          <Text186 />
        </div>
      </div>
    </div>
  );
}

function Text187() {
  return (
    <div className="h-[19.497px] relative shrink-0 w-[38.281px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start overflow-clip relative rounded-[inherit] size-full">
        <p className="font-['Open_Sans:Regular',sans-serif] font-normal leading-[19.5px] relative shrink-0 text-[#262626] text-[13px] whitespace-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
          Austin
        </p>
      </div>
    </div>
  );
}

function Container183() {
  return (
    <div className="flex-[1_0_0] h-[46.875px] min-h-px min-w-px relative" data-name="Container">
      <div className="flex flex-row items-center overflow-clip rounded-[inherit] size-full">
        <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center pl-[16.997px] relative size-full">
          <Text187 />
        </div>
      </div>
    </div>
  );
}

function Text188() {
  return (
    <div className="h-[19.497px] relative shrink-0 w-[84.01px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start overflow-clip relative rounded-[inherit] size-full">
        <p className="font-['Open_Sans:Regular',sans-serif] font-normal leading-[19.5px] relative shrink-0 text-[#262626] text-[13px] whitespace-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
          Procurement Manager
        </p>
      </div>
    </div>
  );
}

function Container184() {
  return (
    <div className="flex-[1_0_0] h-[46.875px] min-h-px min-w-px relative" data-name="Container">
      <div className="flex flex-row items-center overflow-clip rounded-[inherit] size-full">
        <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center pl-[16.997px] relative size-full">
          <Text188 />
        </div>
      </div>
    </div>
  );
}

function Text189() {
  return (
    <div className="h-[19.497px] relative shrink-0 w-[80.694px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start overflow-clip relative rounded-[inherit] size-full">
        <p className="font-['Open_Sans:Regular',sans-serif] font-normal leading-[19.5px] relative shrink-0 text-[#262626] text-[13px] whitespace-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
          Project Admin
        </p>
      </div>
    </div>
  );
}

function Container185() {
  return (
    <div className="flex-[1_0_0] h-[46.875px] min-h-px min-w-px relative" data-name="Container">
      <div className="flex flex-row items-center overflow-clip rounded-[inherit] size-full">
        <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center pl-[16.996px] relative size-full">
          <Text189 />
        </div>
      </div>
    </div>
  );
}

function Text190() {
  return <div className="absolute bg-[#ef6820] left-[7px] rounded-[37282700px] size-[5px] top-[7.74px]" data-name="Text" />;
}

function StatusBadge18() {
  return (
    <div className="bg-[#fff7ed] h-[20.503px] relative rounded-[37282700px] shrink-0 w-[115.851px]" data-name="StatusBadge">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <Text190 />
        <p className="-translate-x-1/2 absolute font-['Open_Sans:Regular',sans-serif] font-normal leading-[16.5px] left-[63px] text-[#c4320a] text-[11px] text-center top-px whitespace-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
          Expired Invitation
        </p>
      </div>
    </div>
  );
}

function Container186() {
  return (
    <div className="flex-[1_0_0] h-[46.875px] min-h-px min-w-px relative" data-name="Container">
      <div className="flex flex-row items-center overflow-clip rounded-[inherit] size-full">
        <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center pl-[16.997px] relative size-full">
          <StatusBadge18 />
        </div>
      </div>
    </div>
  );
}

function UserRow18() {
  return (
    <div className="absolute bg-white content-stretch flex h-[47.986px] items-start left-0 pb-[1.111px] pr-[60px] top-[1071.72px] w-[1077.118px]" data-name="UserRow2">
      <div aria-hidden="true" className="absolute border-[#f0f0f0] border-b-[1.111px] border-solid inset-0 pointer-events-none" />
      <Container178 />
      <Container179 />
      <Container180 />
      <Container181 />
      <Container182 />
      <Container183 />
      <Container184 />
      <Container185 />
      <Container186 />
    </div>
  );
}

function GroupHeaderRow5() {
  return <div className="absolute bg-[#ebf0ff] h-[30.885px] left-[1017.12px] shadow-[-1px_0px_0px_0px_#f0f0f0,-4px_0px_10px_0px_rgba(0,0,0,0.06)] top-[47.99px] w-[60px]" data-name="GroupHeaderRow" />;
}

function GroupHeaderRow6() {
  return <div className="absolute bg-[#ebf0ff] h-[30.885px] left-[1017.12px] shadow-[-1px_0px_0px_0px_#f0f0f0,-4px_0px_10px_0px_rgba(0,0,0,0.06)] top-[271.93px] w-[60px]" data-name="GroupHeaderRow" />;
}

function GroupHeaderRow7() {
  return <div className="absolute bg-[#ebf0ff] h-[30.885px] left-[1017.12px] shadow-[-1px_0px_0px_0px_#f0f0f0,-4px_0px_10px_0px_rgba(0,0,0,0.06)] top-[495.87px] w-[60px]" data-name="GroupHeaderRow" />;
}

function GroupHeaderRow8() {
  return <div className="absolute bg-[#ebf0ff] h-[30.885px] left-[1017.12px] shadow-[-1px_0px_0px_0px_#f0f0f0,-4px_0px_10px_0px_rgba(0,0,0,0.06)] top-[719.81px] w-[60px]" data-name="GroupHeaderRow" />;
}

function GroupHeaderRow9() {
  return <div className="absolute bg-[#ebf0ff] h-[30.885px] left-[1017.12px] shadow-[-1px_0px_0px_0px_#f0f0f0,-4px_0px_10px_0px_rgba(0,0,0,0.06)] top-[943.75px] w-[60px]" data-name="GroupHeaderRow" />;
}

function InfoIcon() {
  return (
    <div className="relative shrink-0 size-[15px]" data-name="InfoIcon">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 15 15">
        <g id="InfoIcon">
          <path d={svgPaths.p3d2bd500} id="Vector" stroke="var(--stroke-0, #616D79)" strokeWidth="0.75" />
          <path d={svgPaths.p106b6900} fill="var(--fill-0, #616D79)" id="Vector_2" stroke="var(--stroke-0, #616D79)" strokeWidth="0.75" />
          <path d={svgPaths.p3237fd00} id="Vector_3" stroke="var(--stroke-0, #616D79)" strokeLinejoin="round" strokeWidth="0.75" />
        </g>
      </svg>
    </div>
  );
}

function Button6() {
  return (
    <div className="relative rounded-[4px] shrink-0 size-[25.99px]" data-name="Button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center pl-[5.486px] pr-[5.503px] relative size-full">
        <InfoIcon />
      </div>
    </div>
  );
}

function UserRow19() {
  return (
    <div className="absolute bg-white content-stretch flex h-[46.875px] items-center justify-center left-[1017.12px] pl-[16.997px] pr-[17.014px] shadow-[-1px_0px_0px_0px_#f0f0f0,-4px_0px_10px_0px_rgba(0,0,0,0.06)] top-[79.98px] w-[60px]" data-name="UserRow2">
      <Button6 />
    </div>
  );
}

function InfoIcon1() {
  return (
    <div className="relative shrink-0 size-[15px]" data-name="InfoIcon">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 15 15">
        <g id="InfoIcon">
          <path d={svgPaths.p3d2bd500} id="Vector" stroke="var(--stroke-0, #616D79)" strokeWidth="0.75" />
          <path d={svgPaths.p106b6900} fill="var(--fill-0, #616D79)" id="Vector_2" stroke="var(--stroke-0, #616D79)" strokeWidth="0.75" />
          <path d={svgPaths.p3237fd00} id="Vector_3" stroke="var(--stroke-0, #616D79)" strokeLinejoin="round" strokeWidth="0.75" />
        </g>
      </svg>
    </div>
  );
}

function Button7() {
  return (
    <div className="relative rounded-[4px] shrink-0 size-[25.99px]" data-name="Button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center pl-[5.486px] pr-[5.503px] relative size-full">
        <InfoIcon1 />
      </div>
    </div>
  );
}

function UserRow20() {
  return (
    <div className="absolute bg-white content-stretch flex h-[46.875px] items-center justify-center left-[1017.12px] pl-[16.997px] pr-[17.014px] shadow-[-1px_0px_0px_0px_#f0f0f0,-4px_0px_10px_0px_rgba(0,0,0,0.06)] top-[127.97px] w-[60px]" data-name="UserRow2">
      <Button7 />
    </div>
  );
}

function InfoIcon2() {
  return (
    <div className="relative shrink-0 size-[15px]" data-name="InfoIcon">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 15 15">
        <g id="InfoIcon">
          <path d={svgPaths.p3d2bd500} id="Vector" stroke="var(--stroke-0, #616D79)" strokeWidth="0.75" />
          <path d={svgPaths.p106b6900} fill="var(--fill-0, #616D79)" id="Vector_2" stroke="var(--stroke-0, #616D79)" strokeWidth="0.75" />
          <path d={svgPaths.p3237fd00} id="Vector_3" stroke="var(--stroke-0, #616D79)" strokeLinejoin="round" strokeWidth="0.75" />
        </g>
      </svg>
    </div>
  );
}

function Button8() {
  return (
    <div className="relative rounded-[4px] shrink-0 size-[25.99px]" data-name="Button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center pl-[5.486px] pr-[5.503px] relative size-full">
        <InfoIcon2 />
      </div>
    </div>
  );
}

function UserRow21() {
  return (
    <div className="absolute bg-white content-stretch flex h-[46.875px] items-center justify-center left-[1017.12px] pl-[16.997px] pr-[17.014px] shadow-[-1px_0px_0px_0px_#f0f0f0,-4px_0px_10px_0px_rgba(0,0,0,0.06)] top-[175.95px] w-[60px]" data-name="UserRow2">
      <Button8 />
    </div>
  );
}

function InfoIcon3() {
  return (
    <div className="relative shrink-0 size-[15px]" data-name="InfoIcon">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 15 15">
        <g id="InfoIcon">
          <path d={svgPaths.p3d2bd500} id="Vector" stroke="var(--stroke-0, #616D79)" strokeWidth="0.75" />
          <path d={svgPaths.p106b6900} fill="var(--fill-0, #616D79)" id="Vector_2" stroke="var(--stroke-0, #616D79)" strokeWidth="0.75" />
          <path d={svgPaths.p3237fd00} id="Vector_3" stroke="var(--stroke-0, #616D79)" strokeLinejoin="round" strokeWidth="0.75" />
        </g>
      </svg>
    </div>
  );
}

function Button9() {
  return (
    <div className="relative rounded-[4px] shrink-0 size-[25.99px]" data-name="Button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center pl-[5.486px] pr-[5.503px] relative size-full">
        <InfoIcon3 />
      </div>
    </div>
  );
}

function UserRow22() {
  return (
    <div className="absolute bg-white content-stretch flex h-[46.875px] items-center justify-center left-[1017.12px] pl-[16.997px] pr-[17.014px] shadow-[-1px_0px_0px_0px_#f0f0f0,-4px_0px_10px_0px_rgba(0,0,0,0.06)] top-[223.94px] w-[60px]" data-name="UserRow2">
      <Button9 />
    </div>
  );
}

function InfoIcon4() {
  return (
    <div className="relative shrink-0 size-[15px]" data-name="InfoIcon">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 15 15">
        <g id="InfoIcon">
          <path d={svgPaths.p3d2bd500} id="Vector" stroke="var(--stroke-0, #616D79)" strokeWidth="0.75" />
          <path d={svgPaths.p106b6900} fill="var(--fill-0, #616D79)" id="Vector_2" stroke="var(--stroke-0, #616D79)" strokeWidth="0.75" />
          <path d={svgPaths.p3237fd00} id="Vector_3" stroke="var(--stroke-0, #616D79)" strokeLinejoin="round" strokeWidth="0.75" />
        </g>
      </svg>
    </div>
  );
}

function Button10() {
  return (
    <div className="relative rounded-[4px] shrink-0 size-[25.99px]" data-name="Button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center pl-[5.486px] pr-[5.503px] relative size-full">
        <InfoIcon4 />
      </div>
    </div>
  );
}

function UserRow23() {
  return (
    <div className="absolute bg-white content-stretch flex h-[46.875px] items-center justify-center left-[1017.12px] pl-[16.997px] pr-[17.014px] shadow-[-1px_0px_0px_0px_#f0f0f0,-4px_0px_10px_0px_rgba(0,0,0,0.06)] top-[303.92px] w-[60px]" data-name="UserRow2">
      <Button10 />
    </div>
  );
}

function InfoIcon5() {
  return (
    <div className="relative shrink-0 size-[15px]" data-name="InfoIcon">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 15 15">
        <g id="InfoIcon">
          <path d={svgPaths.p3d2bd500} id="Vector" stroke="var(--stroke-0, #616D79)" strokeWidth="0.75" />
          <path d={svgPaths.p106b6900} fill="var(--fill-0, #616D79)" id="Vector_2" stroke="var(--stroke-0, #616D79)" strokeWidth="0.75" />
          <path d={svgPaths.p3237fd00} id="Vector_3" stroke="var(--stroke-0, #616D79)" strokeLinejoin="round" strokeWidth="0.75" />
        </g>
      </svg>
    </div>
  );
}

function Button11() {
  return (
    <div className="relative rounded-[4px] shrink-0 size-[25.99px]" data-name="Button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center pl-[5.486px] pr-[5.503px] relative size-full">
        <InfoIcon5 />
      </div>
    </div>
  );
}

function UserRow24() {
  return (
    <div className="absolute bg-white content-stretch flex h-[46.875px] items-center justify-center left-[1017.12px] pl-[16.997px] pr-[17.014px] shadow-[-1px_0px_0px_0px_#f0f0f0,-4px_0px_10px_0px_rgba(0,0,0,0.06)] top-[351.91px] w-[60px]" data-name="UserRow2">
      <Button11 />
    </div>
  );
}

function InfoIcon6() {
  return (
    <div className="relative shrink-0 size-[15px]" data-name="InfoIcon">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 15 15">
        <g id="InfoIcon">
          <path d={svgPaths.p3d2bd500} id="Vector" stroke="var(--stroke-0, #616D79)" strokeWidth="0.75" />
          <path d={svgPaths.p106b6900} fill="var(--fill-0, #616D79)" id="Vector_2" stroke="var(--stroke-0, #616D79)" strokeWidth="0.75" />
          <path d={svgPaths.p3237fd00} id="Vector_3" stroke="var(--stroke-0, #616D79)" strokeLinejoin="round" strokeWidth="0.75" />
        </g>
      </svg>
    </div>
  );
}

function Button12() {
  return (
    <div className="relative rounded-[4px] shrink-0 size-[25.99px]" data-name="Button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center pl-[5.486px] pr-[5.503px] relative size-full">
        <InfoIcon6 />
      </div>
    </div>
  );
}

function UserRow25() {
  return (
    <div className="absolute bg-white content-stretch flex h-[46.875px] items-center justify-center left-[1017.12px] pl-[16.997px] pr-[17.014px] shadow-[-1px_0px_0px_0px_#f0f0f0,-4px_0px_10px_0px_rgba(0,0,0,0.06)] top-[399.9px] w-[60px]" data-name="UserRow2">
      <Button12 />
    </div>
  );
}

function InfoIcon7() {
  return (
    <div className="relative shrink-0 size-[15px]" data-name="InfoIcon">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 15 15">
        <g id="InfoIcon">
          <path d={svgPaths.p3d2bd500} id="Vector" stroke="var(--stroke-0, #616D79)" strokeWidth="0.75" />
          <path d={svgPaths.p106b6900} fill="var(--fill-0, #616D79)" id="Vector_2" stroke="var(--stroke-0, #616D79)" strokeWidth="0.75" />
          <path d={svgPaths.p3237fd00} id="Vector_3" stroke="var(--stroke-0, #616D79)" strokeLinejoin="round" strokeWidth="0.75" />
        </g>
      </svg>
    </div>
  );
}

function Button13() {
  return (
    <div className="relative rounded-[4px] shrink-0 size-[25.99px]" data-name="Button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center pl-[5.486px] pr-[5.503px] relative size-full">
        <InfoIcon7 />
      </div>
    </div>
  );
}

function UserRow26() {
  return (
    <div className="absolute bg-white content-stretch flex h-[46.875px] items-center justify-center left-[1017.12px] pl-[16.997px] pr-[17.014px] shadow-[-1px_0px_0px_0px_#f0f0f0,-4px_0px_10px_0px_rgba(0,0,0,0.06)] top-[447.88px] w-[60px]" data-name="UserRow2">
      <Button13 />
    </div>
  );
}

function InfoIcon8() {
  return (
    <div className="relative shrink-0 size-[15px]" data-name="InfoIcon">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 15 15">
        <g id="InfoIcon">
          <path d={svgPaths.p3d2bd500} id="Vector" stroke="var(--stroke-0, #616D79)" strokeWidth="0.75" />
          <path d={svgPaths.p106b6900} fill="var(--fill-0, #616D79)" id="Vector_2" stroke="var(--stroke-0, #616D79)" strokeWidth="0.75" />
          <path d={svgPaths.p3237fd00} id="Vector_3" stroke="var(--stroke-0, #616D79)" strokeLinejoin="round" strokeWidth="0.75" />
        </g>
      </svg>
    </div>
  );
}

function Button14() {
  return (
    <div className="relative rounded-[4px] shrink-0 size-[25.99px]" data-name="Button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center pl-[5.486px] pr-[5.503px] relative size-full">
        <InfoIcon8 />
      </div>
    </div>
  );
}

function UserRow27() {
  return (
    <div className="absolute bg-white content-stretch flex h-[46.875px] items-center justify-center left-[1017.12px] pl-[16.997px] pr-[17.014px] shadow-[-1px_0px_0px_0px_#f0f0f0,-4px_0px_10px_0px_rgba(0,0,0,0.06)] top-[527.86px] w-[60px]" data-name="UserRow2">
      <Button14 />
    </div>
  );
}

function InfoIcon9() {
  return (
    <div className="relative shrink-0 size-[15px]" data-name="InfoIcon">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 15 15">
        <g id="InfoIcon">
          <path d={svgPaths.p3d2bd500} id="Vector" stroke="var(--stroke-0, #616D79)" strokeWidth="0.75" />
          <path d={svgPaths.p106b6900} fill="var(--fill-0, #616D79)" id="Vector_2" stroke="var(--stroke-0, #616D79)" strokeWidth="0.75" />
          <path d={svgPaths.p3237fd00} id="Vector_3" stroke="var(--stroke-0, #616D79)" strokeLinejoin="round" strokeWidth="0.75" />
        </g>
      </svg>
    </div>
  );
}

function Button15() {
  return (
    <div className="relative rounded-[4px] shrink-0 size-[25.99px]" data-name="Button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center pl-[5.486px] pr-[5.503px] relative size-full">
        <InfoIcon9 />
      </div>
    </div>
  );
}

function UserRow28() {
  return (
    <div className="absolute bg-white content-stretch flex h-[46.875px] items-center justify-center left-[1017.12px] pl-[16.997px] pr-[17.014px] shadow-[-1px_0px_0px_0px_#f0f0f0,-4px_0px_10px_0px_rgba(0,0,0,0.06)] top-[575.85px] w-[60px]" data-name="UserRow2">
      <Button15 />
    </div>
  );
}

function InfoIcon10() {
  return (
    <div className="relative shrink-0 size-[15px]" data-name="InfoIcon">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 15 15">
        <g id="InfoIcon">
          <path d={svgPaths.p3d2bd500} id="Vector" stroke="var(--stroke-0, #616D79)" strokeWidth="0.75" />
          <path d={svgPaths.p106b6900} fill="var(--fill-0, #616D79)" id="Vector_2" stroke="var(--stroke-0, #616D79)" strokeWidth="0.75" />
          <path d={svgPaths.p3237fd00} id="Vector_3" stroke="var(--stroke-0, #616D79)" strokeLinejoin="round" strokeWidth="0.75" />
        </g>
      </svg>
    </div>
  );
}

function Button16() {
  return (
    <div className="relative rounded-[4px] shrink-0 size-[25.99px]" data-name="Button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center pl-[5.486px] pr-[5.503px] relative size-full">
        <InfoIcon10 />
      </div>
    </div>
  );
}

function UserRow29() {
  return (
    <div className="absolute bg-white content-stretch flex h-[46.875px] items-center justify-center left-[1017.12px] pl-[16.997px] pr-[17.014px] shadow-[-1px_0px_0px_0px_#f0f0f0,-4px_0px_10px_0px_rgba(0,0,0,0.06)] top-[623.84px] w-[60px]" data-name="UserRow2">
      <Button16 />
    </div>
  );
}

function InfoIcon11() {
  return (
    <div className="relative shrink-0 size-[15px]" data-name="InfoIcon">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 15 15">
        <g id="InfoIcon">
          <path d={svgPaths.p3d2bd500} id="Vector" stroke="var(--stroke-0, #616D79)" strokeWidth="0.75" />
          <path d={svgPaths.p106b6900} fill="var(--fill-0, #616D79)" id="Vector_2" stroke="var(--stroke-0, #616D79)" strokeWidth="0.75" />
          <path d={svgPaths.p3237fd00} id="Vector_3" stroke="var(--stroke-0, #616D79)" strokeLinejoin="round" strokeWidth="0.75" />
        </g>
      </svg>
    </div>
  );
}

function Button17() {
  return (
    <div className="relative rounded-[4px] shrink-0 size-[25.99px]" data-name="Button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center pl-[5.486px] pr-[5.503px] relative size-full">
        <InfoIcon11 />
      </div>
    </div>
  );
}

function UserRow30() {
  return (
    <div className="absolute bg-white content-stretch flex h-[46.875px] items-center justify-center left-[1017.12px] pl-[16.997px] pr-[17.014px] shadow-[-1px_0px_0px_0px_#f0f0f0,-4px_0px_10px_0px_rgba(0,0,0,0.06)] top-[671.82px] w-[60px]" data-name="UserRow2">
      <Button17 />
    </div>
  );
}

function InfoIcon12() {
  return (
    <div className="relative shrink-0 size-[15px]" data-name="InfoIcon">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 15 15">
        <g id="InfoIcon">
          <path d={svgPaths.p3d2bd500} id="Vector" stroke="var(--stroke-0, #616D79)" strokeWidth="0.75" />
          <path d={svgPaths.p106b6900} fill="var(--fill-0, #616D79)" id="Vector_2" stroke="var(--stroke-0, #616D79)" strokeWidth="0.75" />
          <path d={svgPaths.p3237fd00} id="Vector_3" stroke="var(--stroke-0, #616D79)" strokeLinejoin="round" strokeWidth="0.75" />
        </g>
      </svg>
    </div>
  );
}

function Button18() {
  return (
    <div className="relative rounded-[4px] shrink-0 size-[25.99px]" data-name="Button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center pl-[5.486px] pr-[5.503px] relative size-full">
        <InfoIcon12 />
      </div>
    </div>
  );
}

function UserRow31() {
  return (
    <div className="absolute bg-white content-stretch flex h-[46.875px] items-center justify-center left-[1017.12px] pl-[16.997px] pr-[17.014px] shadow-[-1px_0px_0px_0px_#f0f0f0,-4px_0px_10px_0px_rgba(0,0,0,0.06)] top-[751.81px] w-[60px]" data-name="UserRow2">
      <Button18 />
    </div>
  );
}

function InfoIcon13() {
  return (
    <div className="relative shrink-0 size-[15px]" data-name="InfoIcon">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 15 15">
        <g id="InfoIcon">
          <path d={svgPaths.p3d2bd500} id="Vector" stroke="var(--stroke-0, #616D79)" strokeWidth="0.75" />
          <path d={svgPaths.p106b6900} fill="var(--fill-0, #616D79)" id="Vector_2" stroke="var(--stroke-0, #616D79)" strokeWidth="0.75" />
          <path d={svgPaths.p3237fd00} id="Vector_3" stroke="var(--stroke-0, #616D79)" strokeLinejoin="round" strokeWidth="0.75" />
        </g>
      </svg>
    </div>
  );
}

function Button19() {
  return (
    <div className="relative rounded-[4px] shrink-0 size-[25.99px]" data-name="Button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center pl-[5.486px] pr-[5.503px] relative size-full">
        <InfoIcon13 />
      </div>
    </div>
  );
}

function UserRow32() {
  return (
    <div className="absolute bg-white content-stretch flex h-[46.875px] items-center justify-center left-[1017.12px] pl-[16.997px] pr-[17.014px] shadow-[-1px_0px_0px_0px_#f0f0f0,-4px_0px_10px_0px_rgba(0,0,0,0.06)] top-[799.79px] w-[60px]" data-name="UserRow2">
      <Button19 />
    </div>
  );
}

function InfoIcon14() {
  return (
    <div className="relative shrink-0 size-[15px]" data-name="InfoIcon">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 15 15">
        <g id="InfoIcon">
          <path d={svgPaths.p3d2bd500} id="Vector" stroke="var(--stroke-0, #616D79)" strokeWidth="0.75" />
          <path d={svgPaths.p106b6900} fill="var(--fill-0, #616D79)" id="Vector_2" stroke="var(--stroke-0, #616D79)" strokeWidth="0.75" />
          <path d={svgPaths.p3237fd00} id="Vector_3" stroke="var(--stroke-0, #616D79)" strokeLinejoin="round" strokeWidth="0.75" />
        </g>
      </svg>
    </div>
  );
}

function Button20() {
  return (
    <div className="relative rounded-[4px] shrink-0 size-[25.99px]" data-name="Button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center pl-[5.486px] pr-[5.503px] relative size-full">
        <InfoIcon14 />
      </div>
    </div>
  );
}

function UserRow33() {
  return (
    <div className="absolute bg-white content-stretch flex h-[46.875px] items-center justify-center left-[1017.12px] pl-[16.997px] pr-[17.014px] shadow-[-1px_0px_0px_0px_#f0f0f0,-4px_0px_10px_0px_rgba(0,0,0,0.06)] top-[847.78px] w-[60px]" data-name="UserRow2">
      <Button20 />
    </div>
  );
}

function InfoIcon15() {
  return (
    <div className="relative shrink-0 size-[15px]" data-name="InfoIcon">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 15 15">
        <g id="InfoIcon">
          <path d={svgPaths.p3d2bd500} id="Vector" stroke="var(--stroke-0, #616D79)" strokeWidth="0.75" />
          <path d={svgPaths.p106b6900} fill="var(--fill-0, #616D79)" id="Vector_2" stroke="var(--stroke-0, #616D79)" strokeWidth="0.75" />
          <path d={svgPaths.p3237fd00} id="Vector_3" stroke="var(--stroke-0, #616D79)" strokeLinejoin="round" strokeWidth="0.75" />
        </g>
      </svg>
    </div>
  );
}

function Button21() {
  return (
    <div className="relative rounded-[4px] shrink-0 size-[25.99px]" data-name="Button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center pl-[5.486px] pr-[5.503px] relative size-full">
        <InfoIcon15 />
      </div>
    </div>
  );
}

function UserRow34() {
  return (
    <div className="absolute bg-white content-stretch flex h-[46.875px] items-center justify-center left-[1017.12px] pl-[16.997px] pr-[17.014px] shadow-[-1px_0px_0px_0px_#f0f0f0,-4px_0px_10px_0px_rgba(0,0,0,0.06)] top-[895.76px] w-[60px]" data-name="UserRow2">
      <Button21 />
    </div>
  );
}

function InfoIcon16() {
  return (
    <div className="relative shrink-0 size-[15px]" data-name="InfoIcon">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 15 15">
        <g id="InfoIcon">
          <path d={svgPaths.p3d2bd500} id="Vector" stroke="var(--stroke-0, #616D79)" strokeWidth="0.75" />
          <path d={svgPaths.p106b6900} fill="var(--fill-0, #616D79)" id="Vector_2" stroke="var(--stroke-0, #616D79)" strokeWidth="0.75" />
          <path d={svgPaths.p3237fd00} id="Vector_3" stroke="var(--stroke-0, #616D79)" strokeLinejoin="round" strokeWidth="0.75" />
        </g>
      </svg>
    </div>
  );
}

function Button22() {
  return (
    <div className="relative rounded-[4px] shrink-0 size-[25.99px]" data-name="Button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center pl-[5.486px] pr-[5.503px] relative size-full">
        <InfoIcon16 />
      </div>
    </div>
  );
}

function UserRow35() {
  return (
    <div className="absolute bg-white content-stretch flex h-[46.875px] items-center justify-center left-[1017.12px] pl-[16.997px] pr-[17.014px] shadow-[-1px_0px_0px_0px_#f0f0f0,-4px_0px_10px_0px_rgba(0,0,0,0.06)] top-[975.75px] w-[60px]" data-name="UserRow2">
      <Button22 />
    </div>
  );
}

function InfoIcon17() {
  return (
    <div className="relative shrink-0 size-[15px]" data-name="InfoIcon">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 15 15">
        <g id="InfoIcon">
          <path d={svgPaths.p3d2bd500} id="Vector" stroke="var(--stroke-0, #616D79)" strokeWidth="0.75" />
          <path d={svgPaths.p106b6900} fill="var(--fill-0, #616D79)" id="Vector_2" stroke="var(--stroke-0, #616D79)" strokeWidth="0.75" />
          <path d={svgPaths.p3237fd00} id="Vector_3" stroke="var(--stroke-0, #616D79)" strokeLinejoin="round" strokeWidth="0.75" />
        </g>
      </svg>
    </div>
  );
}

function Button23() {
  return (
    <div className="relative rounded-[4px] shrink-0 size-[25.99px]" data-name="Button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center pl-[5.486px] pr-[5.503px] relative size-full">
        <InfoIcon17 />
      </div>
    </div>
  );
}

function UserRow36() {
  return (
    <div className="absolute bg-white content-stretch flex h-[46.875px] items-center justify-center left-[1017.12px] pl-[16.997px] pr-[17.014px] shadow-[-1px_0px_0px_0px_#f0f0f0,-4px_0px_10px_0px_rgba(0,0,0,0.06)] top-[1023.73px] w-[60px]" data-name="UserRow2">
      <Button23 />
    </div>
  );
}

function InfoIcon18() {
  return (
    <div className="relative shrink-0 size-[15px]" data-name="InfoIcon">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 15 15">
        <g id="InfoIcon">
          <path d={svgPaths.p3d2bd500} id="Vector" stroke="var(--stroke-0, #616D79)" strokeWidth="0.75" />
          <path d={svgPaths.p106b6900} fill="var(--fill-0, #616D79)" id="Vector_2" stroke="var(--stroke-0, #616D79)" strokeWidth="0.75" />
          <path d={svgPaths.p3237fd00} id="Vector_3" stroke="var(--stroke-0, #616D79)" strokeLinejoin="round" strokeWidth="0.75" />
        </g>
      </svg>
    </div>
  );
}

function Button24() {
  return (
    <div className="relative rounded-[4px] shrink-0 size-[25.99px]" data-name="Button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center pl-[5.486px] pr-[5.503px] relative size-full">
        <InfoIcon18 />
      </div>
    </div>
  );
}

function UserRow37() {
  return (
    <div className="absolute bg-white content-stretch flex h-[46.875px] items-center justify-center left-[1017.12px] pl-[16.997px] pr-[17.014px] shadow-[-1px_0px_0px_0px_#f0f0f0,-4px_0px_10px_0px_rgba(0,0,0,0.06)] top-[1071.72px] w-[60px]" data-name="UserRow2">
      <Button24 />
    </div>
  );
}

function Icon21() {
  return (
    <div className="relative shrink-0 size-[17.986px]" data-name="Icon">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 17.9861 17.9861">
        <g clipPath="url(#clip0_2151_5536)" id="Icon">
          <path d={svgPaths.p35af8f80} fill="var(--fill-0, #0E70CB)" id="Vector" />
          <path d="M4.49653 8.99306H13.4896" id="Vector_2" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeWidth="1.99846" />
        </g>
        <defs>
          <clipPath id="clip0_2151_5536">
            <rect fill="white" height="17.9861" width="17.9861" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function TableCheckbox19() {
  return (
    <div className="relative rounded-[4px] shrink-0 size-[31.997px]" data-name="TableCheckbox">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center pl-[6.997px] pr-[7.014px] relative size-full">
        <Icon21 />
      </div>
    </div>
  );
}

function Container187() {
  return (
    <div className="absolute content-stretch flex h-[46.875px] items-center justify-center left-0 pl-[7.986px] pr-[8.004px] top-0 w-[47.986px]" data-name="Container">
      <TableCheckbox19 />
    </div>
  );
}

function TableHeader1() {
  return (
    <div className="absolute h-[23.993px] left-[5.99px] top-[11.44px] w-[209.028px]" data-name="TableHeader">
      <p className="absolute font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[24px] left-0 not-italic text-[#384857] text-[16px] top-[-0.78px] whitespace-nowrap">Name</p>
    </div>
  );
}

function ResizeHandle() {
  return <div className="absolute h-[46.875px] left-[234.01px] top-0 w-[5.99px]" data-name="ResizeHandle" />;
}

function ColumnHeader() {
  return (
    <div className="absolute bg-[#fafafa] h-[46.875px] left-[47.99px] overflow-clip top-0 w-[240px]" data-name="ColumnHeader">
      <TableHeader1 />
      <ResizeHandle />
    </div>
  );
}

function TableHeader2() {
  return (
    <div className="absolute h-[23.993px] left-[16.98px] overflow-clip top-[11.44px] w-[61.719px]" data-name="TableHeader">
      <p className="absolute font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[24px] left-0 not-italic text-[#384857] text-[16px] top-[-0.78px] whitespace-nowrap">Job Title</p>
    </div>
  );
}

function ResizeHandle1() {
  return <div className="absolute h-[46.875px] left-[97.69px] top-0 w-[5.99px]" data-name="ResizeHandle" />;
}

function ColumnHeader1() {
  return (
    <div className="absolute bg-[#fafafa] h-[46.875px] left-[287.99px] overflow-clip top-0 w-[103.681px]" data-name="ColumnHeader">
      <TableHeader2 />
      <ResizeHandle1 />
    </div>
  );
}

function TableHeader3() {
  return (
    <div className="absolute h-[23.993px] left-[16.98px] overflow-clip top-[11.44px] w-[61.736px]" data-name="TableHeader">
      <p className="absolute font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[24px] left-0 not-italic text-[#384857] text-[16px] top-[-0.78px] whitespace-nowrap">Email</p>
    </div>
  );
}

function ResizeHandle2() {
  return <div className="absolute h-[46.875px] left-[97.71px] top-0 w-[5.99px]" data-name="ResizeHandle" />;
}

function ColumnHeader2() {
  return (
    <div className="absolute bg-[#fafafa] h-[46.875px] left-[391.67px] overflow-clip top-0 w-[103.698px]" data-name="ColumnHeader">
      <TableHeader3 />
      <ResizeHandle2 />
    </div>
  );
}

function TableHeader4() {
  return (
    <div className="absolute h-[23.993px] left-[16.98px] overflow-clip top-[11.44px] w-[61.719px]" data-name="TableHeader">
      <p className="absolute font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[24px] left-0 not-italic text-[#384857] text-[16px] top-[-0.78px] whitespace-nowrap">Company</p>
    </div>
  );
}

function ResizeHandle3() {
  return <div className="absolute h-[46.875px] left-[97.69px] top-0 w-[5.99px]" data-name="ResizeHandle" />;
}

function ColumnHeader3() {
  return (
    <div className="absolute bg-[#fafafa] h-[46.875px] left-[495.36px] overflow-clip top-0 w-[103.681px]" data-name="ColumnHeader">
      <TableHeader4 />
      <ResizeHandle3 />
    </div>
  );
}

function TableHeader5() {
  return (
    <div className="absolute h-[23.993px] left-[16.98px] overflow-clip top-[11.44px] w-[61.736px]" data-name="TableHeader">
      <p className="absolute font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[24px] left-0 not-italic text-[#384857] text-[16px] top-[-0.78px] whitespace-nowrap">Office</p>
    </div>
  );
}

function ResizeHandle4() {
  return <div className="absolute h-[46.875px] left-[97.71px] top-0 w-[5.99px]" data-name="ResizeHandle" />;
}

function ColumnHeader4() {
  return (
    <div className="absolute bg-[#fafafa] h-[46.875px] left-[599.05px] overflow-clip top-0 w-[103.698px]" data-name="ColumnHeader">
      <TableHeader5 />
      <ResizeHandle4 />
    </div>
  );
}

function TableHeader6() {
  return (
    <div className="absolute h-[23.993px] left-[16.98px] overflow-clip top-[11.44px] w-[65.035px]" data-name="TableHeader">
      <p className="absolute font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[24px] left-0 not-italic text-[#384857] text-[16px] top-[-0.78px] whitespace-nowrap">Project Role</p>
    </div>
  );
}

function ResizeHandle5() {
  return <div className="absolute h-[46.875px] left-[101.01px] top-0 w-[5.99px]" data-name="ResizeHandle" />;
}

function ColumnHeader5() {
  return (
    <div className="absolute bg-[#fafafa] h-[46.875px] left-[702.74px] overflow-clip top-0 w-[106.997px]" data-name="ColumnHeader">
      <TableHeader6 />
      <ResizeHandle5 />
    </div>
  );
}

function TableHeader7() {
  return (
    <div className="absolute h-[23.993px] left-[16.98px] overflow-clip top-[11.44px] w-[61.719px]" data-name="TableHeader">
      <p className="absolute font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[24px] left-0 not-italic text-[#384857] text-[16px] top-[-0.78px] whitespace-nowrap">User Type</p>
    </div>
  );
}

function ResizeHandle6() {
  return <div className="absolute h-[46.875px] left-[97.69px] top-0 w-[5.99px]" data-name="ResizeHandle" />;
}

function ColumnHeader6() {
  return (
    <div className="absolute bg-[#fafafa] h-[46.875px] left-[809.74px] overflow-clip top-0 w-[103.681px]" data-name="ColumnHeader">
      <TableHeader7 />
      <ResizeHandle6 />
    </div>
  );
}

function TableHeader8() {
  return (
    <div className="absolute h-[23.993px] left-[16.98px] overflow-clip top-[11.44px] w-[61.736px]" data-name="TableHeader">
      <p className="absolute font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[24px] left-0 not-italic text-[#384857] text-[16px] top-[-0.78px] whitespace-nowrap">Status</p>
    </div>
  );
}

function ResizeHandle7() {
  return <div className="absolute h-[46.875px] left-[97.71px] top-0 w-[5.99px]" data-name="ResizeHandle" />;
}

function ColumnHeader7() {
  return (
    <div className="absolute bg-[#fafafa] h-[46.875px] left-[913.42px] overflow-clip top-0 w-[103.698px]" data-name="ColumnHeader">
      <TableHeader8 />
      <ResizeHandle7 />
    </div>
  );
}

function TableHeader() {
  return (
    <div className="absolute bg-[#fafafa] border-[#f0f0f0] border-b-[1.111px] border-solid h-[47.986px] left-0 top-0 w-[1077.118px]" data-name="TableHeader">
      <Container187 />
      <ColumnHeader />
      <ColumnHeader1 />
      <ColumnHeader2 />
      <ColumnHeader3 />
      <ColumnHeader4 />
      <ColumnHeader5 />
      <ColumnHeader6 />
      <ColumnHeader7 />
    </div>
  );
}

function Group() {
  return (
    <div className="absolute inset-[13.64%_0.91%_13.64%_0.98%] mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[0px_-2.453px] mask-size-[14.705px_17.986px]" data-name="Group" style={{ maskImage: `url('${imgGroup}')` }}>
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14.7159 13.0808">
        <g id="Group">
          <path d={svgPaths.p2e16ad00} fill="var(--fill-0, #616D79)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function ClipPathGroup() {
  return (
    <div className="absolute contents inset-[0_0.98%]" data-name="Clip path group">
      <Group />
    </div>
  );
}

function Icon22() {
  return (
    <div className="h-[17.986px] relative shrink-0 w-[15px]" data-name="Icon">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid overflow-clip relative rounded-[inherit] size-full">
        <ClipPathGroup />
      </div>
    </div>
  );
}

function Button25() {
  return (
    <div className="relative rounded-[4px] shrink-0 size-[33.993px]" data-name="Button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center pl-[9.496px] pr-[9.497px] relative size-full">
        <Icon22 />
      </div>
    </div>
  );
}

function TableHeader9() {
  return (
    <div className="absolute bg-[#fafafa] content-stretch flex h-[46.875px] items-center justify-center left-[1017.12px] pl-[13.004px] pr-[13.003px] shadow-[-1px_0px_0px_0px_#f0f0f0,-4px_0px_10px_0px_rgba(0,0,0,0.06)] top-0 w-[60px]" data-name="TableHeader">
      <Button25 />
    </div>
  );
}

function Container9() {
  return (
    <div className="absolute h-[671.146px] left-[1.11px] overflow-clip top-[91.11px] w-[1088.229px]" data-name="Container">
      <GroupHeaderRow />
      <UserRow />
      <UserRow1 />
      <UserRow2 />
      <UserRow3 />
      <GroupHeaderRow1 />
      <UserRow4 />
      <UserRow5 />
      <UserRow6 />
      <UserRow7 />
      <GroupHeaderRow2 />
      <UserRow8 />
      <UserRow9 />
      <UserRow10 />
      <UserRow11 />
      <GroupHeaderRow3 />
      <UserRow12 />
      <UserRow13 />
      <UserRow14 />
      <UserRow15 />
      <GroupHeaderRow4 />
      <UserRow16 />
      <UserRow17 />
      <UserRow18 />
      <GroupHeaderRow5 />
      <GroupHeaderRow6 />
      <GroupHeaderRow7 />
      <GroupHeaderRow8 />
      <GroupHeaderRow9 />
      <UserRow19 />
      <UserRow20 />
      <UserRow21 />
      <UserRow22 />
      <UserRow23 />
      <UserRow24 />
      <UserRow25 />
      <UserRow26 />
      <UserRow27 />
      <UserRow28 />
      <UserRow29 />
      <UserRow30 />
      <UserRow31 />
      <UserRow32 />
      <UserRow33 />
      <UserRow34 />
      <UserRow35 />
      <UserRow36 />
      <UserRow37 />
      <TableHeader />
      <TableHeader9 />
    </div>
  );
}

function Text191() {
  return (
    <div className="absolute h-[23.993px] left-[12px] top-[7.45px] w-[75.747px]" data-name="Text">
      <p className="absolute font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[24px] left-0 not-italic text-[#384857] text-[16px] top-[-0.78px] whitespace-nowrap">Group by:</p>
    </div>
  );
}

function Text192() {
  return (
    <div className="h-[17.986px] relative shrink-0 w-[54.028px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start relative size-full">
        <p className="font-['Open_Sans:Regular',sans-serif] font-normal leading-[18px] relative shrink-0 text-[#384857] text-[12px] whitespace-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
          Company
        </p>
      </div>
    </div>
  );
}

function XIcon() {
  return (
    <div className="h-[10px] overflow-clip relative shrink-0 w-full" data-name="XIcon">
      <div className="absolute inset-[20%]" data-name="Vector">
        <div className="absolute inset-[-12.5%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 7.5 7.5">
            <path d={svgPaths.p11bd09a0} id="Vector" stroke="var(--stroke-0, #384857)" strokeLinecap="round" strokeWidth="1.5" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function Button26() {
  return (
    <div className="relative rounded-[4px] shrink-0 size-[11.979px]" data-name="Button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start pt-[0.99px] px-[0.99px] relative size-full">
        <XIcon />
      </div>
    </div>
  );
}

function Container188() {
  return (
    <div className="absolute bg-[#e5e7e9] content-stretch flex gap-[5px] h-[23.993px] items-center left-[93.73px] pl-[9.323px] rounded-[4px] top-[7.45px] w-[88.316px]" data-name="Container">
      <div aria-hidden="true" className="absolute border-[#4d7cfe] border-l-[3.333px] border-solid inset-0 pointer-events-none rounded-[4px]" />
      <Text192 />
      <Button26 />
    </div>
  );
}

function Button27() {
  return (
    <div className="absolute content-stretch flex h-[16.51px] items-start left-[190.03px] top-[11.18px] w-[26.979px]" data-name="Button">
      <p className="font-['Open_Sans:Regular',sans-serif] font-normal leading-[16.5px] relative shrink-0 text-[#ef4444] text-[11px] text-center whitespace-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
        Clear
      </p>
    </div>
  );
}

function ChevronTiny5() {
  return (
    <div className="relative size-[10px]" data-name="ChevronTiny">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 10 10">
        <g id="ChevronTiny">
          <path d="M3 2L7 5L3 8" id="Vector" stroke="var(--stroke-0, #384857)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
        </g>
      </svg>
    </div>
  );
}

function Button28() {
  return (
    <div className="absolute h-[16.51px] left-[225px] top-[11.18px] w-[72.813px]" data-name="Button">
      <div className="absolute flex items-center justify-center left-0 size-[10px] top-[3.25px]" style={{ "--transform-inner-width": "1183", "--transform-inner-height": "22" } as React.CSSProperties}>
        <div className="flex-none rotate-90">
          <ChevronTiny5 />
        </div>
      </div>
      <p className="-translate-x-1/2 absolute font-['Open_Sans:Regular',sans-serif] font-normal leading-[16.5px] left-[43.49px] text-[#384857] text-[11px] text-center top-[-1px] whitespace-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
        Collapse All
      </p>
    </div>
  );
}

function GroupByLane() {
  return (
    <div className="absolute bg-[#fafafa] border-[#f0f0f0] border-b-[1.111px] border-solid h-[40px] left-[1.11px] top-[51.11px] w-[1088.229px]" data-name="GroupByLane">
      <Text191 />
      <Container188 />
      <Button27 />
      <Button28 />
    </div>
  );
}

function Text193() {
  return (
    <div className="absolute content-stretch flex h-[17.986px] items-start left-[15.99px] top-[14.44px] w-[141.753px]" data-name="Text">
      <p className="font-['Open_Sans:Regular',sans-serif] font-normal leading-[18px] relative shrink-0 text-[#667085] text-[12px] whitespace-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
        Showing 1–19 of 24 users
      </p>
    </div>
  );
}

function ArrowLeftIcon() {
  return (
    <div className="h-[10.99px] relative shrink-0 w-[12.986px]" data-name="ArrowLeftIcon">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12.9861 10.9896">
        <g clipPath="url(#clip0_2151_5504)" id="ArrowLeftIcon">
          <path d={svgPaths.p2ed84cc0} id="Vector" stroke="var(--stroke-0, #344054)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.3131" />
        </g>
        <defs>
          <clipPath id="clip0_2151_5504">
            <rect fill="white" height="10.9896" width="12.9861" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Button29() {
  return (
    <div className="bg-white opacity-35 relative rounded-[6px] shrink-0 size-[31.997px]" data-name="Button">
      <div aria-hidden="true" className="absolute border-[#f0f0f0] border-[1.111px] border-solid inset-0 pointer-events-none rounded-[6px]" />
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center pl-[9.496px] pr-[9.514px] py-[1.111px] relative size-full">
        <ArrowLeftIcon />
      </div>
    </div>
  );
}

function Button30() {
  return (
    <div className="bg-[#ff4d00] relative rounded-[6px] shrink-0 size-[31.997px]" data-name="Button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center relative size-full">
        <p className="font-['Open_Sans:Regular',sans-serif] font-normal leading-[18px] relative shrink-0 text-[12px] text-center text-white whitespace-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
          1
        </p>
      </div>
    </div>
  );
}

function Button31() {
  return (
    <div className="relative rounded-[6px] shrink-0 size-[31.997px]" data-name="Button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center relative size-full">
        <p className="font-['Open_Sans:Regular',sans-serif] font-normal leading-[18px] relative shrink-0 text-[#243746] text-[12px] text-center whitespace-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
          2
        </p>
      </div>
    </div>
  );
}

function ArrowRightIcon() {
  return (
    <div className="h-[10.99px] relative shrink-0 w-[12.986px]" data-name="ArrowRightIcon">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12.9861 10.9896">
        <g clipPath="url(#clip0_2151_5483)" id="ArrowRightIcon">
          <path d={svgPaths.pffd3300} id="Vector" stroke="var(--stroke-0, #344054)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.3131" />
        </g>
        <defs>
          <clipPath id="clip0_2151_5483">
            <rect fill="white" height="10.9896" width="12.9861" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Button32() {
  return (
    <div className="bg-white relative rounded-[6px] shrink-0 size-[31.997px]" data-name="Button">
      <div aria-hidden="true" className="absolute border-[#f0f0f0] border-[1.111px] border-solid inset-0 pointer-events-none rounded-[6px]" />
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center pl-[9.496px] pr-[9.514px] py-[1.111px] relative size-full">
        <ArrowRightIcon />
      </div>
    </div>
  );
}

function Container190() {
  return (
    <div className="absolute content-stretch flex gap-[1.997px] h-[31.997px] items-center left-[938.26px] top-[7.43px] w-[133.976px]" data-name="Container">
      <Button29 />
      <Button30 />
      <Button31 />
      <Button32 />
    </div>
  );
}

function CountIcon() {
  return (
    <div className="relative shrink-0 size-[13.993px]" data-name="CountIcon">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 13.9931 13.9931">
        <g id="CountIcon">
          <path d={svgPaths.pa775300} id="Vector" stroke="var(--stroke-0, #344054)" strokeLinecap="round" strokeWidth="1.22439" />
        </g>
      </svg>
    </div>
  );
}

function Text194() {
  return (
    <div className="h-[19.497px] relative shrink-0 w-[63.75px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start relative size-full">
        <p className="font-['Open_Sans:SemiBold',sans-serif] font-semibold leading-[19.5px] relative shrink-0 text-[#243746] text-[13px] text-center whitespace-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
          2 Selected
        </p>
      </div>
    </div>
  );
}

function Segment() {
  return (
    <div className="absolute content-stretch flex gap-[5.99px] h-[33.767px] items-center left-0 pl-[13.993px] top-0 w-[111.719px]" data-name="Segment">
      <CountIcon />
      <Text194 />
    </div>
  );
}

function VDiv() {
  return <div className="absolute bg-[#d0d5dd] h-[19.774px] left-[111.72px] top-[7px] w-[0.99px]" data-name="VDiv" />;
}

function EditIcon() {
  return (
    <div className="relative shrink-0 size-[13.993px]" data-name="EditIcon">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 13.9931 13.9931">
        <g id="EditIcon">
          <path d={svgPaths.p3b2ce700} id="Vector" stroke="var(--stroke-0, #344054)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.22439" />
          <path d={svgPaths.p5accc40} id="Vector_2" stroke="var(--stroke-0, #344054)" strokeLinecap="round" strokeWidth="1.22439" />
        </g>
      </svg>
    </div>
  );
}

function Text195() {
  return (
    <div className="h-[19.497px] relative shrink-0 w-[52.969px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start relative size-full">
        <p className="font-['Open_Sans:Regular',sans-serif] font-normal leading-[19.5px] relative shrink-0 text-[#243746] text-[13px] text-center whitespace-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
          Edit Bulk
        </p>
      </div>
    </div>
  );
}

function Segment1() {
  return (
    <div className="absolute content-stretch flex gap-[5.99px] h-[33.767px] items-center left-[112.71px] pl-[13.993px] top-0 w-[100.938px]" data-name="Segment">
      <EditIcon />
      <Text195 />
    </div>
  );
}

function VDiv1() {
  return <div className="absolute bg-[#d0d5dd] h-[19.774px] left-[213.65px] top-[7px] w-[0.99px]" data-name="VDiv" />;
}

function TrashIcon() {
  return (
    <div className="relative shrink-0 size-[13.993px]" data-name="TrashIcon">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 13.9931 13.9931">
        <g id="TrashIcon">
          <path d={svgPaths.p2b711e40} id="Vector" stroke="var(--stroke-0, #344054)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.22439" />
        </g>
      </svg>
    </div>
  );
}

function Text196() {
  return (
    <div className="h-[19.497px] relative shrink-0 w-[48.976px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start relative size-full">
        <p className="font-['Open_Sans:Regular',sans-serif] font-normal leading-[19.5px] relative shrink-0 text-[#243746] text-[13px] text-center whitespace-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
          Remove
        </p>
      </div>
    </div>
  );
}

function Segment2() {
  return (
    <div className="absolute content-stretch flex gap-[5.99px] h-[33.767px] items-center left-[214.64px] pl-[13.993px] top-0 w-[96.944px]" data-name="Segment">
      <TrashIcon />
      <Text196 />
    </div>
  );
}

function VDiv2() {
  return <div className="absolute bg-[#d0d5dd] h-[19.774px] left-[311.58px] top-[7px] w-[0.99px]" data-name="VDiv" />;
}

function BanIcon() {
  return (
    <div className="relative shrink-0 size-[13.993px]" data-name="BanIcon">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 13.9931 13.9931">
        <g clipPath="url(#clip0_2151_5523)" id="BanIcon">
          <path d={svgPaths.p1a4c2000} id="Vector" stroke="var(--stroke-0, #344054)" strokeWidth="1.22439" />
          <path d={svgPaths.p36efaf00} id="Vector_2" stroke="var(--stroke-0, #344054)" strokeLinecap="round" strokeWidth="1.22439" />
        </g>
        <defs>
          <clipPath id="clip0_2151_5523">
            <rect fill="white" height="13.9931" width="13.9931" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Text197() {
  return (
    <div className="flex-[1_0_0] h-[19.497px] min-h-px min-w-px relative" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start relative size-full">
        <p className="font-['Open_Sans:Regular',sans-serif] font-normal leading-[19.5px] relative shrink-0 text-[#243746] text-[13px] text-center whitespace-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
          Suspend
        </p>
      </div>
    </div>
  );
}

function Segment3() {
  return (
    <div className="absolute content-stretch flex gap-[5.99px] h-[33.767px] items-center left-[312.57px] px-[13.993px] top-0 w-[100.451px]" data-name="Segment">
      <BanIcon />
      <Text197 />
    </div>
  );
}

function SelectionActionBar() {
  return (
    <div className="absolute bg-white border-[#d0d5dd] border-[1.111px] border-solid h-[36px] left-[336.49px] overflow-clip rounded-[6px] shadow-[0px_4px_18px_0px_rgba(0,0,0,0.13),0px_1px_4px_0px_rgba(0,0,0,0.07)] top-[5.44px] w-[415px]" data-name="SelectionActionBar">
      <Segment />
      <VDiv />
      <Segment1 />
      <VDiv1 />
      <Segment2 />
      <VDiv2 />
      <Segment3 />
    </div>
  );
}

function Container189() {
  return (
    <div className="absolute bg-[#fafafa] border-[#f0f0f0] border-solid border-t-[1.111px] h-[47.986px] left-[1.11px] top-[762.26px] w-[1088.229px]" data-name="Container">
      <Text193 />
      <Container190 />
      <SelectionActionBar />
    </div>
  );
}

function Container2() {
  return (
    <div className="bg-[#fafafa] h-[811px] relative rounded-[8px] shrink-0 w-[1090px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid overflow-clip relative rounded-[inherit] size-full">
        <Toolbar />
        <Container9 />
        <GroupByLane />
        <Container189 />
      </div>
      <div aria-hidden="true" className="absolute border-[#d9d9d9] border-[1.111px] border-solid inset-0 pointer-events-none rounded-[8px]" />
    </div>
  );
}

function UsersTable() {
  return (
    <div className="h-[811.354px] relative shrink-0 w-full" data-name="UsersTable">
      <div className="overflow-clip rounded-[inherit] size-full">
        <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start relative size-full">
          <Container2 />
        </div>
      </div>
    </div>
  );
}

function Container1() {
  return (
    <div className="flex-[1_0_0] min-h-px min-w-px relative w-[1114px]" data-name="Container">
      <div className="overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex flex-col items-start pl-[11.997px] pt-[11.997px] relative size-full">
          <UsersTable />
        </div>
      </div>
    </div>
  );
}

function MainConvas() {
  return (
    <div className="h-full relative shrink-0" data-name="MainConvas">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col h-full items-start relative">
        <Container />
        <Container1 />
      </div>
    </div>
  );
}

function Paragraph() {
  return (
    <div className="h-[28.802px] relative shrink-0 w-[89.653px]" data-name="Paragraph">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Actor:Regular',sans-serif] leading-[28.8px] left-0 not-italic text-[#1b2736] text-[24px] top-[-1.11px] whitespace-nowrap">Bulk Edit</p>
      </div>
    </div>
  );
}

function Icon23() {
  return (
    <div className="h-[11.997px] overflow-clip relative shrink-0 w-full" data-name="Icon">
      <div className="absolute inset-[12.5%]" data-name="Vector">
        <div className="absolute inset-[-6.25%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 10.1221 10.1221">
            <path d={svgPaths.p39f7ff80} id="Vector" stroke="var(--stroke-0, #384857)" strokeLinecap="round" strokeWidth="1.12467" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function Container193() {
  return (
    <div className="relative shrink-0 size-[27.969px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start pt-[7.986px] px-[7.986px] relative size-full">
        <Icon23 />
      </div>
    </div>
  );
}

function Button33() {
  return (
    <div className="relative rounded-[40px] shrink-0 size-[27.969px]" data-name="Button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center relative size-full">
        <Container193 />
      </div>
    </div>
  );
}

function Container192() {
  return (
    <div className="absolute content-stretch flex h-[71.997px] items-center justify-between left-0 px-[23.993px] top-0 w-[368.889px]" data-name="Container">
      <Paragraph />
      <Button33 />
    </div>
  );
}

function Container194() {
  return <div className="absolute bg-[#f0f0f0] h-[0.99px] left-0 top-[72px] w-[368.889px]" data-name="Container" />;
}

function Container191() {
  return (
    <div className="bg-white h-[72.986px] relative shrink-0 w-[368.889px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <Container192 />
        <Container194 />
      </div>
    </div>
  );
}

function Text198() {
  return (
    <div className="h-[11.997px] relative shrink-0 w-[7.552px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Inter:Bold',sans-serif] font-bold leading-[12px] left-0 not-italic text-[12px] text-white top-[-0.22px] whitespace-nowrap">2</p>
      </div>
    </div>
  );
}

function Container196() {
  return (
    <div className="bg-[#ff4d00] relative rounded-[13.993px] shrink-0 size-[27.986px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center pl-[10.208px] pr-[10.226px] relative size-full">
        <Text198 />
      </div>
    </div>
  );
}

function Text199() {
  return (
    <div className="h-[19.115px] relative shrink-0 w-[177.899px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start relative size-full">
        <p className="font-['Open_Sans:Bold',sans-serif] font-bold leading-[0] relative shrink-0 text-[#384857] text-[0px] text-[13px] whitespace-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
          <span className="leading-[18px]">2</span>
          <span className="font-['Inter:Regular',sans-serif] font-normal leading-[18px] not-italic">{` users selected for bulk edit`}</span>
        </p>
      </div>
    </div>
  );
}

function Container195() {
  return (
    <div className="bg-[#f9fafb] h-[53.09px] relative shrink-0 w-[368.889px]" data-name="Container">
      <div aria-hidden="true" className="absolute border-[#e5e7eb] border-b-[1.111px] border-solid inset-0 pointer-events-none" />
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[10px] items-center pb-[1.111px] pl-[20px] relative size-full">
        <Container196 />
        <Text199 />
      </div>
    </div>
  );
}

function Label() {
  return (
    <div className="h-[18.003px] relative shrink-0 w-[328.889px]" data-name="Label">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start relative size-full">
        <p className="flex-[1_0_0] font-['Open_Sans:Regular',sans-serif] font-normal leading-[18px] min-h-px min-w-px relative text-[13px] text-[rgba(0,0,0,0.65)]" style={{ fontVariationSettings: "'wdth' 100" }}>
          Project Role
        </p>
      </div>
    </div>
  );
}

function Text200() {
  return (
    <div className="flex-[1_0_0] h-[20.99px] min-h-px min-w-px relative" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start overflow-clip relative rounded-[inherit] size-full">
        <p className="flex-[1_0_0] font-['Open_Sans:Italic',sans-serif] font-normal italic leading-[21px] min-h-px min-w-px relative text-[#9ea3a9] text-[14px]" style={{ fontVariationSettings: "'wdth' 100" }}>
          [Multiple Values]
        </p>
      </div>
    </div>
  );
}

function ChevronIco() {
  return (
    <div className="relative shrink-0 size-[15.99px]" data-name="ChevronIco">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 15.9896 15.9896">
        <g id="ChevronIco">
          <path d={svgPaths.p3cfcc3a4} id="Vector" stroke="var(--stroke-0, #9EA3A9)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.19922" />
        </g>
      </svg>
    </div>
  );
}

function ProjectRoleDropdown() {
  return (
    <div className="bg-white h-[40px] relative rounded-[4px] shrink-0 w-[328.889px]" data-name="ProjectRoleDropdown">
      <div aria-hidden="true" className="absolute border-[#d0d5dd] border-[1.111px] border-solid inset-0 pointer-events-none rounded-[4px]" />
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-between px-[11.111px] py-[1.111px] relative size-full">
        <Text200 />
        <ChevronIco />
      </div>
    </div>
  );
}

function FormField() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[5.99px] h-[63.993px] items-start left-0 top-0 w-[328.889px]" data-name="FormField">
      <Label />
      <ProjectRoleDropdown />
    </div>
  );
}

function Label1() {
  return (
    <div className="h-[18.003px] relative shrink-0 w-[328.889px]" data-name="Label">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start relative size-full">
        <p className="flex-[1_0_0] font-['Open_Sans:Regular',sans-serif] font-normal leading-[18px] min-h-px min-w-px relative text-[13px] text-[rgba(0,0,0,0.65)]" style={{ fontVariationSettings: "'wdth' 100" }}>
          User Type
        </p>
      </div>
    </div>
  );
}

function Text201() {
  return (
    <div className="flex-[1_0_0] h-[20.99px] min-h-px min-w-px relative" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start overflow-clip relative rounded-[inherit] size-full">
        <p className="flex-[1_0_0] font-['Open_Sans:Italic',sans-serif] font-normal italic leading-[21px] min-h-px min-w-px relative text-[#9ea3a9] text-[14px]" style={{ fontVariationSettings: "'wdth' 100" }}>
          [Multiple Values]
        </p>
      </div>
    </div>
  );
}

function ChevronIco1() {
  return (
    <div className="relative shrink-0 size-[15.99px]" data-name="ChevronIco">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 15.9896 15.9896">
        <g id="ChevronIco">
          <path d={svgPaths.p3cfcc3a4} id="Vector" stroke="var(--stroke-0, #9EA3A9)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.19922" />
        </g>
      </svg>
    </div>
  );
}

function FormDropdown() {
  return (
    <div className="bg-white h-[40px] relative rounded-[4px] shrink-0 w-[328.889px]" data-name="FormDropdown">
      <div aria-hidden="true" className="absolute border-[#d0d5dd] border-[1.111px] border-solid inset-0 pointer-events-none rounded-[4px]" />
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-between px-[11.111px] py-[1.111px] relative size-full">
        <Text201 />
        <ChevronIco1 />
      </div>
    </div>
  );
}

function FormField1() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[5.99px] h-[63.993px] items-start left-0 top-[91.98px] w-[328.889px]" data-name="FormField">
      <Label1 />
      <FormDropdown />
    </div>
  );
}

function Label2() {
  return (
    <div className="h-[18.003px] relative shrink-0 w-[328.889px]" data-name="Label">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start relative size-full">
        <p className="flex-[1_0_0] font-['Open_Sans:Regular',sans-serif] font-normal leading-[18px] min-h-px min-w-px relative text-[13px] text-[rgba(0,0,0,0.65)]" style={{ fontVariationSettings: "'wdth' 100" }}>
          Status
        </p>
      </div>
    </div>
  );
}

function Text202() {
  return (
    <div className="flex-[1_0_0] h-[20.99px] min-h-px min-w-px relative" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start overflow-clip relative rounded-[inherit] size-full">
        <p className="flex-[1_0_0] font-['Open_Sans:Regular',sans-serif] font-normal leading-[21px] min-h-px min-w-px relative text-[#344054] text-[14px]" style={{ fontVariationSettings: "'wdth' 100" }}>
          Active
        </p>
      </div>
    </div>
  );
}

function ChevronIco2() {
  return (
    <div className="relative shrink-0 size-[15.99px]" data-name="ChevronIco">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 15.9896 15.9896">
        <g id="ChevronIco">
          <path d={svgPaths.p3cfcc3a4} id="Vector" stroke="var(--stroke-0, #9EA3A9)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.19922" />
        </g>
      </svg>
    </div>
  );
}

function FormDropdown1() {
  return (
    <div className="bg-white h-[40px] relative rounded-[4px] shrink-0 w-[328.889px]" data-name="FormDropdown">
      <div aria-hidden="true" className="absolute border-[#d0d5dd] border-[1.111px] border-solid inset-0 pointer-events-none rounded-[4px]" />
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-between px-[11.111px] py-[1.111px] relative size-full">
        <Text202 />
        <ChevronIco2 />
      </div>
    </div>
  );
}

function FormField2() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[5.99px] h-[63.993px] items-start left-0 top-[183.96px] w-[328.889px]" data-name="FormField">
      <Label2 />
      <FormDropdown1 />
    </div>
  );
}

function Label3() {
  return (
    <div className="h-[18.003px] relative shrink-0 w-[328.889px]" data-name="Label">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start relative size-full">
        <p className="flex-[1_0_0] font-['Open_Sans:Regular',sans-serif] font-normal leading-[18px] min-h-px min-w-px relative text-[13px] text-[rgba(0,0,0,0.65)]" style={{ fontVariationSettings: "'wdth' 100" }}>
          Office
        </p>
      </div>
    </div>
  );
}

function Text203() {
  return (
    <div className="flex-[1_0_0] h-[20.99px] min-h-px min-w-px relative" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start overflow-clip relative rounded-[inherit] size-full">
        <p className="flex-[1_0_0] font-['Open_Sans:Italic',sans-serif] font-normal italic leading-[21px] min-h-px min-w-px relative text-[#9ea3a9] text-[14px]" style={{ fontVariationSettings: "'wdth' 100" }}>
          [Multiple Values]
        </p>
      </div>
    </div>
  );
}

function ChevronIco3() {
  return (
    <div className="relative shrink-0 size-[15.99px]" data-name="ChevronIco">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 15.9896 15.9896">
        <g id="ChevronIco">
          <path d={svgPaths.p3cfcc3a4} id="Vector" stroke="var(--stroke-0, #9EA3A9)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.19922" />
        </g>
      </svg>
    </div>
  );
}

function FormDropdown2() {
  return (
    <div className="bg-white h-[40px] relative rounded-[4px] shrink-0 w-[328.889px]" data-name="FormDropdown">
      <div aria-hidden="true" className="absolute border-[#d0d5dd] border-[1.111px] border-solid inset-0 pointer-events-none rounded-[4px]" />
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-between px-[11.111px] py-[1.111px] relative size-full">
        <Text203 />
        <ChevronIco3 />
      </div>
    </div>
  );
}

function FormField3() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[5.99px] h-[63.993px] items-start left-0 top-[259.95px] w-[328.889px]" data-name="FormField">
      <Label3 />
      <FormDropdown2 />
    </div>
  );
}

function Paragraph1() {
  return (
    <div className="h-[16.51px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[16.5px] left-0 not-italic text-[#9ca3af] text-[11px] top-[0.11px] tracking-[0.5px] uppercase whitespace-nowrap">Current statuses</p>
    </div>
  );
}

function Container202() {
  return <div className="bg-[#12b76a] rounded-[2.5px] shrink-0 size-[5px]" data-name="Container" />;
}

function Text204() {
  return (
    <div className="h-[18.003px] relative shrink-0 w-[36.806px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[18px] left-0 not-italic text-[#027a48] text-[12px] top-[0.11px] whitespace-nowrap">Active</p>
      </div>
    </div>
  );
}

function StatusPill() {
  return (
    <div className="bg-[#ecfdf3] h-[21.997px] relative rounded-[9999px] shrink-0 w-[67.795px]" data-name="StatusPill">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[5.99px] items-center pl-[10px] relative size-full">
        <Container202 />
        <Text204 />
      </div>
    </div>
  );
}

function Text205() {
  return (
    <div className="h-[16.51px] relative shrink-0 w-[13.993px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[16.5px] left-0 not-italic text-[#9ca3af] text-[11px] top-[0.11px] whitespace-nowrap">×2</p>
      </div>
    </div>
  );
}

function Container201() {
  return (
    <div className="absolute content-stretch flex gap-[5px] h-[21.997px] items-center left-0 top-0 w-[86.788px]" data-name="Container">
      <StatusPill />
      <Text205 />
    </div>
  );
}

function Container200() {
  return (
    <div className="h-[21.997px] relative shrink-0 w-full" data-name="Container">
      <Container201 />
    </div>
  );
}

function Container199() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[7.986px] h-[63.594px] items-start left-0 pt-[17.101px] top-[343.94px] w-[328.889px]" data-name="Container">
      <div aria-hidden="true" className="absolute border-[#f0f0f0] border-solid border-t-[1.111px] inset-0 pointer-events-none" />
      <Paragraph1 />
      <Container200 />
    </div>
  );
}

function Container198() {
  return (
    <div className="h-[427.535px] relative shrink-0 w-full" data-name="Container">
      <FormField />
      <FormField1 />
      <FormField2 />
      <FormField3 />
      <Container199 />
    </div>
  );
}

function Container197() {
  return (
    <div className="flex-[1_0_0] min-h-px min-w-px relative w-[368.889px]" data-name="Container">
      <div className="overflow-clip rounded-[inherit] size-full">
        <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start pt-[20px] px-[20px] relative size-full">
          <Container198 />
        </div>
      </div>
    </div>
  );
}

function Icon24() {
  return (
    <div className="absolute left-[17.1px] size-[13.993px] top-[10.99px]" data-name="Icon">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 13.9931 13.9931">
        <g id="Icon">
          <path d={svgPaths.p35839400} id="Vector" stroke="var(--stroke-0, #616D79)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.13694" />
        </g>
      </svg>
    </div>
  );
}

function Button34() {
  return (
    <div className="bg-[#f2f3f4] h-[35.99px] relative rounded-[4px] shrink-0 w-[160.208px]" data-name="Button">
      <div aria-hidden="true" className="absolute border-[#c3c7cc] border-[1.111px] border-solid inset-0 pointer-events-none rounded-[4px]" />
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <Icon24 />
        <p className="-translate-x-1/2 absolute font-['Inter:Regular',sans-serif] font-normal leading-[21px] left-[90.08px] not-italic text-[#616d79] text-[14px] text-center top-[6.61px] whitespace-nowrap">Remove 2 users</p>
      </div>
    </div>
  );
}

function Container203() {
  return (
    <div className="h-[69.08px] relative shrink-0 w-[368.889px]" data-name="Container">
      <div aria-hidden="true" className="absolute border-[#c3c7cc] border-solid border-t-[1.111px] inset-0 pointer-events-none" />
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-end pr-[20px] pt-[1.111px] relative size-full">
        <Button34 />
      </div>
    </div>
  );
}

function BulkEditPanel() {
  return (
    <div className="bg-white h-[907px] relative shrink-0 w-full" data-name="BulkEditPanel">
      <div className="overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex flex-col items-start pl-[1.111px] relative size-full">
          <Container191 />
          <Container195 />
          <Container197 />
          <Container203 />
        </div>
      </div>
      <div aria-hidden="true" className="absolute border-[#e5e7eb] border-l-[1.111px] border-solid inset-0 pointer-events-none shadow-[-4px_0px_16px_0px_rgba(0,0,0,0.1)]" />
    </div>
  );
}

function SidePanel() {
  return (
    <div className="h-[907px] relative shrink-0 w-[370px]" data-name="Side Panel">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start overflow-clip relative rounded-[inherit] size-full">
        <BulkEditPanel />
      </div>
    </div>
  );
}

export default function MainContent() {
  return (
    <div className="bg-white content-stretch flex items-end justify-center relative size-full" data-name="MainContent">
      <MainConvas />
      <SidePanel />
    </div>
  );
}