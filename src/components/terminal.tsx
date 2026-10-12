"use client";

import { useEffect, useRef, useState, type KeyboardEvent } from "react";
import { usePathname, useRouter } from "next/navigation";
import { profile, sections } from "@/lib/profile";

type Line = { kind: "input" | "output"; text: string };

type Result = {
  output: string[];
  action?:
    | { type: "clear" }
    | { type: "scroll"; id: string }
    | { type: "route"; href: string }
    | { type: "open"; href: string };
};

const PROMPT = "arthur@ufsm:~$";

const SECTION_IDS = sections.map((section) => section.id).join("  ");

const COMMANDS = [
  "help",
  "ls",
  "lab",
  "clear",
  "whoami",
  "github",
  "linkedin",
  "email",
];

const HELP = [
  `Seções:  ${SECTION_IDS}`,
  `Comandos: ${COMMANDS.join("  ")}`,
  "Tab completa o comando. Setas para cima e para baixo navegam no histórico.",
];

const WELCOME: Line[] = [
  { kind: "output", text: profile.name },
  { kind: "output", text: `${profile.course}, ${profile.university}` },
  { kind: "output", text: "" },
  { kind: "output", text: SECTION_IDS },
  { kind: "output", text: "help lista os comandos." },
];

function resolveSection(token: string) {
  const value = token.toLowerCase();
  return sections.find(
    (section) => section.id === value || section.aliases.includes(value),
  );
}

function run(raw: string): Result {
  const input = raw.trim();
  if (!input) return { output: [] };

  const [command] = input.split(/\s+/);
  const cmd = command.toLowerCase();

  if (cmd === "clear" || cmd === "cls")
    return { output: [], action: { type: "clear" } };
  if (cmd === "help" || cmd === "?") return { output: HELP };
  if (cmd === "ls" || cmd === "secoes") return { output: [SECTION_IDS] };
  if (cmd === "whoami")
    return {
      output: [profile.name, `${profile.course}, ${profile.university}`],
    };
  if (cmd === "github")
    return {
      output: [`abrindo github.com/${profile.handle} ...`],
      action: { type: "open", href: profile.github },
    };
  if (cmd === "linkedin")
    return {
      output: profile.linkedin
        ? [`abrindo ${profile.linkedin} ...`]
        : ["LinkedIn ainda será cadastrado."],
      action: profile.linkedin
        ? { type: "open", href: profile.linkedin }
        : undefined,
    };
  if (cmd === "email")
    return {
      output: profile.email
        ? [`abrindo ${profile.email} ...`]
        : ["E-mail ainda será cadastrado."],
      action: profile.email
        ? { type: "open", href: `mailto:${profile.email}` }
        : undefined,
    };
  if (cmd === "lab" || cmd === "laboratorio")
    return {
      output: ["abrindo /laboratorio ..."],
      action: { type: "route", href: "/laboratorio" },
    };

  const target = resolveSection(cmd);
  if (target)
    return {
      output: [`ir para ${target.label.toLowerCase()} ...`],
      action: { type: "scroll", id: target.id },
    };

  return {
    output: [
      `comando não encontrado: ${input}`,
      "digite help para ver o que existe.",
    ],
  };
}

