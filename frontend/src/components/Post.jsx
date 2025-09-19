import {Button, Card, CardBody, CardText, CardTitle} from "reactstrap";
import {useState} from "react";
export default function Post({title, content, comments}){

    const [toggleComments, setToggleComments] = useState(false)

    return(
        <div>
            <Card className="my-2 shadow p-3 mb-3 bg-light rounded">
                <CardBody>
                    <CardTitle tag="h5">
                        {title}
                    </CardTitle>
                    <CardText className="d-flex">
                        {content}
                    </CardText>
                    <Button color="warning"
                            onClick={() => {
                                setToggleComments(!toggleComments)
                            }}
                    >
                        Kommentek
                    </Button>
                </CardBody>
            </Card>
        </div>
    )
}