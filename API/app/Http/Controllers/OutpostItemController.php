<?php

namespace App\Http\Controllers;
use App\Models\Outpost;
use App\Models\Ship;

use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

function calculateBuyPrice($price, $amount, $producer) {
    if($producer)
        $buyPrice = 1 - pow($amount / 100, 3) + $price;
    else
        $buyPrice = -(pow(2 * ($amount / 100) - 1, 3) * (-100) + $price);

    if($buyPrice < 0)
        $buyPrice = 0;
    if($buyPrice > $price * 2)
        $buyPrice = $price * 2;

    return round($buyPrice);
}

function calculateSellPrice($price, $amount, $producer) {   
    $sellPrice = pow(2 * ($amount / 100) - 1, 3) * (-100) + $price;

    if($producer)
        $sellPrice = $sellPrice / 2;

    if($sellPrice < 0)
        $sellPrice = 0;
    if($sellPrice > $price * 2)
        $sellPrice = $price * 2;

    return round($sellPrice);
}

class OutpostItemController extends Controller
{
    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show(Request $request, $id)
    {
        $response = [];

        $items = Outpost::find($id)->items;
        foreach ($items as $key => $item) {
            if($item->pivot->saveGameID == $request->input('save'))
                array_push($response, [
                    //'save' => $item->pivot->saveGameID,
                    //'save_request' => $request->input('save'),
                    'id' => $item->id,
                    'name' => $item->name,
                    'amount' => $item->pivot->amount,
                    'export' => $item->pivot->producer == 1,
                    'price' => [
                        'buy' => calculateBuyPrice($item->price, $item->pivot->amount, $item->pivot->producer == 1),
                        'sell' => calculateSellPrice($item->price, $item->pivot->amount, $item->pivot->producer == 1)
                    ]
                ]);
        }

        return $response;
    }
    
    /**
     * Display the specified resource.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @param  int  $item_id
     * @return \Illuminate\Http\Response
     */
    public function buy(Request $request, $id, $item_id)
    {
        $outpost = Outpost::find($id);

        $item = array_column($outpost->items->toArray(), null, 'id')[$item_id] ?? null;
        
        if(!$item)
            return response([
                'message' => 'This outpost does not have this item'
            ], Response::HTTP_NOT_FOUND);

        $ship = Ship::find($request->input('shipId'));

        if(!$ship)
            return response([
                'message' => 'You do not have access to performe this action'
            ], Response::HTTP_UNAUTHORIZED);

        if($request->user()->id != $ship->userID)
            return response([
                'message' => 'You do not have access to performe this action'
            ], Response::HTTP_UNAUTHORIZED);
        
        $shipItems = $ship->items->toArray();
        /*$shipItem = array_column($shipItems, null, 'id')[$item_id] ?? null;

        if(!$shipItem)
            return response([
                'message' => 'The ship does not have this item'
            ], Response::HTTP_NOT_FOUND);*/
        
        if($item["pivot"]["amount"] < $request->input('amount') )
            return response([
                'message' => 'The outpost does not have enough resources'
            ], Response::HTTP_BAD_REQUEST);
        
        $cargo = 0;
        for ($i=0; $i < count($shipItems); $i++) { 
            $cargo += $shipItems[$i]['pivot']['amount'];
        }

        if($ship->capacity < $cargo + $request->input('amount'))
            return response([
                'message' => 'The ships cargo storage does not have enough space'
            ], Response::HTTP_BAD_REQUEST);
        
        $buyPrice = calculateBuyPrice($item["price"], $item["pivot"]["amount"], $item["pivot"]["producer"] == 1);
        if($ship->coins < ($buyPrice * $request->input('amount')))
            return response([
                'message' => 'The ships does not have enough coins'
            ], Response::HTTP_BAD_REQUEST);
        
        $ship->coins = $ship->coins - ($buyPrice * $request->input('amount'));
        $ship->save();

        $shipItem = array_column($shipItems, null, 'id')[$item_id] ?? null;
        if($shipItem){
            foreach ($ship->items as $key => $item) {
                if($item->id == $item_id){
                    $item->pivot->amount = $item->pivot->amount + $request->input('amount');
                    $item->pivot->save();
                }
            }
        }else{
            $ship->items()->attach($item_id, ['amount' => $request->input('amount')]);
        }

        foreach ($outpost->items as $key => $item) {
            if($item->id == $item_id){
                $item->pivot->amount = $item->pivot->amount - $request->input('amount');
                $item->pivot->save();
            }
        }

        $outpostItemsRes = [];

        $items = Outpost::find($id)->items;
        foreach ($items as $key => $item) {
            if($item->pivot->saveGameID == $request->input('save'))
                array_push($outpostItemsRes, [
                    'id' => $item->id,
                    'name' => $item->name,
                    'amount' => $item->pivot->amount,
                    'export' => $item->pivot->producer == 1,
                    'price' => [
                        'buy' => calculateBuyPrice($item->price, $item->pivot->amount, $item->pivot->producer == 1),
                        'sell' => calculateSellPrice($item->price, $item->pivot->amount, $item->pivot->producer == 1)
                    ]
                ]);
        }

        return [ 
            "ship" => $ship,
            "shipItems" => Ship::find($request->input('shipId'))->items,
            "outpostItems" => $outpostItemsRes
        ];
    }
    
