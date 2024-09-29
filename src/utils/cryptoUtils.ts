import CryptoJS from 'crypto-js';

const SECRET_KEY = 'p@isakh@!a'; // Replace with a secure secret key

export const encryptToken = (token: string): string => {
  return CryptoJS.AES.encrypt(token, SECRET_KEY).toString();
};

export const decryptToken = (encryptedToken: string): string => {
  try {
    const decryptedBytes = CryptoJS.AES.decrypt(encryptedToken, SECRET_KEY);
    const decryptedToken = decryptedBytes.toString(CryptoJS.enc.Utf8);
    return decryptedToken;
  } catch (error) {
    console.error('Error decrypting token:', error);
    return '';
  }
};
