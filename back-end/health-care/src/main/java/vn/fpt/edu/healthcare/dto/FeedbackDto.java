package vn.fpt.edu.healthcare.dto;

import lombok.*;
import java.time.LocalDate;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class FeedbackDto {
    private String feedbackId;
    private UserDto user;
    private String title;
    private String fullName;
    private String content;
    private String response;
    private LocalDate responseDate;
    private LocalDate createdDate;
    private UserDto responser;
    private boolean status;
}
