package com.propzy.propzy.domain.response;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import java.time.Instant;

@Getter
@Setter
@Builder
public class ConversationListResponse {

    private Long conversationId;

    private Long otherUserId;
    private String otherUserName;
    private String otherUserAvatar;

    private String lastMessage;
    private Instant lastMessageTime;
}
