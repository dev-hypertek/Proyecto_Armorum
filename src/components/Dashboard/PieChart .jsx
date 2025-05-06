// PieChart.js
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

// Register required elements
ChartJS.register(ArcElement, Tooltip, Legend);

const PieChart = () => {
     const data = {
          // labels: ['Dataset A', 'Dataset B', 'Dataset C'],
          datasets: [
               {
                    data: [30, 50, 20], // 3 datasets (can be values in percentages or numbers)
                    backgroundColor: ['#fbad4c', '#1D62F0', '#ff646d'],
                    borderWidth: 1,
               },
          ],
     };

     const options = {
          responsive: true,
          plugins: {
               legend: {
                    position: 'bottom',
               },
          },
     };

     return (
          <div className="w-[200px] mx-auto">
               <Pie data={data} options={options} />
          </div>
     );
};

export default PieChart;
