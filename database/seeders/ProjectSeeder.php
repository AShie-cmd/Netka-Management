<?php

namespace Database\Seeders;

use App\Models\Project;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class ProjectSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
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
    }
}
