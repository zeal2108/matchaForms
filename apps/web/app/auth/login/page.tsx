import { LoginForm } from "~/components/login-form";
import Image from "next/image";

export default function LoginPage() {
  return (
    <div className="relative flex min-h-screen min-w-lg flex-col items-center justify-center bg-muted p-6 md:p-10 lg:bg-transparent">
      <Image
        src="/watercolor-bg.png"
        alt="bg"
        fill
        fetchPriority="high"
        className="object-cover -z-10"
      />
      <div className="w-full max-w-sm md:max-w-4xl">
        <LoginForm />
      </div>
    </div>
  );
}
