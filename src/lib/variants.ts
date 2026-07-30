export const TAILLES = ["XS", "S", "M", "L", "XL", "XXL"];

export const COULEURS = [
  { nom: "Noir", hex: "#111111" },
  { nom: "Blanc", hex: "#f5f5f5" },
  { nom: "Gris", hex: "#8a8a8a" },
  { nom: "Beige", hex: "#d8c3a5" },
  { nom: "Marron", hex: "#6b4423" },
  { nom: "Bleu marine", hex: "#1b263b" },
  { nom: "Bleu", hex: "#2b5797" },
  { nom: "Vert kaki", hex: "#5c6b47" },
  { nom: "Bordeaux", hex: "#5c1a1a" },
  { nom: "Camel", hex: "#c19a6b" },
  { nom: "Rouge", hex: "#ff0000" },
    { nom: "Jaune", hex: "#ffff00" },
    { nom: "Orange", hex: "#ffa500" },
    { nom: "Rose", hex: "#ff69b4" },
    { nom: "Violet", hex: "#8a2be2" },
    { nom: "Turquoise", hex: "#40e0d0" },
    { nom: "Vert", hex: "#008000" },
    { nom: "Bleu clair", hex: "#add8e6" },
    { nom: "Gris clair", hex: "#d3d3d3" },
    { nom: "Gris foncé", hex: "#a9a9a9" },
    { nom: "Mauve", hex: "#e0b0ff" },
    { nom: "Fuschia", hex: "#ff00ff" }

];

export function getColorHex(nom?: string | null): string {
  if (!nom) return "#555555";
  const found = COULEURS.find((c) => c.nom.toLowerCase() === nom.toLowerCase());
  return found?.hex || "#555555";
}