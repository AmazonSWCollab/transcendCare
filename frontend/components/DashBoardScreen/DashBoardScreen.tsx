"use client";
import { useAuth, useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Header from "./Header";
import FullLoading from "../Common/Loading/FullLoading";
import DailyAffirmation from "./DailyAffirmation";
import Medication from "./Medication";
import HealthcareNearMe from "./HealthcareNearMe";

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
    <section className="w-[100vw] h-[100vh] bg-white m-[-2rem] p-8">
      {isLoading && <FullLoading />}
      <Header user={user} />
      <DailyAffirmation />
      <Medication />
      <HealthcareNearMe />
    </section>
  );
};

export default DashBoardScreen;
