<?php

namespace App\Events;

use Illuminate\Support\Facades\DB;
use Illuminate\Broadcasting\Channel;
use Illuminate\Queue\SerializesModels;
use Illuminate\Broadcasting\PrivateChannel;
use Illuminate\Broadcasting\PresenceChannel;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;

class MapMegaRoomStatusChanged implements ShouldBroadcast
{
    use Dispatchable, InteractsWithSockets, SerializesModels;

    /**
     * Create a new event instance.
     */
    public function __construct(public int $megaRoom_id) {}

    public function broadcastOn(): array
    {
        return [
            new Channel('map.megaRoom'),
        ];
    }

    public function broadcastWith()
    {
        $mega_rooms = DB::table('mega_rooms')
            ->orderBy('id')
            ->get();


        return [
            'megaRooms' => $mega_rooms
        ];
    }
}
