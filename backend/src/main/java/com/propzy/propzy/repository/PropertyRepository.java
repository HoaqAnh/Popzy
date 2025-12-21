package com.propzy.propzy.repository;


import com.propzy.propzy.domain.Properties;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PropertyRepository extends JpaRepository<Properties, Long> {
}
