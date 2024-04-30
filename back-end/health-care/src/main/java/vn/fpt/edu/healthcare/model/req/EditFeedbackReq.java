package vn.fpt.edu.healthcare.model.req;

import lombok.Data;
import vn.fpt.edu.healthcare.dto.FeedbackDto;
@Data
public class EditFeedbackReq {
    private String feedbackId;
    private String response;
}
