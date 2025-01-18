<!-- LMNPStrategy.vue -->
<template>
    <div class="lmnp-strategy">
        <div class="input-group">
            <label for="propertyPrice">Montant du bien</label>
            <div class="input-wrapper">
                <input type="number" id="propertyPrice" v-model="propertyPriceInKeuros" min="0" />
                <span class="currency">k€</span>
            </div>
        </div>

        <div class="input-group">
            <label for="monthlyRent">Loyer mensuel attendu CC</label>
            <div class="input-wrapper">
                <input type="number" id="monthlyRent" v-model="monthlyRent" min="0" />
                <span class="currency">€</span>
            </div>
        </div>

        <div class="input-group">
            <label for="occupancyMonths">Nombre de mois d'occupation / an</label>
            <div class="input-wrapper">
                <input type="number" id="occupancyMonths" v-model="occupancyMonths" min="1" max="12" />
                <span class="unit">mois</span>
            </div>
        </div>

        <div class="input-group">
            <label for="downPaymentPercent">Apport (%)</label>
            <div class="input-wrapper">
                <input type="number" id="downPaymentPercent" v-model="downPaymentPercent" min="0" max="100" />
                <span class="unit">%</span>
            </div>
        </div>

        <div class="input-group">
            <label for="loanDuration">Durée d'emprunt</label>
            <div class="input-wrapper">
                <input type="number" id="loanDuration" v-model="loanDuration" min="5" max="30" />
                <span class="unit">années</span>
            </div>
        </div>

        <div class="input-group">
            <label for="interestRate">Taux d'emprunt</label>
            <div class="input-wrapper">
                <input type="number" id="interestRate" v-model="interestRate" min="0" step="0.01" />
                <span class="unit">%</span>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'LMNPStrategy',
    props: {
        timeHorizon: {
            type: Number,
            default: 10
        }
    },
    data() {
        return {
            propertyPriceInKeuros: 200,
            monthlyRent: 950,
            occupancyMonths: 12,
            downPaymentPercent: 20,
            loanDuration: 20,
            interestRate: 1.4
        }
    },
    methods: {
        computeResults() {
            // Placeholder for future implementation
            const propertyPrice = this.propertyPriceInKeuros * 1000;
            return {
                strategy: 'LMNP',
                totalInvestedEvolution: [],
                portfolioEvolution: []
            }
        }
    }
}
</script>

<style scoped>
.lmnp-strategy {
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
    padding-right: 2.5rem;
    border: 1px solid currentColor;
    border-radius: 0.375rem;
    background-color: #1e293b;
    color: inherit;
}

.currency,
.unit {
    position: absolute;
    right: 0.75rem;
    color: inherit;
    opacity: 0.7;
}

input:focus {
    outline: none;
    border-color: currentColor;
    box-shadow: 0 0 0 2px rgba(currentColor, 0.2);
}

/* Inherit color from parent (blue/red variant) */
:deep(.blue) .lmnp-strategy {
    color: #60a5fa;
}

:deep(.red) .lmnp-strategy {
    color: #f87171;
}
</style>