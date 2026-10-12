import Section from "@/components/section";
import { profile } from "@/lib/profile";

const facts = [
  { label: "Formação", value: `${profile.course}, ${profile.university}` },
  { label: "Local", value: profile.location },
];

export default function About() {
  return (
    <Section id="sobre" title="Sobre mim">
      <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,340px)] lg:gap-16">
        <div className="space-y-5 text-base leading-relaxed text-paper md:text-lg">
          <p>
            Na graduação fui entendendo como um software é construído de ponta a
            ponta, desde a lógica de programação e as estruturas de dados até a
            modelagem de banco e a organização de um projeto em equipe.
          </p>
          <p>
            Antes de escrever a primeira linha de código, gosto de entender o
            contexto dos projetos. Decidir como modelar os dados de um sistema,
            revisar possíveis problemas ou combinar como o time vai dividir as
            tarefas. Esse cuidado com a estrutura é o que quero levar para a
            prática profissional como projetista.
          </p>
        </div>

        <dl className="border-t border-ink-line">
          {facts.map((fact) => (
            <div key={fact.label} className="border-b border-ink-line py-4">
              <dt className="text-sm text-muted">{fact.label}</dt>
              <dd className="mt-1 text-sm leading-relaxed text-paper">
                {fact.value}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </Section>
  );
}
