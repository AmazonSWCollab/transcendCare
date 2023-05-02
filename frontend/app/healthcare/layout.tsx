import HeaderNav from "@/components/Common/Nav/HeaderNav";

// This is the layout page for the healthcare near me page
export const metadata = {
  title: "Healthcare near me",
  description: "Find trans-friendly healthcare near you",
};

export default function HealthCareLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section className="min-h-screen">
      <link
        href="https://api.mapbox.com/mapbox-gl-js/v2.6.1/mapbox-gl.css"
        rel="stylesheet"
      />
      <HeaderNav />
      {children}
    </section>
  );
}
