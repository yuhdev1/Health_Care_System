package vn.fpt.edu.healthcare.controller;

// Import các thư viện cần thiết (giống như trong FeedbackController).

import lombok.extern.slf4j.Slf4j;
import org.apache.commons.lang3.StringUtils;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import vn.fpt.edu.healthcare.dto.UserDto;
import vn.fpt.edu.healthcare.model.req.AddUserReq;
import vn.fpt.edu.healthcare.model.req.DeleteUserReq;
import vn.fpt.edu.healthcare.model.req.EditUserReq;
import vn.fpt.edu.healthcare.service.UserService;

import java.util.HashMap;

@RestController
@Slf4j
@RequestMapping("v1/user")
@CrossOrigin(origins = "http://localhost:3000")
public class UserController {
    private final UserService userService;
    private final ModelMapper modelMapper;

    @Autowired
    public UserController(UserService userService, ModelMapper modelMapper) {
        this.userService = userService;
        this.modelMapper = modelMapper;
    }

    @PostMapping("/add")
    public ResponseEntity<UserDto> addUser(@RequestBody AddUserReq addUserReq) {
        UserDto added = userService.addUser(addUserReq);
        log.info("Added user: {} ", addUserReq.getUser().getEmail());
        return new ResponseEntity<>(added, HttpStatus.OK);
    }

    @GetMapping("/get")
    public ResponseEntity<HashMap<String, Object>> getUser(@RequestParam(required = false) String searchKey,
                                                               @RequestParam(defaultValue = "0") int page) {
        log.info("call get feedbacks, page {}, search title {}", page,searchKey);
        searchKey = StringUtils.isEmpty(searchKey) ? "" : searchKey;
        return new ResponseEntity<>(userService.getUser(searchKey, page), HttpStatus.OK);
    }

    // Thêm các phương thức xử lý yêu cầu liên quan đến người dùng khác (nếu cần).
}