<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\SaveGame>
 */
class SaveGameFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition()
    {
        return [
            'name' => fake()->unique()->name(),
            'online' => fake()->randomElement([true, true, true, true]),
            'timeInGame' => fake()->dateTimeBetween(100,900)
        ];
    }
}
