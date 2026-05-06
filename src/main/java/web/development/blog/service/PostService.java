package web.development.blog.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import web.development.blog.model.Post;
import web.development.blog.repository.PostRepository;

import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
public class PostService {

    private final PostRepository repository;

    public List<Post> getAll() {
        return repository.findAll();
    }

    public Post getById(Long id) {
        return repository.findById(id)
                .orElseThrow(() -> new RuntimeException("Post not found"));
    }

    public Post create(Post post) {
        post.setCreatedAt(LocalDateTime.now());
        post.setUpdatedAt(LocalDateTime.now());
        return repository.save(post);
    }

    public Post update(Long id, Post updated) {
        Post post = getById(id);
        post.setTitle(updated.getTitle());
        post.setContent(updated.getContent());
        post.setUpdatedAt(LocalDateTime.now());
        return repository.save(post);
    }

    public void delete(Long id) {
        repository.deleteById(id);
    }
}