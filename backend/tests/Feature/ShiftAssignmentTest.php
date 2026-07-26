<?php

namespace Tests\Feature;

use App\Models\Role;
use App\Models\Shift;
use App\Models\StaffMember;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class ShiftAssignmentTest extends TestCase
{
    use RefreshDatabase;

    public function test_staff_member_can_be_created(): void
    {
        $role = Role::create([
            'name' => 'server',
        ]);

        $response = $this->postJson('/api/staff', [
            'name' => 'Derek',
            'phone_number' => '555-1234',
            'role_id' => $role->id,
        ]);

        $response
            ->assertCreated()
            ->assertJsonPath('name', 'Derek')
            ->assertJsonPath('phone_number', '555-1234')
            ->assertJsonPath('role_id', $role->id);

        $this->assertDatabaseHas('staff_members', [
            'name' => 'Derek',
            'phone_number' => '555-1234',
            'role_id' => $role->id,
        ]);
    }

    public function test_shift_can_be_created(): void
    {
        $role = Role::create([
            'name' => 'cook',
        ]);

        $response = $this->postJson('/api/shifts', [
            'shift_date' => '2026-07-28',
            'start_time' => '09:00',
            'end_time' => '17:00',
            'role_id' => $role->id,
        ]);

        $response
            ->assertCreated()
            ->assertJsonPath('shift_date', '2026-07-28')
            ->assertJsonPath('role_id', $role->id);

        $this->assertDatabaseHas('shifts', [
            'shift_date' => '2026-07-28',
            'role_id' => $role->id,
            'staff_member_id' => null,
        ]);
    }

    public function test_matching_staff_member_can_be_assigned_to_shift(): void
    {
        $role = Role::create([
            'name' => 'server',
        ]);

        $staffMember = StaffMember::create([
            'name' => 'Derek',
            'phone_number' => '555-1234',
            'role_id' => $role->id,
        ]);

        $shift = Shift::create([
            'shift_date' => '2026-07-28',
            'start_time' => '09:00',
            'end_time' => '13:00',
            'role_id' => $role->id,
            'staff_member_id' => null,
        ]);

        $response = $this->patchJson(
            "/api/shifts/{$shift->id}/assign",
            [
                'staff_member_id' => $staffMember->id,
            ]
        );

        $response
            ->assertOk()
            ->assertJsonPath('staff_member_id', $staffMember->id);

        $this->assertDatabaseHas('shifts', [
            'id' => $shift->id,
            'staff_member_id' => $staffMember->id,
        ]);
    }

    public function test_staff_member_with_wrong_role_cannot_be_assigned(): void
    {
        $serverRole = Role::create([
            'name' => 'server',
        ]);

        $cookRole = Role::create([
            'name' => 'cook',
        ]);

        $cook = StaffMember::create([
            'name' => 'Test Cook',
            'phone_number' => '555-5678',
            'role_id' => $cookRole->id,
        ]);

        $serverShift = Shift::create([
            'shift_date' => '2026-07-28',
            'start_time' => '09:00',
            'end_time' => '13:00',
            'role_id' => $serverRole->id,
            'staff_member_id' => null,
        ]);

        $response = $this->patchJson(
            "/api/shifts/{$serverShift->id}/assign",
            [
                'staff_member_id' => $cook->id,
            ]
        );

        $response
            ->assertUnprocessable()
            ->assertJson([
                'message' => 'Staff member role does not match the shift role.',
            ]);

        $this->assertDatabaseHas('shifts', [
            'id' => $serverShift->id,
            'staff_member_id' => null,
        ]);
    }

    public function test_staff_member_cannot_be_assigned_to_overlapping_shift(): void
    {
        $role = Role::create([
            'name' => 'server',
        ]);

        $staffMember = StaffMember::create([
            'name' => 'Derek',
            'phone_number' => '555-1234',
            'role_id' => $role->id,
        ]);

        Shift::create([
            'shift_date' => '2026-07-28',
            'start_time' => '09:00',
            'end_time' => '13:00',
            'role_id' => $role->id,
            'staff_member_id' => $staffMember->id,
        ]);

        $overlappingShift = Shift::create([
            'shift_date' => '2026-07-28',
            'start_time' => '12:00',
            'end_time' => '16:00',
            'role_id' => $role->id,
            'staff_member_id' => null,
        ]);

        $response = $this->patchJson(
            "/api/shifts/{$overlappingShift->id}/assign",
            [
                'staff_member_id' => $staffMember->id,
            ]
        );

        $response
            ->assertUnprocessable()
            ->assertJson([
                'message' =>
                    'Staff member already has an overlapping shift.',
            ]);

        $this->assertDatabaseHas('shifts', [
            'id' => $overlappingShift->id,
            'staff_member_id' => null,
        ]);
    }

    public function test_back_to_back_shifts_are_allowed(): void
    {
        $role = Role::create([
            'name' => 'server',
        ]);

        $staffMember = StaffMember::create([
            'name' => 'Derek',
            'phone_number' => '555-1234',
            'role_id' => $role->id,
        ]);

        Shift::create([
            'shift_date' => '2026-07-28',
            'start_time' => '09:00',
            'end_time' => '13:00',
            'role_id' => $role->id,
            'staff_member_id' => $staffMember->id,
        ]);

        $nextShift = Shift::create([
            'shift_date' => '2026-07-28',
            'start_time' => '13:00',
            'end_time' => '17:00',
            'role_id' => $role->id,
            'staff_member_id' => null,
        ]);

        $response = $this->patchJson(
            "/api/shifts/{$nextShift->id}/assign",
            [
                'staff_member_id' => $staffMember->id,
            ]
        );

        $response->assertOk();

        $this->assertDatabaseHas('shifts', [
            'id' => $nextShift->id,
            'staff_member_id' => $staffMember->id,
        ]);
    }
}