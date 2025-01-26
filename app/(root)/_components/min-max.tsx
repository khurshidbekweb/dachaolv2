import { useState } from "react";
import { Slider } from "@/components/ui/slider";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

// Chart.js registratsiya
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export default function SliderWithChart() {
  const [value, setValue] = useState(12000);

  // Diagramma ma'lumotlari
  const data = {
    labels: ["Value"],
    datasets: [
      {
        label: "Selected Value",
        data: [value],
        backgroundColor: "rgba(75, 192, 192, 0.6)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 800,
      },
    ],
  };

  // Diagramma opsiyalari
  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        max: 12000,
      },
    },
  };

  return (
    <div className="!w-[250px] flex flex-col items-center gap-6 p-4 ">      
      <div className="">
        <Bar  data={data} options={options} />
      </div>
      <div className="flex justify-between text-sm w-[250px]">
        <span> 800</span>
        <span> {value}</span>
      </div>
      <Slider
        defaultValue={[value]}
        min={800}
        max={12000}
        step={1}
        onValueChange={(val) => setValue(val[0])}
        className="w-[250px]"
      />      
    </div>
  );
}
