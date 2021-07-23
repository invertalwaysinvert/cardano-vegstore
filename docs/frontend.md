---
title: Front End documentation
layout: template
filename: frontend
---

# Front end documentation

## Folder structure

Front end code is inside folder cardanoshop, we describe the following folder structure:

    cardanoshop
    - src
      - app
	      - authenticate
	      - homepage
	      - helpers
	      - member-area
		      - wallet-create
      - assets: contains static files css, img etc.
      - environments: defines the environment variable for dev and prod

Important files in root folder are:
 - package.json: defines dependencies, build scripts and so on.
 - proxy.conf.json: only used for development, otherwise should raise a CORS error when you try access backend.

## Home page components

These components define a header, body and footer and they repeats every page. The only really important here is the header.component, this component controls authentication.

Important functions:

```
triggerModal()
- opens a modal screen for user authentication using google api.
ngOnInit() checks if user is authenticated already and act accordingly filling the variables.
```

## Members area components

## Authentication components

_authenticate.component_ controls login basic functions, when user is definitely recognised by Google as valid using _SocialAuthService_ it returns a callback and we can execute again to finally authenticate that user in our backend.

```
this.authService.authState.subscribe((socialUser) => {
if (socialUser && socialUser.email) {
this.user = socialUser;
this.loggedIn = (socialUser != null);
this.loginService.login(socialUser.email)
.subscribe(accessToken  => {
this.environment.currentUser = socialUser.email
localStorage.setItem('userId', socialUser.id);
localStorage.setItem('userName', socialUser.name);
localStorage.setItem('userEmail', socialUser.email);
localStorage.setItem('photoUrl', socialUser.photoUrl);
})
} else {
alert('You are not authorized to see this content.')
}
```

This step is important even for a very simple application like ours we can't allow anyone to call the services in our backend, clients must be first authenticated using something.

After user is considered valid, the backend answers with the accessToken like this:

```
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2MjY5OTQzMDksImV4cCI6MTYyNzA4MDcwOX0.v-FNyRygnzlRqlLdW-r2OOg9cacaszlKpBTyaG32hUs
```

This accessToken is stored on our client in the localSessionStorage:

```
login(email: string) {
return  this.http.post(`${environment.node_url}/login`, {email:  email})
.pipe(map((data: any) => {
this.environment.accessToken = data.accessToken
let  headers = new  HttpHeaders()
.set('Authorization', 'Bearer ' + data.accessToken)
.set('Content-Type', 'application/json')
this.environment.headers = headers
return  data.accessToken
}));
}
```

This piece of code you can find in _login.service.ts_ what it does is receive the accessToken from backend and store using the _SessionStorage_ class.

As we don't want everybody calling services without a token we need to ensure that frontend wouldn't try anytime to access the backend without the correct headers, the following code can be found in the _/helpers/auth-interceptor.ts_

```
if (err  instanceof  HttpErrorResponse && (err.status == 401 || err.status == 403)) {
alert('Your session has expired.')
this.environment.accessToken = null
this.environment.headers = null
this.environment.currentUser = null
this.router.navigate([''], { queryParams: { returnUrl:  request.url } });
return  of(err  as  any);
}
```

That's all about authentication we need for now!
