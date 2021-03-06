<?php

namespace App\Models;
use App\User;

use Illuminate\Database\Eloquent\Model;

class SocialAccount extends Model
{
  protected $fillable = [
      'user_id',
      'provider',
      'social_id',
      'name',
      'email',
      'avatar',
  ];

  public function user()
  {
      return $this->belongsTo(User::class);
  }
}
