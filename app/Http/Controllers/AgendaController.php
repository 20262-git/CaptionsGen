<?php

namespace App\Http\Controllers;

use App\Http\Requests\AgendaRequest;
use App\Models\Agenda;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
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
        $agenda = $request->user()->agendas()->create($request->validated());

        $this->syncMedia($request, $agenda);

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

        $this->syncMedia($request, $agenda);

        Inertia::flash('toast', ['type' => 'success', 'message' => 'Jadwal diperbarui.']);

        return to_route('agenda.index');
    }

    /**
     * Delete the given agenda.
     */
    public function destroy(Request $request, Agenda $agenda): RedirectResponse
    {
        abort_unless($agenda->user_id === $request->user()->id, 403);

        if ($agenda->media_path) {
            Storage::disk('public')->delete($agenda->media_path);
        }

        $agenda->delete();

        Inertia::flash('toast', ['type' => 'success', 'message' => 'Jadwal dihapus.']);

        return to_route('agenda.index');
    }

    /**
     * Store an uploaded thumbnail, or remove the existing one when requested.
     */
    private function syncMedia(AgendaRequest $request, Agenda $agenda): void
    {
        if (! $request->hasFile('media') && ! $request->boolean('hapus_media')) {
            return;
        }

        if ($agenda->media_path) {
            Storage::disk('public')->delete($agenda->media_path);
        }

        if ($file = $request->file('media')) {
            $agenda->update([
                'media_path' => $file->store('agendas', 'public'),
                'media_type' => str_starts_with((string) $file->getMimeType(), 'video/') ? 'video' : 'image',
            ]);

            return;
        }

        $agenda->update(['media_path' => null, 'media_type' => null]);
    }
}
