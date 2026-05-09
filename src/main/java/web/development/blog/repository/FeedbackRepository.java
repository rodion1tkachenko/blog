package web.development.blog.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import web.development.blog.model.FeedbackMessage;

public interface FeedbackRepository extends JpaRepository<FeedbackMessage, Long> {
}