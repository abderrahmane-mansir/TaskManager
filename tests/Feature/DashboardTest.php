<?php

namespace Tests\Feature;

use App\Models\Task;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class DashboardTest extends TestCase
{
    use RefreshDatabase;

    public function test_guests_are_redirected_to_the_login_page()
    {
        $response = $this->get(route('dashboard'));
        $response->assertRedirect(route('login'));
    }

    public function test_guests_can_open_the_landing_page_without_sample_tasks()
    {
        $this->get(route('home'))
            ->assertOk()
            ->assertInertia(fn ($page) => $page
                ->component('welcome')
                ->where('tasks', []));
    }

    public function test_guests_can_open_the_task_creation_form()
    {
        $this->get(route('tasks.create'))
            ->assertOk();
    }

    public function test_guests_can_create_tasks()
    {
        $response = $this->post(route('tasks.store'), [
            'title' => 'Public task',
            'description' => 'This task was created without logging in.',
            'status' => 'waiting',
        ]);

        $response->assertRedirect(route('home'));
        $this->assertDatabaseHas('tasks', [
            'user_id' => null,
            'title' => 'Public task',
            'description' => 'This task was created without logging in.',
        ]);
    }

    public function test_authenticated_users_can_visit_the_dashboard()
    {
        $user = User::factory()->create();
        $this->actingAs($user);

        $response = $this->get(route('dashboard'));
        $response->assertOk();
    }

    public function test_authenticated_users_can_open_the_task_creation_form()
    {
        $user = User::factory()->create();

        $this->actingAs($user)
            ->get(route('tasks.create'))
            ->assertOk();
    }

    public function test_authenticated_users_can_create_a_task()
    {
        $user = User::factory()->create();
        $this->actingAs($user);

        $response = $this->post(route('tasks.store'), [
            'title' => 'Prepare project brief',
            'description' => 'Gather the requirements and write the first draft.',
            'status' => 'in_process',
            'due_date' => '2026-12-01',
        ]);

        $response->assertRedirect(route('home'));
        $this->assertDatabaseHas('tasks', [
            'user_id' => $user->id,
            'title' => 'Prepare project brief',
            'description' => 'Gather the requirements and write the first draft.',
            'status' => 'in_process',
            'due_date' => '2026-12-01',
        ]);
    }

    public function test_task_creation_requires_a_title()
    {
        $user = User::factory()->create();
        $this->actingAs($user);

        $response = $this->post(route('tasks.store'), [
            'description' => 'A task without a title should not be stored.',
        ]);

        $response->assertSessionHasErrors('title');
        $this->assertDatabaseCount('tasks', 0);
    }

    public function test_tasks_are_publicly_viewable_editable_and_deletable()
    {
        $task = Task::create([
            'title' => 'Manage this task',
            'description' => 'Original description',
            'status' => 'waiting',
        ]);

        $this->get(route('tasks.show', $task))->assertOk();
        $this->get(route('tasks.edit', $task))->assertOk();

        $this->patch(route('tasks.update', $task), [
            'title' => 'Updated task',
            'description' => 'Updated description',
            'status' => 'done',
        ])->assertRedirect(route('tasks.show', $task));

        $this->assertDatabaseHas('tasks', [
            'id' => $task->id,
            'title' => 'Updated task',
            'status' => 'done',
        ]);

        $this->delete(route('tasks.destroy', $task))
            ->assertRedirect(route('home'));

        $this->assertDatabaseMissing('tasks', ['id' => $task->id]);
    }
}

