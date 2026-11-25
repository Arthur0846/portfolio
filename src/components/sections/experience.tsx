import Reveal from "@/components/reveal";
import Section from "@/components/section";
import { education } from "@/lib/profile";

export default function Experience() {
  return (
    <Section id="experiencia" title="Experiência e formação">
      <ol className="border-l border-ink-line">
        <li className="pl-7">
          <Reveal as="p" className="text-sm text-muted">
            {education.period}
          </Reveal>
          <Reveal
            as="h3"
            variant="mask"
            delay={100}
            className="mt-1 font-display text-xl font-medium tracking-tight text-paper"
          >
            {education.title}
          </Reveal>
          <Reveal as="p" delay={150} className="mt-0.5 text-sm text-muted">
            {education.org}
          </Reveal>
          <Reveal
            as="p"
            delay={220}
            className="mt-3 max-w-[64ch] text-base leading-relaxed text-paper"
          >
            {education.detail}
          </Reveal>
        </li>
      </ol>
    </Section>
  );
}
