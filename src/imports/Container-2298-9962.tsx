import svgPaths from "./svg-eecwam5vcx";

function Icon() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="Icon">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="Icon">
          <path d={svgPaths.p2d974900} id="Vector" stroke="var(--stroke-0, #616D79)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.4" />
          <path d="M9.333 3.667L12.333 6.667" id="Vector_2" stroke="var(--stroke-0, #616D79)" strokeLinecap="round" strokeWidth="1.4" />
        </g>
      </svg>
    </div>
  );
}

function Text() {
  return (
    <div className="h-[20px] relative shrink-0 w-[24.969px]" data-name="Text">
      <p className="-translate-x-1/2 absolute font-['Inter:Regular',sans-serif] font-normal leading-[20px] left-[12px] not-italic text-[#616d79] text-[14px] text-center top-0 whitespace-nowrap">Edit</p>
    </div>
  );
}

function Icon1() {
  return (
    <div className="relative shrink-0 size-[14px]" data-name="Icon">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14 14">
        <g id="Icon">
          <path d={svgPaths.p32bd4f00} fill="var(--fill-0, #FFFBE6)" id="Vector" stroke="var(--stroke-0, #D97706)" strokeLinejoin="round" strokeWidth="1.225" />
          <path d="M7 5.6875V8.3125" id="Vector_2" stroke="var(--stroke-0, #D97706)" strokeLinecap="round" strokeWidth="1.225" />
          <path d={svgPaths.p2dc3da00} fill="var(--fill-0, #D97706)" id="Vector_3" />
        </g>
      </svg>
    </div>
  );
}

function Frame() {
  return (
    <div className="relative shrink-0">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[4px] items-center relative">
        <Icon />
        <Text />
        <Icon1 />
      </div>
    </div>
  );
}

function Button() {
  return (
    <div className="absolute content-stretch flex h-[36px] items-center justify-center left-[52px] px-[12px] rounded-[4px] top-[3.5px]" data-name="Button">
      <Frame />
    </div>
  );
}

function Container2() {
  return <div className="bg-white h-[12px] rounded-[6px] shadow-[0px_1px_2px_0px_rgba(0,0,0,0.2)] shrink-0 w-full" data-name="Container" />;
}

function Container1() {
  return (
    <div className="absolute bg-[#ff4d00] content-stretch flex flex-col h-[16px] items-start left-[12px] pl-[16px] pr-[4px] pt-[2px] rounded-[8px] top-[13.5px] w-[32px]" data-name="Container">
      <Container2 />
    </div>
  );
}

export default function Container() {
  return (
    <div className="relative size-full" data-name="Container">
      <Button />
      <Container1 />
    </div>
  );
}