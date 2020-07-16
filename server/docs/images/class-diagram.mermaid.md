## Messaging UML Class Diagram Source
[UML edited here](https://mermaid-js.github.io/mermaid-live-editor/#/edit/)

    classDiagram
    User <|-- Thread
    Thread<|-- Message

    class User{
      #first_name: String
      #last_name: String
      #email: String
      #sms_number: String
      #sms_name: String
      #company_name: String
      -password: String
    }

    class Thread{
      - id: int
      - user_id: int
      - due: ts
      - created_at: ts
      - updated_at: ts
      - deleted_at: ts
      + messages(): HasMany
    }

    class Message{
    - id: int
    - thread_id: int
    - from: phone
    - to: phone
    - msg: string
    - created_at: ts
    - deleted_at: ts
    }

    class TwilioSMS{
    +AccountSid: String
    +SmsStatus: String
    +To: String
    +From: String
    +Body: String
    +SmsMessageSid: String
    +NumMedia: String
    +NumSegments: String
    +MessageSid: String
    +ApiVersion: String
    +MediaUrlX: String
    }

    class Env{
    -TWILIO_SID: String
    -TWILIO_AUTH_TOKEN: String
    }

    ```mermaid
    classDiagram
    User <|-- Thread
    Thread<|-- Message

    class User{
      #first_name: String
      #last_name: String
      #email: String
      #sms_number: String
      #sms_name: String
      #company_name: String
      -password: String
    }

    class Thread{
      - id: int
      - user_id: int
      - due: ts
      - created_at: ts
      - updated_at: ts
      - deleted_at: ts
      + messages(): HasMany
    }

    class Message{
    - id: int
    - thread_id: int
    - from: phone
    - to: phone
    - msg: string
    - created_at: ts
    - deleted_at: ts
    }

    class TwilioSMS{
    +AccountSid: String
    +SmsStatus: String
    +To: String
    +From: String
    +Body: String
    +SmsMessageSid: String
    +NumMedia: String
    +NumSegments: String
    +MessageSid: String
    +ApiVersion: String
    +MediaUrlX: String
    }

    class Env{
    -TWILIO_SID: String
    -TWILIO_AUTH_TOKEN: String
    }

    ```
