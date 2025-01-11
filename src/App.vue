<template>
  <div class="container">
    <nav>
      <h1>Market Kombat</h1>
    </nav>

    <div class="disclaimer">
      <p>
        Avis de non-responsabilité: Cet outil est uniquement destiné à la simulation.
        Les auteurs ne peuvent être tenus responsables des décisions d'investissement prises sur la base
        de ces résultats. Les performances passées ne préjugent pas des performances futures.
      </p>
    </div>

    <div class="time-horizon">
      <label for="timeHorizon">Horizon temporel (années)</label>
      <input type="number" id="timeHorizon" v-model="selectedTimeHorizon" @input="validateTimeHorizon" min="5"
        max="30" />
    </div>

        <!-- Combat Arena -->
    <div class="combat-arena">
      <ChallengerPlaceholder
        title="Challenger 1"
        placeholder-text="Placeholder Gauche"
        variant="blue"
      />
      
      <div class="versus">VS</div>
      
      <ChallengerPlaceholder
        title="Challenger 2"
        placeholder-text="Placeholder Droite"
        variant="red"
      />
    </div>

    <div class="button-container">
      <button @click="handleFightSimulation" :disabled="isLoading" class="fight-button">
        <span class="lucide-swords"></span>
        <span>
          {{ isLoading ? 'FIGHTING...' : 'READY? FIGHT!' }}
        </span>
        <span class="lucide-swords"></span>

        <div class="corner corner-tl"></div>
        <div class="corner corner-tr"></div>
        <div class="corner corner-bl"></div>
        <div class="corner corner-br"></div>
      </button>
    </div>

    <div v-if="showResults" class="fade-in">
      <div class="results">
        <div class="results-title">Results</div>
        <div class="results-content">
          <p>Résultats</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ChallengerPlaceholder from './ChallengerPlaceholder.vue'

export default {
  name: 'InvestmentSimulator',
  components: {
    ChallengerPlaceholder
  },
  data() {
    return {
      selectedTimeHorizon: '10',
      showResults: false,
      isLoading: false
    }
  },
  methods: {
    validateTimeHorizon(event) {
      const value = Math.min(Math.max(parseInt(event.target.value) || 5, 5), 30)
      this.selectedTimeHorizon = value.toString()
    },

    async handleFightSimulation() {
      this.isLoading = true
      this.showResults = false

      // Simulate computation time
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      // Here you'll add your actual simulation logic
      
      this.showResults = true
      this.isLoading = false
    }
  }
}
</script>

<style>
*,
*::before,
*::after {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

html,
body {
  margin: 0;
  padding: 0;
  min-height: 100vh;
  background-color: #0f172a;
}

.container {
  margin: 0 auto;
  padding: 1rem;
  min-height: 100vh;
  background-color: #0f172a;
}

nav {
  margin: -1rem -1rem 1.5rem -1rem;
  padding: 1rem 1.5rem;
  background-color: #1e293b;
  border-bottom: 2px solid #fbbf24;
  box-shadow: 0 4px 6px -1px rgb(251 191 36 / 0.2);
}

nav h1 {
  font-size: 1.875rem;
  font-weight: bold;
  color: #fbbf24;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  transform: skewX(-6deg);
}

.disclaimer {
  border-left: 4px solid #ef4444;
  padding: 1rem;
  margin-bottom: 1.5rem;
  background-color: rgba(239, 68, 68, 0.1);
  transform: skewX(-3deg);
}

.disclaimer p {
  color: #f87171;
  font-weight: bold;
}

.time-horizon {
  margin-bottom: 1.5rem;
  display: flex;
  align-items: center;
  gap: 1rem;
}

.time-horizon label {
  font-size: 1.25rem;
  font-weight: bold;
  color: #fbbf24;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.time-horizon input {
  width: 12rem;
  padding: 0.5rem;
  border: 2px solid #fbbf24;
  border-radius: 0.375rem;
  background-color: #1e293b;
  color: #fbbf24;
}

.time-horizon input:focus {
  outline: none;
  box-shadow: 0 0 0 2px rgba(251, 191, 36, 0.5);
}

.combat-arena {
  display: flex;
  gap: 1rem;
  margin-bottom: 1.5rem;
  min-height: fit-content;
}

.versus {
  display: flex;
  align-items: center;
  justify-content: center;
  color: #ef4444;
  font-size: 2.25rem;
  font-weight: bold;
}

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
  height: 6rem;
  border: 1px solid rgba(168, 85, 247, 0.3);
  border-radius: 0.375rem;
  display: flex;
  align-items: center;
  justify-content: center;
}

.results-content p {
  color: #c084fc;
}

.fight-button {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.75rem;
  padding: 1.5rem 3rem;
  background: linear-gradient(to right, #f59e0b, #ef4444);
  border-radius: 0.5rem;
  border: 4px solid #fcd34d;
  font-size: 1.875rem;
  font-weight: bold;
  color: white;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  position: relative;
  transition: transform 0.2s, box-shadow 0.2s;
}

.fight-button:hover {
  transform: scale(1.05);
  background: linear-gradient(to right, #fbbf24, #f87171);
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.2);
}

.fight-button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.corner {
  position: absolute;
  width: 1rem;
  height: 1rem;
  border: 4px solid #fcd34d;
}

.corner-tl { top: 0; left: 0; border-right: 0; border-bottom: 0; }
.corner-tr { top: 0; right: 0; border-left: 0; border-bottom: 0; }
.corner-bl { bottom: 0; left: 0; border-right: 0; border-top: 0; }
.corner-br { bottom: 0; right: 0; border-left: 0; border-top: 0; }

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

.button-container {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  margin: 2rem 0;
}
</style>