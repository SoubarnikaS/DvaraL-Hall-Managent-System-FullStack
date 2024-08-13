package com.sdp.dvaralbackendsecurity.repo;


import com.sdp.dvaralbackendsecurity.model.FavoriteHalls;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface FavouriteHallRepository extends JpaRepository<FavoriteHalls, Long> {
    List<FavoriteHalls> findByUsers_Id(Long userId);

    @Override
    void delete(FavoriteHalls entity);
}
