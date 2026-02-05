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

Route::prefix('overlay')->group(function () {

    // start sledování videa
    Route::post('/start', [SessionController::class, 'start']);

    // konec sledování videa
    Route::post('/end', [SessionController::class, 'end']);

});