package com.sdp.dvaralbackendsecurity.model;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class HallImages {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long imageID;

    private String imageName;

    @Lob
    @Column(length = 16777215)
    private byte[] data;

    @ManyToOne
    private Halls halls;

}
