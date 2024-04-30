package vn.fpt.edu.healthcare.service;

import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.modelmapper.ModelMapper;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import vn.fpt.edu.healthcare.dto.FeedbackDto;
import vn.fpt.edu.healthcare.dto.UserDto;
import vn.fpt.edu.healthcare.model.User;
import vn.fpt.edu.healthcare.model.req.AddUserReq;
import vn.fpt.edu.healthcare.model.req.DeleteUserReq;
import vn.fpt.edu.healthcare.model.req.EditUserReq;
import vn.fpt.edu.healthcare.repository.UserRepository;

import java.util.HashMap;
import java.util.Objects;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
@Slf4j
public class UserService {
    private final UserRepository userRepository;
    private final ModelMapper modelMapper;
    private final int pageSize = 5;
    public HashMap<String, Object> getUser(String searchKey, int page) {
        Pageable paging = PageRequest.of(page, pageSize);
        var feedbacksPg = userRepository
                .findAll( paging);
        HashMap<String, Object> resp = new HashMap<>();
        resp.put("users",feedbacksPg.getContent()
                .stream().map(item -> modelMapper.map(item, UserDto.class))
                .collect(Collectors.toList()));
        resp.put("totalPage", feedbacksPg.getTotalPages());
        return resp;
    }

    public UserDto addUser(AddUserReq addUserReq) {
        User user = null;
        if (Objects.nonNull(addUserReq.getUser())) {
            user = modelMapper.map(addUserReq.getUser(), User.class);
            // Thêm các xử lý và kiểm tra dữ liệu ở đây (tùy ý).
            userRepository.save(user);
            log.info("Saved user: {} ", user);
        }
        return modelMapper.map(user, UserDto.class);
    }




    // Thêm các phương thức xử lý và truy vấn khác liên quan đến người dùng (nếu cần).
}
