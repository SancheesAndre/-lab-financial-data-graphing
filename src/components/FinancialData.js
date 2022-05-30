import axios from "axios"
import { useEffect, useState } from "react"
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { Line } from "react-chartjs-2"

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
)

const FinancialData = () => {
    const [data, setData] = useState(null)
    const [fromDate, setFromDate] = useState('')
    const [toDate, setToDate] = useState('')
    const [currency, setCurrency] = useState('USD')


    useEffect(() => {
        let apiURL = `http://api.coindesk.com/v1/bpi/historical/close.json?currency=${currency}`
        if (fromDate && toDate) {
            apiURL = `${apiURL}&start=${fromDate}&end=${toDate}`
        }
        axios.get(apiURL)
            .then(response => {
                const labels = Object.keys(response.data.bpi)
                const values = labels.map(label => {
                    return response.data.bpi[label]
                })
                const data = {
                    labels,
                    datasets: [
                        {
                            label: 'Dataset 1',
                            data: values,
                            borderColor: 'rgb(255, 99, 132)',
                            backgroundColor: 'rgba(255, 99, 132, 0.5)',
                        }
                    ]
                };
                setData(data)
            })
    }, [fromDate, toDate, currency])

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            },
            title: {
                display: true,
                text: 'Bitcoin Prices',
            },
        },
    };

    return (
        <div>
            <input type="date"
                value={fromDate}
                onChange={e => {
                    setFromDate(e.target.value)
                }}
            />
            <input type="date"
                value={toDate}
                onChange={e => {
                    setToDate(e.target.value)
                }}
            />

            <select id="currency" value={currency} onChange={e => {
                setCurrency(e.target.value)
            }}>
                <option value="USD">USD</option>
                <option value="EUR">EUR</option>
                <option value="BRL">BRL</option>
            </select>

            {data && <Line options={options} data={data} />}

        </div>
    )
}

export default FinancialData