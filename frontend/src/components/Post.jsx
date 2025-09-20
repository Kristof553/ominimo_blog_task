import {Button, Card, CardBody, CardText, CardTitle, Input, List,} from "reactstrap";
import { FaRegTrashAlt ,FaComment, FaEdit} from "react-icons/fa";
import withReactContent from 'sweetalert2-react-content'
import Swal from 'sweetalert2'
import {useState} from "react";
import Cookies from "js-cookie";
import axios from "axios";
import EditPostModal from "./EditPostModal.jsx";
export default function Post({title, content, comments, id, user_id}){

    const [toggleComments, setToggleComments] = useState(false)
    const [toggleEditPostModal, setToggleEditPostModal] = useState(false)
    const [newComment,setNewComment ] = useState('')
    const [localComments, setLocalComments] = useState(comments);
    const MySwal = withReactContent(Swal)
    const token = Cookies.get("XSRF-TOKEN");

    const toggle = () => {
        setToggleEditPostModal(!toggleEditPostModal)
    }
    const deletePost = async () => {
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

    const checkUser = async () => {
        try {
            const res = await axios.get(
                `http://localhost:8000/api/user`,
                {
                    withCredentials: true,
                    headers: {
                        "X-XSRF-TOKEN": token,
                    }
                },
            );
            if (res.data['id'] === user_id) {
                setToggleEditPostModal(!toggleEditPostModal)
            }else {
                await MySwal.fire({
                    title: <p>Ezt a posztot nem tudod szerkezteni mert nem te hoztad létre</p>,
                });
            }
        } catch (error) {
            console.log(error)
        }
    }

    const addComment = async () => {
        try {
            const res = await axios.post(
                `http://localhost:8000/api/posts/${id}/comments`,
                {
                    comment: newComment,
                },
                {
                    withCredentials: true,
                    headers: {
                        "X-XSRF-TOKEN": token,
                    },
                }
            );
            setLocalComments([...localComments, res.data.comment]);
            setNewComment('');
        }catch (error) {
            console.log(error)
        }
    }

    const renderComments = () => {
        if (toggleComments){
            return (
                <Card className="my-2  p-3 mb-3 bg-light w-50">
                    <CardBody>
                        <List>
                            {localComments.map((comment) => (
                                <li key={comment["id"]}>{comment.comment}</li>
                            ))}
                        </List>
                    </CardBody>
                    <div className="d-flex">
                        <Input type="text" onChange={(e) => {setNewComment(e.target.value)}}/>
                        <Button color="primary" onClick={addComment}>
                            Küldés
                        </Button>
                    </div>

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
                    <FaEdit className="cursor" size={24} onClick={checkUser}/>
                </CardBody>
                {renderComments()}
            </Card>
            <EditPostModal
                toggleEditPostModal={toggleEditPostModal}
                toggle={toggle}
                postTitle={title}
                postContent={content}
                id={id}
            />
        </div>
    )
}