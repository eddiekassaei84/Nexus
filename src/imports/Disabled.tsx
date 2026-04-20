function RadioButton() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="Radio Button">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="Radio Button">
          <circle cx="8" cy="8" fill="var(--fill-0, #F5F5F5)" id="Plate" r="7.5" stroke="var(--stroke-0, #BFBFBF)" />
        </g>
      </svg>
    </div>
  );
}

export default function Disabled() {
  return (
    <div className="content-stretch flex gap-[8px] items-center relative size-full" data-name="disabled">
      <RadioButton />
    </div>
  );
}