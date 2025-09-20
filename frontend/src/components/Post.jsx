import {Button, Card, CardBody, CardText, CardTitle, List,} from "reactstrap";
import { FaRegTrashAlt ,FaComment, FaEdit} from "react-icons/fa";
import withReactContent from 'sweetalert2-react-content'
import Swal from 'sweetalert2'
import {useState} from "react";
import Cookies from "js-cookie";
import axios from "axios";
export default function Post({title, content, comments, id}){

    const [toggleComments, setToggleComments] = useState(false)
    const MySwal = withReactContent(Swal)

    const deletePost = async () => {
        const token = Cookies.get("XSRF-TOKEN");
        try {
            await axios.delete(
                `http://localhost:8000/api/posts/${id}`,
                {
                    withCredentials: true,
                    headers: {
                        "X-XSRF-TOKEN": token,
                    }
                },
            );
            window.location.reload()
        } catch (error) {
            if (error.response && error.response.status === 403) {
                await MySwal.fire({
                    title: <p>Ezt a posztot nem tudod törölni mert nem te hoztad létre</p>,
                });
            }
        }
    }

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
                    <CardTitle tag="h5" className="d-flex">
                        {title}
                    </CardTitle>
                    <CardText className="d-flex">
                        {content}
                    </CardText>
                    <FaComment className="cursor" size={24} onClick={() => {setToggleComments(!toggleComments)}}></FaComment>
                    {' '}
                    <FaRegTrashAlt className="cursor" size={24} onClick={deletePost}/>
                    {' '}
                    <FaEdit className="cursor" size={24}/>
                </CardBody>
                {renderComments()}
            </Card>
        </div>
    )
}