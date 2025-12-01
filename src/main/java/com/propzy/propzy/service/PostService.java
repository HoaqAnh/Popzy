package com.propzy.propzy.service;

import com.propzy.propzy.domain.Image;
import com.propzy.propzy.domain.Post;
import com.propzy.propzy.domain.User;
import com.propzy.propzy.domain.Video;
import com.propzy.propzy.repository.ImageRepository;
import com.propzy.propzy.repository.PostRepository;
import com.propzy.propzy.repository.UserRepository;
import com.propzy.propzy.repository.VideoRepository;
import com.propzy.propzy.util.SecurityUtil;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class PostService {
    private final PostRepository postRepository;
    private final UserRepository userRepository;
    private final ImageRepository imageRepository;
    private final VideoRepository videoRepository;
    public PostService(PostRepository postRepository, UserRepository userRepository,
                       ImageRepository imageRepository, VideoRepository videoRepository) {
        this.postRepository = postRepository;
        this.userRepository = userRepository;
        this.imageRepository = imageRepository;
        this.videoRepository = videoRepository;
    }
    public Post create(Post request) {

        User user = userRepository.findByEmail(SecurityUtil.getCurrentUserLogin().get());
        Post post = Post.builder()
                .user(user)
                .name(request.getName())
                .description(request.getDescription())
                .price(request.getPrice())
                .createAt(LocalDateTime.now())
                .updateAt(LocalDateTime.now())
                .build();

        // Lưu post trước
        postRepository.save(post);

        // Thêm images
        if (request.getImages() != null) {
            for (Image url : request.getImages()) {
                Image img = new Image();
                img.setUrl(url.getUrl());
                img.setPost(post);
                imageRepository.save(img);
            }
        }
        // Thêm videos
        if (request.getVideos() != null) {
            for (Video url : request.getVideos()) {
                Video video = new Video();
                video.setUrl(url.getUrl());
                video.setPost(post);
                videoRepository.save(video);
            }
        }

        return post;
    }

    public Post update(Integer id, Post request) {

        Post post = postRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Post not found"));

        post.setName(request.getName());
        post.setDescription(request.getDescription());
        post.setPrice(request.getPrice());
        post.setUpdateAt(LocalDateTime.now());

        // Xóa media cũ
        imageRepository.deleteAll(post.getImages());
        videoRepository.deleteAll(post.getVideos());

        // Thêm images mới
        if (request.getImages() != null) {
            for (Image url : request.getImages()) {
                Image img = new Image();
                img.setUrl(url.getUrl());
                img.setPost(post);
                imageRepository.save(img);
            }
        }

        // Thêm videos mới
        if (request.getVideos() != null) {
            for (Video url : request.getVideos()) {
                Video video = new Video();
                video.setUrl(url.getUrl());
                video.setPost(post);
                videoRepository.save(video);
            }
        }

        return postRepository.save(post);
    }

    public Post getById(Integer id) {
        return postRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Post not found"));
    }

    public List<Post> getAll() {
        return postRepository.findAll();
    }

    public void delete(Integer id) {
        postRepository.deleteById(id);
    }
}
