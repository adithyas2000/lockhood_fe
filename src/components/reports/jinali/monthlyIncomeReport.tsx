import axios from "axios";
import React, { LegacyRef } from "react";
import { useEffect, useRef, useState } from "react";
import { Form, Table } from "react-bootstrap";
import ReactToPrint from "react-to-print";
import { ResponseStatus } from "../../../enums/enums";
import { BackendAddress, RequestOptions } from "../../../functions/HTTPReqData";
import { incomeSpread } from "../../../types/incomeSpread";
import { monthlyIncomeType } from "../../../types/monthlyIncomeData";

function MonthlyIncomeReport() {
    const componentRef = useRef<HTMLDivElement>(null);
    const backend = BackendAddress;
    const options = RequestOptions;

    const [date, setDate] = useState("");
    const [year, setYear] = useState("");
    const [month, setMonth] = useState("");

    const [reportData, setReportData] = useState<monthlyIncomeType>();

    const [totalIncome, setTotalIncome] = useState(0);
    const [dateFrom, setFrom] = useState("");
    const [dateTo, setTo] = useState("");
    const [incomeSpread, setSpread] = useState<Array<incomeSpread>>([]);

    const [spreadElements, setSpreadElements] = useState<Array<JSX.Element>>([]);

    useEffect(() => {
        console.log(date);
        setYear(date.split('-')[0]);
        setMonth(date.split('-')[1]);
    }, [date]);

    useEffect(() => {
        if (reportData) {
            setTotalIncome(reportData.income);
            setFrom(reportData.dateFrom);
            setTo(reportData.dateTo);
            setSpread(reportData.incomeSpread);
        }
    }, [reportData]);

    useEffect(() => {
        if (incomeSpread.length > 0) {
            var tempArray: Array<JSX.Element> = [];
            incomeSpread.forEach(sale => {
                tempArray.push(<tr key={sale.saleid}><td>{sale.saleid}</td><td>{sale.product.productName}</td><td>{sale.totalSoldQty}</td><td>{sale.pricePerUnit}</td></tr>)
            });
            setSpreadElements(tempArray);
        }

    }, [incomeSpread])

    function generateReport() {
        if (month && year) {
            const data = {
                'year': year,
                'month': month
            }
            axios.post(backend + '/api/v1/sale/report/income', data, options)
                .then(res => {
                    if (res.data.status === ResponseStatus.SUCCESS) {
                        const tempData: monthlyIncomeType = res.data.data;
                        setReportData(tempData);
                    } else {
                        alert(res.data.status);
                    }
                })
                .catch(err => {
                    alert(err.response.data.message);
                })
        }
    }

    const Report = React.forwardRef((props, ref) => {
        return (
            <div ref={ref as LegacyRef<HTMLDivElement> | null}>
                <Table striped hover className="whitebg">
                    <thead>
                        <tr>
                            <td>Total Income</td>
                            <td>From</td>
                            <td>To</td>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>{totalIncome}</td>
                            <td>{dateFrom}</td>
                            <td>{dateTo}</td>
                        </tr>
                    </tbody>
                </Table>
                <br />
                <Table striped hover className="whitebg">
                    <thead>
                        <tr>
                            <td>Sale ID</td>
                            <td>Product name</td>
                            <td>Total Sold Quantity</td>
                            <td>Price per unit</td>
                        </tr>
                    </thead>
                    <tbody>
                        {spreadElements}
                    </tbody>
                </Table>
            </div>
        )
    });

    return (
        <div className=" p-5 mb-5 rounded fourth-color first-color-text">
            <Form>
                <Form.Group>
                    <Form.Label>Year and month</Form.Label>
                    <Form.Control type="date" onChange={e => { setDate(e.target.value) }} />
                </Form.Group>

                <Form.Group>

                    <Form.Control className="btn btn-primary" type="submit" value="Generate Report" onClick={e => { e.preventDefault(); generateReport() }} />
                </Form.Group>
            </Form>
            <br/><br/>
            <Report ref={componentRef} />
            <ReactToPrint documentTitle="Monthly income Report" trigger={() => <button className="btn btn-primary">Print report</button>} content={() => componentRef.current} />
        </div>
    )
}

export default MonthlyIncomeReport;