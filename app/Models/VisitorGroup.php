<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class VisitorGroup extends Model
{
    /** @use HasFactory<\Database\Factories\VisitorGroupFactory> */
    use HasFactory;

    protected $guarded = ['id'];

    public function project()
    {
        return $this->belongsTo(Project::class);
    }

    public function leader()
    {
        return $this->belongsTo(User::class);
    }
}
