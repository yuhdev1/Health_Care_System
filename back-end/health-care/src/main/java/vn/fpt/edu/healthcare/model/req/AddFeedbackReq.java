package vn.fpt.edu.healthcare.model.req;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import vn.fpt.edu.healthcare.dto.FeedbackDto;
import vn.fpt.edu.healthcare.dto.UserDto;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class AddFeedbackReq {
    FeedbackDto feedback;
    UserDto createdUser;
}
