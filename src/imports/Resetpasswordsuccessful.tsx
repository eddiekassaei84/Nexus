import svgPaths from "./svg-p36ua2b3vu";

function TextButton() {
  return (
    <div className="col-1 content-stretch flex gap-[4px] items-center ml-0 mt-0 relative row-1" data-name="Text Button">
      <div className="relative shrink-0 size-[20px]" data-name="Arrow-left">
        <div className="absolute inset-[23.96%_40.1%_23.96%_33.85%]" data-name="Icon">
          <div className="absolute inset-[-7.2%_-14.4%]">
            <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 6.70833 11.9167">
              <path d={svgPaths.p366e9b80} id="Icon" stroke="var(--stroke-0, #344054)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
            </svg>
          </div>
        </div>
      </div>
      <p className="font-['Outfit:Regular',sans-serif] font-normal leading-[20px] relative shrink-0 text-[#98a2b3] text-[14px] whitespace-nowrap">{`Back `}</p>
    </div>
  );
}

function Group1() {
  return (
    <div className="grid-cols-[max-content] grid-rows-[max-content] inline-grid leading-[0] place-items-start relative shrink-0">
      <TextButton />
      <p className="col-1 font-['Outfit:SemiBold',sans-serif] font-semibold leading-[44px] ml-0 mt-[20px] relative row-1 text-[#1d2939] text-[36px] whitespace-nowrap">{`Password Reset `}</p>
    </div>
  );
}

function Group() {
  return <div className="grid-cols-[max-content] grid-rows-[max-content] inline-grid leading-[0] place-items-start shrink-0" />;
}

function Header() {
  return (
    <div className="content-stretch flex flex-col gap-[24px] items-start relative shrink-0" data-name="header">
      <Group1 />
      <p className="font-['Outfit:Regular',sans-serif] font-normal h-[40px] leading-[20px] relative shrink-0 text-[#667085] text-[14px] w-[374px]">users@email.com</p>
      <p className="font-['Outfit:Regular',sans-serif] font-normal h-[40px] leading-[20px] relative shrink-0 text-[#667085] text-[14px] w-[374px]">Your password has been updated. You can now sign in using your new password.</p>
      <Group />
    </div>
  );
}

function Content() {
  return (
    <div className="content-stretch flex h-[48px] items-center justify-center overflow-clip relative shrink-0 w-full" data-name="content">
      <div className="flex flex-col font-['Inter:Semi_Bold',sans-serif] font-semibold justify-center leading-[0] not-italic relative shrink-0 text-[16px] text-center text-white whitespace-nowrap">
        <p className="leading-[24px]">Continue to login</p>
      </div>
    </div>
  );
}

function Button() {
  return (
    <div className="bg-[#ff4d00] content-stretch flex flex-col items-center justify-center px-[16px] relative rounded-[4px] shrink-0 w-[380px]" data-name="Button">
      <Content />
    </div>
  );
}

function Frame() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0">
      <Button />
    </div>
  );
}

function Form() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="form">
      <Frame />
    </div>
  );
}

export default function Resetpasswordsuccessful() {
  return (
    <div className="content-stretch flex flex-col gap-[24px] items-center overflow-clip py-[48px] relative rounded-tl-[24px] rounded-tr-[24px] size-full" data-name="resetpasswordsuccessful">
      <Header />
      <Form />
    </div>
  );
}