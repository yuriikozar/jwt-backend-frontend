package com.example.scmessage.databaseseeder;

import com.example.scmessage.model.Conversation;
import com.example.scmessage.model.Message;
import com.example.scmessage.model.User;
import com.example.scmessage.repository.ConversationRepository;
import com.example.scmessage.repository.MessageRepository;
import com.example.scmessage.repository.UserRepository;
import java.time.LocalDateTime;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

@Component
public class DatabaseSeeder implements CommandLineRunner {

    private final UserRepository userRepository;
    private final ConversationRepository conversationRepository;
    private final MessageRepository messageRepository;

    @Autowired
    public DatabaseSeeder(UserRepository userRepository, ConversationRepository conversationRepository,
                          MessageRepository messageRepository) {
        this.userRepository = userRepository;
        this.conversationRepository = conversationRepository;
        this.messageRepository = messageRepository;
    }

    @Override
    public void run(String... args) throws Exception {
        // Create users
        User user1 = User.builder()

            .username("John Doe")
            .email("john@example.com")
            .password("cccccccc")
            .name("name")

            .build();

        User user2 = User.builder()

            .username("Jane Smith")
            .email("jane@example.com")
            .build();

        User user3 = User.builder()
            .username("Bob Johnson")
            .email("bob@example.com")
            .build();

        // Save users to the database
        userRepository.save(user1);
        userRepository.save(user2);
        userRepository.save(user3);

        // Create conversations
        Conversation conversation1 = Conversation.builder()
            .name("Conversation 1")
            .participants(List.of(user1, user2))
            .build();

        Conversation conversation2 = Conversation.builder()
            .name("Conversation 2")
            .participants(List.of(user1, user3))
            .build();

        // Save conversations to the database
        conversationRepository.save(conversation1);
        conversationRepository.save(conversation2);

        // Create messages
        Message message1 = Message.builder()
            .sender(user1)
            .receiver(user2)
            .conversation(conversation1)
            .content("Hello")
            .sentAt(LocalDateTime.now())
            .build();

        Message message2 = Message.builder()
            .sender(user2)
            .receiver(user1)
            .conversation(conversation1)
            .content("Hi")
            .sentAt(LocalDateTime.now())
            .build();

        Message message3 = Message.builder()
            .sender(user1)
            .receiver(user3)
            .conversation(conversation2)
            .content("How are you?")
            .sentAt(LocalDateTime.now())
            .build();

        Message message4 = Message.builder()
            .sender(user3)
            .receiver(user1)
            .conversation(conversation2)
            .content("I'm good, thanks!")
            .sentAt(LocalDateTime.now())
            .build();

        // Save messages to the database
        messageRepository.save(message1);
        messageRepository.save(message2);
        messageRepository.save(message3);
        messageRepository.save(message4);
    }
}
