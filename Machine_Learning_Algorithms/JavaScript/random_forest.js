class Node {
    constructor(featureIndex = null, threshold = null, left = null, right = null, value = null) {
        this.featureIndex = featureIndex;
        this.threshold = threshold;
        this.left = left;
        this.right = right;
        this.value = value;
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

    _getFeaturesToConsider(totalFeatures) {
        let features = Array.from({ length: totalFeatures }, (_, i) => i);
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
        const featuresToConsider = this._getFeaturesToConsider(totalFeatures);

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

        if (this._isFinished(depth, nSamples, nLabels)) {
            return new Node(null, null, null, null, this._mostCommonLabel(y));
        }

        const { splitFeatureIndex, splitThreshold } = this._bestSplit(X, y);

        if (splitFeatureIndex === null) {
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

class RandomForest {
    constructor(nTrees = 10, minSamplesSplit = 2, maxDepth = 100, nFeatures = null) {
        this.nTrees = nTrees;
        this.minSamplesSplit = minSamplesSplit;
        this.maxDepth = maxDepth;
        this.nFeatures = nFeatures;
        this.trees = [];
    }

    _bootstrapSamples(X, y) {
        const nSamples = X.length;
        const XSample = [];
        const ySample = [];

        for (let i = 0; i < nSamples; i++) {
            const idx = Math.floor(Math.random() * nSamples);
            XSample.push(X[idx]);
            ySample.push(y[idx]);
        }
        return { XSample, ySample };
    }

    fit(X, y) {
        this.trees = [];
        for (let i = 0; i < this.nTrees; i++) {
            const tree = new DecisionTree(
                this.minSamplesSplit,
                this.maxDepth,
                this.nFeatures
            );
            const { XSample, ySample } = this._bootstrapSamples(X, y);
            tree.fit(XSample, ySample);
            this.trees.push(tree);
        }
    }

    predict(X) {
        const allPredictions = [];
        for (const tree of this.trees) {
            allPredictions.push(tree.predict(X));
        }

        const finalPredictions = [];
        for (let i = 0; i < X.length; i++) {
            const counts = {};
            for (const treePreds of allPredictions) {
                const pred = treePreds[i];
                counts[pred] = (counts[pred] || 0) + 1;
            }
            let maxCount = -1;
            let majorityPred = null;
            for (const pred in counts) {
                if (counts[pred] > maxCount) {
                    maxCount = counts[pred];
                    majorityPred = parseInt(pred);
                }
            }
            finalPredictions.push(majorityPred);
        }
        return finalPredictions;
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

const rf = new RandomForest(3, 2, 5, X[0].length);
rf.fit(X, y);

const X_test = [
    [2.5, 3.5],
    [6.5, 7.5]
];
const predictions = rf.predict(X_test);
console.log("Dự đoán của Random Forest cho X_test:", predictions);
