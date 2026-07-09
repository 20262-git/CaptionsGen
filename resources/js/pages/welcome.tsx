import { Head, Link, usePage } from '@inertiajs/react';
import {
    ArrowRight,
    CalendarClock,
    Copy,
    Instagram,
    LayoutList,
    Music2,
    Sparkles,
    Wand2,
} from 'lucide-react';
import LogoMark from '@/components/logo-mark';
import { Button } from '@/components/ui/button';
import { dashboard, login, register } from '@/routes';

const FEATURES = [
    {
        icon: Wand2,
        title: 'Generate caption otomatis',
        desc: 'Isi produk, keyword, dan gaya bahasa — caption langsung jadi lewat Gemini.',
    },
    {
        icon: LayoutList,
        title: 'Katalog konten',
        desc: 'Semua caption tersusun rapi sebagai kartu dengan thumbnail foto atau video.',
    },
    {
        icon: CalendarClock,
        title: 'Kalender jadwal posting',
        desc: 'Atur kapan tiap konten tayang, lengkap dengan status terjadwal/draft/terkirim.',
    },
    {
        icon: Copy,
        title: 'Salin sekali klik',
        desc: 'Langsung copy caption ke clipboard, tinggal tempel di Instagram atau TikTok.',
    },
];

export default function Welcome() {
    const { auth } = usePage().props;

    return (
        <>
            <Head title="CaptionGen — Bikin caption medsos otomatis" />

            <div className="flex min-h-svh flex-col bg-background text-foreground">
                {/* Nav */}
                <header className="sticky top-0 z-10 border-b border-sidebar-border/70 bg-background/80 backdrop-blur dark:border-sidebar-border">
                    <nav className="mx-auto flex w-full max-w-5xl items-center justify-between gap-4 p-4">
                        <div className="flex items-center gap-2">
                            <LogoMark className="size-7" />
                            <span className="font-semibold">CaptionGen</span>
                        </div>
                        <div className="flex items-center gap-2">
                            {auth.user ? (
                                <Button asChild size="sm">
                                    <Link href={dashboard()}>
                                        Dashboard
                                        <ArrowRight className="size-4" />
                                    </Link>
                                </Button>
                            ) : (
                                <>
                                    <Button asChild variant="ghost" size="sm">
                                        <Link href={login()}>Masuk</Link>
                                    </Button>
                                    <Button asChild size="sm">
                                        <Link href={register()}>Daftar</Link>
                                    </Button>
                                </>
                            )}
                        </div>
                    </nav>
                </header>

                {/* Hero */}
                <main className="mx-auto flex w-full max-w-5xl flex-1 flex-col gap-16 px-4 py-16">
                    <section className="grid items-center gap-10 lg:grid-cols-2">
                        <div className="flex flex-col gap-6">
                            <span className="inline-flex w-fit items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-sm text-primary">
                                <Sparkles className="size-4" />
                                Caption medsos, otomatis
                            </span>
                            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
                                Bikin caption Instagram & TikTok dalam{' '}
                                <span className="text-primary">
                                    hitungan detik
                                </span>
                            </h1>
                            <p className="max-w-md text-lg text-muted-foreground">
                                Alat bantu buat UMKM dan kreator pemula. Tinggal
                                isi detail produk, pilih gaya bahasa, dan biarkan
                                caption dibuatkan untukmu — plus kalender jadwal
                                posting biar konten selalu rapi.
                            </p>
                            <div className="flex flex-wrap gap-3">
                                <Button asChild size="lg">
                                    <Link
                                        href={
                                            auth.user ? dashboard() : register()
                                        }
                                    >
                                        {auth.user
                                            ? 'Buka dashboard'
                                            : 'Coba gratis'}
                                        <ArrowRight className="size-4" />
                                    </Link>
                                </Button>
                                {!auth.user && (
                                    <Button asChild variant="outline" size="lg">
                                        <Link href={login()}>Masuk</Link>
                                    </Button>
                                )}
                            </div>
                        </div>

                        {/* Preview mock */}
                        <div className="rounded-2xl border border-sidebar-border/70 bg-card p-5 shadow-sm dark:border-sidebar-border">
                            <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                <Instagram className="size-4" />
                                Instagram · Gaya Lucu
                            </div>
                            <p className="mt-4 text-[15px] leading-relaxed">
                                Ngopi dulu biar semangat! ☕ Kopi Susu Gula Aren
                                kami manisnya pas, bikin hari kamu makin
                                on-fire. Cus mampir sebelum kehabisan ya! 🔥
                                <br />
                                <span className="text-primary">
                                    #kopikekinian #gulaaren #ngopicantik
                                    #umkmlokal
                                </span>
                            </p>
                            <div className="mt-5 flex gap-2">
                                <span className="inline-flex items-center gap-1 rounded-full bg-primary px-3 py-1 text-xs text-primary-foreground">
                                    <Copy className="size-3" />
                                    Salin
                                </span>
                                <span className="inline-flex items-center gap-1 rounded-full border px-3 py-1 text-xs text-muted-foreground">
                                    <Music2 className="size-3" />
                                    TikTok
                                </span>
                            </div>
                        </div>
                    </section>

                    {/* Features */}
                    <section className="flex flex-col gap-6">
                        <div className="text-center">
                            <h2 className="text-2xl font-semibold">
                                Semua yang kamu butuh buat konten
                            </h2>
                            <p className="mt-1 text-muted-foreground">
                                Dari bikin caption sampai atur jadwal posting.
                            </p>
                        </div>
                        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                            {FEATURES.map((f) => {
                                const Icon = f.icon;

                                return (
                                    <div
                                        key={f.title}
                                        className="flex flex-col gap-3 rounded-2xl border border-sidebar-border/70 bg-card p-5 dark:border-sidebar-border"
                                    >
                                        <div className="flex size-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
                                            <Icon className="size-5" />
                                        </div>
                                        <h3 className="font-medium">
                                            {f.title}
                                        </h3>
                                        <p className="text-sm text-muted-foreground">
                                            {f.desc}
                                        </p>
                                    </div>
                                );
                            })}
                        </div>
                    </section>

                    {/* CTA */}
                    {!auth.user && (
                        <section className="flex flex-col items-center gap-4 rounded-2xl border border-primary/30 bg-primary/5 p-10 text-center">
                            <h2 className="text-2xl font-semibold">
                                Siap bikin konten lebih cepat?
                            </h2>
                            <p className="max-w-md text-muted-foreground">
                                Buat akun gratis dan mulai generate caption
                                pertamamu sekarang.
                            </p>
                            <Button asChild size="lg">
                                <Link href={register()}>
                                    Daftar sekarang
                                    <ArrowRight className="size-4" />
                                </Link>
                            </Button>
                        </section>
                    )}
                </main>

                {/* Footer */}
                <footer className="border-t border-sidebar-border/70 dark:border-sidebar-border">
                    <div className="mx-auto flex w-full max-w-5xl items-center justify-between gap-4 p-4 text-sm text-muted-foreground">
                        <div className="flex items-center gap-2">
                            <LogoMark className="size-5" />
                            <span>CaptionGen</span>
                        </div>
                        <span>© {new Date().getFullYear()} CaptionGen</span>
                    </div>
                </footer>
            </div>
        </>
    );
}
