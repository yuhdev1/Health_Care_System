package vn.fpt.edu.healthcare.dto;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class RoomDto {
    private String roomId;
    private String roomName;
    private String building;
}
