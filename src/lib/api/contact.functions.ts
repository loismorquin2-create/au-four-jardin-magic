import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

const MOTIFS = [
  "Question générale",
  "Commande groupe / événement",
  "Allergènes / intolérances",
  "Privatisation terrasse",
  "Autre",
] as const;

const schema = z.object({
  name: z.string().trim().min(2).max(100),
  phone: z.string().trim().min(6).max(30),
  email: z.string().trim().email().max(255).optional().or(z.literal("")),
  motif: z.enum(MOTIFS),
  date: z.string().optional(),
  message: z.string().trim().min(5).max(2000),
});

const RECIPIENT = "loismorquin2@gmail.com";
const BUSINESS = "Au four & au jardin";

function escapeHtml(s: string) {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

export const sendContactEmail = createServerFn({ method: "POST" })
  .inputValidator((data: unknown) => schema.parse(data))
  .handler(async ({ data }) => {
    const lovableKey = process.env.LOVABLE_API_KEY;
    const resendKey = process.env.RESEND_API_KEY;
    if (!lovableKey || !resendKey) {
      throw new Error("Email service not configured");
    }

    const rows: [string, string][] = [
      ["Nom", data.name],
      ["Téléphone", data.phone],
      ["Email", data.email || "—"],
      ["Motif", data.motif],
    ];
    if (data.date) rows.push(["Date souhaitée", data.date]);

    const html = `
      <div style="font-family:Arial,sans-serif;color:#111;line-height:1.5">
        <h2 style="margin:0 0 16px">Nouveau message du site — ${escapeHtml(BUSINESS)}</h2>
        <table style="border-collapse:collapse;margin-bottom:16px">
          ${rows
            .map(
              ([k, v]) =>
                `<tr><td style="padding:6px 12px 6px 0;color:#666"><strong>${escapeHtml(
                  k,
                )}</strong></td><td style="padding:6px 0">${escapeHtml(v)}</td></tr>`,
            )
            .join("")}
        </table>
        <div>
          <div style="color:#666;margin-bottom:6px"><strong>Message</strong></div>
          <div style="white-space:pre-wrap;padding:12px;background:#f5f5f5;border-radius:6px">${escapeHtml(
            data.message,
          )}</div>
        </div>
      </div>
    `;

    const text = [
      ...rows.map(([k, v]) => `${k}: ${v}`),
      "",
      "Message:",
      data.message,
    ].join("\n");

    const res = await fetch("https://connector-gateway.lovable.dev/resend/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${lovableKey}`,
        "X-Connection-Api-Key": resendKey,
      },
      body: JSON.stringify({
        from: `${BUSINESS} <onboarding@resend.dev>`,
        to: [RECIPIENT],
        reply_to: data.email || undefined,
        subject: `Nouveau message du site — ${BUSINESS}`,
        html,
        text,
      }),
    });

    if (!res.ok) {
      const body = await res.text();
      console.error("Resend gateway error", res.status, body);
      throw new Error("Échec de l'envoi");
    }

    return { ok: true as const };
  });
