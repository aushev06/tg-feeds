<?php

namespace App\Http\Services\Feed;

use App\Http\Services\Folder\FolderServiceInterface;
use App\Models\Channel;
use App\Models\Feed;
use App\Models\Folder;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Validation\ValidationException;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;

class FeedService implements FeedServiceInterface
{


    public function listByFolder(int $folderId)
    {
        /**
         * @var FolderServiceInterface $folderService
         */
        $folderService = app(FolderServiceInterface::class);

        /**
         * @var Folder $folder
         */
        $folder = $folderService->show(intval($folderId));

        if ($folder->user_id !== auth()->user()->id) {
            abort(403);
        }


        if (!$folder) {
            throw new NotFoundHttpException('Такой папки нет');
        }

        $channelIds = $folder->channels()->get()->map(fn(Channel $channel) => $channel->id);

        return Feed::query()->whereIn('channel_id', $channelIds)
            ->orderBy('pub_date', 'DESC')
            ->paginate();
    }

    public function list(int $userId, bool $getAll = false)
    {
        $channelIds = DB::query()
            ->distinct()
            ->select(['channel_id'])
            ->from('channel_user')
            ->where('user_id', $userId)
            ->get()
            ->map(fn($item) => $item->channel_id)
            ->toArray();


        return Feed::query()->whereIn('channel_id', $channelIds)
            ->orderBy('pub_date', 'DESC')
            ->paginate();
    }

    public function show(int $id): Model
    {
        // TODO: Implement show() method.
    }

    public function create(array $data)
    {
        // TODO: Implement create() method.
    }

    public function update(Model $model, array $data)
    {
        // TODO: Implement update() method.
    }

    public function delete(Model $model)
    {
        // TODO: Implement delete() method.
    }
}
