import { SignUp } from "@clerk/nextjs/app-beta";
// This is the sign up page
export default function signup() {
  return (
    <div className="">
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
    </div>
  );
}
