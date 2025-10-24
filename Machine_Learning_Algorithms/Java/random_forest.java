import java.util.*;
import java.util.stream.Collectors;

public class random_forest {

    // Node class for DecisionTree (reused from decision_trees.java)
    static class Node {
        Integer featureIndex;
        Double threshold;
        Node left;
        Node right;
        Integer value;

        public Node(Integer featureIndex, Double threshold, Node left, Node right, Integer value) {
            this.featureIndex = featureIndex;
            this.threshold = threshold;
            this.left = left;
            this.right = right;
            this.value = value;
        }
    }

    // DecisionTree class (reused and adapted from decision_trees.java)
    static class DecisionTree {
        int minSamplesSplit;
        int maxDepth;
        int nFeatures;
        Node root;
        Random random;

        public DecisionTree(int minSamplesSplit, int maxDepth, int nFeatures, Random random) {
            this.minSamplesSplit = minSamplesSplit;
            this.maxDepth = maxDepth;
            this.nFeatures = nFeatures;
            this.random = random;
        }

        private boolean isFinished(int depth, int nSamples, long nLabels) {
            return depth >= maxDepth || nLabels == 1 || nSamples < minSamplesSplit;
        }

        private double giniImpurity(List<Integer> y) {
            if (y.isEmpty()) return 0.0;
            Map<Integer, Long> counts = y.stream().collect(Collectors.groupingBy(e -> e, Collectors.counting()));
            double impurity = 1.0;
            for (Long count : counts.values()) {
                double p = (double) count / y.size();
                impurity -= p * p;
            }
            return impurity;
        }

        private List<List<List<Double>>> createSplit(List<List<Double>> X, List<Integer> y, int featureIndex, double threshold) {
            List<List<Double>> leftX = new ArrayList<>();
            List<Integer> leftY = new ArrayList<>();
            List<List<Double>> rightX = new ArrayList<>();
            List<Integer> rightY = new ArrayList<>();

            for (int i = 0; i < X.size(); i++) {
                if (X.get(i).get(featureIndex) <= threshold) {
                    leftX.add(X.get(i));
                    leftY.add(y.get(i));
                } else {
                    rightX.add(X.get(i));
                    rightY.add(y.get(i));
                }
            }
            List<List<List<Double>>> result = new ArrayList<>();
            result.add(leftX);
            result.add((List<List<Double>>) (List<?>) leftY);
            result.add(rightX);
            result.add((List<List<Double>>) (List<?>) rightY);
            return result;
        }

        private double informationGain(List<List<Double>> X, List<Integer> y, int featureIndex, double threshold) {
            double parentGini = giniImpurity(y);

            List<List<List<Double>>> splitResult = createSplit(X, y, featureIndex, threshold);
            List<Integer> leftY = (List<Integer>) (List<?>) splitResult.get(1);
            List<Integer> rightY = (List<Integer>) (List<?>) splitResult.get(3);

            if (leftY.isEmpty() || rightY.isEmpty()) {
                return 0.0;
            }

            double n = y.size();
            double nL = leftY.size();
            double nR = rightY.size();

            double childGini = (nL / n) * giniImpurity(leftY) + (nR / n) * giniImpurity(rightY);

            return parentGini - childGini;
        }

        private int[] getFeaturesToConsider(int totalFeatures) {
            if (nFeatures >= totalFeatures) {
                int[] features = new int[totalFeatures];
                for (int i = 0; i < totalFeatures; i++) features[i] = i;
                return features;
            }
            int[] allFeatures = new int[totalFeatures];
            for (int i = 0; i < totalFeatures; i++) allFeatures[i] = i;

            // Shuffle and take nFeatures
            for (int i = totalFeatures - 1; i > 0; i--) {
                int j = random.nextInt(i + 1);
                int temp = allFeatures[i];
                allFeatures[i] = allFeatures[j];
                allFeatures[j] = temp;
            }
            return Arrays.copyOfRange(allFeatures, 0, nFeatures);
        }

        private Object[] bestSplit(List<List<Double>> X, List<Integer> y) {
            double bestGain = -1.0;
            Integer splitFeatureIndex = null;
            Double splitThreshold = null;

            int totalFeatures = X.get(0).size();
            int[] featuresToConsider = getFeaturesToConsider(totalFeatures);

            for (int featureIndex : featuresToConsider) {
                Set<Double> uniqueThresholds = new HashSet<>();
                for (List<Double> row : X) {
                    uniqueThresholds.add(row.get(featureIndex));
                }

                for (double threshold : uniqueThresholds) {
                    double gain = informationGain(X, y, featureIndex, threshold);

                    if (gain > bestGain) {
                        bestGain = gain;
                        splitFeatureIndex = featureIndex;
                        splitThreshold = threshold;
                    }
                }
            }
            return new Object[]{splitFeatureIndex, splitThreshold};
        }

        private int mostCommonLabel(List<Integer> y) {
            Map<Integer, Long> counts = y.stream().collect(Collectors.groupingBy(e -> e, Collectors.counting()));
            return counts.entrySet().stream()
                    .max(Map.Entry.comparingByValue())
                    .map(Map.Entry::getKey)
                    .orElseThrow(() -> new IllegalStateException("Không thể tìm thấy nhãn phổ biến nhất"));
        }

