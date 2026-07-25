<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Shift;
use Illuminate\Http\Request;

class ShiftController extends Controller
{
    public function index()
    {
        return Shift::with(['role', 'staffMember'])->get();    
    }

    public function show(string $id)
    {
        return Shift::with(['role', 'staffMember'])->findOrFail($id);    
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'shift_date' => ['required', 'date'],
            'start_time' => ['required', 'date_format:H:i'],
            'end_time' => ['required', 'date_format:H:i', 'after:start_time'],
            'role_id' => ['required', 'integer', 'exists:roles,id'],
            'staff_member_id' => ['nullable', 'integer', 'exists:staff_members,id'],
        ]);

        $shift = Shift::create($validated);

        return response()->json($shift->load(['role', 'staffMember']), 201);
    }

    public function update(Request $request, string $id)
    {
        $shift = Shift::findOrFail($id);

        $validated = $request->validate([
            'shift_date' => ['sometimes', 'date'],
            'start_time' => ['sometimes', 'date_format:H:i'],
            'end_time' => ['sometimes', 'date_format:H:i'],
            'role_id' => ['sometimes', 'integer', 'exists:roles,id'],
            'staff_member_id' => ['sometimes', 'nullable', 'integer', 'exists:staff_members,id'],
        ]);

        $shift->update($validated);

        return response()->json($shift->load(['role', 'staffMember']), 200);
    }

    public function destroy(string $id)
    {
        $shift = Shift::findOrFail($id);

        $shift->delete();

        return response()->noContent();
    }
}
