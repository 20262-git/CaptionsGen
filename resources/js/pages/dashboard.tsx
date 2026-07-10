import { Head, Link } from '@inertiajs/react';
import { format, parseISO } from 'date-fns';
import { id as localeId } from 'date-fns/locale';
import {
    ArrowRight,
    CalendarClock,
    FileText,
    Instagram,
    LayoutList,
    Music2,
    Plus,
    Send,
    Wand2,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { dashboard } from '@/routes';
import agenda from '@/routes/agenda';
import caption from '@/routes/caption';
import type { Agenda, AgendaStatus, Platform } from '@/types';

type Stats = {
    total: number;
    terjadwal: number;
    draft: number;
    terkirim: number;
};

const PLATFORM_ICON: Record<Platform, typeof Instagram> = {
    instagram: Instagram,
    tiktok: Music2,
};

const STATUS_VARIANT: Record<AgendaStatus, string> = {
    terjadwal: 'bg-primary text-primary-foreground',
    draft: 'border bg-secondary text-muted-foreground',
    terkirim: 'border bg-transparent text-muted-foreground/70',
};

export default function Dashboard({
    stats,
    upcoming,
    recent,
}: {
    stats: Stats;
    upcoming: Agenda[];
    recent: Agenda[];
}) {
    const cards = [
        {
            label: 'Total konten',
            value: stats.total,
            icon: LayoutList,
            className: 'text-primary',
        },
        {
            label: 'Terjadwal',
            value: stats.terjadwal,
            icon: CalendarClock,
            className: 'text-primary',
        },
        {
            label: 'Draft',
            value: stats.draft,
            icon: FileText,
            className: 'text-muted-foreground',
        },
        {
            label: 'Terkirim',
            value: stats.terkirim,
            icon: Send,
            className: 'text-muted-foreground',
        },
    ];

    return (
        <>
            <Head title="Dashboard" />

            <div className="flex flex-1 flex-col gap-6 p-4">
                {/* Sapaan + aksi cepat */}
                <div className="flex flex-wrap items-center justify-between gap-4">
                    <div>
                        <h1 className="text-xl font-semibold">
                            Halo, selamat user 👋
                        </h1>
                        <p className="text-sm text-muted-foreground">
                            Ringkasan konten dan jadwal postingmu.
                        </p>
                    </div>
                    <div className="flex gap-2">
                        <Button asChild variant="outline">
                            <Link href={agenda.index({ query: { buat: 1 } })}>
                                <Plus className="size-4" />
                                Buat jadwal
                            </Link>
                        </Button>
                        <Button asChild>
                            <Link href={caption.index()}>
                                <Wand2 className="size-4" />
                                Generate caption
                            </Link>
                        </Button>
                    </div>
                </div>

                {/* Stat cards */}
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                    {cards.map((c) => {
                        const Icon = c.icon;

                        return (
                            <div
                                key={c.label}
                                className="flex items-center gap-4 rounded-2xl border border-sidebar-border/70 bg-card p-4 dark:border-sidebar-border"
                            >
                                <div className="flex size-11 items-center justify-center rounded-xl bg-secondary">
                                    <Icon className={cn('size-5', c.className)} />
                                </div>
                                <div>
                                    <p className="text-2xl font-semibold">
                                        {c.value}
                                    </p>
                                    <p className="text-sm text-muted-foreground">
                                        {c.label}
                                    </p>
                                </div>
                            </div>
                        );
                    })}
                </div>

                <div className="grid gap-6 lg:grid-cols-5">
                    {/* Jadwal terdekat */}
                    <div className="flex flex-col gap-3 rounded-2xl border border-sidebar-border/70 bg-card p-5 lg:col-span-2 dark:border-sidebar-border">
                        <div className="flex items-center justify-between">
                            <h2 className="font-medium">Jadwal terdekat</h2>
                            <Link
                                href={agenda.index()}
                                className="flex items-center gap-1 text-sm text-primary hover:underline"
                            >
                                Lihat semua
                                <ArrowRight className="size-3.5" />
                            </Link>
                        </div>

                        {upcoming.length === 0 ? (
                            <div className="flex flex-1 flex-col items-center justify-center gap-2 py-10 text-center text-muted-foreground">
                                <CalendarClock className="size-8 opacity-40" />
                                <p className="text-sm">
                                    Belum ada jadwal terdekat.
                                </p>
                            </div>
                        ) : (
                            <ul className="flex flex-col gap-2">
                                {upcoming.map((item) => {
                                    const Icon = PLATFORM_ICON[item.platform];

                                    return (
                                        <li
                                            key={item.id}
                                            className="flex items-center gap-3 rounded-xl bg-secondary/50 p-3"
                                        >
                                            <div className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-secondary">
                                                <Icon className="size-4 text-muted-foreground" />
                                            </div>
                                            <div className="min-w-0 flex-1">
                                                <p className="truncate text-sm font-medium">
                                                    {item.judul}
                                                </p>
                                                <p className="text-xs text-muted-foreground">
                                                    {format(
                                                        parseISO(item.tanggal),
                                                        'EEEE, d MMM yyyy',
                                                        { locale: localeId },
                                                    )}
                                                </p>
                                            </div>
                                            <span
                                                className={cn(
                                                    'rounded-full px-2 py-0.5 text-xs',
                                                    STATUS_VARIANT[item.status],
                                                )}
                                            >
                                                {item.status}
                                            </span>
                                        </li>
                                    );
                                })}
                            </ul>
                        )}
                    </div>

                    {/* Konten terbaru */}
                    <div className="flex flex-col gap-3 rounded-2xl border border-sidebar-border/70 bg-card p-5 lg:col-span-3 dark:border-sidebar-border">
                        <div className="flex items-center justify-between">
                            <h2 className="font-medium">Konten terbaru</h2>
                            <Link
                                href={agenda.index()}
                                className="flex items-center gap-1 text-sm text-primary hover:underline"
                            >
                                Ke katalog
                                <ArrowRight className="size-3.5" />
                            </Link>
                        </div>

                        {recent.length === 0 ? (
                            <div className="flex flex-1 flex-col items-center justify-center gap-3 py-10 text-center text-muted-foreground">
                                <LayoutList className="size-8 opacity-40" />
                                <p className="text-sm">
                                    Belum ada konten. Mulai bikin caption
                                    pertamamu!
                                </p>
                                <Button asChild size="sm">
                                    <Link href={caption.index()}>
                                        <Wand2 className="size-4" />
                                        Generate caption
                                    </Link>
                                </Button>
                            </div>
                        ) : (
                            <div className="grid gap-3 sm:grid-cols-2">
                                {recent.map((item) => {
                                    const Icon = PLATFORM_ICON[item.platform];

                                    return (
                                        <div
                                            key={item.id}
                                            className="flex flex-col gap-2 rounded-xl border border-sidebar-border/70 bg-background/40 p-3 dark:border-sidebar-border"
                                        >
                                            <div className="flex items-center justify-between">
                                                <span className="flex items-center gap-1.5 text-xs text-muted-foreground">
                                                    <Icon className="size-3.5" />
                                                    {item.platform}
                                                </span>
                                                <span
                                                    className={cn(
                                                        'rounded-full px-2 py-0.5 text-xs',
                                                        STATUS_VARIANT[
                                                            item.status
                                                        ],
                                                    )}
                                                >
                                                    {item.status}
                                                </span>
                                            </div>
                                            <p className="truncate text-sm font-medium">
                                                {item.judul}
                                            </p>
                                            <p className="line-clamp-2 text-xs text-muted-foreground">
                                                {item.caption || 'Tanpa caption'}
                                            </p>
                                        </div>
                                    );
                                })}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
}

Dashboard.layout = {
    breadcrumbs: [
        {
            title: 'Dashboard',
            href: dashboard(),
        },
    ],
};
