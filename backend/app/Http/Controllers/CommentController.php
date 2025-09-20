<?php

namespace App\Http\Controllers;

use App\Models\Comment;
use Illuminate\Http\Request;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
class CommentController extends Controller{

    use AuthorizesRequests;

    public function store(Request $request, $post_id)
    {
        $request->validate([
            'comment' => 'required|string|max:255',
        ]);

        $comment = Comment::create([
            'comment' => $request->comment,
            'post_id' => $post_id,
            'user_id' => $request->user()->id,
        ]);

        return response()->json(['message' => 'Comment Created', 'comment' => $comment]);
    }

    public function destroy($comment_id)
    {
        $comment = Comment::findOrFail($comment_id);
        $this->authorize('delete', $comment);
        $comment->delete();
        return response()->json(['message' => 'Post deleted']);
    }
}
