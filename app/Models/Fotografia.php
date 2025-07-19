<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Fotografia extends Model
{
    //
    protected $fillable = ['nombre', 'fecha', 'precio', 'autor', 'comentario'];
}
