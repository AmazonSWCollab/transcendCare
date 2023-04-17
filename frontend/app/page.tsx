import DashBoardScreen from "@/components/DashBoardScreen/DashBoardScreen";
import LandingScreen from "@/components/LandingScreen/LandingScreen";
import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs/app-beta";
// This is the page for the landing screen
export default function Home() {
  return (
    <main className="flex flex-col">
      <SignedOut>
        <LandingScreen />
      </SignedOut>
      <SignedIn>
        <DashBoardScreen />
      </SignedIn>
    </main>
  );
}
