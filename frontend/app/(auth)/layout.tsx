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
  return <div className="bg-pink_bg">{children}</div>;
}
