import svgPaths from "./svg-1xqm58b8kx";

function Icon() {
  return (
    <div className="h-[65.816px] overflow-clip relative shrink-0 w-full" data-name="Icon">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 31.4583 65.816">
        <path d={svgPaths.p1fa4cb80} fill="var(--fill-0, #F0F0F0)" id="Vector" />
      </svg>
    </div>
  );
}

function Container() {
  return (
    <div className="absolute content-stretch flex flex-col h-[65.816px] items-start left-0 top-[0.09px] w-[31.458px]" data-name="Container">
      <Icon />
    </div>
  );
}

function Group() {
  return (
    <div className="absolute h-[52.708px] left-[43.4px] top-[6.64px] w-[211.922px]">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 211.922 52.7077">
        <g id="Group 6996">
          <g id="Vector">
            <path d={svgPaths.p19fdbd00} fill="var(--fill-0, #FF4D00)" />
            <path d={svgPaths.p30477a40} fill="var(--fill-0, #FF4D00)" />
            <path d={svgPaths.p1c0c0300} fill="var(--fill-0, #FF4D00)" />
            <path d={svgPaths.p227ae4c0} fill="var(--fill-0, #FF4D00)" />
            <path d={svgPaths.p1a9b7c00} fill="var(--fill-0, #FF4D00)" />
          </g>
          <g id="Vector_2">
            <path d="M0 0H2.71753V14H0V0Z" fill="var(--fill-0, #F0F0F0)" />
            <path d={svgPaths.p363ab380} fill="var(--fill-0, #F0F0F0)" />
            <path d={svgPaths.p96d5400} fill="var(--fill-0, #F0F0F0)" />
            <path d={svgPaths.p19895080} fill="var(--fill-0, #F0F0F0)" />
            <path d={svgPaths.p22b70480} fill="var(--fill-0, #F0F0F0)" />
            <path d={svgPaths.p254cb80} fill="var(--fill-0, #F0F0F0)" />
            <path d={svgPaths.p1a065f00} fill="var(--fill-0, #F0F0F0)" />
          </g>
        </g>
      </svg>
    </div>
  );
}

export default function Inertiafulllogo() {
  return (
    <div className="relative size-full" data-name="Inertiafulllogo68">
      <Container />
      <Group />
    </div>
  );
}