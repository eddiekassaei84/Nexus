import svgPaths from "./svg-o83jhbud1k";
import imgAvatar from "figma:asset/5d8ef005878d70532e56964fc87a73ec8e9a828c.png";
import imgSatpon1 from "figma:asset/31f8f844c85bcb0a258ba9cd606404673764a826.png";
import { imgShutterstock6856549541 } from "./svg-y6djp";

function Group10() {
  return (
    <div className="absolute bottom-[12.5%] left-1/4 right-1/4 top-[33.33%]">
      <div className="absolute inset-[-5.77%_0_-5.77%_-6.25%]">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12.75 14.5">
          <g id="Group 147">
            <path d={svgPaths.p339a9c00} fill="var(--stroke-0, white)" id="Vector" />
            <path d={svgPaths.p169fb580} id="Vector_2" stroke="var(--stroke-0, white)" strokeLinejoin="round" strokeWidth="1.5" />
            <path d={svgPaths.p1ea89980} id="Vector_3" stroke="var(--stroke-0, white)" strokeLinejoin="round" strokeWidth="1.5" />
          </g>
        </svg>
      </div>
    </div>
  );
}

function Group19() {
  return (
    <div className="absolute inset-[12.5%_8.33%_12.5%_41.67%]">
      <div className="absolute inset-[-4.17%_-6.25%]">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 13.5 19.5">
          <g id="Group 179">
            <path d={svgPaths.p1260fa80} id="Rectangle 1031" stroke="var(--stroke-0, white)" strokeWidth="1.5" />
          </g>
        </svg>
      </div>
    </div>
  );
}

function Group20() {
  return (
    <div className="absolute bottom-[12.5%] contents left-1/4 right-[8.33%] top-[12.5%]">
      <Group10 />
      <Group19 />
    </div>
  );
}

function Group14() {
  return (
    <div className="absolute inset-[33.33%_70.6%_12.5%_8.33%]">
      <div className="absolute inset-[-5.77%_0_0_-14.84%]">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 5.80556 13.7501">
          <g id="Group 151">
            <path d={svgPaths.pe91d900} id="Vector" stroke="var(--stroke-0, white)" strokeLinejoin="round" strokeWidth="1.5" />
            <path d={svgPaths.p1881e080} id="Vector_2" stroke="var(--stroke-0, white)" strokeLinejoin="round" strokeWidth="1.5" />
          </g>
        </svg>
      </div>
    </div>
  );
}

function Group13() {
  return (
    <div className="absolute contents inset-[33.33%_70.6%_12.5%_8.33%]">
      <Group14 />
    </div>
  );
}

function Group7() {
  return (
    <div className="absolute contents inset-[33.33%_70.6%_12.5%_8.33%]">
      <Group13 />
    </div>
  );
}

function Component24PxAppUserCompany() {
  return (
    <div className="overflow-clip relative shrink-0 size-[24px]" data-name="24px/app/user-company">
      <Group20 />
      <div className="absolute bottom-1/4 left-[58.33%] right-[16.67%] top-[54.17%]" data-name="Vector">
        <div className="absolute inset-[-11.02%_-8.48%_-11.06%_-8.45%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 7.01534 6.10412">
            <path d={svgPaths.p26e04d40} id="Vector" stroke="var(--stroke-0, white)" strokeWidth="1.5" />
          </svg>
        </div>
      </div>
      <Group7 />
    </div>
  );
}

function LeftContent1() {
  return (
    <div className="relative shrink-0 w-full" data-name="Left Content">
      <div className="flex flex-col items-center justify-center size-full">
        <div className="content-stretch flex flex-col items-center justify-center px-[4px] relative w-full">
          <Component24PxAppUserCompany />
        </div>
      </div>
    </div>
  );
}

function LeftContent() {
  return (
    <div className="content-stretch flex flex-col items-center justify-center relative shrink-0 size-[24px]" data-name="Left Content">
      <LeftContent1 />
    </div>
  );
}

function Container() {
  return (
    <div className="h-[50px] relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-row items-center overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex items-center px-[16px] py-[8px] relative size-full">
          <LeftContent />
        </div>
      </div>
    </div>
  );
}

function ListItem() {
  return (
    <div className="content-stretch flex flex-col items-start overflow-clip relative rounded-[4px] shrink-0 w-[280px]" data-name="<ListItem>">
      <Container />
    </div>
  );
}

function List() {
  return (
    <div className="bg-[#384857] content-stretch flex flex-col items-start relative shrink-0 w-[56px]" data-name="list">
      <div aria-hidden="true" className="absolute border-[#ff4d00] border-l-4 border-solid inset-0 pointer-events-none" />
      <ListItem />
    </div>
  );
}

function Container1() {
  return (
    <div className="relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-row items-center overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex items-center px-[16px] py-[8px] relative w-full">
          <div className="content-stretch flex flex-col items-center justify-center overflow-clip p-[5px] relative rounded-[100px] shrink-0" data-name="Right Action">
            <div className="content-stretch flex items-start shrink-0" data-name="Icon" />
          </div>
        </div>
      </div>
    </div>
  );
}

function ListItem1() {
  return (
    <div className="content-stretch flex flex-col items-start overflow-clip relative rounded-[4px] shrink-0 w-full" data-name="<ListItem>">
      <Container1 />
    </div>
  );
}

function CustomExpandableNavItem() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col items-start min-h-px min-w-px relative w-full" data-name="_Custom / Expandable Nav Item">
      <ListItem1 />
    </div>
  );
}

function Group() {
  return (
    <div className="relative size-full">
      <div className="absolute inset-[0_-4.17%_0_0]">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 18.75 18">
          <g id="Group 8">
            <path d="M7.86805e-07 9L14.625 9" id="Vector 8" stroke="var(--stroke-0, white)" strokeWidth="1.5" />
            <path d={svgPaths.p2fe9d080} id="Vector" stroke="var(--stroke-0, white)" strokeWidth="1.5" />
            <path d="M18 0V18" id="Vector 64" stroke="var(--stroke-0, white)" strokeWidth="1.5" />
          </g>
        </svg>
      </div>
    </div>
  );
}

function LeftContent3() {
  return (
    <div className="content-stretch flex flex-col items-start min-w-[56px] px-[4px] relative shrink-0" data-name="Left Content">
      <div className="overflow-clip relative shrink-0 size-[24px]" data-name="24px/directional/collapse-left">
        <div className="absolute flex inset-[12.5%] items-center justify-center">
          <div className="flex-none rotate-180 size-[18px]">
            <Group />
          </div>
        </div>
      </div>
    </div>
  );
}

function LeftContent2() {
  return (
    <div className="content-stretch flex flex-col items-start justify-center relative size-[28px]" data-name="Left Content">
      <LeftContent3 />
    </div>
  );
}

function Container2() {
  return (
    <div className="relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-row items-center overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex items-center px-[16px] py-[8px] relative w-full">
          <div className="flex items-center justify-center min-w-[24px] relative shrink-0">
            <div className="flex-none rotate-180">
              <LeftContent2 />
            </div>
          </div>
          <div className="content-stretch flex flex-col items-center justify-center overflow-clip p-[5px] rounded-[100px] shrink-0" data-name="Right Action" />
        </div>
      </div>
    </div>
  );
}

function ListItem2() {
  return (
    <div className="content-stretch flex flex-col items-start overflow-clip relative rounded-[4px] shrink-0 w-full" data-name="<ListItem>">
      <Container2 />
    </div>
  );
}

function List1() {
  return (
    <div className="bg-[#384857] content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="list">
      <ListItem2 />
    </div>
  );
}

function Ul() {
  return (
    <div className="bg-[#243746] content-stretch flex flex-col gap-[4px] h-[1018px] items-start relative shrink-0 w-[56px]" data-name="ul">
      <List />
      <CustomExpandableNavItem />
      <List1 />
    </div>
  );
}

function ListItemText() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col items-start min-h-px min-w-px py-[4px] relative" data-name="ListItem Text">
      <p className="font-['Open_Sans:Bold',sans-serif] font-bold leading-[normal] relative shrink-0 text-[#f0f0f0] text-[14px] tracking-[-0.28px] w-full whitespace-pre-wrap" style={{ fontVariationSettings: "'wdth' 100" }}>{`People & Access`}</p>
    </div>
  );
}

function Container3() {
  return (
    <div className="relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-row items-center overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex items-center px-[16px] py-[8px] relative w-full">
          <ListItemText />
          <div className="flex items-center justify-center relative shrink-0 size-[34px]" style={{ "--transform-inner-width": "1181", "--transform-inner-height": "0" } as React.CSSProperties}>
            <div className="flex-none rotate-90">
              <div className="content-stretch flex flex-col items-center justify-center overflow-clip p-[5px] rounded-[100px]" data-name="Right Action" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function ListItem3() {
  return (
    <div className="content-stretch flex flex-col items-start overflow-clip relative rounded-[4px] shrink-0 w-full" data-name="<ListItem>">
      <Container3 />
    </div>
  );
}

function List2() {
  return (
    <div className="bg-[#384857] content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="list">
      <ListItem3 />
    </div>
  );
}

function Group9() {
  return (
    <div className="absolute inset-[12.5%_16.67%]">
      <div className="absolute inset-[-5.56%_-6.25%_0_-6.25%]">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 18 19">
          <g id="Group 146">
            <path d={svgPaths.p324c6880} id="Vector" stroke="var(--stroke-0, white)" strokeLinejoin="round" strokeWidth="2" />
            <path d={svgPaths.p43b5d80} id="Vector_2" stroke="var(--stroke-0, white)" strokeLinejoin="round" strokeWidth="2" />
          </g>
        </svg>
      </div>
    </div>
  );
}

function LeftContent5() {
  return (
    <div className="content-stretch flex flex-col items-start min-w-[56px] px-[4px] relative shrink-0" data-name="Left Content">
      <div className="overflow-clip relative shrink-0 size-[24px]" data-name="24px/app/user-single">
        <Group9 />
      </div>
    </div>
  );
}

function LeftContent4() {
  return (
    <div className="content-stretch flex flex-col items-start min-w-[56px] relative shrink-0" data-name="Left Content">
      <LeftContent5 />
    </div>
  );
}

function ListItemText1() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col items-start min-h-px min-w-px py-[4px] relative" data-name="ListItem Text">
      <p className="font-['Open_Sans:Bold',sans-serif] font-bold leading-[normal] relative shrink-0 text-[#f0f0f0] text-[14px] tracking-[-0.28px] w-full whitespace-pre-wrap" style={{ fontVariationSettings: "'wdth' 100" }}>
        Users
      </p>
    </div>
  );
}

