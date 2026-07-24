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
        Schema::create('shifts', function (Blueprint $table) {
            $table->id();
            $table->date('shift_date');
            $table->time('start_time');
            $table->time('end_time');

            $table->foreignId('role_id')
                ->constrained('roles')
                ->restrictOnDelete();

            // a shift may exist before it is assigned to a staff member
            $table->foreignId('staff_member_id')
                ->nullable()
                ->constrained('staff_members')
                ->nullOnDelete();

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('shifts');
    }
};
