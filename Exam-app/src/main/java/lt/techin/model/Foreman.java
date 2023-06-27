package lt.techin.model;

import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;
import java.util.Objects;

@Entity
public class Foreman {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;

    private String surname;

    private int rating;

    private String specialization;

    private String city;

    @ManyToOne
    @JoinColumn(name = "menu_id")
    @JsonIgnore
    private CarService carService;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getSurname() {
        return surname;
    }

    public void setSurname(String surname) {
        this.surname = surname;
    }

    public int getRating() {
        return rating;
    }

    public void setRating(int rating) {
        this.rating = rating;
    }

    public String getSpecialization() {
        return specialization;
    }

    public void setSpecialization(String specialization) {
        this.specialization = specialization;
    }

    public String getCity() {
        return city;
    }

    public void setCity(String city) {
        this.city = city;
    }

    public CarService getCarService() {
        return carService;
    }

    public void setCarService(CarService carService) {
        this.carService = carService;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Foreman foreman = (Foreman) o;
        return rating == foreman.rating && Objects.equals(id, foreman.id) && Objects.equals(name, foreman.name) && Objects.equals(surname, foreman.surname) && Objects.equals(specialization, foreman.specialization) && Objects.equals(city, foreman.city) && Objects.equals(carService, foreman.carService);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, name, surname, rating, specialization, city, carService);
    }
}
