<?php

namespace Database\Seeders;

use App\Models\Room;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use App\Models\User;
use App\Models\Project;
use App\Models\VisitorGroup;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // User::factory(10)->create();

        // User::factory()->create([
        //     'name' => 'ali',
        //     'code' => '100s',
        //     'password' => '$2y$12$ozJfrpxy/lBj0m5KMaOU9.2IIVEcOuaVmUHdB05j4s3jcTZ0fah9G',
        //     'role' => 'superAdmin'
        // ]);

        User::insert([
            'name' => 'ali',
            'code' => '100s',
            'password' => '$2y$12$ozJfrpxy/lBj0m5KMaOU9.2IIVEcOuaVmUHdB05j4s3jcTZ0fah9G',
            'role' => 'superAdmin'
        ]);

        Room::insert([
            'info' => '1',
            'status' => 'WAITING'
        ]);

        Room::insert([
            'info' => '2',
            'status' => 'WAITING'
        ]);

        Room::insert([
            'info' => '3',
            'status' => 'WAITING'
        ]);

        Project::insert([
            'room_id' => 1,
            'name' => 'khodkavi',
            'status' => 'WAITING',
            'presentations' => 0
        ]);

        Project::insert([
            'room_id' => 1,
            'name' => 'bitdeal',
            'status' => 'WAITING',
            'presentations' => 0
        ]);

        Project::insert([
            'room_id' => 2,
            'name' => 'salamat',
            'status' => 'WAITING',
            'presentations' => 0
        ]);

        VisitorGroup::insert([
            'school_name' => 'sina',
            'gender' => 'male',
            'number' => '20',
            'status' => 'on',
        ]);

        VisitorGroup::insert([
            'school_name' => 'farzanegan',
            'gender' => 'female',
            'number' => '15',
            'status' => 'off',
        ]);
    }
}
