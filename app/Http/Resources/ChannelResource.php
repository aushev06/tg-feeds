<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ChannelResource extends JsonResource
{
    /**
     * Transform the resource collection into an array.
     *
     * @return array<int|string, mixed>
     */
    public function toArray(Request $request): array
    {
        $tgUrl = explode('/', $this->url);

        $tgUrl = 'https://t.me/' . end($tgUrl);

        return [
            'id' => $this->id,
            'name' => $this->name,
            'url' => $this->url,
            'tgUrl' => $tgUrl,
            'last_update' => $this->last_update,
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at,
        ];
    }
}
