<?php

use App\Http\Controllers\PostController;
use Illuminate\Support\Facades\Route;

Route::get('/posts', [PostController::class, 'index']);
Route::get('/posts/{id}', [PostController::class, 'show']);

Route::middleware('auth:sanctum')->group(function () {
    Route::get('/posts/create', [PostController::class, 'create']);
    Route::post('/posts/store', [PostController::class, 'store']);
    Route::middleware('can:update,post')->group(function () {
        Route::get('/posts/{id}/edit', [PostController::class, 'edit']);
        Route::put('/posts/{id}', [PostController::class, 'update']);
    });
    Route::middleware('can:delete,post')->delete('/posts/{id}', [PostController::class, 'destroy']);

});
