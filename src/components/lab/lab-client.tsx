"use client";

import { useCallback, useEffect, useRef, useState, type FormEvent } from "react";
import Field from "@/components/field";
import { buttonPrimaryClass, inputClass } from "@/lib/ui";
import PostsChart from "./posts-chart";

export type Post = { userId: number; id: number; title: string; body: string };

const API = "https://jsonplaceholder.typicode.com/posts";
const LOCAL_ID_BASE = 100;
const PREVIEW_COUNT = 12;

export default function LabClient() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [status, setStatus] = useState<"loading" | "ready" | "error">(
    "loading",
  );
  const [form, setForm] = useState({ title: "", body: "" });
  const [saving, setSaving] = useState(false);
  const [notice, setNotice] = useState("");

  const controllerRef = useRef<AbortController | null>(null);
  const localIdRef = useRef(LOCAL_ID_BASE);

  const load = useCallback(() => {
    controllerRef.current?.abort();
    const controller = new AbortController();
    controllerRef.current = controller;

    fetch(API, { signal: controller.signal })
      .then((response) => {
        if (!response.ok) throw new Error("request failed");
        return response.json();
      })
      .then((data: Post[]) => {
        if (controller.signal.aborted) return;
        setPosts(data);
        setStatus("ready");
      })
      .catch((error: unknown) => {
        if (error instanceof DOMException && error.name === "AbortError") return;
        setStatus("error");
      });
  }, []);

  useEffect(() => {
    load();
    return () => controllerRef.current?.abort();
  }, [load]);

  async function addPost(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (form.title.trim().length < 3) {
      setNotice("Escreva um título com pelo menos 3 caracteres.");
      return;
    }

    setSaving(true);
    setNotice("");
    try {
      const response = await fetch(API, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: form.title,
          body: form.body,
          userId: 1,
        }),
      });
      if (!response.ok) throw new Error("request failed");

      setPosts((previous) => [
        {
          userId: 1,
          id: (localIdRef.current += 1),
          title: form.title,
          body: form.body,
        },
        ...previous,
      ]);
      setForm({ title: "", body: "" });
      setNotice("A API devolveu uma postagem nova.");
    } catch {
      setNotice("A criação falhou. Tente novamente.");
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="space-y-8">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-ink-line pb-4 text-xs text-muted">
        <span>
          GET /posts →{" "}
          {status === "loading"
            ? "carregando..."
            : status === "ready"
              ? `${posts.length} registros`
              : "falha na requisição"}
        </span>
        <button
          type="button"
          onClick={() => {
            setStatus("loading");
            load();
          }}
          className="rounded-md border border-ink-line px-3.5 py-1.5 text-muted transition-colors hover:border-signal hover:text-paper"
        >
          recarregar
        </button>
      </div>

      <div className="rounded-md border border-ink-line bg-ink-raised p-5 md:p-6">
        <h2 className="font-display text-lg text-paper">
          Postagens por usuário
        </h2>
        <div className="mt-5 h-[280px]">
          {status === "ready" ? (
            <PostsChart posts={posts} />
          ) : (
            <p className="flex h-full items-center justify-center text-sm text-muted">
              {status === "loading" ? "carregando dados..." : "sem dados"}
            </p>
          )}
        </div>
      </div>

      <div className="grid gap-8 md:grid-cols-2">
        <form
          onSubmit={addPost}
          className="rounded-md border border-ink-line bg-ink-raised p-5 md:p-6"
        >
          <h2 className="font-display text-lg text-paper">Criar postagem</h2>
          <p className="mt-1 text-xs text-muted">POST /posts</p>

          <div className="mt-5 space-y-4">
            <Field label="Título" htmlFor="post-title">
              <input
                id="post-title"
                className={inputClass}
                value={form.title}
                onChange={(event) =>
                  setForm((previous) => ({
                    ...previous,
                    title: event.target.value,
                  }))
                }
                placeholder="Título da postagem"
              />
            </Field>

            <Field label="Conteúdo" htmlFor="post-body">
              <textarea
                id="post-body"
                className={`${inputClass} min-h-[110px] resize-y`}
                value={form.body}
                onChange={(event) =>
                  setForm((previous) => ({
                    ...previous,
                    body: event.target.value,
                  }))
                }
                placeholder="Escreva o conteúdo."
              />
            </Field>

            <div className="flex flex-wrap items-center gap-4">
              <button
                type="submit"
                disabled={saving}
                className={buttonPrimaryClass}
              >
                {saving ? "Enviando..." : "Criar"}
              </button>
              {notice ? (
                <span className="text-xs text-muted">{notice}</span>
              ) : null}
            </div>
          </div>
        </form>

        <div className="rounded-md border border-ink-line bg-ink-raised p-5 md:p-6">
          <h2 className="font-display text-lg text-paper">
            Últimas postagens
          </h2>
          <ul
            tabIndex={0}
            aria-label="Lista de postagens"
            className="mt-5 max-h-[420px] space-y-3 overflow-y-auto pr-1"
          >
            {posts.slice(0, PREVIEW_COUNT).map((post) => (
              <li
                key={post.id}
                className="border-t border-ink-line pt-3 first:border-t-0 first:pt-0"
              >
                <div className="flex items-center gap-2 text-xs text-muted">
                  <span>#{post.id}</span>
                  <span>usuário {post.userId}</span>
                </div>
                <p className="mt-1 text-sm font-medium text-paper">
                  {post.title}
                </p>
                <p className="mt-1 line-clamp-2 text-xs leading-relaxed text-muted">
                  {post.body}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
