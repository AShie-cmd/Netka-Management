<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreVisitorGroupRequest;
use App\Http\Requests\UpdateVisitorGroupRequest;
use App\Models\Project;
use App\Models\VisitorGroup;

class VisitorGroupController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreVisitorGroupRequest $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(VisitorGroup $visitorGroup)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(VisitorGroup $visitorGroup)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateVisitorGroupRequest $request, VisitorGroup $visitorGroup)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(VisitorGroup $visitorGroup)
    {
        //
    }

    protected function changeGroupsProject($id, $newProjectId = null)
    {
        $group = VisitorGroup::find($id);
        $previousProject = $group->project;

        if (!is_null($previousProject)) {
            $previousProject->presentations += 1;
            $previousProject->save();
        }

        if (is_null($newProjectId)) {
            $group->project_id = null;
            $group->save();
        } elseif (!is_null(Project::find($newProjectId))) {
            $group->project_id = $newProjectId;
            $group->save();
        } else {
            $group->project_id = null;
            $group->save();
        }
    }
}
