<!-- InfoTooltip.vue -->
<template>
    <div class="tooltip-container">
        <div class="info-icon" @mouseenter="showTooltip" @mouseleave="hideTooltip">i</div>
        <div v-if="isVisible" class="tooltip" :style="tooltipStyle">
            {{ text }}
        </div>
    </div>
</template>

<script>
export default {
    name: 'InfoTooltip',
    props: {
        text: {
            type: String,
            required: true
        }
    },
    data() {
        return {
            isVisible: false,
            tooltipStyle: {}
        }
    },
    methods: {
        showTooltip() {
            this.isVisible = true
            this.$nextTick(() => {
                this.updatePosition()
            })
        },
        hideTooltip() {
            this.isVisible = false
        },
        updatePosition() {
            const tooltipEl = this.$el.querySelector('.tooltip')
            if (!tooltipEl) return

            const containerRect = this.$el.getBoundingClientRect()

            // Position to the right with a small offset
            const left = containerRect.width + 8
            // Vertically center the tooltip
            const top = -(tooltipEl.offsetHeight / 2) + (containerRect.height / 2)

            this.tooltipStyle = {
                left: `${left}px`,
                top: `${top}px`
            }
        }
    }
}
</script>

<style scoped>
.tooltip-container {
    position: relative;
    display: inline-block;
}

.info-icon {
    width: 18px;
    height: 18px;
    border-radius: 50%;
    background-color: #374151;
    color: #fff;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 11px;
    cursor: help;
}

.tooltip {
    position: absolute;
    z-index: 1000;
    padding: 8px 12px;
    font-size: 11px;
    background-color: #4A5568;
    color: white;
    border-radius: 4px;
    max-width: 300px;
    width: max-content;
    white-space: normal;
    pointer-events: none;
    transition: opacity 0.2s;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    line-height: 1.3;
}

.tooltip::before {
    content: '';
    position: absolute;
    left: -4px;
    top: 50%;
    transform: translateY(-50%);
    border-top: 4px solid transparent;
    border-bottom: 4px solid transparent;
    border-right: 4px solid #4A5568;
}
</style>