const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ||
  "https://naruto-online-launcher-site.vercel.app";

export function JsonLd() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "Naruto Online Launcher",
    description:
      "The only Flash game launcher with native Linux support for Naruto Online. Zero tracking, zero dependencies, FUSE-free.",
    url: SITE_URL,
    applicationCategory: "GameApplication",
    operatingSystem: ["Windows 7+", "Linux (x64)"],
    inLanguage: ["pt-BR", "en"],
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "BRL",
    },
    license: "https://opensource.org/licenses/MIT",
    author: {
      "@type": "Person",
      name: "Chrispsz",
      url: "https://github.com/Chrispsz",
    },
    programmingLanguage: "JavaScript",
    screenshot: `${SITE_URL}/thumbnail.png`,
    featureList: [
      "Native Flash PPAPI 34.0",
      "No FUSE Required",
      "System Tray Minimize",
      "Screenshot Capture",
      "Always on Top",
      "6 Region Servers",
      "Multi-GPU Support",
      "Persistent Login",
      "Auto-Update Notifications",
      "Offline Mode",
      "CSP + Secure Preload",
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}
