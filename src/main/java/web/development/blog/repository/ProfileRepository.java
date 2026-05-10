package web.development.blog.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import web.development.blog.model.Profile;

public interface ProfileRepository extends JpaRepository<Profile, Long> {
}