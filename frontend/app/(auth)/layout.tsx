// This is the layout page for the login, logout page
export const metadata = {
  title: "Transcend Care Auth",
  description: "Best healthcare platform for transgender",
};

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section className="bg-pink_bg px-10 flex flex-col min-h-screen overflow-hidden justify-center items-center">
      {children}
    </section>
  );
}
