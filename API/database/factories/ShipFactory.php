<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Ship>
 */
class ShipFactory extends Factory
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
            'capacity' => fake()->numberBetween(200, 300),
            'coins' => fake()->numberBetween(500, 1000),
            'arrivalTime' => fake()->dateTimeBetween(0, 0)
        ];
    }
}
