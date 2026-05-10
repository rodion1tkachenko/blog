package web.development.blog.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import web.development.blog.model.Profile;
import web.development.blog.repository.ProfileRepository;

@Service
@RequiredArgsConstructor
public class ProfileService {

    private final ProfileRepository repository;

    public Profile getProfile() {

        return repository.findAll()
                .stream()
                .findFirst()
                .orElse(null);
    }

    public Profile save(Profile profile) {

        Profile existing = getProfile();

        if (existing != null) {
            profile.setId(existing.getId());
        }

        return repository.save(profile);
    }
}