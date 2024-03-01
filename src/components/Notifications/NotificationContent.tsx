function NotificationContent({ type }: { type: string }) {
  if (type === "comment") {
    return <span> do a comment on your post</span>;
  }
  if (type === "like") {
    return <span> like your post</span>;
  }
  if (type === "reply") {
    return <span className="dark:text-white"> reply on your comment</span>;
  }

  return <span className="dark:text-white"> started to follow you</span>;
}

export default NotificationContent;
