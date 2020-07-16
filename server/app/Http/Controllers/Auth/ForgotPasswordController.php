<?php

namespace App\Http\Controllers\Auth;

use Carbon\Carbon;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\DB;
use Illuminate\Auth\Passwords\PasswordBroker;

use App\User;
use App\Http\Controllers\Controller;
use App\Mail\PasswordReset;

class ForgotPasswordController extends Controller
{
    private function user_not_found() {
        $msg = "This email not available for password reset.";
        return response()->json(['error' => $msg], 401);
    }

    private function invalid_token() {
        $msg = "Invalid reset token.";
        return response()->json(['error' => $msg], 401);
    }

    private function token_expired($token) {
        DB::table('password_resets')->where('token', $token)->delete();
        $msg = "Token expired.";
        return response()->json(['error' => $msg], 401);
    }

    private function token_remaining_time($tokenData) {
        $token_created = Carbon::parse($tokenData->created_at);
        $totalDuration = $token_created->diffInSeconds(Carbon::now());
        $threshold = config('auth.passwords.users.expire') * 60;
        return $threshold - $totalDuration;
    }


    public function get_token(Request $request) {
      $email = $request->input('email');
      $user = User::where('email', $email)->get()->first();
      if ( !$user ) return $this->user_not_found();
      DB::table('password_resets')->where('email', $email)->delete();
      $token = app(PasswordBroker::class)->createToken($user);
      $tokenData = DB::table('password_resets')->where('email', $email)->first();
      $token = $tokenData->token;

      // fails due to missing Route::password.reset
      // $user->sendPasswordResetNotification($token);

      Mail::to($user["email"])->send(new PasswordReset(array(
          "first_name" => $user["first_name"],
          "ip_address" => request()->ip(),
          "reset_email_token" => base64_encode($token),
      )));

      return response()->json([
          "success" => true,
          "message" => "Your password reset link has been emailed to you, please allow some time for delivery.",
      ], 200);
    }

    public function test_token(Request $request, $token) {
        $token = base64_decode($token);
        $tokenData = DB::table('password_resets')->where('token', $token)->first();
        if ( !$tokenData ) return $this->invalid_token();
        $remaining = $this->token_remaining_time($tokenData);
        if ( $remaining <= 0 ) return $this->token_expired($token);

        return response()->json([
            "success" => true,
            "email" => $tokenData->email,
            "remaining" => $remaining,
        ], 200);

    }

    public function reset_password(Request $request, $token)
    {
        $token = base64_decode($token);
        // User Validation logic
        $email = $request->input('email');
        $user = User::where('email', $email)->get()->first();
        if ( !$user ) return $this->user_not_found();

        // Token validation logic
        $tokenData = DB::table('password_resets')
            ->where('token', $token)
            ->where('email', $email)
            ->first();
        if ( !$tokenData ) return $this->invalid_token();
        $remaining = $this->token_remaining_time($tokenData);
        if ( $remaining <= 0 ) return $this->token_expired($token);

        // Reset user password
        $password = $request->password;
        $user->password = bcrypt($password);
        $user->update();
        Auth::login($user);
        DB::table('password_resets')->where('email', $email)->delete();
        return $user;
    }
}
