<?php

namespace App\Http\Controllers;

use App\Http\Requests\CaptionRequest;
use App\Services\GeminiService;
use Illuminate\Http\RedirectResponse;
use Inertia\Inertia;
use Inertia\Response;
use RuntimeException;

class CaptionController extends Controller
{
    /**
     * Show the caption generator form.
     */
    public function index(): Response
    {
        return Inertia::render('caption/index');
    }

    /**
     * Generate a caption from the form input using Gemini.
     */
    public function generate(CaptionRequest $request, GeminiService $gemini): RedirectResponse
    {
        $data = $request->validated();

        try {
            $caption = $gemini->generateCaption(
                $data['produk'],
                $data['keyword'],
                $data['platform'],
                $data['tone'],
            );
        } catch (RuntimeException $e) {
            Inertia::flash('toast', ['type' => 'error', 'message' => $e->getMessage()]);

            return back();
        }

        Inertia::flash('caption', $caption);

        return back();
    }
}
