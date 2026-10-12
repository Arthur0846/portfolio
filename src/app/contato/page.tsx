import type { Metadata } from "next";
import PageShell from "@/components/page-shell";
import ContactForm from "@/components/contact-form";

export const metadata: Metadata = {
  title: "Contato",
  description: "Formulário de contato de Arthur Schmidt Lorentz.",
};

export default function ContatoPage() {
  return (
    <PageShell
      title="Formulário de contato"
      intro="Preencha os campos abaixo. Quando o CEP tem oito dígitos, a página consulta a API pública do ViaCEP e completa o endereço automaticamente."
    >
      <ContactForm />
    </PageShell>
  );
}
