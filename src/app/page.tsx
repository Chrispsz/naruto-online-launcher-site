"use client";

import { useEffect, useRef, useState, useMemo, useCallback } from "react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import {
  Download,
  ChevronDown,
  Github,
  ExternalLink,
  Shield,
  Zap,
  Monitor,
  Cookie,
  Globe,
  Rocket,
  Box,
  Heart,
  Languages,
  RefreshCw,
  WifiOff,
  Camera,
  Lock,
  Minimize2,
  Pin,
  Loader2,
} from "lucide-react";
import {
  type Locale,
  getTranslations,
  detectInitialLocale,
  localeNames,
} from "@/lib/i18n";

/* ────────────────────────────────────────────
   Release API types
   ──────────────────────────────────────────── */
interface ReleaseAsset {
  url: string;
  size: number;
  downloads: number;
}

interface ReleaseInfo {
  version: string;
  name: string;
  publishedAt: string;
  htmlUrl: string;
  body: string;
  downloads: {
    linux: ReleaseAsset | null;
    windows: ReleaseAsset | null;
  };
  totalDownloads: number;
  formattedSize: {
    linux: string | null;
    windows: string | null;
  };
  fallback?: boolean;
}

/* ────────────────────────────────────────────
   Scroll-triggered reveal
   ──────────────────────────────────────────── */
function Reveal({
  children,
  className = "",
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : undefined}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/* ────────────────────────────────────────────
   Gold Divider
   ──────────────────────────────────────────── */
function GoldDivider() {
  return (
    <div className="flex items-center justify-center gap-3 py-1">
      <div className="flex-1 gold-divider" />
      <div className="w-1.5 h-1.5 bg-gold/30 rotate-45 flex-shrink-0" />
      <div className="flex-1 gold-divider" />
    </div>
  );
}

/* ────────────────────────────────────────────
   Feature Card
   ──────────────────────────────────────────── */
function FeatureCard({
  icon: Icon,
  title,
  description,
  delay = 0,
  isNew = false,
}: {
  icon: React.ElementType;
  title: string;
  description: string;
  delay?: number;
  isNew?: boolean;
}) {
  return (
    <Reveal delay={delay}>
      <div className="card-gold-accent group relative p-5 rounded-xl border border-border-subtle bg-bg-card/40 hover:border-border-gold transition-all duration-400 hover:bg-bg-card-hover/40 h-full flex flex-col">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-8 h-8 rounded-lg bg-gold-glow flex items-center justify-center border border-gold/10">
            <Icon className="w-4 h-4 text-gold" strokeWidth={1.5} />
          </div>
          <h3 className="text-sm font-medium text-text-primary tracking-tight">
            {title}
          </h3>
          {isNew && (
            <span className="text-[9px] uppercase tracking-wider text-gold/60 font-semibold px-1.5 py-0.5 rounded-full border border-gold/15 bg-gold/[0.04]">
              New
            </span>
          )}
        </div>
        <p className="text-xs leading-relaxed text-text-muted">
          {description}
        </p>
      </div>
    </Reveal>
  );
}

/* ────────────────────────────────────────────
   Animated counter
   ──────────────────────────────────────────── */
function AnimatedCounter({ target, duration = 2000 }: { target: number; duration?: number }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });

  useEffect(() => {
    if (!inView || target === 0) return;
    const start = performance.now();
    const step = (now: number) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.round(eased * target));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [inView, target, duration]);

  return <span ref={ref}>{count.toLocaleString()}</span>;
}

/* ────────────────────────────────────────────
   FAQ Item
   ──────────────────────────────────────────── */
