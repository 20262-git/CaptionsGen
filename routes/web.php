<?php

use App\Http\Controllers\AgendaController;
use App\Http\Controllers\CaptionController;
use Illuminate\Support\Facades\Route;

Route::inertia('/', 'welcome')->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::inertia('dashboard', 'dashboard')->name('dashboard');

    Route::resource('agenda', AgendaController::class)->only(['index', 'store', 'update', 'destroy']);

    Route::get('caption', [CaptionController::class, 'index'])->name('caption.index');
    Route::post('caption', [CaptionController::class, 'generate'])->name('caption.generate');
});

require __DIR__.'/settings.php';
