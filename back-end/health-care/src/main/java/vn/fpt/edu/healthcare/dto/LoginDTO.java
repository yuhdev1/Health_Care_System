package vn.fpt.edu.healthcare.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class LoginDTO {

    private String username;

    private String password;

    private boolean rememberMe;


}
