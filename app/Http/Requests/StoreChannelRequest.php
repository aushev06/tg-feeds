<?php

namespace App\Http\Requests;

use GuzzleHttp\Client;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\ValidationException;

class StoreChannelRequest extends FormRequest
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
     * @return array<string, \Illuminate\Contracts\Validation\Rule|array|string>
     */
    public function rules(): array
    {
        return [
            'url' => [
                'required'
            ],
            'name' => [
                'required'
            ],
            'folder_id' => [
                'required'
            ]
        ];
    }

    protected function prepareForValidation()
    {
        try {
            $client = new Client();

            $response = $client->get($this->url, ['timeout' => 1]);
            $result = simplexml_load_string($response->getBody()->getContents());

            return $this->merge([
                'name' => (string)$result->channel->title
            ]);
        } catch (\Throwable $exception) {
            throw ValidationException::withMessages(['url' => __('Невалидная ссылка')]);
        }
    }
}
