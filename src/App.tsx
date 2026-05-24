import React, { useState, useEffect } from "react";
import {
    ColorPalette,
    SavedPalette,
    PreviewTemplate,
    DeviceViewMode
} from "./types";
import MockSaaS from "./components/MockSaaS";
import MockECommerce from "./components/MockECommerce";
import MockCreative from "./components/MockCreative";
import MockDashboard from "./components/MockDashboard";
import {
    Sparkles,
    Sliders,
    Layers,
    Download,
    Copy,
    Check,
    Plus,
    RotateCw,
    Eye,
    EyeOff,
    Trash2,
    Smartphone,
    Tablet,
    Laptop,
    Info,
    Heart,
    ChevronRight,
    Sun,
    Moon,
    ExternalLink,
    Lock,
    LockOpen
} from "lucide-react";

// Initial Beautiful Default Palette corresponding to standard modern indigos
const defaultPalette: ColorPalette = {
    name: "Celestial Indigo",
    mood: "A progressive, professional digital ecosystem featuring balanced indigos and electric corals.",
    praise: "This palette features AAA contrast ratio ratings across core body text nodes and employs a deep, warm space background to anchor high-vibrancy brand indicators.",
    colors: {
        primary: "#4f46e5",
        secondary: "#06b6d4",
        accent: "#f43f5e",
        bgLight: "#fafaf9",
        bgDark: "#0f172a",
        textLight: "#1c1917",
        textDark: "#f8fafc",
        success: "#10b981",
        error: "#ef4444"
    },
    names: {
        primary: "Ultraviolet Core",
        secondary: "Cyan Tide",
        accent: "Crimson Spark",
        bgLight: "Soft Sand",
        bgDark: "Midnight Navy Mode"
    },
    customCopy: {
        heroTitle: "Accelerated Design Foundations",
        heroSubtitle: "Scale your creative output in real time using automated color models, clean high-contrast design tabs, and verified components.",
        features: [
            { title: "Dynamic Themes", description: "Automate responsive visual frameworks and style modules effortlessly." },
            { title: "Accessibility Audits", description: "Track design contrast diagnostics automatically matching WCAG AA rules." },
            { title: "Universal Exports", description: "Deploy direct design tokens, CSS values, and Tailwind layouts instantly." }
        ]
    },
    typography: {
        headingFont: "Space Grotesk",
        bodyFont: "Inter",
        letterSpacing: "-0.015em"
    }
};

