
/**
 * booking-page.ts: In this module we maintain all the elements(locators) and functions associated to the offer booking page
 */

import { logger } from "../framework-setup/logger";
import { waitForLoadState } from "../utils/actionUtils";
import { expectElementNotToContainText, expectElementToContainText, expectPageToContainURL } from "../utils/assert-utils";
import { getLocatorByTestId } from "../utils/locator-utils";
import { MAX_TIMEOUT } from "../utils/timeout-constants";

export default class BookingPage{

    readonly travelPrice = () => getLocatorByTestId('shared-priceOverview-travelPrice');

    async validateBookingPage(): Promise<void> {
        await waitForLoadState();
        logger.info('wait for load state');
        await this.travelPrice().waitFor({
          state: "visible",
          timeout: MAX_TIMEOUT,
        });
        logger.info('travel price is visible');
        await expectPageToContainURL("/book/");
        logger.info('URL contains book');
      }

/**
 * this function Verifies whether the cost details displayed in the booking page matches with the price details 
 * displayed during the selection of offer in the previous page
 */
    async validateBookingPrice(price: string): Promise<void>{
        await expectElementToContainText(this.travelPrice(),price,{message: 'The price displayed in booking section should match the price shown in offer page'});
        logger.info('price validation done');
    }
}