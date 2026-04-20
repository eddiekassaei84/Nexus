import svgPaths from "./svg-0vjjjbc447";

function Files() {
  return (
    <div className="absolute h-[56px] left-0 top-0 w-[172px]" data-name="Files">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 172 56">
        <g id="Files">
          <rect fill="#243746" height="56" width="172" />
          <g id="Vector">
            <path d={svgPaths.p290f6780} fill="#A7A8A9" />
            <path d={svgPaths.p26776df1} fill="var(--fill-0, #FF4D00)" />
            <path d={svgPaths.p3a038a00} fill="var(--fill-0, #FF4D00)" />
            <path d={svgPaths.p6377600} fill="var(--fill-0, #FF4D00)" />
            <path d={svgPaths.p2dd6f880} fill="var(--fill-0, #FF4D00)" />
            <path d={svgPaths.p25860690} fill="var(--fill-0, #FF4D00)" />
          </g>
        </g>
      </svg>
    </div>
  );
}

function Group1() {
  return (
    <div className="absolute contents left-0 top-0">
      <Files />
    </div>
  );
}

export default function Group() {
  return (
    <div className="relative size-full">
      <Group1 />
    </div>
  );
}