# SimulationDetails.vue
<template>
    <div class="simulation-details">
        <div class="details-header">
            <button class="details-toggle" @click="isExpanded = !isExpanded">
                <span class="toggle-icon" :class="{ 'rotated': isExpanded }">▼</span>
                <span class="toggle-text">Details</span>
            </button>
            <button class="copy-button" @click="copyToClipboard" :class="{ 'copied': copied }">
                {{ copied ? '✓ Copied!' : 'Copy' }}
            </button>
        </div>
        <div class="details-content" :class="{ 'expanded': isExpanded }">
            <pre ref="consoleContent"><code># {{ timestamp }} Simulation

## challenger_1: {{ challenger1Results.strategy }}
<span v-for="(value, param) in challenger1Results.parameters" :key="param">
{{ param }}: {{ typeof value === 'number' ? value.toString() : value }}</span>

## challenger_2: {{ challenger2Results.strategy }}
<template v-for="(value, param) in challenger2Results.parameters" :key="param">
{{ param }}: {{ typeof value === 'number' ? value.toString() : value }}</template></code></pre>
        </div>
    </div>
</template>

<script>
export default {
    name: 'SimulationDetails',
    props: {
        challenger1Results: {
            type: Object,
            required: true,
        },
        challenger2Results: {
            type: Object,
            required: true,
        },
        timeHorizon: {
            type: Number,
            required: true
        }
    },
    data() {
        return {
            isExpanded: false,
            timestamp: new Date().toISOString(),
            copied: false
        }
    },
    methods: {
        formatMoney(amount) {
            return new Intl.NumberFormat('fr-FR', {
                style: 'currency',
                currency: 'EUR',
                maximumFractionDigits: 0
            }).format(amount)
        },
        async copyToClipboard() {
            try {
                const content = this.$refs.consoleContent.textContent
                await navigator.clipboard.writeText(content)
                this.copied = true
                setTimeout(() => {
                    this.copied = false
                }, 2000)
            } catch (err) {
                console.error('Failed to copy:', err)
            }
        }
    }
}
</script>

<style scoped>
.simulation-details {
    margin-top: 2rem;
    border: 1px solid #a855f7;
    border-radius: 0.5rem;
    background-color: #1e293b;
}

.details-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1rem;
}

.details-toggle {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    background: none;
    border: none;
    cursor: pointer;
    color: #a855f7;
    font-size: 0.875rem;
    text-transform: uppercase;
    letter-spacing: 0.05em;
}

.toggle-icon {
    transition: transform 0.3s ease;
    font-size: 0.75rem;
}

.toggle-icon.rotated {
    transform: rotate(-180deg);
}

.details-content {
    max-height: 0;
    overflow: hidden;
    transition: max-height 0.3s ease-out;
    background-color: #0f172a;
    border-top: 1px solid rgba(168, 85, 247, 0.3);
}

.details-content.expanded {
    max-height: 1000px;
    padding: 1rem;
}

.details-content pre {
    margin: 0;
    padding: 0;
    font-family: 'JetBrains Mono', 'Fira Code', 'Roboto Mono', monospace;
    font-size: 0.75rem;
    line-height: 1.5;
    color: #94a3b8;
    white-space: pre-wrap;
}

.details-content code {
    font-family: inherit;
}

.copy-button {
    padding: 0.25rem 0.75rem;
    background-color: rgba(168, 85, 247, 0.1);
    border: 1px solid rgba(168, 85, 247, 0.3);
    border-radius: 0.25rem;
    color: #a855f7;
    font-size: 0.75rem;
    cursor: pointer;
    transition: all 0.2s ease;
}

.copy-button:hover {
    background-color: rgba(168, 85, 247, 0.2);
}

.copy-button.copied {
    background-color: rgba(74, 222, 128, 0.1);
    border-color: rgba(74, 222, 128, 0.3);
    color: #4ade80;
}
</style>
