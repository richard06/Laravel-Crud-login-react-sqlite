<?php

use App\Http\Controllers\AutosController;
use App\Http\Controllers\FotografiasController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');
    Route::get('/fotografias', [FotografiasController::class, 'index'])->name('fotografia.index');
    Route::post('/fotografias', [FotografiasController::class, 'almacen'])->name('fotografias.almacen');
    Route::get('/fotografias/create', [FotografiasController::class, 'create'])->name('fotografias.create');
    Route::get('/fotografias/{fotografia}/edit', [FotografiasController::class, 'edit'])->name('fotografias.edit');
    Route::put('/fotografias/{fotografia}', [FotografiasController::class, 'update'])->name('fotografias.update');
    Route::delete('/fotografias/{fotografia}', [FotografiasController::class, 'destruir'])->name('fotografias.destruir');


    Route::get('/autos', [AutosController::class, 'index'])->name('autos.index');
    Route::get('autos/create', [AutosController::class, 'create'])->name('autos.create');

});

require __DIR__ . '/settings.php';
require __DIR__ . '/auth.php';
