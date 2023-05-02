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
            ],

            'icon' => [
                'nullable'
            ]
        ];
    }

    protected function prepareForValidation()
    {
        try {
            $explodeUrl = explode('/', $this->url);
            $url = 'https://rsshub.app/telegram/channel/' . last($explodeUrl);


            $client = new Client();

            $response = $client->get($url, ['timeout' => 1]);
            $result = simplexml_load_string($response->getBody()->getContents());

            return $this->merge([
                'name' => (string)$result->channel->title,
                'icon' => (string)$result->channel->image->url,
                'url' => $url
            ]);
        } catch (\Throwable $exception) {
            throw ValidationException::withMessages(['url' => __('Невалидная ссылка')]);
        }
    }
}
