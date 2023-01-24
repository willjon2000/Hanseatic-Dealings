<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('outpost_items', function (Blueprint $table) {
            $table->integer('amount');
            $table->foreignId('outpostID')->constrained('outposts');
            $table->foreignId('itemID')->constrained('items');
            $table->foreignId('saveGameID')->constrained('save_games');
            $table->boolean('producer');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('outpost_items');
    }
};
