package web.development.blog.model;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "feedback_messages")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class FeedbackMessage {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;

    private String email;

    @Column(columnDefinition = "TEXT")
    private String message;
}