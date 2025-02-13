<?php

namespace App\Http\Controllers;

use App\Models\Project;
use App\Models\User;
use App\Models\VisitorGroup;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Gate;
use Inertia\Inertia;

class ManagementController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        // if (! Gate::allows('manage')) {
        //     abort(code: 403);
        // }

        $onGroups = VisitorGroup::orderBy('group_status', 'desc')->get()->toArray();
        // $groups = VisitorGroup::orderBy('status', 'desc')->get();
        // $groups_final = [];
        // foreach ($groups as $group) {
        //     array_push($groups_final, $group->toArray());
        //     if ($group->leader_id != null) {
        //         $leader_name =  $group->leader->name;
        //         // $group = $group->toArray();
        //         $groups_final['leader_name'] = $leader_name;
        //         // array_push($groups_final, $group->toArray());
        //     }
        //     if ($group->project_id != null) {
        //         $project_name =  $group->project->name;
        //         // $group = $group->toArray();
        //         $group['project_name'] = $project_name;
        //         array_push($groups_final, $group->toArray());
        //     }
        //     if ($group->leader_id == null) {
        //         // $group = $group->toArray();
        //         $group['leader_name'] = '';
        //         array_push($groups_final, $group->toArray());
        //     }
        //     if ($group->project_id == null) {
        //         // $group = $group->toArray();
        //         $group['project_name'] = '';
        //         array_push($groups_final, $group->toArray());
        //     }
        // }
        $groups_final = DB::table('visitor_groups')
            ->leftJoin('users', 'visitor_groups.leader_id',  '=', 'users.id')
            ->leftJoin('projects', 'visitor_groups.project_id', '=', 'projects.id')
            ->leftJoin('mega_rooms', 'visitor_groups.mega_room_id', '=', 'mega_rooms.id')
            ->select('visitor_groups.*', 'users.name', 'projects.id as project_id', 'projects.room_id', 'projects.project_name', 'projects.project_status', 'mega_rooms.name as mega_room_name', 'mega_rooms.id as mega_room_id')
            ->orderBy('group_status', direction: 'desc')
            ->get();

        // dd($groups_final);

        $leaders = User::where('role', 'leader')->where('status',  'off')->get();


        return Inertia::render('Management/Index', ['groups' => $groups_final, 'leaders' => $leaders, 'onGroups' => $onGroups]);
    }

    public function getAllFreeLeaders($leaderId)
    {

        $leaders = User::where('role', 'leader')->where('status',  'off')->get();
        if ($leaderId) {
            $leader = User::find($leaderId);
            if ($leader->status === 'on') {
                $leaders->put(0, $leader);
            }
        }
        return $leaders->toJson();
    }

    /**
     * Store a newly created resource in storage.
     */
    public function storeGroups(Request $request)
    {
        $request->validate(rules: [
            'school_name_p' => ['required', 'max:50'],
            'gender_p' => ['required'],
            'number_p' => ['required', 'numeric']
            // 'leader' => ['number'],
        ]);
        $group = new VisitorGroup();
        $group->school_name = $request->input('school_name_p');
        $group->school_name = $request->input('school_name_p');
        $group->leader_id = $request->input('leader_p') != 0 ? $request->input('leader_p') : null;
        if ($request->input('leader_p') != 0) {
            $leader = User::find($request->input('leader_p'));
            $leader->status = 'on';
            $leader->save();
        }
        if ($request->input('number_p') != 0) {
            $group->number = $request->input('number_p');
        }
        $group->group_status = $request->input('leader_p') != 0 ? 'waiting' : 'without-leader';
        $group->save();
    }

    /**
     * Display the specified resource.
     */
    public function show($id)
    {
        return VisitorGroup::find($id)->toJson();
    }

    /**
     * Update the specified resource in storage.
     */
    public function updateGroups(Request $request, $id)
    {
        try {
            $request->validate(rules: [
                'school_name' => ['max:50'],
                'number' => ['required', 'numeric']
                // 'leader' => ['number'],
            ]);
            $group = VisitorGroup::find($id);
            if ($request->input('school_name') !== null) {
                $group->school_name = $request->input('school_name');
            }
            if ($request->input('leader_id') !== 'unchanged' && $group->group_status !== 'off') {
                $group->leader_id = $request->input('leader_id') != 0 ? $request->input('leader_id') : null;
            }
            if ($request->input('leader_id') != 0 && $request->input('leader_id') != 'unchanged') {
                $leader = User::find($request->input('leader_id'));
                $leader->status = 'on';
                $leader->save();
            }
            if ($request->input('gender') !== null) {
                $group->gender = $request->input('gender');
            }
            if ($request->input('leader_id') !== 'unchanged' && $group->group_status !== 'off') {
                $group->group_status = $request->input('leader_id') != 0 ? 'waiting' : 'without-leader';
            }
            if ($request->input('number') !== 0) {
                $group->number = $request->input('number');
            }

            $group->save();
        } catch (Exception $e) {
            throw $e;
        }
    }

    public function deleteGroups($id)
    {
        $group = VisitorGroup::find($id);
        $group->group_status = 'off';
        $group->leader_id = null;
        $group->save();
    }
}
