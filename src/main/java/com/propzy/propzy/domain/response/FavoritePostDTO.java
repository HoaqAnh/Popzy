package com.propzy.propzy.domain.response;

import com.propzy.propzy.domain.Post;
import lombok.*;

import java.time.LocalDateTime;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class FavoritePostDTO {
    private Long id;
    private String name;
    private String description;
    private Float price;
    private LocalDateTime createAt;

    private Long ownerId;
    private String ownerName;
    private String ownerAvatar;

    public FavoritePostDTO mapToDTO(Post post) {
        return FavoritePostDTO.builder()
                .id(post.getId())
                .name(post.getName())
                .description(post.getDescription())
                .price(post.getPrice())
                .createAt(post.getCreateAt())
                .ownerId(post.getUser().getId())
                .ownerName(post.getUser().getFullname())
                .ownerAvatar(post.getUser().getImageUrl())
                .build();
    }

}
