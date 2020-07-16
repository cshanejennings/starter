<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:sanctum')->get('/user', 'UserAccountController@get_profile');
Route::middleware('auth:sanctum')->post('/user', 'UserAccountController@update_profile');

//TODO  Add from and to boundaries
Route::middleware('auth:sanctum')->get('/threads/open', 'ThreadController@get_open');
Route::middleware('auth:sanctum')->get('/threads/active', 'ThreadController@get_active');

Route::middleware('auth:sanctum')->post('/thread/delete', 'ThreadController@delete');
Route::middleware('auth:sanctum')->post('/thread/status', 'ThreadController@set_status');
Route::middleware('auth:sanctum')->post('/thread/reply', 'SMSMessageController@send_reply');
Route::middleware('auth:sanctum')->post('/thread/start', 'SMSMessageController@start_thread');

// Twilio routes
Route::post('receive-message', 'SMSMessageController@receive');

Route::post('/register', 'Auth\RegisterController@register');
Route::post('/login', 'Auth\LoginController@login');
Route::post('/logout', 'Auth\LoginController@logout');

Route::get('/auth/google/url', 'Auth\GoogleLoginController@loginUrl');
Route::get('/auth/google/callback', 'Auth\GoogleLoginController@loginCallback');

Route::post('forgot-password', 'Auth\ForgotPasswordController@get_token');
Route::get('reset-password/{token}', 'Auth\ForgotPasswordController@test_token');
Route::post('reset-password/{token}', 'Auth\ForgotPasswordController@reset_password');
