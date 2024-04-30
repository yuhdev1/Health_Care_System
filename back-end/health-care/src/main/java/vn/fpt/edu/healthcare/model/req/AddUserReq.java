package vn.fpt.edu.healthcare.model.req;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import vn.fpt.edu.healthcare.model.User;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class AddUserReq {
    private User user;
}
