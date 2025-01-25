<template>
    <div class="fade-in">
        <div class="results">
            <div class="results-title">
                <div v-if="resultsSummary.winner === 1">🏆 Challenger 1 wins! 🏆</div>
                <div v-else-if="resultsSummary.winner === 2">🏆 Challenger 2 wins! 🏆</div>
                <div v-else>🤝 It's a tie! 🤝</div>
            </div>
            <div class="results-content">
                <div class="results-grid">
                    <div class="portfolio-evolution">
                        <div class="chart-container">
                            <Line :data="chartData" :options="chartOptions" ref="chart" />
                        </div>
                        <div class="distribution-container">
                            <Line :data="distributionData" :options="distributionOptions" />
                        </div>
                    </div>

                    <div class="contribution-results">
                        <table class="results-table">
                            <thead>
                                <tr>
                                    <th class="metric-header"></th>
                                    <th class="challenger-header challenger1">{{ challenger1.name }}</th>
                                    <th class="challenger-header challenger2">{{ challenger2.name }}</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td class="metric-cell">
                                        <div class="metric-with-tooltip">
                                            Effort financier
                                            <InfoTooltip
                                                text="Montants investis : initial, mensuel et total cumulé" />
                                        </div>
                                    </td>
                                    <td class="value-cell challenger1">
                                        <div class="min-max">Initial: {{ keurosFormat(resultsSummary.initialInvested1)
                                            }}</div>
                                        <div class="min-max">Cashflow: {{ keurosFormat(resultsSummary.cashflow1) }}
                                        </div>
                                        <div class="min-max">Total: {{ keurosFormat(resultsSummary.totalInvested1) }}
                                        </div>
                                    </td>
                                    <td class="value-cell challenger2">
                                        <div class="min-max">Initial: {{ keurosFormat(resultsSummary.initialInvested2)
                                            }}</div>
                                        <div class="min-max">Cashflow: {{ keurosFormat(resultsSummary.cashflow2) }}
                                        </div>
                                        <div class="min-max">Total: {{ keurosFormat(resultsSummary.totalInvested2) }}
                                        </div>
                                    </td>
                                </tr>
                                <tr>
                                    <td class="metric-cell">
                                        <div class="metric-with-tooltip">
                                            Capital final
                                            <InfoTooltip
                                                text="Valeur finale du portefeuille. Min/Max = 10ème et 90ème percentiles" />
                                        </div>
                                    </td>
                                    <td class="value-cell challenger1">
                                        <div class="min-max">Min: {{ keurosFormat(resultsSummary.finalPortfolio1[0]) }}
                                        </div>
                                        <div class="median">
                                            <span class="label">Median:</span>
                                            <span class="value">{{ keurosFormat(resultsSummary.finalPortfolio1[1])
                                                }}</span>
                                        </div>
                                        <div class="min-max">Max: {{ keurosFormat(resultsSummary.finalPortfolio1[2]) }}
                                        </div>
                                    </td>
                                    <td class="value-cell challenger2">
                                        <div class="min-max">Min: {{ keurosFormat(resultsSummary.finalPortfolio2[0]) }}
                                        </div>
                                        <div class="median">
                                            <span class="label">Median:</span>
                                            <span class="value">{{ keurosFormat(resultsSummary.finalPortfolio2[1])
                                                }}</span>
                                        </div>
                                        <div class="min-max">Max: {{ keurosFormat(resultsSummary.finalPortfolio2[2]) }}
                                        </div>
                                    </td>
                                </tr>
                                <tr>
                                    <td class="metric-cell">
                                        <div class="metric-with-tooltip">
                                            Plus-value
                                            <InfoTooltip
                                                text="Gains = Capital final - Total investi. Min/Max = 10ème et 90ème percentiles" />
                                        </div>
                                    </td>
                                    <td class="value-cell challenger1">
                                        <div class="min-max">Min: {{ keurosFormat(resultsSummary.capitalGain1[0]) }}
                                        </div>
                                        <div class="median">
                                            <span class="label">Median:</span>
                                            <span class="value">{{ keurosFormat(resultsSummary.capitalGain1[1])
                                                }}</span>
                                        </div>
                                        <div class="min-max">Max: {{ keurosFormat(resultsSummary.capitalGain1[2]) }}
                                        </div>
                                    </td>
                                    <td class="value-cell challenger2">
                                        <div class="min-max">Min: {{ keurosFormat(resultsSummary.capitalGain2[0]) }}
                                        </div>
                                        <div class="median">
                                            <span class="label">Median:</span>
                                            <span class="value">{{ keurosFormat(resultsSummary.capitalGain2[1])
                                                }}</span>
                                        </div>
                                        <div class="min-max">Max: {{ keurosFormat(resultsSummary.capitalGain2[2]) }}
                                        </div>
                                    </td>
                                </tr>
                                <tr>
                                    <td class="metric-cell">
                                        <div class="metric-with-tooltip">
                                            Enrichissement latent
                                            <InfoTooltip
                                                text="Enrichissement = Capital final - Capital initial. Min/Max = 10ème et 90ème percentiles" />
                                        </div>
                                    </td>
                                    <td class="value-cell challenger1">
                                        <div class="min-max">Min: {{ keurosFormat(resultsSummary.portfolioIncrease1[0])
                                            }}</div>
                                        <div class="median">
                                            <span class="label">Median:</span>
                                            <span class="value">{{ keurosFormat(resultsSummary.portfolioIncrease1[1])
                                                }}</span>
                                        </div>
                                        <div class="min-max">Max: {{ keurosFormat(resultsSummary.portfolioIncrease1[2])
                                            }}</div>
                                    </td>
                                    <td class="value-cell challenger2">
                                        <div class="min-max">Min: {{ keurosFormat(resultsSummary.portfolioIncrease2[0])
                                            }}</div>
                                        <div class="median">
                                            <span class="label">Median:</span>
                                            <span class="value">{{ keurosFormat(resultsSummary.portfolioIncrease2[1])
                                                }}</span>
                                        </div>
                                        <div class="min-max">Max: {{ keurosFormat(resultsSummary.portfolioIncrease2[2])
                                            }}</div>
                                    </td>
                                </tr>
                                <tr>
                                    <td class="metric-cell">
                                        <div class="metric-with-tooltip">
                                            Proba de victoire
                                            <InfoTooltip
                                                text="Proba que le capital final soit plus important que l'autre. Si cette proba est entre 45/55, match nul car on est dans la marge d'erreur." />
                                        </div>
                                    </td>
                                    <td class="value-cell challenger1">
                                        <div class="median">{{ (resultsSummary.winningRatio1 * 100).toFixed(1) }}%</div>
                                    </td>
                                    <td class="value-cell challenger2">
                                        <div class="median">{{ (resultsSummary.winningRatio2 * 100).toFixed(1) }}%</div>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { Line } from 'vue-chartjs';
