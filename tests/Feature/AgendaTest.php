<?php

use App\Models\Agenda;
use App\Models\User;

test('guests are redirected from the agenda page', function () {
    $this->get(route('agenda.index'))->assertRedirect(route('login'));
});

test('authenticated user sees the agenda page with only their own agendas', function () {
    $user = User::factory()->create();
    $own = Agenda::factory()->for($user)->create();
    Agenda::factory()->create();

    $this->actingAs($user)
        ->get(route('agenda.index'))
        ->assertOk()
        ->assertInertia(
            fn ($page) => $page
                ->component('agenda/index')
                ->has('agendas', 1)
                ->where('agendas.0.id', $own->id)
        );
});

test('user can create an agenda', function () {
    $user = User::factory()->create();

    $this->actingAs($user)
        ->post(route('agenda.store'), [
            'judul' => 'Promo akhir pekan',
            'caption' => 'Diskon spesial',
            'platform' => 'instagram',
            'status' => 'terjadwal',
            'tanggal' => '2026-08-01',
        ])
        ->assertRedirect(route('agenda.index'));

    $this->assertDatabaseHas('agendas', [
        'user_id' => $user->id,
        'judul' => 'Promo akhir pekan',
        'platform' => 'instagram',
        'status' => 'terjadwal',
    ]);
});

test('agenda validation rejects invalid input', function () {
    $user = User::factory()->create();

    $this->actingAs($user)
        ->post(route('agenda.store'), [
            'judul' => '',
            'platform' => 'facebook',
            'status' => 'ngawur',
            'tanggal' => 'bukan-tanggal',
        ])
        ->assertInvalid(['judul', 'platform', 'status', 'tanggal']);
});

test('user can update their own agenda', function () {
    $user = User::factory()->create();
    $agenda = Agenda::factory()->for($user)->create(['judul' => 'Lama']);

    $this->actingAs($user)
        ->put(route('agenda.update', $agenda), [
            'judul' => 'Baru',
            'caption' => null,
            'platform' => 'tiktok',
            'status' => 'terkirim',
            'tanggal' => '2026-09-10',
        ])
        ->assertRedirect(route('agenda.index'));

    expect($agenda->fresh())
        ->judul->toBe('Baru')
        ->platform->toBe('tiktok')
        ->status->toBe('terkirim');
});

test('user cannot update another users agenda', function () {
    $user = User::factory()->create();
    $agenda = Agenda::factory()->create(['judul' => 'Punya orang']);

    $this->actingAs($user)
        ->put(route('agenda.update', $agenda), [
            'judul' => 'Dibajak',
            'platform' => 'instagram',
            'status' => 'draft',
            'tanggal' => '2026-09-10',
        ])
        ->assertForbidden();

    expect($agenda->fresh()->judul)->toBe('Punya orang');
});

test('user can delete their own agenda', function () {
    $user = User::factory()->create();
    $agenda = Agenda::factory()->for($user)->create();

    $this->actingAs($user)
        ->delete(route('agenda.destroy', $agenda))
        ->assertRedirect(route('agenda.index'));

    $this->assertModelMissing($agenda);
});

test('user cannot delete another users agenda', function () {
    $user = User::factory()->create();
    $agenda = Agenda::factory()->create();

    $this->actingAs($user)
        ->delete(route('agenda.destroy', $agenda))
        ->assertForbidden();

    $this->assertModelExists($agenda);
});
