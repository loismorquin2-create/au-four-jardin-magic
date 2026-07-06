import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";

export const Route = createFileRoute("/confidentialite")({
  head: () => ({
    meta: [
      { title: "Politique de confidentialité — Au four & au jardin" },
      { name: "description", content: "Politique de confidentialité et traitement des données personnelles pour Au four & au jardin." },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: Confidentialite,
});

function Placeholder({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-block px-2 py-0.5 bg-accent/15 text-accent border border-accent/30 rounded-sm text-sm">
      {children}
    </span>
  );
}

function Confidentialite() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="border-b border-border/40">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link to="/" className="font-display text-lg tracking-tight">
            <span className="text-primary">Au four</span>
            <span className="text-muted-foreground"> & </span>
            <span className="text-secondary">au jardin</span>
          </Link>
          <Link to="/" className="text-sm text-muted-foreground hover:text-foreground inline-flex items-center gap-1">
            <ArrowLeft className="w-4 h-4" /> Accueil
          </Link>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-6 py-16">
        <p className="text-xs uppercase tracking-[0.3em] text-accent mb-4">Vie privée</p>
        <h1 className="text-4xl md:text-5xl font-bold mb-10">Politique de confidentialité</h1>

        <div className="space-y-10 text-sm leading-relaxed text-muted-foreground">
          <section>
            <h2 className="font-display text-2xl text-foreground mb-3">Responsable du traitement</h2>
            <p>
              Les données personnelles collectées sur ce site sont traitées par :
              <br />
              <strong className="text-foreground">Au four & au jardin</strong>, 5b rue de la Commanderie, 67140 Andlau.
              <br />
              Responsable du traitement : <Placeholder>À compléter — nom et prénom</Placeholder>
              <br />
              Contact : <Placeholder>À compléter — email de contact</Placeholder>
            </p>
          </section>

          <section>
            <h2 className="font-display text-2xl text-foreground mb-3">Données collectées via le formulaire de contact</h2>
            <p>
              Lorsque vous utilisez notre formulaire de contact, nous collectons les informations
              suivantes :
            </p>
            <ul className="list-disc pl-6 mt-3 space-y-1">
              <li>Nom</li>
              <li>Numéro de téléphone</li>
              <li>Adresse email (optionnelle)</li>
              <li>Motif de la demande</li>
              <li>Date souhaitée (le cas échéant)</li>
              <li>Contenu du message</li>
            </ul>
          </section>

          <section>
            <h2 className="font-display text-2xl text-foreground mb-3">Finalité du traitement</h2>
            <p>
              Ces informations sont utilisées uniquement pour répondre à votre demande et vous
              recontacter dans le cadre de votre sollicitation (réservation, question,
              commande de groupe, privatisation, information sur les allergènes). Elles ne font
              l'objet d'aucune revente, ni d'aucune utilisation à des fins commerciales ou
              publicitaires.
            </p>
          </section>

          <section>
            <h2 className="font-display text-2xl text-foreground mb-3">Base légale</h2>
            <p>
              Le traitement repose sur votre consentement, matérialisé par la case à cocher
              présente sur le formulaire de contact (art. 6.1.a du RGPD).
            </p>
          </section>

          <section>
            <h2 className="font-display text-2xl text-foreground mb-3">Destinataires des données</h2>
            <p>
              Vos données sont transmises par email à l'équipe d'Au four & au jardin via notre
              prestataire d'envoi d'emails <strong className="text-foreground">Resend</strong>
              (resend.com). Elles ne sont communiquées à aucun autre tiers.
              <br />
              Durée de conservation : <Placeholder>À compléter — ex. 12 mois après le dernier échange</Placeholder>.
            </p>
          </section>

          <section>
            <h2 className="font-display text-2xl text-foreground mb-3">Cookies</h2>
            <p>
              Ce site n'utilise pas de cookies de suivi publicitaire ni d'outils de mesure
              d'audience nécessitant votre consentement.
              <br />
              La page contact intègre une carte Google Maps ; l'ouverture de cette carte peut
              entraîner le dépôt de cookies par Google, sur lesquels nous n'avons pas la main.
            </p>
          </section>

          <section>
            <h2 className="font-display text-2xl text-foreground mb-3">Vos droits</h2>
            <p>
              Conformément au Règlement Général sur la Protection des Données (RGPD) et à la loi
              « Informatique et Libertés », vous disposez d'un droit d'accès, de rectification,
              d'effacement, de limitation, d'opposition et de portabilité de vos données.
              <br />
              Pour exercer ces droits, contactez-nous à :{" "}
              <Placeholder>À compléter — email de contact</Placeholder>.
              <br />
              Vous disposez également du droit d'introduire une réclamation auprès de la CNIL
              (<a href="https://www.cnil.fr" target="_blank" rel="noopener noreferrer" className="text-primary">www.cnil.fr</a>).
            </p>
          </section>
        </div>

        <div className="mt-16 pt-8 border-t border-border/40 flex flex-wrap gap-4 text-sm">
          <Link to="/mentions-legales" className="text-muted-foreground hover:text-foreground">
            Mentions légales →
          </Link>
          <Link to="/" className="text-muted-foreground hover:text-foreground">
            ← Retour à l'accueil
          </Link>
        </div>
      </main>
    </div>
  );
}
