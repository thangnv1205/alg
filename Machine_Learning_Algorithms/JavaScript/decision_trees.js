class Node {
    constructor(featureIndex = null, threshold = null, left = null, right = null, value = null) {
        this.featureIndex = featureIndex; // Chỉ số của tính năng để phân tách
        this.threshold = threshold; // Ngưỡng để phân tách
        this.left = left; // Cây con bên trái
        this.right = right; // Cây con bên phải
        this.value = value; // Giá trị của nút lá (lớp dự đoán)
    }
}

class DecisionTree {
    constructor(minSamplesSplit = 2, maxDepth = 100, nFeatures = null) {
        this.minSamplesSplit = minSamplesSplit;
        this.maxDepth = maxDepth;
        this.nFeatures = nFeatures;
        this.root = null;
    }

    _isFinished(depth, nSamples, nLabels) {
        return depth >= this.maxDepth || nLabels === 1 || nSamples < this.minSamplesSplit;
    }

    // Tính toán Gini Impurity
    _giniImpurity(y) {
        if (y.length === 0) return 0.0;
        const counts = {};
        for (const label of y) {
            counts[label] = (counts[label] || 0) + 1;
        }

        let impurity = 1.0;
        for (const label in counts) {
            const p = counts[label] / y.length;
            impurity -= p * p;
        }
        return impurity;
    }

    _createSplit(X, y, featureIndex, threshold) {
        const leftX = [];
        const leftY = [];
        const rightX = [];
        const rightY = [];

        for (let i = 0; i < X.length; i++) {
            if (X[i][featureIndex] <= threshold) {
                leftX.push(X[i]);
                leftY.push(y[i]);
            } else {
                rightX.push(X[i]);
                rightY.push(y[i]);
            }
        }
        return { leftX, leftY, rightX, rightY };
    }

    _informationGain(X, y, featureIndex, threshold) {
        const parentGini = this._giniImpurity(y);

        const { leftY, rightY } = this._createSplit(X, y, featureIndex, threshold);

        if (leftY.length === 0 || rightY.length === 0) {
            return 0.0;
        }

        const n = y.length;
        const nL = leftY.length;
        const nR = rightY.length;

        const childGini = (nL / n) * this._giniImpurity(leftY) + (nR / n) * this._giniImpurity(rightY);

        return parentGini - childGini;
    }

    _getUniqueFeatures(totalFeatures) {
        let features = Array.from({ length: totalFeatures }, (_, i) => i);
        // Shuffle and take nFeatures if specified
        if (this.nFeatures < totalFeatures) {
            for (let i = totalFeatures - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [features[i], features[j]] = [features[j], features[i]];
            }
            features = features.slice(0, this.nFeatures);
        }
        return features;
    }

    _bestSplit(X, y) {
        let bestGain = -1.0;
        let splitFeatureIndex = null;
        let splitThreshold = null;

        const totalFeatures = X[0].length;
        const featuresToConsider = this._getUniqueFeatures(totalFeatures);

        for (const featureIndex of featuresToConsider) {
            const uniqueThresholds = [...new Set(X.map(row => row[featureIndex]))];

            for (const threshold of uniqueThresholds) {
                const gain = this._informationGain(X, y, featureIndex, threshold);

                if (gain > bestGain) {
                    bestGain = gain;
                    splitFeatureIndex = featureIndex;
                    splitThreshold = threshold;
                }
            }
        }
        return { splitFeatureIndex, splitThreshold };
    }

    _mostCommonLabel(y) {
        const counts = {};
        for (const label of y) {
            counts[label] = (counts[label] || 0) + 1;
        }
        let maxCount = -1;
        let mostCommon = null;
        for (const label in counts) {
            if (counts[label] > maxCount) {
                maxCount = counts[label];
                mostCommon = parseInt(label);
            }
        }
        return mostCommon;
    }

    _buildTree(X, y, depth = 0) {
        const nSamples = X.length;
        const nLabels = new Set(y).size;

        // Điều kiện dừng
        if (this._isFinished(depth, nSamples, nLabels)) {
            return new Node(null, null, null, null, this._mostCommonLabel(y));
        }

        const { splitFeatureIndex, splitThreshold } = this._bestSplit(X, y);

        if (splitFeatureIndex === null) { // Không tìm thấy phân tách tốt
            return new Node(null, null, null, null, this._mostCommonLabel(y));
        }

        const { leftX, leftY, rightX, rightY } = this._createSplit(X, y, splitFeatureIndex, splitThreshold);

        const leftChild = this._buildTree(leftX, leftY, depth + 1);
        const rightChild = this._buildTree(rightX, rightY, depth + 1);

        return new Node(splitFeatureIndex, splitThreshold, leftChild, rightChild, null);
    }

    fit(X, y) {
        this.nFeatures = this.nFeatures === null ? X[0].length : Math.min(X[0].length, this.nFeatures);
        this.root = this._buildTree(X, y);
    }

    _traverseTree(x, node) {
        if (node.value !== null) {
            return node.value;
        }

        if (x[node.featureIndex] <= node.threshold) {
            return this._traverseTree(x, node.left);
        } else {
            return this._traverseTree(x, node.right);
        }
    }

    predict(X) {
        const predictions = [];
        for (const x of X) {
            predictions.push(this._traverseTree(x, this.root));
        }
        return predictions;
    }
}

// Ví dụ sử dụng:
// Dữ liệu giả
const X = [
    [2, 3],
    [3, 4],
    [4, 5],
    [5, 6],
    [1, 2],
    [2, 2],
    [6, 7],
    [7, 8]
];
const y = [0, 0, 0, 0, 1, 1, 1, 1];

const model = new DecisionTree(2, 5, X[0].length);
model.fit(X, y);

const X_test = [
    [2.5, 3.5],
    [6.5, 7.5]
];
const predictions = model.predict(X_test);
console.log("Dự đoán cho X_test:", predictions);
