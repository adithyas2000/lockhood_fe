import { useEffect, useState } from "react";
import { Cell, Pie, PieChart, Sector } from "recharts";
import { chartData } from "../../types/chartData";
var COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042","#c21614","#af4d7c","#a75fd4","#219576","#612e9b","#f59beb"];

type props = {
    data: Array<chartData>
}

export function MakePieChart(props: props) {
    // const [COLORS,setColors]=useState<Array<string>>([]);



    return (
        <div style={{ alignItems: 'center', display: 'inline-flex' }}>
            <div className="chartContainer">
                <PieChart width={400} height={400}>
                    <Pie
                        data={props.data}
                        // cx={120}
                        // cy={200}
                        // label={<p>Custom Label</p>}
                        // innerRadius={10}
                        outerRadius={100}
                        fill="#8884d8"
                        // paddingAngle={1}
                        dataKey="value"

                        label
                    >
                        {/* <Tooltip /> */}
                        {props.data.map((entry, index) => (
                            // console.log(entry);
                            <Cell key={`cell-${index}`} fill={COLORS[index]} />
                        ))}

                    </Pie>


                </PieChart>
            </div>
            <div className="mapContainer">
                {props.data.map((entry, index) => (
                    <div key={index} style={{ display: 'flex', marginLeft: '20px', paddingBottom: '20px' }}><div style={{ width: '23px', marginRight: '5px', backgroundColor: COLORS[index] }}></div><div>{entry.name}</div></div>
                ))}
            </div>
        </div>
    )
}