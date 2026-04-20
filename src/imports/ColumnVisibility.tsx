import svgPaths from "./svg-cb8pbl913g";

function Svg() {
  return (
    <div className="h-[22px] relative shrink-0 w-[17.986px]" data-name="svg">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 17.9861 22">
        <g clipPath="url(#clip0_2045_1369)" id="svg">
          <path d={svgPaths.p1e0e9380} fill="var(--fill-0, #616D79)" id="Vector" />
        </g>
        <defs>
          <clipPath id="clip0_2045_1369">
            <rect fill="white" height="22" width="17.9861" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

export default function ColumnVisibility() {
  return (
    <div className="content-stretch flex items-center justify-center relative rounded-[4px] size-full" data-name="column_visibility">
      <Svg />
    </div>
  );
}