import svgPaths from "./svg-14nui5a10w";

function Button() {
  return (
    <div className="h-[14px] relative shrink-0 w-[56.99px]" data-name="button">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 56.9896 14">
        <g id="button">
          <path d={svgPaths.p8e13980} fill="var(--fill-0, white)" id="Vector" />
          <g clipPath="url(#clip0_2034_6873)" id="svg">
            <path d={svgPaths.p1edf8a00} fill="var(--fill-0, #FF4D00)" id="Vector_2" />
            <path d={svgPaths.p214a7e50} fill="var(--fill-0, #FF4D00)" id="Vector_3" />
            <path d={svgPaths.p24055a00} fill="var(--fill-0, #FF4D00)" id="Vector_4" />
            <path d={svgPaths.p1fd98080} fill="var(--fill-0, #FF4D00)" id="Vector_5" />
            <path d={svgPaths.p3beacce0} fill="var(--fill-0, #FF4D00)" id="Vector_6" />
          </g>
        </g>
        <defs>
          <clipPath id="clip0_2034_6873">
            <rect fill="white" height="6.99653" transform="translate(11 3.50174)" width="45.9896" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Span() {
  return (
    <div className="h-[20px] relative shrink-0 w-[138.281px]" data-name="span">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="-translate-x-1/2 absolute font-['Open_Sans:Regular',sans-serif] font-normal leading-[20px] left-[69.5px] text-[#f2f3f4] text-[16px] text-center top-[-0.11px] whitespace-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
          Cleveland Hospital
        </p>
      </div>
    </div>
  );
}

function Svg() {
  return (
    <div className="relative shrink-0 size-[11.997px]" data-name="svg">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 11.9965 11.9965">
        <g id="svg">
          <path d={svgPaths.p3cbea00} id="Vector" stroke="var(--stroke-0, #F2F3F4)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.49957" />
        </g>
      </svg>
    </div>
  );
}

function Button1() {
  return (
    <div className="content-stretch flex gap-[5.99px] h-[20px] items-center relative shrink-0 w-[156.267px]" data-name="button">
      <Span />
      <Svg />
    </div>
  );
}

function Frame() {
  return (
    <div className="relative shrink-0">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col gap-[4px] items-start relative">
        <Button />
        <Button1 />
      </div>
    </div>
  );
}

export default function Container() {
  return (
    <div className="content-stretch flex flex-col items-start justify-center pl-[15.99px] relative size-full" data-name="Container">
      <Frame />
    </div>
  );
}