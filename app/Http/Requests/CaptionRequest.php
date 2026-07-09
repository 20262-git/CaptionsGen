<?php

namespace App\Http\Requests;

use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class CaptionRequest extends FormRequest
{
    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'produk' => ['required', 'string', 'max:255'],
            'keyword' => ['required', 'string', 'max:255'],
            'platform' => ['required', Rule::in(['instagram', 'tiktok'])],
            'tone' => ['required', Rule::in(['lucu', 'formal', 'estetik'])],
        ];
    }
}
