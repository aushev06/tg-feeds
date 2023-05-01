<?php

use App\Http\Controllers\ChannelController;
use App\Http\Controllers\FeedController;
use App\Http\Controllers\FolderController;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Route;
use Illuminate\Validation\ValidationException;

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


Route::middleware('auth:sanctum')->delete('/user', function (Request $request) {
    return User::query()->where('id', $request->user()->id)->delete();
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


Route::post('register', [\App\Http\Controllers\Auth\RegisteredUserController::class, 'storeApi']);
Route::post('/token', function (Request $request) {
    $request->validate([
        'email' => 'required|email',
        'password' => 'required',
        'device_name' => 'required',
    ]);

    $user = User::where('email', $request->email)->first();

    if (!$user || !Hash::check($request->password, $user->password)) {
        throw ValidationException::withMessages([
            'email' => ['The provided credentials are incorrect.'],
        ]);
    }

    return $user->createToken($request->device_name)->plainTextToken;
});
