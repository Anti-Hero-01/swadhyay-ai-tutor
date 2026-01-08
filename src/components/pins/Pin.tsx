import React from "react";
import { PinDef } from "./pinData";

interface PinProps {
  data: PinDef;
  side: "left" | "right";
  hovered: boolean;
  onHover: (pin: number | null) => void;
}

const Pin: React.FC<PinProps> = ({ data, side, hovered, onHover }) => {
  return (
    <div
      onMouseEnter={() => onHover(data.pinNumber)}
      onMouseLeave={() => onHover(null)}
      className="relative flex items-center gap-2 cursor-default"
    >
      {side === "left" ? (
        <>
          <span className={`text-xs font-mono ${hovered ? "text-primary" : "text-muted-foreground"}`}>{data.pinNumber}</span>
          <div className={`w-8 h-2 rounded-l ${hovered ? "bg-primary" : "bg-muted-foreground/50"}`} />
        </>
      ) : (
        <>
          <div className={`w-8 h-2 rounded-r ${hovered ? "bg-primary" : "bg-muted-foreground/50"}`} />
          <span className={`text-xs font-mono ${hovered ? "text-primary" : "text-muted-foreground"}`}>{data.pinNumber}</span>
        </>
      )}
    </div>
  );
};

export default Pin;
