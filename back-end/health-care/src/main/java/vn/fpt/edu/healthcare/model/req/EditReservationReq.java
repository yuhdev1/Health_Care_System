package vn.fpt.edu.healthcare.model.req;

import lombok.Data;

@Data
public class EditReservationReq {
    private String reservationId;
    private String description;
    private double cost;
}
