"use client";

import {
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type ReactNode,
} from "react";

type RevealTag = "div" | "article" | "p" | "button";

type RevealProps = {
  as?: RevealTag;
  delay?: string;
  className?: string;
  children?: ReactNode;
  type?: "button";
  onClick?: () => void;
};

export function Reveal({
  as = "div",
  delay,
  className,
  children,
  type,
  onClick,
}: RevealProps) {
  const ref = useRef<HTMLElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    if (typeof IntersectionObserver === "undefined") {
      const frame = requestAnimationFrame(() => setInView(true));
      return () => cancelAnimationFrame(frame);
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        setInView(true);
        observer.disconnect();
      },
      { threshold: 0.12, rootMargin: "0px 0px -6% 0px" },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  const revealClassName = ["reveal", inView ? "is-in" : "", className]
    .filter(Boolean)
    .join(" ");

  const revealStyle = delay
    ? ({ "--reveal-delay": delay } as CSSProperties)
    : undefined;

  const common = {
    ref: ref as never,
    className: revealClassName,
    style: revealStyle,
  };

  if (as === "button") {
    return (
      <button {...common} type={type ?? "button"} onClick={onClick}>
        {children}
      </button>
    );
  }

  if (as === "article") {
    return <article {...common}>{children}</article>;
  }

  if (as === "p") {
    return <p {...common}>{children}</p>;
  }

  return <div {...common}>{children}</div>;
}
