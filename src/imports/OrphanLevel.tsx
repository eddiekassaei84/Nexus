import svgPaths from "./svg-7rajs07462";

function PopoverTitle() {
  return (
    <div className="bg-white relative shrink-0 w-full" data-name="popover/title">
      <div className="overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex flex-col items-start px-[16px] py-[5px] relative w-full">
          <div className="flex flex-col font-['Inter:Semi_Bold',sans-serif] font-semibold justify-center leading-[0] not-italic relative shrink-0 text-[#434343] text-[14px] w-full">
            <p className="leading-[20px]">Orphan Level</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function PopoverContent() {
  return (
    <div className="bg-white relative shrink-0 w-full" data-name="popover/content">
      <div className="overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex flex-col items-start px-[16px] py-[12px] relative w-full">
          <p className="font-['Inter:Regular',sans-serif] font-normal leading-[20px] not-italic relative shrink-0 text-[#595959] text-[14px] w-full">{`This "Level" is no longer part of the LBS but is preserved for historical accuracy. Select a new value to replace it. `}</p>
        </div>
      </div>
    </div>
  );
}

function Arrow() {
  return (
    <div className="h-[28px] relative w-[6px]" data-name="arrow">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 6 28">
        <g clipPath="url(#clip0_2417_1615)" id="arrow">
          <path d={svgPaths.p3b578900} fill="var(--fill-0, #F2F3F4)" id="arrow_2" />
        </g>
        <defs>
          <clipPath id="clip0_2417_1615">
            <rect fill="white" height="28" width="6" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

export default function OrphanLevel() {
  return (
    <div className="content-stretch flex flex-col items-start relative size-full" data-name="OrphanLevel">
      <div className="content-stretch flex flex-col items-start overflow-clip relative shadow-[0px_4px_12px_0px_rgba(0,0,0,0.15)] shrink-0 w-full" data-name="Popover - Web">
        <div className="content-stretch flex flex-col items-start overflow-clip relative rounded-[4px] shrink-0 w-[240px]" data-name="master/popover">
          <PopoverTitle />
          <div className="h-px relative shrink-0 w-full" data-name="divider/horizontal">
            <div className="absolute bg-[#d9d9d9] inset-0" data-name="divider/horizontal" />
          </div>
          <PopoverContent />
        </div>
        <div className="flex h-[6px] items-center justify-center relative shrink-0 w-[28px]" style={{ "--transform-inner-width": "1200", "--transform-inner-height": "21" } as React.CSSProperties}>
          <div className="-rotate-90 -scale-y-100 flex-none">
            <Arrow />
          </div>
        </div>
      </div>
    </div>
  );
}