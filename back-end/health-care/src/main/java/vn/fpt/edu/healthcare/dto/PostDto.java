package vn.fpt.edu.healthcare.dto;

import lombok.*;
import org.springframework.data.annotation.Id;
import vn.fpt.edu.healthcare.model.User;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class PostDto {
    @Id
    private String postId;
    private String thumbnail;
    private String title;
    private String category;
    private User author;
    private String feature;
    private int status;
}
