function Tabs1() {
  return (
    <div className="bg-white content-stretch flex h-[70px] items-start px-[23px] py-[24px] relative shrink-0" data-name="Tabs 4">
      <p className="font-['Inter:Bold',sans-serif] font-bold leading-[26px] not-italic relative shrink-0 text-[#243746] text-[18px] whitespace-nowrap">Projects</p>
      <div className="absolute inset-0 pointer-events-none rounded-[inherit] shadow-[inset_0px_-4px_0px_0px_#243746]" />
    </div>
  );
}

function Tabs2() {
  return (
    <div className="bg-white content-stretch flex h-[70px] items-start px-[23px] py-[24px] relative shrink-0" data-name="Tabs 6">
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[22px] not-italic relative shrink-0 text-[#243746] text-[16px] whitespace-nowrap">Archived</p>
    </div>
  );
}

function Tabs() {
  return (
    <div className="content-stretch flex h-[70px] items-start pb-[22px] pt-[24px] px-[23px] relative shrink-0" data-name="Tabs 2">
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[22px] not-italic relative shrink-0 text-[#8a939d] text-[16px] whitespace-nowrap">Dashboard</p>
    </div>
  );
}

function Menu() {
  return (
    <div className="content-stretch flex h-[96px] items-end justify-center relative shrink-0" data-name="Menu">
      <Tabs1 />
      <Tabs2 />
      <Tabs />
    </div>
  );
}

function LeftSide() {
  return (
    <div className="content-stretch flex flex-[1_0_0] h-[96px] items-end min-h-px min-w-px relative" data-name="Left Side">
      <Menu />
    </div>
  );
}

export default function Header() {
  return (
    <div className="bg-white content-stretch flex items-end justify-center px-[72px] relative shadow-[0px_2px_0px_0px_#f0f0f3] size-full" data-name="Header">
      <LeftSide />
    </div>
  );
}