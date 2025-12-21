package com.propzy.propzy.service;

import com.propzy.propzy.domain.FavoritePost;
import com.propzy.propzy.domain.Post;
import com.propzy.propzy.domain.User;
import com.propzy.propzy.repository.FavoritePostRepository;
import com.propzy.propzy.repository.PostRepository;
import com.propzy.propzy.repository.UserRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional
public class FavoritePostService {

    private final FavoritePostRepository favoritePostRepository;
    private final UserRepository userRepository;
    private final PostRepository postRepository;

    public void likePost(Long postId, Long userId) {
        if (favoritePostRepository.existsByUserIdAndPostId(userId, postId)) {
            return; // đã thích rồi
        }

        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        Post post = postRepository.findById(postId)
                .orElseThrow(() -> new RuntimeException("Post not found"));

        FavoritePost favoritePost = FavoritePost.builder()
                .user(user)
                .post(post)
                .build();

        favoritePostRepository.save(favoritePost);
    }

    public void unlikePost(Long postId, Long userId) {
        favoritePostRepository.deleteByUserIdAndPostId(userId, postId);
    }

    public List<Post> getFavoritePosts(Long userId) {
        return favoritePostRepository.findByUserId(userId)
                .stream()
                .map(FavoritePost::getPost)
                .toList();
    }

    public boolean isPostLiked(Long postId, Long userId) {
        return favoritePostRepository.existsByUserIdAndPostId(userId, postId);
    }
}
