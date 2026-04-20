import svgPaths from "./svg-trm6u3e3ta";

function Group() {
  return (
    <div className="absolute contents inset-0" data-name="Group">
      <div className="absolute bg-[#fafafa] inset-0 rounded-tl-[24px] rounded-tr-[24px]" data-name="main-div" />
    </div>
  );
}

function Header() {
  return (
    <div className="absolute content-stretch flex flex-col items-start left-[40px] not-italic text-black top-[39.5px]" data-name="header">
      <p className="font-['Zen_Kaku_Gothic_Antique:Regular',sans-serif] leading-[22.53px] relative shrink-0 text-[12.8px] w-[97px]">WELCOME BACK</p>
      <p className="font-['Zen_Kaku_Gothic_Antique:Medium',sans-serif] leading-[44px] relative shrink-0 text-[25px] whitespace-nowrap">Log In to your Account</p>
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

function Content1() {
  return (
    <div className="content-stretch flex flex-[1_0_0] gap-[8px] items-center min-h-px min-w-px relative" data-name="Content">
      <p className="flex-[1_0_0] font-['Outfit:Regular',sans-serif] font-normal leading-[20px] min-h-px min-w-px relative text-[#9ea3a9] text-[14px]">password</p>
    </div>
  );
}

function Input1() {
  return (
    <div className="bg-white h-[44px] relative rounded-[8px] shrink-0 w-full" data-name="Input">
      <div className="flex flex-row items-center overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex gap-[8px] items-center px-[16px] py-[10px] relative size-full">
          <Content1 />
        </div>
      </div>
      <div aria-hidden="true" className="absolute border border-[#d0d5dd] border-solid inset-0 pointer-events-none rounded-[8px] shadow-[0px_1px_2px_0px_rgba(16,24,40,0.05)]" />
    </div>
  );
}

function InputWithLabel1() {
  return (
    <div className="content-stretch flex flex-col gap-[6px] items-start relative shrink-0 w-full" data-name="Input with label">
      <p className="font-['Outfit:Medium',sans-serif] font-medium leading-[20px] relative shrink-0 text-[#1b2736] text-[14px] whitespace-nowrap">Password</p>
      <Input1 />
    </div>
  );
}

function InputCopy() {
  return (
    <div className="content-stretch flex flex-col gap-[16px] items-center pb-[12px] pt-[21px] relative shrink-0 w-[380px]" data-name="Input Copy">
      <div className="content-stretch flex flex-col gap-[6px] items-start relative shrink-0 w-full" data-name="_Input field base">
        <InputWithLabel />
      </div>
      <div className="content-stretch flex flex-col gap-[6px] items-start relative shrink-0 w-full" data-name="_Input field base">
        <InputWithLabel1 />
      </div>
    </div>
  );
}

function Frame1() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0">
      <InputCopy />
    </div>
  );
}

function BgSwitcher() {
  return (
    <div className="absolute h-[20px] left-0 top-0 w-[40px]" data-name="BG-Switcher">
      <div className="absolute bg-[#f2f2f2] border-[#e5e5e5] border-[0.5px] border-solid inset-0 rounded-[36.5px]" data-name="Default" />
    </div>
  );
}

function KnobIcon() {
  return (
    <div className="absolute left-0 size-[20px] top-0" data-name="Knob-Icon">
      <div className="absolute bg-white inset-[10%] rounded-[12px] shadow-[1px_1px_2px_-1px_rgba(51,51,51,0.3)]" data-name="Knob-20" />
    </div>
  );
}

function Switcher() {
  return (
    <div className="h-[20px] overflow-clip relative shrink-0 w-[40px]" data-name="Switcher">
      <BgSwitcher />
      <KnobIcon />
    </div>
  );
}

function SwitcherItemLeft() {
  return (
    <div className="content-stretch flex flex-[1_0_0] gap-[8px] items-center min-h-px min-w-px relative" data-name="Switcher-Item-Left">
      <Switcher />
      <p className="flex-[1_0_0] font-['SF_Pro_Display:Regular',sans-serif] leading-[20px] min-h-px min-w-px not-italic relative text-[#1a1a1a] text-[12px] tracking-[0.3px]">Remember me</p>
    </div>
  );
}

function Frame4() {
  return (
    <div className="content-stretch flex gap-[16px] h-[24px] items-center justify-end relative shrink-0 w-full">
      <SwitcherItemLeft />
      <p className="flex-[1_0_0] font-['SF_Pro_Display:Regular',sans-serif] leading-[20px] min-h-px min-w-px not-italic relative text-[#ff4d00] text-[12px] text-right tracking-[0.3px]">Forgot username/password?</p>
    </div>
  );
}

