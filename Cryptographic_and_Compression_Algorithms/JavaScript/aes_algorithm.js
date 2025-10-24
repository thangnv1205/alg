const crypto = require('crypto');

// Hằng số xác định thuật toán mã hóa được sử dụng và độ dài IV
const ALGORITHM = 'aes-256-cbc'; // Sử dụng AES với chế độ CBC và khóa 256 bit
const IV_LENGTH = 16; // Đối với AES, độ dài Khối Khởi tạo (IV) luôn là 16 byte

/**
 * Tạo một khóa ngẫu nhiên cho thuật toán AES.
 * Khóa được tạo có độ dài 32 byte (256 bit).
 * @returns {Promise<Buffer>} - Một Promise giải quyết với khóa AES được tạo dưới dạng Buffer.
 */
async function generateKey() {
    return crypto.randomBytes(32); // Tạo khóa 256-bit (32 byte)
}

/**
 * Mã hóa một tin nhắn văn bản thuần túy bằng khóa AES đã cho.
 * Một IV ngẫu nhiên được tạo cho mỗi lần mã hóa để tăng cường bảo mật.
 * @param {string} message - Tin nhắn văn bản thuần túy cần mã hóa.
 * @param {Buffer} key - Khóa AES (dưới dạng Buffer) được sử dụng để mã hóa.
 * @returns {Promise<string>} - Một Promise giải quyết với tin nhắn đã mã hóa dưới dạng chuỗi hex,
 *                               kết hợp với IV (cũng dưới dạng hex) được phân tách bằng dấu ':'.
 */
async function encrypt(message, key) {
    // Tạo một Khối Khởi tạo (IV) ngẫu nhiên
    const iv = crypto.randomBytes(IV_LENGTH);
    // Tạo một đối tượng Cipher để mã hóa
    const cipher = crypto.createCipheriv(ALGORITHM, Buffer.from(key), iv);
    // Mã hóa tin nhắn, chuyển đổi từ utf8 sang hex
    let encrypted = cipher.update(message, 'utf8', 'hex');
    // Hoàn tất quá trình mã hóa và thêm bất kỳ dữ liệu còn lại nào
    encrypted += cipher.final('hex');
    // Trả về IV và dữ liệu đã mã hóa, được phân tách bằng dấu ':'
    return iv.toString('hex') + ':' + encrypted;
}

/**
 * Giải mã một tin nhắn đã mã hóa bằng khóa AES đã cho.
 * IV được trích xuất từ tin nhắn đã mã hóa.
 * @param {string} encryptedMessage - Tin nhắn đã mã hóa (chuỗi hex với IV) cần giải mã.
 * @param {Buffer} key - Khóa AES (dưới dạng Buffer) được sử dụng để giải mã.
 * @returns {Promise<string>} - Một Promise giải quyết với tin nhắn văn bản thuần túy đã giải mã.
 */
async function decrypt(encryptedMessage, key) {
    // Tách IV và dữ liệu đã mã hóa
    const textParts = encryptedMessage.split(':');
    // Chuyển đổi IV từ hex sang Buffer
    const iv = Buffer.from(textParts.shift(), 'hex');
    // Lấy phần còn lại là dữ liệu đã mã hóa
    const encryptedText = textParts.join(':');
    // Tạo một đối tượng Decipher để giải mã
    const decipher = crypto.createDecipheriv(ALGORITHM, Buffer.from(key), iv);
    // Giải mã dữ liệu, chuyển đổi từ hex sang utf8
    let decrypted = decipher.update(encryptedText, 'hex', 'utf8');
    // Hoàn tất quá trình giải mã và thêm bất kỳ dữ liệu còn lại nào
    decrypted += decipher.final('utf8');
    // Trả về tin nhắn đã giải mã
    return decrypted;
}

/**
 * Hàm chính để trình diễn việc sử dụng thuật toán AES.
 */
async function main() {
    // 1. Tạo một khóa AES ngẫu nhiên
    const key = await generateKey();
    console.log("Khóa được tạo (hex): " + key.toString('hex'));

    // 2. Tin nhắn gốc cần mã hóa
    const originalMessage = "Đây là một tin nhắn bí mật.";
    console.log("Tin nhắn gốc: " + originalMessage);

    // 3. Mã hóa tin nhắn
    const encrypted = await encrypt(originalMessage, key);
    console.log("Tin nhắn được mã hóa: " + encrypted);

    // 4. Giải mã tin nhắn
    const decrypted = await decrypt(encrypted, key);
    console.log("Tin nhắn được giải mã: " + decrypted);

    // 5. Xác minh rằng tin nhắn gốc và tin nhắn đã giải mã khớp nhau
    console.log("Tin nhắn gốc == Tin nhắn được giải mã: " + (originalMessage === decrypted));
}

// Chạy hàm chính khi script được thực thi trực tiếp
main();

