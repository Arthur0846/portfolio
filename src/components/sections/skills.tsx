import Section from "@/components/section";
import { skillGroups } from "@/lib/profile";

export default function Skills() {
  return (
    <Section id="habilidades" title="Habilidades e tecnologias">
      <dl className="border-t border-ink-line">
        {skillGroups.map((group) => (
          <div
            key={group.category}
            className="grid grid-cols-1 gap-2 border-b border-ink-line py-5 sm:grid-cols-[220px_minmax(0,1fr)] sm:items-baseline sm:gap-8"
          >
            <dt className="text-sm text-muted">{group.category}</dt>
            <dd className="flex flex-wrap gap-x-6 gap-y-1.5 text-sm text-paper">
              {group.items.map((item) => (
                <span key={item}>{item}</span>
              ))}
            </dd>
          </div>
        ))}
      </dl>
      <p className="mt-6 max-w-[64ch] text-sm leading-relaxed text-muted">
        Listo o que consigo explicar numa conversa técnica e usar sem consultar.
        O resto ficou de fora de propósito.
      </p>
    </Section>
  );
}
