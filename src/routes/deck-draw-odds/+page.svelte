<script>
    /**
     * Calculate hypergeometric probability
     * @param {number} N Population size (deck size)
     * @param {number} K Success states in population (copies ran)
     * @param {number} n Sample size (cards drawn)
     * @param {number} k Successes in sample (odds to have)
     * @returns {number} Probability of exactly k successes
     */
    function hypergeometric(N, K, n, k) {
        const combinations = (/** @type {number} */ n, /** @type {number} */ r) => {
            if (r > n) return 0;
            let p = 1;
            for (let i = 1; i <= r; i++) {
                p *= (n - i + 1) / i;
            }
            return Math.round(p);
        };

        return (combinations(K, k) * combinations(N - K, n - k)) / combinations(N, n);
    }

    /**
     * Calculate probability of at least X successes
     * @param {number} N Population size
     * @param {number} K Success states
     * @param {number} n Sample size
     * @param {number} minimum Minimum successes needed
     * @returns {number} Probability of at least minimum successes
     */
    function atLeast(N, K, n, minimum) {
        let probability = 0;
        for (let i = minimum; i <= Math.min(n, K); i++) {
            probability += hypergeometric(N, K, n, i);
        }
        return probability;
    }

    /**
     * Calculate probability with one mulligan
     * @param {number} N Population size
     * @param {number} K Success states
     * @param {number} n Sample size
     * @param {number} minimum Minimum successes needed
     * @returns {number} Probability with one mulligan
     */
    function withMulligan(N, K, n, minimum) {
        const firstTry = atLeast(N, K, n, minimum);
        const secondTry = atLeast(N, K, n, minimum);
        return firstTry + (1 - firstTry) * secondTry;
    }

    let deckSize = 50;
    let copiesRan = 4;
    let cardsDrawn = 5;
    let oddsToHave = 1;

    $: exactProbability = hypergeometric(deckSize, copiesRan, cardsDrawn, oddsToHave);
    $: atLeastProbability = atLeast(deckSize, copiesRan, cardsDrawn, oddsToHave);
    $: mulliganProbability = withMulligan(deckSize, copiesRan, cardsDrawn, oddsToHave);

    // Add new variables for Multivariate Intersect
    let mvDeckSize = 50;
    let copiesCardA = 4;
    let copiesCardB = 4;
    let mvDrawSize = 5;

    /**
     * Calculate probability of drawing at least 1 of each card
     * @param {number} N Deck size
     * @param {number} A Copies of card A
     * @param {number} B Copies of card B
     * @param {number} d Draw size
     * @returns {number} Probability of drawing at least 1 of each card
     */
    function calculateMultivariateIntersect(N, A, B, d) {
        // P(at least 1 of each) = 1 - P(no A) - P(no B) + P(neither)
        const combinations = (/** @type {number} */ n, /** @type {number} */ r) => {
            if (r > n) return 0;
            let p = 1;
            for (let i = 1; i <= r; i++) {
                p *= (n - i + 1) / i;
            }
            return Math.round(p);
        };

        // Probability of drawing no copies of A
        const pNoA = combinations(N - A, d) / combinations(N, d);
        // Probability of drawing no copies of B
        const pNoB = combinations(N - B, d) / combinations(N, d);
        // Probability of drawing neither A nor B
        const pNeither = combinations(N - A - B, d) / combinations(N, d);

        // P(at least 1 of each) = 1 - P(no A) - P(no B) + P(neither)
        return 1 - pNoA - pNoB + pNeither;
    }

    /**
     * Calculate probability with mulligan for Multivariate Intersect
     * @param {number} N Deck size
     * @param {number} A Copies of card A
     * @param {number} B Copies of card B
     * @param {number} d Draw size
     * @returns {number} Probability with one mulligan
     */
    function calculateMultivariateMulligan(N, A, B, d) {
        const firstTry = calculateMultivariateIntersect(N, A, B, d);
        const secondTry = calculateMultivariateIntersect(N, A, B, d);
        return firstTry + (1 - firstTry) * secondTry;
    }

    $: mvProbability = calculateMultivariateIntersect(mvDeckSize, copiesCardA, copiesCardB, mvDrawSize);
    $: mvMulliganProbability = calculateMultivariateMulligan(mvDeckSize, copiesCardA, copiesCardB, mvDrawSize);
