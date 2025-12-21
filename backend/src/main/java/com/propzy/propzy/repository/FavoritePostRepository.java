package com.propzy.propzy.repository;

import com.propzy.propzy.domain.FavoritePost;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface FavoritePostRepository extends JpaRepository<FavoritePost, Long> {

    boolean existsByUserIdAndPostId(Long userId, Long postId);

    Optional<FavoritePost> findByUserIdAndPostId(Long userId, Long postId);

    List<FavoritePost> findByUserId(Long userId);

    void deleteByUserIdAndPostId(Long userId, Long postId);
}
