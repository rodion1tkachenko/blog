package web.development.blog.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import web.development.blog.dto.FeedbackRequest;
import web.development.blog.model.FeedbackMessage;
import web.development.blog.repository.FeedbackRepository;

import java.util.List;

@RestController
@RequestMapping("/api/feedback")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class FeedbackController {

    private final FeedbackRepository repository;

    @PostMapping
    public void send(@RequestBody FeedbackRequest request) {

        FeedbackMessage message = new FeedbackMessage();

        message.setName(request.getName());
        message.setEmail(request.getEmail());
        message.setMessage(request.getMessage());

        repository.save(message);
    }
    @GetMapping
    public List<FeedbackMessage> getAll() {
        return repository.findAll();
    }
}