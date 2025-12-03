package com.propzy.propzy.service;

import com.propzy.propzy.domain.*;
import com.propzy.propzy.repository.*;
import com.propzy.propzy.util.SecurityUtil;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
public class PostService {
    private final PostRepository postRepository;
    private final UserRepository userRepository;
    private final ImageRepository imageRepository;
    private final VideoRepository videoRepository;
    private final PropertyRepository propertyRepository;
    public PostService(PostRepository postRepository, UserRepository userRepository,
                       ImageRepository imageRepository, VideoRepository videoRepository, PropertyRepository propertyRepository) {
        this.postRepository = postRepository;
        this.userRepository = userRepository;
        this.imageRepository = imageRepository;
        this.videoRepository = videoRepository;
        this.propertyRepository = propertyRepository;
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

        if(request.getProperties()!=null)
        {
            Properties properties = request.getProperties();
            properties.setPost(post);
            this.propertyRepository.save(request.getProperties());
        }
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

    public Page<Post> getPostsByUser(long userId, int page, int size) {
        Pageable pageable = PageRequest.of(page, size, Sort.by("createAt").descending());
        return postRepository.findAllByUserId(userId, pageable);
    }
}
