/**
 * @file sha_algorithm.js
 * @description Implementation of SHA (Secure Hash Algorithm) in JavaScript.
 * This module provides a function to compute SHA-256 hashes using Node.js's built-in crypto module.
 * @author Algorithm Collection
 * @version 1.0
 */

const crypto = require('crypto');

/**
 * Tính toán giá trị băm SHA-256 của dữ liệu đã cho.
 * @param {string} data - Dữ liệu đầu vào dưới dạng chuỗi.
 * @returns {string} - Giá trị băm SHA-256 dưới dạng chuỗi thập lục phân.
 */
function sha256Hash(data) {
    // Tạo một đối tượng băm SHA256
    const hasher = crypto.createHash('sha256');
    // Cập nhật đối tượng băm với dữ liệu (chuyển đổi thành byte)
    hasher.update(data);
    // Lấy giá trị băm dưới dạng chuỗi thập lục phân
    return hasher.digest('hex');
}

// Ví dụ sử dụng:
// Ví dụ 1: Hai tin nhắn giống hệt nhau sẽ tạo ra cùng một giá trị băm
const message1 = "Hello, world!";
const hash1 = sha256Hash(message1);
console.log(`Hash SHA256 của "${message1}": ${hash1}`);

// Ví dụ 2: Một thay đổi nhỏ (khoảng trắng) sẽ tạo ra một giá trị băm hoàn toàn khác
const message2 = "Hello, world! "; // Có một khoảng trắng ở cuối
const hash2 = sha256Hash(message2);
console.log(`Hash SHA256 của "${message2}": ${hash2}`);

// Ví dụ 3: Tin nhắn giống hệt message1
const message3 = "Hello, world!";
const hash3 = sha256Hash(message3);
console.log(`Hash SHA256 của "${message3}": ${hash3}`);

// So sánh các giá trị băm
console.log(`Hash1 == Hash3: ${hash1 === hash3}`); // Nên là True
console.log(`Hash1 == Hash2: ${hash1 === hash2}`); // Nên là False
