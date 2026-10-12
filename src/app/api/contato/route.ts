import { isEmail, MESSAGE_MIN, NAME_MIN } from "@/lib/validation";

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);

  if (
    !body ||
    typeof body.nome !== "string" ||
    typeof body.email !== "string" ||
    typeof body.mensagem !== "string" ||
    body.nome.trim().length < NAME_MIN ||
    body.mensagem.trim().length < MESSAGE_MIN ||
    !isEmail(body.email)
  ) {
    return Response.json(
      { ok: false, error: "Preencha nome, um e-mail válido e uma mensagem." },
      { status: 400 },
    );
  }

  return Response.json({ ok: true });
}
