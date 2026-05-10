package web.development.blog.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import web.development.blog.model.Profile;
import web.development.blog.service.ProfileService;

@RestController
@RequestMapping("/api/profile")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class ProfileController {

    private final ProfileService service;

    @GetMapping
    public Profile getProfile() {
        return service.getProfile();
    }
}