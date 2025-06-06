import CryptoJS from "crypto-js";

// Replace these with your actual hardcoded values
const SECRET_KEY = "12345678901234567890123456789012"; // 32 characters
const IV = "1234567890123456"; // 16 characters

export const decryptAES = (encryptedText) => {
    
  try {
    const key = CryptoJS.enc.Utf8?.parse(SECRET_KEY);
    const iv = CryptoJS.enc.Utf8?.parse(IV);

    const decrypted = CryptoJS.AES.decrypt(encryptedText, key, {
      iv: iv,
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.Pkcs7,
    });

    const result = decrypted.toString(CryptoJS.enc.Utf8);
    return result;
  } catch (error) {
    console.error("Decryption Error:", error);
    return null;
  }
};
