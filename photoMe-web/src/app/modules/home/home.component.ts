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
  pagedAlbums: [];
  isLoading: boolean;
  title = 'HomePage';

  constructor(private albumService: AlbumService, private alertify: AlertifyService) { }

  ngOnInit(): void {
    this.page = 0;
    this.isLoading = false;
  }

  onNewAlbumSubmitted(): void {
    this.loadAlbums(1);
  }

  loadAlbums(page: number): void {
    this.albumService.getPagedAlbum(page, 5).subscribe(res => {
      res.forEach(item => {
        this.listAlbums.push(item);
      });
    });
  }

  onScroll(): void {
    console.log('scrolling');
    this.page += 1;
    this.isLoading = true;

    this.loadAlbums(this.page);
    console.log(this.listAlbums);
  }
}
