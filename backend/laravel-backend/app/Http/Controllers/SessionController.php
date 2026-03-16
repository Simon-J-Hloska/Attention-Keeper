<?php

namespace App\Http\Controllers;

use App\Models\WatchSession;
use Illuminate\Http\Request;
use Carbon\Carbon;

class SessionController extends Controller
{
    public function start(Request $request)
    {
        $request->validate([
            'user_name' => 'required|string|max:50',
            'video_name' => 'required|integer',
        ]);

        $session = WatchSession::create([
            'user_name' => $request->user_name,
            'video_name' => $request->video_name,
            'start_time' => Carbon::now(),
            'end_time' => null,
            'duration_seconds' => 0
        ]);

        return response()->json([
            'message' => 'Session started',
            'session_id' => $session->id
        ]);
    }

    public function end(Request $request)
    {
        $request->validate([
            'user_name' => 'required|string|max:50',
             'video_name' => 'required|integer',
        ]);

        $session = WatchSession::where('user_name', $request->user_name)
            ->where('video_name', $request->video_name)
            ->whereNull('end_time')
            ->latest()
            ->first();

        if (!$session) {
            return response()->json([
                'message' => 'Session not found'
            ], 404);
        }

        $session->end_time = Carbon::now();
        $session->duration_seconds = $session->start_time->diffInSeconds($session->end_time);
        $session->save();

        return response()->json([
            'message' => 'Session ended',
            'duration_seconds' => $session->duration_seconds
        ]);
    }

    public function heartbeat(Request $request)
    {
        $request->validate([
            'user_name' => 'required|string|max:50',
            'video_name' => 'required|integer',
        ]);

        $session = WatchSession::where('user_name', $request->user_name)
            ->where('video_name', $request->video_name)
            ->whereNull('end_time')
            ->latest()
            ->first();

        if (!$session) {
            return response()->json(['status' => 'no active session']);
        }

        // Optional: update last activity timestamp
        $session->touch();

        return response()->json(['status' => 'alive']);
    }

    public function getLeaderboard()
    {
        $sessions = WatchSession::whereNotNull('end_time')->get();

        $stats = $sessions->groupBy(function ($item) {
            return $item->video_name . '|' . $item->user_name;
        })->map(function ($group) {
            $first = $group->first();

            return [
                'video_name' => $first->video_name,
                'user_name' => $first->user_name,
                'total_seconds' => $group->sum('duration_seconds')
            ];
        });

        $leaderboard = collect($stats)
            ->groupBy('video_name')
            ->map(function ($group) {

                $top = $group->sortByDesc('total_seconds')->first();

                return [
                    'video_name' => $top['video_name'],
                    'top_student_name' => $top['user_name'],
                    'total_seconds' => (int) $top['total_seconds'],
                    'formatted_time' => gmdate("H:i:s", (int) $top['total_seconds'])
                ];
            })
            ->values();

        return response()->json($leaderboard);
    }
}
