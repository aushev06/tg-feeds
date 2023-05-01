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
            'channels' => [
                'array',
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
        $errorMessages = [];
        $channels = [];

        $client = new Client();


        foreach ($this->channels ?? [] as $key => $channel) {
            try {
                $explodeUrl = explode('/', $channel);
                $url = 'https://rsshub.app/telegram/channel/' . last($explodeUrl);

                $response = $client->get($url, ['timeout' => 1]);
                $result = simplexml_load_string($response->getBody()->getContents());

                $channels[] = [
                    'name' => (string)$result->channel->title,
                    'icon' => (string)$result->channel->image->url,
                    'url' => $url
                ];
            } catch (Throwable $exception) {
                $errorMessages['channels.' . $key] = __('Невалидная ссылка');
            }
        }

        if (sizeof($errorMessages)) {
            throw ValidationException::withMessages($errorMessages);
        }


        $this->merge([
            'user_id' => $this->user()->id,
            'channels' => $channels,
        ]);
    }
}
