"use client";
import { useAuth, useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Header from "./Header";
import FullLoading from "../Common/Loading/FullLoading";

const DashBoardScreen = () => {
  const { isLoaded, userId } = useAuth();
  const [isLoading, setLoading] = useState(false);
  const { user } = useUser();
  const router = useRouter();
  // In case the user signs out while on the page.
  if (!isLoaded || !userId) {
    router.push("/signin");
  }
  useEffect(() => {
    if (!user) {
      setLoading(true);
    } else {
      setLoading(false);
    }
  }, [user]);

  return (
    <section>
      {isLoading && <FullLoading />}
      <Header user={user} />
    </section>
  );
};

export default DashBoardScreen;
