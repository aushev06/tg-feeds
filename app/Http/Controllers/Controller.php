<?php

namespace App\Http\Controllers;

use App\Http\Resources\FeedResourceCollection;
use App\Http\Services\Feed\FeedServiceInterface;
use App\Models\Folder;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Illuminate\Foundation\Validation\ValidatesRequests;
use Illuminate\Http\Request;
use Illuminate\Routing\Controller as BaseController;
use Inertia\Inertia;

class Controller extends BaseController
{
    use AuthorizesRequests, ValidatesRequests;

    public function category(Folder $folder, FeedServiceInterface $feedService)
    {
        return Inertia::render('Category', [
            'category' => $folder,
            'feeds' => new FeedResourceCollection($feedService->listByFolder($folder->id)),
        ]);
    }
}
