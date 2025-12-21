package com.propzy.propzy.domain.request;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class CreateMessageRequest {
    private Long conversationId;
    private Long senderId;
    private String content;
    private String image;
}