
import heapq

class Node:
    def __init__(self, char, freq):
        self.char = char
        self.freq = freq
        self.left = None
        self.right = None

    # So sánh các đối tượng Node dựa trên tần số của chúng
    def __lt__(self, other):
        return self.freq < other.freq

def build_huffman_tree(frequencies):
    priority_queue = []
    for char, freq in frequencies.items():
        heapq.heappush(priority_queue, Node(char, freq))

    while len(priority_queue) > 1:
        left = heapq.heappop(priority_queue)
        right = heapq.heappop(priority_queue)

        merged = Node(None, left.freq + right.freq)
        merged.left = left
        merged.right = right

        heapq.heappush(priority_queue, merged)

    return priority_queue[0]

def generate_huffman_codes(node, current_code, huffman_codes):
    if node is None:
        return

    if node.char is not None:
        huffman_codes[node.char] = current_code
        return

    generate_huffman_codes(node.left, current_code + "0", huffman_codes)
    generate_huffman_codes(node.right, current_code + "1", huffman_codes)

def huffman_coding(text):
    # 1. Tính tần số của các ký tự
    frequencies = defaultdict(int)
    for char in text:
        frequencies[char] += 1

    # 2. Xây dựng cây Huffman
    huffman_tree = build_huffman_tree(frequencies)

    # 3. Tạo mã Huffman
    huffman_codes = {}
    generate_huffman_codes(huffman_tree, "", huffman_codes)

    # 4. Mã hóa văn bản
    encoded_text = "".join(huffman_codes[char] for char in text)

    return encoded_text, huffman_codes
