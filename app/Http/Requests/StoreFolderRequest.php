<?php

namespace App\Http\Requests;

use GuzzleHttp\Client;
use Illuminate\Contracts\Validation\Rule;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\ValidationException;
use Throwable;

class StoreFolderRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, Rule|array|string>
     */
    public function rules(): array
    {
        return [
            'name' => [
                'required'
            ],
            'user_id' => [
                'required'
            ],
            'icon' => [
                'file',
                'nullable'
            ]
        ];
    }

    protected function prepareForValidation()
    {

        $this->merge([
            'user_id' => $this->user()->id,
        ]);
    }
}