    /**
     * Display the specified resource.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @param  int  $item_id
     * @return \Illuminate\Http\Response
     */
    public function sell(Request $request, $id, $item_id)
    {
        $outpost = Outpost::find($id);

        $item = array_column($outpost->items->toArray(), null, 'id')[$item_id] ?? null;
        
        /*if(!$item)
            return response([
                'message' => 'This outpost does not have this item'
            ], Response::HTTP_NOT_FOUND);*/

        $ship = Ship::find($request->input('shipId'));

        if(!$ship)
            return response([
                'message' => 'You do not have access to performe this action'
            ], Response::HTTP_UNAUTHORIZED);

        if($request->user()->id != $ship->userID)
            return response([
                'message' => 'You do not have access to performe this action'
            ], Response::HTTP_UNAUTHORIZED);
        
        $shipItems = $ship->items->toArray();
        $shipItem = array_column($shipItems, null, 'id')[$item_id] ?? null;

        if(!$shipItem)
            return response([
                'message' => 'The ship does not have this item'
            ], Response::HTTP_NOT_FOUND);
        
        if($shipItem["pivot"]["amount"] < $request->input('amount') )
            return response([
                'message' => 'The outpost does not have enough resources'
            ], Response::HTTP_BAD_REQUEST);
        
        /*$cargo = 0;
        for ($i=0; $i < count($shipItems); $i++) { 
            $cargo += $shipItems[$i]['pivot']['amount'];
        }

        if($ship->capacity < $cargo + $request->input('amount'))
            return response([
                'message' => 'The ships cargo storage does not have enough space'
            ], Response::HTTP_BAD_REQUEST);*/
        
        $sellPrice = calculateSellPrice($item["price"], $item["pivot"]["amount"], $item["pivot"]["producer"] == 1);
        /*if($ship->coins < $buyPrice)
            return response([
                'message' => 'The ships does not have enough coins'
            ], Response::HTTP_BAD_REQUEST);*/
        
        $ship->coins = $ship->coins + ($sellPrice * $request->input('amount'));
        $ship->save();
        
        foreach ($ship->items as $key => $item) {
            if($item->id == $item_id){
                $item->pivot->amount = $item->pivot->amount - $request->input('amount');
                $item->pivot->save();
            }
        }

        foreach ($outpost->items as $key => $item) {
            if($item->id == $item_id){
                $item->pivot->amount = $item->pivot->amount + $request->input('amount');
                $item->pivot->save();
            }
        }

        $outpostItemsRes = [];

        $items = Outpost::find($id)->items;
        foreach ($items as $key => $item) {
            if($item->pivot->saveGameID == $request->input('save'))
                array_push($outpostItemsRes, [
                    'id' => $item->id,
                    'name' => $item->name,
                    'amount' => $item->pivot->amount,
                    'export' => $item->pivot->producer == 1,
                    'price' => [
                        'buy' => calculateBuyPrice($item->price, $item->pivot->amount, $item->pivot->producer == 1),
                        'sell' => calculateSellPrice($item->price, $item->pivot->amount, $item->pivot->producer == 1)
                    ]
                ]);
        }

        return [ 
            "ship" => $ship,
            "shipItems" => Ship::find($request->input('shipId'))->items,
            "outpostItems" => $outpostItemsRes
        ];
    }
}
