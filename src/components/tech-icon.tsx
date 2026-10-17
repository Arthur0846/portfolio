import Image from "next/image";

const TECH: Record<string, string> = {
  Java: "/tech/java.svg",
  Python: "/tech/python.svg",
  Kotlin: "/tech/kotlin.svg",
  C: "/tech/c.svg",
  HTML: "/tech/html5.svg",
  CSS: "/tech/css3.svg",
  JavaScript: "/tech/javascript.svg",
  MySQL: "/tech/mysql.svg",
  PostgreSQL: "/tech/postgresql.svg",
  Git: "/tech/git.svg",
  GitHub: "/tech/github.svg",
  "VS Code": "/tech/vscode.svg",
  "IntelliJ IDEA": "/tech/intellij.svg",
};

export function TechIcon({ name, className }: { name: string; className?: string }) {
  const src = TECH[name];
  if (!src) return null;
  return (
    <Image src={src} alt="" width={24} height={24} unoptimized className={className} />
  );
}
