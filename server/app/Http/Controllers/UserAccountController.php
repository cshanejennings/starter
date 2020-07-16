<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\User;

class UserAccountController extends Controller
{
  public function get_profile(Request $request) {
    return $request->user();
  }

  public function update_profile(Request $request) {
    $user = User::where('id', $request->user()->id)->get()->first();

    $user->name = $request->input('name');

    $user->save();
    return $user;
  }
}
