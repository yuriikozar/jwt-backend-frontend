package com.example.scmessage.service;

import com.example.scmessage.model.Conversation;
import com.example.scmessage.repository.ConversationRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ConversationService {
    private final ConversationRepository conversationRepository;

    public ConversationService(ConversationRepository conversationRepository) {
        this.conversationRepository = conversationRepository;
    }

    public List<Conversation> getAllConversations() {
        return conversationRepository.findAll();
    }

    public Conversation getConversationById(Long id) {
        Optional<Conversation> conversationOptional = conversationRepository.findById(id);
        return conversationOptional.orElse(null);
    }

    public Conversation createConversation(Conversation conversation) {
        return conversationRepository.save(conversation);
    }

    public Conversation updateConversation(Conversation conversation) {
        return conversationRepository.save(conversation);
    }

    public void deleteConversation(Long id) {
        conversationRepository.deleteById(id);
    }
}
