"use client";

import { cn } from "~/lib/utils";
import { Button } from "~/components/ui/button";
import Image from "next/image";
import Link from "next/link";

export function TopNavBar({ className }: { className?: string }) {
  return (
    <nav
      className={cn(
        "fixed w-[90%] h-12 bg-primary flex justify-between items-center z-50 left-1/2 -translate-x-1/2 top-4 rounded-lg ",
        className,
      )}
    >
      <div className="flex justify-center gap-2 mx-3 items-center">
        <Image
          src="/whisk-logo.webp"
          alt="bg"
          width={34}
          height={34}
          // Preloads the image if it's above the fold
          className="object-cover"
        />
        <p className="text-accent-foreground font-display"> matchaforms </p>
      </div>
      <div className="flex gap-2">
        <Button>
          <Link href="/auth/login">Login</Link>
        </Button>
        <Button>
          <Link href="/auth/signup">Sign Up</Link>
        </Button>
      </div>
    </nav>
  );
}
