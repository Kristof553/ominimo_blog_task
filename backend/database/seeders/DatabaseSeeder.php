<?php

namespace Database\Seeders;

use App\Models\Comment;
use App\Models\Post;
use App\Models\User;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        $users = User::factory(10)->create();
        Post::factory(10)->create()->each(function ($post) use ($users) {
            $post->user_id = $users->random()->id;
            $post->save();

            Comment::factory(rand(3, 5))->create([
                'post_id' => $post->id,
                'user_id' => $users->random()->id,
            ]);
        });

    }
}
