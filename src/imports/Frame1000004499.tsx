import svgPaths from "./svg-2six7ebrf6";

function IconRegularTableList() {
  return (
    <div className="h-[35px] relative shrink-0 w-[36px]" data-name="Icon/Regular/table-list">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 36 35">
        <g id="Icon/Regular/table-list">
          <path d={svgPaths.p2d13e180} fill="var(--fill-0, #616D79)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

export default function Frame() {
  return (
    <div className="content-stretch flex flex-col items-center justify-center relative size-full">
      <IconRegularTableList />
    </div>
  );
}