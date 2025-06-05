# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Invest Arena is a French Vue.js application that simulates and compares long-term investment strategies using Monte Carlo simulations. The app allows users to pit two investment strategies against each other in a "combat arena" format.

## Core Commands

**Development:**
```bash
npm run dev        # Start development server (http://localhost:5173)
npm run build      # Build for production
npm run preview    # Preview production build
```

**Deployment:**
```bash
npm run deploy     # Build and deploy to GitHub Pages
```

## Architecture

### Application Structure
- **Entry Point**: `src/main.js` → `src/InvestArena.vue` (main application component)
- **Combat System**: Two `ChallengerPlaceholder` components that dynamically load strategy components
- **Strategy Components**: `DCAStrategy.vue`, `LumpsumStrategy.vue`, `LMNPStrategy.vue`
- **Results System**: `ResultsView.vue` and `SimulationDetails.vue` for displaying simulation outcomes
- **Simulation Engine**: `src/simulator.js` contains Monte Carlo simulation logic

### Key Architectural Patterns
- **Dynamic Component Loading**: `ChallengerPlaceholder` uses Vue's dynamic components to switch between investment strategies
- **Monte Carlo Simulations**: All strategies run 6000 simulations to generate statistical distributions
- **Async Results**: Main component coordinates parallel simulation execution using `Promise.all()`
- **Reactive Time Horizon**: All strategies receive time horizon as a prop and recalculate when changed

### Simulation Engine (`simulator.js`)
- **ETF Strategies**: Use Box-Muller transform for normal distribution of returns
- **Real Estate (LMNP)**: Models property appreciation, rental income, loan payments, and maintenance costs
- **Market Parameters**: Predefined ETF types (MSCI World, S&P 500, Nasdaq) with historical returns/volatility
- **Fee Structure**: Transaction fees, management fees, and real estate acquisition costs built into simulations

### Component Communication
- Parent (`InvestArena`) manages global state and triggers simulations
- Strategy components expose `computeResults()` method for simulation execution
- Results flow from strategies → placeholders → main component → results components

## Important Implementation Notes

- All text is in French - maintain French language in UI elements and variable names
- Uses Chart.js via vue-chartjs for data visualization
- GitHub Pages deployment with base path configured in `vite.config.js`
- Dark theme with yellow/amber accent colors throughout the UI
- Responsive design for mobile and desktop usage