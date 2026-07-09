# CaptionGen

Dashboard manajemen konten & otomasi caption media sosial untuk UMKM dan konten kreator
pemula. Tinggal isi nama produk, keyword, pilih platform (Instagram/TikTok), dan gaya
bahasa — caption langsung dibuatkan lewat Gemini API. Ada juga katalog konten dengan
kalender jadwal posting dan tombol salin caption.

## Fitur

- Login & register
- Generate caption otomatis (nama produk, keyword, platform, gaya bahasa)
- Salin caption ke clipboard sekali klik
- Katalog konten: grid kartu dengan thumbnail foto/video, ikon platform, dan badge status
- Kalender jadwal posting (CRUD): tambah, ubah, hapus jadwal
- Upload foto atau video sebagai thumbnail tiap konten
- Dashboard ringkasan: total konten, jadwal terdekat, dan konten terbaru

## Tech Stack

- **Backend:** Laravel
- **Frontend:** React + TypeScript lewat Inertia
- **UI:** shadcn/ui + Tailwind CSS (tema hijau + dark)
- **Database:** SQLite
- **Generate caption:** Gemini API (HTTP client bawaan Laravel)

## Cara Menjalankan

Butuh PHP, Composer, dan Node.js.

1. Clone repo lalu install dependency:

   ```bash
   composer install
   npm install
   ```

2. Siapkan file environment:

   ```bash
   cp .env.example .env
   php artisan key:generate
   ```

3. Isi API key Gemini di `.env`:

   ```env
   GEMINI_API_KEY=punya-kamu
   GEMINI_MODEL=gemini-2.5-flash
   ```

4. Siapkan database & storage:

   ```bash
   php artisan migrate --seed
   php artisan storage:link
   ```

5. Jalankan development server:

   ```bash
   php artisan serve
   npm run dev
   ```

   Buka `http://localhost:8000` (atau URL Herd kalau pakai Herd).

## Testing

```bash
php artisan test
```
