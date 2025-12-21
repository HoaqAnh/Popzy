package com.propzy.propzy.domain.response;

import lombok.*;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class InfoUserDTO {
    private Long id;
    private String fullname;
    private String email;
    private String phone;
    private String age;
    private String imageUrl;
}
