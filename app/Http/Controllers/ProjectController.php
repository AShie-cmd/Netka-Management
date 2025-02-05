<?php

namespace App\Http\Controllers;

use App\Events\MapRoomStatusChanged;
use App\Models\Room;
use App\Models\User;
use Inertia\Inertia;
use App\Models\Project;
use App\Models\VisitorGroup;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Request;
use App\Http\Requests\StoreProjectRequest;
use App\Http\Requests\UpdateProjectRequest;
use App\Models\MegaRoom;

class ProjectController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $rooms = Room::all()->sortBy('info')->toArray();
        $megaRooms = MegaRoom::all();
        // $groups = VisitorGroup::where('leader_id', Auth::user()->id)->whereNot('status', 'off')->orderByDesc('status')->get();

        // $groups_final = [];
        // foreach ($groups as $group) {
        //     if ($group->project != null) {
        //         $project_name =  $group->project->name;
        //         $group = $group->toArray();
        //         $group['project_name'] = $project_name;
        //         array_push($groups_final, $group);
        //     } elseif ($group->project == null) {
        //         $group = $group->toArray();
        //         $group['project_name'] = '';
        //         array_push($groups_final, $group);
        //     }
        // }

        $groups_final = DB::table('visitor_groups')
            ->where('leader_id', Auth::user()->id)->whereNot('group_status', 'off')
            ->leftJoin('projects', 'visitor_groups.project_id', '=', 'projects.id')
            ->leftJoin('mega_rooms', 'visitor_groups.mega_room_id', '=', 'mega_rooms.id')
            ->select('visitor_groups.*', 'projects.id as project_id', 'projects.room_id', 'projects.project_name', 'projects.project_status', 'mega_rooms.name as mega_room_name', 'mega_rooms.id as mega_room_id')
            ->orderBy('group_status', 'desc')
            ->get();

        // dd($groups_final);

        $waitingGroups = VisitorGroup::where('leader_id', Auth::user()->id)->where('group_status', 'waiting')->get();
        $onGroups = VisitorGroup::where('leader_id', Auth::user()->id)->where('group_status', 'on')->get();

        return Inertia::render('Management/Projects', props: ['rooms' => $rooms, 'groups' => $groups_final, 'waitingGroups' => $waitingGroups, 'onGroups' => $onGroups, 'megaRooms' => $megaRooms]);
    }

    public function roomProjects($id)
    {
        $room = Room::find($id);
        return $room->projects;
    }

    /**
     * Show the form for creating a new resource.
     */
    public function unset($groupId)
    {
        $group = VisitorGroup::findOrFail($groupId);
        if ($group->project_id != null) {
            $project = Project::findOrFail($group->project_id);
            $room = $project->room;

            $group->project_id = null;

            $project->project_status = 'WAITING';
            $project->save();

            $projectOfRoom = $room->projects;
            $statusOfRoom = 'ONAIR';
            foreach ($projectOfRoom as $project) {
                if ($project->project_status == 'WAITING') {
                    $statusOfRoom = 'WAITING';
                }
            }
            $room->room_status = $statusOfRoom;
            $room->save();
        } elseif ($group->mega_room_id != null) {
            $megaRoom = MegaRoom::findOrFail($group->mega_room_id);

            $group->mega_room_id = null;

            $megaRoom->people = ($megaRoom->people - $group->number);
            if ($megaRoom->status == 'FULL') {
                $megaRoom->status = 'NOTFULL';
            }
            $megaRoom->save();
        }

        $group->group_status = 'waiting';
        $group->save();

        $user = User::findOrFail(Auth::user()->id);
        // dd(Auth::user()->groups);

        foreach (Auth::user()->groups as $group) {
            if ($group->group_status === 'waiting') {
                $user->status = 'on';
                $user->save();

                return redirect()->back();
            }
        }

        $user->status = 'off';
        $user->save();
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store($groupId, $roomId, $projectId)
    {
        $group = VisitorGroup::findOrFail($groupId);
        $room = Room::findOrFail($roomId);
        $project = Project::findOrFail($projectId);

        if ($project->project_status != 'ONAIR' && $room->room_status != 'ONAIR') {
            //room
            $room->room_status = 'ONAIR';

            //group
            $group->project_id = $projectId;
            $group->group_status = 'on';

            //project
            $project->project_status = 'ONAIR';
            event(new MapRoomStatusChanged($project->id));

            $project->save();
            $group->save();
            $room->save();
        }

        $projectOfRoom = $room->projects;
        $statusOfRoom = 'ONAIR';
        foreach ($projectOfRoom as $project) {
            if ($project->project_status == 'WAITING') {
                $statusOfRoom = 'WAITING';
            }
        }

        foreach ($group as Auth::user()->groups) {
            if ($group->group_status === 'waiting') {
                $room->room_status = $statusOfRoom;
                $room->save();
                return redirect()->back();
            }
        }

        $user = User::find(Auth::user()->id);
        $user->status = 'off';
        $room->room_status = $statusOfRoom;
        $room->save();
        $user->save();
    }

    public function storeOnMegaRoom($groupId, $megaRoomId)
    {
        $group = VisitorGroup::findOrFail($groupId);
        $room = MegaRoom::findOrFail($megaRoomId);

        if ($room->status != 'FULL') {
            //room
            $prev_number = $room->people;
            $new_number = $prev_number + $group->number;
            $room->people = $new_number;

            if ($room->capacity != null) {
                if ($new_number > $room->capacity) {
                    redirect()->back()->with('error', 'the MegaRoom Has Reached The Capacity');
                } elseif (($room->id !== 4 || $room->id !== 5 || $room->id !== 6) && $new_number == $room->capacity) {
                    $room->status = 'FULL';
                } elseif ($room->id == 4 || $room->id == 5 || $room->id == 6) {
                    //4, 5, 6 are the IDs of movie mega rooms
                    $room->status = 'FULL';
                }
            }

            //group
            $group->mega_room_id = $room->id;
            $group->group_status = 'on';

            //project
            // event(new MapRoomStatusChanged($project->id)); //TODO making event for this

            $group->save();
            $room->save();
        }

        foreach ($group as Auth::user()->groups) {
            if ($group->group_status === 'waiting') {
                return redirect()->back();
            }
        }

        $user = User::find(Auth::user()->id);
        $user->status = 'off';
        $user->save();
    }

    /**
     * Display the specified resource.
     */
    public function showGroup($id)
    {
        $final = [];
        $visitorGroup = VisitorGroup::find($id);
        $project = null;
        if ($visitorGroup->project_id != null) {
            $project = Project::find($visitorGroup->project_id);
            $final['room'] = $project->room;
        } else {
            $final['room'] = null;
        }
        $final['group'] = $visitorGroup;
        $final['project'] = $project;
        $final['megaRoom'] = $visitorGroup->megaRoom;
        return $final;
    }

    public function getMegaRoomWithGroups($id)
    {
        $megaRooms = DB::table('mega_rooms')->where('mega_rooms.id', '=', $id)
            ->leftJoin('visitor_groups', 'visitor_groups.mega_room_id', '=', 'mega_rooms.id')
            ->leftJoin('users', 'visitor_groups.leader_id', '=', 'users.id')
            ->select('mega_rooms.*', 'visitor_groups.school_name', 'visitor_groups.gender', 'visitor_groups.number', 'users.name as leader_name')
            ->get();
        return $megaRooms;
    }

    public function getMegaRoom($id)
    {
        return MegaRoom::findOrFail($id);
    }
}
