import { profile } from "@/lib/profile";

export default function SiteFooter() {
  return (
    <footer className="border-t border-ink-line">
      <div className="mx-auto flex w-full max-w-[1080px] flex-col gap-2 px-6 py-10 text-sm text-muted md:flex-row md:items-center md:justify-between md:px-8">
        <p>
          {profile.name}. {profile.course}, {profile.university}.
        </p>
        <a
          href={profile.github}
          target="_blank"
          rel="noreferrer"
          className="transition-colors hover:text-paper"
        >
          github.com/{profile.handle}
        </a>
      </div>
    </footer>
  );
}
