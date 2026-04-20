import svgPaths from "./svg-5uwtku9fcb";

function Group() {
  return (
    <div className="absolute contents inset-[5.26%_6.25%]" data-name="Group">
      <div className="absolute inset-[5.26%_18.75%_42.11%_18.75%]" data-name="Vector">
        <div className="absolute inset-[-9.99%_-10%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 11.6727 11.6829">
            <path d={svgPaths.p16a82700} id="Vector" stroke="var(--stroke-0, #384857)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.94584" />
          </svg>
        </div>
      </div>
      <div className="absolute inset-[57.89%_6.25%_5.26%_6.25%]" data-name="Vector">
        <div className="absolute inset-[-14.27%_-7.14%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 15.5635 8.76189">
            <path d={svgPaths.p2e749380} id="Vector" stroke="var(--stroke-0, #384857)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.94584" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function Icon() {
  return (
    <div className="h-[18.5px] overflow-clip relative shrink-0 w-full" data-name="Icon">
      <Group />
    </div>
  );
}

function Container1() {
  return (
    <div className="content-stretch flex flex-col h-[18px] items-start relative shrink-0 w-full" data-name="Container">
      <Icon />
    </div>
  );
}

function Container() {
  return (
    <div className="absolute content-stretch flex flex-col items-start left-[5px] pt-[-0.25px] px-[1.219px] size-[18px] top-[5px]" data-name="Container">
      <Container1 />
    </div>
  );
}

export default function FigmaMemberIcon() {
  return (
    <div className="bg-[#f0f2f5] overflow-clip relative rounded-[6px] size-full" data-name="FigmaMemberIcon">
      <Container />
    </div>
  );
}