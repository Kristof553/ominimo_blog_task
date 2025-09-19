import {Button, Form, FormGroup, Input, Label, Modal, ModalBody, ModalFooter, ModalHeader} from "reactstrap";
import {useState} from "react";
import axios from "axios";
import Cookies from "js-cookie";

export default function NewPostModal({toggleNewPostModal, toggle}) {
    const [postTitle, setPostTitle] = useState("")
    const [postContent, setPostContent] = useState("")


    const addPost = async () => {
        try {
            const token = Cookies.get("XSRF-TOKEN");
            const res = await axios.post(
                "http://localhost:8000/api/posts/store",
                {
                    title: postTitle,
                    postContent: postTitle,
                },
                {
                    withCredentials: true,
                    headers: {
                        "X-XSRF-TOKEN": token,
                    },
                }
            );
            console.log("Post created:", res.data);
        } catch (err) {
            console.error("Create post error:", err.response?.data || err.message);
            throw err;
        }
    }

    return (
        <div>
            <Modal isOpen={toggleNewPostModal} toggle={toggle}>
                <ModalHeader toggle={toggle}>Új bejegyzés</ModalHeader>
                <ModalBody>
                    <Form className="p-3" onSubmit={addPost}>
                        <FormGroup>
                            <Label>
                                Bejegyzés címe:
                            </Label>
                            <Input
                                type="text"
                                onChange={(e) => setPostTitle(e.target.value)}
                                required
                            />
                        </FormGroup>
                        <FormGroup>
                            <Label>
                                Bejegyzés tartalma:
                            </Label>
                            <Input
                                type="text"
                                onChange={(e) => setPostContent(e.target.value)}
                                required
                            />
                        </FormGroup>
                        <ModalFooter>
                            <Button color="primary" onClick={toggle} type="submit">
                                Létrehozás
                            </Button>{' '}
                            <Button color="secondary" onClick={toggle}>
                                Mégse
                            </Button>
                        </ModalFooter>
                    </Form>
                </ModalBody>
            </Modal>
        </div>
    )
}