<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class MegaRoom extends Model
{
    public function groups()
    {
        return $this->hasMany(VisitorGroup::class);
    }
}
