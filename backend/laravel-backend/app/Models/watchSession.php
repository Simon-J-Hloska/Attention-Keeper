<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class WatchSession extends Model
{
    use HasFactory;

    protected $table = 'watch_sessions';

    protected $fillable = [
        'user_name',
        'service_name',
        'start_time',
        'end_time',
        'duration_seconds',
    ];

    protected $casts = [
        'start_time' => 'datetime',
        'end_time'   => 'datetime',
    ];

    protected $attributes = [
        'duration_seconds' => 0,
    ];

    public function isActive(): bool
    {
        return $this->end_time === null;
    }
}