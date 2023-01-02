import { Button, Card } from "react-bootstrap";

 type properties={
    id:string,
    header:string,
    title:string,
    content:string
    type:number
    action:Function
}

const colourmap=[
    'primary',
    'secondary',
    'success',
    'warning',
    'info',
    'light',
    'dark',
  ];

  const nextMap=[
    'Mark \'In Progress\'',
    'Mark \'In Testing\'',
    'Mark \'Done\'',
    'Remove Task',
    'Mark \'Undefined\'',
    'Mark \'Undefined\'',

  ]

function KanbanCard(props:properties){
    return(
        <Card
          bg={props.type>0 && props.type<5 ? colourmap[props.type-1] : "danger"}
          key={props.id}
          text={props.type===7 ? "white" : "dark"}
          className="mb-2"
        >
          <Card.Header>{props.header+" - "+props.id}</Card.Header>
          <Card.Body>
            <Card.Title>{props.type>0&&props.type<8?props.title:"Out of range"} </Card.Title>
            <Card.Text>
                {props.content}
            </Card.Text>
            <Button variant="dark" onClick={(e)=>{e.preventDefault();props.action(props.id,props.type);}}>{nextMap[props.type-1]}</Button>
          </Card.Body>
        </Card>
    );
}

export default KanbanCard;