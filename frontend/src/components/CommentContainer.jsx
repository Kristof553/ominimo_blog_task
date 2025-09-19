import {Button, Card, CardBody, CardText, CardTitle} from "reactstrap";

export default function CommentContainer({toggleComments}){

    if (toggleComments){
        return(
            <div>
                <Card className="my-2 shadow p-3 mb-3 bg-light rounded">
                    <CardBody>
                        <CardTitle tag="h5">
                            {}
                        </CardTitle>
                        <CardText className="d-flex">
                            {}
                        </CardText>
                    </CardBody>
                </Card>
            </div>
        )
    }

}