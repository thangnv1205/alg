class Node {
    constructor(char, freq, left = null, right = null) {
        this.char = char;
        this.freq = freq;
        this.left = left;
        this.right = right;
    }
}

// Priority Queue implementation (simple array-based for demonstration)
class PriorityQueue {
    constructor() {
        this.collection = [];
    }

    enqueue(element) {
        this.collection.push(element);
        this.sort();
    }

    dequeue() {
        return this.collection.shift();
    }

    sort() {
        this.collection.sort((a, b) => a.freq - b.freq);
    }

    size() {
        return this.collection.length;
    }
}

function buildHuffmanTree(frequencies) {
    const pq = new PriorityQueue();

    for (const char in frequencies) {
        pq.enqueue(new Node(char, frequencies[char]));
    }

    while (pq.size() > 1) {
        const left = pq.dequeue();
        const right = pq.dequeue();

        const merged = new Node(null, left.freq + right.freq, left, right);
        pq.enqueue(merged);
    }

    return pq.dequeue();
}

function generateHuffmanCodes(node, currentCode, huffmanCodes) {
    if (node === null) {
        return;
    }

    if (node.char !== null) {
        huffmanCodes[node.char] = currentCode;
        return;
    }

    generateHuffmanCodes(node.left, currentCode + "0", huffmanCodes);
    generateHuffmanCodes(node.right, currentCode + "1", huffmanCodes);
}

function encode(text, huffmanCodes) {
    let encodedText = "";
    for (const char of text) {
        encodedText += huffmanCodes[char];
    }
    return encodedText;
}

function decode(encodedText, huffmanTree) {
    let decodedText = "";
    let current = huffmanTree;

    for (const bit of encodedText) {
        if (bit === '0') {
            current = current.left;
        } else {
            current = current.right;
        }

        if (current.char !== null) {
            decodedText += current.char;
            current = huffmanTree; // Reset to root for next character
        }
    }
    return decodedText;
}

function huffmanCoding(text) {
    // 1. Tính tần số của các ký tự
    const frequencies = {};
    for (const char of text) {
        frequencies[char] = (frequencies[char] || 0) + 1;
    }

    // 2. Xây dựng cây Huffman
    const huffmanTree = buildHuffmanTree(frequencies);

    // 3. Tạo mã Huffman
    const huffmanCodes = {};
    generateHuffmanCodes(huffmanTree, "", huffmanCodes);

    // 4. Mã hóa văn bản
    const encodedText = encode(text, huffmanCodes);

    return { encodedText, huffmanCodes, huffmanTree };
}

// Ví dụ sử dụng:
const text = "this is an example for huffman encoding";
const { encodedText, huffmanCodes, huffmanTree } = huffmanCoding(text);

console.log("Mã Huffman:", huffmanCodes);
console.log("Văn bản được mã hóa:", encodedText);

const decodedText = decode(encodedText, huffmanTree);
console.log("Văn bản được giải mã:", decodedText);
console.log("Văn bản gốc == Văn bản được giải mã:", text === decodedText);
