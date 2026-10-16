import Terminal from "@/components/terminal";
import { profile } from "@/lib/profile";
import { buttonPrimaryClass, linkUnderlineClass } from "@/lib/ui";
import { GithubIcon, LinkedinIcon, MailIcon } from "@/components/icons";

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
    <section
      id="inicio"
      className="scroll-mt-20 lg:flex lg:min-h-[calc(100svh-4rem)] lg:items-center"
    >
      <div className="mx-auto w-full max-w-[1280px] px-6 py-16 md:px-8 md:py-24 lg:px-10 lg:py-16">
        <div className="grid grid-cols-1 gap-14 lg:grid-cols-[minmax(0,1fr)_minmax(0,540px)] lg:gap-16">
          <div className="flex flex-col justify-center">
            <h1 className="font-display text-[clamp(2.75rem,6vw,5rem)] font-medium leading-[1.03] tracking-tight text-paper">
              <span className="block overflow-hidden pb-[0.08em]">
                <span className="mask-up block">{profile.name}</span>
              </span>
            </h1>

            <p
              className="reveal mt-7 max-w-[50ch] text-xl leading-relaxed text-paper"
              style={{ animationDelay: "0.15s" }}
            >
              Estudo Sistemas de Informação na UFSM, em Santa Maria. Programo em
              Java, Python e JavaScript, com interesse em banco de dados,
              desenvolvimento web e gestão de projetos.
            </p>

            <div
              className="reveal mt-10 flex flex-wrap items-center gap-x-6 gap-y-3"
              style={{ animationDelay: "0.25s" }}
            >
              <a href="#contato" className={buttonPrimaryClass}>
                Falar comigo
              </a>
              <a href="#projetos" className={linkUnderlineClass}>
                Ver projetos
              </a>
            </div>

            <div
              className="reveal mt-10 flex flex-wrap items-center gap-x-6 gap-y-3 text-sm text-muted"
              style={{ animationDelay: "0.34s" }}
            >
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

          <div className="flex flex-col justify-center lg:border-l lg:border-ink-line lg:pl-16">
            <Terminal />
            <p className="mt-4 text-sm leading-relaxed text-muted">
              Digite o nome de uma seção e pressione Enter. O menu no topo
              também funciona.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
