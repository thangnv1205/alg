class Item {
    constructor(weight, value) {
        this.weight = weight;
        this.value = value;
        this.ratio = value / weight;
    }

    toString() {
        return `(W:${this.weight}, V:${this.value}, R:${this.ratio.toFixed(2)})`;
    }
}

function fractionalKnapsack(W, items) {
    // Sắp xếp các vật phẩm theo tỷ lệ giá trị/trọng lượng giảm dần
    items.sort((a, b) => b.ratio - a.ratio);

    let finalValue = 0.0;

    for (const item of items) {
        if (W >= item.weight) {
            // Lấy toàn bộ vật phẩm
            W -= item.weight;
            finalValue += item.value;
        } else {
            // Lấy một phần của vật phẩm
            finalValue += item.value * (W / item.weight);
            W = 0;
            break;
        }
    }
    return finalValue;
}

// Ví dụ sử dụng:
const W = 50; // Sức chứa cái túi
const items = [
    new Item(10, 60),
    new Item(20, 100),
    new Item(30, 120)
];

const maxValue = fractionalKnapsack(W, items);
console.log("Giá trị tối đa trong cái túi là:", maxValue);

const items2 = [
    new Item(10, 10),
    new Item(40, 40),
    new Item(20, 20),
    new Item(30, 30)
];
const W2 = 60;
const maxValue2 = fractionalKnapsack(W2, items2);
console.log("Giá trị tối đa trong cái túi 2 là:", maxValue2);
