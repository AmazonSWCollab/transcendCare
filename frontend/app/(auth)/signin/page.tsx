// import AuthScreen from "@/components/AuthScreen/AuthScreen";
import { SignIn } from "@clerk/nextjs/app-beta";
const signin = () => {
  return (
    // <section className="flex flex-col items-center">
    //   <AuthScreen />
    // </section>
    <SignIn signUpUrl="/signup" />
  );
};

export default signin;
