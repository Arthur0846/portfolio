"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import Field from "@/components/field";
import { buttonPrimaryClass, buttonSecondaryClass, inputClass } from "@/lib/ui";
import { isEmail, MESSAGE_MIN, NAME_MIN } from "@/lib/validation";

type FormState = {
  nome: string;
  email: string;
  cep: string;
  rua: string;
  bairro: string;
  cidade: string;
  uf: string;
  mensagem: string;
};

type CepStatus = "idle" | "loading" | "ok" | "notfound" | "error";
type SubmitStatus = "idle" | "sending" | "sent" | "error";

const INITIAL: FormState = {
  nome: "",
  email: "",
  cep: "",
  rua: "",
  bairro: "",
  cidade: "",
  uf: "",
  mensagem: "",
};

function formatCep(value: string) {
  const digits = value.replace(/\D/g, "").slice(0, 8);
  return digits.length > 5
    ? `${digits.slice(0, 5)}-${digits.slice(5)}`
    : digits;
}

export default function ContactForm() {
  const [form, setForm] = useState<FormState>(INITIAL);
  const [errors, setErrors] = useState<
    Partial<Record<keyof FormState, string>>
  >({});
  const [cepStatus, setCepStatus] = useState<CepStatus>("idle");
  const [submitStatus, setSubmitStatus] = useState<SubmitStatus>("idle");

  const cepControllerRef = useRef<AbortController | null>(null);

  useEffect(() => {
    return () => cepControllerRef.current?.abort();
  }, []);

  function update(key: keyof FormState, value: string) {
    setForm((previous) => ({ ...previous, [key]: value }));
  }

  function handleCepChange(raw: string) {
    const formatted = formatCep(raw);
    setForm((previous) => ({ ...previous, cep: formatted }));

    cepControllerRef.current?.abort();
    const digits = formatted.replace(/\D/g, "");

    if (digits.length !== 8) {
      setCepStatus("idle");
      setForm((previous) => ({
        ...previous,
        rua: "",
        bairro: "",
        cidade: "",
        uf: "",
      }));
      return;
    }

    const controller = new AbortController();
    cepControllerRef.current = controller;
    setCepStatus("loading");

    fetch(`https://viacep.com.br/ws/${digits}/json/`, {
      signal: controller.signal,
    })
      .then((response) => {
        if (!response.ok) throw new Error("request failed");
        return response.json();
      })
      .then((data) => {
        if (controller.signal.aborted) return;
        if (data.erro) {
          setCepStatus("notfound");
          return;
        }
        setForm((previous) => ({
          ...previous,
          rua: data.logradouro ?? "",
          bairro: data.bairro ?? "",
          cidade: data.localidade ?? "",
          uf: data.uf ?? "",
        }));
        setCepStatus("ok");
      })
      .catch((error: unknown) => {
        if (error instanceof DOMException && error.name === "AbortError") return;
        setCepStatus("error");
      });
  }

  function validate() {
    const next: Partial<Record<keyof FormState, string>> = {};
    if (form.nome.trim().length < NAME_MIN) next.nome = "Informe seu nome.";
    if (!isEmail(form.email)) next.email = "Informe um e-mail válido.";
    if (form.mensagem.trim().length < MESSAGE_MIN)
      next.mensagem = "Escreva ao menos 10 caracteres.";
    return next;
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const next = validate();
    setErrors(next);
    if (Object.keys(next).length > 0) return;

    setSubmitStatus("sending");
    try {
      const response = await fetch("/api/contato", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!response.ok) throw new Error("request failed");
      setSubmitStatus("sent");
    } catch {
      setSubmitStatus("error");
    }
  }

  function reset() {
    setForm(INITIAL);
    setErrors({});
    setCepStatus("idle");
    setSubmitStatus("idle");
  }

  if (submitStatus === "sent") {
    return (
      <div className="rounded-md border border-ink-line bg-ink-raised p-8 md:p-10">
        <p className="font-display text-xl text-paper">Mensagem enviada</p>
        <p className="mt-4 max-w-[52ch] text-base leading-relaxed text-paper">
          Obrigado, {form.nome.split(" ")[0] || "tudo bem"}. Recebi sua mensagem
          e respondo no e-mail que você informou.
        </p>
        <button
          type="button"
          onClick={reset}
          className={`mt-7 ${buttonSecondaryClass}`}
        >
          Enviar outra mensagem
        </button>
      </div>
    );
  }

  const cepHint =
    cepStatus === "loading" ? (
      <span className="text-xs text-muted">consultando ViaCEP...</span>
    ) : cepStatus === "ok" ? (
      <span className="text-xs text-signal">endereço preenchido</span>
    ) : cepStatus === "notfound" ? (
      <span className="text-xs text-danger">CEP não encontrado</span>
    ) : cepStatus === "error" ? (
      <span className="text-xs text-danger">falha na consulta</span>
    ) : (
      <span className="text-xs text-muted">00000-000</span>
    );

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      className="rounded-md border border-ink-line bg-ink-raised p-6 md:p-8"
    >
      <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
        <Field label="Nome" htmlFor="nome" error={errors.nome}>
          <input
            id="nome"
            className={inputClass}
            value={form.nome}
            onChange={(event) => update("nome", event.target.value)}
            placeholder="Seu nome"
            autoComplete="name"
            aria-invalid={errors.nome ? true : undefined}
            aria-describedby={errors.nome ? "nome-error" : undefined}
          />
        </Field>

        <Field label="E-mail" htmlFor="email" error={errors.email}>
          <input
            id="email"
            type="email"
            className={inputClass}
            value={form.email}
            onChange={(event) => update("email", event.target.value)}
            placeholder="voce@email.com"
            autoComplete="email"
            aria-invalid={errors.email ? true : undefined}
            aria-describedby={errors.email ? "email-error" : undefined}
          />
        </Field>

        <Field
          label="CEP"
          htmlFor="cep"
          hint={cepHint}
          className="md:col-span-2 md:max-w-[220px]"
        >
          <input
            id="cep"
            className={inputClass}
            value={form.cep}
            onChange={(event) => handleCepChange(event.target.value)}
            placeholder="97000-000"
            inputMode="numeric"
            autoComplete="postal-code"
          />
        </Field>

        <Field label="Rua" htmlFor="rua" className="md:col-span-2">
          <input
            id="rua"
            className={inputClass}
            value={form.rua}
            onChange={(event) => update("rua", event.target.value)}
            placeholder="Preenchido pelo CEP"
          />
        </Field>

        <Field label="Bairro" htmlFor="bairro">
          <input
            id="bairro"
            className={inputClass}
            value={form.bairro}
            onChange={(event) => update("bairro", event.target.value)}
            placeholder="Preenchido pelo CEP"
          />
        </Field>

        <div className="grid grid-cols-[minmax(0,1fr)_88px] gap-4">
          <Field label="Cidade" htmlFor="cidade">
            <input
              id="cidade"
              className={inputClass}
              value={form.cidade}
              onChange={(event) => update("cidade", event.target.value)}
              placeholder="Preenchido pelo CEP"
            />
          </Field>
          <Field label="UF" htmlFor="uf">
            <input
              id="uf"
              className={inputClass}
              value={form.uf}
              onChange={(event) => update("uf", event.target.value.toUpperCase())}
              placeholder="RS"
              maxLength={2}
            />
          </Field>
        </div>

        <Field
          label="Mensagem"
          htmlFor="mensagem"
          error={errors.mensagem}
          className="md:col-span-2"
        >
          <textarea
            id="mensagem"
            className={`${inputClass} min-h-[130px] resize-y`}
            value={form.mensagem}
            onChange={(event) => update("mensagem", event.target.value)}
            placeholder="Conte o que você tem em mente."
            aria-invalid={errors.mensagem ? true : undefined}
            aria-describedby={errors.mensagem ? "mensagem-error" : undefined}
          />
        </Field>
      </div>

      <div className="mt-7 flex flex-wrap items-center gap-4">
        <button
          type="submit"
          disabled={submitStatus === "sending"}
          className={buttonPrimaryClass}
        >
          {submitStatus === "sending" ? "Enviando..." : "Enviar mensagem"}
        </button>
        {submitStatus === "error" ? (
          <span className="text-xs text-danger">
            Não foi possível enviar. Tente novamente.
          </span>
        ) : null}
      </div>
    </form>
  );
}
