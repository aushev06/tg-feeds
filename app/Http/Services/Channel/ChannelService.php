<?php

namespace App\Http\Services\Channel;

use App\Models\Channel;
use App\Models\User;
use Exception;
use GuzzleHttp\Client;
use Illuminate\Database\Eloquent\Model;

class ChannelService implements ChannelServiceInterface
{

    public function list(int $userId, bool $getAll = false)
    {
        // TODO: Implement list() method.
    }

    public function show(int $id): Channel
    {
        return Channel::whereId($id)->first();
    }

    public function create(array $data)
    {
        return Channel::query()->firstOrCreate($data);
    }

    public function update(Model $model, array $data)
    {
        throw new Exception('Нельзя редактировать канал');
    }

    public function delete(Model $model)
    {
        // TODO: Implement delete() method.
    }

    public function createChannelAndAttachToUser(array $data, User $user)
    {
        $saveData = [
            'name' => $data['name'],
            'url' => $data['url'],
        ];

        $channel = $this->create($saveData);
        $user->channels()->attach($channel->id, [
            'folder_id' => $data['folder_id'],
        ]);


        return $channel;
    }
}
