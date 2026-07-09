import { Head, router, useForm } from '@inertiajs/react';
import { format, parseISO } from 'date-fns';
import { id as localeId } from 'date-fns/locale';
import {
    Copy,
    Film,
    ImagePlus,
    Instagram,
    Music2,
    Pencil,
    Play,
    Plus,
    Trash2,
    X,
} from 'lucide-react';
import { useEffect, useMemo, useRef, useState } from 'react';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { useClipboard } from '@/hooks/use-clipboard';
import { cn } from '@/lib/utils';
import agenda from '@/routes/agenda';
import type { Agenda, AgendaStatus, Platform } from '@/types';

const PLATFORMS: { value: Platform; label: string; icon: typeof Instagram }[] =
    [
        { value: 'instagram', label: 'Instagram', icon: Instagram },
        { value: 'tiktok', label: 'TikTok', icon: Music2 },
    ];

const STATUS_OPTIONS: { value: AgendaStatus; label: string }[] = [
    { value: 'draft', label: 'Draft' },
    { value: 'terjadwal', label: 'Terjadwal' },
    { value: 'terkirim', label: 'Terkirim' },
];

const STATUS_VARIANT: Record<AgendaStatus, string> = {
    terjadwal: 'bg-primary text-primary-foreground',
    draft: 'border bg-secondary text-muted-foreground',
    terkirim: 'border bg-transparent text-muted-foreground/70',
};

const FILTERS: { value: 'semua' | AgendaStatus; label: string }[] = [
    { value: 'semua', label: 'Semua' },
    { value: 'terjadwal', label: 'Terjadwal' },
    { value: 'draft', label: 'Draft' },
    { value: 'terkirim', label: 'Terkirim' },
];

type AgendaForm = {
    judul: string;
    caption: string;
    media: File | null;
    hapus_media: boolean;
    platform: Platform;
    status: AgendaStatus;
    tanggal: string;
};

type MediaPreview = { url: string; type: 'image' | 'video' };

function emptyForm(tanggal: string): AgendaForm {
    return {
        judul: '',
        caption: '',
        media: null,
        hapus_media: false,
        platform: 'instagram',
        status: 'draft',
        tanggal,
    };
}

/**
 * Baca query prefill (?buat=1&judul=...&caption=...) yang dikirim dari
 * halaman Generate Caption, biar modal kebuka otomatis dengan data terisi.
 */
function readPrefill(): { open: boolean; data: AgendaForm } {
    const today = format(new Date(), 'yyyy-MM-dd');
    const params = new URLSearchParams(window.location.search);

    if (!params.has('buat')) {
        return { open: false, data: emptyForm(today) };
    }

    return {
        open: true,
        data: {
            judul: params.get('judul') ?? '',
            caption: params.get('caption') ?? '',
            media: null,
            hapus_media: false,
            platform:
                params.get('platform') === 'tiktok' ? 'tiktok' : 'instagram',
            status: 'draft',
            tanggal: today,
        },
    };
}

