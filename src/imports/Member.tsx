import svgPaths from "./svg-kxdakwz0vq";

function Icon() {
  return (
    <div className="relative shrink-0 size-[18px]" data-name="Icon">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 18 18">
        <g clipPath="url(#clip0_2176_5221)" id="Icon">
          <path d={svgPaths.p3fd97980} id="Vector" stroke="var(--stroke-0, #384857)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.94538" />
          <path d={svgPaths.p3065fdf0} id="Vector_2" stroke="var(--stroke-0, #384857)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.94538" />
        </g>
        <defs>
          <clipPath id="clip0_2176_5221">
            <rect fill="white" height="18" width="18" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

export default function Member() {
  return (
    <div className="bg-[#f0f2f5] content-stretch flex items-center justify-center relative rounded-[6px] size-full" data-name="Member">
      <Icon />
    </div>
  );
}