import { Cell, Legend, Pie, PieChart, RadarChart } from "recharts";

export const SelectPropertiesSection = () => {

    const data = [
        { name: 'Group A', value: 400 },
        { name: 'Group B', value: 300 },
        { name: 'Group C', value: 300 },
        { name: 'Group D', value: 200 },
      ];
      const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];
  return (
    <div className="shadow-blur-10 w-96 min-h-full rounded-md">
      <h5 className=" h5 text-primary dark:text-secondary">Properties</h5>
      <div className="h-full">
      <PieChart  width={150} height={200}    >
        <Pie
          data={data}
          fillRule="evenodd"
          className="w-full h-full"
          innerRadius={50}
          outerRadius={70}
          paddingAngle={5}
          dataKey="value"
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Legend  >

        </Legend>
        </PieChart>
      </div>
    </div>
  );
};
