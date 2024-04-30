package vn.fpt.edu.healthcare.model.req;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class EditUserReq {
    private String userId; // ID của người dùng cần chỉnh sửa
    // Các trường thông tin người dùng cần chỉnh sửa (ví dụ: username, password, vv).
    // Để đơn giản, bạn có thể sử dụng các trường cần thiết cho việc chỉnh sửa.
}
