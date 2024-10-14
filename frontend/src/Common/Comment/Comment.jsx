import React, { useState } from 'react';
import Swal from 'sweetalert2';
import { axiosSecure } from '../../api/axios';


const CommentSection = ({ ticketId, comments, userEmail, onCommentAdded }) => {
    const [comment, setComment] = useState("");

    const handleCommentSubmit = async () => {
        if (!comment.trim()) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Please write a comment first',
            });
            return;
        }

        const commentData = {
            userEmail: userEmail,
            text: comment,
            timestamp: new Date(),
        };

        try {
            const response = await axiosSecure.post(`/ticket/${ticketId}/comment`, commentData);
            onCommentAdded(response.data.ticket.comments); 
            setComment(""); 
            Swal.fire({
                icon: 'success',
                title: 'Success',
                text: 'Comment added successfully',
            });
        } catch (err) {
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Error adding comment',
            });
        }
    };

    return (
        <div>
            <h5>Comments:</h5>
            <div className="overflow-auto border border-info p-2 rounded" style={{ height: "350px", width: "400px" }}>
                {comments.length > 0 ? (
                    comments.map(comment => (
                        <div key={comment._id} className="comment mb-2">
                            <p><strong><small className="text-success">{comment.userEmail}</small></strong> <br /> {comment.text}</p>
                            <small className="text-muted">{new Date(comment.timestamp).toLocaleString()}</small>
                        </div>
                    ))
                ) : (
                    <p>No Comments...</p>
                )}
            </div>

            <div className="add-comment mt-4 d-flex align-items-end gap-1">
                <textarea
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    placeholder="Add a comment..."
                    rows="3"
                    className="form-control"
                ></textarea>
                <button
                    onClick={handleCommentSubmit}
                    className="btn btn-primary mt-2"
                >
                    <i className="bi bi-send"></i>
                </button>
            </div>
        </div>
    );
};

export default CommentSection;
