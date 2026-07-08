import { Head, router, useForm } from '@inertiajs/react';
import { format, parseISO } from 'date-fns';
import { id as localeId } from 'date-fns/locale';
import { Instagram, Music2, Pencil, Plus, Trash2 } from 'lucide-react';
import { useMemo, useState } from 'react';
import { Badge } from '@/components/ui/badge';
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
    draft: 'bg-muted text-muted-foreground border',
    terkirim: 'border bg-transparent text-muted-foreground/70',
};

type AgendaForm = {
    judul: string;
    caption: string;
    platform: Platform;
    status: AgendaStatus;
    tanggal: string;
};

function emptyForm(tanggal: string): AgendaForm {
    return {
        judul: '',
        caption: '',
        platform: 'instagram',
        status: 'draft',
        tanggal,
    };
}

export default function AgendaIndex({ agendas }: { agendas: Agenda[] }) {
    const [selected, setSelected] = useState<Date>(new Date());
    const [open, setOpen] = useState(false);
    const [editing, setEditing] = useState<Agenda | null>(null);

    const selectedKey = format(selected, 'yyyy-MM-dd');

    const { data, setData, post, put, processing, errors, reset, clearErrors } =
        useForm<AgendaForm>(emptyForm(selectedKey));

    const dayAgendas = useMemo(
        () => agendas.filter((a) => a.tanggal === selectedKey),
        [agendas, selectedKey],
    );

    const scheduledDays = useMemo(
        () => agendas.map((a) => parseISO(a.tanggal)),
        [agendas],
    );

    function openCreate() {
        setEditing(null);
        clearErrors();
        reset();
        setData(emptyForm(selectedKey));
        setOpen(true);
    }

    function openEdit(item: Agenda) {
        setEditing(item);
        clearErrors();
        setData({
            judul: item.judul,
            caption: item.caption ?? '',
            platform: item.platform,
            status: item.status,
            tanggal: item.tanggal,
        });
        setOpen(true);
    }

    function submit(e: React.FormEvent) {
        e.preventDefault();
        const onSuccess = () => {
            setOpen(false);
            reset();
        };

        if (editing) {
            put(agenda.update(editing.id).url, {
                onSuccess,
                preserveScroll: true,
            });
        } else {
            post(agenda.store().url, { onSuccess, preserveScroll: true });
        }
    }

    function destroy(item: Agenda) {
        if (!confirm(`Hapus jadwal "${item.judul}"?`)) {
            return;
        }

        router.delete(agenda.destroy(item.id).url, { preserveScroll: true });
    }

    return (
        <>
            <Head title="Kalender" />

            <div className="flex flex-1 flex-col gap-6 p-4 md:flex-row">
                {/* Kalender */}
                <div className="flex flex-col gap-4 rounded-xl border border-sidebar-border/70 p-4 dark:border-sidebar-border">
                    <div className="flex items-center justify-between gap-4">
                        <div>
                            <h1 className="text-lg font-semibold">
                                Kalender Jadwal
                            </h1>
                            <p className="text-sm text-muted-foreground">
                                Atur jadwal posting kontenmu
                            </p>
                        </div>
                        <Button onClick={openCreate} size="sm">
                            <Plus className="size-4" />
                            Tambah
                        </Button>
                    </div>

                    <Calendar
                        mode="single"
                        required
                        selected={selected}
                        onSelect={setSelected}
                        locale={localeId}
                        className="mx-auto"
                        modifiers={{ hasAgenda: scheduledDays }}
                        modifiersClassNames={{
                            hasAgenda:
                                'relative after:absolute after:bottom-1 after:left-1/2 after:size-1 after:-translate-x-1/2 after:rounded-full after:bg-primary data-[selected-single=true]:after:bg-primary-foreground',
                        }}
                    />
                </div>

                {/* Daftar jadwal hari terpilih */}
                <div className="flex flex-1 flex-col gap-3 rounded-xl border border-sidebar-border/70 p-4 dark:border-sidebar-border">
                    <div className="flex items-center justify-between">
                        <h2 className="font-medium capitalize">
                            {format(selected, 'EEEE, d MMMM yyyy', {
                                locale: localeId,
                            })}
                        </h2>
                        <Badge variant="secondary">
                            {dayAgendas.length} jadwal
                        </Badge>
                    </div>

                    {dayAgendas.length === 0 ? (
                        <div className="flex flex-1 flex-col items-center justify-center gap-3 py-10 text-center">
                            <p className="text-sm text-muted-foreground">
                                Belum ada jadwal di tanggal ini
                            </p>
                            <Button
                                onClick={openCreate}
                                variant="outline"
                                size="sm"
                            >
                                <Plus className="size-4" />
                                Tambah jadwal pertama
                            </Button>
                        </div>
                    ) : (
                        <ul className="flex flex-col gap-3">
                            {dayAgendas.map((item) => {
                                const platform = PLATFORMS.find(
                                    (p) => p.value === item.platform,
                                );
                                const PlatformIcon =
                                    platform?.icon ?? Instagram;

                                return (
                                    <li
                                        key={item.id}
                                        className="flex items-start gap-3 rounded-lg border border-sidebar-border/70 p-3 dark:border-sidebar-border"
                                    >
                                        <div className="flex size-9 shrink-0 items-center justify-center rounded-md bg-muted">
                                            <PlatformIcon className="size-4" />
                                        </div>
                                        <div className="min-w-0 flex-1">
                                            <div className="flex items-center gap-2">
                                                <p className="truncate font-medium">
                                                    {item.judul}
                                                </p>
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
                                            {item.caption && (
                                                <p className="mt-1 line-clamp-2 text-sm text-muted-foreground">
                                                    {item.caption}
                                                </p>
                                            )}
                                        </div>
                                        <div className="flex shrink-0 gap-1">
                                            <Button
                                                onClick={() => openEdit(item)}
                                                variant="ghost"
                                                size="icon"
                                            >
                                                <Pencil className="size-4" />
                                            </Button>
                                            <Button
                                                onClick={() => destroy(item)}
                                                variant="ghost"
                                                size="icon"
                                                className="text-destructive hover:text-destructive"
                                            >
                                                <Trash2 className="size-4" />
                                            </Button>
                                        </div>
                                    </li>
                                );
                            })}
                        </ul>
                    )}
                </div>
            </div>

            {/* Form tambah / edit */}
            <Dialog open={open} onOpenChange={setOpen}>
                <DialogContent>
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
            title: 'Kalender',
            href: agenda.index(),
        },
    ],
};
