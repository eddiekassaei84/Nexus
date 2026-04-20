import svgPaths from "./svg-fjqvq36uqo";

function Icon() {
  return (
    <div className="content-stretch flex gap-[8px] items-start p-[8px] relative rounded-[40px] shrink-0" data-name="Icon">
      <div className="relative shrink-0 size-[18px]" data-name="trash">
        <div className="absolute inset-[0_9.38%_6.25%_9.38%]" data-name="Vector">
          <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14.6239 16.875">
            <path d={svgPaths.pc0b2e00} fill="var(--fill-0, #384857)" id="Vector" />
          </svg>
        </div>
      </div>
    </div>
  );
}

export default function Delete() {
  return (
    <div className="content-stretch flex flex-col items-center justify-center p-[2px] relative rounded-[4px] size-full" data-name="delete">
      <Icon />
    </div>
  );
}