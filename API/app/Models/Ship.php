<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

class Ship extends Model
{
    use HasFactory;

    protected $fillable = [
      'name',
      'capacity',
      'coins'
    ];

    public function user(): BelongsTo
    {
        return  $this->belongsTo(Ship::class);
    }

    public function items(): BelongsToMany
    {
        return $this->belongsToMany(Item::class,'ship_items','shipID','itemID');
    }
}
