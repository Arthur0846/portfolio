import Link from "next/link";
import { profile, sections } from "@/lib/profile";
import { linkUnderlineClass } from "@/lib/ui";
import { GithubIcon } from "@/components/icons";

export default function SiteHeader() {
  const navLinks = sections.filter(
    (section) => section.id !== "inicio" && section.id !== "contato",
  );

  return (
    <header className="sticky top-0 z-40 border-b border-ink-line bg-ink">
      <div className="mx-auto flex h-16 w-full max-w-[1080px] items-center justify-between gap-6 px-6 md:px-8">
        <Link href="/" className="flex items-baseline gap-3" aria-label="Início">
          <span className="font-display text-[17px] font-medium tracking-tight text-paper">
            {profile.name}
          </span>
          <span className="hidden text-xs text-muted sm:inline">
            {profile.course}
          </span>
        </Link>

        <nav
          className="hidden items-center gap-7 lg:flex"
          aria-label="Seções do site"
        >
          {navLinks.map((section) => (
            <Link
              key={section.id}
              href={`/#${section.id}`}
              className="text-sm text-muted transition-colors hover:text-paper"
            >
              {section.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-5">
          <Link
            href="/laboratorio"
            className="hidden text-sm text-muted transition-colors hover:text-paper sm:block"
          >
            Laboratório
          </Link>
          <Link
            href="/#contato"
            className={linkUnderlineClass}
          >
            Contato
          </Link>
          <a
            href={profile.github}
            target="_blank"
            rel="noreferrer"
            aria-label={`GitHub de ${profile.name}`}
            className="text-muted transition-colors hover:text-paper"
          >
            <GithubIcon className="h-4 w-4" />
          </a>
        </div>
      </div>
    </header>
  );
}
