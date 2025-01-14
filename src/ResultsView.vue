<template>
    <div class="fade-in">
        <div class="results">
            <div class="results-title">Results</div>
            <div class="results-content">
                <div class="contribution-results">
                    <div class="challenger-result challenger-result-blue">
                        <h3>{{ challenger1.name }}</h3>
                        <p>Contribution Totale: {{ formatCurrency(challenger1.contribution) }}</p>
                    </div>
                    <div class="challenger-result challenger-result-red">
                        <h3>{{ challenger2.name }}</h3>
                        <p>Contribution Totale: {{ formatCurrency(challenger2.contribution) }}</p>
                    </div>
                </div>

                <div class="portfolio-evolution">
                    <h3>Portfolio Evolution</h3>
                    <div class="chart-container">
                        <canvas ref="chart"></canvas>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import Chart from 'chart.js/auto'

export default {
    name: 'ResultsView',
    props: {
        challenger1: {
            type: Object,
            required: true,
            default: () => ({
                name: 'Challenger 1',
                contribution: 0,
                portfolioEvolution: [],
                totalInvestedEvolution: []
            })
        },
        challenger2: {
            type: Object,
            required: true,
            default: () => ({
                name: 'Challenger 2',
                contribution: 0,
                portfolioEvolution: [],
                totalInvestedEvolution: []
            })
        }
    },
    data() {
        return {
            chart: null
        }
    },
    methods: {
        formatCurrency(amount) {
            return new Intl.NumberFormat('fr-FR', {
                style: 'currency',
                currency: 'EUR'
            }).format(amount);
        },

        createChart() {
            if (this.chart) {
                this.chart.destroy()
            }

            const ctx = this.$refs.chart.getContext('2d')

            // Process data to get median values
            const data = this.processEvolutionData()

            this.chart = new Chart(ctx, {
                type: 'line',
                data: {
                    labels: data.labels,
                    datasets: [
                        {
                            label: this.challenger1.name,
                            data: data.challenger1Values,
                            borderColor: '#3b82f6',
                            backgroundColor: 'rgba(59, 130, 246, 0.1)',
                            tension: 0.3,
                            fill: true
                        },
                        {
                            label: this.challenger2.name,
                            data: data.challenger2Values,
                            borderColor: '#ef4444',
                            backgroundColor: 'rgba(239, 68, 68, 0.1)',
                            tension: 0.3,
                            fill: true
                        }
                    ]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    interaction: {
                        intersect: false,
                        mode: 'index'
                    },
                    plugins: {
                        legend: {
                            position: 'top',
                            labels: {
                                color: '#fff'
                            }
                        },
                        tooltip: {
                            callbacks: {
                                label: (context) => {
                                    let label = context.dataset.label || '';
                                    if (label) {
                                        label += ': ';
                                    }
                                    label += this.formatCurrency(context.parsed.y);
                                    return label;
                                }
                            }
                        }
                    },
                    scales: {
                        x: {
                            grid: {
                                color: 'rgba(255, 255, 255, 0.1)'
                            },
                            ticks: {
                                color: '#fff',
                                callback: (value) => `Year ${Math.floor(value / 12)}`
                            }
                        },
                        y: {
                            grid: {
                                color: 'rgba(255, 255, 255, 0.1)'
                            },
                            ticks: {
                                color: '#fff',
                                callback: (value) => this.formatCurrency(value)
                            }
                        }
                    }
                }
            })
        },

        processEvolutionData() {
            const length = Math.min(
                this.challenger1.portfolioEvolution.length,
                this.challenger2.portfolioEvolution.length
            )

            const labels = Array(length).fill(0).map((_, i) => i)
            const challenger1Values = Array(length).fill(0).map((_, i) => {
                const values = this.challenger1.portfolioEvolution[i]
                return values ? this.calculateMedian(values) : 0
            })
            const challenger2Values = Array(length).fill(0).map((_, i) => {
                const values = this.challenger2.portfolioEvolution[i]
                return values ? this.calculateMedian(values) : 0
            })

            return {
                labels,
                challenger1Values,
                challenger2Values
            }
        },

        calculateMedian(arr) {
            const sorted = [...arr].sort((a, b) => a - b)
            const mid = Math.floor(sorted.length / 2)
            return sorted.length % 2 === 0
                ? (sorted[mid - 1] + sorted[mid]) / 2
                : sorted[mid]
        }
    },
    mounted() {
        this.createChart()
    },
    watch: {
        challenger1: {
            deep: true,
            handler() {
                this.createChart()
            }
        },
        challenger2: {
            deep: true,
            handler() {
                this.createChart()
            }
        }
    }
}
</script>

<style scoped>
.results {
    padding: 1.5rem;
    border-radius: 0.5rem;
    background-color: #1e293b;
    border: 2px solid #a855f7;
    box-shadow: 0 4px 6px -1px rgb(168 85 247 / 0.5);
}

.results-title {
    text-align: center;
    font-size: 1.5rem;
    font-weight: bold;
    color: #a855f7;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    margin-bottom: 1rem;
}

.results-content {
    border: 1px solid rgba(168, 85, 247, 0.3);
    border-radius: 0.375rem;
}

.contribution-results {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 1rem;
    padding: 1rem;
}

.challenger-result {
    padding: 1rem;
    border-radius: 0.375rem;
    border: 1px solid;
}

.challenger-result h3 {
    font-weight: bold;
    margin-bottom: 0.5rem;
}

.challenger-result-blue {
    border-color: rgba(59, 130, 246, 0.3);
}

.challenger-result-blue h3 {
    color: #3b82f6;
}

.challenger-result-red {
    border-color: rgba(239, 68, 68, 0.3);
}

.challenger-result-red h3 {
    color: #ef4444;
}

.portfolio-evolution {
    padding: 1rem;
}

.portfolio-evolution h3 {
    color: #a855f7;
    margin-bottom: 1rem;
    text-align: center;
}

.chart-container {
    height: 400px;
    background-color: #1e293b;
    border-radius: 0.375rem;
    padding: 1rem;
}

@keyframes fade-in-down {
    from {
        opacity: 0;
        transform: translateY(-20px);
    }

    to {
        opacity: 1;
        transform: translateY(0);
    }
}

.fade-in {
    animation: fade-in-down 0.5s ease-out;
}
</style>