<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

class AutosController extends Controller
{
    //
    public function index()
    {
        return Inertia::render("Autos/Index", []);
    }

    public function create()
    {
        return Inertia::render("Autos/Create");
    }
}
