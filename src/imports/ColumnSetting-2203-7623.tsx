import svgPaths from "./svg-8fwk0tn1pe";
import { imgGroup } from "./svg-wsmi5";

function Group() {
  return (
    <div className="absolute inset-[13.64%_0.87%_13.64%_0.95%] mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[0px_-2.455px] mask-size-[14.716px_18px]" data-name="Group" style={{ maskImage: `url('${imgGroup}')` }}>
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14.7273 13.0909">
        <g id="Group">
          <path d={svgPaths.p942c180} fill="var(--fill-0, #616D79)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function ClipPathGroup() {
  return (
    <div className="absolute contents inset-[0_0.95%]" data-name="Clip path group">
      <Group />
    </div>
  );
}

function Icon() {
  return (
    <div className="h-[18px] relative shrink-0 w-[15px]" data-name="Icon">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid overflow-clip relative rounded-[inherit] size-full">
        <ClipPathGroup />
      </div>
    </div>
  );
}

export default function ColumnSetting() {
  return (
    <div className="content-stretch flex items-center justify-center px-[9.5px] relative rounded-[4px] size-full" data-name="Column Setting">
      <Icon />
    </div>
  );
}