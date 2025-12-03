package com.propzy.propzy.controller;

import com.propzy.propzy.domain.Post;
import com.propzy.propzy.domain.response.PostDTO;
import com.propzy.propzy.service.PostService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/posts")
@RequiredArgsConstructor
public class PostController {

    private final PostService postService;

    @PostMapping
    public ResponseEntity<Post> create(@RequestBody Post request) {
        return ResponseEntity.ok(postService.create(request));
    }

    @PutMapping("/{id}")
    public ResponseEntity<Post> update(@PathVariable Integer id,
                                       @RequestBody Post request) {
        return ResponseEntity.ok(postService.update(id, request));
    }

    @GetMapping("/{id}")
    public ResponseEntity<Post> getById(@PathVariable Integer id) {
        return ResponseEntity.ok(postService.getById(id));
    }

    @GetMapping
    public ResponseEntity<List<PostDTO>> getAll() {
        return ResponseEntity.ok(postService.getAll());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> delete(@PathVariable Integer id) {
        postService.delete(id);
        return ResponseEntity.ok("Deleted successfully");
    }
    @GetMapping("/{userId}/posts")
    public Page<Post> getPostsByUser(
            @PathVariable long userId,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size
    ) {
        return postService.getPostsByUser(userId, page, size);
    }
}
