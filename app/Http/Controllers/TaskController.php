<?php

namespace App\Http\Controllers;

use App\Models\Task;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class TaskController extends Controller
{
    public function create(): Response
    {
        return Inertia::render('tasks/create');
    }

    public function index(Request $request): Response
    {
        return Inertia::render('dashboard', [
            'tasks' => $request->user()->tasks()->latest()->get(),
        ]);
    }

    public function show(Task $task): Response
    {
        return Inertia::render('tasks/show', [
            'task' => $task,
        ]);
    }

    public function edit(Task $task): Response
    {
        return Inertia::render('tasks/edit', [
            'task' => $task,
        ]);
    }

    public function store(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'title' => ['required', 'string', 'max:255'],
            'description' => ['nullable', 'string', 'max:5000'],
            'status' => ['required', 'in:waiting,in_process,done'],
            'due_date' => ['nullable', 'date'],
        ]);

        $task = new Task($validated);
        $task->user_id = $request->user()?->id;
        $task->save();

        return to_route('home')->with('success', 'Task created.');
    }

    public function update(Request $request, Task $task): RedirectResponse
    {
        $validated = $request->validate([
            'title' => ['required', 'string', 'max:255'],
            'description' => ['nullable', 'string', 'max:5000'],
            'status' => ['required', 'in:waiting,in_process,done'],
            'due_date' => ['nullable', 'date'],
        ]);

        $task->update($validated);

        return to_route('tasks.show', $task)->with('success', 'Task updated.');
    }

    public function destroy(Request $request, Task $task): RedirectResponse
    {
        $task->delete();

        return to_route('home')->with('success', 'Task deleted.');
    }
}
