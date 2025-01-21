<!-- <script>
    import Input from '$lib/components/Input.svelte';
    import Tile from '$lib/components/Tile.svelte';
    import Section from '$lib/components/Section.svelte';

    let cardsInHand = 5;
    let cardsInDeck = 12;
    let cardsInTrash = 4;
    let knownInHand = 0;
    let assumedTotal = 3; // default assumption of total copies

    /**
     * Calculate probability of opponent having at least one copy
     * @returns {number} Probability as a decimal
     */
    function calculateProbability() {
        const remainingUnknown = cardsInHand - knownInHand;
        const remainingCopies = assumedTotal - cardsInTrash - knownInHand;
        
        if (remainingCopies <= 0) return 0;
        if (remainingUnknown <= 0) return 0;
        
        // Calculate probability of NOT having any copies in the remaining unknown cards
        const totalRemaining = cardsInDeck + remainingUnknown;
        let probability = 1;
        
        for (let i = 0; i < remainingUnknown; i++) {
            probability *= (totalRemaining - remainingCopies - i) / (totalRemaining - i);
        }

        // Return probability of having at least one copy
        return 1 - probability;
    }

    $: probability = calculateProbability();
</script>

<svelte:head>
    <title>Card Assumption Calculator - Dev Tools</title>
</svelte:head>

<main class="flex h-screen flex-col items-center p-4">
    <h1 class="mb-4 text-2xl font-bold">Card Assumption Calculator</h1>

    <Section title="Calculate Opponent's Hand Probability">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
            <Input
                id="cardsInHand"
                label="Cards in Hand"
                bind:value={cardsInHand}
                min={0}
            />
            <Input
                id="cardsInDeck"
                label="Cards in Deck"
                bind:value={cardsInDeck}
                min={0}
            />
            <Input
                id="cardsInTrash"
                label="Cards in Trash"
                bind:value={cardsInTrash}
                min={0}
            />
            <Input
                id="knownInHand"
                label="Known Copies in Hand"
                bind:value={knownInHand}
                min={0}
                max={cardsInHand}
            />
            <Input
                id="assumedTotal"
                label="Assumed Total Copies"
                bind:value={assumedTotal}
                min={0}
            />
        </div>

        <div class="grid grid-cols-1 gap-4">
            <Tile title="Probability of Having at Least One Copy" value={probability} />
        </div>
    </Section>
</main> -->
