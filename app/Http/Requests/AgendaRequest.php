<?php

namespace App\Http\Requests;

use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class AgendaRequest extends FormRequest
{
    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'judul' => ['required', 'string', 'max:255'],
            'caption' => ['nullable', 'string', 'max:2000'],
            'platform' => ['required', Rule::in(['instagram', 'tiktok'])],
            'status' => ['required', Rule::in(['terjadwal', 'draft', 'terkirim'])],
            'tanggal' => ['required', 'date'],
        ];
    }
}
