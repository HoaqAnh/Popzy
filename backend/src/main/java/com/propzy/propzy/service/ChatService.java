package com.propzy.propzy.service;


import com.propzy.propzy.domain.Conversation;
import com.propzy.propzy.domain.Message;
import com.propzy.propzy.domain.User;
import com.propzy.propzy.domain.request.MessageSimpleDTO;
import com.propzy.propzy.domain.response.ConversationDTO;
import com.propzy.propzy.domain.response.ConversationListResponse;
import com.propzy.propzy.domain.response.MessageResponseDTO;
import com.propzy.propzy.repository.ConversationRepository;
import com.propzy.propzy.repository.MessageRepository;
import com.propzy.propzy.repository.UserRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class ChatService {

    private final ConversationRepository conversationRepo;
    private final MessageRepository messageRepo;
    private final UserRepository userRepo;
    private final UserRepository userRepository;
    private final ConversationRepository conversationRepository;

    public ChatService(ConversationRepository conversationRepo, MessageRepository messageRepo, UserRepository userRepo, UserRepository userRepository, ConversationRepository conversationRepository) {
        this.conversationRepo = conversationRepo;
        this.messageRepo = messageRepo;
        this.userRepo = userRepo;
        this.userRepository = userRepository;
        this.conversationRepository = conversationRepository;
    }
    @Transactional
    public MessageResponseDTO createMessage(Long conversationId, Long senderId, String content, String image) {
        Conversation conv = conversationRepo.findById(conversationId)
                .orElseThrow(() -> new RuntimeException("Conversation not found"));

        User sender = userRepo.findById(senderId)
                .orElseThrow(() -> new RuntimeException("Sender not found"));

        if (!sender.getId().equals(conv.getUser1().getId()) &&
                !sender.getId().equals(conv.getUser2().getId())) {
            throw new RuntimeException("Sender is not part of this conversation");
        }

        Message msg = Message.builder()
                .conversation(conv)
                .sender(sender)
                .content(content)
                .image(image)
                .read(false)
                .createdAt(Instant.now())
                .build();

        Message saved = messageRepo.save(msg);
        conv.setUpdatedAt(Instant.now());
        conversationRepo.save(conv);

        return mapToDTO(saved);
    }
    public Long findPeerId(Long conversationId, Long currentUserId) {
        Long peerId = conversationRepo.findPeerId(conversationId, currentUserId);
        if (peerId == null) {
            throw new RuntimeException("User is not part of this conversation or conversation not found");
        }
        return peerId;
    }


    public List<ConversationListResponse> getUserConversations(Long currentUserId) {

        List<Conversation> conversations =
                conversationRepository.findAllByUserId(currentUserId);

        return conversations.stream().map(c -> {

            User otherUser =
                    c.getUser1().getId().equals(currentUserId)
                            ? c.getUser2()
                            : c.getUser1();

            Message lastMessage = c.getMessages() == null || c.getMessages().isEmpty()
                    ? null
                    : c.getMessages().get(c.getMessages().size() - 1);

            return ConversationListResponse.builder()
                    .conversationId(c.getId())
                    .otherUserId(otherUser.getId())
                    .otherUserName(otherUser.getFullname())
                    .otherUserAvatar(otherUser.getImageUrl())
                    .lastMessage(lastMessage != null ? lastMessage.getContent() : "")
                    .lastMessageTime(lastMessage != null ? lastMessage.getCreatedAt() : c.getUpdatedAt())
                    .build();

        }).toList();
    }

            private MessageResponseDTO mapToDTO(Message msg) {
        return MessageResponseDTO.builder()
                .id(msg.getId())
                .conversationId(msg.getConversation().getId())
                .senderId(msg.getSender().getId())
                .senderEmail(msg.getSender().getEmail())
                .content(msg.getContent())
                .image(msg.getImage())
                .read(msg.isRead())
                .createdAt(msg.getCreatedAt())
                .build();
    }
    @Transactional
    public Conversation getOrCreateConversation(User a, User b) {
        return conversationRepo.findByUserPair(a.getId(), b.getId())
                .orElseGet(() -> {
                    Conversation c = Conversation.builder()
                            .user1(a.getId() < b.getId() ? a : b)
                            .user2(a.getId() < b.getId() ? b : a)
                            .build();
                    return conversationRepo.save(c);
                });
    }

    // Gửi tin nhắn
    @Transactional
    public Message sendMessage(Long conversationId, User sender, String content, String image) {
        Conversation c = conversationRepo.findById(conversationId)
                .orElseThrow(() -> new IllegalArgumentException("Conversation not found"));

        Message m = Message.builder()
                .conversation(c)
                .sender(sender)
                .content(content)
                .image(image)
                .build();

        Message saved = messageRepo.save(m);

        c.setUpdatedAt(saved.getCreatedAt());

        return saved;
    }

    public Page<Message> getMessages(Long conversationId, int page, int size) {
        return messageRepo.findByConversation(conversationId, PageRequest.of(page, size));
    }

    @Transactional
    public int markAllRead(Long conversationId, Long me) {
        return messageRepo.markAllRead(conversationId, me);
    }
}