## About

This example is a small ready to go implementation of JWE in a server-client applicaton based on cisco's node-jose
(https://github.com/cisco/node-jose/).

## For Encryption
```
jose.JWE.createEncrypt(key).
        update(input).
        final().
        then(function(result) {
          // {result} is a JSON Object -- JWE using the JSON General Serialization
        });
```

## For Decrytion 
```
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
