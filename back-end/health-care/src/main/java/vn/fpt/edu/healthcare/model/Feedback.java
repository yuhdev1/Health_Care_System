package vn.fpt.edu.healthcare.model;

import lombok.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDate;

@Document("feedback")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Feedback {
    @Id
    private String feedbackId;
    private User user;
    private String title;
    private String fullName;
    private String content;
    private String response;
    private LocalDate createdDate;
    private LocalDate responseDate;
    private User responser;
    private boolean status;
}
