<?php

namespace App\Http\Services\Channel;

use App\Http\Interfaces\CRUDServiceInterface;
use App\Models\Channel;
use App\Models\User;

interface ChannelServiceInterface extends CRUDServiceInterface
{
    public function createChannelAndAttachToUser(array $data, User $user);

    public function detachChannelFromFolder(int $channelId, int $folderId);
}
