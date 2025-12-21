package com.propzy.propzy.controller;

import com.propzy.propzy.domain.Post;
import com.propzy.propzy.domain.User;
import com.propzy.propzy.domain.response.FavoritePostDTO;
import com.propzy.propzy.domain.response.RestResponse;
import com.propzy.propzy.repository.UserRepository;
import com.propzy.propzy.service.FavoritePostService;
import com.propzy.propzy.util.SecurityUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/favorites")
@RequiredArgsConstructor
public class FavoritePostController {

    private final FavoritePostService favoritePostService;
    private final UserRepository userRepository;
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

    @PostMapping("/{postId}")
    public ResponseEntity<?> likePost(@PathVariable Long postId) {
        String email=SecurityUtil.getCurrentUserLogin().get();
        User user=userRepository.findByEmail(email);
        favoritePostService.likePost(postId, user.getId());
        return ResponseEntity.ok("Liked");
    }

    @DeleteMapping("/{postId}")
    public ResponseEntity<?> unlikePost(@PathVariable Long postId) {
        String email=SecurityUtil.getCurrentUserLogin().get();
        User user=userRepository.findByEmail(email);
        favoritePostService.unlikePost(postId, user.getId());
        return ResponseEntity.ok("Unliked");
    }

    @GetMapping("")
    public ResponseEntity<List<FavoritePostDTO>> getFavorites() {
        String email=SecurityUtil.getCurrentUserLogin().get();
        User user=userRepository.findByEmail(email);

        List<FavoritePostDTO> data = favoritePostService
                .getFavoritePosts(user.getId())
                .stream()
                .map(fav -> mapToDTO(fav.getProperties().getPost()))
                .toList();

        return ResponseEntity.ok(data);
    }
    @GetMapping("/check/{postId}")
    public ResponseEntity<?> checkLiked(@PathVariable Long postId) {
        String email=SecurityUtil.getCurrentUserLogin().get();
        User user=userRepository.findByEmail(email);
        return ResponseEntity.ok(
                favoritePostService.isPostLiked(postId, user.getId())
        );
    }
}
