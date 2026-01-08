import React from "react";
import { PinDef } from "./pinData";

interface PinInfoProps {
  pin?: PinDef | null;
}

const PinInfo: React.FC<PinInfoProps> = ({ pin }) => {
  if (!pin) {
    return (
      <div className="w-64 p-4 rounded-lg border border-border bg-card text-sm text-muted-foreground">
        <div className="font-medium text-foreground mb-1">Hover a pin to see details</div>
        <div className="text-xs">Pin name and short function appear here.</div>
      </div>
    );
  }

  return (
    <div className="w-64 p-4 rounded-lg border border-border bg-card text-sm text-muted-foreground">
      <div className="font-semibold text-foreground mb-1">{pin.pinName}</div>
      <div className="text-xs leading-relaxed">{pin.description}</div>
      <div className="mt-3 text-[11px] text-muted-foreground">Pin {pin.pinNumber}</div>
    </div>
  );
};

export default PinInfo;
