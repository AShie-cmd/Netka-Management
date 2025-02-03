<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

use function Laravel\Prompts\table;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('visitor_groups', function (Blueprint $table) {
            $table->bigInteger('project_id')->unsigned()->index()->nullable();
            $table->foreign('project_id')->references(columns: 'id')->on('projects');
            $table->enum('group_status', ['off', 'on', 'without-leader'])->after('number');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        // Schema::table('visitor_groups', function (Blueprint $table) {
        //     $table->dropForeign(index: ['project_id', 'visitor_groups_project_id_index']);
        //     $table->dropColumn('project_id');
        //     $table->dropColumn('status');
        // });
    }
};
