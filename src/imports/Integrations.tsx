import imgImage15 from "figma:asset/1347207f59fbc71bd42a8237de662b6bec7350bc.png";

function Autodesk() {
  return (
    <div className="absolute bg-[#f0f0f3] left-0 overflow-clip rounded-[24px] size-[48px] top-0" data-name="Autodesk">
      <div className="absolute left-[12px] size-[24px] top-[12.85px]" data-name="image 15">
        <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgImage15} />
      </div>
    </div>
  );
}

export default function Integrations() {
  return (
    <div className="relative size-full" data-name="Integrations">
      <Autodesk />
    </div>
  );
}