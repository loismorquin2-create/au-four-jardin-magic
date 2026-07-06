import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";

export const Route = createFileRoute("/mentions-legales")({
  head: () => ({
    meta: [
      { title: "Mentions légales — Au four & au jardin" },
      { name: "description", content: "Mentions légales du site Au four & au jardin, pizzeria artisanale à Andlau." },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: MentionsLegales,
});

function Placeholder({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-block px-2 py-0.5 bg-accent/15 text-accent border border-accent/30 rounded-sm text-sm">
      {children}
    </span>
  );
}

function MentionsLegales() {
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
        <p className="text-xs uppercase tracking-[0.3em] text-accent mb-4">Informations légales</p>
        <h1 className="text-4xl md:text-5xl font-bold mb-10">Mentions légales</h1>

        <div className="space-y-10 text-sm leading-relaxed text-muted-foreground">
          <section>
            <h2 className="font-display text-2xl text-foreground mb-3">Éditeur du site</h2>
            <p>
              <strong className="text-foreground">Au four & au jardin</strong>
              <br />
              5b rue de la Commanderie, 67140 Andlau, France
              <br />
              Téléphone : <a href="tel:+33667485852" className="text-primary">06 67 48 58 52</a>
              <br />
              Forme juridique : <Placeholder>À compléter (SARL, EURL, micro-entreprise…)</Placeholder>
              <br />
              SIRET : <Placeholder>À compléter</Placeholder>
              <br />
              N° TVA intracommunautaire : <Placeholder>À compléter (le cas échéant)</Placeholder>
            </p>
          </section>

          <section>
            <h2 className="font-display text-2xl text-foreground mb-3">Responsable de publication</h2>
            <p>
              <Placeholder>À compléter — nom et prénom du responsable</Placeholder>
              <br />
              Contact : <Placeholder>À compléter — email de contact</Placeholder>
            </p>
          </section>

          <section>
            <h2 className="font-display text-2xl text-foreground mb-3">Hébergement</h2>
            <p>
              Ce site est hébergé par :
              <br />
              <Placeholder>À compléter — nom de l'hébergeur</Placeholder>
              <br />
              <Placeholder>À compléter — adresse postale de l'hébergeur</Placeholder>
              <br />
              <Placeholder>À compléter — téléphone / site web de l'hébergeur</Placeholder>
            </p>
          </section>

          <section>
            <h2 className="font-display text-2xl text-foreground mb-3">Propriété intellectuelle</h2>
            <p>
              L'ensemble du contenu de ce site (textes, images, logos, éléments graphiques) est
              protégé par le droit d'auteur. Toute reproduction, représentation ou diffusion,
              totale ou partielle, sans autorisation écrite préalable, est interdite.
            </p>
          </section>

          <section>
            <h2 className="font-display text-2xl text-foreground mb-3">Crédits</h2>
            <p>
              Photographies : <Placeholder>À compléter — crédit photo</Placeholder>
              <br />
              Conception : <Placeholder>À compléter</Placeholder>
            </p>
          </section>

          <section>
            <h2 className="font-display text-2xl text-foreground mb-3">Contact</h2>
            <p>
              Pour toute question relative aux présentes mentions légales, vous pouvez nous
              contacter via le formulaire de la page d'accueil ou par téléphone au{" "}
              <a href="tel:+33667485852" className="text-primary">06 67 48 58 52</a>.
            </p>
          </section>
        </div>

        <div className="mt-16 pt-8 border-t border-border/40 flex flex-wrap gap-4 text-sm">
          <Link to="/confidentialite" className="text-muted-foreground hover:text-foreground">
            Politique de confidentialité →
          </Link>
          <Link to="/" className="text-muted-foreground hover:text-foreground">
            ← Retour à l'accueil
          </Link>
        </div>
      </main>
    </div>
  );
}
