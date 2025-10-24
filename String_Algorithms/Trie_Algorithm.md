
# Trie (Cây tiền tố)

**Mục lục:**

1.  [Mô tả chi tiết](#mô-tả-chi-tiết)
2.  [Mã giả (Pseudocode)](#mã-giả-pseudocode)
3.  [Hướng tiếp cận](#hướng-tiếp-cận)
4.  [Ứng dụng](#ứng-dụng)
5.  [Triển khai (Python)](#triển-khai-python)

---

## Mô tả chi tiết

Trie, còn được gọi là cây tiền tố (prefix tree) hoặc cây kỹ thuật số (digital tree), là một cấu trúc dữ liệu cây được sử dụng để lưu trữ một tập hợp các chuỗi. Nó cho phép tìm kiếm, chèn và xóa chuỗi một cách hiệu quả. Không giống như cây tìm kiếm nhị phân, các nút trong trie không lưu trữ toàn bộ khóa; thay vào đó, vị trí của một nút trong cây xác định khóa mà nó liên kết với.

Mỗi nút trong trie đại diện cho một tiền tố của một chuỗi. Gốc đại diện cho chuỗi rỗng. Mỗi cạnh từ một nút đến con của nó đại diện cho một ký tự. Một chuỗi được biểu diễn bằng đường đi từ gốc đến nút cuối cùng của chuỗi đó. Các nút có thể được đánh dấu để chỉ ra rằng chúng là cuối của một từ.

## Mã giả (Pseudocode)

### Cấu trúc TrieNode

```
class TrieNode is
    children := map of characters to TrieNode
    is_end_of_word := boolean, initialized to false
```

### Chèn (Insert)

```
function insert(word) is
    node := root
    for each char in word do
        if char is not in node.children then
            node.children[char] := new TrieNode()
        node := node.children[char]
    node.is_end_of_word := true
```

### Tìm kiếm (Search)

```
function search(word) is
    node := root
    for each char in word do
        if char is not in node.children then
            return false
        node := node.children[char]
    return node.is_end_of_word
```

### Bắt đầu bằng (Starts With)

```
function starts_with(prefix) is
    node := root
    for each char in prefix do
        if char is not in node.children then
            return false
        node := node.children[char]
    return true
```

## Hướng tiếp cận

1.  **Cấu trúc nút:** Mỗi nút trong trie có một bản đồ (hoặc mảng) các con, nơi mỗi khóa (hoặc chỉ số) đại diện cho một ký tự và giá trị là một con trỏ đến nút con tiếp theo. Ngoài ra, mỗi nút có một cờ boolean `is_end_of_word` để chỉ ra liệu đường đi từ gốc đến nút đó có tạo thành một từ hoàn chỉnh hay không.

2.  **Chèn:** Để chèn một từ, bắt đầu từ gốc. Đối với mỗi ký tự trong từ, kiểm tra xem có nút con tương ứng với ký tự đó hay không. Nếu không, tạo một nút mới. Di chuyển đến nút con và tiếp tục cho đến khi tất cả các ký tự của từ đã được xử lý. Đánh dấu nút cuối cùng là `is_end_of_word = true`.

3.  **Tìm kiếm:** Để tìm kiếm một từ, bắt đầu từ gốc. Đối với mỗi ký tự trong từ, kiểm tra xem có nút con tương ứng hay không. Nếu không tìm thấy nút con cho bất kỳ ký tự nào, từ đó không có trong trie. Nếu tất cả các ký tự được tìm thấy, kiểm tra cờ `is_end_of_word` của nút cuối cùng để xác định xem đó có phải là một từ hoàn chỉnh hay không.

4.  **Bắt đầu bằng:** Để kiểm tra xem có bất kỳ từ nào bắt đầu bằng một tiền tố đã cho hay không, hãy thực hiện tìm kiếm tương tự như tìm kiếm từ. Nếu tất cả các ký tự của tiền tố được tìm thấy, thì có ít nhất một từ bắt đầu bằng tiền tố đó.

## Ứng dụng

*   **Tự động hoàn thành và gợi ý:** Trong các công cụ tìm kiếm, trình soạn thảo văn bản và ứng dụng nhắn tin.
*   **Kiểm tra chính tả:** Để kiểm tra xem một từ có hợp lệ hay không.
*   **Tìm kiếm tiền tố dài nhất:** Tìm tiền tố dài nhất của một chuỗi có trong một tập hợp các chuỗi.
*   **Định tuyến IP:** Trong các bộ định tuyến để tìm đường đi tốt nhất cho các gói dữ liệu.

## Bài toán thực hành (LeetCode)

Trie (cây tiền tố) là một cấu trúc dữ liệu hiệu quả để lưu trữ và tìm kiếm các chuỗi dựa trên tiền tố của chúng. Nó rất hữu ích trong các bài toán liên quan đến tự động hoàn thành, kiểm tra chính tả và tìm kiếm tiền tố.

*   [208. Implement Trie (Prefix Tree)](https://leetcode.com/problems/implement-trie-prefix-tree/)
*   [211. Design Add and Search Word - Data structure design](https://leetcode.com/problems/design-add-and-search-words-data-structure/)
*   [648. Replace Words](https://leetcode.com/problems/replace-words/)
*   [720. Longest Word in Dictionary](https://leetcode.com/problems/longest-word-in-dictionary/)

## Triển khai (Python)

```python
class TrieNode:
    def __init__(self):
        self.children = {}
        self.is_end_of_word = False

class Trie:
    def __init__(self):
        self.root = TrieNode()

    def insert(self, word):
        node = self.root
        for char in word:
            if char not in node.children:
                node.children[char] = TrieNode()
            node = node.children[char]
        node.is_end_of_word = True

    def search(self, word):
        node = self.root
        for char in word:
            if char not in node.children:
                return False
            node = node.children[char]
        return node.is_end_of_word

    def starts_with(self, prefix):
        node = self.root
        for char in prefix:
            if char not in node.children:
                return False
            node = node.children[char]
        return True

# Ví dụ sử dụng:
trie = Trie()
trie.insert("apple")
trie.insert("app")
trie.insert("apricot")

print("Tìm kiếm 'apple':", trie.search("apple"))    # True
print("Tìm kiếm 'app':", trie.search("app"))      # True
print("Tìm kiếm 'ap':", trie.search("ap"))        # False (không phải là từ hoàn chỉnh)
print("Tìm kiếm 'banana':", trie.search("banana"))  # False

print("Bắt đầu bằng 'app':", trie.starts_with("app")) # True
print("Bắt đầu bằng 'ban':", trie.starts_with("ban")) # False
```
