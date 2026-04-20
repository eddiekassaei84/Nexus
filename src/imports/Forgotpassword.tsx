import svgPaths from "./svg-9va17rr6i4";

function TextButton() {
  return (
    <div className="content-stretch flex gap-[4px] items-center relative shrink-0" data-name="Text Button">
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

function Group() {
  return <div className="grid-cols-[max-content] grid-rows-[max-content] inline-grid leading-[0] place-items-start shrink-0" />;
}

function Header() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="header">
      <TextButton />
      <p className="font-['Zen_Kaku_Gothic_Antique:Medium',sans-serif] leading-[44px] not-italic relative shrink-0 text-[25px] text-black whitespace-nowrap">Forgot Your Password?</p>
      <p className="font-['Outfit:Regular',sans-serif] font-normal h-[40px] leading-[20px] relative shrink-0 text-[#667085] text-[14px] w-[374px]">Enter the email address linked to your account, and we’ll send you a link to reset your password.</p>
      <Group />
    </div>
  );
}

function Content() {
  return (
    <div className="content-stretch flex flex-[1_0_0] gap-[8px] items-center min-h-px min-w-px relative" data-name="Content">
      <p className="flex-[1_0_0] font-['Outfit:Regular',sans-serif] font-normal leading-[20px] min-h-px min-w-px relative text-[#98a2b3] text-[14px]">info@gmail.com</p>
    </div>
  );
}

function Input() {
  return (
    <div className="bg-white h-[44px] relative rounded-[8px] shrink-0 w-full" data-name="Input">
      <div className="flex flex-row items-center overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex gap-[8px] items-center px-[16px] py-[10px] relative size-full">
          <Content />
        </div>
      </div>
      <div aria-hidden="true" className="absolute border border-[#d0d5dd] border-solid inset-0 pointer-events-none rounded-[8px] shadow-[0px_1px_2px_0px_rgba(16,24,40,0.05)]" />
    </div>
  );
}

function InputWithLabel() {
  return (
    <div className="content-stretch flex flex-col gap-[6px] items-start relative shrink-0 w-full" data-name="Input with label">
      <p className="font-['Outfit:Medium',sans-serif] font-medium leading-[20px] relative shrink-0 text-[#344054] text-[14px] whitespace-nowrap">Email</p>
      <Input />
    </div>
  );
}

function InputCopy() {
  return (
    <div className="content-stretch flex flex-col items-center pb-[12px] pt-[21px] relative shrink-0 w-[380px]" data-name="Input Copy">
      <div className="content-stretch flex flex-col gap-[6px] items-start relative shrink-0 w-full" data-name="_Input field base">
        <InputWithLabel />
      </div>
    </div>
  );
}

function Frame() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0">
      <InputCopy />
    </div>
  );
}

function Content1() {
  return (
    <div className="content-stretch flex h-[48px] items-center justify-center overflow-clip relative shrink-0 w-full" data-name="content">
      <div className="flex flex-col font-['Inter:Semi_Bold',sans-serif] font-semibold justify-center leading-[0] not-italic relative shrink-0 text-[16px] text-center text-white whitespace-nowrap">
        <p className="leading-[24px]">Send Reset Link</p>
      </div>
    </div>
  );
}

function Button() {
  return (
    <div className="bg-[#ff4d00] content-stretch flex flex-col items-center justify-center px-[16px] relative rounded-[4px] shrink-0 w-[380px]" data-name="Button">
      <Content1 />
    </div>
  );
}

function Frame1() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0">
      <Button />
    </div>
  );
}

function Form() {
  return (
    <div className="content-stretch flex flex-col gap-[24px] items-start relative shrink-0" data-name="form">
      <Frame />
      <Frame1 />
    </div>
  );
}

export default function Forgotpassword() {
  return (
    <div className="content-stretch flex flex-col gap-[24px] items-center overflow-clip py-[48px] relative rounded-tl-[24px] rounded-tr-[24px] size-full" data-name="forgotpassword">
      <Header />
      <Form />
    </div>
  );
}