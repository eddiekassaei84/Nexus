function ToolHeader() {
  return <div className="h-[31.997px] shrink-0 w-[109.774px]" data-name="Tool Header" />;
}

function Container() {
  return (
    <div className="bg-[#ecfdf3] content-stretch flex flex-col h-[72px] items-start justify-center pb-[1.111px] pl-[23.993px] relative shrink-0 w-[1114px]" data-name="Container">
      <div aria-hidden="true" className="absolute border-[#d9d9d9] border-b-[1.111px] border-solid inset-0 pointer-events-none" />
      <ToolHeader />
    </div>
  );
}

function UsersTable() {
  return (
    <div className="bg-[#fafafa] h-[811px] relative rounded-[8px] shrink-0 w-[1090px]" data-name="UsersTable">
      <div aria-hidden="true" className="absolute border-[#d9d9d9] border-[1.111px] border-solid inset-0 pointer-events-none rounded-[8px]" />
    </div>
  );
}

function TableContainer() {
  return (
    <div className="flex-[1_0_0] min-h-px min-w-px relative w-[1114px]" data-name="Table Container">
      <div className="overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex flex-col items-start pl-[11.997px] pt-[11.997px] relative size-full">
          <UsersTable />
        </div>
      </div>
    </div>
  );
}

function MainConvas() {
  return (
    <div className="h-full relative shrink-0" data-name="MainConvas">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col h-full items-start relative">
        <Container />
        <TableContainer />
      </div>
    </div>
  );
}

function SidePanel() {
  return <div className="bg-[#2a85d9] h-[907px] shrink-0 w-[370px]" data-name="Side Panel" />;
}

export default function MainContentSidePanelClosed() {
  return (
    <div className="bg-white content-stretch flex items-end justify-center relative size-full" data-name="MainContent-SidePanel Closed">
      <MainConvas />
      <SidePanel />
    </div>
  );
}