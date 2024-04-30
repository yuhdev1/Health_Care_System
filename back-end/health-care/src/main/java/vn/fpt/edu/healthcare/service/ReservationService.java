package vn.fpt.edu.healthcare.service;

import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.modelmapper.ModelMapper;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import vn.fpt.edu.healthcare.dto.ReservationDto;
import vn.fpt.edu.healthcare.model.Reservation;
import vn.fpt.edu.healthcare.model.Room;
import vn.fpt.edu.healthcare.model.User;
import vn.fpt.edu.healthcare.model.req.AddReservationReq;
import vn.fpt.edu.healthcare.model.req.DeleteReservationReq;
import vn.fpt.edu.healthcare.model.req.EditReservationReq;
import vn.fpt.edu.healthcare.repository.ReservationRepository;

import java.time.LocalDateTime;
import java.util.Objects;

@Service
@AllArgsConstructor
@Slf4j
public class ReservationService {
    ReservationRepository reservationRepository;
    ModelMapper modelMapper;
    private static final int pageSize = 5;

    public void saveReservation() {
        reservationRepository.save(
                Reservation.builder().user(User.builder().userId("userTest").email("huyvq@gmail.com").build())
                        .doctor(User.builder().userId("userDoc").email("huyqv@gmail.com").build())
                        .description("benh").type("Máu").
                        room(Room.builder().roomId("1").roomName("Khoa Máu").building("1").build())
                        .startTime(LocalDateTime.now()).endTime(LocalDateTime.now())
                        .cost(10000.0).status(0).build()
        );
        reservationRepository.save(
                Reservation.builder().user(User.builder().userId("userTest1").email("huyvq1@gmail.com").build())
                        .doctor(User.builder().userId("userDoc1").email("huyqv1@gmail.com").build())
                        .description("benh").type("Máu").
                        room(Room.builder().roomId("1").roomName("Khoa Máu").building("1").build())
                        .startTime(LocalDateTime.now()).endTime(LocalDateTime.now())
                        .cost(10000.0).status(0).build()
        );
        reservationRepository.save(
                Reservation.builder().user(User.builder().userId("userTest2").email("huyvq2@gmail.com").build())
                        .doctor(User.builder().userId("userDoc2").email("huyqv2@gmail.com").build())
                        .description("benh").type("Máu").
                        room(Room.builder().roomId("1").roomName("Khoa Máu").building("1").build())
                        .startTime(LocalDateTime.now()).endTime(LocalDateTime.now())
                        .cost(10000.0).status(0).build()
        );
    }
    public Page<Reservation> getAllReservation(String searchKey, int pageable){
        Pageable paging = PageRequest.of(pageable, pageSize);
        return reservationRepository
               .findByTypeContainingIgnoreCase(searchKey, paging);
    }
    public Reservation deleteReservation(DeleteReservationReq deleteReservationReq){
        var reservationOptional =
                reservationRepository.findReservationByReservationId(deleteReservationReq.getReservationId());
        if(reservationOptional.get().getStatus() == 1){
            reservationOptional.ifPresent(reservation ->
            {
                reservation.setStatus(0);
                reservationRepository.save(reservation);});
        }else {
            reservationOptional.ifPresent(reservation ->
            {
                reservation.setStatus(1);
                reservationRepository.save(reservation);});
        }

        return reservationOptional.orElse(null);
    }
    public ReservationDto addReservation(AddReservationReq addReservationReq){
        Reservation reservation = null;
        if(Objects.nonNull(addReservationReq.getReservationDto())){
            reservation = modelMapper.map(addReservationReq.getReservationDto(),Reservation.class);

            if (Objects.nonNull(addReservationReq.getUserDto())) {
                reservation.setUser(modelMapper.map(addReservationReq.getUserDto(), User.class));
            } else {
                reservation.setUser(null);
            }
            if (Objects.nonNull(addReservationReq.getDoctorDto())) {
                reservation.setDoctor(modelMapper.map(addReservationReq.getDoctorDto(), User.class));
            } else {
                reservation.setUser(null);
            }
            if (Objects.nonNull(addReservationReq.getRoomDto())) {
                reservation.setRoom(modelMapper.map(addReservationReq.getRoomDto(), Room.class));
            }else {
                reservation.setRoom(null);
            }
            reservation.setStartTime(reservation.getStartTime());
            reservation.setEndTime(reservation.getEndTime());
            reservation.setDescription(reservation.getDescription()==null ? "": reservation.getDescription());
            reservation.setCost(0.0);
            reservation.setStatus(0);
            reservationRepository.save(reservation);
            log.info("save reservation {} success", reservation);

        }
        return modelMapper.map(reservation, ReservationDto.class);
    }
    public Reservation editReservation(EditReservationReq editReservationReq){
        var reservationOptional =
                reservationRepository.findReservationByReservationId(editReservationReq.getReservationId());
        reservationOptional.ifPresent(reservation -> {
            reservation.setCost(editReservationReq.getCost());
        reservation.setDescription(editReservationReq.getDescription());
        reservationRepository.save(reservation);
        }
        );
        return reservationOptional.orElse(null);
    }
}
