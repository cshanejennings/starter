
## Application initialization

Before the application starts, axios will make a call to `sanctum/csrf-cookie` to set the **XSRF_TOKEN** in the session header.

``` mermaid
sequenceDiagram
APP ->> SANCTUM: sanctum/csrf-cookie
SANCTUM ->> APP: XSRF_TOKEN
```
### Logging in
Once this connection has been made, the application will check local storage for user data.
 - If the user data is found, it will
	 - pull the model into the client app
	 - make a request to `api/threads` to get the active threads.
 - If the user data is not found, it will Prompt the user to log in

```mermaid
graph TD
C[APP_READY] -- check user data --> D{ls.user}
D -- no --> H[USER: No Credentials]
D -- If User Data is Found in local storage --> E(get-threads)
subgraph api
E -- 200 --> F(threads array)
E -- 401 --> G(ERROR: expired login)
end
G --> I[USER: Login prompt]
H[USER: No Credentials]  --> I
F --> J[USER: Display Messages]
```
