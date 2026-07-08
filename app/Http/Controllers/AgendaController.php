<?php

namespace App\Http\Controllers;

use App\Http\Requests\AgendaRequest;
use App\Models\Agenda;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class AgendaController extends Controller
{
    /**
     * Show the posting calendar with the user's agendas.
     */
    public function index(Request $request): Response
    {
        return Inertia::render('agenda/index', [
            'agendas' => $request->user()->agendas()
                ->orderBy('tanggal')
                ->get(),
        ]);
    }

    /**
     * Store a newly created agenda.
     */
    public function store(AgendaRequest $request): RedirectResponse
    {
        $request->user()->agendas()->create($request->validated());

        Inertia::flash('toast', ['type' => 'success', 'message' => 'Jadwal ditambahkan.']);

        return to_route('agenda.index');
    }

    /**
     * Update the given agenda.
     */
    public function update(AgendaRequest $request, Agenda $agenda): RedirectResponse
    {
        abort_unless($agenda->user_id === $request->user()->id, 403);

        $agenda->update($request->validated());

        Inertia::flash('toast', ['type' => 'success', 'message' => 'Jadwal diperbarui.']);

        return to_route('agenda.index');
    }

    /**
     * Delete the given agenda.
     */
    public function destroy(Request $request, Agenda $agenda): RedirectResponse
    {
        abort_unless($agenda->user_id === $request->user()->id, 403);

        $agenda->delete();

        Inertia::flash('toast', ['type' => 'success', 'message' => 'Jadwal dihapus.']);

        return to_route('agenda.index');
    }
}
