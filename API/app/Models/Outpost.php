<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Outpost extends Model
{
    use HasFactory;

    protected $fillable = [
      'name'
    ];

    public function items(): BelongsToMany
    {
        return $this->belongsToMany(Item::class,'outpost_items','outpostID','itemID')->withPivot('amount', 'producer','saveGameID');
    }

    public function ships(): HasMany
    {
        return $this->hasMany(Ship::class, 'outpostID');
    }
}
