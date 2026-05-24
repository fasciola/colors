import React, { useState } from "react";
import { ColorPalette } from "../types";
import {
    ArrowUpRight,
    Sparkles,
    Layers,
    Camera,
    Palette,
    Feather,
    CheckCircle,
    Plus,
    Instagram,
    Briefcase
} from "lucide-react";

interface MockProps {
    palette: ColorPalette;
    theme: "light" | "dark";
}

export default function MockCreative({ palette, theme }: MockProps) {
    const [activeProject, setActiveProject] = useState<number>(0);
    const [toastMessage, setToastMessage] = useState<string | null>(null);

    const colors = palette.colors;
    const copy = palette.customCopy;

    const showToast = (msg: string) => {
        setToastMessage(msg);
        setTimeout(() => setToastMessage(null), 3500);
    };

    const currentBg = theme === "light" ? colors.bgLight : colors.bgDark;
    const currentText = theme === "light" ? colors.textLight : colors.textDark;
    const cardBorder = theme === "light" ? "rgba(0,0,0,0.07)" : "rgba(255,255,255,0.08)";
    const overlayBg = theme === "light" ? "rgba(255, 255, 255, 0.9)" : "rgba(15, 23, 42, 0.9)";

    const projects = [
        { title: "Kinship Identity", category: "Brand Guidelines & Asset Spec", year: "2026", shape: "pill" },
        { title: "Nordic Glazes", description: "Bespoke digital storefront modeling organic textures", year: "2025", shape: "circle" },
        { title: "Elysium Core", description: "Minimalist portfolio styling for high-alert architects", year: "2026", shape: "square" }
    ];

    return (
        <div
            className="w-full text-xs font-sans transition-colors duration-300 relative select-none"
            style={{
                backgroundColor: currentBg,
                color: currentText,
                fontFamily: palette.typography.bodyFont === "Inter" ? "Inter, sans-serif" : `${palette.typography.bodyFont}, sans-serif`
            }}
        >
            {/* Toast alert */}
            {toastMessage && (
                <div
                    className="absolute top-4 left-1/2 transform -translate-x-1/2 z-50 px-4 py-2 rounded-full text-xs font-semibold shadow-lg flex items-center gap-2 border"
                    style={{
                        backgroundColor: colors.bgLight,
                        color: colors.textLight,
                        borderColor: colors.accent
                    }}
                >
                    <Sparkles className="w-3.5 h-3.5" style={{ color: colors.accent }} />
                    <span>{toastMessage}</span>
                </div>
            )}

            {/* Hero Header */}
            <header className="px-5 py-4 flex items-center justify-between border-b" style={{ borderColor: cardBorder }}>
                <div className="flex items-center gap-2">
                    <span className="font-mono text-xs tracking-wider" style={{ color: colors.primary }}>STUDIO®</span>
                </div>
                <div className="flex items-center gap-4 text-[11px] font-medium opacity-75">
                    <span className="hover:opacity-100 cursor-pointer">Archive</span>
                    <span className="hover:opacity-100 cursor-pointer">Capabilities</span>
                </div>
                <button
                    onClick={() => showToast("Subscribed successfully!")}
                    className="px-4 py-1.5 rounded-full text-[10px] uppercase tracking-wide font-bold transition-transform active:scale-95 text-white"
                    style={{ backgroundColor: colors.primary }}
                >
                    Subscribe
                </button>
            </header>

            {/* Split Creative Bio */}
            <section className="px-5 py-12 max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                <div className="flex flex-col gap-5">
                    <div className="inline-flex items-center gap-1.5 opacity-80">
                        <span className="w-2.5 h-1 rounded-full" style={{ backgroundColor: colors.accent }}></span>
                        <span className="text-[10px] tracking-widest uppercase font-bold">Art Direction &amp; Web Design</span>
                    </div>

                    <h1
                        className="text-2.5xl md:text-3.5xl font-extrabold tracking-tight leading-none"
                        style={{
                            fontFamily: palette.typography.headingFont,
                            letterSpacing: palette.typography.letterSpacing || "-0.015em"
                        }}
                    >
                        {copy.heroTitle || "Aesthetic Craft & Web Foundations"}
                    </h1>

                    <p className="opacity-75 text-[11px] leading-relaxed max-w-sm">
                        {copy.heroSubtitle || "We formulate brand identities, sleek typography schemes, and bespoke interactive installations. Tailoring high-contrast systems for visionary creators."}
                    </p>

                    <div className="flex items-center gap-3">
                        <button
                            onClick={() => showToast("Opening custom brief portal...")}
                            className="px-5 py-2.5 rounded text-[10px] font-bold uppercase tracking-wide border cursor-pointer hover:bg-black/5 dark:hover:bg-white/5 transition-all text-white font-semibold"
                            style={{ backgroundColor: colors.accent, borderColor: colors.accent }}
                        >
                            Consult agency
                        </button>
                        <button
                            onClick={() => showToast("Opening portfolio catalogue...")}
                            className="px-5 py-2.5 rounded text-[10px] font-bold uppercase tracking-wide border cursor-pointer hover:bg-black/5 dark:hover:bg-white/5 transition-all"
                            style={{ borderColor: colors.primary }}
                        >
                            See works
                        </button>
                    </div>
                </div>

                {/* Dynamic Abstract Interactive Portfolio Panel */}
                <div
                    className="w-full aspect-square rounded-2xl border p-5 flex flex-col justify-between shadow-xl"
                    style={{
                        borderColor: cardBorder,
                        backgroundColor: `${colors.primary}04`
                    }}
                >
                    <div className="flex items-center justify-between">
                        <span className="font-mono text-[9px] opacity-50">CURATIVE INSTANCE // 03</span>
                        <span className="px-2 py-0.5 rounded-full text-[8px] tracking-widest font-bold text-white" style={{ backgroundColor: colors.primary }}>
                            {projects[activeProject].year}
                        </span>
                    </div>

                    {/* Visual Canvas containing high-contrast math art */}
                    <div className="flex-grow flex items-center justify-center py-6">
                        <div className="relative w-32 h-32 flex items-center justify-center transition-all duration-500">
                            {/* Blur Aura */}
                            <div
                                className="absolute inset-0 rounded-full blur-xl opacity-30 animate-pulse scale-90"
                                style={{ backgroundColor: colors.accent }}
                            ></div>

                            {projects[activeProject].shape === "pill" && (
                                <svg viewBox="0 0 100 100" className="w-full h-full text-indigo-500 transition-all">
                                    <path d="M20,10 L80,10 C90,10 90,90 80,90 L20,90 C10,90 10,10 20,10 Z" fill={colors.primary} opacity="0.85" />
                                    <circle cx="50" cy="50" r="16" fill={colors.accent} />
                                </svg>
                            )}
                            {projects[activeProject].shape === "circle" && (
                                <svg viewBox="0 0 100 100" className="w-full h-full text-primary transition-all">
                                    <circle cx="50" cy="50" r="42" fill={colors.secondary} opacity="0.85" />
                                    <ellipse cx="50" cy="50" rx="20" ry="10" fill={colors.primary} />
                                </svg>
                            )}
                            {projects[activeProject].shape === "square" && (
                                <svg viewBox="0 0 100 100" className="w-full h-full text-accent transition-all">
                                    <rect x="15" y="15" width="70" height="70" rx="10" transform="rotate(15 50 50)" fill={colors.accent} opacity="0.85" />
                                    <rect x="30" y="30" width="40" height="40" rx="4" fill={colors.primary} />
                                </svg>
                            )}
                        </div>
                    </div>

                    <div className="border-t pt-3 flex items-center justify-between" style={{ borderColor: cardBorder }}>
                        <div>
                            <h3 className="font-bold text-sm tracking-tight">{projects[activeProject].title}</h3>
                            <p className="opacity-75 text-[10px] mt-0.5">{projects[activeProject].category || "Artistic modeling exploration"}</p>
                        </div>
                        <button
                            onClick={() => {
                                setActiveProject((prev) => (prev + 1) % projects.length);
                                showToast("Cycled portfolio layout item");
                            }}
                            className="p-1.5 rounded-full hover:scale-105 active:scale-95 transition-transform text-white cursor-pointer"
                            style={{ backgroundColor: colors.accent }}
                        >
                            <ArrowUpRight className="w-4 h-4" />
                        </button>
                    </div>
                </div>
            </section>

            {/* Core Specialties */}
            <section className="px-5 py-12 border-t" style={{ borderColor: cardBorder }}>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-5 max-w-4xl mx-auto">
                    {copy.features?.map((feat, index) => (
                        <div
                            key={index}
                            className="p-5 rounded-xl border flex flex-col gap-3 transition-transform hover:-translate-y-1"
                            style={{ borderColor: cardBorder, backgroundColor: `${colors.primary}03` }}
                        >
                            <div
                                className="w-7 h-7 rounded-sm flex items-center justify-center"
                                style={{
                                    backgroundColor: index === 0 ? `${colors.primary}12` : index === 1 ? `${colors.secondary}12` : `${colors.accent}12`,
                                    color: index === 0 ? colors.primary : index === 1 ? colors.secondary : colors.accent
                                }}
                            >
                                {index === 0 ? <Camera className="w-4 h-4" /> : index === 1 ? <Palette className="w-4 h-4" /> : <Feather className="w-4 h-4" />}
                            </div>
                            <h3 className="font-bold text-sm tracking-tight">{feat.title}</h3>
                            <p className="opacity-70 leading-relaxed text-[11px]">{feat.description}</p>
                        </div>
                    )) || (
                            <div className="text-center opacity-50 py-4 col-span-3">No specific core capabilities loaded.</div>
                        )}
                </div>
            </section>

            {/* Decorative footer */}
            <footer className="px-5 py-6 border-t text-center opacity-60 text-[9px]" style={{ borderColor: cardBorder }}>
                <p>© 2026 Creative Synthesis Studio. Configured on visual guidelines.</p>
            </footer>
        </div>
    );
}
