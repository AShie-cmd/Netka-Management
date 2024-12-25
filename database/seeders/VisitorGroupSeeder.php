<?php

namespace Database\Seeders;

use App\Models\VisitorGroup;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class VisitorGroupSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
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
