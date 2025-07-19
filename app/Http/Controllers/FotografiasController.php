<?php

namespace App\Http\Controllers;

use App\Models\Fotografia;
use Illuminate\Http\Request;
use Inertia\Inertia;

class FotografiasController extends Controller
{
    //
    public function index()
    {
        $fotografias = Fotografia::all();
        return Inertia::render("Fotografias/Index", compact('fotografias'));
    }

    public function create()
    {
        return Inertia::render("Fotografias/Create");
    }

    public function almacen(Request $request)
    {
        $request->validate([
            'nombre' => 'required|string|max:255',
            'fecha' => 'required|date_format:d-m-Y',
            'precio' => 'required|numeric',
            'autor' => 'required|string|max:255',
            'comentario' => 'nullable|string',
        ]);

        Fotografia::create($request->all());
        return redirect()->route('fotografia.index')->with('mensaje', 'Fotografia creada con exito');
    }

    public function destruir(Fotografia $fotografia)
    {
        $fotografia->delete();
        return redirect()->route('fotografia.index')->with('mensaje', 'Fotografia eleminada exitosamente');
    }

    public function edit(Fotografia $fotografia)
    {
        return Inertia::render('Fotografias/Edit', compact('fotografia'));
    }

    public function update(Request $request, Fotografia $fotografia)
    {
        $request->validate([
            'nombre' => 'required|string|max:255',
            'fecha' => 'required|date_format:d-m-Y',
            'precio' => 'required|numeric',
            'autor' => 'required|string|max:255',
            'comentario' => 'nullable|string',
        ]);

        $fotografia->update([
            'nombre' => $request->input('nombre'),
            'fecha' => $request->input('fecha'),
            'precio' => $request->input('precio'),
            'autor' => $request->input('autor'),
            'comentario' => $request->input('comentario'),
        ]);

        return redirect()->route('fotografia.index')->with('mensaje', 'Fotografia actualizada con exito!');
    }

}