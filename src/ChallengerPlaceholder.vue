<template>
    <div :class="['challenger-placeholder', variant]">
      <div :class="['challenger-title', variant]">
        {{ title }}
      </div>
      <div :class="['challenger-content', variant]">
        <p>{{ placeholderText }}</p>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: 'ChallengerPlaceholder',
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
        validator: function(value) {
          return ['blue', 'red'].indexOf(value) !== -1
        }
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
  }
  
  .challenger-title.blue {
    color: #3b82f6;
  }
  
  .challenger-title.red {
    color: #ef4444;
  }
  
  .challenger-content {
    height: 12rem;
    display: flex;
    align-items: center;
    justify-content: center;
    border: 1px solid;
    border-radius: 0.375rem;
    margin-top: 1rem;
  }
  
  .challenger-content.blue {
    border-color: rgba(59, 130, 246, 0.3);
    color: #60a5fa;
  }
  
  .challenger-content.red {
    border-color: rgba(239, 68, 68, 0.3);
    color: #f87171;
  }
  </style>
