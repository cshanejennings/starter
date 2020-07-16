<?php

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class BetaSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('users')->insert([
          'first_name' =>env('ADMIN_FIRST_NAME'),
          'last_name' => env('ADMIN_LAST_NAME'),
          'email' => env('ADMIN_EMAIL'),
          'email_verified_at' => new DateTime(),
          'sms_number' => env('ADMIN_TWILIO_NUMBER'),
          'sms_name' => env('ADMIN_SMS_NAME'),
          'company_name' => env('ADMIN_COMPANY_NAME'),
          'type' => 'admin',
          'created_at' => new DateTime(),
          'password' => bcrypt(env('ADMIN_PASSWORD')),
        ]);

        DB::table('users')->insert([
          'first_name' =>env('USER_FIRST_NAME'),
          'last_name' => env('USER_LAST_NAME'),
          'email' => env('USER_EMAIL'),
          'email_verified_at' => new DateTime(),
          'sms_number' => env('USER_TWILIO_NUMBER'),
          'sms_name' => env('USER_SMS_NAME'),
          'company_name' => env('USER_COMPANY_NAME'),
          'type' => 'subscriber',
          'created_at' => new DateTime(),
          'password' => bcrypt(env('USER_PASSWORD')),
        ]);

    }
}
