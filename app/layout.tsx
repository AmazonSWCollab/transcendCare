import "./globals.css";

export const metadata = {
  title: "Transcend Care",
  description: "Best healthcare platform for transgender",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-pink_bg font-lexend">{children}</body>
    </html>
  );
}
