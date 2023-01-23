<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Item>
 */
class ItemFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition()
    {
        return [
            'name' => fake()->unique()->randomElement(['beer', 'bricks', 'cloth', 'fish', 'grain', 'hemp', 'honey', 'iron', 'leather', 'meat', 'pig iron', 'pitch', 'pottery', 'salt', 'skins', 'spices', 'timber', 'whale oil', 'wine', 'wool']),
            'price' => fake()->numberBetween(100, 900)
        ];
    }
}
