<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\WatchSession;
use Carbon\Carbon;
use Illuminate\Support\Facades\DB;


class SessionController extends Controller
{
    public function start(Request $request)
    {
        // validace vstupu
        $request->validate([
            'user_name'  => 'required|string|max:50',
            'service_name' => 'required|string|max:100',
        ]);

        // vytvoření nové session
        $session = WatchSession::create([
            'user_name'  => $request->user_name,
            'service_name' => $request->service_name,
            'start_time' => Carbon::now(),
        ]);

        return response()->json(data: [
            'session_id' => $session->id,
            'message' => 'Session started'
        ]);
    }

    /**
     * End video session.
     * Frontend pošle session_id.
     * Backend doplní end_time a spočítá duration.
     */
    public function end(Request $request)
    {
        // validace vstupu
        $request->validate([
            'session_id' => 'required|integer|exists:watch_sessions,id',
        ]);

        $session = WatchSession::findOrFail($request->session_id);

        // pokud už end_time existuje, nic nedělej
        if ($session->end_time !== null) {
            return response()->json([
                'message' => 'Session already ended',
                'duration_seconds' => $session->duration_seconds
            ]);
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
            'session_id' => 'required|string',
        ]);

        // can update last_seen if you want
        return response()->json(['status' => 'alive']);
    }
    /**
     * GET: Načtení leaderboardu pro frontend.
     * Vrátí nejlepšího studenta s nejdelším celkovým časem pro každé video/mod.
     */
    public function getLeaderboard()
    {
        // Get only finished sessions
        $sessions = WatchSession::whereNotNull('end_time')->get();

        // Aggregate total time per user per service
        $stats = $sessions->groupBy(function ($item) {
            return $item->service_name . '|' . $item->user_name;
        })->map(function ($group) {
            $first = $group->first();

            return [
                'service_name' => $first->service_name,
                'user_name' => $first->user_name,
                'total_seconds' => $group->sum('duration_seconds')
            ];
        });

        // Get top user per service
        $leaderboard = collect($stats)
            ->groupBy('service_name')
            ->map(function ($group) {
                $top = $group->sortByDesc('total_seconds')->first();

                return [
                    'service_name' => $top['service_name'],
                    'top_student_name' => $top['user_name'],
                    'total_seconds' => (int) $top['total_seconds'],
                    'formatted_time' => gmdate("H:i:s", (int) $top['total_seconds'])
                ];
            })
            ->values();

        return response()->json($leaderboard);
    }
}
