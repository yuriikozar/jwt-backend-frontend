package com.example.scmessage.service;

import com.example.scmessage.model.Message;
import com.example.scmessage.repository.MessageRepository;
import java.util.List;
import java.util.NoSuchElementException;
import org.springframework.stereotype.Service;

@Service
public class MessageService {
  private final MessageRepository messageRepository;

  public MessageService(MessageRepository messageRepository) {
    this.messageRepository = messageRepository;
  }

  public List<Message> getAllMessages() {
    return messageRepository.findAll();
  }

  public Message getMessageById(Long id) {
    return messageRepository.findById(id)
        .orElseThrow(() -> new NoSuchElementException("Message not found with id: " + id));
  }

  public Message saveMessage(Message message) {
    return messageRepository.save(message);
  }

  public void deleteMessage(Long id) {
    if (messageRepository.existsById(id)) {
      messageRepository.deleteById(id);
    } else {
      throw new NoSuchElementException("Message not found with id: " + id);
    }
  }
}