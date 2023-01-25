<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/
Route::post('register',[\App\Http\Controllers\auth\LoginController::class,'register']);
Route::post('login',[\App\Http\Controllers\auth\LoginController::class, 'login']);

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::middleware('auth:sanctum')->get('/user/{id}/ships',[\App\Http\Controllers\UserShipController::class, 'show']);

Route::middleware('auth:sanctum')->get('/saves',[\App\Http\Controllers\SaveController::class, 'index']);

Route::middleware('auth:sanctum')->post('/ships',[\App\Http\Controllers\ShipController::class, 'create']);
Route::middleware('auth:sanctum')->get('/ship/{id}',[\App\Http\Controllers\ShipController::class, 'show']);
Route::middleware('auth:sanctum')->get('/ship/{id}/items',[\App\Http\Controllers\ShipItemController::class, 'show']);

Route::middleware('auth:sanctum')->get('/items',[\App\Http\Controllers\ItemController::class, 'index']);

Route::middleware('auth:sanctum')->get('/outposts',[\App\Http\Controllers\OutpostController::class, 'index']);
Route::middleware('auth:sanctum')->get('/outpost/{id}/items',[\App\Http\Controllers\OutpostItemController::class, 'show']);
Route::middleware('auth:sanctum')->post('/outpost/{id}/item/{item_id}/buy',[\App\Http\Controllers\OutpostItemController::class, 'buy']);
Route::middleware('auth:sanctum')->post('/outpost/{id}/item/{item_id}/sell',[\App\Http\Controllers\OutpostItemController::class, 'sell']);