<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreChannelRequest;
use App\Http\Requests\UpdateChannelRequest;
use App\Http\Resources\ChannelResource;
use App\Http\Resources\ChannelResourceCollection;
use App\Http\Services\Channel\ChannelServiceInterface;
use App\Models\Channel;
use Illuminate\Http\Request;

class ChannelController extends Controller
{
    public function __construct(private readonly ChannelServiceInterface $service)
    {
    }

    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        return new ChannelResourceCollection($this->service->list($request->user()->id, $request->boolean('getAll')));
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreChannelRequest $request)
    {
        return new ChannelResource($this->service->createChannelAndAttachToUser($request->validated(), auth()->user()));
    }

    /**
     * Display the specified resource.
     */
    public function show(Channel $channel)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Channel $channel)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateChannelRequest $request, Channel $channel)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Channel $channel, Request $request)
    {
        $this->service->detachChannelFromFolder($channel->id, $request->folderId);
    }
}
