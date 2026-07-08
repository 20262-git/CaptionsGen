export type Platform = 'instagram' | 'tiktok';

export type AgendaStatus = 'terjadwal' | 'draft' | 'terkirim';

export type Agenda = {
    id: number;
    judul: string;
    caption: string | null;
    platform: Platform;
    status: AgendaStatus;
    tanggal: string;
    created_at: string;
    updated_at: string;
};
