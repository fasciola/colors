import React, { useState } from "react";
import { ColorPalette } from "../types";
import {
    CheckCircle,
    Activity,
    Cpu,
    Database,
    TrendingUp,
    RefreshCw,
    ShieldAlert,
    HardDrive,
    Play,
    Pause
} from "lucide-react";

interface MockProps {
    palette: ColorPalette;
    theme: "light" | "dark";
}

export default function MockDashboard({ palette, theme }: MockProps) {
    const [isRunning, setIsRunning] = useState(true);
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
    const cardBg = theme === "light" ? "rgba(255, 255, 255, 0.7)" : "rgba(15, 23, 42, 0.7)";
    const barBg = theme === "light" ? "rgba(0,0,0,0.08)" : "rgba(255,255,255,0.08)";

    const triggerDiagnostic = () => {
        showToast("Running secure performance audit on node cluster...");
    };

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
                    className="absolute top-4 left-1/2 transform -translate-x-1/2 z-50 px-4 py-2 rounded-lg text-xs font-semibold shadow-lg flex items-center gap-2"
                    style={{
                        backgroundColor: colors.primary,
                        color: colors.bgLight
                    }}
                >
                    <Activity className="w-4 h-4 text-white animate-spin" />
                    <span>{toastMessage}</span>
                </div>
            )}

            {/* Header */}
            <header className="px-5 py-4 flex items-center justify-between border-b" style={{ borderColor: cardBorder }}>
                <div className="flex items-center gap-2">
                    <Database className="w-4 h-4" style={{ color: colors.primary }} />
                    <span className="font-bold tracking-tight text-xs uppercase" style={{ fontFamily: palette.typography.headingFont }}>
                        Metric Core v2.4
                    </span>
                </div>
                <div className="flex items-center gap-3">
                    <button
                        onClick={() => {
                            setIsRunning(!isRunning);
                            showToast(isRunning ? "Metrics simulation suspended" : "Real-time sync resumed");
                        }}
                        className="flex items-center gap-1 px-3 py-1 rounded text-[10px] font-bold tracking-wider uppercase text-white transition-opacity cursor-pointer"
                        style={{ backgroundColor: isRunning ? colors.error : colors.success }}
                    >
                        {isRunning ? <Pause className="w-3 h-3 text-white" /> : <Play className="w-3 h-3 text-white" />}
                        <span>{isRunning ? "Pause Stream" : "Resume Stream"}</span>
                    </button>
                </div>
            </header>

            {/* Hero Headline Summary */}
            <section className="px-5 py-8 max-w-4xl mx-auto">
                <div className="mb-6">
                    <span className="text-[10px] font-bold tracking-widest uppercase opacity-75" style={{ color: colors.accent }}>
                        GLOBAL DASHBOARD CONTROLS
                    </span>
                    <h1
                        className="text-xl md:text-2xl font-bold tracking-tight mt-1"
                        style={{
                            fontFamily: palette.typography.headingFont,
                            letterSpacing: palette.typography.letterSpacing || "-0.01em"
                        }}
                    >
                        {copy.heroTitle || "Velocity Metric Core"}
                    </h1>
                    <p className="opacity-75 text-[11px] mt-1">
                        {copy.heroSubtitle || "Observe live streaming metrics, latency anomalies, database transaction logs, and global performance velocities."}
                    </p>
                </div>

                {/* Bento Grid Stats Layout */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

                    {/* Box 1: Core Performance */}
                    <div className="p-4 rounded-xl border flex flex-col justify-between" style={{ borderColor: cardBorder, backgroundColor: cardBg }}>
                        <div className="flex items-center justify-between">
                            <span className="font-mono text-[9px] uppercase tracking-wider opacity-60">CPU Execution Limit</span>
                            <Cpu className="w-4 h-4" style={{ color: colors.primary }} />
                        </div>
                        <div className="my-3">
                            <span className="text-2xl font-bold font-mono tracking-tight" style={{ color: colors.primary }}>
                                {isRunning ? "42.7%" : "0.0%"}
                            </span>
                            <span className="text-[10px] opacity-50 block mt-0.5">Optimized load balanced execution</span>
                        </div>
                        {/* Custom styled progress bars verifying colors.accent and colors.success */}
                        <div className="w-full h-1.5 rounded-full overflow-hidden" style={{ backgroundColor: barBg }}>
                            <div
                                className="h-full transition-all duration-1000"
                                style={{
                                    backgroundColor: colors.primary,
                                    width: isRunning ? "42.7%" : "0%"
                                }}
                            ></div>
                        </div>
                    </div>

                    {/* Box 2: Query Latency */}
                    <div className="p-4 rounded-xl border flex flex-col justify-between" style={{ borderColor: cardBorder, backgroundColor: cardBg }}>
                        <div className="flex items-center justify-between">
                            <span className="font-mono text-[9px] uppercase tracking-wider opacity-60">Query Velocity</span>
                            <Activity className="w-4 h-4" style={{ color: colors.accent }} />
                        </div>
                        <div className="my-3">
                            <span className="text-2xl font-bold font-mono tracking-tight" style={{ color: colors.accent }}>
                                {isRunning ? "12ms" : "off"}
                            </span>
                            <span className="text-[10px] opacity-50 block mt-0.5">Sub-millisecond write buffer latency</span>
                        </div>
                        {/* Custom miniature charts modeled manually with HTML grid bars */}
                        <div className="h-6 flex items-end gap-1.5">
                            <div className="flex-1 rounded" style={{ backgroundColor: colors.accent, height: isRunning ? "30%" : "5%" }}></div>
                            <div className="flex-1 rounded" style={{ backgroundColor: colors.accent, height: isRunning ? "65%" : "5%" }}></div>
                            <div className="flex-1 rounded" style={{ backgroundColor: colors.accent, height: isRunning ? "95%" : "5%" }}></div>
                            <div className="flex-1 rounded" style={{ backgroundColor: colors.accent, height: isRunning ? "40%" : "5%" }}></div>
                            <div className="flex-1 rounded" style={{ backgroundColor: colors.accent, height: isRunning ? "78%" : "5%" }}></div>
                            <div className="flex-1 rounded" style={{ backgroundColor: colors.accent, height: isRunning ? "50%" : "5%" }}></div>
                        </div>
                    </div>

                    {/* Box 3: Node Cluster State */}
                    <div className="p-4 rounded-xl border flex flex-col justify-between" style={{ borderColor: cardBorder, backgroundColor: cardBg }}>
                        <div className="flex items-center justify-between">
                            <span className="font-mono text-[9px] uppercase tracking-wider opacity-60">Secure Firewall Status</span>
                            <ShieldAlert className="w-4 h-4" style={{ color: colors.success }} />
                        </div>
                        <div className="my-3 flex items-center gap-2">
                            <div className="w-3.5 h-3.5 rounded-full flex items-center justify-center text-white font-bold" style={{ backgroundColor: colors.success }}>✓</div>
                            <div>
                                <span className="text-sm font-bold block" style={{ color: colors.success }}>ACTIVE ZONE</span>
                                <span className="text-[10px] opacity-50 block mt-0.5">Zero network threats observed</span>
                            </div>
                        </div>
                        <button
                            onClick={triggerDiagnostic}
                            className="w-full py-1.5 rounded text-[10px] font-bold text-center border uppercase hover:opacity-85 transition-opacity cursor-pointer"
                            style={{ borderColor: colors.primary, color: colors.primary }}
                        >
                            Auditor Scan Ready
                        </button>
                    </div>

                </div>

                {/* Expanded Row containing Detailed metrics */}
                <div className="mt-4 rounded-xl border p-4" style={{ borderColor: cardBorder, backgroundColor: cardBg }}>
                    <div className="flex items-center justify-between border-b pb-3 mb-3" style={{ borderColor: cardBorder }}>
                        <span className="font-bold text-xs">Node Cluster Health Index</span>
                        <div className="flex items-center gap-4 text-[10px]">
                            <span className="flex items-center gap-1 font-bold">
                                <span className="w-2 h-2 rounded-full inline-block" style={{ backgroundColor: colors.primary }}></span>
                                <span>Primary Core</span>
                            </span>
                            <span className="flex items-center gap-1 font-bold">
                                <span className="w-2 h-2 rounded-full inline-block" style={{ backgroundColor: colors.secondary }}></span>
                                <span>Secondary Subnode</span>
                            </span>
                        </div>
                    </div>

                    {/* Interactive features list based on copy */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-1">
                        {copy.features?.map((feat, idx) => (
                            <div key={idx} className="p-2.5 rounded border" style={{ borderColor: cardBorder, backgroundColor: barBg }}>
                                <h4 className="font-bold text-[11px] flex items-center gap-1.5">
                                    <span className="inline-block w-1.5 h-1.5 rounded-full" style={{ backgroundColor: idx === 0 ? colors.primary : idx === 1 ? colors.secondary : colors.accent }}></span>
                                    {feat.title}
                                </h4>
                                <p className="opacity-70 text-[10px] leading-relaxed mt-1">{feat.description}</p>
                            </div>
                        )) || (
                                <p className="opacity-50 text-[10px]">No specific health feature parameters resolved.</p>
                            )}
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="px-5 py-6 border-t text-center opacity-60 text-[9px]" style={{ borderColor: cardBorder }}>
                <p>© 2026 Core Analytics telemetry hub. Synchronized dynamically onto Cloud assets.</p>
            </footer>
        </div>
    );
}
