"use client";

import { useState } from "react";
import { cn } from "~/lib/utils";
import { Button } from "~/components/ui/button";
import { Card, CardContent } from "~/components/ui/card";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldSeparator,
} from "~/components/ui/field";
import { Input } from "~/components/ui/input";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  signInUserwithEmailInput,
  type SignInUserwithEmailInputType,
} from "@repo/services/user/model";
import { useLogin } from "~/hooks/api/auth";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Eye, EyeOff } from "lucide-react";

export function LoginForm({ className, ...props }: React.ComponentProps<"div">) {
  const [showPassword, setShowPassword] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const { signInUserWithEmailAsync, isSuccess } = useLogin();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignInUserwithEmailInputType>({
    resolver: zodResolver(signInUserwithEmailInput),
  });
  const router = useRouter();

  const onSubmit: SubmitHandler<SignInUserwithEmailInputType> = async (data) => {
    try {
      setSubmitError(null);
      await signInUserWithEmailAsync({
        email: data.email,
        password: data.password,
      });
      router.replace("/");
    } catch (error) {
      const message = error instanceof Error ? error.message : "Login failed. Please try again.";
      setSubmitError(message);
    }
  };

  return (
    <div className={cn("flex flex-col gap-6 items-center font-display", className)} {...props}>
      <Card className="overflow-hidden p-0 w-full lg:w-xl">
        <CardContent>
          <form className="p-6 md:p-8" onSubmit={handleSubmit(onSubmit)}>
            <FieldGroup>
              <div className="flex flex-col items-center gap-2 text-center">
                <h1 className="text-4xl font-extrabold">Welcome back</h1>
                <p className="text-xl font-bold text-muted-foreground">Login to your account</p>
              </div>
              {submitError && (
                <div className="bg-red-100 text-red-700 text-xl p-3 rounded-md ">{submitError}</div>
              )}
              <Field className="shadow-lg">
                <FieldLabel htmlFor="email" className="text-xl">
                  Email
                </FieldLabel>
                <Input id="email" type="email" className="py-6" required {...register("email")} />
                {errors.email && (
                  <p className="text-red-600 text-sm mt-1">{errors.email.message}</p>
                )}
              </Field>
              <Field className="shadow-lg">
                <div className="flex items-center">
                  <FieldLabel htmlFor="password" className="text-xl ">
                    Password
                  </FieldLabel>
                  <a href="#" className="ml-auto text-sm underline-offset-2 hover:underline">
                    Forgot your password?
                  </a>
                </div>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    className="py-6"
                    required
                    {...register("password")}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground cursor-pointer"
                  >
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
                {errors.password && (
                  <p className="text-red-600 text-sm mt-1">{errors.password.message}</p>
                )}
              </Field>
              <Field>
                <Button type="submit" className="text-xl py-6 w-full" disabled={isSubmitting}>
                  {isSubmitting ? "Logging in..." : "Login"}
                </Button>
              </Field>
              <FieldDescription className="text-center  text-xl">
                Don&apos;t have an account? <Link href="/auth/signup">Sign up</Link>
              </FieldDescription>
            </FieldGroup>
          </form>
        </CardContent>
      </Card>
      {/* <FieldDescription className="px-6 text-center">
        By clicking continue, you agree to our <a href="#">Terms of Service</a> and{" "}
        <a href="#">Privacy Policy</a>.
      </FieldDescription> */}
    </div>
  );
}