function Content2() {
  return (
    <div className="content-stretch flex h-[48px] items-center justify-center overflow-clip relative shrink-0 w-full" data-name="content">
      <div className="flex flex-col font-['Inter:Semi_Bold',sans-serif] font-semibold justify-center leading-[0] not-italic relative shrink-0 text-[16px] text-center text-white whitespace-nowrap">
        <p className="leading-[24px]">LOGIN</p>
      </div>
    </div>
  );
}

function Button() {
  return (
    <div className="bg-[#ff4d00] content-stretch flex flex-col items-center justify-center px-[16px] relative rounded-[4px] shrink-0 w-[380px]" data-name="Button">
      <Content2 />
    </div>
  );
}

function DividerLabel() {
  return (
    <div className="grid-cols-[max-content] grid-rows-[max-content] inline-grid leading-[0] place-items-start relative shrink-0" data-name="divider-label">
      <div className="col-1 h-[2.161px] ml-0 mt-[10px] relative row-1 w-[380px]" data-name="line-divider">
        <div className="absolute inset-[26.87%_-0.13%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 381 1">
            <path d="M0.5 0.5H380.5" id="line-divider" stroke="var(--stroke-0, #E0E0E0)" strokeLinecap="square" />
          </svg>
        </div>
      </div>
      <div className="bg-[#fafafa] col-1 h-[22.155px] ml-[166px] mt-0 row-1 w-[48px]" data-name="divider bg" />
      <p className="col-1 font-['Zen_Kaku_Gothic_Antique:Bold',sans-serif] h-[20.534px] leading-[normal] ml-[183px] mt-[0.81px] not-italic relative row-1 text-[#212121] text-[12.8px] text-center w-[15px]">Or</p>
    </div>
  );
}

function Frame2() {
  return (
    <div className="content-stretch flex flex-col gap-[12px] items-start relative shrink-0">
      <Button />
      <DividerLabel />
    </div>
  );
}

function Microsoft() {
  return (
    <div className="absolute contents inset-[15.63%]" data-name="microsoft">
      <div className="absolute bg-[#feba08] inset-[53.13%_15.63%_15.63%_53.13%]" data-name="yeloow" />
      <div className="absolute bg-[#05a6f0] inset-[53.13%_53.13%_15.63%_15.63%]" data-name="blue" />
      <div className="absolute bg-[#80bc06] inset-[15.63%_15.63%_53.13%_53.13%]" data-name="green" />
      <div className="absolute bg-[#f25325] inset-[15.63%_53.13%_53.13%_15.63%]" data-name="red" />
    </div>
  );
}

function SocialLogin() {
  return (
    <div className="bg-[#f2f4f7] h-[48px] relative rounded-[8px] shrink-0 w-full" data-name="Social Login">
      <div className="flex flex-row items-center justify-center size-full">
        <div className="content-stretch flex gap-[12px] items-center justify-center px-[36px] py-[10px] relative size-full">
          <div className="overflow-clip relative shrink-0 size-[32px]" data-name="microsoft">
            <Microsoft />
          </div>
          <p className="font-['Outfit:Regular',sans-serif] font-normal leading-[20px] relative shrink-0 text-[#344054] text-[14px] whitespace-nowrap">Login with Microsoft</p>
        </div>
      </div>
    </div>
  );
}

function SocialLogin1() {
  return (
    <div className="bg-[#f2f4f7] h-[48px] relative rounded-[8px] shrink-0 w-full" data-name="Social Login">
      <div className="flex flex-row items-center justify-center size-full">
        <div className="content-stretch flex gap-[12px] items-center justify-center px-[36px] py-[10px] relative size-full">
          <div className="overflow-clip relative shrink-0 size-[20px]" data-name="google">
            <div className="absolute inset-[42.03%_6.25%_16.85%_50.9%]" data-name="vector">
              <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 8.57142 8.225">
                <path d={svgPaths.p2fce9fc0} fill="var(--fill-0, #4285F4)" id="vector" />
              </svg>
            </div>
            <div className="absolute inset-[58.65%_19.54%_6.25%_11.01%]" data-name="vector">
              <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 13.8888 7.01951">
                <path d={svgPaths.p2c32c00} fill="var(--fill-0, #34A853)" id="vector" />
              </svg>
            </div>
            <div className="absolute inset-[30.15%_74.5%_30.36%_6.25%]" data-name="vector">
              <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 3.84916 7.89812">
                <path d={svgPaths.p2b9e5c04} fill="var(--fill-0, #FBBC05)" id="vector" />
              </svg>
            </div>
            <div className="absolute inset-[6.25%_19.24%_58.65%_11.01%]" data-name="vector">
              <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 13.9484 7.01943">
                <path d={svgPaths.p33fe0f80} fill="var(--fill-0, #EB4335)" id="vector" />
              </svg>
            </div>
          </div>
          <p className="font-['Outfit:Regular',sans-serif] font-normal leading-[20px] relative shrink-0 text-[#344054] text-[14px] whitespace-nowrap">Login with Google</p>
        </div>
      </div>
    </div>
  );
}

