<?php

namespace App\Console;

use Illuminate\Console\Scheduling\Schedule;
use Illuminate\Foundation\Console\Kernel as ConsoleKernel;
use App\Models\Outpost;

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
        })->everyFiveMinutes();
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
