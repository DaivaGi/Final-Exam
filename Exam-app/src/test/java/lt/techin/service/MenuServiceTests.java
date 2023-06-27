//package lt.techin.service;
//
//import lt.techin.dao.MenuRepository;
//import lt.techin.model.Menu;
//import org.assertj.core.api.Assertions;
//import org.junit.jupiter.api.Test;
//import org.junit.jupiter.api.extension.ExtendWith;
//import org.mockito.InjectMocks;
//import org.mockito.Mock;
//import org.mockito.Mockito;
//import org.mockito.junit.jupiter.MockitoExtension;
//
//import static org.mockito.Mockito.when;
//
//@ExtendWith(MockitoExtension.class)
//public class MenuServiceTests {
//
//    @Mock
//    private MenuRepository menuRepository;
//
//    @InjectMocks
//    private MenuService menuService;
//
//    @Test
//    public void BlogPostService_CreateBlogPost_ReturnsBlogPostDto(){
//        Menu menu = new Menu();
//        menu.setTitle("testTitle");
//        menu.setText("testText");
//
//        Menu menu1 = new Menu();
//        menu1.setId(10l);
//        menu1.setTitle("testTitle1");
//        menu1.setText("testText");
//
//        when(menuRepository.save(Mockito.any(Menu.class))).thenReturn(menu1);
//
//        Menu savedMenu = menuService.create(menu1);
//
//        Assertions.assertThat(savedMenu).isNotNull();
//        Assertions.assertThat(savedMenu.getId()).isEqualTo(10l);
//        Assertions.assertThat(savedMenu.getTitle()).isEqualTo("testTitle1");
//        Assertions.assertThat(savedMenu.getText()).isEqualTo("testText");
//    }
//
//}
