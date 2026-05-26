export type Locale = "pt" | "en";

export const localeNames: Record<Locale, string> = {
  pt: "PT",
  en: "EN",
};

const CURRENT_VERSION = "v1.4.0";

const translations = {
  pt: {
    nav: {
      resources: "Recursos",
      download: "Download",
      changelog: "Novidades",
      faq: "FAQ",
    },
    badge: `${CURRENT_VERSION} · Open Source · Flash PPAPI 34`,
    hero: {
      title_before: "O único launcher com",
      title_highlight: "Flash nativo",
      title_after: "no Linux.",
      subtitle_1: "Sem Wine, sem tracking, sem anúncios.",
      subtitle_2: "Apenas o jogo, como deveria ser.",
      cta_download: "Baixar Launcher",
      cta_source: "Código-fonte",
    },
    features: {
      heading: "Feito para jogar.",
      subheading: "Cada detalhe pensado para a melhor experiência possível.",
      flash: {
        title: "Flash PPAPI Nativo",
        description:
          "Sem Wine, sem emulação. Flash 64-bit nativo com PPAPI 34.0 diretamente no Chromium.",
      },
      privacy: {
        title: "Privacidade Total",
        description:
          "Zero tracking, zero analytics, zero anúncios. Código aberto e auditável (MIT). CSP ativo e preload seguro.",
      },
      gpu: {
        title: "Multi-GPU",
        description:
          "NVIDIA, AMD e Intel. Três perfis de hardware: Moderno, Antigo e CPU Only.",
      },
      regions: {
        title: "6 Regiões",
        description:
          "PT, EN, FR, DE, ES e PL. Troca instantânea entre servidores com F6.",
      },
      cookies: {
        title: "Login Persistente",
        description:
          "Cookies válidos por 1 ano. Faça login uma vez, jogue sempre.",
      },
      updates: {
        title: "Auto-Update",
        description:
          "Verifica automaticamente por novas versões e avisa quando há atualização disponível.",
      },
      offline: {
        title: "Modo Offline",
        description:
          "Detecta falta de conexão e exibe tela de erro antes de tentar carregar o jogo.",
      },
      portable: {
        title: "Plug & Play",
        description:
          "Download, instale e jogue. Sem configuração extra, sem FUSE, sem dependências.",
      },
      tray: {
        title: "Bandeja do Sistema",
        description:
          "Minimize para a bandeja em vez de fechar. Acesse o launcher rapidamente pelo ícone ao lado do relógio.",
      },
      screenshot: {
        title: "Captura de Tela",
        description:
          "Salve screenshots do jogo com Ctrl+Shift+S. As imagens são salvas automaticamente na pasta do launcher.",
      },
      secure: {
        title: "Preload Seguro",
        description:
          "Context Bridge isola o renderer do Node.js. Apenas APIs controladas são expostas ao contexto do jogo.",
      },
      alwaysOnTop: {
        title: "Sempre no Topo",
        description:
          "Fixe a janela acima de todas as outras com Ctrl+Shift+T. Ideal para multitarefa enquanto joga.",
      },
    },
    shortcuts: {
      heading: "Atalhos de teclado",
      subheading: "Controle rápido sem tirar as mãos do jogo.",
      f5: "Limpar login",
      f6: "Trocar região",
      f7: "Perfil de hardware",
      f11: "Tela cheia",
      ctrl_shift_s: "Screenshot",
      ctrl_shift_t: "Sempre no topo",
      ctrl_plus: "Zoom in",
      ctrl_minus: "Zoom out",
      ctrl_0: "Zoom reset",
    },
    changelog: {
      heading: "Novidades",
      subheading: "Veja o que mudou na última versão.",
      view_on_github: "Ver no GitHub",
      released: "Lançado em",
    },
    download: {
      heading: "Pronto para jogar?",
      subheading: "Gratuito e open source. Sem conta, sem registro.",
      note: "O jogo aparece no menu de aplicativos automaticamente.",
      windows: "Windows",
      linux: "Linux",
      total_downloads: "downloads totais",
    },
    faq: {
      heading: "Perguntas Frequentes",
      subheading: "Respostas para as dúvidas mais comuns.",
      q1: {
        q: "O launcher funciona sem Wine?",
        a: "Sim! O Flash PPAPI roda nativamente no Linux via Chromium. Não precisa de Wine ou qualquer camada de compatibilidade.",
      },
      q2: {
        q: "Preciso instalar o Flash separadamente?",
        a: "Não. O launcher já inclui o Flash PPAPI 34.0. Basta baixar e executar — plug & play.",
      },
      q3: {
        q: "O launcher coleta meus dados?",
        a: "Absolutamente não. Zero tracking, zero analytics, zero telemetria. O código é aberto e auditável sob licença MIT.",
      },
      q4: {
        q: "Como troco de servidor/região?",
        a: "Pressione F6 para alternar entre as 6 regiões: PT, EN, FR, DE, ES e PL. A troca é instantânea.",
      },
      q5: {
        q: "O jogo não carrega, o que faço?",
        a: "Verifique sua conexão (o launcher detecta automaticamente). Se o problema persistir, tente trocar o perfil de hardware com F7 ou limpar o cache pelo menu.",
      },
      q6: {
        q: "Como capturo screenshots?",
        a: "Pressione Ctrl+Shift+S a qualquer momento. A imagem é salva automaticamente na pasta screenshots dentro do diretório do launcher.",
      },
    },
    footer: {
      license: "MIT License",
      version_label: "Versão",
    },
    alt: {
      icon: "Ícone do Naruto Online Launcher",
      launcher: "Naruto Online Launcher",
    },
  },
  en: {
    nav: {
      resources: "Features",
      download: "Download",
      changelog: "Changelog",
      faq: "FAQ",
    },
    badge: `${CURRENT_VERSION} · Open Source · Flash PPAPI 34`,
    hero: {
      title_before: "The only launcher with",
      title_highlight: "native Flash",
      title_after: "on Linux.",
      subtitle_1: "No Wine, no tracking, no ads.",
      subtitle_2: "Just the game, as it should be.",
      cta_download: "Download Launcher",
      cta_source: "Source Code",
    },
    features: {
      heading: "Built to play.",
      subheading: "Every detail crafted for the best possible experience.",
      flash: {
        title: "Native Flash PPAPI",
        description:
          "No Wine, no emulation. Native 64-bit Flash with PPAPI 34.0 running directly on Chromium.",
      },
      privacy: {
        title: "Total Privacy",
        description:
          "Zero tracking, zero analytics, zero ads. Open source, auditable (MIT), CSP enabled with secure preload.",
      },
      gpu: {
        title: "Multi-GPU",
        description:
          "NVIDIA, AMD and Intel. Three hardware profiles: Modern, Legacy and CPU Only.",
      },
      regions: {
        title: "6 Regions",
        description:
          "PT, EN, FR, DE, ES and PL. Instant server switching with F6.",
      },
      cookies: {
        title: "Persistent Login",
        description:
          "Cookies valid for 1 year. Log in once, play forever.",
      },
      updates: {
        title: "Auto-Update",
        description:
          "Automatically checks for new versions and notifies when an update is available.",
      },
      offline: {
        title: "Offline Mode",
        description:
          "Detects missing connectivity and shows error screen before trying to load the game.",
      },
      portable: {
        title: "Plug & Play",
        description:
          "Download, install, play. No extra config, no FUSE, no dependencies.",
      },
      tray: {
        title: "System Tray",
        description:
          "Minimize to tray instead of closing. Access the launcher quickly from the system clock area.",
      },
      screenshot: {
        title: "Screenshot Capture",
        description:
          "Save game screenshots with Ctrl+Shift+S. Images are automatically saved to the launcher's folder.",
      },
      secure: {
        title: "Secure Preload",
        description:
          "Context Bridge isolates the renderer from Node.js. Only controlled APIs are exposed to the game context.",
      },
      alwaysOnTop: {
        title: "Always on Top",
        description:
          "Pin the window above all others with Ctrl+Shift+T. Perfect for multitasking while playing.",
      },
    },
    shortcuts: {
      heading: "Keyboard shortcuts",
      subheading: "Quick controls without leaving the game.",
      f5: "Clear login",
      f6: "Switch region",
      f7: "Hardware profile",
      f11: "Fullscreen",
      ctrl_shift_s: "Screenshot",
      ctrl_shift_t: "Always on top",
      ctrl_plus: "Zoom in",
      ctrl_minus: "Zoom out",
      ctrl_0: "Zoom reset",
    },
    changelog: {
      heading: "Changelog",
      subheading: "See what changed in the latest release.",
      view_on_github: "View on GitHub",
      released: "Released on",
    },
    download: {
      heading: "Ready to play?",
      subheading: "Free and open source. No account, no sign-up.",
      note: "The game appears in your app menu automatically.",
      windows: "Windows",
      linux: "Linux",
      total_downloads: "total downloads",
    },
    faq: {
      heading: "FAQ",
      subheading: "Answers to the most common questions.",
      q1: {
        q: "Does the launcher work without Wine?",
        a: "Yes! Flash PPAPI runs natively on Linux via Chromium. No Wine or compatibility layer needed.",
      },
      q2: {
        q: "Do I need to install Flash separately?",
        a: "No. The launcher already includes Flash PPAPI 34.0. Just download and run — plug & play.",
      },
      q3: {
        q: "Does the launcher collect my data?",
        a: "Absolutely not. Zero tracking, zero analytics, zero telemetry. The code is open source and auditable under the MIT license.",
      },
      q4: {
        q: "How do I switch servers/regions?",
        a: "Press F6 to cycle through the 6 regions: PT, EN, FR, DE, ES, and PL. The switch is instant.",
      },
      q5: {
        q: "The game won't load, what do I do?",
        a: "Check your connection (the launcher detects it automatically). If the problem persists, try switching hardware profiles with F7 or clearing the cache from the menu.",
      },
      q6: {
        q: "How do I take screenshots?",
        a: "Press Ctrl+Shift+S at any time. The image is automatically saved to the screenshots folder inside the launcher directory.",
      },
    },
    footer: {
      license: "MIT License",
      version_label: "Version",
    },
    alt: {
      icon: "Naruto Online Launcher icon",
      launcher: "Naruto Online Launcher",
    },
  },
} as const;

export type TranslationKey = keyof typeof translations.pt;

export function getTranslations(locale: Locale) {
  return translations[locale];
}

export function detectInitialLocale(): Locale {
  if (typeof window === "undefined") return "pt";
  const saved = localStorage.getItem("locale");
  if (saved === "en" || saved === "pt") return saved;
  const lang = navigator.language?.slice(0, 2)?.toLowerCase();
  return lang === "en" ? "en" : "pt";
}
