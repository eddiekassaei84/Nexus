import svgPaths from "./svg-2062azgn1b";

function CountIcon() {
  return (
    <div className="relative shrink-0 size-[14px]" data-name="CountIcon">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14 14">
        <g id="CountIcon">
          <path d={svgPaths.p266463c0} id="Vector" stroke="var(--stroke-0, #344054)" strokeLinecap="round" strokeWidth="1.225" />
        </g>
      </svg>
    </div>
  );
}

function Text() {
  return (
    <div className="flex-[1_0_0] h-[19.5px] min-h-px min-w-px relative" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start relative size-full">
        <p className="font-['Open_Sans:SemiBold',sans-serif] font-semibold leading-[19.5px] relative shrink-0 text-[#243746] text-[13px] text-center whitespace-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
          2 Selected
        </p>
      </div>
    </div>
  );
}

function Segment() {
  return (
    <div className="content-stretch flex gap-[6px] h-[34px] items-center px-[14px] relative shrink-0 w-[111.75px]" data-name="Segment">
      <CountIcon />
      <Text />
    </div>
  );
}

function VDiv() {
  return <div className="bg-[#d0d5dd] h-[20px] shrink-0 w-px" data-name="VDiv" />;
}

function EditIcon() {
  return (
    <div className="relative shrink-0 size-[14px]" data-name="EditIcon">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14 14">
        <g id="EditIcon">
          <path d={svgPaths.p20d6f040} id="Vector" stroke="var(--stroke-0, #344054)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.225" />
          <path d="M7.875 3.9375L10.0625 6.125" id="Vector_2" stroke="var(--stroke-0, #344054)" strokeLinecap="round" strokeWidth="1.225" />
        </g>
      </svg>
    </div>
  );
}

function Text1() {
  return (
    <div className="flex-[1_0_0] h-[19.5px] min-h-px min-w-px relative" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start relative size-full">
        <p className="font-['Open_Sans:Regular',sans-serif] font-normal leading-[19.5px] relative shrink-0 text-[#243746] text-[13px] text-center whitespace-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
          Edit Bulk
        </p>
      </div>
    </div>
  );
}

function Segment1() {
  return (
    <div className="content-stretch flex gap-[6px] h-[34px] items-center px-[14px] relative shrink-0 w-[100.953px]" data-name="Segment">
      <EditIcon />
      <Text1 />
    </div>
  );
}

function VDiv1() {
  return <div className="bg-[#d0d5dd] h-[20px] shrink-0 w-px" data-name="VDiv" />;
}

function VDiv2() {
  return <div className="bg-[#d0d5dd] h-[20px] shrink-0 w-px" data-name="VDiv" />;
}

function TrashIcon() {
  return (
    <div className="relative shrink-0 size-[14px]" data-name="TrashIcon">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14 14">
        <g id="TrashIcon">
          <path d={svgPaths.p4d85200} id="Vector" stroke="var(--stroke-0, #344054)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.225" />
        </g>
      </svg>
    </div>
  );
}

function Text2() {
  return (
    <div className="flex-[1_0_0] h-[19.5px] min-h-px min-w-px relative" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start relative size-full">
        <p className="font-['Open_Sans:Regular',sans-serif] font-normal leading-[19.5px] relative shrink-0 text-[#243746] text-[13px] text-center whitespace-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
          Remove
        </p>
      </div>
    </div>
  );
}

function Segment2() {
  return (
    <div className="content-stretch flex gap-[6px] h-[34px] items-center px-[14px] relative shrink-0 w-[100.484px]" data-name="Segment">
      <TrashIcon />
      <Text2 />
    </div>
  );
}

export default function SelectionActionBar() {
  return (
    <div className="bg-white relative rounded-[6px] size-full" data-name="SelectionActionBar">
      <div className="content-stretch flex items-center overflow-clip p-px relative rounded-[inherit] size-full">
        <Segment />
        <VDiv />
        <Segment1 />
        <VDiv1 />
        <VDiv2 />
        <Segment2 />
      </div>
      <div aria-hidden="true" className="absolute border border-[#d0d5dd] border-solid inset-0 pointer-events-none rounded-[6px] shadow-[0px_4px_18px_0px_rgba(0,0,0,0.13),0px_1px_4px_0px_rgba(0,0,0,0.07)]" />
    </div>
  );
}