import org.openqa.selenium.WebDriver;
import org.openqa.selenium.chrome.ChromeOptions;
import org.openqa.selenium.firefox.FirefoxOptions;
import org.openqa.selenium.edge.EdgeOptions;
import org.openqa.selenium.remote.RemoteWebDriver;
import org.openqa.selenium.support.ui.WebDriverWait;
import org.openqa.selenium.By;
import org.openqa.selenium.WebElement;

import java.net.MalformedURLException;
import java.net.URL;
import java.util.concurrent.TimeUnit;

public class WebDriverSetup {
    public static WebDriver getDriver(String browser) throws MalformedURLException {
        // Specify the Selenium Grid Hub URL here
        String hubUrl = "http://localhost:4444/";

        // Set default timeout values
        int browserStartupTimeout = 30; // Browser initialization timeout in seconds
        int implicitWaitTimeout = 10; // Implicit wait timeout in seconds

        WebDriver driver = null;

        switch (browser.toLowerCase()) {
            case "chrome":
                ChromeOptions chromeOptions = new ChromeOptions();
                chromeOptions.setCapability("browserStartupTimeout", browserStartupTimeout); // Set browser startup timeout
                driver = new RemoteWebDriver(new URL(hubUrl), chromeOptions);
                break;

            case "firefox":
                FirefoxOptions firefoxOptions = new FirefoxOptions();
                firefoxOptions.setCapability("browserStartupTimeout", browserStartupTimeout); // Set browser startup timeout
                driver = new RemoteWebDriver(new URL(hubUrl), firefoxOptions);
                break;

            case "edge":
                EdgeOptions edgeOptions = new EdgeOptions();
                edgeOptions.setCapability("browserStartupTimeout", browserStartupTimeout); // Set browser startup timeout
                driver = new RemoteWebDriver(new URL(hubUrl), edgeOptions);
                break;

            default:
                throw new IllegalArgumentException("Browser type not supported: " + browser);
        }

        // Set the implicit wait timeout for all elements
        driver.manage().timeouts().implicitlyWait(implicitWaitTimeout, TimeUnit.SECONDS);

        return driver;
    }
}
