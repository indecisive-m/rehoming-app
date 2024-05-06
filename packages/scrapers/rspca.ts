import puppeteer from "puppeteer";
import { supabase } from "./supabaseClient";

(async () => {
  try {
    // Launch the browser and open a new blank page
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    // Navigate to Holly Hedge Page
    await page.goto(
      "https://www.rspca.org.uk/findapet/search?p_p_id=petSearch2016_WAR_ptlPetRehomingPortlets&p_p_lifecycle=1&p_p_state=normal&p_p_mode=view&_petSearch2016_WAR_ptlPetRehomingPortlets_action=search&p_auth=q1gS0ky8#onSubmitSetHere"
    );

    // Set screen size
    await page.setViewport({ width: 1080, height: 1024 });

    // accept cookies

    await page.click("#onetrust-accept-btn-handler");

    // select dog from animal options select

    await page.select("#PSanimalType", "DOG");

    // Type location into search box

    await page.type("#searchedLocation", "Somerset", { delay: 100 });

    await page.click("#addressSearchGoButton");

    await page.waitForNavigation();

    // Get a list of links for each dog
    await page.waitForSelector(".lfr-tooltip-scope");

    const links = await page.$$("#petSearchResults li a");

    // Loop over these links, open them in a new page and grab all the details

    for (let i = 0; i < links.length; i++) {
      const link = links[i];
      // @ts-expect-error <== error on line below where href is not on type Element
      const href = await page.evaluate((e) => e.href, link);
      const newPage = await browser.newPage();
      await newPage.goto(href);

      const description = await newPage.$$eval(".petDescription", (el) => {
        return el.map((el) => el.textContent);
      });

      const images = await newPage.evaluate(() => {
        let imgArray: Array<string | undefined> = [];

        const noCarousel = document.querySelector(".noCarousel");

        if (noCarousel) {
          imgArray.push(noCarousel.getAttribute("src")?.split("&")[2]);
          const imgMap = imgArray.map((img) => {
            return `https://www.rspca.org.uk/GenericImage/CallGenericImage?source=petSearch&size=large&${img}`;
          });

          return imgMap;
        }

        const images = document.querySelectorAll(".carouselImgHolder img");

        images.forEach((image) => {
          imgArray.push(image.getAttribute("src")?.split("&")[2]);
        });

        const imgMap = imgArray.map((img) => {
          return `https://www.rspca.org.uk/GenericImage/CallGenericImage?source=petSearch&size=large&${img}`;
        });

        return imgMap;
      });

      const name = await newPage.$eval(".animalHeading h1", (name) => {
        return name.textContent;
      });

      const details = await newPage.$$eval(
        "#lifeStyle ul li span",
        (details) => {
          return details.map((el) => el.textContent?.split(": "));
        }
      );

      const location = await newPage.$eval(
        ".establishmentLocation > p",
        (location) => {
          return location.textContent;
        }
      );

      const aboutMe = await newPage.$$eval(
        ".aboutMe table tbody .themeTxtSm",
        (el) => {
          return el.map((el) => el.textContent);
        }
      );

      const status = await newPage.evaluate(() => {
        const status = document.querySelector(".myreserved strong");
        return status?.textContent || "Available";
      });

      // Assign details value to variables. Check for undefined and if undefined set it to null as supabase is nullable

      const breed = aboutMe[0] || null;
      const age = aboutMe[2] || null;
      const goodWithChildren = details[1]?.toString() || null;
      const timeLeft = details[2]?.toString() || null;
      const goodWithDogs = details[3]?.toString() || null;
      const goodWithCats = details[4]?.toString() || null;

      const { error, data } = await supabase.from("dog").upsert({
        name: name,
        description: description,
        website_url: href,
        location: location,
        reserved: status,
        breed: breed,
        age: age,
        good_with_children: goodWithChildren,
        good_with_dogs: goodWithDogs,
        good_with_cats: goodWithCats,
        time_left: timeLeft,
        images: images,
        rescue_name: "RSPCA",
      });

      await newPage.close();
    }
    await browser.close();
  } catch (error) {
    console.log(error);
  } finally {
    console.log("Done");
  }
})();
