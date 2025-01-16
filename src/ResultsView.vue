<template>
    <div class="fade-in">
        <div class="results">
            <div class="results-title">Results</div>
            <div class="results-content">
                <div class="contribution-results">
                    <div class="challenger-result challenger-result-blue">
                        <h3>{{ challenger1.name }}</h3>
                        <p>Contribution Totale: 0</p>
                    </div>
                    <div class="challenger-result challenger-result-red">
                        <h3>{{ challenger2.name }}</h3>
                        <p>Contribution Totale: 0</p>
                    </div>
                </div>

                <div class="portfolio-evolution">
                    <h3>Portfolio Evolution</h3>
                    <div class="chart-container">
                        <Line :data="chartData" :options="chartOptions" ref="chart" />
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { Line } from 'vue-chartjs';
import { Chart as ChartJS, Legend, PointElement, CategoryScale, LinearScale, LineElement, Filler} from 'chart.js'

ChartJS.register(Legend, PointElement, CategoryScale, LinearScale, LineElement, Filler)

export default {
    name: 'ResultsView',
    components: {
        Line
    },
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
    computed: {
        chartData() {
            return this.processDataForPlotting()
        },
        chartOptions() {
            return {
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
                            filter: function (legendItem, data) {
                                // Only show specific labels in legend
                                return legendItem.text !== false;
                            }
                        }
                    }
                },
                scales: {
                    x: {
                        ticks: {
                            callback: function (value, index) {
                                // Assuming monthly data points (12 points per year)
                                return index % 12 === 0 ? `Year ${index / 12}` : null;
                            },
                            autoSkip: false  // Prevents automatic tick skipping
                        }
                    }
                }
            }
        },
    },
    methods: {
        formatCurrency(amount) {
            return new Intl.NumberFormat('fr-FR', {
                style: 'currency',
                currency: 'EUR'
            }).format(amount);
        },

        processDataForPlotting() {
            const labels = Array(this.challenger1.portfolioEvolution.length).fill(0).map((_, i) => i / 12);

            const challenger1Percentiles = this.computePercentiles(this.challenger1.portfolioEvolution);
            const challenger2Percentiles = this.computePercentiles(this.challenger2.portfolioEvolution);

            return {
                labels,
                datasets: [
                    {
                        label: "#1 Total invested",
                        data: this.challenger1.totalInvestedEvolution,
                        borderDash: [10, 5],
                        borderColor: '#3b82f6',  // Blue color for challenger 1
                        borderWidth: 2,
                        pointStyle: false,
                        fill: false
                    },
                    {
                        label: "#1 median",
                        data: challenger1Percentiles[1],
                        borderColor: '#3b82f6',
                        borderWidth: 2,
                        pointStyle: false,
                        fill: false
                    },
                    {
                        label: "#1 Confidence Interval",
                        data: challenger1Percentiles[2],  // Using upper bound data
                        borderColor: 'transparent',  // Hide the line
                        backgroundColor: 'rgba(59, 130, 246, 0.2)',  // Semi-transparent blue
                        fill: {
                            target: '+1',  // Fill to the next dataset
                            above: 'rgba(59, 130, 246, 0.2)'  // Color above the line
                        },
                        pointStyle: false
                    },
                    {
                        label: false,  // Hide from legend
                        data: challenger1Percentiles[0],  // Using lower bound data
                        borderColor: 'transparent',
                        pointStyle: false,
                        fill: false
                    },

                    {
                        label: "#2 Total invested",
                        data: this.challenger2.totalInvestedEvolution,
                        borderDash: [10, 5],
                        borderColor: '#ef4444',  // Red color for challenger 2
                        borderWidth: 2,
                        pointStyle: false,
                        fill: false
                    },
                    {
                        label: "#2 median",
                        data: challenger2Percentiles[1],
                        borderColor: '#ef4444',
                        borderWidth: 2,
                        pointStyle: false,
                        fill: false
                    },
                    {
                        label: "#2 Confidence Interval",
                        data: challenger2Percentiles[2],  // Using upper bound data
                        borderColor: 'transparent',  // Hide the line
                        backgroundColor: 'rgba(239, 68, 68, 0.2)',  // Semi-transparent red
                        fill: {
                            target: '+1',  // Fill to the next dataset
                            above: 'rgba(239, 68, 68, 0.2)'  // Color above the line
                        },
                        pointStyle: false
                    },
                    {
                        label: false,  // Hide from legend
                        data: challenger2Percentiles[0],  // Using lower bound data
                        borderColor: 'transparent',
                        pointStyle: false,
                        fill: false
                    }
                ]
            }
        },

        computePercentiles(portfolioEvolution, percentiles = [0.1, 0.5, 0.9]) {
            const sorted = portfolioEvolution.map((portfolio) => portfolio.sort((a, b) => a - b));

            return percentiles.map(
                (perc) => sorted.map((portfolio) => portfolio[Math.floor(perc * (portfolio.length - 1))]))
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