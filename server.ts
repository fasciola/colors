import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI, Type } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

// Dynamically get the Gemini client using the latest environment key
function getGeminiClient(): GoogleGenAI | null {
    const key = process.env.GEMINI_API_KEY;
    if (key && key !== "MY_GEMINI_API_KEY" && key.trim().length > 0) {
        try {
            return new GoogleGenAI({
                apiKey: key,
                httpOptions: {
                    headers: {
                        "User-Agent": "aistudio-build",
                    },
                },
            });
        } catch (error) {
            console.error("Failed to dynamic initialize Gemini client:", error);
        }
    }
    return null;
}

// Helper methods for color conversion to support programmatic fallback generators
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
            case r:
                h = (g - b) / d + (g < b ? 6 : 0);
                break;
            case g:
                h = (b - r) / d + 2;
                break;
            case b:
                h = (r - g) / d + 4;
                break;
        }
        h /= 6;
    }

    return { h: Math.round(h * 360), s: Math.round(s * 100), l: Math.round(l * 100) };
}

function hslToHex(h: number, s: number, l: number): string {
    h = (h % 360 + 360) % 360; // clip bounds
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

// Generate fallback palette mathematically
function generateMathematicalPalette(primaryHex: string, mode: string, audience: string) {
    const hsl = hexToHsl(primaryHex);
    let secondaryHex = primaryHex;
    let accentHex = primaryHex;

    switch (mode.toLowerCase()) {
        case "analogous":
            secondaryHex = hslToHex(hsl.h - 30, hsl.s, hsl.l);
            accentHex = hslToHex(hsl.h + 30, Math.min(100, hsl.s + 10), Math.min(100, hsl.l + 5));
            break;
        case "complementary":
            secondaryHex = hslToHex(hsl.h + 180, hsl.s, hsl.l);
            accentHex = hslToHex(hsl.h + 180, Math.min(100, hsl.s + 15), Math.max(20, hsl.l - 10));
            break;
        case "split-complementary":
            secondaryHex = hslToHex(hsl.h + 150, hsl.s, hsl.l);
            accentHex = hslToHex(hsl.h + 210, Math.min(100, hsl.s + 10), hsl.l);
            break;
        case "triadic":
            secondaryHex = hslToHex(hsl.h + 120, hsl.s, hsl.l);
            accentHex = hslToHex(hsl.h + 240, hsl.s, hsl.l);
            break;
        case "tetradic":
            secondaryHex = hslToHex(hsl.h + 90, hsl.s, hsl.l);
            accentHex = hslToHex(hsl.h + 180, hsl.s, hsl.l);
            break;
        case "monochromatic":
        default:
            secondaryHex = hslToHex(hsl.h, Math.max(10, hsl.s - 25), Math.max(15, hsl.l - 15));
            accentHex = hslToHex(hsl.h, Math.min(100, hsl.s + 15), Math.min(90, hsl.l + 15));
            break;
    }

    // Soft backgrounds matching the tint
    const bgLight = hslToHex(hsl.h, Math.min(10, hsl.s), 98);
    const bgDark = hslToHex(hsl.h, Math.min(25, hsl.s + 10), 9);
    const textLight = hslToHex(hsl.h, Math.min(20, hsl.s), 12);
    const textDark = hslToHex(hsl.h, Math.min(15, hsl.s), 95);

    let categoryName = "Creative SaaS Platform";
    let heroTitle = "Build Better Experiences Together";
    let heroSubtitle = "The ultimate unified workspace designed for modern engineering and visually stunning designs.";
    let features = [
        { title: "Visual Playground", description: "Design responsive modular layout systems and style grids flawlessly." },
        { title: "Color Harmonies", description: "Calculate high contrast complementary pairings in real-time." },
        { title: "Global Syncing", description: "Export custom themes, CSS tokens, and config blocks instantly." }
    ];

    if (audience === "ecommerce") {
        categoryName = "Scandi Ceramic Boutique";
        heroTitle = "Artisanal Pieces for Mindful Spaces";
        heroSubtitle = "Each container, vase, and cup is hand-finished with organic textures to blend gracefully with modern homes.";
        features = [
            { title: "Organic Clays", description: "Made from sustainably harvested local clays and baked by hand." },
            { title: "Custom Glazes", description: "Coated with food-safe non-toxic soft minerals for tactile satisfaction." },
            { title: "Sustainably Packed", description: "Shipped in zero-plastic biodegradable hemp casing." }
        ];
    } else if (audience === "creative") {
        categoryName = "Studio Synthesis";
        heroTitle = "Bold Visual Solutions and Editorial Craft";
        heroSubtitle = "A team of progressive designers, web architects, and brand developers crafting next-era digital identities.";
        features = [
            { title: "Identity Design", description: "Defining complete color systems, signature typography, and modern guidelines." },
            { title: "Custom Coding", description: "Bespoke engineering from single-page layouts to comprehensive tools." },
            { title: "Visual Assets", description: "Uniquely modeled illustrations, icons, and ambient animation packs." }
        ];
    } else if (audience === "dashboard") {
        categoryName = "Velocity Metric Core";
        heroTitle = "Real-time Metrics and Fluid Analytics";
        heroSubtitle = "Observe continuous request velocities, query runtimes, and customer interactions from a single high-contrast interface.";
        features = [
            { title: "Zero Latency", description: "Observe metric points stream continuously with sub-millisecond lag." },
            { title: "Metric Triggers", description: "Set customizable rules for anomalous activity with instant notification." },
            { title: "Team Collaboration", description: "Invite team members to analyze real-time workspace boards together." }
        ];
    }

    return {
        name: `${mode.toUpperCase()} Harmony`,
        mood: `A harmonized, programmatic ${mode} color landscape generated from ${primaryHex}.`,
        praise: "This palette is mathematically proportioned using standard HSL wheel rotations. Contrast ratios have been calculated to guarantee AAA readability on light and dark panels alike.",
        colors: {
            primary: primaryHex,
            secondary: secondaryHex,
            accent: accentHex,
            bgLight,
            bgDark,
            textLight,
            textDark,
            success: "#10b981",
            error: "#ef4444"
        },
        names: {
            primary: "Dominant Brand Highlight",
            secondary: "Harmonious Subtone",
            accent: "Vibrant Accent",
            bgLight: "Sand Cream Light",
            bgDark: "Midnight Tint Dark",
            textLight: "Deep Charcoal Ink",
            textDark: "Soft Chalk White"
        },
        customCopy: {
            heroTitle,
            heroSubtitle,
            features
        },
        typography: {
            headingFont: "Cabinet Grotesk",
            bodyFont: "Inter",
            letterSpacing: "-0.015em"
        },
        source: "mathematical"
    };
}

// REST endpoints
app.get("/api/health", (req, res) => {
    res.json({ status: "healthy", timestamp: new Date().toISOString() });
});

app.get("/api/config", (req, res) => {
    const client = getGeminiClient();
    res.json({ geminiEnabled: !!client });
});

app.post("/api/generate-palette", async (req, res) => {
    const { primaryColor = "#4f46e5", mode = "analogous", targetAudience = "saas", prompt = "" } = req.body;

    const activeAi = getGeminiClient();

    // If Gemini client is not initialized, proceed with high-contrast mathematical fallback
    if (!activeAi) {
        console.log("No Gemini API key detected, serving mathematically generated fallback.");
        const fallback = generateMathematicalPalette(primaryColor, mode, targetAudience);
        return res.json(fallback);
    }

    try {
        const promptInstructions = `
      You are an expert brand designer and user interface engineer.
      Generate a comprehensive color palette and website mockup copywriting package based on these parameters:
      - Primary Base Color: "${primaryColor}"
      - Color Harmony Mode: "${mode}" (e.g., monochromatic, analogous, complementary, split-complementary, triadic, tetradic, pastel, neon)
      - Targeted Website Type / Audience: "${targetAudience}" (e.g., saas, ecommerce, creative portfolio, metric/finance dashboard)
      - Additional Vibe Guidance: "${prompt}"

      CRITICAL BRAND COLORING RULES to avoid low-effort generation:
      1. Ensure all generated hex codes are valid, visually appealing, and blend nicely.
      2. If harmony mode is 'pastel', make sure all colors have high lightness and soft saturation (except maybe a legible accent text).
      3. If harmony mode is 'neon', make sure colors are high vibrancy, glowing, and standout beautifully against the 'bgDark'.
      4. Crucial: Calculate legible contrast. The 'textLight' must be dark enough (high contrast) to be perfectly readable on 'bgLight' and 'primary'. The 'textDark' must be light enough to read on 'bgDark' and 'secondary'.
      5. Add tailored, engaging, non-placeholder copywriting that fits targetAudience and the aesthetic vibe of these colors. No generic lorum ipsum! Make a gorgeous landing page title, subtitle, and 3 high-impact features with short details.
    `;

        const response = await activeAi.models.generateContent({
            model: "gemini-3.5-flash",
            contents: promptInstructions,
            config: {
                responseMimeType: "application/json",
                responseSchema: {
                    type: Type.OBJECT,
                    properties: {
                        name: { type: Type.STRING, description: "A poetic, creative brand name for this specific palette (e.g., 'Warm Terracotta', 'Neon Matrix', 'Scandinavian Haze')" },
                        mood: { type: Type.STRING, description: "Brief visual feel description of the colors (e.g., Calm, organic, cozy, high-alert, futuristic, professional)" },
                        praise: { type: Type.STRING, description: "Design criticism / explanation of why the primary, secondary, and accent colors work beautifully together under these constraints." },
                        colors: {
                            type: Type.OBJECT,
                            properties: {
                                primary: { type: Type.STRING, description: "The hex code for the primary brand color (e.g., '#4f46e5')" },
                                secondary: { type: Type.STRING, description: "The hex code for the harmonized secondary color (e.g., '#06b6d4')" },
                                accent: { type: Type.STRING, description: "The hex code for the standout accent color (e.g., '#f43f5e')" },
                                bgLight: { type: Type.STRING, description: "A beautiful, tinted off-white or very soft shade for light background canvas (e.g., '#fafaf9')" },
                                bgDark: { type: Type.STRING, description: "A beautiful, deep gray, slate, indigo, or very dark shade for dark background canvas (e.g., '#0f172a')" },
                                textLight: { type: Type.STRING, description: "Legible rich carbon/dark color for text on light backgrounds (e.g., '#1c1917')" },
                                textDark: { type: Type.STRING, description: "Legible soft snow/white color for text on dark backgrounds (e.g., '#f8fafc')" },
                                success: { type: Type.STRING, description: "Matches state: Greenish visual success variant hex" },
                                error: { type: Type.STRING, description: "Matches state: Reddish visual alert variant hex" }
                            },
                            required: ["primary", "secondary", "accent", "bgLight", "bgDark", "textLight", "textDark"]
                        },
                        names: {
                            type: Type.OBJECT,
                            properties: {
                                primary: { type: Type.STRING, description: "Creative color description name for primary" },
                                secondary: { type: Type.STRING, description: "Creative color description name for secondary" },
                                accent: { type: Type.STRING, description: "Creative color description name for accent" },
                                bgLight: { type: Type.STRING, description: "Creative color description name for bgLight" },
                                bgDark: { type: Type.STRING, description: "Creative color description name for bgDark" }
                            },
                            required: ["primary", "secondary", "accent"]
                        },
                        customCopy: {
                            type: Type.OBJECT,
                            properties: {
                                heroTitle: { type: Type.STRING, description: "Punchy, tailored premium headline for the preview page" },
                                heroSubtitle: { type: Type.STRING, description: "Elaborative subcopy explaining the brand's purpose" },
                                features: {
                                    type: Type.ARRAY,
                                    items: {
                                        type: Type.OBJECT,
                                        properties: {
                                            title: { type: Type.STRING, description: "Tailored feature title" },
                                            description: { type: Type.STRING, description: "Creative details fitting the prompt theme" }
                                        },
                                        required: ["title", "description"]
                                    }
                                }
                            },
                            required: ["heroTitle", "heroSubtitle", "features"]
                        },
                        typography: {
                            type: Type.OBJECT,
                            properties: {
                                headingFont: { type: Type.STRING, description: "Beautiful display font recommendation (e.g., Space Grotesk, Playfair Display, Outfit)" },
                                bodyFont: { type: Type.STRING, description: "Beautiful body font recommendation (e.g., Inter, Lora, Plus Jakarta Sans)" },
                                letterSpacing: { type: Type.STRING, description: "Letter spacing for headings (e.g., -0.01em)" }
                            },
                            required: ["headingFont", "bodyFont"]
                        }
                    },
                    required: ["name", "colors", "names", "customCopy", "typography"]
                }
            }
        });

        let jsonText = response.text ? response.text.trim() : "";
        if (jsonText.includes("```")) {
            jsonText = jsonText.replace(/```json/gi, "").replace(/```/g, "").trim();
        }
        const parsedData = JSON.parse(jsonText);
        return res.json({
            ...parsedData,
            source: "gemini"
        });
    } catch (error) {
        console.error("Gemini failed to generate palette:", error);
        // Graceful fallback to avoid app crash
        const fallback = generateMathematicalPalette(primaryColor, mode, targetAudience);
        return res.json({
            ...fallback,
            name: `${fallback.name} (Fallback)`,
            praise: "We initialized a calculated visual fallback hierarchy safely because Gemini generation encountered an issue.",
            source: "fallback",
            errorMessage: (error as Error).message || String(error)
        });
    }
});

// Configure Vite integration for live previews and rendering
async function startServer() {
    if (process.env.NODE_ENV !== "production") {
        const vite = await createViteServer({
            server: { middlewareMode: true },
            appType: "spa",
        });
        app.use(vite.middlewares);
    } else {
        const distPath = path.join(process.cwd(), "dist");
        app.use(express.static(distPath));
        app.get("*", (req, res) => {
            res.sendFile(path.join(distPath, "index.html"));
        });
    }

    app.listen(PORT, "0.0.0.0", () => {
        console.log(`Server fully operational on http://localhost:${PORT}`);
    });
}

startServer();
