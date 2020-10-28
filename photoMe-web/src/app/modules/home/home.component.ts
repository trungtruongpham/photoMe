import { Component, OnInit } from '@angular/core';
import { error } from 'protractor';
import { AlbumService } from 'src/app/shared/services/album.service';
import { AlertifyService } from 'src/app/shared/services/alertify.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  listAlbums = [];
  title = 'HomePage';

  constructor(private albumService: AlbumService, private alertify: AlertifyService) { }

  ngOnInit(): void {
    this.loadAlbums();
  }

  onNewAlbumSubmitted(): void {
    this.loadAlbums();
  }

  loadAlbums(): void {
    this.albumService.getAllAlbum().subscribe((res) => {
      this.listAlbums = res;
    }, () => {
      this.alertify.error('Tải danh sách album thất bại!');
    });
  }
}
