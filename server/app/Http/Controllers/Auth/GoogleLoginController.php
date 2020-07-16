<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

use Laravel\Socialite\Facades\Socialite;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

use App\User;
use App\Models\SocialAccount;

class GoogleLoginController extends Controller
{
  public function loginUrl(Request $request) {
    return response()->json([
      'url' => Socialite::driver('google')->stateless()->redirect()->getTargetUrl(),
    ], 200);
  }

  public function loginCallback(Request $request) {
    $google_user = Socialite::driver('google')->stateless()->user();
    $user_details = $google_user->getRaw();

    $socialAccount = SocialAccount::firstOrNew([
      'social_id' => $google_user->getId(),
      'provider' => 'google'
    ], [
      'email' => $google_user->getEmail(),
      'name' => $google_user->getName(),
      'avatar' => $google_user->getAvatar(),
    ]);

    if (!$socialAccount->user_id) {
        $user = User::firstOrCreate([
            'email' => $google_user->getEmail(),
        ], [
            'name' => $google_user->getName(),
            'type' => 'subscriber'
        ]);
        $socialAccount->fill(['user_id' => $user->id])->save();
    } else {
      $user = User::where('id', $socialAccount->user_id)->get()->first();
    }

    Auth::login($user);
    return response()->json([
        'user' => $user,
        'google_user' => $google_user,
    ]);
  }
}
