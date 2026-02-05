<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\WatchSession;
use Carbon\Carbon;

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
}