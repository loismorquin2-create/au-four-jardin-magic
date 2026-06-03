## Objectif

Ajouter les images uploadées à la page `/galerie`. Les 2 fichiers HTML (résultats Google) sont ignorés — uniquement des références.

## Images à ajouter

| Fichier upload | Sujet | Catégorie proposée |
|---|---|---|
| `unnamed (1).jpg` | Pizzaiolo derrière le comptoir | Ambiance |
| `unnamed (3).jpg` | Pizza chèvre/miel sur planche bois | Pizzas |
| `unnamed (2).jpg` | Pizza œuf + piment en boîte | Pizzas |
| `unnamed.webp` | Cabane + terrasse de jour | Terrasse |
| `unnamed.jpg` | Cabane / four de nuit | Ambiance |

Le doublon `unnamed (1)-2.jpg` est ignoré.

## Étapes

1. **Upload CDN** : `lovable-assets create` pour chacune des 5 images → écrire 5 fichiers `.asset.json` dans `src/assets/gallery/`.
2. **Mettre à jour `src/routes/galerie.tsx`** :
   - Ajouter les catégories `"Pizzas"` et `"Ambiance"` dans le type `Category` et le tableau `categories` (en plus de Terrasse / Événements existants).
   - Importer les 5 nouveaux pointeurs `.asset.json`.
   - Ajouter 5 entrées dans le tableau `photos` avec `alt`, `category`, `span` adapté (tall / wide / square selon orientation) et `w`/`h` réels.
3. Mettre à jour `og:image` du `head()` si pertinent (garder l'image terrasse actuelle).

## Notes techniques

- Les images JPG/WebP passent par Lovable Assets (CDN), pas par le repo.
- Les dimensions seront lues via `identify` après upload pour renseigner `w`/`h` correctement (évite le layout shift).
- Aucune modification du layout / lightbox / filtres — uniquement données + 2 nouvelles catégories.
