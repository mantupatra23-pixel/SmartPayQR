import { Metadata } from "next";
import { SEO_PAGES } from "@/lib/seoData";
import Link from "next/link";
import { ArrowLeft, Sparkles, CheckCircle2, ShieldCheck, Printer, Zap } from "lucide-react";

export function generateStaticParams() {
  return SEO_PAGES.map((page) => ({
    slug: page.slug,
  }));
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const page = SEO_PAGES.find((p) => p.slug === params.slug);
  return {
    title: page ? `${page.title} | SmartPayQR` : "SmartPayQR Studio",
    description: page?.description,
  };
}

export default function SeoToolPage({ params }: { params: { slug: string } }) {
  const page = SEO_PAGES.find((p) => p.slug === params.slug) || SEO_PAGES[0];

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": page.title,
    "description": page.description,
    "applicationCategory": "BusinessApplication",
    "operatingSystem": "All",
  };

  return (
    <div className="min-h-screen bg-white text-[#152935]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="w-full h-3 bg-[#e4a576]" />
      
      <div className="bg-[#ccd5d2] py-12 px-4 border-b border-zinc-300">
        <div className="max-w-4xl mx-auto space-y-4">
          <Link href="/" className="inline-flex items-center gap-2 text-xs font-black uppercase text-[#152935] hover:underline">
            <ArrowLeft className="w-4 h-4" /> Back to Main Studio
          </Link>
          <div className="inline-block bg-[#152935] text-[#e4a576] px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
            {page.niche} • {page.city}
          </div>
          <h1 className="text-3xl md:text-5xl font-serif font-black">{page.title}</h1>
          <p className="text-sm md:text-base text-[#152935]/80 font-medium max-w-2xl">{page.description}</p>
          <div className="pt-2">
            <Link
              href="/"
              className="inline-flex items-center gap-2 bg-[#152935] text-white font-black px-6 py-3.5 rounded-2xl shadow-xl hover:bg-[#223d4e] transition-all text-sm"
            >
              <Sparkles className="w-4 h-4 text-[#e4a576]" /> Open Instant Standee Generator
            </Link>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto py-12 px-4 space-y-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 rounded-3xl bg-[#fde5d6]/40 border border-zinc-200 space-y-2">
            <Printer className="w-6 h-6 text-[#e4a576]" />
            <h3 className="font-black text-base">Print-Ready PDF</h3>
            <p className="text-xs text-zinc-600">Export high-resolution A4 & A5 standees directly from your phone browser.</p>
          </div>
          <div className="p-6 rounded-3xl bg-[#fde5d6]/40 border border-zinc-200 space-y-2">
            <Zap className="w-6 h-6 text-[#e4a576]" />
            <h3 className="font-black text-base">Zero Waiting Time</h3>
            <p className="text-xs text-zinc-600">No bank KYC or 7-day courier wait. Create your counter stand in under 10 seconds.</p>
          </div>
          <div className="p-6 rounded-3xl bg-[#fde5d6]/40 border border-zinc-200 space-y-2">
            <ShieldCheck className="w-6 h-6 text-[#e4a576]" />
            <h3 className="font-black text-base">100% Universal UPI</h3>
            <p className="text-xs text-zinc-600">Supports Google Pay, PhonePe, Paytm, BHIM, Cred, and all major Indian banking apps.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
