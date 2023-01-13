import styles from "./Comments.module.css";
import { Avatar } from "./Avatar";
import { useState } from "react";
import { ThumbsUp, Trash } from "phosphor-react";

interface ICommentProps {
  content: string;
  onDeleteComment: (comment: string) => void;
}

export function Comments({ content, onDeleteComment }: ICommentProps) {
  const [like, setLike] = useState(0);

  function handleDeleteComment() {
    onDeleteComment(content);
  }

  function handleAddLike() {
    setLike((state) => {
      return state + 1;
    });
  }

  return (
    <article className={styles.comments}>
      <Avatar hasBorder={false} src="https://github.com/Villarinho-Gui.png" />
      <div className={styles.commentContainer}>
        <div className={styles.comment}>
          <header>
            <div className={styles.authorInfo}>
              <strong>
                Guilherme Villarinho <span>(você)</span>
              </strong>
              <time
                title="28 de dezembro às 16:23h"
                dateTime="2022-12-28 16:23:30"
              >
                Cerca de 2h atrás
              </time>
            </div>
            <button onClick={handleDeleteComment} title="Deletar comentário">
              <p>
                <Trash size={24} />
              </p>
            </button>
          </header>
          <p>{content}</p>
        </div>
        <footer>
          <button onClick={handleAddLike}>
            <ThumbsUp />
            Aplaudir <span>{like}</span>
          </button>
        </footer>
      </div>
    </article>
  );
}
