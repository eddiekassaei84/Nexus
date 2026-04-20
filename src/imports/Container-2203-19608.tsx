import svgPaths from "./svg-r7j39olk53";

function InfoIcon() {
  return (
    <div className="relative shrink-0 size-[15px]" data-name="InfoIcon">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 15 15">
        <g clipPath="url(#clip0_2203_19617)" id="InfoIcon">
          <path d={svgPaths.p3d2bd500} id="Vector" stroke="var(--stroke-0, #616D79)" strokeWidth="0.75" />
          <path d={svgPaths.p106b6900} fill="var(--fill-0, #616D79)" id="Vector_2" stroke="var(--stroke-0, #616D79)" strokeWidth="0.75" />
          <path d={svgPaths.p3237fd00} id="Vector_3" stroke="var(--stroke-0, #616D79)" strokeLinejoin="round" strokeWidth="0.75" />
        </g>
        <defs>
          <clipPath id="clip0_2203_19617">
            <rect fill="white" height="15" width="15" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Button() {
  return (
    <div className="relative rounded-[4px] shrink-0 size-[28px]" data-name="Button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center px-[6.5px] relative size-full">
        <InfoIcon />
      </div>
    </div>
  );
}

function Icon() {
  return (
    <div className="relative shrink-0 size-[15px]" data-name="Icon">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 15 15">
        <g id="Icon">
          <path d={svgPaths.p34d59600} fill="var(--fill-0, #616D79)" id="Vector" />
          <path d={svgPaths.p3f5ba600} fill="var(--fill-0, #616D79)" id="Vector_2" />
          <path d={svgPaths.peec08c0} fill="var(--fill-0, #616D79)" id="Vector_3" />
        </g>
      </svg>
    </div>
  );
}

function Button1() {
  return (
    <div className="relative rounded-[4px] shrink-0 size-[28px]" data-name="Button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center px-[6.5px] relative size-full">
        <Icon />
      </div>
    </div>
  );
}

export default function Container() {
  return (
    <div className="bg-white content-stretch flex gap-[2px] items-center justify-center px-px relative shadow-[-1px_0px_0px_0px_#e5e7eb,-4px_0px_10px_0px_rgba(0,0,0,0.06)] size-full" data-name="Container">
      <Button />
      <Button1 />
    </div>
  );
}