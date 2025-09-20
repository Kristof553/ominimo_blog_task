import {Button, Form, FormGroup, Input, Label, Modal, ModalBody, ModalFooter, ModalHeader} from "reactstrap";
import {useState} from "react";
import axios from "axios";
import Cookies from "js-cookie";

export default function EditPostModal({toggleEditPostModal, toggle, postTitle, postContent, id}) {
    const [editedPostTitle, setEditedPostTitle] = useState(postTitle)
    const [editedPostContent, setEditedPostContent] = useState(postContent)


    const editPost = async () => {
        try {
            const token = Cookies.get("XSRF-TOKEN");
            await axios.put(
                `http://localhost:8000/api/posts/${id}`,
                {
                    title: editedPostTitle,
                    content: editedPostContent,
                },
                {
                    withCredentials: true,
                    headers: {
                        "X-XSRF-TOKEN": token,
                    },
                }
            );
        } catch (err) {
            console.error("Updated post error:", err.response?.data || err.message);
            throw err;
        }
    }

    return (
        <div>
            <Modal isOpen={toggleEditPostModal} toggle={toggle}>
                <ModalHeader toggle={toggle}>Bejegyzés szerkeztése</ModalHeader>
                <ModalBody>
                    <Form className="p-3" onSubmit={editPost}>
                        <FormGroup>
                            <Label>
                                Bejegyzés címe:
                            </Label>
                            <Input
                                type="text"
                                onChange={(e) => setEditedPostTitle(e.target.value)}
                                required
                                value={editedPostTitle}
                            />
                        </FormGroup>
                        <FormGroup>
                            <Label>
                                Bejegyzés tartalma:
                            </Label>
                            <Input
                                type="text"
                                onChange={(e) => setEditedPostContent(e.target.value)}
                                required
                                value={editedPostContent}
                            />
                        </FormGroup>
                        <ModalFooter>
                            <Button color="primary" onClick={toggle} type="submit">
                                szerkeztés
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