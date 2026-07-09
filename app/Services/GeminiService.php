<?php

namespace App\Services;

use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;
use RuntimeException;

class GeminiService
{
    /**
     * Generate a social media caption using the Gemini API.
     */
    public function generateCaption(
        string $produk,
        string $keyword,
        string $platform,
        string $tone,
    ): string {
        $key = config('services.gemini.key');

        if (blank($key)) {
            throw new RuntimeException('GEMINI_API_KEY belum diisi di file .env.');
        }

        $model = config('services.gemini.model');
        $prompt = $this->buildPrompt($produk, $keyword, $platform, $tone);

        $response = Http::withHeaders(['x-goog-api-key' => $key])
            ->asJson()
            ->timeout(30)
            ->post("https://generativelanguage.googleapis.com/v1beta/models/{$model}:generateContent", [
                'contents' => [
                    ['parts' => [['text' => $prompt]]],
                ],
            ]);

        if ($response->failed()) {
            Log::warning('Gemini API error', [
                'status' => $response->status(),
                'body' => $response->body(),
            ]);

            throw new RuntimeException(match ($response->status()) {
                401, 403 => 'API key Gemini tidak valid. Cek GEMINI_API_KEY di file .env.',
                429 => 'Kuota Gemini habis atau model tidak tersedia untuk key ini. Coba lagi nanti atau ganti GEMINI_MODEL.',
                default => 'Gagal menghubungi Gemini API. Coba lagi.',
            });
        }

        $caption = $response->json('candidates.0.content.parts.0.text');

        if (blank($caption)) {
            throw new RuntimeException('Gemini tidak mengembalikan caption. Coba lagi.');
        }

        return trim($caption);
    }

    /**
     * Build the prompt sent to Gemini from the form input.
     */
    private function buildPrompt(
        string $produk,
        string $keyword,
        string $platform,
        string $tone,
    ): string {
        return <<<PROMPT
        Kamu adalah asisten copywriter media sosial untuk UMKM Indonesia.
        Buatkan satu caption {$platform} yang menarik dengan gaya bahasa {$tone}.

        Nama produk: {$produk}
        Keyword: {$keyword}

        Aturan:
        - Tulis dalam Bahasa Indonesia.
        - Panjang 2-4 kalimat, diakhiri dengan ajakan (call to action).
        - Sertakan 3-5 hashtag relevan di baris terakhir.
        - Balas HANYA teks caption, tanpa penjelasan tambahan.
        PROMPT;
    }
}
