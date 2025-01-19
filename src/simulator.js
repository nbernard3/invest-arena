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

const REAL_ESTATE_PARAMS = {
    appreciationRate: 0.03,
    volatility: 0.03,
    acquisitionFees: 0.1,
    maintenanceRatio: 0.01 // 1% of property price annual maintenance
};


const DEFAULT_SIM_NB = 6000;

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
        let state = stepETF(prevState, stepParams);
        totalInvestedEvolution.push(state.totalInvested);
        portfolioEvolution.push(state.portfolios);
        prevState = state;
    }

    return {
        totalInvestedEvolution,
        portfolioEvolution
    };
}

function stepETF(prevState, params) {
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
    const portfolios = prevPortfolios.map((pf, index) =>
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

// Simulate real estate investment strategy
function simulateRealEstate(params) {
    const {
        propertyPrice,
        monthlyRent,
        occupancyMonths,
        downPaymentRatio,
        loanDurationYears,
        interestRate,
        insuranceRate,
        timeHorizonYears,
        simNb = DEFAULT_SIM_NB
    } = params;

    // Initial costs
    const downPayment = propertyPrice * downPaymentRatio;

    let totalInvestedEvolution = [];
    totalInvestedEvolution.push(downPayment);

    const acquisitionFees = propertyPrice * REAL_ESTATE_PARAMS.acquisitionFees;

    let portfolioEvolution = [];
    portfolioEvolution.push(new Array(simNb).fill(downPayment - acquisitionFees));

    // Monthly loan payment calculation (fixed rate)
    const loanAmount = propertyPrice + acquisitionFees - downPayment;
    const monthlyLoanRate = (interestRate + insuranceRate) / 12;
    const loanDurationMonths = loanDurationYears * 12;
    const monthlyLoanPayment = loanAmount *
        (monthlyLoanRate * Math.pow(1 + monthlyLoanRate, loanDurationMonths)) /
        (Math.pow(1 + monthlyLoanRate, loanDurationMonths) - 1);

    const stepParams = {
        monthlyRent,
        occupancyMonths,
        monthlyLoanPayment,
        appreciationRate: REAL_ESTATE_PARAMS.appreciationRate,
        volatility: REAL_ESTATE_PARAMS.volatility,
        maintenanceRatio: REAL_ESTATE_PARAMS.maintenanceRatio,
        monthlyLoanRate,
        simNb
    };

    let prevState = {
        portfolios: portfolioEvolution[0],
        totalInvested: totalInvestedEvolution[0],
        propertyValue: new Array(simNb).fill(propertyPrice),
        remainingLoan: loanAmount
    };

    const months = timeHorizonYears * 12;
    for (let i = 0; i < months; i++) {
        const state = stepRealEstate(prevState, stepParams);

        totalInvestedEvolution.push(state.totalInvested);
        portfolioEvolution.push(state.portfolios);
        prevState = state;
    }

    return {
        totalInvestedEvolution,
        portfolioEvolution
    };
}

function stepRealEstate(prevState, params) {
    const {
        portfolios: prevPortfolios,
        totalInvested: prevTotalInvested,
        propertyValue: prevPropertyValue,
        remainingLoan: prevRemainingLoan
    } = prevState;

    const {
        monthlyRent,
        occupancyMonths,
        monthlyLoanPayment,
        appreciationRate,
        volatility,
        maintenanceRatio,
        monthlyLoanRate,
        simNb
    } = params;

    // Monthly maintenance cost (averaged)
    const maintenanceCost = prevPropertyValue.reduce((acc, val) => acc + val * maintenanceRatio / 12) / simNb;

    // Calculate effective rent (accounting for vacancy)
    const effectiveRent = monthlyRent * occupancyMonths / 12;

    // Calculate monthly cashflow
    const monthlyCashflow = effectiveRent - (prevRemainingLoan === 0 ? 0 : monthlyLoanPayment) - maintenanceCost;

    // Update remaining loan
    const remainingLoan = Math.max(0, prevRemainingLoan -
        (monthlyLoanPayment - (prevRemainingLoan * monthlyLoanRate)));

    // Generate random property value changes
    const monthlyAppreciation = appreciationRate / 12;
    const monthlyVol = volatility / Math.sqrt(12);
    const returns = generateRandomReturn(monthlyAppreciation, monthlyVol, simNb);

    // Update property value with appreciation
    const propertyValue = prevPropertyValue.map(
        (val, index) => val * (1 + returns[index]));

    // Update portfolio values
    const portfolios = propertyValue.map((val) => val - remainingLoan);

    const totalInvested = prevTotalInvested - monthlyCashflow;

    return {
        portfolios,
        propertyValue,
        remainingLoan,
        totalInvested
    };
}

export {
    simulateETF,
    simulateRealEstate,
    formatCurrency,
    formatPercentage,
    ETF as MARKET_PARAMS,
    REAL_ESTATE_PARAMS,
    FEES
};

//const toto = simulateETF({initialAmount:1000, monthlyAmount: 500, timeHorizonYears: 8, etfType:'sp500'});
