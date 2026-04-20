import svgPaths from "./svg-peu7na2q36";

function Icon() {
  return (
    <div className="relative shrink-0 size-[18px]" data-name="Icon">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 18 18">
        <g clipPath="url(#clip0_2176_5213)" id="Icon">
          <path d={svgPaths.p3db7b080} id="Vector" stroke="var(--stroke-0, #384857)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.78436" />
          <path d={svgPaths.p3e81e900} id="Vector_2" stroke="var(--stroke-0, #384857)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.78436" />
          <path d={svgPaths.p3fee0600} id="Vector_3" stroke="var(--stroke-0, #384857)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.78436" />
        </g>
        <defs>
          <clipPath id="clip0_2176_5213">
            <rect fill="white" height="18" width="18" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

export default function Role() {
  return (
    <div className="bg-[#f0f2f5] content-stretch flex items-center justify-center relative rounded-[6px] size-full" data-name="Role">
      <Icon />
    </div>
  );
}