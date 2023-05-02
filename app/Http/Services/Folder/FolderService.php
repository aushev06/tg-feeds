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

        return Folder::query()->create($data);
    }

    /**
     * @param Folder $model
     * @param array $data
     * @return Model
     */
    public function update(Model $model, array $data)
    {
        $model->update($data);
        
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
