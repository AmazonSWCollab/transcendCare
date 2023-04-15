import { SignUp } from "@clerk/nextjs/app-beta";

export default function signup() {
  return (
    <section className="px-10 h-[100vh] flex flex-col justify-center items-center">
      <SignUp
        appearance={{
          elements: {
            card: "md:w-[720px] w-[320px] bg-pink_bg border-4 border-purple_main",
            footerActionLink: "font-bold text-purple_main",
            socialButtonsIconButton: "border-purple_main",
          },
        }}
        signInUrl="/signin"
      />
    </section>
  );
}
