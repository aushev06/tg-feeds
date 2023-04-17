<?php

namespace App\Providers;

use App\Http\Services\Folder\FolderService;
use App\Http\Services\Folder\FolderServiceInterface;
use Carbon\Laravel\ServiceProvider;

class BindServiceProvider extends ServiceProvider
{
    /**
     * All of the container bindings that should be registered.
     *
     * @var array
     */
    public $bindings = [
        FolderServiceInterface::class => FolderService::class,
    ];
}
