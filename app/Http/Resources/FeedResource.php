<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class FeedResource extends JsonResource
{
    /**
     * Transform the resource collection into an array.
     *
     * @return array<int|string, mixed>
     */
    public function toArray(Request $request): array
    {
        $folder = $this->channel->folders()
            ->where('channel_id', $this->channel_id)
            ->where('channel_user.user_id', $request->user()->id)
            ->first();


        return [
            'id' => $this->id,
            'title' => strlen($this->title) > 100 ? mb_substr($this->title, 0, 100) . '...' : $this->title,
            'description' => $this->description,
            'image' => $this->image,
            'channel' => $this->channel,
            'category' => $folder,
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at,
            'pub_date' => $this->pub_date,
            'link' => $this->link,
        ];
    }
}
