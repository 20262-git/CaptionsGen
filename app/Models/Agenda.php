<?php

namespace App\Models;

use Database\Factories\AgendaFactory;
use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\Storage;

/**
 * @property int $id
 * @property int $user_id
 * @property string $judul
 * @property string|null $caption
 * @property string|null $media_path
 * @property string|null $media_type
 * @property string $platform
 * @property string $status
 * @property Carbon $tanggal
 * @property Carbon|null $created_at
 * @property Carbon|null $updated_at
 * @property-read string|null $media_url
 */
#[Fillable(['judul', 'caption', 'media_path', 'media_type', 'platform', 'status', 'tanggal'])]
class Agenda extends Model
{
    /** @use HasFactory<AgendaFactory> */
    use HasFactory;

    /**
     * @var list<string>
     */
    protected $appends = ['media_url'];

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'tanggal' => 'date:Y-m-d',
        ];
    }

    /**
     * Public URL for the uploaded media, or null when there is none.
     *
     * @return Attribute<string|null, never>
     */
    protected function mediaUrl(): Attribute
    {
        return Attribute::get(fn (): ?string => $this->media_path
            ? Storage::disk('public')->url($this->media_path)
            : null);
    }

    /**
     * @return BelongsTo<User, $this>
     */
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }
}
