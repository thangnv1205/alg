
def activity_selection(activities):
    # Sắp xếp các hoạt động theo thời gian kết thúc
    activities.sort(key=lambda x: x[1])

    n = len(activities)
    if n == 0:
        return []

    # Hoạt động đầu tiên luôn được chọn
    selected_activities = [activities[0]]
    last_finish_time = activities[0][1]

    # Xem xét các hoạt động còn lại
    for i in range(1, n):
        if activities[i][0] >= last_finish_time:
            selected_activities.append(activities[i])
            last_finish_time = activities[i][1]

    return selected_activities
