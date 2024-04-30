package vn.fpt.edu.healthcare.model.req;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class DeleteUserReq {
    private String userId; // ID của người dùng cần xóa
}