        private Node buildTree(List<List<Double>> X, List<Integer> y, int depth) {
            int nSamples = X.size();
            long nLabels = y.stream().distinct().count();

            if (isFinished(depth, nSamples, nLabels)) {
                return new Node(null, null, null, null, mostCommonLabel(y));
            }

            Object[] splitInfo = bestSplit(X, y);
            Integer bestFeature = (Integer) splitInfo[0];
            Double bestThreshold = (Double) splitInfo[1];

            if (bestFeature == null) {
                return new Node(null, null, null, null, mostCommonLabel(y));
            }

            List<List<List<Double>>> splitResult = createSplit(X, y, bestFeature, bestThreshold);
            List<List<Double>> leftX = splitResult.get(0);
            List<Integer> leftY = (List<Integer>) (List<?>) splitResult.get(1);
            List<List<Double>> rightX = splitResult.get(2);
            List<Integer> rightY = (List<Integer>) (List<?>) splitResult.get(3);

            Node leftChild = buildTree(leftX, leftY, depth + 1);
            Node rightChild = buildTree(rightX, rightY, depth + 1);

            return new Node(bestFeature, bestThreshold, leftChild, rightChild, null);
        }

        public void fit(List<List<Double>> X, List<Integer> y) {
            this.root = buildTree(X, y, 0);
        }

        private int traverseTree(List<Double> x, Node node) {
            if (node.value != null) {
                return node.value;
            }

            if (x.get(node.featureIndex) <= node.threshold) {
                return traverseTree(x, node.left);
            } else {
                return traverseTree(x, node.right);
            }
        }

        public List<Integer> predict(List<List<Double>> X) {
            List<Integer> predictions = new ArrayList<>();
            for (List<Double> x : X) {
                predictions.add(traverseTree(x, this.root));
            }
            return predictions;
        }
    }

    static class RandomForest {
        int nTrees;
        int minSamplesSplit;
        int maxDepth;
        int nFeatures;
        List<DecisionTree> trees;
        Random random;

        public RandomForest(int nTrees, int minSamplesSplit, int maxDepth, int nFeatures) {
            this.nTrees = nTrees;
            this.minSamplesSplit = minSamplesSplit;
            this.maxDepth = maxDepth;
            this.nFeatures = nFeatures;
            this.trees = new ArrayList<>();
            this.random = new Random();
        }

        private List<List<List<Double>>> bootstrapSamples(List<List<Double>> X, List<Integer> y) {
            int nSamples = X.size();
            List<List<Double>> XSample = new ArrayList<>();
            List<Integer> ySample = new ArrayList<>();

            for (int i = 0; i < nSamples; i++) {
                int idx = random.nextInt(nSamples);
                XSample.add(X.get(idx));
                ySample.add(y.get(idx));
            }
            List<List<List<Double>>> result = new ArrayList<>();
            result.add(XSample);
            result.add((List<List<Double>>) (List<?>) ySample);
            return result;
        }

        public void fit(List<List<Double>> X, List<Integer> y) {
            trees.clear();
            for (int i = 0; i < nTrees; i++) {
                DecisionTree tree = new DecisionTree(minSamplesSplit, maxDepth, nFeatures, random);
                List<List<List<Double>>> bootstrap = bootstrapSamples(X, y);
                List<List<Double>> XSample = bootstrap.get(0);
                List<Integer> ySample = (List<Integer>) (List<?>) bootstrap.get(1);
                tree.fit(XSample, ySample);
                trees.add(tree);
            }
        }

        public List<Integer> predict(List<List<Double>> X) {
            List<List<Integer>> allPredictions = new ArrayList<>();
            for (DecisionTree tree : trees) {
                allPredictions.add(tree.predict(X));
            }

            List<Integer> finalPredictions = new ArrayList<>();
            for (int i = 0; i < X.size(); i++) {
                Map<Integer, Integer> counts = new HashMap<>();
                for (List<Integer> treePreds : allPredictions) {
                    int pred = treePreds.get(i);
                    counts.put(pred, counts.getOrDefault(pred, 0) + 1);
                }
                finalPredictions.add(counts.entrySet().stream()
                        .max(Map.Entry.comparingByValue())
                        .map(Map.Entry::getKey)
                        .orElseThrow(() -> new IllegalStateException("Không thể tìm thấy dự đoán đa số")));
            }
            return finalPredictions;
        }
    }

    public static void main(String[] args) {
        // Ví dụ sử dụng:
        // Dữ liệu giả
        List<List<Double>> X = new ArrayList<>();
        X.add(Arrays.asList(2.0, 3.0));
        X.add(Arrays.asList(3.0, 4.0));
        X.add(Arrays.asList(4.0, 5.0));
        X.add(Arrays.asList(5.0, 6.0));
        X.add(Arrays.asList(1.0, 2.0));
        X.add(Arrays.asList(2.0, 2.0));
        X.add(Arrays.asList(6.0, 7.0));
        X.add(Arrays.asList(7.0, 8.0));

        List<Integer> y = Arrays.asList(0, 0, 0, 0, 1, 1, 1, 1);

        RandomForest rf = new RandomForest(3, 2, 5, X.get(0).size());
        rf.fit(X, y);

        List<List<Double>> X_test = new ArrayList<>();
        X_test.add(Arrays.asList(2.5, 3.5));
        X_test.add(Arrays.asList(6.5, 7.5));

        List<Integer> predictions = rf.predict(X_test);
        System.out.println("Dự đoán của Random Forest cho X_test: " + predictions);
    }
}
