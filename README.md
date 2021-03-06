## About

This example is a small ready to go implementation of JWE in a server-client applicaton which is based on cisco's node-jose. For details: https://github.com/cisco/node-jose

## Installation

We will need to install node-jose first:
```
 npm install node-jose
 ```
After you're done with installation, you'll just have to import the library as normal:
```javascript
var jose = require('node-jose');
```
## For Encryption
```javascript
jose.JWE.createEncrypt(key).
        update(input).
        final().
        then(function(result) {
          // {result} is a JSON Object -- JWE using the JSON General Serialization
        });
```

## For Decrytion 
```javascript
jose.JWE.createDecrypt(keystore).
        decrypt(input).
        then(function(result) {
          // {result} is a Object with:
          // *  header: the combined 'protected' and 'unprotected' header members
          // *  protected: an array of the member names from the "protected" member
          // *  key: Key used to decrypt
          // *  payload: Buffer of the decrypted content
          // *  plaintext: Buffer of the decrypted content (alternate)
        });
```      
