<?php

use App\Models\User;
use Illuminate\Support\Facades\Http;

test('guests are redirected from the caption page', function () {
    $this->get(route('caption.index'))->assertRedirect(route('login'));
});

test('authenticated user can view the caption form', function () {
    $user = User::factory()->create();

    $this->actingAs($user)
        ->get(route('caption.index'))
        ->assertOk()
        ->assertInertia(fn ($page) => $page->component('caption/index'));
});

test('user can generate a caption', function () {
    config(['services.gemini.key' => 'test-key']);

    Http::fake([
        'generativelanguage.googleapis.com/*' => Http::response([
            'candidates' => [
                ['content' => ['parts' => [['text' => 'Caption kopi paling enak! #kopi']]]],
            ],
        ]),
    ]);

    $user = User::factory()->create();

    $this->actingAs($user)
        ->post(route('caption.generate'), [
            'produk' => 'Kopi Gula Aren',
            'keyword' => 'promo, kekinian',
            'platform' => 'instagram',
            'tone' => 'lucu',
        ])
        ->assertRedirect();

    Http::assertSent(function ($request) {
        return str_contains($request->url(), 'generateContent')
            && $request->hasHeader('x-goog-api-key', 'test-key')
            && str_contains($request['contents'][0]['parts'][0]['text'], 'Kopi Gula Aren');
    });
});

test('caption generation validates the input', function () {
    $user = User::factory()->create();

    $this->actingAs($user)
        ->post(route('caption.generate'), [
            'produk' => '',
            'keyword' => '',
            'platform' => 'facebook',
            'tone' => 'alay',
        ])
        ->assertInvalid(['produk', 'keyword', 'platform', 'tone']);
});

test('shows an error and calls nothing when the api key is missing', function () {
    config(['services.gemini.key' => null]);
    Http::fake();

    $user = User::factory()->create();

    $this->actingAs($user)
        ->post(route('caption.generate'), [
            'produk' => 'Kopi Gula Aren',
            'keyword' => 'promo',
            'platform' => 'instagram',
            'tone' => 'formal',
        ])
        ->assertRedirect();

    Http::assertNothingSent();
});
