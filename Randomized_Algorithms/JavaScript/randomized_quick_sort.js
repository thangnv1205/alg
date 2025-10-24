function swap(arr, i, j) {
    [arr[i], arr[j]] = [arr[j], arr[i]];
}

function partition(arr, low, high) {
    // Chọn một pivot ngẫu nhiên và đặt nó ở cuối
    const pivotIndex = low + Math.floor(Math.random() * (high - low + 1));
    swap(arr, pivotIndex, high);

    const pivot = arr[high];
    let i = (low - 1);

    for (let j = low; j < high; j++) {
        if (arr[j] <= pivot) {
            i++;
            swap(arr, i, j);
        }
    }
    swap(arr, i + 1, high);
    return (i + 1);
}

function randomizedQuickSort(arr, low, high) {
    if (low < high) {
        const pi = partition(arr, low, high);
        randomizedQuickSort(arr, low, pi - 1);
        randomizedQuickSort(arr, pi + 1, high);
    }
}

// Ví dụ sử dụng:
const arr = [10, 7, 8, 9, 1, 5];
randomizedQuickSort(arr, 0, arr.length - 1);
console.log("Mảng đã sắp xếp là:", arr);

const arr2 = [4, 2, 7, 1, 3, 9, 6, 5, 8];
randomizedQuickSort(arr2, 0, arr2.length - 1);
console.log("Mảng đã sắp xếp 2 là:", arr2);
