package web.development.blog.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import web.development.blog.model.Post;

public interface PostRepository extends JpaRepository<Post, Long> {
}