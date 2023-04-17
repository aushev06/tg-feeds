<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Channel extends Model
{
    use HasFactory;

    protected $fillable = ['url', 'name'];

    public function folders()
    {
        return $this->belongsToMany(
            Folder::class,
            'channel_user'
        );
    }
}
