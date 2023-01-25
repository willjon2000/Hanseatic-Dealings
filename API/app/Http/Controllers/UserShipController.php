<?php

namespace App\Http\Controllers;
use App\Models\User;
use App\Models\Ship;
use App\Models\SaveGame;
use Illuminate\Http\Request;


class UserShipController extends Controller
{
    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show(Request $request)
    {
        return Ship::whereHas('savegame', function($q) {
            $q->where('online', '0');
        })->where('userID', '=', $request->user()->id)->with('savegame')->get();
    }
}
