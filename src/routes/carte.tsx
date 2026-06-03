import { createFileRoute, Link } from "@tanstack/react-router";
import { Phone, Leaf, Flame, ArrowLeft } from "lucide-react";

export const Route = createFileRoute("/carte")({
  head: () => ({
    meta: [
      { title: "La carte complète — Au four & au jardin, Andlau" },
      { name: "description", content: "Découvrez toutes nos pizzas sauce tomate et sauce crème : Margherita, Parma, Gualtiero, Alsacienne, Hohwaldoise et bien d'autres." },
      { property: "og:title", content: "La carte complète — Au four & au jardin" },
      { property: "og:description", content: "Une autre façon de concevoir la pizza. Carte complète : pizzas sauce tomate et sauce crème." },
    ],
  }),
  component: CartePage,
});

type Pizza = {
  name: string;
  price: string;
  desc?: string;
  veg?: boolean;
  isNew?: boolean;
  extra?: string;
};

const sauceTomate: Pizza[] = [
  { name: "Margherita", price: "10,00€", desc: "Mozzarella", veg: true },
  { name: "Napolitaine", price: "11,00€", desc: "Mozzarella, anchois de Monaco, câpres" },
  { name: "Terra Mare", price: "12,50€", desc: "Mozzarella, chorizo, anchois, olives noires" },
  { name: "Gorgonzola", price: "12,50€", desc: "Mozzarella, gorgonzola (San Angelo), olives noires", isNew: true },
  { name: "Fromagère", price: "13,00€", desc: "Mozzarella, chèvre, gorgonzola", veg: true, extra: "Supplément Pecorino truffé + truffade : +2€" },
  { name: "Mexicaine", price: "13,00€", desc: "Mozzarella, chorizo, maïs, poivrons grillés marinés, huile piquante maison" },
  { name: "Melanzana", price: "13,00€", desc: "Mozzarella, champignons, persillade*, aubergines, poivrons, oignons", veg: true },
  { name: "Paysanne", price: "13,50€", desc: "Mozzarella, chèvre, lardons salés à sec d'un artisan boucher local, oignons", extra: "Touche de champignons offerte sur demande" },
  { name: "Capri", price: "13,50€", desc: "Mozzarella, chèvre, miel d'Andlau bio", veg: true },
  { name: "Vivaldi Verde", price: "13,50€", desc: "Mozzarella, champignons, persillade*, artichaud marinés, olives noires", veg: true, isNew: true },
  { name: "Vivaldi Carne", price: "15,00€", desc: "Comme la Verde + jambon blanc local peu nitrité", isNew: true },
  { name: "Reine", price: "14,50€", desc: "Mozzarella, jambon blanc (faiblement nitrité), champignons, persillade*" },
  { name: "Impératrice", price: "15,50€", desc: "Comme la Reine + un œuf fermier" },
  { name: "Parma", price: "15,00€", desc: "Mozzarella, jambon de Parme 24 mois entier, avec roquette et copeaux de parmesan dans un contenant séparé" },
  { name: "Gualtiero", price: "17,00€", desc: "Mozzarella, champignons, crème fraîche, truffade, pecorino truffé", veg: true },
  { name: "Calzone", price: "15,50€", desc: "Mozzarella, jambon blanc artisanal faiblement nitrité, champignons, persillade*, œuf fermier" },
];

const sauceCreme: Pizza[] = [
  { name: "L'Alsacienne", price: "11,00€", desc: "Esprit Tarte flambée : lardons salés à sec d'un artisan boucher local, oignons" },
  { name: "Forestière Truffée", price: "13,00€", desc: "Comme l'Alsacienne, avec champignons et truffade" },
  { name: "Hohwaldoise", price: "13,00€", desc: "Fromage bio façon munster, oignons, lard", isNew: true },
  { name: "Orientale", price: "14,00€", desc: "Poulet fermier d'Alsace mariné, épices, oignons, poivrons grillés marinés" },
];

function PizzaCard({ p, accent }: { p: Pizza; accent: "primary" | "secondary" }) {
  const border = accent === "primary" ? "hover:border-primary/60" : "hover:border-secondary/60";
  const price = accent === "primary" ? "text-primary" : "text-secondary";
  return (
    <article className={`p-6 bg-background/60 backdrop-blur border border-border/60 ${border} transition-all hover:-translate-y-0.5 duration-300`}>
      <div className="flex items-start justify-between gap-4 mb-2">
        <div className="flex items-center gap-2 flex-wrap">
          <h3 className="font-display text-xl uppercase tracking-wide">{p.name}</h3>
          {p.veg && <Leaf className="w-4 h-4 text-secondary" aria-label="Végétarien" />}
          {p.isNew && (
            <span className="text-[10px] uppercase tracking-[0.2em] bg-primary/90 text-primary-foreground px-2 py-0.5 rounded-full">New</span>
          )}
        </div>
        <span className={`font-display text-lg ${price} shrink-0`}>{p.price}</span>
      </div>
      {p.desc && <p className="text-sm text-muted-foreground leading-relaxed">{p.desc}</p>}
      {p.extra && <p className="text-xs italic text-muted-foreground/80 mt-2">{p.extra}</p>}
    </article>
  );
}

