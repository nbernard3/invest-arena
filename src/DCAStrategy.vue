<!-- DCAStrategy.vue -->
<template>
    <div class="dca-strategy">
        <div class="input-group">
            <label for="initialAmount">Montant initial</label>
            <div class="input-wrapper">
                <input type="number" id="initialAmount" v-model="initialAmount" min="0" step="1000" />
                <span class="currency">€</span>
            </div>
        </div>

        <div class="input-group">
            <label for="monthlyAmount">Investissement mensuel</label>
            <div class="input-wrapper">
                <input type="number" id="monthlyAmount" v-model="monthlyAmount" min="0" step="100" />
                <span class="currency">€</span>
            </div>
        </div>

        <div class="input-group">
            <label for="etfChoice">ETF</label>
            <select id="etfChoice" v-model="selectedETF">
                <option value="msci-world">MSCI World</option>
                <option value="sp500">S&P 500</option>
                <option value="nasdaq">Nasdaq</option>
            </select>
        </div>
    </div>
</template>

<script>
import { simulateETF } from './simulator.js'

export default {
    name: 'DCAStrategy',
    props: {
        timeHorizon: {
            type: Number,
            default: 10
        }
    },
    data() {
        return {
            initialAmount: 10000,
            monthlyAmount: 500,
            selectedETF: 'msci-world'
        }
    },
    methods: {
        computeResults() {
            const simResults = simulateETF({
                initialAmount: this.initialAmount,
                monthlyAmount: this.monthlyAmount,
                timeHorizonYears: this.timeHorizon,
                etfType: this.selectedETF
            });

            return {
                strategy: 'DCA',
                totalInvestedEvolution: simResults.totalInvestedEvolution,
                portfolioEvolution: simResults.portfolioEvolution
            }
        }
    }
}
</script>

<style scoped>
.dca-strategy {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
    padding: 1.5rem;
    width: 100%;
}

.input-group {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
}

.input-group label {
    font-size: 0.875rem;
    font-weight: 500;
    color: inherit;
}

.input-wrapper {
    position: relative;
    display: flex;
    align-items: center;
}

.input-wrapper input {
    width: 100%;
    padding: 0.5rem;
    padding-right: 2rem;
    border: 1px solid currentColor;
    border-radius: 0.375rem;
    background-color: #1e293b;
    color: inherit;
}

.currency {
    position: absolute;
    right: 0.75rem;
    color: inherit;
    opacity: 0.7;
}

select {
    width: 100%;
    padding: 0.5rem;
    border: 1px solid currentColor;
    border-radius: 0.375rem;
    background-color: #1e293b;
    color: inherit;
}

input:focus,
select:focus {
    outline: none;
    border-color: currentColor;
    box-shadow: 0 0 0 2px rgba(currentColor, 0.2);
}

/* Inherit color from parent (blue/red variant) */
:deep(.blue) .dca-strategy {
    color: #60a5fa;
}

:deep(.red) .dca-strategy {
    color: #f87171;
}
</style>
