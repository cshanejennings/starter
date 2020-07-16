## Incoming message diagram
can be viewed with the [GitHub + Mermaid Chrome Extension](https://chrome.google.com/webstore/detail/github-%2B-mermaid/goiiopgdnkogdbjmncgedmgpoajilohe/related?hl=en)

```mermaid
sequenceDiagram
SMS ->> API: Authenticate
SMS-->> User: Id by "To" phone number
User-->> Message: Search for last "From" number
Message-->> Thread: Get last thread_id
Thread-->> Thread: Create Thread if it doesn't exist
Thread-->> Thread: adjust updated_at
Thread-->> Message: New Message Created
Message-->> User: Update user session

```

## Related Classes

![Messaging UML Diagram](./images/MessagingUML.svg)
