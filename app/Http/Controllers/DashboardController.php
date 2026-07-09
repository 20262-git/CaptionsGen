<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class DashboardController extends Controller
{
    /**
     * Show the dashboard with a summary of the user's content.
     */
    public function __invoke(Request $request): Response
    {
        $agendas = $request->user()->agendas();

        return Inertia::render('dashboard', [
            'stats' => [
                'total' => (clone $agendas)->count(),
                'terjadwal' => (clone $agendas)->where('status', 'terjadwal')->count(),
                'draft' => (clone $agendas)->where('status', 'draft')->count(),
                'terkirim' => (clone $agendas)->where('status', 'terkirim')->count(),
            ],
            'upcoming' => (clone $agendas)
                ->whereDate('tanggal', '>=', today())
                ->where('status', 'terjadwal')
                ->orderBy('tanggal')
                ->limit(5)
                ->get(),
            'recent' => (clone $agendas)
                ->latest()
                ->limit(4)
                ->get(),
        ]);
    }
}
