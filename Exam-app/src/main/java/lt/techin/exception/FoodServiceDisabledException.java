package lt.techin.exception;


public class FoodServiceDisabledException extends RuntimeException {


    public FoodServiceDisabledException() {
    }

    public FoodServiceDisabledException(String message) {
        super(message);
    }

}
