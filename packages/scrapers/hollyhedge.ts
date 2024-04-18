import puppeteer from "puppeteer";
import { supabase } from "./supabaseClient";

(async () => {
  // Launch the browser and open a new blank page
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  // Navigate to Holly Hedge Page
  await page.goto("https://hollyhedge.org.uk/our-animals/rehome-a-dog/");

  // Set screen size
  await page.setViewport({ width: 1080, height: 1024 });

  // Get a list of links for each dog

  const links = await page.$$(".hh-rehomepanel-wrapper .hh-rehomepanel-href");

  // Loop over these links, open them in a new page and grab all the details

  for (let i = 0; i < links.length; i++) {
    const link = links[i];
    // @ts-expect-error <== error on line below where href is not on type Element
    const href = await page.evaluate((e) => e.href, link);
    const newPage = await browser.newPage();
    await newPage.goto(href);

    const description = await newPage.$$eval(
      ".hh-rehome-single-desc p",
      (el) => {
        return el.map((el) => el.textContent);
      },
    );

    // Remove last p tag as it's not important.
    description.pop();

    const image = await newPage.$$eval(
      ".w3-display-container img[src]",
      (image) => {
        return image.map((el) => el.getAttribute("src"));
      },
    );

    const name = await newPage.$eval(".hh-rehome-single-name", (name) => {
      return name.textContent;
    });

    const details = await newPage.$$eval(
      ".hh-rehome-single-info ul li",
      (details) => {
        return details.map((el) => el.textContent?.split(": "));
      },
    );

    // Assign details value to variables. Check for undefined and if undefined set it to null as supabase is nullable

    const location = (details[1] && details[1][1]) || null;
    const status = (details[2] && details[2][1]) || null;
    const breed = (details[3] && details[3][1]) || null;
    const age = (details[4] && details[4][1]) || null;
    const sex = (details[5] && details[5][1]) || null;
    const goodWithChilden = (details[6] && details[6][1]) || null;
    const goodWithDogs = (details[7] && details[7][1]) || null;
    const goodWithCats = (details[8] && details[8][1]) || null;
    const timeLeft = (details[9] && details[9][1]) || null;
    const fenceHeight = (details[10] && details[10][1]) || null;

    const { error, data } = await supabase.from("dog").upsert({
      name: name,
      description: description.join(" "),
      website_url: href,
      location: location,
      reserved: status,
      breed: breed,
      age: age,
      sex: sex,
      good_with_children: goodWithChilden,
      good_with_dogs: goodWithDogs,
      good_with_cats: goodWithCats,
      time_left: timeLeft,
      fence_height: fenceHeight,
      images: image,
      rescue_name: "Holly Hedge",
    });

    await newPage.close();
  }
  await browser.close();
})();
