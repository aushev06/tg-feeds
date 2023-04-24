<?php

namespace App\Http\Services\Feed;

use App\Http\Interfaces\CRUDServiceInterface;
use Illuminate\Http\Request;

interface FeedServiceInterface extends CRUDServiceInterface
{
    public function listByFolder(int $folderId);
}
