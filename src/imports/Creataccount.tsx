import svgPaths from "./svg-fau8wkvc2e";
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
      <p className="font-['Outfit:Medium',sans-serif] font-medium relative shrink-0 text-[#1d2939] w-full">{`{Company Name}`}</p>
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
      <p className="font-['Zen_Kaku_Gothic_Antique:Medium',sans-serif] leading-[44px] not-italic relative shrink-0 text-[25px] text-black w-[374px]">Create your account</p>
      <TableCell />
    </div>
  );
}

function Content1() {
  return (
    <div className="content-stretch flex flex-[1_0_0] gap-[8px] items-center min-h-px min-w-px relative" data-name="Content">
      <p className="flex-[1_0_0] font-['Outfit:Regular',sans-serif] font-normal leading-[20px] min-h-px min-w-px relative text-[#98a2b3] text-[14px]">&nbsp;</p>
    </div>
  );
}

function Input() {
  return (
    <div className="bg-white h-[44px] relative rounded-[8px] shrink-0 w-full" data-name="Input">
      <div className="flex flex-row items-center overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex gap-[8px] items-center px-[16px] py-[10px] relative size-full">
          <Content1 />
          <div className="overflow-clip relative shrink-0 size-[16px]" data-name="chevron.down">
            <div className="absolute inset-[34.04%_22.22%_34.03%_22.19%]" data-name="chevron.down">
              <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 8.89453 5.1077">
                <path d={svgPaths.p239bdd00} fill="var(--fill-0, #9EA3A9)" id="chevron.down" />
              </svg>
            </div>
          </div>
        </div>
      </div>
      <div aria-hidden="true" className="absolute border border-[#d0d5dd] border-solid inset-0 pointer-events-none rounded-[8px] shadow-[0px_1px_2px_0px_rgba(16,24,40,0.05)]" />
    </div>
  );
}

function InputWithLabel() {
  return (
    <div className="content-stretch flex flex-col gap-[6px] items-start relative shrink-0 w-full" data-name="Input with label">
      <p className="font-['Outfit:Medium',sans-serif] font-medium leading-[0] relative shrink-0 text-[#344054] text-[14px] whitespace-nowrap">
        <span className="leading-[20px]">{`Office `}</span>
        <span className="leading-[20px] text-[#f5222d]">*</span>
      </p>
      <Input />
    </div>
  );
}

function InputFieldBase() {
  return (
    <div className="col-1 content-stretch flex flex-col gap-[6px] items-start ml-0 mt-0 relative row-1 w-[380px]" data-name="_Input field base">
      <InputWithLabel />
    </div>
  );
}

function Content2() {
  return (
    <div className="content-stretch flex flex-[1_0_0] gap-[8px] items-center min-h-px min-w-px relative" data-name="Content">
      <p className="flex-[1_0_0] font-['Outfit:Regular',sans-serif] font-normal leading-[20px] min-h-px min-w-px relative text-[#98a2b3] text-[14px]">&nbsp;</p>
    </div>
  );
}

function Input1() {
  return (
    <div className="bg-white h-[44px] relative rounded-[8px] shrink-0 w-full" data-name="Input">
      <div className="flex flex-row items-center overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex gap-[8px] items-center px-[16px] py-[10px] relative size-full">
          <Content2 />
        </div>
      </div>
      <div aria-hidden="true" className="absolute border border-[#d0d5dd] border-solid inset-0 pointer-events-none rounded-[8px] shadow-[0px_1px_2px_0px_rgba(16,24,40,0.05)]" />
    </div>
  );
}

function InputWithLabel1() {
  return (
    <div className="content-stretch flex flex-col gap-[6px] items-start relative shrink-0 w-full" data-name="Input with label">
      <p className="font-['Outfit:Medium',sans-serif] font-medium leading-[0] relative shrink-0 text-[#344054] text-[14px] whitespace-nowrap">
        <span className="leading-[20px]">{`First Name `}</span>
        <span className="leading-[20px] text-[#f5222d]">*</span>
      </p>
      <Input1 />
    </div>
  );
}

function InputFieldBase1() {
  return (
    <div className="col-1 content-stretch flex flex-col gap-[6px] items-start ml-0 mt-[82px] relative row-1 w-[380px]" data-name="_Input field base">
      <InputWithLabel1 />
    </div>
  );
}

function Content3() {
  return (
    <div className="content-stretch flex flex-[1_0_0] gap-[8px] items-center min-h-px min-w-px relative" data-name="Content">
      <p className="flex-[1_0_0] font-['Outfit:Regular',sans-serif] font-normal leading-[20px] min-h-px min-w-px relative text-[#98a2b3] text-[14px]">&nbsp;</p>
    </div>
  );
}

