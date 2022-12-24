import { Card } from "react-bootstrap";

 type properties={
    header:string,
    title:string,
    content:string
    type:number
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

function KanbanCard(props:properties){
    return(
        <Card
          bg={props.type>0&&props.type<8?colourmap[props.type-1]:"danger"}
          key="Drimary"
          text={props.type===7?"white":"dark"}
          className="mb-2"
        >
          <Card.Header>{props.header}HEADER</Card.Header>
          <Card.Body>
            <Card.Title>{props.type>0&&props.type<8?colourmap[props.type-1]:"danger"} </Card.Title>
            <Card.Text>
                {props.content}
              Some quick example text to build on the card title and make up the
              bulk of the card's content.
            </Card.Text>
          </Card.Body>
        </Card>
    );
}

export default KanbanCard;