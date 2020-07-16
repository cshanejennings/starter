<?php

use Carbon\Carbon;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

use Faker\Factory as Faker;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $faker = Faker::create();

        DB::table('users')->insert([
          'name' =>env('ADMIN_NAME'),
          'email' => env('ADMIN_EMAIL'),
          'type' => 'admin',
          'created_at' => Carbon::now(),
          'email_verified_at' => Carbon::now(),
          'password' => bcrypt(env('ADMIN_PASSWORD')),
        ]);


        foreach (range(1,2) as $index) {

            DB::table('users')->insert([
              'name' => $faker->name,
              'email' => $faker->email,
              'email_verified_at' => Carbon::now(),
              'type' => 'subscriber',
              'created_at' => Carbon::now(),
              'password' => bcrypt('secret'),
            ]);
        }

    }
}
