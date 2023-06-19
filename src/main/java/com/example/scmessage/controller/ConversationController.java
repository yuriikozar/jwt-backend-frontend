package com.example.scmessage.controller;

import com.example.scmessage.model.Conversation;
import com.example.scmessage.service.ConversationService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/conversations")
public class ConversationController {
    private final ConversationService conversationService;

    public ConversationController(ConversationService conversationService) {
        this.conversationService = conversationService;
    }

    @GetMapping
    public List<Conversation> getAllConversations() {
        return conversationService.getAllConversations();
    }

    @GetMapping("/{id}")
    public Conversation getConversationById(@PathVariable Long id) {
        return conversationService.getConversationById(id);
    }

    @PostMapping
    public Conversation createConversation(@RequestBody Conversation conversation) {
        return conversationService.createConversation(conversation);
    }

    @PutMapping("/{id}")
    public Conversation updateConversation(@PathVariable Long id, @RequestBody Conversation conversation) {
        conversation.setId(id);
        return conversationService.updateConversation(conversation);
    }

    @DeleteMapping("/{id}")
    public void deleteConversation(@PathVariable Long id) {
        conversationService.deleteConversation(id);
    }
}
