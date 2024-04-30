package vn.fpt.edu.healthcare.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.mongodb.repository.DeleteQuery;
import org.springframework.data.mongodb.repository.MongoRepository;
import vn.fpt.edu.healthcare.model.Reservation;

import java.util.List;
import java.util.Optional;

public interface ReservationRepository extends MongoRepository<Reservation, String> {
    Page<Reservation> findByTypeContainingIgnoreCase(String type, Pageable pageable);
    @DeleteQuery
    List<Reservation> deleteReservationByReservationId(String reservationId);
    Optional<Reservation> findReservationByReservationId(String reservationId);
}
