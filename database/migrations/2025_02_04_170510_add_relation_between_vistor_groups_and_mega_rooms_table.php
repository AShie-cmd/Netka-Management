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
            $table->bigInteger('mega_room_id')->unsigned()->nullable()->index();
            $table->foreign('mega_room_id')->references('id')->on('mega_rooms');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('visitor_groups', function (Blueprint $table) {
            $table->dropForeign(index: ['mega_room_id', 'visitor_groups_mega_room_id_index']);
            $table->dropColumn('mega_room_id');
        });
    }
};
