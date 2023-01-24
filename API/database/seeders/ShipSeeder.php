<?php

namespace Database\Seeders;

use App\Models\SaveGame;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Ship;
use App\Models\User;
use App\Models\Item;

class ShipSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
      /*  $users = User::all()->pluck('id');
        $saves = SaveGame::all()->where('online', '=',true)->pluck('id');


        for($ii=0; $ii < count($users); $ii++) {
            Ship::factory()->for(SaveGame::factory())->for(User::factory())->create()->each(function($ship) {
            $randomItems = Item::all()->random(raind(1, 5))->pluck('id');
                for($i=0; $i < count($randomItems); $i++) {
                    $ship->items()->attach( $randomItems[$i], ['amount' => fake()->numberBetween(1, 10)]);
                }

            });
        }*/
    }
}
