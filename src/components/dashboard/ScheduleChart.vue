<script setup lang="ts">
import { onMounted, ref } from 'vue'
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
  BarController,
} from 'chart.js'

// Register chart components with Chart.js
ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend, BarController)

// Prepare task data
const rawData = [
  {
    id: 1,
    name: 'next-gcp-ecommerce',
    description: 'making next-gcp-ecommerce',
    start_date: '2024-11-18 20:00:00.000',
    end_date: '2024-12-24 00:00:00.000',
    assignee: 'Alice',
    status: 'Completed',
    priority: 'High',
    category: 'Preparation',
    dependencies: [],
    estimated_hours: 6,
    actual_hours: 5,
    progress: 100,
    location: 'Kitchen A',
    resources: ['Knife', 'Cutting Board'],
    tags: ['fruit', 'preparation', 'urgent'],
    created_at: '2024-12-28T10:00:00.000Z',
    updated_at: '2025-03-07T17:00:00.000Z',
    milestone: false,
    cost_estimate: 50,
    cost_actual: 45,
  },
  {
    id: 2,
    name: 'browser-extensions-manager-ui',
    description: 'making browser-extensions-manager-ui',
    start_date: '2025-04-03 12:00:00.000',
    end_date: '2025-04-09 20:00:00.000',
    assignee: 'Bob',
    status: 'In Progress',
    priority: 'Medium',
    category: 'Cooking',
    dependencies: [1],
    estimated_hours: 8,
    actual_hours: 4,
    progress: 50,
    location: 'Kitchen B',
    resources: ['Mixing Bowl', 'Spices', 'Spoon'],
    tags: ['fruit', 'seasoning'],
    created_at: '2022-03-01T09:00:00.000Z',
    updated_at: '2022-03-09T14:00:00.000Z',
    milestone: false,
    cost_estimate: 30,
    cost_actual: 20,
  },
  {
    id: 3,
    name: 'project management',
    description: 'making project management tool',
    start_date: '2025-04-11 00:00:00.000',
    end_date: '2025-05-30 18:00:00.000',
    assignee: 'Charlie',
    status: 'Pending',
    priority: 'High',
    category: 'Cooking',
    dependencies: [2],
    estimated_hours: 10,
    actual_hours: 0,
    progress: 0,
    location: 'Oven Room',
    resources: ['Oven', 'Baking Tray'],
    tags: ['fruit', 'baking'],
    created_at: '2022-03-02T08:30:00.000Z',
    updated_at: '2022-03-02T08:30:00.000Z',
    milestone: true,
    cost_estimate: 100,
    cost_actual: 0,
  },
]

// Sort tasks by start date
rawData.sort((a, b) => new Date(a.start_date).getTime() - new Date(b.start_date).getTime())

// Convert to timestamps and durations for chart data
const chartData = rawData.map((task) => {
  const start = new Date(task.start_date).getTime()
  const end = new Date(task.end_date).getTime()
  const duration = end - start
  return {
    x: start,
    y: task.name,
    duration,
  }
})

// Dataset for Chart.js
const chartJsData = {
  labels: rawData.map((task) => task.name),
  datasets: [
    {
      label: 'Schedules',
      data: chartData.map((d) => ({
        x: [d.x, d.x + d.duration],
        y: d.y,
      })),
      backgroundColor: 'rgba(255, 99, 132, 0.5)',
      borderColor: 'rgba(255, 99, 132, 1)',
      borderWidth: 0.1,
      parsing: {
        xAxisKey: 'x',
        yAxisKey: 'y',
      },
    },
  ],
}

// Get min and max for x axis
const xMin = Math.min(...chartData.map((d) => d.x)) - 2000000000
const xMax = Math.max(...chartData.map((d) => d.x + d.duration)) + 2000000000

// Helper function to format date
function formatDate(ms: number) {
  const date = new Date(ms)
  return date.toISOString().split('T')[0]
}

// Chart.js options
const options = {
  indexAxis: 'y',
  responsive: true,
  plugins: {
    tooltip: {
      callbacks: {
        label: (context: any) => {
          const { raw } = context
          return `${raw.y}: ${formatDate(raw.x)} → ${formatDate(raw.x2)}`
        },
      },
    },
  },
  scales: {
    x: {
      type: 'linear',
      min: xMin,
      max: xMax,
      ticks: {
        callback: function (val: number) {
          return formatDate(val)
        },
      },
      title: {
        display: false,
        text: 'Date',
      },
    },
    y: {
      title: {
        display: false,
        text: 'Task',
      },
    },
  },
}

// Chart.js ref for rendering
const chartRef = ref<HTMLCanvasElement | null>(null)

// Render chart once component is mounted
onMounted(() => {
  if (chartRef.value) {
    new ChartJS(chartRef.value, {
      type: 'bar',
      data: chartJsData,
      // @ts-ignore
      options: options,
    })
  }
})
</script>

<template>
  <div>
    <h2>Schedule Gantt Chart (No Date Adapter)</h2>
    <div class="chart-container">
      <!-- Chart will be rendered here -->
      <canvas id="schedule-chart" ref="chartRef"></canvas>
    </div>
  </div>
</template>

<style scoped>
#schedule-chart {
  width: 500px !important;
  height: 300px !important;
}
</style>
