import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState, useEffect, useCallback } from "react";
import { Phone, ArrowLeft, X, ChevronLeft, ChevronRight } from "lucide-react";

import margherita from "@/assets/gallery/pizza-margherita.jpg";
import parma from "@/assets/gallery/pizza-parma.jpg";
import tarte from "@/assets/gallery/tarte-flambee.jpg";
import four from "@/assets/gallery/four-flammes.jpg";
import pate from "@/assets/gallery/pate-mains.jpg";
import ingredients from "@/assets/gallery/ingredients-flat.jpg";
import terrasseSoir from "@/assets/gallery/terrasse-soir.jpg";
import vinChaud from "@/assets/gallery/vin-chaud.jpg";
import evenement from "@/assets/gallery/evenement-anniversaire.jpg";
import terrasseCabane from "@/assets/gallery/terrasse-cabane.jpg.asset.json";
import sandwich from "@/assets/gallery/andlav-sandwich.jpg.asset.json";

type Category = "Tous" | "Pizzas" | "Terrasse" | "Événements" | "Coulisses";

type Photo = {
  src: string;
  alt: string;
  category: Exclude<Category, "Tous">;
  span?: "tall" | "wide" | "square";
  w: number;
  h: number;
};

const photos: Photo[] = [
  { src: margherita, alt: "Pizza Margherita au feu de bois", category: "Pizzas", span: "square", w: 1024, h: 1024 },
  { src: parma, alt: "Pizza Parma jambon et roquette", category: "Pizzas", span: "tall", w: 1024, h: 1280 },
  { src: terrasseCabane.url, alt: "La cabane et la terrasse en été", category: "Terrasse", span: "wide", w: 1920, h: 1080 },
  { src: four, alt: "Four à bois en pleine flambée", category: "Coulisses", span: "square", w: 1024, h: 1024 },
  { src: tarte, alt: "Tarte flambée alsacienne", category: "Pizzas", span: "square", w: 1024, h: 1024 },
  { src: terrasseSoir, alt: "Terrasse au coucher du soleil", category: "Terrasse", span: "wide", w: 1280, h: 1024 },
  { src: pate, alt: "Façonnage de la pâte à la main", category: "Coulisses", span: "tall", w: 1024, h: 1280 },
  { src: evenement, alt: "Soirée entre amis sur la terrasse", category: "Événements", span: "wide", w: 1280, h: 1024 },
  { src: ingredients, alt: "Produits frais et locaux", category: "Coulisses", span: "wide", w: 1280, h: 1024 },
  { src: sandwich.url, alt: "Sandwichs l'Andlav au marché", category: "Événements", span: "tall", w: 1024, h: 1820 },
  { src: vinChaud, alt: "Vin blanc chaud bio maison", category: "Terrasse", span: "tall", w: 1024, h: 1280 },
];

const categories: Category[] = ["Tous", "Pizzas", "Terrasse", "Événements", "Coulisses"];

export const Route = createFileRoute("/galerie")({
  head: () => ({
    meta: [
      { title: "Galerie photos — Au four & au jardin, Andlau" },
      { name: "description", content: "Découvrez en images nos pizzas au feu de bois, notre terrasse bucolique et nos événements à Andlau, en Alsace." },
      { property: "og:title", content: "Galerie — Au four & au jardin" },
      { property: "og:description", content: "Pizzas, terrasse, coulisses et événements de notre pizzeria artisanale à Andlau." },
      { property: "og:image", content: margherita },
    ],
  }),
  component: Galerie,
});

