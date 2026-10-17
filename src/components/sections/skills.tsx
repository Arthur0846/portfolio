import Section from "@/components/section";
import { TechIcon } from "@/components/tech-icon";
import { skillGroups } from "@/lib/profile";

export default function Skills() {
  return (
    <Section id="habilidades" title="Habilidades e tecnologias">
      <dl className="border-t border-ink-line">
        {skillGroups.map((group) => (
          <div
            key={group.category}
            className="grid grid-cols-1 gap-4 border-b border-ink-line py-6 sm:grid-cols-[200px_minmax(0,1fr)] sm:items-center sm:gap-10"
          >
            <dt className="text-sm text-muted">{group.category}</dt>
            <dd>
              <ul className="grid grid-cols-2 gap-x-6 gap-y-5 sm:grid-cols-3 lg:grid-cols-4">
                {group.items.map((item) => (
                  <li key={item} className="flex items-center gap-3">
                    <TechIcon name={item} className="h-6 w-6 shrink-0" />
                    <span className="text-sm text-paper">{item}</span>
                  </li>
                ))}
              </ul>
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
