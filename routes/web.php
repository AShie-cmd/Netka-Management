<?php

use App\Http\Controllers\ManagementController;
use App\Http\Controllers\MapController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\ProjectController;
use App\Http\Controllers\VisitorGroupController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

//Route::get('/', function () {
//    return Inertia::render('Welcome', [
//        'canLogin' => Route::has('login'),
//        'canRegister' => false,
//        'laravelVersion' => Application::VERSION,
//        'phpVersion' => PHP_VERSION,
//    ]);
//});

Route::get('/', function () {
    return Inertia::render('dashboard/Dashboard');
})->middleware(middleware: 'auth')->name('dashboard');

Route::get('/map', [MapController::class, 'index'])->middleware(middleware: 'auth')->name(name: 'map');
Route::get('/map/project/{id}', [MapController::class, 'getProject']);
Route::get('/map/projects', [MapController::class, 'getProjects']);

Route::middleware('auth')->group(function () {
    Route::get('/management', [ManagementController::class, 'index'])->name('management');
    Route::post('/management/groups', [ManagementController::class, 'storeGroups'])->name('management.leaders.add');
    Route::post('/management/groups/{id}', [ManagementController::class, 'updateGroups'])->name('management.leaders.add');
    Route::post('/management/groups/delete/{id}', [ManagementController::class, 'deleteGroups'])->name('management.leaders.remove');
    Route::get('/management/groups/{id}', [ManagementController::class, 'show'])->name('management.show');
    Route::get('/management/getAllFreeLeaders/{leaderId?}', [ManagementController::class, 'getAllFreeLeaders']);

    Route::prefix('/management/projects')->group(function () {
        Route::get('/', [ProjectController::class, 'index']);
        Route::get('/rooms/{id}', [ProjectController::class, 'roomProjects']);
        Route::get('/megaRoomsWithGroups/{id}', [ProjectController::class, 'getMegaRoomWithGroups']);
        Route::get('/megaRooms/{id}', [ProjectController::class, 'getMegaRoom']);
        Route::get('/groups/{id}', [ProjectController::class, 'showGroup']);
        Route::post('/set/{groupId}/{roomId}/{projectId}', [ProjectController::class, 'store']);
        Route::post('/setOnMegaRoom/{groupId}/{megaRoomId}', [ProjectController::class, 'storeOnMegaRoom']);
        Route::post('/unset/{groupId}', action: [ProjectController::class, 'unset']);
    });
});

//Route::get('/dashboard', function () {
//    return Inertia::render('Dashboard');
//})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

// Route::get('/test/{id}/{newProjectId?}', [VisitorGroupController::class, 'changeGroupsProject']);

require __DIR__ . '/auth.php';
