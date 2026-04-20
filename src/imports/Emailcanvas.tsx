import svgPaths from "./svg-g0altvvnbk";

function Bladefulllogo() {
  return (
    <div className="h-[40px] relative shrink-0 w-[155.175px]" data-name="Bladefulllogo40">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 155.175 40">
        <g id="Bladefulllogo40">
          <g id="Vector">
            <path d={svgPaths.p3b26f980} fill="var(--fill-0, #F0F0F0)" />
            <path d={svgPaths.p2a25f080} fill="#FF4D00" />
            <path d={svgPaths.p31311f00} fill="#FF4D00" />
            <path d={svgPaths.p3a2b0400} fill="#FF4D00" />
            <path d={svgPaths.p3df3d880} fill="#FF4D00" />
            <path d={svgPaths.p98b4780} fill="#FF4D00" />
            <path d={svgPaths.p28d42900} fill="var(--fill-0, #F0F0F0)" />
            <path d={svgPaths.pbd07b00} fill="var(--fill-0, #F0F0F0)" />
            <path d={svgPaths.p39135180} fill="var(--fill-0, #F0F0F0)" />
            <path d={svgPaths.p1b98a840} fill="var(--fill-0, #F0F0F0)" />
            <path d={svgPaths.p1d828e00} fill="var(--fill-0, #F0F0F0)" />
            <path d={svgPaths.p7086500} fill="var(--fill-0, #F0F0F0)" />
            <path d={svgPaths.p391b640} fill="var(--fill-0, #F0F0F0)" />
          </g>
        </g>
      </svg>
    </div>
  );
}

function BannerImage() {
  return (
    <div className="bg-[#28314a] relative rounded-[8px] shrink-0 w-full" data-name="Banner image">
      <div className="content-stretch flex flex-col gap-[24px] items-start px-[22px] py-[12px] relative w-full">
        <Bladefulllogo />
        <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[normal] min-w-full not-italic relative shrink-0 text-[24px] text-white w-[min-content]">You’ve Been Added to a Project</p>
      </div>
    </div>
  );
}

function Frame3() {
  return (
    <div className="content-stretch flex flex-col gap-[32px] items-start not-italic relative shrink-0">
      <p className="font-['Inter:Medium',sans-serif] font-medium leading-[32px] relative shrink-0 text-[24px] text-black whitespace-nowrap">{`Hi {{FirstName}},`}</p>
      <div className="font-['Inter:Regular',sans-serif] font-normal leading-[0] relative shrink-0 text-[#333] text-[14px] w-[584px] whitespace-pre-wrap">
        <p className="mb-0">
          <span className="font-['Inter:Bold',sans-serif] font-bold leading-[22px] not-italic">{`{{InvitingCompanyName}}`}</span>
          <span className="leading-[22px]">{` has added you to the`}</span>
          <span className="font-['Inter:Bold',sans-serif] font-bold leading-[22px] not-italic">{` {{ProjectName}}`}</span>
          <span className="leading-[22px]">{` project in `}</span>
          <span className="font-['Inter:Bold',sans-serif] font-bold leading-[22px] not-italic">Inertia Systems.</span>
        </p>
        <p className="leading-[22px] mb-0">&nbsp;</p>
        <p className="leading-[22px]">To get started, you’ll need to create your account using the link below:</p>
      </div>
    </div>
  );
}

function Content() {
  return (
    <div className="content-stretch flex gap-[8px] h-[48px] items-center overflow-clip relative shrink-0" data-name="content">
      <div className="flex flex-col font-['Inter:Semi_Bold',sans-serif] font-semibold justify-center leading-[0] not-italic relative shrink-0 text-[16px] text-center text-white whitespace-nowrap">
        <p className="leading-[24px]">Create your account</p>
      </div>
    </div>
  );
}

function Button() {
  return (
    <div className="bg-[#ff4d00] content-stretch flex flex-col h-[40px] items-center justify-center px-[16px] relative rounded-[4px] shrink-0" data-name="Button">
      <Content />
    </div>
  );
}

