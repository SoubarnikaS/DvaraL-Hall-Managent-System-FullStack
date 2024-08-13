package com.sdp.dvaralbackendsecurity.model;

import lombok.*;

import java.io.Serializable;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode
public class FavoriteHallsIdClass implements Serializable {
    private User users;
    private Halls hall;
}
