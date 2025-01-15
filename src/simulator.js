// Investment simulation parameters and utilities
const ETF = {
    'msci-world': {
        meanReturn: 0.07, // 7% annual return
        volatility: 0.15, // 15% annual volatility
        name: 'MSCI World'
    },
    'sp500': {
        meanReturn: 0.08,
        volatility: 0.16,
        name: 'S&P 500'
    },
    'nasdaq': {
        meanReturn: 0.09,
        volatility: 0.20,
        name: 'Nasdaq'
    }
};

const FEES = {
    etf: {
        transaction: 0.001, // 0.1% per transaction
        ongoing: 0.002     // 0.2% annual management fee
    }
};

const DEFAULT_SIM_NB = 3000;

// Simulate ETF investment strategy
function simulateETF(params) {
    const {
        initialAmount,
        monthlyAmount,
        timeHorizonYears,
        etfType,
        numberOfSimulations: simNb = DEFAULT_SIM_NB
    } = params;

    const etfParams = ETF[etfType];
    const stepParams = {
        meanReturn: etfParams.meanReturn,
        volatility: etfParams.volatility,
        monthlyAmount: monthlyAmount,
        simNb: simNb
    };

    const months = timeHorizonYears * 12;

    let totalInvestedEvolution = [];
    totalInvestedEvolution.push(initialAmount);
    
    let portfolioEvolution = [];
    portfolioEvolution.push(new Array(simNb).fill(initialAmount * (1 - FEES.etf.transaction)));

    let prevState = {
        portfolios: portfolioEvolution[0],
        totalInvested: totalInvestedEvolution[0]
    };

    for (let i = 0; i < months; i++) {
        let state = step(prevState, stepParams);
        totalInvestedEvolution.push(state.totalInvested);
        portfolioEvolution.push(state.portfolios);
        prevState = state;
    }

    return {
        totalInvestedEvolution,
        portfolioEvolution
    };
}

function step(prevState, params) {
    const {
        portfolios: prevPortfolios,
        totalInvested: prevTotalInvested,
    } = prevState;

    const {
        meanReturn,
        volatility,
        monthlyAmount,
        simNb
    } = params;

    const monthlyMean = params.meanReturn / 12;
    const monthlyVol = params.volatility / Math.sqrt(12);
    const returns = generateRandomReturn(monthlyMean, monthlyVol, params.simNb);

    const totalInvested = prevTotalInvested + params.monthlyAmount;
    let portfolios = prevPortfolios.map((pf, index) =>
        pf * (1 + returns[index]) * (1 - FEES.etf.ongoing / 12) + params.monthlyAmount * (1 - FEES.etf.transaction));

    return {
        portfolios,
        totalInvested
    }
}

// Utility function to generate random returns following a normal distribution
function generateRandomReturn(mean, volatility, simNb = DEFAULT_SIM_NB) {
    // Box-Muller transform for normal distribution
    let zs = [...new Array(simNb)].map(() => Math.sqrt(-2 * Math.log(Math.random())) * Math.cos(2 * Math.PI * Math.random()));
    return zs.map((z) => mean + volatility * z);
}


// Statistical utility functions
function percentile(values, p) {
    const sorted = [...values].sort((a, b) => a - b);
    const index = Math.floor(p * (sorted.length - 1));
    return sorted[index];
}

function mean(values) {
    return values.reduce((a, b) => a + b, 0) / values.length;
}

function standardDeviation(values) {
    const avg = mean(values);
    const squareDiffs = values.map(v => Math.pow(v - avg, 2));
    return Math.sqrt(mean(squareDiffs));
}

// Format currency for display
function formatCurrency(amount, locale = 'fr-FR', currency = 'EUR') {
    return new Intl.NumberFormat(locale, {
        style: 'currency',
        currency: currency
    }).format(amount);
}

// Format percentage for display
function formatPercentage(value, decimals = 1) {
    return `${(value * 100).toFixed(decimals)}%`;
}

export {
    simulateETF,
    formatCurrency,
    formatPercentage,
    ETF as MARKET_PARAMS,
    FEES
};

//const toto = simulateETF({initialAmount:1000, monthlyAmount: 500, timeHorizonYears: 8, etfType:'sp500'});
