<?php

namespace App\Http\Controllers;
use App\Models\Ship;

use Illuminate\Http\Request;

function price($lvl) {
    switch ($lvl) {
        case 1:
            return [ 'lvl' => 2, 'price' => 1000 ];
        case 2:
            return [ 'lvl' => 3, 'price' => 2000 ];
        case 3:
            return [ 'lvl' => 4, 'price' => 4000 ];
        case 4:
            return [ 'lvl' => 5, 'price' => 6000 ];
        case 5:
            return [ 'lvl' => 6, 'price' => 8000 ];
        case 6:
            return [ 'lvl' => 7, 'price' => 9000 ];
        case 7:
            return [ 'lvl' => 8, 'price' => 11000 ];
        case 8:
            return [ 'lvl' => 9, 'price' => 13000 ];
        case 9:
            return [ 'lvl' => 10, 'price' => 15000 ];
        default:
            return [ 'lvl' => 10, 'price' => 0 ];
    }
}

class ShipUpgradeController extends Controller
{
    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function view(Request $request, $id)
    {
        $ship = Ship::find($id);

        if($request->user()->id != $ship->userID)
            return response([
                'message' => 'You do not have access to performe this action'
            ], Response::HTTP_UNAUTHORIZED);
        
        return response(price($ship->lvl));
    }
    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        $ship = Ship::find($id);

        if($request->user()->id != $ship->userID)
            return response([
                'message' => 'You do not have access to performe this action'
            ], Response::HTTP_UNAUTHORIZED);
        
        if($ship->lvl == 10)
            return response([
                'message' => 'You\'r shit is max lvl'
            ], Response::HTTP_BAD_REQUEST);

        $lvlPrice = price($ship->lvl);

        if($ship->coins < $lvlPrice["price"])
            return response([
                'message' => 'You do not have enough coins to upgrade'
            ], Response::HTTP_BAD_REQUEST);
        
        $ship->lvl += 1;
        $ship->capacity += fake()->numberBetween(200, 300);
        $ship->coins -= $lvlPrice["price"];

        $ship->save();

        return response(price($ship->lvl));
    }
}
