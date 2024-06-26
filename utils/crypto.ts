// Example using CryptoJS for encryption (install CryptoJS via npm)
import CryptoJS from "crypto-js";

// Function to encrypt a message
const encryptMessage = (message, key) => {
  const encrypted = CryptoJS.AES.encrypt(message, key).toString();
  return encrypted;
};

// Function to decrypt a message
const decryptMessage = (encryptedMessage, key) => {
  const bytes = CryptoJS.AES.decrypt(encryptedMessage, key);
  const decrypted = bytes.toString(CryptoJS.enc.Utf8);
  return decrypted;
};

// Usage example
const message = "Hello, world!";
const encryptionKey = "supersecretkey123";

const encrypted = encryptMessage(message, encryptionKey);
console.log("Encrypted:", encrypted);

const decrypted = decryptMessage(encrypted, encryptionKey);
console.log("Decrypted:", decrypted);
