import { format, formatDistanceToNow } from "date-fns";
import ptBR from "date-fns/locale/pt-BR";

import { Comments } from "./Comments";
import { Avatar } from "./Avatar";
import styles from "./Post.module.css";
import { ChangeEvent, FormEvent, useState } from "react";

interface IAuthor {
  name: string;
  role: string;
  avatarUrl: string;
}

interface IContent {
  type: "paragraph" | "link";
  content: string;
}

interface IPostProps {
  author: IAuthor;
  publishedAt: Date;
  content: IContent[];
}

export function Post({ author, publishedAt, content }: IPostProps) {
  const [comments, setComments] = useState(["Que cometário bacana, hein?"]);

  const [newCommentText, setNewCommentText] = useState("");

  const publishedDateFormatted = format(
    publishedAt,
    "d 'de' LLLL 'às' HH:mm'h'",
    {
      locale: ptBR,
    }
  );

  const publishedDateRelativeToNow = formatDistanceToNow(publishedAt, {
    locale: ptBR,
    addSuffix: true,
  });

  function handleCreateNewComment(e: FormEvent) {
    e.preventDefault(); //fazendo com que não necessite recarregar a página toda vez que o usuário realizar alguma ação

    setComments([...comments, newCommentText]);
    setNewCommentText("");
  }

  function handleNewCommentChange(event: ChangeEvent<HTMLTextAreaElement>) {
    setNewCommentText(event.target.value);
  }

  function deleteComment(commentToDelete: string) {
    const commentsWithoutDeletedOne = comments.filter((comments) => {
      return comments !== commentToDelete;
    });

    setComments(commentsWithoutDeletedOne);
  }

  const TextAreaEmpty = newCommentText.length === 0;

  return (
    <article className={styles.post}>
      <header>
        <div className={styles.author}>
          <Avatar src={author.avatarUrl} />
          <div className={styles.authorInfo}>
            <strong>{author.name}</strong>
            <span>{author.role}</span>
          </div>
        </div>

        <time
          title={publishedDateFormatted}
          dateTime={publishedAt.toISOString()}
        >
          {publishedDateRelativeToNow}
        </time>
      </header>
      <div className={styles.content}>
        {content.map((line) => {
          if (line.type === "paragraph") {
            return <p key={line.content}>{line.content}</p>;
          } else if (line.type === "link") {
            return (
              <p key={line.content}>
                <a href="#">{line.content}</a>
              </p>
            );
          }
        })}
      </div>

      <form onSubmit={handleCreateNewComment} className={styles.commentForm}>
        <strong>Deixe seu feedback</strong>
        <textarea
          name="comment"
          placeholder="Deixe um comentário legal!"
          value={newCommentText}
          onChange={handleNewCommentChange}
          required
        />
        <footer>
          <button
            type="submit"
            className={styles.publish}
            disabled={TextAreaEmpty}
          >
            Publicar
          </button>
        </footer>
      </form>

      <div className={styles.commentList}>
        {comments.map((comments) => {
          return (
            <Comments
              key={comments}
              content={comments}
              onDeleteComment={deleteComment}
            />
          );
        })}
      </div>
    </article>
  );
}
