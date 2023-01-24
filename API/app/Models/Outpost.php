<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

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
}