export default function Terminal() {
  const router = useRouter();
  const pathname = usePathname();
  const [lines, setLines] = useState<Line[]>(WELCOME);
  const [value, setValue] = useState("");
  const [history, setHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);

  const inputRef = useRef<HTMLInputElement>(null);
  const outputRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const node = outputRef.current;
    if (node) node.scrollTop = node.scrollHeight;
  }, [lines]);

  function goToSection(id: string) {
    if (pathname === "/") {
      document
        .getElementById(id)
        ?.scrollIntoView({ behavior: "smooth", block: "start" });
    } else {
      router.push(`/#${id}`);
    }
  }

  function submit(raw: string) {
    const result = run(raw);

    setLines((previous) => {
      if (result.action?.type === "clear") return [];
      return [
        ...previous,
        { kind: "input", text: raw },
        ...result.output.map((text) => ({ kind: "output" as const, text })),
      ];
    });

    const action = result.action;
    if (action?.type === "scroll") goToSection(action.id);
    if (action?.type === "route") router.push(action.href);
    if (action?.type === "open") {
      if (action.href.startsWith("mailto:")) {
        window.location.href = action.href;
      } else {
        window.open(action.href, "_blank", "noopener,noreferrer");
      }
    }

    setHistory((previous) => [...previous, raw]);
    setHistoryIndex(-1);
    setValue("");
  }

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      event.preventDefault();
      submit(value);
      return;
    }

    if (event.key === "ArrowUp") {
      event.preventDefault();
      if (history.length === 0) return;
      const next =
        historyIndex === -1 ? history.length - 1 : Math.max(0, historyIndex - 1);
      setHistoryIndex(next);
      setValue(history[next]);
      return;
    }

    if (event.key === "ArrowDown") {
      event.preventDefault();
      if (historyIndex === -1) return;
      const next = historyIndex + 1;
      if (next >= history.length) {
        setHistoryIndex(-1);
        setValue("");
      } else {
        setHistoryIndex(next);
        setValue(history[next]);
      }
      return;
    }

    if (event.key === "Tab") {
      event.preventDefault();
      const candidates = [...sections.map((s) => s.id), ...COMMANDS].filter(
        (candidate) => candidate.startsWith(value.toLowerCase()),
      );
      if (candidates.length === 1) {
        setValue(candidates[0]);
      } else if (candidates.length > 1 && value) {
        setLines((previous) => [
          ...previous,
          { kind: "input", text: value },
          { kind: "output", text: candidates.join("  ") },
        ]);
      }
    }
  };

  return (
    <div
      className="overflow-hidden rounded-md border border-ink-line bg-ink-raised transition-colors focus-within:border-signal"
      onClick={() => inputRef.current?.focus()}
    >
      <div className="flex items-center justify-between gap-3 border-b border-ink-line px-4 py-2.5">
        <span className="font-mono text-xs text-muted">terminal</span>
        <span className="font-mono text-xs text-muted">arthur@ufsm: zsh</span>
      </div>

      <div
        ref={outputRef}
        role="log"
        aria-live="polite"
        aria-label="Saída do terminal"
        className="h-[300px] overflow-y-auto p-4 font-mono text-[13px] leading-relaxed md:h-[340px]"
      >
        {lines.map((line, index) => (
          <p
            key={index}
            className={
              line.kind === "input"
                ? "whitespace-pre-wrap break-words text-paper"
                : "whitespace-pre-wrap break-words text-muted"
            }
          >
            {line.kind === "input" ? (
              <>
                <span className="text-signal">{PROMPT}</span> {line.text}
              </>
            ) : (
              line.text || "\u00A0"
            )}
          </p>
        ))}

        <div className="flex items-center gap-2 pt-1">
          <span className="shrink-0 text-signal" aria-hidden="true">
            {PROMPT}
          </span>
          <span className="relative min-w-0 flex-1">
            <span
              aria-hidden="true"
              className="text-paper whitespace-pre-wrap break-words"
            >
              {value}
            </span>
            <span
              aria-hidden="true"
              className="blink ml-px inline-block h-[1.05em] w-[0.6em] translate-y-[0.18em] bg-signal"
            />
            <input
              ref={inputRef}
              value={value}
              onChange={(event) => setValue(event.target.value)}
              onKeyDown={handleKeyDown}
              className="absolute inset-0 h-full w-full cursor-text opacity-0"
              type="text"
              aria-label="Comando do terminal"
              autoComplete="off"
              autoCapitalize="off"
              autoCorrect="off"
              spellCheck={false}
            />
          </span>
        </div>
      </div>
    </div>
  );
}
