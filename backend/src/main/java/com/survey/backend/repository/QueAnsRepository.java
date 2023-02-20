package com.survey.backend.repository;

import com.survey.backend.model.QueAns;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface QueAnsRepository extends JpaRepository<QueAns, Long> {

}
