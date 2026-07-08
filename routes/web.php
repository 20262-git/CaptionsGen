<?php

use App\Http\Controllers\AgendaController;
use Illuminate\Support\Facades\Route;

Route::inertia('/', 'welcome')->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::inertia('dashboard', 'dashboard')->name('dashboard');

    Route::resource('agenda', AgendaController::class)->only(['index', 'store', 'update', 'destroy']);
});

require __DIR__.'/settings.php';
