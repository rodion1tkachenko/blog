package web.development.blog.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import web.development.blog.model.Profile;
import web.development.blog.service.ProfileService;

@RestController
@RequestMapping("/api/admin/profile")
@RequiredArgsConstructor
public class AdminProfileController {

    private final ProfileService service;

    @PutMapping
    public Profile update(@RequestBody Profile profile) {
        return service.save(profile);
    }
}