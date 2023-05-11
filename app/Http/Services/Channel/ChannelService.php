<?php

namespace App\Http\Services\Channel;

use App\Models\Channel;
use App\Models\Folder;
use App\Models\User;
use Exception;
use GuzzleHttp\Client;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;

class ChannelService implements ChannelServiceInterface
{

    public function list(int $userId, bool $getAll = false)
    {
        return Channel::query()
            ->join(
                table: 'channel_user',
                first: 'channel_user.channel_id',
                operator: '=',
                second: 'channels.id',
                where: function ($builder) use ($userId) {
                    return $builder->where('user_id', '=', $userId);
                })
            ->get();
    }

    public function show(int $id): Channel
    {
        return Channel::whereId($id)->first();
    }

    public function create(array $data)
    {
        if (!empty($data['icon'])) {
            $path = 'public/icons/' . time() . '.jpg';
            $this->downloadIconFromTelegramAndSaveInStorage($data['icon'], $path);
            $data['icon'] = str_replace('public/', '', $path);
        }


        return Channel::query()->firstOrCreate(['url' => $data['url']], $data);
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
            'icon' => $data['icon'] ?? '',
        ];

        $channel = $this->create($saveData);

        if (!$user->channels()
            ->where('channel_id', $channel->id)
            ->where('folder_id', $data['folder_id'])
            ->exists()
        ) {
            $user->channels()->attach($channel->id, [
                'folder_id' => $data['folder_id'],
            ]);
        }


        return $channel;
    }

    private function downloadIconFromTelegramAndSaveInStorage(string $iconUrl, string $path)
    {
        Storage::disk()->put($path, file_get_contents($iconUrl));
    }

    public function detachChannelFromFolder(int $channelId, int $folderId)
    {
        /**
         * @var Folder $folder
         */
        $folder = Folder::query()->whereId($folderId)->firstOrFail();

        $folder->channels()->detach([$channelId]);
    }
}
