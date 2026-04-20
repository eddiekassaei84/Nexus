import svgPaths from "./svg-k8hgzstpgn";

function Padding() {
  return (
    <div className="content-stretch flex items-start p-[4px] relative rounded-[100px] shrink-0" data-name="Padding">
      <div className="overflow-clip relative shrink-0 size-[24px]" data-name="_hidden">
        <div className="absolute inset-[12.5%]" data-name="Vector">
          <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 18 18">
            <path d={svgPaths.pae529f2} fill="var(--fill-0, #0E70CB)" id="Vector" />
          </svg>
        </div>
      </div>
    </div>
  );
}

export default function Checkbox() {
  return (
    <div className="content-stretch flex items-center relative size-full" data-name="Checkbox/">
      <Padding />
    </div>
  );
}