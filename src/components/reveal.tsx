"use client";

import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";

type RevealTag =
  | "div"
  | "p"
  | "span"
  | "li"
  | "ul"
  | "ol"
  | "dl"
  | "dt"
  | "dd"
  | "h2"
  | "h3";

type RevealProps = {
  children: ReactNode;
  as?: RevealTag;
  className?: string;
  delay?: number;
  variant?: "wipe" | "mask";
};

export default function Reveal({
  children,
  as = "div",
  className = "",
  delay = 0,
  variant = "wipe",
}: RevealProps) {
  const nodeRef = useRef<HTMLElement | null>(null);
  const [visible, setVisible] = useState(false);

  const attach = useCallback((node: HTMLElement | null) => {
    nodeRef.current = node;
  }, []);

  useEffect(() => {
    const node = nodeRef.current;
    if (!node) return;

    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (reduced) return;

    if (typeof IntersectionObserver === "undefined") {
      queueMicrotask(() => setVisible(true));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setVisible(true);
            observer.disconnect();
          }
        }
      },
      { rootMargin: "0px 0px -10% 0px", threshold: 0.12 },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  const props = {
    ref: attach,
    className: [
      "scroll-reveal",
      variant === "mask" ? "scroll-reveal-mask" : "scroll-reveal-wipe",
      visible ? "is-visible" : "",
      className,
    ]
      .filter(Boolean)
      .join(" "),
    ...(variant === "wipe"
      ? { style: { animationDelay: `${delay}ms` } }
      : {}),
  };

  const content =
    variant === "mask" ? (
      <span
        className="scroll-reveal-mask-inner"
        style={{ transitionDelay: `${delay}ms` }}
      >
        {children}
      </span>
    ) : (
      children
    );

  switch (as) {
    case "p":
      return <p {...props}>{content}</p>;
    case "span":
      return <span {...props}>{content}</span>;
    case "li":
      return <li {...props}>{content}</li>;
    case "ul":
      return <ul {...props}>{content}</ul>;
    case "ol":
      return <ol {...props}>{content}</ol>;
    case "dl":
      return <dl {...props}>{content}</dl>;
    case "dt":
      return <dt {...props}>{content}</dt>;
    case "dd":
      return <dd {...props}>{content}</dd>;
    case "h2":
      return <h2 {...props}>{content}</h2>;
    case "h3":
      return <h3 {...props}>{content}</h3>;
    default:
      return <div {...props}>{content}</div>;
  }
}
