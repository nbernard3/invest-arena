<template>
  <div class="container">
    <nav>
      <h1>Stratinvest-Arena</h1>
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
      <input 
        type="number" 
        id="timeHorizon" 
        v-model="selectedTimeHorizon"
        @input="validateTimeHorizon"
        min="5"
        max="30"
      />
    </div>

    <div class="arena">
      <div class="challenger challenger-blue">
        <div class="challenger-title">Challenger 1</div>
        <div class="challenger-content">
          <p>Placeholder Gauche</p>
        </div>
      </div>
      
      <div class="vs">VS</div>

      <div class="challenger challenger-red">
        <div class="challenger-title">Challenger 2</div>
        <div class="challenger-content">
          <p>Placeholder Droite</p>
        </div>
      </div>
    </div>

    <div class="results">
      <div class="results-title">Combat Results</div>
      <div class="results-content">
        <p>Résultats</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'InvestmentSimulator',
  data() {
    return {
      selectedTimeHorizon: '5'
    }
  },
  methods: {
    validateTimeHorizon(event) {
      const value = Math.min(Math.max(parseInt(event.target.value) || 5, 5), 30)
      this.selectedTimeHorizon = value.toString()
    }
  }
}
</script>

<style>
.container {
  max-width: 1200px;
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
}

.time-horizon label {
  display: block;
  font-size: 1.25rem;
  font-weight: bold;
  color: #fbbf24;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  margin-bottom: 0.5rem;
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

.arena {
  display: flex;
  gap: 1rem;
  margin-bottom: 1.5rem;
}

.challenger {
  flex: 1;
  padding: 1.5rem;
  border-radius: 0.5rem;
  background-color: #1e293b;
  border: 2px solid;
  transition: transform 0.2s;
}

.challenger:hover {
  transform: scale(1.05);
}

.challenger-blue {
  border-color: #3b82f6;
  box-shadow: 0 4px 6px -1px rgb(59 130 246 / 0.5);
}

.challenger-red {
  border-color: #ef4444;
  box-shadow: 0 4px 6px -1px rgb(239 68 68 / 0.5);
}

.challenger-title {
  text-align: center;
  font-size: 1.5rem;
  font-weight: bold;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.challenger-blue .challenger-title {
  color: #3b82f6;
}

.challenger-red .challenger-title {
  color: #ef4444;
}

.challenger-content {
  height: 12rem;
  margin-top: 1rem;
  border: 1px solid;
  border-radius: 0.375rem;
  display: flex;
  align-items: center;
  justify-content: center;
}

.challenger-blue .challenger-content {
  border-color: rgba(59, 130, 246, 0.3);
}

.challenger-red .challenger-content {
  border-color: rgba(239, 68, 68, 0.3);
}

.challenger-blue .challenger-content p {
  color: #60a5fa;
}

.challenger-red .challenger-content p {
  color: #f87171;
}

.vs {
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
</style>