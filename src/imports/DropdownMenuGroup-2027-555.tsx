function DropdownMenuItem() {
  return (
    <div className="h-[32px] relative shrink-0 w-full" data-name="Dropdown Menu Item">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex gap-[8px] items-center px-[12px] py-[5px] relative size-full">
          <p className="flex-[1_0_0] font-['Inter:Regular',sans-serif] font-normal leading-[20px] min-h-px min-w-px not-italic relative text-[#384857] text-[14px]">Recent</p>
        </div>
      </div>
    </div>
  );
}

function DropdownMenuItem1() {
  return (
    <div className="bg-[#f5f5f5] h-[32px] relative shrink-0 w-full" data-name="Dropdown Menu Item">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex gap-[8px] items-center px-[12px] py-[5px] relative size-full">
          <p className="flex-[1_0_0] font-['Inter:Regular',sans-serif] font-normal leading-[20px] min-h-px min-w-px not-italic relative text-[#384857] text-[14px]">Name ( A→ Z )</p>
        </div>
      </div>
    </div>
  );
}

function DropdownMenuItem2() {
  return (
    <div className="h-[32px] relative shrink-0 w-full" data-name="Dropdown Menu Item">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex gap-[8px] items-center px-[12px] py-[5px] relative size-full">
          <p className="flex-[1_0_0] font-['Inter:Regular',sans-serif] font-normal leading-[20px] min-h-px min-w-px not-italic relative text-[#384857] text-[14px]">Name ( Z→ A )</p>
        </div>
      </div>
    </div>
  );
}

function DropdownMenuItem3() {
  return (
    <div className="h-[32px] relative shrink-0 w-full" data-name="Dropdown Menu Item">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex gap-[8px] items-center px-[12px] py-[5px] relative size-full">
          <p className="flex-[1_0_0] font-['Inter:Regular',sans-serif] font-normal leading-[20px] min-h-px min-w-px not-italic relative text-[#384857] text-[14px]">Oldest</p>
        </div>
      </div>
    </div>
  );
}

export default function DropdownMenuGroup() {
  return (
    <div className="bg-white content-stretch flex flex-col items-start justify-center overflow-clip py-[4px] relative rounded-[4px] shadow-[0px_9px_28px_8px_rgba(0,0,0,0.05),0px_6px_16px_0px_rgba(0,0,0,0.08),0px_3px_6px_-4px_rgba(0,0,0,0.12)] size-full" data-name="Dropdown Menu Group">
      <DropdownMenuItem />
      <DropdownMenuItem1 />
      <DropdownMenuItem2 />
      <DropdownMenuItem3 />
    </div>
  );
}