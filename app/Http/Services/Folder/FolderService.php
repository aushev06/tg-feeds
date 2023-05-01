<?php

namespace App\Http\Services\Folder;

use App\Http\Services\Channel\ChannelServiceInterface;
use App\Models\Folder;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\DB;

class FolderService implements FolderServiceInterface
{

    public function create(array $data)
    {
        $icon = '';

        if (isset($data['icon'])) {
            $icon = str_replace('public/', '', $data['icon']->store('public/icons'));
        }

        $data['icon'] = $icon;

        $folder = Folder::query()->create($data);

        /**
         * @var ChannelServiceInterface $channelService
         */
        $channelService = app(ChannelServiceInterface::class);

        foreach ($data['channels'] as $channel) {
            $channel['folder_id'] = $folder->id;
            $channelService->createChannelAndAttachToUser($channel, auth()->user());
        }

        return $folder;
    }

    /**
     * @param Folder $model
     * @param array $data
     * @return Model
     */
    public function update(Model $model, array $data)
    {
        $model->update($data);


        /**
         * @var ChannelServiceInterface $channelService
         */
        $channelService = app(ChannelServiceInterface::class);

        $channelIds = [];

        foreach ($data['channels'] as $channel) {
            $channel['folder_id'] = $model->id;
            $channelIds[] = $channelService->createChannelAndAttachToUser($channel, auth()->user())->id;
        }

        $model->channels()->sync($channelIds);

        return $model->refresh();
    }

    public function list(int $userId, bool $getAll = false)
    {
        return Folder::query()
            ->with(['channels'])
            ->whereUserId($userId)
            ->paginate();
    }

    /**
     * @param int $id
     * @return Folder
     */
    public function show(int $id): Folder
    {
        return Folder::query()->where(['id' => $id])->first();
    }

    /**
     * @param Folder $model
     */
    public function delete(Model $model)
    {
        $model->channels()->sync([]);

        return $model->delete();
    }
}
