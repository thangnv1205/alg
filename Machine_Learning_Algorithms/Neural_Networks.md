
# Mạng nơ-ron (Neural Networks)

**Mục lục:**

1.  [Mô tả chi tiết](#mô-tả-chi-tiết)
2.  [Mã giả (Pseudocode)](#mã-giả-pseudocode)
3.  [Hướng tiếp cận](#hướng-tiếp-cận)
4.  [Ứng dụng](#ứng-dụng)
5.  [Triển khai (Python)](#triển-khai-python)

---

## Mô tả chi tiết

Mạng nơ-ron là một tập hợp các thuật toán học máy được mô phỏng theo cấu trúc và chức năng của bộ não con người. Chúng là nền tảng của học sâu (deep learning) và đã cách mạng hóa nhiều lĩnh vực như thị giác máy tính, xử lý ngôn ngữ tự nhiên và nhận dạng giọng nói.

Một mạng nơ-ron cơ bản bao gồm các lớp (layers) các nút (nodes) được kết nối với nhau. Mỗi nút, hay "nơ-ron", nhận đầu vào từ các nút khác, thực hiện một phép tính đơn giản và sau đó truyền đầu ra của nó đến các nút khác. Các lớp thường được tổ chức thành:

*   **Lớp đầu vào (Input Layer):** Nhận dữ liệu đầu vào.
*   **Các lớp ẩn (Hidden Layers):** Thực hiện các phép tính phức tạp. Một mạng có nhiều lớp ẩn được gọi là mạng nơ-ron sâu.
*   **Lớp đầu ra (Output Layer):** Tạo ra kết quả cuối cùng.

Mỗi kết nối giữa các nơ-ron có một trọng số liên quan đến nó, và mỗi nơ-ron có một độ lệch (bias). Các trọng số và độ lệch này được điều chỉnh trong quá trình huấn luyện để mạng có thể học cách ánh xạ đầu vào thành đầu ra mong muốn.

## Mã giả (Pseudocode) - Mạng truyền thẳng (Feedforward Neural Network)

```
function NeuralNetwork(input_size, hidden_size, output_size, learning_rate) is
    // Khởi tạo trọng số và độ lệch
    weights_input_hidden := random matrix (input_size x hidden_size)
    bias_hidden := zero vector (1 x hidden_size)
    weights_hidden_output := random matrix (hidden_size x output_size)
    bias_output := zero vector (1 x output_size)

    function sigmoid(x) is
        return 1 / (1 + exp(-x))

    function sigmoid_derivative(x) is
        return x * (1 - x)

    function forward(X) is
        hidden_layer_input := dot_product(X, weights_input_hidden) + bias_hidden
        hidden_layer_output := sigmoid(hidden_layer_input)

        output_layer_input := dot_product(hidden_layer_output, weights_hidden_output) + bias_output
        output := sigmoid(output_layer_input)
        return output

    function backward(X, y, output) is
        error := y - output

        d_output := error * sigmoid_derivative(output)
        error_hidden_layer := dot_product(d_output, transpose(weights_hidden_output))
        d_hidden_layer := error_hidden_layer * sigmoid_derivative(hidden_layer_output)

        weights_hidden_output := weights_hidden_output + dot_product(transpose(hidden_layer_output), d_output) * learning_rate
        bias_output := bias_output + sum(d_output) * learning_rate
        weights_input_hidden := weights_input_hidden + dot_product(transpose(X), d_hidden_layer) * learning_rate
        bias_hidden := bias_hidden + sum(d_hidden_layer) * learning_rate

    function train(X, y, epochs) is
        for epoch from 1 to epochs do
            output := forward(X)
            backward(X, y, output)

    function predict(X) is
        return forward(X)
```

## Hướng tiếp cận

Quá trình huấn luyện một mạng nơ-ron bao gồm hai giai đoạn chính:

1.  **Truyền thẳng (Forward Propagation):**
    *   Dữ liệu đầu vào được truyền qua mạng, từ lớp đầu vào, qua các lớp ẩn, đến lớp đầu ra.
    *   Tại mỗi nơ-ron, tổng trọng số của các đầu vào được tính toán và sau đó được truyền qua một hàm kích hoạt (ví dụ: sigmoid, ReLU) để tạo ra đầu ra của nơ-ron đó.

2.  **Truyền ngược (Backpropagation):**
    *   Sau khi mạng tạo ra một dự đoán, sai số giữa dự đoán và giá trị thực tế được tính toán.
    *   Sai số này sau đó được truyền ngược qua mạng, từ lớp đầu ra trở lại lớp đầu vào.
    *   Trong quá trình truyền ngược, các trọng số và độ lệch của mạng được điều chỉnh để giảm thiểu sai số. Điều này được thực hiện bằng cách sử dụng một thuật toán tối ưu hóa như **Gradient Descent**.

Quá trình truyền thẳng và truyền ngược được lặp lại trong nhiều kỷ nguyên (epochs) cho đến khi mạng đạt được hiệu suất mong muốn.

## Ứng dụng

*   **Thị giác máy tính:** Nhận dạng đối tượng, phân loại hình ảnh, phát hiện khuôn mặt.
*   **Xử lý ngôn ngữ tự nhiên:** Dịch máy, phân tích tình cảm, nhận dạng giọng nói.
*   **Hệ thống khuyến nghị:** Đề xuất sản phẩm, phim hoặc nhạc cho người dùng.
*   **Y học:** Chẩn đoán bệnh, phân tích hình ảnh y tế.
*   **Tài chính:** Dự đoán thị trường chứng khoán, phát hiện gian lận.

## Bài toán thực hành (LeetCode)

Mạng nơ-ron là nền tảng của học sâu. Mặc dù LeetCode không có các bài toán trực tiếp yêu cầu triển khai mạng nơ-ron từ đầu, nhưng các bài toán liên quan đến tối ưu hóa, gradient descent, hoặc các cấu trúc dữ liệu liên quan đến đồ thị có thể giúp bạn củng cố kiến thức.

*   [136. Single Number](https://leetcode.com/problems/single-number/) (Liên quan đến phân loại nhị phân)
*   [169. Majority Element](https://leetcode.com/problems/majority-element/) (Liên quan đến việc tìm ra lớp chiếm ưu thế)

## Triển khai (Python)

```python
import numpy as np

class NeuralNetwork:
    def __init__(self, input_size, hidden_size, output_size, learning_rate=0.1):
        self.input_size = input_size
        self.hidden_size = hidden_size
        self.output_size = output_size
        self.learning_rate = learning_rate

        # Khởi tạo trọng số và độ lệch
        # Trọng số từ lớp đầu vào đến lớp ẩn
        self.weights_input_hidden = np.random.randn(input_size, hidden_size)
        self.bias_hidden = np.zeros((1, hidden_size))
        # Trọng số từ lớp ẩn đến lớp đầu ra
        self.weights_hidden_output = np.random.randn(hidden_size, output_size)
        self.bias_output = np.zeros((1, output_size))

    def _sigmoid(self, x):
        return 1 / (1 + np.exp(-x))

    def _sigmoid_derivative(self, x):
        return x * (1 - x)

    def forward(self, X):
        # Lớp ẩn
        self.hidden_layer_input = np.dot(X, self.weights_input_hidden) + self.bias_hidden
        self.hidden_layer_output = self._sigmoid(self.hidden_layer_input)

        # Lớp đầu ra
        self.output_layer_input = np.dot(self.hidden_layer_output, self.weights_hidden_output) + self.bias_output
        self.output = self._sigmoid(self.output_layer_input)
        return self.output

    def backward(self, X, y, output):
        # Tính toán sai số
        error = y - output

        # Gradient cho lớp đầu ra
        d_output = error * self._sigmoid_derivative(output)
        error_hidden_layer = d_output.dot(self.weights_hidden_output.T)
        d_hidden_layer = error_hidden_layer * self._sigmoid_derivative(self.hidden_layer_output)

        # Cập nhật trọng số và độ lệch
        self.weights_hidden_output += self.hidden_layer_output.T.dot(d_output) * self.learning_rate
        self.bias_output += np.sum(d_output, axis=0, keepdims=True) * self.learning_rate
        self.weights_input_hidden += X.T.dot(d_hidden_layer) * self.learning_rate
        self.bias_hidden += np.sum(d_hidden_layer, axis=0, keepdims=True) * self.learning_rate

    def train(self, X, y, epochs):
        for epoch in range(epochs):
            output = self.forward(X)
            self.backward(X, y, output)

    def predict(self, X):
        return self.forward(X)

# Ví dụ sử dụng:
# Dữ liệu XOR
X = np.array([[0, 0], [0, 1], [1, 0], [1, 1]])
y = np.array([[0], [1], [1], [0]])

# Khởi tạo mạng nơ-ron
input_size = 2
hidden_size = 4
output_size = 1
learning_rate = 0.1
epochs = 10000

nn = NeuralNetwork(input_size, hidden_size, output_size, learning_rate)
nn.train(X, y, epochs)

print("Dự đoán sau khi huấn luyện:")
predictions = nn.predict(X)
print(predictions.round())
```
