<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Project extends Model
{
    /** @use HasFactory<\Database\Factories\ProjectFactory> */
    use HasFactory;

    protected $guarded = ['id'];

    public function visitor_group()
    {
        return $this->hasOne(VisitorGroup::class);
    }

    public function room()
    {
        return $this->belongsTo(Room::class);
    }
}
