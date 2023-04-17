<?php

namespace App\Http\Services\Folder;

use App\Http\Services\Channel\ChannelServiceInterface;
use App\Models\Folder;
use Illuminate\Database\Eloquent\Model;

class FolderService implements FolderServiceInterface
{

    public function create(array $data)
    {
        $icon = '';

        if (isset($data['icon'])) {
            $icon = $data['icon']->store('icons');
        }

        $data['icon'] = $icon;

        return Folder::query()->create($data);
    }

    public function update(Model $model, array $data)
    {
        $model->update($data);

        return $model->refresh();
    }

    public function list(int $userId, bool $getAll = false)
    {
        return Folder::query()
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

    public function delete(Model $model)
    {
        return $model->delete();
    }
}