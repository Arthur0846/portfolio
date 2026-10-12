import Terminal from "@/components/terminal";
import { profile } from "@/lib/profile";
import { buttonPrimaryClass, linkUnderlineClass } from "@/lib/ui";
import {
  GithubIcon,
  LinkedinIcon,
  MailIcon,
} from "@/components/icons";

const socials = [
  { icon: GithubIcon, label: profile.handle, href: profile.github },
  { icon: LinkedinIcon, label: "LinkedIn", href: profile.linkedin },
  {
    icon: MailIcon,
    label: "E-mail",
    href: profile.email ? `mailto:${profile.email}` : "",
  },
].filter((social) => social.href);

export default function Hero() {
  return (
    <section id="inicio" className="scroll-mt-20">
      <div className="mx-auto grid w-full max-w-[1080px] grid-cols-1 items-start gap-14 px-6 py-16 md:px-8 md:py-24 lg:grid-cols-[minmax(0,1fr)_minmax(0,460px)] lg:gap-16">
        <div className="rise">
          <h1 className="font-display text-4xl font-medium leading-[1.08] tracking-tight text-paper sm:text-5xl lg:text-[52px]">
            {profile.name}
          </h1>
          <p className="mt-6 max-w-[54ch] text-lg leading-relaxed text-paper">
            Estudo Sistemas de Informação na UFSM, em Santa Maria. Programo em
            Java, Python e JavaScript, com interesse em banco de dados,
            desenvolvimento web e gestão de projetos.
          </p>

          <div className="mt-9 flex flex-wrap items-center gap-x-6 gap-y-3">
            <a href="#contato" className={buttonPrimaryClass}>
              Falar comigo
            </a>
            <a href="#projetos" className={linkUnderlineClass}>
              Ver projetos
            </a>
          </div>

          <div className="mt-9 flex flex-wrap items-center gap-x-6 gap-y-3 text-sm text-muted">
            {socials.map((social) => {
              const Icon = social.icon;
              const external = social.href.startsWith("http");
              return (
                <a
                  key={social.label}
                  href={social.href}
                  target={external ? "_blank" : undefined}
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 transition-colors hover:text-paper"
                >
                  <Icon className="h-4 w-4" />
                  {social.label}
                </a>
              );
            })}
          </div>
        </div>

        <div className="rise-late">
          <Terminal />
          <p className="mt-3 text-xs leading-relaxed text-muted">
            Digite o nome de uma seção e pressione Enter para ir até ela.
          </p>
        </div>
      </div>
    </section>
  );
}
