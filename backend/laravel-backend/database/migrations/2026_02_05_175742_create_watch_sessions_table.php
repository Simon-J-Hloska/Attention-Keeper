use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up()
    {
        Schema::create('watch_sessions', function (Blueprint $table) {
            $table->id();
            $table->string('user_name', 50);
            $table->string('service_name', 100); // odpovídá názvu modu (např. Subway Surfers)
            $table->timestamp('start_time')->nullable();
            $table->timestamp('end_time')->nullable();
            $table->integer('duration_seconds')->default(0);
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('watch_sessions');
    }
};