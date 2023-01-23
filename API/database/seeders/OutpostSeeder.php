<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Outpost;
use App\Models\Item;

class OutpostSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        Outpost::factory(24)->create()->each(function($outpost) {
            $randomItems = Item::all()->random(rand(4,17))->pluck('id');
            for($i=0; $i < count($randomItems); $i++) { 
                $producer = fake()->boolean();
                $outpost->items()->attach($randomItems[$i], ['producer' => $producer, 'amount' => $producer ? fake()->numberBetween(10, 70) : fake()->numberBetween(120, 200)]);
            }
        });
    }
}
