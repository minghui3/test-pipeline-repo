import org.openqa.selenium.WebDriver; 
import org.openqa.selenium.chrome.ChromeOptions; 
import org.openqa.selenium.firefox.FirefoxOptions; 
import org.openqa.selenium.edge.EdgeOptions; 
import org.openqa.selenium.remote.RemoteWebDriver; 
 
import java.net.MalformedURLException; 
import java.net.URL; 
 
public class WebDriverSetup { 
    public static WebDriver getDriver(String browser) throws MalformedURLException { 
        // Specify the Selenium Grid Hub URL here 
        String hubUrl = "http://localhost:4444/"; 
 
        switch (browser.toLowerCase()) { 
            case "chrome": 
                ChromeOptions chromeOptions = new ChromeOptions(); 
                return new RemoteWebDriver(new URL(hubUrl), chromeOptions); 
 
            case "firefox": 
                FirefoxOptions firefoxOptions = new FirefoxOptions(); 
                return new RemoteWebDriver(new URL(hubUrl), firefoxOptions); 
 
            case "edge": 
                EdgeOptions edgeOptions = new EdgeOptions(); 
                return new RemoteWebDriver(new URL(hubUrl), edgeOptions); 
 
            default: 
                throw new IllegalArgumentException("Browser type not supported: " + browser); 
        } 
    } 
}
