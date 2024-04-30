package vn.fpt.edu.healthcare.controller;

import lombok.extern.slf4j.Slf4j;
import org.apache.commons.lang3.StringUtils;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import vn.fpt.edu.healthcare.dto.ReservationDto;
import vn.fpt.edu.healthcare.model.Reservation;
import vn.fpt.edu.healthcare.model.req.AddReservationReq;
import vn.fpt.edu.healthcare.model.req.DeleteReservationReq;
import vn.fpt.edu.healthcare.model.req.EditReservationReq;
import vn.fpt.edu.healthcare.service.ReservationService;

import java.util.HashMap;
import java.util.stream.Collectors;

@RestController
@Slf4j
@RequestMapping("v1/reservation")
@CrossOrigin(origins = "http://localhost:3000")
public class ReservationController {
    @Autowired
    private ReservationService reservationService;
    @Autowired
    private ModelMapper modelMapper;
    @GetMapping("/save")
    public ResponseEntity<Reservation> saveToMongoDB(){
        reservationService.saveReservation();
        log.info("save sucess");
        return new ResponseEntity<>(null, HttpStatus.OK);
    }
    @GetMapping("/get")
    public ResponseEntity<HashMap<String, Object>>
    getReservation(@RequestParam(required = false) String searchKey,
                   @RequestParam(defaultValue = "0") int page){
        searchKey = StringUtils.isEmpty(searchKey) ? "" : searchKey;
        HashMap<String, Object> resp = new HashMap<>();
        var result = reservationService.getAllReservation(searchKey,page);
        resp.put("reservations",reservationService.getAllReservation(searchKey,page).getContent().
                stream().map(item -> modelMapper.map(item, ReservationDto.class))
                .collect(Collectors.toList()));
        resp.put("totalPage", result.getTotalPages());
        return new ResponseEntity<>(resp, HttpStatus.OK);
    }
    @PostMapping("/del")
    public ResponseEntity<ReservationDto> deleteReservation(@RequestBody DeleteReservationReq deleteReservationReq){
        log.info("call delete reservation, id {}",deleteReservationReq.getReservationId());
        var deleted = reservationService.deleteReservation(deleteReservationReq);
        log.info("Delete success, id: {} ",deleteReservationReq.getReservationId());
        return new ResponseEntity<>(modelMapper.map(deleted, ReservationDto.class), HttpStatus.OK);
    }
    @PostMapping("/add")
    public ResponseEntity<ReservationDto> addReservation(@RequestBody AddReservationReq addReservationReq ){
        var added = reservationService.addReservation(addReservationReq);
        log.info("Added success : {} ", addReservationReq.getReservationDto());
        return new ResponseEntity<>(added, HttpStatus.OK);
    }
    @PostMapping("/edit")
    public ResponseEntity<ReservationDto> editReservation(@RequestBody EditReservationReq editReservationReq ){
        var editReservation = reservationService.editReservation(editReservationReq);
        log.info("Edit success : {} ", editReservationReq.getReservationId());
        return new ResponseEntity<>(modelMapper.map(editReservation, ReservationDto.class), HttpStatus.OK);
    }

}
