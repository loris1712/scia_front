import { Geist, Geist_Mono, Barlow } from "next/font/google";
import "./globals.css";
import Providers from "./providers";

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
  viewport: "width=device-width, initial-scale=1", // 👈 aggiunto qui
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        style={{ background: "#001c38" }}
        className={barlow.className}
      >
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
