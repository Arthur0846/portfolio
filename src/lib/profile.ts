export type SectionId =
  | "inicio"
  | "sobre"
  | "projetos"
  | "habilidades"
  | "experiencia"
  | "contato";

type SectionMeta = {
  id: SectionId;
  label: string;
  aliases: string[];
};

export const sections: SectionMeta[] = [
  { id: "inicio", label: "Início", aliases: ["inicio", "home", "start"] },
  { id: "sobre", label: "Sobre", aliases: ["sobre", "about"] },
  { id: "projetos", label: "Projetos", aliases: ["projetos", "projects"] },
  {
    id: "habilidades",
    label: "Habilidades",
    aliases: ["habilidades", "skills", "stack"],
  },
  {
    id: "experiencia",
    label: "Experiência",
    aliases: ["experiencia", "experience", "formacao"],
  },
  { id: "contato", label: "Contato", aliases: ["contato", "contact"] },
];

export const profile = {
  name: "Arthur Schmidt Lorentz",
  handle: "Arthur0846",
  course: "Sistemas de Informação",
  university: "UFSM",
  location: "Santa Maria, RS",
  github: "https://github.com/Arthur0846",
  linkedin: "",
  email: "",
};

type SkillGroup = { category: string; items: string[] };

export const skillGroups: SkillGroup[] = [
  { category: "Linguagens", items: ["Java", "Python", "Kotlin", "C"] },
  { category: "Front-end", items: ["HTML", "CSS", "JavaScript"] },
  { category: "Banco de dados", items: ["MySQL", "PostgreSQL"] },
  {
    category: "Ferramentas e plataformas",
    items: ["Git", "GitHub", "VS Code", "IntelliJ IDEA"],
  },
];

export const education = {
  title: "Bacharelado em Sistemas de Informação",
  org: "Universidade Federal de Santa Maria (UFSM)",
  period: "Em andamento",
  detail:
    "Algoritmos, estruturas de dados, banco de dados, engenharia de software e gestão de projetos.",
};
