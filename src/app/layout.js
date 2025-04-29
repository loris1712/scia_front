import { Geist, Geist_Mono, Barlow } from "next/font/google";
import "./globals.css";
import Providers from "./providers";
import Script from "next/script";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const barlow = Barlow({ subsets: ["latin"], weight: "500" });

export const metadata = {
  title: "Scia",
  description: "Scia App",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        style={{ background: "#001c38" }}
        className={barlow.className}
      >

      <Script
        id="algho-viewer"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            const tag = document.createElement("algho-viewer");
            tag.setAttribute("bot-id", "53e8499c4205151d273038360adedd30");
            tag.setAttribute("widget", "true");
            tag.setAttribute("audio", "true");
            tag.setAttribute("voice", "true");
            tag.setAttribute("open", "false");
            tag.setAttribute("z-index", "9999");
            document.body.appendChild(tag);

            const script = document.createElement("script");
            script.setAttribute("id", "algho-viewer-module");
            script.setAttribute("type", "text/javascript");
            script.setAttribute("defer", "defer");
            script.setAttribute("charset", "UTF-8");
            script.setAttribute("src", "https://virtualassistant.alghoncloud.com/algho-viewer.min.js");
            document.body.appendChild(script);
          `,
        }}
      />


        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
