import { Component } from '@angular/core';


@Component({
  selector: 'app-root',
  templateUrl: './homePage.component.html',
  styleUrls: ['./homePage.component.scss'],
})
export class HomePage {
  datas=[
    {
        "Location": "Lâm Đồng, Đà Lạt",
        "Age": "21",
        "Gender" : "Nam",
        "PhoneNumber" : "123456789",
        "Mail" : "trungtruongpham@gmail.com"
    },
] 
slides = [
  { image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b1/VAN_CAT.png/800px-VAN_CAT.png' },
  { image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b1/VAN_CAT.png/800px-VAN_CAT.png' },
  { image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b1/VAN_CAT.png/800px-VAN_CAT.png' },
  { image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b1/VAN_CAT.png/800px-VAN_CAT.png' },
  { image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b1/VAN_CAT.png/800px-VAN_CAT.png' },
  { image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b1/VAN_CAT.png/800px-VAN_CAT.png' },
];
}
