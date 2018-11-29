import {Component, HostListener, OnInit} from '@angular/core';
import {GiphyService} from '../giphy.service';

@Component({
    selector: 'app-giphy',
    templateUrl: './giphy.component.html',
    styleUrls: ['./giphy.component.scss']
})
export class GiphyComponent implements OnInit {

    query: string;
    gifs: any = [];

    constructor(public giphyService: GiphyService) {
    }

    ngOnInit() {
    }

    submitQuery() {
        this.gifs = [];
        this.giphyService.resetOffset();
        this.more();
    }

    more() {
        this.giphyService.submitQuery(this.query)
            .subscribe(response => {
                this.gifs = this.gifs.concat(response.data);
            });
    }

    @HostListener('window:scroll', ['$event'])
    onWindowScroll() {
        if (this.gifs.length) {
            const pos = (document.documentElement.scrollTop || document.body.scrollTop) + window.innerHeight;
            const max = document.documentElement.scrollHeight;
            if (pos >= max) {
                this.more();
            }
        }
    }
}




