"use client";
import { useAuth, useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import Header from "./Header";

const DashBoardScreen = () => {
  const { isLoaded, userId } = useAuth();
  const { user } = useUser();
  const router = useRouter();
  // In case the user signs out while on the page.
  if (!isLoaded || !userId) {
    router.push("/signin");
  }
  return (
    <section>
      <Header user={user} />
    </section>
  );
};

export default DashBoardScreen;