function Input2() {
  return (
    <div className="bg-white h-[44px] relative rounded-[8px] shrink-0 w-full" data-name="Input">
      <div className="flex flex-row items-center overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex gap-[8px] items-center px-[16px] py-[10px] relative size-full">
          <Content3 />
        </div>
      </div>
      <div aria-hidden="true" className="absolute border border-[#d0d5dd] border-solid inset-0 pointer-events-none rounded-[8px] shadow-[0px_1px_2px_0px_rgba(16,24,40,0.05)]" />
    </div>
  );
}

function InputWithLabel2() {
  return (
    <div className="content-stretch flex flex-col gap-[6px] items-start relative shrink-0 w-full" data-name="Input with label">
      <p className="font-['Outfit:Medium',sans-serif] font-medium leading-[20px] relative shrink-0 text-[#344054] text-[14px] whitespace-nowrap">Last Name</p>
      <Input2 />
    </div>
  );
}

function Content4() {
  return (
    <div className="content-stretch flex flex-[1_0_0] gap-[8px] items-center min-h-px min-w-px relative" data-name="Content">
      <p className="flex-[1_0_0] font-['Outfit:Regular',sans-serif] font-normal leading-[20px] min-h-px min-w-px relative text-[#98a2b3] text-[14px]">&nbsp;</p>
    </div>
  );
}

function Group() {
  return (
    <div className="absolute inset-[21.88%_9.37%_21.87%_9.38%]">
      <div className="absolute inset-[-4.44%_-3.45%]">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 17.3705 12.25">
          <g id="Group 117">
            <path d={svgPaths.p363ce600} id="Vector 127" stroke="var(--stroke-0, #616D79)" />
            <circle cx="8.68521" cy="6.12501" id="Ellipse 38" r="3.125" stroke="var(--stroke-0, #616D79)" />
          </g>
        </svg>
      </div>
    </div>
  );
}

function Component32PxAppEye() {
  return (
    <div className="overflow-clip relative shrink-0 size-[20px]" data-name="32px/app/eye">
      <Group />
    </div>
  );
}

function Input3() {
  return (
    <div className="bg-white h-[44px] relative rounded-[8px] shrink-0 w-full" data-name="Input">
      <div className="flex flex-row items-center overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex gap-[8px] items-center px-[16px] py-[10px] relative size-full">
          <Content4 />
          <Component32PxAppEye />
        </div>
      </div>
      <div aria-hidden="true" className="absolute border border-[#d0d5dd] border-solid inset-0 pointer-events-none rounded-[8px] shadow-[0px_1px_2px_0px_rgba(16,24,40,0.05)]" />
    </div>
  );
}

function InputWithLabel3() {
  return (
    <div className="content-stretch flex flex-col gap-[6px] items-start relative shrink-0 w-full" data-name="Input with label">
      <p className="font-['Outfit:Medium',sans-serif] font-medium leading-[0] relative shrink-0 text-[#344054] text-[14px] whitespace-nowrap">
        <span className="leading-[20px]">{`Password `}</span>
        <span className="leading-[20px] text-[#f5222d]">*</span>
      </p>
      <Input3 />
    </div>
  );
}

function InputFieldBase2() {
  return (
    <div className="col-1 content-stretch flex flex-col gap-[6px] items-start ml-0 mt-[246px] relative row-1 w-[380px]" data-name="_Input field base">
      <InputWithLabel3 />
    </div>
  );
}

