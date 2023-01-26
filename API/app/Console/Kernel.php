<?php

namespace App\Console;

use Illuminate\Console\Scheduling\Schedule;
use Illuminate\Foundation\Console\Kernel as ConsoleKernel;
use App\Models\Outpost;
use App\Models\SaveGame;
use Symfony\Component\Console\Output\ConsoleOutput;

class Kernel extends ConsoleKernel
{
    /**
     * Define the application's command schedule.
     *
     * @param  \Illuminate\Console\Scheduling\Schedule  $schedule
     * @return void
     */
    protected function schedule(Schedule $schedule)
    {
        $schedule->call(function () {
            $output = new ConsoleOutput();
            $outposts = Outpost::all();
            foreach ($outposts as $key => $outpost) {
                $outpostItems = $outpost->items;
                
                foreach ($outpostItems as $key => $item) {
                    if($item->pivot->producer == 0){
                        if($item->pivot->amount < 0)
                            $item->pivot->amount = $item->pivot->amount - rand(1, 4);
                    }else{
                        if($item->pivot->amount < 200)
                            $item->pivot->amount = $item->pivot->amount + rand(2, 6);
                    }

                    $item->save();
                }
            }
        })->everyMinute();

        
        $schedule->call(function () {
            $output = new ConsoleOutput();
            for ($i=0; $i < 60; $i++) {
                $saves = SaveGame::all();
                // Add 12 hours to ingame time
                foreach ($saves as $key => $save) {
                    $save->timeInGame = date('Y-m-d H:i:s', strtotime($save->timeInGame . '+12 hours'));

                    $save->save();
                }
                sleep(1);
            }
        })->everyMinute();
    }

    /**
     * Register the commands for the application.
     *
     * @return void
     */
    protected function commands()
    {
        $this->load(__DIR__.'/Commands');

        require base_path('routes/console.php');
    }
}
