import { useState } from "react";

export const useChart = () =>{ 

    const [viewChart,setViewChart] = useState(false);
    const [options, setOptions] = useState(
        {

            chart: {
                type : 'column',
                // scrollablePlotArea: {
                //   minHeight: minHeight,
                //   scrollPositionX: 1
                // }
              },

            title: {
                text: 'Detalle de Abonos e Intereses'
            },

            yAxis: {
                title: {
                    text: 'Monto'
                }
            },
            xAxis: {
                categories:[],
                // categories:['2022-05-30T03:14:58.739Z', '2022-05-28T21:49:49.920Z', '2022-05-28T15:33:07.861Z', '2022-05-25T03:20:03.768Z', '2022-05-24T03:58:27.173Z', '2022-05-21T23:39:50.000Z'],
                accessibility: {
                    rangeDescription: 'Range: 2010 to 2017'
                }
            },
            legend: {
                layout: 'vertical',
                align: 'right',
                verticalAlign: 'middle'
            },
            plotOptions: {
                series: {
                    label: {
                        connectorAllowed: false
                    },
                    // pointStart: '2022-05-30T03:14:58.739Z'
                }
            },
            series:[],
            // series: [
                // {name:'INTERES',data:[20000, 5000, 15000, 30000, 20000, 0]}
            // ],
            responsive: {
                rules: [{
                    condition: {
                        maxWidth: 500
                    },
                    chartOptions: {
                        legend: {
                            layout: 'horizontal',
                            align: 'center',
                            verticalAlign: 'bottom'
                        }
                    }
                }]
            }
        });

    const setSeriesAndCategories = (serie,categories) => {
        console.log("se van a setear las opciones");
        setOptions({...options, series:serie,xAxis:{categories:categories}});
    }

    return {
        // series, 
        // setSeries,
        // categories,
        // setCategories,
        setSeriesAndCategories,
        options,
        setOptions,
        viewChart,
        setViewChart
    }
}

// [{
//     name: 'Interes',
//     data: [43934, 52503, 57177, 69658, 97031, 119931, 137133, 154175]
// }, {
//     name: 'Abono',
//     data: [24916, 24064, 29742, 29851, 32490, 30282, 38121, 40434]
// }, {
//     name: 'Deuda',
//     data: [11744, 17722, 16005, 19771, 20185, 24377, 32147, 39387]
// }]