function Galerie() {
  const [active, setActive] = useState<Category>("Tous");
  const [lightbox, setLightbox] = useState<number | null>(null);

  const visible = useMemo(
    () => (active === "Tous" ? photos : photos.filter((p) => p.category === active)),
    [active]
  );

  const close = useCallback(() => setLightbox(null), []);
  const next = useCallback(
    () => setLightbox((i) => (i === null ? null : (i + 1) % visible.length)),
    [visible.length]
  );
  const prev = useCallback(
    () => setLightbox((i) => (i === null ? null : (i - 1 + visible.length) % visible.length)),
    [visible.length]
  );

  useEffect(() => {
    if (lightbox === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowRight") next();
      if (e.key === "ArrowLeft") prev();
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [lightbox, close, next, prev]);

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* NAV */}
      <header className="fixed top-0 inset-x-0 z-40 backdrop-blur-md bg-background/70 border-b border-border/40">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link to="/" className="font-display text-lg tracking-tight flex items-center gap-2">
            <ArrowLeft className="w-4 h-4 opacity-60" />
            <span className="text-primary">Au four</span>
            <span className="text-muted-foreground"> & </span>
            <span className="text-secondary">au jardin</span>
          </Link>
          <a
            href="tel:0667485852"
            className="inline-flex items-center gap-2 rounded-full bg-primary text-primary-foreground px-4 py-2 text-sm font-medium hover:bg-primary-glow transition"
          >
            <Phone className="w-4 h-4" /> Commander
          </a>
        </div>
      </header>

      {/* HEADER */}
      <section className="pt-32 pb-12 px-6">
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-xs uppercase tracking-[0.3em] text-accent mb-4">En images</p>
          <h1 className="text-4xl md:text-6xl font-bold mb-4">La galerie</h1>
          <p className="text-muted-foreground max-w-xl mx-auto leading-relaxed">
            Du feu de bois à la terrasse, en passant par les soirées entre amis — un aperçu de la vie chez nous.
          </p>
        </div>
      </section>

      {/* FILTERS */}
      <div className="sticky top-16 z-30 bg-background/80 backdrop-blur-md border-y border-border/40">
        <div className="max-w-7xl mx-auto px-6 py-4 flex flex-wrap items-center justify-center gap-2">
          {categories.map((c) => (
            <button
              key={c}
              onClick={() => setActive(c)}
              className={`rounded-full px-4 py-1.5 text-sm transition border ${
                active === c
                  ? "bg-primary text-primary-foreground border-primary"
                  : "border-border text-muted-foreground hover:text-foreground hover:border-foreground/40"
              }`}
            >
              {c}
            </button>
          ))}
        </div>
      </div>

      {/* GRID */}
      <section className="py-12 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 auto-rows-[180px] md:auto-rows-[220px] gap-3 md:gap-4">
          {visible.map((p, i) => (
            <button
              key={p.src + i}
              onClick={() => setLightbox(i)}
              className={`group relative overflow-hidden rounded-sm bg-card/40 ${
                p.span === "tall"
                  ? "row-span-2"
                  : p.span === "wide"
                    ? "col-span-2"
                    : ""
              }`}
              style={{ animation: `float-up 0.5s ease-out ${Math.min(i, 8) * 0.05}s both` }}
              aria-label={`Agrandir : ${p.alt}`}
            >
              <img
                src={p.src}
                alt={p.alt}
                loading="lazy"
                width={p.w}
                height={p.h}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-background/0 to-background/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="absolute bottom-0 left-0 right-0 p-3 translate-y-2 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-300">
                <p className="text-[10px] uppercase tracking-[0.2em] text-accent">{p.category}</p>
                <p className="text-sm font-display leading-tight mt-1">{p.alt}</p>
              </div>
            </button>
          ))}
        </div>
        {visible.length === 0 && (
          <p className="text-center text-muted-foreground py-20">Aucune photo dans cette catégorie pour l'instant.</p>
        )}
      </section>

      {/* FOOTER */}
      <footer className="py-12 border-t border-border/40 mt-12">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
          <div className="font-display">
            <span className="text-primary">Au four</span>
            <span> & </span>
            <span className="text-secondary">au jardin</span>
            <span className="ml-3 opacity-60">— Pizzeria artisanale, Andlau</span>
          </div>
          <Link to="/" className="hover:text-foreground transition">← Retour à l'accueil</Link>
        </div>
      </footer>

      {/* LIGHTBOX */}
      {lightbox !== null && visible[lightbox] && (
        <div
          className="fixed inset-0 z-50 bg-background/95 backdrop-blur-md flex items-center justify-center p-4 md:p-12"
          onClick={close}
          role="dialog"
          aria-modal="true"
        >
          <button
            className="absolute top-4 right-4 p-2 rounded-full bg-card/60 hover:bg-card text-foreground transition"
            onClick={(e) => { e.stopPropagation(); close(); }}
            aria-label="Fermer"
          >
            <X className="w-5 h-5" />
          </button>
          <button
            className="absolute left-4 md:left-8 p-3 rounded-full bg-card/60 hover:bg-card text-foreground transition"
            onClick={(e) => { e.stopPropagation(); prev(); }}
            aria-label="Précédente"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <button
            className="absolute right-4 md:right-8 p-3 rounded-full bg-card/60 hover:bg-card text-foreground transition"
            onClick={(e) => { e.stopPropagation(); next(); }}
            aria-label="Suivante"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
          <figure className="max-w-5xl max-h-full flex flex-col items-center gap-4" onClick={(e) => e.stopPropagation()}>
            <img
              src={visible[lightbox].src}
              alt={visible[lightbox].alt}
              className="max-h-[80vh] w-auto object-contain rounded-sm shadow-2xl"
            />
            <figcaption className="text-center">
              <p className="text-[10px] uppercase tracking-[0.3em] text-accent">{visible[lightbox].category}</p>
              <p className="font-display text-lg mt-1">{visible[lightbox].alt}</p>
            </figcaption>
          </figure>
        </div>
      )}
    </div>
  );
}
