import React, { useState } from "react";
import { X, Brain, Play } from "lucide-react";

type Intent = "analyze" | "explain" | "debug";

export type AnalysisResult = {
  what: string[]; // lines describing what the code does
  issues: string[]; // potential issues
  fixes: string[]; // suggestions
  learn: string[]; // learning points
  meta: {
    language: string;
    topics: string[];
    level: "beginner" | "intermediate" | "unknown";
  };
};

/**
 * analyzeCode
 * - rule-based, mock analysis function.
 * - Designed to be replaced with an LLM call later.
 * - When switching to OpenAI/Gemini, call the API here and return the same structure.
 */
export function analyzeCode(code: string, intent: Intent): AnalysisResult {
  const lines = code.split(/\r?\n/).map((l) => l.trim());

  // simple detections
  const hasSetup = /void\s+setup\s*\(/i.test(code);
  const hasLoop = /void\s+loop\s*\(/i.test(code);
  const hasPinMode = /pinMode\s*\(/i.test(code);
  const hasDigitalWrite = /digitalWrite\s*\(/i.test(code);
  const hasAnalogWrite = /analogWrite\s*\(/i.test(code);
  const hasDelay = /\bdelay\s*\(/i.test(code);
  const hasAttachInterrupt = /attachInterrupt\s*\(/i.test(code);
  const hasISR = /\bISR\s*\(/i.test(code);
  const hasIncludeArduino = /#include\s*<Arduino.h>|#include\s*<Arduino\.h>/i.test(code);

  // gather pin numbers used in pinMode/digitalWrite/analogWrite
  const pinRegex = /(?:pinMode|digitalWrite|analogWrite)\s*\(\s*([A-Za-z0-9_]+)\s*,?/g;
  const pins = new Set<string>();
  let m;
  while ((m = pinRegex.exec(code)) !== null) {
    pins.add(m[1]);
  }

  // guess language
  const language = hasSetup || hasLoop || hasIncludeArduino ? "Arduino (C/C++)" : "C / Embedded C";

  // topic heuristics
  const topics: string[] = [];
  if (hasDigitalWrite || hasAnalogWrite) topics.push("GPIO / Digital output");
  if (hasAnalogWrite) topics.push("PWM / analogWrite");
  if (hasDelay) topics.push("Timing / delay");
  if (hasAttachInterrupt || hasISR) topics.push("Interrupts");
  if (!topics.length) topics.push("General loop / control logic");

  const level: AnalysisResult["meta"]["level"] = hasAttachInterrupt || hasISR ? "intermediate" : "beginner";

  // Build 'what this code does' — depends on intent
  const what: string[] = [];
  if (intent === "explain" || intent === "analyze") {
    if (hasSetup) what.push("Defines a `setup()` function that runs once at startup.");
    if (hasLoop) what.push("Defines a `loop()` function that runs repeatedly.");
    if (hasPinMode) what.push("Uses `pinMode()` to configure GPIO pins.");
    if (hasDigitalWrite) what.push("Writes digital values to pins with `digitalWrite()`.");
    if (hasAnalogWrite) what.push("Uses `analogWrite()` (PWM) to vary output duty on pins.");
    if (hasDelay) what.push("Uses `delay()` for timing; this blocks execution while waiting.");
  }

  // Line-by-line simple explanation for 'explain' intent
  if (intent === "explain") {
    const lineExplanations: string[] = [];
    lines.forEach((ln, idx) => {
      if (!ln) return;
      if (/void\s+setup\s*\(/i.test(ln)) lineExplanations.push(`${idx + 1}: ` + "setup() — runs once on boot.");
      else if (/void\s+loop\s*\(/i.test(ln)) lineExplanations.push(`${idx + 1}: ` + "loop() — runs repeatedly after setup.");
      else if (/pinMode\s*\(/i.test(ln)) lineExplanations.push(`${idx + 1}: ` + "pinMode() configures a pin as INPUT or OUTPUT.");
      else if (/digitalWrite\s*\(/i.test(ln)) lineExplanations.push(`${idx + 1}: ` + "digitalWrite() sets a pin HIGH or LOW.");
      else if (/analogWrite\s*\(/i.test(ln)) lineExplanations.push(`${idx + 1}: ` + "analogWrite() sets PWM (simulated analog) output on a pin.");
      else if (/delay\s*\(/i.test(ln)) lineExplanations.push(`${idx + 1}: ` + "delay() pauses the program for a number of milliseconds (blocks other work).");
      else if (/Serial\.begin\s*\(/i.test(ln)) lineExplanations.push(`${idx + 1}: ` + "Serial.begin() initializes serial communication for logs.");
      else lineExplanations.push(`${idx + 1}: ` + "This line is control or helper code — explain by reading the function names.");
    });
    // replace 'what' with detailed per-line explanations
    if (lineExplanations.length) {
      what.length = 0;
      what.push(...lineExplanations);
    }
  }

  // Potential issues
  const issues: string[] = [];
  if (!hasSetup) issues.push("Missing `setup()` function — code may have no initialization phase.");
  if (!hasLoop) issues.push("Missing `loop()` function — Arduino sketches require a loop() function.");
  if (hasDigitalWrite && !hasPinMode) issues.push("Calls to `digitalWrite()` detected but no `pinMode()` found — pins may not be configured as OUTPUT.");
  if (hasPinMode && /pinMode\s*\(\s*\w+\s*,\s*INPUT\b/i.test(code) && /digitalWrite\s*\(/i.test(code)) issues.push("`digitalWrite()` used on pins configured as INPUT — check pinMode arguments.");
  if (hasLoop && /void\s+loop\s*\([^)]*\)\s*{\s*}/i.test(code)) issues.push("`loop()` is empty — nothing will run repeatedly.");
  if (hasDelay && /delay\s*\(\s*\d{3,}\s*\)/i.test(code)) issues.push("Long `delay()` calls may block the CPU and prevent responsive behavior.");
  if (pins.size > 10) issues.push("Many different pin operations detected — consider grouping setup and documenting pin assignments.");

  // Pin inconsistency: detect same numeric pin used with analogWrite and digitalWrite
  const numericPinRegex = /(?:pinMode|digitalWrite|analogWrite)\s*\(\s*(\d+)\s*,?/g;
  const pinMap = new Map<string, Set<string>>();
  while ((m = numericPinRegex.exec(code)) !== null) {
    const pin = m[1];
    const matchStr = m[0];
    if (!pinMap.has(pin)) pinMap.set(pin, new Set());
    if (/analogWrite/i.test(matchStr)) pinMap.get(pin)!.add("analog");
    else if (/digitalWrite/i.test(matchStr)) pinMap.get(pin)!.add("digital");
    else if (/pinMode/i.test(matchStr)) pinMap.get(pin)!.add("mode");
  }
  pinMap.forEach((set, pin) => {
    if (set.has("analog") && set.has("digital")) issues.push(`Pin ${pin} used with both analogWrite() and digitalWrite() — check intended behavior.`);
  });

  // Fixes / suggestions
  const fixes: string[] = [];
  if (!hasSetup) fixes.push("Add a `void setup() { /* configure pins and peripherals here */ }` function to initialize hardware.");
  if (hasDigitalWrite && !hasPinMode) fixes.push("Call `pinMode(pin, OUTPUT)` in `setup()` for any pin you `digitalWrite()`.");
  if (hasDelay) fixes.push("Avoid long `delay()` inside `loop()`; prefer non-blocking `millis()`-based timing for responsive code.");
  if (issues.find((i) => i.includes('both analogWrite') || i.includes('configured as INPUT'))) fixes.push("Ensure a pin is configured correctly for PWM/digital use; consult your microcontroller's PWM-capable pins.");
  if (pins.size > 0) fixes.push("Document pin usage in comments and group pin definitions at the top of your sketch.");

  // Educational takeaways
  const learn: string[] = [];
  learn.push("Understand the Arduino `setup()` vs `loop()` lifecycle — setup runs once, loop runs repeatedly.");
  learn.push("Learn the difference between blocking (delay) and non-blocking timing (millis).");
  learn.push("Always configure pins with `pinMode()` before driving them.");

  // Format result
  const result: AnalysisResult = {
    what: what.length ? what : ["Could not detect specific runtime behavior from the pasted code."],
    issues: issues.length ? issues : ["No obvious issues detected by heuristic rules."],
    fixes: fixes.length ? fixes : ["General suggestion: follow Arduino initialization patterns and prefer non-blocking patterns."],
    learn,
    meta: {
      language,
      topics,
      level,
    },
  };

  // NOTE: To use an LLM later, call it here and return the same `AnalysisResult` structure.
  // Example (pseudo):
  // const response = await openai.createChatCompletion({ prompt: buildPrompt(code, intent), ... });
  // return mapLLMResponseToAnalysisResult(response);

  return result;
}

type Props = {
  inline?: boolean; // when true, button is positioned absolutely within parent
  top?: string;
  left?: string;
  right?: string;
  bottom?: string;
};

export default function AICodeMentor({ inline = false, top = "6px", left = "6px", right, bottom }: Props) {
  const [open, setOpen] = useState(false);
  const [code, setCode] = useState<string>("// Paste your Arduino code here\n");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<AnalysisResult | null>(null);

  const run = (intent: Intent) => {
    setLoading(true);
    setTimeout(() => {
      const res = analyzeCode(code, intent);
      setResult(res);
      setLoading(false);
    }, 250); // mock latency
  };

  return (
    <div>
      {/* Floating button (fixed) so it stays above the iframe/editor */}
        <div style={{ position: inline ? "absolute" : "fixed", top: inline ? top : "50%", right: inline ? right : "24px", left: inline ? left : undefined, bottom: inline ? bottom : undefined, transform: inline ? undefined : "translateY(-50%)", zIndex: 9999 }}>
          <div className="relative">
            {/* glowing halo */}
            <span className="absolute inset-0 rounded-full bg-gradient-to-r from-[#0fffdc] to-[#00d1b2] opacity-20 blur-xl animate-pulse" style={{ transform: 'scale(1.25)' }} />
            <button
              aria-label="Open AI Code Mentor"
              onClick={() => setOpen(true)}
              className="relative flex items-center justify-center bg-gradient-to-br from-[#06d6c7] to-[#00bfa6] text-[#042424] w-14 h-14 rounded-full border border-[#0fffdc] shadow-[0_8px_30px_rgba(6,214,199,0.18)] hover:scale-105 transition-transform"
            >
              <Brain className="w-6 h-6 text-[#002825]" />
            </button>
          </div>
        </div>

      {open && (
        <div className={`${inline ? "absolute" : "fixed"} ${inline ? "right-6 mt-14" : "right-6 top-20"} z-[10000] w-[520px] max-w-[95%] bg-[#071717] border border-[#163939] rounded-lg shadow-2xl p-4 text-sm text-white`}>
          <div className="flex items-start justify-between mb-2">
            <div className="flex items-center gap-2">
              <Brain className="w-5 h-5 text-primary" />
              <div>
                <div className="font-bold">AI Code Mentor</div>
                <div className="text-xs text-text-muted">Paste your Arduino code below to get guided feedback.</div>
              </div>
            </div>
            <button onClick={() => setOpen(false)} className="text-text-muted hover:text-white"><X /></button>
          </div>

          <textarea
            value={code}
            onChange={(e) => setCode(e.target.value)}
            rows={8}
            className="w-full bg-[#081818] border border-[#123232] rounded-md p-3 font-mono text-xs text-white placeholder:text-text-muted mb-3"
          />

          <div className="flex gap-2 mb-3">
            <button onClick={() => run("analyze")} className="flex-1 bg-primary text-[#062425] py-2 rounded-md">Analyze Code</button>
            <button onClick={() => run("explain")} className="flex-1 bg-[#0b2f2f] border border-[#0d5b56] py-2 rounded-md">Explain What This Code Does</button>
            <button onClick={() => run("debug")} className="flex-1 bg-[#0b2f2f] border border-[#0d5b56] py-2 rounded-md">Why Might This Not Work?</button>
          </div>

          {loading && <div className="text-xs text-text-muted">Analyzing…</div>}

          {result && (
            <div className="max-h-72 overflow-auto pt-2 text-xs">
              <div className="mb-2">
                <strong>🔍 What this code does</strong>
                <ul className="list-disc ml-5 mt-1">
                  {result.what.map((w, i) => <li key={i}>{w}</li>)}
                </ul>
              </div>

              <div className="mb-2 text-amber-400">
                <strong>⚠️ Potential issues</strong>
                <ul className="list-disc ml-5 mt-1">
                  {result.issues.map((w, i) => <li key={i}>{w}</li>)}
                </ul>
              </div>

              <div className="mb-2 text-green-300">
                <strong>🛠 How to fix or improve</strong>
                <ul className="list-disc ml-5 mt-1">
                  {result.fixes.map((w, i) => <li key={i}>{w}</li>)}
                </ul>
              </div>

              <div className="mb-2 text-blue-200">
                <strong>📘 What you should learn from this</strong>
                <ul className="list-disc ml-5 mt-1">
                  {result.learn.map((w, i) => <li key={i}>{w}</li>)}
                </ul>
              </div>

              <div className="text-xs text-text-muted mt-2">
                <strong>Meta:</strong> {result.meta.language} • {result.meta.topics.join(", ")} • Level: {result.meta.level}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
