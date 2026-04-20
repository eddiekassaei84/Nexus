import svgPaths from "./svg-ykz1la4da4";

function Hidden() {
  return (
    <div className="relative shrink-0 size-[24px]" data-name="_hidden">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="_hidden">
          <path d={svgPaths.p73e7900} fill="var(--fill-0, #9EA3A9)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function Padding() {
  return (
    <div className="content-stretch flex items-start p-[4px] relative rounded-[100px] shrink-0" data-name="Padding">
      <Hidden />
    </div>
  );
}

export default function Checkbox() {
  return (
    <div className="content-stretch flex flex-col items-center justify-center relative size-full" data-name="Checkbox/">
      <Padding />
    </div>
  );
}