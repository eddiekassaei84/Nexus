import svgPaths from "./svg-hlglo4s4cc";

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

function Group2() {
  return <div className="grid-cols-[max-content] grid-rows-[max-content] inline-grid leading-[0] place-items-start shrink-0" />;
}

function Header() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="header">
      <TextButton />
      <p className="font-['Outfit:SemiBold',sans-serif] font-semibold leading-[44px] relative shrink-0 text-[#1d2939] text-[36px] whitespace-nowrap">Reset Your Password</p>
      <p className="font-['Outfit:Regular',sans-serif] font-normal h-[40px] leading-[20px] relative shrink-0 text-[#667085] text-[14px] w-[374px]">A verification code has been sent to your email. Please enter it in the field below.</p>
      <Group2 />
    </div>
  );
}

function Frame14() {
  return (
    <div className="content-stretch flex items-start relative shrink-0">
      <div className="flex flex-col font-['Actor:Regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#1b2736] text-[14px] whitespace-nowrap">
        <p className="leading-[1.2]">New password</p>
      </div>
    </div>
  );
}

function Frame7() {
  return (
    <div className="content-stretch flex items-start justify-end relative shrink-0">
      <div className="content-stretch flex gap-[4px] items-start relative shrink-0" data-name="Label Value">
        <Frame14 />
      </div>
    </div>
  );
}

function Frame12() {
  return (
    <div className="content-stretch flex flex-[1_0_0] items-center min-h-px min-w-px relative">
      <div className="content-stretch flex flex-[1_0_0] items-center min-h-px min-w-px relative" data-name="Entry">
        <p className="flex-[1_0_0] font-['Actor:Regular',sans-serif] leading-[1.2] min-h-px min-w-px not-italic overflow-hidden relative text-[#9ea3a9] text-[14px] text-ellipsis whitespace-nowrap">&nbsp;</p>
      </div>
    </div>
  );
}

function Group() {
  return (
    <div className="absolute inset-[21.88%_9.37%_21.87%_9.38%]">
      <div className="absolute inset-[-3.7%_-2.87%]">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20.6205 14.5">
          <g id="Group 117">
            <path d={svgPaths.p2c76ad00} id="Vector 127" stroke="var(--stroke-0, #616D79)" />
            <circle cx="10.3102" cy="7.25001" id="Ellipse 38" r="3.75" stroke="var(--stroke-0, #616D79)" />
          </g>
        </svg>
      </div>
    </div>
  );
}

function Frame2() {
  return (
    <div className="bg-white flex-[1_0_0] h-[40px] min-h-[40px] min-w-px relative rounded-[4px]">
      <div aria-hidden="true" className="absolute border border-[#9ea2a8] border-solid inset-0 pointer-events-none rounded-[4px]" />
      <div className="flex flex-row items-center justify-end min-h-[inherit] size-full">
        <div className="content-stretch flex gap-[12px] items-center justify-end min-h-[inherit] pb-[11px] pt-[10px] px-[12px] relative size-full">
          <Frame12 />
          <div className="overflow-clip relative shrink-0 size-[24px]" data-name="32px/app/eye">
            <Group />
          </div>
        </div>
      </div>
    </div>
  );
}

function Frame4() {
  return (
    <div className="content-stretch flex flex-[1_0_0] gap-[4px] h-[40px] items-center min-h-px min-w-px relative">
      <Frame2 />
    </div>
  );
}

function Frame11() {
  return (
    <div className="content-stretch flex h-[40px] items-center relative shrink-0 w-full">
      <Frame4 />
    </div>
  );
}

function Frame15() {
  return (
    <div className="content-stretch flex items-start relative shrink-0">
      <div className="flex flex-col font-['Open_Sans:Regular',sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#5b6570] text-[12px] whitespace-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
        <p className="leading-[13px]">&nbsp;</p>
      </div>
    </div>
  );
}

function Frame8() {
  return (
    <div className="content-stretch flex items-start justify-end relative shrink-0">
      <div className="content-stretch flex items-start relative shrink-0" data-name="Helper Value">
        <Frame15 />
      </div>
    </div>
  );
}

