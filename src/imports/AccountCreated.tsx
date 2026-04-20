import svgPaths from "./svg-lzmuliejif";
import imgAvatar from "figma:asset/6855565d8e7de372c9135a9fe9259b83bdce1ccb.png";

function Avatar() {
  return (
    <div className="relative rounded-[200px] shrink-0 size-[40px]" data-name="Avatar">
      <div className="absolute inset-0 overflow-hidden pointer-events-none rounded-[200px]">
        <img alt="" className="absolute h-full left-[-18.34%] max-w-none top-[1.24%] w-[568.75%]" src={imgAvatar} />
      </div>
    </div>
  );
}

function Content() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col items-start leading-[20px] min-h-px min-w-px relative text-[14px]" data-name="Content">
      <p className="font-['Outfit:Medium',sans-serif] font-medium relative shrink-0 text-[#1d2939] w-full">Inertia Systems</p>
      <p className="font-['Outfit:Regular',sans-serif] font-normal relative shrink-0 text-[#667085] w-full">eddie.kassaei@projectinertia.com</p>
    </div>
  );
}

function TableCell() {
  return (
    <div className="h-[66px] relative shrink-0 w-full" data-name="Table cell">
      <div aria-hidden="true" className="absolute border-[#f2f4f7] border-b border-solid inset-0 pointer-events-none" />
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex gap-[12px] items-center pr-[24px] py-[8px] relative size-full">
          <Avatar />
          <Content />
        </div>
      </div>
    </div>
  );
}

function Header() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="header">
      <p className="font-['Zen_Kaku_Gothic_Antique:Medium',sans-serif] leading-[44px] not-italic relative shrink-0 text-[25px] text-black w-[374px]">Account created</p>
      <TableCell />
    </div>
  );
}

function RadioButton() {
  return (
    <div className="content-stretch flex gap-[8px] items-center relative shrink-0" data-name="Radio Button">
      <div className="relative shrink-0 size-[16px]" data-name="Subtract">
        <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
          <path d={svgPaths.pb442b00} fill="var(--fill-0, #00AC2B)" id="Subtract" />
        </svg>
      </div>
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[20px] not-italic relative shrink-0 text-[#262626] text-[14px] whitespace-nowrap">Your account has been successfully created.</p>
    </div>
  );
}

function PasswordRequirements() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-[380px]" data-name="password requirements">
      <RadioButton />
    </div>
  );
}

function InputCopy() {
  return (
    <div className="content-stretch flex flex-col items-center pb-[12px] pt-[21px] relative shrink-0 w-[380px]" data-name="Input Copy">
      <PasswordRequirements />
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
        <p className="leading-[24px]">Redirecting you now ... (10s)</p>
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

export default function AccountCreated() {
  return (
    <div className="content-stretch flex flex-col gap-[16px] items-center overflow-clip pt-[48px] relative rounded-tl-[24px] rounded-tr-[24px] size-full" data-name="Account Created">
      <Header />
      <Form />
      <div className="absolute font-['Zen_Kaku_Gothic_Antique:Regular',sans-serif] inset-[94.28%_2.99%_3.24%_4.53%] leading-[0] not-italic text-[#212121] text-[0px] text-[11.945px] text-center">
        <p className="leading-[normal] mb-0">&nbsp;</p>
        <p className="font-['Inter:Regular',sans-serif] font-normal leading-[15.2px] text-[#404040]">©2025 Inertia Systems, Inc. All Rights Reserved</p>
      </div>
    </div>
  );
}