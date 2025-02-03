<?php

namespace App\Http\Controllers;

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

class ProjectController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $rooms = Room::all()->sortBy('info');
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
            ->select('visitor_groups.*', 'projects.id as project_id', 'projects.room_id', 'projects.project_name', 'projects.project_status')
            ->orderBy('group_status', 'desc')
            ->get();

        // dd($groups_final);

        $waitingGroups = VisitorGroup::where('leader_id', Auth::user()->id)->where('group_status', 'waiting')->get();
        $onGroups = VisitorGroup::where('leader_id', Auth::user()->id)->where('group_status', 'on')->get();



        return Inertia::render('Management/Projects', props: ['rooms' => $rooms, 'groups' => $groups_final, 'waitingGroups' => $waitingGroups, 'onGroups' => $onGroups]);
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
        $group = VisitorGroup::find($groupId);
        $project = Project::find($group->project_id);
        $room = $project->room;

        $group->project_id = null;
        $group->group_status = 'waiting';
        $group->save();

        $project->project_status = 'WAITING';
        $project->save();

        $projectOfRoom = $room->projects;
        $statusOfRoom = 'ONAIR';
        foreach ($projectOfRoom as $project) {
            if ($project->project_status == 'WAITING') {
                $statusOfRoom = 'WAITING';
            }
        }

        $user = User::find(Auth::user()->id);
        // dd(Auth::user()->groups);

        foreach (Auth::user()->groups as $group) {
            if ($group->group_status === 'waiting') {

                $user->status = 'on';
                $user->save();

                $room->room_status = $statusOfRoom;
                $room->save();
                return redirect()->back();
            }
        }

        $user->status = 'off';
        $user->save();

        $room->room_status = $statusOfRoom;
        $room->save();
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store($groupId, $roomId, $projectId)
    {
        $group = VisitorGroup::find($groupId);
        $room = Room::find($roomId);
        $project = Project::find($projectId);

        if ($project->project_status != 'ONAIR' && $room->room_status != 'ONAIR') {
            //room
            $room->room_status = 'ONAIR';

            //group
            $group->project_id = $projectId;
            $group->group_status = 'on';

            //project
            $project->project_status = 'ONAIR';

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

    /**
     * Display the specified resource.
     */
    public function showGroup($id)
    {
        $final = [];
        $visitorGroup = VisitorGroup::find($id);
        $project = Project::find($visitorGroup->project_id);
        $final[0] = $visitorGroup;
        $final['project'] = $project;
        $final['room'] = $project->room;
        return $final;
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Project $project)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateProjectRequest $request, Project $project)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Project $project)
    {
        //
    }
}
