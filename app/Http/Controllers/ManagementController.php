<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Models\VisitorGroup;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Gate;
use Inertia\Inertia;

class ManagementController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        if (! Gate::allows('manage')) {
            abort(code: 403);
        }

        $groups = VisitorGroup::orderBy('status', 'desc')->get();
        $groups_final = [];
        foreach ($groups as $group) {
            if ($group->leader != null) {
                $leader_name =  $group->leader->name;
                $group = $group->toArray();
                $group['leader_name'] = $leader_name;
                array_push($groups_final, $group);
            } elseif ($group->project != null) {
                $project_name =  $group->project->name;
                $group = $group->toArray();
                $group['project_name'] = $project_name;
                array_push($groups_final, $group);
            } elseif ($group->leader == null) {
                $group = $group->toArray();
                $group['leader_name'] = '';
                array_push($groups_final, $group);
            } elseif ($group->project == null) {
                $group = $group->toArray();
                $group['project_name'] = '';
                array_push($groups_final, $group);
            }
        }

        $leaders = User::where('role', 'leader')->where('status',  'off')->get();

        return Inertia::render('Management/Index',  ['groups' => $groups_final, 'leaders' => $leaders]);
    }

    public function getAllFreeLeaders()
    {
        $leaders = User::where('role', 'leader')->where('status',  'off')->get();
        return $leaders->toJson();
    }

    /**
     * Show the form for creating a new resource.
     */
    // public function create()
    // {
    //     //
    // }

    /**
     * Store a newly created resource in storage.
     */
    public function storeGroups(Request $request)
    {
        $request->validate(rules: [
            'school_name_p' => ['required', 'max:50'],
            'gender_p' => ['required'],
            // 'leader' => ['number'],
        ]);
        $group = new VisitorGroup();
        $group->school_name = $request->input('school_name_p');
        $group->school_name = $request->input('school_name_p');
        $group->leader_id = $request->input('leader_p') !== 0 ? $request->input('leader_p') : null;
        $group->status = $request->input('leader_p') !== 0 ? 'off' : 'without-leader';
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
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function updateGroups(Request $request, $id)
    {
        $request->validate(rules: [
            'school_name' => ['max:50'],
            // 'leader' => ['number'],
        ]);
        $group = VisitorGroup::find($id);
        if ($request->input('school_name') !== null) {
            $group->school_name = $request->input('school_name');
        }
        if ($request->input('leader_id') !== 'unchanged' && $group->status !== 'off') {
            $group->leader_id = $request->input('leader_id') != 0 ? $request->input('leader_id') : null;
        }
        if ($request->input('gender') !== null) {
            $group->gender = $request->input('gender');
        }
        if ($request->input('leader_id') !== 'unchanged' && $group->status !== 'off') {
            $group->status = $request->input('leader_id') != 0 ? 'waiting' : 'without-leader';
        }
        $group->save();
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }

    public function deleteGroups($id)
    {
        $group = VisitorGroup::find($id);
        $group->status = 'off';
        $group->leader_id = null;
        $group->save();
    }
}
