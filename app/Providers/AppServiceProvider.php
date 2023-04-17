<?php

namespace App\Providers;

use App\Http\Services\Channel\ChannelService;
use App\Http\Services\Channel\ChannelServiceInterface;
use App\Http\Services\Feed\FeedService;
use App\Http\Services\Feed\FeedServiceInterface;
use App\Http\Services\Folder\FolderService;
use App\Http\Services\Folder\FolderServiceInterface;
use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    /**
     * All of the container bindings that should be registered.
     *
     * @var array
     */
    public $bindings = [
        FolderServiceInterface::class => FolderService::class,
        ChannelServiceInterface::class => ChannelService::class,
        FeedServiceInterface::class => FeedService::class,
    ];


    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        //
    }
}
