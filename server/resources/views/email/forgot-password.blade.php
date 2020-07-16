<h1>Hi {{$first_name}}</h1>
<p>You recently requested to reset your password for your [Product Name] account. Use the button below to reset it. This password reset is only valid for the next hour.</p>

<a href="{{env('APP_CLIENT_URL')}}/reset-password/{{$reset_email_token}}">Click here to reset your password.</a>

<p>For security, this request was received from the IP address {{$ip_address}}.</p>
<p>If you did not request a password reset, please ignore this email or contact support if you have questions.</p>

<p>Thanks,</p>
The {{env('APP_NAME')}} Team
