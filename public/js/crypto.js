var battle = battle || {};

// Self-executing wrapper
(function($) {
  "use strict";


  battle.crypto = {

    encrypt: function encryptByDES(message, key) {
      // For the key, when you pass a string,
      // it's treated as a passphrase and used to derive an actual key and IV.
      // Or you can pass a WordArray that represents the actual key.
      // If you pass the actual key, you must also pass the actual IV.
      var keyHex = CryptoJS.enc.Utf8.parse(key);
      console.log(key);
      console.log(keyHex);
      console.log(CryptoJS.enc.Utf8.stringify(keyHex), CryptoJS.enc.Hex.stringify(keyHex));
      console.log(CryptoJS.enc.Hex.parse(CryptoJS.enc.Utf8.parse(key).toString(CryptoJS.enc.Hex)));
      // CryptoJS use CBC as the default mode, and Pkcs7 as the default padding scheme
      var encrypted = CryptoJS.DES.encrypt(message, keyHex, {
        mode: CryptoJS.mode.ECB,
        padding: CryptoJS.pad.Pkcs7
      });
      // decrypt encrypt result
      var decrypted = CryptoJS.DES.decrypt(encrypted, keyHex, {
        mode: CryptoJS.mode.ECB,
        padding: CryptoJS.pad.Pkcs7
      });
      console.log('decrypted: ' + decrypted.toString(CryptoJS.enc.Utf8));
      // when mode is CryptoJS.mode.CBC (default mode), you must set iv param
      // var iv = 'inputvec';
      // var ivHex = CryptoJS.enc.Hex.parse(CryptoJS.enc.Utf8.parse(iv).toString(CryptoJS.enc.Hex));
      // var encrypted = CryptoJS.DES.encrypt(message, keyHex, { iv: ivHex, mode: CryptoJS.mode.CBC });
      // var decrypted = CryptoJS.DES.decrypt(encrypted, keyHex, { iv: ivHex, mode: CryptoJS.mode.CBC });
      console.log('encrypted.toString()  -> base64(ciphertext)  :', encrypted.toString());
      console.log('base64(ciphertext)    <- encrypted.toString():', encrypted.ciphertext.toString(CryptoJS.enc.Base64));
      console.log('ciphertext.toString() -> ciphertext hex      :', encrypted.ciphertext.toString());
      return encrypted.toString();
    },

    decrypt: function decryptByDES(message, key) {
      // For the key, when you pass a string,
      // it's treated as a passphrase and used to derive an actual key and IV.
      // Or you can pass a WordArray that represents the actual key.
      // If you pass the actual key, you must also pass the actual IV.
      message = $.trim(message);
      console.log('message: ' + $.trim(message));
      console.log('message length: ' + message.length);

      var keyHex = CryptoJS.enc.Utf8.parse(key);
      console.log('keyHex: ' + keyHex);
      console.log('CryptoJS.enc.Utf8.stringify(keyHex) ' + CryptoJS.enc.Utf8.stringify(keyHex));
      console.log('CryptoJS.enc.Hex.stringify(keyHex) ' + CryptoJS.enc.Hex.stringify(keyHex));
      console.log('CryptoJS.enc.Hex.parse(CryptoJS.enc.Utf8.parse(key).toString(CryptoJS.enc.Hex)) ' + CryptoJS.enc.Hex.parse(CryptoJS.enc.Utf8.parse(key).toString(CryptoJS.enc.Hex)));
      // CryptoJS use CBC as the default mode, and Pkcs7 as the default padding scheme
      var decrypted = CryptoJS.DES.decrypt(message, keyHex, {
        mode: CryptoJS.mode.ECB,
        padding: CryptoJS.pad.Pkcs7
      });
      // decrypt encrypt result
      // var decrypted = CryptoJS.DES.decrypt(encrypted, keyHex, {
      //     mode: CryptoJS.mode.ECB,
      //     padding: CryptoJS.pad.Pkcs7
      // });

      var decryptedText = "";
      try {
        decryptedText = decrypted.toString(CryptoJS.enc.Utf8);
      } catch (e) {
        decryptedText = "";
      }

     // console.log('decrypted: ' + decrypted.toString());
      //console.log('decrypted: ' + decrypted.toString(CryptoJS.enc.Utf8));
      // when mode is CryptoJS.mode.CBC (default mode), you must set iv param
      // var iv = 'inputvec';
      // var ivHex = CryptoJS.enc.Hex.parse(CryptoJS.enc.Utf8.parse(iv).toString(CryptoJS.enc.Hex));
      // var encrypted = CryptoJS.DES.encrypt(message, keyHex, { iv: ivHex, mode: CryptoJS.mode.CBC });
      // var decrypted = CryptoJS.DES.decrypt(encrypted, keyHex, { iv: ivHex, mode: CryptoJS.mode.CBC });
      //console.log('encrypted.toString()  -> base64(ciphertext)  :', encrypted.toString());
      //console.log('base64(ciphertext)    <- encrypted.toString():', encrypted.ciphertext.toString(CryptoJS.enc.Base64));
      //console.log('ciphertext.toString() -> ciphertext hex      :', encrypted.ciphertext.toString());
      return decryptedText;
    }




  }



})($);