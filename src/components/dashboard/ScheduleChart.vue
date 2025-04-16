<script setup lang="js">
import { Bar } from 'vue-chartjs'
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend
} from 'chart.js'

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend)

// Prepare task data
const rawData = [
  {
    id: 2,
    name: 'Season Apples',
    start_date: '2022-03-07 15:00:00.000',
    end_date: '2022-03-10 15:00:00.000'
  },
  {
    id: 1,
    name: 'Cut Apples',
    start_date: '2022-03-05 15:00:00.000',
    end_date: '2022-03-07 15:00:00.000'
  },
  {
    id: 3,
    name: 'Bake Apples',
    start_date: '2022-03-11 15:00:00.000',
    end_date: '2022-03-15 15:00:00.000'
  }
]

// Sort tasks
rawData.sort((a, b) => new Date(a.start_date).getTime() - new Date(b.start_date).getTime())

// Convert to timestamps and durations
const chartData = rawData.map(task => {
  const start = new Date(task.start_date).getTime()
  const end = new Date(task.end_date).getTime()
  const duration = end - start
  return {
    x: start,
    y: task.name,
    duration
  }
})

// Dataset for Chart.js
const data = {
  labels: rawData.map(task => task.name),
  datasets: [{
    label: 'Make Apple Recipe',
    data: chartData.map(d => ({
      x:  [d.x, d.x + d.duration],
      y: d.y
    })),
    backgroundColor: 'rgba(255, 99, 132, 0.5)',
    borderColor: 'rgba(255, 99, 132, 1)',
    borderWidth: 0.1,
    parsing: {
      xAxisKey: 'x',
      yAxisKey: 'y'
    }
  }]
}

// Get min and max for x axis
const xMin = Math.min(...chartData.map(d => d.x))
const xMax = Math.max(...chartData.map(d => d.x + d.duration))

// Helper to format date
function formatDate(ms) {
  const date = new Date(ms)
  return date.toISOString().split('T')[0]
}

// Chart options
const options = {
  indexAxis: 'y',
  responsive: true,
  plugins: {
    tooltip: {
      callbacks: {
        label: (context) => {
          const { raw } = context
          return `${raw.y}: ${formatDate(raw.x)} → ${formatDate(raw.x2)}`
        }
      }
    }
  },
  scales: {
    x: {
      type: 'linear',
      min: xMin,
      max: xMax,
      ticks: {
        callback: function(val) {
          return formatDate(val)
        }
      },
      title: {
        display: true,
        text: 'Date'
      }
    },
    y: {
      title: {
        display: true,
        text: 'Task'
      }
    }
  }
}
</script>

<template>
  <div>
    <h2>Schedule Gantt Chart (No Date Adapter)</h2>
    <div class="chart-container">
      <Bar :data="data" :options="options" />
    </div>
  </div>
</template>

<style scoped>
.chart-container {
  width: 100%;
  height: 300px;
}
</style>
