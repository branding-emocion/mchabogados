// Convierte las imágenes pesadas de public/ a .webp (calidad 80, máx 1600px de ancho)
import sharp from "sharp";
import { readdirSync, statSync, existsSync } from "fs";
import path from "path";

const base = process.cwd() + "/public";
const targets = [
  "legal-contract-arbitration-clause-document.png",
  "legal-process-arbitration-documents.png",
  "legal-regulations-documents-books.png",
  "professional-arbitrators-team-legal-experts.png",
  "professional-legal-office-arbitration-center.png",
  "equipo/estuardo.png",
  "equipo/manuel.png",
];

for (const rel of targets) {
  const src = path.join(base, rel);
  const dest = src.replace(/\.png$/, ".webp");
  if (!existsSync(src)) {
    console.log("no existe:", rel);
    continue;
  }
  const before = statSync(src).size;
  await sharp(src)
    .resize({ width: 1600, withoutEnlargement: true })
    .webp({ quality: 80 })
    .toFile(dest);
  const after = statSync(dest).size;
  console.log(
    `${rel}: ${(before / 1024 / 1024).toFixed(2)}MB -> ${(after / 1024).toFixed(0)}KB (${Math.round((1 - after / before) * 100)}% menos)`
  );
}
