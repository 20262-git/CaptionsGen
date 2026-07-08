<?php

namespace Database\Factories;

use App\Models\Agenda;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<Agenda>
 */
class AgendaFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'user_id' => User::factory(),
            'judul' => fake()->sentence(3),
            'caption' => fake()->optional()->paragraph(),
            'platform' => fake()->randomElement(['instagram', 'tiktok']),
            'status' => fake()->randomElement(['terjadwal', 'draft', 'terkirim']),
            'tanggal' => fake()->dateTimeBetween('-1 week', '+1 month')->format('Y-m-d'),
        ];
    }
}
