import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <div className="flex flex-col flex-1 items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex flex-1 w-full max-w-3xl flex-col items-center justify-between py-32 px-16 bg-white dark:bg-black sm:items-start">
        <div className="flex flex-col items-center gap-6 text-center sm:items-start sm:text-left">
          <h1 className="max-w-xs text-3xl font-semibold leading-10 tracking-tight text-black dark:text-zinc-50">
            SourceMind <br />
            Chat with your own sources
          </h1>
          <Button variant="outline">
            <Link
              href="/notebooks" className="text-lg font-medium text-zinc-950 dark:text-zinc-50"
            >My Notebooks
            </Link>
          </Button>
          <Button variant="outline">
            <Link
              href="/settings" className="text-lg font-medium text-zinc-950 dark:text-zinc-50"
            >Settings
            </Link>
          </Button>
          <Button variant="outline">
            <Link
              href="/login" className="text-lg font-medium text-zinc-950 dark:text-zinc-50"
            >Login
            </Link>
          </Button>
        </div>
      </main>
    </div>
  );
}
