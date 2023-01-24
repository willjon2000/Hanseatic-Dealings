<?php

namespace Database\Seeders;

use App\Models\SaveGame;
use Database\Factories\SaveGameFactory;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class SaveSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        SaveGame::factory(4)->create();
    }
}
