<?php

namespace App\Events;

use App\Models\Project;
use Illuminate\Support\Facades\DB;
use Illuminate\Broadcasting\Channel;
use Illuminate\Queue\SerializesModels;
use Illuminate\Broadcasting\PrivateChannel;
use Illuminate\Broadcasting\PresenceChannel;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;

class MapRoomStatusChanged implements ShouldBroadcast
{
    use Dispatchable, InteractsWithSockets, SerializesModels;

    /**
     * Create a new event instance.
     */
    public function __construct(public int $project_id) {}

    /**
     * Get the channels the event should broadcast on.
     *
     * @return array<int, \Illuminate\Broadcasting\Channel>
     */
    public function broadcastOn(): array
    {
        return [
            new Channel('map'),
        ];
    }

    public function broadcastWith()
    {
        $projects = DB::table('projects')
            ->leftJoin('rooms', 'projects.room_id', '=', 'rooms.id')
            ->leftJoin('visitor_groups', 'visitor_groups.id', '=', 'projects.id')
            ->select('projects.*', 'rooms.id as room_id', 'rooms.room_status', 'visitor_groups.id as group_id', 'visitor_groups.school_name as group_name', 'visitor_groups.number as group_number')
            ->orderBy('id')
            ->get();

        return [
            'project' => Project::findOrFail($this->project_id),
            'projects' => $projects
        ];
    }
}
