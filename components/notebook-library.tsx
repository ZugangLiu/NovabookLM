// components/notebook-library.tsx
import {
    Plus,
    Search,
    Grid2X2,
    List,
    MoreVertical,
    Settings,
    ChevronDown,
    Notebook,
} from "lucide-react";
import { Button } from "@/components/ui/button";

const featured = [
    {
        title: "Sherlock Holmes 全集与游戏",
        source: "Sir Arthur Conan Doyle",
        meta: "27 May 2026 · 62 sources",
        image: "https://images.unsplash.com/photo-1519681393784-d120267933ba",
    },
    {
        title: "2025世界展望",
        source: "The Economist",
        meta: "7 Jul 2025 · 70 sources",
        image: "https://images.unsplash.com/photo-1642790106117-e829e14a795f",
    },
];

const recent = [
    { title: "《精神现象学》义解", icon: "📖", meta: "11 Jan 2026 · 1 source", color: "bg-emerald-950/40" },
    { title: "Lacan A Beginner's Guide", icon: "▥", meta: "14 Apr 2026 · 1 source", color: "bg-indigo-950/40" },
    { title: "Quantitative Trading", icon: "📈", meta: "23 Mar 2026 · 1 source", color: "bg-stone-900" },
    { title: "Cybernetics - Norbert Wiener", icon: "🤖", meta: "12 Mar 2026 · 1 source", color: "bg-lime-950/30" },
];

export default function NotebookLibrary() {
    return (
        <main className="min-h-screen bg-[#20242b] text-zinc-100">
            <header className="flex h-14 items-center justify-between px-5">
                <div className="flex items-center gap-2 text-xl font-semibold">
                    <Notebook className="size-6" />
                    NovabookLM
                </div>

                <div className="flex items-center gap-3">
                    <Button variant="outline" size="sm" className="border-zinc-700 bg-transparent text-zinc-100">
                        <Settings className="size-4" />
                        Settings
                    </Button>
                    <div className="grid size-8 place-items-center rounded-full bg-stone-600 text-sm">Z</div>
                </div>
            </header>

            <section className="mx-auto w-full max-w-[1520px] px-6 py-8">
                <div className="mb-8 flex items-center justify-between gap-4">
                    <nav className="flex items-center gap-3 text-sm text-zinc-300">
                        <button className="rounded-full bg-indigo-500/20 px-4 py-2 text-indigo-100">All</button>
                        <button className="px-3 py-2 hover:text-white">My notebooks</button>
                        <button className="px-3 py-2 hover:text-white">Featured notebooks</button>
                    </nav>

                    <div className="flex items-center gap-3">
                        <Button variant="ghost" size="icon" className="rounded-full text-zinc-200">
                            <Search className="size-5" />
                        </Button>
                        <div className="flex rounded-full border border-zinc-700 bg-zinc-900/40 p-1">
                            <Button size="icon-sm" className="rounded-full bg-indigo-500/30">
                                <Grid2X2 className="size-4" />
                            </Button>
                            <Button variant="ghost" size="icon-sm" className="rounded-full text-zinc-300">
                                <List className="size-4" />
                            </Button>
                        </div>
                        <Button variant="outline" className="rounded-full border-zinc-700 bg-transparent text-zinc-100">
                            Most recent
                            <ChevronDown className="size-4" />
                        </Button>
                        <Button className="rounded-full bg-white text-zinc-950 hover:bg-zinc-200">
                            <Plus className="size-4" />
                            Create new
                        </Button>
                    </div>
                </div>

                <h2 className="mb-4 text-2xl font-medium">Featured notebooks</h2>
                <div className="mb-12 grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
                    {featured.map((item) => (
                        <article
                            key={item.title}
                            className="relative h-40 overflow-hidden rounded-lg bg-zinc-800"
                            style={{ backgroundImage: `linear-gradient(to top, rgba(0,0,0,.72), rgba(0,0,0,.15)), url(${item.image})`, backgroundSize: "cover" }}
                        >
                            <div className="absolute inset-x-0 bottom-0 p-4">
                                <p className="text-sm text-zinc-200">{item.source}</p>
                                <h3 className="mt-1 line-clamp-2 text-xl font-medium">{item.title}</h3>
                                <p className="mt-3 text-sm text-zinc-300">{item.meta}</p>
                            </div>
                        </article>
                    ))}
                </div>

                <h2 className="mb-4 text-2xl font-medium">Recent notebooks</h2>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                    <button className="flex h-44 flex-col items-center justify-center rounded-lg border border-zinc-700 bg-zinc-900/20 text-lg">
                        <span className="mb-4 grid size-14 place-items-center rounded-full bg-indigo-500/20 text-2xl">+</span>
                        Create new notebook
                    </button>

                    {recent.map((item) => (
                        <article key={item.title} className={`relative h-44 rounded-lg p-5 ${item.color}`}>
                            <MoreVertical className="absolute right-4 top-4 size-5 text-blue-200" />
                            <div className="text-3xl">{item.icon}</div>
                            <h3 className="mt-8 line-clamp-2 text-xl font-medium">{item.title}</h3>
                            <p className="mt-3 text-sm text-zinc-300">{item.meta}</p>
                        </article>
                    ))}
                </div>
            </section>
        </main>
    );
}