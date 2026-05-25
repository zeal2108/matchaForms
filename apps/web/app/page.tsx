import { api } from "~/trpc/server";
import { UserDisplay } from "~/components/user-display";

export default async function Home() {
  const { status } = await api.health.getHealth.query();

  return (
    <main
      className="min-h-screen min-w-screen flex justify-center items-center
    "
    >
      <div></div>
    </main>
  );
}
