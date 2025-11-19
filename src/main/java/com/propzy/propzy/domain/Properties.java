package com.propzy.propzy.domain;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "properties")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Properties {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "post_id", nullable = false, unique = true)
    private Post post;

    @Column(name = "Area")
    private Integer area;

    private Integer frontage;

    @Column(name = "access_road")
    private Integer accessRoad;

    private Integer floors;

    private Integer bedrooms;

    private Integer bathroom;

    @Column(name = "house_direction", length = 30)
    private String houseDirection;

    @Column(name = "balcony_direction", length = 30)
    private String balconyDirection;

    @Column(name = "legal_status", length = 30)
    private String legalStatus;

    @Column(name = "furniture", length = 30)
    private String furniture;

    @Column(length = 30)
    private String district;

    @Column(length = 30)
    private String city;
}
