import Link from "next/link";
type Props = {
    params: Promise<{
        id: string;
    }>;
}

export default async function Notebook(params: Props) {
    const { id } = await params.params;

    return (
        <div className="flex flex-col flex-1 items-center justify-center bg-zinc-50 font-sans dark:bg-black">
            <main className="flex flex-1 w-full max-w-3xl flex-col items-center justify-between py-32 px-16 bg-white dark:bg-black sm:items-start">
                <h1 className="max-w-xs text-3xl font-semibold leading-10 tracking-tight text-black dark:text-zinc-50">
                    Notebook Id: {id}
                </h1>
                <Link
                    href="/notebooks" className="text-lg font-medium text-zinc-950 dark:text-zinc-50"
                >Back to Notebooks
                </Link>
                <Link
                    href="/" className="text-lg font-medium text-zinc-950 dark:text-zinc-50"
                >Back to Home
                </Link>
            </main>
        </div>
    );
}