import type { Metadata } from "next";
import PageShell from "@/components/page-shell";
import LabClient from "@/components/lab/lab-client";

export const metadata: Metadata = {
  title: "Laboratório",
  description:
    "Demonstrações com APIs públicas: leitura e criação de postagens no JSONPlaceholder e um gráfico com Chart.js.",
};

export default function LaboratorioPage() {
  return (
    <PageShell
      title="Laboratório"
      intro="Duas chamadas assíncronas a APIs públicas do JSONPlaceholder: leitura de postagens e criação de uma postagem, com um gráfico de Chart.js sobre os dados retornados."
    >
      <LabClient />
    </PageShell>
  );
}
