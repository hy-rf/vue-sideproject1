<script setup lang="ts">
import type Schedule from '@/types/Schedule'
import { ref, onMounted } from 'vue'
import { Chart, ArcElement, Tooltip, Legend, DoughnutController } from 'chart.js'

// Register Chart.js components
Chart.register(ArcElement, Tooltip, Legend, DoughnutController)

function calculateEfficiency(actualOutput: number, schedule: Schedule): number {
  const expectedOutput = schedule.uph * schedule.workingHoursPerDay // Units per day
  const efficiency = (actualOutput / expectedOutput) * 100
  return parseFloat(efficiency.toFixed(2)) // Return efficiency as a percentage with 2 decimal places
}
const schedule: Schedule = {
  id: '1',
  productName: 'Product A',
  operatingLine: '1',
  cycleTime: 60,
  efficiency: 0,
  uph: 50, // Units per hour
  workingHoursPerDay: 8,
  upd: 400,
  minimumWorkingDays: 1,
  minimumLotSize: 100,
  createdAt: new Date(),
}

const actualOutput = 350 // Actual units produced in a day
const efficiency = calculateEfficiency(actualOutput, schedule)

console.log(`Efficiency: ${efficiency}%`)

const chartRef = ref<HTMLCanvasElement | null>(null)
onMounted(() => {
  if (chartRef.value) {
    new Chart(chartRef.value, {
      type: 'doughnut',
      data: {
        labels: ['Efficiency', 'Remaining'],
        datasets: [
          {
            data: [efficiency, 100 - efficiency],
            backgroundColor: ['#4caf50', '#e0e0e0'], // Green for efficiency, gray for remaining
            borderWidth: 1,
          },
        ],
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            position: 'bottom',
          },
          tooltip: {
            callbacks: {
              label: (context) => `${context.label}: ${context.raw}%`,
            },
          },
        },
      },
    })
  }
})
</script>

<template>
  <div>
    <h1>Efficiency Chart</h1>
    <p>This is the efficiency chart component.</p>
    <div class="chart-container">
      <canvas ref="chartRef"></canvas>
    </div>
    <p>More details about the efficiency chart can be added here.</p>
    <p>Additional information or controls can be placed below.</p>
    <p>End of the efficiency chart component.</p>
    <p>Additional notes or instructions can be added here.</p>
  </div>
</template>

<style lang="css" scoped>
.chart-container {
  margin-top: 20px;
  width: 300px;
  height: 300px;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
