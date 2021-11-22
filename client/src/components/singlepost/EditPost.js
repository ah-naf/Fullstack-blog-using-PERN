import { Modal, Form, Button } from "react-bootstrap";
import { useRef, useState } from "react";
import "./singlepost.css";

export default function EditPost(props) {
  const { post, postid } = props;
  const [loading, setLoading] = useState(false);

  const ref = useRef();
  const [picUrl, setPicUrl] = useState(
    "http://desk87.com/assets/images/preview-not-available.jpg"
  );

  const fileChange = async (e) => {
    e.preventDefault();
    const files = e.target.files;
    const formData = new FormData();
    formData.append("image", files[0]);
    setLoading(true);
    try {
      const res = await fetch("/api/upload", {
        method: "POST",
        headers: {
          token: localStorage.getItem("token"),
        },
        body: formData,
      });
      if (res.ok) {
        const json = await res.json();
        setPicUrl(json);
        setLoading(false);
        //window.location.href = '/write'
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleClick = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch(`/api/posts/${postid}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          token: localStorage.getItem("token"),
        },
        body: JSON.stringify({
          title: ref.current[1].value,
          desc: ref.current[2].value,
          photo: picUrl,
        }),
      });
      if (res.ok) {
        window.location.href = "/";
        setLoading(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">Edit Blog</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form ref={ref}>
          <Form.Group
            className="mb-3 d-flex justify-content-center align-items-center"
            controlId="exampleForm.ControlInput1"
          >
            {!loading && (
              <>
                <label
                  htmlFor="file"
                  style={{ cursor: "pointer" }}
                  onChange={fileChange}
                >
                  <img
                    src={picUrl}
                    alt=""
                    style={{
                      width: "650px",
                      objectFit: "cover",
                      objectPosition: "center",
                      maxHeight: "450px",
                    }}
                  />
                </label>
                <input
                  type="file"
                  name="image"
                  id="file"
                  style={{ display: "none" }}
                  onChange={fileChange}
                />
              </>
            )}
            {loading && (
              <div className="loading-container">
                <p>Uploading...</p>
                <div className="loading"></div>
              </div>
            )}
          </Form.Group>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label>Title</Form.Label>
            <Form.Control type="text" placeholder="Change your blog title..." />
          </Form.Group>
          <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
            <Form.Label>Description</Form.Label>
            <Form.Control as="textarea" rows={3} />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button
          variant={"primary"}
          onClick={props.onHide}
          type="submit"
          onClick={handleClick}
        >
          Edit
        </Button>
        <Button variant="secondary" onClick={props.onHide}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