function Frame5() {
  return (
    <div className="content-stretch flex flex-col gap-[4px] items-start justify-center relative shrink-0 w-full">
      <Frame11 />
      <Frame8 />
    </div>
  );
}

function InputSelect() {
  return (
    <div className="content-stretch flex flex-col gap-[4px] items-start relative shrink-0 w-full" data-name="Input-Select">
      <Frame7 />
      <Frame5 />
    </div>
  );
}

function Frame16() {
  return (
    <div className="content-stretch flex items-start relative shrink-0">
      <div className="flex flex-col font-['Actor:Regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#1b2736] text-[14px] whitespace-nowrap">
        <p className="leading-[1.2]">Confirm password</p>
      </div>
    </div>
  );
}

function Frame9() {
  return (
    <div className="content-stretch flex items-start justify-end relative shrink-0">
      <div className="content-stretch flex gap-[4px] items-start relative shrink-0" data-name="Label Value">
        <Frame16 />
      </div>
    </div>
  );
}

function Frame13() {
  return (
    <div className="content-stretch flex flex-[1_0_0] items-center min-h-px min-w-px relative">
      <div className="content-stretch flex flex-[1_0_0] items-center min-h-px min-w-px relative" data-name="Entry">
        <p className="flex-[1_0_0] font-['Actor:Regular',sans-serif] leading-[1.2] min-h-px min-w-px not-italic overflow-hidden relative text-[#9ea3a9] text-[14px] text-ellipsis whitespace-nowrap">&nbsp;</p>
      </div>
    </div>
  );
}

function Group1() {
  return (
    <div className="absolute inset-[21.88%_9.37%_21.87%_9.38%]">
      <div className="absolute inset-[-3.7%_-2.87%]">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20.6205 14.5">
          <g id="Group 117">
            <path d={svgPaths.p2c76ad00} id="Vector 127" stroke="var(--stroke-0, #616D79)" />
            <circle cx="10.3102" cy="7.25001" id="Ellipse 38" r="3.75" stroke="var(--stroke-0, #616D79)" />
          </g>
        </svg>
      </div>
    </div>
  );
}

function Frame3() {
  return (
    <div className="bg-white h-[40px] min-h-[40px] relative rounded-[4px] shrink-0 w-full">
      <div aria-hidden="true" className="absolute border border-[#9ea2a8] border-solid inset-0 pointer-events-none rounded-[4px]" />
      <div className="flex flex-row items-center justify-end min-h-[inherit] size-full">
        <div className="content-stretch flex gap-[12px] items-center justify-end min-h-[inherit] pb-[11px] pt-[10px] px-[12px] relative size-full">
          <Frame13 />
          <div className="overflow-clip relative shrink-0 size-[24px]" data-name="32px/app/eye">
            <Group1 />
          </div>
        </div>
      </div>
    </div>
  );
}

function Frame17() {
  return (
    <div className="content-stretch flex items-start relative shrink-0">
      <div className="flex flex-col font-['Open_Sans:Regular',sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#5b6570] text-[12px] whitespace-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
        <p className="leading-[13px]">&nbsp;</p>
      </div>
    </div>
  );
}

function Frame10() {
  return (
    <div className="content-stretch flex items-start justify-end relative shrink-0">
      <div className="content-stretch flex items-start relative shrink-0" data-name="Helper Value">
        <Frame17 />
      </div>
    </div>
  );
}

function Frame6() {
  return (
    <div className="content-stretch flex flex-col gap-[4px] items-start justify-center relative shrink-0 w-full">
      <Frame3 />
      <Frame10 />
    </div>
  );
}

function InputSelect1() {
  return (
    <div className="content-stretch flex flex-col gap-[4px] items-start relative shrink-0 w-full" data-name="Input-Select">
      <Frame9 />
      <Frame6 />
    </div>
  );
}

