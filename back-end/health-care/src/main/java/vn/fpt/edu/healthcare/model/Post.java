package vn.fpt.edu.healthcare.model;

import lombok.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document("post")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class Post {
    @Id
    private String postId;
    private String thumbnail;
    private String title;
    private String category;
    private User author;
    private String feature;
    private int status;
}
