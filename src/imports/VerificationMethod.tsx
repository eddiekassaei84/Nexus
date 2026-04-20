import svgPaths from "./svg-ucnr48euq5";

function TextButton() {
  return <div className="content-stretch flex gap-[4px] h-[20px] items-center shrink-0 w-[31px]" data-name="Text Button" />;
}

function Group1() {
  return <div className="grid-cols-[max-content] grid-rows-[max-content] inline-grid leading-[0] place-items-start shrink-0" />;
}

function Header() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="header">
      <TextButton />
      <p className="font-['Outfit:SemiBold',sans-serif] font-semibold h-[44px] leading-[44px] relative shrink-0 text-[#1d2939] text-[36px] w-[323px]">Verification method</p>
      <p className="font-['Outfit:Regular',sans-serif] font-normal h-[40px] leading-[20px] relative shrink-0 text-[#667085] text-[14px] w-[374px] whitespace-pre-wrap">
        We sent a 6-digit verification code to your work email.
        <br aria-hidden="true" />
        {` Enter the code below to continue.`}
      </p>
      <Group1 />
    </div>
  );
}

function Group() {
  return (
    <div className="absolute inset-[20.83%_8.33%]">
      <div className="absolute inset-[-5.36%_-3.75%]">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 21.5 15.5">
          <g id="Group 104">
            <rect height="14" id="Rectangle 1001" rx="1" stroke="var(--stroke-0, #616D79)" strokeWidth="1.5" width="20" x="0.75" y="0.75" />
            <path d={svgPaths.p17dd0000} id="Vector 115" stroke="var(--stroke-0, #616D79)" strokeWidth="1.5" />
          </g>
        </svg>
      </div>
    </div>
  );
}

function Content() {
  return (
    <div className="bg-[#f2f3f4] h-[40px] relative rounded-[4px] shrink-0 w-full" data-name="content">
      <div className="flex flex-row items-center justify-center overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex gap-[4px] items-center justify-center px-[16px] relative size-full">
          <div className="overflow-clip relative shrink-0 size-[24px]" data-name="24px/app/mail">
            <Group />
          </div>
          <div className="flex flex-col font-['Outfit:Regular',sans-serif] font-normal h-[20px] justify-center leading-[0] relative shrink-0 text-[#616d79] text-[14px] text-center w-[68px]">
            <p className="leading-[20px]">Email code</p>
          </div>
        </div>
      </div>
      <div aria-hidden="true" className="absolute border border-[#c3c7cc] border-solid inset-0 pointer-events-none rounded-[4px]" />
    </div>
  );
}

function Button() {
  return (
    <div className="content-stretch flex flex-col items-center justify-center mb-[-0.665px] py-[2px] relative shrink-0 w-full" data-name="Button">
      <Content />
    </div>
  );
}

function VefificationCodeArea() {
  return (
    <div className="content-stretch flex flex-col items-start pb-[0.665px] relative shrink-0 w-full" data-name="Vefification code area">
      <Button />
      <p className="font-['Outfit:Regular',sans-serif] font-normal h-[20px] leading-[20px] relative shrink-0 text-[#1d2939] text-[14px] w-[221px]">Send a new code to your work email</p>
    </div>
  );
}

function Content1() {
  return (
    <div className="bg-[#f2f3f4] h-[40px] relative rounded-[4px] shrink-0 w-full" data-name="content">
      <div className="flex flex-row items-center justify-center overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex gap-[4px] items-center justify-center px-[16px] relative size-full">
          <div className="overflow-clip relative shrink-0 size-[24px]" data-name="shield">
            <div className="absolute inset-[8.33%_16.67%]" data-name="Vector">
              <div className="absolute inset-[-5%_-6.25%]">
                <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 18 22">
                  <path d={svgPaths.p15942c00} id="Vector" stroke="var(--stroke-0, #75808B)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
                </svg>
              </div>
            </div>
          </div>
          <div className="flex flex-col font-['Outfit:Regular',sans-serif] font-normal h-[20px] justify-center leading-[0] relative shrink-0 text-[#616d79] text-[14px] text-center w-[114px]">
            <p className="leading-[20px]">Authenticator app</p>
          </div>
        </div>
      </div>
      <div aria-hidden="true" className="absolute border border-[#c3c7cc] border-solid inset-0 pointer-events-none rounded-[4px]" />
    </div>
  );
}

function Button1() {
  return (
    <div className="content-stretch flex flex-col items-center justify-center mb-[-0.665px] py-[2px] relative shrink-0 w-full" data-name="Button">
      <Content1 />
    </div>
  );
}

function VefificationCodeArea1() {
  return (
    <div className="content-stretch flex flex-col items-start pb-[0.665px] relative shrink-0 w-full" data-name="Vefification code area">
      <Button1 />
      <p className="font-['Outfit:Regular',sans-serif] font-normal h-[20px] leading-[20px] relative shrink-0 text-[#1d2939] text-[14px] w-[289px]">Use your authenticator app to generate a code</p>
    </div>
  );
}

