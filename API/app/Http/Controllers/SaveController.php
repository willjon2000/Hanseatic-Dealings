<?php

namespace App\Http\Controllers;

use App\Models\SaveGame;
use App\Http\Requests\StoreSaveRequest;
use App\Http\Requests\UpdateSaveRequest;

class SaveController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //
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
