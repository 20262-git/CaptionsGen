import { Head, router, useForm } from '@inertiajs/react';
import {
    Briefcase,
    CalendarPlus,
    Check,
    Copy,
    Instagram,
    Laugh,
    Music2,
    Sparkles,
    Wand2,
} from 'lucide-react';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useClipboard } from '@/hooks/use-clipboard';
import agenda from '@/routes/agenda';
import caption from '@/routes/caption';
import type { Platform } from '@/types';

type Tone = 'lucu' | 'formal' | 'estetik';

const PLATFORMS: { value: Platform; label: string; icon: typeof Instagram }[] =
    [
        { value: 'instagram', label: 'Instagram', icon: Instagram },
        { value: 'tiktok', label: 'TikTok', icon: Music2 },
    ];

const TONES: { value: Tone; label: string; icon: typeof Laugh }[] = [
    { value: 'lucu', label: 'Lucu', icon: Laugh },
    { value: 'formal', label: 'Formal', icon: Briefcase },
    { value: 'estetik', label: 'Estetik', icon: Sparkles },
];

type CaptionForm = {
    produk: string;
    keyword: string;
    platform: Platform;
    tone: Tone;
};

export default function CaptionIndex() {
    const [result, setResult] = useState<string | null>(null);
    const [copied, copy] = useClipboard();

    const { data, setData, post, processing, errors } = useForm<CaptionForm>({
        produk: '',
        keyword: '',
        platform: 'instagram',
        tone: 'lucu',
    });

    useEffect(() => {
        return router.on('flash', (event) => {
            const flash = (event as CustomEvent).detail?.flash;

            if (flash?.caption) {
                setResult(flash.caption as string);
            }
        });
    }, []);

    function submit(e: React.FormEvent) {
        e.preventDefault();
        post(caption.generate().url, { preserveScroll: true });
    }

    async function handleCopy() {
        if (!result) {
            return;
        }

        const ok = await copy(result);

        if (ok) {
            toast.success('Caption tersalin!');
        }
    }

    function buatKonten() {
        if (!result) {
            return;
        }

        router.visit(
            agenda.index({
                query: {
                    buat: 1,
                    judul: data.produk,
                    caption: result,
                    platform: data.platform,
                },
            }).url,
        );
    }

    const activePlatform = PLATFORMS.find((p) => p.value === data.platform);
    const activeTone = TONES.find((t) => t.value === data.tone);

    return (
        <>
            <Head title="Generate Caption" />

            <div className="flex flex-1 flex-col gap-6 p-4 lg:flex-row">
                {/* Form */}
                <form
                    onSubmit={submit}
                    className="flex w-full flex-col gap-5 rounded-2xl border border-sidebar-border/70 bg-card p-6 lg:max-w-md dark:border-sidebar-border"
                >
                    <div>
                        <h1 className="text-xl font-semibold">
                            Generate Caption
                        </h1>
                        <p className="text-sm text-muted-foreground">
                            Isi detail produk, biar dibuatkan captionnya
                            otomatis.
                        </p>
                    </div>

                    <div className="grid gap-2">
                        <Label htmlFor="produk">Nama Produk</Label>
                        <Input
                            id="produk"
                            value={data.produk}
                            onChange={(e) => setData('produk', e.target.value)}
                            placeholder="mis. Kopi Susu Gula Aren"
                        />
                        {errors.produk && (
                            <p className="text-sm text-destructive">
                                {errors.produk}
                            </p>
                        )}
                    </div>

                    <div className="grid gap-2">
                        <Label htmlFor="keyword">Keyword</Label>
                        <Input
                            id="keyword"
                            value={data.keyword}
                            onChange={(e) => setData('keyword', e.target.value)}
                            placeholder="mis. promo, murah, kekinian"
                        />
                        {errors.keyword && (
                            <p className="text-sm text-destructive">
                                {errors.keyword}
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
                        <Label>Gaya Bahasa</Label>
                        <div className="flex flex-wrap gap-2">
                            {TONES.map((t) => {
                                const TIcon = t.icon;

                                return (
                                    <Button
                                        key={t.value}
                                        type="button"
                                        variant={
                                            data.tone === t.value
                                                ? 'default'
                                                : 'outline'
                                        }
                                        className="flex-1"
                                        onClick={() => setData('tone', t.value)}
                                    >
                                        <TIcon className="size-4" />
                                        {t.label}
                                    </Button>
                                );
                            })}
                        </div>
                    </div>

                    <Button
                        type="submit"
                        disabled={processing}
                        className="w-full"
                    >
                        <Wand2 className="size-4" />
                        {processing ? 'Membuat caption...' : 'Generate Caption'}
                    </Button>
                </form>

                {/* Hasil */}
                <div className="flex flex-1 flex-col gap-3 rounded-2xl border border-sidebar-border/70 bg-card p-6 dark:border-sidebar-border">
                    <div className="flex items-center justify-between">
                        <span className="text-xs text-muted-foreground">
                            {activePlatform?.label} · Gaya {activeTone?.label}
                        </span>
                        {result && (
                            <div className="flex gap-2">
                                <Button
                                    type="button"
                                    onClick={handleCopy}
                                    variant="outline"
                                    size="sm"
                                    className="border-primary/50 text-primary hover:bg-primary hover:text-primary-foreground"
                                >
                                    {copied === result ? (
                                        <Check className="size-4" />
                                    ) : (
                                        <Copy className="size-4" />
                                    )}
                                    {copied === result ? 'Tersalin!' : 'Salin'}
                                </Button>
                                <Button
                                    type="button"
                                    onClick={buatKonten}
                                    size="sm"
                                >
                                    <CalendarPlus className="size-4" />
                                    Buat Konten
                                </Button>
                            </div>
                        )}
                    </div>

                    {processing ? (
                        <div className="flex flex-1 flex-col gap-3">
                            <div className="h-4 w-3/4 animate-pulse rounded bg-muted" />
                            <div className="h-4 w-full animate-pulse rounded bg-muted" />
                            <div className="h-4 w-5/6 animate-pulse rounded bg-muted" />
                            <div className="h-4 w-2/3 animate-pulse rounded bg-muted" />
                        </div>
                    ) : result ? (
                        <p className="text-[15px] leading-relaxed whitespace-pre-wrap">
                            {result}
                        </p>
                    ) : (
                        <div className="flex flex-1 flex-col items-center justify-center gap-2 py-12 text-center text-muted-foreground">
                            <Wand2 className="size-8 opacity-40" />
                            <p className="text-sm">
                                Caption hasil generate bakal muncul di sini.
                            </p>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
}

CaptionIndex.layout = {
    breadcrumbs: [
        {
            title: 'Generate Caption',
            href: caption.index(),
        },
    ],
};
