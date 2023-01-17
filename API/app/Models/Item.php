<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

class Item extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'price',
    ];

    public function outposts(): BelongsToMany
    {
        return $this->belongsToMany(Outpost::class,'outpost_items','itemID','outpostID');
    }

    public function ships(): BelongsToMany
    {
        return $this->belongsToMany(Ship::class,'ship_items','itemID','shipID');
    }

}
