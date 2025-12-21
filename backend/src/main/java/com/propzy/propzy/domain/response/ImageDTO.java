package com.propzy.propzy.domain.response;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ImageDTO {
    private Long id;
    private String url;
    // Tuyệt đối KHÔNG khai báo Post ở đây
}