function FaqItem({
  question,
  answer,
  isOpen,
  onToggle,
}: {
  question: string;
  answer: string;
  isOpen: boolean;
  onToggle: () => void;
}) {
  const [contentHeight, setContentHeight] = useState(0);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (contentRef.current) {
      setContentHeight(contentRef.current.scrollHeight);
    }
  }, [isOpen, answer]);

  return (
    <div className="border border-border-subtle rounded-lg overflow-hidden transition-colors duration-300 hover:border-gold/10">
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between p-4 text-left group"
        aria-expanded={isOpen}
      >
        <span className="text-sm font-medium text-text-primary group-hover:text-gold transition-colors duration-300 pr-4">
          {question}
        </span>
        <ChevronDown
          className={`w-4 h-4 text-text-muted flex-shrink-0 transition-transform duration-300 ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>
      <div
        className="overflow-hidden transition-all duration-300"
        style={{
          maxHeight: isOpen ? contentHeight : 0,
          opacity: isOpen ? 1 : 0,
        }}
      >
        <div ref={contentRef}>
          <p className="px-4 pb-4 text-xs leading-relaxed text-text-muted">
            {answer}
          </p>
        </div>
      </div>
    </div>
  );
}

/* ────────────────────────────────────────────
   Skeleton
   ──────────────────────────────────────────── */
function Skeleton({ className = "" }: { className?: string }) {
  return (
    <div className={`animate-pulse bg-bg-card-hover rounded-md ${className}`} />
  );
}

/* ────────────────────────────────────────────
   Main Page
   ──────────────────────────────────────────── */
export default function Home() {
  const [locale, setLocale] = useState<Locale>(() => detectInitialLocale());
  const [scrolled, setScrolled] = useState(false);
  const [release, setRelease] = useState<ReleaseInfo | null>(null);
  const [releaseLoading, setReleaseLoading] = useState(true);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const heroOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const heroY = useTransform(scrollYProgress, [0, 0.5], [0, 40]);

  const t = getTranslations(locale);

  const switchLocale = (l: Locale) => {
    setLocale(l);
    localStorage.setItem("locale", l);
    document.documentElement.lang = l === "pt" ? "pt-BR" : "en";
  };

  /* ── Fetch release ── */
  useEffect(() => {
    let cancelled = false;
    const fetchRelease = async () => {
      try {
        setReleaseLoading(true);
        const res = await fetch("/api/release");
        if (!res.ok) throw new Error("API error");
        const data: ReleaseInfo = await res.json();
        if (!cancelled) setRelease(data);
      } catch {
        if (!cancelled) {
          setRelease({
            version: "v1.4.0",
            name: "Naruto Online Launcher v1.4.0",
            publishedAt: "2025-01-01T00:00:00Z",
            htmlUrl: "https://github.com/Chrispsz/naruto-online-launcher/releases/latest",
            body: "## v1.4.0\n\n- AppImage extraído automaticamente na instalação (sem FUSE)\n- Inicialização mais rápida sem montagem FUSE\n- var → const/let em todos os arquivos\n- Scripts de instalação melhorados",
            downloads: {
              linux: {
                url: "https://github.com/Chrispsz/naruto-online-launcher/releases/latest",
                size: 0,
                downloads: 0,
              },
              windows: {
                url: "https://github.com/Chrispsz/naruto-online-launcher/releases/latest",
                size: 0,
                downloads: 0,
              },
            },
            totalDownloads: 0,
            formattedSize: { linux: null, windows: null },
            fallback: true,
          });
        }
      } finally {
        if (!cancelled) setReleaseLoading(false);
      }
    };
    fetchRelease();
    return () => { cancelled = true; };
  }, []);

  /* ── Scroll ── */
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* ── Derived ── */
  const version = release?.version ?? "v1.4.0";
  const badgeText = t.badge.replace("{version}", version);
  const formatDate = useCallback(
    (dateStr: string) => {
      try {
        const d = new Date(dateStr);
        return d.toLocaleDateString(locale === "pt" ? "pt-BR" : "en-US", {
          year: "numeric",
          month: "long",
          day: "numeric",
        });
      } catch {
        return dateStr;
      }
    },
    [locale]
  );

  const parsedChangelog = useMemo(() => {
    if (!release?.body) return [];
    return release.body
      .split("\n")
      .filter((line) => line.trim().startsWith("- "))
      .map((line) => line.replace(/^[-*]\s*/, "").trim())
      .filter(Boolean);
  }, [release?.body]);

  const faqItems = [
    { q: t.faq.q1.q, a: t.faq.q1.a },
    { q: t.faq.q2.q, a: t.faq.q2.a },
    { q: t.faq.q3.q, a: t.faq.q3.a },
    { q: t.faq.q4.q, a: t.faq.q4.a },
    { q: t.faq.q5.q, a: t.faq.q5.a },
    { q: t.faq.q6.q, a: t.faq.q6.a },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-bg-primary">
      {/* ─── Nav ─── */}
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? "bg-bg-primary/90 backdrop-blur-lg border-b border-gold/8"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-5xl mx-auto px-6 h-14 flex items-center justify-between">
          <a href="#" className="flex items-center gap-2.5 group">
            <img
              src="/icon-64.png"
              alt={t.alt.icon}
              className="w-7 h-7 rounded-lg"
            />
            <span className="text-sm font-medium text-text-primary tracking-tight group-hover:text-gold transition-colors duration-300">
              Naruto Online
            </span>
          </a>
          <div className="flex items-center gap-3 sm:gap-4">
            <a
              href="#features"
              className="hidden sm:block text-xs text-text-muted hover:text-gold transition-colors duration-300"
            >
              {t.nav.resources}
            </a>
            <a
              href="#changelog"
              className="hidden sm:block text-xs text-text-muted hover:text-gold transition-colors duration-300"
            >
              {t.nav.changelog}
            </a>
            <a
              href="#faq"
              className="hidden sm:block text-xs text-text-muted hover:text-gold transition-colors duration-300"
            >
              {t.nav.faq}
            </a>

            <button
              onClick={() => switchLocale(locale === "pt" ? "en" : "pt")}
              className="flex items-center gap-1.5 text-xs text-text-muted hover:text-gold transition-colors duration-300 px-2 py-1 rounded-md hover:bg-gold/5"
              aria-label="Switch language"
            >
              <Languages className="w-3.5 h-3.5" />
              <span className="font-medium">{localeNames[locale]}</span>
            </button>

            <a
              href="#download"
              className="text-xs font-medium px-4 py-1.5 rounded-full border border-gold/25 text-gold hover:bg-gold hover:text-bg-primary transition-all duration-400"
            >
              {t.nav.download}
            </a>
          </div>
        </div>
      </nav>

      {/* ─── Hero ─── */}
      <motion.section
        ref={heroRef}
        style={{ opacity: heroOpacity, y: heroY }}
        className="relative h-screen w-full overflow-hidden flex items-center justify-center"
      >
        {/* Subtle radial gradient */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-bg-primary" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-gold/[0.04] blur-[120px]" />
        </div>

        <div className="relative z-10 flex flex-col items-center text-center px-6">
          {/* Icon */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="mb-8"
          >
            <div className="relative p-1 rounded-2xl border border-gold/15">
              <img
                src="/icon.png"
                alt={t.alt.launcher}
                className="w-24 h-24 sm:w-32 sm:h-32 rounded-xl"
              />
            </div>
          </motion.div>

          {/* Status badge */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="mb-5"
          >
            <span className="inline-flex items-center gap-2 text-[11px] tracking-[0.16em] uppercase text-gold/70 font-medium px-3.5 py-1.5 rounded-full border border-gold/12 bg-gold/[0.03]">
              <span className="w-1.5 h-1.5 rounded-full bg-gold/50" />
              {badgeText}
            </span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.45, ease: [0.22, 1, 0.36, 1] }}
            className="font-serif text-3xl sm:text-4xl md:text-5xl text-text-primary leading-[1.1] mb-4 max-w-2xl italic text-shadow-gold"
          >
            {t.hero.title_before}{" "}
            <span className="text-gradient-gold">{t.hero.title_highlight}</span>{" "}
            {t.hero.title_after}
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.65 }}
            className="text-text-secondary text-sm sm:text-[15px] max-w-md leading-relaxed mb-10"
          >
            {t.hero.subtitle_1}
            <br className="hidden sm:block" />
            {t.hero.subtitle_2}
          </motion.p>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.85 }}
            className="flex flex-col sm:flex-row items-center gap-3"
          >
            <a
              href={release?.htmlUrl ?? "https://github.com/Chrispsz/naruto-online-launcher/releases/latest"}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2.5 px-7 py-3.5 bg-gold text-bg-primary rounded-full hover:bg-gold-light transition-all duration-400 text-sm font-medium"
            >
              <Download className="w-4 h-4" />
              {t.hero.cta_download}
              <ExternalLink className="w-3 h-3 opacity-40" />
            </a>
            <a
              href="https://github.com/Chrispsz/naruto-online-launcher"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-3.5 border border-border-subtle text-text-secondary rounded-full hover:border-gold/25 hover:text-gold transition-all duration-400 text-sm"
            >
              <Github className="w-4 h-4" />
              {t.hero.cta_source}
            </a>
          </motion.div>
        </div>

        {/* Scroll hint */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.4 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10"
        >
          <motion.div
            animate={{ y: [0, 5, 0] }}
            transition={{ repeat: Infinity, duration: 2.5, ease: "easeInOut" }}
          >
            <ChevronDown className="w-4 h-4 text-gold/25" />
          </motion.div>
        </motion.div>
      </motion.section>

      {/* ─── Features ─── */}
      <section id="features" className="py-20 sm:py-24 px-6">
        <div className="max-w-5xl mx-auto">
          <GoldDivider />
          <Reveal className="text-center mb-14 pt-10">
            <h2 className="text-2xl sm:text-3xl text-text-primary font-serif italic tracking-tight text-shadow-gold">
              {t.features.heading}
            </h2>
            <p className="text-text-muted text-sm mt-3 max-w-sm mx-auto">
              {t.features.subheading}
            </p>
          </Reveal>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <FeatureCard
              icon={Zap}
              title={t.features.flash.title}
              description={t.features.flash.description}
              delay={0.05}
            />
            <FeatureCard
              icon={Shield}
              title={t.features.privacy.title}
              description={t.features.privacy.description}
              delay={0.1}
            />
            <FeatureCard
              icon={Monitor}
              title={t.features.gpu.title}
              description={t.features.gpu.description}
              delay={0.15}
            />
            <FeatureCard
              icon={Globe}
              title={t.features.regions.title}
              description={t.features.regions.description}
              delay={0.2}
            />
            <FeatureCard
              icon={Cookie}
              title={t.features.cookies.title}
              description={t.features.cookies.description}
              delay={0.25}
            />
            <FeatureCard
              icon={RefreshCw}
              title={t.features.updates.title}
              description={t.features.updates.description}
              delay={0.3}
            />
            <FeatureCard
              icon={WifiOff}
              title={t.features.offline.title}
              description={t.features.offline.description}
              delay={0.35}
            />
            <FeatureCard
              icon={Rocket}
              title={t.features.portable.title}
              description={t.features.portable.description}
              delay={0.4}
            />
            <FeatureCard
              icon={Minimize2}
              title={t.features.tray.title}
              description={t.features.tray.description}
              delay={0.45}
              isNew
            />
            <FeatureCard
              icon={Camera}
              title={t.features.screenshot.title}
              description={t.features.screenshot.description}
              delay={0.5}
              isNew
            />
            <FeatureCard
              icon={Lock}
              title={t.features.secure.title}
              description={t.features.secure.description}
              delay={0.55}
              isNew
            />
            <FeatureCard
              icon={Pin}
              title={t.features.alwaysOnTop.title}
              description={t.features.alwaysOnTop.description}
              delay={0.6}
              isNew
            />
          </div>
        </div>
      </section>

      {/* ─── Shortcuts ─── */}
      <section className="py-20 sm:py-24 px-6">
        <div className="max-w-3xl mx-auto">
          <GoldDivider />
          <Reveal className="text-center mb-14 pt-10">
            <h2 className="text-2xl sm:text-3xl text-text-primary font-serif italic tracking-tight text-shadow-gold">
              {t.shortcuts.heading}
            </h2>
            <p className="text-text-muted text-sm mt-3 max-w-sm mx-auto">
              {t.shortcuts.subheading}
            </p>
          </Reveal>

          <Reveal delay={0.08}>
            <div className="p-6 sm:p-8 rounded-xl border border-border-subtle bg-bg-card/30">
              <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-4 sm:gap-x-8">
                {[
                  { key: "F5", label: t.shortcuts.f5 },
                  { key: "F6", label: t.shortcuts.f6 },
                  { key: "F7", label: t.shortcuts.f7 },
                  { key: "F11", label: t.shortcuts.f11 },
                  { key: "Ctrl+⇧+S", label: t.shortcuts.ctrl_shift_s },
                  { key: "Ctrl+⇧+T", label: t.shortcuts.ctrl_shift_t },
                  { key: "Ctrl++", label: t.shortcuts.ctrl_plus },
                  { key: "Ctrl+-", label: t.shortcuts.ctrl_minus },
                  { key: "Ctrl+0", label: t.shortcuts.ctrl_0 },
                ].map((s) => (
                  <div key={s.key} className="flex items-center gap-2.5">
                    <kbd className="gold-key inline-flex items-center justify-center min-w-[2.4rem] h-8 px-2.5 rounded-lg bg-bg-primary border border-gold/20 text-[11px] font-mono text-gold whitespace-nowrap">
                      {s.key}
                    </kbd>
                    <span className="text-xs text-text-muted">{s.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ─── Changelog ─── */}
      <section id="changelog" className="py-20 sm:py-24 px-6">
        <div className="max-w-3xl mx-auto">
          <GoldDivider />
          <Reveal className="text-center mb-14 pt-10">
            <h2 className="text-2xl sm:text-3xl text-text-primary font-serif italic tracking-tight text-shadow-gold">
              {t.changelog.heading}
            </h2>
            <p className="text-text-muted text-sm mt-3 max-w-sm mx-auto">
              {t.changelog.subheading}
            </p>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="p-6 sm:p-8 rounded-xl border border-border-subtle bg-bg-card/30">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <span className="inline-flex items-center gap-2 text-xs font-medium text-gold px-3 py-1 rounded-full border border-gold/15 bg-gold/[0.04]">
                    <span className="w-1.5 h-1.5 rounded-full bg-gold/60" />
                    {releaseLoading ? (
                      <Skeleton className="w-16 h-3" />
                    ) : (
                      version
                    )}
                  </span>
                  {!releaseLoading && release?.publishedAt && (
                    <span className="text-[11px] text-text-muted">
                      {t.changelog.released} {formatDate(release.publishedAt)}
                    </span>
                  )}
                </div>
                {!releaseLoading && release?.htmlUrl && (
                  <a
                    href={release.htmlUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[11px] text-text-muted hover:text-gold transition-colors duration-300 flex items-center gap-1"
                  >
                    <Github className="w-3 h-3" />
                    {t.changelog.view_on_github}
                  </a>
                )}
              </div>

              {releaseLoading ? (
                <div className="space-y-3">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <Skeleton className="w-1.5 h-1.5 rounded-full mt-1.5 flex-shrink-0" />
                      <Skeleton className="w-full h-3" />
                    </div>
                  ))}
                </div>
              ) : parsedChangelog.length > 0 ? (
                <ul className="space-y-2.5">
                  {parsedChangelog.map((item, i) => (
                    <li
                      key={i}
                      className="flex items-start gap-3 text-xs text-text-secondary leading-relaxed"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-gold/30 mt-1.5 flex-shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-xs text-text-muted italic">
                  {release?.body || "No release notes available."}
                </p>
              )}
            </div>
          </Reveal>
        </div>
      </section>

      {/* ─── FAQ ─── */}
      <section id="faq" className="py-20 sm:py-24 px-6">
        <div className="max-w-2xl mx-auto">
          <Reveal className="text-center mb-14">
            <h2 className="text-2xl sm:text-3xl text-text-primary font-serif italic tracking-tight text-shadow-gold">
              {t.faq.heading}
            </h2>
            <p className="text-text-muted text-sm mt-3 max-w-sm mx-auto">
              {t.faq.subheading}
            </p>
          </Reveal>

          <div className="space-y-3">
            {faqItems.map((item, i) => (
              <Reveal key={i} delay={i * 0.05}>
                <FaqItem
                  question={item.q}
                  answer={item.a}
                  isOpen={openFaq === i}
                  onToggle={() => setOpenFaq(openFaq === i ? null : i)}
                />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Download ─── */}
      <section id="download" className="py-20 sm:py-24 px-6">
        <div className="max-w-lg mx-auto text-center">
          <GoldDivider />
          <Reveal className="pt-10">
            <h2 className="text-2xl sm:text-3xl text-text-primary font-serif italic tracking-tight mb-3 text-shadow-gold">
              {t.download.heading}
            </h2>
          </Reveal>
          <Reveal delay={0.05}>
            <p className="text-text-secondary text-sm mb-10 leading-relaxed">
              {t.download.subheading}
            </p>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3 mb-6">
              <a
                href={
                  release?.downloads.windows?.url ??
                  "https://github.com/Chrispsz/naruto-online-launcher/releases/latest"
                }
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2.5 px-6 py-3.5 bg-gold text-bg-primary rounded-full hover:bg-gold-light transition-all duration-400 text-sm font-medium"
              >
                <Box className="w-4 h-4" />
                {t.download.windows}
                <span className="text-[10px] text-bg-primary/50 font-normal">.zip</span>
                {release?.formattedSize.windows && (
                  <span className="text-[10px] text-bg-primary/40 font-normal">
                    ({release.formattedSize.windows})
                  </span>
                )}
              </a>
              <a
                href={
                  release?.downloads.linux?.url ??
                  "https://github.com/Chrispsz/naruto-online-launcher/releases/latest"
                }
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2.5 px-6 py-3.5 border border-gold/20 text-gold rounded-full hover:bg-gold/8 hover:border-gold/35 transition-all duration-400 text-sm font-medium"
              >
                <Box className="w-4 h-4" />
                {t.download.linux}
                <span className="text-[10px] text-gold/40 font-normal">.AppImage</span>
                {release?.formattedSize.linux && (
                  <span className="text-[10px] text-gold/30 font-normal">
                    ({release.formattedSize.linux})
                  </span>
                )}
              </a>
            </div>
          </Reveal>

          {!releaseLoading && release && release.totalDownloads > 0 && (
            <Reveal delay={0.12}>
              <div className="flex items-center justify-center gap-2 mb-6">
                <Download className="w-3.5 h-3.5 text-gold/30" />
                <span className="text-xs text-text-muted">
                  <AnimatedCounter target={release.totalDownloads} duration={1500} />{" "}
                  {t.download.total_downloads}
                </span>
              </div>
            </Reveal>
          )}

          <Reveal delay={0.15}>
            <div className="space-y-2">
              <code className="block text-[11px] px-4 py-2.5 rounded-lg bg-bg-card/50 border border-gold/[0.06] font-mono text-text-secondary text-left overflow-x-auto">
                <span className="text-gold/40">$</span> unzip naruto-online-linux.zip
                <br />
                <span className="text-gold/40">$</span> chmod +x install.sh <span className="text-gold/25">&amp;&amp;</span> ./install.sh
              </code>
              <p className="text-[11px] text-text-muted/40">
                {t.download.note}
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ─── Footer ─── */}
      <footer className="py-8 px-6 mt-auto">
        <div className="max-w-5xl mx-auto">
          <GoldDivider />
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-6">
            <div className="flex items-center gap-4 text-xs text-text-muted">
              <span className="flex items-center gap-1.5">
                <Heart className="w-3 h-3 text-accent-red" />
                {t.footer.license}
              </span>
              <span className="text-gold/15">·</span>
              <a
                href="https://github.com/Chrispsz/naruto-online-launcher"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 hover:text-gold transition-colors duration-300"
              >
                <Github className="w-3 h-3" />
                Chrispsz
              </a>
            </div>
            <p className="text-[11px] text-text-muted/35 flex items-center gap-2">
              <span>{t.footer.version_label} {version}</span>
              <span className="text-gold/15">·</span>
              <span>Chromium 87</span>
              <span className="text-gold/15">·</span>
              <span>Flash PPAPI 34</span>
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
