<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\User;
use App\Models\SaveGame;
use App\Models\Ship;
use App\Models\Item;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {

        User::factory(2)->create()->each(function($user) {
            $save = SaveGame::all()->where('online', '=',false)->random(1)->pluck('id');

            Ship::factory(rand(1, 2))->for()->for($user)->create()->each(function($ship) {
            $randomItems = Item::all()->random(rand(1, 5))->pluck('id');
            for($i=0; $i < count($randomItems); $i++) {
                $ship->items()->attach($randomItems[$i], ['amount' => fake()->numberBetween(1, 10)]);
            }
          });
        });
    }
}
