<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class TradeHistory extends Model
{
    use HasFactory;

    Protected $fillable = [
       'pricePerItem',
        'sellPricePerItem'
    ];

    public function ship(): BelongsTo
    {
        return $this->BelongsTo(Ship::class, 'shipID');
    }
}
