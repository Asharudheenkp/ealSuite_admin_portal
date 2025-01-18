<?php

use App\Http\Controllers\Api\UserController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::post('/get/data/{type}', [UserController::class, 'getData'])->name('get.data');
Route::post('/create/data/{type}', [UserController::class, 'createData'])->name('create.data');
Route::post('/edit/data/{type}/{id}', [UserController::class, 'editData'])->name('create.data');



Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');
