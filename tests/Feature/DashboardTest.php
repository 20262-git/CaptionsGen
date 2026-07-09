<?php

use App\Models\Agenda;
use App\Models\User;
use Inertia\Testing\AssertableInertia as Assert;

test('guests are redirected to the login page', function () {
    $response = $this->get(route('dashboard'));
    $response->assertRedirect(route('login'));
});

test('authenticated users can visit the dashboard', function () {
    $user = User::factory()->create();
    $this->actingAs($user);

    $response = $this->get(route('dashboard'));
    $response->assertOk();
});

test('dashboard only counts the current user agendas', function () {
    $user = User::factory()->create();
    Agenda::factory()->for($user)->create(['status' => 'draft']);
    Agenda::factory()->for($user)->create(['status' => 'terkirim']);
    Agenda::factory()->for(User::factory())->create(['status' => 'draft']);

    $this->actingAs($user)
        ->get(route('dashboard'))
        ->assertInertia(fn (Assert $page) => $page
            ->component('dashboard')
            ->where('stats.total', 2)
            ->where('stats.draft', 1)
            ->where('stats.terkirim', 1)
        );
});

test('dashboard lists upcoming scheduled agendas', function () {
    $user = User::factory()->create();
    Agenda::factory()->for($user)->create([
        'status' => 'terjadwal',
        'tanggal' => today()->addDay(),
    ]);
    Agenda::factory()->for($user)->create([
        'status' => 'terjadwal',
        'tanggal' => today()->subWeek(),
    ]);

    $this->actingAs($user)
        ->get(route('dashboard'))
        ->assertInertia(fn (Assert $page) => $page
            ->component('dashboard')
            ->has('upcoming', 1)
        );
});
