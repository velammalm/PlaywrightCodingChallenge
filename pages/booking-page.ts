import { waitForLoadState } from "../utils/actionUtils";
import { expectElementNotToContainText, expectElementToContainText, expectPageToContainURL } from "../utils/assert-utils";
import { getLocatorByTestId } from "../utils/locator-utils";
import { MAX_TIMEOUT } from "../utils/timeout-constants";

export default class BookingPage{

    readonly travelPrice = () => getLocatorByTestId('shared-priceOverview-travelPrice');

    async validateBookingPage(): Promise<void> {
        await waitForLoadState();
        await this.travelPrice().waitFor({
          state: "visible",
          timeout: MAX_TIMEOUT,
        });
        await expectPageToContainURL("/book/");
      }

    async validateBookingPrice(price: string): Promise<void>{
        expectElementToContainText(this.travelPrice(),price,{message: 'The price displayed in booking section varies from the price shown in offer page'});
    }
}