<?php

namespace App\Http\Controllers;

use App\Models\Ship;
use App\Http\Requests\StoreSaveRequest;
use App\Http\Requests\UpdateSaveRequest;
use Illuminate\Http\Request;

class SaveController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        return Ship::whereHas('savegame', function($q) {
            $q->where('online', '1');
        })->where('userID', '=', $request->user()->id)->get();
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \App\Http\Requests\StoreSaveRequest  $request
     * @return \Illuminate\Http\Response
     */
    public function store(StoreSaveRequest $request)
    {
        //
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\SaveGame  $save
     * @return \Illuminate\Http\Response
     */
    public function show(SaveGame $save)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\SaveGame  $save
     * @return \Illuminate\Http\Response
     */
    public function edit(SaveGame $save)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \App\Http\Requests\UpdateSaveRequest  $request
     * @param  \App\Models\SaveGame  $save
     * @return \Illuminate\Http\Response
     */
    public function update(UpdateSaveRequest $request, SaveGame $save)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\SaveGame  $save
     * @return \Illuminate\Http\Response
     */
    public function destroy(SaveGame $save)
    {
        //
    }
}