function Frame3() {
  return (
    <div className="content-stretch flex flex-col gap-[12px] items-start relative shrink-0 w-full">
      <SocialLogin />
      <SocialLogin1 />
    </div>
  );
}

function Form() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[24px] items-start left-[39.5px] top-[123.5px]" data-name="form">
      <Frame1 />
      <Frame4 />
      <Frame2 />
      <Frame3 />
    </div>
  );
}

function DivSection() {
  return (
    <div className="h-[830px] overflow-clip relative shrink-0 w-[460px]" data-name="div-section">
      <Group />
      <Header />
      <Form />
      <p className="absolute font-['Zen_Kaku_Gothic_Antique:Regular',sans-serif] inset-[83.79%_33.8%_13.74%_34.02%] leading-[0] not-italic text-[#212121] text-[12.8px] text-center">
        <span className="leading-[normal]">New User?</span>
        <span className="font-['Zen_Kaku_Gothic_Antique:Bold',sans-serif] leading-[normal]">{` `}</span>
        <span className="[text-decoration-skip-ink:none] decoration-solid font-['Zen_Kaku_Gothic_Antique:Bold',sans-serif] leading-[normal] text-[#ff4d00] underline">SIGN UP HERE</span>
      </p>
      <div className="absolute font-['Inter:Regular',sans-serif] font-['Zen_Kaku_Gothic_Antique:Regular',sans-serif] font-normal inset-[94.28%_2.99%_3.24%_4.53%] leading-[0] not-italic text-[#212121] text-[0px] text-[11.945px] text-center">
        <p className="mb-0">
          <span className="leading-[15.2px] text-[#404040]">By using Inertia, you agree to our</span>
          <span className="leading-[15.2px] text-[#ff6425]">{` Terms and Conditions`}</span>
          <span className="leading-[15.2px] text-[#404040]">{` and`}</span>
          <span className="leading-[15.2px] text-[#ff6425]">{` Privacy Policy`}</span>
        </p>
        <p className="leading-[15.2px] text-[#404040]">©2025 Inertia Systems, Inc. All Rights Reserved</p>
      </div>
    </div>
  );
}

function Frame() {
  return (
    <div className="h-[96px] relative shrink-0 w-[433.091px]" data-name="Frame">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 433.091 96">
        <g id="Frame">
          <g id="Vector">
            <path d={svgPaths.p54c1200} fill="#FF4D00" />
            <path d={svgPaths.p347fdac0} fill="#FF4D00" />
            <path d={svgPaths.p18451000} fill="#FF4D00" />
            <path d={svgPaths.p285d8f00} fill="#FF4D00" />
            <path d={svgPaths.p3ca87b80} fill="#FF4D00" />
            <path d={svgPaths.p3f267c00} fill="#FF4D00" />
            <path d={svgPaths.pc19cf80} fill="#FF4D00" />
            <path d={svgPaths.p1d0ce740} fill="#FF4D00" />
            <path d={svgPaths.p5bf9000} fill="#FF4D00" />
            <path d={svgPaths.p304ba000} fill="var(--fill-0, #A7A8A9)" />
            <path d={svgPaths.p2456500} fill="var(--fill-0, #A7A8A9)" />
            <path d={svgPaths.p8d0e580} fill="var(--fill-0, #A7A8A9)" />
            <path d={svgPaths.pd510100} fill="var(--fill-0, #A7A8A9)" />
            <path d={svgPaths.p33bc8180} fill="var(--fill-0, #A7A8A9)" />
          </g>
        </g>
      </svg>
    </div>
  );
}

function InertiaLogo() {
  return (
    <div className="absolute bg-[rgba(0,0,0,0)] content-stretch flex items-start left-[126.96px] overflow-clip top-[94px]" data-name="Inertia Logo">
      <Frame />
    </div>
  );
}

export default function Login() {
  return (
    <div className="content-stretch flex flex-col gap-[10px] items-center justify-end relative size-full" data-name="login">
      <DivSection />
      <InertiaLogo />
    </div>
  );
}