function Group2() {
  return (
    <div className="grid-cols-[max-content] grid-rows-[max-content] inline-grid leading-[0] place-items-start relative shrink-0">
      <InputFieldBase />
      <InputFieldBase1 />
      <div className="col-1 content-stretch flex flex-col gap-[6px] items-start ml-0 mt-[164px] relative row-1 w-[380px]" data-name="_Input field base">
        <InputWithLabel2 />
      </div>
      <InputFieldBase2 />
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
    <div className="content-stretch flex flex-col gap-[12px] items-start justify-center relative shrink-0 w-full" data-name="password requirements">
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[20px] not-italic relative shrink-0 text-[#262626] text-[14px] whitespace-nowrap">A password must include:</p>
      <RadioButton />
      <RadioButton2 />
      <RadioButton4 />
      <RadioButton6 />
    </div>
  );
}

function InputCopy() {
  return (
    <div className="col-1 content-stretch flex flex-col gap-[12px] items-center ml-0 mt-0 py-[12px] relative row-1 w-[380px]" data-name="Input Copy">
      <Group2 />
      <PasswordRequirements />
    </div>
  );
}

function Group1() {
  return (
    <div className="grid-cols-[max-content] grid-rows-[max-content] inline-grid leading-[0] place-items-start relative shrink-0">
      <InputCopy />
    </div>
  );
}

function Hidden() {
  return (
    <div className="relative shrink-0 size-[18px]" data-name="_hidden">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 18 18">
        <g clipPath="url(#clip0_2121_701)" id="_hidden">
          <path d={svgPaths.p3370a680} fill="var(--fill-0, #5B6570)" id="Vector" />
        </g>
        <defs>
          <clipPath id="clip0_2121_701">
            <rect fill="white" height="18" width="18" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Padding() {
  return (
    <div className="content-stretch flex h-[39px] items-start px-[4px] py-[2px] relative rounded-[100px] shrink-0" data-name="Padding">
      <Hidden />
    </div>
  );
}

function Checkbox() {
  return (
    <div className="content-stretch flex flex-col h-[39px] items-center overflow-clip relative shrink-0" data-name="Checkbox/">
      <Padding />
    </div>
  );
}

function CheckboxCheckboxLabel() {
  return (
    <div className="content-stretch flex items-center relative shrink-0" data-name="Checkbox/Checkbox-Label">
      <Checkbox />
      <div className="content-stretch flex flex-col items-start px-[4px] relative shrink-0" data-name="Form/FormLabel">
        <div className="font-['Inter:Regular',sans-serif] font-normal leading-[0] not-italic relative shrink-0 text-[#404040] text-[14px] whitespace-nowrap whitespace-pre">
          <p className="mb-0">
            <span className="leading-[20px]">{`I agree to `}</span>
            <span className="leading-[20px] text-[#ff4d00]">Iner</span>
            <span className="leading-[20px] text-[#ff4d00]">tia Systems Terms and Conditions</span>
            <span className="leading-[20px]">{` and `}</span>
          </p>
          <p className="leading-[20px] text-[#ff4d00]">Privacy Policy</p>
        </div>
      </div>
    </div>
  );
}

function Frame3() {
  return (
    <div className="content-stretch flex items-center justify-center px-[4px] relative shrink-0">
      <div className="flex flex-col font-['Open_Sans:Regular',sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#ff4d4f] text-[12px] whitespace-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
        <p className="leading-[13px]">Please agree to the Terms of Service and Privacy Policy to continue.</p>
      </div>
    </div>
  );
}

function Frame2() {
  return (
    <div className="content-stretch flex flex-col gap-[4px] items-start relative shrink-0">
      <CheckboxCheckboxLabel />
      <Frame3 />
    </div>
  );
}

function Frame() {
  return (
    <div className="content-stretch flex flex-col gap-[8px] items-start relative shrink-0">
      <Group1 />
      <Frame2 />
    </div>
  );
}

function Form() {
  return (
    <div className="content-stretch flex flex-col items-start py-[12px] relative shrink-0" data-name="form">
      <Frame />
    </div>
  );
}

function Content5() {
  return (
    <div className="content-stretch flex h-[48px] items-center justify-center overflow-clip relative shrink-0 w-full" data-name="content">
      <div className="flex flex-col font-['Inter:Semi_Bold',sans-serif] font-semibold justify-center leading-[0] not-italic relative shrink-0 text-[16px] text-center text-white whitespace-nowrap">
        <p className="leading-[24px]">Create account</p>
      </div>
    </div>
  );
}

function Button() {
  return (
    <div className="bg-[#ff4d00] content-stretch flex flex-col items-center justify-center px-[16px] relative rounded-[4px] shrink-0 w-[380px]" data-name="Button">
      <Content5 />
    </div>
  );
}

function Frame1() {
  return (
    <div className="content-stretch flex flex-col items-center relative shrink-0">
      <Button />
    </div>
  );
}

function Footer() {
  return (
    <div className="flex-[1_0_0] min-h-px min-w-px relative w-full" data-name="Footer">
      <div className="flex flex-col items-center size-full">
        <div className="content-stretch flex flex-col items-center pt-[8px] relative size-full">
          <Frame1 />
          <div className="flex flex-col font-['Zen_Kaku_Gothic_Antique:Regular',sans-serif] h-[20.534px] justify-end leading-[14px] not-italic relative shrink-0 text-[#212121] text-[0px] text-[12px] text-center w-[425.393px]">
            <p className="mb-0">&nbsp;</p>
            <p className="font-['Inter:Regular',sans-serif] font-normal text-[#404040]">©2025 Inertia Systems, Inc. All Rights Reserved</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Creataccount() {
  return (
    <div className="content-stretch flex flex-col gap-[8px] items-center overflow-clip pt-[24px] relative rounded-tl-[24px] rounded-tr-[24px] size-full" data-name="Creataccount">
      <Header />
      <Form />
      <Footer />
    </div>
  );
}