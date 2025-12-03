package com.propzy.propzy.domain.response;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class PostDTO {
    //Post
    private String name;
    private String description;
    private Float price;
    //Properties
    private Integer area;
    private Integer bedrooms;
    private Integer bathroom;
    private String district;
    private String city;
    //User
    private String fullname;
    private String imageUrl;
}
