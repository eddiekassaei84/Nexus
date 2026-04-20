import svgPaths from "./svg-3xvz08dg8y";
import imgShutterstock6856549542 from "figma:asset/5d8ef005878d70532e56964fc87a73ec8e9a828c.png";
import { imgShutterstock6856549541 } from "./svg-slpmo";

function Content() {
  return (
    <div className="flex-[1_0_0] grid-cols-[max-content] grid-rows-[max-content] inline-grid leading-[0] min-h-px min-w-px place-items-start relative" data-name="content">
      <p className="col-1 font-['Inter:Regular',sans-serif] font-normal leading-[20px] ml-0 mt-0 not-italic relative row-1 text-[#434343] text-[14px] text-center w-[246px]">levi.ackerman@projectinertia.com</p>
    </div>
  );
}

function Header() {
  return (
    <div className="bg-white h-[48px] relative shrink-0 w-full" data-name="header">
      <div className="flex flex-row items-center justify-center size-full">
        <div className="content-stretch flex items-center justify-center px-[21px] py-[16px] relative size-full">
          <Content />
        </div>
      </div>
    </div>
  );
}

function MaskGroup() {
  return (
    <div className="grid-cols-[max-content] grid-rows-[max-content] inline-grid leading-[0] place-items-start relative shrink-0" data-name="Mask Group">
      <div className="col-1 h-[70.042px] mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[-17px_-7.113px] mask-size-[104px_104px] ml-0 mt-[-4.89px] relative row-1 w-[71.336px]" data-name="shutterstock_685654954 1" style={{ maskImage: `url('${imgShutterstock6856549541}')` }}>
        <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgShutterstock6856549542} />
      </div>
    </div>
  );
}

function Content2() {
  return (
    <div className="bg-[#f2f3f4] content-stretch flex gap-[8px] h-[40px] items-center justify-center px-[16px] relative rounded-[40px] shrink-0" data-name="content">
      <div aria-hidden="true" className="absolute border border-[#c3c7cc] border-solid inset-0 pointer-events-none rounded-[40px]" />
      <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[#616d79] text-[14px] whitespace-nowrap">
        <p className="leading-[20px]">Manage your Inertia Account</p>
      </div>
    </div>
  );
}

function Content1() {
  return (
    <div className="bg-white relative shrink-0 w-full" data-name="content">
      <div className="flex flex-col items-center size-full">
        <div className="content-stretch flex flex-col gap-[10px] items-center px-[24px] py-[12px] relative w-full">
          <MaskGroup />
          <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[24px] min-w-full not-italic relative shrink-0 text-[#595959] text-[16px] text-center w-[min-content]">Hi, Levi</p>
          <div className="content-stretch flex h-[44px] items-center justify-center relative shrink-0" data-name="Pill">
            <Content2 />
          </div>
        </div>
      </div>
    </div>
  );
}

function Group() {
  return (
    <div className="relative size-full">
      <div className="absolute inset-[-6.25%_-5.62%_-6.25%_-7.95%]">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 15.144 13.5">
          <g id="Group 8">
            <path d={svgPaths.p3e8e4a00} id="Vector 64" stroke="var(--stroke-0, #616D79)" strokeLinejoin="round" strokeWidth="1.5" />
            <path d="M10.394 6.75L1.06066 6.75" id="Vector 8" stroke="var(--stroke-0, #616D79)" strokeWidth="1.5" />
            <path d={svgPaths.p10709800} id="Vector" stroke="var(--stroke-0, #616D79)" strokeWidth="1.5" />
          </g>
        </svg>
      </div>
    </div>
  );
}

function Content3() {
  return (
    <div className="content-stretch flex gap-[4px] h-[32px] items-center justify-center overflow-clip relative shrink-0" data-name="content">
      <div className="overflow-clip relative shrink-0 size-[16px]" data-name="24px/app/logout">
        <div className="absolute flex inset-[12.5%_8.33%] items-center justify-center">
          <div className="-scale-y-100 flex-none h-[18px] rotate-180 w-[20px]">
            <Group />
          </div>
        </div>
      </div>
      <div className="flex flex-col font-['Inter:Medium',sans-serif] font-medium justify-center leading-[0] not-italic relative shrink-0 text-[#616d79] text-[14px] text-center whitespace-nowrap">
        <p className="leading-[20px]">Sign out</p>
      </div>
    </div>
  );
}

function Footer() {
  return (
    <div className="bg-white h-[48px] relative shrink-0 w-full" data-name="footer">
      <div className="flex flex-col items-center justify-center overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex flex-col items-center justify-center px-[16px] py-[10px] relative size-full">
          <div className="content-stretch flex flex-col items-center justify-center px-[16px] relative rounded-[4px] shrink-0" data-name="Button">
            <Content3 />
          </div>
        </div>
      </div>
      <div aria-hidden="true" className="absolute border-[#c3c7cc] border-b border-solid border-t inset-0 pointer-events-none" />
    </div>
  );
}

function Content4() {
  return (
    <div className="content-stretch flex gap-[4px] h-[32px] items-center justify-center overflow-clip relative shrink-0" data-name="content">
      <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[#616d79] text-[12px] text-center whitespace-nowrap">
        <p className="leading-[20px] whitespace-pre">{`Privacy Policy  `}</p>
      </div>
    </div>
  );
}

function Content5() {
  return (
    <div className="content-stretch flex gap-[4px] h-[32px] items-center justify-center overflow-clip relative shrink-0" data-name="content">
      <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[#616d79] text-[12px] text-center whitespace-nowrap">
        <p className="leading-[20px]">Term of Service</p>
      </div>
    </div>
  );
}

function Footer1() {
  return (
    <div className="bg-white h-[36px] relative shrink-0 w-full" data-name="footer">
      <div className="flex flex-row items-center justify-center overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex items-center justify-center px-[16px] py-[10px] relative size-full">
          <div className="content-stretch flex flex-col items-center justify-center px-[16px] relative rounded-[4px] shrink-0" data-name="Button">
            <Content4 />
          </div>
          <div className="overflow-clip relative shrink-0 size-[4px]" data-name="circle.fill">
            <div className="absolute inset-[16.34%_17.57%_18.81%_17.57%]" data-name="circle.fill">
              <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2.59403 2.59403">
                <path d={svgPaths.p18e1e600} fill="var(--fill-0, #616D79)" id="circle.fill" />
              </svg>
            </div>
          </div>
          <div className="content-stretch flex flex-col items-center justify-center px-[16px] relative rounded-[4px] shrink-0" data-name="Button">
            <Content5 />
          </div>
        </div>
      </div>
    </div>
  );
}

export default function ProfileDropdown() {
  return (
    <div className="bg-[#bfbfbf] content-stretch flex flex-col items-center overflow-clip relative rounded-[6px] shadow-[0px_2px_8px_0px_rgba(0,0,0,0.15)] size-full" data-name="Profile dropdown">
      <Header />
      <Content1 />
      <Footer />
      <Footer1 />
    </div>
  );
}