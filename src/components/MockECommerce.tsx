import React, { useState } from "react";
import { ColorPalette } from "../types";
import {
    ShoppingBag,
    Heart,
    Search,
    Star,
    Plus,
    Minus,
    CheckCircle,
    Truck,
    Award,
    RefreshCw,
    Eye
} from "lucide-react";

interface MockProps {
    palette: ColorPalette;
    theme: "light" | "dark";
}

interface Product {
    id: number;
    name: string;
    price: string;
    rating: number;
    imageShape: "circle" | "rounded" | "rotated";
    bgScale: string;
}

export default function MockECommerce({ palette, theme }: MockProps) {
    const [cartCount, setCartCount] = useState(2);
    const [likedIds, setLikedIds] = useState<number[]>([1]);
    const [toastMessage, setToastMessage] = useState<string | null>(null);

    const colors = palette.colors;
    const copy = palette.customCopy;

    const showToast = (msg: string) => {
        setToastMessage(msg);
        setTimeout(() => setToastMessage(null), 3000);
    };

    const currentBg = theme === "light" ? colors.bgLight : colors.bgDark;
    const currentText = theme === "light" ? colors.textLight : colors.textDark;
    const cardBorder = theme === "light" ? "rgba(0,0,0,0.06)" : "rgba(255,255,255,0.07)";
    const productBg = theme === "light" ? "rgba(0,0,0,0.02)" : "rgba(255,255,255,0.03)";

    const toggleLike = (id: number) => {
        if (likedIds.includes(id)) {
            setLikedIds(likedIds.filter(item => item !== id));
            showToast("Removed from favorites wishlist");
        } else {
            setLikedIds([...likedIds, id]);
            showToast("Saved to favorites wishlist!");
        }
    };

    const handleAddToBag = (pName: string) => {
        setCartCount(prev => prev + 1);
        showToast(`Added ${pName} to your Shopping Bag!`);
    };

    const products: Product[] = [
        { id: 1, name: "Minimalist Stoneware Vase", price: "79.00", rating: 5, imageShape: "circle", bgScale: "0.8" },
        { id: 2, name: "Hand-Thrown Ceramic Cup (Set of 2)", price: "48.00", rating: 4, imageShape: "rounded", bgScale: "0.95" },
        { id: 3, name: "Organic Earth Mineral Incense Holder", price: "32.00", rating: 5, imageShape: "rotated", bgScale: "0.7" },
        { id: 4, name: "Textured Teapot in Terracotta Clay", price: "145.00", rating: 5, imageShape: "circle", bgScale: "0.85" }
    ];

    return (
        <div
            className="w-full text-xs transition-colors duration-300 relative select-none"
            style={{
                backgroundColor: currentBg,
                color: currentText,
                fontFamily: palette.typography.bodyFont === "Inter" ? "Inter, sans-serif" : `${palette.typography.bodyFont}, sans-serif`
            }}
        >
            {/* Toast Alert */}
            {toastMessage && (
                <div
                    className="absolute top-4 left-1/2 transform -translate-x-1/2 z-50 px-4 py-2 rounded-lg text-xs font-semibold shadow-md flex items-center gap-2 transition-all duration-300 border"
                    style={{
                        backgroundColor: colors.bgLight,
                        color: colors.textLight,
                        borderColor: colors.primary
                    }}
                >
                    <CheckCircle className="w-3.5 h-3.5" style={{ color: colors.primary }} />
                    <span>{toastMessage}</span>
                </div>
            )}

            {/* Boutique Promo Line */}
            <div
                className="w-full px-4 py-2 text-center text-[10px] tracking-widest font-semibold uppercase relative z-10"
                style={{
                    backgroundColor: colors.primary,
                    color: colors.bgLight
                }}
            >
                Complimentary Shipping worldwide on orders exceeding $150
            </div>

            {/* Decorative Boutique Header */}
            <header
                className="w-full px-5 py-4 flex items-center justify-between border-b"
                style={{ borderColor: cardBorder }}
            >
                <div className="flex items-center gap-2 cursor-pointer">
                    <span
                        className="font-semibold text-base tracking-widest uppercase"
                        style={{
                            fontFamily: palette.typography.headingFont,
                            letterSpacing: "0.15em"
                        }}
                    >
                        Clay &amp; Grain
                    </span>
                </div>

                {/* Navigation Categories */}
                <nav className="hidden md:flex items-center gap-5 text-[10px] uppercase tracking-widest font-semibold opacity-85">
                    <span className="hover:opacity-100 cursor-pointer">Shop All</span>
                    <span className="hover:opacity-100 cursor-pointer text-amber-600 dark:text-amber-400">Summer Drop</span>
                    <span className="hover:opacity-100 cursor-pointer">Our Studio</span>
                </nav>

                <div className="flex items-center gap-3.5">
                    <div className="cursor-pointer hover:scale-105 active:scale-95 transition-transform">
                        <Search className="w-4 h-4" />
                    </div>
                    <div
                        onClick={() => showToast(`Opening your Shopping Bag contains ${cartCount} items.`)}
                        className="flex items-center gap-1 cursor-pointer hover:scale-105 active:scale-95 transition-transform relative"
                    >
                        <ShoppingBag className="w-4 h-4" />
                        <span
                            className="absolute -top-1.5 -right-1.5 w-3.5 h-3.5 rounded-full flex items-center justify-center text-[8px] text-white font-bold"
                            style={{ backgroundColor: colors.accent }}
                        >
                            {cartCount}
                        </span>
                    </div>
                </div>
            </header>

            {/* Elegant E-Commerce Hero Banner */}
            <section className="px-5 py-14 max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                <div className="flex flex-col gap-4">
                    <span className="text-[10px] font-bold tracking-widest uppercase opacity-70" style={{ color: colors.accent }}>
                        SUMMER HARVEST SELECTIONS
                    </span>
                    <h1
                        className="text-2xl md:text-3.5xl font-light tracking-tight leading-tight"
                        style={{
                            fontFamily: palette.typography.headingFont,
                            letterSpacing: palette.typography.letterSpacing || "-0.01em"
                        }}
                    >
                        {copy.heroTitle || "Mindful Objects For Everyday Rituals"}
                    </h1>
                    <p className="opacity-75 leading-relaxed text-[11px]">
                        {copy.heroSubtitle || "A collective of custom hand-thrown kitchenware & structural ceramic containers, modeled from organic clay minerals. Formed slowly, cured in local elements."}
                    </p>

                    <div className="flex items-center gap-3.5 mt-2">
                        <button
                            onClick={() => handleAddToBag("Featured Clay Teapot")}
                            className="px-5 py-2.5 rounded text-[10px] font-bold uppercase tracking-widest text-white cursor-pointer shadow-md transition-all active:scale-95 hover:opacity-95"
                            style={{ backgroundColor: colors.primary }}
                        >
                            Shop Featured drop
                        </button>
                        <button
                            onClick={() => showToast("Opening editorial journal overview...")}
                            className="px-5 py-2.5 rounded text-[10px] font-bold uppercase tracking-widest border hover:bg-black/5 dark:hover:bg-white/5 cursor-pointer"
                            style={{ borderColor: colors.primary }}
                        >
                            Read Process Journal
                        </button>
                    </div>
                </div>

                {/* Product Art Showcase */}
                <div
                    className="w-full aspect-[4/3] rounded-lg border p-6 flex flex-col justify-center items-center shadow-lg relative group overflow-hidden"
                    style={{
                        borderColor: cardBorder,
                        backgroundColor: `${colors.primary}05`
                    }}
                >
                    {/* Abstract SVG Vase Silhouette representing raw art preview */}
                    <div className="relative w-28 h-28 flex items-center justify-center">
                        {/* Ambient visual aura */}
                        <div
                            className="absolute inset-0 rounded-full blur-xl scale-75 opacity-25"
                            style={{ backgroundColor: colors.accent }}
                        ></div>

                        <svg viewBox="0 0 100 120" className="w-full h-full drop-shadow-md">
                            <path
                                d="M32,30 C32,20 40,10 50,10 C60,10 68,20 68,30 C68,40 60,50 63,70 C66,90 70,100 68,105 C66,110 34,110 32,105 C30,100 34,90 37,70 C40,50 32,40 32,30 Z"
                                fill={colors.primary}
                                opacity="0.85"
                            />
                            <ellipse cx="50" cy="10" rx="18" ry="4" fill={colors.accent} opacity="0.9" />
                            <path d="M42,52 L58,52 M45,64 L55,64" stroke={colors.bgLight} strokeWidth="1.5" strokeLinecap="round" opacity="0.5" />
                        </svg>
                    </div>

                    <div className="text-center mt-5">
                        <span className="text-[10px] opacity-60 italic block font-serif">Aura Vase in Harvest Terracotta</span>
                        <span className="font-bold tracking-wider block mt-1" style={{ color: colors.accent }}>$185.00 USD</span>
                    </div>

                    <button
                        onClick={() => handleAddToBag("Aura Vase")}
                        className="absolute bottom-3 right-3 p-2 rounded-full text-white cursor-pointer hover:scale-105 active:scale-95 transition-transform"
                        style={{ backgroundColor: colors.accent }}
                    >
                        <Plus className="w-4 h-4" />
                    </button>
                </div>
            </section>

            {/* Grid of Handcrafted Products */}
            <section className="px-5 py-12 border-t" style={{ borderColor: cardBorder }}>
                <div className="flex items-center justify-between mb-8 max-w-4xl mx-auto">
                    <div>
                        <h2 className="text-lg font-light tracking-wide uppercase" style={{ fontFamily: palette.typography.headingFont }}>Curated Collections</h2>
                        <p className="opacity-60 text-[10px]">Slow-made stoneware pieces designed to hold earth, water, and air seamlessly.</p>
                    </div>
                    <span className="text-[10px] font-bold uppercase tracking-widest underline cursor-pointer">View All Drop</span>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
                    {products.map((p) => {
                        const isLiked = likedIds.includes(p.id);
                        return (
                            <div key={p.id} className="group relative flex flex-col justify-between p-3.5 rounded-lg border transition-all hover:shadow-md" style={{ borderColor: cardBorder, backgroundColor: productBg }}>

                                {/* Product Image Stage */}
                                <div className="relative w-full aspect-square rounded flex items-center justify-center overflow-hidden mb-3 bg-white/40 dark:bg-black/20">
                                    <div
                                        className="absolute transition-all duration-500 group-hover:scale-110 flex items-center justify-center"
                                        style={{
                                            width: "60%",
                                            height: "60%",
                                            transform: `scale(${p.bgScale})`
                                        }}
                                    >
                                        {/* Unique Art placeholder using beautiful SVG geometries matching palette colors */}
                                        <svg viewBox="0 0 100 100" className="w-full h-full">
                                            {p.imageShape === "circle" && (
                                                <circle cx="50" cy="50" r="40" fill={colors.primary} opacity="0.8" />
                                            )}
                                            {p.imageShape === "rounded" && (
                                                <rect x="15" y="15" width="70" height="70" rx="15" fill={colors.secondary} opacity="0.8" />
                                            )}
                                            {p.imageShape === "rotated" && (
                                                <rect x="20" y="20" width="60" height="60" rx="8" transform="rotate(45 50 50)" fill={colors.accent} opacity="0.8" />
                                            )}
                                            {/* Decorative inner line work */}
                                            <circle cx="50" cy="50" r="20" fill="none" stroke={colors.bgLight} strokeWidth="2" opacity="0.4" />
                                        </svg>
                                    </div>

                                    {/* Top utility row */}
                                    <div className="absolute top-2 right-2 flex flex-col gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity">
                                        <button
                                            onClick={() => toggleLike(p.id)}
                                            className="p-1.5 rounded-full bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 cursor-pointer shadow"
                                        >
                                            <Heart className="w-3.5 h-3.5" fill={isLiked ? colors.accent : "none"} stroke={isLiked ? colors.accent : "currentColor"} />
                                        </button>
                                        <button
                                            onClick={() => showToast(`Entering rapid preview of ${p.name}`)}
                                            className="p-1.5 rounded-full bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 cursor-pointer shadow"
                                        >
                                            <Eye className="w-3.5 h-3.5" />
                                        </button>
                                    </div>
                                </div>

                                {/* Info block */}
                                <div>
                                    <div className="flex items-center gap-1 opacity-70 mb-1">
                                        <span className="text-[10px]">Stoneware</span>
                                        <span>•</span>
                                        <div className="flex items-center">
                                            <Star className="w-2.5 h-2.5 fill-amber-400 stroke-none" />
                                            <span className="text-[9px] font-bold font-mono ml-0.5">{p.rating}.0</span>
                                        </div>
                                    </div>

                                    <h3 className="font-semibold text-[11px] leading-tight group-hover:underline cursor-pointer">{p.name}</h3>
                                    <div className="flex items-center justify-between mt-2 pt-1 border-t" style={{ borderColor: "rgba(0,0,0,0.03)" }}>
                                        <span className="font-mono font-bold tracking-tight">${p.price}</span>
                                        <button
                                            onClick={() => handleAddToBag(p.name)}
                                            className="px-2 py-1 rounded text-[9px] uppercase tracking-wider font-bold text-white transition-opacity active:opacity-80"
                                            style={{ backgroundColor: colors.accent }}
                                        >
                                            Add +
                                        </button>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </section>

            {/* Sustainable Values Block */}
            <section className="px-5 py-12 border-t" style={{ borderColor: cardBorder, backgroundColor: `${colors.primary}04` }}>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto text-center md:text-left">
                    <div className="flex flex-col items-center md:items-start gap-2">
                        <Truck className="w-5 h-5" style={{ color: colors.accent }} />
                        <h3 className="font-bold text-[11px] tracking-wide uppercase mt-1">Sustainably Packaged</h3>
                        <p className="opacity-70 text-[10px] leading-relaxed">Our pottery is carefully wrapped in zero-plastic, compostable honeycomb fibers and shipped in clean FSC certified cartons.</p>
                    </div>
                    <div className="flex flex-col items-center md:items-start gap-2">
                        <Award className="w-5 h-5" style={{ color: colors.primary }} />
                        <h3 className="font-bold text-[11px] tracking-wide uppercase mt-1">Made by Human Hands</h3>
                        <p className="opacity-70 text-[10px] leading-relaxed">Every indent, swirl, and glazing variance represents the physical connection between raw mud minerals and our local crafts collective.</p>
                    </div>
                    <div className="flex flex-col items-center md:items-start gap-2">
                        <RefreshCw className="w-5 h-5" style={{ color: colors.accent }} />
                        <h3 className="font-bold text-[11px] tracking-wide uppercase mt-1">Clay Minerals Circularity</h3>
                        <p className="opacity-70 text-[10px] leading-relaxed">We harvest raw local elements responsibly. Any unused moisture or soft dry debris is blended back for the next curation series.</p>
                    </div>
                </div>
            </section>

            {/* Clean Footer */}
            <footer className="px-5 py-8 border-t text-center opacity-60 flex flex-col items-center gap-2.5 text-[9px]" style={{ borderColor: cardBorder }}>
                <span className="tracking-widest uppercase font-bold text-[10px]" style={{ fontFamily: palette.typography.headingFont }}>CLAY &amp; GRAIN STUDIO</span>
                <p>© 2026 Clay &amp; Grain Ltd. All ceramics handcrafted manually in traditional kiln blocks.</p>
            </footer>
        </div>
    );
}
