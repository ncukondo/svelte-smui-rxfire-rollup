import {
  db
} from "../plugins/firebase.js";
import {
  collectionData
} from "rxfire/firestore";
import {
  map,
  startWith
} from "rxjs/operators";

const commentsRef = db.collection("comments");

const deleteComment = (commentsRef, id) => {
  commentsRef.doc(id).delete();
}

export const getComments = () => ({
  "comments$": collectionData(commentsRef.orderBy("createdAt"), "id").pipe(
    map(comments =>
      comments.map(comment => {
        return {
          delete: () => deleteComment(commentsRef, comment.id),
          ...comment
        }
      })
    ),
    startWith([])
  ),
  add: (comment) => {
    commentsRef.add({
      content: comment,
      avatar: "https://picsum.photos/50?image=" +
        (Math.floor(Math.random() * 400) + 1),
      createdAt: new Date()
    });
  }
});