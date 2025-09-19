<?php

namespace App\Http\Controllers;

use App\Models\Post;
use Illuminate\Http\Request;

abstract class PostController extends Controller
{
    public function index()
    {
        return Post::with('comments')->get();
    }

    public function show($id)
    {
        $post = Post::with('comments')->findOrFail($id);
        return response()->json($post);
    }

    public function create()
    {
        return response()->json(['message' => 'Form endpoint for Blog Create']);
    }

    public function store(Request $request)
    {
        $request->validate([
            'title' => 'required|string|max:255',
            'content' => 'required|string',
        ]);

        $post = Post::create([
            'title' => $request->title,
            'content' => $request->content,
            'user_id' => $request->user()->id,
        ]);

        return response()->json($post);
    }

    public function edit(Post $post)
    {
        return response()->json($post);
    }

    public function update(Request $request, Post $post)
    {
        $this->authorize('update', $post);

        $request->validate([
            'title' => 'required|string|max:255',
            'content' => 'required|string',
        ]);

        $post->update($request->only('title', 'content'));
        return response()->json(['message' => 'Post updated', 'post' => $post]);
    }

    public function destroy(Post $post)
    {
        $this->authorize('delete', $post);
        $post->delete();

        return response()->json(['message' => 'Post deleted']);
    }
}
