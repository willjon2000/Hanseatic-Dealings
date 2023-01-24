<?php

namespace App\Http\Controllers;
use App\Models\SaveGame;
use App\Models\Ship;

use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class ShipController extends Controller
{
    /**
     * Display the specified resource.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function create(Request $request){

        $save = SaveGame::find($request->input('saveGameID'));

        if ($save){
            Ship::factory()->create();

        }else{

        }
    }

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

        if($request->user()->id !== $ship->userID)
            return response([
                'message' => 'You do not have access to performe this action'
            ], Response::HTTP_UNAUTHORIZED);

        return $ship;
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
        $request->validate([
            'name' => 'string'
        ]);

        $ship = Ship::find($id);

        if($request->user()->id !== $ship->userID)
            return response([
                'message' => 'You do not have access to performe this action'
            ], Response::HTTP_UNAUTHORIZED);

        $ship->name = $request->name;

        $ship->save();

        return $ship;
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @param \Illuminate\Http\Request $request
     * @return \Illuminate\Http\Response
     */
    public function destroy($request,$id)
    {
        $ship = Ship::find($id);

        if($request->user()->id !== $ship->userID)
            return response([
                'message' => 'You do not have access to performe this action'
            ], Response::HTTP_UNAUTHORIZED);

        $ship->destroy();

        return response([ 'success' => true ]);
    }
}
