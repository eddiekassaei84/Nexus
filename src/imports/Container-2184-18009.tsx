import svgPaths from "./svg-gto0gi170d";
import { imgGroup } from "./svg-nof0l";

function Group() {
  return (
    <div className="absolute inset-[4.05%_12.16%] mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[-2.189px_-0.73px] mask-size-[18px_18px]" data-name="Group" style={{ maskImage: `url('${imgGroup}')` }}>
      <div className="absolute inset-[-5.88%_-7.14%]">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 15.567 18.486">
          <g id="Group">
            <path d={svgPaths.p6fd1680} id="Vector" stroke="var(--stroke-0, #384857)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.94538" />
            <path d={svgPaths.p32584590} id="Vector_2" stroke="var(--stroke-0, #384857)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.94538" />
          </g>
        </svg>
      </div>
    </div>
  );
}

function ClipPathGroup() {
  return (
    <div className="absolute contents inset-0" data-name="Clip path group">
      <Group />
    </div>
  );
}

function Icon() {
  return (
    <div className="relative shrink-0 size-[18px]" data-name="Icon">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid overflow-clip relative rounded-[inherit] size-full">
        <ClipPathGroup />
      </div>
    </div>
  );
}

export default function Container() {
  return (
    <div className="bg-[#f0f2f5] content-stretch flex items-center justify-center relative rounded-[6px] size-full" data-name="Container">
      <Icon />
    </div>
  );
}