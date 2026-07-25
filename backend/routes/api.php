<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\StaffMemberController;
use App\Http\Controllers\ShiftController;



Route::get('/staff', [StaffMemberController::class, 'index']);
Route::get('/staff/{id}', [StaffMemberController::class, 'show']);
Route::post('/staff', [StaffMemberController::class, 'store']);
Route::patch('/staff/{id}', [StaffMemberController::class, 'update']);
Route::delete('/staff/{id}', [StaffMemberController::class, 'destroy']);


Route::get('/shifts', [ShiftController::class, 'index']);
Route::get('/shifts/{id}', [ShiftController::class, 'show']);
Route::post('/shifts', [ShiftController::class, 'store']);
Route::patch('/shifts/{id}', [ShiftController::class, 'update']);
Route::delete('/shifts/{id}', [ShiftController::class, 'destroy']);

