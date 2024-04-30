package vn.fpt.edu.healthcare.controller;

import lombok.extern.slf4j.Slf4j;
import org.apache.commons.lang3.StringUtils;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import vn.fpt.edu.healthcare.dto.FeedbackDto;
import vn.fpt.edu.healthcare.dto.UserDto;
import vn.fpt.edu.healthcare.model.Feedback;
import vn.fpt.edu.healthcare.model.req.AddFeedbackReq;
import vn.fpt.edu.healthcare.model.req.DeleteFeedbackReq;
import vn.fpt.edu.healthcare.model.req.EditFeedbackReq;
import vn.fpt.edu.healthcare.service.FeedbackService;
import vn.fpt.edu.healthcare.service.UserService;

import java.util.HashMap;

@RestController
@Slf4j
@RequestMapping("v1/feedback")
@CrossOrigin(origins = "http://localhost:3000")
public class FeedbackController {
    @Autowired
    private FeedbackService feedbackService;
    @Autowired
    private ModelMapper modelMapper;

    /*@GetMapping("/save")
    public ResponseEntity<Feedback> testFeedback() {
        feedbackService.saveFeedback();
        log.info("save success");
        return new ResponseEntity<>(null, HttpStatus.OK);
    }*/

    @PostMapping("/delete")
    public ResponseEntity<FeedbackDto> deleteFeedback(@RequestBody DeleteFeedbackReq deleteFeedback) {
        log.info("call delete feedbacks, id {}", deleteFeedback.getFeedbackId());
        var deleted = feedbackService.deleteFeedback(deleteFeedback);
        log.info("Delete success, id: {} ", deleted.getFeedbackId());
        return new ResponseEntity<>(modelMapper.map(deleted, FeedbackDto.class), HttpStatus.OK);
    }

    @PostMapping("/edit")
    public ResponseEntity<FeedbackDto> editFeedback(@RequestBody EditFeedbackReq editFeedbackReq) {
        var deleted = feedbackService.editFeedback(editFeedbackReq);
        log.info("Delete success, id: {} ", deleted.getFeedbackId());
        return new ResponseEntity<>(modelMapper.map(deleted, FeedbackDto.class), HttpStatus.OK);
    }

    @PostMapping("/add")
    public ResponseEntity<FeedbackDto> deleteFeedback(@RequestBody AddFeedbackReq addFeedbackReq) {
        var added = feedbackService.addFeedback(addFeedbackReq);
        log.info("Added success feedback: {} ", addFeedbackReq.getFeedback());
        return new ResponseEntity<>(added, HttpStatus.OK);
    }

    @GetMapping("/get")
    public ResponseEntity<HashMap<String, Object>> getFeedBack(@RequestParam(required = false) String searchKey,
                                                               @RequestParam(defaultValue = "0") int page) {
        log.info("call get feedbacks, page {}, search title {}", page,searchKey);
        searchKey = StringUtils.isEmpty(searchKey) ? "" : searchKey;
        return new ResponseEntity<>(feedbackService.getFeedbacks(searchKey, page), HttpStatus.OK);
    }


}
