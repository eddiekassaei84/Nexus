import svgPaths from "./svg-xnv9n830gq";

export default function Banner() {
  return (
    <div className="bg-[#e6f7ff] content-stretch flex gap-[8px] items-start pl-[16px] pr-[4px] py-[12px] relative rounded-[4px] size-full" data-name="Banner">
      <div aria-hidden="true" className="absolute border border-[#1890ff] border-solid inset-0 pointer-events-none rounded-[4px]" />
      <div className="content-stretch flex gap-[8px] items-start relative shrink-0 w-[380px]" data-name="Content">
        <div className="relative shrink-0 size-[24px]" data-name="24px/suggested/info-circle-filled">
          <div className="absolute inset-[8.33%]" data-name="Subtract">
            <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
              <path d={svgPaths.p93c9e00} fill="var(--fill-0, #36CFC9)" id="Subtract" />
            </svg>
          </div>
        </div>
        <div className="flex-[1_0_0] min-h-px min-w-px relative" data-name="Text Wrapper">
          <div className="content-stretch flex flex-col gap-[4px] items-start not-italic pr-[8px] relative text-[#262626] w-full">
            <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[24px] min-w-full relative shrink-0 text-[16px] w-[min-content]">Alert Title</p>
            <p className="font-['Inter:Regular',sans-serif] font-normal leading-[20px] min-w-full relative shrink-0 text-[14px] w-[min-content]">This is some description about this alert with some actionable buttons</p>
          </div>
        </div>
      </div>
      <div className="content-stretch flex items-center justify-center relative shrink-0 size-[44px]" data-name="Close Wrapper">
        <div className="overflow-clip relative shrink-0 size-[24px]" data-name="24px/suggested/x">
          <div className="absolute flex inset-[-3.03%] items-center justify-center">
            <div className="flex-none rotate-45 size-[18px]">
              <div className="relative size-full">
                <div className="absolute inset-[-4.17%]">
                  <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 19.5 19.5">
                    <g id="Group 32">
                      <path d="M0.75 9.75H18.75" id="Vector 19" stroke="var(--stroke-0, black)" strokeLinecap="square" strokeWidth="1.5" />
                      <path d="M9.75 0.75L9.75 18.75" id="Vector 20" stroke="var(--stroke-0, black)" strokeLinecap="square" strokeWidth="1.5" />
                    </g>
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}