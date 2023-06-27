package lt.techin.api.dto;

import java.util.Objects;


public class ForemanDto {

    private Long id;

    private String name;

    private String surname;

    private int rating;

    private String specialization;

    private String city;

    public ForemanDto() {
    }

    public ForemanDto(Long id, String name, String surname, int rating, String specialization, String city) {
        this.id = id;
        this.name = name;
        this.surname = surname;
        this.rating = rating;
        this.specialization = specialization;
        this.city = city;
    }

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

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        ForemanDto that = (ForemanDto) o;
        return rating == that.rating && Objects.equals(id, that.id) && Objects.equals(name, that.name) && Objects.equals(surname, that.surname) && Objects.equals(specialization, that.specialization) && Objects.equals(city, that.city);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, name, surname, rating, specialization, city);
    }

    @Override
    public String toString() {
        return "ForemanDto{" +
                "id=" + id +
                ", name='" + name + '\'' +
                ", surename='" + surname + '\'' +
                ", rating=" + rating +
                ", specelization='" + specialization + '\'' +
                ", city='" + city + '\'' +
                '}';
    }
}
