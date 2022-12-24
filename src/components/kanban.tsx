import React, { useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import KanbanCard from "./kanbanCard";

function KanbanBoard() {
    type kanbandata = {
        title: string,
        header: string,
        content: string
    };

    const [kanbanData, setKanbanData] = useState<Array<Array<kanbandata>>>();


    useEffect(() => {
        setKanbanData(
            [
                [
                    {
                        title: "Title1",
                        header: "Header1",
                        content: "Content1"
                    },
                    {
                        title: "Title2",
                        header: "Header2",
                        content: "Content2"
                    },
                    {
                        title: "Title3",
                        header: "Header3",
                        content: "Content3"
                    },
                ],
                [
                    {
                        title: "Title1",
                        header: "Header1",
                        content: "Content1"
                    },
                    {
                        title: "Title2",
                        header: "Header2",
                        content: "Content2"
                    },
                    {
                        title: "Title3",
                        header: "Header3",
                        content: "Content3"
                    },
                ],
                [
                    {
                        title: "Title1",
                        header: "Header1",
                        content: "Content1"
                    },
                    {
                        title: "Title2",
                        header: "Header2",
                        content: "Content2"
                    },
                    {
                        title: "Title3",
                        header: "Header3",
                        content: "Content3"
                    },
                ],
                [
                    {
                        title: "Title1",
                        header: "Header1",
                        content: "Content1"
                    },
                    {
                        title: "Title2",
                        header: "Header2",
                        content: "Content2"
                    },
                    {
                        title: "Title3",
                        header: "Header3",
                        content: "Content3"
                    },
                ],
                [
                    {
                        title: "Title1",
                        header: "Header1",
                        content: "Content1"
                    },
                    {
                        title: "Title2",
                        header: "Header2",
                        content: "Content2"
                    },
                    {
                        title: "Title3",
                        header: "Header3",
                        content: "Content3"
                    },
                ]
            ]);
    },["const"]);



    return (
        <div className="centerContainer p-5 mb-5 rounded fourth-color first-color-text">

            <Table striped bordered hover className="whitebg">
                <thead>
                    <tr>
                        <th>Backlog</th>
                        <th>To Do</th>
                        <th>In Progress</th>
                        <th>In Testing</th>
                        <th>Done</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td className="kanbanCol">
                            <MakeKanbanCard />
                        </td>

                        <td className="kanbanCol">
                            <MakeKanbanCard />
                        </td>
                        <td className="kanbanCol">
                            <MakeKanbanCard />
                        </td>
                        <td className="kanbanCol">
                            <MakeKanbanCard />
                        </td>
                        <td className="kanbanCol">
                            <MakeKanbanCard />
                        </td>
                    </tr>

                </tbody>
            </Table>
        </div>
    );

    function MakeKanbanCard() {
        var cardArray: Array<React.ReactElement> = [];
        for (let n = 1; n < 10; n++) {
            cardArray.push(<tr><td key={n}><KanbanCard title={"Title: " + n} header={"Header : " + n} content={"Content: " + n} type={n} /></td></tr>);
        }
        return <>{cardArray}</>;
    }
}

export default KanbanBoard;