function Frame2() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0">
      <div className="font-['Inter:Regular',sans-serif] font-normal leading-[22px] not-italic relative shrink-0 text-[14px] text-black w-[584px] whitespace-pre-wrap">
        <p className="mb-0">This link will guide you through setting up your password and accessing the project.</p>
        <p className="mb-0">&nbsp;</p>
        <p className="mb-0">If you weren’t expecting this invitation, you can safely ignore this email.</p>
        <p className="mb-0">&nbsp;</p>
        <p>If you have any questions, your project administrator or the Inertia team can help you get started.</p>
      </div>
    </div>
  );
}

function Frame() {
  return (
    <div className="content-stretch flex flex-col items-start not-italic relative shrink-0 text-[14px]">
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[22px] relative shrink-0 text-black w-[584px]">Welcome aboard,</p>
      <p className="font-['Inter:Medium',sans-serif] font-medium leading-[0] relative shrink-0 text-[#ff4d00] w-[584px]">
        <span className="leading-[22px]">
          Inertia Systems, Inc.
          <br aria-hidden="true" />
        </span>
        <span className="[text-decoration-skip-ink:none] decoration-solid leading-[22px] underline">{`https://support.blade.inertia.com`}</span>
      </p>
    </div>
  );
}

function Body() {
  return (
    <div className="content-stretch flex flex-col gap-[32px] items-start justify-center relative shrink-0 w-full" data-name="Body">
      <Frame3 />
      <Button />
      <Frame2 />
      <Frame />
    </div>
  );
}

function TableTbodyTrTd() {
  return (
    <div className="bg-[rgba(0,0,0,0)] h-[3px] relative shrink-0 w-[621px]" data-name="Table / Tbody / Tr / Td">
      <div aria-hidden="true" className="absolute border-[#dfe3e8] border-solid border-t-[0.533px] inset-0 pointer-events-none" />
    </div>
  );
}

function Links() {
  return (
    <div className="content-stretch flex gap-[5px] items-center relative shrink-0" data-name="Links">
      <p className="[text-decoration-skip-ink:none] decoration-solid font-['Euclid_Circular_A:Regular',sans-serif] leading-[normal] not-italic relative shrink-0 text-[#333] text-[10px] text-center underline whitespace-nowrap">Privacy policy</p>
      <div className="relative shrink-0 size-[4px]">
        <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 4 4">
          <circle cx="2" cy="2" fill="var(--fill-0, #D9D9D9)" id="Ellipse 1" r="2" />
        </svg>
      </div>
      <p className="[text-decoration-skip-ink:none] decoration-solid font-['Euclid_Circular_A:Regular',sans-serif] leading-[normal] not-italic relative shrink-0 text-[#333] text-[10px] text-center underline whitespace-nowrap">Terms of service</p>
    </div>
  );
}

function Frame1() {
  return (
    <div className="content-stretch flex flex-col gap-[8px] items-center relative shrink-0">
      <div className="font-['Inter:Regular',sans-serif] font-normal leading-[normal] not-italic relative shrink-0 text-[10px] text-black text-center w-[476px]">
        <p className="mb-0">This is an operational email. Please do not reply to this message.</p>
        <p>© Inertia Systems, Inc. All rights reserved.</p>
      </div>
      <Links />
    </div>
  );
}

function Footer() {
  return (
    <div className="bg-[#f5f5f5] relative shrink-0 w-full" data-name="Footer">
      <div className="flex flex-col items-center size-full">
        <div className="content-stretch flex flex-col items-center p-[12px] relative w-full">
          <Frame1 />
        </div>
      </div>
    </div>
  );
}

function TbodyTrTd() {
  return (
    <div className="bg-[rgba(0,0,0,0)] relative shrink-0 w-full" data-name="Tbody / Tr / Td">
      <div className="content-stretch flex flex-col gap-[18px] items-start px-[40px] py-[16px] relative w-full">
        <BannerImage />
        <Body />
        <TableTbodyTrTd />
        <Footer />
      </div>
    </div>
  );
}

function TbodyTrTdTableBackgroundColor() {
  return (
    <div className="bg-white content-stretch flex flex-col items-start relative rounded-[20px] shrink-0 w-full" data-name="Tbody / Tr / Td / Table+BackgroundColor">
      <TbodyTrTd />
    </div>
  );
}

export default function Emailcanvas() {
  return (
    <div className="bg-[#f7f9fa] content-stretch flex flex-col items-start px-[80px] py-[24px] relative size-full" data-name="Emailcanvas">
      <TbodyTrTdTableBackgroundColor />
    </div>
  );
}