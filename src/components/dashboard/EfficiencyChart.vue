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

const actualOutputLastDay = 350 // Actual units produced yesterday
const actualOutputMonthly = 10000 // Actual units produced this month
const actualOutputLastQuarter = 28000 // Actual units produced last quarter
const actualOutputLastYear = 120000 // Actual units produced last year

// Calculate efficiencies
const efficiencyLastDay = calculateEfficiency(actualOutputLastDay, schedule)
const efficiencyMonthly = calculateEfficiency(actualOutputMonthly, schedule) / 30
const efficiencyLastQuarter = calculateEfficiency(actualOutputLastQuarter, schedule) / 90
const efficiencyLastYear = calculateEfficiency(actualOutputLastYear, schedule) / 365

const chartRef = ref<HTMLCanvasElement | null>(null)
const chartRef2 = ref<HTMLCanvasElement | null>(null)
const chartRef3 = ref<HTMLCanvasElement | null>(null)
const chartRef4 = ref<HTMLCanvasElement | null>(null)
onMounted(() => {
  new Chart(chartRef.value!, {
    type: 'doughnut',
    data: {
      labels: ['Efficiency', 'Remaining'],
      datasets: [
        {
          data: [efficiencyLastDay, 100 - efficiencyLastDay],
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
  new Chart(chartRef2.value!, {
    type: 'doughnut',
    data: {
      labels: ['Efficiency', 'Remaining'],
      datasets: [
        {
          data: [efficiencyMonthly, 100 - efficiencyMonthly],
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
  new Chart(chartRef3.value!, {
    type: 'doughnut',
    data: {
      labels: ['Efficiency', 'Remaining'],
      datasets: [
        {
          data: [efficiencyLastQuarter, 100 - efficiencyLastQuarter],
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
  new Chart(chartRef4.value!, {
    type: 'doughnut',
    data: {
      labels: ['Efficiency', 'Remaining'],
      datasets: [
        {
          data: [efficiencyLastYear, 100 - efficiencyLastYear],
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
})
</script>

<template>
  <div>
    <h1>Efficiency Chart</h1>
    <p>This is the efficiency chart component.</p>
    <div class="chart-container">
      <div>
        <h3>Last Day Efficiency</h3>
        <canvas ref="chartRef"></canvas>
        <!-- Fixed ref binding -->
      </div>
      <div>
        <h3>Monthly Efficiency</h3>
        <canvas ref="chartRef2"></canvas>
        <!-- Fixed ref binding -->
      </div>
      <div>
        <h3>Last Quarter Efficiency</h3>
        <canvas ref="chartRef3"></canvas>
        <!-- Fixed ref binding -->
      </div>
      <div>
        <h3>Last Year Efficiency</h3>
        <canvas ref="chartRef4"></canvas>
        <!-- Fixed ref binding -->
      </div>
    </div>
  </div>
</template>

<style lang="css" scoped>
.chart-container {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 20px;
  margin-top: 20px;
}
canvas {
  width: 100%;
  height: 300px;
}
</style>
