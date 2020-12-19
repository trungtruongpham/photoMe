import { Component, OnInit } from '@angular/core';
import { AlbumService } from 'src/app/shared/services/album.service';
import { AlertifyService } from 'src/app/shared/services/alertify.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  listAlbums = [];
  page: number;
  isLoading: boolean;
  isEndPage: boolean;

  constructor(private albumService: AlbumService, private alertify: AlertifyService) { }

  ngOnInit(): void {
    this.page = 0;
    this.isLoading = false;
    this.isEndPage = false;
  }

  onNewAlbumSubmitted(): void {
    this.loadAlbums(1);
  }

  loadAlbums(page: number): void {
    this.albumService.getPagedAlbum(page, 4).subscribe(res => {
      if (!Object.keys(res).length) {
        this.isEndPage = true;
        this.isLoading = false;
        return;
      }

      res.forEach(item => {
        this.listAlbums.push(item);
      });
    });
  }

  onScroll(): void {
    this.page += 1;
    this.isLoading = true;

    this.loadAlbums(this.page);
    console.log(this.listAlbums);
    
  }
}
