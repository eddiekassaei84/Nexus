import svgPaths from "./svg-489hpipx3e";

function TextInput() {
  return (
    <div className="absolute bg-white h-[36px] left-0 rounded-[4px] top-0 w-[276px]" data-name="Text Input">
      <div className="content-stretch flex items-center overflow-clip pl-[34px] pr-[10px] relative rounded-[inherit] size-full">
        <p className="font-['Open_Sans:Regular',sans-serif] font-normal leading-[normal] relative shrink-0 text-[14px] text-[rgba(52,64,84,0.5)] whitespace-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
          Search users…
        </p>
      </div>
      <div aria-hidden="true" className="absolute border border-[#d0d5dd] border-solid inset-0 pointer-events-none rounded-[4px]" />
    </div>
  );
}

function SearchIcon() {
  return (
    <div className="flex-[1_0_0] h-[16px] min-h-px min-w-px relative" data-name="SearchIcon">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid overflow-clip relative rounded-[inherit] size-full">
        <div className="absolute bottom-1/4 left-[10%] right-1/4 top-[10%]" data-name="Vector">
          <div className="absolute inset-[-5.77%]">
            <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 11.6 11.6">
              <path d={svgPaths.p6a0e00} id="Vector" stroke="var(--stroke-0, #9CA4AE)" strokeWidth="1.2" />
            </svg>
          </div>
        </div>
        <div className="absolute inset-[67.5%_10%_10%_67.5%]" data-name="Vector">
          <div className="absolute inset-[-16.67%]">
            <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 4.8 4.8">
              <path d="M0.6 0.6L4.2 4.2" id="Vector" stroke="var(--stroke-0, #9CA4AE)" strokeLinecap="round" strokeWidth="1.2" />
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
      <SearchIcon />
    </div>
  );
}

function Container1() {
  return (
    <div className="absolute h-[36px] left-0 top-0 w-[276px]" data-name="Container">
      <TextInput />
      <Text />
    </div>
  );
}

function Icon() {
  return (
    <div className="relative shrink-0 size-[18px]" data-name="Icon">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 18 18">
        <g clipPath="url(#clip0_2203_1382)" id="Icon">
          <path d={svgPaths.p3877eb00} id="Vector" stroke="var(--stroke-0, #616D79)" strokeLinejoin="round" strokeWidth="1.25581" />
        </g>
        <defs>
          <clipPath id="clip0_2203_1382">
            <rect fill="white" height="18" width="18" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Text1() {
  return (
    <div className="flex-[1_0_0] h-[21px] min-h-px min-w-px relative" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="-translate-x-1/2 absolute font-['Open_Sans:Regular',sans-serif] font-normal leading-[21px] left-[16.5px] text-[#616d79] text-[14px] text-center top-0 whitespace-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
          Filter
        </p>
      </div>
    </div>
  );
}

function Button() {
  return (
    <div className="absolute bg-[#f2f3f4] content-stretch flex gap-[4px] h-[36px] items-center left-[284px] px-[17px] py-px rounded-[4px] top-0 w-[88.875px]" data-name="Button">
      <div aria-hidden="true" className="absolute border border-[#c3c7cc] border-solid inset-0 pointer-events-none rounded-[4px]" />
      <Icon />
      <Text1 />
    </div>
  );
}

function Container() {
  return (
    <div className="h-[36px] relative shrink-0 w-[372.875px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <Container1 />
        <Button />
      </div>
    </div>
  );
}

function Content() {
  return (
    <div className="bg-[#f2f3f4] h-[40px] relative rounded-[4px] shrink-0" data-name="content">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[4px] h-full items-center justify-center overflow-clip px-[16px] relative rounded-[inherit]">
        <div className="overflow-clip relative shrink-0 size-[24px]" data-name="clock.arrow.2.circlepath">
          <div className="absolute inset-[16.34%_11.4%_18.81%_11.35%]" data-name="clock.arrow.2.circlepath">
            <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 18.5395 15.5642">
              <path d={svgPaths.p3c616380} fill="var(--fill-0, #616D79)" id="clock.arrow.2.circlepath" />
            </svg>
          </div>
        </div>
        <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[#616d79] text-[16px] text-center whitespace-nowrap">
          <p className="leading-[22px]">Jobs</p>
        </div>
      </div>
      <div aria-hidden="true" className="absolute border border-[#c3c7cc] border-solid inset-0 pointer-events-none rounded-[4px]" />
    </div>
  );
}

function PlusIcon() {
  return (
    <div className="relative shrink-0 size-[12px]" data-name="PlusIcon">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12 12">
        <g clipPath="url(#clip0_2203_1385)" id="PlusIcon">
          <path d={svgPaths.p5d7ae40} fill="var(--fill-0, white)" id="Vector" />
        </g>
        <defs>
          <clipPath id="clip0_2203_1385">
            <rect fill="white" height="12" width="12" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Text2() {
  return (
    <div className="h-[20px] relative shrink-0" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex h-full items-start relative">
        <p className="font-['Open_Sans:Regular',sans-serif] font-normal leading-[20px] relative shrink-0 text-[14px] text-center text-white whitespace-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
          Add New File
        </p>
      </div>
    </div>
  );
}

function Button1() {
  return (
    <div className="bg-[#ff4d00] h-[36px] relative rounded-[4px] shrink-0" data-name="Button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[4px] h-full items-center px-[16px] relative">
        <PlusIcon />
        <Text2 />
      </div>
    </div>
  );
}

function Container2() {
  return (
    <div className="h-[36px] relative shrink-0" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[8px] h-full items-center relative">
        <Content />
        <Button1 />
      </div>
    </div>
  );
}

export default function Toolbar() {
  return (
    <div className="bg-[#fafafa] content-stretch flex items-center justify-between pb-px px-[12px] relative size-full" data-name="Toolbar">
      <div aria-hidden="true" className="absolute border-[#f0f0f0] border-b border-solid inset-0 pointer-events-none" />
      <Container />
      <Container2 />
    </div>
  );
}