function Container4() {
  return (
    <div className="relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-row items-center overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex items-center px-[16px] py-[8px] relative w-full">
          <div className="content-stretch flex flex-col items-center justify-center overflow-clip p-[5px] rounded-[100px] shrink-0" data-name="Right Action" />
          <LeftContent4 />
          <ListItemText1 />
        </div>
      </div>
    </div>
  );
}

function ListItem4() {
  return (
    <div className="content-stretch flex flex-col items-start overflow-clip relative rounded-[4px] shrink-0 w-full" data-name="<ListItem>">
      <Container4 />
    </div>
  );
}

function List3() {
  return (
    <div className="bg-[#4c5a67] content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="list">
      <div aria-hidden="true" className="absolute border-[#ff4d00] border-l-4 border-solid inset-0 pointer-events-none" />
      <ListItem4 />
    </div>
  );
}

function Group11() {
  return (
    <div className="absolute inset-[33.33%_41.67%_12.5%_8.33%]">
      <div className="absolute inset-[-5.77%_0_-5.77%_-6.25%]">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12.75 14.5">
          <g id="Group 147">
            <path d={svgPaths.p339a9c00} fill="var(--stroke-0, white)" id="Vector" />
            <path d={svgPaths.p3d3b6a00} id="Vector_2" stroke="var(--stroke-0, white)" strokeLinejoin="round" strokeWidth="1.5" />
          </g>
        </svg>
      </div>
    </div>
  );
}

function Group22() {
  return (
    <div className="absolute inset-[12.5%_8.33%_12.5%_41.67%]">
      <div className="absolute inset-[-4.17%_-6.25%]">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 13.5 19.5">
          <g id="Group 179">
            <path d={svgPaths.p1260fa80} id="Rectangle 1031" stroke="var(--stroke-0, white)" strokeWidth="1.5" />
            <rect height="1" id="Rectangle 1032" stroke="var(--stroke-0, white)" width="1" x="4.25" y="4.25" />
            <rect height="1" id="Rectangle 1034" stroke="var(--stroke-0, white)" width="1" x="4.25" y="8.25" />
            <rect height="1" id="Rectangle 1036" stroke="var(--stroke-0, white)" width="1" x="4.25" y="12.25" />
            <rect height="1" id="Rectangle 1033" stroke="var(--stroke-0, white)" width="1" x="8.25" y="4.25" />
            <rect height="1" id="Rectangle 1035" stroke="var(--stroke-0, white)" width="1" x="8.25" y="8.25" />
            <rect height="1" id="Rectangle 1037" stroke="var(--stroke-0, white)" width="1" x="8.25" y="12.25" />
          </g>
        </svg>
      </div>
    </div>
  );
}

function Group21() {
  return (
    <div className="absolute contents inset-[12.5%_8.33%]">
      <Group11 />
      <Group22 />
    </div>
  );
}

function LeftContent8() {
  return (
    <div className="content-stretch flex flex-col items-start min-w-[56px] px-[4px] relative shrink-0" data-name="Left Content">
      <div className="overflow-clip relative shrink-0 size-[24px]" data-name="24px/app/user-company">
        <Group21 />
      </div>
    </div>
  );
}

function LeftContent7() {
  return (
    <div className="content-stretch flex flex-col items-start min-w-[56px] relative shrink-0" data-name="Left Content">
      <LeftContent8 />
    </div>
  );
}

function LeftContent6() {
  return (
    <div className="content-stretch flex flex-col items-start min-w-[56px] relative shrink-0" data-name="Left Content">
      <LeftContent7 />
    </div>
  );
}

function ListItemText2() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col items-start min-h-px min-w-px py-[4px] relative" data-name="ListItem Text">
      <p className="font-['Open_Sans:Regular',sans-serif] font-normal leading-[normal] relative shrink-0 text-[14px] text-white tracking-[-0.28px] w-full whitespace-pre-wrap" style={{ fontVariationSettings: "'wdth' 100" }}>
        Companies
      </p>
    </div>
  );
}

function Container5() {
  return (
    <div className="relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-row items-center overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex items-center px-[16px] py-[8px] relative w-full">
          <div className="content-stretch flex flex-col items-center justify-center overflow-clip p-[5px] rounded-[100px] shrink-0" data-name="Right Action" />
          <LeftContent6 />
          <ListItemText2 />
        </div>
      </div>
    </div>
  );
}

function ListItem5() {
  return (
    <div className="content-stretch flex flex-col items-start overflow-clip relative rounded-[4px] shrink-0 w-full" data-name="<ListItem>">
      <Container5 />
    </div>
  );
}

function List4() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="list">
      <ListItem5 />
    </div>
  );
}

function Group12() {
  return (
    <div className="absolute inset-[12.5%_8.33%_12.5%_33.33%]">
      <div className="absolute inset-[-4.17%_-5.36%_0_-5.36%]">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 15.5 18.75">
          <g id="Group 149">
            <path d={svgPaths.p3bc86f80} id="Vector" stroke="var(--stroke-0, white)" strokeLinejoin="round" strokeWidth="1.5" />
            <path d={svgPaths.p19176380} id="Vector_2" stroke="var(--stroke-0, white)" strokeLinejoin="round" strokeWidth="1.5" />
          </g>
        </svg>
      </div>
    </div>
  );
}

function Group16() {
  return (
    <div className="absolute inset-[12.5%_62.5%_12.5%_8.33%]">
      <div className="absolute inset-[-4.17%_0_0_-10.71%]">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 7.75 18.75">
          <g id="Group 151">
            <path d={svgPaths.pfe26a80} id="Vector" stroke="var(--stroke-0, white)" strokeLinejoin="round" strokeWidth="1.5" />
            <path d={svgPaths.p7e74016} id="Vector_2" stroke="var(--stroke-0, white)" strokeLinejoin="round" strokeWidth="1.5" />
          </g>
        </svg>
      </div>
    </div>
  );
}

function Group15() {
  return (
    <div className="absolute contents inset-[12.5%_62.5%_12.5%_8.33%]">
      <Group16 />
    </div>
  );
}

function Group8() {
  return (
    <div className="absolute contents inset-[12.5%_8.33%]">
      <Group12 />
      <Group15 />
    </div>
  );
}

function LeftContent10() {
  return (
    <div className="content-stretch flex flex-col items-start min-w-[56px] px-[4px] relative shrink-0" data-name="Left Content">
      <div className="overflow-clip relative shrink-0 size-[24px]" data-name="24px/app/user-group">
        <Group8 />
      </div>
    </div>
  );
}

function LeftContent9() {
  return (
    <div className="content-stretch flex flex-col items-start min-w-[56px] relative shrink-0" data-name="Left Content">
      <LeftContent10 />
    </div>
  );
}

function ListItemText3() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col items-start min-h-px min-w-px py-[4px] relative" data-name="ListItem Text">
      <p className="font-['Open_Sans:Regular',sans-serif] font-normal leading-[normal] relative shrink-0 text-[14px] text-white tracking-[-0.28px] w-full whitespace-pre-wrap" style={{ fontVariationSettings: "'wdth' 100" }}>
        Teams
      </p>
    </div>
  );
}

function Container6() {
  return (
    <div className="relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-row items-center overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex items-center px-[16px] py-[8px] relative w-full">
          <div className="content-stretch flex flex-col items-center justify-center overflow-clip p-[5px] rounded-[100px] shrink-0" data-name="Right Action" />
          <LeftContent9 />
          <ListItemText3 />
        </div>
      </div>
    </div>
  );
}

function ListItem6() {
  return (
    <div className="content-stretch flex flex-col items-start overflow-clip relative rounded-[4px] shrink-0 w-full" data-name="<ListItem>">
      <Container6 />
    </div>
  );
}

function List5() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="list">
      <ListItem6 />
    </div>
  );
}

function Group17() {
  return (
    <div className="absolute inset-[8.33%]">
      <div className="absolute inset-[-3.75%_-2.62%_-1.58%_-3.75%]">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 21.2739 21.0652">
          <g id="Group 147">
            <path d={svgPaths.p6e2fe00} id="Vector" stroke="var(--stroke-0, white)" strokeLinejoin="round" strokeWidth="1.5" />
            <path d={svgPaths.p3e8a3d00} id="Vector_2" stroke="var(--stroke-0, white)" strokeLinejoin="round" strokeWidth="1.5" />
            <path d={svgPaths.p26980980} id="Vector_3" stroke="var(--stroke-0, white)" strokeWidth="1.5" />
          </g>
        </svg>
      </div>
    </div>
  );
}

function LeftContent12() {
  return (
    <div className="content-stretch flex flex-col items-start min-w-[56px] px-[4px] relative shrink-0" data-name="Left Content">
      <div className="overflow-clip relative shrink-0 size-[24px]" data-name="24px/app/user-key">
        <Group17 />
      </div>
    </div>
  );
}

function LeftContent11() {
  return (
    <div className="content-stretch flex flex-col items-start min-w-[56px] relative shrink-0" data-name="Left Content">
      <LeftContent12 />
    </div>
  );
}

function ListItemText4() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col items-start min-h-px min-w-px py-[4px] relative" data-name="ListItem Text">
      <p className="font-['Open_Sans:Regular',sans-serif] font-normal leading-[normal] relative shrink-0 text-[14px] text-white tracking-[-0.28px] w-full whitespace-pre-wrap" style={{ fontVariationSettings: "'wdth' 100" }}>
        Roles
      </p>
    </div>
  );
}

