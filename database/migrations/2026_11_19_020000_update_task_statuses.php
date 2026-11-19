<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Support\Facades\DB;

return new class extends Migration
{
    public function up(): void
    {
        DB::table('tasks')->where('status', 'pending')->update(['status' => 'waiting']);
        DB::table('tasks')->where('status', 'in_progress')->update(['status' => 'in_process']);
        DB::table('tasks')->where('status', 'completed')->update(['status' => 'done']);
    }

    public function down(): void
    {
        DB::table('tasks')->where('status', 'waiting')->update(['status' => 'pending']);
        DB::table('tasks')->where('status', 'in_process')->update(['status' => 'in_progress']);
        DB::table('tasks')->where('status', 'done')->update(['status' => 'completed']);
    }
};
