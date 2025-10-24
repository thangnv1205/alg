import java.util.ArrayList;
import java.util.Collections;
import java.util.Comparator;
import java.util.List;

public class fractional_knapsack {

    // Lớp biểu diễn một vật phẩm
    static class Item {
        int weight;
        int value;
        double ratio; // Tỷ lệ giá trị/trọng lượng

        public Item(int weight, int value) {
            this.weight = weight;
            this.value = value;
            this.ratio = (double) value / weight;
        }

        public double getRatio() {
            return ratio;
        }

        @Override
        public String toString() {
            return "(W:" + weight + ", V:" + value + ", R:" + String.format("%.2f", ratio) + ")";
        }
    }

    public static double fractionalKnapsack(int W, List<Item> items) {
        // Sắp xếp các vật phẩm theo tỷ lệ giá trị/trọng lượng giảm dần
        Collections.sort(items, Comparator.comparingDouble(Item::getRatio).reversed());

        double finalValue = 0.0;

        for (Item item : items) {
            if (W >= item.weight) {
                // Lấy toàn bộ vật phẩm
                W -= item.weight;
                finalValue += item.value;
            } else {
                // Lấy một phần của vật phẩm
                finalValue += item.value * ((double) W / item.weight);
                W = 0;
                break;
            }
        }
        return finalValue;
    }

    public static void main(String[] args) {
        // Ví dụ sử dụng:
        int W = 50; // Sức chứa cái túi
        List<Item> items = new ArrayList<>();
        items.add(new Item(10, 60));
        items.add(new Item(20, 100));
        items.add(new Item(30, 120));

        double maxValue = fractionalKnapsack(W, items);
        System.out.println("Giá trị tối đa trong cái túi là: " + maxValue);

        List<Item> items2 = new ArrayList<>();
        items2.add(new Item(10, 10));
        items2.add(new Item(40, 40));
        items2.add(new Item(20, 20));
        items2.add(new Item(30, 30));
        int W2 = 60;
        double maxValue2 = fractionalKnapsack(W2, items2);
        System.out.println("Giá trị tối đa trong cái túi 2 là: " + maxValue2);
    }
}
