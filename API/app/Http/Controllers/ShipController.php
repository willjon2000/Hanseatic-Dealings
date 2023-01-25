<?php

namespace App\Http\Controllers;
use App\Models\SaveGame;
use App\Models\Outpost;
use App\Models\Item;
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

        if (!$save){
            $save = new SaveGame();
            $save->name = 'private';
            $save->online = false;
            $save->timeInGame = fake()->dateTimeBetween(100,900);

            $save->save();

            $outposts = Outpost::get();
            foreach ($outposts as $key => $outpost) {
                $randomItems = Item::all()->random(rand(4,17))->pluck('id');
                for($i=0; $i < count($randomItems); $i++) {
                    $producer = fake()->boolean(15);
                    $outpost->items()->attach($randomItems[$i], ["saveGameID" => $save->id, 'producer' => $producer, 'amount' => $producer ? fake()->numberBetween(10, 70) : fake()->numberBetween(80, 170)]);
                }
            }
        }



        $ship = new Ship();

        $ship->userID = $request->user()->id;
        $ship->saveGameID = $save->id;
        $ship->name = $request->input('name');
        $ship->capacity = fake()->numberBetween(200, 300);
        $ship->coins = fake()->numberBetween(500, 900);
        
        $ship->save();

        return $ship;
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