function Container7() {
  return (
    <div className="relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-row items-center overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex items-center px-[16px] py-[8px] relative w-full">
          <div className="content-stretch flex flex-col items-center justify-center overflow-clip p-[5px] rounded-[100px] shrink-0" data-name="Right Action" />
          <LeftContent11 />
          <ListItemText4 />
        </div>
      </div>
    </div>
  );
}

function ListItem7() {
  return (
    <div className="content-stretch flex flex-col items-start overflow-clip relative rounded-[4px] shrink-0 w-full" data-name="<ListItem>">
      <Container7 />
    </div>
  );
}

function List6() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="list">
      <ListItem7 />
    </div>
  );
}

function Group1() {
  return (
    <div className="relative size-full">
      <div className="absolute inset-[-3.85%_-2.79%_-2.72%_-3.95%]">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20.2803 20.7803">
          <g id="Group 16">
            <circle cx="5.75" cy="5.75" id="Ellipse 2" r="5" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeWidth="1.5" />
            <path d="M8.74994 8.75L19.7499 19.75" id="Vector 12" stroke="var(--stroke-0, white)" strokeWidth="1.5" />
            <path d="M16.7499 17.25L13.7499 20.25" id="Vector 175" stroke="var(--stroke-0, white)" strokeWidth="1.5" />
            <path d="M14.7499 14.75L12.7499 16.75" id="Vector 176" stroke="var(--stroke-0, white)" strokeWidth="1.5" />
          </g>
        </svg>
      </div>
    </div>
  );
}

function LeftContent14() {
  return (
    <div className="content-stretch flex flex-col items-start min-w-[56px] px-[4px] relative shrink-0" data-name="Left Content">
      <div className="overflow-clip relative shrink-0 size-[24px]" data-name="24px/app/key">
        <div className="absolute flex inset-[8.33%_10.42%_12.5%_8.33%] items-center justify-center">
          <div className="-rotate-90 flex-none h-[19.5px] w-[19px]">
            <Group1 />
          </div>
        </div>
      </div>
    </div>
  );
}

function LeftContent13() {
  return (
    <div className="content-stretch flex flex-col items-start min-w-[56px] relative shrink-0" data-name="Left Content">
      <LeftContent14 />
    </div>
  );
}

function ListItemText5() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col items-start min-h-px min-w-px py-[4px] relative" data-name="ListItem Text">
      <p className="font-['Open_Sans:Regular',sans-serif] font-normal leading-[normal] relative shrink-0 text-[#f0f0f0] text-[14px] tracking-[-0.28px] w-full whitespace-pre-wrap" style={{ fontVariationSettings: "'wdth' 100" }}>
        Permissions
      </p>
    </div>
  );
}

function Container8() {
  return (
    <div className="relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-row items-center overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex items-center px-[16px] py-[8px] relative w-full">
          <div className="content-stretch flex flex-col items-center justify-center overflow-clip p-[5px] rounded-[100px] shrink-0" data-name="Right Action" />
          <LeftContent13 />
          <ListItemText5 />
        </div>
      </div>
    </div>
  );
}

function ListItem8() {
  return (
    <div className="content-stretch flex flex-col items-start overflow-clip relative rounded-[4px] shrink-0 w-full" data-name="<ListItem>">
      <Container8 />
    </div>
  );
}

function List7() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="list">
      <ListItem8 />
    </div>
  );
}

function Ul1() {
  return (
    <div className="bg-[#243746] content-stretch flex flex-col gap-[4px] items-start relative shrink-0 w-[280px]" data-name="ul">
      <List2 />
      <List3 />
      <List4 />
      <List5 />
      <List6 />
      <List7 />
    </div>
  );
}

function LeftNavOpt() {
  return (
    <div className="absolute bg-[#243746] content-stretch flex flex-col items-start left-[1.5px] shadow-[2px_2px_5.4px_0px_rgba(100,100,100,0.2)] top-0 z-[4]" data-name="Left-nav opt6">
      <Ul1 />
    </div>
  );
}

function Frame() {
  return (
    <div className="content-stretch flex items-center relative shrink-0">
      <p className="font-['Inter:Bold',sans-serif] font-bold leading-[44px] not-italic relative shrink-0 text-[#1d2c38] text-[38px]">Users</p>
    </div>
  );
}

function TableItemRowItem() {
  return (
    <div className="flex-[1_0_0] h-[44px] min-h-px min-w-px relative" data-name="Table Item / Row Item">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex items-center pl-[48px] pr-[24px] py-[4px] relative size-full">
          <Frame />
        </div>
      </div>
    </div>
  );
}

function Row() {
  return (
    <div className="bg-white content-stretch flex h-[96px] items-center relative shrink-0 w-full z-[3]" data-name="Row">
      <div aria-hidden="true" className="absolute border-[#d9d9d9] border-b border-solid inset-0 pointer-events-none" />
      <TableItemRowItem />
    </div>
  );
}

function Group2() {
  return (
    <div className="absolute inset-[8.33%]">
      <div className="absolute inset-[0_-2.65%_-2.65%_0]">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20.5302 20.5303">
          <g id="Group 16">
            <circle cx="8.31522" cy="8.31522" id="Ellipse 2" r="7.56522" stroke="var(--stroke-0, #616D79)" strokeLinecap="round" strokeWidth="1.5" />
            <path d="M14.1303 14.1304L19.9999 20" id="Vector 12" stroke="var(--stroke-0, #616D79)" strokeWidth="1.5" />
          </g>
        </svg>
      </div>
    </div>
  );
}

