export default function Switch() {
  return (
    <div className="relative size-full" data-name="switch">
      <div className="absolute bg-[#ff4d00] inset-0 rounded-[16px]" data-name="Plate" />
      <div className="-translate-y-1/2 absolute overflow-clip right-[2px] shadow-[0px_2px_4px_0px_rgba(0,35,11,0.2)] size-[20px] top-1/2" data-name="master/switch/handle/default">
        <div className="absolute bg-white inset-0 rounded-[16px]" />
      </div>
    </div>
  );
}