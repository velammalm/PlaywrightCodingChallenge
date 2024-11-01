import { logger } from "../framework-setup/logger";
import { click, scrollLocatorIntoView, scrollToBottomPage, waitForLoadState, waitForNetworkIdleState, waitForPageLoadState } from "../utils/actionUtils";
import { expectElementToBeHidden, expectPageToContainURL } from "../utils/assert-utils";
import { getLocator, getLocatorByTestId } from "../utils/locator-utils";
import { MAX_TIMEOUT, STANDARD_TIMEOUT } from "../utils/timeout-constants";



export default class SearchResults{

readonly hotelListHeadline = () => getLocatorByTestId('find-hotellist-headline');
readonly loadMoreButton = () => getLocatorByTestId('find-hotellist-loadMoreButton');
readonly carouselImage = () => getLocatorByTestId('image-carousel-image');
readonly allHotels = () => getLocatorByTestId('find-hotellist-hotelbox-cta');
readonly resultLoadSpinner = () => getLocator('span[style*="react-spinners-ScaleLoader-scale"]').nth(0);
readonly allHotelNames = () => getLocatorByTestId('find-hotellist-hotel-name');
readonly allHotelLocations = () => getLocatorByTestId('find-hotellist-hotel-region');
//readonly allHotelRatings = () => getLocatorByTestId('find-hotellist-hotel-rating');

protected initialHotelCount : number;
protected finalHotelCount : number;


async validateSearchResultsPage() : Promise<void>{
    await waitForLoadState();
    await this.hotelListHeadline().waitFor({ state: 'visible', timeout: MAX_TIMEOUT });
    await expectPageToContainURL('find/hotels?');
}

async clickLoadMoreButton() : Promise<void>{

    await this.carouselImage().first().waitFor({state: 'visible', timeout:MAX_TIMEOUT})
    await scrollToBottomPage();
    await this.loadMoreButton().first().waitFor({state: 'visible', timeout:MAX_TIMEOUT})
    this.initialHotelCount=await this.allHotels().count()
    logger.info(`the count before loading more results : ${this.initialHotelCount}`);
    await click(this.loadMoreButton());
    await expectElementToBeHidden(this.resultLoadSpinner());
    this.finalHotelCount=await this.allHotels().count();
    logger.info(`the count after loading more results : ${this.finalHotelCount}`);
}

async selectHotel() : Promise<{ hotelName: string; hotelLocation: string; }>{
     // Generate a random index between initialHotelCount and finalHotelCount - 1
    const randomIndex = Math.floor(Math.random() * (this.finalHotelCount - this.initialHotelCount)) + this.initialHotelCount;
    await this.carouselImage().nth(randomIndex).waitFor({state: 'visible', timeout:MAX_TIMEOUT})

    // Select the random hotel using the locator `.nth(randomIndex)`
    const randomHotel = await this.allHotels().nth(randomIndex);
    await randomHotel.waitFor({state: 'visible', timeout:MAX_TIMEOUT});
    await scrollLocatorIntoView(randomHotel);

    const randomHotelName = await this.allHotelNames().nth(randomIndex).innerText();
    const randomHotelLocation = await this.allHotelLocations().nth(randomIndex).innerText();
    
    //const randomHotelRating = await this.allHotelRatings().nth(randomIndex).innerText();

    // wait for the random hotel to be visible, and then select it
    
    await click(randomHotel);
  
    logger.info(`Selected hotel at index: ${randomIndex}`);
    logger.info(`Selected hotel name is: ${randomHotelName}`);
    logger.info(`Selected hotel location is: ${randomHotelLocation}`);
    
    //logger.info(`Selected hotel rating is: ${randomHotelRating}`);
    
    return {
        hotelName: randomHotelName,
        hotelLocation: randomHotelLocation
    };

}
}