function Content() {
  return (
    <div className="bg-[#f2f3f4] h-[40px] relative rounded-[4px] shrink-0" data-name="content">
      <div className="content-stretch flex gap-[4px] h-full items-center justify-center overflow-clip px-[16px] relative rounded-[inherit]">
        <div className="overflow-clip relative shrink-0 size-[24px]" data-name="24px/app/filter">
          <div className="absolute inset-[8.33%_12.5%]">
            <div className="absolute inset-[-3.75%_-4.17%]">
              <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 19.5 21.5">
                <path d={svgPaths.p55f5a00} id="Vector 166" stroke="var(--stroke-0, #616D79)" strokeLinejoin="round" strokeWidth="1.5" />
              </svg>
            </div>
          </div>
        </div>
        <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[#616d79] text-[16px] text-center whitespace-nowrap">
          <p className="leading-[22px]">{`Filter  `}</p>
        </div>
      </div>
      <div aria-hidden="true" className="absolute border border-[#c3c7cc] border-solid inset-0 pointer-events-none rounded-[4px]" />
    </div>
  );
}

function Button() {
  return (
    <div className="content-stretch flex flex-col h-[44px] items-center justify-center py-[2px] relative shrink-0" data-name="Button">
      <Content />
    </div>
  );
}

function Frame3() {
  return (
    <div className="content-stretch flex gap-[12px] items-center relative shrink-0">
      <div className="bg-white content-stretch flex gap-[8px] h-[40px] items-center px-[8px] relative rounded-[4px] shrink-0 w-[363px]" data-name="Input Field">
        <div aria-hidden="true" className="absolute border border-[#d9d9d9] border-solid inset-0 pointer-events-none rounded-[4px]" />
        <div className="overflow-clip relative shrink-0 size-[24px]" data-name="24px/app/search">
          <Group2 />
        </div>
        <div className="flex flex-[1_0_0] flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] min-h-px min-w-px not-italic relative text-[#8c8c8c] text-[14px]">
          <p className="leading-[20px] whitespace-pre-wrap">Search files by name or number</p>
        </div>
      </div>
      <Button />
    </div>
  );
}

function Content1() {
  return (
    <div className="content-stretch flex gap-[4px] h-[40px] items-center justify-center overflow-clip px-[16px] relative rounded-[4px] shrink-0" data-name="content">
      <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[#3b82f6] text-[0px] text-center whitespace-nowrap">
        <p className="[text-decoration-skip-ink:none] decoration-solid leading-[22px] text-[16px] underline">Download Import Template</p>
      </div>
    </div>
  );
}

function Group3() {
  return (
    <div className="absolute left-[2px] size-[20px] top-[2px]">
      <div className="absolute inset-[-3.75%_0_-3.75%_-3.75%]">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20.75 21.5">
          <g id="Group 106">
            <path d={svgPaths.p39b25880} id="Rectangle 1000" stroke="var(--stroke-0, #616D79)" strokeLinecap="square" strokeLinejoin="round" strokeWidth="1.5" />
            <g id="Group 92">
              <path d={svgPaths.p3c64cd90} id="Vector 8" stroke="var(--stroke-0, #616D79)" strokeWidth="1.5" />
              <path d={svgPaths.p32883150} id="Vector" stroke="var(--stroke-0, #616D79)" strokeWidth="1.5" />
            </g>
          </g>
        </svg>
      </div>
    </div>
  );
}

function Content2() {
  return (
    <div className="bg-[#f2f3f4] h-[40px] relative rounded-[4px] shrink-0" data-name="content">
      <div className="content-stretch flex gap-[4px] h-full items-center justify-center overflow-clip px-[16px] relative rounded-[inherit]">
        <div className="overflow-clip relative shrink-0 size-[24px]" data-name="24px/app/import">
          <Group3 />
        </div>
        <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[#616d79] text-[16px] text-center whitespace-nowrap">
          <p className="leading-[22px]">{`Import  `}</p>
        </div>
        <div className="overflow-clip relative shrink-0 size-[24px]" data-name="24px/directional/chevron-down">
          <div className="absolute bottom-[37.5%] flex items-center justify-center left-1/4 right-1/4 top-[37.5%]">
            <div className="-rotate-90 flex-none h-[12px] w-[6px]">
              <div className="relative size-full" data-name="Vector">
                <div className="absolute inset-[-8.84%_-17.68%]">
                  <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 8.12132 14.1213">
                    <path d={svgPaths.p5cbda00} id="Vector" stroke="var(--stroke-0, #616D79)" strokeLinecap="square" strokeWidth="1.5" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div aria-hidden="true" className="absolute border border-[#c3c7cc] border-solid inset-0 pointer-events-none rounded-[4px]" />
    </div>
  );
}

function Group4() {
  return (
    <div className="absolute inset-[8.33%]">
      <div className="absolute inset-[-2.65%_-5.3%_-3.75%_-3.75%]">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 21.8107 21.2803">
          <g id="Group 106">
            <path d={svgPaths.p34ec8300} id="Rectangle 1000" stroke="var(--stroke-0, #616D79)" strokeLinecap="square" strokeLinejoin="round" strokeWidth="1.5" />
            <g id="Group 92">
              <path d={svgPaths.p9c65f00} id="Vector 8" stroke="var(--stroke-0, #616D79)" strokeWidth="1.5" />
              <path d={svgPaths.p2702c480} id="Vector" stroke="var(--stroke-0, #616D79)" strokeWidth="1.5" />
            </g>
          </g>
        </svg>
      </div>
    </div>
  );
}

function Content3() {
  return (
    <div className="bg-[#f2f3f4] h-[40px] relative rounded-[4px] shrink-0" data-name="content">
      <div className="content-stretch flex gap-[4px] h-full items-center justify-center overflow-clip px-[16px] relative rounded-[inherit]">
        <div className="overflow-clip relative shrink-0 size-[24px]" data-name="24px/app/share">
          <Group4 />
        </div>
        <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[#616d79] text-[16px] text-center whitespace-nowrap">
          <p className="leading-[22px]">{`Export `}</p>
        </div>
        <div className="overflow-clip relative shrink-0 size-[24px]" data-name="24px/directional/chevron-down">
          <div className="absolute bottom-[37.5%] flex items-center justify-center left-1/4 right-1/4 top-[37.5%]">
            <div className="-rotate-90 flex-none h-[12px] w-[6px]">
              <div className="relative size-full" data-name="Vector">
                <div className="absolute inset-[-8.84%_-17.68%]">
                  <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 8.12132 14.1213">
                    <path d={svgPaths.p5cbda00} id="Vector" stroke="var(--stroke-0, #616D79)" strokeLinecap="square" strokeWidth="1.5" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div aria-hidden="true" className="absolute border border-[#c3c7cc] border-solid inset-0 pointer-events-none rounded-[4px]" />
    </div>
  );
}

function Content4() {
  return (
    <div className="bg-[#ff4d00] content-stretch flex gap-[4px] h-[40px] items-center justify-center overflow-clip px-[16px] relative rounded-[4px] shrink-0" data-name="content">
      <div className="overflow-clip relative shrink-0 size-[24px]" data-name="plus">
        <div className="absolute inset-[22.49%_23.73%_24.96%_23.73%]" data-name="plus">
          <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12.611 12.611">
            <path d={svgPaths.p28c07a00} fill="var(--fill-0, white)" id="plus" />
          </svg>
        </div>
      </div>
      <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[16px] text-center text-white whitespace-nowrap">
        <p className="leading-[22px]">{`Add User `}</p>
      </div>
    </div>
  );
}

function Frame2() {
  return (
    <div className="content-stretch flex gap-[12px] items-center relative shrink-0">
      <div className="content-stretch flex flex-col h-[44px] items-center justify-center py-[2px] relative shrink-0" data-name="Button">
        <Content1 />
      </div>
      <div className="content-stretch flex flex-col h-[44px] items-center justify-center py-[2px] relative shrink-0" data-name="Button">
        <Content2 />
      </div>
      <div className="content-stretch flex flex-col h-[44px] items-center justify-center py-[2px] relative shrink-0" data-name="Button">
        <Content3 />
      </div>
      <div className="content-stretch flex flex-col h-[44px] items-center justify-center py-[2px] relative shrink-0" data-name="Button">
        <Content4 />
      </div>
    </div>
  );
}

function TableItemRowItem1() {
  return (
    <div className="content-stretch flex flex-[1_0_0] h-[44px] items-center justify-between min-h-px min-w-px py-[4px] relative" data-name="Table Item / Row Item">
      <Frame3 />
      <Frame2 />
    </div>
  );
}

function Row1() {
  return (
    <div className="bg-[#f0f0f0] h-[56px] relative shrink-0 w-full" data-name="Row">
      <div aria-hidden="true" className="absolute border-[#d9d9d9] border-b border-solid inset-0 pointer-events-none" />
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex items-center justify-between px-[48px] relative size-full">
          <TableItemRowItem1 />
        </div>
      </div>
    </div>
  );
}

function Content5() {
  return (
    <div className="content-stretch flex gap-[8px] items-center overflow-clip px-[12px] relative shrink-0" data-name="Content">
      <div className="flex flex-col font-['Inter:Semi_Bold',sans-serif] font-semibold justify-center leading-[0] not-italic relative shrink-0 text-[#262626] text-[14px] whitespace-nowrap">
        <p className="leading-[20px]">Group by:</p>
      </div>
    </div>
  );
}

function Content6() {
  return (
    <div className="content-stretch flex items-center overflow-clip pr-[12px] relative shrink-0" data-name="Content">
      <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[#262626] text-[16px] whitespace-nowrap">
        <p className="leading-[22px]">Drag a column here and drop it here to group by that column</p>
      </div>
    </div>
  );
}

function Frame7() {
  return (
    <div className="content-stretch flex items-center relative shrink-0 w-[450px]">
      <Content6 />
    </div>
  );
}

function Frame4() {
  return (
    <div className="content-stretch flex gap-[8px] items-center relative shrink-0">
      <Content5 />
      <Frame7 />
    </div>
  );
}

function Frame6() {
  return <div className="content-stretch flex gap-[4px] items-center shrink-0" />;
}

function TableItemRowItem2() {
  return (
    <div className="flex-[1_0_0] h-[44px] min-h-px min-w-px relative" data-name="Table Item / Row Item">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex items-center justify-between pl-[24px] pr-[48px] py-[4px] relative size-full">
          <Frame4 />
          <Frame6 />
        </div>
      </div>
    </div>
  );
}

function Row2() {
  return (
    <div className="bg-[#f0f0f0] content-stretch flex h-[56px] items-center relative shrink-0 w-full" data-name="Row">
      <div aria-hidden="true" className="absolute border-[#d9d9d9] border-b border-solid inset-0 pointer-events-none" />
      <TableItemRowItem2 />
    </div>
  );
}

function TableItemHeaderItem() {
  return (
    <div className="h-full relative shrink-0 w-[48px]" data-name="Table Item / Header Item">
      <div className="flex flex-col justify-center size-full">
        <div className="size-full" />
      </div>
    </div>
  );
}

function DividerLine() {
  return <div className="bg-[#d9d9d9] flex-[1_0_0] min-h-px min-w-px rounded-[1px] w-[2px]" data-name="Divider Line" />;
}

function Divider() {
  return (
    <div className="h-full relative shrink-0 w-[2px]" data-name="Divider">
      <div className="flex flex-col items-center justify-center overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex flex-col items-center justify-center py-[4px] relative size-full">
          <DividerLine />
        </div>
      </div>
    </div>
  );
}

function Content7() {
  return (
    <div className="content-stretch flex items-center overflow-clip px-[12px] relative shrink-0" data-name="Content">
      <div className="flex flex-col font-['Inter:Semi_Bold',sans-serif] font-semibold justify-center leading-[0] not-italic relative shrink-0 text-[#262626] text-[16px] whitespace-nowrap">
        <p className="leading-[24px]">User</p>
      </div>
    </div>
  );
}

function Group23() {
  return (
    <div className="absolute inset-[12.5%_12.5%_12.5%_57.5%]">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 4.79999 12">
        <g id="Group 212">
          <path d={svgPaths.p1f77ff0} fill="var(--fill-0, #384857)" id="Vector" />
          <path d={svgPaths.p2419c080} fill="var(--fill-0, #384857)" id="Vector_2" />
        </g>
      </svg>
    </div>
  );
}

function Group18() {
  return (
    <div className="absolute inset-[12.5%_57.5%_12.5%_12.5%]">
      <div className="absolute inset-[0_-7.37%_-5.89%_-7.37%]">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 5.5071 12.7071">
          <g id="Group 160">
            <path d={svgPaths.p2c66cb00} id="Vector 8" stroke="var(--stroke-0, #384857)" />
            <path d={svgPaths.p2bca9480} id="Vector" stroke="var(--stroke-0, #384857)" />
          </g>
        </svg>
      </div>
    </div>
  );
}

function Group5() {
  return (
    <div className="absolute contents inset-[12.5%]">
      <Group23 />
      <Group18 />
    </div>
  );
}

function TableItemHeaderItem1() {
  return (
    <div className="bg-[rgba(203,203,203,0.41)] h-full relative shrink-0 w-[380px]" data-name="Table Item / Header Item">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex items-center justify-between pr-[24px] py-[12px] relative size-full">
          <Content7 />
          <div className="overflow-clip relative shrink-0 size-[16px]" data-name="32px/app/sort-descending">
            <Group5 />
          </div>
        </div>
      </div>
    </div>
  );
}

function DividerLine1() {
  return <div className="bg-[#d9d9d9] flex-[1_0_0] min-h-px min-w-px rounded-[1px] w-[2px]" data-name="Divider Line" />;
}

function Divider1() {
  return (
    <div className="h-full relative shrink-0 w-[2px]" data-name="Divider">
      <div className="flex flex-col items-center justify-center overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex flex-col items-center justify-center py-[4px] relative size-full">
          <DividerLine1 />
        </div>
      </div>
    </div>
  );
}

function Content8() {
  return (
    <div className="content-stretch flex items-center justify-center overflow-clip px-[12px] relative shrink-0" data-name="Content">
      <div className="flex flex-col font-['Inter:Semi_Bold',sans-serif] font-semibold justify-center leading-[0] not-italic relative shrink-0 text-[#262626] text-[16px] whitespace-nowrap">
        <p className="leading-[24px]">Job Title</p>
      </div>
    </div>
  );
}

function TableItemHeaderItem2() {
  return (
    <div className="h-full relative shrink-0 w-[160px]" data-name="Table Item / Header Item">
      <div className="flex flex-col justify-center size-full">
        <div className="content-stretch flex flex-col items-start justify-center py-[12px] relative size-full">
          <Content8 />
        </div>
      </div>
    </div>
  );
}

function DividerLine2() {
  return <div className="bg-[#d9d9d9] flex-[1_0_0] min-h-px min-w-px rounded-[1px] w-[2px]" data-name="Divider Line" />;
}

function Divider2() {
  return (
    <div className="h-full relative shrink-0 w-[2px]" data-name="Divider">
      <div className="flex flex-col items-center justify-center overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex flex-col items-center justify-center py-[4px] relative size-full">
          <DividerLine2 />
        </div>
      </div>
    </div>
  );
}

function Content9() {
  return (
    <div className="content-stretch flex items-center justify-center overflow-clip px-[12px] relative shrink-0" data-name="Content">
      <div className="flex flex-col font-['Inter:Semi_Bold',sans-serif] font-semibold justify-center leading-[0] not-italic relative shrink-0 text-[#262626] text-[16px] whitespace-nowrap">
        <p className="leading-[24px]">Company</p>
      </div>
    </div>
  );
}

function TableItemHeaderItem3() {
  return (
    <div className="h-full relative shrink-0 w-[160px]" data-name="Table Item / Header Item">
      <div className="flex flex-col justify-center size-full">
        <div className="content-stretch flex flex-col items-start justify-center py-[12px] relative size-full">
          <Content9 />
        </div>
      </div>
    </div>
  );
}

function DividerLine3() {
  return <div className="bg-[#d9d9d9] flex-[1_0_0] min-h-px min-w-px rounded-[1px] w-[2px]" data-name="Divider Line" />;
}

function Divider3() {
  return (
    <div className="h-full relative shrink-0" data-name="Divider">
      <div className="flex flex-col items-center justify-center overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex flex-col h-full items-center justify-center py-[4px] relative">
          <DividerLine3 />
        </div>
      </div>
    </div>
  );
}

function Content10() {
  return (
    <div className="content-stretch flex items-center justify-center overflow-clip px-[12px] relative shrink-0" data-name="Content">
      <div className="flex flex-col font-['Inter:Semi_Bold',sans-serif] font-semibold justify-center leading-[0] not-italic relative shrink-0 text-[#262626] text-[16px] whitespace-nowrap">
        <p className="leading-[24px]">Office</p>
      </div>
    </div>
  );
}

function TableItemHeaderItem4() {
  return (
    <div className="h-full relative shrink-0 w-[180px]" data-name="Table Item / Header Item">
      <div className="flex flex-col justify-center size-full">
        <div className="content-stretch flex flex-col items-start justify-center py-[12px] relative size-full">
          <Content10 />
        </div>
      </div>
    </div>
  );
}

function DividerLine4() {
  return <div className="bg-[#d9d9d9] flex-[1_0_0] min-h-px min-w-px rounded-[1px] w-[2px]" data-name="Divider Line" />;
}

function Divider4() {
  return (
    <div className="h-full relative shrink-0" data-name="Divider">
      <div className="flex flex-col items-center justify-center overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex flex-col h-full items-center justify-center py-[4px] relative">
          <DividerLine4 />
        </div>
      </div>
    </div>
  );
}

function Content11() {
  return (
    <div className="content-stretch flex items-center justify-center overflow-clip px-[12px] relative shrink-0" data-name="Content">
      <div className="flex flex-col font-['Inter:Semi_Bold',sans-serif] font-semibold justify-center leading-[0] not-italic relative shrink-0 text-[#262626] text-[16px] whitespace-nowrap">
        <p className="leading-[24px]">Access Level - Role</p>
      </div>
    </div>
  );
}

function TableItemHeaderItem5() {
  return (
    <div className="h-full relative shrink-0 w-[228px]" data-name="Table Item / Header Item">
      <div className="flex flex-col justify-center size-full">
        <div className="content-stretch flex flex-col items-start justify-center py-[12px] relative size-full">
          <Content11 />
        </div>
      </div>
    </div>
  );
}

function DividerLine5() {
  return <div className="bg-[#d9d9d9] flex-[1_0_0] min-h-px min-w-px rounded-[1px] w-[2px]" data-name="Divider Line" />;
}

function Divider5() {
  return (
    <div className="h-full relative shrink-0" data-name="Divider">
      <div className="flex flex-col items-center justify-center overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex flex-col h-full items-center justify-center py-[4px] relative">
          <DividerLine5 />
        </div>
      </div>
    </div>
  );
}

function Content12() {
  return (
    <div className="content-stretch flex items-center justify-center overflow-clip px-[12px] relative shrink-0" data-name="Content">
      <div className="flex flex-col font-['Inter:Semi_Bold',sans-serif] font-semibold justify-center leading-[0] not-italic relative shrink-0 text-[#262626] text-[16px] whitespace-nowrap">
        <p className="leading-[24px]">Team</p>
      </div>
    </div>
  );
}

function TableItemHeaderItem6() {
  return (
    <div className="h-full relative shrink-0 w-[228px]" data-name="Table Item / Header Item">
      <div className="flex flex-col justify-center size-full">
        <div className="content-stretch flex flex-col items-start justify-center py-[12px] relative size-full">
          <Content12 />
        </div>
      </div>
    </div>
  );
}

function DividerLine6() {
  return <div className="bg-[#d9d9d9] flex-[1_0_0] min-h-px min-w-px rounded-[1px] w-[2px]" data-name="Divider Line" />;
}

function Divider6() {
  return (
    <div className="h-full relative shrink-0" data-name="Divider">
      <div className="flex flex-col items-center justify-center overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex flex-col h-full items-center justify-center py-[4px] relative">
          <DividerLine6 />
        </div>
      </div>
    </div>
  );
}

function Content13() {
  return (
    <div className="content-stretch flex items-center justify-center overflow-clip px-[12px] relative shrink-0" data-name="Content">
      <div className="flex flex-col font-['Inter:Semi_Bold',sans-serif] font-semibold justify-center leading-[0] not-italic relative shrink-0 text-[#262626] text-[16px] whitespace-nowrap">
        <p className="leading-[24px]">Status</p>
      </div>
    </div>
  );
}

function TableItemHeaderItem7() {
  return (
    <div className="flex-[1_0_0] h-full min-h-px min-w-px relative" data-name="Table Item / Header Item">
      <div className="content-stretch flex flex-col items-start justify-between py-[12px] relative size-full">
        <Content13 />
      </div>
    </div>
  );
}

function DividerLine7() {
  return <div className="bg-[#d9d9d9] flex-[1_0_0] min-h-px min-w-px rounded-[1px] w-[2px]" data-name="Divider Line" />;
}

function Divider7() {
  return (
    <div className="h-full relative shrink-0" data-name="Divider">
      <div className="flex flex-col items-center justify-center overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex flex-col h-full items-center justify-center py-[4px] relative">
          <DividerLine7 />
        </div>
      </div>
    </div>
  );
}

function Group27() {
  return (
    <div className="grid-cols-[max-content] grid-rows-[max-content] inline-grid leading-[0] place-items-start relative shrink-0">
      <div className="bg-[#616d79] col-1 h-[3px] ml-0 mt-0 row-1 w-[13px]" />
      <div className="bg-[#616d79] col-1 h-[3px] ml-0 mt-[6px] row-1 w-[13px]" />
      <div className="bg-[#616d79] col-1 h-[3px] ml-0 mt-[12px] row-1 w-[13px]" />
      <div className="bg-[#616d79] col-1 h-[3px] ml-0 mt-[18px] row-1 w-[13px]" />
      <div className="bg-[#616d79] col-1 h-[3px] ml-0 mt-[24px] row-1 w-[13px]" />
      <div className="bg-[#616d79] col-1 h-[3px] ml-[17px] mt-0 row-1 w-[13px]" />
      <div className="bg-[#616d79] col-1 h-[3px] ml-[17px] mt-[6px] row-1 w-[13px]" />
      <div className="bg-[#616d79] col-1 h-[3px] ml-[17px] mt-[12px] row-1 w-[13px]" />
      <div className="bg-[#616d79] col-1 h-[3px] ml-[17px] mt-[18px] row-1 w-[13px]" />
      <div className="bg-[#616d79] col-1 h-[3px] ml-[17px] mt-[24px] row-1 w-[13px]" />
    </div>
  );
}

function IconRegularTableList() {
  return (
    <div className="content-stretch flex flex-col items-center justify-center overflow-clip px-[3px] py-[4px] relative shrink-0" data-name="Icon/Regular/table-list">
      <Group27 />
    </div>
  );
}

function TableItemHeaderItem8() {
  return (
    <div className="h-full relative shrink-0 w-[60px]" data-name="Table Item / Header Item">
      <div className="flex flex-col justify-center size-full">
        <div className="content-stretch flex flex-col items-start justify-center p-[12px] relative size-full">
          <IconRegularTableList />
        </div>
      </div>
    </div>
  );
}

function HeaderRow() {
  return (
    <div className="bg-[#f0f0f0] content-stretch flex h-[56px] items-start relative shrink-0 w-full" data-name="Header Row">
      <div aria-hidden="true" className="absolute border-[#d9d9d9] border-b border-solid inset-0 pointer-events-none" />
      <TableItemHeaderItem />
      <Divider />
      <TableItemHeaderItem1 />
      <Divider1 />
      <TableItemHeaderItem2 />
      <Divider2 />
      <TableItemHeaderItem3 />
      <Divider3 />
      <TableItemHeaderItem4 />
      <Divider4 />
      <TableItemHeaderItem5 />
      <Divider5 />
      <TableItemHeaderItem6 />
      <Divider6 />
      <TableItemHeaderItem7 />
      <Divider7 />
      <TableItemHeaderItem8 />
    </div>
  );
}

function Padding() {
  return (
    <div className="content-stretch flex items-start p-[4px] relative rounded-[100px] shrink-0" data-name="Padding">
      <div className="overflow-clip relative shrink-0 size-[24px]" data-name="_hidden">
        <div className="absolute inset-[12.5%]" data-name="Vector">
          <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 18 18">
            <path d={svgPaths.p3370a680} fill="var(--fill-0, #5B6570)" id="Vector" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function TableItemHeaderItem9() {
  return (
    <div className="h-full relative shrink-0 w-[48px]" data-name="Table Item / Header Item">
      <div className="flex flex-col items-center justify-center size-full">
        <div className="content-stretch flex flex-col items-center justify-center px-[12px] py-[10px] relative size-full">
          <div className="content-stretch flex items-center overflow-clip relative shrink-0" data-name="Checkbox/">
            <Padding />
          </div>
        </div>
      </div>
    </div>
  );
}

function Avatar() {
  return (
    <div className="relative rounded-[200px] shrink-0 size-[40px]" data-name="Avatar">
      <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none rounded-[200px] size-full" src={imgAvatar} />
    </div>
  );
}

function Content14() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col items-start min-h-px min-w-px relative whitespace-pre-wrap" data-name="Content">
      <p className="font-['Outfit:Medium',sans-serif] font-medium leading-[20px] relative shrink-0 text-[#1d2939] text-[14px] w-full">Captain Levi</p>
      <p className="font-['Outfit:Regular',sans-serif] font-normal leading-[18px] relative shrink-0 text-[#667085] text-[12px] w-full">levi@henrichadvisory.com</p>
    </div>
  );
}

function TableCell() {
  return (
    <div className="flex-[1_0_0] h-[66px] min-h-px min-w-px relative" data-name="Table cell">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex gap-[12px] items-center px-[24px] py-[8px] relative size-full">
          <Avatar />
          <Content14 />
        </div>
      </div>
    </div>
  );
}

function TableItemHeaderItem10() {
  return (
    <div className="h-full relative shrink-0 w-[380px]" data-name="Table Item / Header Item">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex items-center justify-between pr-[24px] py-[12px] relative size-full">
          <TableCell />
          <div className="overflow-clip shrink-0 size-[16px]" data-name="32px/app/sort-descending" />
        </div>
      </div>
    </div>
  );
}

function Divider8() {
  return (
    <div className="h-full relative shrink-0 w-[2px]" data-name="Divider">
      <div className="flex flex-col items-center justify-center overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex flex-col items-center justify-center py-[4px] size-full" />
      </div>
    </div>
  );
}

function Content15() {
  return (
    <div className="content-stretch flex items-center justify-center overflow-clip px-[12px] relative shrink-0" data-name="Content">
      <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[#262626] text-[16px] whitespace-nowrap">
        <p className="leading-[24px]">VDC Manager</p>
      </div>
    </div>
  );
}

function TableItemHeaderItem11() {
  return (
    <div className="h-full relative shrink-0 w-[160px]" data-name="Table Item / Header Item">
      <div className="flex flex-col justify-center size-full">
        <div className="content-stretch flex flex-col items-start justify-center py-[12px] relative size-full">
          <Content15 />
        </div>
      </div>
    </div>
  );
}

function Divider9() {
  return (
    <div className="h-full relative shrink-0 w-[2px]" data-name="Divider">
      <div className="flex flex-col items-center justify-center overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex flex-col items-center justify-center py-[4px] size-full" />
      </div>
    </div>
  );
}

function Divider10() {
  return (
    <div className="h-full relative shrink-0" data-name="Divider">
      <div className="flex flex-col items-center justify-center overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex flex-col h-full items-center justify-center py-[4px]" />
      </div>
    </div>
  );
}

function Content16() {
  return (
    <div className="content-stretch flex items-center justify-center overflow-clip px-[12px] relative shrink-0" data-name="Content">
      <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[#262626] text-[16px] whitespace-nowrap">
        <p className="leading-[24px]">Henrich Advisory</p>
      </div>
    </div>
  );
}

function TableItemHeaderItem12() {
  return (
    <div className="h-full relative shrink-0 w-[160px]" data-name="Table Item / Header Item">
      <div className="flex flex-col justify-center size-full">
        <div className="content-stretch flex flex-col items-start justify-center py-[12px] relative size-full">
          <Content16 />
        </div>
      </div>
    </div>
  );
}

function Divider11() {
  return (
    <div className="h-full relative shrink-0" data-name="Divider">
      <div className="flex flex-col items-center justify-center overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex flex-col h-full items-center justify-center py-[4px]" />
      </div>
    </div>
  );
}

function Content17() {
  return (
    <div className="content-stretch flex items-center justify-center overflow-clip px-[12px] relative shrink-0" data-name="Content">
      <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[#262626] text-[16px] whitespace-nowrap">
        <p className="leading-[24px]">Boston</p>
      </div>
    </div>
  );
}

function TableItemHeaderItem13() {
  return (
    <div className="h-full relative shrink-0 w-[180px]" data-name="Table Item / Header Item">
      <div className="flex flex-col justify-center size-full">
        <div className="content-stretch flex flex-col items-start justify-center py-[12px] relative size-full">
          <Content17 />
        </div>
      </div>
    </div>
  );
}

function Divider12() {
  return (
    <div className="h-full relative shrink-0" data-name="Divider">
      <div className="flex flex-col items-center justify-center overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex flex-col h-full items-center justify-center py-[4px]" />
      </div>
    </div>
  );
}

function Content18() {
  return (
    <div className="content-stretch flex items-center justify-center overflow-clip px-[12px] relative shrink-0" data-name="Content">
      <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[#262626] text-[16px] whitespace-nowrap">
        <p className="leading-[24px]">Project Manager</p>
      </div>
    </div>
  );
}

function TableItemHeaderItem14() {
  return (
    <div className="h-full relative shrink-0 w-[228px]" data-name="Table Item / Header Item">
      <div className="flex flex-col justify-center size-full">
        <div className="content-stretch flex flex-col items-start justify-center py-[12px] relative size-full">
          <Content18 />
        </div>
      </div>
    </div>
  );
}

function Favicon() {
  return (
    <div className="bg-[#dde9ff] mr-[-8px] overflow-clip relative rounded-[28px] shrink-0 size-[40px]" data-name="Favicon">
      <p className="-translate-x-1/2 absolute font-['Outfit:SemiBold',sans-serif] font-semibold leading-[18px] left-[calc(50%+0.5px)] text-[#465fff] text-[12px] text-center top-[calc(50%-9px)]">AR</p>
    </div>
  );
}

function Favicon1() {
  return (
    <div className="bg-[#fdf2fa] mr-[-8px] overflow-clip relative rounded-[28px] shrink-0 size-[40px]" data-name="Favicon">
      <p className="-translate-x-1/2 absolute font-['Outfit:SemiBold',sans-serif] font-semibold leading-[18px] left-1/2 text-[#dd2590] text-[12px] text-center top-[calc(50%-9px)]">SC</p>
    </div>
  );
}

function Content19() {
  return (
    <div className="content-stretch flex items-center justify-center overflow-clip pl-[12px] pr-[20px] relative shrink-0" data-name="Content">
      <Favicon />
      <Favicon1 />
    </div>
  );
}

function TableItemHeaderItem15() {
  return (
    <div className="h-full relative shrink-0 w-[228px]" data-name="Table Item / Header Item">
      <div className="flex flex-col justify-center size-full">
        <div className="content-stretch flex flex-col items-start justify-center py-[12px] relative size-full">
          <Content19 />
        </div>
      </div>
    </div>
  );
}

function Divider13() {
  return (
    <div className="h-full relative shrink-0" data-name="Divider">
      <div className="flex flex-col items-center justify-center overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex flex-col h-full items-center justify-center py-[4px]" />
      </div>
    </div>
  );
}

function Content20() {
  return (
    <div className="content-stretch flex items-center justify-center overflow-clip px-[12px] relative shrink-0" data-name="Content">
      <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[#262626] text-[16px] whitespace-nowrap">
        <p className="leading-[24px]">Active</p>
      </div>
    </div>
  );
}

function TableItemHeaderItem16() {
  return (
    <div className="flex-[1_0_0] h-full min-h-px min-w-px relative" data-name="Table Item / Header Item">
      <div className="content-stretch flex flex-col items-start justify-between py-[12px] relative size-full">
        <Content20 />
      </div>
    </div>
  );
}

function Divider14() {
  return (
    <div className="h-full relative shrink-0" data-name="Divider">
      <div className="flex flex-col items-center justify-center overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex flex-col h-full items-center justify-center py-[4px]" />
      </div>
    </div>
  );
}

function TableItemHeaderItem17() {
  return (
    <div className="h-full relative shrink-0 w-[60px]" data-name="Table Item / Header Item">
      <div className="flex flex-col items-center justify-center size-full">
        <div className="content-stretch flex flex-col items-center justify-center p-[12px] relative size-full">
          <div className="overflow-clip relative shrink-0 size-[24px]" data-name="24px/app/ellipsis-vertical">
            <div className="absolute flex inset-[6.94%_43.06%_9.72%_43.06%] items-center justify-center">
              <div className="-rotate-90 flex-none h-[3.333px] w-[20px]">
                <div className="relative size-full" data-name="Vector">
                  <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 3.33333">
                    <path d={svgPaths.p2fca5e70} fill="var(--fill-0, #616D79)" id="Vector" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function HeaderRow1() {
  return (
    <div className="content-stretch flex h-[66px] items-start relative shrink-0 w-full" data-name="Header Row">
      <div aria-hidden="true" className="absolute border-[#d9d9d9] border-b border-solid inset-0 pointer-events-none" />
      <TableItemHeaderItem9 />
      <TableItemHeaderItem10 />
      <Divider8 />
      <TableItemHeaderItem11 />
      <Divider9 />
      <Divider10 />
      <TableItemHeaderItem12 />
      <Divider11 />
      <TableItemHeaderItem13 />
      <Divider12 />
      <TableItemHeaderItem14 />
      <TableItemHeaderItem15 />
      <Divider13 />
      <TableItemHeaderItem16 />
      <Divider14 />
      <TableItemHeaderItem17 />
    </div>
  );
}

function PaginationWithTotalNumber() {
  return (
    <div className="flex-[1_0_0] min-h-px min-w-px relative w-full" data-name="Pagination with total number">
      <div className="flex flex-row items-center size-full">
        <div className="size-full" />
      </div>
    </div>
  );
}

function Content21() {
  return (
    <div className="absolute content-stretch flex items-center justify-center left-0 p-[12px] rounded-[8px] size-[40px] top-0" data-name="Content">
      <p className="font-['Outfit:Medium',sans-serif] font-medium leading-[20px] relative shrink-0 text-[14px] text-center text-white">1</p>
    </div>
  );
}

function PaginationNumberBase() {
  return (
    <div className="bg-[#ff4d00] overflow-clip relative rounded-[8px] shrink-0 size-[40px]" data-name="_Pagination number base">
      <Content21 />
    </div>
  );
}

function Content22() {
  return (
    <div className="absolute content-stretch flex items-center justify-center left-0 p-[12px] rounded-[8px] size-[40px] top-0" data-name="Content">
      <p className="font-['Outfit:Medium',sans-serif] font-medium leading-[20px] relative shrink-0 text-[#243746] text-[14px] text-center">2</p>
    </div>
  );
}

function PaginationNumberBase1() {
  return (
    <div className="overflow-clip relative rounded-[8px] shrink-0 size-[40px]" data-name="_Pagination number base">
      <Content22 />
    </div>
  );
}

function Content23() {
  return (
    <div className="absolute content-stretch flex items-center justify-center left-0 p-[12px] rounded-[8px] size-[40px] top-0" data-name="Content">
      <p className="font-['Outfit:Medium',sans-serif] font-medium leading-[20px] relative shrink-0 text-[#243746] text-[14px] text-center">3</p>
    </div>
  );
}

function PaginationNumberBase2() {
  return (
    <div className="overflow-clip relative rounded-[8px] shrink-0 size-[40px]" data-name="_Pagination number base">
      <Content23 />
    </div>
  );
}

function Content24() {
  return (
    <div className="absolute content-stretch flex items-center justify-center left-0 p-[12px] rounded-[8px] size-[40px] top-0" data-name="Content">
      <p className="font-['Outfit:Medium',sans-serif] font-medium leading-[20px] relative shrink-0 text-[#243746] text-[14px] text-center">...</p>
    </div>
  );
}

function PaginationNumberBase3() {
  return (
    <div className="overflow-clip relative rounded-[8px] shrink-0 size-[40px]" data-name="_Pagination number base">
      <Content24 />
    </div>
  );
}

function Content25() {
  return (
    <div className="absolute content-stretch flex items-center justify-center left-0 p-[12px] rounded-[8px] size-[40px] top-0" data-name="Content">
      <p className="font-['Outfit:Medium',sans-serif] font-medium leading-[20px] relative shrink-0 text-[#243746] text-[14px] text-center">8</p>
    </div>
  );
}

function PaginationNumberBase4() {
  return (
    <div className="overflow-clip relative rounded-[8px] shrink-0 size-[40px]" data-name="_Pagination number base">
      <Content25 />
    </div>
  );
}

function Content26() {
  return (
    <div className="absolute content-stretch flex items-center justify-center left-0 p-[12px] rounded-[8px] size-[40px] top-0" data-name="Content">
      <p className="font-['Outfit:Medium',sans-serif] font-medium leading-[20px] relative shrink-0 text-[#243746] text-[14px] text-center">9</p>
    </div>
  );
}

function PaginationNumberBase5() {
  return (
    <div className="overflow-clip relative rounded-[8px] shrink-0 size-[40px]" data-name="_Pagination number base">
      <Content26 />
    </div>
  );
}

function Content27() {
  return (
    <div className="absolute content-stretch flex items-center justify-center left-0 p-[12px] rounded-[8px] size-[40px] top-0" data-name="Content">
      <p className="font-['Outfit:Medium',sans-serif] font-medium leading-[20px] relative shrink-0 text-[#243746] text-[14px] text-center">10</p>
    </div>
  );
}

function PaginationNumberBase6() {
  return (
    <div className="overflow-clip relative rounded-[8px] shrink-0 size-[40px]" data-name="_Pagination number base">
      <Content27 />
    </div>
  );
}

function PaginationNumbers() {
  return (
    <div className="content-stretch flex gap-[2px] items-start relative shrink-0" data-name="Pagination numbers">
      <PaginationNumberBase />
      <PaginationNumberBase1 />
      <PaginationNumberBase2 />
      <PaginationNumberBase3 />
      <PaginationNumberBase4 />
      <PaginationNumberBase5 />
      <PaginationNumberBase6 />
    </div>
  );
}

function PaginationWithTotalNumber1() {
  return (
    <div className="relative shrink-0 w-full" data-name="Pagination with total number">
      <div aria-hidden="true" className="absolute border-[#dedede] border-solid border-t inset-0 pointer-events-none" />
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex items-center justify-between pl-[18px] relative w-full">
          <p className="font-['Outfit:Medium',sans-serif] font-medium leading-[20px] relative shrink-0 text-[#667085] text-[14px]">Showing 1 to 10 of 57 entries</p>
          <div className="content-stretch flex gap-[12px] items-center p-[16px] relative shrink-0" data-name="Pagination">
            <div className="bg-white opacity-50 relative rounded-[8px] shrink-0 size-[40px]" data-name="Button">
              <div className="content-stretch flex gap-[8px] items-center justify-center overflow-clip px-[14px] py-[8px] relative rounded-[inherit] size-full">
                <div className="relative shrink-0 size-[20px]" data-name="long-arrow-left">
                  <div className="absolute bottom-1/4 left-[16.67%] right-[16.66%] top-1/4" data-name="Icon">
                    <div className="absolute inset-[-7.5%_-5.62%]">
                      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14.8345 11.5">
                        <path d={svgPaths.p2d0593c0} id="Icon" stroke="var(--stroke-0, #344054)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
              <div aria-hidden="true" className="absolute border border-[#d0d5dd] border-solid inset-0 pointer-events-none rounded-[8px] shadow-[0px_1px_2px_0px_rgba(16,24,40,0.05)]" />
            </div>
            <PaginationNumbers />
            <div className="bg-white relative rounded-[8px] shrink-0 size-[40px]" data-name="Button">
              <div className="content-stretch flex gap-[8px] items-center justify-center overflow-clip px-[14px] py-[8px] relative rounded-[inherit] size-full">
                <div className="relative shrink-0 size-[20px]" data-name="long-arrow-right">
                  <div className="absolute bottom-1/4 left-[16.67%] right-[16.66%] top-1/4" data-name="Icon">
                    <div className="absolute inset-[-7.5%_-5.62%]">
                      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14.8345 11.5">
                        <path d={svgPaths.p36164580} id="Icon" stroke="var(--stroke-0, #344054)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
              <div aria-hidden="true" className="absolute border border-[#d0d5dd] border-solid inset-0 pointer-events-none rounded-[8px] shadow-[0px_1px_2px_0px_rgba(16,24,40,0.05)]" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function ContainerBackgroundColor() {
  return (
    <div className="bg-[#fafafa] flex-[1_0_0] min-h-px min-w-px relative rounded-[8px] w-full" data-name="Container+BackgroundColor">
      <div className="content-stretch flex flex-col items-start overflow-clip relative rounded-[inherit] size-full">
        <Row1 />
        <Row2 />
        <HeaderRow />
        <HeaderRow1 />
        <PaginationWithTotalNumber />
        <PaginationWithTotalNumber1 />
      </div>
      <div aria-hidden="true" className="absolute border border-[#dedede] border-solid inset-0 pointer-events-none rounded-[8px]" />
    </div>
  );
}

function Frame5() {
  return (
    <div className="flex-[1_0_0] min-h-px min-w-px relative w-full z-[2]">
      <div className="content-stretch flex flex-col items-start p-[12px] relative size-full">
        <ContainerBackgroundColor />
      </div>
    </div>
  );
}

function Chevron() {
  return (
    <div className="h-[12px] relative shrink-0 w-[9px]" data-name="Chevron">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 9 12">
        <g id="Chevron">
          <rect fill="var(--fill-0, #BFBFBF)" height="12" rx="2" width="9" />
          <path d={svgPaths.p575a000} fill="var(--fill-0, #F2F3F4)" id="Icon" />
        </g>
      </svg>
    </div>
  );
}

function MasterSliderFill() {
  return <div className="bg-white h-[12px] rounded-[6px] shrink-0 w-[1200px]" data-name="master/slider/fill" />;
}

function Chevron1() {
  return (
    <div className="h-[12px] relative w-[9px]" data-name="Chevron">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 9 12">
        <g id="Chevron">
          <rect fill="var(--fill-0, #BFBFBF)" height="12" rx="2" width="9" />
          <path d={svgPaths.p575a000} fill="var(--fill-0, #F2F3F4)" id="Icon" />
        </g>
      </svg>
    </div>
  );
}

function Row3() {
  return (
    <div className="bg-[#f0f0f0] col-1 content-stretch flex h-[12px] items-center justify-between ml-0 mt-0 relative row-1 w-[1864px]" data-name="Row">
      <div aria-hidden="true" className="absolute border-[#d9d9d9] border-b border-solid inset-0 pointer-events-none" />
      <Chevron />
      <MasterSliderFill />
      <div className="flex items-center justify-center relative shrink-0">
        <div className="flex-none rotate-180">
          <Chevron1 />
        </div>
      </div>
    </div>
  );
}

function Content28() {
  return (
    <div className="content-stretch flex items-center overflow-clip px-[12px] relative shrink-0" data-name="Content">
      <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[#262626] text-[16px] whitespace-nowrap">
        <p className="leading-[22px]">1 item(s) selected</p>
      </div>
    </div>
  );
}

function Frame9() {
  return (
    <div className="content-stretch flex items-center relative shrink-0 w-[450px]">
      <Content28 />
    </div>
  );
}

function Frame8() {
  return (
    <div className="content-stretch flex items-center px-[12px] relative shrink-0 w-[1090px]">
      <Frame9 />
    </div>
  );
}

function Frame11() {
  return <div className="h-[32px] shrink-0 w-[450px]" />;
}

function Frame10() {
  return (
    <div className="content-stretch flex items-center px-[12px] relative shrink-0">
      <Frame11 />
    </div>
  );
}

function TableItemRowItem3() {
  return (
    <div className="content-stretch flex flex-[1_0_0] h-[44px] items-center min-h-px min-w-px py-[4px] relative" data-name="Table Item / Row Item">
      <Frame8 />
      <Frame10 />
    </div>
  );
}

function Row4() {
  return (
    <div className="bg-[#f0f0f0] col-1 content-stretch flex h-[36px] items-center ml-0 mt-[12px] relative row-1 w-[1864px]" data-name="Row">
      <div aria-hidden="true" className="absolute border-[#d9d9d9] border-b border-solid inset-0 pointer-events-none" />
      <TableItemRowItem3 />
    </div>
  );
}

function Group24() {
  return (
    <div className="grid-cols-[max-content] grid-rows-[max-content] inline-grid leading-[0] place-items-start relative shrink-0 w-full z-[1]">
      <Row3 />
      <Row4 />
    </div>
  );
}

function ToolBody() {
  return (
    <div className="bg-white content-stretch flex flex-[1_0_0] flex-col h-[1018px] isolate items-center min-h-px min-w-px overflow-clip relative" data-name="Tool Body">
      <LeftNavOpt />
      <Row />
      <Frame5 />
      <Group24 />
    </div>
  );
}

function MainBody() {
  return (
    <div className="bg-[#f2f3f4] content-start flex flex-[1_0_0] flex-wrap gap-0 items-start min-h-px min-w-px overflow-clip relative w-full" data-name="Main body">
      <Ul />
      <ToolBody />
    </div>
  );
}

function Group6() {
  return (
    <div className="absolute inset-[8.33%]">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g id="Group 132">
          <g id="Union">
            <mask fill="white" id="path-1-inside-1_1_4320">
              <path d={svgPaths.p1c911a00} />
            </mask>
            <path d={svgPaths.p279659c0} fill="var(--stroke-0, #FF4D00)" mask="url(#path-1-inside-1_1_4320)" />
          </g>
          <path d={svgPaths.p204ebc11} id="Ellipse 43" stroke="var(--stroke-0, #FF4D00)" strokeWidth="1.5" />
        </g>
      </svg>
    </div>
  );
}

function LeftContent16() {
  return (
    <div className="content-stretch flex flex-col items-start min-w-[56px] px-[4px] relative shrink-0" data-name="Left Content">
      <div className="overflow-clip relative shrink-0 size-[24px]" data-name="24px/app/settings">
        <Group6 />
      </div>
    </div>
  );
}

function LeftContent15() {
  return (
    <div className="content-stretch flex flex-col items-start min-w-[56px] relative shrink-0" data-name="Left Content">
      <LeftContent16 />
    </div>
  );
}

function ListItemText6() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col items-start min-h-px min-w-px py-[4px] relative" data-name="ListItem Text">
      <p className="font-['Open_Sans:SemiBold',sans-serif] font-semibold leading-[normal] relative shrink-0 text-[20px] text-white tracking-[-0.4px] w-full whitespace-pre-wrap" style={{ fontVariationSettings: "'wdth' 100" }}>
        Project Settings
      </p>
    </div>
  );
}

function Container9() {
  return (
    <div className="relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-row items-center overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex items-center px-[16px] py-[8px] relative w-full">
          <LeftContent15 />
          <ListItemText6 />
          <div className="content-stretch flex flex-col items-center justify-center overflow-clip p-[5px] relative rounded-[100px] shrink-0" data-name="Right Action">
            <div className="content-stretch flex items-start shrink-0" data-name="Icon" />
          </div>
        </div>
      </div>
    </div>
  );
}

function ListItem9() {
  return (
    <div className="content-stretch flex flex-col items-start overflow-clip relative rounded-[4px] shrink-0 w-full" data-name="<ListItem>">
      <Container9 />
    </div>
  );
}

function Files() {
  return (
    <div className="col-1 content-stretch flex flex-col items-start ml-0 mt-0 relative row-1 w-[280px]" data-name="Files">
      <ListItem9 />
    </div>
  );
}

function Group25() {
  return (
    <div className="grid-cols-[max-content] grid-rows-[max-content] inline-grid leading-[0] place-items-start relative shrink-0">
      <Files />
    </div>
  );
}

function Frame1() {
  return (
    <div className="content-stretch flex items-center relative shrink-0 w-[876px]">
      <Group25 />
    </div>
  );
}

function InertiaAi1() {
  return (
    <div className="h-[35px] relative shrink-0 w-[27.77px]" data-name="Inertia AI">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 27.7697 35">
        <g id="Inertia AI">
          <path d={svgPaths.p3a58b200} fill="var(--fill-0, #FF4D00)" id="Vector" />
          <path d={svgPaths.pa17be00} fill="var(--fill-0, #FF4D00)" id="Vector_2" />
          <path d={svgPaths.p2ba2fc00} fill="var(--fill-0, #BFBFBF)" id="Subtract" />
          <path d={svgPaths.pa4fe3c0} fill="var(--fill-0, #BFBFBF)" id="Subtract_2" />
          <path d={svgPaths.pf332b72} fill="var(--fill-0, #BFBFBF)" id="Subtract_3" />
        </g>
      </svg>
    </div>
  );
}

function InertiaAi() {
  return (
    <div className="content-stretch flex items-center justify-center overflow-clip relative shrink-0 size-[40px]" data-name="Inertia AI">
      <InertiaAi1 />
    </div>
  );
}

function Component5E424Fffe728656713Abd094LogoHorizontalComboPrimaryOrangeConcreteCopy() {
  return (
    <div className="h-[49.251px] overflow-clip relative shrink-0 w-[156px]" data-name="5e424fffe728656713abd094_logo-horizontal-combo-primary-orange-concrete copy 1">
      <div className="absolute h-[29px] left-[-3px] top-[11.63px] w-[163px]" data-name="satpon 1">
        <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgSatpon1} />
      </div>
    </div>
  );
}

function InertiaLogo() {
  return (
    <div className="content-stretch flex h-[48px] items-center justify-center opacity-44 relative shrink-0 w-[144px]" data-name="Inertia Logo">
      <Component5E424Fffe728656713Abd094LogoHorizontalComboPrimaryOrangeConcreteCopy />
    </div>
  );
}

function MaskGroup() {
  return (
    <div className="grid-cols-[max-content] grid-rows-[max-content] inline-grid leading-[0] place-items-start relative shrink-0" data-name="Mask Group">
      <div className="col-1 h-[43.776px] mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[-17px_-8.946px] mask-size-[80px_80px] ml-0 mt-[-3.05px] relative row-1 w-[44.585px]" data-name="shutterstock_685654954 1" style={{ maskImage: `url('${imgShutterstock6856549541}')` }}>
        <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgAvatar} />
      </div>
    </div>
  );
}

function Avatar1() {
  return (
    <div className="bg-black content-stretch flex gap-[16px] h-[48px] items-center px-[6px] relative rounded-[4px] shrink-0 w-[216px]" data-name="Avatar">
      <div aria-hidden="true" className="absolute border border-[#75808b] border-solid inset-0 pointer-events-none rounded-[4px]" />
      <InertiaLogo />
      <MaskGroup />
    </div>
  );
}

function Frame12() {
  return (
    <div className="absolute left-[87.96px] size-[18px] top-[4.5px]">
      <div className="absolute h-[16.525px] left-[0.16px] top-[0.74px] w-[17.239px]">
        <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 17.2391 16.5254">
          <ellipse cx="8.61956" cy="8.2627" fill="var(--fill-0, #5BD7AA)" id="Ellipse 4" rx="8.61956" ry="8.2627" />
        </svg>
      </div>
      <p className="-translate-x-full absolute font-['Roboto:Bold',sans-serif] font-bold h-[11.568px] leading-[normal] left-[12.19px] text-[12px] text-right text-white top-[3.22px] tracking-[0.12px] w-[6.034px] whitespace-pre-wrap" style={{ fontVariationSettings: "'wdth' 100" }}>
        9
      </p>
    </div>
  );
}

function Group26() {
  return (
    <div className="absolute contents left-[87.96px] top-[4.5px]">
      <Frame12 />
    </div>
  );
}

function LeftIcons() {
  return (
    <div className="content-stretch flex gap-[16px] h-[48px] items-center px-[12px] relative rounded-[2px] shrink-0 w-[408px]" data-name="Left Icons">
      <InertiaAi />
      <div className="overflow-clip relative shrink-0 size-[36px]" data-name="bell">
        <div className="absolute inset-[15.87%_19.55%_18.34%_19.55%]" data-name="bell">
          <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 21.9224 23.6853">
            <path d={svgPaths.p10fb2100} fill="var(--fill-0, white)" id="bell" />
          </svg>
        </div>
      </div>
      <div className="overflow-clip relative shrink-0 size-[36px]" data-name="questionmark.circle.fill">
        <div className="absolute inset-[16.34%_17.57%_18.81%_17.57%]" data-name="questionmark.circle.fill">
          <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 23.3463 23.3463">
            <path d={svgPaths.p32e50f00} fill="var(--fill-0, white)" id="questionmark.circle.fill" />
          </svg>
        </div>
      </div>
      <Avatar1 />
      <Group26 />
    </div>
  );
}

function AccountNaigator() {
  return (
    <div className="bg-[#243746] content-stretch flex h-[60px] items-center justify-between pr-[12px] relative shadow-[0px_4px_0px_0px_#f0f0f3] shrink-0 w-[1920px]" data-name="Account Naigator">
      <Frame1 />
      <LeftIcons />
    </div>
  );
}

export default function Desktop1920X() {
  return (
    <div className="bg-[#f5f5f5] relative size-full" data-name="Desktop - 1920 x 1125">
      <div className="content-stretch flex flex-col gap-[2px] items-start relative size-full">
        <MainBody />
        <AccountNaigator />
      </div>
      <div aria-hidden="true" className="absolute border border-black border-solid inset-0 pointer-events-none" />
    </div>
  );
}