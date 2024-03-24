interface IMacroSummaryProps {
  title: string;
  curr: number;
  left: number;
}

export default function MacroSummary({
  title,
  curr,
  left,
}: IMacroSummaryProps) {
  let dotColor = "";
  switch (title) {
    case "Protein":
      dotColor = "bg-[#FEC32A]";
      break;
    case "Fat":
      dotColor = "bg-[#FA6060]";
      break;
    case "Carbs":
      dotColor = "bg-[#539BF8]";
      break;
    case "Sugar":
      dotColor = "bg-[#AF67F7]";
      break;
    case "Fiber":
      dotColor = "bg-[#5ec95d]";
  }
  return (
    <div className="flex flex-col">
      <div className="flex items-center gap-1">
        <div className={`rounded-full  h-1 p-1 ${dotColor}`}> </div>
        <div className="text-sm">{title}</div>
      </div>
      <div className="text-[#C3BEBE]">
        <span className="text-[9.5px] text-foreground">{curr + "g"}</span>
        <span className="text-sm"> • </span>
        <span className="text-[9.5px]">{Math.max(left, 0) + "g left"}</span>
      </div>
    </div>
  );
}
