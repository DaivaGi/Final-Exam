package lt.techin.dao;

import lt.techin.model.CarService;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CarServiceRepository extends JpaRepository<CarService, Long> {

}
