<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\StaffMember;
use Illuminate\Http\Request;

class StaffMemberController extends Controller
{
    public function index()

    {
        return StaffMember::with('role')->get();
    }

    public function show(string $id)
    {
        return StaffMember::with('role')->findOrFail($id);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'phone_number' => ['required', 'string', 'max:50'],
            'role_id' => ['required', 'integer', 'exists:roles,id'],
        ]);

        $staffMember = StaffMember::create($validated);

        return response()->json($staffMember->load('role'), 201);
    }

    public function update(Request $request, string $id)
    {
        $staffMember = StaffMember::findOrFail($id);

        $validated = $request->validate([
            'name' => ['sometimes', 'string', 'max:255'],
            'phone_number' => ['sometimes', 'string', 'max:50'],
            'role_id' => ['sometimes', 'integer', 'exists:roles,id'],
        ]);

        $staffMember->update($validated);

        return $staffMember->load('role');
    }

    public function destroy(string $id)
    {
        $staffMember = StaffMember::findOrFail($id);

        $staffMember->delete();

        return response()->noContent();
    }
}