export default function AgendaIndex({ agendas }: { agendas: Agenda[] }) {
    const prefill = useMemo(() => readPrefill(), []);
    const [statusFilter, setStatusFilter] = useState<'semua' | AgendaStatus>(
        'semua',
    );
    const [dateFilter, setDateFilter] = useState<Date | undefined>(undefined);
    const [open, setOpen] = useState(prefill.open);
    const [editing, setEditing] = useState<Agenda | null>(null);
    const [mediaPreview, setMediaPreview] = useState<MediaPreview | null>(null);
    const [, copy] = useClipboard();
    const fileInputRef = useRef<HTMLInputElement>(null);

    const {
        data,
        setData,
        post,
        transform,
        processing,
        errors,
        reset,
        clearErrors,
    } = useForm<AgendaForm>(prefill.data);

    const dateKey = dateFilter ? format(dateFilter, 'yyyy-MM-dd') : null;

    const filtered = useMemo(
        () =>
            agendas.filter((a) => {
                const okStatus =
                    statusFilter === 'semua' || a.status === statusFilter;
                const okDate = !dateKey || a.tanggal === dateKey;

                return okStatus && okDate;
            }),
        [agendas, statusFilter, dateKey],
    );

    const scheduledDays = useMemo(
        () => agendas.map((a) => parseISO(a.tanggal)),
        [agendas],
    );

    // Bersihkan query prefill biar refresh nggak buka modal lagi.
    useEffect(() => {
        if (prefill.open) {
            window.history.replaceState({}, '', agenda.index().url);
        }
    }, [prefill.open]);

    function openCreate() {
        setEditing(null);
        clearErrors();
        reset();
        setMediaPreview(null);
        setData(emptyForm(dateKey ?? format(new Date(), 'yyyy-MM-dd')));
        setOpen(true);
    }

    function openEdit(item: Agenda) {
        setEditing(item);
        clearErrors();
        setData({
            judul: item.judul,
            caption: item.caption ?? '',
            media: null,
            hapus_media: false,
            platform: item.platform,
            status: item.status,
            tanggal: item.tanggal,
        });
        setMediaPreview(
            item.media_url
                ? { url: item.media_url, type: item.media_type ?? 'image' }
                : null,
        );
        setOpen(true);
    }

    function pickMedia(e: React.ChangeEvent<HTMLInputElement>) {
        const file = e.target.files?.[0];

        if (!file) {
            return;
        }

        setData((prev) => ({ ...prev, media: file, hapus_media: false }));
        setMediaPreview({
            url: URL.createObjectURL(file),
            type: file.type.startsWith('video/') ? 'video' : 'image',
        });
    }

    function removeMedia() {
        setData((prev) => ({ ...prev, media: null, hapus_media: true }));
        setMediaPreview(null);

        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
    }

    function submit(e: React.FormEvent) {
        e.preventDefault();
        const onSuccess = () => {
            setOpen(false);
            reset();
            setMediaPreview(null);
        };
        const options = {
            onSuccess,
            preserveScroll: true,
            forceFormData: true,
        };

        if (editing) {
            transform((form) => ({ ...form, _method: 'put' }));
            post(agenda.update(editing.id).url, options);
        } else {
            transform((form) => form);
            post(agenda.store().url, options);
        }
    }

    function destroy(item: Agenda) {
        if (!confirm(`Hapus jadwal "${item.judul}"?`)) {
            return;
        }

        router.delete(agenda.destroy(item.id).url, { preserveScroll: true });
    }

    async function handleCopy(item: Agenda) {
        const text = item.caption?.trim() ? item.caption : item.judul;
        const ok = await copy(text);

        if (ok) {
            toast.success('Caption tersalin!');
        }
    }

    return (
        <>
            <Head title="Katalog Konten" />

            <div className="flex flex-1 flex-col gap-6 p-4 lg:flex-row">
                {/* Katalog */}
                <div className="flex flex-1 flex-col gap-4">
                    {/* Header */}
                    <div className="flex items-center justify-between gap-4">
                        <div>
                            <h1 className="text-xl font-semibold">
                                Konten kamu
                            </h1>
                            <p className="text-sm text-muted-foreground">
                                {filtered.length} konten
                                {dateKey && (
                                    <>
                                        {' '}
                                        di{' '}
                                        {format(dateFilter!, 'd MMM yyyy', {
                                            locale: localeId,
                                        })}
                                    </>
                                )}
                            </p>
                        </div>
                        <Button onClick={openCreate} size="sm">
                            <Plus className="size-4" />
                            Buat baru
                        </Button>
                    </div>

                    {/* Filter chips */}
                    <div className="flex flex-wrap items-center gap-2">
                        {FILTERS.map((f) => (
                            <button
                                key={f.value}
                                type="button"
                                onClick={() => setStatusFilter(f.value)}
                                className={cn(
                                    'rounded-full px-3 py-1 text-sm transition-colors',
                                    statusFilter === f.value
                                        ? 'bg-primary text-primary-foreground'
                                        : 'bg-secondary text-muted-foreground hover:bg-accent',
                                )}
                            >
                                {f.label}
                            </button>
                        ))}
                        {dateKey && (
                            <button
                                type="button"
                                onClick={() => setDateFilter(undefined)}
                                className="ml-1 flex items-center gap-1 rounded-full border px-3 py-1 text-sm text-muted-foreground hover:bg-accent"
                            >
                                {format(dateFilter!, 'd MMM', {
                                    locale: localeId,
                                })}
                                <X className="size-3" />
                            </button>
                        )}
                    </div>

                    {/* Grid katalog */}
                    <div className="grid grid-cols-[repeat(auto-fill,minmax(200px,1fr))] gap-4">
                        {filtered.map((item) => {
                            const platform = PLATFORMS.find(
                                (p) => p.value === item.platform,
                            );
                            const PlatformIcon = platform?.icon ?? Instagram;

                            return (
                                <div
                                    key={item.id}
                                    className="group flex flex-col overflow-hidden rounded-2xl border border-sidebar-border/70 bg-card p-3 transition-colors hover:border-primary/40 dark:border-sidebar-border"
                                >
                                    {/* Thumbnail */}
                                    <div className="relative mb-3 flex aspect-square items-center justify-center overflow-hidden rounded-xl bg-secondary">
                                        {item.media_url ? (
                                            item.media_type === 'video' ? (
                                                <>
                                                    <video
                                                        src={item.media_url}
                                                        muted
                                                        playsInline
                                                        preload="metadata"
                                                        className="size-full object-cover"
                                                    />
                                                    <span className="absolute flex size-9 items-center justify-center rounded-full bg-black/50 text-white">
                                                        <Play className="size-4" />
                                                    </span>
                                                </>
                                            ) : (
                                                <img
                                                    src={item.media_url}
                                                    alt={item.judul}
                                                    className="size-full object-cover"
                                                />
                                            )
                                        ) : (
                                            <PlatformIcon className="size-10 text-muted-foreground/50" />
                                        )}
                                        <span className="absolute top-2 left-2 flex items-center gap-1 rounded-full bg-black/60 px-2 py-0.5 text-xs text-white backdrop-blur">
                                            <PlatformIcon className="size-3" />
                                            {platform?.label}
                                        </span>
                                        <span
                                            className={cn(
                                                'absolute top-2 right-2 rounded-full px-2 py-0.5 text-xs',
                                                STATUS_VARIANT[item.status],
                                            )}
                                        >
                                            {item.status}
                                        </span>
                                    </div>

                                    {/* Body */}
                                    <p className="truncate font-medium">
                                        {item.judul}
                                    </p>
                                    <p className="mt-1 line-clamp-2 min-h-10 text-sm text-muted-foreground">
                                        {item.caption || 'Tanpa caption'}
                                    </p>

                                    {/* Footer */}
                                    <div className="mt-3 flex items-center justify-between">
                                        <span className="text-xs text-muted-foreground">
                                            {format(
                                                parseISO(item.tanggal),
                                                'd MMM yyyy',
                                                { locale: localeId },
                                            )}
                                        </span>
                                        <div className="flex items-center gap-1">
                                            <Button
                                                onClick={() => openEdit(item)}
                                                variant="ghost"
                                                size="icon"
                                                className="size-8"
                                            >
                                                <Pencil className="size-4" />
                                            </Button>
                                            <Button
                                                onClick={() => destroy(item)}
                                                variant="ghost"
                                                size="icon"
                                                className="size-8 text-destructive hover:text-destructive"
                                            >
                                                <Trash2 className="size-4" />
                                            </Button>
                                            <Button
                                                onClick={() => handleCopy(item)}
                                                variant="outline"
                                                size="icon"
                                                className="size-8 border-primary/50 text-primary hover:bg-primary hover:text-primary-foreground"
                                            >
                                                <Copy className="size-4" />
                                            </Button>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}

                        {/* Kartu tambah */}
                        <button
                            type="button"
                            onClick={openCreate}
                            className="flex min-h-56 flex-col items-center justify-center gap-2 rounded-2xl border border-dashed border-border text-muted-foreground transition-colors hover:border-primary hover:text-primary"
                        >
                            <Plus className="size-6" />
                            <span className="text-sm">Tambah jadwal baru</span>
                        </button>
                    </div>

                    {filtered.length === 0 && (
                        <p className="text-center text-sm text-muted-foreground">
                            Belum ada konten yang cocok dengan filter ini.
                        </p>
                    )}
                </div>

                {/* Kalender (panel samping) */}
                <div className="flex flex-col gap-3 rounded-2xl border border-sidebar-border/70 p-4 lg:w-72 dark:border-sidebar-border">
                    <div className="flex items-center justify-between">
                        <h2 className="font-medium">Kalender</h2>
                        {dateKey && (
                            <Button
                                variant="ghost"
                                size="sm"
                                className="h-7 px-2 text-xs"
                                onClick={() => setDateFilter(undefined)}
                            >
                                Semua tanggal
                            </Button>
                        )}
                    </div>
                    <Calendar
                        mode="single"
                        selected={dateFilter}
                        onSelect={setDateFilter}
                        locale={localeId}
                        className="mx-auto"
                        modifiers={{ hasAgenda: scheduledDays }}
                        modifiersClassNames={{
                            hasAgenda:
                                'relative after:absolute after:bottom-1 after:left-1/2 after:size-1 after:-translate-x-1/2 after:rounded-full after:bg-primary data-[selected-single=true]:after:bg-primary-foreground',
                        }}
                    />
                    <p className="text-xs text-muted-foreground">
                        Klik tanggal untuk filter konten. Titik hijau menandai
                        hari yang ada jadwal.
                    </p>
                </div>
            </div>

            {/* Form tambah / edit */}
            <Dialog open={open} onOpenChange={setOpen}>
                <DialogContent className="max-h-[90vh] overflow-y-auto">
                    <form onSubmit={submit} className="flex flex-col gap-4">
                        <DialogHeader>
                            <DialogTitle>
                                {editing ? 'Edit Jadwal' : 'Tambah Jadwal'}
                            </DialogTitle>
                            <DialogDescription>
                                Isi detail jadwal posting kontenmu.
                            </DialogDescription>
                        </DialogHeader>

                        <div className="grid gap-2">
                            <Label htmlFor="tanggal">Tanggal</Label>
                            <Input
                                id="tanggal"
                                type="date"
                                value={data.tanggal}
                                onChange={(e) =>
                                    setData('tanggal', e.target.value)
                                }
                            />
                            {errors.tanggal && (
                                <p className="text-sm text-destructive">
                                    {errors.tanggal}
                                </p>
                            )}
                        </div>

                        <div className="grid gap-2">
                            <Label>Platform</Label>
                            <div className="flex gap-2">
                                {PLATFORMS.map((p) => {
                                    const PIcon = p.icon;

                                    return (
                                        <Button
                                            key={p.value}
                                            type="button"
                                            variant={
                                                data.platform === p.value
                                                    ? 'default'
                                                    : 'outline'
                                            }
                                            className="flex-1"
                                            onClick={() =>
                                                setData('platform', p.value)
                                            }
                                        >
                                            <PIcon className="size-4" />
                                            {p.label}
                                        </Button>
                                    );
                                })}
                            </div>
                        </div>

                        <div className="grid gap-2">
                            <Label htmlFor="judul">Judul</Label>
                            <Input
                                id="judul"
                                value={data.judul}
                                onChange={(e) =>
                                    setData('judul', e.target.value)
                                }
                                placeholder="mis. Promo akhir pekan"
                            />
                            {errors.judul && (
                                <p className="text-sm text-destructive">
                                    {errors.judul}
                                </p>
                            )}
                        </div>

                        <div className="grid gap-2">
                            <Label htmlFor="caption">Caption / catatan</Label>
                            <Textarea
                                id="caption"
                                value={data.caption}
                                onChange={(e) =>
                                    setData('caption', e.target.value)
                                }
                                placeholder="Tulis caption atau catatan singkat"
                                rows={3}
                            />
                            {errors.caption && (
                                <p className="text-sm text-destructive">
                                    {errors.caption}
                                </p>
                            )}
                        </div>

                        <div className="grid gap-2">
                            <Label>Foto / Video</Label>
                            <input
                                ref={fileInputRef}
                                type="file"
                                accept="image/jpeg,image/png,image/webp,video/mp4,video/quicktime"
                                className="hidden"
                                onChange={pickMedia}
                            />
                            {mediaPreview ? (
                                <div className="relative aspect-video overflow-hidden rounded-xl bg-secondary">
                                    {mediaPreview.type === 'video' ? (
                                        <video
                                            src={mediaPreview.url}
                                            muted
                                            playsInline
                                            controls
                                            className="size-full object-cover"
                                        />
                                    ) : (
                                        <img
                                            src={mediaPreview.url}
                                            alt="Preview"
                                            className="size-full object-cover"
                                        />
                                    )}
                                    <Button
                                        type="button"
                                        variant="secondary"
                                        size="icon"
                                        onClick={removeMedia}
                                        className="absolute top-2 right-2 size-8"
                                    >
                                        <X className="size-4" />
                                    </Button>
                                </div>
                            ) : (
                                <button
                                    type="button"
                                    onClick={() => fileInputRef.current?.click()}
                                    className="flex aspect-video flex-col items-center justify-center gap-2 rounded-xl border border-dashed border-border text-muted-foreground transition-colors hover:border-primary hover:text-primary"
                                >
                                    <span className="flex gap-2">
                                        <ImagePlus className="size-5" />
                                        <Film className="size-5" />
                                    </span>
                                    <span className="text-sm">
                                        Upload foto atau video
                                    </span>
                                    <span className="text-xs text-muted-foreground">
                                        JPG, PNG, WebP, MP4, MOV · maks 20MB
                                    </span>
                                </button>
                            )}
                            {errors.media && (
                                <p className="text-sm text-destructive">
                                    {errors.media}
                                </p>
                            )}
                        </div>

                        <div className="grid gap-2">
                            <Label htmlFor="status">Status</Label>
                            <Select
                                value={data.status}
                                onValueChange={(v) =>
                                    setData('status', v as AgendaStatus)
                                }
                            >
                                <SelectTrigger id="status">
                                    <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                    {STATUS_OPTIONS.map((s) => (
                                        <SelectItem
                                            key={s.value}
                                            value={s.value}
                                        >
                                            {s.label}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>

                        <DialogFooter>
                            <Button
                                type="button"
                                variant="ghost"
                                onClick={() => setOpen(false)}
                            >
                                Batal
                            </Button>
                            <Button type="submit" disabled={processing}>
                                {editing ? 'Simpan' : 'Tambah'}
                            </Button>
                        </DialogFooter>
                    </form>
                </DialogContent>
            </Dialog>
        </>
    );
}

AgendaIndex.layout = {
    breadcrumbs: [
        {
            title: 'Katalog Konten',
            href: agenda.index(),
        },
    ],
};
