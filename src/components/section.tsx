import type { ReactNode } from "react";
import Reveal from "@/components/reveal";
import type { SectionId } from "@/lib/profile";

type SectionProps = {
  id: SectionId;
  title: string;
  children: ReactNode;
};

export default function Section({ id, title, children }: SectionProps) {
  return (
    <section id={id} className="scroll-mt-20 border-t border-ink-line py-16 md:py-24">
      <div className="mx-auto w-full max-w-[1280px] px-6 md:px-8 lg:px-10">
        <Reveal
          as="h2"
          variant="mask"
          className="font-display text-3xl font-medium tracking-tight text-paper md:text-4xl"
        >
          {title}
        </Reveal>
        <div className="mt-10 md:mt-12">{children}</div>
      </div>
    </section>
  );
}
