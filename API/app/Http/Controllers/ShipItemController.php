<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Ship;

use Symfony\Component\HttpFoundation\Response;

class ShipItemController extends Controller
{
    /**
     * Display the specified resource.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show(Request $request, $id)
    {
        $ship = Ship::find($id);

        if($request->user()->id != $ship->userID)
            return response([
                'message' => 'You do not have access to performe this action'
            ], Response::HTTP_UNAUTHORIZED);

        return $ship->items;
    }
}
