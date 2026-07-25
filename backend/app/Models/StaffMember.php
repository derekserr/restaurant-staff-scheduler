<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\BelongsTo;



class StaffMember extends Model

{
    use HasFactory;

    protected $fillable = [
        'name',
        'phone_number',
        'role_id',
    ];

    public function role(): BelongsTo
    {
        return $this->belongsTo(Role::class);
    }

    public function shifts(): HasMany
    {
        return $this->hasMany(Shift::class);
    }
}
