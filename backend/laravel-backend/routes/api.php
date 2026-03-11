<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\SessionController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
| Stateless API pro frontend aplikaci
|--------------------------------------------------------------------------
*/
Route::post('/session/start', [SessionController::class, 'start']);
Route::post('/session/end', [SessionController::class, 'end']);
Route::post('/session/heartbeat', [SessionController::class, 'heartbeat']);
Route::get('/leaderboard', [SessionController::class, 'getLeaderboard']);
Route::post('/user/login',[\app\Http\Controllers\UserController::class,'login']);
