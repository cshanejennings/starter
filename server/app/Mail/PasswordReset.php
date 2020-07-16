<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;

class PasswordReset extends Mailable
{
    use Queueable, SerializesModels;

    /**
     * Create a new message instance.
     *
     * @return void
     */
    public function __construct($data)
    {
        $this->subject = "Password reset link";
        $this->from_email = "password_reset@relay.textwaiting.com";
        $this->from_name = env('APP_NAME');
        $this->name = $data["name"];
        $this->reset_email_token = $data["reset_email_token"];
        $this->ip_address = $data["ip_address"];
    }

    /**
     * Build the message.
     *
     * @return $this
     */
     public function build()
     {
         return $this->from($this->from_email, $this->from_name)
         ->subject($this->subject)
         ->view('email.forgot-password')
         ->with([
             'first_name' => $this->first_name,
             'reset_email_token' => $this->reset_email_token,
             'ip_address' => $this->ip_address,
         ]);
     }
}
