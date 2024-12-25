<?php

namespace Database\Seeders;

use App\Models\Room;
use Illuminate\Database\Seeder;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;

class RoomSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
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
    }
}
