import Reveal from "@/components/reveal";
import Section from "@/components/section";
import { profile } from "@/lib/profile";
import { linkUnderlineClass } from "@/lib/ui";
import { ExternalIcon } from "@/components/icons";

export default function Projects() {
  return (
    <Section id="projetos" title="Projetos">
      <div className="rounded-md border border-ink-line px-6 py-12 md:px-10 md:py-14">
        <Reveal
          as="p"
          className="max-w-[62ch] text-base leading-relaxed text-paper md:text-lg"
        >
          Ainda não publiquei projetos aqui. Estou reunindo os primeiros
          trabalhos para apresentar com o código aberto e uma explicação do
          problema que cada um resolve.
        </Reveal>
        <Reveal as="div" delay={120} className="mt-6">
          <a
            href={profile.github}
            target="_blank"
            rel="noreferrer"
            className={`inline-flex items-center gap-2 ${linkUnderlineClass}`}
          >
            Ver repositórios no GitHub
            <ExternalIcon className="h-4 w-4" />
          </a>
        </Reveal>
      </div>
    </Section>
  );
}
