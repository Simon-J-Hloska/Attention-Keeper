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

        return response()->json([
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
            'session_id' => 'required|integer|exists:watch_sessions,id',
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
        // 1. Získáme součet časů pro každou službu a uživatele
        $stats = DB::table('watch_sessions')
            ->select('service_name', 'user_name', DB::raw('SUM(duration_seconds) as total_seconds'))
            ->whereNotNull('end_time') // Bereme jen řádně ukončené sessions
            ->groupBy('service_name', 'user_name')
            ->orderBy('service_name')
            ->orderByDesc('total_seconds') // Srovnáme od nejlepšího času
            ->get();

        // 2. Chceme ale vyfiltrovat jen toho "Top" uživatele pro každou službu
        // Zkombinujeme to pomocí Laravel Kolekcí
        $leaderboard = $stats->groupBy('service_name')->map(function ($group) {
            // První záznam ve skupině je ten s nejvyšším časem (díky orderByDesc výše)
            $topUser = $group->first(); 
            
            return [
                'service_name' => $topUser->service_name,
                'top_student_name' => $topUser->user_name,
                'total_seconds' => (int) $topUser->total_seconds,
                // Rovnou to naformátujeme do hezkého stringu 01:23:45 pro UI
                'formatted_time' => gmdate("H:i:s", (int) $topUser->total_seconds) 
            ];
        })->values(); // Resetujeme indexy (aby to bylo čisté pole pro JSON)

        return response()->json($leaderboard);
    }
}
