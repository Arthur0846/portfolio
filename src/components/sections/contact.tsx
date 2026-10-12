import Link from "next/link";
import Section from "@/components/section";
import { profile } from "@/lib/profile";
import { buttonSecondaryClass } from "@/lib/ui";
import { ExternalIcon } from "@/components/icons";

function displayUrl(url: string) {
  return url.replace(/^https?:\/\/(www\.)?/, "").replace(/\/$/, "");
}

const channels = [
  { label: "GitHub", value: displayUrl(profile.github), href: profile.github },
  {
    label: "LinkedIn",
    value: displayUrl(profile.linkedin),
    href: profile.linkedin,
  },
  {
    label: "E-mail",
    value: profile.email,
    href: profile.email ? `mailto:${profile.email}` : "",
  },
].filter((channel) => channel.href !== "");

export default function Contact() {
  return (
    <Section id="contato" title="Contato">
      <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,420px)] lg:gap-16">
        <div>
          <p className="max-w-[48ch] text-base leading-relaxed text-paper md:text-lg">
            Estou aberto a estágio, projetos acadêmicos e conversas sobre
            software e banco de dados. Para uma resposta direta, use o GitHub
            ou o formulário.
          </p>
          <Link
            href="/contato"
            className={`mt-7 inline-flex ${buttonSecondaryClass}`}
          >
            Abrir formulário de contato
          </Link>
        </div>

        <ul className="border-t border-ink-line">
          {channels.map((channel) => (
            <li
              key={channel.label}
              className="flex items-center justify-between gap-4 border-b border-ink-line py-4"
            >
              <span className="text-sm text-muted">{channel.label}</span>
              <a
                href={channel.href}
                target={channel.href.startsWith("http") ? "_blank" : undefined}
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 text-sm text-paper transition-colors hover:text-signal"
              >
                {channel.value}
                {channel.href.startsWith("http") ? (
                  <ExternalIcon className="h-3.5 w-3.5" />
                ) : null}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </Section>
  );
}
