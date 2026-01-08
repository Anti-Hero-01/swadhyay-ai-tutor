export interface PinDef {
  pinNumber: number;
  pinName: string;
  description: string;
}

export const pinData: PinDef[] = [
  { pinNumber: 1, pinName: "P1.0", description: "Port 1. Bit 0 — general-purpose I/O." },
  { pinNumber: 2, pinName: "P1.1", description: "Port 1. Bit 1 — general-purpose I/O." },
  { pinNumber: 3, pinName: "P1.2", description: "Port 1. Bit 2 — general-purpose I/O." },
  { pinNumber: 4, pinName: "P1.3", description: "Port 1. Bit 3 — general-purpose I/O." },
  { pinNumber: 5, pinName: "P1.4", description: "Port 1. Bit 4 — general-purpose I/O." },
  { pinNumber: 6, pinName: "P1.5", description: "Port 1. Bit 5 — general-purpose I/O." },
  { pinNumber: 7, pinName: "P1.6", description: "Port 1. Bit 6 — general-purpose I/O." },
  { pinNumber: 8, pinName: "P1.7", description: "Port 1. Bit 7 — general-purpose I/O." },
  { pinNumber: 9, pinName: "RST", description: "Reset input. A high on this pin resets the microcontroller." },
  { pinNumber: 10, pinName: "P3.0 (RXD)", description: "Serial receiver (RXD) — also P3.0 general-purpose I/O." },
  { pinNumber: 11, pinName: "P3.1 (TXD)", description: "Serial transmitter (TXD) — also P3.1 general-purpose I/O." },
  { pinNumber: 12, pinName: "P3.2 (INT0)", description: "External interrupt 0 (INT0) — also P3.2 I/O." },
  { pinNumber: 13, pinName: "P3.3 (INT1)", description: "External interrupt 1 (INT1) — also P3.3 I/O." },
  { pinNumber: 14, pinName: "P3.4 (T0)", description: "Timer 0 external input (T0) — also P3.4 I/O." },
  { pinNumber: 15, pinName: "P3.5 (T1)", description: "Timer 1 external input (T1) — also P3.5 I/O." },
  { pinNumber: 16, pinName: "P3.6 (WR)", description: "External memory write strobe (WR) — also P3.6 I/O." },
  { pinNumber: 17, pinName: "P3.7 (RD)", description: "External memory read strobe (RD) — also P3.7 I/O." },
  { pinNumber: 18, pinName: "XTAL2", description: "Crystal oscillator output (connect to external resonator)." },
  { pinNumber: 19, pinName: "XTAL1", description: "Crystal oscillator input (connect to external resonator)." },
  { pinNumber: 20, pinName: "GND", description: "Ground (0V) reference for the microcontroller." },
  { pinNumber: 21, pinName: "P2.0", description: "Port 2. Bit 0 — high-order address/data bus in external memory mode." },
  { pinNumber: 22, pinName: "P2.1", description: "Port 2. Bit 1 — high-order address/data bus in external memory mode." },
  { pinNumber: 23, pinName: "P2.2", description: "Port 2. Bit 2 — high-order address/data bus in external memory mode." },
  { pinNumber: 24, pinName: "P2.3", description: "Port 2. Bit 3 — high-order address/data bus in external memory mode." },
  { pinNumber: 25, pinName: "P2.4", description: "Port 2. Bit 4 — high-order address/data bus in external memory mode." },
  { pinNumber: 26, pinName: "P2.5", description: "Port 2. Bit 5 — high-order address/data bus in external memory mode." },
  { pinNumber: 27, pinName: "P2.6", description: "Port 2. Bit 6 — high-order address/data bus in external memory mode." },
  { pinNumber: 28, pinName: "P2.7", description: "Port 2. Bit 7 — high-order address/data bus in external memory mode." },
  { pinNumber: 29, pinName: "PSEN", description: "Program Store Enable — used to read external program memory." },
  { pinNumber: 30, pinName: "ALE", description: "Address Latch Enable — used to demultiplex address/data bus." },
  { pinNumber: 31, pinName: "P0.0", description: "Port 0. Bit 0 — multiplexed low-order address/data bus in external memory mode." },
  { pinNumber: 32, pinName: "P0.1", description: "Port 0. Bit 1 — multiplexed low-order address/data bus in external memory mode." },
  { pinNumber: 33, pinName: "P0.2", description: "Port 0. Bit 2 — multiplexed low-order address/data bus in external memory mode." },
  { pinNumber: 34, pinName: "P0.3", description: "Port 0. Bit 3 — multiplexed low-order address/data bus in external memory mode." },
  { pinNumber: 35, pinName: "P0.4", description: "Port 0. Bit 4 — multiplexed low-order address/data bus in external memory mode." },
  { pinNumber: 36, pinName: "P0.5", description: "Port 0. Bit 5 — multiplexed low-order address/data bus in external memory mode." },
  { pinNumber: 37, pinName: "P0.6", description: "Port 0. Bit 6 — multiplexed low-order address/data bus in external memory mode." },
  { pinNumber: 38, pinName: "P0.7", description: "Port 0. Bit 7 — multiplexed low-order address/data bus in external memory mode." },
  { pinNumber: 39, pinName: "EA", description: "External Access enable — when held low, CPU fetches code from external memory." },
  { pinNumber: 40, pinName: "VCC", description: "Supply voltage (+5V) for the microcontroller." },
];

export const pinMap = new Map<number, PinDef>(pinData.map((p) => [p.pinNumber, p]));
