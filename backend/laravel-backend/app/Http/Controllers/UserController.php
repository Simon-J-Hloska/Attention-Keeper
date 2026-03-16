<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;

class UserController extends Controller
{
    public function login(Request $request)
    {
        // Validate request
        $validated = $request->validate([
            'user_name' => 'required|string|max:50'
        ]);

        // Find existing user
        $user = User::where('user_name', $validated['user_name'])->first();

        // Create user if it does not exist
        if (!$user) {
            $user = User::create([
                'user_name' => $validated['user_name']
            ]);
        }

        return response()->json([
            'status' => 'success',
            'user' => $user
        ], 200);
    }
}