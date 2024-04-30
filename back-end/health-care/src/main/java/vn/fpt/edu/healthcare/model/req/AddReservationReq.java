package vn.fpt.edu.healthcare.model.req;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import vn.fpt.edu.healthcare.dto.ReservationDto;
import vn.fpt.edu.healthcare.dto.RoomDto;
import vn.fpt.edu.healthcare.dto.UserDto;
import vn.fpt.edu.healthcare.model.Room;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class AddReservationReq {
    ReservationDto reservationDto;
    UserDto userDto;
    UserDto doctorDto;
    RoomDto roomDto;
}
