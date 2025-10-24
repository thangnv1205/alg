class Activity {
    constructor(start, end) {
        this.start = start;
        this.end = end;
    }

    toString() {
        return `(${this.start}, ${this.end})`;
    }
}

function activitySelection(activities) {
    // Sắp xếp các hoạt động theo thời gian kết thúc
    activities.sort((a, b) => a.end - b.end);

    const n = activities.length;
    if (n === 0) {
        return [];
    }

    // Hoạt động đầu tiên luôn được chọn
    const selectedActivities = [activities[0]];
    let lastFinishTime = activities[0].end;

    // Xem xét các hoạt động còn lại
    for (let i = 1; i < n; i++) {
        if (activities[i].start >= lastFinishTime) {
            selectedActivities.push(activities[i]);
            lastFinishTime = activities[i].end;
        }
    }

    return selectedActivities;
}

// Ví dụ sử dụng:
// Mỗi hoạt động là một đối tượng { start, end }
const activities = [
    new Activity(1, 4),
    new Activity(3, 5),
    new Activity(0, 6),
    new Activity(5, 7),
    new Activity(3, 8),
    new Activity(5, 9),
    new Activity(6, 10),
    new Activity(8, 11),
    new Activity(8, 12),
    new Activity(2, 13),
    new Activity(12, 14)
];

const selected = activitySelection(activities);
console.log("Các hoạt động được chọn là:", selected.map(a => a.toString()));
