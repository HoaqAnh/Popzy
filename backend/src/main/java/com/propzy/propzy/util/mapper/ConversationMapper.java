package com.propzy.propzy.util.mapper;

import com.propzy.propzy.domain.Conversation;
import com.propzy.propzy.domain.Message;
import com.propzy.propzy.domain.User;
import com.propzy.propzy.domain.request.MessageSimpleDTO;
import com.propzy.propzy.domain.response.ConversationDTO;

import java.util.List;
import java.util.stream.Collectors;

public class ConversationMapper {

    public static ConversationDTO toDTO(Conversation entity) {
        if (entity == null) return null;

        return ConversationDTO.builder()
                .id(entity.getId())
                .createdAt(entity.getCreatedAt())
                .updatedAt(entity.getUpdatedAt())
                .user1(toUserSimpleDTO(entity.getUser1()))
                .user2(toUserSimpleDTO(entity.getUser2()))
                .messages(toMessageDTOList(entity.getMessages()))
                .build();
    }

    private static List<MessageSimpleDTO> toMessageDTOList(List<Message> messages) {
        if (messages == null) return List.of();
        return messages.stream()
                .map(ConversationMapper::toMessageDTO)
                .collect(Collectors.toList());
    }

    private static MessageSimpleDTO toMessageDTO(Message m) {
        return MessageSimpleDTO.builder()
                .id(m.getId())
                .content(m.getContent())
                .image(m.getImage())
                .read(m.isRead())
                .createdAt(m.getCreatedAt())
                .sender(toUserSimpleDTO(m.getSender()))
                .build();
    }

    private static MessageSimpleDTO.UserSimpleDTO toUserSimpleDTO(User u) {
        if (u == null) return null;
        return MessageSimpleDTO.UserSimpleDTO.builder()
                .id(u.getId())
                .email(u.getEmail())
                .fullname(u.getFullname())
                .imageUrl(u.getImageUrl())
                .build();
    }
}