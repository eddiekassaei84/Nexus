function Content() {
  return (
    <div className="content-stretch flex gap-[4px] h-[24px] items-center justify-center relative shrink-0" data-name="content">
      <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[#1890ff] text-[14px] text-center whitespace-nowrap">
        <p className="leading-[20px]">01</p>
      </div>
    </div>
  );
}

export default function VersionPill() {
  return (
    <div className="bg-[#e6f7ff] content-stretch flex items-center justify-center px-[8px] relative rounded-[40px] size-full" data-name="Version pill">
      <div aria-hidden="true" className="absolute border border-[#91d5ff] border-solid inset-0 pointer-events-none rounded-[40px]" />
      <Content />
    </div>
  );
}