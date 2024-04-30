package vn.fpt.edu.healthcare.dto;

import lombok.*;
import vn.fpt.edu.healthcare.model.Room;
import vn.fpt.edu.healthcare.model.User;


import java.time.LocalDateTime;
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ReservationDto {
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
