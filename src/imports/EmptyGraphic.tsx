import svgPaths from "./svg-xwfpp1ncla";

function Group() {
  return (
    <div className="absolute inset-[13.16%_13.26%_13.67%_13.04%]" data-name="Group">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 135.594 111.228">
        <g id="Group">
          <path d={svgPaths.pf083600} fill="var(--fill-0, #F5F5F5)" id="Vector" />
          <path clipRule="evenodd" d={svgPaths.p13fb8b80} fill="var(--fill-0, #A1A8B0)" fillRule="evenodd" id="Vector_2" />
          <g id="Vector_3" />
          <path clipRule="evenodd" d={svgPaths.p3cae6f00} fill="var(--fill-0, #F5F5F5)" fillRule="evenodd" id="Vector_4" />
          <path clipRule="evenodd" d={svgPaths.p13a75f00} fill="var(--fill-0, #E5E7E9)" fillRule="evenodd" id="Vector_5" />
        </g>
      </svg>
    </div>
  );
}

function Group2() {
  return (
    <div className="absolute inset-[27.63%_39.13%_44.74%_39.13%]">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 40 42">
        <g id="Group 195">
          <circle cx="20" cy="22" fill="var(--fill-0, #E5E7E9)" id="Ellipse 23" r="20" />
          <circle cx="20" cy="20" fill="var(--fill-0, white)" id="Ellipse 24" r="19.5" stroke="var(--stroke-0, #F2F3F4)" />
          <g id="Group 193">
            <path d="M20 32L20 8" id="Vector 102" stroke="var(--stroke-0, #FF6425)" strokeWidth="4" />
            <path d="M32 20L8 20" id="Vector 103" stroke="var(--stroke-0, #FF6425)" strokeWidth="4" />
          </g>
        </g>
      </svg>
    </div>
  );
}

function Group1() {
  return (
    <div className="absolute inset-[17.11%_39.67%_74.34%_39.51%]">
      <div className="absolute inset-[0_-1.85%_-5.44%_-1.85%]">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 39.7073 13.7071">
          <g id="Group 194">
            <path d={svgPaths.p1a0ca400} id="Vector 99" stroke="var(--stroke-0, #A1A8B0)" strokeWidth="2" />
            <path d="M5.65685 13L0.707107 8.05025" id="Vector 100" stroke="var(--stroke-0, #A1A8B0)" strokeWidth="2" />
            <path d="M34.0504 13L39.0002 8.05025" id="Vector 101" stroke="var(--stroke-0, #A1A8B0)" strokeWidth="2" />
          </g>
        </svg>
      </div>
    </div>
  );
}

function Group3() {
  return (
    <div className="absolute contents inset-[17.11%_39.13%_44.74%_39.13%]">
      <Group2 />
      <Group1 />
    </div>
  );
}

function Group4() {
  return (
    <div className="absolute contents inset-[13.16%_13.26%_13.67%_13.04%]">
      <Group />
      <Group3 />
    </div>
  );
}

export default function EmptyGraphic() {
  return (
    <div className="relative size-full" data-name="Empty Graphic">
      <Group4 />
    </div>
  );
}