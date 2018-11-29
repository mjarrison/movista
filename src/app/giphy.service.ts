import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

const GIPHY_API_KEY = 'dc6zaTOxFJmzC';
const INCREMENT = 21;  // The requirement was 20, but 21 works better due to the rows of 3

@Injectable({
    providedIn: 'root'
})
export class GiphyService {

    baseUrl = 'http://api.giphy.com/v1/gifs/search?';
    offset = 0;

    constructor(private http: HttpClient) {
    }

    resetOffset() {
        this.offset = 0;
    }

    buildUrl(query) {
        return this.baseUrl +
            'api_key=' + GIPHY_API_KEY +
            '&limit=' + INCREMENT +
            '&offset=' + this.offset +
            '&q=' + query.split(' ').join('+');
    }

    submitQuery(query) {
        this.offset += INCREMENT;
        return this.http.get( this.buildUrl(query) );
    }
}