</script>

<svelte:head>
    <title>Deck Draw Odds - Dev Tools</title>
</svelte:head>

<main class="flex h-screen flex-col items-center p-4">
    <h1 class="mb-4 text-2xl font-bold">Deck Draw Odds Calculator</h1>

    <div class="w-[90%] max-w-4xl">
        <h2 class="text-xl font-bold mb-4">Single Card Probability Calculator</h2>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
            <div class="flex flex-col">
                <label class="mb-2" for="deckSize">Deck Size</label>
                <input
                    type="number"
                    id="deckSize"
                    bind:value={deckSize}
                    min="1"
                    class="p-2 border rounded-lg"
                />
            </div>
            <div class="flex flex-col">
                <label class="mb-2" for="copiesRan">Copies Ran</label>
                <input
                    type="number"
                    id="copiesRan"
                    bind:value={copiesRan}
                    min="1"
                    max={deckSize}
                    class="p-2 border rounded-lg"
                />
            </div>
            <div class="flex flex-col">
                <label class="mb-2" for="cardsDrawn">Cards Drawn</label>
                <input
                    type="number"
                    id="cardsDrawn"
                    bind:value={cardsDrawn}
                    min="1"
                    max={deckSize}
                    class="p-2 border rounded-lg"
                />
            </div>
            <div class="flex flex-col">
                <label class="mb-2" for="oddsToHave">Odds to Have</label>
                <input
                    type="number"
                    id="oddsToHave"
                    bind:value={oddsToHave}
                    min="1"
                    max={Math.min(copiesRan, cardsDrawn)}
                    class="p-2 border rounded-lg"
                />
            </div>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div class="bg-ctp-surface0 p-4 rounded-lg">
                <h3 class="font-bold mb-2">Exact Probability</h3>
                <p>{(exactProbability * 100).toFixed(2)}%</p>
            </div>
            <div class="bg-ctp-surface0 p-4 rounded-lg">
                <h3 class="font-bold mb-2">At Least Probability</h3>
                <p>{(atLeastProbability * 100).toFixed(2)}%</p>
            </div>
            <div class="bg-ctp-surface0 p-4 rounded-lg">
                <h3 class="font-bold mb-2">With One Mulligan</h3>
                <p>{(mulliganProbability * 100).toFixed(2)}%</p>
            </div>
        </div>
    </div>

    <div class="w-[90%] max-w-4xl mt-8">
        <h2 class="text-xl font-bold mb-4">Multi Card Probability Calculator</h2>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
            <div class="flex flex-col">
                <label class="mb-2" for="mvDeckSize">Deck Size</label>
                <input
                    type="number"
                    id="mvDeckSize"
                    bind:value={mvDeckSize}
                    min="1"
                    class="p-2 border rounded-lg"
                />
            </div>
            <div class="flex flex-col">
                <label class="mb-2" for="copiesCardA">Copies of Card A</label>
                <input
                    type="number"
                    id="copiesCardA"
                    bind:value={copiesCardA}
                    min="1"
                    max={mvDeckSize}
                    class="p-2 border rounded-lg"
                />
            </div>
            <div class="flex flex-col">
                <label class="mb-2" for="copiesCardB">Copies of Card B</label>
                <input
                    type="number"
                    id="copiesCardB"
                    bind:value={copiesCardB}
                    min="1"
                    max={mvDeckSize}
                    class="p-2 border rounded-lg"
                />
            </div>
            <div class="flex flex-col">
                <label class="mb-2" for="mvDrawSize">Draw Size</label>
                <input
                    type="number"
                    id="mvDrawSize"
                    bind:value={mvDrawSize}
                    min="2"
                    max={mvDeckSize}
                    class="p-2 border rounded-lg"
                />
            </div>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div class="bg-ctp-surface0 p-4 rounded-lg">
                <h3 class="font-bold mb-2">Probability of Drawing Both</h3>
                <p>{(mvProbability * 100).toFixed(2)}%</p>
            </div>
            <div class="bg-ctp-surface0 p-4 rounded-lg">
                <h3 class="font-bold mb-2">With One Mulligan</h3>
                <p>{(mvMulliganProbability * 100).toFixed(2)}%</p>
            </div>
        </div>
    </div>
</main>
