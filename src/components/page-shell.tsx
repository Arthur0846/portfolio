import Link from "next/link";
import type { ReactNode } from "react";

type PageShellProps = {
  title: string;
  intro?: string;
  children: ReactNode;
};

export default function PageShell({ title, intro, children }: PageShellProps) {
  return (
    <div className="mx-auto w-full max-w-[1280px] px-6 py-14 md:px-8 lg:px-10 md:py-20">
      <Link
        href="/"
        className="inline-flex text-sm text-muted transition-colors hover:text-paper"
      >
        Voltar ao início
      </Link>

      <h1 className="mt-8 font-display text-3xl font-medium tracking-tight text-paper md:text-4xl">
        {title}
      </h1>
      {intro ? (
        <p className="mt-4 max-w-[62ch] text-base leading-relaxed text-muted">
          {intro}
        </p>
      ) : null}

      <div className="mt-10">{children}</div>
    </div>
  );
}