function Content2() {
  return (
    <div className="bg-[#f2f3f4] h-[40px] relative rounded-[4px] shrink-0 w-full" data-name="content">
      <div className="flex flex-row items-center justify-center overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex gap-[4px] items-center justify-center px-[16px] relative size-full">
          <div className="overflow-clip relative shrink-0 size-[24px]" data-name="smartphone">
            <div className="absolute inset-[8.33%_20.83%]" data-name="Vector">
              <div className="absolute inset-[-5%_-7.14%]">
                <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 22">
                  <path d={svgPaths.p2cd09580} id="Vector" stroke="var(--stroke-0, #75808B)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
                </svg>
              </div>
            </div>
            <div className="absolute bottom-1/4 left-1/2 right-[49.96%] top-3/4" data-name="Line">
              <div className="absolute inset-[-1px]">
                <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2.00999 2">
                  <path d="M1 1H1.00999" id="Line" stroke="var(--stroke-0, #75808B)" strokeLinecap="round" strokeWidth="2" />
                </svg>
              </div>
            </div>
          </div>
          <div className="flex flex-col font-['Outfit:Regular',sans-serif] font-normal h-[20px] justify-center leading-[0] relative shrink-0 text-[#616d79] text-[14px] text-center w-[134px]">
            <p className="leading-[20px]">SMS code (if enabled)</p>
          </div>
        </div>
      </div>
      <div aria-hidden="true" className="absolute border border-[#c3c7cc] border-solid inset-0 pointer-events-none rounded-[4px]" />
    </div>
  );
}

function Button2() {
  return (
    <div className="content-stretch flex flex-col items-center justify-center mb-[-0.665px] py-[2px] relative shrink-0 w-full" data-name="Button">
      <Content2 />
    </div>
  );
}

function VefificationCodeArea2() {
  return (
    <div className="content-stretch flex flex-col items-start pb-[0.665px] relative shrink-0 w-full" data-name="Vefification code area">
      <Button2 />
      <p className="font-['Outfit:Regular',sans-serif] font-normal h-[20px] leading-[20px] relative shrink-0 text-[#1d2939] text-[14px] w-[216px]">Send a text message to your phone</p>
    </div>
  );
}

function Content3() {
  return (
    <div className="bg-[#f2f3f4] h-[40px] relative rounded-[4px] shrink-0 w-full" data-name="content">
      <div className="flex flex-row items-center justify-center overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex gap-[4px] items-center justify-center px-[16px] relative size-full">
          <div className="overflow-clip relative shrink-0 size-[28px]" data-name="key.viewfinder">
            <div className="absolute inset-[17.72%_18.92%_20.1%_18.89%]" data-name="key.viewfinder">
              <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 17.4111 17.4111">
                <path d={svgPaths.p2a64bb00} fill="var(--fill-0, #616D79)" id="key.viewfinder" />
              </svg>
            </div>
          </div>
          <div className="flex flex-col font-['Outfit:Regular',sans-serif] font-normal h-[20px] justify-center leading-[0] relative shrink-0 text-[#616d79] text-[14px] text-center w-[75px]">
            <p className="leading-[20px]">Security key</p>
          </div>
        </div>
      </div>
      <div aria-hidden="true" className="absolute border border-[#c3c7cc] border-solid inset-0 pointer-events-none rounded-[4px]" />
    </div>
  );
}

function Button3() {
  return (
    <div className="content-stretch flex flex-col items-center justify-center mb-[-0.665px] py-[2px] relative shrink-0 w-full" data-name="Button">
      <Content3 />
    </div>
  );
}

function VefificationCodeArea3() {
  return (
    <div className="content-stretch flex flex-col items-start pb-[0.665px] relative shrink-0 w-full" data-name="Vefification code area">
      <Button3 />
      <p className="font-['Outfit:Regular',sans-serif] font-normal h-[20px] leading-[20px] relative shrink-0 text-[#1d2939] text-[14px] w-[174px]">Use a hardware security key</p>
    </div>
  );
}

function InputCopy() {
  return (
    <div className="content-stretch flex flex-col gap-[12px] items-center pb-[12px] pt-[21px] relative shrink-0 w-[380px]" data-name="Input Copy">
      <VefificationCodeArea />
      <VefificationCodeArea1 />
      <VefificationCodeArea2 />
      <VefificationCodeArea3 />
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

function Form() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="form">
      <Frame />
    </div>
  );
}

export default function VerificationMethod() {
  return (
    <div className="content-stretch flex flex-col gap-[24px] items-center overflow-clip py-[48px] relative rounded-tl-[24px] rounded-tr-[24px] size-full" data-name="Verification method">
      <Header />
      <Form />
    </div>
  );
}