//package lt.techin.dao;
//
//import lt.techin.model.Menu;
//import lt.techin.model.Meal;
//import org.assertj.core.api.Assertions;
//import org.junit.jupiter.api.Test;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.boot.jdbc.EmbeddedDatabaseConnection;
//import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase;
//import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
//
//import java.util.List;
//
//@DataJpaTest
//@AutoConfigureTestDatabase(connection = EmbeddedDatabaseConnection.H2)
//public class MealRepositoryTests {
//
//
//    private MealRepository mealRepository;
//    private MenuRepository menuRepository;
//
//    @Autowired
//
//    public MealRepositoryTests(MealRepository mealRepository, MenuRepository menuRepository) {
//        this.mealRepository = mealRepository;
//        this.menuRepository = menuRepository;
//    }
//
//    @Test
//    public void CommentRepository_SaveAll_ReturnsSavedComment(){
//
//        Meal comment = new Meal();
//        comment.setAuthor("authorTest");
//        comment.setText("textTest");
//
//        Meal savedComment = mealRepository.save(comment);
//
//        Assertions.assertThat(savedComment).isNotNull();
//        Assertions.assertThat(savedComment.getId()).isGreaterThan(0);
//
//    }
//
//    @Test
//    public void CommentRepository_GetAll_ReturnsMoreThanOnePokemon(){
//
//        Meal comment = new Meal();
//        comment.setAuthor("testAuthor");
//        comment.setText("testText");
//
//        Meal comment1 = new Meal();
//        comment1.setAuthor("testAuthor1");
//        comment1.setText("testText");
//
//
//        mealRepository.save(comment);
//        mealRepository.save(comment1);
//
//        List<Meal> commentsList = mealRepository.findAll();
//
//        Assertions.assertThat(commentsList).isNotNull();
//        Assertions.assertThat(commentsList.size()).isGreaterThan(2);
//    }
//
//    @Test
//    public void CommentRepository_FindById_ReturnsComment(){
//
//        Meal comment = new Meal();
//        comment.setAuthor("testAuthor");
//        comment.setText("testText");
//
//        mealRepository.save(comment);
//
//
//       Meal commentById = mealRepository.findById(comment.getId()).get();
//
//        Assertions.assertThat(commentById).isNotNull();
//    }
//
//    @Test
//    public void CommentRepository_GetAllByBlogPost_IdOrderByCreatedDateDesc_ReturnsCommentNotNull(){
//
//        Meal comment = new Meal();
//        comment.setAuthor("testAuthor");
//        comment.setText("testText");
//
//        Menu menu = new Menu();
//        menu.setTitle("testTitle");
//        menuRepository.save(menu);
//        comment.setBlogPost(menu);
//
//        mealRepository.save(comment);
//
//        List<Meal> commentList = mealRepository.getAllByBlogPost_IdOrderByCreatedDateDesc(menu.getId());
//
//        Assertions.assertThat(commentList).isNotNull();
//    }
//
//}