function InputCopy() {
  return (
    <div className="content-stretch flex flex-col gap-[4px] items-center pb-[12px] pt-[21px] relative shrink-0 w-[380px]" data-name="Input Copy">
      <InputSelect />
      <InputSelect1 />
    </div>
  );
}

function RadioButton1() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="Radio Button">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="Radio Button">
          <circle cx="8" cy="8" fill="var(--fill-0, white)" id="Plate" r="7.5" stroke="var(--stroke-0, #D9D9D9)" />
        </g>
      </svg>
    </div>
  );
}

function RadioButton() {
  return (
    <div className="content-stretch flex gap-[8px] items-center relative shrink-0" data-name="Radio Button">
      <RadioButton1 />
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[20px] not-italic relative shrink-0 text-[#262626] text-[14px] whitespace-nowrap">Minimum of 10 Charactors</p>
    </div>
  );
}

function RadioButton3() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="Radio Button">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="Radio Button">
          <circle cx="8" cy="8" fill="var(--fill-0, white)" id="Plate" r="7.5" stroke="var(--stroke-0, #D9D9D9)" />
        </g>
      </svg>
    </div>
  );
}

function RadioButton2() {
  return (
    <div className="content-stretch flex gap-[8px] items-center relative shrink-0" data-name="Radio Button">
      <RadioButton3 />
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[20px] not-italic relative shrink-0 text-[#262626] text-[14px] whitespace-nowrap">At least one uppercase letter</p>
    </div>
  );
}

function RadioButton5() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="Radio Button">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="Radio Button">
          <circle cx="8" cy="8" fill="var(--fill-0, white)" id="Plate" r="7.5" stroke="var(--stroke-0, #D9D9D9)" />
        </g>
      </svg>
    </div>
  );
}

function RadioButton4() {
  return (
    <div className="content-stretch flex gap-[8px] items-center relative shrink-0" data-name="Radio Button">
      <RadioButton5 />
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[20px] not-italic relative shrink-0 text-[#262626] text-[14px] whitespace-nowrap">{`At least one number `}</p>
    </div>
  );
}

function RadioButton7() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="Radio Button">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="Radio Button">
          <circle cx="8" cy="8" fill="var(--fill-0, white)" id="Plate" r="7.5" stroke="var(--stroke-0, #D9D9D9)" />
        </g>
      </svg>
    </div>
  );
}

function RadioButton6() {
  return (
    <div className="content-stretch flex gap-[8px] items-center relative shrink-0" data-name="Radio Button">
      <RadioButton7 />
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[20px] not-italic relative shrink-0 text-[#262626] text-[14px] whitespace-nowrap">At least one symbol</p>
    </div>
  );
}

function PasswordRequirements() {
  return (
    <div className="content-stretch flex flex-col gap-[12px] items-start relative shrink-0" data-name="password requirements">
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[20px] not-italic relative shrink-0 text-[#262626] text-[14px] whitespace-nowrap">A password must include:</p>
      <RadioButton />
      <RadioButton2 />
      <RadioButton4 />
      <RadioButton6 />
    </div>
  );
}

function Frame1() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0">
      <InputCopy />
      <PasswordRequirements />
    </div>
  );
}

function Content() {
  return (
    <div className="content-stretch flex h-[48px] items-center justify-center overflow-clip relative shrink-0 w-full" data-name="content">
      <div className="flex flex-col font-['Inter:Semi_Bold',sans-serif] font-semibold justify-center leading-[0] not-italic relative shrink-0 text-[16px] text-center text-white whitespace-nowrap">
        <p className="leading-[24px] whitespace-pre">{`Reset  password`}</p>
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
    <div className="content-stretch flex flex-col gap-[24px] items-start relative shrink-0" data-name="form">
      <Frame1 />
      <Frame />
    </div>
  );
}

export default function Resetpassword() {
  return (
    <div className="content-stretch flex flex-col gap-[24px] items-center overflow-clip py-[48px] relative rounded-tl-[24px] rounded-tr-[24px] size-full" data-name="resetpassword">
      <Header />
      <Form />
    </div>
  );
}