/**
 * @file rsa_algorithm.js
 * @description Implementation of RSA (Rivest-Shamir-Adleman) algorithm in JavaScript.
 * RSA is an asymmetric encryption algorithm used for secure data transmission.
 * It uses Node.js's built-in crypto module for key generation, encryption, and decryption.
 * @author Algorithm Collection
 * @version 1.0
 */

const crypto = require('crypto');

/**
 * Tạo một cặp khóa RSA (khóa công khai và khóa riêng tư).
 * Kích thước khóa được đặt là 2048 bit, một kích thước phổ biến và an toàn.
 * @returns {Promise<{publicKey: string, privateKey: string}>} - Một Promise giải quyết với một đối tượng
 *                                                               chứa khóa công khai và khóa riêng tư ở định dạng PEM.
 */
function generateKeyPair() {
    return new Promise((resolve, reject) => {
        crypto.generateKeyPair('rsa', { // Chỉ định thuật toán là RSA
            modulusLength: 2048, // Kích thước khóa 2048 bit
            publicKeyEncoding: {
                type: 'spki', // Subject Public Key Info
                format: 'pem' // Privacy-Enhanced Mail
            },
            privateKeyEncoding: {
                type: 'pkcs8', // Private-Key Information Syntax Standard
                format: 'pem',
                // cipher: 'aes-256-cbc', // Tùy chọn: mã hóa khóa riêng tư bằng mật khẩu
                // passphrase: 'topsecret'
            }
        }, (err, publicKey, privateKey) => {
            if (err) reject(err); // Xử lý lỗi nếu quá trình tạo khóa thất bại
            resolve({ publicKey, privateKey }); // Trả về khóa công khai và khóa riêng tư
        });
    });
}

/**
 * Mã hóa dữ liệu văn bản thuần túy bằng khóa công khai RSA.
 * Sử dụng padding OAEP với SHA256 để tăng cường bảo mật.
 * @param {string} plaintext - Dữ liệu văn bản thuần túy cần mã hóa.
 * @param {string} publicKey - Khóa công khai RSA ở định dạng PEM.
 * @returns {string} - Dữ liệu đã mã hóa được biểu diễn dưới dạng chuỗi Base64.
 */
function encrypt(plaintext, publicKey) {
    const encrypted = crypto.publicEncrypt(
        {
            key: publicKey,
            padding: crypto.constants.RSA_PKCS1_OAEP_PADDING, // Sử dụng padding OAEP
            oaepHash: 'sha256', // Sử dụng SHA256 cho hàm băm OAEP
        },
        Buffer.from(plaintext) // Chuyển đổi văn bản thuần túy thành Buffer
    );
    return encrypted.toString('base64'); // Chuyển đổi Buffer đã mã hóa thành chuỗi Base64
}

/**
 * Giải mã dữ liệu đã mã hóa bằng khóa riêng tư RSA.
 * Sử dụng padding OAEP với SHA256 để giải mã.
 * @param {string} ciphertext - Dữ liệu đã mã hóa (chuỗi Base64) cần giải mã.
 * @param {string} privateKey - Khóa riêng tư RSA ở định dạng PEM.
 * @returns {string} - Dữ liệu văn bản thuần túy đã giải mã.
 */
function decrypt(ciphertext, privateKey) {
    const decrypted = crypto.privateDecrypt(
        {
            key: privateKey,
            padding: crypto.constants.RSA_PKCS1_OAEP_PADDING, // Sử dụng padding OAEP
            oaepHash: 'sha256', // Sử dụng SHA256 cho hàm băm OAEP
        },
        Buffer.from(ciphertext, 'base64') // Chuyển đổi chuỗi Base64 đã mã hóa thành Buffer
    );
    return decrypted.toString('utf8'); // Chuyển đổi Buffer đã giải mã thành chuỗi utf8
}

/**
 * Hàm chính để trình diễn việc sử dụng thuật toán RSA.
 */
async function main() {
    try {
        // 1. Tạo một cặp khóa RSA
        const { publicKey, privateKey } = await generateKeyPair();
        console.log("Khóa công khai:\n" + publicKey);
        console.log("Khóa riêng tư:\n" + privateKey);

        // 2. Tin nhắn gốc cần mã hóa
        const message = "Hello RSA!";
        console.log("Tin nhắn gốc: " + message);

        // 3. Mã hóa tin nhắn bằng khóa công khai
        const encryptedMessage = encrypt(message, publicKey);
        console.log("Tin nhắn được mã hóa: " + encryptedMessage);

        // 4. Giải mã tin nhắn bằng khóa riêng tư
        const decryptedMessage = decrypt(encryptedMessage, privateKey);
        console.log("Tin nhắn được giải mã: " + decryptedMessage);

        // 5. Xác minh rằng tin nhắn gốc và tin nhắn đã giải mã khớp nhau
        console.log("Tin nhắn gốc == Tin nhắn được giải mã: " + (message === decryptedMessage));

    } catch (error) {
        console.error("Lỗi: ", error);
    }
}

// Chạy hàm chính khi script được thực thi trực tiếp
main();
