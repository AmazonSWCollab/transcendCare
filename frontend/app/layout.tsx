import { ClerkProvider, SignedIn, SignedOut } from "@clerk/nextjs/app-beta";
import "./globals.css";
import { Lexend } from "next/font/google";
import FooterNav from "@/components/Common/Nav/FooterNav";
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
        <SignedOut>
          <body
            className={`${fontLexend.variable} overflow-auto bg-pink_bg p-8 min-h-screen font-sans`}
          >
            {children}
          </body>
        </SignedOut>
        <SignedIn>
          <body
            className={`${fontLexend.variable} relative p-8 min-h-screen font-sans`}
          >
            {children}
            <FooterNav />
          </body>
        </SignedIn>
      </ClerkProvider>
    </html>
  );
}
