let N; // Số đỉnh trong đồ thị
let dist; // Ma trận khoảng cách
let minCost; // Chi phí tối thiểu toàn cục

function branchAndBoundTSP(currPath, currCost, level, visited) {
    // Trường hợp cơ sở: Nếu tất cả các đỉnh đã được thăm
    if (level === N) {
        // Thêm chi phí từ đỉnh cuối cùng đến đỉnh bắt đầu
        currCost += dist[currPath[level - 1]][currPath[0]];
        minCost = Math.min(minCost, currCost);
        return;
    }

    // Cận dưới (lower bound) cho các đường đi còn lại
    // Nếu chi phí hiện tại đã lớn hơn hoặc bằng chi phí tối thiểu đã tìm thấy,
    // thì không cần khám phá nhánh này nữa.
    if (currCost >= minCost) {
        return;
    }

    // Lặp qua tất cả các đỉnh chưa được thăm
    for (let i = 0; i < N; i++) {
        if (!visited[i]) {
            // Thêm đỉnh i vào đường đi
            currPath[level] = i;
            visited[i] = true;

            // Gọi đệ quy
            branchAndBoundTSP(currPath, currCost + dist[currPath[level - 1]][i], level + 1, visited);

            // Quay lui: Đánh dấu đỉnh i là chưa được thăm để khám phá các đường đi khác
            visited[i] = false;
        }
    }
}

function solveTSPBnB(graphDist) {
    N = graphDist.length;
    dist = graphDist;
    minCost = Infinity;

    const currPath = new Array(N).fill(-1);
    const visited = new Array(N).fill(false);

    // Bắt đầu từ đỉnh 0
    currPath[0] = 0;
    visited[0] = true;

    branchAndBoundTSP(currPath, 0, 1, visited);
    return minCost;
}

// Ví dụ sử dụng:
const graph = [
    [0, 10, 15, 20],
    [10, 0, 35, 25],
    [15, 35, 0, 30],
    [20, 25, 30, 0]
];

const minTspCost = solveTSPBnB(graph);
console.log("Chi phí tối thiểu của TSP là:", minTspCost);
