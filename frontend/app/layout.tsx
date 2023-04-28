import { ClerkProvider } from "@clerk/nextjs/app-beta";
import "./globals.css";
import { Lexend } from "next/font/google";
// This is the layout page for the landing screen and its children page
export const metadata = {
  title: "Transcend Care",
  description: "Best healthcare platform for transgender",
};

const fontLexend = Lexend({
  subsets: ["latin"],
  variable: "--font-lexend",
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <ClerkProvider>
        <body
          className={`${fontLexend.variable} p-8 w-[100vw] h-[100vh] font-sans`}
        >
          {children}
        </body>
      </ClerkProvider>
    </html>
  );
}
