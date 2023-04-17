<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreFolderRequest;
use App\Http\Requests\UpdateFolderRequest;
use App\Http\Services\Folder\FolderServiceInterface;
use App\Models\Folder;
use Illuminate\Http\Request;

class FolderController extends Controller
{
    public function __construct(private readonly FolderServiceInterface $service)
    {
    }

    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        return $this->service->list(auth()->user()->id, $request->boolean('getAll'));
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreFolderRequest $request)
    {

        return $this->service->create($request->validated());
    }

    /**
     * Display the specified resource.
     */
    public function show(Folder $folder)
    {
        $this->authorize('view', $folder);
        return $this->service->show(+$folder->id);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateFolderRequest $request, Folder $folder)
    {
        $this->authorize('update', $folder);

        return $this->service->update($folder, $request->validated());
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Folder $folder)
    {
        $this->authorize('delete', $folder);

        $this->service->delete($folder);

        return response()->noContent();
    }
}
