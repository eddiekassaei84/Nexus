import imgAutodeskLogo2021Svg from "figma:asset/de5e422433a571d190e7c4d34a019906817d3b35.png";

export default function Autodesk() {
  return (
    <div className="bg-[#f0f0f3] overflow-clip relative rounded-[24px] size-full" data-name="Autodesk">
      <div className="absolute h-[22.031px] left-[7px] top-[13px] w-[34px]" data-name="Autodesk_Logo_2021.svg">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <img alt="" className="absolute h-full left-0 max-w-none top-0 w-[588.24%]" src={imgAutodeskLogo2021Svg} />
        </div>
      </div>
    </div>
  );
}