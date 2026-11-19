<?php

use App\Http\Controllers\TaskController;
use App\Models\Task;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function (Request $request) {
    return Inertia::render('welcome', [
        'tasks' => Task::query()->latest()->get(),
    ]);
})->name('home');
Route::inertia('/a-propos', 'about')->name('about');

Route::resource('tasks', TaskController::class)->only([
    'create',
    'store',
    'show',
    'edit',
    'update',
    'destroy',
]);

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', [TaskController::class, 'index'])->name('dashboard');
});

require __DIR__.'/settings.php';
