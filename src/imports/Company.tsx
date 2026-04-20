import svgPaths from "./svg-c3qmohccmn";

function Group() {
  return (
    <div className="absolute inset-[8.33%_12.5%]" data-name="Group">
      <div className="absolute inset-[-5%_-5.56%]">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 15 16.5">
          <g id="Group">
            <path d={svgPaths.p1c17b000} id="Vector" stroke="var(--stroke-0, #384857)" strokeLinejoin="round" strokeWidth="1.5" />
            <path d="M0.75 15.75H14.25" id="Vector_2" stroke="var(--stroke-0, #384857)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
            <path d={svgPaths.p3ac94a00} id="Vector_3" stroke="var(--stroke-0, #384857)" strokeLinejoin="round" strokeWidth="1.5" />
            <path d={svgPaths.p108bc880} id="Vector_4" stroke="var(--stroke-0, #384857)" strokeLinecap="round" strokeWidth="1.5" />
          </g>
        </svg>
      </div>
    </div>
  );
}

function Company1() {
  return (
    <div className="relative shrink-0 size-[18px]" data-name="Company">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start overflow-clip px-px relative rounded-[inherit] size-full">
        <div className="relative shrink-0 size-[18px]" data-name="building-02">
          <Group />
        </div>
      </div>
    </div>
  );
}

export default function Company() {
  return (
    <div className="bg-[#f0f2f5] content-stretch flex items-center justify-center relative rounded-[6px] size-full" data-name="Company">
      <Company1 />
    </div>
  );
}