<?php

namespace App\Http\Controllers;

use App\Models\Project;
use App\Models\Room;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class MapController extends Controller
{
    public function index()
    {
        // $projects = DB::table('projects')
        //     ->leftJoin('rooms', 'projects.room_id', '=', 'rooms.id')
        //     ->select('projects.*', 'rooms.id as room_id')
        //     ->orderBy('id')
        //     ->get();

        $fullProjects = DB::table('projects')
            ->leftJoin('rooms', 'projects.room_id', '=', 'rooms.id')
            ->leftJoin('visitor_groups', 'visitor_groups.id', '=', 'projects.id')
            ->select('projects.*', 'rooms.id as room_id', 'rooms.room_status', 'visitor_groups.id as group_id', 'visitor_groups.school_name as group_name', 'visitor_groups.number as group_number')
            ->orderBy('id')
            ->get();

        $mega_rooms = DB::table('mega_rooms')
            ->leftJoin('visitor_groups', 'visitor_groups.mega_room_id', '=', 'mega_rooms.id')
            ->select('mega_rooms.*', 'visitor_groups.id as group_id', 'visitor_groups.school_name as group_name', 'visitor_groups.number as group_number')
            ->orderBy('id')
            ->get();

        return Inertia::render('dashboard/Map', ['projects' => $fullProjects, 'megaRooms' => $mega_rooms]);
    }

    public function getProject($id)
    {
        $projects = DB::table('rooms')->where('rooms.id', $id)
            ->leftJoin('projects', 'projects.room_id', '=', 'rooms.id')
            ->leftJoin('visitor_groups', 'visitor_groups.id', '=', 'projects.id')
            ->select('projects.*', 'rooms.id as room_id', 'visitor_groups.id as group_id', 'visitor_groups.school_name as group_name', 'visitor_groups.number as group_number')
            ->orderBy('id')
            ->get();
        return $projects;
    }

    public function getProjects()
    {
        $projects = DB::table('projects')
            ->leftJoin('rooms', 'projects.room_id', '=', 'rooms.id')
            ->leftJoin('visitor_groups', 'visitor_groups.id', '=', 'projects.id')
            ->select('projects.*', 'rooms.id as room_id', 'visitor_groups.id as group_id', 'visitor_groups.school_name as group_name', 'visitor_groups.number as group_number')
            ->orderBy('id')
            ->get();
        return $projects;
    }
}
