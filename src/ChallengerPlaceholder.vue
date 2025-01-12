<!-- ChallengerPlaceholder.vue -->
<template>
    <div :class="['challenger-placeholder', variant]">
        <div :class="['challenger-title', variant]">
            {{ title }}
        </div>
        <div class="strategy-selector">
            <select v-model="selectedStrategy" :class="['strategy-select', variant]">
                <option value="lumpsum">Lumpsum sur ETF</option>
                <option value="dca">DCA sur ETF</option>
                <option value="lmnp">LMNP</option>
            </select>
        </div>
        <div :class="['challenger-content', variant]">
            <component :is="currentStrategyComponent" ref="strategyComponent" :timeHorizon="timeHorizon"
                v-if="currentStrategyComponent" />
        </div>
    </div>
</template>

<script>
import DCAStrategy from './DCAStrategy.vue'
import LumpsumStrategy from './LumpsumStrategy.vue'

export default {
    name: 'ChallengerPlaceholder',
    components: {
        DCAStrategy,
        LumpsumStrategy
    },
    props: {
        title: {
            type: String,
            required: true
        },
        placeholderText: {
            type: String,
            required: true
        },
        variant: {
            type: String,
            default: 'blue',
            validator: function (value) {
                return ['blue', 'red'].indexOf(value) !== -1
            }
        }
    },
    data() {
        return {
            selectedStrategy: 'dca',
            totalContribution: 0
        }
    },
    computed: {
        currentStrategyComponent() {
            const components = {
                lumpsum: 'LumpsumStrategy',
                dca: 'DCAStrategy',
                lmnp: null // To be implemented
            }
            return components[this.selectedStrategy]
        }
    },
    methods: {
        handleStrategyUpdate(data) {
            this.strategyData = data
            this.$emit('strategy-update', {
                strategy: this.selectedStrategy,
                data: data
            })
        },
        computeResults() {
            const strategyComponent = this.$refs.strategyComponent
            if (strategyComponent && strategyComponent.computeResults) {
                return strategyComponent.computeResults()
            }
            return null
        }
    }
}
</script>

<style scoped>
.challenger-placeholder {
    flex: 1;
    background-color: #1e293b;
    padding: 1.5rem;
    border-radius: 0.5rem;
    border: 2px solid;
    transition: transform 0.2s;
}

.challenger-placeholder:hover {
    transform: scale(1.02);
}

.challenger-placeholder.blue {
    border-color: #3b82f6;
    box-shadow: 0 10px 15px -3px rgba(59, 130, 246, 0.5);
}

.challenger-placeholder.red {
    border-color: #ef4444;
    box-shadow: 0 10px 15px -3px rgba(239, 68, 68, 0.5);
}

.challenger-title {
    text-align: center;
    font-size: 1.5rem;
    font-weight: bold;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    margin-bottom: 2rem;
    /* Increased space between title and selector */
}

.challenger-title.blue {
    color: #3b82f6;
}

.challenger-title.red {
    color: #ef4444;
}

.challenger-content {
    display: flex;
    border: 1px solid;
    border-radius: 0.375rem;
    margin-top: 1.5rem;
    /* Increased space after selector */
}

.challenger-content.blue {
    border-color: rgba(59, 130, 246, 0.3);
    color: #60a5fa;
}

.challenger-content.red {
    border-color: rgba(239, 68, 68, 0.3);
    color: #f87171;
}

.strategy-selector {
    margin-bottom: 0.5rem;
    /* Reduced bottom margin since we added space to title */
    width: 100%;
}

.strategy-select {
    width: 100%;
    padding: 0.75rem;
    /* Slightly increased padding for better clickability */
    border-radius: 0.375rem;
    background-color: #1e293b;
    font-size: 1rem;
    cursor: pointer;
    outline: none;
}

.strategy-select.blue {
    color: #60a5fa;
    border: 1px solid rgba(59, 130, 246, 0.3);
}

.strategy-select.red {
    color: #f87171;
    border: 1px solid rgba(239, 68, 68, 0.3);
}

.strategy-select.blue:focus {
    border-color: #3b82f6;
    box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.2);
}

.strategy-select.red:focus {
    border-color: #ef4444;
    box-shadow: 0 0 0 2px rgba(239, 68, 68, 0.2);
}

.strategy-select option {
    background-color: #1e293b;
    padding: 0.5rem;
    /* Added padding to dropdown options */
}
</style>
