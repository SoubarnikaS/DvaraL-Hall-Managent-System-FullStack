package com.sdp.dvaralbackendsecurity.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;


@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@IdClass(FavoriteHallsIdClass.class)
public class FavoriteHalls {

    @ManyToOne
    @Id
    private User users;


    @ManyToOne
    @Id
    private Halls hall;

    @JsonIgnore
    @Transient
    public boolean isFavorite;
}
