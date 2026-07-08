<?php

namespace App\Models;

use Database\Factories\AgendaFactory;
use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Support\Carbon;

/**
 * @property int $id
 * @property int $user_id
 * @property string $judul
 * @property string|null $caption
 * @property string $platform
 * @property string $status
 * @property Carbon $tanggal
 * @property Carbon|null $created_at
 * @property Carbon|null $updated_at
 */
#[Fillable(['judul', 'caption', 'platform', 'status', 'tanggal'])]
class Agenda extends Model
{
    /** @use HasFactory<AgendaFactory> */
    use HasFactory;

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
     * @return BelongsTo<User, $this>
     */
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }
}
