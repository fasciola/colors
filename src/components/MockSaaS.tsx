import React, { useState } from "react";
import { ColorPalette } from "../types";
import { 
  Sparkles, 
  ArrowRight, 
  Layers, 
  Zap, 
  Globe, 
  Shield, 
  CheckCircle, 
  MessageSquare,
  Users,
  Activity
} from "lucide-react";

interface MockProps {
  palette: ColorPalette;
  theme: "light" | "dark";
}

export default function MockSaaS({ palette, theme }: MockProps) {
  const [billingCycle, setBillingCycle] = useState<"monthly" | "yearly">("monthly");
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const colors = palette.colors;
  const copy = palette.customCopy;

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  // Set local style properties based on active style theme selection
  const currentBg = theme === "light" ? colors.bgLight : colors.bgDark;
  const currentText = theme === "light" ? colors.textLight : colors.textDark;
  const cardBg = theme === "light" ? "rgba(0,0,0,0.03)" : "rgba(255,255,255,0.04)";
  const cardBorder = theme === "light" ? "rgba(0,0,0,0.08)" : "rgba(255,255,255,0.08)";

  const featuresList = copy.features || [
    { title: "Smart Automation Workflow", description: "Design dynamic pipelines and deploy standard components sequentially." },
    { title: "Continuous Integrations", description: "Stream, analyze, and synchronize metrics across secure node clusters." },
    { title: "Advanced Firewalls", description: "Safeguard user logs and lock connection pathways seamlessly." }
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
      {/* Toast Alert Simulation */}
      {toastMessage && (
        <div 
          className="absolute top-4 left-1/2 transform -translate-x-1/2 z-50 px-4 py-2 rounded-lg text-xs font-semibold shadow-lg flex items-center gap-2 animate-bounce transition-all duration-300"
          style={{ 
            backgroundColor: colors.primary, 
            color: colors.bgLight 
          }}
        >
          <CheckCircle className="w-4 h-4" />
          {toastMessage}
        </div>
      )}

      {/* Mini Top Banner */}
      <div 
        className="w-full px-4 py-1.5 text-center text-[10px] font-medium tracking-wide flex items-center justify-center gap-1.5 transition-opacity"
        style={{ 
          backgroundColor: `${colors.primary}18`, 
          color: colors.primary 
        }}
      >
        <Sparkles className="w-3.5 h-3.5 animate-pulse" />
        <span>V2.4 Cloud Instance is now Live — Sync metrics automatically</span>
      </div>

      {/* Mini App Header */}
      <header 
        className="w-full px-4 py-3 flex items-center justify-between border-b"
        style={{ borderColor: cardBorder }}
      >
        <div className="flex items-center gap-2 cursor-pointer">
          <div 
            className="w-6 h-6 rounded-lg flex items-center justify-center"
            style={{ backgroundColor: colors.primary }}
          >
            <Layers className="w-3.5 h-3.5 text-white" />
          </div>
          <span 
            className="font-bold tracking-tight text-sm"
            style={{ 
              fontFamily: palette.typography.headingFont,
              letterSpacing: palette.typography.letterSpacing || "normal"
            }}
          >
            SaaS Core
          </span>
        </div>
        <nav className="hidden md:flex items-center gap-4 text-[11px] font-medium opacity-80">
          <span className="hover:opacity-100 cursor-pointer">Platform</span>
          <span className="hover:opacity-100 cursor-pointer">Pricing</span>
          <span className="hover:opacity-100 cursor-pointer">Docs</span>
        </nav>
        <button 
          onClick={() => showToast("Simulated registration trigger activated!")}
          className="px-3 py-1 rounded-md text-[11px] font-medium transition-all transform active:scale-95 text-white font-semibold cursor-pointer"
          style={{ backgroundColor: colors.accent }}
        >
          Get Started
        </button>
      </header>

      {/* Hero Block */}
      <section className="px-4 py-12 text-center max-w-2xl mx-auto flex flex-col items-center">
        <div 
          className="px-2.5 py-0.5 rounded-full text-[10px] font-medium tracking-wider mb-4 border"
          style={{ 
            borderColor: `${colors.primary}40`, 
            color: colors.primary,
            backgroundColor: `${colors.primary}08`
          }}
        >
          ACCELERATED ENGINE
        </div>
        
        <h1 
          className="text-2xl md:text-3xl font-extrabold tracking-tight leading-tight mb-4"
          style={{ 
            fontFamily: palette.typography.headingFont,
            letterSpacing: palette.typography.letterSpacing || "-0.01em"
          }}
        >
          {copy.heroTitle || "Scale Your Team Output Organically"}
        </h1>
        
        <p className="text-[12px] opacity-75 max-w-md mx-auto mb-6 leading-relaxed">
          {copy.heroSubtitle || "The unified workflow platform engineered to visual-sync assets, track computational runtime, and deploy continuous templates safely."}
        </p>

        <div className="flex items-center gap-3">
          <button 
            onClick={() => showToast("Creating deployment environment simulation")}
            className="px-4 py-2 rounded-lg text-[11px] font-semibold flex items-center gap-1.5 transition-all active:scale-95 shadow-md cursor-pointer text-white"
            style={{ backgroundColor: colors.primary }}
          >
            Create Free Instance <ArrowRight className="w-3.5 h-3.5" />
          </button>
          <button 
            onClick={() => showToast("Requesting trial sandbox demo...")}
            className="px-4 py-2 rounded-lg text-[11px] font-semibold border hover:bg-black/5 dark:hover:bg-white/5 cursor-pointer"
            style={{ borderColor: cardBorder }}
          >
            Request Demo
          </button>
        </div>

        {/* Floating Mock UI Interface */}
        <div 
          className="w-full mt-10 rounded-xl border p-4 shadow-xl text-left"
          style={{ 
            borderColor: cardBorder,
            backgroundColor: theme === "light" ? "rgba(255,255,255,0.7)" : "rgba(15,23,42,0.6)"
          }}
        >
          <div className="flex items-center justify-between border-b pb-3 mb-3" style={{ borderColor: cardBorder }}>
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-red-400"></span>
              <span className="w-2.5 h-2.5 rounded-full bg-yellow-400"></span>
              <span className="w-2.5 h-2.5 rounded-full bg-green-400"></span>
              <span className="text-[9px] opacity-40 ml-2 font-mono">cluster-node://prod-west-core</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="px-1.5 py-0.5 rounded text-[8px] font-mono text-white" style={{ backgroundColor: colors.success }}>active</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <div className="p-2.5 rounded-lg border flex items-center gap-3" style={{ borderColor: cardBorder, backgroundColor: cardBg }}>
              <div className="w-8 h-8 rounded-md flex items-center justify-center" style={{ backgroundColor: `${colors.primary}12`, color: colors.primary }}>
                <Activity className="w-4 h-4" />
              </div>
              <div>
                <span className="block text-[10px] opacity-50 font-medium">Core Velocity</span>
                <span className="font-bold text-sm">4,912 op/s</span>
              </div>
            </div>
            <div className="p-2.5 rounded-lg border flex items-center gap-3" style={{ borderColor: cardBorder, backgroundColor: cardBg }}>
              <div className="w-8 h-8 rounded-md flex items-center justify-center" style={{ backgroundColor: `${colors.secondary}12`, color: colors.secondary }}>
                <Users className="w-4 h-4" />
              </div>
              <div>
                <span className="block text-[10px] opacity-50 font-medium">Session Syncs</span>
                <span className="font-bold text-sm">99.98% accurate</span>
              </div>
            </div>
            <div className="p-2.5 rounded-lg border flex items-center gap-3 bg-red" style={{ borderColor: cardBorder, backgroundColor: cardBg }}>
              <div className="w-8 h-8 rounded-md flex items-center justify-center" style={{ backgroundColor: `${colors.accent}12`, color: colors.accent }}>
                <Zap className="w-4 h-4" />
              </div>
              <div>
                <span className="block text-[10px] opacity-50 font-medium">Response Speed</span>
                <span className="font-bold text-sm">11.4 ms</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Block */}
      <section className="px-4 py-12 border-t" style={{ borderColor: cardBorder }}>
        <div className="text-center mb-10">
          <h2 
            className="text-xl font-bold mb-2"
            style={{ fontFamily: palette.typography.headingFont }}
          >
            Engineered for Continuous Precision
          </h2>
          <p className="opacity-70 text-[11px] max-w-sm mx-auto">See how we harmonize resources, reduce pipeline stress, and deliver instant responsive views.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-4xl mx-auto">
          {featuresList.map((item, index) => (
            <div 
              key={index} 
              className="p-4 rounded-xl border flex flex-col gap-3 transition-transform hover:-translate-y-1"
              style={{ borderColor: cardBorder, backgroundColor: cardBg }}
            >
              <div 
                className="w-8 h-8 rounded-lg flex items-center justify-center self-start"
                style={{ 
                  backgroundColor: index === 0 ? `${colors.primary}15` : index === 1 ? `${colors.secondary}15` : `${colors.accent}15`,
                  color: index === 0 ? colors.primary : index === 1 ? colors.secondary : colors.accent
                }}
              >
                {index === 0 ? <Zap className="w-4 h-4" /> : index === 1 ? <Globe className="w-4 h-4" /> : <Shield className="w-4 h-4" />}
              </div>
              <h3 className="font-bold text-sm">{item.title}</h3>
              <p className="opacity-70 text-[11px] leading-relaxed">{item.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Pricing Module */}
      <section className="px-4 py-12 border-t" style={{ borderColor: cardBorder }}>
        <div className="text-center mb-8">
          <h2 className="text-xl font-bold" style={{ fontFamily: palette.typography.headingFont }}>Straightforward Global Pricing</h2>
          <div className="inline-flex items-center gap-2 mt-4 p-1 rounded-lg border" style={{ borderColor: cardBorder, backgroundColor: cardBg }}>
            <button 
              onClick={() => setBillingCycle("monthly")}
              className="px-3 py-1 rounded-md text-[10px] font-semibold transition-all cursor-pointer"
              style={{
                backgroundColor: billingCycle === "monthly" ? colors.primary : "transparent",
                color: billingCycle === "monthly" ? colors.bgLight : currentText
              }}
            >
              Monthly
            </button>
            <button 
              onClick={() => setBillingCycle("yearly")}
              className="px-3 py-1 rounded-md text-[10px] font-semibold transition-all cursor-pointer"
              style={{
                backgroundColor: billingCycle === "yearly" ? colors.primary : "transparent",
                color: billingCycle === "yearly" ? colors.bgLight : currentText
              }}
            >
              Yearly (Save 20%)
            </button>
          </div>
        </div>

        <div className="max-w-md mx-auto rounded-xl border p-5 shadow-lg flex flex-col gap-5" style={{ borderColor: colors.primary, backgroundColor: cardBg }}>
          <div className="flex items-start justify-between">
            <div>
              <span className="text-[10px] uppercase font-bold tracking-wider" style={{ color: colors.primary }}>Standard Tier</span>
              <h3 className="text-base font-bold mt-1">The Builder Sandbox</h3>
            </div>
            {billingCycle === "yearly" && (
              <span className="px-2 py-0.5 rounded text-[8px] uppercase font-bold text-white bg-green-500">20% off active</span>
            )}
          </div>

          <div className="flex items-baseline gap-1">
            <span className="text-3xl font-extrabold" style={{ fontFamily: palette.typography.headingFont }}>
              ${billingCycle === "monthly" ? "39" : "31"}
            </span>
            <span className="opacity-60 text-[10px]">/ developer / month</span>
          </div>

          <p className="opacity-70 leading-relaxed text-[11px]">Unlock full programmatic parameters, custom visual triggers, unlimited styling syncs, and dedicated container nodes.</p>

          <div className="border-t pt-4" style={{ borderColor: cardBorder }}>
            <ul className="flex flex-col gap-2">
              <li className="flex items-center gap-2">
                <CheckCircle className="w-3.5 h-3.5" style={{ color: colors.primary }} />
                <span>Unlimited generated mockups</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle className="w-3.5 h-3.5" style={{ color: colors.primary }} />
                <span>3 persistent local archives</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle className="w-3.5 h-3.5" style={{ color: colors.primary }} />
                <span>Standard CSS, JSON, Tailwind exports</span>
              </li>
            </ul>
          </div>

          <button 
            onClick={() => showToast("Simulating secure checkout sequence...")}
            className="w-full py-2.5 rounded-lg text-white text-center font-bold font-semibold transition-all active:scale-95 cursor-pointer shadow-md"
            style={{ backgroundColor: colors.primary }}
          >
            Deploy New Cluster Now
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="px-4 py-8 border-t text-center opacity-60 flex flex-col items-center gap-3 text-[10px]" style={{ borderColor: cardBorder }}>
        <div className="flex items-center gap-1.5 font-bold">
          <Layers className="w-3.5 h-3.5" />
          <span>SaaS Core Corp.</span>
        </div>
        <p>© 2026 SaaS Core Inc. Fully built using visually verified responsive templates.</p>
      </footer>
    </div>
  );
}
