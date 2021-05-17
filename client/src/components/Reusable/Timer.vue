<template>
  <section>
    <google-chart
      id="pie-chart"
      type="PieChart"
      :options="{
        legend: 'none',
        responsive: true,
        backgroundColor: '#ADD8E6',
        pieSliceText: 'none',
        slices: {
          0: { color: 'white' },
          1: { color: '#3d94f6' },
          2: { color: 'blue' },
        },
      }"
      :data="times"
    />
  </section>
</template>

<script>
import { eventBus } from "@/main.js";
import { GChart } from "vue-google-charts";
export default {
  name: "timer",
  props: ["times", "stopTimer"],
  data() {
    return {};
  },

  mounted() {
    this.timer();

    eventBus.$on("start-timer-button", () => {
      console.log("timer started");
      this.timer();
    });

    eventBus.$on("stop-timer-button", () => {
      console.log("timer stopped");
      this.timer(true);
    });
  },
  methods: {
    timer() {
      let changeTimer = setInterval(() => {
        this.newTime = [...this.times];

        if (this.stopTimer == true) {
          console.log("stopped timer");
          clearInterval(changeTimer);
          console.log("timer stopped");
          eventBus.$emit("timer-stopped", this.newTime);
        } else if (this.newTime[1][1] > 30) {
          clearInterval(changeTimer);
          eventBus.$emit("timer-finished");
        } else {
          eventBus.$emit("change-timer", this.newTime);
          this.newTime[2][1] -= 0.1;
          this.newTime[1][1] += 0.1;
        }
      }, 100);
    },
  },
  components: {
    "google-chart": GChart,
  },
};
</script>

<style lang="css" scoped>
section {
  display: grid;
  justify-content: center;
}

#pie-chart {
  width: 400px;
  height: 400px;
  padding: 0;
  margin: 0;
}
</style>
