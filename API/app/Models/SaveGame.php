<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class SaveGame extends Model
{
    use HasFactory;

    protected $fillable =  [
        'name',
        'online',
        'timeInGame'
    ];

    public function ships(): HasMany
    {
        return $this->hasMany(Ship::class);
    }
}

