namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use MongoDB\Laravel\Eloquent\Model;

class WatchSession extends Model
{
    use HasFactory;
    protected $connection = 'mongodb';
    protected $collection = 'watch_sessions';
    public $timestamps = true;

    protected $fillable = [
        'user_name', 
        'video_id', 
        'start_time', 
        'end_time', 
        'duration_seconds'
    ];

    // Řekneme Laravelu, že tyto sloupce jsou datum a čas
    protected $casts = [
        'start_time' => 'datetime',
        'end_time' => 'datetime',
    ];
}