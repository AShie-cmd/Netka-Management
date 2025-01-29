<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('visitor_groups', function (Blueprint $table) {
            $table->bigInteger('leader_id')->unsigned()->index()->nullable();
            $table->foreign(columns: 'leader_id')->references('id')->on('users');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        // Schema::table('visitor_groups', function (Blueprint $table) {
        //     $table->dropForeign(index: ['leader_id', 'visitor_groups_leader_id_index']);
        //     $table->dropColumn('leader_id');
        // });
    }
};
