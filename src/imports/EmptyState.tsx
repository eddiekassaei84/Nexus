import svgPaths from "./svg-nvvre13kiz";

function Group3() {
  return (
    <div className="absolute contents inset-[9.87%_17.28%_11.85%_6.52%]">
      <div className="absolute flex inset-[10.53%_17.28%_11.85%_7.07%] items-center justify-center">
        <div className="-rotate-15 flex-none h-[90px] w-[120px]">
          <div className="bg-[#c3c7cc] rounded-[8px] size-full" />
        </div>
      </div>
      <div className="absolute flex inset-[9.87%_17.82%_12.51%_6.52%] items-center justify-center">
        <div className="-rotate-15 flex-none h-[90px] w-[120px]">
          <div className="bg-[#e5e7e9] rounded-[8px] size-full" />
        </div>
      </div>
    </div>
  );
}

function Group1() {
  return (
    <div className="absolute inset-[11.18%_17.06%_27.63%_17.72%]">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 120 93">
        <g id="Group 200">
          <rect fill="var(--fill-0, #E5E7E9)" height="86" id="Rectangle 1071" rx="6" stroke="var(--stroke-0, #A1A8B0)" strokeWidth="4" width="116" x="2" y="5" />
          <rect fill="var(--fill-0, #E5E7E9)" height="90" id="Rectangle 1062" rx="8" width="120" />
          <path d={svgPaths.p3c0ed880} fill="var(--fill-0, #C3C7CC)" id="Vector 129" />
          <circle cx="43" cy="28" fill="var(--fill-0, #C3C7CC)" id="Ellipse 39" r="14" />
          <rect height="83" id="Rectangle 1069" rx="4.5" stroke="var(--stroke-0, #C3C7CC)" strokeWidth="7" width="113" x="3.5" y="3.5" />
        </g>
      </svg>
    </div>
  );
}

function Group() {
  return (
    <div className="relative size-full">
      <div className="absolute inset-[0_-1.85%_-5.44%_-1.85%]">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 39.7063 13.7074">
          <g id="Group 196">
            <path d={svgPaths.p20334e00} id="Vector 99" stroke="var(--stroke-0, #FF4D00)" strokeWidth="2" />
            <path d={svgPaths.pc692e80} id="Vector 100" stroke="var(--stroke-0, #FF4D00)" strokeWidth="2" />
            <path d={svgPaths.p142be100} id="Vector 101" stroke="var(--stroke-0, #FF4D00)" strokeWidth="2" />
          </g>
        </svg>
      </div>
    </div>
  );
}

function Group2() {
  return (
    <div className="absolute contents inset-[9.87%_6.19%_9.21%_6.52%]">
      <Group3 />
      <Group1 />
      <div className="absolute flex inset-[76.97%_20.17%_14.47%_59.02%] items-center justify-center">
        <div className="flex-none h-[13px] rotate-180 w-[38.292px]">
          <Group />
        </div>
      </div>
    </div>
  );
}

export default function EmptyState() {
  return (
    <div className="content-stretch flex flex-col items-center justify-end relative size-full" data-name="Empty State">
      <div className="h-[152px] overflow-clip relative shrink-0 w-[184px]" data-name="Empty Graphic">
        <Group2 />
      </div>
    </div>
  );
}