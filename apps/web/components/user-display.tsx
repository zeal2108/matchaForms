"use client";

import { useGetUser } from "~/hooks/api/auth";
import { Card, CardContent } from "~/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar";


export function UserDisplay() {
  const { user, isLoading, isError, error } = useGetUser();

  if (isLoading) {
    return <div className="text-center p-4">Loading...</div>;
  }

  if (isError) {
    return (
      <div className="text-center p-4 text-red-500">
        Error: {error?.message || "Failed to load user"}
      </div>
    );
  }

  if (!user) {
    return <div className="text-center p-4">User not found</div>;
  }

  return (
    <Card className="w-full max-w-sm">
      <CardContent className="pt-6">
        <div className="flex flex-col items-center gap-4">
          <Avatar className="h-20 w-20">
            <AvatarImage src={user.profileImageUrl || ""} />
            <AvatarFallback>{user.fullName.charAt(0)}</AvatarFallback>
          </Avatar>
          <div className="text-center">
            <h2 className="text-xl font-bold">{user.fullName}</h2>
            <p className="text-sm text-muted-foreground">{user.email}</p>
            {user.emailVerified && <p className="text-xs text-green-600 mt-1">✓ Email verified</p>}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
