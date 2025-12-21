package com.propzy.propzy.domain.response;

import lombok.*;

import java.util.List;


@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class PostDTO {
    //Post
    private Long id;
    private String name;
    private String description;
    private Float price;
    //Properties
    private Long id_properties;
    private Integer area;
    private Integer bedrooms;
    private Integer bathroom;
    private String district;
    private String city;
    //User
    private Long id_user;
    private String fullname;
    private String imageUrl;
    //Media

    private List<ImageDTO> listImage;
}
