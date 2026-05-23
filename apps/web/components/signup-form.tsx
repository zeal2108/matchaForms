"use client";

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
  createUserWithEmailInput,
  type CreateUserWithEmailInputType,
} from "@repo/services/user/model";
import { useRouter } from "next/navigation";
import { useSignup } from "~/hooks/api/auth";

export function SignupForm({ className, ...props }: React.ComponentProps<"div">) {
  const { createUserWithEmailAsync } = useSignup();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateUserWithEmailInputType>({
    resolver: zodResolver(createUserWithEmailInput),
  });
  const router = useRouter();

  const onSubmit: SubmitHandler<CreateUserWithEmailInputType> = async (data) => {
    const { id } = await createUserWithEmailAsync({
      fullName: data.fullName,
      email: data.email,
      password: data.password,
    });
    console.log(`user created with id-${id}`);
    router.replace("/");
  };

  return (
    <div className={cn("flex flex-col gap-6 items-center font-display", className)} {...props}>
      <Card className=" overflow-hidden p-0 w-full  lg:w-xl ">
        <CardContent>
          <form className="p-6 md:p-8" onSubmit={handleSubmit(onSubmit)}>
            <FieldGroup>
              <div className="flex flex-col items-center gap-2 text-center">
                <h1 className="text-4xl font-extrabold">Create your account</h1>
                <p className="text-lg text-balance text-muted-foreground font-bold">
                  Enter your email below to create your account
                </p>
              </div>
              <Field>
                <FieldLabel className="text-xl" htmlFor="name">
                  Full Name
                </FieldLabel>
                <Input
                  id="name"
                  type="text"
                  placeholder="John Doe"
                  required
                  {...register("fullName")}
                />
              </Field>
              <Field>
                <FieldLabel className="text-xl" htmlFor="email">
                  Email
                </FieldLabel>
                <Input
                  id="email"
                  type="email"
                  placeholder="m@example.com"
                  required
                  {...register("email")}
                />
                <FieldDescription className="text-md">
                  We&apos;ll use this to contact you. We will not share your email with anyone else.
                </FieldDescription>
              </Field>
              <Field>
                <Field className="grid grid-cols-2 gap-4">
                  <Field>
                    <FieldLabel htmlFor="password" className="text-xl">
                      Password
                    </FieldLabel>
                    <Input id="password" type="password" required {...register("password")} />
                  </Field>
                  <Field>
                    <FieldLabel htmlFor="confirm-password" className="text-xl">
                      Confirm Password
                    </FieldLabel>
                    <Input id="confirm-password" type="password" required />
                  </Field>
                </Field>
                <FieldDescription className="text-lg">
                  Must be at least 8 characters long.
                </FieldDescription>
              </Field>
              <Field>
                <Button type="submit" className="text-xl py-6">
                  Create Account
                </Button>
              </Field>

              <p className="text-center text-xl">
                Already have an account? <a href="login">Sign in</a>
              </p>
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
