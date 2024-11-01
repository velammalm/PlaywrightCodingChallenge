import { TIMEOUT } from "dns";
import { logger } from "../framework-setup/logger";
import { scrollLocatorIntoView, waitForLoadState } from "../utils/actionUtils";
import { expectElementToBeHidden, expectElementToContainText, expectPageToContainURL } from "../utils/assert-utils";
import { getLocator, getLocatorByTestId } from "../utils/locator-utils";
import { MAX_TIMEOUT, TEST_TIMEOUT } from "../utils/timeout-constants";

export default class OffersPage {
  readonly displayedHotelName = () =>getLocatorByTestId("find-offerlist-hotel-name");
  readonly displayedHotelLocation = () =>getLocatorByTestId("find-offerlist-hotel-region");
  //readonly displayedHotelRating = () => getLocatorByTestId('find-offerlist-hotel-rating');
  readonly allOffers = () => getLocatorByTestId("find-offerlist-offerbox-cta");
  readonly allOfferPrices = () => getLocatorByTestId('find-offerlist-total-price');
  readonly offerLoadSpinner = () => getLocator('span[style*="react-spinners-SyncLoader-sync"]').nth(0);

  async validateOfferSelectionPage(): Promise<void> {
    await waitForLoadState();
    await this.displayedHotelName().waitFor({
      state: "visible",
      timeout: MAX_TIMEOUT,
    });
    await expectPageToContainURL("offers?");
  }

  async verifyHotelDisplayDetails(hotelName: string, hotelLocation: string): Promise<void> {
    await expectElementToContainText(this.displayedHotelName(), hotelName);
    logger.info("verified hotel name");
    await expectElementToContainText(
      this.displayedHotelLocation(),
      hotelLocation
    );
    logger.info("verified hotel location");
  }

  async selectOffer() : Promise<string> {
    await this.allOffers().first().waitFor({
        state: "visible",
        timeout: MAX_TIMEOUT,
      });
      logger.info('first offerbox visible');
    const count = await this.allOffers().count();
    logger.info('total number of count is collected');
    await expectElementToBeHidden(this.offerLoadSpinner(),{timeout:MAX_TIMEOUT});
    let price;

    // Loop through each element and check the text content
    for (let i = 0; i < count; i++) {
      logger.info('inside for loop');
      const offerBox = this.allOffers().nth(i);
      const offerText = await offerBox.innerText();
      logger.info('offerText is '+offerText);

      // Click if the text is 'Zur Buchung'
      if (offerText === "Zur Buchung") {
        await scrollLocatorIntoView(offerBox);
        await offerBox.click();
        console.log(`Clicked on the available offer  at index ${i}.`);
        price= await this.allOfferPrices().nth(i+1).innerText();
        price= price.replace(/\s*€\s*/g, '').trim();
        console.log('the price of the selected offer is '+price );
        break;
      }
    }
    return price;
  }

}