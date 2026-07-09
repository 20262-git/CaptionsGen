export type Platform = 'instagram' | 'tiktok';

export type AgendaStatus = 'terjadwal' | 'draft' | 'terkirim';

export type MediaType = 'image' | 'video';

export type Agenda = {
    id: number;
    judul: string;
    caption: string | null;
    media_path: string | null;
    media_type: MediaType | null;
    media_url: string | null;
    platform: Platform;
    status: AgendaStatus;
    tanggal: string;
    created_at: string;
    updated_at: string;
};
