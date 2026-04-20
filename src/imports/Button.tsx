import svgPaths from "./svg-mqvwdoj2yd";

function Group() {
  return (
    <div className="absolute inset-[8.33%]">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g id="Group 132">
          <g id="Union">
            <mask fill="white" id="path-1-inside-1_2025_872">
              <path d={svgPaths.p1c911a00} />
            </mask>
            <path d={svgPaths.p279659c0} fill="var(--stroke-0, white)" mask="url(#path-1-inside-1_2025_872)" />
          </g>
          <path d={svgPaths.p204ebc11} id="Ellipse 43" stroke="var(--stroke-0, white)" strokeWidth="1.5" />
        </g>
      </svg>
    </div>
  );
}

function Component24PxAppSettings({ className }: { className?: string }) {
  return (
    <div className={className || "relative shrink-0 size-[24px]"} data-name="24px/app/settings">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid overflow-clip relative rounded-[inherit] size-full">
        <Group />
      </div>
    </div>
  );
}

export default function Button() {
  return (
    <div className="content-stretch flex items-center justify-center relative rounded-[24px] size-full" data-name="button">
      <Component24PxAppSettings />
    </div>
  );
}