// WCAG Contrast Diagnostics
function getLuminance(hex: string): number {
    const cleanHex = hex.replace(/^#/, "");
    let r = parseInt(cleanHex.substring(0, 2), 16) / 255;
    let g = parseInt(cleanHex.substring(2, 4), 16) / 255;
    let b = parseInt(cleanHex.substring(4, 6), 16) / 255;

    const a = [r, g, b].map((v) => {
        return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
    });
    return a[0] * 0.2126 + a[1] * 0.7152 + a[2] * 0.0722;
}

function getContrastRatio(color1: string, color2: string): number {
    const l1 = getLuminance(color1);
    const l2 = getLuminance(color2);
    const brightest = Math.max(l1, l2);
    const darkest = Math.min(l1, l2);
    return Number(((brightest + 0.05) / (darkest + 0.05)).toFixed(2));
}

function getWCAGRating(ratio: number): { grade: string; textClass: string; bgClass: string } {
    if (ratio >= 7.0) return { grade: "AAA Pass", textClass: "text-emerald-400 border-emerald-500/30", bgClass: "bg-emerald-500/10" };
    if (ratio >= 4.5) return { grade: "AA Pass", textClass: "text-indigo-400 border-indigo-500/30", bgClass: "bg-indigo-500/10" };
    if (ratio >= 3.0) return { grade: "Large Text Only", textClass: "text-amber-400 border-amber-500/30", bgClass: "bg-amber-500/10" };
    return { grade: "Low Contrast", textClass: "text-red-400 border-red-500/30", bgClass: "bg-red-500/10" };
}

// Convert Hex to HSL
function hexToHsl(hex: string): { h: number; s: number; l: number } {
    hex = hex.replace(/^#/, "");
    if (hex.length === 3) {
        hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2];
    }
    let r = parseInt(hex.substring(0, 2), 16) / 255;
    let g = parseInt(hex.substring(2, 4), 16) / 255;
    let b = parseInt(hex.substring(4, 6), 16) / 255;

    let max = Math.max(r, g, b), min = Math.min(r, g, b);
    let h = 0, s = 0, l = (max + min) / 2;

    if (max !== min) {
        let d = max - min;
        s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
        switch (max) {
            case r: h = (g - b) / d + (g < b ? 6 : 0); break;
            case g: h = (b - r) / d + 2; break;
            case b: h = (r - g) / d + 4; break;
        }
        h /= 6;
    }
    return { h: Math.round(h * 360), s: Math.round(s * 100), l: Math.round(l * 100) };
}

// Convert HSL back to Hex
function hslToHex(h: number, s: number, l: number): string {
    h = (h % 360 + 360) % 360;
    s = Math.max(0, Math.min(100, s)) / 100;
    l = Math.max(0, Math.min(100, l)) / 100;

    let c = (1 - Math.abs(2 * l - 1)) * s;
    let x = c * (1 - Math.abs((h / 60) % 2 - 1));
    let m = l - c / 2;
    let r = 0, g = 0, b = 0;

    if (0 <= h && h < 60) { r = c; g = x; b = 0; }
    else if (60 <= h && h < 120) { r = x; g = c; b = 0; }
    else if (120 <= h && h < 180) { r = 0; g = c; b = x; }
    else if (180 <= h && h < 240) { r = 0; g = x; b = c; }
    else if (240 <= h && h < 300) { r = x; g = 0; b = c; }
    else if (300 <= h && h < 360) { r = c; g = 0; b = x; }

    let rHex = Math.round((r + m) * 255).toString(16).padStart(2, '0');
    let gHex = Math.round((g + m) * 255).toString(16).padStart(2, '0');
    let bHex = Math.round((b + m) * 255).toString(16).padStart(2, '0');

    return `#${rHex}${gHex}${bHex}`;
}

export default function App() {
    const [primaryColor, setPrimaryColor] = useState<string>("#4f46e5");
    const [mode, setMode] = useState<string>("analogous");
    const [targetAudience, setTargetAudience] = useState<PreviewTemplate>("saas");
    const [userPrompt, setUserPrompt] = useState<string>("");
    const [currentPalette, setCurrentPalette] = useState<ColorPalette>(defaultPalette);
    const [backendGeminiEnabled, setBackendGeminiEnabled] = useState<boolean>(false);
    const [configChecked, setConfigChecked] = useState<boolean>(false);

    // Custom Controls and States
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [copiedText, setCopiedText] = useState<string | null>(null);
    const [activeTab, setActiveTab] = useState<"css" | "tailwind" | "figma" | "json">("tailwind");

    // Simulation Panel Variables
    const [simulationTheme, setSimulationTheme] = useState<"light" | "dark">("dark");
    const [deviceMode, setDeviceMode] = useState<DeviceViewMode>("desktop");
    const [isDiagnosticOpen, setIsDiagnosticOpen] = useState<boolean>(true);

    // Stored Local Palettes
    const [savedPalettes, setSavedPalettes] = useState<SavedPalette[]>([]);
    const [paletteNameInput, setPaletteNameInput] = useState<string>("");

    // Secondary fine-tuning controls linked directly with currently active color parameters
    const activeHsl = hexToHsl(primaryColor);

    // Initialize and list archives on startup
    useEffect(() => {
        // Check dynamic Gemini client status on the server
        fetch("/api/config")
            .then(res => {
                if (!res.ok) throw new Error("Config endpoint unresponsive");
                return res.json();
            })
            .then(data => {
                setBackendGeminiEnabled(!!data.geminiEnabled);
                setConfigChecked(true);
            })
            .catch(e => {
                console.warn("Could not retrieve dynamic backend config:", e);
                setConfigChecked(true);
            });

        try {
            const saved = localStorage.getItem("huelab_saved_palettes_v1");
            if (saved) {
                setSavedPalettes(JSON.parse(saved));
            } else {
                const seedLibrary: SavedPalette[] = [
                    {
                        ...defaultPalette,
                        id: "seed-celestial",
                        createdAt: new Date().toISOString(),
                        isFavorite: true
                    }
                ];
                localStorage.setItem("huelab_saved_palettes_v1", JSON.stringify(seedLibrary));
                setSavedPalettes(seedLibrary);
            }
        } catch (e) {
            console.error("Local persistence failed:", e);
        }
    }, []);

    // Sync Saved Palettes with local storage
    const persistPalettes = (updated: SavedPalette[]) => {
        setSavedPalettes(updated);
        try {
            localStorage.setItem("huelab_saved_palettes_v1", JSON.stringify(updated));
        } catch (e) {
            console.error("Failed saving to persistent stack:", e);
        }
    };

    // Trigger copy indicator
    const handleCopy = (text: string, label: string) => {
        navigator.clipboard.writeText(text);
        setCopiedText(label);
        setTimeout(() => setCopiedText(null), 2500);
    };

    const [apiError, setApiError] = useState<string | null>(null);

    // Generate Palette Call
    const generatePalette = async (colorHex: string = primaryColor, alignmentMode: string = mode, audience: string = targetAudience) => {
        setIsLoading(true);
        setApiError(null);
        let normalizedColor = colorHex;
        if (!normalizedColor.startsWith("#")) {
            normalizedColor = `#${normalizedColor}`;
        }

        try {
            const response = await fetch("/api/generate-palette", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    primaryColor: normalizedColor,
                    mode: alignmentMode,
                    targetAudience: audience,
                    prompt: userPrompt
                })
            });

            if (!response.ok) {
                const errText = await response.text();
                throw new Error(errText || `Server returned ${response.status} status code.`);
            }

            const parsed: ColorPalette = await response.json();
            setCurrentPalette(parsed);

            if (parsed.source === "fallback" && parsed.errorMessage) {
                setApiError(parsed.errorMessage);
                console.warn("Backend resolved a mathematical fallback due to error:", parsed.errorMessage);
            }

            // Auto synchronize primary input state to match the returned primary
            if (parsed.colors.primary) {
                setPrimaryColor(parsed.colors.primary);
            }
        } catch (error) {
            console.error("Backend connection or processing failed:", error);
            setApiError((error as Error).message || String(error));
        } finally {
            setIsLoading(false);
        }
    };

    // Live trigger on alignment updates
    const triggerRandomSeed = () => {
        const randomHex = "#" + Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0');
        setPrimaryColor(randomHex);
        generatePalette(randomHex, mode, targetAudience);
    };

    const handleSavePalette = () => {
        const finalName = paletteNameInput.trim() || currentPalette.name || "My Dream Palette";
        const newSave: SavedPalette = {
            ...currentPalette,
            name: finalName,
            id: "palette-" + Date.now(),
            createdAt: new Date().toISOString()
        };
        const updated = [newSave, ...savedPalettes];
        persistPalettes(updated);
        setPaletteNameInput("");
        handleCopy("", "Palette Saved to Library! 📁");
    };

    const handleDeleteSaved = (id: string, e: React.MouseEvent) => {
        e.stopPropagation();
        const updated = savedPalettes.filter(p => p.id !== id);
        persistPalettes(updated);
    };

    const handleRestorePalette = (saved: SavedPalette) => {
        setCurrentPalette(saved);
        setPrimaryColor(saved.colors.primary);
        setTargetAudience((saved.customCopy?.features && "saas") as any || "saas");
        handleCopy("", `Restored "${saved.name}" successfully!`);
    };

    // Contrast Ratio Calculations
    const contrastBodyLight = getContrastRatio(currentPalette.colors.textLight, currentPalette.colors.bgLight);
    const contrastBodyDark = getContrastRatio(currentPalette.colors.textDark, currentPalette.colors.bgDark);
    const contrastPrimaryOnBg = getContrastRatio(currentPalette.colors.primary, currentPalette.colors.bgLight);
    const contrastAccentOnBgDark = getContrastRatio(currentPalette.colors.accent, currentPalette.colors.bgDark);

    const ratingLight = getWCAGRating(contrastBodyLight);
    const ratingDark = getWCAGRating(contrastBodyDark);
    const ratingPrimary = getWCAGRating(contrastPrimaryOnBg);
    const ratingAccent = getWCAGRating(contrastAccentOnBgDark);

    // Export string generators
    const getTailwindCode = () => {
        return `// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      colors: {
        brand: {
          primary: "${currentPalette.colors.primary}",
          secondary: "${currentPalette.colors.secondary}",
          accent: "${currentPalette.colors.accent}",
          bgLight: "${currentPalette.colors.bgLight}",
          bgDark: "${currentPalette.colors.bgDark}",
          textLight: "${currentPalette.colors.textLight}",
          textDark: "${currentPalette.colors.textDark}",
          success: "${currentPalette.colors.success}",
          error: "${currentPalette.colors.error}",
        }
      },
      fontFamily: {
        heading: ["${currentPalette.typography.headingFont}", "sans-serif"],
        body: ["${currentPalette.typography.bodyFont}", "sans-serif"],
      }
    }
  }
}`;
    };

    const getCssCode = () => {
        return `:root {
  /* Active Brand Archetype: ${currentPalette.name} */
  --font-heading: "${currentPalette.typography.headingFont}", sans-serif;
  --font-body: "${currentPalette.typography.bodyFont}", sans-serif;
  
  --color-brand-primary: ${currentPalette.colors.primary};
  --color-brand-secondary: ${currentPalette.colors.secondary};
  --color-brand-accent: ${currentPalette.colors.accent};
  
  --color-neutral-bg-light: ${currentPalette.colors.bgLight};
  --color-neutral-bg-dark: ${currentPalette.colors.bgDark};
  --color-neutral-text-light: ${currentPalette.colors.textLight};
  --color-neutral-text-dark: ${currentPalette.colors.textDark};
  
  --color-state-success: ${currentPalette.colors.success};
  --color-state-error: ${currentPalette.colors.error};
}`;
    };

    const getFigmaCode = () => {
        return `{
  "name": "${currentPalette.name}",
  "version": "1.0.0",
  "tokens": {
    "colors": {
      "primary": { "type": "color", "value": "${currentPalette.colors.primary}" },
      "secondary": { "type": "color", "value": "${currentPalette.colors.secondary}" },
      "accent": { "type": "color", "value": "${currentPalette.colors.accent}" },
      "bgLight": { "type": "color", "value": "${currentPalette.colors.bgLight}" },
      "bgDark": { "type": "color", "value": "${currentPalette.colors.bgDark}" }
    },
    "typography": {
      "heading": { "type": "font", "value": "${currentPalette.typography.headingFont}" },
      "body": { "type": "font", "value": "${currentPalette.typography.bodyFont}" }
    }
  }
}`;
    };

    return (
        <div className="min-h-screen bg-[#0E1015] text-[#ECEFF4] font-sans antialiased overflow-x-hidden selection:bg-indigo-500/30">

            {/* Toast popup notifications */}
            {copiedText && (
                <div className="fixed bottom-6 right-6 z-50 bg-[#1e293b] border border-indigo-500/40 text-indigo-200 px-5 py-3 rounded-xl shadow-2xl flex items-center gap-3 backdrop-blur-md animate-slide-in">
                    <div className="w-5 h-5 bg-gradient-to-tr from-indigo-500 to-violet-500 rounded-full flex items-center justify-center">
                        <Check className="w-3.5 h-3.5 text-white" />
                    </div>
                    <span className="text-xs font-semibold tracking-wide">{copiedText}</span>
                </div>
            )}

            {/* Main Container Wrapper */}
            <div className="max-w-7xl mx-auto p-4 md:p-6 space-y-5">

                {/* BENTO HEADER TILE */}
                <header className="flex flex-col md:flex-row justify-between items-center bg-[#15171E]/95 border border-[#222530] rounded-2xl p-4 md:px-6 md:py-4 gap-4 shadow-xl mb-4">
                    <div className="flex items-center gap-3.5">
                        <div className="w-10 h-10 bg-gradient-to-tr from-indigo-600 via-indigo-500 to-pink-500 rounded-xl flex items-center justify-center shadow-lg shadow-indigo-500/15 group hover:rotate-6 transition-transform">
                            <Layers className="w-5 h-5 text-white" />
                        </div>
                        <div>
                            <div className="flex items-center gap-2">
                                <h1 className="text-lg font-extrabold tracking-wider uppercase font-mono text-white">HUE.LAB</h1>
                                <span className="px-2 py-0.5 bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 rounded-full text-[10px] font-mono font-bold">PRO V2.4</span>
                            </div>
                            <p className="text-[11px] text-slate-400 mt-0.5">Mobile-Optimized Brand Palette Engine &amp; Layout Laboratory</p>
                        </div>
                    </div>

                    <div className="flex items-center gap-2.5">
                        {/* Health / API secrets info badge */}
                        {apiError ? (
                            <div className="hidden lg:flex items-center gap-2 text-[10px] px-3 py-1.5 bg-[#1B1E28] border border-amber-500/20 text-amber-400 rounded-full font-mono">
                                <span className="w-1.5 h-1.5 rounded-full bg-amber-400"></span>
                                <span>API Keys &amp; Config Diagnostic Active</span>
                            </div>
                        ) : (currentPalette.source === "gemini" || backendGeminiEnabled) ? (
                            <div className="hidden lg:flex items-center gap-2 text-[10px] px-3 py-1.5 bg-[#1B1E28] border border-emerald-500/20 text-emerald-400 rounded-full font-mono">
                                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping"></span>
                                <span>Gemini Smart Models Enabled</span>
                            </div>
                        ) : (
                            <div className="hidden lg:flex items-center gap-2 text-[10px] px-3 py-1.5 bg-[#1B1E28] border border-slate-500/20 text-slate-400 rounded-full font-mono">
                                <span className="w-1.5 h-1.5 rounded-full bg-slate-500"></span>
                                <span>Local Math Solver Running</span>
                            </div>
                        )}

                        <button
                            onClick={triggerRandomSeed}
                            className="flex items-center gap-1.5 px-4 py-2 bg-gradient-to-r from-indigo-600 to-indigo-500 hover:from-indigo-500 hover:to-indigo-400 text-white rounded-xl text-xs font-bold font-semibold transition-all active:scale-95 shadow-md cursor-pointer"
                        >
                            <RotateCw className="w-3.5 h-3.5" />
                            <span>Random Seed</span>
                        </button>
                    </div>
                </header>

                {/* BENTO DASHBOARD COLUMNS */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-stretch">

                    {/* COLUMN LEFT (Span 4): Control Deck + Swatch Library */}
                    <div className="lg:col-span-4 flex flex-col gap-5">

                        {/* BENTO 1: CONTROLS & GENERATOR */}
                        <div id="controls-bento" className="bg-[#15171E] border border-[#222530] rounded-3xl p-5 flex flex-col justify-between shadow-lg relative overflow-hidden group">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/5 rounded-full blur-3xl"></div>

                            <div>
                                <div className="flex items-center justify-between border-b border-[#222530] pb-3 mb-4">
                                    <div className="flex items-center gap-2">
                                        <Sliders className="w-4 h-4 text-indigo-400" />
                                        <span className="text-[11px] uppercase tracking-widest text-[#ECEFF4] font-bold">Control Parameters</span>
                                    </div>
                                    <span className="text-[10px] font-mono text-indigo-400">Primary Seed</span>
                                </div>

                                {/* Active Mode indicator / Error block */}
                                {apiError ? (
                                    <div className="mb-4 p-3 bg-amber-500/10 border border-amber-500/30 rounded-2xl text-xs space-y-1.5 text-amber-300">
                                        <div className="flex items-center gap-2 font-bold font-mono text-[10px] uppercase tracking-wider text-amber-400">
                                            <Info className="w-4 h-4 text-amber-400 shrink-0" />
                                            <span>Gemini API Fallback Active</span>
                                        </div>
                                        <p className="text-[11px] leading-relaxed font-sans text-slate-300">
                                            The server triggered a mathematical visual fallback. Gemini encountered an output or initialization problem.
                                        </p>
                                        <div className="p-1.5 bg-[#090B0E]/90 rounded border border-amber-500/20 text-[10px] font-mono break-all text-amber-200">
                                            {apiError}
                                        </div>
                                        <p className="text-[9px] text-slate-500 leading-tight pt-1">
                                            Verify your **Settings &gt; Secrets** API key. Your standard browser state will persist normally.
                                        </p>
                                    </div>
                                ) : (currentPalette.source === "gemini" || backendGeminiEnabled) ? (
                                    <div className="mb-4 p-3 bg-gradient-to-tr from-emerald-500/[0.08] to-[#1B1E28] border border-emerald-500/20 rounded-2xl text-[11px] text-emerald-200 flex items-start gap-2.5">
                                        <div className="w-4 h-4 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0 mt-0.5 animate-pulse">
                                            <Sparkles className="w-3.5 h-3.5" />
                                        </div>
                                        <div>
                                            <span className="font-bold text-[10px] uppercase tracking-wider text-emerald-400 block font-mono">Gemini AI Active</span>
                                            <p className="text-[9px] text-slate-400 mt-0.5 leading-tight">Tailoring custom color names, copywriting descriptions, and theme sets directly using smart models.</p>
                                        </div>
                                    </div>
                                ) : (
                                    <div className="mb-4 p-3 bg-slate-500/10 border border-slate-500/20 rounded-2xl text-[11px] text-slate-300 flex items-start gap-2.5">
                                        <div className="w-4 h-4 rounded-full bg-slate-500/20 text-slate-400 flex items-center justify-center shrink-0 mt-0.5">
                                            <Sliders className="w-3.5 h-3.5" />
                                        </div>
                                        <div>
                                            <span className="font-bold text-[10px] uppercase tracking-wider text-slate-400 block font-mono">Math Harmony Mode</span>
                                            <p className="text-[9px] text-slate-400 mt-0.5 leading-tight">Generating standard color wheels mathematically. Click 'Generate Vibe Palette' to run AI-assisted styles.</p>
                                        </div>
                                    </div>
                                )}

                                {/* Primary input layout row */}
                                <div className="flex items-center gap-3.5 mb-5 bg-[#1B1E28] p-3 rounded-2xl border border-[#262A37]">
                                    <div className="relative">
                                        <input
                                            type="color"
                                            value={primaryColor}
                                            onChange={(e) => setPrimaryColor(e.target.value)}
                                            className="w-12 h-12 rounded-xl cursor-pointer border-2 border-slate-700/60 transition-transform hover:scale-105"
                                        />
                                    </div>
                                    <div className="flex-grow">
                                        <input
                                            type="text"
                                            value={primaryColor}
                                            onChange={(e) => setPrimaryColor(e.target.value)}
                                            placeholder="#4f46e5"
                                            className="w-full bg-transparent text-white font-mono font-bold text-sm focus:outline-none tracking-wider"
                                        />
                                        <span className="text-[10px] text-slate-500 block mt-0.5">Hex Code Base Value</span>
                                    </div>
                                    {/* Validation check bullet */}
                                    <div className={`w-2.5 h-2.5 rounded-full ${/^#[0-9A-F]{6}$/i.test(primaryColor) ? 'bg-emerald-400' : 'bg-red-400'}`}></div>
                                </div>

                                {/* Micro rotary adjust / fine-tuner */}
                                <div className="space-y-3 p-3 bg-[#1B1E28]/50 rounded-xl border border-[#222530] text-xs mb-5">
                                    <div className="flex items-center justify-between text-[11px]">
                                        <span className="text-slate-400">Rotated Base Hue</span>
                                        <span className="text-slate-300 font-bold font-mono">{activeHsl.h}°</span>
                                    </div>
                                    <div className="w-full h-1 bg-slate-800 rounded-full overflow-hidden">
                                        <div className="h-full bg-indigo-500" style={{ width: `${(activeHsl.h / 360) * 100}%` }}></div>
                                    </div>
                                    <div className="flex justify-between text-[10px] text-slate-500">
                                        <span>0° Reds</span>
                                        <span>120° Greens</span>
                                        <span>240° Blues</span>
                                    </div>
                                </div>

                                {/* Harmony Selection Grid */}
                                <div className="space-y-4">
                                    <div>
                                        <label className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block mb-1.5">Harmony Configuration</label>
                                        <select
                                            value={mode}
                                            onChange={(e) => setMode(e.target.value)}
                                            className="w-full bg-[#1B1E28] border border-[#262A37] rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-indigo-500 transition-colors cursor-pointer"
                                        >
                                            <option value="analogous">Analogous Harmony</option>
                                            <option value="monochromatic">Monochromatic Depth</option>
                                            <option value="complementary">Complementary Contrast</option>
                                            <option value="split-complementary">Split-Complementary Balance</option>
                                            <option value="triadic">Triadic Energetics</option>
                                            <option value="tetradic">Tetradic Matrix</option>
                                            <option value="pastel">Pastel Editorial Softness</option>
                                            <option value="neon">Neon Cyber Radiance</option>
                                        </select>
                                    </div>

                                    {/* Vibe input custom prompt */}
                                    <div>
                                        <label className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block mb-1.5">Creative Vibe Prompt (Optional)</label>
                                        <textarea
                                            value={userPrompt}
                                            onChange={(e) => setUserPrompt(e.target.value)}
                                            placeholder="e.g. cozy warm sand and minerals, scandinavian mist, retro arcade glow"
                                            className="w-full bg-[#1B1E28] border border-[#262A37] rounded-xl px-3 py-2 text-xs text-white placeholder-slate-500 h-16 focus:outline-none focus:border-indigo-500 resize-none transition-colors"
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Action Button */}
                            <button
                                onClick={() => generatePalette()}
                                disabled={isLoading}
                                className="w-full py-3 mt-6 bg-gradient-to-r from-indigo-600 to-indigo-500 hover:from-indigo-500 hover:to-indigo-400 disabled:opacity-50 text-white rounded-xl text-xs font-bold transition-all shadow-md active:scale-[0.98] border border-indigo-500/20 flex items-center justify-center gap-2 cursor-pointer"
                            >
                                {isLoading ? (
                                    <>
                                        <div className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                        <span>Formulating Palette...</span>
                                    </>
                                ) : (
                                    <>
                                        <Sparkles className="w-3.5 h-3.5" />
                                        <span>Generate Vibe Palette</span>
                                    </>
                                )}
                            </button>
                        </div>

                        {/* BENTO 2: PERSISTED ARCHIVES stack */}
                        <div className="bg-[#15171E] border border-[#222530] rounded-3xl p-5 shadow-lg flex-grow flex flex-col justify-between">
                            <div>
                                <div className="flex items-center justify-between border-b border-[#222530] pb-3 mb-3">
                                    <div className="flex items-center gap-2">
                                        <Heart className="w-4 h-4 text-pink-500" />
                                        <span className="text-[11px] uppercase tracking-widest text-slate-300 font-bold">Stored Library</span>
                                    </div>
                                    <span className="text-[10px] text-slate-500 font-mono">({savedPalettes.length} Swatches)</span>
                                </div>

                                {/* Save Input widget */}
                                <div className="flex items-center gap-2 mb-4">
                                    <input
                                        type="text"
                                        value={paletteNameInput}
                                        onChange={(e) => setPaletteNameInput(e.target.value)}
                                        placeholder="Rename palette..."
                                        className="flex-grow bg-[#1B1E28] border border-[#262A37] rounded-lg px-2.5 py-1.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
                                    />
                                    <button
                                        onClick={handleSavePalette}
                                        className="p-2 bg-[#222530] hover:bg-[#2c3040] text-indigo-400 rounded-lg border border-[#2c3040] transition-all cursor-pointer"
                                        title="Lock current palette to local library"
                                    >
                                        <Plus className="w-4 h-4" />
                                    </button>
                                </div>

                                {/* Stored Palettes List */}
                                <div className="space-y-2 max-h-52 overflow-y-auto pr-1">
                                    {savedPalettes.length === 0 ? (
                                        <div className="text-center py-6 text-slate-500 text-[11px] bg-[#1B1E28]/40 rounded-xl border border-dashed border-[#222530]">
                                            No custom swatches saved. Click Plus to store current setup in local cookie.
                                        </div>
                                    ) : (
                                        savedPalettes.map((item) => (
                                            <div
                                                key={item.id}
                                                onClick={() => handleRestorePalette(item)}
                                                className={`p-2.5 rounded-xl border text-left cursor-pointer transition-all hover:border-[#383d50] flex items-center justify-between group ${item.name === currentPalette.name ? 'border-indigo-500/50 bg-indigo-500/[0.04]' : 'border-[#222530] bg-[#1B1E28]'}`}
                                            >
                                                <div className="flex-grow min-w-0 pr-2">
                                                    <span className="block text-[11px] font-bold text-slate-200 truncate group-hover:text-white">{item.name}</span>
                                                    <span className="text-[9px] text-slate-500 uppercase font-mono">{item.colors.primary} • {item.colors.secondary}</span>
                                                </div>

                                                {/* Interactive miniature preview dot deck */}
                                                <div className="flex items-center gap-1.5 shrink-0">
                                                    <div className="flex items-center gap-0.5 mr-1.5">
                                                        <span className="w-2.5 h-2.5 rounded-full border border-black/20" style={{ backgroundColor: item.colors.primary }} />
                                                        <span className="w-2.5 h-2.5 rounded-full border border-black/20" style={{ backgroundColor: item.colors.secondary }} />
                                                        <span className="w-2.5 h-2.5 rounded-full border border-black/20" style={{ backgroundColor: item.colors.accent }} />
                                                    </div>

                                                    <button
                                                        onClick={(e) => handleDeleteSaved(item.id, e)}
                                                        className="p-1 text-slate-500 hover:text-red-400 hover:bg-red-500/10 rounded transition-all"
                                                        title="Purge"
                                                    >
                                                        <Trash2 className="w-3 h-3" />
                                                    </button>
                                                </div>
                                            </div>
                                        ))
                                    )}
                                </div>
                            </div>

                            <div className="text-[10px] text-slate-500 pt-3 border-t border-[#222530] mt-3 leading-tight flex items-center justify-center gap-1">
                                <Info className="w-3.5 h-3.5 shrink-0 text-indigo-400" />
                                <span>Palettes persist locally across browser tabs.</span>
                            </div>
                        </div>

                    </div>

                    {/* COLUMN MIDDLE (Span 6): Main Canvas Interactive Live Website previewer */}
                    <div className="lg:col-span-6 flex flex-col gap-5">

                        <div className="bg-[#15171E] border border-[#222530] rounded-[32px] p-3 shadow-2xl flex flex-col justify-between items-stretch">

                            {/* STAGE HEADER CONTROL TILE */}
                            <div className="bg-[#1B1E28]/70 border border-[#222530] rounded-2xl px-4 py-3 mb-3 flex flex-wrap items-center justify-between gap-3">

                                {/* Visual archetype title */}
                                <div className="flex items-center gap-2">
                                    <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></div>
                                    <div>
                                        <span className="text-[10px] text-slate-400 block tracking-tight uppercase font-bold">VIRTUAL SIMULATOR</span>
                                        <h2 className="text-sm font-extrabold text-[#ECEFF4] font-mono leading-tight">{currentPalette.name}</h2>
                                    </div>
                                </div>

                                {/* Simulator controls theme switch & responsive frame trigger */}
                                <div className="flex items-center gap-2">

                                    {/* Aspect view mode select */}
                                    <div className="flex items-center gap-1 bg-[#15171E] border border-[#262A37] rounded-lg p-0.5">
                                        <button
                                            onClick={() => setDeviceMode("mobile")}
                                            className={`p-1.5 rounded text-slate-400 transition-all ${deviceMode === "mobile" ? "bg-indigo-600 text-white shadow" : "hover:text-slate-200"}`}
                                            title="Simulate Mobile Device Canvas"
                                        >
                                            <Smartphone className="w-3.5 h-3.5" />
                                        </button>
                                        <button
                                            onClick={() => setDeviceMode("tablet")}
                                            className={`p-1.5 rounded text-slate-400 transition-all ${deviceMode === "tablet" ? "bg-indigo-600 text-white shadow" : "hover:text-slate-200"}`}
                                            title="Simulate Tablet Width"
                                        >
                                            <Tablet className="w-3.5 h-3.5" />
                                        </button>
                                        <button
                                            onClick={() => setDeviceMode("desktop")}
                                            className={`p-1.5 rounded text-slate-400 transition-all ${deviceMode === "desktop" ? "bg-indigo-600 text-white shadow" : "hover:text-slate-200"}`}
                                            title="Full Desktop Screen layout"
                                        >
                                            <Laptop className="w-3.5 h-3.5" />
                                        </button>
                                    </div>

                                    {/* Dark-vs-Light switch on mockup */}
                                    <div className="flex items-center bg-[#15171E] border border-[#262A37] rounded-lg p-0.5">
                                        <button
                                            onClick={() => setSimulationTheme("light")}
                                            className={`p-1.5 rounded transition-all ${simulationTheme === "light" ? "bg-indigo-600 text-white shadow" : "text-slate-400 hover:text-slate-200"}`}
                                            title="Switch mock mockup to Lightmode"
                                        >
                                            <Sun className="w-3.5 h-3.5" />
                                        </button>
                                        <button
                                            onClick={() => setSimulationTheme("dark")}
                                            className={`p-1.5 rounded transition-all ${simulationTheme === "dark" ? "bg-indigo-600 text-white shadow" : "text-slate-400 hover:text-slate-200"}`}
                                            title="Switch mockup to Darkmode"
                                        >
                                            <Moon className="w-3.5 h-3.5" />
                                        </button>
                                    </div>

                                </div>

                            </div>

                            {/* TEMPLATE CATEGORY BAR */}
                            <div className="flex items-center gap-2 mb-3 bg-[#1B1E28]/45 p-1 rounded-xl border border-[#222530] overflow-x-auto">
                                <button
                                    onClick={() => {
                                        setTargetAudience("saas");
                                        generatePalette(primaryColor, mode, "saas");
                                    }}
                                    className={`flex-1 py-1.5 px-2 text-[10px] whitespace-nowrap uppercase tracking-wider font-bold rounded-lg transition-all ${targetAudience === "saas" ? "bg-indigo-600 font-semibold text-white shadow" : "text-slate-400 hover:bg-slate-800"}`}
                                >
                                    SaaS Core 💻
                                </button>
                                <button
                                    onClick={() => {
                                        setTargetAudience("ecommerce");
                                        generatePalette(primaryColor, mode, "ecommerce");
                                    }}
                                    className={`flex-1 py-1.5 px-2 text-[10px] whitespace-nowrap uppercase tracking-wider font-bold rounded-lg transition-all ${targetAudience === "ecommerce" ? "bg-indigo-600 font-semibold text-white shadow" : "text-slate-400 hover:bg-slate-800"}`}
                                >
                                    Boutique Shop 🛍️
                                </button>
                                <button
                                    onClick={() => {
                                        setTargetAudience("creative");
                                        generatePalette(primaryColor, mode, "creative");
                                    }}
                                    className={`flex-1 py-1.5 px-2 text-[10px] whitespace-nowrap uppercase tracking-wider font-bold rounded-lg transition-all ${targetAudience === "creative" ? "bg-indigo-600 font-semibold text-white shadow" : "text-slate-400 hover:bg-slate-800"}`}
                                >
                                    Studio Agency 🎨
                                </button>
                                <button
                                    onClick={() => {
                                        setTargetAudience("dashboard");
                                        generatePalette(primaryColor, mode, "dashboard");
                                    }}
                                    className={`flex-1 py-1.5 px-2 text-[10px] whitespace-nowrap uppercase tracking-wider font-bold rounded-lg transition-all ${targetAudience === "dashboard" ? "bg-indigo-600 font-semibold text-white shadow" : "text-slate-400 hover:bg-slate-800"}`}
                                >
                                    Metric Board 📊
                                </button>
                            </div>

                            {/* SIMULATED DEVICE CAROUSEL */}
                            <div className="flex-grow flex items-center justify-center bg-[#090B0E] rounded-3xl p-3 border border-[#222530] min-h-[460px] relative overflow-hidden">
                                <div
                                    className="transition-all duration-300 w-full rounded-2xl overflow-hidden shadow-2xl relative border"
                                    style={{
                                        maxWidth: deviceMode === "mobile" ? "340px" : deviceMode === "tablet" ? "540px" : "100%",
                                        maxHeight: "560px",
                                        overflowY: "auto",
                                        borderColor: `${currentPalette.colors.primary}30`
                                    }}
                                >

                                    {/* Render simulated pages */}
                                    {targetAudience === "saas" && (
                                        <MockSaaS palette={currentPalette} theme={simulationTheme} />
                                    )}
                                    {targetAudience === "ecommerce" && (
                                        <MockECommerce palette={currentPalette} theme={simulationTheme} />
                                    )}
                                    {targetAudience === "creative" && (
                                        <MockCreative palette={currentPalette} theme={simulationTheme} />
                                    )}
                                    {targetAudience === "dashboard" && (
                                        <MockDashboard palette={currentPalette} theme={simulationTheme} />
                                    )}

                                </div>

                                {/* Overlying watermarks */}
                                <div className="absolute bottom-6 right-6 pointer-events-none px-3 py-1 bg-black/70 text-indigo-400 border border-indigo-500/20 text-[9px] font-mono tracking-widest uppercase rounded-full">
                                    Visual Showcase Node
                                </div>
                            </div>

                        </div>

                    </div>

                    {/* COLUMN RIGHT (Span 2): Accessibility & Swatch Detail Palette */}
                    <div className="lg:col-span-2 flex flex-col gap-5">

                        {/* BENTO 3: DETAILED SWATCH CARDS */}
                        <div className="bg-[#15171E] border border-[#222530] rounded-3xl p-4 flex flex-col justify-between shadow-lg">
                            <div>
                                <div className="flex items-center justify-between border-b border-[#222530] pb-2 mb-3">
                                    <span className="text-[10px] uppercase tracking-widest text-slate-300 font-bold block">Palette Shades</span>
                                    <span className="text-[10px] text-indigo-400">Tap to Copy</span>
                                </div>

                                <div className="space-y-2.5">
                                    {[
                                        { hex: currentPalette.colors.primary, name: currentPalette.names.primary || "Primary Base", tag: "Primary" },
                                        { hex: currentPalette.colors.secondary, name: currentPalette.names.secondary || "Secondary Shade", tag: "Secondary" },
                                        { hex: currentPalette.colors.accent, name: currentPalette.names.accent || "Accent Spark", tag: "Accent" },
                                        { hex: currentPalette.colors.bgLight, name: currentPalette.names.bgLight || "Soft Canvas Light", tag: "Bg Light" },
                                        { hex: currentPalette.colors.bgDark, name: currentPalette.names.bgDark || "Midnight Space Dark", tag: "Bg Dark" },
                                    ].map((col, idx) => (
                                        <div
                                            key={idx}
                                            onClick={() => handleCopy(col.hex, `Copied hex ${col.hex} for ${col.tag}!`)}
                                            className="p-1.5 bg-[#1B1E28] border border-[#222530] rounded-xl hover:border-slate-600 cursor-pointer transition-all flex items-center gap-2.5 group"
                                        >
                                            <div
                                                className="w-9 h-9 rounded-lg border border-black/25 shrink-0 shadow transition-transform group-hover:scale-105"
                                                style={{ backgroundColor: col.hex }}
                                            />
                                            <div className="min-w-0 flex-grow">
                                                <span className="text-[9px] uppercase tracking-wider font-bold text-slate-400 block">{col.tag}</span>
                                                <span className="text-[11px] font-bold text-slate-100 font-mono block">{col.hex}</span>
                                                <span className="text-[9px] text-[#A0AEC0] truncate block">{col.name}</span>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* BENTO 4: ACCESSIBILITY METRICS DIAGNOSTICS */}
                        <div className="bg-[#15171E] border border-[#222530] rounded-3xl p-4 flex flex-col justify-between shadow-md">
                            <div>
                                <div className="flex items-center justify-between border-b border-[#222530] pb-2 mb-3">
                                    <span className="text-[10px] uppercase tracking-widest text-slate-300 font-bold">Contrast Ratios</span>
                                    <AwardStatusBox score={contrastBodyLight} />
                                </div>

                                <div className="space-y-2.5">
                                    <ContrastStat
                                        label="Body text / Light Canvas"
                                        ratio={contrastBodyLight}
                                        grade={ratingLight.grade}
                                        tClass={ratingLight.textClass}
                                        bgClass={ratingLight.bgClass}
                                    />
                                    <ContrastStat
                                        label="Body text / Dark Canvas"
                                        ratio={contrastBodyDark}
                                        grade={ratingDark.grade}
                                        tClass={ratingDark.textClass}
                                        bgClass={ratingDark.bgClass}
                                    />
                                    <ContrastStat
                                        label="Primary Base / Light Bg"
                                        ratio={contrastPrimaryOnBg}
                                        grade={ratingPrimary.grade}
                                        tClass={ratingPrimary.textClass}
                                        bgClass={ratingPrimary.bgClass}
                                    />
                                    <ContrastStat
                                        label="Vibrant Accent / Dark Bg"
                                        ratio={contrastAccentOnBgDark}
                                        grade={ratingAccent.grade}
                                        tClass={ratingAccent.textClass}
                                        bgClass={ratingAccent.bgClass}
                                    />
                                </div>
                            </div>

                            {/* Micro diagnostic explanation text */}
                            <div className="mt-4 pt-2 border-t border-[#222530] text-[9px] text-slate-500 leading-tight">
                                Contrast formulas calculated against WCAG 2.1 specifications dynamically using relative luminance variables.
                            </div>
                        </div>

                    </div>

                </div>

                {/* BENTO ROW: TOOLING & EXPORTS CONTAINER */}
                <div className="bg-[#15171E] border border-[#222530] rounded-3xl p-5 shadow-xl relative overflow-hidden mb-6">
                    <div className="absolute top-0 right-0 w-44 h-44 bg-pink-500/5 rounded-full blur-3xl"></div>

                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-[#222530] pb-4 mb-4">
                        <div>
                            <span className="text-[10px] uppercase tracking-widest text-slate-400 font-bold block">Developer Hand-Off Panel</span>
                            <h2 className="text-base font-extrabold text-[#ECEFF4] font-mono leading-tight">Instant Styling Integration Tokens</h2>
                        </div>

                        {/* Switch Code Preset buttons */}
                        <div className="flex items-center gap-1.5 bg-[#1B1E28] border border-[#222530] p-1 rounded-xl">
                            <button
                                onClick={() => setActiveTab("tailwind")}
                                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${activeTab === "tailwind" ? "bg-indigo-600 text-white" : "text-slate-400 hover:text-white"}`}
                            >
                                Tailwind v4 Config
                            </button>
                            <button
                                onClick={() => setActiveTab("css")}
                                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${activeTab === "css" ? "bg-indigo-600 text-white" : "text-slate-400 hover:text-white"}`}
                            >
                                CSS Variables
                            </button>
                            <button
                                onClick={() => setActiveTab("figma")}
                                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${activeTab === "figma" ? "bg-indigo-600 text-white" : "text-slate-400 hover:text-white"}`}
                            >
                                Figma Tokens (JSON)
                            </button>
                        </div>
                    </div>

                    {/* Export editor viewport */}
                    <div className="relative">
                        <pre className="p-4 bg-[#090B0E] rounded-2xl border border-[#222530] text-[11px] font-mono text-indigo-300 leading-relaxed overflow-x-auto max-h-56">
                            {activeTab === "tailwind" && getTailwindCode()}
                            {activeTab === "css" && getCssCode()}
                            {activeTab === "figma" && getFigmaCode()}
                        </pre>

                        <button
                            onClick={() => {
                                let text = "";
                                if (activeTab === "tailwind") text = getTailwindCode();
                                if (activeTab === "css") text = getCssCode();
                                if (activeTab === "figma") text = getFigmaCode();
                                handleCopy(text, "Tokens copied to clipboard! 📋");
                            }}
                            className="absolute top-3 right-3 p-2 bg-[#1C1E29] hover:bg-[#252837] text-white border border-[#252837] rounded-lg transition-transform active:scale-95 cursor-pointer"
                            title="Copy layout parameters"
                        >
                            <Copy className="w-4 h-4" />
                        </button>
                    </div>
                </div>

            </div>
        </div>
    );
}

// Inline Sub-components
function AwardStatusBox({ score }: { score: number }) {
    if (score >= 4.5) {
        return (
            <span className="px-2 py-0.5 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-[8px] tracking-wider uppercase font-bold rounded">
                AAA Verified
            </span>
        );
    }
    return (
        <span className="px-2 py-0.5 bg-amber-500/10 text-amber-400 border border-amber-500/20 text-[8px] tracking-wider uppercase font-bold rounded">
            Adjust Tones
        </span>
    );
}

function ContrastStat({ label, ratio, grade, tClass, bgClass }: { label: string; ratio: number; grade: string; tClass: string; bgClass: string }) {
    return (
        <div className="p-2 bg-[#1B1E28] border border-[#222530] rounded-xl flex items-center justify-between text-[11px]">
            <div>
                <span className="block text-slate-400 font-medium text-[9px] mb-0.5">{label}</span>
                <span className="font-bold text-[#ECEFF4] font-mono">{ratio} : 1</span>
            </div>
            <span className={`px-2 py-1 rounded text-[8px] uppercase tracking-wider font-bold border ${tClass} ${bgClass}`}>
                {grade}
            </span>
        </div>
    );
}
