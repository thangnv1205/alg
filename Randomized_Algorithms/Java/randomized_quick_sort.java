import java.util.Arrays;
import java.util.Random;

public class randomized_quick_sort {

    private static Random random = new Random();

    // Hàm phân vùng
    private static int partition(int[] arr, int low, int high) {
        // Chọn một pivot ngẫu nhiên và đặt nó ở cuối
        int pivotIndex = low + random.nextInt(high - low + 1);
        swap(arr, pivotIndex, high);

        int pivot = arr[high];
        int i = (low - 1);

        for (int j = low; j < high; j++) {
            if (arr[j] <= pivot) {
                i++;
                swap(arr, i, j);
            }
        }
        swap(arr, i + 1, high);
        return (i + 1);
    }

    // Hàm hoán đổi hai phần tử trong mảng
    private static void swap(int[] arr, int i, int j) {
        int temp = arr[i];
        arr[i] = arr[j];
        arr[j] = temp;
    }

    // Hàm sắp xếp nhanh ngẫu nhiên
    public static void randomizedQuickSort(int[] arr, int low, int high) {
        if (low < high) {
            int pi = partition(arr, low, high);
            randomizedQuickSort(arr, low, pi - 1);
            randomizedQuickSort(arr, pi + 1, high);
        }
    }

    public static void main(String[] args) {
        int[] arr = {10, 7, 8, 9, 1, 5};
        int n = arr.length;
        randomizedQuickSort(arr, 0, n - 1);
        System.out.println("Mảng đã sắp xếp là:");
        System.out.println(Arrays.toString(arr));

        int[] arr2 = {4, 2, 7, 1, 3, 9, 6, 5, 8};
        int n2 = arr2.length;
        randomizedQuickSort(arr2, 0, n2 - 1);
        System.out.println("Mảng đã sắp xếp 2 là:");
        System.out.println(Arrays.toString(arr2));
    }
}
