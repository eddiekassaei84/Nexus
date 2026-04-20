import svgPaths from "./svg-g9006cz7g5";

function Heading() {
  return (
    <div className="h-[31.997px] relative shrink-0 w-[209.479px]" data-name="Heading 1">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[32px] left-0 not-italic text-[#1d2c38] text-[24px] top-[-0.89px] whitespace-nowrap">Teams</p>
      </div>
    </div>
  );
}

function Container() {
  return (
    <div className="bg-white h-[71.997px] relative shrink-0 w-[1484.444px]" data-name="Container">
      <div aria-hidden="true" className="absolute border-[#d9d9d9] border-b-[1.111px] border-solid inset-0 pointer-events-none" />
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center pb-[1.111px] pl-[23.993px] relative size-full">
        <Heading />
      </div>
    </div>
  );
}

function Text() {
  return (
    <div className="h-[19.497px] relative shrink-0 w-[33.698px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start relative size-full">
        <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[24px] not-italic relative shrink-0 text-[#384857] text-[16px] whitespace-nowrap">Teams</p>
      </div>
    </div>
  );
}

function PrimaryBtn() {
  return (
    <div className="bg-[#ff4d00] relative rounded-[4px] shrink-0" data-name="PrimaryBtn">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[4px] items-center px-[8px] py-[7px] relative">
        <div className="relative shrink-0 size-[11.997px]" data-name="Vector">
          <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 11.9965 11.9965">
            <path d={svgPaths.p33437200} fill="var(--fill-0, white)" id="Vector" />
          </svg>
        </div>
        <p className="font-['Inter:Regular',sans-serif] font-normal leading-[21px] not-italic relative shrink-0 text-[14px] text-center text-white whitespace-nowrap">Add Team</p>
      </div>
    </div>
  );
}

function Container4() {
  return (
    <div className="h-[36px] relative shrink-0" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex h-full items-center relative">
        <PrimaryBtn />
      </div>
    </div>
  );
}

function Container3() {
  return (
    <div className="bg-[#fafafa] h-[47.986px] relative shrink-0 w-[357.778px]" data-name="Container">
      <div aria-hidden="true" className="absolute border-[#f0f0f0] border-b-[1.111px] border-solid inset-0 pointer-events-none" />
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-between pb-[1.111px] px-[12px] relative size-full">
        <Text />
        <Container4 />
      </div>
    </div>
  );
}

function TextInput() {
  return (
    <div className="absolute bg-white h-[35.99px] left-0 rounded-[4px] top-0 w-[337.778px]" data-name="Text Input">
      <div className="content-stretch flex items-center overflow-clip pl-[34px] pr-[10px] relative rounded-[inherit] size-full">
        <p className="font-['Open_Sans:Regular',sans-serif] font-normal leading-[normal] relative shrink-0 text-[14px] text-[rgba(52,64,84,0.5)] whitespace-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
          Search roles…
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

function Container6() {
  return (
    <div className="absolute content-stretch flex items-center left-[10px] size-[16px] top-[9.99px]" data-name="Container">
      <SearchIcon />
    </div>
  );
}

function RolesSearchInput() {
  return (
    <div className="h-[35.99px] relative shrink-0 w-full" data-name="RolesSearchInput">
      <TextInput />
      <Container6 />
    </div>
  );
}

function Container5() {
  return (
    <div className="bg-white h-[53.073px] relative shrink-0 w-[357.778px]" data-name="Container">
      <div aria-hidden="true" className="absolute border-[#e5e7eb] border-b-[1.111px] border-solid inset-0 pointer-events-none" />
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start pb-[1.111px] pt-[7.986px] px-[10px] relative size-full">
        <RolesSearchInput />
      </div>
    </div>
  );
}

function Text1() {
  return (
    <div className="h-[19.497px] relative shrink-0 w-[137.708px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start overflow-clip relative rounded-[inherit] size-full">
        <p className="font-['Open_Sans:Regular',sans-serif] font-normal leading-[19.5px] relative shrink-0 text-[#1d2939] text-[13px] whitespace-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
          Construction Manager
        </p>
      </div>
    </div>
  );
}

function RoleListItem() {
  return (
    <div className="bg-[#fff8f5] h-[40px] relative shrink-0 w-full" data-name="RoleListItem">
      <div aria-hidden="true" className="absolute border-[#ff4d00] border-b-[1.111px] border-l-[2.222px] border-solid inset-0 pointer-events-none" />
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex items-center pb-[1.111px] pl-[15.208px] relative size-full">
          <Text1 />
        </div>
      </div>
    </div>
  );
}

function Text2() {
  return (
    <div className="h-[19.497px] relative shrink-0 w-[79.514px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start overflow-clip relative rounded-[inherit] size-full">
        <p className="font-['Open_Sans:Regular',sans-serif] font-normal leading-[19.5px] relative shrink-0 text-[#262626] text-[13px] whitespace-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
          Site Manager
        </p>
      </div>
    </div>
  );
}

function RoleListItem1() {
  return (
    <div className="bg-white h-[40px] relative shrink-0 w-full" data-name="RoleListItem">
      <div aria-hidden="true" className="absolute border-[rgba(0,0,0,0)] border-b-[1.111px] border-l-[2.222px] border-solid inset-0 pointer-events-none" />
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex items-center pb-[1.111px] pl-[18.212px] relative size-full">
          <Text2 />
        </div>
      </div>
    </div>
  );
}

function Text3() {
  return (
    <div className="h-[19.497px] relative shrink-0 w-[94.705px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start overflow-clip relative rounded-[inherit] size-full">
        <p className="font-['Open_Sans:Regular',sans-serif] font-normal leading-[19.5px] relative shrink-0 text-[#262626] text-[13px] whitespace-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
          Superintendent
        </p>
      </div>
    </div>
  );
}

function RoleListItem2() {
  return (
    <div className="bg-white h-[40px] relative shrink-0 w-full" data-name="RoleListItem">
      <div aria-hidden="true" className="absolute border-[rgba(0,0,0,0)] border-b-[1.111px] border-l-[2.222px] border-solid inset-0 pointer-events-none" />
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex items-center pb-[1.111px] pl-[18.212px] relative size-full">
          <Text3 />
        </div>
      </div>
    </div>
  );
}

function Text4() {
  return (
    <div className="h-[19.497px] relative shrink-0 w-[145.92px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start overflow-clip relative rounded-[inherit] size-full">
        <p className="font-['Open_Sans:Regular',sans-serif] font-normal leading-[19.5px] relative shrink-0 text-[#262626] text-[13px] whitespace-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
          General Superintendent
        </p>
      </div>
    </div>
  );
}

function RoleListItem3() {
  return (
    <div className="bg-white h-[40px] relative shrink-0 w-full" data-name="RoleListItem">
      <div aria-hidden="true" className="absolute border-[rgba(0,0,0,0)] border-b-[1.111px] border-l-[2.222px] border-solid inset-0 pointer-events-none" />
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex items-center pb-[1.111px] pl-[18.212px] relative size-full">
          <Text4 />
        </div>
      </div>
    </div>
  );
}

function Text5() {
  return (
    <div className="h-[19.497px] relative shrink-0 w-[85.33px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start overflow-clip relative rounded-[inherit] size-full">
        <p className="font-['Open_Sans:Regular',sans-serif] font-normal leading-[19.5px] relative shrink-0 text-[#262626] text-[13px] whitespace-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
          Field Engineer
        </p>
      </div>
    </div>
  );
}

function RoleListItem4() {
  return (
    <div className="bg-white h-[40px] relative shrink-0 w-full" data-name="RoleListItem">
      <div aria-hidden="true" className="absolute border-[rgba(0,0,0,0)] border-b-[1.111px] border-l-[2.222px] border-solid inset-0 pointer-events-none" />
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex items-center pb-[1.111px] pl-[18.212px] relative size-full">
          <Text5 />
        </div>
      </div>
    </div>
  );
}

function Text6() {
  return (
    <div className="h-[19.497px] relative shrink-0 w-[156.285px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start overflow-clip relative rounded-[inherit] size-full">
        <p className="font-['Open_Sans:Regular',sans-serif] font-normal leading-[19.5px] relative shrink-0 text-[#262626] text-[13px] whitespace-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
          Discipline Superintendent
        </p>
      </div>
    </div>
  );
}

function RoleListItem5() {
  return (
    <div className="bg-white h-[40px] relative shrink-0 w-full" data-name="RoleListItem">
      <div aria-hidden="true" className="absolute border-[rgba(0,0,0,0)] border-b-[1.111px] border-l-[2.222px] border-solid inset-0 pointer-events-none" />
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex items-center pb-[1.111px] pl-[18.212px] relative size-full">
          <Text6 />
        </div>
      </div>
    </div>
  );
}

function Container8() {
  return (
    <div className="absolute content-stretch flex flex-col h-[267.986px] items-start left-0 pt-[27.986px] top-0 w-[341.111px]" data-name="Container">
      <RoleListItem />
      <RoleListItem1 />
      <RoleListItem2 />
      <RoleListItem3 />
      <RoleListItem4 />
      <RoleListItem5 />
    </div>
  );
}

function Text7() {
  return (
    <div className="h-[19.497px] relative shrink-0 w-[135.087px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start overflow-clip relative rounded-[inherit] size-full">
        <p className="font-['Open_Sans:Regular',sans-serif] font-normal leading-[19.5px] relative shrink-0 text-[#262626] text-[13px] whitespace-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
          Owner Representative
        </p>
      </div>
    </div>
  );
}

function RoleListItem6() {
  return (
    <div className="bg-white h-[40px] relative shrink-0 w-full" data-name="RoleListItem">
      <div aria-hidden="true" className="absolute border-[rgba(0,0,0,0)] border-b-[1.111px] border-l-[2.222px] border-solid inset-0 pointer-events-none" />
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex items-center pb-[1.111px] pl-[18.212px] relative size-full">
          <Text7 />
        </div>
      </div>
    </div>
  );
}

function Text8() {
  return (
    <div className="h-[19.497px] relative shrink-0 w-[128.976px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start overflow-clip relative rounded-[inherit] size-full">
        <p className="font-['Open_Sans:Regular',sans-serif] font-normal leading-[19.5px] relative shrink-0 text-[#262626] text-[13px] whitespace-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
          Client Representative
        </p>
      </div>
    </div>
  );
}

function RoleListItem7() {
  return (
    <div className="bg-white h-[40px] relative shrink-0 w-full" data-name="RoleListItem">
      <div aria-hidden="true" className="absolute border-[rgba(0,0,0,0)] border-b-[1.111px] border-l-[2.222px] border-solid inset-0 pointer-events-none" />
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex items-center pb-[1.111px] pl-[18.212px] relative size-full">
          <Text8 />
        </div>
      </div>
    </div>
  );
}

function Text9() {
  return (
    <div className="h-[19.497px] relative shrink-0 w-[62.205px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start overflow-clip relative rounded-[inherit] size-full">
        <p className="font-['Open_Sans:Regular',sans-serif] font-normal leading-[19.5px] relative shrink-0 text-[#262626] text-[13px] whitespace-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
          Developer
        </p>
      </div>
    </div>
  );
}

function RoleListItem8() {
  return (
    <div className="bg-white h-[40px] relative shrink-0 w-full" data-name="RoleListItem">
      <div aria-hidden="true" className="absolute border-[rgba(0,0,0,0)] border-b-[1.111px] border-l-[2.222px] border-solid inset-0 pointer-events-none" />
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex items-center pb-[1.111px] pl-[18.212px] relative size-full">
          <Text9 />
        </div>
      </div>
    </div>
  );
}

function Text10() {
  return (
    <div className="h-[19.497px] relative shrink-0 w-[89.722px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start overflow-clip relative rounded-[inherit] size-full">
        <p className="font-['Open_Sans:Regular',sans-serif] font-normal leading-[19.5px] relative shrink-0 text-[#262626] text-[13px] whitespace-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
          Asset Manager
        </p>
      </div>
    </div>
  );
}

function RoleListItem9() {
  return (
    <div className="bg-white h-[40px] relative shrink-0 w-full" data-name="RoleListItem">
      <div aria-hidden="true" className="absolute border-[rgba(0,0,0,0)] border-b-[1.111px] border-l-[2.222px] border-solid inset-0 pointer-events-none" />
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex items-center pb-[1.111px] pl-[18.212px] relative size-full">
          <Text10 />
        </div>
      </div>
    </div>
  );
}

function Container9() {
  return (
    <div className="absolute content-stretch flex flex-col h-[187.986px] items-start left-0 pt-[27.986px] top-[267.99px] w-[341.111px]" data-name="Container">
      <RoleListItem6 />
      <RoleListItem7 />
      <RoleListItem8 />
      <RoleListItem9 />
    </div>
  );
}

function Text11() {
  return (
    <div className="h-[19.497px] relative shrink-0 w-[99.566px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start overflow-clip relative rounded-[inherit] size-full">
        <p className="font-['Open_Sans:Regular',sans-serif] font-normal leading-[19.5px] relative shrink-0 text-[#262626] text-[13px] whitespace-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
          Project Manager
        </p>
      </div>
    </div>
  );
}

function RoleListItem10() {
  return (
    <div className="bg-white h-[40px] relative shrink-0 w-full" data-name="RoleListItem">
      <div aria-hidden="true" className="absolute border-[rgba(0,0,0,0)] border-b-[1.111px] border-l-[2.222px] border-solid inset-0 pointer-events-none" />
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex items-center pb-[1.111px] pl-[18.212px] relative size-full">
          <Text11 />
        </div>
      </div>
    </div>
  );
}

function Text12() {
  return (
    <div className="h-[19.497px] relative shrink-0 w-[146.753px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start overflow-clip relative rounded-[inherit] size-full">
        <p className="font-['Open_Sans:Regular',sans-serif] font-normal leading-[19.5px] relative shrink-0 text-[#262626] text-[13px] whitespace-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
          Deputy Project Manager
        </p>
      </div>
    </div>
  );
}

function RoleListItem11() {
  return (
    <div className="bg-white h-[40px] relative shrink-0 w-full" data-name="RoleListItem">
      <div aria-hidden="true" className="absolute border-[rgba(0,0,0,0)] border-b-[1.111px] border-l-[2.222px] border-solid inset-0 pointer-events-none" />
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex items-center pb-[1.111px] pl-[18.212px] relative size-full">
          <Text12 />
        </div>
      </div>
    </div>
  );
}

function Text13() {
  return (
    <div className="h-[19.497px] relative shrink-0 w-[157.5px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start overflow-clip relative rounded-[inherit] size-full">
        <p className="font-['Open_Sans:Regular',sans-serif] font-normal leading-[19.5px] relative shrink-0 text-[#262626] text-[13px] whitespace-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
          Assistant Project Manager
        </p>
      </div>
    </div>
  );
}

function RoleListItem12() {
  return (
    <div className="bg-white h-[40px] relative shrink-0 w-full" data-name="RoleListItem">
      <div aria-hidden="true" className="absolute border-[rgba(0,0,0,0)] border-b-[1.111px] border-l-[2.222px] border-solid inset-0 pointer-events-none" />
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex items-center pb-[1.111px] pl-[18.212px] relative size-full">
          <Text13 />
        </div>
      </div>
    </div>
  );
}

function Text14() {
  return (
    <div className="h-[19.497px] relative shrink-0 w-[99.201px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start overflow-clip relative rounded-[inherit] size-full">
        <p className="font-['Open_Sans:Regular',sans-serif] font-normal leading-[19.5px] relative shrink-0 text-[#262626] text-[13px] whitespace-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
          Project Engineer
        </p>
      </div>
    </div>
  );
}

function RoleListItem13() {
  return (
    <div className="bg-white h-[40px] relative shrink-0 w-full" data-name="RoleListItem">
      <div aria-hidden="true" className="absolute border-[rgba(0,0,0,0)] border-b-[1.111px] border-l-[2.222px] border-solid inset-0 pointer-events-none" />
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex items-center pb-[1.111px] pl-[18.212px] relative size-full">
          <Text14 />
        </div>
      </div>
    </div>
  );
}

function Text15() {
  return (
    <div className="h-[19.497px] relative shrink-0 w-[119.115px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start overflow-clip relative rounded-[inherit] size-full">
        <p className="font-['Open_Sans:Regular',sans-serif] font-normal leading-[19.5px] relative shrink-0 text-[#262626] text-[13px] whitespace-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
          Project Coordinator
        </p>
      </div>
    </div>
  );
}

function RoleListItem14() {
  return (
    <div className="bg-white h-[40px] relative shrink-0 w-full" data-name="RoleListItem">
      <div aria-hidden="true" className="absolute border-[rgba(0,0,0,0)] border-b-[1.111px] border-l-[2.222px] border-solid inset-0 pointer-events-none" />
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex items-center pb-[1.111px] pl-[18.212px] relative size-full">
          <Text15 />
        </div>
      </div>
    </div>
  );
}

function Container10() {
  return (
    <div className="absolute content-stretch flex flex-col h-[227.986px] items-start left-0 pt-[27.986px] top-[455.97px] w-[341.111px]" data-name="Container">
      <RoleListItem10 />
      <RoleListItem11 />
      <RoleListItem12 />
      <RoleListItem13 />
      <RoleListItem14 />
    </div>
  );
}

function Text16() {
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

function RoleListItem15() {
  return (
    <div className="bg-white h-[40px] relative shrink-0 w-full" data-name="RoleListItem">
      <div aria-hidden="true" className="absolute border-[rgba(0,0,0,0)] border-b-[1.111px] border-l-[2.222px] border-solid inset-0 pointer-events-none" />
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex items-center pb-[1.111px] pl-[18.212px] relative size-full">
          <Text16 />
        </div>
      </div>
    </div>
  );
}

function Text17() {
  return (
    <div className="h-[19.497px] relative shrink-0 w-[102.5px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start overflow-clip relative rounded-[inherit] size-full">
        <p className="font-['Open_Sans:Regular',sans-serif] font-normal leading-[19.5px] relative shrink-0 text-[#262626] text-[13px] whitespace-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
          Interior Designer
        </p>
      </div>
    </div>
  );
}

function RoleListItem16() {
  return (
    <div className="bg-white h-[40px] relative shrink-0 w-full" data-name="RoleListItem">
      <div aria-hidden="true" className="absolute border-[rgba(0,0,0,0)] border-b-[1.111px] border-l-[2.222px] border-solid inset-0 pointer-events-none" />
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex items-center pb-[1.111px] pl-[18.212px] relative size-full">
          <Text17 />
        </div>
      </div>
    </div>
  );
}

function Text18() {
  return (
    <div className="h-[19.497px] relative shrink-0 w-[98.403px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start overflow-clip relative rounded-[inherit] size-full">
        <p className="font-['Open_Sans:Regular',sans-serif] font-normal leading-[19.5px] relative shrink-0 text-[#262626] text-[13px] whitespace-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
          Design Manager
        </p>
      </div>
    </div>
  );
}

function RoleListItem17() {
  return (
    <div className="bg-white h-[40px] relative shrink-0 w-full" data-name="RoleListItem">
      <div aria-hidden="true" className="absolute border-[rgba(0,0,0,0)] border-b-[1.111px] border-l-[2.222px] border-solid inset-0 pointer-events-none" />
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex items-center pb-[1.111px] pl-[18.212px] relative size-full">
          <Text18 />
        </div>
      </div>
    </div>
  );
}

function Text19() {
  return (
    <div className="h-[19.497px] relative shrink-0 w-[117.969px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start overflow-clip relative rounded-[inherit] size-full">
        <p className="font-['Open_Sans:Regular',sans-serif] font-normal leading-[19.5px] relative shrink-0 text-[#262626] text-[13px] whitespace-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
          Design Coordinator
        </p>
      </div>
    </div>
  );
}

function RoleListItem18() {
  return (
    <div className="bg-white h-[40px] relative shrink-0 w-full" data-name="RoleListItem">
      <div aria-hidden="true" className="absolute border-[rgba(0,0,0,0)] border-b-[1.111px] border-l-[2.222px] border-solid inset-0 pointer-events-none" />
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex items-center pb-[1.111px] pl-[18.212px] relative size-full">
          <Text19 />
        </div>
      </div>
    </div>
  );
}

function Container11() {
  return (
    <div className="absolute content-stretch flex flex-col h-[187.986px] items-start left-0 pt-[27.986px] top-[683.96px] w-[341.111px]" data-name="Container">
      <RoleListItem15 />
      <RoleListItem16 />
      <RoleListItem17 />
      <RoleListItem18 />
    </div>
  );
}

function Text20() {
  return (
    <div className="h-[19.497px] relative shrink-0 w-[116.51px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start overflow-clip relative rounded-[inherit] size-full">
        <p className="font-['Open_Sans:Regular',sans-serif] font-normal leading-[19.5px] relative shrink-0 text-[#262626] text-[13px] whitespace-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
          Structural Engineer
        </p>
      </div>
    </div>
  );
}

function RoleListItem19() {
  return (
    <div className="bg-white h-[40px] relative shrink-0 w-full" data-name="RoleListItem">
      <div aria-hidden="true" className="absolute border-[rgba(0,0,0,0)] border-b-[1.111px] border-l-[2.222px] border-solid inset-0 pointer-events-none" />
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex items-center pb-[1.111px] pl-[18.212px] relative size-full">
          <Text20 />
        </div>
      </div>
    </div>
  );
}

function Text21() {
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

function RoleListItem20() {
  return (
    <div className="bg-white h-[40px] relative shrink-0 w-full" data-name="RoleListItem">
      <div aria-hidden="true" className="absolute border-[rgba(0,0,0,0)] border-b-[1.111px] border-l-[2.222px] border-solid inset-0 pointer-events-none" />
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex items-center pb-[1.111px] pl-[18.212px] relative size-full">
          <Text21 />
        </div>
      </div>
    </div>
  );
}

function Text22() {
  return (
    <div className="h-[19.497px] relative shrink-0 w-[125.208px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start overflow-clip relative rounded-[inherit] size-full">
        <p className="font-['Open_Sans:Regular',sans-serif] font-normal leading-[19.5px] relative shrink-0 text-[#262626] text-[13px] whitespace-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
          Mechanical Engineer
        </p>
      </div>
    </div>
  );
}

function RoleListItem21() {
  return (
    <div className="bg-white h-[40px] relative shrink-0 w-full" data-name="RoleListItem">
      <div aria-hidden="true" className="absolute border-[rgba(0,0,0,0)] border-b-[1.111px] border-l-[2.222px] border-solid inset-0 pointer-events-none" />
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex items-center pb-[1.111px] pl-[18.212px] relative size-full">
          <Text22 />
        </div>
      </div>
    </div>
  );
}

function Text23() {
  return (
    <div className="h-[19.497px] relative shrink-0 w-[110.799px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start overflow-clip relative rounded-[inherit] size-full">
        <p className="font-['Open_Sans:Regular',sans-serif] font-normal leading-[19.5px] relative shrink-0 text-[#262626] text-[13px] whitespace-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
          Electrical Engineer
        </p>
      </div>
    </div>
  );
}

function RoleListItem22() {
  return (
    <div className="bg-white h-[40px] relative shrink-0 w-full" data-name="RoleListItem">
      <div aria-hidden="true" className="absolute border-[rgba(0,0,0,0)] border-b-[1.111px] border-l-[2.222px] border-solid inset-0 pointer-events-none" />
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex items-center pb-[1.111px] pl-[18.212px] relative size-full">
          <Text23 />
        </div>
      </div>
    </div>
  );
}

function Text24() {
  return (
    <div className="h-[19.497px] relative shrink-0 w-[114.184px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start overflow-clip relative rounded-[inherit] size-full">
        <p className="font-['Open_Sans:Regular',sans-serif] font-normal leading-[19.5px] relative shrink-0 text-[#262626] text-[13px] whitespace-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
          Plumbing Engineer
        </p>
      </div>
    </div>
  );
}

function RoleListItem23() {
  return (
    <div className="bg-white h-[40px] relative shrink-0 w-full" data-name="RoleListItem">
      <div aria-hidden="true" className="absolute border-[rgba(0,0,0,0)] border-b-[1.111px] border-l-[2.222px] border-solid inset-0 pointer-events-none" />
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex items-center pb-[1.111px] pl-[18.212px] relative size-full">
          <Text24 />
        </div>
      </div>
    </div>
  );
}

function Text25() {
  return (
    <div className="h-[19.497px] relative shrink-0 w-[145.608px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start overflow-clip relative rounded-[inherit] size-full">
        <p className="font-['Open_Sans:Regular',sans-serif] font-normal leading-[19.5px] relative shrink-0 text-[#262626] text-[13px] whitespace-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
          Fire Protection Engineer
        </p>
      </div>
    </div>
  );
}

function RoleListItem24() {
  return (
    <div className="bg-white h-[40px] relative shrink-0 w-full" data-name="RoleListItem">
      <div aria-hidden="true" className="absolute border-[rgba(0,0,0,0)] border-b-[1.111px] border-l-[2.222px] border-solid inset-0 pointer-events-none" />
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex items-center pb-[1.111px] pl-[18.212px] relative size-full">
          <Text25 />
        </div>
      </div>
    </div>
  );
}

function Container12() {
  return (
    <div className="absolute content-stretch flex flex-col h-[267.986px] items-start left-0 pt-[27.986px] top-[871.94px] w-[341.111px]" data-name="Container">
      <RoleListItem19 />
      <RoleListItem20 />
      <RoleListItem21 />
      <RoleListItem22 />
      <RoleListItem23 />
      <RoleListItem24 />
    </div>
  );
}

function Text26() {
  return (
    <div className="h-[19.497px] relative shrink-0 w-[80.885px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start overflow-clip relative rounded-[inherit] size-full">
        <p className="font-['Open_Sans:Regular',sans-serif] font-normal leading-[19.5px] relative shrink-0 text-[#262626] text-[13px] whitespace-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
          BIM Manager
        </p>
      </div>
    </div>
  );
}

function RoleListItem25() {
  return (
    <div className="bg-white h-[40px] relative shrink-0 w-full" data-name="RoleListItem">
      <div aria-hidden="true" className="absolute border-[rgba(0,0,0,0)] border-b-[1.111px] border-l-[2.222px] border-solid inset-0 pointer-events-none" />
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex items-center pb-[1.111px] pl-[18.212px] relative size-full">
          <Text26 />
        </div>
      </div>
    </div>
  );
}

function Text27() {
  return (
    <div className="h-[19.497px] relative shrink-0 w-[100.451px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start overflow-clip relative rounded-[inherit] size-full">
        <p className="font-['Open_Sans:Regular',sans-serif] font-normal leading-[19.5px] relative shrink-0 text-[#262626] text-[13px] whitespace-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
          BIM Coordinator
        </p>
      </div>
    </div>
  );
}

function RoleListItem26() {
  return (
    <div className="bg-white h-[40px] relative shrink-0 w-full" data-name="RoleListItem">
      <div aria-hidden="true" className="absolute border-[rgba(0,0,0,0)] border-b-[1.111px] border-l-[2.222px] border-solid inset-0 pointer-events-none" />
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex items-center pb-[1.111px] pl-[18.212px] relative size-full">
          <Text27 />
        </div>
      </div>
    </div>
  );
}

function Text28() {
  return (
    <div className="h-[19.497px] relative shrink-0 w-[77.76px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start overflow-clip relative rounded-[inherit] size-full">
        <p className="font-['Open_Sans:Regular',sans-serif] font-normal leading-[19.5px] relative shrink-0 text-[#262626] text-[13px] whitespace-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
          BIM Modeler
        </p>
      </div>
    </div>
  );
}

function RoleListItem27() {
  return (
    <div className="bg-white h-[40px] relative shrink-0 w-full" data-name="RoleListItem">
      <div aria-hidden="true" className="absolute border-[rgba(0,0,0,0)] border-b-[1.111px] border-l-[2.222px] border-solid inset-0 pointer-events-none" />
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex items-center pb-[1.111px] pl-[18.212px] relative size-full">
          <Text28 />
        </div>
      </div>
    </div>
  );
}

function Text29() {
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

function RoleListItem28() {
  return (
    <div className="bg-white h-[40px] relative shrink-0 w-full" data-name="RoleListItem">
      <div aria-hidden="true" className="absolute border-[rgba(0,0,0,0)] border-b-[1.111px] border-l-[2.222px] border-solid inset-0 pointer-events-none" />
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex items-center pb-[1.111px] pl-[18.212px] relative size-full">
          <Text29 />
        </div>
      </div>
    </div>
  );
}

function Text30() {
  return (
    <div className="h-[19.497px] relative shrink-0 w-[123.142px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start overflow-clip relative rounded-[inherit] size-full">
        <p className="font-['Open_Sans:Regular',sans-serif] font-normal leading-[19.5px] relative shrink-0 text-[#262626] text-[13px] whitespace-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
          Digital Delivery Lead
        </p>
      </div>
    </div>
  );
}

function RoleListItem29() {
  return (
    <div className="bg-white h-[40px] relative shrink-0 w-full" data-name="RoleListItem">
      <div aria-hidden="true" className="absolute border-[rgba(0,0,0,0)] border-b-[1.111px] border-l-[2.222px] border-solid inset-0 pointer-events-none" />
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex items-center pb-[1.111px] pl-[18.212px] relative size-full">
          <Text30 />
        </div>
      </div>
    </div>
  );
}

function Container13() {
  return (
    <div className="absolute content-stretch flex flex-col h-[227.986px] items-start left-0 pt-[27.986px] top-[1139.93px] w-[341.111px]" data-name="Container">
      <RoleListItem25 />
      <RoleListItem26 />
      <RoleListItem27 />
      <RoleListItem28 />
      <RoleListItem29 />
    </div>
  );
}

function Text31() {
  return (
    <div className="h-[19.497px] relative shrink-0 w-[58.368px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start overflow-clip relative rounded-[inherit] size-full">
        <p className="font-['Open_Sans:Regular',sans-serif] font-normal leading-[19.5px] relative shrink-0 text-[#262626] text-[13px] whitespace-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
          Estimator
        </p>
      </div>
    </div>
  );
}

function RoleListItem30() {
  return (
    <div className="bg-white h-[40px] relative shrink-0 w-full" data-name="RoleListItem">
      <div aria-hidden="true" className="absolute border-[rgba(0,0,0,0)] border-b-[1.111px] border-l-[2.222px] border-solid inset-0 pointer-events-none" />
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex items-center pb-[1.111px] pl-[18.212px] relative size-full">
          <Text31 />
        </div>
      </div>
    </div>
  );
}

function Text32() {
  return (
    <div className="h-[19.497px] relative shrink-0 w-[100.556px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start overflow-clip relative rounded-[inherit] size-full">
        <p className="font-['Open_Sans:Regular',sans-serif] font-normal leading-[19.5px] relative shrink-0 text-[#262626] text-[13px] whitespace-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
          Senior Estimator
        </p>
      </div>
    </div>
  );
}

function RoleListItem31() {
  return (
    <div className="bg-white h-[40px] relative shrink-0 w-full" data-name="RoleListItem">
      <div aria-hidden="true" className="absolute border-[rgba(0,0,0,0)] border-b-[1.111px] border-l-[2.222px] border-solid inset-0 pointer-events-none" />
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex items-center pb-[1.111px] pl-[18.212px] relative size-full">
          <Text32 />
        </div>
      </div>
    </div>
  );
}

function Text33() {
  return (
    <div className="h-[19.497px] relative shrink-0 w-[109.583px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start overflow-clip relative rounded-[inherit] size-full">
        <p className="font-['Open_Sans:Regular',sans-serif] font-normal leading-[19.5px] relative shrink-0 text-[#262626] text-[13px] whitespace-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
          Quantity Surveyor
        </p>
      </div>
    </div>
  );
}

function RoleListItem32() {
  return (
    <div className="bg-white h-[40px] relative shrink-0 w-full" data-name="RoleListItem">
      <div aria-hidden="true" className="absolute border-[rgba(0,0,0,0)] border-b-[1.111px] border-l-[2.222px] border-solid inset-0 pointer-events-none" />
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex items-center pb-[1.111px] pl-[18.212px] relative size-full">
          <Text33 />
        </div>
      </div>
    </div>
  );
}

function Text34() {
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

function RoleListItem33() {
  return (
    <div className="bg-white h-[40px] relative shrink-0 w-full" data-name="RoleListItem">
      <div aria-hidden="true" className="absolute border-[rgba(0,0,0,0)] border-b-[1.111px] border-l-[2.222px] border-solid inset-0 pointer-events-none" />
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex items-center pb-[1.111px] pl-[18.212px] relative size-full">
          <Text34 />
        </div>
      </div>
    </div>
  );
}

function Container14() {
  return (
    <div className="absolute content-stretch flex flex-col h-[187.986px] items-start left-0 pt-[27.986px] top-[1367.92px] w-[341.111px]" data-name="Container">
      <RoleListItem30 />
      <RoleListItem31 />
      <RoleListItem32 />
      <RoleListItem33 />
    </div>
  );
}

function Text35() {
  return (
    <div className="h-[19.497px] relative shrink-0 w-[60.451px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start overflow-clip relative rounded-[inherit] size-full">
        <p className="font-['Open_Sans:Regular',sans-serif] font-normal leading-[19.5px] relative shrink-0 text-[#262626] text-[13px] whitespace-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
          Scheduler
        </p>
      </div>
    </div>
  );
}

function RoleListItem34() {
  return (
    <div className="bg-white h-[40px] relative shrink-0 w-full" data-name="RoleListItem">
      <div aria-hidden="true" className="absolute border-[rgba(0,0,0,0)] border-b-[1.111px] border-l-[2.222px] border-solid inset-0 pointer-events-none" />
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex items-center pb-[1.111px] pl-[18.212px] relative size-full">
          <Text35 />
        </div>
      </div>
    </div>
  );
}

function Text36() {
  return (
    <div className="h-[19.497px] relative shrink-0 w-[109.392px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start overflow-clip relative rounded-[inherit] size-full">
        <p className="font-['Open_Sans:Regular',sans-serif] font-normal leading-[19.5px] relative shrink-0 text-[#262626] text-[13px] whitespace-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
          Planning Engineer
        </p>
      </div>
    </div>
  );
}

function RoleListItem35() {
  return (
    <div className="bg-white h-[40px] relative shrink-0 w-full" data-name="RoleListItem">
      <div aria-hidden="true" className="absolute border-[rgba(0,0,0,0)] border-b-[1.111px] border-l-[2.222px] border-solid inset-0 pointer-events-none" />
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex items-center pb-[1.111px] pl-[18.212px] relative size-full">
          <Text36 />
        </div>
      </div>
    </div>
  );
}

function Text37() {
  return (
    <div className="h-[19.497px] relative shrink-0 w-[102.569px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start overflow-clip relative rounded-[inherit] size-full">
        <p className="font-['Open_Sans:Regular',sans-serif] font-normal leading-[19.5px] relative shrink-0 text-[#262626] text-[13px] whitespace-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
          Schedule Analyst
        </p>
      </div>
    </div>
  );
}

function RoleListItem36() {
  return (
    <div className="bg-white h-[40px] relative shrink-0 w-full" data-name="RoleListItem">
      <div aria-hidden="true" className="absolute border-[rgba(0,0,0,0)] border-b-[1.111px] border-l-[2.222px] border-solid inset-0 pointer-events-none" />
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex items-center pb-[1.111px] pl-[18.212px] relative size-full">
          <Text37 />
        </div>
      </div>
    </div>
  );
}

function Text38() {
  return (
    <div className="h-[19.497px] relative shrink-0 w-[108.038px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start overflow-clip relative rounded-[inherit] size-full">
        <p className="font-['Open_Sans:Regular',sans-serif] font-normal leading-[19.5px] relative shrink-0 text-[#262626] text-[13px] whitespace-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
          Controls Engineer
        </p>
      </div>
    </div>
  );
}

function RoleListItem37() {
  return (
    <div className="bg-white h-[40px] relative shrink-0 w-full" data-name="RoleListItem">
      <div aria-hidden="true" className="absolute border-[rgba(0,0,0,0)] border-b-[1.111px] border-l-[2.222px] border-solid inset-0 pointer-events-none" />
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex items-center pb-[1.111px] pl-[18.212px] relative size-full">
          <Text38 />
        </div>
      </div>
    </div>
  );
}

function Container15() {
  return (
    <div className="absolute content-stretch flex flex-col h-[187.986px] items-start left-0 pt-[27.986px] top-[1555.9px] w-[341.111px]" data-name="Container">
      <RoleListItem34 />
      <RoleListItem35 />
      <RoleListItem36 />
      <RoleListItem37 />
    </div>
  );
}

function Text39() {
  return (
    <div className="h-[19.497px] relative shrink-0 w-[129.878px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start overflow-clip relative rounded-[inherit] size-full">
        <p className="font-['Open_Sans:Regular',sans-serif] font-normal leading-[19.5px] relative shrink-0 text-[#262626] text-[13px] whitespace-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
          Commercial Manager
        </p>
      </div>
    </div>
  );
}

function RoleListItem38() {
  return (
    <div className="bg-white h-[40px] relative shrink-0 w-full" data-name="RoleListItem">
      <div aria-hidden="true" className="absolute border-[rgba(0,0,0,0)] border-b-[1.111px] border-l-[2.222px] border-solid inset-0 pointer-events-none" />
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex items-center pb-[1.111px] pl-[18.212px] relative size-full">
          <Text39 />
        </div>
      </div>
    </div>
  );
}

function Text40() {
  return (
    <div className="h-[19.497px] relative shrink-0 w-[115.382px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start overflow-clip relative rounded-[inherit] size-full">
        <p className="font-['Open_Sans:Regular',sans-serif] font-normal leading-[19.5px] relative shrink-0 text-[#262626] text-[13px] whitespace-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
          Contracts Manager
        </p>
      </div>
    </div>
  );
}

function RoleListItem39() {
  return (
    <div className="bg-white h-[40px] relative shrink-0 w-full" data-name="RoleListItem">
      <div aria-hidden="true" className="absolute border-[rgba(0,0,0,0)] border-b-[1.111px] border-l-[2.222px] border-solid inset-0 pointer-events-none" />
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex items-center pb-[1.111px] pl-[18.212px] relative size-full">
          <Text40 />
        </div>
      </div>
    </div>
  );
}

function Text41() {
  return (
    <div className="h-[19.497px] relative shrink-0 w-[136.875px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start overflow-clip relative rounded-[inherit] size-full">
        <p className="font-['Open_Sans:Regular',sans-serif] font-normal leading-[19.5px] relative shrink-0 text-[#262626] text-[13px] whitespace-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
          Procurement Manager
        </p>
      </div>
    </div>
  );
}

function RoleListItem40() {
  return (
    <div className="bg-white h-[40px] relative shrink-0 w-full" data-name="RoleListItem">
      <div aria-hidden="true" className="absolute border-[rgba(0,0,0,0)] border-b-[1.111px] border-l-[2.222px] border-solid inset-0 pointer-events-none" />
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex items-center pb-[1.111px] pl-[18.212px] relative size-full">
          <Text41 />
        </div>
      </div>
    </div>
  );
}

function Text42() {
  return (
    <div className="h-[19.497px] relative shrink-0 w-[84.01px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start overflow-clip relative rounded-[inherit] size-full">
        <p className="font-['Open_Sans:Regular',sans-serif] font-normal leading-[19.5px] relative shrink-0 text-[#262626] text-[13px] whitespace-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
          Cost Manager
        </p>
      </div>
    </div>
  );
}

function RoleListItem41() {
  return (
    <div className="bg-white h-[40px] relative shrink-0 w-full" data-name="RoleListItem">
      <div aria-hidden="true" className="absolute border-[rgba(0,0,0,0)] border-b-[1.111px] border-l-[2.222px] border-solid inset-0 pointer-events-none" />
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex items-center pb-[1.111px] pl-[18.212px] relative size-full">
          <Text42 />
        </div>
      </div>
    </div>
  );
}

function Text43() {
  return (
    <div className="h-[19.497px] relative shrink-0 w-[135.99px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start overflow-clip relative rounded-[inherit] size-full">
        <p className="font-['Open_Sans:Regular',sans-serif] font-normal leading-[19.5px] relative shrink-0 text-[#262626] text-[13px] whitespace-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
          Supply Chain Manager
        </p>
      </div>
    </div>
  );
}

function RoleListItem42() {
  return (
    <div className="bg-white h-[40px] relative shrink-0 w-full" data-name="RoleListItem">
      <div aria-hidden="true" className="absolute border-[rgba(0,0,0,0)] border-b-[1.111px] border-l-[2.222px] border-solid inset-0 pointer-events-none" />
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex items-center pb-[1.111px] pl-[18.212px] relative size-full">
          <Text43 />
        </div>
      </div>
    </div>
  );
}

function Container16() {
  return (
    <div className="absolute content-stretch flex flex-col h-[227.986px] items-start left-0 pt-[27.986px] top-[1743.89px] w-[341.111px]" data-name="Container">
      <RoleListItem38 />
      <RoleListItem39 />
      <RoleListItem40 />
      <RoleListItem41 />
      <RoleListItem42 />
    </div>
  );
}

function Text44() {
  return (
    <div className="h-[19.497px] relative shrink-0 w-[94.34px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start overflow-clip relative rounded-[inherit] size-full">
        <p className="font-['Open_Sans:Regular',sans-serif] font-normal leading-[19.5px] relative shrink-0 text-[#262626] text-[13px] whitespace-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
          Safety Manager
        </p>
      </div>
    </div>
  );
}

function RoleListItem43() {
  return (
    <div className="bg-white h-[40px] relative shrink-0 w-full" data-name="RoleListItem">
      <div aria-hidden="true" className="absolute border-[rgba(0,0,0,0)] border-b-[1.111px] border-l-[2.222px] border-solid inset-0 pointer-events-none" />
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex items-center pb-[1.111px] pl-[18.212px] relative size-full">
          <Text44 />
        </div>
      </div>
    </div>
  );
}

function Text45() {
  return (
    <div className="h-[19.497px] relative shrink-0 w-[81.111px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start overflow-clip relative rounded-[inherit] size-full">
        <p className="font-['Open_Sans:Regular',sans-serif] font-normal leading-[19.5px] relative shrink-0 text-[#262626] text-[13px] whitespace-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
          HSE Manager
        </p>
      </div>
    </div>
  );
}

function RoleListItem44() {
  return (
    <div className="bg-white h-[40px] relative shrink-0 w-full" data-name="RoleListItem">
      <div aria-hidden="true" className="absolute border-[rgba(0,0,0,0)] border-b-[1.111px] border-l-[2.222px] border-solid inset-0 pointer-events-none" />
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex items-center pb-[1.111px] pl-[18.212px] relative size-full">
          <Text45 />
        </div>
      </div>
    </div>
  );
}

function Text46() {
  return (
    <div className="h-[19.497px] relative shrink-0 w-[81.528px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start overflow-clip relative rounded-[inherit] size-full">
        <p className="font-['Open_Sans:Regular',sans-serif] font-normal leading-[19.5px] relative shrink-0 text-[#262626] text-[13px] whitespace-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
          Safety Officer
        </p>
      </div>
    </div>
  );
}

function RoleListItem45() {
  return (
    <div className="bg-white h-[40px] relative shrink-0 w-full" data-name="RoleListItem">
      <div aria-hidden="true" className="absolute border-[rgba(0,0,0,0)] border-b-[1.111px] border-l-[2.222px] border-solid inset-0 pointer-events-none" />
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex items-center pb-[1.111px] pl-[18.212px] relative size-full">
          <Text46 />
        </div>
      </div>
    </div>
  );
}

function Text47() {
  return (
    <div className="h-[19.497px] relative shrink-0 w-[100.66px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start overflow-clip relative rounded-[inherit] size-full">
        <p className="font-['Open_Sans:Regular',sans-serif] font-normal leading-[19.5px] relative shrink-0 text-[#262626] text-[13px] whitespace-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
          EHS Coordinator
        </p>
      </div>
    </div>
  );
}

function RoleListItem46() {
  return (
    <div className="bg-white h-[40px] relative shrink-0 w-full" data-name="RoleListItem">
      <div aria-hidden="true" className="absolute border-[rgba(0,0,0,0)] border-b-[1.111px] border-l-[2.222px] border-solid inset-0 pointer-events-none" />
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex items-center pb-[1.111px] pl-[18.212px] relative size-full">
          <Text47 />
        </div>
      </div>
    </div>
  );
}

function Container17() {
  return (
    <div className="absolute content-stretch flex flex-col h-[187.986px] items-start left-0 pt-[27.986px] top-[1971.88px] w-[341.111px]" data-name="Container">
      <RoleListItem43 />
      <RoleListItem44 />
      <RoleListItem45 />
      <RoleListItem46 />
    </div>
  );
}

function Text48() {
  return (
    <div className="h-[16.51px] relative shrink-0 w-[90.729px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start overflow-clip relative rounded-[inherit] size-full">
        <p className="font-['Open_Sans:SemiBold',sans-serif] font-semibold leading-[16.5px] relative shrink-0 text-[#8c8c8c] text-[11px] tracking-[0.44px] uppercase whitespace-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
          Construction
        </p>
      </div>
    </div>
  );
}

function GroupHeader() {
  return (
    <div className="absolute bg-[#f5f6f7] content-stretch flex h-[27.986px] items-center left-0 pb-[1.111px] pl-[15.99px] top-0 w-[341.111px]" data-name="GroupHeader">
      <div aria-hidden="true" className="absolute border-[#eeeff1] border-b-[1.111px] border-solid inset-0 pointer-events-none" />
      <Text48 />
    </div>
  );
}

function Text49() {
  return (
    <div className="h-[16.51px] relative shrink-0 w-[43.003px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start overflow-clip relative rounded-[inherit] size-full">
        <p className="font-['Open_Sans:SemiBold',sans-serif] font-semibold leading-[16.5px] relative shrink-0 text-[#8c8c8c] text-[11px] tracking-[0.44px] uppercase whitespace-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
          Owner
        </p>
      </div>
    </div>
  );
}

function GroupHeader1() {
  return (
    <div className="absolute bg-[#f5f6f7] content-stretch flex h-[27.986px] items-center left-0 pb-[1.111px] pl-[15.99px] top-[267.99px] w-[341.111px]" data-name="GroupHeader">
      <div aria-hidden="true" className="absolute border-[#eeeff1] border-b-[1.111px] border-solid inset-0 pointer-events-none" />
      <Text49 />
    </div>
  );
}

function Text50() {
  return (
    <div className="h-[16.51px] relative shrink-0 w-[82.847px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start overflow-clip relative rounded-[inherit] size-full">
        <p className="font-['Open_Sans:SemiBold',sans-serif] font-semibold leading-[16.5px] relative shrink-0 text-[#8c8c8c] text-[11px] tracking-[0.44px] uppercase whitespace-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
          Management
        </p>
      </div>
    </div>
  );
}

function GroupHeader2() {
  return (
    <div className="absolute bg-[#f5f6f7] content-stretch flex h-[27.986px] items-center left-0 pb-[1.111px] pl-[15.99px] top-[455.97px] w-[341.111px]" data-name="GroupHeader">
      <div aria-hidden="true" className="absolute border-[#eeeff1] border-b-[1.111px] border-solid inset-0 pointer-events-none" />
      <Text50 />
    </div>
  );
}

function Text51() {
  return (
    <div className="h-[16.51px] relative shrink-0 w-[42.813px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start overflow-clip relative rounded-[inherit] size-full">
        <p className="font-['Open_Sans:SemiBold',sans-serif] font-semibold leading-[16.5px] relative shrink-0 text-[#8c8c8c] text-[11px] tracking-[0.44px] uppercase whitespace-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
          Design
        </p>
      </div>
    </div>
  );
}

function GroupHeader3() {
  return (
    <div className="absolute bg-[#f5f6f7] content-stretch flex h-[27.986px] items-center left-0 pb-[1.111px] pl-[15.99px] top-[683.96px] w-[341.111px]" data-name="GroupHeader">
      <div aria-hidden="true" className="absolute border-[#eeeff1] border-b-[1.111px] border-solid inset-0 pointer-events-none" />
      <Text51 />
    </div>
  );
}

function Text52() {
  return (
    <div className="h-[16.51px] relative shrink-0 w-[78.733px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start overflow-clip relative rounded-[inherit] size-full">
        <p className="font-['Open_Sans:SemiBold',sans-serif] font-semibold leading-[16.5px] relative shrink-0 text-[#8c8c8c] text-[11px] tracking-[0.44px] uppercase whitespace-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
          Engineering
        </p>
      </div>
    </div>
  );
}

function GroupHeader4() {
  return (
    <div className="absolute bg-[#f5f6f7] content-stretch flex h-[27.986px] items-center left-0 pb-[1.111px] pl-[15.99px] top-[871.94px] w-[341.111px]" data-name="GroupHeader">
      <div aria-hidden="true" className="absolute border-[#eeeff1] border-b-[1.111px] border-solid inset-0 pointer-events-none" />
      <Text52 />
    </div>
  );
}

function Text53() {
  return (
    <div className="h-[16.51px] relative shrink-0 w-[22.049px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start overflow-clip relative rounded-[inherit] size-full">
        <p className="font-['Open_Sans:SemiBold',sans-serif] font-semibold leading-[16.5px] relative shrink-0 text-[#8c8c8c] text-[11px] tracking-[0.44px] uppercase whitespace-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
          BIM
        </p>
      </div>
    </div>
  );
}

function GroupHeader5() {
  return (
    <div className="absolute bg-[#f5f6f7] content-stretch flex h-[27.986px] items-center left-0 pb-[1.111px] pl-[15.99px] top-[1139.93px] w-[341.111px]" data-name="GroupHeader">
      <div aria-hidden="true" className="absolute border-[#eeeff1] border-b-[1.111px] border-solid inset-0 pointer-events-none" />
      <Text53 />
    </div>
  );
}

function Text54() {
  return (
    <div className="h-[16.51px] relative shrink-0 w-[69.67px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start overflow-clip relative rounded-[inherit] size-full">
        <p className="font-['Open_Sans:SemiBold',sans-serif] font-semibold leading-[16.5px] relative shrink-0 text-[#8c8c8c] text-[11px] tracking-[0.44px] uppercase whitespace-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
          Estimating
        </p>
      </div>
    </div>
  );
}

function GroupHeader6() {
  return (
    <div className="absolute bg-[#f5f6f7] content-stretch flex h-[27.986px] items-center left-0 pb-[1.111px] pl-[15.99px] top-[1367.92px] w-[341.111px]" data-name="GroupHeader">
      <div aria-hidden="true" className="absolute border-[#eeeff1] border-b-[1.111px] border-solid inset-0 pointer-events-none" />
      <Text54 />
    </div>
  );
}

function Text55() {
  return (
    <div className="h-[16.51px] relative shrink-0 w-[60.66px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start overflow-clip relative rounded-[inherit] size-full">
        <p className="font-['Open_Sans:SemiBold',sans-serif] font-semibold leading-[16.5px] relative shrink-0 text-[#8c8c8c] text-[11px] tracking-[0.44px] uppercase whitespace-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
          Planning
        </p>
      </div>
    </div>
  );
}

function GroupHeader7() {
  return (
    <div className="absolute bg-[#f5f6f7] content-stretch flex h-[27.986px] items-center left-0 pb-[1.111px] pl-[15.99px] top-[1555.9px] w-[341.111px]" data-name="GroupHeader">
      <div aria-hidden="true" className="absolute border-[#eeeff1] border-b-[1.111px] border-solid inset-0 pointer-events-none" />
      <Text55 />
    </div>
  );
}

function Text56() {
  return (
    <div className="h-[16.51px] relative shrink-0 w-[76.979px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start overflow-clip relative rounded-[inherit] size-full">
        <p className="font-['Open_Sans:SemiBold',sans-serif] font-semibold leading-[16.5px] relative shrink-0 text-[#8c8c8c] text-[11px] tracking-[0.44px] uppercase whitespace-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
          Commercial
        </p>
      </div>
    </div>
  );
}

function GroupHeader8() {
  return (
    <div className="absolute bg-[#f5f6f7] content-stretch flex h-[27.986px] items-center left-0 pb-[1.111px] pl-[15.99px] top-[1743.89px] w-[341.111px]" data-name="GroupHeader">
      <div aria-hidden="true" className="absolute border-[#eeeff1] border-b-[1.111px] border-solid inset-0 pointer-events-none" />
      <Text56 />
    </div>
  );
}

function Text57() {
  return (
    <div className="h-[16.51px] relative shrink-0 w-[40.66px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start overflow-clip relative rounded-[inherit] size-full">
        <p className="font-['Open_Sans:SemiBold',sans-serif] font-semibold leading-[16.5px] relative shrink-0 text-[#8c8c8c] text-[11px] tracking-[0.44px] uppercase whitespace-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
          Safety
        </p>
      </div>
    </div>
  );
}

function GroupHeader9() {
  return (
    <div className="absolute bg-[#f5f6f7] content-stretch flex h-[27.986px] items-center left-0 pb-[1.111px] pl-[15.99px] top-[1971.88px] w-[341.111px]" data-name="GroupHeader">
      <div aria-hidden="true" className="absolute border-[#eeeff1] border-b-[1.111px] border-solid inset-0 pointer-events-none" />
      <Text57 />
    </div>
  );
}

function Container7() {
  return (
    <div className="flex-[1_0_0] min-h-px min-w-px relative w-[357.778px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid overflow-clip relative rounded-[inherit] size-full">
        <Container8 />
        <Container9 />
        <Container10 />
        <Container11 />
        <Container12 />
        <Container13 />
        <Container14 />
        <Container15 />
        <Container16 />
        <Container17 />
        <GroupHeader />
        <GroupHeader1 />
        <GroupHeader2 />
        <GroupHeader3 />
        <GroupHeader4 />
        <GroupHeader5 />
        <GroupHeader6 />
        <GroupHeader7 />
        <GroupHeader8 />
        <GroupHeader9 />
      </div>
    </div>
  );
}

function Container2() {
  return (
    <div className="bg-white h-[811.354px] relative rounded-[8px] shrink-0 w-[360px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start overflow-clip p-[1.111px] relative rounded-[inherit] size-full">
        <Container3 />
        <Container5 />
        <Container7 />
      </div>
      <div aria-hidden="true" className="absolute border-[#d9d9d9] border-[1.111px] border-solid inset-0 pointer-events-none rounded-[8px]" />
    </div>
  );
}

function Text58() {
  return (
    <div className="h-[20px] relative shrink-0 w-full" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid overflow-clip relative rounded-[inherit] size-full">
        <p className="absolute font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[20px] left-0 not-italic text-[#1d2c38] text-[15px] top-[0.11px] whitespace-nowrap">Team Composition</p>
      </div>
    </div>
  );
}

function Text59() {
  return (
    <div className="h-[16px] relative shrink-0 w-full" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start relative size-full">
        <p className="flex-[1_0_0] font-['Inter:Regular',sans-serif] font-normal leading-[16px] min-h-px min-w-px not-italic relative text-[#9ca4ae] text-[12px]">Core Construction Team</p>
      </div>
    </div>
  );
}

function Container21() {
  return (
    <div className="h-[37px] relative shrink-0 w-[204px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col gap-[0.99px] items-start relative size-full">
        <Text58 />
        <Text59 />
      </div>
    </div>
  );
}

function Container22() {
  return <div className="bg-[#e5e7eb] h-[27.986px] shrink-0 w-[0.99px]" data-name="Container" />;
}

function Text60() {
  return (
    <div className="h-[19.497px] relative shrink-0 w-[78.264px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[19.5px] left-0 not-italic text-[#384857] text-[13px] top-[0.11px] whitespace-nowrap">The main group responsible for executing and managing the construction work on the project.</p>
      </div>
    </div>
  );
}

function Container23() {
  return (
    <div className="h-[19.497px] relative shrink-0 w-[98.247px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[5.99px] items-center relative size-full">
        <div className="relative shrink-0 size-[14px]" data-name="notebook">
          <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
            <div className="absolute inset-[8.33%_12.5%]" data-name="Vector">
              <div className="absolute inset-[-3.43%_-3.81%]">
                <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 11.3 12.4667">
                  <path d={svgPaths.p2105bd80} id="Vector" stroke="var(--stroke-0, #9CA4AE)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="0.8" />
                </svg>
              </div>
            </div>
          </div>
        </div>
        <Text60 />
      </div>
    </div>
  );
}

function Container20() {
  return (
    <div className="flex-[1_0_0] h-[36.997px] min-h-px min-w-px relative" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[11.997px] items-center relative size-full">
        <Container21 />
        <Container22 />
        <Container23 />
      </div>
    </div>
  );
}

function RoleAccessLevel1() {
  return (
    <div className="absolute left-[15.99px] size-[13.993px] top-[10.99px]" data-name="RoleAccessLevel">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 13.9931 13.9931">
        <g clipPath="url(#clip0_2176_5218)" id="RoleAccessLevel">
          <path d={svgPaths.p1f842b80} id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.31185" />
        </g>
        <defs>
          <clipPath id="clip0_2176_5218">
            <rect fill="white" height="13.9931" width="13.9931" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function PrimaryBtn1() {
  return (
    <div className="bg-[#ff4d00] flex-[1_0_0] h-[35.99px] min-h-px min-w-px relative rounded-[4px]" data-name="PrimaryBtn">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <RoleAccessLevel1 />
        <p className="-translate-x-1/2 absolute font-['Inter:Regular',sans-serif] font-normal leading-[21px] left-[46.98px] not-italic text-[14px] text-center text-white top-[6.61px] whitespace-nowrap">{`Edit `}</p>
      </div>
    </div>
  );
}

function Container24() {
  return (
    <div className="h-[36px] relative shrink-0 w-[81px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center relative size-full">
        <PrimaryBtn1 />
      </div>
    </div>
  );
}

function Container19() {
  return (
    <div className="h-[51.997px] relative shrink-0 w-[1088.455px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-between pl-[3.993px] relative size-full">
        <Container20 />
        <Container24 />
      </div>
    </div>
  );
}

function Icon() {
  return (
    <div className="relative shrink-0 size-[18px]" data-name="Icon">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 18 18">
        <g clipPath="url(#clip0_2176_5227)" id="Icon">
          <path d={svgPaths.p3ea42000} fill="var(--fill-0, white)" id="Vector" />
          <path d={svgPaths.p3ea42000} id="Vector_2" stroke="var(--stroke-0, #D0D5DD)" strokeWidth="1.5" />
        </g>
        <defs>
          <clipPath id="clip0_2176_5227">
            <rect fill="white" height="18" width="18" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function TableCheckbox() {
  return (
    <div className="relative rounded-[4px] shrink-0 size-[32px]" data-name="TableCheckbox">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center relative size-full">
        <Icon />
      </div>
    </div>
  );
}

function Container27() {
  return (
    <div className="content-stretch flex h-[46.667px] items-center justify-center relative shrink-0 w-[48px]" data-name="Container">
      <TableCheckbox />
    </div>
  );
}

function TableHeader1() {
  return (
    <div className="h-[24px] relative shrink-0 w-[209px]" data-name="TableHeader">
      <p className="absolute font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[24px] left-0 not-italic text-[#384857] text-[16px] top-[-1.67px] whitespace-nowrap">Name</p>
    </div>
  );
}

function Container28() {
  return <div className="h-[48px] shrink-0 w-[2px]" data-name="Container" />;
}

function ResizeHandle() {
  return (
    <div className="content-stretch flex h-[46.667px] items-center justify-end relative shrink-0 w-[6px]" data-name="ResizeHandle">
      <Container28 />
    </div>
  );
}

function ColumnHeader() {
  return (
    <div className="bg-[#fafafa] content-stretch flex gap-[19px] items-center overflow-clip pl-[8px] relative shrink-0 w-[360px]" data-name="ColumnHeader">
      <TableHeader1 />
      <ResizeHandle />
    </div>
  );
}

function TableHeader2() {
  return (
    <div className="h-[24px] overflow-clip relative shrink-0 w-[175.521px]" data-name="TableHeader">
      <p className="absolute font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[24px] left-0 not-italic text-[#384857] text-[16px] top-[-1.67px] whitespace-nowrap">Type</p>
    </div>
  );
}

function Container29() {
  return <div className="h-[48px] shrink-0 w-[2px]" data-name="Container" />;
}

function ResizeHandle1() {
  return (
    <div className="content-stretch flex h-[46.667px] items-center justify-end relative shrink-0 w-[6px]" data-name="ResizeHandle">
      <Container29 />
    </div>
  );
}

function ColumnHeader1() {
  return (
    <div className="bg-[#fafafa] content-stretch flex gap-[19px] items-center overflow-clip pl-[8px] relative shrink-0 w-[240px]" data-name="ColumnHeader">
      <TableHeader2 />
      <ResizeHandle1 />
    </div>
  );
}

function TableHeader3() {
  return (
    <div className="h-[24px] overflow-clip relative shrink-0 w-[175.521px]" data-name="TableHeader">
      <p className="absolute font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[24px] left-0 not-italic text-[#384857] text-[16px] top-[-1.67px] w-[152.062px]">Description</p>
    </div>
  );
}

function Container30() {
  return <div className="h-[48px] shrink-0 w-[2px]" data-name="Container" />;
}

function ResizeHandle2() {
  return (
    <div className="content-stretch flex h-[46.667px] items-center justify-end relative shrink-0 w-[6px]" data-name="ResizeHandle">
      <Container30 />
    </div>
  );
}

function ColumnHeader2() {
  return (
    <div className="bg-[#fafafa] flex-[1_0_0] min-h-px min-w-px relative" data-name="ColumnHeader">
      <div className="flex flex-row items-center overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex gap-[19px] items-center pl-[8px] relative w-full">
          <TableHeader3 />
          <ResizeHandle2 />
        </div>
      </div>
    </div>
  );
}

function TableHeader() {
  return (
    <div className="bg-[#fafafa] content-stretch flex items-center relative shrink-0 w-full" data-name="TableHeader">
      <div aria-hidden="true" className="absolute border-[#f0f0f0] border-b-[1.333px] border-solid inset-0 pointer-events-none" />
      <Container27 />
      <ColumnHeader />
      <ColumnHeader1 />
      <ColumnHeader2 />
    </div>
  );
}

function Icon1() {
  return (
    <div className="relative shrink-0 size-[18px]" data-name="Icon">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 18 18">
        <g clipPath="url(#clip0_2176_5227)" id="Icon">
          <path d={svgPaths.p3ea42000} fill="var(--fill-0, white)" id="Vector" />
          <path d={svgPaths.p3ea42000} id="Vector_2" stroke="var(--stroke-0, #D0D5DD)" strokeWidth="1.5" />
        </g>
        <defs>
          <clipPath id="clip0_2176_5227">
            <rect fill="white" height="18" width="18" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function TableCheckbox1() {
  return (
    <div className="relative rounded-[4px] shrink-0 size-[32px]" data-name="TableCheckbox">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center relative size-full">
        <Icon1 />
      </div>
    </div>
  );
}

function Container31() {
  return (
    <div className="h-[46.667px] relative shrink-0 w-[48px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center relative size-full">
        <TableCheckbox1 />
      </div>
    </div>
  );
}

function Text61() {
  return (
    <div className="h-[16.51px] relative shrink-0 w-[17.257px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start relative size-full">
        <div className="flex flex-col font-['Open_Sans:SemiBold',sans-serif] font-semibold justify-center leading-[0] relative shrink-0 text-[11px] text-center text-white whitespace-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
          <p className="leading-[16.5px]">LA</p>
        </div>
      </div>
    </div>
  );
}

function Avatar() {
  return (
    <div className="bg-[#3b5998] relative rounded-[37282700px] shrink-0 size-[30px]" data-name="Avatar">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center overflow-clip relative rounded-[inherit] size-full">
        <Text61 />
      </div>
    </div>
  );
}

function Text62() {
  return (
    <div className="h-[19.5px] relative shrink-0 w-[75.354px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start overflow-clip relative rounded-[inherit] size-full">
        <p className="font-['Open_Sans:Regular',sans-serif] font-normal leading-[19.5px] relative shrink-0 text-[#1d2939] text-[13px] whitespace-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
          Captain Levi
        </p>
      </div>
    </div>
  );
}

function Container32() {
  return (
    <div className="h-[46.667px] relative shrink-0 w-[360px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[8px] items-center overflow-clip pl-[8px] relative rounded-[inherit] size-full">
        <Avatar />
        <Text62 />
      </div>
    </div>
  );
}

function Icon2() {
  return (
    <div className="relative shrink-0 size-[18px]" data-name="Icon">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 18 18">
        <g clipPath="url(#clip0_2176_5221)" id="Icon">
          <path d={svgPaths.p3fd97980} id="Vector" stroke="var(--stroke-0, #384857)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.94538" />
          <path d={svgPaths.p3065fdf0} id="Vector_2" stroke="var(--stroke-0, #384857)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.94538" />
        </g>
        <defs>
          <clipPath id="clip0_2176_5221">
            <rect fill="white" height="18" width="18" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Container34() {
  return (
    <div className="bg-[#f0f2f5] relative rounded-[6px] shrink-0 size-[30px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center relative size-full">
        <Icon2 />
      </div>
    </div>
  );
}

function Text63() {
  return (
    <div className="h-[19px] relative shrink-0 w-[149px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start overflow-clip relative rounded-[inherit] size-full">
        <p className="font-['Open_Sans:Regular',sans-serif] font-normal leading-[19.5px] relative shrink-0 text-[#262626] text-[13px] w-[149px]" style={{ fontVariationSettings: "'wdth' 100" }}>
          Member
        </p>
      </div>
    </div>
  );
}

function Container33() {
  return (
    <div className="h-[46.875px] relative shrink-0 w-[240px]" data-name="Container">
      <div aria-hidden="true" className="absolute border-[#f0f0f0] border-r-[1.111px] border-solid inset-0 pointer-events-none" />
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[10px] items-center pl-[8px] pr-[1.111px] relative size-full">
        <Container34 />
        <Text63 />
      </div>
    </div>
  );
}

function Text64() {
  return (
    <div className="flex-[1_0_0] h-[19.5px] min-h-px min-w-px relative" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start overflow-clip relative rounded-[inherit] size-full">
        <p className="flex-[1_0_0] font-['Open_Sans:Regular',sans-serif] font-normal leading-[19.5px] min-h-px min-w-px relative text-[#262626] text-[13px]" style={{ fontVariationSettings: "'wdth' 100" }}>{`{{Job Tile}}, {{Role}}`}</p>
      </div>
    </div>
  );
}

function Container35() {
  return (
    <div className="flex-[1_0_0] h-[46.667px] min-h-px min-w-px relative" data-name="Container">
      <div className="flex flex-row items-center overflow-clip rounded-[inherit] size-full">
        <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center pl-[8px] relative size-full">
          <Text64 />
        </div>
      </div>
    </div>
  );
}

function UserRow() {
  return (
    <div className="bg-white content-stretch flex h-[48px] items-start pb-[1.333px] relative shrink-0 w-full" data-name="UserRow2">
      <div aria-hidden="true" className="absolute border-[#f0f0f0] border-b-[1.333px] border-solid inset-0 pointer-events-none" />
      <Container31 />
      <Container32 />
      <Container33 />
      <Container35 />
    </div>
  );
}

function Icon3() {
  return (
    <div className="relative shrink-0 size-[18px]" data-name="Icon">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 18 18">
        <g clipPath="url(#clip0_2176_5227)" id="Icon">
          <path d={svgPaths.p3ea42000} fill="var(--fill-0, white)" id="Vector" />
          <path d={svgPaths.p3ea42000} id="Vector_2" stroke="var(--stroke-0, #D0D5DD)" strokeWidth="1.5" />
        </g>
        <defs>
          <clipPath id="clip0_2176_5227">
            <rect fill="white" height="18" width="18" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function TableCheckbox2() {
  return (
    <div className="relative rounded-[4px] shrink-0 size-[32px]" data-name="TableCheckbox">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center relative size-full">
        <Icon3 />
      </div>
    </div>
  );
}

function Container36() {
  return (
    <div className="h-[46.667px] relative shrink-0 w-[48px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center relative size-full">
        <TableCheckbox2 />
      </div>
    </div>
  );
}

function Text65() {
  return (
    <div className="h-[16.51px] relative shrink-0 w-[12.014px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start relative size-full">
        <div className="flex flex-col font-['Open_Sans:SemiBold',sans-serif] font-semibold justify-end leading-[0] relative shrink-0 text-[11px] text-center text-white whitespace-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
          <p className="leading-[16.5px]">IP</p>
        </div>
      </div>
    </div>
  );
}

function Avatar1() {
  return (
    <div className="bg-[#16a085] relative rounded-[8px] shrink-0 size-[30px]" data-name="Avatar">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-center justify-center overflow-clip relative rounded-[inherit] size-full">
        <Text65 />
      </div>
    </div>
  );
}

function Text66() {
  return (
    <div className="h-[20px] relative shrink-0 w-[184px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start overflow-clip relative rounded-[inherit] size-full">
        <p className="flex-[1_0_0] font-['Open_Sans:Regular',sans-serif] font-normal leading-[19.5px] min-h-px min-w-px relative text-[#1d2939] text-[13px]" style={{ fontVariationSettings: "'wdth' 100" }}>
          Inseh Plumbers
        </p>
      </div>
    </div>
  );
}

function Container37() {
  return (
    <div className="h-[46.667px] relative shrink-0 w-[360px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[8px] items-center overflow-clip pl-[6px] relative rounded-[inherit] size-full">
        <Avatar1 />
        <Text66 />
      </div>
    </div>
  );
}

function Company() {
  return (
    <div className="relative shrink-0 size-[24px]" data-name="Company">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="Company">
          <path d={svgPaths.p129ca680} id="Vector" stroke="var(--stroke-0, #384857)" strokeWidth="0.8" />
          <g id="Vector_2">
            <path d={svgPaths.p219326f0} stroke="var(--stroke-0, #384857)" strokeWidth="0.2" />
            <path d={svgPaths.p2d2fed00} stroke="var(--stroke-0, #384857)" strokeWidth="0.2" />
            <path d={svgPaths.p21c48300} stroke="var(--stroke-0, #384857)" strokeWidth="0.2" />
            <path d={svgPaths.p1d90040} stroke="var(--stroke-0, #384857)" strokeWidth="0.2" />
            <path d={svgPaths.p1c308d00} stroke="var(--stroke-0, #384857)" strokeWidth="0.2" />
            <path d={svgPaths.p27aa4d80} stroke="var(--stroke-0, #384857)" strokeWidth="0.2" />
            <path d={svgPaths.p14435df0} stroke="var(--stroke-0, #384857)" strokeWidth="0.2" />
            <path d={svgPaths.p1a9e1080} stroke="var(--stroke-0, #384857)" strokeWidth="0.2" />
            <path d={svgPaths.p2d711c00} stroke="var(--stroke-0, #384857)" strokeWidth="0.2" />
            <path d={svgPaths.p37fb5100} stroke="var(--stroke-0, #384857)" strokeWidth="0.2" />
            <path d={svgPaths.p1e126600} stroke="var(--stroke-0, #384857)" strokeWidth="0.2" />
            <path d={svgPaths.p2a08b200} stroke="var(--stroke-0, #384857)" strokeWidth="0.2" />
          </g>
        </g>
      </svg>
    </div>
  );
}

function Container39() {
  return (
    <div className="bg-[#f0f2f5] relative rounded-[6px] shrink-0 size-[30px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center relative size-full">
        <Company />
      </div>
    </div>
  );
}

function Text67() {
  return (
    <div className="h-[19.497px] relative shrink-0" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex h-full items-start overflow-clip relative rounded-[inherit]">
        <p className="font-['Open_Sans:Regular',sans-serif] font-normal leading-[19.5px] relative shrink-0 text-[#262626] text-[13px] w-[68.098px]" style={{ fontVariationSettings: "'wdth' 100" }}>
          Company
        </p>
      </div>
    </div>
  );
}

function Container38() {
  return (
    <div className="h-[46.875px] relative shrink-0 w-[240px]" data-name="Container">
      <div aria-hidden="true" className="absolute border-[#f0f0f0] border-r-[1.111px] border-solid inset-0 pointer-events-none" />
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[10px] items-center pl-[8px] pr-[1.111px] relative size-full">
        <Container39 />
        <Text67 />
      </div>
    </div>
  );
}

function Text68() {
  return (
    <div className="flex-[1_0_0] h-[19.5px] min-h-px min-w-px relative" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start overflow-clip relative rounded-[inherit] size-full">
        <p className="font-['Open_Sans:Regular',sans-serif] font-normal leading-[19.5px] relative shrink-0 text-[#262626] text-[13px] whitespace-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>{`{{TradeType}}`}</p>
      </div>
    </div>
  );
}

function Container40() {
  return (
    <div className="flex-[1_0_0] h-[46.667px] min-h-px min-w-px relative" data-name="Container">
      <div className="flex flex-row items-center overflow-clip rounded-[inherit] size-full">
        <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center pl-[8px] relative size-full">
          <Text68 />
        </div>
      </div>
    </div>
  );
}

function UserRow1() {
  return (
    <div className="bg-white h-[48px] relative shrink-0 w-full" data-name="UserRow2">
      <div aria-hidden="true" className="absolute border-[#f0f0f0] border-b-[1.333px] border-solid inset-0 pointer-events-none" />
      <div className="content-stretch flex items-start pb-[1.333px] pr-[60px] relative size-full">
        <Container36 />
        <Container37 />
        <Container38 />
        <Container40 />
      </div>
    </div>
  );
}

function Icon4() {
  return (
    <div className="relative shrink-0 size-[18px]" data-name="Icon">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 18 18">
        <g clipPath="url(#clip0_2176_5227)" id="Icon">
          <path d={svgPaths.p3ea42000} fill="var(--fill-0, white)" id="Vector" />
          <path d={svgPaths.p3ea42000} id="Vector_2" stroke="var(--stroke-0, #D0D5DD)" strokeWidth="1.5" />
        </g>
        <defs>
          <clipPath id="clip0_2176_5227">
            <rect fill="white" height="18" width="18" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function TableCheckbox3() {
  return (
    <div className="relative rounded-[4px] shrink-0 size-[32px]" data-name="TableCheckbox">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center relative size-full">
        <Icon4 />
      </div>
    </div>
  );
}

function Container41() {
  return (
    <div className="h-[46.667px] relative shrink-0 w-[48px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center relative size-full">
        <TableCheckbox3 />
      </div>
    </div>
  );
}

function Text69() {
  return (
    <div className="h-[16.51px] relative shrink-0 w-[17.257px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start relative size-full">
        <div className="flex flex-col font-['Open_Sans:SemiBold',sans-serif] font-semibold justify-center leading-[0] relative shrink-0 text-[11px] text-center text-white whitespace-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
          <p className="leading-[16.5px]">PM</p>
        </div>
      </div>
    </div>
  );
}

function Avatar2() {
  return (
    <div className="bg-[#a66f9a] relative rounded-[15px] shrink-0 size-[30px]" data-name="Avatar">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center overflow-clip relative rounded-[inherit] size-full">
        <Text69 />
      </div>
    </div>
  );
}

function Text70() {
  return (
    <div className="h-[20px] relative shrink-0 w-[158px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start overflow-clip relative rounded-[inherit] size-full">
        <p className="font-['Open_Sans:Regular',sans-serif] font-normal leading-[19.5px] relative shrink-0 text-[#1d2939] text-[13px] w-[177.491px]" style={{ fontVariationSettings: "'wdth' 100" }}>
          Project Manager
        </p>
      </div>
    </div>
  );
}

function Container42() {
  return (
    <div className="h-[46.667px] relative shrink-0 w-[360px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[8px] items-center overflow-clip pl-[6px] relative rounded-[inherit] size-full">
        <Avatar2 />
        <Text70 />
      </div>
    </div>
  );
}

function Icon5() {
  return (
    <div className="relative shrink-0 size-[18px]" data-name="Icon">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 18 18">
        <g clipPath="url(#clip0_2176_5213)" id="Icon">
          <path d={svgPaths.p3db7b080} id="Vector" stroke="var(--stroke-0, #384857)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.78436" />
          <path d={svgPaths.p3e81e900} id="Vector_2" stroke="var(--stroke-0, #384857)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.78436" />
          <path d={svgPaths.p3fee0600} id="Vector_3" stroke="var(--stroke-0, #384857)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.78436" />
        </g>
        <defs>
          <clipPath id="clip0_2176_5213">
            <rect fill="white" height="18" width="18" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Container44() {
  return (
    <div className="bg-[#f0f2f5] relative rounded-[6px] shrink-0 size-[30px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center relative size-full">
        <Icon5 />
      </div>
    </div>
  );
}

function Text71() {
  return (
    <div className="h-[19.497px] relative shrink-0 w-[69.184px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start overflow-clip relative rounded-[inherit] size-full">
        <p className="font-['Open_Sans:Regular',sans-serif] font-normal leading-[19.5px] relative shrink-0 text-[#262626] text-[13px] whitespace-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
          Role
        </p>
      </div>
    </div>
  );
}

function Container43() {
  return (
    <div className="h-[46.875px] relative shrink-0 w-[240px]" data-name="Container">
      <div aria-hidden="true" className="absolute border-[#f0f0f0] border-r-[1.111px] border-solid inset-0 pointer-events-none" />
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[10px] items-center pl-[8px] pr-[1.111px] relative size-full">
        <Container44 />
        <Text71 />
      </div>
    </div>
  );
}

function Text72() {
  return (
    <div className="flex-[1_0_0] h-[19.5px] min-h-px min-w-px relative" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start overflow-clip relative rounded-[inherit] size-full">
        <p className="font-['Open_Sans:Regular',sans-serif] font-normal leading-[19.5px] relative shrink-0 text-[#262626] text-[13px] whitespace-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>{`{{GroupingName}}`}</p>
      </div>
    </div>
  );
}

function Container45() {
  return (
    <div className="flex-[1_0_0] h-[46.667px] min-h-px min-w-px relative" data-name="Container">
      <div className="flex flex-row items-center overflow-clip rounded-[inherit] size-full">
        <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center pl-[8px] relative size-full">
          <Text72 />
        </div>
      </div>
    </div>
  );
}

function UserRow2() {
  return (
    <div className="bg-white h-[48px] relative shrink-0 w-full" data-name="UserRow2">
      <div aria-hidden="true" className="absolute border-[#f0f0f0] border-b-[1.333px] border-solid inset-0 pointer-events-none" />
      <div className="content-stretch flex items-start pb-[1.333px] pr-[60px] relative size-full">
        <Container41 />
        <Container42 />
        <Container43 />
        <Container45 />
      </div>
    </div>
  );
}

function Container26() {
  return (
    <div className="content-stretch flex flex-col items-start overflow-clip relative shrink-0 w-full" data-name="Container">
      <TableHeader />
      <UserRow />
      <UserRow1 />
      <UserRow2 />
    </div>
  );
}

function Text73() {
  return (
    <div className="h-[17.986px] relative shrink-0 w-[141.753px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start relative size-full">
        <p className="font-['Open_Sans:Regular',sans-serif] font-normal leading-[18px] relative shrink-0 text-[#667085] text-[12px] whitespace-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
          Showing 1–20 of 74 users
        </p>
      </div>
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

function Button() {
  return (
    <div className="bg-white opacity-35 relative rounded-[6px] shrink-0 size-[31.997px]" data-name="Button">
      <div aria-hidden="true" className="absolute border-[#f0f0f0] border-[1.111px] border-solid inset-0 pointer-events-none rounded-[6px]" />
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center pl-[1.111px] pr-[1.128px] py-[1.111px] relative size-full">
        <ArrowLeftIcon />
      </div>
    </div>
  );
}

function Button1() {
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

function Button2() {
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

function Button3() {
  return (
    <div className="relative rounded-[6px] shrink-0 size-[31.997px]" data-name="Button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center relative size-full">
        <p className="font-['Open_Sans:Regular',sans-serif] font-normal leading-[18px] relative shrink-0 text-[#243746] text-[12px] text-center whitespace-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
          3
        </p>
      </div>
    </div>
  );
}

function Button4() {
  return (
    <div className="relative rounded-[6px] shrink-0 size-[31.997px]" data-name="Button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center relative size-full">
        <p className="font-['Open_Sans:Regular',sans-serif] font-normal leading-[18px] relative shrink-0 text-[#243746] text-[12px] text-center whitespace-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
          4
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

function Button5() {
  return (
    <div className="bg-white relative rounded-[6px] shrink-0 size-[31.997px]" data-name="Button">
      <div aria-hidden="true" className="absolute border-[#f0f0f0] border-[1.111px] border-solid inset-0 pointer-events-none rounded-[6px]" />
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center pl-[1.111px] pr-[1.128px] py-[1.111px] relative size-full">
        <ArrowRightIcon />
      </div>
    </div>
  );
}

function Container47() {
  return (
    <div className="h-[31.997px] relative shrink-0 w-[201.962px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[1.997px] items-center relative size-full">
        <Button />
        <Button1 />
        <Button2 />
        <Button3 />
        <Button4 />
        <Button5 />
      </div>
    </div>
  );
}

function Container46() {
  return (
    <div className="bg-[#fafafa] h-[47.986px] relative shrink-0 w-full" data-name="Container">
      <div aria-hidden="true" className="absolute border-[#f0f0f0] border-solid border-t-[1.111px] inset-0 pointer-events-none" />
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex items-center justify-between pt-[1.111px] px-[15.99px] relative size-full">
          <Text73 />
          <Container47 />
        </div>
      </div>
    </div>
  );
}

function Frame() {
  return (
    <div className="content-stretch flex flex-col h-[750px] items-start justify-between relative shrink-0 w-full">
      <Container26 />
      <Container46 />
    </div>
  );
}

function Container25() {
  return (
    <div className="bg-white flex-[1_0_0] min-h-px min-w-px relative rounded-[8px] w-[1088.455px]" data-name="Container">
      <div className="overflow-clip rounded-[inherit] size-full">
        <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start p-[1.111px] relative size-full">
          <Frame />
        </div>
      </div>
      <div aria-hidden="true" className="absolute border-[#d9d9d9] border-[1.111px] border-solid inset-0 pointer-events-none rounded-[8px]" />
    </div>
  );
}

function Container18() {
  return (
    <div className="flex-[1_0_0] h-[811.354px] min-h-px min-w-px relative" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col gap-[7.986px] items-start overflow-clip relative rounded-[inherit] size-full">
        <Container19 />
        <Container25 />
      </div>
    </div>
  );
}

function Container1() {
  return (
    <div className="flex-[1_0_0] min-h-px min-w-px relative w-[1484.444px]" data-name="Container">
      <div className="overflow-clip rounded-[inherit] size-full">
        <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[11.997px] items-start pl-[11.997px] pr-[11.996px] pt-[11.997px] relative size-full">
          <Container2 />
          <Container18 />
        </div>
      </div>
    </div>
  );
}

function RoleAccessLevel() {
  return (
    <div className="bg-white flex-[1_0_0] h-[907.344px] min-h-px min-w-px relative" data-name="RoleAccessLevel">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative size-full">
        <Container />
        <Container1 />
      </div>
    </div>
  );
}

export default function MainContent() {
  return (
    <div className="content-stretch flex items-start relative size-full" data-name="MainContent">
      <RoleAccessLevel />
    </div>
  );
}