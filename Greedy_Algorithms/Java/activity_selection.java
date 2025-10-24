import java.util.ArrayList;
import java.util.Collections;
import java.util.Comparator;
import java.util.List;

public class activity_selection {

    // Lớp biểu diễn một hoạt động
    static class Activity {
        int start;
        int end;

        public Activity(int start, int end) {
            this.start = start;
            this.end = end;
        }

        @Override
        public String toString() {
            return "(" + start + ", " + end + ")";
        }
    }

    public static List<Activity> activitySelection(List<Activity> activities) {
        // Sắp xếp các hoạt động theo thời gian kết thúc
        Collections.sort(activities, Comparator.comparingInt(a -> a.end));

        int n = activities.size();
        if (n == 0) {
            return new ArrayList<>();
        }

        // Hoạt động đầu tiên luôn được chọn
        List<Activity> selectedActivities = new ArrayList<>();
        selectedActivities.add(activities.get(0));
        int lastFinishTime = activities.get(0).end;

        // Xem xét các hoạt động còn lại
        for (int i = 1; i < n; i++) {
            if (activities.get(i).start >= lastFinishTime) {
                selectedActivities.add(activities.get(i));
                lastFinishTime = activities.get(i).end;
            }
        }

        return selectedActivities;
    }

    public static void main(String[] args) {
        // Ví dụ sử dụng:
        // Mỗi hoạt động là một bộ (thời gian bắt đầu, thời gian kết thúc)
        List<Activity> activities = new ArrayList<>();
        activities.add(new Activity(1, 4));
        activities.add(new Activity(3, 5));
        activities.add(new Activity(0, 6));
        activities.add(new Activity(5, 7));
        activities.add(new Activity(3, 8));
        activities.add(new Activity(5, 9));
        activities.add(new Activity(6, 10));
        activities.add(new Activity(8, 11));
        activities.add(new Activity(8, 12));
        activities.add(new Activity(2, 13));
        activities.add(new Activity(12, 14));

        List<Activity> selected = activitySelection(activities);
        System.out.println("Các hoạt động được chọn là: " + selected);
    }
}
