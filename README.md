# Eventder
The Eventder

Enable CORS - https://stackoverflow.com/questions/40149788/aws-api-gateway-cors-ok-for-options-fail-for-post
Enable CORS SLS - https://serverless.com/blog/cors-api-gateway-survival-guide/#cors-preflight-requests

## userData from Cookie

```js
{
    at_hash: "HQYV3xmA_raE4W7TQ1HLZA"
    aud: "2cebga41r6o40otl3jpnurnef0"
    auth_time: 1562962496
    cognito:groups: ["eu-central-1_ntnGLrfF9_Google"]
    cognito:username: "Google_115224543247075433119"
    email: "maxim71ruswow@gmail.com"
    email_verified: true
    exp: 1562966096
    family_name: "Kudryavtsev"
    given_name: "Maxim"
    iat: 1562962496
    identities: Array(1)
    0: {
        dateCreated: "1556816740836"
        issuer: null
        primary: "true"
        providerName: "Google"
        providerType: "Google"
        userId: "115224543247075433119"
    }
    iss: "https://cognito-idp.eu-central-1.amazonaws.com/eu-central-1_ntnGLrfF9"
    name: "Maxim Kudryavtsev"
    picture: "https://lh4.googleusercontent.com/-uxUX2ux1aLE/AAAAAAAAAAI/AAAAAAAAAAA/ACHi3rdeTNO6KmQOAPrD9vqsi7DsEvPNyw/s96-c/photo.jpg"
    sub: "60481c00-b57f-4c5c-bd54-d44fe153b7d6"
    token_use: "id"
}
```

## AWS Lambdas

### getVkPosts

https://eu-central-1.console.aws.amazon.com/lambda/home?region=eu-central-1#/functions/getVkPosts?tab=graph

## AWS Cognito

https://eventder.auth.eu-central-1.amazoncognito.com/login?response_type=token&client_id=2cebga41r6o40otl3jpnurnef0&redirect_uri=http://localhost:3000

### Google

Google app ID
```
159492328546-p8i8fcbhi8iogc8pkk4bdcrqcsl684d2.apps.googleusercontent.com
```

App secret
```
km2n9VPmzNywt3cBLOXywgV8
```

*maxim71ruswow@gmail.com*

### Facebook

Facebook app ID
```
286321658981626
```

App secret
```
cb93108e2ca70c4e2f303c692845c97b
```

*mac.kudryavtsev@gmail.com*
