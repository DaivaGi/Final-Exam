package lt.techin.dao;

import lt.techin.model.Foreman;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ForemanRepository extends JpaRepository<Foreman, Long> {

    List<Foreman> getAllByCarService_Id(Long id);

}
