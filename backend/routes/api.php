<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\StaffMemberController;

Route::post('/staff', [StaffMemberController::class, 'store']);

Route::get('/staff', [StaffMemberController::class, 'index']);

Route::get('/staff/{id}', [StaffMemberController::class, 'show']);

Route::patch('/staff/{id}', [StaffMemberController::class, 'update']);

Route::delete('/staff/{id}', [StaffMemberController::class, 'destroy']);

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');
