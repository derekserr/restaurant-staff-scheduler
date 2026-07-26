<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Shift;
use Illuminate\Http\Request;
use App\Models\StaffMember;

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

    public function assign(Request $request, string $id)
    {
        $shift = Shift::findOrFail($id);

        $validated = $request->validate([
            'staff_member_id' => [
                'required',
                'integer',
                'exists:staff_members,id',
            ],
        ]);

        $staffMember = StaffMember::findOrFail(
            $validated['staff_member_id']
        );

        if ($staffMember->role_id !== $shift->role_id) {
            return response()->json(['message' => 'Staff member role does not match the shift role.'], 422);
        }

        // Check for overlap

        $hasOverlap = Shift::where(
                'staff_member_id',
                $staffMember->id
            )
            ->where('shift_date', $shift->shift_date)
            ->where('id', '!=', $shift->id)
            ->where('start_time', '<', $shift->end_time)
            ->where('end_time', '>', $shift->start_time)
            ->exists();

        if ($hasOverlap) {
            return response()->json(['message' => 'Staff member already has an overlapping shift.'], 422);
        }

        $shift->staff_member_id = $staffMember->id;
        $shift->save();

        return $shift->load(['role', 'staffMember']);
    }
}
