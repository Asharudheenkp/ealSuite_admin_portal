<?php

use App\Http\Controllers\CustomerController;
use App\Http\Controllers\InvoiceController;
use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::middleware(['auth', 'verified'])->group(function() {
    Route::get('/customer', [CustomerController::class, 'index'])->name('customer');
    Route::get('/customer/create', [CustomerController::class, 'create'])->name('customer.create');
    Route::get('/customer/edit/{customer}', [CustomerController::class, 'edit'])->name('customer.edit');

    Route::get('/invoice', [InvoiceController::class, 'index'])->name('invoice');
    Route::get('/invoice/create', [InvoiceController::class, 'create'])->name('invoice.create');
    Route::get('/invoice/edit/{invoice}', [InvoiceController::class, 'edit'])->name('invoice.edit');
});


Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__.'/auth.php';
