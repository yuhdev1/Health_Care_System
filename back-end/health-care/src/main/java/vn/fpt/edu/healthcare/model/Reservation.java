package vn.fpt.edu.healthcare.model;

import lombok.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;

@Document("reservation")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class Reservation {
    @Id
    private String reservationId;
    private User user;
    private User doctor;
    private String description;
    private String type;
    private Room room;
    private LocalDateTime startTime;
    private LocalDateTime endTime;
    private Double cost;
    private int status;

}
