import {FaRegTrashAlt} from "react-icons/fa";
import axios from "axios";
import withReactContent from 'sweetalert2-react-content'
import Swal from 'sweetalert2'

export default function Comment({comment, setLocalComments, localComments, token}) {
    const MySwal = withReactContent(Swal)

    const deleteComment = async () => {
        try {
            await axios.delete(
                `http://localhost:8000/api/comments/${comment["id"]}`,
                {
                    withCredentials: true,
                    headers: {
                        "X-XSRF-TOKEN": token,
                    },
                }
            );
            setLocalComments(localComments.filter(c => c.id !== comment["id"]));
        }catch (error) {
            if (error.response && error.response.status === 403) {
                await MySwal.fire({
                    title: <p>Ezt a kommentet nem tudod törölni mert a kommentet vagy a posztot nem te hoztad létre.</p>,
                });
            }
        }
    }

    return(
        <div className="d-flex justify-content-between p-1">
            <li key={comment["id"]}>{comment["comment"]}</li>
            <FaRegTrashAlt className="cursor" size={10} onClick={deleteComment}/>
        </div>
    )
}