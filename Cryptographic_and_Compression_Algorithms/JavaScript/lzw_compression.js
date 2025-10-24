/**
 * @file lzw_compression.js
 * @description Implementation of LZW (Lempel-Ziv-Welch) Compression algorithm in JavaScript.
 * LZW is a lossless data compression algorithm that builds a dictionary of sequences.
 * @author Algorithm Collection
 * @version 1.0
 */

/**
 * Nén một chuỗi bằng thuật toán LZW.
 * @param {string} uncompressed - Chuỗi chưa nén.
 * @returns {Array<number>} - Danh sách các mã đã nén.
 */
function lzw_compress(uncompressed) {
    // 1. Khởi tạo từ điển với tất cả các ký tự đơn lẻ (0-255 cho ASCII).
    let dictSize = 256;
    let dictionary = {};
    for (let i = 0; i < dictSize; i++) {
        dictionary[String.fromCharCode(i)] = i;
    }

    let w = ""; // Chuỗi hiện tại đang được xây dựng
    let result = []; // Danh sách các mã đã nén

    // 2. Duyệt chuỗi đầu vào từng ký tự một.
    for (let c of uncompressed) {
        let wc = w + c;
        // 3. Nếu wc đã có trong từ điển, tiếp tục xây dựng w.
        if (dictionary.hasOwnProperty(wc)) {
            w = wc;
        } else {
            // 4. Nếu wc không có trong từ điển, xuất mã của w và thêm wc vào từ điển.
            result.push(dictionary[w]);
            dictionary[wc] = dictSize++; // Thêm chuỗi mới vào từ điển với mã mới
            w = c; // Đặt lại w thành ký tự hiện tại
        }
    }

    // 5. Xuất phần còn lại của w (nếu có).
    if (w !== "") {
        result.push(dictionary[w]);
    }
    return result;
}

/**
 * Giải nén một danh sách các mã LZW thành một chuỗi dữ liệu.
 * @param {Array<number>} compressed - Danh sách các mã đã nén.
 * @returns {string} - Chuỗi đã giải nén.
 */
function lzw_decompress(compressed) {
    // 1. Khởi tạo từ điển giống như trong quá trình nén.
    let dictSize = 256;
    let dictionary = {};
    for (let i = 0; i < dictSize; i++) {
        dictionary[i] = String.fromCharCode(i);
    }

    // 2. Đọc mã đầu tiên, giải mã nó thành một chuỗi và thêm vào kết quả.
    let w = dictionary[compressed[0]];
    let result = [w];
    let entry; // Chuỗi tương ứng với mã hiện tại

    // 3. Lặp qua các mã còn lại.
    for (let i = 1; i < compressed.length; i++) {
        let k = compressed[i];
        // 4. Nếu mã k có trong từ điển, lấy chuỗi tương ứng.
        if (dictionary.hasOwnProperty(k)) {
            entry = dictionary[k];
        } else if (k === dictSize) {
            // 5. Trường hợp đặc biệt: mã mới được tạo ra (w + w[0]).
            entry = w + w.charAt(0);
        } else {
            throw new Error('Dữ liệu nén bị hỏng: ' + k);
        }

        result.push(entry);

        // 6. Thêm chuỗi mới (w + entry[0]) vào từ điển.
        dictionary[dictSize++] = w + entry.charAt(0);

        // 7. Cập nhật w thành entry hiện tại.
        w = entry;
    }
    return result.join('');
}

// Ví dụ sử dụng:
const originalText = "TOBEORNOTTOBEORTOBEORNOT";
console.log("Văn bản gốc: " + originalText);

const compressedCodes = lzw_compress(originalText);
console.log("Mã nén LZW:", compressedCodes);

const decompressedText = lzw_decompress(compressedCodes);
console.log("Văn bản được giải nén:", decompressedText);

console.log("Văn bản gốc == Văn bản được giải nén:", originalText === decompressedText);
