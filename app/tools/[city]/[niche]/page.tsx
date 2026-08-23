import { Metadata } from "next";
import Link from "next/link";
import { CITIES, NICHES } from "@/data/seoData";
import { ArrowLeft, CheckCircle2, Printer, Volume2, MessageCircle, ShieldCheck, Zap, ArrowRight } from "lucide-react";

export function generateStaticParams() {
  const params: { city: string; niche: string }[] = [];
  for (const city of CITIES) {
    for (const niche of NICHES) {
      params.push({
        city: city.slug,
        niche: niche.slug,
      });
    }
  }
  return params;
}

export async function generateMetadata({
  params,
}: {
  params: { city: string; niche: string };
}): Promise<Metadata> {
  const city = CITIES.find((c) => c.slug === params.city) || CITIES[0];
  const niche = NICHES.find((n) => n.slug === params.niche) || NICHES[0];

  return {
    title: `Free UPI QR Standee Generator for ${niche.name} in ${city.name} | SmartPayQR`,
    description: `Create and download print-ready UPI payment posters, voice alerts, and WhatsApp bills for ${niche.name} in ${city.name}, ${city.state}. 100% Free.`,
  };
}

export default function SeoToolLandingPage({
  params,
}: {
  params: { city: string; niche: string };
}) {
  const city = CITIES.find((c) => c.slug === params.city) || CITIES[0];
  const niche = NICHES.find((n) => n.slug === params.niche) || NICHES[0];

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": `SmartPayQR for ${niche.name} in ${city.name}`,
    "description": niche.description,
    "applicationCategory": "BusinessApplication",
    "operatingSystem": "Web",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "INR"
    }
  };

  return (
    <div className="min-h-screen bg-[#f4f6f8] text-[#152935] flex flex-col justify-between">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      
      <div>
        <div className="w-full h-2.5 bg-[#e4a576]" />
        
        {/* Breadcrumb Header */}
        <header className="bg-[#152935] text-white px-4 md:px-8 py-4 border-b border-[#223d4e]">
          <div className="max-w-5xl mx-auto flex items-center justify-between">
            <Link href="/" className="flex items-center gap-2 text-xs font-bold text-[#e4a576] hover:underline">
              <ArrowLeft className="w-4 h-4" /> Back to SmartPayQR Home
            </Link>
            <span className="text-xs text-zinc-300">{city.name}, {city.state}</span>
          </div>
        </header>

        <main className="max-w-5xl mx-auto px-4 md:px-8 py-10 space-y-10">
          {/* Hero Section */}
          <div className="bg-white p-8 md:p-12 rounded-3xl shadow-sm border border-zinc-200 space-y-6">
            <div className="inline-block bg-[#152935] text-[#e4a576] px-3.5 py-1 rounded-full text-xs font-black uppercase tracking-wider">
              {niche.name} • {city.name} Merchant Hub
            </div>
            
            <h1 className="text-3xl md:text-5xl font-serif font-black leading-tight text-[#152935]">
              Free UPI QR Standee & Voice Soundbox for {niche.name} in {city.name}
            </h1>

            <p className="text-sm md:text-base text-zinc-600 max-w-3xl leading-relaxed">
              {niche.description} Empower your counter in {city.name} with instant print-ready payment standees, audio payment confirmations, and 1-click WhatsApp customer receipts with zero hardware charges.
            </p>

            <div className="flex flex-wrap gap-4 pt-2">
              <Link
                href={`/standee`}
                className="bg-[#152935] hover:bg-[#223d4e] text-white px-6 py-4 rounded-2xl font-black text-xs uppercase tracking-wider flex items-center gap-2 shadow-xl transition-all"
              >
                <Printer className="w-4 h-4 text-[#e4a576]" /> Create Free Standee (Print Ready) <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/soundbox"
                className="bg-[#fde5d6] hover:bg-[#e4a576]/30 text-[#152935] border border-zinc-200 px-6 py-4 rounded-2xl font-black text-xs uppercase tracking-wider flex items-center gap-2 transition-all"
              >
                <Volume2 className="w-4 h-4 text-[#152935]" /> Open Voice Soundbox
              </Link>
            </div>
          </div>

          {/* Value Props Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-3xl border border-zinc-200 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-[#fde5d6] text-[#152935] flex items-center justify-center font-black">
                <Printer className="w-5 h-5 text-[#e4a576]" />
              </div>
              <h3 className="font-black text-base text-[#152935]">High-Resolution A4/A5 PDF</h3>
              <p className="text-xs text-zinc-600 leading-relaxed">
                Download printable PDF posters formatted specifically for counter acrylic stands and shop fronts in {city.name}.
              </p>
            </div>

            <div className="bg-white p-6 rounded-3xl border border-zinc-200 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-[#ccd5d2]/40 text-[#152935] flex items-center justify-center font-black">
                <Volume2 className="w-5 h-5" />
              </div>
              <h3 className="font-black text-base text-[#152935]">Free Mobile Soundbox</h3>
              <p className="text-xs text-zinc-600 leading-relaxed">
                No need to buy a ₹150/month rental machine. Use your counter phone to announce received amounts in your local language.
              </p>
            </div>

            <div className="bg-white p-6 rounded-3xl border border-zinc-200 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center font-black">
                <MessageCircle className="w-5 h-5 text-emerald-600" />
              </div>
              <h3 className="font-black text-base text-[#152935]">WhatsApp Digital Invoices</h3>
              <p className="text-xs text-zinc-600 leading-relaxed">
                Send itemized receipts with direct UPI links to customers in {city.name} without printing thermal paper rolls.
              </p>
            </div>
          </div>

          {/* Related City Links (SEO Booster) */}
          <div className="bg-white p-6 rounded-3xl border border-zinc-200 space-y-4">
            <h3 className="text-xs font-black text-[#152935] uppercase tracking-wider">
              Explore {niche.name} QR Standees in Other Cities
            </h3>
            <div className="flex flex-wrap gap-2">
              {CITIES.filter((c) => c.slug !== city.slug).slice(0, 10).map((c) => (
                <Link
                  key={c.slug}
                  href={`/tools/${c.slug}/${niche.slug}`}
                  className="text-xs font-bold bg-zinc-50 hover:bg-[#fde5d6] text-[#152935] px-3.5 py-1.5 rounded-full border border-zinc-200 transition-all"
                >
                  {niche.name} in {c.name}
                </Link>
              ))}
            </div>
          </div>
        </main>
      </div>

      <footer className="w-full bg-[#152935] text-zinc-400 py-6 text-center text-xs border-t border-[#223d4e]">
        <p>© {new Date().getFullYear()} SmartPayQR • Free Merchant Utility for {city.name}, {city.state}</p>
      </footer>
    </div>
  );
}
