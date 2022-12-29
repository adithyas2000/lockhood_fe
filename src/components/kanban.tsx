import axios from "axios";
import React, { useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import { kanbanData } from "../types/kanbanData";
import { isKanbanData } from "../validations/typeChecks";
import KanbanCard from "./kanbanCard";

function KanbanBoard() {

    const [kanbanData, setKanbanData] = useState<Array<Array<kanbanData>>>([[{ title: "", header: "", content: "", id: 1, action: kanbanSendToNext }]]);
    const backend = process.env.REACT_APP_BACKEND_DOMAIN;

    useEffect(() => {
        // Get kanban data from backend
        if (typeof (backend) != 'undefined') {
            getKanbanData();
        } else {
            console.log("Backend not defined. Using sample data...");
            setKanbanData(
                [
                    [
                        {
                            title: "Title1",
                            header: "Header1",
                            content: "This is placeholder content. This will explain the task",
                            id: 1,
                            action: kanbanSendToNext
                        },
                        {
                            title: "Title2",
                            header: "Header2",
                            content: "This is placeholder content. This will explain the task",
                            id: 2,
                            action: kanbanSendToNext
                        },
                        {
                            title: "Title3",
                            header: "Header3",
                            content: "This is placeholder content. This will explain the task",
                            id: 3,
                            action: kanbanSendToNext
                        },
                        {
                            title: "Title4",
                            header: "Header4",
                            content: "This is placeholder content. This will explain the task",
                            id: 4,
                            action: kanbanSendToNext
                        },
                    ],
                    [
                        {
                            title: "Title1",
                            header: "Header1",
                            content: "This is placeholder content. This will explain the task",
                            id: 5,
                            action: kanbanSendToNext
                        },
                        {
                            title: "Title2",
                            header: "Header2",
                            content: "This is placeholder content. This will explain the task",
                            id: 6,
                            action: kanbanSendToNext
                        },
                        {
                            title: "Title3",
                            header: "Header3",
                            content: "This is placeholder content. This will explain the task",
                            id: 7,
                            action: kanbanSendToNext
                        },
                    ],
                    [
                        {
                            title: "Title1",
                            header: "Header1",
                            content: "This is placeholder content. This will explain the task",
                            id: 8,
                            action: kanbanSendToNext
                        },
                        {
                            title: "Title2",
                            header: "Header2",
                            content: "This is placeholder content. This will explain the task",
                            id: 9,
                            action: kanbanSendToNext
                        },
                        {
                            title: "Title3",
                            header: "Header3",
                            content: "This is placeholder content. This will explain the task",
                            id: 10,
                            action: kanbanSendToNext
                        },
                    ],
                    [
                        {
                            title: "Title1",
                            header: "Header1",
                            content: "This is placeholder content. This will explain the task",
                            id: 11,
                            action: kanbanSendToNext
                        },
                        {
                            title: "Title2",
                            header: "Header2",
                            content: "This is placeholder content. This will explain the task",
                            id: 12,
                            action: kanbanSendToNext
                        },
                        {
                            title: "Title3",
                            header: "Header3",
                            content: "This is placeholder content. This will explain the task",
                            id: 13,
                            action: kanbanSendToNext
                        },
                    ],
                    [
                        {
                            title: "Title1",
                            header: "Header1",
                            content: "This is placeholder content. This will explain the task",
                            id: 14,
                            action: kanbanSendToNext
                        },
                        {
                            title: "Title2",
                            header: "Header2",
                            content: "This is placeholder content. This will explain the task",
                            id: 15,
                            action: kanbanSendToNext
                        },
                        {
                            title: "Title3",
                            header: "Header3",
                            content: "This is placeholder content. This will explain the task",
                            id: 16,
                            action: kanbanSendToNext
                        },
                    ]
                ]);
        }

    }, ["const"]);



    return (
        <div className="centerContainer p-5 mb-5 rounded fourth-color first-color-text">

            <Table striped bordered hover className="whitebg">
                <thead>
                    <tr>
                        <th>Backlog</th>
                        {/* remove to do */}
                        <th>To Do</th>
                        <th>In Progress</th>
                        <th>In Testing</th>
                        <th>Done</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td className="kanbanCol">
                            <MakeKanbanCard colNo={1} />
                        </td>

                        <td className="kanbanCol">
                            <MakeKanbanCard colNo={2} />
                        </td>
                        <td className="kanbanCol">
                            <MakeKanbanCard colNo={3} />
                        </td>
                        <td className="kanbanCol">
                            <MakeKanbanCard colNo={4} />
                        </td>
                        <td className="kanbanCol">
                            <MakeKanbanCard colNo={5} />
                        </td>
                    </tr>

                </tbody>
            </Table>
        </div>
    );
    type properties = {
        colNo: number
    };

    function MakeKanbanCard(props: properties) {
        var cardArray: Array<React.ReactElement> = [];

        const kanbanCol = kanbanData[props.colNo - 1];
        if (kanbanCol == undefined) {
            return null;
        }
        kanbanCol.forEach(card => {
            cardArray.push(<tr><td key={card.title}><KanbanCard id={card.id} action={kanbanSendToNext} title={card.title} header={card.header} content={card.content} type={props.colNo} /></td></tr>);
        });
        // for (let n = 1; n < 10; n++) {
        //     cardArray.push(<tr><td key={n}><KanbanCard title={"Title: " + n} header={"Header : " + n} content={"Content: " + n} type={props.colNo} /></td></tr>);
        // }
        return <>{cardArray}</>;
    }

    function kanbanSendToNext(id: number, type: number) {
        console.log("Pressed button:" + id + " with type " + type);
        const changeData={
            'id':id,
            'currentType':type,
            'nextType':type+1
        };
        axios.post(backend + "/",changeData)
        .then(()=>{
            getKanbanData();
        })
    }

    function getKanbanData() {
        if (typeof (backend) != 'undefined') {
            console.log("Sending req to get kanban data");
            axios.get(backend + '/')
                .then(res => {
                    console.log(res.data);
                    if (isKanbanData(res.data)) {
                        setKanbanData(res.data);
                    } else {
                        console.error("Invalid kanban data");
                    }
                })
                .catch(err => console.error(err));
        }
    }
}

export default KanbanBoard;