function CartePage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="fixed top-0 inset-x-0 z-50 backdrop-blur-md bg-background/70 border-b border-border/40">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link to="/" className="font-display text-lg tracking-tight">
            <span className="text-primary">Au four</span>
            <span className="text-muted-foreground"> & </span>
            <span className="text-secondary">au jardin</span>
          </Link>
          <nav className="hidden md:flex items-center gap-8 text-sm text-muted-foreground">
            <Link to="/" className="hover:text-foreground transition inline-flex items-center gap-1">
              <ArrowLeft className="w-3.5 h-3.5" /> Accueil
            </Link>
            <Link to="/galerie" className="hover:text-foreground transition">Galerie</Link>
          </nav>
          <a
            href="tel:0667485852"
            className="inline-flex items-center gap-2 rounded-full bg-primary text-primary-foreground px-4 py-2 text-sm font-medium hover:bg-primary-glow transition"
          >
            <Phone className="w-4 h-4" /> Commander
          </a>
        </div>
      </header>

      <section className="pt-32 pb-16 text-center max-w-3xl mx-auto px-6">
        <p className="text-xs uppercase tracking-[0.3em] text-accent mb-4">La carte complète</p>
        <h1 className="text-4xl md:text-6xl font-bold mb-6">Une autre façon de concevoir <em className="italic text-primary">la pizza.</em></h1>
        <p className="text-muted-foreground">Pâte longue maturation, four à bois, produits majoritairement locaux et bio. Carte évolutive selon les arrivages.</p>
      </section>

      {/* SAUCE TOMATE */}
      <section className="max-w-7xl mx-auto px-6 pb-20">
        <div className="flex items-center gap-4 mb-10">
          <div className="h-px flex-1 bg-primary/40" />
          <h2 className="font-display text-3xl md:text-4xl text-primary flex items-center gap-2">
            <Flame className="w-6 h-6" /> Sauce tomate
          </h2>
          <div className="h-px flex-1 bg-primary/40" />
        </div>
        <div className="grid md:grid-cols-2 gap-5">
          {sauceTomate.map((p) => <PizzaCard key={p.name} p={p} accent="primary" />)}
        </div>
      </section>

      {/* SAUCE CRÈME */}
      <section className="max-w-7xl mx-auto px-6 pb-20">
        <div className="flex items-center gap-4 mb-10">
          <div className="h-px flex-1 bg-secondary/40" />
          <h2 className="font-display text-3xl md:text-4xl text-secondary">Sauce crème</h2>
          <div className="h-px flex-1 bg-secondary/40" />
        </div>
        <div className="grid md:grid-cols-2 gap-5">
          {sauceCreme.map((p) => <PizzaCard key={p.name} p={p} accent="secondary" />)}
        </div>
        <p className="text-center text-sm text-muted-foreground italic mt-8">Touche gratinée ou champignons offerte sur demande.</p>
      </section>

      {/* LÉGENDE / NOTES */}
      <section className="max-w-4xl mx-auto px-6 pb-20">
        <div className="border border-border/60 bg-card/40 p-8 space-y-4 text-sm">
          <p className="flex items-start gap-3"><Leaf className="w-4 h-4 text-secondary mt-0.5 shrink-0" /> <span><strong>Végétarien</strong> 13€\n sans viande, sans poisson.</span></p>
          <p><span className="text-primary font-bold">*</span> <strong>Persillade</strong> : huile d'olive extra vierge pressée à froid + ail + persil.</p>
          <p className="flex items-start gap-3"><Flame className="w-4 h-4 text-primary mt-0.5 shrink-0" /> <span><strong>Supplément offert au choix</strong> : huile olive extra vierge piquante avec aromates du jardin, baies de genévrier... et/ou olives noires.</span></p>
          <p><strong>Supplément œuf fermier</strong> : 1€</p>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-card/40 border-t border-border/40 py-16">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <p className="text-xs uppercase tracking-[0.3em] text-accent mb-4">Réservation</p>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Réservez à partir de 14h</h2>
          <p className="text-muted-foreground mb-8">N'hésitez pas à demander la suggestion du moment.</p>
          <a
            href="tel:0667485852"
            className="inline-flex items-center gap-2 rounded-full bg-primary text-primary-foreground px-6 py-3 font-medium hover:bg-primary-glow transition"
          >
            <Phone className="w-4 h-4" /> 06.67.48.58.52
          </a>
          <p className="text-sm text-muted-foreground mt-8">
            Ouvert les soirs de 18h à 21h15, du vendredi au lundi & lundi midi.<br />
            5b rue de la Commanderie 13€\n Andlau
          </p>
        </div>
      </section>
    </div>
  );
}
