package lt.techin.model;


import org.springframework.data.annotation.CreatedDate;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

@Entity
public class CarService {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank
    private String title;

    private String address;

    private String manager;

    @OneToMany(cascade = CascadeType.REMOVE, mappedBy= "carService")
    private List<Foreman> foremen = new ArrayList<>();

    public CarService() {
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public String getManager() {
        return manager;
    }

    public void setManager(String manager) {
        this.manager = manager;
    }

    public List<Foreman> getForemen() {
        return foremen;
    }

    public void setForemen(List<Foreman> foremen) {
        this.foremen = foremen;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        CarService that = (CarService) o;
        return Objects.equals(id, that.id) && Objects.equals(title, that.title) && Objects.equals(address, that.address) && Objects.equals(manager, that.manager) && Objects.equals(foremen, that.foremen);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, title, address, manager, foremen);
    }
}
