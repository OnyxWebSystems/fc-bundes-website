import type { Metadata, Viewport } from "next";
import { Big_Shoulders, Hanken_Grotesk } from "next/font/google";
import Script from "next/script";
import { Footer } from "@/components/Footer";
import { Motion } from "@/components/Motion";
import { Navbar } from "@/components/Navbar";
import { PageTransition } from "@/components/PageTransition";
import "./globals.css";

const display = Big_Shoulders({
  subsets: ["latin"],
  axes: ["opsz"],
  variable: "--font-display",
  display: "swap",
});

const body = Hanken_Grotesk({
  weight: ["400", "500"],
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "FC Bundes — The Federals",
    template: "%s — FC Bundes",
  },
  description: "FC Bundes, The Federals. Established 2017 in Dagoretti, Nairobi, Kenya.",
};

export const viewport: Viewport = {
  themeColor: "#070708",
  width: "device-width",
  initialScale: 1,
};

const introScript = `
try {
  document.documentElement.classList.add("js");
} catch (e) {}
`;

const devHydrationScript = `
try {
  var setAttr = Element.prototype.setAttribute;
  Element.prototype.setAttribute = function (name, value) {
    if (name === "data-cursor-ref") return;
    return setAttr.call(this, name, value);
  };
  var setAttrNS = Element.prototype.setAttributeNS;
  Element.prototype.setAttributeNS = function (ns, name, value) {
    if (name === "data-cursor-ref") return;
    return setAttrNS.call(this, ns, name, value);
  };
  var strip = function () {
    var nodes = document.querySelectorAll("[data-cursor-ref]");
    for (var i = 0; i < nodes.length; i++) nodes[i].removeAttribute("data-cursor-ref");
  };
  strip();
  document.addEventListener("DOMContentLoaded", strip);
} catch (e) {}
`;

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${display.variable} ${body.variable}`} suppressHydrationWarning>
      <body>
        <Script id="intro-flag" strategy="beforeInteractive">
          {introScript}
        </Script>
        {process.env.NODE_ENV === "development" ? (
          <Script id="strip-editor-refs" strategy="beforeInteractive">
            {devHydrationScript}
          </Script>
        ) : null}
        <a className="skip" href="#main">
          Skip to content
        </a>
        <Navbar />
        <PageTransition />
        <Motion />
        <main id="main">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
