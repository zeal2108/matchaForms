import { SignupForm } from "~/components/signup-form";
import Image from "next/image";

export default function SignupPage() {
  return (
    <div className="relative flex min-h-screen min-w-lg flex-col  items-center justify-center bg-muted p-6 md:p-10 lg:bg-transparent">
      <Image
        src="/watercolor-bg.png"
        alt="bg"
        fill
        fetchPriority="high" // Preloads the image if it's above the fold
        className="object-cover -z-10"
        // Stays behind content
      />
      <div className="w-full max-w-sm md:max-w-4xl">
        <SignupForm />
      </div>
    </div>
  );
}