import { Chart as ChartJS, Legend, PointElement, CategoryScale, LinearScale, LineElement, Filler } from 'chart.js'
import InfoTooltip from "./InfoTooltip.vue"

ChartJS.register(Legend, PointElement, CategoryScale, LinearScale, LineElement, Filler)

export default {
    name: 'ResultsView',
    components: {
        Line,
        InfoTooltip
    },
    props: {
        challenger1: {
            type: Object,
            required: true,
            default: () => ({
                name: 'Challenger 1',
                portfolioEvolution: [],
                totalInvestedEvolution: []
            })
        },
        challenger2: {
            type: Object,
            required: true,
            default: () => ({
                name: 'Challenger 2',
                portfolioEvolution: [],
                totalInvestedEvolution: []
            })
        }
    },
    computed: {
        resultsSummary() {
            return this.processSummaryResults()
        },
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
                        usePointStyle: true,
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
                                return index % 12 === 0 & index > 0 ? `T0+${index / 12}` : null;
                            },
                            autoSkip: false  // Prevents automatic tick skipping
                        }
                    },
                    y: {
                        ticks: {
                            callback: this.keurosFormat
                        }
                    }
                }
            }
        },
        distributionData() {
            return this.processDataForDistribution()
        },
        distributionOptions() {
            return {
                responsive: true,
                maintainAspectRatio: false,
                interaction: {
                    intersect: false,
                    mode: 'index'
                },
                plugins: {
                    legend: {
                        position: 'top'
                    },
                },
                scales: {
                    x: {
                        type: 'linear',  // Explicitly set to linear
                        title: {
                            display: true,
                            text: 'Capital final',
                            color: '#a855f7'
                        },
                        ticks: {
                            maxRotation: 45,
                            minRotation: 45,
                            callback: (value) => this.keurosFormat(value),
                            autoSkip: true,
                            stepSize: 50000    // Force step size to 50k€
                        }
                    },
                    y: {
                        title: {
                            display: true,
                            text: 'Densité (%)',
                            color: '#a855f7'
                        },
                        beginAtZero: true
                    }
                }
            }
        },
    },
    methods: {
        keurosFormat(amount) {
            const inThousands = amount / 1000;
            return `${inThousands.toFixed(1)}k€`;
        },

        processDataForPlotting() {
            const labels = Array(this.challenger1.portfolioEvolution.length).fill(0).map((_, i) => i / 12);

            const challenger1Percentiles = this.computePercentiles(this.challenger1.portfolioEvolution);
            const challenger2Percentiles = this.computePercentiles(this.challenger2.portfolioEvolution);

            return {
                labels,
                datasets: [
                    {
                        label: "#1 Contribution",
                        data: this.challenger1.totalInvestedEvolution,
                        borderDash: [10, 5],
                        borderColor: '#3b82f6',  // Blue color for challenger 1
                        borderWidth: 2,
                        pointStyle: false,
                        fill: false
                    },
                    {
                        label: "#1 Capital",
                        data: challenger1Percentiles[1],
                        borderColor: '#3b82f6',
                        borderWidth: 2,
                        pointStyle: false,
                        fill: false
                    },
                    {
                        label: false,
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
                        label: "#2 Contribution",
                        data: this.challenger2.totalInvestedEvolution,
                        borderDash: [10, 5],
                        borderColor: '#ef4444',  // Red color for challenger 2
                        borderWidth: 2,
                        pointStyle: false,
                        fill: false
                    },
                    {
                        label: "#2 Capital",
                        data: challenger2Percentiles[1],
                        borderColor: '#ef4444',
                        borderWidth: 2,
                        pointStyle: false,
                        fill: false
                    },
                    {
                        label: false,
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
        },

        processDataForDistribution() {
            const finalPortfolios1 = this.challenger1.portfolioEvolution.at(-1);
            const finalPortfolios2 = this.challenger2.portfolioEvolution.at(-1);

            const binCount = 50;

            // Force min to 0 and add a small buffer to max
            const min = 0;
            const max = Math.max(Math.max(...finalPortfolios1), Math.max(...finalPortfolios2)) * 1.05; // 5% buffer

            const createDistributionData = (data, min, max) => {
                const binWidth = (max - min) / binCount;
                const bins = Array.from({ length: binCount }, (_, i) => min + (i * binWidth));

                // Count values in each bin
                const counts = new Array(binCount).fill(0);
                data.forEach(value => {
                    const binIndex = Math.min(Math.floor((value - min) / binWidth), binCount - 1);
                    counts[binIndex]++;
                });

                // Smooth the distribution
                const smoothingWindow = 3;
                const smoothedCounts = counts.map((_, index) => {
                    const start = Math.max(0, index - smoothingWindow);
                    const end = Math.min(counts.length, index + smoothingWindow + 1);
                    const windowValues = counts.slice(start, end);
                    return windowValues.reduce((a, b) => a + b, 0) / windowValues.length;
                });

                // Normalize to percentage
                const totalCount = data.length;
                const density = smoothedCounts.map(count => (count / totalCount));

                return density;
            };

            // Create bins for both distributions
            const binWidth = (max - min) / binCount;
            const bins = Array.from(
                { length: binCount },
                (_, i) => min + (i * binWidth)
            );

            const density1 = createDistributionData(finalPortfolios1, min, max);
            const density2 = createDistributionData(finalPortfolios2, min, max);

            return {
                labels: bins,
                datasets: [
                    {
                        label: '#1 Capital',
                        data: density1,
                        borderColor: '#3b82f6',
                        backgroundColor: 'rgba(59, 130, 246, 0.2)',
                        borderWidth: 2,
                        fill: true,
                        tension: 0.4,
                        pointRadius: 0
                    },
                    {
                        label: '#2 Capital',
                        data: density2,
                        borderColor: '#ef4444',
                        backgroundColor: 'rgba(239, 68, 68, 0.2)',
                        borderWidth: 2,
                        fill: true,
                        tension: 0.4,
                        pointRadius: 0
                    }
                ]
            }
        },

        processSummaryResults() {

            const initialInvested1 = this.challenger1.totalInvestedEvolution.at(0);
            const initialInvested2 = this.challenger2.totalInvestedEvolution.at(0);

            const totalInvested1 = this.challenger1.totalInvestedEvolution.at(-1);
            const totalInvested2 = this.challenger2.totalInvestedEvolution.at(-1);

            const cashflow1 = (initialInvested1 - totalInvested1) / this.challenger1.totalInvestedEvolution.length;
            const cashflow2 = (initialInvested2 - totalInvested2) / this.challenger2.totalInvestedEvolution.length;

            const challenger1Percentiles = this.computePercentiles(this.challenger1.portfolioEvolution);
            const challenger2Percentiles = this.computePercentiles(this.challenger2.portfolioEvolution);

            const finalPortfolio1 = challenger1Percentiles.map((p) => p.at(-1));
            const finalPortfolio2 = challenger2Percentiles.map((p) => p.at(-1));

            const capitalGain1 = challenger1Percentiles.map((p) => p.at(-1) - totalInvested1);
            const capitalGain2 = challenger2Percentiles.map((p) => p.at(-1) - totalInvested2);

            const portfolioIncrease1 = challenger1Percentiles.map((p) => p.at(-1) - p.at(0));
            const portfolioIncrease2 = challenger2Percentiles.map((p) => p.at(-1) - p.at(0));

            const finalPortfolioSim1 = this.challenger1.portfolioEvolution.at(-1);
            const finalPortfolioSim2 = this.challenger2.portfolioEvolution.at(-1);

            let winCounts1 = 0;
            let winCounts2 = 0;
            for (const p1 of finalPortfolioSim1) {
                for (const p2 of finalPortfolioSim2) {
                    if (p1 >= p2) {
                        winCounts1++;
                    } else {
                        winCounts2++;
                    }
                }
            }

            const winningRatio1 = winCounts1 / (winCounts1 + winCounts2);
            const winningRatio2 = winCounts2 / (winCounts1 + winCounts2);

            const errorMargin = 0.05;
            const winner = winningRatio1 > 0.5 + errorMargin ? 1 : winningRatio2 > 0.5 + errorMargin ? 2 : 0;

            return {
                finalPortfolio1,
                finalPortfolio2,
                capitalGain1,
                capitalGain2,
                initialInvested1,
                initialInvested2,
                totalInvested1,
                totalInvested2,
                cashflow1,
                cashflow2,
                portfolioIncrease1,
                portfolioIncrease2,
                winningRatio1,
                winningRatio2,
                winner
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
    padding: 1rem;
    min-width: 0;
    width: 100%;
}

.results-grid {
    display: grid;
    gap: 1.5rem;
    /* By default (mobile), items are stacked */
    grid-template-columns: 1fr;
    width: 100%;
    min-width: 0;
}

/* When screen is wide enough, switch to side-by-side */
@media (min-width: 1024px) {
    .results-grid {
        grid-template-columns: minmax(500px, 3fr) minmax(300px, 2fr);
    }
}

.contribution-results {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 1rem;
    padding: 0;
    min-width: 0;
    width: 100%;
    overflow-x: auto;
    /* Allow horizontal scroll if needed */
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
    color: #3b82f6;
}

.challenger-result-red {
    border-color: rgba(239, 68, 68, 0.3);
    color: #ef4444;
}

.portfolio-evolution {
    padding: 0;
    min-width: 0;
    width: 100%;
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
    width: 100%;
    min-width: 0;
}

.distribution-container {
    margin-top: 2rem;
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

.results-table {
    width: 100%;
    border-collapse: collapse;
    background-color: #1e293b;
    width: 100%;
    /* Set a minimum width to prevent excessive squishing */
    min-width: 280px;
}

.results-table th,
.results-table td {
    padding: 0.75rem;
    text-align: left;
    border-bottom: 1px solid rgba(168, 85, 247, 0.3);
}

.metric-header {
    color: #a855f7;
    font-weight: bold;
}

.challenger-header {
    text-align: center;
    font-weight: bold;
}

.challenger-header.challenger1,
.value-cell.challenger1 {
    color: #3b82f6;
}

.challenger-header.challenger2,
.value-cell.challenger2 {
    color: #ef4444;
}

.metric-cell {
    color: #a855f7;
}

.value-cell {
    text-align: center;
}

.value-cell .min-max {
    font-size: 0.875rem;
    opacity: 0.7;
    margin: 0.25rem 0;
}

.value-cell .median {
    margin: 0.5rem 0;
    padding: 0.5rem;
    background-color: rgba(168, 85, 247, 0.1);
    border-radius: 0.25rem;
    font-size: 1.125rem;
    font-weight: 600;
}

.value-cell .median .label {
    opacity: 0.8;
    margin-right: 0.5rem;
}

.value-cell .median .value {
    font-size: 1.25rem;
}

.value-cell.challenger1 .median {
    background-color: rgba(59, 130, 246, 0.1);
}

.value-cell.challenger2 .median {
    background-color: rgba(239, 68, 68, 0.1);
}

.metric-with-tooltip {
    display: flex;
    align-items: center;
    gap: 8px;
}
</style>