import {Button, Card, CardBody, CardText, CardTitle, List} from "reactstrap";
import {useState} from "react";
export default function Post({title, content, comments}){

    const [toggleComments, setToggleComments] = useState(false)

    const renderComments = () => {
        if (toggleComments){
            return (
                <Card className="my-2 shadow p-3 mb-3 bg-light rounded w-50">
                    <CardBody>
                        <List>
                            {comments.map((comment) => (
                                <li key={comment["id"]}>{comment["comment"]}</li>
                            ))}
                        </List>
                    </CardBody>
                </Card>
            )
        }
        return (
            <></>
        )
    }

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
                {renderComments()}
            </Card>
        </div>
    )
}