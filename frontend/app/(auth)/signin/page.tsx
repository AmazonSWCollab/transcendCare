import { SignIn } from "@clerk/nextjs/app-beta";
// This is the signin page
const signin = () => {
  return (
    <div className="">
      <SignIn
        appearance={{
          elements: {
            card: "md:w-[720px] w-[320px] bg-pink_bg border-4 border-purple_main",
            footerActionLink: "font-bold text-purple_main",
            socialButtonsIconButton: "border-purple_main",
          },
        }}
        signUpUrl="/signup"
      />
    </div>
  );
};

export default signin;
