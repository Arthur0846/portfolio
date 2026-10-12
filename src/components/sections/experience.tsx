import Section from "@/components/section";
import { education } from "@/lib/profile";

export default function Experience() {
  return (
    <Section id="experiencia" title="Experiência e formação">
      <ol className="border-l border-ink-line">
        <li className="pl-7">
          <p className="text-sm text-muted">{education.period}</p>
          <h3 className="mt-1 font-display text-xl font-medium tracking-tight text-paper">
            {education.title}
          </h3>
          <p className="mt-0.5 text-sm text-muted">{education.org}</p>
          <p className="mt-3 max-w-[64ch] text-base leading-relaxed text-paper">
            {education.detail}
          </p>
        </li>
      </ol>
    </Section>
  );
}
