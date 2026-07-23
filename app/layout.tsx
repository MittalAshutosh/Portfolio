import type { Metadata } from "next";
import { headers } from "next/headers";
import "./globals.css";

const siteMetadata: Metadata = {
  title: "Ashutosh Mittal — Builder · Operator",
  description:
    "Technology and product leader delivering complete software projects, leading teams, and advising businesses on strategy, architecture, AI, and transformation.",
  keywords: [
    "Ashutosh Mittal",
    "Technical Project Manager",
    "Full-Stack Developer",
    "AI Automation",
    "Next.js",
    "VoIP",
    "New Delhi",
  ],
  authors: [{ name: "Ashutosh Mittal" }],
  creator: "Ashutosh Mittal",
  openGraph: {
    type: "profile",
    title: "Ashutosh Mittal — I ship systems. I run the ship.",
    description:
      "Start a project, hire a technology and product leader, or book a strategic consultation with Ashutosh Mittal.",
    images: [{ url: "/og.png", width: 1200, height: 630, alt: "Ashutosh Mittal — Builder and operator" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Ashutosh Mittal — Builder · Operator",
    description: "Build a product. Add a leader. Make the next technology decision with clarity.",
    images: ["/og.png"],
  },
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
  },
};

export async function generateMetadata(): Promise<Metadata> {
  const requestHeaders = await headers();
  const host = (requestHeaders.get("x-forwarded-host") ?? requestHeaders.get("host") ?? "localhost:3000")
    .split(",")[0]
    .trim();
  const protocol = (requestHeaders.get("x-forwarded-proto") ?? (host.startsWith("localhost") ? "http" : "https"))
    .split(",")[0]
    .trim();

  return {
    ...siteMetadata,
    metadataBase: new URL(`${protocol}://${host}`),
  };
}

const personSchema = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Ashutosh Mittal",
  jobTitle: "Technology & Product Leader, Technical Project Manager, and Full-Stack Developer",
  email: "mailto:ashutoshmittal.official@gmail.com",
  telephone: "+91-8755556611",
  address: {
    "@type": "PostalAddress",
    addressLocality: "New Delhi",
    addressCountry: "IN",
  },
  sameAs: [
    "https://www.linkedin.com/in/ashutosh-mittal-736445287",
    "https://github.com/MittalAshutosh",
  ],
  alumniOf: [
    { "@type": "CollegeOrUniversity", name: "VIT Chennai" },
    { "@type": "CollegeOrUniversity", name: "IIT Madras" },
  ],
  worksFor: {
    "@type": "Organization",
    name: "RSN One",
  },
};

const prePaintScript = `
  (function () {
    var root = document.documentElement;
    try {
      var saved = localStorage.getItem('am.kernel.v1') || localStorage.getItem('ashutosh-kernel');
      root.dataset.kernel = saved === 'run' ? 'run' : 'build';
    } catch (_) {
      root.dataset.kernel = 'build';
    }
    try {
      var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      root.dataset.boot = reduce || sessionStorage.getItem('am.boot.v1') === 'seen' || sessionStorage.getItem('ashutosh-booted') === 'true' ? 'seen' : 'pending';
      window.setTimeout(function () { if (root.dataset.boot === 'pending') root.dataset.boot = 'seen'; }, 2100);
    } catch (_) {
      root.dataset.boot = 'seen';
    }
  })();
`;

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" data-kernel="build" data-boot="seen" suppressHydrationWarning>
      <head>
        <meta name="theme-color" content="#0B0D10" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <script dangerouslySetInnerHTML={{ __html: prePaintScript }} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
