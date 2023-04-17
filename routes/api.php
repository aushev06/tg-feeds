<?php

use App\Http\Controllers\ChannelController;
use App\Http\Controllers\FeedController;
use App\Http\Controllers\FolderController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});


Route::group(['middleware' => 'auth:sanctum'], function () {
    Route::apiResource('folders', FolderController::class);
    Route::apiResource('channels', ChannelController::class);
    Route::apiResource('feeds', FeedController::class);
});


Route::get('/test', function () {
    $user = \App\Models\User::query()->first();
    $token = $user->createToken('noname', [])->plainTextToken;

    return $token;
});
