/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    // Vorlage und Schrift für die Vorschaubilder (lib/share-image.tsx) werden
    // zur Laufzeit gelesen und müssen mit ausgeliefert werden.
    outputFileTracingIncludes: {
      "/**/opengraph-image": [
        "./design/website/vorschaubild/vorschaubild-vorlage.svg",
        "./lib/og-fonts/*.woff",
      ],
    },
  },
};

export default nextConfig;
