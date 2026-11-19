import { Form, Head, Link } from '@inertiajs/react';
import { ArrowLeft } from 'lucide-react';
import { store } from '@/actions/App/Http/Controllers/TaskController';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export default function CreateTask() {
    return (
        <>
            <Head title="Create task" />
            <div className="mx-auto flex w-full max-w-2xl flex-1 flex-col gap-6 p-4">
                <div>
                    <Link href="/" className="mb-4 inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground">
                        <ArrowLeft className="size-4" />
                        Back to tasks
                    </Link>
                    <h1 className="text-2xl font-semibold">Create a task</h1>
                    <p className="text-sm text-muted-foreground">
                        Add a task to your list. It will be saved to the database.
                    </p>
                </div>

                <Form action={store.url()} method="post" className="grid gap-5 rounded-xl border p-6">
                    {({ processing, errors }) => (
                        <>
                            <div className="grid gap-2">
                                <Label htmlFor="title">Title</Label>
                                <Input id="title" name="title" placeholder="What needs to be done?" required />
                                {errors.title && <p className="text-sm text-destructive">{errors.title}</p>}
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="description">Description</Label>
                                <textarea
                                    id="description"
                                    name="description"
                                    rows={5}
                                    placeholder="Add some details (optional)"
                                    className="w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50"
                                />
                                {errors.description && <p className="text-sm text-destructive">{errors.description}</p>}
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="status">Status</Label>
                                <select
                                    id="status"
                                    name="status"
                                    defaultValue="waiting"
                                    className="h-10 rounded-md border border-input bg-transparent px-3 text-sm"
                                >
                                    <option value="waiting">Waiting</option>
                                    <option value="in_process">In process</option>
                                    <option value="done">Done</option>
                                </select>
                                {errors.status && <p className="text-sm text-destructive">{errors.status}</p>}
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="due_date">Due date</Label>
                                <Input id="due_date" name="due_date" type="date" />
                                {errors.due_date && <p className="text-sm text-destructive">{errors.due_date}</p>}
                            </div>
                            <div className="flex justify-end gap-3">
                                <Button asChild variant="outline">
                                    <Link href="/">Cancel</Link>
                                </Button>
                                <Button disabled={processing}>Create task</Button>
                            </div>
                        </>
                    )}
                </Form>
            </div>
        </>
    );
}
