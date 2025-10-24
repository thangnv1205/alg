function lasVegasSearch(arr, target) {
    const n = arr.length;

    // Trong một ứng dụng thực tế, bạn sẽ muốn giới hạn số lần thử
    // để tránh vòng lặp vô hạn nếu mục tiêu không có trong mảng.
    // Tuy nhiên, theo định nghĩa của thuật toán Las Vegas, nó sẽ tiếp tục
    // cho đến khi tìm thấy câu trả lời đúng.
    while (true) {
        // Chọn ngẫu nhiên một chỉ số
        const idx = Math.floor(Math.random() * n);
        // Kiểm tra xem phần tử tại chỉ số đó có phải là mục tiêu không
        if (arr[idx] === target) {
            return idx;
        }
        // Nếu không, tiếp tục lặp lại.
    }
}

// Ví dụ sử dụng:
const arr = [1, 5, 8, 12, 15, 20, 25, 30];
const target = 15;

const index = lasVegasSearch(arr, target);
console.log(`Phần tử ${target} được tìm thấy tại chỉ số ${index}`);

const target2 = 100;
// Để kiểm tra trường hợp không tìm thấy, bạn có thể thêm một giới hạn lặp
// hoặc xử lý ngoại lệ nếu mục tiêu không có trong mảng.
// Tuy nhiên, theo định nghĩa Las Vegas, nó sẽ tìm thấy nếu có.
// Nếu không có, nó sẽ lặp vô hạn (trong ví dụ này).
// Để tránh điều đó, chúng ta có thể thêm một giới hạn cho vòng lặp while.
// Ví dụ này giả định target luôn có trong arr.
