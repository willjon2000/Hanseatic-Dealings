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
        Schema::create('ships', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->integer('coins');
            $table->integer('capacity');
            $table->dateTime('arrivalTime');
            $table->foreignId('userID')->constrained('users');
            $table->foreignId('saveGameID')->constrained('save_games');
            $table->foreignId('outpostID')->constrained('outposts')->nullable(true);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('ships');
    }
};
