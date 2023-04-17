<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreFeedRequest;
use App\Http\Requests\UpdateFeedRequest;
use App\Http\Resources\FeedResource;
use App\Http\Resources\FeedResourceCollection;
use App\Http\Services\Feed\FeedServiceInterface;
use App\Models\Feed;
use Illuminate\Http\Request;

class FeedController extends Controller
{
    public function __construct(private readonly FeedServiceInterface $service)
    {
    }

    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        return new FeedResourceCollection($request->folderId ?  $this->service->listByFolder(request()) : $this->service->list(auth()->user()->id));
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreFeedRequest $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(Feed $feed)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Feed $feed)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateFeedRequest $request, Feed $feed)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Feed $feed)
    {
        //
    }
}
