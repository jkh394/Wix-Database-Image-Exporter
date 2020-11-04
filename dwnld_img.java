import java.awt.image.BufferedImage;
import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.net.URL;

import javax.imageio.ImageIO;

import java.util.*;

class dwnld_img {
	public static void main(String[] args) {
		try {
			String file = "C:/Users/Joanne/Documents/GitHub/Wix-Database-Image-Exporter/imgs.txt";
			Scanner scanner = new Scanner(new FileInputStream(file));

			scanner.useDelimiter("\",[\\n],\"");
			int count = 0;
			while (scanner.hasNext()) {
				//System.out.println(scanner.next());
				try {
					String line = scanner.next();
					if (line.contains("https")) {
					    URL url = new URL(line);
					    BufferedImage image = ImageIO.read(url);
					    String fileName = "C:/Users/Joanne/Downloads/coach" + count + ".png";
					    ImageIO.write(image, "png", new File(fileName));
					    count++;
					    System.out.println("count: " + count + " fileName: " + fileName);
					} else {
						System.out.println("not a valid URL!");
					}
				} catch (IOException e) {
				}
			}
			
			scanner.close();
		} catch (Exception e) {
			System.out.println("Exception reading csv file: " + e);
		}
	}
}