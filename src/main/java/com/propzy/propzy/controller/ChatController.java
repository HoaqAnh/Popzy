package com.propzy.propzy.controller;

import com.propzy.propzy.domain.Conversation;
import com.propzy.propzy.domain.User;
import com.propzy.propzy.domain.request.CreateMessageRequest;
import com.propzy.propzy.domain.response.ConversationDTO;
import com.propzy.propzy.domain.response.ConversationListResponse;
import com.propzy.propzy.domain.response.MessageResponseDTO;
import com.propzy.propzy.domain.response.RestResponse;
import com.propzy.propzy.repository.UserRepository;
import com.propzy.propzy.service.ChatService;
import com.propzy.propzy.service.UserService;
import com.propzy.propzy.util.ApiMessage;
import com.propzy.propzy.util.SecurityUtil;
import com.propzy.propzy.util.mapper.ConversationMapper;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import org.apache.coyote.Response;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.List;

@RestController
@RequestMapping("/api/v1")
public class ChatController {
    private final ChatService chatService;
    private final SimpMessagingTemplate messagingTemplate;
    private final UserService userService;
    private final UserRepository userRepository;

    public ChatController(ChatService chatService, SimpMessagingTemplate messagingTemplate, UserService userService, UserRepository userRepository) {
        this.chatService = chatService;
        this.userRepository = userRepository;
        this.messagingTemplate = messagingTemplate;
        this.userService = userService;
    }
    @GetMapping("/messageConversation")
    @ApiMessage("Get History Chat")
    public ResponseEntity<ConversationDTO> messageConversation(@RequestParam Long userId) {
        String emailCurrent = SecurityUtil.getCurrentUserLogin().orElseThrow();
        User userCur = this.userRepository.findByEmail(emailCurrent);
        User userReq = this.userRepository.findById(userId).orElseThrow();
        Conversation conv = this.chatService.getOrCreateConversation(userCur, userReq);

        return ResponseEntity.ok(ConversationMapper.toDTO(conv));
    }
        @GetMapping("/listConversation")
        public ResponseEntity<List<ConversationListResponse>> getMyConversations() {
            String emailCurrent = SecurityUtil.getCurrentUserLogin().orElseThrow();
            User userCur = this.userRepository.findByEmail(emailCurrent);

            return ResponseEntity.ok(chatService.getUserConversations(userCur.getId()));
        }


    @PostMapping("/sendMessage")
    public ResponseEntity<MessageResponseDTO> createMessage(@RequestBody CreateMessageRequest req) {
        MessageResponseDTO dto = chatService.createMessage (
                req.getConversationId(),
                req.getSenderId(),
                req.getContent(),
                req.getImage()
        );
        return ResponseEntity.ok(dto);
    }
    @MessageMapping("/conversations/{conversationId}/send")
    public void sendMessage(@DestinationVariable Long conversationId,
                            CreateMessageRequest req) {
        MessageResponseDTO saved = chatService.createMessage(
                conversationId,
                req.getSenderId(),
                req.getContent(),
                req.getImage()
        );

        messagingTemplate.convertAndSend("/topic/conversations." + conversationId, saved);

    }

}
