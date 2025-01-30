import React, { useEffect, useState } from 'react';
import { useSendMessageMutation, useGetMessagesQuery, useSubscribeToMessagesSubscription } from '../../services/message-api';
import { useForm } from 'react-hook-form';
import styles from './style.module.css';

interface MessageFormProps {
  receiverId: string;
  senderId: string;
}

const MessageForm: React.FC<MessageFormProps> = ({ receiverId, senderId }) => {
  const { register, handleSubmit, reset, formState: { errors } } = useForm();
  const [messageContent, setMessageContent] = useState('');
  const [media, setMedia] = useState<string | null>(null);

  const { data: messages, isLoading: messagesLoading } = useGetMessagesQuery({ senderId, receiverId });
  const [sendMessage] = useSendMessageMutation();
  const { data: newMessage, isLoading: newMessageLoading } = useSubscribeToMessagesSubscription({ receiverId });

  const handleMessageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMessageContent(e.target.value);
  };

  const handleMediaChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const mediaUrl = URL.createObjectURL(file);
      setMedia(mediaUrl);
    }
  };

  const onSubmit = async (data: any) => {
    await sendMessage({ content: data.message, receiverId, media });
    reset();
    setMedia(null);
  };

  useEffect(() => {
    if (newMessage) {
      // Handle new message
    }
  }, [newMessage]);

  return (
    <div className={styles.messageFormContainer}>
      <div className={styles.messageHistory}>
        {messagesLoading ? (
          <p>Loading messages...</p>
        ) : (
          messages?.map((msg: any) => (
            <div key={msg.id} className={styles.message}>
              <div className={styles.messageHeader}>
                <span>{msg.senderId}</span>
                <span>{msg.createdAt}</span>
              </div>
              <div className={styles.messageBody}>{msg.content}</div>
              {msg.media && <img src={msg.media} alt="media" className={styles.mediaAttachment} />}
            </div>
          ))
        )}
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className={styles.messageForm}>
        <div className={styles.messageInputContainer}>
          <textarea
            {...register('message', { required: 'Message is required' })}
            value={messageContent}
            onChange={handleMessageChange}
            placeholder="Type your message"
            className={styles.textArea}
          />
          {errors.message && <span className={styles.error}>{errors.message.message}</span>}
        </div>

        <div className={styles.fileUpload}>
          <input type="file" onChange={handleMediaChange} />
          {media && <img src={media} alt="Attachment Preview" className={styles.mediaPreview} />}
        </div>

        <button type="submit" className={styles.button} disabled={newMessageLoading}>
          Send
        </button>
      </form>
    </div>
  );
};

export default MessageForm;
