import { createFileRoute, Link } from "@tanstack/react-router";
import heroPizza from "@/assets/hero-pizza.jpg";
import oven from "@/assets/oven.jpg";
import ingredients from "@/assets/ingredients.jpg";
import terrace from "@/assets/terrace.jpg";
import galCabane from "@/assets/gallery/terrasse-cabane.jpg.asset.json";
import galSandwich from "@/assets/gallery/andlav-sandwich.jpg.asset.json";
import { Phone, MapPin, Clock, Flame, Leaf, ShoppingBag } from "lucide-react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Au four & au jardin — Pizzeria artisanale à Andlau" },
      { name: "description", content: "Pizzas au feu de bois, pâte longue maturation et produits locaux d'Alsace. À emporter à Andlau." },
      { property: "og:title", content: "Au four & au jardin — Pizzeria à Andlau" },
      { property: "og:description", content: "Une autre façon de concevoir la pizza. Produits de qualité, majoritairement locaux." },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      {/* NAV */}
      <header className="fixed top-0 inset-x-0 z-50 backdrop-blur-md bg-background/70 border-b border-border/40">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <a href="#top" className="font-display text-lg tracking-tight">
            <span className="text-primary">Au four</span>
            <span className="text-muted-foreground"> & </span>
            <span className="text-secondary">au jardin</span>
          </a>
          <nav className="hidden md:flex items-center gap-8 text-sm text-muted-foreground">
            <a href="#histoire" className="hover:text-foreground transition">L'histoire</a>
            <Link to="/carte" className="hover:text-foreground transition">La carte</Link>
            <a href="#terrasse" className="hover:text-foreground transition">La terrasse</a>
            <Link to="/galerie" className="hover:text-foreground transition">Galerie</Link>
            <a href="#contact" className="hover:text-foreground transition">Contact</a>
          </nav>
          <a
            href="tel:0667485852"
            className="inline-flex items-center gap-2 rounded-full bg-primary text-primary-foreground px-4 py-2 text-sm font-medium hover:bg-primary-glow transition"
          >
            <Phone className="w-4 h-4" /> Commander
          </a>
        </div>
      </header>

      {/* HERO */}
      <section id="top" className="relative min-h-screen flex items-center pt-24">
        <div className="absolute inset-0">
          <img src={heroPizza} alt="Pizza artisanale au feu de bois" className="w-full h-full object-cover opacity-40" width={1600} height={1200} />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/70 to-background/30" />
          <div className="absolute -top-32 -right-32 w-[500px] h-[500px] rounded-full" style={{ background: "var(--gradient-ember)", filter: "blur(120px)", opacity: 0.25, animation: "flicker 4s ease-in-out infinite" }} />
        </div>
        <div className="relative max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">
          <div style={{ animation: "float-up 0.8s ease-out" }}>
            <p className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.3em] text-accent mb-6">
              <Flame className="w-4 h-4" /> Pizzeria · Andlau, Alsace
            </p>
            <h1 className="text-5xl md:text-7xl font-bold leading-[0.95] mb-6">
              Une autre façon
              <br />
              de concevoir
              <br />
              <em className="italic text-primary">la pizza.</em>
            </h1>
            <p className="text-lg text-muted-foreground max-w-md mb-8 leading-relaxed text-justify">
              Pâte longue maturation, feu de bois, farine bio du Moulin Kircher et produits majoritairement locaux. Satisfaire vos papilles, c'est notre obsession. 🍅
            </p>
            <div className="flex flex-wrap gap-4">
              <a href="tel:0667485852" className="inline-flex items-center gap-2 rounded-full bg-primary text-primary-foreground px-6 py-3 font-medium shadow-[var(--shadow-warm)] hover:bg-primary-glow transition">
                <Phone className="w-4 h-4" /> 06 67 48 58 52
              </a>
              <Link to="/carte" className="inline-flex items-center gap-2 rounded-full border border-border px-6 py-3 font-medium hover:bg-card transition">
                <ShoppingBag className="w-4 h-4" /> Découvrir la carte
              </Link>
            </div>
            <div className="mt-10 flex items-center gap-6 text-sm text-muted-foreground">
              <div>
                <div className="text-2xl font-display text-foreground">100%</div>
                <div className="text-xs uppercase tracking-wider">Recommandée</div>
              </div>
              <div className="h-10 w-px bg-border" />
              <div>
                <div className="text-2xl font-display text-foreground">~100h</div>
                <div className="text-xs uppercase tracking-wider">Maturation pâte</div>
              </div>
              <div className="h-10 w-px bg-border" />
              <div>
                <div className="text-2xl font-display text-foreground">Bio</div>
                <div className="text-xs uppercase tracking-wider">& local</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* INTRO STRIP */}
      <section className="border-y border-border/50 bg-card/30">
        <div className="max-w-7xl mx-auto px-6 py-8 flex flex-wrap items-center justify-around gap-6 text-sm text-muted-foreground">
          <span className="flex items-center gap-2"><Flame className="w-4 h-4 text-primary" /> Cuisson sur pierre</span>
          <span className="flex items-center gap-2"><Leaf className="w-4 h-4 text-secondary" /> Producteurs locaux</span>
          <span className="flex items-center gap-2">🍅 Tomates 100% italiennes</span>
          <span className="flex items-center gap-2">🧀 Burrata de bufflonne</span>
          <span className="flex items-center gap-2">🌿 Sel de Guérande</span>
        </div>
      </section>

      {/* HISTOIRE */}
      <section id="histoire" className="py-32">
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-16 items-center">
          <div className="relative">
            <img src={oven} alt="Four à pizza traditionnel" className="rounded-sm shadow-[var(--shadow-warm)] w-full" loading="lazy" width={1200} height={1400} />
            <div className="absolute -bottom-6 -right-6 hidden md:block bg-primary text-primary-foreground p-6 max-w-[200px]">
              <p className="font-display italic text-sm leading-snug">"Super pizzas, super ingrédients, super pizzaïolo."</p>
              <p className="text-xs mt-2 opacity-80">13€\n Moulin Kircher</p>
            </div>
          </div>
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-accent mb-4">Notre histoire</p>
            <h2 className="text-4xl md:text-5xl font-bold mb-6">Le feu, la patience, le goût.</h2>
            <p className="text-muted-foreground leading-relaxed mb-4 text-justify">
              Chez <span className="text-foreground">Au four & au jardin</span>, la pizza n'est pas qu'un plat, c'est une rencontre. Entre la chaleur du feu de bois, la lenteur d'une pâte qui repose près de 100 heures, et la fraîcheur des produits cueillis chez nos voisins alsaciens.
            </p>
            <p className="text-muted-foreground leading-relaxed mb-8 text-justify">
              Sauce tomate 100% italienne, farine bio du Moulin Kircher, sel de Guérande. Rien d'autre. Juste l'essentiel, bien fait.
            </p>
            <div className="grid grid-cols-2 gap-6">
              <div className="border-l-2 border-primary pl-4">
                <div className="font-display text-3xl">100h</div>
                <div className="text-sm text-muted-foreground">de maturation</div>
              </div>
              <div className="border-l-2 border-secondary pl-4">
                <div className="font-display text-3xl">Bio</div>
                <div className="text-sm text-muted-foreground">& artisanal</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CARTE - SIGNATURES */}
      <section id="carte" className="py-32 bg-card/40 relative">
        <div className="absolute inset-0 opacity-20">
          <img src={ingredients} alt="" className="w-full h-full object-cover" loading="lazy" width={1400} height={1000} />
          <div className="absolute inset-0 bg-background/70" />
        </div>
        <div className="relative max-w-7xl mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <p className="text-xs uppercase tracking-[0.3em] text-accent mb-4">Quelques signatures</p>
            <h2 className="text-4xl md:text-5xl font-bold mb-4">La carte du moment</h2>
            <p className="text-muted-foreground">Une sélection qui évolue avec les saisons et les arrivages des producteurs.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { name: "La Parma", price: "15€", desc: "Mozzarella, jambon de parme 24 mois entier, avec roquette et copeaux de parmesan dans un contenant séparé" , tag: "Signature" },
              { name: "La Gorgonzola", price: "12,50€", desc: "Mozzarella, gorgonzola (San Angelo), olives noires", tag: "Retour" },
              { name: "Hohwaldoise", price: "13€\n", desc: "Fromage bio façon munster, oignons, lard", tag: "Saison" },
              { name: "La Vivaldi verde", price: "13,50€\n", desc: "Mozzarella, champignons, persillade, artichaud marinés, olives noires", tag: "Végétarienne" },
              { name: "La Melanzana", price: "13,50€\n", desc: "Mozzarella, champignons, persillade, aubergines, poivrons oignons", tag: "Végétarienne" },
              { name: "L'Alsacienne", price: "11€", desc: "Esprit Tarte flambée : lardons salés à sec d'un artisan boucher local, oignons ", tag: "Du coin" },
            ].map((p, i) => (
              <article key={p.name} className="group p-6 bg-background/60 backdrop-blur border border-border/60 hover:border-primary/50 transition-all hover:-translate-y-1 duration-300" style={{ animation: `float-up 0.6s ease-out ${i * 0.05}s both` }}>
                <div className="flex items-start justify-between mb-3">
                  <h3 className="font-display text-2xl">{p.name}</h3>
                  <span className="text-primary font-display text-inherit bg-inherit text-xl">{p.price}</span>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed mb-4">{p.desc}</p>
                <span className="inline-block text-[10px] uppercase tracking-[0.2em] text-accent border border-accent/30 px-2 py-1 rounded-full">{p.tag}</span>
              </article>
            ))}
          </div>
          <div className="text-center mt-12">
            <Link to="/carte" className="inline-flex items-center gap-2 rounded-full bg-primary text-primary-foreground px-6 py-3 font-medium hover:bg-primary-glow transition">
              Voir la carte complète →
            </Link>
            <p className="text-sm text-muted-foreground mt-4 italic">Toutes nos pizzas sauce tomate & sauce crème</p>
          </div>
        </div>
      </section>

      {/* TERRASSE */}
      <section id="terrasse" className="py-32">
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-16 items-center">
          <div className="order-2 md:order-1">
            <p className="text-xs uppercase tracking-[0.3em] text-accent mb-4">LA TERRASSE</p>
            <h2 className="text-4xl md:text-5xl font-bold mb-6">Un cadre bucolique, été comme hiver.</h2>
            <p className="text-muted-foreground leading-relaxed mb-6 text-justify">
              couverte
            </p>
            <p className="text-muted-foreground leading-relaxed text-justify">
              Et quand le froid s'installe, notre <span className="text-foreground">vin blanc chaud bio</span>, élaboré avec un viticulteur d'Andlau, des fruits bio, du miel et du sucre de bouleau  vous attend (3,50€ le verre). 🍷
            </p>
          </div>
          <div className="order-1 md:order-2 relative">
            <img src={terrace} alt="Terrasse couverte de la pizzeria" className="rounded-sm shadow-[var(--shadow-warm)] w-full" loading="lazy" width={1400} height={1000} />
          </div>
        </div>
      </section>

      {/* GALERIE PREVIEW */}
      <section id="galerie" className="py-32 bg-card/40 border-t border-border/40">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-end justify-between flex-wrap gap-6 mb-12">
            <div>
              <p className="text-xs uppercase tracking-[0.3em] text-accent mb-4">En images</p>
              <h2 className="text-4xl md:text-5xl font-bold">La galerie</h2>
            </div>
            <Link to="/galerie" className="text-sm text-primary hover:text-primary-glow font-medium underline-offset-4 hover:underline">
              Voir toute la galerie →
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 auto-rows-[220px] md:auto-rows-[280px] gap-3 md:gap-4">
            {[
              { src: galCabane.url, alt: "La cabane et la terrasse en été", span: "md:col-span-2" },
              { src: galSandwich.url, alt: "Sandwichs l'Andlav au marché", span: "" },
            ].map((p, i) => (
              <Link
                key={p.src}
                to="/galerie"
                className={`group relative overflow-hidden rounded-sm bg-background/40 ${p.span}`}
                style={{ animation: `float-up 0.6s ease-out ${i * 0.05}s both` }}
              >
                <img
                  src={p.src}
                  alt={p.alt}
                  loading="lazy"
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                <p className="absolute bottom-3 left-3 right-3 text-sm font-display opacity-0 group-hover:opacity-100 transition-opacity">
                  {p.alt}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" className="py-32 bg-card/40 border-t border-border/40">
        <div className="max-w-5xl mx-auto px-6 text-center">
          <p className="text-xs uppercase tracking-[0.3em] text-accent mb-4">Venez nous voir</p>
          <h2 className="text-4xl md:text-6xl font-bold mb-12">À emporter, à Andlau.</h2>
          <div className="grid md:grid-cols-3 gap-8 text-left">
            <div className="p-8 bg-background border border-border/60">
              <MapPin className="w-6 h-6 text-primary mb-4" />
              <h3 className="font-display text-xl mb-2">Adresse</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">5b rue de la Commanderie<br />67140 Andlau, France</p>
              <a href="https://maps.google.com/?q=5b+rue+de+la+Commanderie+Andlau" target="_blank" rel="noopener" className="text-primary text-sm mt-4 inline-block hover:underline">Voir sur la carte →</a>
            </div>
            <div className="p-8 bg-background border border-border/60">
              <Phone className="w-6 h-6 text-primary mb-4" />
              <h3 className="font-display text-xl mb-2">Commande</h3>
              <p className="text-muted-foreground text-sm leading-relaxed mb-4">Appelez pour réserver vos pizzas à emporter.</p>
              <a href="tel:0667485852" className="text-primary font-display text-2xl hover:text-primary-glow">06 67 48 58 52</a>
            </div>
            <div className="p-8 bg-background border border-border/60">
              <Clock className="w-6 h-6 text-primary mb-4" />
              <h3 className="font-display text-xl mb-2">Service</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">À emporter principalement.<br />Terrasse couverte selon saison.<br /><span className="text-foreground">Appelez pour les horaires du jour.</span></p>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="py-12 border-t border-border/40">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
          <div className="font-display">
            <span className="text-primary">Au four</span>
            <span> & </span>
            <span className="text-secondary">au jardin</span>
            <span className="ml-3 opacity-60">13€\n Pizzeria artisanale, Andlau</span>
          </div>
          <div className="opacity-70">© {new Date().getFullYear()} · Fait avec 🔥 & 🍅</div>
        </div>
      </footer>
    </div>
  );
}
