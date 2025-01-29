<?php

namespace App\Policies;

use App\Models\User;

class ManagementPolicy
{
    /**
     * Create a new policy instance.
     */
    public function __construct()
    {
        //
    }

    public function viewAny(User $user): bool
    {
        return $user->role === 'superAdmin';
    }
}
